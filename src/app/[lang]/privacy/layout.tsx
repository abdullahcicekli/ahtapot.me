import type { Metadata } from 'next';

interface Props {
  children: React.ReactNode;
  params: { lang: string };
}

const privacyMetadata = {
  en: {
    title: 'Privacy Policy - Ahtapot IOC Analyzer Extension | Security & Data Protection',
    description: 'Privacy policy for Ahtapot Security Extension. Learn how we protect your privacy with our privacy-first architecture. No data collection, no tracking, 100% local storage.',
    keywords: 'ahtapot privacy policy,ahtapot data protection,ahtapot security,IOC analyzer privacy,browser extension privacy,chrome extension privacy,no data collection,privacy-first,GDPR compliant,CCPA compliant',
  },
  tr: {
    title: 'Gizlilik Politikası - Ahtapot IOC Analizci Eklentisi | Güvenlik ve Veri Koruma',
    description: 'Ahtapot Güvenlik Eklentisi gizlilik politikası. Gizlilik öncelikli mimarimizle verilerinizi nasıl koruduğumuzu öğrenin. Veri toplama yok, izleme yok, %100 yerel depolama.',
    keywords: 'ahtapot gizlilik politikası,ahtapot veri koruma,ahtapot güvenlik,IOC analizci gizlilik,tarayıcı eklentisi gizlilik,chrome eklentisi gizlilik,veri toplama yok,gizlilik öncelikli,GDPR uyumlu,KVKK uyumlu',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = params.lang as 'en' | 'tr';
  const meta = privacyMetadata[lang] || privacyMetadata.en;
  const baseUrl = 'https://ahtapot.me';

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/${lang}/privacy`,
      siteName: 'Ahtapot - IOC Analyzer Extension',
      locale: lang === 'en' ? 'en_US' : 'tr_TR',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: meta.title,
      description: meta.description,
    },
    alternates: {
      canonical: `${baseUrl}/${lang}/privacy`,
      languages: {
        'en': `${baseUrl}/en/privacy`,
        'tr': `${baseUrl}/tr/privacy`,
      },
    },
  };
}

export default function PrivacyLayout({ children }: Props) {
  return children;
}
