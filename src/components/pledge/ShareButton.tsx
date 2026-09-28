import styled from '@emotion/styled';

import { useTranslations } from 'next-intl';

import Button, { type ButtonProps } from '@/components/common/Button';

import Icon from '../common/Icon';

const StyledShareButton = styled(Button)`
  font-weight: ${({ theme }) => theme.fontWeightNormal};

  &.MuiButton-sizeSmall {
    padding: 0.25rem 0.5rem;
  }

  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaces.s050};
`;

export function ShareButton({
  title,
  shareUrl,
  ...buttonProps
}: { title: string; shareUrl: string } & ButtonProps) {
  const t = useTranslations();

  const handleShare = async () => {
    if (!navigator.share) return;

    try {
      await navigator.share({ title, url: shareUrl });
    } catch {
      // User cancelled or share failed
    }
  };

  return (
    <StyledShareButton
      variant="outlined"
      size="small"
      onClick={() => void handleShare()}
      {...buttonProps}
    >
      <Icon name="arrow-up-right-from-square" width="16px" height="16px" />
      {t('share')}
    </StyledShareButton>
  );
}
