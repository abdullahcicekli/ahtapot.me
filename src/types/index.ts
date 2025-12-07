export type Language = 'en' | 'tr';

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  source: string;
  avatarColor: 'green' | 'blue' | 'purple' | 'yellow' | 'pink' | 'orange';
}

export interface Feature {
  id: string;
  titleKey: string;
  descKey: string;
  icon: string;
}

export interface Provider {
  name: string;
  logo: string;
  alt: string;
}

export interface AIProvider {
  name: string;
  company: string;
  logo: string;
  models: { name: string; isDefault?: boolean }[];
}

export interface AIMode {
  id: string;
  nameKey: string;
  descKey: string;
  words: string;
  time: string;
  color: string;
}

export interface Step {
  number: number;
  titleKey: string;
  descKey: string;
}

export interface IOCType {
  name: string;
}

export interface Stat {
  value: string;
  labelKey: string;
}

export interface FAQ {
  questionKey: string;
  answerKey: string;
}
