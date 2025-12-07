import type { Testimonial, Provider, AIProvider, AIMode, Step, IOCType, Stat } from '@/types';

export const CHROME_STORE_URL = 'https://chromewebstore.google.com/detail/ahtapot-ioc-analysis-tool/gmekhigahdiddngdhfdkeefcomcankpg';
export const GITHUB_URL = 'https://github.com/abdullahcicekli/ahtapot';
export const FORMSPREE_URL = 'https://formspree.io/f/xeordlbz';

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: "Absolutely love this extension! It's simple, fast, and works exactly as promised. Highly recommend it!",
    author: 'Halil Enes Özdemir',
    source: 'Chrome Web Store',
    avatarColor: 'green',
  },
  {
    id: '2',
    quote: 'Özellikle SOC alanında çalışanlar için çok kullanışlı ve verimli bir araç. Kullanım kolaylığı ve hızlı sonuç alma özelliği harika.',
    author: 'Mehmet Kadir Cırık',
    source: 'Chrome Web Store',
    avatarColor: 'blue',
  },
  {
    id: '3',
    quote: 'Great tool for quick IOC analysis. Simple, fast, and privacy-focused. Well done!',
    author: 'Sueda Çiçekli',
    source: 'Chrome Web Store',
    avatarColor: 'purple',
  },
  {
    id: '4',
    quote: "It's a good extension for end-users. Makes IOC analysis accessible to everyone.",
    author: 'Furkan Doğmuş',
    source: 'Chrome Web Store',
    avatarColor: 'yellow',
  },
  {
    id: '5',
    quote: 'Elinize emeğinize sağlık. Çok iyi bir eklenti olmuş!',
    author: 'Altuğ Tekiner',
    source: 'Chrome Web Store',
    avatarColor: 'pink',
  },
  {
    id: '6',
    quote: 'Çok iyi bir eklenti. Faydalı bir extension!',
    author: 'Ömer Faruk Çiçekli',
    source: 'Chrome Web Store',
    avatarColor: 'orange',
  },
  {
    id: '7',
    quote: 'Çok iyi bir eklenti',
    author: 'Muaz Memiş',
    source: 'Chrome Web Store',
    avatarColor: 'teal',
  },
];

export const providers: Provider[] = [
  { name: 'VirusTotal', logo: '/provider-icons/virustotal_logo.png', alt: 'VirusTotal - Malware and URL scanning' },
  { name: 'AlienVault OTX', logo: '/provider-icons/alienVaultOtx-logo.png', alt: 'AlienVault OTX - Open Threat Exchange' },
  { name: 'AbuseIPDB', logo: '/provider-icons/abuseipdb-logo.png', alt: 'AbuseIPDB - IP address reputation' },
  { name: 'MalwareBazaar', logo: '/provider-icons/abuse-logo.png', alt: 'MalwareBazaar - Malware sample database' },
  { name: 'ARIN', logo: '/provider-icons/arin-logo.png', alt: 'ARIN - WHOIS provider' },
  { name: 'Shodan', logo: '/provider-icons/shodan-logo.png', alt: 'Shodan - Internet-connected device search' },
  { name: 'GreyNoise', logo: '/provider-icons/greynoise-logo.png', alt: 'GreyNoise - Internet noise detection' },
  { name: 'Pulsedive', logo: '/provider-icons/pulsedive-logo.png', alt: 'Pulsedive - Threat intelligence platform' },
  { name: 'Scamalytics', logo: '/provider-icons/scamalytics-logo.png', alt: 'Scamalytics - IP fraud score' },
];

export const aiProviders: AIProvider[] = [
  {
    name: 'Claude',
    company: 'Anthropic',
    logo: '/ai-icons/claude-logo.png',
    models: [
      { name: 'Sonnet 4', isDefault: true },
      { name: '3.5 Sonnet' },
      { name: '3.5 Haiku' },
      { name: '3 Opus' },
    ],
  },
  {
    name: 'Gemini',
    company: 'Google',
    logo: '/ai-icons/gemini-logo.png',
    models: [
      { name: '2.5 Flash', isDefault: true },
      { name: '2.5 Pro' },
      { name: '2.0 Flash' },
      { name: '2.0 Flash Lite' },
      { name: '1.5 Pro' },
      { name: '1.5 Flash' },
    ],
  },
  {
    name: 'OpenAI',
    company: 'OpenAI',
    logo: '/ai-icons/openai-logo.svg',
    models: [
      { name: 'GPT-4o Mini', isDefault: true },
      { name: 'GPT-4o' },
      { name: 'GPT-4 Turbo' },
      { name: 'o1' },
      { name: 'o1 Mini' },
      { name: 'o3 Mini' },
    ],
  },
];

export const aiModes: AIMode[] = [
  {
    id: 'summary',
    nameKey: 'ai.modes.summary',
    descKey: 'ai.modes.summaryDesc',
    words: '~200 words',
    time: '10 sec read',
    color: 'green',
  },
  {
    id: 'analysis',
    nameKey: 'ai.modes.analysis',
    descKey: 'ai.modes.analysisDesc',
    words: '400-600 words',
    time: '1-2 min read',
    color: 'blue',
  },
  {
    id: 'detailed',
    nameKey: 'ai.modes.detailed',
    descKey: 'ai.modes.detailedDesc',
    words: '800-1200 words',
    time: '3-5 min read',
    color: 'purple',
  },
];

export const steps: Step[] = [
  { number: 1, titleKey: 'howItWorks.step1.title', descKey: 'howItWorks.step1.desc' },
  { number: 2, titleKey: 'howItWorks.step2.title', descKey: 'howItWorks.step2.desc' },
  { number: 3, titleKey: 'howItWorks.step3.title', descKey: 'howItWorks.step3.desc' },
  { number: 4, titleKey: 'howItWorks.step4.title', descKey: 'howItWorks.step4.desc' },
];

export const iocTypes: IOCType[] = [
  { name: 'IPv4' },
  { name: 'IPv6' },
  { name: 'Domain' },
  { name: 'URL' },
  { name: 'MD5' },
  { name: 'SHA1' },
  { name: 'SHA256' },
  { name: 'Email' },
  { name: 'CVE' },
  { name: 'Bitcoin' },
  { name: 'Ethereum' },
];

export const stats: Stat[] = [
  { value: '11', labelKey: 'stats.iocTypes' },
  { value: '10', labelKey: 'stats.sources' },
  { value: '100%', labelKey: 'stats.privacy' },
  { value: '0', labelKey: 'stats.dataCollected' },
];

export const features = [
  { id: 'detection', titleKey: 'features.detection.title', descKey: 'features.detection.desc', icon: 'Search' },
  { id: 'search', titleKey: 'features.search.title', descKey: 'features.search.desc', icon: 'SearchCircle' },
  { id: 'privacy', titleKey: 'features.privacy.title', descKey: 'features.privacy.desc', icon: 'Shield' },
  { id: 'speed', titleKey: 'features.speed.title', descKey: 'features.speed.desc', icon: 'Flash' },
  { id: 'sources', titleKey: 'features.sources.title', descKey: 'features.sources.desc', icon: 'Book' },
  { id: 'matching', titleKey: 'features.matching.title', descKey: 'features.matching.desc', icon: 'CheckCircle' },
  { id: 'badges', titleKey: 'features.badges.title', descKey: 'features.badges.desc', icon: 'Badge' },
  { id: 'secure', titleKey: 'features.secure.title', descKey: 'features.secure.desc', icon: 'Lock' },
  { id: 'ui', titleKey: 'features.ui.title', descKey: 'features.ui.desc', icon: 'Sparks' },
];
