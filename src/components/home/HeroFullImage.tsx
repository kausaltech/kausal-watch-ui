'use client';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import type { Theme } from '@kausal/themes/types';
import { useTranslations } from 'next-intl';
import { Container } from 'reactstrap';

import { transientOptions } from '@common/themes/styles/styled';

import RichText from '@/components/common/RichText';

import { ImageCredit } from '../common/ImageCredit';
import { HeroCard } from './heroStyles';

const getHeight = (theme: Theme, defaultHeight: string) =>
  theme.settings.frontHero?.height ?? defaultHeight;

function getHeroMinHeight(theme: Theme, defaultHeight: string, focalBoxAspectRatio?: number) {
  const height = getHeight(theme, defaultHeight);

  // If the user specified a focal box in Wagtail, ensure container is tall enough to show it all
  if (focalBoxAspectRatio) {
    return `max(${height}, calc(100vw / ${focalBoxAspectRatio}))`;
  }

  return height;
}

const Hero = styled.div<{ $focalBoxAspectRatio?: number }>`
  width: 100%;
  position: relative;
  background-color: ${(props) => props.theme.brandDark};
  padding: 0 0 2rem;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    display: flex;
    min-height: ${({ theme, $focalBoxAspectRatio }) =>
      getHeroMinHeight(theme, '24rem', $focalBoxAspectRatio)};
    padding: 0;
  }

  @media (min-width: ${(props) => props.theme.breakpointLg}) {
    min-height: ${({ theme, $focalBoxAspectRatio }) =>
      getHeroMinHeight(theme, '28rem', $focalBoxAspectRatio)};
  }

  @media (min-width: ${(props) => props.theme.breakpointXl}) {
    min-height: ${({ theme, $focalBoxAspectRatio }) =>
      getHeroMinHeight(theme, '30rem', $focalBoxAspectRatio)};
  }
`;

const HeroImage = styled.div<{ $image: string; $imageAlign: string }>`
  min-height: 14rem;
  background-size: cover;
  background-position: ${(props) => props.$imageAlign};
  background-image: url(${(props) => props.$image});
  background-repeat: no-repeat;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;

const HeroContent = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
`;

const MainCard = styled(HeroCard, transientOptions)<{ $alignment: string }>`
  max-width: ${(props) => props.theme.breakpointSm};
  margin: -2rem auto 0;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    margin: var(--block-padding-top)
      ${(props) => {
        switch (props.$alignment) {
          case 'left':
            return '0 var(--block-padding-bottom) 0';
          case 'right':
            return '0 var(--block-padding-bottom) auto';
          case 'center':
            return 'auto';
          default:
            return '0';
        }
      }};
  }
`;

interface FocalBoxInfo {
  focalPointX: number;
  focalPointY: number;
  focalPointWidth: number;
  focalPointHeight: number;
  imageWidth: number;
  imageHeight: number;
}

interface HeroFullImageProps {
  id?: string;
  bgImage: string;
  imageAlign?: string;
  focalBox?: FocalBoxInfo;
  title?: string;
  lead?: string;
  altText?: string;
  imageCredit?: string;
}

const HeroFullImage = (props: HeroFullImageProps) => {
  const {
    id = '',
    bgImage,
    imageAlign = 'center center',
    focalBox,
    title,
    lead,
    altText,
    imageCredit,
  } = props;

  const t = useTranslations();
  const theme = useTheme();

  const contentAlignment = theme.settings?.frontHero?.cardPlacement ?? 'left';
  const contentColor = theme.settings?.frontHero?.color ?? 'light';

  const showContentBox = title || lead;

  // aspectRatio = imageWidth / focalBoxHeight ensures the container is tall enough
  // when the image is scaled to cover the container width
  const focalBoxAspectRatio = focalBox
    ? focalBox.imageWidth / focalBox.focalPointHeight
    : undefined;

  return (
    <Hero id={id} $focalBoxAspectRatio={focalBoxAspectRatio}>
      <HeroImage $image={bgImage} $imageAlign={imageAlign} />
      {altText && <span className="sr-only" role="img" aria-label={altText} />}
      {imageCredit && <ImageCredit>{`${t('image-credit')}: ${imageCredit}`}</ImageCredit>}
      {showContentBox && (
        <Container>
          <HeroContent>
            <MainCard $alignment={contentAlignment} $cardColor={contentColor}>
              <h1>{title}</h1>
              {lead ? <RichText html={lead} className="lead-content" /> : null}
            </MainCard>
          </HeroContent>
        </Container>
      )}
    </Hero>
  );
};

export default HeroFullImage;
