import React from 'react';
import PropTypes from 'prop-types';
import HeroFullImage from 'components/home/HeroFullImage';

const FrontPageHeroBlock = (props) => {
  const { layout, imageSrc, imageAlign, heading, lead } = props;
  return (
    <HeroFullImage
      bgImage={imageSrc}
      imageAlign={imageAlign}
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
  imageAlign: 'left',
  lead: '',
};

FrontPageHeroBlock.propTypes = {
  layout: PropTypes.string,
  imageSrc: PropTypes.string,
  imageAlign: PropTypes.string,
  heading: PropTypes.string.isRequired,
  lead: PropTypes.string,
};

export default FrontPageHeroBlock;
