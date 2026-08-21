import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        raised: 'var(--bg-raised)',
        card: 'var(--bg-card)',
        input: 'var(--bg-input)',
        hairline: 'var(--border)',
        'hairline-hi': 'var(--border-hi)',
        ink: 'var(--text)',
        'ink-2': 'var(--text-2)',
        'ink-3': 'var(--text-3)',
        accent: 'var(--accent)',
        'accent-dim': 'var(--accent-dim)',
        'accent-ink': 'var(--accent-ink)',
        malicious: 'var(--verdict-malicious)',
        suspicious: 'var(--verdict-suspicious)',
        clean: 'var(--verdict-clean)',
      },
      fontFamily: {
        display: ["'Uncut Sans'", 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ["'Commit Mono'", 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        outer: 'var(--r-outer)',
        card: 'var(--r-card)',
        control: 'var(--r-control)',
      },
      maxWidth: {
        container: 'var(--container)',
      },
    },
  },
  plugins: [],
};

export default config;
