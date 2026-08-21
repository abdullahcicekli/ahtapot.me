import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/navigation', () => ({
  usePathname: () => '/en/',
  useRouter: () => ({ push: vi.fn() }),
}));

import { Header } from '@/components/layout/Header';
import { LanguageProvider } from '@/lib/language-context';

function renderHeader(lang: 'en' | 'tr' = 'en') {
  return render(
    <LanguageProvider initialLang={lang}>
      <Header />
    </LanguageProvider>,
  );
}

describe('Header', () => {
  it('renders the wordmark', () => {
    renderHeader();
    expect(screen.getByText('ahtapot')).toBeInTheDocument();
  });

  it('offers no theme toggle — the site is dark-only', () => {
    renderHeader();
    expect(screen.queryByTitle(/toggle theme/i)).toBeNull();
  });

  it('links to the other language', () => {
    renderHeader('en');
    expect(screen.getByRole('link', { name: 'Türkçe' })).toHaveAttribute('href', '/tr');
  });

  it('gives the language switch an accessible name naming the target language', () => {
    renderHeader('en');
    const link = screen.getByRole('link', { name: /türkçe/i });
    expect(link).toHaveAttribute('hreflang', 'tr');
    expect(link).toHaveTextContent('TR');
  });

  it('shows Turkish copy on the Turkish route', () => {
    renderHeader('tr');
    expect(screen.getByText('Ürün')).toBeInTheDocument();
  });

  it('points the install CTA at the Chrome Web Store', () => {
    renderHeader();
    const cta = screen.getByRole('link', { name: /install/i });
    expect(cta).toHaveAttribute('href', expect.stringContaining('chromewebstore.google.com'));
    expect(cta).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });
});
