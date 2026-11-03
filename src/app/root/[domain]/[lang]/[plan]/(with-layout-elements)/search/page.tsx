import type { Metadata, ResolvingMetadata } from 'next';
import { getTranslations } from 'next-intl/server';

import SearchPage from './SearchPage';

type Props = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ q?: string | string[] }>;
};

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const [{ lang }, { q }] = await Promise.all([props.params, props.searchParams]);
  const t = await getTranslations({ locale: lang });
  const query = Array.isArray(q) ? q[0] : q;
  // The query tells result pages apart
  const title = query ? `${t('search')}: ${query}` : t('search');
  const resolvedParent = await parent;
  return { title: `${title} | ${resolvedParent.title?.absolute}` };
}

export default function Page() {
  return <SearchPage />;
}
