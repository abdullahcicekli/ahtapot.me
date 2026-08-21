import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SocialProof } from '@/components/sections/SocialProof';
import { CTA } from '@/components/sections/CTA';
import { LanguageProvider } from '@/lib/language-context';
import { storeStats, testimonials } from '@/data/constants';

vi.mock('next/navigation', () => ({
  usePathname: () => '/en/',
  useRouter: () => ({ push: vi.fn() }),
}));

const wrap = (ui: React.ReactNode) =>
  render(<LanguageProvider initialLang="en">{ui}</LanguageProvider>);

describe('SocialProof', () => {
  it('renders figures from the single store-stats source', () => {
    wrap(<SocialProof />);
    expect(screen.getByText(String(storeStats.rating.toFixed(1)))).toBeInTheDocument();
    expect(screen.getByText(String(storeStats.userCount))).toBeInTheDocument();
  });

  it('shows exactly two quotes', () => {
    wrap(<SocialProof />);
    expect(screen.getAllByRole('blockquote')).toHaveLength(2);
  });

  it('attributes every quote to a named reviewer', () => {
    wrap(<SocialProof />);
    for (const testimonial of testimonials) {
      expect(screen.getByText(testimonial.author)).toBeInTheDocument();
    }
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
