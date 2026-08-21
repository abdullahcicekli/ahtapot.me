'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/* Static export has no server negotiation, so the root dispatches on the
   client: Turkish browsers go to /tr/, everyone else defaults to /en/.
   The visible link is the no-JS fallback and keeps the page crawlable. */
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
    const prefersTurkish = languages.some((lang) => lang?.toLowerCase().startsWith('tr'));
    router.replace(prefersTurkish ? '/tr/' : '/en/');
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <a href="/en/" className="text-[14px] text-ink-2 hover:text-ink">
        ahtapot.me →
      </a>
    </main>
  );
}
