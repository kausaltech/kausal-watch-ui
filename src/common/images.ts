import { gql } from '@apollo/client';

import type { MultiUseImageFragmentFragment } from './__generated__/graphql';

/*
 * With `object-fit: cover`, an object-position of P% hides P% of the
 * overflowing image before the visible window. Positioning by the slack on
 * either side of the focal area makes cropping consume the space outside the
 * area first, so the whole focal area stays visible whenever it fits in the
 * container — regardless of the container's aspect ratio.
 */
const getAxisPositionPercent = (focalCenter: number, focalSize: number, imageSize: number) => {
  const start = Math.max(0, focalCenter - focalSize / 2);
  const end = Math.min(imageSize, focalCenter + focalSize / 2);
  const slackBefore = start;
  const slackAfter = imageSize - end;
  const position = slackBefore + slackAfter > 0 ? slackBefore / (slackBefore + slackAfter) : 0.5;
  return (position * 100).toFixed(1);
};

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

  // Wagtail stores focalPointX/Y as the center of the focal area
  const xPercent = getAxisPositionPercent(
    image.focalPointX,
    image.focalPointWidth ?? 0,
    image.width
  );
  const yPercent = getAxisPositionPercent(
    image.focalPointY,
    image.focalPointHeight ?? 0,
    image.height
  );

  return `${xPercent}% ${yPercent}%`;
};

export type ImageRenditionRef = {
  src: string;
  width: number;
} | null;

/* Build an <img> srcSet string out of image renditions of different sizes */
export const getImageSrcSet = (renditions: (ImageRenditionRef | undefined)[]) =>
  renditions
    .filter((rendition) => rendition != null)
    .map((rendition) => `${rendition.src} ${rendition.width}w`)
    .join(', ');

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
        full: rendition(size: "3840x2560", crop: false) {
          id
          width
          height
          src
        }
        fullSmall: rendition(size: "800x800", crop: false) {
          id
          width
          height
          src
        }
        fullMedium: rendition(size: "1600x1600", crop: false) {
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
