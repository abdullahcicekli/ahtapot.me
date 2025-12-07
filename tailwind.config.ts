import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C7F54D',
          dark: '#1A1A1F',
        },
        background: {
          light: '#FAFAFA',
          dark: '#1A1A1F',
          'card-light': '#FFFFFF',
          'card-dark': '#2A2A32',
          'secondary-light': '#F0F0F2',
          'secondary-dark': '#222228',
        },
        text: {
          'primary-light': '#1A1A1F',
          'primary-dark': '#FFFFFF',
          'secondary-light': '#5A5A65',
          'secondary-dark': '#A0A0AA',
          'muted-light': '#8A8A95',
          'muted-dark': '#707078',
        },
        border: {
          light: '#E5E5EA',
          dark: 'rgba(255, 255, 255, 0.1)',
        },
        success: '#4ADE80',
        warning: '#FBBF24',
        danger: '#E63946',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'sans-serif',
        ],
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
