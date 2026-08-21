import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IOCPanel } from '@/components/product/IOCPanel';
import { heroFixture } from '@/components/product/fixtures';

describe('IOCPanel', () => {
  it('renders the queried indicator as selectable text, not an image', () => {
    render(<IOCPanel fixture={heroFixture} />);
    expect(screen.getByText('198.51.100.23')).toBeInTheDocument();
  });

  it('sets indicator and metadata in the mono face for legibility', () => {
    render(<IOCPanel fixture={heroFixture} />);
    expect(screen.getByText('198.51.100.23').className).toContain('font-mono');
  });

  it('renders the verdict label', () => {
    render(<IOCPanel fixture={heroFixture} />);
    expect(screen.getByText(/malicious/i)).toBeInTheDocument();
  });

  it('colors the verdict dot from the verdict token, never the brand accent', () => {
    const { container } = render(<IOCPanel fixture={heroFixture} />);
    const dot = container.querySelector('[data-verdict-dot]')!;
    expect(dot.className).toContain('bg-malicious');
    expect(dot.className).not.toContain('bg-accent');
  });

  it('renders every tag and meta entry from the fixture', () => {
    render(<IOCPanel fixture={heroFixture} />);
    for (const tag of heroFixture.tags) {
      expect(screen.getByText(tag)).toBeInTheDocument();
    }
    for (const meta of heroFixture.meta) {
      expect(screen.getByText(meta)).toBeInTheDocument();
    }
  });

  it('drops the meta row in compact mode so showcase boxes stay short', () => {
    const { container } = render(<IOCPanel fixture={heroFixture} compact />);
    expect(container.querySelector('[data-meta-row]')).toBeNull();
  });

  it('marks itself decorative so screen readers are not read a fake console', () => {
    const { container } = render(<IOCPanel fixture={heroFixture} />);
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
  });
});
