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

  it('offers no theme toggle since the site is dark-only', () => {
    renderHeader();
    expect(screen.queryByTitle(/toggle theme/i)).toBeNull();
  });

  it('keeps the language select out of the nav; it lives in the footer', () => {
    renderHeader('en');
    expect(screen.queryByRole('combobox')).toBeNull();
  });

  it('links to the repository by icon, with an accessible name', () => {
    renderHeader();
    const github = screen.getByRole('link', { name: 'GitHub' });
    expect(github).toHaveAttribute('href', expect.stringContaining('github.com'));
  });

  it('shows Turkish copy on the Turkish route', () => {
    renderHeader('tr');
    expect(screen.getByRole('link', { name: 'Yükle' })).toBeInTheDocument();
  });

  it('points the install CTA at the Chrome Web Store', () => {
    renderHeader();
    const cta = screen.getByRole('link', { name: /install/i });
    expect(cta).toHaveAttribute('href', expect.stringContaining('chromewebstore.google.com'));
    expect(cta).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });
});
