import type { Testimonial, Provider } from '@/types';

export const CHROME_STORE_URL = 'https://chromewebstore.google.com/detail/ahtapot-ioc-analysis-tool/gmekhigahdiddngdhfdkeefcomcankpg';
export const GITHUB_URL = 'https://github.com/abdullahcicekli/ahtapot';

export { storeStats } from './store-stats';

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: "Absolutely love this extension! It's simple, fast, and works exactly as promised.",
    author: 'Halil Enes Özdemir',
    source: 'Chrome Web Store',
    avatarColor: 'green',
  },
  {
    id: '2',
    quote: 'Özellikle SOC alanında çalışanlar için çok kullanışlı ve verimli bir araç.',
    author: 'Mehmet Kadir Cırık',
    source: 'Chrome Web Store',
    avatarColor: 'blue',
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
