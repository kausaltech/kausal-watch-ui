import { ReactNode } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { StyledMain } from './StyledMain';
import { JsonLd } from './JsonLd';

type Props = {
  params: { domain: string };
  children: ReactNode;
};

/**
 * Route group to support adding a header, footer and other
 * layout elements that shouldn't be applied to embeds.
 */
export default function Layout({ children, params }: Props) {
  return (
    <>
      <JsonLd domain={params.domain} />
      <Header />
      <StyledMain id="main">{children}</StyledMain>
      <Footer />
    </>
  );
}
