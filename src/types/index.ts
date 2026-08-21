export type Language = 'en' | 'tr';

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
}

export interface Provider {
  name: string;
  /* Path under public/ to the provider's mark, shown in the logo wall. */
  logo: string;
  /* True when the file is a wordmark (name included), so the wall skips the text. */
  wordmark?: boolean;
}
