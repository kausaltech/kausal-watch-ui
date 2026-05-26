import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { useTranslations } from 'next-intl';
import { Col, Container } from 'reactstrap';

import { transientOptions } from '@common/themes/styles/styled';

import RichText from '@/components/common/RichText';

const ImageCredit = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0.1rem 0.25rem;
  background-color: rgba(255, 255, 255, 0.66);
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`};
  z-index: 1;
`;

const CardContent = styled.div<{ $color: string }>`
  color: ${(props) =>
    props.$color === 'dark' ? props.theme.themeColors.white : props.theme.neutralDark};

  h1 {
    font-size: ${(props) => props.theme.fontSizeLg};
    margin-bottom: ${(props) => props.theme.spaces.s100};

    @media (min-width: ${(props) => props.theme.breakpointMd}) {
      font-size: ${(props) => props.theme.fontSizeXl};
    }
  }

  h1,
  h2,
  h3,
  h4 {
    color: ${(props) =>
      props.$color === 'dark' ? props.theme.themeColors.white : props.theme.headingsColor};
  }

  a {
    color: ${(props) =>
      props.$color === 'dark' ? props.theme.themeColors.white : props.theme.neutralDark};

    &:hover {
      text-decoration: none;
    }
  }

  .lead-content {
    font-size: ${(props) => props.theme.fontSizeBase};
    line-height: ${(props) => props.theme.lineHeightMd};
    font-family: ${(props) =>
      `${props.theme.fontFamilyContent}, ${props.theme.fontFamilyFallback}`};

    @media (min-width: ${(props) => props.theme.breakpointMd}) {
      font-size: ${(props) => props.theme.fontSizeMd};
    }
  }
`;

const LandscapeHero = styled.div`
  width: 100%;
  position: relative;
  margin-top: ${(props) => props.theme.spaces.s300};
  margin-bottom: ${(props) => props.theme.spaces.s300};
`;

const LandscapeImage = styled.img`
  display: block;
  width: 100%;
`;

const LandscapeCardRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spaces.s200};
`;

const SideBySideHero = styled('div', transientOptions)<{ $backgroundColour?: string | null }>`
  width: 100%;
  position: relative;
  background-color: ${({ $backgroundColour, theme }) => $backgroundColour || theme.neutralLight};

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }
`;

const SideBySideImageWrapper = styled('div', transientOptions)<{ $fitImage: boolean }>`
  position: relative;
  flex-shrink: 0;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    width: 50%;
    ${({ $fitImage }) =>
      !$fitImage &&
      `
      display: flex;
      align-items: center;
      justify-content: center;
    `}
  }
`;

const SideBySideImage = styled('img', transientOptions)<{ $fitImage: boolean }>`
  display: block;
  ${({ $fitImage }) =>
    $fitImage
      ? `width: 100%;`
      : `
    max-width: 100%;
    max-height: 600px;
    width: auto;
  `}
`;

const SideBySideContent = styled.div`
  display: flex;
  align-items: flex-start;
  padding: ${(props) => props.theme.spaces.s200};
  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    flex: 1;
    padding: ${(props) => props.theme.spaces.s300};
  }
`;

interface HeroSideBySideProps {
  id?: string;
  bgImage: string;
  title: string | null | undefined;
  lead: string | null | undefined;
  altText?: string | null | undefined;
  imageCredit?: string | null | undefined;
  imageWidth?: number | null;
  imageHeight?: number | null;
  backgroundColour?: string | null;
  fitImage?: boolean | null;
}

const HeroSideBySide = (props: HeroSideBySideProps) => {
  const {
    id = '',
    bgImage,
    title,
    lead,
    altText = '',
    imageCredit,
    imageWidth,
    imageHeight,
    backgroundColour,
    fitImage,
  } = props;

  const shouldFitImage = fitImage !== false;

  const t = useTranslations();
  const theme = useTheme();

  const cardColor = theme.settings?.frontHero?.color ?? 'light';
  const showContentBox = title || lead;
  const isLandscape = !imageWidth || !imageHeight || imageWidth / imageHeight >= 2.0;

  if (isLandscape) {
    return (
      <Container>
        <LandscapeHero id={id}>
          <LandscapeImage src={bgImage} alt={altText ?? ''} />
          {imageCredit && <ImageCredit>{`${t('image-credit')}: ${imageCredit}`}</ImageCredit>}
          {showContentBox && (
            <LandscapeCardRow>
              <Col xl={{ size: 6 }} lg={{ size: 8 }} md={{ size: 10 }}>
                <CardContent $color={cardColor}>
                  <h1>{title}</h1>
                  {lead && <RichText html={lead} className="lead-content" />}
                </CardContent>
              </Col>
            </LandscapeCardRow>
          )}
        </LandscapeHero>
      </Container>
    );
  }

  return (
    <SideBySideHero id={id} $backgroundColour={backgroundColour}>
      <SideBySideImageWrapper $fitImage={shouldFitImage}>
        <SideBySideImage src={bgImage} alt={altText ?? ''} $fitImage={shouldFitImage} />
        {imageCredit && <ImageCredit>{`${t('image-credit')}: ${imageCredit}`}</ImageCredit>}
      </SideBySideImageWrapper>
      {showContentBox && (
        <SideBySideContent>
          <CardContent $color={cardColor}>
            <h1>{title}</h1>
            {lead && <RichText html={lead} className="lead-content" />}
          </CardContent>
        </SideBySideContent>
      )}
    </SideBySideHero>
  );
};

export default HeroSideBySide;
