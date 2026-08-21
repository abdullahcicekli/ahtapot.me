import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const tokens = readFileSync(resolve(process.cwd(), 'src/styles/tokens.css'), 'utf8');
const globals = readFileSync(resolve(process.cwd(), 'src/app/globals.css'), 'utf8');

describe('design tokens', () => {
  it('sets the canvas darker than the logo tile so the mark stays visible', () => {
    expect(tokens).toContain('--bg: #0B0B0D');
    expect(tokens).toContain('--logo-tile: #1A1A1F');
  });

  it('defines the brand accent sampled from the mark', () => {
    expect(tokens).toContain('--accent: #C7F54D');
  });

  it('declares both self-hosted faces', () => {
    expect(tokens).toContain("font-family: 'Uncut Sans'");
    expect(tokens).toContain("font-family: 'Commit Mono'");
    expect(tokens).toContain('/fonts/UncutSans-Variable.woff2');
    expect(tokens).toContain('/fonts/CommitMono-400.woff2');
  });

  it('uses font-display: swap so text paints before the font arrives', () => {
    expect(tokens.match(/font-display:\s*swap/g)).toHaveLength(2);
  });

  it('declares the variable weight range for the display face', () => {
    expect(tokens).toContain('font-weight: 300 700');
  });
});

describe('globals.css', () => {
  it('imports the tokens', () => {
    expect(globals).toContain("@import './../styles/tokens.css'");
  });

  it('carries no light-theme block', () => {
    expect(globals).not.toContain('.dark');
    expect(globals).not.toContain('--bg-primary');
  });

  it('drops the legacy decorative utilities', () => {
    expect(globals).not.toContain('gradient-text');
    expect(globals).not.toContain('animate-float');
  });

  it('makes no third-party font request', () => {
    expect(globals).not.toMatch(/fonts\.googleapis|fonts\.gstatic|@import url\(['"]?http/);
    expect(tokens).not.toMatch(/fonts\.googleapis|fonts\.gstatic/);
  });
});
