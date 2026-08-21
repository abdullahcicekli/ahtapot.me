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
  { name: 'VirusTotal', logo: '/provider-icons/virustotal_logo.png', alt: 'VirusTotal - Malware and URL scanning' },
  { name: 'AlienVault OTX', logo: '/provider-icons/alienVaultOtx-logo.png', alt: 'AlienVault OTX - Open Threat Exchange' },
  { name: 'AbuseIPDB', logo: '/provider-icons/abuseipdb-logo.png', alt: 'AbuseIPDB - IP address reputation' },
  { name: 'MalwareBazaar', logo: '/provider-icons/malwarebazaar-logo.png', alt: 'MalwareBazaar - Malware sample database' },
  { name: 'ARIN', logo: '/provider-icons/arin-logo.png', alt: 'ARIN - WHOIS provider' },
  { name: 'Shodan', logo: '/provider-icons/shodan-logo.png', alt: 'Shodan - Internet-connected device search' },
  { name: 'GreyNoise', logo: '/provider-icons/greynoise-logo.png', alt: 'GreyNoise - Internet noise detection' },
  { name: 'URLhaus', logo: '/provider-icons/urlhaus-logo.png', alt: 'URLhaus - Malicious URL database' },
  { name: 'Pulsedive', logo: '/provider-icons/pulsedive-logo.png', alt: 'Pulsedive - Threat intelligence platform' },
  { name: 'Scamalytics', logo: '/provider-icons/scamalytics-logo.png', alt: 'Scamalytics - IP fraud score' },
];
