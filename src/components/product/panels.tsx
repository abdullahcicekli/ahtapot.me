'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language-context';
import { Box } from '@/components/primitives';
import { IOCPanel } from '@/components/product/IOCPanel';
import { heroFixture, aiFixture } from '@/components/product/fixtures';
import { providers } from '@/data/constants';
import { cn } from '@/lib/utils';

// The eleven indicator types the content script recognises on select + right-click.
// This is the page's only SEO surface for these terms, so they render as literal chips.
const INDICATOR_TYPES = [
  'IPv4', 'IPv6', 'Domain', 'URL', 'MD5', 'SHA1', 'SHA256', 'Email', 'CVE', 'Bitcoin', 'Ethereum',
] as const;

const MATCHED_INDICATOR = 'IPv4';

const AI_MODES = ['summary', 'analysis', 'detailed'] as const;
type AIMode = (typeof AI_MODES)[number];

const AI_MODE_LABEL: Record<AIMode, string> = {
  summary: 'Summary',
  analysis: 'Analysis',
  detailed: 'Detailed',
};

export function DetectPanel() {
  const { t } = useLanguage();
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <p className="text-[14px] leading-relaxed text-ink-2">{t('product.detect.desc')}</p>
      <Box tone="card" className="flex flex-wrap gap-2 p-4" aria-hidden="true">
        {INDICATOR_TYPES.map((type) => {
          const matched = type === MATCHED_INDICATOR;
          return (
            <span
              key={type}
              lang="en"
              className={cn(
                'label rounded-control border px-2.5 py-1.5 transition-colors',
                matched
                  ? 'border-hairline-hi bg-input text-ink'
                  : 'border-transparent text-ink-3',
              )}
            >
              {type}
            </span>
          );
        })}
      </Box>
    </div>
  );
}

export function AnalyzePanel() {
  const { t } = useLanguage();
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <p className="text-[14px] leading-relaxed text-ink-2">{t('product.analyze.desc')}</p>
      <IOCPanel fixture={heroFixture} />
    </div>
  );
}

export function AIPanel() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<AIMode>('summary');

  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <p className="text-[14px] leading-relaxed text-ink-2">{t('product.ai.desc')}</p>

      <Box tone="card" className="space-y-3 p-4">
        <div role="group" aria-label="AI analysis depth" className="flex gap-1.5">
          {AI_MODES.map((m) => (
            <button
              key={m}
              type="button"
              lang="en"
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={cn(
                'label rounded-control border px-2.5 py-1.5 transition-colors',
                mode === m
                  ? 'border-hairline-hi bg-input text-ink'
                  : 'border-transparent text-ink-3 hover:text-ink-2',
              )}
            >
              {AI_MODE_LABEL[m]}
            </button>
          ))}
        </div>

        <div className="space-y-2 border-t border-hairline pt-3">
          <div className="flex items-center justify-between gap-3">
            <span lang="en" className="label text-ink">
              {aiFixture.verdict}
            </span>
            <span className="font-mono text-[12px] text-ink-2">{aiFixture.headline}</span>
          </div>

          {mode !== 'summary' && (
            <p className="text-[12px] text-ink-3">
              <span lang="en" className="label">MITRE ATT&CK</span>{' '}
              <span className="font-mono">{aiFixture.tags[1]}</span>
            </p>
          )}

          {mode === 'detailed' && (
            <p className="font-mono text-[12px] text-ink-3">
              event.category:network AND cve:&quot;{aiFixture.query}&quot;
            </p>
          )}
        </div>
      </Box>
    </div>
  );
}

const MASKED_KEYS = ['••••••••a1f3', '••••••••7c2e', '••••••••9b4d'];

export function PrivacyPanel() {
  const { t } = useLanguage();
  const keys = providers.slice(0, 3);

  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <p className="text-[14px] leading-relaxed text-ink-2">{t('product.privacy.desc')}</p>
      <Box tone="card" className="space-y-1.5 p-4" aria-hidden="true">
        {keys.map((provider, index) => (
          <div key={provider.name} className="flex items-center justify-between gap-3">
            <span lang="en" className="label text-ink-3">
              {provider.name}
            </span>
            <span className="font-mono text-[12px] text-ink-2">{MASKED_KEYS[index]}</span>
          </div>
        ))}
      </Box>
    </div>
  );
}
