'use client';

import { useLanguage } from '@/lib/language-context';
import { Section, Tabs, type TabItem } from '@/components/primitives';
import { DetectPanel, AnalyzePanel, AIPanel, PrivacyPanel } from '@/components/product/panels';

export function FeatureTabs() {
  const { t } = useLanguage();

  const items: TabItem[] = [
    { id: 'detect', label: t('product.tabs.detect') },
    { id: 'analyze', label: t('product.tabs.analyze') },
    { id: 'ai', label: t('product.tabs.ai') },
    { id: 'privacy', label: t('product.tabs.privacy') },
  ];

  return (
    <Section id="product">
      <h2 className="h2 mb-14 text-ink">{t('product.title')}</h2>

      <Tabs items={items}>
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
