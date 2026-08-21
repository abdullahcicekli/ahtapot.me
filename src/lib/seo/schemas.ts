import { storeStats } from '@/data/store-stats';
import { providers } from '@/data/constants';
import { getFaqItems } from '@/data/faq';

const BASE_URL = 'https://ahtapot.me';
const STORE_URL =
  'https://chromewebstore.google.com/detail/ahtapot-ioc-analysis-tool/gmekhigahdiddngdhfdkeefcomcankpg';
const REPO_URL = 'https://github.com/abdullahcicekli/ahtapot';

type Lang = 'en' | 'tr';

const providerNames = providers.map((p) => p.name).join(', ');

export function buildSoftwareApplicationSchema(lang: Lang, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Ahtapot - IOC Analyzer Extension',
    applicationCategory: 'SecurityApplication',
    applicationSubCategory: 'Browser Security Extension',
    operatingSystem: 'Chrome, Chromium-based browsers, Edge, Brave, Arc, Vivaldi, Opera',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(storeStats.rating),
      ratingCount: String(storeStats.ratingCount),
      bestRating: '5',
      worstRating: '1',
    },
    description,
    featureList: [
      'AI-assisted analysis with Claude, Gemini and GPT (requires your own API key)',
      'MITRE ATT&CK mapping via AI analysis (requires your own API key)',
      `${providers.length} threat intelligence providers (${providerNames})`,
      'Smart IOC detection: IPv4, IPv6, Domain, URL, MD5, SHA1, SHA256, Email, CVE, Bitcoin, Ethereum',
      'Privacy-first architecture with no data collection',
      'Context menu analysis',
      'Configurable cache',
    ],
    author: { '@type': 'Person', name: 'Abdullah Cicekli', url: 'https://github.com/abdullahcicekli' },
    publisher: { '@type': 'Organization', name: 'Ahtapot', url: BASE_URL },
    url: `${BASE_URL}/${lang}/`,
    downloadUrl: STORE_URL,
    installUrl: STORE_URL,
    isAccessibleForFree: true,
    license: `${REPO_URL}/blob/main/LICENSE`,
    inLanguage: [lang, 'en', 'tr'],
  };
}

export function buildOrganizationSchema(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ahtapot',
    alternateName: ['Ahtapot IOC Analyzer', 'Ahtapot Security'],
    url: BASE_URL,
    logo: `${BASE_URL}/icons/android-chrome-512x512.png`,
    description:
      lang === 'en'
        ? 'Ahtapot is a free, open-source IOC analyzer browser extension for security professionals and SOC analysts.'
        : 'Ahtapot, güvenlik profesyonelleri ve SOC analistleri için ücretsiz, açık kaynaklı bir IOC analizci tarayıcı eklentisidir.',
    founder: { '@type': 'Person', name: 'Abdullah Cicekli', url: 'https://github.com/abdullahcicekli' },
    sameAs: [REPO_URL, STORE_URL],
  };
}

export function buildWebSiteSchema(lang: Lang, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ahtapot - IOC Analyzer Extension',
    alternateName: ['Ahtapot', 'IOC Analyzer', 'Ahtapot Eklentisi', 'IOC Analizci'],
    url: BASE_URL,
    description,
    inLanguage: [lang, 'en', 'tr'],
    publisher: { '@type': 'Organization', name: 'Ahtapot', url: BASE_URL },
  };
}

export function buildFaqSchema(lang: Lang) {
  // Same source as the visible FAQ section, so the schema always matches the page.
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: getFaqItems(lang).map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

export function buildHowToSchema(lang: Lang) {
  const steps =
    lang === 'en'
      ? [
          ['Install the extension', 'Install Ahtapot from the Chrome Web Store. It works on Chrome, Edge, Brave, and all Chromium-based browsers.'],
          ['Configure API keys', 'Open extension settings and add your API keys for the threat intelligence providers and AI services you want to use.'],
          ['Select and analyze', 'Select any text containing an indicator on any webpage, right-click, and choose "Analyze with Ahtapot".'],
          ['Review results', 'Review results from every provider that supports the indicator, and optionally run AI analysis for triage and MITRE ATT&CK mapping.'],
        ]
      : [
          ['Eklentiyi yükleyin', "Chrome Web Store'dan Ahtapot'u yükleyin. Chrome, Edge, Brave ve tüm Chromium tabanlı tarayıcılarda çalışır."],
          ['API anahtarlarını yapılandırın', 'Eklenti ayarlarını açın ve kullanmak istediğiniz tehdit istihbarat sağlayıcıları ve yapay zeka hizmetleri için API anahtarlarınızı ekleyin.'],
          ['Seçin ve analiz edin', 'Herhangi bir web sayfasında gösterge içeren metni seçin, sağ tıklayın ve "Ahtapot ile Analiz Et"i seçin.'],
          ['Sonuçları inceleyin', 'Göstergeyi destekleyen tüm sağlayıcılardan gelen sonuçları inceleyin; triage ve MITRE ATT&CK eşlemesi için isteğe bağlı yapay zeka analizini çalıştırın.'],
        ];

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: lang === 'en' ? 'How to use Ahtapot IOC Analyzer' : 'Ahtapot IOC Analizci nasıl kullanılır',
    step: steps.map(([name, text], i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name,
      text,
    })),
    totalTime: 'PT5M',
  };
}

export function buildAllSchemas(lang: Lang, description: string) {
  return [
    buildSoftwareApplicationSchema(lang, description),
    buildOrganizationSchema(lang),
    buildWebSiteSchema(lang, description),
    buildFaqSchema(lang),
    buildHowToSchema(lang),
  ];
}
