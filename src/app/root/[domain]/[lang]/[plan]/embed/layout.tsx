import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: 'noindex',
};

export default function Layout({ children }) {
  return children;
}
