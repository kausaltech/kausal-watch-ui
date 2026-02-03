'use client';

import { useTranslations } from 'next-intl';
import { Container } from 'reactstrap';

type Props = {
  params: Promise<{ plan: string; lang: string; slug: string }>;
};

export default function PledgeDetailsPage({ params }) {
  const t = useTranslations();

  return (
    <Container className="py-5">
      <h1>{t('pledge-details-title')}</h1>
      <p>{params.slug}</p>
    </Container>
  );
}
