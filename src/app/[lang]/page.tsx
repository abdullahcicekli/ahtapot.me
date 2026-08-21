import { Hero, Providers, FeatureTabs, SocialProof, CTA } from '@/components/sections';

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }];
}

export default function LangPage() {
  return (
    <>
      <Hero />
      <Providers />
      <FeatureTabs />
      <SocialProof />
      <CTA />
    </>
  );
}
