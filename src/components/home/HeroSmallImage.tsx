import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { useTranslations } from 'next-intl';
import { Container } from 'reactstrap';

import { transientOptions } from '@common/themes/styles/styled';

import RichText from '@/components/common/RichText';

import { ImageCredit } from '../common/ImageCredit';
import { HeroCard } from './heroStyles';

const StyledContainer = styled(Container, transientOptions)<{
  $backgroundColor?: string | null;
  $showImageAccent: boolean;
  $fullBackground: boolean | null;
}>`
  --block-margin: ${({ theme }) => theme.spaces.s300};
  --accent-bar-height: 0px;
  --image-top-padding: ${({ theme }) => theme.spaces.s100};
  --image-height: 70vh;
  --image-height: calc(100vh - 135px - var(--image-top-padding) * 2);
  --bg-color: ${({ $backgroundColor, theme }) => $backgroundColor || theme.neutralLight};

  position: relative;
  padding-top: var(--image-top-padding);
  margin-bottom: var(--block-margin);

  &::before {
    content: '';
    display: ${({ $fullBackground }) => ($fullBackground ? 'block' : 'none')};
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    height: calc(100% + var(--block-margin));
    background-color: var(--bg-color);
    z-index: -1;
  }

  @media (min-width: ${(props) => props.theme.breakpointSm}) {
    --image-top-padding: ${({ theme }) => theme.spaces.s300};
    --accent-bar-height: ${({ $showImageAccent, theme }) =>
      $showImageAccent ? theme.spaces.s150 : '0px'};
  }
`;

const Hero = styled.div`
  width: 100%;
  position: relative;
`;

const HeroImageWrapper = styled('div', transientOptions)<{
  $fitImage: boolean;
  $showImageAccent: boolean;
  $fullBackground: boolean | null;
}>`
  position: relative;
  max-width: ${({ $fitImage }) => ($fitImage ? 'fit-content' : '100%')};
  width: ${({ $fitImage }) => ($fitImage ? 'auto' : '100%')};
  margin-left: auto;
  margin-right: auto;

  &::before {
    content: '';
    display: ${({ $fullBackground }) => ($fullBackground ? 'none' : 'block')};
    position: absolute;
    top: calc(var(--image-top-padding) * -1);
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    height: calc(100% + var(--accent-bar-height) + var(--image-top-padding) * 2);
    background-color: var(--bg-color);
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    height: ${({ theme }) => theme.spaces.s150};
    bottom: -${({ theme }) => theme.spaces.s150};
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.brandDark};
    border-radius: ${({ theme }) => `0 0 ${theme.cardBorderRadius} ${theme.cardBorderRadius}`};
    z-index: 1;
    display: ${({ $showImageAccent }) => ($showImageAccent ? 'block' : 'none')};
  }
`;

const HeroImage = styled('img', transientOptions)<{
  $fitImage: boolean;
  $showImageAccent: boolean;
}>`
  display: block;
  max-width: 100%;
  border-radius: ${({ theme, $showImageAccent }) =>
    $showImageAccent
      ? `${theme.cardBorderRadius} ${theme.cardBorderRadius} 0 0`
      : theme.cardBorderRadius};

  ${({ $fitImage }) =>
    $fitImage
      ? css`
          max-height: var(--image-height);
        `
      : css`
          width: 100%;
          height: 400px;
          object-fit: cover;
        `}
`;

const MainCard = styled(HeroCard)`
  margin-left: auto;
  margin-right: auto;
  margin-top: -${(props) => props.theme.spaces.s300};
  max-width: 600px;

  padding: ${(props) =>
    `${props.theme.spaces.s200} ${props.theme.spaces.s200} ${props.theme.spaces.s100}`};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) =>
    props.color === 'dark' ? props.theme.brandDark : props.theme.cardBackground.primary};
  color: ${(props) =>
    props.color === 'dark' ? props.theme.themeColors.white : props.theme.neutralDark};
  box-shadow:
    0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(166, 173, 201, 0.2);

  z-index: 100;

  ${({ theme, color }) =>
    color !== 'dark' &&
    theme.themeColors.light === '#fefefe' &&
    `
      /* Improve white hero card contrast when used on a near-white theme. */
      border: 1px solid ${theme.neutralLight};
    `}

  h1 {
    font-size: ${(props) => props.theme.fontSizeLg};
    margin-bottom: ${(props) => props.theme.spaces.s100};
  }

  h1,
  h2,
  h3,
  h4 {
    color: ${(props) =>
      props.color === 'dark' ? props.theme.themeColors.white : props.theme.headingsColor};
  }

  a {
    color: ${(props) =>
      props.color === 'dark' ? props.theme.themeColors.white : props.theme.neutralDark};

    &:hover {
      text-decoration: none;
    }
  }

  .lead-content {
    font-size: ${(props) => props.theme.fontSizeBase};
    line-height: ${(props) => props.theme.lineHeightMd};
    font-family: ${(props) =>
      `${props.theme.fontFamilyContent}, ${props.theme.fontFamilyFallback}`};
  }
`;

const ImageCredit = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.1rem 0.25rem;
  background-color: rgba(255, 255, 255, 0.66);
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`};
`;

const StyledImageCredit = styled(ImageCredit)`
  border-top-right-radius: ${({ theme }) => theme.cardBorderRadius};
`;

interface HeroSmallImageProps {
  id?: string;
  bgImage: string;
  title: string | null | undefined;
  lead: string | null | undefined;
  altText?: string | null | undefined;
  imageCredit?: string | null | undefined;
  backgroundColor?: string | null;
  fitImage?: boolean | null;
  showImageAccent?: boolean | null;
  fullBackground?: boolean | null;
}

const HeroSmallImage = (props: HeroSmallImageProps) => {
  const {
    id = '',
    bgImage,
    title,
    lead,
    altText = '',
    imageCredit,
    backgroundColor,
    fitImage,
    showImageAccent,
    fullBackground = false,
  } = props;

  const t = useTranslations();
  const theme = useTheme();

  const showContentBox = title || lead;
  const shouldFitImage = fitImage !== false;
  const shouldShowImageAccent = showImageAccent !== false;

  return (
    <StyledContainer
      id={id}
      $backgroundColor={backgroundColor}
      $fullBackground={fullBackground}
      $showImageAccent={shouldShowImageAccent}
    >
      <Hero>
        <HeroImageWrapper
          $fitImage={shouldFitImage}
          $showImageAccent={shouldShowImageAccent}
          $fullBackground={fullBackground}
        >
          <HeroImage
            src={bgImage}
            alt={altText ?? undefined}
            $fitImage={shouldFitImage}
            $showImageAccent={shouldShowImageAccent}
          />
          {imageCredit && (
            <StyledImageCredit>{`${t('image-credit')}: ${imageCredit}`}</StyledImageCredit>
          )}
        </HeroImageWrapper>

        {showContentBox && (
          <MainCard $cardColor={theme.settings?.frontHero?.color ?? 'light'}>
            <h1>{title}</h1>
            {lead && <RichText html={lead} className="lead-content" />}
          </MainCard>
        )}
      </Hero>
    </StyledContainer>
  );
};

export default HeroSmallImage;
