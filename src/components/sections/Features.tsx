'use client';

import {
  Search,
  AreaSearch,
  Shield,
  Flash,
  Book,
  CheckCircle,
  Medal,
  Lock,
  Sparks
} from 'iconoir-react';
import { useLanguage } from '@/lib/language-context';
import { SectionTitle, Card } from '@/components/ui';
import { features } from '@/data/constants';

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const iconMap: Record<string, IconComponent> = {
  Search,
  SearchCircle: AreaSearch,
  Shield,
  Flash,
  Book,
  CheckCircle,
  Badge: Medal,
  Lock,
  Sparks,
};

export function Features() {
  const { t } = useLanguage();

  return (
    <section id="features" className="py-16 px-8 max-w-[1200px] mx-auto">
      <SectionTitle>{t('features.title')}</SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {features.map((feature) => {
          const Icon = iconMap[feature.icon] || Search;
          return (
            <Card key={feature.id}>
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-4">
                <Icon width={24} height={24} className="text-primary-dark" />
              </div>
              <h3 className="font-semibold mb-3 text-lg text-[var(--text-primary)]">
                {t(feature.titleKey as any)}
              </h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                {t(feature.descKey as any)}
              </p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
