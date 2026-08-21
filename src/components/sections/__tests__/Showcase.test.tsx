import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Showcase } from '@/components/sections/Showcase';
import { LanguageProvider } from '@/lib/language-context';

vi.mock('next/navigation', () => ({
  usePathname: () => '/en/',
  useRouter: () => ({ push: vi.fn() }),
}));

const wrap = (lang: 'en' | 'tr' = 'en') =>
  render(<LanguageProvider initialLang={lang}><Showcase /></LanguageProvider>);

describe('Showcase', () => {
  it('anchors at #showcase so the nav link resolves', () => {
    const { container } = wrap();
    expect(container.querySelector('section#showcase')).toBeInTheDocument();
  });

  it('renders exactly three boxes', () => {
    wrap();
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3);
  });

  it('keeps the IOC type terms that used to live in the IOCTypes section', () => {
    wrap();
    const text = document.body.textContent ?? '';
    for (const term of ['IPv4', 'IPv6', 'SHA256', 'CVE', 'Bitcoin', 'Ethereum']) {
      expect(text).toContain(term);
    }
  });

  it('names the AI vendors generically, with no model versions', () => {
    wrap();
    const text = document.body.textContent ?? '';
    expect(text).toMatch(/Claude/);
    expect(text).not.toMatch(/Sonnet|Haiku|Opus|GPT-4o/);
  });

  it('renders a product visual in every box', () => {
    wrap();
    expect(screen.getByText('198.51.100.23')).toBeInTheDocument();
    expect(screen.getByText('CVE-2024-3400')).toBeInTheDocument();
    expect(screen.getByText('a3f5c9e1…b2d4f6a8')).toBeInTheDocument();
  });

  it('renders Turkish copy on the Turkish route', () => {
    wrap('tr');
    expect(screen.getByText(/Her şeyi seç/)).toBeInTheDocument();
  });

  it('ties each article to its own heading via aria-labelledby', () => {
    wrap();
    const headings = screen.getAllByRole('heading', { level: 3 });
    for (const heading of headings) {
      expect(heading.id).toBeTruthy();
      const article = heading.closest('article');
      expect(article).not.toBeNull();
      expect(article).toHaveAttribute('aria-labelledby', heading.id);
    }
    const ids = headings.map((h) => h.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
