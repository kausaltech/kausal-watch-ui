import { gql } from '@apollo/client';

export const getBgImageAlignment = (image) => {
  if (!image?.focalPointX) return 'center center';
  const focalCentre = [image.focalPointX, image.focalPointY];
  const imageCentre = [image.width / 2, image.height / 2];
  const imageAlignment = ['center', 'center'];
  const focalOffsetX = imageCentre[0] / focalCentre[0];
  const focalOffsetY = imageCentre[1] / focalCentre[1];

  if (focalOffsetX > 1.5) imageAlignment[0] = 'left';
  if (focalOffsetX < 0.75) imageAlignment[0] = 'right';

  if (focalOffsetY > 1.5) imageAlignment[1] = 'top';
  if (focalOffsetY < 0.75) imageAlignment[1] = 'bottom';

  return `${imageAlignment[0]} ${imageAlignment[1]}`;
};

/* Resolve image for an action */
/* If not available fallback on category or plan image */
export function getActionImage(plan, action) {
  let image;

  if (action.image?.rendition.src) {
    image = action.image;
  } else {
    action.categories.forEach((cat) => {
      if (image) return;
      let parent = cat;
      while (parent) {
        if (parent.image?.rendition.src) {
          image = parent.image;
          return;
        }
        parent = parent.parent;
      }
    });
  }
  if (!image) {
    image = plan.image;
  }
  return image;
}

export function resizeImageUrl(plan) {
  return plan;
}

const images = {};

images.fragments = {
  multiUseImage: gql`
  fragment MultiUseImageFragment on Image {
    title
    altText
    imageCredit
    width
    height
    focalPointX
    focalPointY
    large: rendition(size:"1600x600") {
      width
      height
      src
    }
    small: rendition(size:"600x300") {
      width
      height
      src
    }
    social: rendition(size:"1200x627") {
      width
      height
      src
    }
    rendition(size:"300x200") {
      width
      height
      src
    }
  }
  `,
};

export default images;
