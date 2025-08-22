import { ReactNode } from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SettingsPanelFull from '@/components/paths/toolbar/SettingsPanelFull';

import { JsonLd } from './JsonLd';
import { StyledMain } from './StyledMain';

type Props = {
  params: Promise<{ domain: string }>;
  children: ReactNode;
};

/**
 * Route group to support adding a header, footer and other
 * layout elements that shouldn't be applied to embeds.
 */
export default async function Layout(props: Props) {
  const params = await props.params;

  const { children } = props;

  return (
    <>
      <JsonLd domain={params.domain} />
      <Header />
      <StyledMain id="main">{children}</StyledMain>
      <Footer />
      <SettingsPanelFull />
    </>
  );
}
