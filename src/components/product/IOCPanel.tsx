import { Box } from '@/components/primitives';
import { cn } from '@/lib/utils';
import type { IOCFixture, Verdict } from './fixtures';

const dotTone: Record<Verdict, string> = {
  malicious: 'bg-malicious',
  suspicious: 'bg-suspicious',
  clean: 'bg-clean',
  unknown: 'bg-ink-3',
};

interface IOCPanelProps {
  fixture: IOCFixture;
  compact?: boolean;
  className?: string;
}

export function IOCPanel({ fixture, compact = false, className }: IOCPanelProps) {
  return (
    <Box aria-hidden="true" className={cn('space-y-2 p-2', className)}>
      <Box tone="card" className="flex items-center justify-between gap-3 px-4 py-3">
        <span className="font-mono text-[13px] text-ink">{fixture.query}</span>
        <span className="label rounded-control bg-input px-2 py-1 text-ink-3">
          {fixture.kind}
        </span>
      </Box>

      <Box tone="card" className="space-y-3 px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2">
            <span
              data-verdict-dot
              className={cn('h-1.5 w-1.5 rounded-full', dotTone[fixture.verdict])}
            />
            <span className="label text-ink">{fixture.verdict}</span>
          </span>
          <span className="font-mono text-[12px] text-ink-2">{fixture.headline}</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {fixture.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-control bg-input px-2 py-1 text-[12px] text-ink-2"
            >
              {tag}
            </span>
          ))}
        </div>

        {!compact && (
          <div
            data-meta-row
            className="flex flex-wrap gap-x-3 gap-y-1 border-t border-hairline pt-3"
          >
            {fixture.meta.map((entry) => (
              <span key={entry} className="font-mono text-[12px] text-ink-3">
                {entry}
              </span>
            ))}
          </div>
        )}
      </Box>
    </Box>
  );
}
