import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { gql, useMutation } from '@apollo/client';
import { useForm, Controller } from 'react-hook-form';
import { Container, Row, Col, Alert, Spinner } from 'reactstrap';
import styled from 'styled-components';

import { useTranslation } from 'common/i18n';
import Layout, { Meta } from 'components/layout';
import PlanContext from 'context/plan';
import TextInput from 'components/common/TextInput';
import Button from 'components/common/Button';

const HeaderBg = styled.div`
  background-color: ${(props) => props.theme.brandDark};
  position: relative;
`;

const ContentHeader = styled.header`
  padding: ${(props) => props.theme.spaces.s400} 0 ${(props) => props.theme.spaces.s200};

  h1 {
    margin-bottom: ${(props) => props.theme.spaces.s150};
    font-size: ${(props) => props.theme.fontSizeXxl};
    color: ${(props) => props.theme.themeColors.white} !important;
  }
`;

const CREATE_USER_FEEDBACK = gql`
  mutation CreateUserFeedback($input: UserFeedbackMutationInput!) {
    createUserFeedback(input: $input) {
      feedback {
        createdAt
      }
      errors {
        field
        messages
      }
    }
  }
`;

function FeedbackForm({ planIdentifier }) {
  const { control, formState: { errors }, handleSubmit } = useForm();
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  const onDismiss = () => setSent(false);
  const router = useRouter()

  const [
    createUserFeedback,
    { loading: mutationLoading, error: mutationError, data: mutationData },
  ] = useMutation(CREATE_USER_FEEDBACK);

  const onSubmit = (formData) => {
    const data = {
      ...formData,
      plan: planIdentifier,
      url: router.query.lastUrl
    };
    setSent(true);
    createUserFeedback({ variables: { input: data } });
  };

  return (
    <div className="mb-5">
      <h2 className="mb-4">{t('give-feedback')}</h2>
      <p>{t('feedback-description')}</p>
      <p>{t('feedback-prompt')}</p>
      {(mutationData && !mutationLoading && !mutationError) && (
        <Alert
          color="primary"
          isOpen={sent}
          toggle={onDismiss}
          closeAriaLabel={t('close')}
        >
          <h3>{t('feedback-thankyou-header')}</h3>
          <p>{t('feedback-thankyou-content')}</p>
        </Alert>
      )}
      { (!sent || mutationError) && (
        <div className="mt-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              render={({ field }) => (
                <TextInput
                  label={t('name')}
                  {...field}
                />
              )}
              name="name"
              id="name-field"
              control={control}
              defaultValue=""
            />
            <Controller
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={t('email')}
                  invalid={errors.email?.type === 'required'}
                  formFeedback={errors.email && t('error-email-format')}
                />
              )}
              name="email"
              id="email-field"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                },
              }}
            />
            <Controller
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={`${t('feedback')} (${t('required-field')})`}
                  invalid={errors.comment?.type === 'required'}
                  type="textarea"
                  formFeedback={errors.comment && t('error-feedback-required')}
                />
              )}
              name="comment"
              id="comment-field"
              control={control}
              rules={{ required: true }}
              defaultValue=""
            />
            {mutationError && (
              <Alert
                color="danger"
                className="mt-4"
                isOpen={sent}
                toggle={onDismiss}
                closeAriaLabel={t('close')}
              >
                <h3>{t('feedback-error-header')}</h3>
                <p>{t('feedback-error-content')}</p>
              </Alert>
            )}
            <Button type="submit" color="primary">
              {!mutationLoading && t('send')}
              {mutationLoading && (
                <span>
                  <Spinner size="sm" color="light" className="me-3" />
                  {t('loading')}
                  ...
                </span>
              )}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
FeedbackForm.propTypes = {
  planIdentifier: PropTypes.string.isRequired,
};

function FeedbackPage() {
  const { t } = useTranslation();
  const plan = useContext(PlanContext);

  return (
    <Layout>
      <Meta title={t('give-feedback')} />
      <HeaderBg>
        <Container>
          <Row>
            <Col>
              <ContentHeader>
                <h1>{t('feedback')}</h1>
              </ContentHeader>
            </Col>
          </Row>
        </Container>
      </HeaderBg>
      <div className="content-area my-5">
        <Container className="pb-4">
          <Row>
            <Col lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }}>
              <FeedbackForm planIdentifier={plan.identifier} />
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}

export default FeedbackPage;
