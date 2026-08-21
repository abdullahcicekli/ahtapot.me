import { describe, it, expect } from 'vitest';
import { cn, getInitial } from '@/lib/utils';

describe('cn', () => {
  it('merges class names and drops falsy values', () => {
    expect(cn('a', false && 'b', 'c')).toBe('a c');
  });
});

describe('getInitial', () => {
  it('uppercases the first character', () => {
    expect(getInitial('ahtapot')).toBe('A');
  });
});
