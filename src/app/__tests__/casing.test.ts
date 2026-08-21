import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const SRC_ROOT = resolve(process.cwd(), 'src');

// Known English proper nouns / technical terms that must never take on Turkish
// casing (lowercase i -> İ) when uppercased by the `.label` utility.
const KNOWN_TOKENS = [
  'malicious',
  'suspicious',
  'clean',
  'VirusTotal',
  'Shodan',
  'AbuseIPDB',
  'Pulsedive',
  'Scamalytics',
  'GreyNoise',
  'URLhaus',
  'MalwareBazaar',
  'ARIN',
  'AlienVault',
];

function sources(dir: string): string[] {
  return readdirSync(resolve(process.cwd(), dir), { withFileTypes: true, recursive: true })
    .filter((e) => e.isFile() && /\.tsx?$/.test(e.name) && !e.name.includes('.test.'))
    .map((e) => resolve((e as any).parentPath ?? (e as any).path, e.name));
}

describe('copy', () => {
  it('uses no em dashes', () => {
    const offenders: string[] = [];
    for (const file of sources('src')) {
      const text = readFileSync(file, 'utf8');
      if (text.includes('—')) offenders.push(file.replace(process.cwd() + '/', ''));
    }
    expect(offenders).toEqual([]);
  });
});

describe('English technical tokens', () => {
  // ---------------------------------------------------------------------
  // This test statically approximates "does this .label element ever render
  // one of KNOWN_TOKENS". A fully precise answer would need a real JSX/TSX
  // AST plus whole-program data-flow analysis. Instead we resolve three
  // common patterns found in this codebase, each cheaply, with regexes:
  //
  //   1. `{identifier}` / `{identifier.field}` where `identifier` is a plain
  //      static import in the same file (relative or `@/` alias) -> resolve
  //      the imported module and flatten its string literals.
  //   2. `{array.map((item) => ... {item.field} ...)}` where `array` is
  //      itself a static import -> treat `item` as sourced from that import.
  //   3. One hop of prop drilling: if `identifier` is a destructured prop of
  //      an exported component in this file, search the rest of the tree for
  //      `<ThatComponent ... prop={expr} .../>` call sites and resolve `expr`
  //      in the *caller's* file using rules 1-2.
  //
  // Anything beyond that (e.g. locally-defined, non-exported data arrays that
  // embed imported values, or multi-hop prop drilling) is out of scope: a
  // false negative there is an accepted approximation, not a silent bug in
  // the check's own logic. Literal token text inside a .label element is
  // always caught regardless of these rules.
  // ---------------------------------------------------------------------

  interface ImportBinding {
    local: string;
    specifier: string;
    exported: string; // source export name, or 'default' / '*'
  }

  function parseImports(text: string): ImportBinding[] {
    const bindings: ImportBinding[] = [];
    const importRe = /import\s+(?:type\s+)?([^;]+?)\s+from\s+['"]([^'"]+)['"]/g;
    let m: RegExpExecArray | null;
    while ((m = importRe.exec(text))) {
      const clause = m[1].trim();
      const specifier = m[2];

      const namedMatch = clause.match(/\{([^}]*)\}/);
      if (namedMatch) {
        for (const part of namedMatch[1].split(',')) {
          const piece = part.replace(/^type\s+/, '').trim();
          if (!piece) continue;
          const asMatch = piece.match(/^([\w$]+)\s+as\s+([\w$]+)$/);
          if (asMatch) {
            bindings.push({ local: asMatch[2], specifier, exported: asMatch[1] });
          } else {
            bindings.push({ local: piece, specifier, exported: piece });
          }
        }
      }

      const beforeBrace = clause.split('{')[0].replace(/,$/, '').trim();
      if (beforeBrace && !beforeBrace.startsWith('*')) {
        bindings.push({ local: beforeBrace, specifier, exported: 'default' });
      }
      const nsMatch = clause.match(/\*\s+as\s+([\w$]+)/);
      if (nsMatch) {
        bindings.push({ local: nsMatch[1], specifier, exported: '*' });
      }
    }
    return bindings;
  }

  // Registers `.map((param) => ...)` callback params as pseudo-bindings of
  // whatever import the mapped array's root identifier resolves to.
  function withMapBindings(text: string, bindings: ImportBinding[]): ImportBinding[] {
    const extra: ImportBinding[] = [];
    const mapRe = /([A-Za-z_$][\w$]*)\.map\(\s*\(?\s*([A-Za-z_$][\w$]*)/g;
    let m: RegExpExecArray | null;
    while ((m = mapRe.exec(text))) {
      const [, arrayRoot, param] = m;
      const source = bindings.find((b) => b.local === arrayRoot);
      if (source) extra.push({ local: param, specifier: source.specifier, exported: source.exported });
    }
    return [...bindings, ...extra];
  }

  async function resolveModule(specifier: string, fromFile: string): Promise<unknown> {
    let base: string;
    if (specifier.startsWith('.')) {
      base = resolve(dirname(fromFile), specifier);
    } else if (specifier.startsWith('@/')) {
      base = resolve(SRC_ROOT, specifier.slice(2));
    } else {
      return undefined;
    }
    const candidates = [base, `${base}.ts`, `${base}.tsx`, resolve(base, 'index.ts'), resolve(base, 'index.tsx')];
    for (const candidate of candidates) {
      try {
        return await import(candidate);
      } catch {
        continue;
      }
    }
    return undefined;
  }

  function flattenStrings(value: unknown, seen = new Set<unknown>()): string[] {
    if (typeof value === 'string') return [value];
    if (!value || typeof value !== 'object') return [];
    if (seen.has(value)) return [];
    seen.add(value);
    const out: string[] = [];
    for (const v of Object.values(value as Record<string, unknown>)) out.push(...flattenStrings(v, seen));
    return out;
  }

  function containsToken(value: string, token: string): boolean {
    return new RegExp(`\\b${token}\\b`, 'i').test(value);
  }

  function rootIdentifier(expr: string): string | null {
    return expr.match(/^([A-Za-z_$][\w$]*)/)?.[1] ?? null;
  }

  function exportedComponentsWithProp(text: string, prop: string): string[] {
    const names: string[] = [];
    const fnRe = /export\s+function\s+([A-Za-z_$][\w$]*)\s*\(\s*\{([^}]*)\}/g;
    let m: RegExpExecArray | null;
    while ((m = fnRe.exec(text))) {
      const params = m[2].split(',').map((p) => p.trim().split(/[:=]/)[0].trim());
      if (params.includes(prop)) names.push(m[1]);
    }
    return names;
  }

  async function resolveIdentifierStrings(
    identifier: string,
    file: string,
    text: string,
    allFiles: string[],
    depth = 0,
  ): Promise<string[]> {
    if (depth > 2) return [];
    const bindings = withMapBindings(text, parseImports(text));
    const binding = bindings.find((b) => b.local === identifier);
    if (binding) {
      const mod = await resolveModule(binding.specifier, file);
      if (!mod) return [];
      const value =
        binding.exported === 'default'
          ? (mod as { default?: unknown }).default
          : binding.exported === '*'
            ? mod
            : (mod as Record<string, unknown>)[binding.exported];
      return flattenStrings(value);
    }

    // One hop of prop drilling: is `identifier` a destructured prop of an
    // exported component in this file? If so, look for call sites elsewhere.
    const components = exportedComponentsWithProp(text, identifier);
    if (components.length === 0) return [];

    const results: string[] = [];
    for (const other of allFiles) {
      if (other === file) continue;
      const otherText = readFileSync(other, 'utf8');
      for (const comp of components) {
        const tagRe = new RegExp(`<${comp}\\b[\\s\\S]*?>`, 'g');
        let tagMatch: RegExpExecArray | null;
        while ((tagMatch = tagRe.exec(otherText))) {
          const propRe = new RegExp(`\\b${identifier}\\s*=\\s*\\{([^}]+)\\}`);
          const propMatch = tagMatch[0].match(propRe);
          if (!propMatch) continue;
          const exprRoot = rootIdentifier(propMatch[1].trim());
          if (!exprRoot) continue;
          results.push(...(await resolveIdentifierStrings(exprRoot, other, otherText, allFiles, depth + 1)));
        }
      }
    }
    return results;
  }

  // Approximates JSX ancestry with a tag stack: for any character offset in
  // the file, tells us whether it sits inside an element (in this same file)
  // that itself carries `lang="en"`. A precise ancestor check would need a
  // full JSX parser/AST; this regex-based stack is a deliberate
  // approximation, sufficient for this project's flat, non-fragment-heavy JSX.
  function langEnCoverage(text: string): boolean[] {
    const covered = new Array(text.length).fill(false);
    const tagRe = /<\/?[A-Za-z][^>]*?\/?>/g;
    const stack: boolean[] = [];
    let m: RegExpExecArray | null;
    while ((m = tagRe.exec(text))) {
      const tag = m[0];
      const isClosing = tag.startsWith('</');
      const isSelfClosing = tag.endsWith('/>');
      const hasLangEn = /lang\s*=\s*"en"/.test(tag);
      const currentlyCovered = stack.some(Boolean) || hasLangEn;
      for (let i = m.index; i < m.index + tag.length; i++) covered[i] = currentlyCovered;
      if (isClosing) {
        stack.pop();
      } else if (!isSelfClosing) {
        stack.push(hasLangEn);
      }
    }
    return covered;
  }

  it('never renders a known English technical token inside .label without lang="en"', async () => {
    const offenders: string[] = [];
    const allFiles = sources('src');

    for (const file of allFiles) {
      const text = readFileSync(file, 'utf8');
      if (!/\blabel\b/.test(text)) continue;

      const coverage = langEnCoverage(text);
      const openTagRe = /<[A-Za-z][^>]*?>/g;
      let m: RegExpExecArray | null;
      while ((m = openTagRe.exec(text))) {
        const tag = m[0];
        const hasLabelClass = /className\s*=\s*(?:"[^"]*\blabel\b[^"]*"|\{[^}]*\blabel\b[^}]*\})/.test(
          tag,
        );
        if (!hasLabelClass) continue;
        if (/lang\s*=\s*"en"/.test(tag)) continue; // declared on the element itself
        if (coverage[m.index]) continue; // declared on an ancestor in this file

        const tagName = tag.match(/^<([A-Za-z][\w.]*)/)?.[1] ?? '';
        const innerTagRe = new RegExp(`<${tagName}\\b[^>]*?>|</${tagName}>`, 'g');
        innerTagRe.lastIndex = m.index + tag.length;
        let depth = 1;
        let contentEnd = text.length;
        let inner: RegExpExecArray | null;
        while (depth > 0 && (inner = innerTagRe.exec(text))) {
          if (inner[0].startsWith('</')) depth--;
          else if (!inner[0].endsWith('/>')) depth++;
          if (depth === 0) {
            contentEnd = inner.index;
            break;
          }
        }
        const content = text.slice(m.index + tag.length, contentEnd);

        const literalHit = KNOWN_TOKENS.some((t) => containsToken(content, t));

        let dynamicHit = false;
        if (!literalHit) {
          const exprMatch = content.match(/\{\s*([A-Za-z_$][\w$.]*)/);
          const identifier = exprMatch ? rootIdentifier(exprMatch[1]) : null;
          if (identifier) {
            const values = await resolveIdentifierStrings(identifier, file, text, allFiles);
            dynamicHit = values.some((v) => KNOWN_TOKENS.some((t) => containsToken(v, t)));
          }
        }

        if (literalHit || dynamicHit) {
          const snippet = content.trim().slice(0, 60);
          offenders.push(`${file.replace(process.cwd() + '/', '')}: <${tagName}> "${snippet}"`);
        }
      }
    }

    expect(offenders).toEqual([]);
  });
});
