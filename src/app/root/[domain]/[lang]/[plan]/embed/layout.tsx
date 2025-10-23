import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: 'noindex',
};

export default function Layout({ children }) {
  return <div data-testid="embed-layout">{children}</div>;
}
