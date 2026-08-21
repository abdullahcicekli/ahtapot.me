import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/navigation', () => ({
  usePathname: () => '/en/',
  useRouter: () => ({ push: vi.fn() }),
}));

import { Footer } from '@/components/layout/Footer';
import { LanguageProvider } from '@/lib/language-context';

function renderFooter(lang: 'en' | 'tr' = 'en') {
  return render(
    <LanguageProvider initialLang={lang}>
      <Footer />
    </LanguageProvider>,
  );
}

describe('Footer', () => {
  it('offers both languages in a select, current one selected', () => {
    renderFooter('en');
    const select = screen.getByRole('combobox', { name: 'Language' });
    expect(select).toHaveValue('en');
    expect(screen.getByRole('option', { name: 'English' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Türkçe' })).toBeInTheDocument();
  });

  it('names the language select in the page language', () => {
    renderFooter('tr');
    expect(screen.getByRole('combobox', { name: 'Dil' })).toHaveValue('tr');
  });

  it('links privacy within the current language', () => {
    renderFooter('tr');
    // Next's Link normalizes the trailing slash outside the static build,
    // so match the path with the slash optional.
    expect(screen.getByRole('link', { name: 'Gizlilik' }).getAttribute('href')).toMatch(
      /^\/tr\/privacy\/?$/,
    );
  });

  it('links the repository and the license', () => {
    renderFooter();
    expect(screen.getByRole('link', { name: /GitHub/ })).toHaveAttribute(
      'href',
      expect.stringContaining('github.com'),
    );
    expect(screen.getByRole('link', { name: 'License' })).toHaveAttribute(
      'href',
      expect.stringContaining('LICENSE'),
    );
  });
});
