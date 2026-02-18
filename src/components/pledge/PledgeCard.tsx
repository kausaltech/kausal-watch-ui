'use client';

import React, { useState } from 'react';

import NextLink from 'next/link';

import { useTranslations } from 'next-intl';
import { readableColor, transparentize } from 'polished';
import styled, { css } from 'styled-components';

import { usePrependPlanAndLocale } from '@/common/links';
import Button from '@/components/common/Button';
import Icon, { type ValidIconName } from '@/components/common/Icon';
import { PLEDGE_PATH } from '@/constants/routes';

import { ShareButton } from './ShareButton';

export type PledgeCategory = {
  icon?: ValidIconName;
  label: string;
};

type BaseProps = {
  title: string;
  description?: string;
  slug: string;
  committedCount?: number;
  categories?: PledgeCategory[];
  image?: string;
  imageAlt?: string;
};

type InteractiveProps = BaseProps & {
  layout?: 'default' | 'mini';
  isCommitted: boolean;
  onCommitClick: (isCommitted: boolean) => void;
  shareUrl?: never;
  isMostCommitted?: boolean;
};

type ShareProps = BaseProps & {
  layout: 'share';
  shareUrl: string;
  isCommitted?: never;
  onCommitClick?: never;
};

export type PledgeCardProps = InteractiveProps | ShareProps;

type CardLayout = 'default' | 'mini' | 'share';

const StyledCardTitle = styled.h3<{ $layout: CardLayout }>`
  font-size: ${({ theme, $layout }) =>
    $layout === 'default' ? theme.fontSizeMd : theme.fontSizeBase};
  font-weight: ${({ theme, $layout }) =>
    $layout === 'default' ? theme.headingsFontWeight : theme.fontWeightNormal};
  margin: 0 0 ${({ theme }) => theme.spaces.s100};
  line-height: ${({ theme }) => theme.lineHeightMd};
`;

const StyledCardLink = styled(NextLink)`
  &:hover {
    text-decoration: none;

    ${StyledCardTitle} {
      text-decoration: underline;
    }
  }
`;

const StyledCardWrapper = styled.article<{ $layout: CardLayout }>`
  position: relative;
  display: ${({ $layout }) => ($layout === 'share' ? 'inline-flex' : 'flex')};
  flex-direction: ${({ $layout }) => ($layout === 'default' ? 'column' : 'row')};
  background: ${({ theme }) => theme.themeColors.white};
  border-radius: ${({ theme }) => theme.cardBorderRadius};
  color: inherit;
  text-decoration: none;
  height: 100%;

  ${({ $layout }) =>
    $layout === 'share'
      ? css`
          box-shadow: 0 2px 8px ${({ theme }) => transparentize(0.95, theme.themeColors.black)};
        `
      : css`
          box-shadow: 0 2px 8px ${({ theme }) => transparentize(0.9, theme.themeColors.black)};
          transition: all 0.2s ease;

          &:hover {
            transform: translateY(-5px);
            box-shadow: 0 4px 16px ${({ theme }) => transparentize(0.85, theme.themeColors.black)};
          }
        `}
`;

const StyledMostCommittedTag = styled.div`
  position: absolute;
  right: -${({ theme }) => theme.spaces.s050};
  top: ${({ theme }) => theme.spaces.s200};
  background: ${({ theme }) => theme.brandDark};
  color: ${({ theme }) =>
    readableColor(theme.brandDark, theme.themeColors.black, theme.themeColors.white)};
  display: flex;
  gap: ${({ theme }) => theme.spaces.s050};
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizeSm};
  padding: ${({ theme }) => theme.spaces.s025};
`;

const StyledImageContainer = styled.div<{ $layout: CardLayout }>`
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
          width: ${$layout === 'share' ? '80px' : '120px'};
          min-height: ${$layout === 'share' ? '80px' : '140px'};
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

const StyledCardContent = styled.div<{ $layout: CardLayout }>`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spaces.s150};
  flex: 1;
  min-width: 0;

  ${({ $layout }) =>
    ($layout === 'mini' || $layout === 'share') &&
    css`
      padding: ${({ theme }) => theme.spaces.s100};
      justify-content: center;
    `}
`;

const StyledMetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: ${({ theme }) => theme.spaces.s025};
  column-gap: ${({ theme }) => theme.spaces.s100};
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
  color: ${({ theme }) => theme.textColor.tertiary};
`;

const StyledCardDescription = styled.p`
  flex: 1 0 auto; // Fill the remaining vertical space to ensure action buttons align in a card list
  font-size: ${({ theme }) => theme.fontSizeSm};
  color: ${({ theme }) => theme.textColor.secondary};
  margin: ${({ theme }) => theme.spaces.s100} 0 ${({ theme }) => theme.spaces.s150};
  line-height: ${({ theme }) => theme.lineHeightBase};
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

const StyledDivider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.graphColors.grey030};
  margin: ${({ theme }) => theme.spaces.s100} 0;
`;

const StyledShareLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSizeSm};
  color: ${({ theme }) => theme.textColor.secondary};
  margin: 0 0 ${({ theme }) => theme.spaces.s100};
`;

const StyledShareActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spaces.s100};
`;

const StyledCopyButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaces.s050};
`;

function SharePledgeCard({ title, committedCount, image, imageAlt, shareUrl }: ShareProps) {
  const t = useTranslations();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  return (
    <StyledCardWrapper $layout="share">
      <PledgeImage layout="share" image={image} imageAlt={imageAlt} title={title} />
      <StyledCardContent $layout="share">
        <PledgeAttributes committedCount={committedCount} />
        <StyledCardTitle $layout="share">{title}</StyledCardTitle>
        <StyledDivider />
        <StyledShareLabel>{t('pledge-success-share-label')}</StyledShareLabel>
        <StyledShareActions>
          <StyledCopyButton color="primary" outline size="sm" onClick={handleCopyLink}>
            <Icon name={copied ? 'check' : 'link'} width="16px" height="16px" />
            {copied ? t('copied-to-clipboard') : t('pledge-copy-link')}
          </StyledCopyButton>
          <ShareButton title={title} shareUrl={shareUrl} />
        </StyledShareActions>
      </StyledCardContent>
    </StyledCardWrapper>
  );
}

function InteractivePledgeCard({
  title,
  description,
  slug,
  layout = 'default',
  committedCount,
  categories,
  image,
  imageAlt,
  isCommitted,
  onCommitClick,
  isMostCommitted = false,
}: InteractiveProps) {
  const t = useTranslations();
  const pledgeLink = usePrependPlanAndLocale(`${PLEDGE_PATH}/${slug}`);

  const handleCommitButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onCommitClick(isCommitted);
  };

  return (
    <StyledCardLink href={pledgeLink}>
      <StyledCardWrapper $layout={layout}>
        <PledgeImage layout={layout} image={image} imageAlt={imageAlt} title={title} />

        {isMostCommitted && (
          <StyledMostCommittedTag>
            <Icon name="award" width="16px" height="16px" />
            <span>{t('pledge-most-committed')}</span>
          </StyledMostCommittedTag>
        )}

        <StyledCardContent $layout={layout}>
          <PledgeAttributes committedCount={committedCount} categories={categories} />

          <StyledCardTitle $layout={layout}>{title}</StyledCardTitle>

          {/* Render the container even when there's no description to fill vertical space for even layouts across cards */}
          {layout === 'default' && <StyledCardDescription>{description}</StyledCardDescription>}

          <StyledCommitButton
            color="primary"
            outline={!isCommitted}
            size="sm"
            onClick={handleCommitButtonClick}
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

function PledgeImage({
  layout,
  image,
  imageAlt,
  title,
}: {
  layout: CardLayout;
  image?: string;
  imageAlt?: string;
  title: string;
}) {
  return (
    <StyledImageContainer $layout={layout}>
      {image ? (
        <StyledCardImage src={image} alt={imageAlt || title} />
      ) : (
        <StyledImagePlaceholder>
          <Icon name="heart" width="2rem" height="2rem" />
        </StyledImagePlaceholder>
      )}
    </StyledImageContainer>
  );
}

function PledgeAttributes({
  committedCount,
  categories,
}: {
  committedCount?: number;
  categories?: PledgeCategory[];
}) {
  const t = useTranslations();

  if (committedCount === undefined && (!categories || categories.length === 0)) return null;

  return (
    <StyledMetaRow>
      {committedCount !== undefined && (
        <StyledCommittedCount>
          <Icon name="user" width="18px" height="18px" />
          {t('pledge-committed-count', { count: committedCount })}
        </StyledCommittedCount>
      )}

      {categories?.map((category, index) => (
        <StyledCategory key={index}>
          {category.icon && <Icon name={category.icon} width="18px" height="18px" />}
          {category.label}
        </StyledCategory>
      ))}
    </StyledMetaRow>
  );
}

function PledgeCard(props: PledgeCardProps) {
  if (props.layout === 'share') {
    return <SharePledgeCard {...props} />;
  }

  return <InteractivePledgeCard {...props} />;
}

export default PledgeCard;
