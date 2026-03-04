'use client';

import { useEffect } from 'react';

import type { Theme } from '@kausal/themes/types';
import { captureException } from '@sentry/nextjs';
import { CardBody, Col, Container, Row } from 'reactstrap';

type Props = {
  error: Error & { digest?: string };
};

export default function GlobalError({ error }: Props) {
  useEffect(() => {
    captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <Container>
          <Row>
            <Col md={{ size: 6, offset: 3 }}>
              <CardBody>
                <h1>Something went wrong</h1>

                <h4>
                  We're sorry — an unexpected error occurred on our end. The issue has been reported
                  and our team will investigate it.
                </h4>
              </CardBody>
            </Col>
          </Row>
        </Container>
      </body>
    </html>
  );
}
