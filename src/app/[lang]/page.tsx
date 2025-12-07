import {
  Hero,
  HowItWorks,
  Features,
  AIAnalysis,
  IOCTypes,
  Stats,
  Testimonials,
  Providers,
  Feedback,
} from '@/components/sections';

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }];
}

export default function LangPage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <AIAnalysis />
      <IOCTypes />
      <Stats />
      <Testimonials />
      <Providers />
      <Feedback />
    </>
  );
}
