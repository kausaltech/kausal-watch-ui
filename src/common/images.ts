import { gql } from '@apollo/client';

import type { MultiUseImageFragmentFragment } from './__generated__/graphql';

export const getBgImageAlignment = (
  image: {
    focalPointX: number | null;
    focalPointY: number | null;
    focalPointWidth: number | null;
    focalPointHeight: number | null;
    width: number;
    height: number;
  } | null
) => {
  if (!image || image.focalPointX == null || image.focalPointY == null) {
    return 'center center';
  }

  const focalCenterX = image.focalPointX + (image.focalPointWidth ?? 0) / 2;
  const focalCenterY = image.focalPointY + (image.focalPointHeight ?? 0) / 2;

  const xPercent = (focalCenterX / image.width) * 100;
  const yPercent = (focalCenterY / image.height) * 100;

  return `${xPercent.toFixed(1)}% ${yPercent.toFixed(1)}%`;
};

type ActionWithImage = {
  image: MultiUseImageFragmentFragment | null;
  categories: {
    image: MultiUseImageFragmentFragment | null;
    parent?: {
      image: MultiUseImageFragmentFragment | null;
    } | null;
  }[];
};

/* Resolve image for an action */
/* If not available fallback on category or plan image */
export function getActionImage(
  plan: { image: MultiUseImageFragmentFragment | null },
  action: ActionWithImage
) {
  let image: MultiUseImageFragmentFragment | null = null;

  if (action.image?.rendition?.src) {
    image = action.image;
  } else {
    action.categories.forEach((cat) => {
      if (image) return;
      let parent: typeof cat | null | undefined = cat;
      while (parent) {
        if (parent.image?.rendition?.src) {
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

const images = {
  fragments: {
    multiUseImage: gql`
      fragment MultiUseImageFragment on Image {
        title
        altText
        imageCredit
        width
        height
        focalPointX
        focalPointY
        focalPointWidth
        focalPointHeight
        full: rendition(size: "1600x1600", crop: false) {
          id
          width
          height
          src
        }
        large: rendition(size: "1600x600") {
          id
          width
          height
          src
        }
        small: rendition(size: "600x300") {
          id
          width
          height
          src
        }
        social: rendition(size: "1200x627") {
          id
          width
          height
          src
        }
        rendition(size: "300x200") {
          id
          width
          height
          src
        }
      }
    `,
  },
};

export default images;
