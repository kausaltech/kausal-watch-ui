'use client';

import { useState } from 'react';

import { gql, useMutation } from '@apollo/client';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Alert, Spinner } from 'reactstrap';

import type {
  CreateUserFeedbackMutation,
  CreateUserFeedbackMutationVariables,
} from '@/common/__generated__/graphql';
import type { TFunction } from '@/common/i18n';
import Button from '@/components/common/Button';

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

const StyledContainer = styled.div`
  background: ${({ theme }) => theme.brandLight};
  padding: ${({ theme }) => theme.spaces.s200};
  border-radius: ${({ theme }) => theme.cardBorderRadius};
  margin: ${({ theme }) => theme.spaces.s300} 0;
`;

const StyledHeading = styled.h3`
  font-size: ${({ theme }) => theme.fontSizeBase};
  font-weight: ${({ theme }) => theme.fontWeightBold};
  margin-bottom: ${({ theme }) => theme.spaces.s200};

  @media (max-width: ${({ theme }) => theme.breakpointSm}) {
    text-align: center;
  }
`;

const StyledEmojiGrid = styled.div`
  display: flex;
  gap: 1px;

  @media (max-width: ${({ theme }) => theme.breakpointSm}) {
    justify-content: center;
  }
`;

const StyledEmojiButton = styled.button<{ $selected: boolean }>`
  background: ${({ theme, $selected }) => ($selected ? theme.brandDark : 'transparent')};
  border: 2px solid ${({ theme, $selected }) => ($selected ? theme.brandDark : 'transparent')};
  border-radius: 50%;
  font-size: ${({ $selected, theme }) => ($selected ? theme.fontSizeXl : theme.fontSizeXxl)};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(${({ theme }) => theme.fontSizeXxl} + ${({ theme }) => theme.spaces.s050});
  height: calc(${({ theme }) => theme.fontSizeXxl} + ${({ theme }) => theme.spaces.s050});

  &:first-of-type {
    margin-left: -${({ theme }) => theme.spaces.s050};
  }

  &:hover {
    background: ${({ theme, $selected }) => ($selected ? theme.brandDark : theme.brandLight)};
    border-color: ${({ theme }) => theme.brandDark};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.brandDark};
    outline-offset: 2px;
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spaces.s100};
  border: 1px solid ${({ theme }) => theme.themeColors.light};
  border-radius: ${({ theme }) => theme.btnBorderRadius};
  font-size: ${({ theme }) => theme.fontSizeBase};
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  margin: ${({ theme }) => theme.spaces.s100} 0;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.brandDark};
    border-color: ${({ theme }) => theme.brandDark};
  }
`;

const StyledLabel = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.fontSizeBase};
  color: ${({ theme }) => theme.textColor.primary};
`;

const StyledMotionFormContainer = styled(motion.div)`
  margin-top: ${({ theme }) => theme.spaces.s200};
`;

const StyledSpinner = styled(Spinner)`
  margin-right: ${({ theme }) => theme.spaces.s100};
`;

const StyledAlert = styled(Alert)`
  margin-bottom: ${({ theme }) => theme.spaces.s100};
`;

type PledgeFeedbackComponentProps = {
  pledgeId: string;
  planIdentifier: string;
  pledgeSlug: string;
  pledgeTitle: string;
};

type Emoji = {
  icon: string;
  score: number;
  label: string;
};

// These fields are required to submit the feedback mutation but aren't relevant for pledge feedback
const REQUIRED_FEEDBACK_FIELDS = {
  name: null,
  email: null,
  pageId: null,
  action: null,
  category: null,
  id: null,
  clientMutationId: null,
};

function getEmojiScale(t: TFunction): Emoji[] {
  return [
    { icon: '😩', score: 1, label: t('very-dissatisfied') },
    { icon: '😞', score: 2, label: t('dissatisfied') },
    { icon: '😐', score: 3, label: t('neutral') },
    { icon: '☺️', score: 4, label: t('satisfied') },
    { icon: '🤩', score: 5, label: t('very-satisfied') },
  ];
}

type Step = 'emoji' | 'feedback' | 'thanks';

function PledgeFeedbackComponent({
  pledgeId,
  planIdentifier,
  pledgeSlug,
  pledgeTitle,
}: PledgeFeedbackComponentProps) {
  const t = useTranslations();

  const [step, setStep] = useState<Step>('emoji');
  const [selectedEmoji, setSelectedEmoji] = useState<Emoji | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  // The mutation may just return the error in the response, if it does make sure we display that error too
  const [otherMutationErrors, setOtherMutationErrors] = useState<string[]>([]);

  const [createUserFeedback, { loading: mutationLoading, error: mutationError }] = useMutation<
    CreateUserFeedbackMutation,
    CreateUserFeedbackMutationVariables
  >(CREATE_USER_FEEDBACK);

  const handleEmojiSelect = (emoji: Emoji) => {
    setSelectedEmoji(emoji);
    setStep('feedback');
  };

  const handleSubmit = async () => {
    if (!selectedEmoji) return;

    const additionalData = {
      pledgeSlug,
      pledgeTitle,
      emojiRating: selectedEmoji.icon,
      score: selectedEmoji.score,
    };

    const data = {
      ...REQUIRED_FEEDBACK_FIELDS,
      comment: feedbackText.trim() || null,
      additionalFields: JSON.stringify(additionalData),
      type: 'pledge',
      plan: planIdentifier,
      url: window.location.href,
      pledge: pledgeId,
    };

    try {
      const result = await createUserFeedback({ variables: { input: data } });

      if (result.data?.createUserFeedback?.feedback) {
        setStep('thanks');
      } else if (result.data?.createUserFeedback?.errors.length) {
        setOtherMutationErrors(
          result.data.createUserFeedback.errors.flatMap((error) => error.messages)
        );
      }
    } catch (error) {
      // Error will be shown via mutationError or otherMutationErrors
    }
  };

  return (
    <StyledContainer>
      {step === 'thanks' ? (
        <>
          <StyledHeading>{t('pledge-feedback-thanks')}</StyledHeading>
          <p>{t('pledge-feedback-thanks-message')}</p>
        </>
      ) : (
        <StyledHeading>{t('pledge-feedback-question')}</StyledHeading>
      )}

      {(step === 'emoji' || step === 'feedback') && (
        <>
          <StyledEmojiGrid>
            {getEmojiScale(t).map((emoji) => (
              <StyledEmojiButton
                key={emoji.score}
                $selected={selectedEmoji?.score === emoji.score}
                onClick={() => handleEmojiSelect(emoji)}
                aria-label={emoji.label}
                type="button"
              >
                {emoji.icon}
              </StyledEmojiButton>
            ))}
          </StyledEmojiGrid>

          <AnimatePresence>
            {step === 'feedback' && (
              <StyledMotionFormContainer
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <StyledLabel htmlFor="pledge-feedback-text">
                  {t('pledge-feedback-text-prompt')}
                </StyledLabel>

                <StyledTextarea
                  id="pledge-feedback-text"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder={t('pledge-feedback-text-placeholder')}
                />

                {!!otherMutationErrors.length &&
                  otherMutationErrors.map((errorMessage, i) => (
                    <StyledAlert key={i} color="danger">
                      <p>{errorMessage}</p>
                    </StyledAlert>
                  ))}

                {mutationError && (
                  <StyledAlert color="danger">
                    <p>{t('feedback-error-content')}</p>
                  </StyledAlert>
                )}

                <Button
                  color="primary"
                  onClick={handleSubmit}
                  disabled={mutationLoading || !selectedEmoji}
                >
                  {mutationLoading ? (
                    <span>
                      <StyledSpinner size="sm" color="light" />
                      {t('sending')}...
                    </span>
                  ) : (
                    t('pledge-feedback-send')
                  )}
                </Button>
              </StyledMotionFormContainer>
            )}
          </AnimatePresence>
        </>
      )}
    </StyledContainer>
  );
}

export default PledgeFeedbackComponent;
