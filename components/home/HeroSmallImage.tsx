import { useTheme } from 'styled-components';
import { Col, Container } from 'reactstrap';
import styled from 'styled-components';

import RichText from 'components/common/RichText';
import { useTranslations } from 'next-intl';

const Hero = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: ${(props) => props.theme.spaces.s600};
`;

const HeroImage = styled.img`
  position: relative;
  width: 100%;
  display: block;
`;

const TextWidthColumn = styled(Col)`
  margin-top: -${(props) => props.theme.spaces.s300};
`;

const MainCard = styled.div`
  position: relative;
  padding: ${(props) =>
    `${props.theme.spaces.s200} ${props.theme.spaces.s200} ${props.theme.spaces.s100}`};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) =>
    props.color === 'dark'
      ? props.theme.brandDark
      : props.theme.themeColors.white};
  color: ${(props) =>
    props.color === 'dark'
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
      props.color === 'dark'
        ? props.theme.themeColors.white
        : props.theme.headingsColor};
  }

  a {
    color: ${(props) =>
      props.color === 'dark'
        ? props.theme.themeColors.white
        : props.theme.neutralDark};

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
  padding: 0.25rem 0.5rem;
  background-color: rgba(255, 255, 255, 0.66);
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) =>
    `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`};
  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    top: inherit;
    bottom: 0;
  }
`;

interface HeroSmallImageProps {
  id?: string;
  bgImage: string;
  title: string | null | undefined;
  lead: string | null | undefined;
  altText?: string | null | undefined;
  imageCredit?: string | null | undefined;
}

const HeroSmallImage = (props: HeroSmallImageProps) => {
  const { id = '', bgImage, title, lead, altText = '', imageCredit } = props;

  const t = useTranslations();
  const theme = useTheme();

  const showContentBox = title || lead;

  return (
    <Container>
      <Hero id={id}>
        <HeroImage src={bgImage} alt={altText} />
        {imageCredit && (
          <ImageCredit>{`${t('image-credit')}: ${imageCredit}`}</ImageCredit>
        )}
        {showContentBox && (
          <TextWidthColumn
            xl={{ size: 6, offset: 3 }}
            lg={{ size: 8, offset: 2 }}
            md={{ size: 10, offset: 1 }}
          >
            <MainCard
              color={
                theme.settings?.frontHero
                  ? theme.settings.frontHero?.color
                  : 'light'
              }
            >
              <h1>{title}</h1>
              {lead && <RichText html={lead} className="lead-content" />}
            </MainCard>
          </TextWidthColumn>
        )}
      </Hero>
    </Container>
  );
};

export default HeroSmallImage;
