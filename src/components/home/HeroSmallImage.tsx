import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { useTranslations } from 'next-intl';
import { Col, Container } from 'reactstrap';

import { transientOptions } from '@common/themes/styles/styled';

import RichText from '@/components/common/RichText';

const Hero = styled.div`
  width: 100%;
  position: relative;
  margin-left: auto;
  margin-right: auto;
`;

const HeroImageWrapper = styled('div', transientOptions)<{ $fitImage: boolean }>`
  position: relative;
  max-width: ${({ $fitImage }) => ($fitImage ? 'fit-content' : '100%')};
  width: ${({ $fitImage }) => ($fitImage ? 'auto' : '100%')};
  margin-left: auto;
  margin-right: auto;

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
  }
`;

const HeroImage = styled('img', transientOptions)<{
  $fitImage: boolean;
}>`
  display: block;
  max-width: 100%;
  border-radius: ${({ theme }) => `${theme.cardBorderRadius} ${theme.cardBorderRadius} 0 0`};

  ${({ $fitImage, theme }) =>
    $fitImage
      ? css`
          max-height: var(--image-height);

          @media (min-width: ${theme.breakpointMd}) {
            min-height: 500px; // This causes issues when the image gets squished by the container horizontally
          }
        `
      : css`
          width: 100%;
          height: 400px;
          object-fit: cover;
        `}
`;

const MainCard = styled.div`
  position: relative;
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

const StyledContainer = styled(Container, transientOptions)<{
  $backgroundColour?: string | null;
}>`
  --image-height: 70vh;

  position: relative;
  padding-top: ${(props) => props.theme.spaces.s100};
  margin-bottom: ${(props) => props.theme.spaces.s300};

  @media (min-width: ${(props) => props.theme.breakpointSm}) {
    padding-top: ${(props) => props.theme.spaces.s300};
  }

  @media (min-height: 800px) {
    --image-height: 60vh;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    height: calc(var(--image-height) / 2 + 50% + ${({ theme }) => theme.spaces.s150});
    max-height: calc(100% - ${({ theme }) => theme.spaces.s150});
    background-color: ${({ $backgroundColour, theme }) => $backgroundColour || theme.neutralLight};
    z-index: -1;
  }
`;

interface HeroSmallImageProps {
  id?: string;
  bgImage: string;
  title: string | null | undefined;
  lead: string | null | undefined;
  altText?: string | null | undefined;
  imageCredit?: string | null | undefined;
  aspectRatio?: number;
  backgroundColour?: string | null;
  fitImage?: boolean | null;
}

const HeroSmallImage = (props: HeroSmallImageProps) => {
  const {
    id = '',
    bgImage,
    title,
    lead,
    altText = '',
    imageCredit,
    backgroundColour,
    fitImage,
  } = props;

  const t = useTranslations();
  const theme = useTheme();

  const showContentBox = title || lead;
  const shouldFitImage = fitImage !== false;

  return (
    <StyledContainer $backgroundColour={backgroundColour}>
      <Hero id={id}>
        <HeroImageWrapper $fitImage={shouldFitImage}>
          <HeroImage src={bgImage} alt={altText ?? undefined} $fitImage={shouldFitImage} />
          {imageCredit && <ImageCredit>{`${t('image-credit')}: ${imageCredit}`}</ImageCredit>}
        </HeroImageWrapper>

        {showContentBox && (
          <MainCard color={theme.settings?.frontHero ? theme.settings.frontHero?.color : 'light'}>
            <h1>{title}</h1>
            {lead && <RichText html={lead} className="lead-content" />}
          </MainCard>
        )}
      </Hero>
    </StyledContainer>
  );
};

export default HeroSmallImage;
