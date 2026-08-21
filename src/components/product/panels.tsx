'use client';

import { useState, type ReactNode } from 'react';
import { useLanguage } from '@/lib/language-context';
import { IOCPanel } from '@/components/product/IOCPanel';
import { WindowCard } from '@/components/product/WindowCard';
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

// Matches what AIService's detection_engineering.suggested_rules field actually holds:
// a rule description or pseudocode, not a formatted, named hunting query.
const AI_RULE_SUGGESTION =
  'IF signature == "CVE-2024-3400" AND protocol == "PAN-OS" THEN escalate';

/* Shared panel skeleton: the visual composition fills the shell, the copy sits
   centered underneath it, the way the reference site anchors each tab. */
function PanelShell({ title, desc, children }: { title: string; desc: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex-1">{children}</div>
      <div className="mx-auto w-full max-w-xl text-center">
        <h3 className="text-[17px] font-medium text-ink">{title}</h3>
        <p className="mt-2 text-[14px] leading-relaxed text-ink-2">{desc}</p>
      </div>
    </div>
  );
}

/* Decorative skeleton line standing in for page text in the mockups. */
function TextLine({ className }: { className?: string }) {
  return <span className={cn('block h-2 rounded-full bg-input', className)} />;
}

export function DetectPanel() {
  const { t } = useLanguage();
  return (
    <PanelShell title={t('product.tabs.detect')} desc={t('product.detect.desc')}>
      <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
        <WindowCard title="any page" bodyClassName="space-y-3 p-5" className="lg:translate-y-3">
          <TextLine className="w-11/12" />
          <TextLine className="w-2/3" />
          <p lang="en" className="font-mono text-[13px] leading-relaxed text-ink-2">
            …callback to{' '}
            <mark className="rounded-[4px] bg-input px-1 py-0.5 font-mono text-ink">
              198.51.100.23
            </mark>{' '}
            over port 443…
          </p>
          <TextLine className="w-3/4" />
          <div lang="en" className="ml-auto w-56 overflow-hidden rounded-control border border-hairline-hi bg-input py-1 shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
            <span className="block px-3 py-1.5 font-mono text-[12px] text-ink-3">Copy</span>
            <span className="block px-3 py-1.5 font-mono text-[12px] text-ink-3">Search with Google</span>
            <span className="mx-3 my-1 block h-px bg-hairline" />
            <span className="block px-3 py-1.5 font-mono text-[12px] text-ink">
              Analyze with Ahtapot
            </span>
          </div>
        </WindowCard>

        <WindowCard title="recognized indicator types" bodyClassName="flex flex-wrap gap-2 p-5">
          {INDICATOR_TYPES.map((type) => {
            const matched = type === MATCHED_INDICATOR;
            return (
              <span
                key={type}
                lang="en"
                className={cn(
                  'label rounded-control border px-2.5 py-1.5',
                  matched
                    ? 'border-hairline-hi bg-input text-ink'
                    : 'border-hairline text-ink-3',
                )}
              >
                {type}
              </span>
            );
          })}
        </WindowCard>
      </div>
    </PanelShell>
  );
}

export function AnalyzePanel() {
  const { t } = useLanguage();
  const tabProviders = providers.slice(0, 4);

  return (
    <PanelShell title={t('product.tabs.analyze')} desc={t('product.analyze.desc')}>
      <WindowCard title="side panel" className="mx-auto w-full max-w-xl" bodyClassName="space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {tabProviders.map((provider, index) => (
            <span
              key={provider.name}
              lang="en"
              className={cn(
                'label rounded-control border px-2.5 py-1.5',
                index === 0
                  ? 'border-hairline-hi bg-input text-ink'
                  : 'border-transparent text-ink-3',
              )}
            >
              {provider.name}
            </span>
          ))}
          <span lang="en" className="label self-center px-1 text-ink-3">
            +{providers.length - tabProviders.length}
          </span>
        </div>
        <IOCPanel fixture={heroFixture} className="border-none bg-transparent p-0" />
      </WindowCard>
    </PanelShell>
  );
}

export function AIPanel() {
  const { t } = useLanguage();
  // Analysis, not Summary, is the default: it is the more representative depth and
  // gives the panel a substantial first paint without requiring a click.
  const [mode, setMode] = useState<AIMode>('analysis');

  return (
    <PanelShell title={t('product.tabs.ai')} desc={t('product.ai.desc')}>
      <WindowCard title="ai analysis" interactive className="mx-auto w-full max-w-xl" bodyClassName="space-y-3">
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

        {/* The tag row (which carries the MITRE technique id) is part of IOCPanel
            and renders in every mode, compact or not, so the ATT&CK mapping persists
            across all three depths rather than appearing only after a click. */}
        <IOCPanel fixture={aiFixture} compact={mode === 'summary'} className="border-none bg-transparent p-0" />

        {mode !== 'summary' && (
          <div className="space-y-1 rounded-card border border-hairline bg-card p-4">
            {/* Translated label, not a literal English product term, so no lang="en" */}
            <span className="label text-ink-3">{t('product.ai.ruleLabel')}</span>
            <p lang="en" className="font-mono text-[12px] text-ink-2">{AI_RULE_SUGGESTION}</p>
          </div>
        )}
      </WindowCard>
    </PanelShell>
  );
}

const MASKED_KEYS = ['••••••••a1f3', '••••••••7c2e', '••••••••9b4d'];

export function PrivacyPanel() {
  const { t } = useLanguage();
  const keys = providers.slice(0, 3);

  return (
    <PanelShell title={t('product.tabs.privacy')} desc={t('product.privacy.desc')}>
      <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
        <WindowCard title="settings / api keys" bodyClassName="space-y-2 p-5">
          {keys.map((provider, index) => (
            <div
              key={provider.name}
              className="flex items-center justify-between gap-3 rounded-control border border-hairline bg-input px-3 py-2.5"
            >
              <span lang="en" className="label text-ink-3">
                {provider.name}
              </span>
              <span className="font-mono text-[12px] text-ink-2">{MASKED_KEYS[index]}</span>
            </div>
          ))}
        </WindowCard>

        <WindowCard title="network" bodyClassName="space-y-2.5 p-5 font-mono text-[12px]" className="lg:translate-y-3">
          <p lang="en" className="flex items-center justify-between gap-3">
            <span className="text-ink-2">browser → virustotal.com</span>
            <span className="text-ink-3">direct</span>
          </p>
          <p lang="en" className="flex items-center justify-between gap-3">
            <span className="text-ink-2">browser → shodan.io</span>
            <span className="text-ink-3">direct</span>
          </p>
          <p lang="en" className="flex items-center justify-between gap-3 border-t border-hairline pt-2.5">
            <span className="text-ink-2">→ ahtapot servers</span>
            <span className="text-ink-3">none</span>
          </p>
        </WindowCard>
      </div>
    </PanelShell>
  );
}
