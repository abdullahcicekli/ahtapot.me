import type { ReactNode } from 'react';

/* The [lang] segment owns <html lang> for the real pages; this group gives
   the root dispatcher page a valid document of its own. Without it the "/"
   route renders no <html>/<body> at all and hydration fails. */
export default function RootDispatcherLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
