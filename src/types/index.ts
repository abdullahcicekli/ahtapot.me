export type Language = 'en' | 'tr';

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
}

export interface Provider {
  name: string;
}
