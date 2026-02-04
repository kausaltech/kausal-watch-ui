'use client';

import React from 'react';

import NextLink from 'next/link';

import { useTranslations } from 'next-intl';
import { transparentize } from 'polished';
import styled, { css } from 'styled-components';

import { usePrependPlanAndLocale } from '@/common/links';
import Button from '@/components/common/Button';
import Icon, { type ValidIconName } from '@/components/common/Icon';
import { PLEDGE_PATH } from '@/constants/routes';

export type PledgeCategory = {
  icon: ValidIconName;
  label: string;
};

export type PledgeCardProps = {
  title: string;
  description?: string;
  isCommitted: boolean;
  onCommittedChange: (committed: boolean) => void;
  slug: string;
  layout?: 'default' | 'mini';
  committedCount?: number;
  categories?: PledgeCategory[];
  image?: string;
  imageAlt?: string;
};

const StyledCardTitle = styled.h3<{ $layout: 'default' | 'mini' }>`
  font-size: ${({ theme, $layout }) =>
    $layout === 'mini' ? theme.fontSizeBase : theme.fontSizeMd};
  font-weight: ${({ theme }) => theme.fontWeightBold};
  margin: 0 0 ${({ theme }) => theme.spaces.s100};
  line-height: ${({ theme }) => theme.lineHeightSm};
`;

const StyledCardLink = styled(NextLink)`
  &:hover {
    text-decoration: none;

    ${StyledCardTitle} {
      text-decoration: underline;
    }
  }
`;

const StyledCardWrapper = styled.article<{ $layout: 'default' | 'mini' }>`
  display: flex;
  flex-direction: ${({ $layout }) => ($layout === 'mini' ? 'row' : 'column')};
  background: ${({ theme }) => theme.themeColors.white};
  border-radius: ${({ theme }) => theme.cardBorderRadius};
  box-shadow: 0 2px 8px ${({ theme }) => transparentize(0.9, theme.themeColors.black)};
  overflow: hidden;
  transition: all 0.2s ease;
  color: inherit;
  text-decoration: none;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 16px ${({ theme }) => transparentize(0.85, theme.themeColors.black)};
  }
`;

const StyledImageContainer = styled.div<{ $layout: 'default' | 'mini' }>`
  position: relative;
  overflow: hidden;

  ${({ $layout }) =>
    $layout === 'default'
      ? css`
          width: 100%;
          aspect-ratio: 16 / 9;
        `
      : css`
          flex-shrink: 0;
          width: 120px;
          min-height: 140px;
        `}
`;

const StyledCardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.themeColors.light};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledCardContent = styled.div<{ $layout: 'default' | 'mini' }>`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spaces.s150};
  flex: 1;

  ${({ $layout }) =>
    $layout === 'mini' &&
    css`
      padding: ${({ theme }) => theme.spaces.s100};
      justify-content: center;
    `}
`;

const StyledMetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spaces.s100};
  margin-bottom: ${({ theme }) => theme.spaces.s100};
  font-size: ${({ theme }) => theme.fontSizeSm};
  color: ${({ theme }) => theme.themeColors.dark};
`;

const StyledMetaItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaces.s050};
`;

const StyledCommittedCount = styled(StyledMetaItem)`
  color: ${({ theme }) => theme.themeColors.dark};
`;

const StyledCategory = styled(StyledMetaItem)`
  color: ${({ theme }) => theme.graphColors.grey050};
`;

const StyledCardDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizeSm};
  color: ${({ theme }) => theme.themeColors.dark};
  margin: 0 0 ${({ theme }) => theme.spaces.s150};
  line-height: ${({ theme }) => theme.lineHeightMd};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const StyledCommitButton = styled(Button)<{ $isCommitted: boolean }>`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaces.s050};

  ${({ $isCommitted, theme }) =>
    $isCommitted &&
    css`
      background-color: ${theme.brandDark} !important;
      border-color: ${theme.brandDark} !important;
      color: ${theme.themeColors.white} !important;
    `}
`;

function PledgeCard({
  title,
  description,
  isCommitted,
  onCommittedChange,
  slug,
  layout = 'default',
  committedCount,
  categories,
  image,
  imageAlt,
}: PledgeCardProps) {
  const t = useTranslations();
  const pledgeLink = usePrependPlanAndLocale(`${PLEDGE_PATH}/${slug}`);

  const handleCommitClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onCommittedChange(!isCommitted);
  };

  return (
    <StyledCardLink href={pledgeLink}>
      <StyledCardWrapper $layout={layout}>
        <StyledImageContainer $layout={layout}>
          {image ? (
            <StyledCardImage src={image} alt={imageAlt || title} />
          ) : (
            <StyledImagePlaceholder>
              <Icon name="heart" width="2rem" height="2rem" />
            </StyledImagePlaceholder>
          )}
        </StyledImageContainer>

        <StyledCardContent $layout={layout}>
          {(committedCount !== undefined || (categories && categories.length > 0)) && (
            <StyledMetaRow>
              {committedCount !== undefined && (
                <StyledCommittedCount>
                  <Icon name="user" width="18px" height="18px" />
                  {t('pledge-committed-count', { count: committedCount })}
                </StyledCommittedCount>
              )}

              {categories?.map((category, index) => (
                <StyledCategory key={index}>
                  <Icon name={category.icon} width="18px" height="18px" />
                  {category.label}
                </StyledCategory>
              ))}
            </StyledMetaRow>
          )}

          <StyledCardTitle $layout={layout}>{title}</StyledCardTitle>

          {layout === 'default' && description && (
            <StyledCardDescription>{description}</StyledCardDescription>
          )}

          <StyledCommitButton
            color="primary"
            outline={!isCommitted}
            size="sm"
            onClick={handleCommitClick}
            $isCommitted={isCommitted}
            aria-pressed={isCommitted}
          >
            <Icon name="award" width="18px" height="18px" />
            {isCommitted ? t('pledge-committed') : t('pledge-commit-to-this')}
          </StyledCommitButton>
        </StyledCardContent>
      </StyledCardWrapper>
    </StyledCardLink>
  );
}

export default PledgeCard;
