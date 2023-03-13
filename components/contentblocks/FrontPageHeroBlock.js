import React from 'react';
import PropTypes from 'prop-types';
import HeroFullImage from 'components/home/HeroFullImage';

const FrontPageHeroBlock = (props) => {
  const {
    layout, imageSrc, imageAlign, heading, lead,
    altText, imageCredit,
  } = props;
  return (
    <HeroFullImage
      bgImage={imageSrc}
      imageAlign={imageAlign}
      title={heading}
      lead={lead}
      layout={layout}
      imageCredit={imageCredit}
      altText={altText}
    />
  );
};

FrontPageHeroBlock.defaultProps = {
  layout: 'big-image',
  imageSrc: '',
  imageAlign: 'left',
  lead: '',
  altText: '',
  imageCredit: '',
};

FrontPageHeroBlock.propTypes = {
  layout: PropTypes.string,
  imageSrc: PropTypes.string,
  imageAlign: PropTypes.string,
  heading: PropTypes.string.isRequired,
  lead: PropTypes.string,
  altText: PropTypes.string,
  imageCredit: PropTypes.string,
};

export default FrontPageHeroBlock;
