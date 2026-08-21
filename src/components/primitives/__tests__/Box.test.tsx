import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Box } from '@/components/primitives/Box';
import { Section } from '@/components/primitives/Rule';

describe('Box', () => {
  it('defaults to the outer tone', () => {
    render(<Box data-testid="b">x</Box>);
    expect(screen.getByTestId('b').className).toContain('rounded-outer');
    expect(screen.getByTestId('b').className).toContain('bg-raised');
  });

  it('renders the card tone with the smaller radius', () => {
    render(<Box tone="card" data-testid="b">x</Box>);
    expect(screen.getByTestId('b').className).toContain('rounded-card');
    expect(screen.getByTestId('b').className).toContain('bg-card');
  });

  it('always draws a hairline border', () => {
    render(<Box data-testid="b">x</Box>);
    expect(screen.getByTestId('b').className).toContain('border-hairline');
  });

  it('accepts a different element via as', () => {
    render(<Box as="article" data-testid="b">x</Box>);
    expect(screen.getByTestId('b').tagName).toBe('ARTICLE');
  });

  it('merges caller classes rather than replacing its own', () => {
    render(<Box className="p-10" data-testid="b">x</Box>);
    const cls = screen.getByTestId('b').className;
    expect(cls).toContain('p-10');
    expect(cls).toContain('rounded-outer');
  });
});

describe('Section', () => {
  it('renders its id so nav anchors resolve', () => {
    const { container } = render(<Section id="showcase">x</Section>);
    expect(container.querySelector('section#showcase')).toBeInTheDocument();
  });

  it('draws the two container rules that frame every band', () => {
    const { container } = render(<Section>x</Section>);
    expect(container.querySelectorAll('[data-rule]')).toHaveLength(2);
  });

  it('hides the decorative rules from assistive technology', () => {
    const { container } = render(<Section>x</Section>);
    for (const rule of container.querySelectorAll('[data-rule]')) {
      expect(rule.closest('[aria-hidden="true"]')).not.toBeNull();
    }
  });

  it('gives the rule layer its own full-height child of the section, not the content div', () => {
    const { container } = render(
      <Section>
        <div style={{ height: '2000px' }}>tall content</div>
      </Section>
    );
    const section = container.querySelector('section');
    const ruleLayer = container.querySelector('[data-rule]')?.parentElement;
    expect(ruleLayer).not.toBeNull();
    expect(ruleLayer?.parentElement).toBe(section);
  });
});
