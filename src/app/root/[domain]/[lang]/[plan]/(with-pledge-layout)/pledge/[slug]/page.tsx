import type { Metadata, ResolvingMetadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Container } from 'reactstrap';

type Props = {
  params: Promise<{ plan: string; lang: string; slug: string }>;
};

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations();
  const parentMetadata = await parent;

  return {
    title: `${t('pledge-details-title')} | ${parentMetadata.title?.absolute}`,
  };
}

export default async function PledgeDetailsPage(props: Props) {
  const params = await props.params;
  const t = await getTranslations();
  const { slug } = params;

  return (
    <Container className="py-5">
      <h1>{t('pledge-details-title')}</h1>
      <p>
        {t('pledge-details-slug')}: {slug}
      </p>
    </Container>
  );
}
