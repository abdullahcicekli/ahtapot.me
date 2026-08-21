import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Mark, Wordmark } from '@/components/primitives/Mark';

describe('Mark', () => {
  it('renders an accessible label', () => {
    render(<Mark />);
    expect(screen.getByRole('img', { name: /ahtapot/i })).toBeInTheDocument();
  });

  it('scales from a single size prop', () => {
    const { container } = render(<Mark size={48} />);
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('width')).toBe('48');
    expect(svg.getAttribute('height')).toBe('48');
  });

  it('paints the tile and tentacle from brand tokens, not hardcoded hex', () => {
    const { container } = render(<Mark />);
    const html = container.innerHTML;
    expect(html).toContain('var(--logo-tile)');
    expect(html).toContain('var(--accent)');
  });

  it('carries real traced path data, not the plan placeholder', () => {
    const { container } = render(<Mark />);
    const d = container.querySelector('path')!.getAttribute('d')!;
    expect(d).not.toBe('TRACED_PATH_HERE');
    expect(d.length).toBeGreaterThan(200);
    expect(d).toMatch(/^[Mm]/);
  });
});

describe('Wordmark', () => {
  it('renders the product name as text so it is selectable and indexable', () => {
    render(<Wordmark />);
    expect(screen.getByText('ahtapot')).toBeInTheDocument();
  });
});
