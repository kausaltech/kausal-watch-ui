import styled from '@emotion/styled';

import { useTranslations } from 'next-intl';

import { type HeroImageRenditions, getImageSrcSet } from '@/common/images';
import { Container } from '@/components/common/layout/LayoutGrid';

import { ImageCredit } from './ImageCredit';

const ImageBand = styled.div`
  background-color: ${(props) => props.theme.pageHeaderBackgroundColor};
  @media print {
    display: none;
  }
`;

/* Containers are full width below lg, so let the image run edge to edge there */
const ImageContainer = styled(Container)`
  ${(props) => props.theme.breakpoints.down('lg')} {
    && {
      padding-left: 0;
      padding-right: 0;
    }
  }
`;

const ImageFrame = styled.div`
  position: relative;
  height: 14rem;
  overflow: hidden;
  background-color: ${(props) => props.theme.brandDark};

  ${(props) => props.theme.breakpoints.up('md')} {
    height: 20rem;
  }

  ${(props) => props.theme.breakpoints.up('lg')} {
    height: 24rem;
  }

  ${(props) => props.theme.breakpoints.up('xl')} {
    height: 28rem;
  }
`;

const Img = styled.img<{ $imageAlign: string }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${(props) => props.$imageAlign};
`;

type Props = {
  image: HeroImageRenditions;
  imageAlign: string;
  altText?: string | null;
  imageCredit?: string | null;
};

/**
 * Page header image limited to the container width, used by the header
 * components when the theme sets `settings.layout.containImages`.
 */
export default function ContainedHeaderImage({ image, imageAlign, altText, imageCredit }: Props) {
  const t = useTranslations();
  const src = (image.fullMedium ?? image.full ?? image.fullSmall)?.src;
  if (!src) return null;

  return (
    <ImageBand>
      <ImageContainer>
        <ImageFrame>
          <Img
            src={src}
            srcSet={getImageSrcSet([image.fullSmall, image.fullMedium, image.full])}
            sizes="(min-width: 1400px) 1349px, (min-width: 1200px) 1149px, 100vw"
            alt={altText ?? ''}
            $imageAlign={imageAlign}
          />
          {imageCredit && <ImageCredit>{`${t('image-credit')}: ${imageCredit}`}</ImageCredit>}
        </ImageFrame>
      </ImageContainer>
    </ImageBand>
  );
}
