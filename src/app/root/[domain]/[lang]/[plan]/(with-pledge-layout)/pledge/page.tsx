import type { Metadata, ResolvingMetadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Container } from 'reactstrap';

type Props = {
  params: Promise<{ plan: string; lang: string }>;
};

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const t = await getTranslations();
  const parentMetadata = await parent;

  return {
    title: `${t('pledge-list-title')} | ${parentMetadata.title?.absolute}`,
  };
}

export default async function PledgeListPage(props: Props) {
  const params = await props.params;
  const t = await getTranslations();

  return (
    <Container className="py-5">
      <h1>{t('pledge-list-title')}</h1>
      <p>{t('pledge-list-description')}</p>
    </Container>
  );
}
