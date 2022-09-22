import React from 'react';
import { useTheme } from 'common/theme';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';

import styled from 'styled-components';
import RichText from 'components/common/RichText';

const Hero = styled.div`
  width: 100%;
  padding-bottom: 14rem;
  background-color: ${(props) => props.theme.brandDark};

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    padding-bottom: 0;
  }
`;

const HeroMain = styled.div`
  display: flex;
  align-items: stretch;
  min-height: 12rem;
  background-color: ${(props) => props.theme.brandDark};
  background-size: cover;
  background-position: ${(props) => props.imageAlign};
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;

  .container {
    display: flex;
    align-items: flex-end;
  }

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    min-height: 30rem;

    .container {
      align-items: flex-start;
      justify-content: ${(props) => props.alignment};
    }
  }
`;

const MainCard = styled.div`
  max-width: ${(props) => props.theme.breakpointSm};
  padding: ${(props) => props.theme.spaces.s200} ${(props) => props.theme.spaces.s200} ${(props) => props.theme.spaces.s100};
  margin: 12rem 0 -12rem;
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) => props.theme.themeColors.white};
  color: ${(props) => props.theme.neutralDark};
  box-shadow: 4px 4px 8px rgba(0,0,0,0.1);
  z-index: 100;

  h1 {
    font-size: ${(props) => props.theme.fontSizeXl};
    margin-bottom: ${(props) => props.theme.spaces.s100};
  }

  a {
    color: ${(props) => props.theme.neutralDark};

    &:hover {
      text-decoration: none;

      h5 {
        text-decoration: underline;
      }

      svg .a {
        fill: ${(props) => props.theme.brandlight};
      }
    }
  }

  .lead-content {
    font-size: ${(props) => props.theme.fontSizeBase};
    line-height: ${(props) => props.theme.lineHeightMd};
    font-family: ${(props) => props.theme.fontFamilyContent};
  }

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    margin: 4rem 0 6rem;

    h1 {
      font-size: ${(props) => props.theme.fontSizeXl};
    }

    .lead-content {
      font-size: ${(props) => props.theme.fontSizeMd};
    }
  }
`;

const getCardAlignment = (cardPlacement) => {
  switch (cardPlacement) {
    case 'right': return 'flex-end';
    case 'center': return 'center';
    case 'left':
    default: return 'flex-start'
  }
}

const HeroFullImage = (props) => {
  const {
    bgImage, imageAlign, title, lead
  } = props;

  const theme = useTheme();

  return (
    <Hero>
      <HeroMain
        image={bgImage}
        imageAlign={imageAlign}
        alignment={getCardAlignment(theme.settings?.frontHero ? theme.settings.frontHero.cardPlacement : 'left')}
      >
        <Container>
          <MainCard>
            <h1>{ title }</h1>
            <RichText html={lead} className="lead-content" />
          </MainCard>
        </Container>
      </HeroMain>
    </Hero>
  );
}

HeroFullImage.defaultProps = {
  imageAlign: 'center',
  lead: '',
};

HeroFullImage.propTypes = {
  bgImage: PropTypes.string.isRequired,
  imageAlign: PropTypes.string,
  title: PropTypes.string.isRequired,
  lead: PropTypes.string,
};

export default HeroFullImage;
