import type { Testimonial, Provider } from '@/types';

export const CHROME_STORE_URL = 'https://chromewebstore.google.com/detail/ahtapot-ioc-analysis-tool/gmekhigahdiddngdhfdkeefcomcankpg';
export const GITHUB_URL = 'https://github.com/abdullahcicekli/ahtapot';

export { storeStats } from './store-stats';

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: "Absolutely love this extension! It's simple, fast, and works exactly as promised.",
    author: 'Halil Enes Özdemir',
  },
  {
    id: '2',
    quote: 'Özellikle SOC alanında çalışanlar için çok kullanışlı ve verimli bir araç.',
    author: 'Mehmet Kadir Cırık',
  },
  {
    id: '3',
    quote: 'Great tool for quick IOC analysis. Simple, fast, and privacy-focused. Well done!',
    author: 'Sueda Çiçekli',
  },
  {
    id: '4',
    quote: "It's a good extension for end-users. Makes IOC analysis accessible to everyone.",
    author: 'Furkan Doğmuş',
  },
  {
    id: '5',
    quote: 'Elinize emeğinize sağlık. Çok iyi bir eklenti olmuş!',
    author: 'Altuğ Tekiner',
  },
  {
    id: '6',
    quote: 'Çok iyi bir eklenti. Faydalı bir extension!',
    author: 'Ömer Faruk Çiçekli',
  },
  {
    id: '7',
    quote: 'Çok iyi bir eklenti',
    author: 'Muaz Memiş',
  },
];

export const providers: Provider[] = [
  { name: 'VirusTotal' },
  { name: 'AlienVault OTX' },
  { name: 'AbuseIPDB' },
  { name: 'MalwareBazaar' },
  { name: 'ARIN' },
  { name: 'Shodan' },
  { name: 'GreyNoise' },
  { name: 'URLhaus' },
  { name: 'Pulsedive' },
  { name: 'Scamalytics' },
];
