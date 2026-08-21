import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
  it('offers both languages in the dropdown, current one selected', async () => {
    renderFooter('en');
    const trigger = screen.getByRole('combobox', { name: 'Language' });
    expect(trigger).toHaveTextContent('English');

    await userEvent.click(trigger);
    expect(screen.getByRole('option', { name: /English/ })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByRole('option', { name: 'Türkçe' })).toHaveAttribute(
      'aria-selected',
      'false',
    );
  });

  it('names the language select in the page language', () => {
    renderFooter('tr');
    expect(screen.getByRole('combobox', { name: 'Dil' })).toHaveTextContent('Türkçe');
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
