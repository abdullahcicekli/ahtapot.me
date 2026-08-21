import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FeatureTabs } from '@/components/sections/FeatureTabs';
import { LanguageProvider } from '@/lib/language-context';

vi.mock('next/navigation', () => ({
  usePathname: () => '/en/',
  useRouter: () => ({ push: vi.fn() }),
}));

const wrap = (lang: 'en' | 'tr' = 'en') =>
  render(<LanguageProvider initialLang={lang}><FeatureTabs /></LanguageProvider>);

describe('FeatureTabs', () => {
  it('anchors at #product so the nav link resolves', () => {
    const { container } = wrap();
    expect(container.querySelector('section#product')).toBeInTheDocument();
  });

  it('keeps a single h2 above the tabs', () => {
    wrap();
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(1);
  });

  it('renders exactly four tabs named from the copy', () => {
    wrap();
    expect(screen.getAllByRole('tab')).toHaveLength(4);
    for (const name of ['Detect', 'Analyze', 'AI', 'Privacy']) {
      expect(screen.getByRole('tab', { name })).toBeInTheDocument();
    }
  });

  it('keeps the eleven IOC type terms that used to live in showcase.select.desc', () => {
    wrap();
    const text = document.body.textContent ?? '';
    for (const term of [
      'IPv4', 'IPv6', 'Domain', 'URL', 'MD5', 'SHA1', 'SHA256', 'Email', 'CVE', 'Bitcoin', 'Ethereum',
    ]) {
      expect(text).toContain(term);
    }
  });

  it('renders its own product visual on the default Detect panel', () => {
    wrap();
    expect(screen.getByText('IPv4')).toBeInTheDocument();
  });

  it('renders the Analyze panel with the hero fixture visual', async () => {
    wrap();
    await userEvent.click(screen.getByRole('tab', { name: 'Analyze' }));
    expect(screen.getByText('198.51.100.23')).toBeInTheDocument();
  });

  it('names all three AI analysis modes and MITRE ATT&CK once the AI tab is activated', async () => {
    wrap();
    await userEvent.click(screen.getByRole('tab', { name: 'AI' }));
    const text = document.body.textContent ?? '';
    expect(text).toContain('Summary');
    expect(text).toContain('Analysis');
    expect(text).toContain('Detailed');
    expect(text).toMatch(/MITRE ATT&CK/);
  });

  it('names the AI vendors generically, with no model versions, on the AI panel', async () => {
    wrap();
    await userEvent.click(screen.getByRole('tab', { name: 'AI' }));
    const text = document.body.textContent ?? '';
    expect(text).toMatch(/Claude/);
    expect(text).not.toMatch(/Sonnet|Haiku|Opus|GPT-4o/);
  });

  it('renders the Privacy panel with a masked-key visual', async () => {
    wrap();
    await userEvent.click(screen.getByRole('tab', { name: 'Privacy' }));
    expect(screen.getAllByText(/•/).length).toBeGreaterThan(0);
  });

  it('renders Turkish tab labels on the Turkish route', () => {
    wrap('tr');
    expect(screen.getByRole('tab', { name: 'Algıla' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Gizlilik' })).toBeInTheDocument();
  });
});
