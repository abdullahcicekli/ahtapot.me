import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ThemeProvider } from '@/lib/theme-context';
import { LanguageProvider } from '@/lib/language-context';
import { Header, Footer } from '@/components/layout';

const locales = ['en', 'tr'] as const;
type Locale = (typeof locales)[number];

interface Props {
  children: React.ReactNode;
  params: { lang: string };
}

const seoData = {
  en: {
    title: 'Ahtapot - IOC Analyzer Browser Extension | Free Cyber Security Tool for SOC Analysts',
    description: 'Ahtapot is a free IOC analyzer browser extension for Chrome. AI-powered cyber security tool with Claude, Gemini, GPT-4o. Analyze IPs, domains, URLs, hashes instantly. 10 threat intelligence providers including VirusTotal, Shodan, GreyNoise. Best security extension for SOC analysts.',
    keywords: 'ahtapot,ahtapot extension,ahtapot browser extension,ahtapot chrome extension,ahtapot security,ahtapot ioc,IOC analyzer,IOC analysis tool,cyber security,cyber security extension,security extension,security tool,SOC extension,SOC tool,SOC analyst tool,threat intelligence,threat intel,malware analysis,VirusTotal,Shodan,GreyNoise,AbuseIPDB,AlienVault OTX,Pulsedive,Scamalytics,Chrome extension,browser security,free security tool,free IOC analyzer,IP lookup,domain lookup,hash analyzer,URL scanner,threat detection,MITRE ATT&CK,AI security,Claude AI,Gemini AI,GPT-4o,security analyst,blue team,incident response,forensics tool',
    ogTitle: 'Ahtapot - Free IOC Analyzer Extension | Cyber Security Tool for SOC',
    ogDescription: 'Free IOC analyzer browser extension. AI-powered cyber security tool with Claude, Gemini, GPT-4o. Analyze IPs, domains, hashes with 10 threat intel providers.',
  },
  tr: {
    title: 'Ahtapot - IOC Analizci Tarayıcı Eklentisi | SOC Analistleri İçin Ücretsiz Siber Güvenlik Aracı',
    description: 'Ahtapot, Chrome için ücretsiz IOC analizci tarayıcı eklentisidir. Claude, Gemini, GPT-4o ile yapay zeka destekli siber güvenlik aracı. IP, domain, URL, hash anında analiz. VirusTotal, Shodan, GreyNoise dahil 10 tehdit istihbarat sağlayıcısı. SOC analistleri için en iyi güvenlik eklentisi.',
    keywords: 'ahtapot,ahtapot eklentisi,ahtapot tarayıcı eklentisi,ahtapot chrome eklentisi,ahtapot güvenlik,ahtapot ioc,IOC analizci,IOC analiz aracı,siber güvenlik,siber güvenlik eklentisi,güvenlik eklentisi,güvenlik aracı,SOC eklentisi,SOC aracı,SOC analist aracı,tehdit istihbaratı,zararlı yazılım analizi,VirusTotal,Shodan,GreyNoise,AbuseIPDB,AlienVault OTX,Pulsedive,Scamalytics,Chrome eklentisi,tarayıcı güvenliği,ücretsiz güvenlik aracı,ücretsiz IOC analizci,IP sorgulama,domain sorgulama,hash analizci,URL tarayıcı,tehdit tespiti,MITRE ATT&CK,yapay zeka güvenlik,Claude AI,Gemini AI,GPT-4o,güvenlik analisti,mavi takım,olay müdahale,adli bilişim aracı',
    ogTitle: 'Ahtapot - Ücretsiz IOC Analizci Eklentisi | SOC İçin Siber Güvenlik Aracı',
    ogDescription: 'Ücretsiz IOC analizci tarayıcı eklentisi. Claude, Gemini, GPT-4o ile yapay zeka destekli. 10 tehdit istihbarat sağlayıcısı ile IP, domain, hash analizi.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = params.lang as Locale;

  if (!locales.includes(lang)) {
    return {};
  }

  const seo = seoData[lang];
  const baseUrl = 'https://ahtapot.me';

  return {
    metadataBase: new URL(baseUrl),
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: 'Abdullah Cicekli', url: 'https://github.com/abdullahcicekli' }],
    creator: 'Abdullah Cicekli',
    publisher: 'Ahtapot',
    formatDetection: { telephone: false },
    openGraph: {
      type: 'website',
      url: `${baseUrl}/${lang}/`,
      title: seo.ogTitle,
      description: seo.ogDescription,
      siteName: 'Ahtapot - IOC Analyzer Extension',
      locale: lang === 'en' ? 'en_US' : 'tr_TR',
      alternateLocale: lang === 'en' ? 'tr_TR' : 'en_US',
      images: [
        {
          url: '/images/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Ahtapot IOC Analyzer - Cyber Security Browser Extension',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.ogTitle,
      description: seo.ogDescription,
      images: ['/images/og-image.png'],
      creator: '@abdullahcicekli',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    icons: {
      icon: [
        { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      ],
      apple: '/icons/apple-touch-icon.png',
      shortcut: '/icons/favicon.ico',
    },
    alternates: {
      canonical: `${baseUrl}/${lang}/`,
      languages: {
        'en': `${baseUrl}/en/`,
        'tr': `${baseUrl}/tr/`,
        'x-default': `${baseUrl}/en/`,
      },
    },
    other: {
      'theme-color': '#1A1A1F',
      'msapplication-TileColor': '#1A1A1F',
    },
  };
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default function LangLayout({ children, params }: Props) {
  const lang = params.lang as Locale;

  if (!locales.includes(lang)) {
    notFound();
  }

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        {/* SoftwareApplication Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Ahtapot - IOC Analyzer Extension',
              alternateName: [
                'Ahtapot', 'Ahtapot Extension', 'Ahtapot Browser Extension',
                'Ahtapot Chrome Extension', 'Ahtapot IOC Analyzer', 'IOC Analyzer',
                'Cyber Security Extension', 'Security Extension', 'SOC Extension',
                'Ahtapot Eklentisi', 'Ahtapot Güvenlik', 'IOC Analizci',
                'Siber Güvenlik Eklentisi', 'Güvenlik Aracı', 'Tehdit Analiz Aracı',
              ],
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
                ratingValue: '5.0',
                ratingCount: '9',
                bestRating: '5',
                worstRating: '1',
              },
              description: seoData[lang].description,
              featureList: [
                '16 AI Models from Claude, Gemini, OpenAI',
                'AI-Powered Threat Analysis with MITRE ATT&CK Mapping',
                '10 Threat Intelligence Providers (VirusTotal, Shodan, GreyNoise, AbuseIPDB, etc.)',
                'Smart IOC Detection (11 Types: IPv4, IPv6, Domain, URL, MD5, SHA1, SHA256, Email, CVE, Bitcoin, Ethereum)',
                'Privacy-First Architecture - No Data Collection',
                'Real-time Context Menu Analysis',
                'Configurable Cache System',
                'Dark/Light Theme Support',
              ],
              screenshot: 'https://ahtapot.me/images/og-image.png',
              author: {
                '@type': 'Person',
                name: 'Abdullah Cicekli',
                url: 'https://github.com/abdullahcicekli',
              },
              publisher: {
                '@type': 'Organization',
                name: 'Ahtapot',
                url: 'https://ahtapot.me',
              },
              url: `https://ahtapot.me/${lang}/`,
              downloadUrl: 'https://chromewebstore.google.com/detail/ahtapot-ioc-analysis-tool/gmekhigahdiddngdhfdkeefcomcankpg',
              installUrl: 'https://chromewebstore.google.com/detail/ahtapot-ioc-analysis-tool/gmekhigahdiddngdhfdkeefcomcankpg',
              softwareVersion: '3.0.0',
              datePublished: '2024-01-01',
              dateModified: '2025-01-01',
              inLanguage: [lang, 'en', 'tr'],
              isAccessibleForFree: true,
              license: 'https://github.com/abdullahcicekli/ahtapot/blob/main/LICENSE',
              sourceOrganization: {
                '@type': 'Organization',
                name: 'Ahtapot Open Source Project',
                url: 'https://github.com/abdullahcicekli/ahtapot',
              },
            }),
          }}
        />
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Ahtapot',
              alternateName: ['Ahtapot IOC Analyzer', 'Ahtapot Security'],
              url: 'https://ahtapot.me',
              logo: 'https://ahtapot.me/images/ahtapot-logo-white.png',
              description: lang === 'en'
                ? 'Ahtapot is a free, open-source IOC analyzer browser extension for cyber security professionals and SOC analysts.'
                : 'Ahtapot, siber güvenlik profesyonelleri ve SOC analistleri için ücretsiz, açık kaynaklı bir IOC analizci tarayıcı eklentisidir.',
              founder: {
                '@type': 'Person',
                name: 'Abdullah Cicekli',
                url: 'https://github.com/abdullahcicekli',
              },
              sameAs: [
                'https://github.com/abdullahcicekli/ahtapot',
                'https://chromewebstore.google.com/detail/ahtapot-ioc-analysis-tool/gmekhigahdiddngdhfdkeefcomcankpg',
              ],
            }),
          }}
        />
        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Ahtapot - IOC Analyzer Extension',
              alternateName: ['Ahtapot', 'IOC Analyzer', 'Ahtapot Eklentisi', 'IOC Analizci'],
              url: 'https://ahtapot.me',
              description: seoData[lang].description,
              inLanguage: [lang, 'en', 'tr'],
              publisher: {
                '@type': 'Organization',
                name: 'Ahtapot',
                url: 'https://ahtapot.me',
              },
            }),
          }}
        />
        {/* FAQPage Schema - Expanded */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: lang === 'en' ? [
                {
                  '@type': 'Question',
                  name: 'What is Ahtapot IOC Analyzer Extension?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Ahtapot is a free, open-source IOC (Indicator of Compromise) analyzer browser extension for Chrome and Chromium-based browsers. It helps cyber security professionals and SOC analysts quickly analyze suspicious IPs, domains, URLs, and file hashes using 10 threat intelligence providers and 16 AI models.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Is Ahtapot a free security extension?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes, Ahtapot is completely free and open-source. There are no premium features, subscriptions, or hidden costs. You only need to provide your own API keys for the threat intelligence providers and AI services you want to use.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Which browsers support Ahtapot extension?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Ahtapot works on Chrome, Microsoft Edge, Brave, Arc, Vivaldi, Opera, and all Chromium-based browsers. It is available on the Chrome Web Store.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What threat intelligence providers does Ahtapot support?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Ahtapot integrates with 10 threat intelligence providers: VirusTotal, AlienVault OTX, AbuseIPDB, MalwareBazaar, ARIN, Shodan, GreyNoise, URLhaus, Pulsedive, and Scamalytics.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What AI models does Ahtapot support?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Ahtapot supports 16 AI models from 3 providers: Claude (Sonnet 4, 3.5 Sonnet, 3.5 Haiku, 3 Opus), Google Gemini (2.5 Flash, 2.5 Pro, 2.0 Flash, 2.0 Flash Lite, 1.5 Pro, 1.5 Flash), and OpenAI (GPT-4o Mini, GPT-4o, GPT-4 Turbo, o1, o1 Mini, o3 Mini).',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Does Ahtapot collect my data?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'No, Ahtapot has a privacy-first architecture. It does not collect any user data, browsing history, or analyzed IOCs. All API keys are stored locally in your browser. The extension only communicates with the threat intelligence providers and AI services you configure.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What types of IOCs can Ahtapot analyze?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Ahtapot can detect and analyze 11 types of IOCs: IPv4 addresses, IPv6 addresses, Domains, URLs, MD5 hashes, SHA1 hashes, SHA256 hashes, Email addresses, CVE identifiers, Bitcoin addresses, and Ethereum addresses.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How do I use Ahtapot?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Simply select any text containing an IOC on any webpage, right-click, and choose "Analyze with Ahtapot". The extension will automatically detect the IOC type and query your configured threat intelligence providers. You can also use AI analysis for deeper insights.',
                  },
                },
              ] : [
                {
                  '@type': 'Question',
                  name: 'Ahtapot IOC Analizci Eklentisi Nedir?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Ahtapot, Chrome ve Chromium tabanlı tarayıcılar için ücretsiz, açık kaynaklı bir IOC (Indicator of Compromise) analizci tarayıcı eklentisidir. Siber güvenlik profesyonellerinin ve SOC analistlerinin 10 tehdit istihbarat sağlayıcısı ve 16 yapay zeka modeli kullanarak şüpheli IP, domain, URL ve dosya hashlerini hızlıca analiz etmesine yardımcı olur.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Ahtapot ücretsiz mi?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Evet, Ahtapot tamamen ücretsiz ve açık kaynaklıdır. Premium özellik, abonelik veya gizli maliyet yoktur. Sadece kullanmak istediğiniz tehdit istihbarat sağlayıcıları ve yapay zeka hizmetleri için kendi API anahtarlarınızı sağlamanız gerekir.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Hangi tarayıcılar Ahtapot\'u destekler?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Ahtapot; Chrome, Microsoft Edge, Brave, Arc, Vivaldi, Opera ve tüm Chromium tabanlı tarayıcılarda çalışır. Chrome Web Store\'dan indirilebilir.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Ahtapot hangi tehdit istihbarat sağlayıcılarını destekler?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Ahtapot 10 tehdit istihbarat sağlayıcısıyla entegredir: VirusTotal, AlienVault OTX, AbuseIPDB, MalwareBazaar, ARIN, Shodan, GreyNoise, URLhaus, Pulsedive ve Scamalytics.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Ahtapot hangi yapay zeka modellerini destekler?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Ahtapot 3 sağlayıcıdan 16 yapay zeka modelini destekler: Claude (Sonnet 4, 3.5 Sonnet, 3.5 Haiku, 3 Opus), Google Gemini (2.5 Flash, 2.5 Pro, 2.0 Flash, 2.0 Flash Lite, 1.5 Pro, 1.5 Flash) ve OpenAI (GPT-4o Mini, GPT-4o, GPT-4 Turbo, o1, o1 Mini, o3 Mini).',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Ahtapot verilerimi topluyor mu?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Hayır, Ahtapot gizlilik öncelikli bir mimariye sahiptir. Kullanıcı verisi, tarama geçmişi veya analiz edilen IOC\'leri toplamaz. Tüm API anahtarları tarayıcınızda yerel olarak saklanır. Eklenti yalnızca yapılandırdığınız tehdit istihbarat sağlayıcıları ve yapay zeka hizmetleriyle iletişim kurar.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Ahtapot hangi IOC türlerini analiz edebilir?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Ahtapot 11 IOC türünü tespit edip analiz edebilir: IPv4 adresleri, IPv6 adresleri, Domainler, URL\'ler, MD5 hashleri, SHA1 hashleri, SHA256 hashleri, E-posta adresleri, CVE tanımlayıcıları, Bitcoin adresleri ve Ethereum adresleri.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Ahtapot nasıl kullanılır?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Herhangi bir web sayfasında IOC içeren metni seçin, sağ tıklayın ve "Ahtapot ile Analiz Et"i seçin. Eklenti otomatik olarak IOC türünü tespit edecek ve yapılandırdığınız tehdit istihbarat sağlayıcılarını sorgulayacaktır. Daha derin içgörüler için yapay zeka analizini de kullanabilirsiniz.',
                  },
                },
              ],
            }),
          }}
        />
        {/* Individual Review Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Review',
                itemReviewed: {
                  '@type': 'SoftwareApplication',
                  name: 'Ahtapot - IOC Analyzer Extension',
                },
                author: { '@type': 'Person', name: 'Halil Enes Özdemir' },
                reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
                reviewBody: "Absolutely love this extension! It's simple, fast, and works exactly as promised. Highly recommend it!",
                publisher: { '@type': 'Organization', name: 'Chrome Web Store' },
              },
              {
                '@context': 'https://schema.org',
                '@type': 'Review',
                itemReviewed: {
                  '@type': 'SoftwareApplication',
                  name: 'Ahtapot - IOC Analyzer Extension',
                },
                author: { '@type': 'Person', name: 'Mehmet Kadir Cırık' },
                reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
                reviewBody: 'Özellikle SOC alanında çalışanlar için çok kullanışlı ve verimli bir araç. Kullanım kolaylığı ve hızlı sonuç alma özelliği harika.',
                publisher: { '@type': 'Organization', name: 'Chrome Web Store' },
              },
              {
                '@context': 'https://schema.org',
                '@type': 'Review',
                itemReviewed: {
                  '@type': 'SoftwareApplication',
                  name: 'Ahtapot - IOC Analyzer Extension',
                },
                author: { '@type': 'Person', name: 'Sueda Çiçekli' },
                reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
                reviewBody: 'Great tool for quick IOC analysis. Simple, fast, and privacy-focused. Well done!',
                publisher: { '@type': 'Organization', name: 'Chrome Web Store' },
              },
              {
                '@context': 'https://schema.org',
                '@type': 'Review',
                itemReviewed: {
                  '@type': 'SoftwareApplication',
                  name: 'Ahtapot - IOC Analyzer Extension',
                },
                author: { '@type': 'Person', name: 'Furkan Doğmuş' },
                reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
                reviewBody: "It's a good extension for end-users. Makes IOC analysis accessible to everyone.",
                publisher: { '@type': 'Organization', name: 'Chrome Web Store' },
              },
              {
                '@context': 'https://schema.org',
                '@type': 'Review',
                itemReviewed: {
                  '@type': 'SoftwareApplication',
                  name: 'Ahtapot - IOC Analyzer Extension',
                },
                author: { '@type': 'Person', name: 'Altuğ Tekiner' },
                reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
                reviewBody: 'Elinize emeğinize sağlık. Çok iyi bir eklenti olmuş!',
                publisher: { '@type': 'Organization', name: 'Chrome Web Store' },
              },
              {
                '@context': 'https://schema.org',
                '@type': 'Review',
                itemReviewed: {
                  '@type': 'SoftwareApplication',
                  name: 'Ahtapot - IOC Analyzer Extension',
                },
                author: { '@type': 'Person', name: 'Ömer Faruk Çiçekli' },
                reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
                reviewBody: 'Çok iyi bir eklenti. Faydalı bir extension!',
                publisher: { '@type': 'Organization', name: 'Chrome Web Store' },
              },
              {
                '@context': 'https://schema.org',
                '@type': 'Review',
                itemReviewed: {
                  '@type': 'SoftwareApplication',
                  name: 'Ahtapot - IOC Analyzer Extension',
                },
                author: { '@type': 'Person', name: 'Muaz Memiş' },
                reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
                reviewBody: 'Çok iyi bir eklenti',
                publisher: { '@type': 'Organization', name: 'Chrome Web Store' },
              },
            ]),
          }}
        />
        {/* HowTo Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'HowTo',
              name: lang === 'en' ? 'How to Use Ahtapot IOC Analyzer' : 'Ahtapot IOC Analizci Nasıl Kullanılır',
              description: lang === 'en'
                ? 'Learn how to analyze IOCs (Indicators of Compromise) using the Ahtapot browser extension.'
                : 'Ahtapot tarayıcı eklentisini kullanarak IOC\'leri (Indicator of Compromise) nasıl analiz edeceğinizi öğrenin.',
              step: lang === 'en' ? [
                {
                  '@type': 'HowToStep',
                  position: 1,
                  name: 'Install the Extension',
                  text: 'Install Ahtapot from the Chrome Web Store. It works on Chrome, Edge, Brave, and all Chromium-based browsers.',
                },
                {
                  '@type': 'HowToStep',
                  position: 2,
                  name: 'Configure API Keys',
                  text: 'Open extension settings and add your API keys for threat intelligence providers (VirusTotal, Shodan, etc.) and AI services (Claude, Gemini, OpenAI).',
                },
                {
                  '@type': 'HowToStep',
                  position: 3,
                  name: 'Select and Analyze',
                  text: 'Select any text containing an IOC (IP, domain, URL, hash) on any webpage, right-click, and choose "Analyze with Ahtapot".',
                },
                {
                  '@type': 'HowToStep',
                  position: 4,
                  name: 'Review Results',
                  text: 'View comprehensive analysis results from multiple threat intelligence sources. Optionally use AI analysis for deeper insights and MITRE ATT&CK mapping.',
                },
              ] : [
                {
                  '@type': 'HowToStep',
                  position: 1,
                  name: 'Eklentiyi Yükleyin',
                  text: 'Chrome Web Store\'dan Ahtapot\'u yükleyin. Chrome, Edge, Brave ve tüm Chromium tabanlı tarayıcılarda çalışır.',
                },
                {
                  '@type': 'HowToStep',
                  position: 2,
                  name: 'API Anahtarlarını Yapılandırın',
                  text: 'Eklenti ayarlarını açın ve tehdit istihbarat sağlayıcıları (VirusTotal, Shodan, vb.) ve yapay zeka hizmetleri (Claude, Gemini, OpenAI) için API anahtarlarınızı ekleyin.',
                },
                {
                  '@type': 'HowToStep',
                  position: 3,
                  name: 'Seçin ve Analiz Edin',
                  text: 'Herhangi bir web sayfasında IOC (IP, domain, URL, hash) içeren metni seçin, sağ tıklayın ve "Ahtapot ile Analiz Et"i seçin.',
                },
                {
                  '@type': 'HowToStep',
                  position: 4,
                  name: 'Sonuçları İnceleyin',
                  text: 'Birden fazla tehdit istihbarat kaynağından kapsamlı analiz sonuçlarını görüntüleyin. Daha derin içgörüler ve MITRE ATT&CK eşlemesi için isteğe bağlı olarak yapay zeka analizini kullanın.',
                },
              ],
              totalTime: 'PT5M',
            }),
          }}
        />
        {/* BreadcrumbList Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: `https://ahtapot.me/${lang}/`,
                },
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <LanguageProvider initialLang={lang}>
            <Header />
            <main>{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
