'use client';

import { useTranslations } from 'next-intl';
import styled, { css } from 'styled-components';

import Icon, { type ValidIconName } from '@/components/common/Icon';

type Props = {
  residentCount: number;
  saving: string;
  savingIcon?: ValidIconName;
  equivalence: string;
  equivalenceIcon?: ValidIconName;
};

const StyledContainer = styled.div`
  max-width: 500px;
  background: ${({ theme }) => theme.themeColors.light};
  border-radius: ${({ theme }) => theme.cardBorderRadius};
  padding: ${({ theme }) => theme.spaces.s200};
`;

const StyledTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizeBase};
  font-weight: ${({ theme }) => theme.fontWeightBold};
  margin-bottom: ${({ theme }) => theme.spaces.s150};
`;

const StyledBubbleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
`;

const StyledBubble = styled.div<{ $arrow?: 'left' | 'right' }>`
  background: ${({ theme }) => theme.brandDark};
  color: ${({ theme }) => theme.themeColors.white};
  border-radius: ${({ theme }) => theme.cardBorderRadius};
  padding: ${({ theme }) => `${theme.spaces.s100} ${theme.spaces.s150}`};
  margin: ${({ theme }) => theme.spaces.s050} 0;
  font-size: ${({ theme }) => theme.fontSizeSm};
  line-height: ${({ theme }) => theme.lineHeightMd};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaces.s100};
  position: relative;
  max-width: 300px;

  .icon {
    margin-left: -${({ theme }) => theme.spaces.s050};
    flex-shrink: 0;
  }

  strong {
    font-weight: ${({ theme }) => theme.fontWeightBold};
  }

  ${({ $arrow }) =>
    !$arrow
      ? null
      : css`
          &::after {
            content: '';
            position: absolute;
            top: calc(50% - 1px); // Subtract a pixel for perfect positioning due to border width
            display: block;
            border-left: 2px solid ${({ theme }) => theme.brandDark};
            border-top: 2px solid ${({ theme }) => theme.brandDark};
            width: 14px;
            height: 14px;

            // Translate the arrow the width (14px) plus the border width
            ${$arrow === 'left'
              ? css`
                  left: 0;
                  transform: translate(-16px, -50%) rotate(135deg);
                `
              : css`
                  right: 0;
                  transform: translate(16px, -50%) rotate(-45deg);
                `};
          }
        `}
`;

const StyledBubbleRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;

const StyledBubbleTextWrapper = styled.div`
  p {
    margin: 0;
  }
`;

const StyledConnector = styled.div`
  position: relative;
  flex: 1 0 auto;
  min-width: 16px;

  &::after {
    position: absolute;
    content: '';
    left: 0;
    right: 0;
    border-color: ${({ theme }) => theme.brandDark};
    border-width: 2px;
  }
`;

const StyledConnectorTopRight = styled(StyledConnector)`
  margin-right: ${({ theme }) => theme.spaces.s050};

  &::after {
    top: 50%;
    bottom: 0;
    border-top-style: solid;
    border-right-style: solid;
    border-top-right-radius: ${({ theme }) =>
      theme.cardBorderRadius !== '0' ? theme.cardBorderRadius : '8px'};
  }
`;

const StyledConnectorMidRight = styled(StyledConnector)`
  margin-right: ${({ theme }) => theme.spaces.s050};

  &::after {
    bottom: 50%;
    top: 0;
    border-bottom-style: solid;
    border-right-style: solid;
    border-bottom-right-radius: ${({ theme }) =>
      theme.cardBorderRadius !== '0' ? theme.cardBorderRadius : '8px'};
  }
`;

const StyledConnectorMidLeft = styled(StyledConnector)`
  margin-left: ${({ theme }) => theme.spaces.s050};

  &::after {
    top: 50%;
    bottom: 0;
    border-top-style: solid;
    border-left-style: solid;
    border-top-left-radius: ${({ theme }) =>
      theme.cardBorderRadius !== '0' ? theme.cardBorderRadius : '8px'};
  }
`;

const StyledConnectorBottomLeft = styled(StyledConnector)`
  margin-left: ${({ theme }) => theme.spaces.s050};

  &::after {
    top: 0;
    bottom: 50%;
    border-bottom-style: solid;
    border-left-style: solid;
    border-bottom-left-radius: ${({ theme }) =>
      theme.cardBorderRadius !== '0' ? theme.cardBorderRadius : '8px'};
  }
`;

function PledgeImpactComparison({
  residentCount,
  saving,
  savingIcon = 'arrow-down',
  equivalence,
  equivalenceIcon,
}: Props) {
  const t = useTranslations();

  return (
    <StyledContainer>
      <StyledTitle>{t('pledge-your-potential-impact')}</StyledTitle>

      <StyledBubbleContainer>
        <StyledBubbleRow>
          <StyledBubble>
            <Icon name="handshake" width="20px" height="20px" />
            <span>
              {t.rich('pledge-impact-if-residents-commit-html', {
                count: residentCount,
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </span>
          </StyledBubble>
          <StyledConnectorTopRight />
        </StyledBubbleRow>

        <StyledBubbleRow>
          <StyledConnectorMidLeft />
          <StyledBubble $arrow="right">
            <Icon name={savingIcon} width="20px" height="20px" />
            <StyledBubbleTextWrapper dangerouslySetInnerHTML={{ __html: saving }} />
          </StyledBubble>
          <StyledConnectorMidRight />
        </StyledBubbleRow>

        <StyledBubbleRow>
          <StyledConnectorBottomLeft />
          <StyledBubble $arrow="left">
            {equivalenceIcon && <Icon name={equivalenceIcon} width="20px" height="20px" />}
            <StyledBubbleTextWrapper dangerouslySetInnerHTML={{ __html: equivalence }} />
          </StyledBubble>
        </StyledBubbleRow>
      </StyledBubbleContainer>
    </StyledContainer>
  );
}

export default PledgeImpactComparison;
