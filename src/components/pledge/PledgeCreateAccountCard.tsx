'use client';

import styled from '@emotion/styled';

import { useTranslations } from 'next-intl';

import Button from '@/components/common/Button';

const StyledCard = styled.div`
  background: ${({ theme }) => theme.brandDark};
  color: ${({ theme }) => theme.themeColors.white};
  border-radius: ${({ theme }) => theme.cardBorderRadius};
  padding: ${({ theme }) => theme.spaces.s200};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces.s150};
`;

const StyledTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizeMd};
  font-weight: ${({ theme }) => theme.fontWeightBold};
  margin: 0;
  color: inherit;
`;

const StyledDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizeBase};
  margin: 0;
  line-height: ${({ theme }) => theme.lineHeightMd};
  opacity: 0.9;
`;

const StyledButton = styled(Button)`
  align-self: flex-start;
`;

type Props = {
  onCreateAccount: () => void;
};

function PledgeCreateAccountCard({ onCreateAccount }: Props) {
  const t = useTranslations();

  return (
    <StyledCard>
      <StyledTitle>{t('pledge-create-account-title')}</StyledTitle>
      <StyledDescription>{t('pledge-create-account-description')}</StyledDescription>
      <StyledButton color="light" onClick={onCreateAccount}>
        {t('pledge-create-account-button')}
      </StyledButton>
    </StyledCard>
  );
}

export default PledgeCreateAccountCard;
