import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/sections/Hero';
import { Providers } from '@/components/sections/Providers';
import { LanguageProvider } from '@/lib/language-context';
import { providers } from '@/data/constants';

vi.mock('next/navigation', () => ({
  usePathname: () => '/en/',
  useRouter: () => ({ push: vi.fn() }),
}));

const wrap = (ui: React.ReactNode) =>
  render(<LanguageProvider initialLang="en">{ui}</LanguageProvider>);

describe('Hero', () => {
  it('renders the headline as a single h1', () => {
    wrap(<Hero />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(/threat intel/i);
  });

  it('renders the product visual as DOM, not an img', () => {
    const { container } = wrap(<Hero />);
    expect(screen.getByText('198.51.100.23')).toBeInTheDocument();
    expect(container.querySelector('img')).toBeNull();
  });

  it('offers install and source actions', () => {
    wrap(<Hero />);
    expect(screen.getByRole('link', { name: /install/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view source/i })).toBeInTheDocument();
  });

  it('shows no Product Hunt badge because it moved to the footer', () => {
    const { container } = wrap(<Hero />);
    expect(container.innerHTML).not.toContain('producthunt');
  });
});

describe('Providers', () => {
  it('names every provider, as text or as wordmark alt text', () => {
    wrap(<Providers />);
    for (const provider of providers) {
      if (provider.wordmark) {
        expect(screen.getByAltText(provider.name)).toBeInTheDocument();
      } else {
        expect(screen.getByText(provider.name)).toBeInTheDocument();
      }
    }
  });

  it('renders one logo image per provider, each pointing at an existing asset', () => {
    const { container } = wrap(<Providers />);
    const images = Array.from(container.querySelectorAll('img'));
    expect(images).toHaveLength(providers.length);
    for (const provider of providers) {
      expect(images.some((img) => img.getAttribute('src') === provider.logo)).toBe(true);
    }
  });

  it('renders exactly one entry per provider', () => {
    const { container } = wrap(<Providers />);
    expect(container.querySelectorAll('li')).toHaveLength(providers.length);
  });

  it('exposes the list with an accessible name matching the section label', () => {
    wrap(<Providers />);
    expect(screen.getByRole('list', { name: /sources/i })).toBeInTheDocument();
  });

  it('contains exactly providers.length items', () => {
    wrap(<Providers />);
    expect(screen.getAllByRole('listitem')).toHaveLength(providers.length);
  });
});
