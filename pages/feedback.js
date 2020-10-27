import React, { useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useForm, Controller } from 'react-hook-form';
import { Container, Row, Col } from 'reactstrap';
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

const ADD_FEEDBACK = gql`
  mutation AddFeedback($type: String!) {
    addFeedback(type: $type) {
      id
      name
      email
      feedback
    }
  }
`;

const FeedbackForm = ({plan}) => {
  const { control, handleSubmit, errors } = useForm();
  const { t } = useTranslation();
  const [
    addFeedback,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(ADD_FEEDBACK);

  const onSubmit = (data) => {
    const feedbackData = data;
    feedbackData.plan = plan;
    console.log("SENDING FEEDBACK...");
    console.log(feedbackData);
    addFeedback({ variables: feedbackData });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        as={TextInput}
        label={t('name')}
        name="name"
        id="name-field"
        control={control}
        defaultValue=""
      />
      <Controller
        as={TextInput}
        label={t('email')}
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
        invalid={'email' in errors}
        formFeedback={errors.email && t('error-email-format')}
      />
      <Controller
        as={TextInput}
        label={`${t('feedback')} (${t('required')})`}
        name="feedback"
        id="feedback-field"
        control={control}
        type="textarea"
        rules={{ required: true }}
        invalid={'feedback' in errors}
        defaultValue=""
        formFeedback={errors.feedback && t('error-feedback-required')}
      />
      <Button type="submit" color="primary">{t('send')}</Button>
      {mutationLoading && <p>Sending feedback...</p>}
      {mutationError && <p>Something went wrong. Your feedback is not sent. Try again.</p>}
    </form>
  );
};

const FeedbackPage = () => {
  const { t } = useTranslation();
  const plan = useContext(PlanContext);

  return (
    <Layout>
      <Meta
        title={t('give-feedback')}
      />
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
      <div className="content-area text-content my-5">
        <Container className="pb-4">
          <Row>
            <Col lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }}>
              <h2>{t('give-feedback')}</h2>
              <p>
                Did you discover something that does not work?
                Or do you have ideas on something we can improve?
              </p>
              <p>
                Please let us know here.
              </p>
              <FeedbackForm plan={plan.name} />
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

const initialProps = {
  namespacesRequired: ['common', 'a11y'],
};

FeedbackPage.getInitialProps = async () => (initialProps);

export default FeedbackPage;
