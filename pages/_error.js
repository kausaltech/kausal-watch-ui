import React from 'react';
import * as Sentry from '@sentry/nextjs';
import NextErrorComponent from 'next/error';
import getConfig from 'next/config';
import styled from 'styled-components';
import { Card, CardBody, Container, Row, Col } from 'reactstrap';
import { Link } from 'common/links';
import { useTranslation } from 'common/i18n';
import Layout from '../components/layout';
import Button from 'components/common/Button';

const ErrorBackground = styled.div`
  background-color: ${(props) => props.theme.brandDark};
  min-height: 800px;
`;

const StyledCard = styled(Card)`
  margin-top: 5rem;
  text-align: center;
  width: 100%;
  transition: all 0.5s ease;
  overflow: hidden;
  border-width: ${(props) => props.theme.cardBorderWidth};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) => props.theme.themeColors.white};

  h2 {
    margin-bottom: 2rem;
  }

  svg {
    width: 4rem;
    margin-bottom: 2rem;
    fill: ${(props) => props.theme.brandDark};
  }
`;

function Error(props) {
  const { errorMessage, err, hasGetInitialPropsRun, statusCode } = props;

  if (!hasGetInitialPropsRun && err) {
    // getInitialProps is not called in case of
    // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
    Sentry.captureException(err);
    // Flushing is not required in this case as it only happens on the client
  }

  const errorIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" x="0px" y="0px">
      <title>emoticon, emoji, face, sick frowning</title>
      <g data-name="Layer 25">
        <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28ZM8.61,14.72,11.2,13,8.61,11.28,9.72,9.61,14.8,13,9.72,16.39Zm14.78-3.44L20.8,13l2.59,1.72-1.11,1.67L17.2,13l5.08-3.39ZM21.62,22.22l.79.62-1.25,1.57-.78-.63c-3-2.39-5.77-2.39-8.76,0l-.78.63L9.59,22.84l.79-.62C14.05,19.27,18,19.27,21.62,22.22Z"></path>
      </g>
    </svg>
  );

  let msg = errorMessage;
  const { t } = useTranslation();

  if (!msg) {
    if (statusCode) {
      msg = t('error-with-code', { code: statusCode });
      if (statusCode === 404) {
        msg = t('page-not-found');
      }
    } else {
      msg = t('error-occurred');
    }
  }
  return (
    <Layout>
      <ErrorBackground className="mb-5">
        <Container>
          <Row>
            <Col md={{ size: 6, offset: 3 }}>
              <StyledCard>
                <CardBody>
                  {errorIcon}
                  <h1>{statusCode}</h1>
                  <h2>{msg}</h2>
                  <Link href="/">
                    <a>
                      <Button outline color="dark" size="sm">
                        {t('return-to-front')}
                      </Button>
                    </a>
                  </Link>
                </CardBody>
              </StyledCard>
            </Col>
          </Row>
        </Container>
      </ErrorBackground>
    </Layout>
  );
}

Error.getInitialProps = async ({ req, res, err }) => {
  const props = await NextErrorComponent.getInitialProps({
    res,
    err,
  });

  // Workaround for https://github.com/vercel/next.js/issues/8592, mark when
  // getInitialProps has run
  props.hasGetInitialPropsRun = true;

  if (err?.statusCode && res) res.statusCode = err.statusCode;

  if (res?.statusCode === 404) {
    // do not record an exception in Sentry for 404
    return { statusCode: 404 };
  }

  if (res && !res.statusCode) res.statusCode = 500;
  if (err) {
    Sentry.captureException(err);

    // Flushing before returning is necessary if deploying to Vercel, see
    // https://vercel.com/docs/platform/limits#streaming-responses
    await Sentry.flush(2000);

    return props;
  }
  Sentry.captureException(
    new Error(`_error.js getInitialProps missing data at path: ${asPath}`)
  );
  await Sentry.flush(2000);

  return props;
};

export default Error;
