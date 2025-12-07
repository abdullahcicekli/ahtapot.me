import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function getInitial(name: string): string {
  return name.charAt(0).toUpperCase();
}
