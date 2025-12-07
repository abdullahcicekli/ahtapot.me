'use client';

import { ChatBubble, StarSolid } from 'iconoir-react';
import { useLanguage } from '@/lib/language-context';
import { SectionTitle, Badge, Card, Avatar } from '@/components/ui';
import { testimonials } from '@/data/constants';

export function Testimonials() {
  const { t } = useLanguage();

  // Split testimonials into columns for waterfall effect
  const columns = [
    testimonials.filter((_, i) => i % 3 === 0),
    testimonials.filter((_, i) => i % 3 === 1),
    testimonials.filter((_, i) => i % 3 === 2),
  ];

  return (
    <section className="py-20 px-8 bg-[var(--bg-primary)]">
      <div className="max-w-[1200px] mx-auto text-center">
        <Badge variant="accent" className="mx-auto flex w-fit mb-6">
          <ChatBubble width={16} height={16} />
          {t('testimonials.badge')}
        </Badge>

        <SectionTitle>{t('testimonials.title')}</SectionTitle>

        <p className="text-[var(--text-secondary)] text-lg max-w-[600px] mx-auto mb-12 leading-relaxed">
          {t('testimonials.subtitle')}
        </p>

        {/* Waterfall Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-6">
              {column.map((testimonial, index) => (
                <Card
                  key={testimonial.id}
                  className="text-left"
                  style={{
                    animationDelay: `${(colIndex * 100) + (index * 150)}ms`,
                  } as React.CSSProperties}
                >
                  <p className="text-[var(--text-primary)] text-sm leading-relaxed mb-5 italic">
                    <span className="text-primary text-2xl font-bold mr-1">&ldquo;</span>
                    {testimonial.quote}
                    <span className="text-primary text-2xl font-bold ml-1">&rdquo;</span>
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar name={testimonial.author} color={testimonial.avatarColor} />
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-[var(--text-primary)]">
                        {testimonial.author}
                      </span>
                      <span className="text-xs text-[var(--text-muted)]">
                        {testimonial.source}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center justify-center gap-2 mt-10 pt-8 border-t border-[var(--border)]">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <StarSolid key={i} width={20} height={20} className="text-primary" />
            ))}
          </div>
          <span className="text-[var(--text-secondary)]">
            <strong className="text-[var(--text-primary)]">5.0</strong> rating from{' '}
            <strong className="text-[var(--text-primary)]">9</strong> reviews on Chrome Web Store
          </span>
        </div>
      </div>
    </section>
  );
}
