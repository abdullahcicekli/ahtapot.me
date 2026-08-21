import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SocialProof } from '@/components/sections/SocialProof';
import { CTA } from '@/components/sections/CTA';
import { LanguageProvider } from '@/lib/language-context';
import { testimonials } from '@/data/constants';

vi.mock('next/navigation', () => ({
  usePathname: () => '/en/',
  useRouter: () => ({ push: vi.fn() }),
}));

const wrap = (ui: React.ReactNode) =>
  render(<LanguageProvider initialLang="en">{ui}</LanguageProvider>);

describe('SocialProof', () => {
  it('renders all seven Chrome Web Store reviews', () => {
    wrap(<SocialProof />);
    expect(screen.getAllByRole('blockquote')).toHaveLength(7);
  });

  it('renders no store figures, which drift and need manual refresh', () => {
    const { container } = wrap(<SocialProof />);
    const text = container.textContent ?? '';
    expect(text).not.toMatch(/\b5\.0\b/);
    expect(text).not.toMatch(/\b14\b/);
    expect(text).not.toMatch(/\b68\b/);
  });

  it('attributes every quote', () => {
    wrap(<SocialProof />);
    for (const t of testimonials) expect(screen.getByText(t.author)).toBeInTheDocument();
  });
});

describe('CTA', () => {
  it('renders the closing headline and install action', () => {
    wrap(<CTA />);
    expect(screen.getByRole('heading')).toHaveTextContent(/add it to your browser/i);
    expect(screen.getByRole('link', { name: /install/i })).toHaveAttribute(
      'href',
      expect.stringContaining('chromewebstore.google.com'),
    );
  });
});
