import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import HeroFullImage from 'components/home/HeroFullImage';

const IndicatorGraphSection = styled.div`
  background-color: ${(props) => props.theme.themeColors.light};
  padding: ${(props) => props.theme.spaces.s300};
`;

const FrontPageHeroBlock = (props) => {
  const { layout, imageSrc, heading, lead } = props;
  return (
    <HeroFullImage
      bgImage={imageSrc}
      title={heading}
      siteDescription={lead}
      actionsDescription=""
      indicatorsDescription=""
    />
  );
};

FrontPageHeroBlock.defaultProps = {
  layout: 'big-image',
  imageSrc: '',
  lead: '',
};

FrontPageHeroBlock.propTypes = {
  layout: PropTypes.string,
  imageSrc: PropTypes.string,
  heading: PropTypes.string.isRequired,
  lead: PropTypes.string,
};

export default FrontPageHeroBlock;
