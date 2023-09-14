import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Alert, Spinner } from 'reactstrap';

import { useTranslation } from 'common/i18n';
import Button from 'components/common/Button';
import TextInput from 'components/common/TextInput';

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

function makeAbsoluteUrl(url) {
  let baseUrl = null;
  if (window?.location?.href === undefined) {
    baseUrl = 'https://unknown.site.kausal.tech';
  } else {
    baseUrl = new URL(window.location.href).origin;
  }
  return new URL(url, baseUrl);
}

const FeedbackForm = ({
  planIdentifier,
  actionId,
  heading,
  description,
  prompt,
  formContext,
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  const onDismiss = () => setSent(false);
  const router = useRouter();

  const [
    createUserFeedback,
    { loading: mutationLoading, error: mutationError, data: mutationData },
  ] = useMutation(CREATE_USER_FEEDBACK);

  const onSubmit = (formData) => {
    const data = {
      ...formData,
      type: formContext,
      plan: planIdentifier,
      action: actionId,
      url: makeAbsoluteUrl(
        decodeURIComponent(router.query.lastUrl || router.asPath)
      ),
    };
    setSent(true);
    createUserFeedback({ variables: { input: data } });
  };

  return (
    <div className="mb-5">
      <h2 className="mb-4">{heading ?? t('give-feedback')}</h2>
      <p>{description ?? t('feedback-description')}</p>
      <p>{prompt ?? t('feedback-prompt')}</p>
      {mutationData && !mutationLoading && !mutationError && (
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
      {(!sent || mutationError) && (
        <div className="mt-4">
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="true">
            <Controller
              render={({ field }) => (
                <TextInput
                  {...field}
                  id="name-field"
                  autoComplete="name"
                  label={t('name')}
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
                  id="email-field"
                  autoComplete="email"
                  label={`${t('email')} (${t('required-field')})`}
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
                  id="comment-field"
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
};

FeedbackForm.defaultProps = {
  formContext: null,
  actionId: null,
};

FeedbackForm.propTypes = {
  planIdentifier: PropTypes.string.isRequired,
  actionId: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  prompt: PropTypes.string,
  formContext: PropTypes.string,
};

export default FeedbackForm;
