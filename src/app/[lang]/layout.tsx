import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LanguageProvider } from '@/lib/language-context';
import { Header, Footer } from '@/components/layout';
import { buildAllSchemas } from '@/lib/seo/schemas';

const locales = ['en', 'tr'] as const;
type Locale = (typeof locales)[number];

interface Props {
  children: React.ReactNode;
  params: { lang: string };
}

const seoData = {
  en: {
    title: 'Ahtapot - IOC Analyzer Browser Extension | Free Cyber Security Tool for SOC Analysts',
    description: 'Ahtapot is a free IOC analyzer browser extension for Chrome. AI-powered cyber security tool with Claude, Gemini, GPT. Analyze IPs, domains, URLs, hashes instantly. threat intelligence providers including VirusTotal, Shodan, GreyNoise. Best security extension for SOC analysts.',
    keywords: 'ahtapot,ahtapot extension,ahtapot browser extension,ahtapot chrome extension,ahtapot security,ahtapot ioc,IOC analyzer,IOC analysis tool,cyber security,cyber security extension,security extension,security tool,SOC extension,SOC tool,SOC analyst tool,threat intelligence,threat intel,malware analysis,VirusTotal,Shodan,GreyNoise,AbuseIPDB,AlienVault OTX,Pulsedive,Scamalytics,Chrome extension,browser security,free security tool,free IOC analyzer,IP lookup,domain lookup,hash analyzer,URL scanner,threat detection,MITRE ATT&CK,AI security,Claude AI,Gemini AI,security analyst,blue team,incident response,forensics tool',
    ogTitle: 'Ahtapot - Free IOC Analyzer Extension | Cyber Security Tool for SOC',
    ogDescription: 'Free IOC analyzer browser extension. AI-powered cyber security tool with Claude, Gemini, GPT. Analyze IPs, domains, hashes with threat intel providers.',
  },
  tr: {
    title: 'Ahtapot - IOC Analizci Tarayıcı Eklentisi | SOC Analistleri İçin Ücretsiz Siber Güvenlik Aracı',
    description: 'Ahtapot, Chrome için ücretsiz IOC analizci tarayıcı eklentisidir. Claude, Gemini, GPT ile yapay zeka destekli siber güvenlik aracı. IP, domain, URL, hash anında analiz. VirusTotal, Shodan, GreyNoise dahil tehdit istihbarat sağlayıcıları. SOC analistleri için en iyi güvenlik eklentisi.',
    keywords: 'ahtapot,ahtapot eklentisi,ahtapot tarayıcı eklentisi,ahtapot chrome eklentisi,ahtapot güvenlik,ahtapot ioc,IOC analizci,IOC analiz aracı,siber güvenlik,siber güvenlik eklentisi,güvenlik eklentisi,güvenlik aracı,SOC eklentisi,SOC aracı,SOC analist aracı,tehdit istihbaratı,zararlı yazılım analizi,VirusTotal,Shodan,GreyNoise,AbuseIPDB,AlienVault OTX,Pulsedive,Scamalytics,Chrome eklentisi,tarayıcı güvenliği,ücretsiz güvenlik aracı,ücretsiz IOC analizci,IP sorgulama,domain sorgulama,hash analizci,URL tarayıcı,tehdit tespiti,MITRE ATT&CK,yapay zeka güvenlik,Claude AI,Gemini AI,güvenlik analisti,mavi takım,olay müdahale,adli bilişim aracı',
    ogTitle: 'Ahtapot - Ücretsiz IOC Analizci Eklentisi | SOC İçin Siber Güvenlik Aracı',
    ogDescription: 'Ücretsiz IOC analizci tarayıcı eklentisi. Claude, Gemini, GPT ile yapay zeka destekli. tehdit istihbarat sağlayıcıları ile IP, domain, hash analizi.',
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
      'theme-color': '#0B0B0D',
      'msapplication-TileColor': '#0B0B0D',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildAllSchemas(lang, seoData[lang].description)),
          }}
        />
      </head>
      <body className="antialiased">
        <LanguageProvider initialLang={lang}>
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
