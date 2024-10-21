import { useState } from 'react';

import Button from 'components/common/Button';
import CheckboxInput from 'components/common/CheckboxInput';
import SelectInput from 'components/common/SelectInput';
import TextInput from 'components/common/TextInput';
import { useTranslations } from 'next-intl';
import { usePathname, useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Spinner } from 'reactstrap';

import { gql, useMutation } from '@apollo/client';

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
  actionId = null,
  categoryId = null,
  heading,
  description,
  emailVisible = true,
  emailRequired = true,
  feedbackVisible = true,
  feedbackRequired = true,
  prompt,
  formContext = null,
  additionalFields = [],
  block_id,
  pageId,
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const t = useTranslations();
  const [sent, setSent] = useState(false);
  const [formEmptyError, setFormEmptyError] = useState(false);
  const onDismiss = () => {
    setSent(false);
    setFormEmptyError(false);
  };

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [
    createUserFeedback,
    { loading: mutationLoading, error: mutationError, data: mutationData },
  ] = useMutation(CREATE_USER_FEEDBACK);

  const onSubmit = (formData) => {
    const { name, email, comment, ...additionalResponse } = formData;

    const isCommentEmpty = !comment || comment.trim() === '';
    const areAllAdditionalFieldsEmpty = Object.values(additionalResponse).every(
      (value) => {
        if (Array.isArray(value)) {
          return value.length === 0;
        }
        if (value == null) {
          return true;
        }
        if (typeof value === 'string') {
          return value.trim() === '';
        }
        return false;
      }
    );

    const isFormEffectivelyEmpty =
      !feedbackRequired && isCommentEmpty && areAllAdditionalFieldsEmpty;

    if (isFormEffectivelyEmpty) {
      setFormEmptyError(true);
      return;
    }

    const data = {
      name,
      email: emailVisible ? email : undefined,
      comment: feedbackVisible ? comment : undefined,
      additionalFields: JSON.stringify(additionalResponse),
      pageId,
      type: formContext,
      plan: planIdentifier,
      action: actionId,
      category: categoryId,
      url: makeAbsoluteUrl(
        decodeURIComponent(searchParams.get('lastUrl') || pathname)
      ),
    };
    setSent(true);
    setFormEmptyError(false);
    createUserFeedback({ variables: { input: data } });
  };

  const renderAdditionalField = (field) => {
    const requiredMessage = ` (${t('required-field')})`;

    switch (field.fieldType) {
      case 'text':
        return (
          <Controller
            key={field.fieldLabel}
            name={field.fieldLabel}
            control={control}
            defaultValue=""
            rules={{
              required: field.fieldRequired && t('required-field'),
            }}
            render={({ field: controllerField }) => (
              <TextInput
                {...controllerField}
                id={`dynamic-${field.id}`}
                label={`${field.fieldLabel}${
                  field.fieldRequired ? requiredMessage : ''
                }`}
                type="text"
                invalid={!!errors[field.fieldLabel]}
                formFeedback={errors[field.fieldLabel] && t('required-field')}
              />
            )}
          />
        );
      case 'checkbox':
        return (
          <Controller
            key={field.fieldLabel}
            name={field.fieldLabel}
            control={control}
            defaultValue={[]}
            rules={{
              validate: (value) => {
                if (field.fieldRequired && value.length === 0) {
                  return false;
                }
                return true;
              },
            }}
            render={({ field: controllerField }) => (
              <CheckboxInput
                {...controllerField}
                id={`dynamic-${field.id}`}
                heading={`${field.fieldLabel}${
                  field.fieldRequired ? requiredMessage : ''
                }`}
                options={field.choices.map((choice) => ({
                  value: choice.choiceValue,
                  label: choice.choiceLabel,
                }))}
                value={controllerField.value}
                invalid={!!errors[field.fieldLabel]}
                formFeedback={errors[field.fieldLabel] && t('required-field')}
              />
            )}
          />
        );
      case 'dropdown':
        return (
          <Controller
            key={field.fieldLabel}
            name={field.fieldLabel}
            control={control}
            defaultValue=""
            rules={{
              required: field.fieldRequired && t('required-field'),
            }}
            render={({ field: controllerField }) => (
              <SelectInput
                {...controllerField}
                id={`dynamic-${field.id}`}
                label={`${field.fieldLabel}${
                  field.fieldRequired ? requiredMessage : ''
                }`}
                options={[
                  { value: '', label: '---------' },
                  ...field.choices.map((choice) => ({
                    value: choice.choiceValue,
                    label: choice.choiceLabel,
                  })),
                ]}
                invalid={!!errors[field.fieldLabel]}
                formFeedback={errors[field.fieldLabel] && t('required-field')}
              />
            )}
          />
        );
      default:
        return null;
    }
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
            {emailVisible && (
              <Controller
                render={({ field }) => (
                  <TextInput
                    {...field}
                    id="email-field"
                    autoComplete="email"
                    label={`${t('email')}${
                      emailRequired ? ` (${t('required-field')})` : ''
                    }`}
                    invalid={emailRequired && errors.email?.type === 'required'}
                    formFeedback={errors.email && t('error-email-format')}
                  />
                )}
                name="email"
                id="email-field"
                control={control}
                defaultValue=""
                rules={{
                  required: emailRequired,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  },
                }}
              />
            )}

            {additionalFields.map(renderAdditionalField)}

            {feedbackVisible && (
              <Controller
                render={({ field }) => (
                  <TextInput
                    {...field}
                    id="comment-field"
                    label={`${t('feedback')}${
                      feedbackRequired ? ` (${t('required-field')})` : ''
                    }`}
                    invalid={
                      feedbackRequired && errors.comment?.type === 'required'
                    }
                    type="textarea"
                    rows="3"
                    style={{ height: 'auto' }}
                    formFeedback={
                      errors.comment && t('error-feedback-required')
                    }
                  />
                )}
                name="comment"
                id="comment-field"
                control={control}
                rules={{ required: feedbackRequired }}
                defaultValue=""
              />
            )}
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
            {formEmptyError && (
              <Alert
                color="danger"
                className="mt-3"
                isOpen={formEmptyError}
                toggle={onDismiss}
              >
                {t('form-effectively-empty-error')}
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

FeedbackForm.propTypes = {
  planIdentifier: PropTypes.string.isRequired,
  actionId: PropTypes.string,
  categoryId: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  emailVisible: PropTypes.bool,
  emailRequired: PropTypes.bool,
  feedbackVisible: PropTypes.bool,
  feedbackRequired: PropTypes.bool,
  prompt: PropTypes.string,
  formContext: PropTypes.string,
  additionalFields: PropTypes.arrayOf(PropTypes.object),
  pageId: PropTypes.number,
};

export default FeedbackForm;
