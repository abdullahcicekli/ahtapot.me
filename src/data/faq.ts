import { providers } from './constants';

export interface FaqItem {
  question: string;
  answer: string;
}

const providerNames = providers.map((p) => p.name).join(', ');

/* Single source for the FAQ: the visible accordion and the FAQPage JSON-LD
   schema both read from here, so the markup can never drift from the page
   again (Google requires marked-up FAQ content to be visible). */
export function getFaqItems(lang: 'en' | 'tr'): FaqItem[] {
  if (lang === 'en') {
    return [
      {
        question: 'What is Ahtapot IOC Analyzer Extension?',
        answer: `Ahtapot is a free, open-source IOC (Indicator of Compromise) analyzer browser extension for Chrome and Chromium-based browsers. It helps security professionals and SOC analysts analyze suspicious IPs, domains, URLs, and file hashes using ${providers.length} threat intelligence providers and AI-assisted analysis.`,
      },
      {
        question: 'Is Ahtapot free?',
        answer:
          'Yes. Ahtapot is completely free and open source. There are no premium tiers or subscriptions. You supply your own API keys for the providers and AI services you want to use.',
      },
      {
        question: 'Which browsers support Ahtapot?',
        answer: 'Chrome, Microsoft Edge, Brave, Arc, Vivaldi, Opera, and all Chromium-based browsers.',
      },
      {
        question: 'Which threat intelligence providers does Ahtapot support?',
        answer: `Ahtapot integrates with ${providers.length} threat intelligence providers: ${providerNames}.`,
      },
      {
        question: 'Does Ahtapot collect my data?',
        answer:
          'No. Ahtapot has a privacy-first architecture and collects no user data, browsing history, or analyzed indicators. API keys are stored locally in your browser, and the extension talks only to the providers you configure.',
      },
      {
        question: 'What types of IOCs can Ahtapot analyze?',
        answer:
          'IPv4 addresses, IPv6 addresses, domains, URLs, MD5 hashes, SHA1 hashes, SHA256 hashes, email addresses, CVE identifiers, Bitcoin addresses, and Ethereum addresses.',
      },
    ];
  }

  return [
    {
      question: 'Ahtapot IOC Analizci Eklentisi nedir?',
      answer: `Ahtapot, Chrome ve Chromium tabanlı tarayıcılar için ücretsiz, açık kaynaklı bir IOC analizci tarayıcı eklentisidir. Güvenlik profesyonellerinin ve SOC analistlerinin ${providers.length} tehdit istihbarat sağlayıcısı ve yapay zeka destekli analiz ile şüpheli IP, domain, URL ve dosya hashlerini incelemesine yardımcı olur.`,
    },
    {
      question: 'Ahtapot ücretsiz mi?',
      answer:
        'Evet. Ahtapot tamamen ücretsiz ve açık kaynaklıdır. Premium katman veya abonelik yoktur. Kullanmak istediğiniz sağlayıcılar ve yapay zeka hizmetleri için kendi API anahtarlarınızı sağlarsınız.',
    },
    {
      question: "Hangi tarayıcılar Ahtapot'u destekler?",
      answer: 'Chrome, Microsoft Edge, Brave, Arc, Vivaldi, Opera ve tüm Chromium tabanlı tarayıcılar.',
    },
    {
      question: 'Ahtapot hangi tehdit istihbarat sağlayıcılarını destekler?',
      answer: `Ahtapot ${providers.length} tehdit istihbarat sağlayıcısıyla entegredir: ${providerNames}.`,
    },
    {
      question: 'Ahtapot verilerimi topluyor mu?',
      answer:
        'Hayır. Ahtapot gizlilik öncelikli bir mimariye sahiptir; kullanıcı verisi, tarama geçmişi veya analiz edilen göstergeleri toplamaz. API anahtarları tarayıcınızda yerel olarak saklanır ve eklenti yalnızca yapılandırdığınız sağlayıcılarla iletişim kurar.',
    },
    {
      question: 'Ahtapot hangi IOC türlerini analiz edebilir?',
      answer:
        "IPv4 adresleri, IPv6 adresleri, domainler, URL'ler, MD5 hashleri, SHA1 hashleri, SHA256 hashleri, e-posta adresleri, CVE tanımlayıcıları, Bitcoin adresleri ve Ethereum adresleri.",
    },
  ];
}
