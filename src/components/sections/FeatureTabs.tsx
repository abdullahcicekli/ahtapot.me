'use client';

import { useLanguage } from '@/lib/language-context';
import { Section, Tabs, type TabItem } from '@/components/primitives';
import { DetectPanel, AnalyzePanel, AIPanel, PrivacyPanel } from '@/components/product/panels';
import { DetectIcon, AnalyzeIcon, AIIcon, PrivacyIcon } from '@/components/product/icons';

export function FeatureTabs() {
  const { t } = useLanguage();

  const items: TabItem[] = [
    { id: 'detect', label: t('product.tabs.detect'), icon: <DetectIcon /> },
    { id: 'analyze', label: t('product.tabs.analyze'), icon: <AnalyzeIcon /> },
    { id: 'ai', label: t('product.tabs.ai'), icon: <AIIcon /> },
    { id: 'privacy', label: t('product.tabs.privacy'), icon: <PrivacyIcon /> },
  ];

  return (
    <Section id="product">
      <h2 className="h2 mx-auto mb-14 max-w-[24ch] text-center text-ink md:mb-16">
        {t('product.title')}
      </h2>

      <Tabs items={items} panelClassName="md:p-12">
        {(active) => {
          switch (active) {
            case 'analyze':
              return <AnalyzePanel />;
            case 'ai':
              return <AIPanel />;
            case 'privacy':
              return <PrivacyPanel />;
            default:
              return <DetectPanel />;
          }
        }}
      </Tabs>
    </Section>
  );
}
