import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from '@/components/primitives/Tabs';

const items = [
  { id: 'detect', label: 'Detect' },
  { id: 'analyze', label: 'Analyze' },
  { id: 'ai', label: 'AI' },
];

const setup = () =>
  render(<Tabs items={items}>{(active) => <p>panel:{active}</p>}</Tabs>);

describe('Tabs', () => {
  it('exposes a tablist with one tab per item', () => {
    setup();
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(items.length);
  });

  it('selects the first item by default', () => {
    setup();
    expect(screen.getByRole('tab', { name: 'Detect' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('panel:detect')).toBeInTheDocument();
  });

  it('switches panel on click', async () => {
    setup();
    await userEvent.click(screen.getByRole('tab', { name: 'Analyze' }));
    expect(screen.getByRole('tab', { name: 'Analyze' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('panel:analyze')).toBeInTheDocument();
  });

  it('moves selection with the arrow keys, per the ARIA tabs pattern', async () => {
    setup();
    await userEvent.click(screen.getByRole('tab', { name: 'Detect' }));
    await userEvent.keyboard('{ArrowRight}');
    const analyzeTab = screen.getByRole('tab', { name: 'Analyze' });
    expect(analyzeTab).toHaveAttribute('aria-selected', 'true');
    expect(document.activeElement).toBe(analyzeTab);
    await userEvent.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'Detect' })).toHaveAttribute('aria-selected', 'true');
  });

  it('wraps at both ends', async () => {
    setup();
    await userEvent.click(screen.getByRole('tab', { name: 'Detect' }));
    await userEvent.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'AI' })).toHaveAttribute('aria-selected', 'true');
  });

  it('jumps to and focuses the first tab on Home from a middle tab', async () => {
    setup();
    await userEvent.click(screen.getByRole('tab', { name: 'Analyze' }));
    await userEvent.keyboard('{Home}');
    const detectTab = screen.getByRole('tab', { name: 'Detect' });
    expect(detectTab).toHaveAttribute('aria-selected', 'true');
    expect(document.activeElement).toBe(detectTab);
  });

  it('jumps to and focuses the last tab on End from a middle tab', async () => {
    setup();
    await userEvent.click(screen.getByRole('tab', { name: 'Analyze' }));
    await userEvent.keyboard('{End}');
    const aiTab = screen.getByRole('tab', { name: 'AI' });
    expect(aiTab).toHaveAttribute('aria-selected', 'true');
    expect(document.activeElement).toBe(aiTab);
  });

  it('keeps only the active tab in the tab order', async () => {
    setup();
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('tabindex', '0');
    expect(tabs[1]).toHaveAttribute('tabindex', '-1');

    await userEvent.click(tabs[0]);
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Detect' })).toHaveAttribute('tabindex', '-1');
    expect(screen.getByRole('tab', { name: 'Analyze' })).toHaveAttribute('tabindex', '0');
  });

  it('links each panel back to its tab', () => {
    setup();
    const panel = screen.getByRole('tabpanel');
    const tab = screen.getByRole('tab', { name: 'Detect' });
    expect(panel).toHaveAttribute('aria-labelledby', tab.id);
    expect(tab).toHaveAttribute('aria-controls', panel.id);
  });
});
