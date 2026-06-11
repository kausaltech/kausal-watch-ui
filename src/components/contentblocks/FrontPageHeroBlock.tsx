import HeroFullImage from '@/components/home/HeroFullImage';
import HeroSmallImage from '@/components/home/HeroSmallImage';

import HeroSideBySide from '../home/HeroSideBySide';

interface FocalBoxInfo {
  focalPointX: number;
  focalPointY: number;
  focalPointWidth: number;
  focalPointHeight: number;
  imageWidth: number;
  imageHeight: number;
}

interface ImageRendition {
  src?: string;
  width?: number;
  height?: number;
}

interface ImageData {
  full?: ImageRendition;
  large?: ImageRendition;
}

interface AdditionalSettings {
  backgroundColour?: string | null;
  fitImage?: boolean | null;
  showImageAccent?: boolean | null;
  backgroundCoversFullSection?: boolean | null;
}

interface FrontPageHeroProps {
  id: string;
  layout: 'small_image' | 'big_image' | 'side_by_side';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
  imageAlign: string;
  focalBox?: FocalBoxInfo;
  heading: string | null | undefined;
  lead: string | null | undefined;
  altText: string | null | undefined;
  imageCredit: string | null | undefined;
  additionalSettings?: AdditionalSettings | null;
}

const FrontPageHeroBlock = (props: FrontPageHeroProps) => {
  const {
    id = '',
    layout = 'big_image',
    image,
    imageAlign,
    focalBox,
    heading,
    lead,
    altText,
    imageCredit,
    additionalSettings,
  } = props;

  /*
    FrontPageHeroBlock has two layout options: big_image (default) and small_image.
    big_image: uses browser width background image cropped to max height with content overlay
    small_image: uses text block width background image uncropped with content box below
  */

  const typedImage = image as ImageData | undefined;
  const isFullImage = layout === 'small_image' || layout === 'side_by_side';
  const imageSrc = (isFullImage ? typedImage?.full?.src : typedImage?.large?.src) ?? '';

  if (layout === 'small_image') {
    return (
      <HeroSmallImage
        id={id}
        bgImage={imageSrc}
        title={heading}
        lead={lead}
        imageCredit={imageCredit}
        altText={altText}
        backgroundColor={additionalSettings?.backgroundColour}
        fitImage={additionalSettings?.fitImage}
        showImageAccent={additionalSettings?.showImageAccent}
        fullBackground={additionalSettings?.backgroundCoversFullSection}
      />
    );
  }

  if (layout === 'side_by_side') {
    return (
      <HeroSideBySide
        id={id}
        bgImage={imageSrc}
        title={heading}
        lead={lead}
        imageCredit={imageCredit}
        altText={altText}
        imageWidth={typedImage?.full?.width}
        imageHeight={typedImage?.full?.height}
        backgroundColor={additionalSettings?.backgroundColour}
        fitImage={additionalSettings?.fitImage}
      />
    );
  }

  return (
    <HeroFullImage
      id={id}
      bgImage={imageSrc}
      imageAlign={imageAlign}
      focalBox={focalBox}
      title={heading ?? undefined}
      lead={lead ?? undefined}
      imageCredit={imageCredit ?? undefined}
      altText={altText ?? undefined}
    />
  );
};

export default FrontPageHeroBlock;
