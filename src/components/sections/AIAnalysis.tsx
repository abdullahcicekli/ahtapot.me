'use client';

import Image from 'next/image';
import { Cpu, Shield, Clock, Page, Search, Box } from 'iconoir-react';
import { useLanguage } from '@/lib/language-context';
import { SectionTitle, Badge, Card } from '@/components/ui';
import { aiProviders, aiModes } from '@/data/constants';

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const modeIcons: Record<string, IconComponent> = {
  summary: Page,
  analysis: Search,
  detailed: Box,
};

export function AIAnalysis() {
  const { t } = useLanguage();

  const aiFeatures = [
    { icon: Cpu, titleKey: 'ai.feature1.title', descKey: 'ai.feature1.desc' },
    { icon: Shield, titleKey: 'ai.feature2.title', descKey: 'ai.feature2.desc' },
    { icon: Clock, titleKey: 'ai.feature3.title', descKey: 'ai.feature3.desc' },
  ];

  return (
    <section className="py-20 px-8 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-[20%] w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-[20%] w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        <Badge variant="accent" className="mx-auto flex w-fit mb-6">
          <Cpu width={16} height={16} />
          {t('ai.badge')}
        </Badge>

        <SectionTitle>{t('ai.title')}</SectionTitle>

        <p className="text-center text-[var(--text-secondary)] text-lg max-w-[700px] mx-auto mb-12 leading-relaxed">
          {t('ai.subtitle')}
        </p>

        {/* AI Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {aiFeatures.map((feature) => (
            <Card key={feature.titleKey} className="text-center">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <feature.icon width={24} height={24} className="text-primary-dark" />
              </div>
              <h3 className="font-semibold mb-2 text-[var(--text-primary)]">
                {t(feature.titleKey as any)}
              </h3>
              <p className="text-[var(--text-secondary)] text-sm">
                {t(feature.descKey as any)}
              </p>
            </Card>
          ))}
        </div>

        {/* AI Providers */}
        <div className="mb-12">
          <h3 className="text-center text-xl font-semibold mb-6 text-[var(--text-primary)]">
            {t('ai.providers.title')}
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {aiProviders.map((provider) => (
              <Card key={provider.name} className="min-w-[280px] max-w-[360px] flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={provider.logo}
                    alt={provider.name}
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                  <div>
                    <div className="font-semibold text-[var(--text-primary)]">{provider.name}</div>
                    <div className="text-xs text-[var(--text-secondary)]">{provider.company}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {provider.models.map((model) => (
                    <span
                      key={model.name}
                      className={`text-xs px-2 py-1 rounded border ${
                        model.isDefault
                          ? 'bg-[var(--accent-dim)] border-primary text-primary'
                          : 'bg-white/5 border-[var(--border)] text-[var(--text-secondary)]'
                      }`}
                    >
                      {model.name}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Modes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aiModes.map((mode) => {
            const Icon = modeIcons[mode.id] || Page;
            const colorClasses: Record<string, string> = {
              green: 'hover:border-success',
              blue: 'hover:border-sky-400',
              purple: 'hover:border-violet-400',
            };
            return (
              <Card key={mode.id} className={colorClasses[mode.color]}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Icon width={20} height={20} className="text-primary-dark" />
                  </div>
                  <span className="font-bold text-lg text-[var(--text-primary)]">
                    {t(mode.nameKey as any)}
                  </span>
                </div>
                <div className="flex gap-2 text-[var(--text-muted)] text-sm mb-3 pointer-events-none select-none">
                  <span>{mode.words}</span>
                  <span>•</span>
                  <span>{mode.time}</span>
                </div>
                <p className="text-[var(--text-secondary)] text-sm">
                  {t(mode.descKey as any)}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
