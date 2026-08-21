import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const read = (p: string) => readFileSync(resolve(process.cwd(), p), 'utf8');

describe('home page', () => {
  it('renders exactly the five approved blocks', () => {
    const page = read('src/app/[lang]/page.tsx');
    for (const block of ['Hero', 'Providers', 'Showcase', 'SocialProof', 'CTA']) {
      expect(page).toContain(`<${block} />`);
    }
  });

  it('renders none of the deleted sections', () => {
    const page = read('src/app/[lang]/page.tsx');
    for (const gone of ['HowItWorks', 'Features', 'AIAnalysis', 'IOCTypes', 'Stats', 'Testimonials', 'Feedback']) {
      expect(page).not.toContain(`<${gone} />`);
    }
  });
});

describe('dead code', () => {
  const removed = [
    'src/lib/theme-context.tsx',
    'src/components/sections/Features.tsx',
    'src/components/sections/HowItWorks.tsx',
    'src/components/sections/AIAnalysis.tsx',
    'src/components/sections/IOCTypes.tsx',
    'src/components/sections/Stats.tsx',
    'src/components/sections/Testimonials.tsx',
    'src/components/sections/Feedback.tsx',
    'src/components/ui/Card.tsx',
    'src/components/ui/Badge.tsx',
    'src/components/ui/SectionTitle.tsx',
    'src/components/ui/Avatar.tsx',
  ];

  for (const path of removed) {
    it(`deletes ${path}`, () => {
      expect(existsSync(resolve(process.cwd(), path))).toBe(false);
    });
  }

  it('leaves no import of the theme context anywhere in src', () => {
    const layout = read('src/app/[lang]/layout.tsx');
    expect(layout).not.toContain('theme-context');
    expect(layout).not.toContain('ThemeProvider');
  });
});
