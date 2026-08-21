export type Language = 'en' | 'tr';

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  source: string;
  avatarColor: 'green' | 'blue' | 'purple' | 'yellow' | 'pink' | 'orange';
}

export interface Provider {
  name: string;
  logo: string;
  alt: string;
}
