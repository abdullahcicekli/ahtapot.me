'use client';

import Image from 'next/image';
import { OpenNewWindow, GitFork, Check } from 'iconoir-react';
import { useLanguage } from '@/lib/language-context';
import { useTheme } from '@/lib/theme-context';
import { Button, Badge } from '@/components/ui';
import { CHROME_STORE_URL, GITHUB_URL } from '@/data/constants';

export function Hero() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <section className="relative overflow-hidden min-h-screen">
      {/* Background Octopus */}
      <Image
        src="/images/octopus.png"
        alt=""
        width={800}
        height={800}
        className="absolute right-[-25%] bottom-[-10%] w-full opacity-15 dark:opacity-15 light:opacity-[0.08] pointer-events-none z-0 blur-[1px] animate-float"
        aria-hidden="true"
      />

      <div className="relative z-10 pt-32 pb-24 px-8 max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="text-center lg:text-left animate-fade-in">
          {/* Badges */}
          <div className="flex items-center gap-4 mb-6 flex-wrap justify-center lg:justify-start">
            <Badge>
              <Check width={16} height={16} className="text-success" />
              {t('hero.badge')}
            </Badge>
            <a
              href="https://www.producthunt.com/products/ahtapot"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:-translate-y-0.5 transition-transform"
            >
              <Image
                src={`https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1029486&theme=${theme}`}
                alt="Ahtapot on Product Hunt"
                width={200}
                height={40}
                unoptimized
              />
            </a>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            {t('hero.title1')}
            <br />
            <span className="gradient-text dark:text-primary">{t('hero.title2')}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-[var(--text-secondary)] mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
            {t('hero.subtitle')}
          </p>

          {/* Buttons */}
          <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
            <Button as="a" href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer">
              <OpenNewWindow width={20} height={20} />
              {t('hero.installBtn')}
            </Button>
            <Button as="a" href={GITHUB_URL} target="_blank" rel="noopener noreferrer" variant="secondary">
              <GitFork width={20} height={20} />
              {t('hero.githubBtn')}
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative flex items-center justify-center order-first lg:order-last">
          <Image
            src="/images/landing.png"
            alt="Ahtapot Extension Screenshot"
            width={600}
            height={400}
            className="w-full max-w-[600px] hover:scale-[1.02] transition-transform duration-300"
            priority
          />
        </div>
      </div>
    </section>
  );
}
