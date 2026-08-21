import type { SVGProps } from 'react';

/* Stroke icons for the product feature tabs. All inherit currentColor so the
   tab's text color drives them through every selection/hover state. */

const base: SVGProps<SVGSVGElement> = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export function DetectIcon() {
  return (
    <svg {...base}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3v3.2M12 17.8V21M21 12h-3.2M6.2 12H3" />
      <circle cx="12" cy="12" r="7.4" strokeDasharray="2.4 3.4" />
    </svg>
  );
}

export function AnalyzeIcon() {
  return (
    <svg {...base}>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 9h18M8.5 9v11" />
      <path d="M12 14h5.5M12 17h3.5" />
    </svg>
  );
}

export function AIIcon() {
  return (
    <svg {...base}>
      <path d="M12 3.5c.9 4.4 3.1 6.6 7.5 7.5-4.4.9-6.6 3.1-7.5 7.5-.9-4.4-3.1-6.6-7.5-7.5 4.4-.9 6.6-3.1 7.5-7.5Z" />
      <path d="M18.7 15.8c.4 1.9 1.3 2.8 3.2 3.2-1.9.4-2.8 1.3-3.2 3.2-.4-1.9-1.3-2.8-3.2-3.2 1.9-.4 2.8-1.3 3.2-3.2Z" />
    </svg>
  );
}

export function PrivacyIcon() {
  return (
    <svg {...base}>
      <path d="M12 3 5 5.8v5.4c0 4.4 2.9 7.6 7 9.3 4.1-1.7 7-4.9 7-9.3V5.8L12 3Z" />
      <path d="M9.6 11.8l1.8 1.8 3.4-3.6" />
    </svg>
  );
}
