import { storeStats } from '@/data/store-stats';
import { providers } from '@/data/constants';

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
      'AI-assisted analysis with Claude, Gemini and GPT',
      'MITRE ATT&CK mapping',
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
  const qa =
    lang === 'en'
      ? [
          ['What is Ahtapot IOC Analyzer Extension?',
           `Ahtapot is a free, open-source IOC (Indicator of Compromise) analyzer browser extension for Chrome and Chromium-based browsers. It helps security professionals and SOC analysts analyze suspicious IPs, domains, URLs, and file hashes using ${providers.length} threat intelligence providers and AI-assisted analysis.`],
          ['Is Ahtapot free?',
           'Yes. Ahtapot is completely free and open source. There are no premium tiers or subscriptions. You supply your own API keys for the providers and AI services you want to use.'],
          ['Which browsers support Ahtapot?',
           'Chrome, Microsoft Edge, Brave, Arc, Vivaldi, Opera, and all Chromium-based browsers.'],
          ['Which threat intelligence providers does Ahtapot support?',
           `Ahtapot integrates with ${providers.length} threat intelligence providers: ${providerNames}.`],
          ['Does Ahtapot collect my data?',
           'No. Ahtapot has a privacy-first architecture and collects no user data, browsing history, or analyzed indicators. API keys are stored locally in your browser, and the extension talks only to the providers you configure.'],
          ['What types of IOCs can Ahtapot analyze?',
           'IPv4 addresses, IPv6 addresses, domains, URLs, MD5 hashes, SHA1 hashes, SHA256 hashes, email addresses, CVE identifiers, Bitcoin addresses, and Ethereum addresses.'],
        ]
      : [
          ['Ahtapot IOC Analizci Eklentisi nedir?',
           `Ahtapot, Chrome ve Chromium tabanlı tarayıcılar için ücretsiz, açık kaynaklı bir IOC analizci tarayıcı eklentisidir. Güvenlik profesyonellerinin ve SOC analistlerinin ${providers.length} tehdit istihbarat sağlayıcısı ve yapay zeka destekli analiz ile şüpheli IP, domain, URL ve dosya hashlerini incelemesine yardımcı olur.`],
          ['Ahtapot ücretsiz mi?',
           'Evet. Ahtapot tamamen ücretsiz ve açık kaynaklıdır. Premium katman veya abonelik yoktur. Kullanmak istediğiniz sağlayıcılar ve yapay zeka hizmetleri için kendi API anahtarlarınızı sağlarsınız.'],
          ["Hangi tarayıcılar Ahtapot'u destekler?",
           'Chrome, Microsoft Edge, Brave, Arc, Vivaldi, Opera ve tüm Chromium tabanlı tarayıcılar.'],
          ['Ahtapot hangi tehdit istihbarat sağlayıcılarını destekler?',
           `Ahtapot ${providers.length} tehdit istihbarat sağlayıcısıyla entegredir: ${providerNames}.`],
          ['Ahtapot verilerimi topluyor mu?',
           'Hayır. Ahtapot gizlilik öncelikli bir mimariye sahiptir; kullanıcı verisi, tarama geçmişi veya analiz edilen göstergeleri toplamaz. API anahtarları tarayıcınızda yerel olarak saklanır ve eklenti yalnızca yapılandırdığınız sağlayıcılarla iletişim kurar.'],
          ['Ahtapot hangi IOC türlerini analiz edebilir?',
           "IPv4 adresleri, IPv6 adresleri, domainler, URL'ler, MD5 hashleri, SHA1 hashleri, SHA256 hashleri, e-posta adresleri, CVE tanımlayıcıları, Bitcoin adresleri ve Ethereum adresleri."],
        ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qa.map(([name, text]) => ({
      '@type': 'Question',
      name,
      acceptedAnswer: { '@type': 'Answer', text },
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
