import { type Theme, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { useTranslations } from 'next-intl';
import { Container } from 'reactstrap';

import { transientOptions } from '@common/themes/styles/styled';

import { type HeroImageRenditions, getImageSrcSet } from '@/common/images';
import RichText from '@/components/common/RichText';

import { ImageCredit } from '../common/ImageCredit';
import { HeroCard } from './heroStyles';

const SideBySideHero = styled('div', transientOptions)<{ $backgroundColor?: string | null }>`
  width: 100%;
  background-color: ${({ $backgroundColor, theme }) => $backgroundColor || theme.neutralLight};
`;

function getStackedBreakpoint({ theme, $fitImage }: { theme: Theme; $fitImage: boolean }) {
  return $fitImage ? theme.breakpointLg : theme.breakpointMd;
}

const SideBySideInner = styled(Container, transientOptions)<{ $fitImage: boolean }>`
  padding-top: ${(props) => props.theme.spaces.s300};
  padding-bottom: ${(props) => props.theme.spaces.s300};

  @media (max-width: ${(props) => props.theme.breakpointSm}) {
    padding-top: ${(props) => props.theme.spaces.s100};
  }

  @media (min-width: ${getStackedBreakpoint}) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const SideBySideImageWrapper = styled('div', transientOptions)<{ $fitImage: boolean }>`
  position: relative;
  flex-shrink: 0;
  border-radius: ${({ theme }) => `${theme.cardBorderRadius} ${theme.cardBorderRadius} 0 0`};
  overflow: hidden;

  @media (min-width: ${getStackedBreakpoint}) {
    border-radius: ${({ theme }) => theme.cardBorderRadius};
    flex: 0 0 ${({ theme }) => `calc(50% + ${theme.spaces.s300})`};
    max-width: ${({ theme }) => `calc(50% + ${theme.spaces.s300})`};
    ${({ $fitImage }) =>
      !$fitImage &&
      `
      align-self: stretch;
      min-height: 400px;
    `}
  }
`;

const SideBySideImage = styled('img', transientOptions)<{ $fitImage: boolean }>`
  display: block;
  width: 100%;

  @media (min-width: ${getStackedBreakpoint}) {
    ${({ $fitImage }) =>
      !$fitImage &&
      `
      width: 100%;
      height: 100%;
      object-fit: cover;
    `}
  }
`;

const SideBySideContent = styled('div', transientOptions)<{ $fitImage: boolean }>`
  display: flex;
  align-items: flex-start;
  margin-top: -${(props) => props.theme.spaces.s300};

  @media (min-width: ${getStackedBreakpoint}) {
    flex: 1;
    align-items: center;
    padding: ${(props) => props.theme.spaces.s300};
    padding-left: 0;
    margin-top: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpointXl}) {
    padding-right: 0;
  }
`;

const SideBySideCard = styled(HeroCard, transientOptions)<{ $fitImage: boolean }>`
  width: 100%;

  @media (max-width: ${getStackedBreakpoint}) {
    border-radius: ${({ theme }) => `0 0 ${theme.cardBorderRadius} ${theme.cardBorderRadius}`};
  }

  @media (min-width: ${getStackedBreakpoint}) {
    width: auto;
    max-width: 600px;
    margin-left: -${(props) => props.theme.spaces.s300};
  }
`;

const StyledImageCredit = styled(ImageCredit, transientOptions)<{ $fitImage: boolean }>`
  @media (min-width: ${getStackedBreakpoint}) {
    top: unset;
    right: unset;
    left: 0;
    bottom: 0;
  }
`;

interface HeroSideBySideProps {
  id?: string;
  image: HeroImageRenditions;
  title: string | null | undefined;
  lead: string | null | undefined;
  altText?: string | null | undefined;
  imageCredit?: string | null | undefined;
  imageWidth?: number | null;
  imageHeight?: number | null;
  backgroundColor?: string | null;
  fitImage?: boolean | null;
}

const HeroSideBySide = (props: HeroSideBySideProps) => {
  const {
    id = '',
    image,
    title,
    lead,
    altText = '',
    imageCredit,
    backgroundColor,
    fitImage,
  } = props;

  const shouldFitImage = fitImage !== false;

  const t = useTranslations();
  const theme = useTheme();

  const stackedBreakpoint = getStackedBreakpoint({ theme, $fitImage: shouldFitImage });

  const cardColor = theme.settings?.frontHero?.color ?? 'light';
  const showContentBox = title || lead;

  return (
    <SideBySideHero id={id} $backgroundColor={backgroundColor}>
      <SideBySideInner $fitImage={shouldFitImage}>
        <SideBySideImageWrapper $fitImage={shouldFitImage}>
          {/* The image renders at half the container width at most, so the
              largest rendition the layout can make use of is fullMedium */}
          <SideBySideImage
            src={(image.fullMedium ?? image.fullSmall ?? image.full)?.src}
            srcSet={getImageSrcSet([image.fullSmall, image.fullMedium])}
            sizes={`(min-width: ${stackedBreakpoint}) 50vw, 100vw`}
            alt={altText ?? ''}
            $fitImage={shouldFitImage}
          />
          {imageCredit && (
            <StyledImageCredit
              $fitImage={shouldFitImage}
            >{`${t('image-credit')}: ${imageCredit}`}</StyledImageCredit>
          )}
        </SideBySideImageWrapper>
        {showContentBox && (
          <SideBySideContent $fitImage={shouldFitImage}>
            <SideBySideCard $fitImage={shouldFitImage} $cardColor={cardColor}>
              <h1>{title}</h1>
              {lead && <RichText html={lead} className="lead-content" />}
            </SideBySideCard>
          </SideBySideContent>
        )}
      </SideBySideInner>
    </SideBySideHero>
  );
};

export default HeroSideBySide;
