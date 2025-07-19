import React from 'react';

import HeroFullImage from 'components/home/HeroFullImage';
import HeroSmallImage from 'components/home/HeroSmallImage';

interface FrontPageHeroProps {
  id: string;
  layout: 'small_image' | 'big_image';
  image: any;
  imageAlign: string;
  heading: string | null | undefined;
  lead: string | null | undefined;
  altText: string | null | undefined;
  imageCredit: string | null | undefined;
}

const FrontPageHeroBlock = (props: FrontPageHeroProps) => {
  const {
    id = '',
    layout = 'big_image',
    image,
    imageAlign,
    heading,
    lead,
    altText,
    imageCredit,
  } = props;

  /*
    FrontPageHeroBlock has two layout options: big_image (default) and small_image.
    big_image: uses browser width background image cropped to max height with content overlay
    small_image: uses text block width background image uncropped with content box below
  */

  const imageSrc = layout === 'small_image' ? image?.full?.src : image?.large?.src;

  return layout === 'small_image' ? (
    <HeroSmallImage
      id={id}
      bgImage={imageSrc}
      title={heading}
      lead={lead}
      imageCredit={imageCredit}
      altText={altText}
    />
  ) : (
    <HeroFullImage
      id={id}
      bgImage={imageSrc}
      imageAlign={imageAlign}
      title={heading}
      lead={lead}
      imageCredit={imageCredit}
      altText={altText}
    />
  );
};

export default FrontPageHeroBlock;
