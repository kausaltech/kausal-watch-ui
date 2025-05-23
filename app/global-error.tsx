'use client';

import { captureException } from '@sentry/nextjs';
import { useEffect } from 'react';

import defaultTheme from '@/public/static/themes/default/theme.json';
import { CardBody, Container, Row, Col } from 'reactstrap';
import ThemeProvider from '@/components/providers/ThemeProvider';
import { Theme } from '@kausal/themes/types';
import {
  ErrorBackground,
  errorIcon,
  StyledCard,
  StyledTitle,
} from '@/components/common/ErrorPage';
import { StyledComponentsRegistry } from '@/styles/StyledComponentsRegistry';

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
        <ThemeProvider theme={defaultTheme as Theme}>
          <StyledComponentsRegistry>
            <ErrorBackground isFullPage>
              <Container>
                <Row>
                  <Col md={{ size: 6, offset: 3 }}>
                    <StyledCard>
                      <CardBody>
                        {errorIcon}

                        <StyledTitle as={'h1'}>
                          Something went wrong
                        </StyledTitle>

                        <StyledTitle as={'h4'}>
                          We're sorry — an unexpected error occurred on our end.
                          The issue has been reported and our team will
                          investigate it.
                        </StyledTitle>
                      </CardBody>
                    </StyledCard>
                  </Col>
                </Row>
              </Container>
            </ErrorBackground>
          </StyledComponentsRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}
