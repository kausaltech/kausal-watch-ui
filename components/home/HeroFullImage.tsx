import { useTheme } from 'styled-components';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import RichText from 'components/common/RichText';
import { Theme } from '@kausal/themes/types';
import { useTranslations } from 'next-intl';

/**
 * Pulls the specified hero height from the theme if defined
 */
const getHeight = (theme: Theme, defaultHeight: string) =>
  theme.settings.frontHero?.height ?? defaultHeight;

const Hero = styled.div`
  width: 100%;
  position: relative;
  background-color: ${(props) => props.theme.brandDark};
  padding: 0 0 2rem;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    display: flex;
    min-height: ${({ theme }) => getHeight(theme, '24rem')};
    padding: 0;
  }

  @media (min-width: ${(props) => props.theme.breakpointLg}) {
    min-height: ${({ theme }) => getHeight(theme, '28rem')};
  }

  @media (min-width: ${(props) => props.theme.breakpointXl}) {
    min-height: ${({ theme }) => getHeight(theme, '30rem')};
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

const MainCard = styled.div<{ $alignment: string; $color: string }>`
  position: relative;
  max-width: ${(props) => props.theme.breakpointSm};
  margin: -2rem auto 0;
  padding: ${(props) =>
    `${props.theme.spaces.s200} ${props.theme.spaces.s200} ${props.theme.spaces.s100}`};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) =>
    props.$color === 'dark'
      ? props.theme.brandDark
      : props.theme.themeColors.white};
  color: ${(props) =>
    props.$color === 'dark'
      ? props.theme.themeColors.white
      : props.theme.neutralDark};
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;

  h1 {
    font-size: ${(props) => props.theme.fontSizeLg};
    margin-bottom: ${(props) => props.theme.spaces.s100};
  }

  h1,
  h2,
  h3,
  h4 {
    color: ${(props) =>
      props.$color === 'dark'
        ? props.theme.themeColors.white
        : props.theme.headingsColor};
  }

  a {
    color: ${(props) =>
      props.$color === 'dark'
        ? props.theme.themeColors.white
        : props.theme.neutralDark};

    &:hover {
      text-decoration: none;
    }
  }

  .lead-content {
    font-size: ${(props) => props.theme.fontSizeBase};
    line-height: ${(props) => props.theme.lineHeightMd};
    font-family: ${(props) => props.theme.fontFamilyContent};
  }

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    margin: 3rem
      ${(props) => {
        switch (props.$alignment) {
          case 'left':
            return '0 2rem 0';
          case 'right':
            return '0 2rem auto';
          case 'center':
            return 'auto';
          default:
            return '0';
        }
      }};

    h1 {
      font-size: ${(props) => props.theme.fontSizeXl};
    }

    .lead-content {
      font-size: ${(props) => props.theme.fontSizeMd};
    }
  }
`;

const ImageCredit = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.25rem 0.5rem;
  background-color: rgba(255, 255, 255, 0.66);
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => props.theme.fontFamilyTiny};

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    top: inherit;
    bottom: 0;
  }
`;

interface HeroFullImageProps {
  id?: string;
  bgImage: string;
  imageAlign?: string;
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
    title,
    lead,
    altText,
    imageCredit,
  } = props;

  const t = useTranslations();
  const theme = useTheme();

  const contentAlignment = theme.settings?.frontHero?.cardPlacement
    ? theme.settings.frontHero.cardPlacement
    : 'left';

  const contentColor = theme.settings?.frontHero?.color
    ? theme.settings.frontHero.color
    : 'light';

  const showContentBox = title || lead;

  return (
    <Hero id={id}>
      <HeroImage $image={bgImage} $imageAlign={imageAlign} />
      {altText && <span className="sr-only" role="img" aria-label={altText} />}
      {imageCredit && (
        <ImageCredit>{`${t('image-credit')}: ${imageCredit}`}</ImageCredit>
      )}
      {showContentBox && (
        <Container>
          <HeroContent>
            <MainCard $alignment={contentAlignment} $color={contentColor}>
              <h1>{title}</h1>
              <RichText html={lead} className="lead-content" />
            </MainCard>
          </HeroContent>
        </Container>
      )}
    </Hero>
  );
};

export default HeroFullImage;
