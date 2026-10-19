import { type ReactNode, Suspense } from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SettingsPanelFull from '@/components/paths/toolbar/SettingsPanelFull';
import PathsPreloadProvider from '@/components/providers/PathsPreloadProvider';
import {
  getSettingsPanelVisibility,
  preloadSettingsPanel,
} from '@/utils/paths/preload-settings-panel';

import { JsonLd } from './JsonLd';

type Props = {
  params: Promise<{ domain: string; lang: string; plan: string }>;
  children: ReactNode;
};

/**
 * Route group to support adding a header, footer and other
 * layout elements that shouldn't be applied to embeds.
 */
export default async function Layout(props: Props) {
  const params = await props.params;

  const { children } = props;
  // Not awaited: the panel and its Paths data stream in when they are ready
  const settingsPanelVisible = getSettingsPanelVisibility(params.domain, params.plan, params.lang);

  return (
    <>
      <JsonLd domain={params.domain} />
      <div style={{ minHeight: '100vh' }}>
        <Header />
        <main id="main" data-testid="root-layout">
          {children}
        </main>
      </div>
      <Footer />
      <Suspense fallback={null}>
        <PathsPreloadProvider
          preload={preloadSettingsPanel(params.domain, params.plan, settingsPanelVisible)}
        >
          <SettingsPanelFull visibleOnLoad={settingsPanelVisible} />
        </PathsPreloadProvider>
      </Suspense>
    </>
  );
}
