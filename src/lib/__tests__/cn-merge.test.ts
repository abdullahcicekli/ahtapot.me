import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn conflict resolution', () => {
  it('lets a caller class override a component default', () => {
    expect(cn('py-24', 'py-16')).toBe('py-16');
  });

  it('keeps responsive variants independent of the base utility', () => {
    expect(cn('py-24 md:py-32', 'py-16')).toBe('md:py-32 py-16');
  });

  it('leaves non-conflicting classes alone', () => {
    expect(cn('border border-hairline rounded-outer', 'p-10')).toBe(
      'border border-hairline rounded-outer p-10',
    );
  });
});
