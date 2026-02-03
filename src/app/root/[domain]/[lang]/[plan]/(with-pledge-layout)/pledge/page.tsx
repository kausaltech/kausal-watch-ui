'use client';

import { Container } from 'reactstrap';

type Props = {
  params: Promise<{ plan: string; lang: string }>;
};

export default async function PledgeListPage(props: Props) {
  return (
    <Container className="py-5">
      <h1>Pledge list</h1>
      <p>Pledge description</p>
    </Container>
  );
}
