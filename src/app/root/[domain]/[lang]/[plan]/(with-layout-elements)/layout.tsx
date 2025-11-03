import type { ReactNode } from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SettingsPanelFull from '@/components/paths/toolbar/SettingsPanelFull';

import { JsonLd } from './JsonLd';

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
      <main id="main" data-testid="root-layout" style={{ minHeight: '100vh' }}>
        {children}
      </main>
      <Footer />
      <SettingsPanelFull />
    </>
  );
}
