import { useTranslations } from 'next-intl';
import { Button, type ButtonProps } from 'reactstrap';
import styled from 'styled-components';

import Icon from '../common/Icon';

const StyledShareButton = styled(Button)`
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
    } catch (error) {
      // User cancelled or share failed
    }
  };

  return (
    <StyledShareButton color="primary" outline size="sm" onClick={handleShare} {...buttonProps}>
      <Icon name="arrow-up-right-from-square" width="16px" height="16px" />
      {t('share')}
    </StyledShareButton>
  );
}
