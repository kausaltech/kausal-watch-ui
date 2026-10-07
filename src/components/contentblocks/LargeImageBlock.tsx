import styled from '@emotion/styled';

import { useTranslations } from 'next-intl';

import type { StreamFieldFragment } from '@/common/__generated__/graphql';
import { getImageSrcSet } from '@/common/images';
import { Col, Container, Row } from '@/components/common/layout/LayoutGrid';

import { ImageCredit } from '../common/ImageCredit';

type LargeImageBlockFragment = Extract<StreamFieldFragment, { __typename: 'LargeImageBlock' }>;

const LargeImageSection = styled.div`
  padding-top: calc(var(--block-padding-top) / 2);
  padding-bottom: calc(var(--block-padding-bottom) / 2);
  background-color: ${({ theme }) => theme.section.largeImageBlock.background};
`;

const ImageWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Image = styled.img`
  display: block;
  width: 100%;
`;

type Breakpoint = 'xl' | 'lg' | 'md';

/**
 * LargeImageBlock can have two widths:
 * maximum: image is full container size
 * fit_to_column: image is limited to text block width
 * Image keeps its original ratio and doesn't crop
 */
function getColSize(
  width: LargeImageBlockFragment['width'],
  hasSidebar: boolean,
  breakpoint: Breakpoint
) {
  if (width === 'maximum') return {};
  switch (breakpoint) {
    case 'xl':
      return { size: hasSidebar ? 7 : 6, offset: hasSidebar ? 4 : 3 };
    case 'lg':
      return { size: 8, offset: hasSidebar ? 4 : 2 };
    case 'md':
    default:
      return { size: 10, offset: 1 };
  }
}

// Rendered width of the image at each container breakpoint, derived from the
// container's content widths (the caps 1200/1400 minus the 25.6px gutters;
// full width below lg) and the column fractions in getColSize, so the browser
// picks the smallest sufficient rendition.
function getSizes(width: LargeImageBlockFragment['width'], hasSidebar: boolean) {
  if (width === 'maximum') {
    return '(min-width: 1400px) 1349px, (min-width: 1200px) 1149px, 100vw';
  }
  return hasSidebar
    ? '(min-width: 1400px) 777px, (min-width: 1200px) 758px, (min-width: 768px) calc(83.33vw - 47px), 100vw'
    : '(min-width: 1400px) 662px, (min-width: 1200px) 758px, (min-width: 768px) calc(83.33vw - 47px), 100vw';
}

type LargeImageBlockProps = {
  id: string;
  image: LargeImageBlockFragment['image'];
  width: LargeImageBlockFragment['width'];
  hasSidebar: boolean;
};

export default function LargeImageBlock({ id, image, width, hasSidebar }: LargeImageBlockProps) {
  const t = useTranslations();

  return (
    <LargeImageSection>
      <Container id={id}>
        <Row>
          <Col
            xl={getColSize(width, hasSidebar, 'xl')}
            lg={getColSize(width, hasSidebar, 'lg')}
            md={getColSize(width, hasSidebar, 'md')}
            style={{ position: 'relative' }}
          >
            <ImageWrapper>
              <Image
                src={image?.fullMedium?.src ?? image?.full?.src}
                srcSet={getImageSrcSet([image?.fullSmall, image?.fullMedium, image?.full])}
                sizes={getSizes(width, hasSidebar)}
                alt={image?.altText}
              />
              {image?.imageCredit && (
                <ImageCredit>{`${t('image-credit')}: ${image.imageCredit}`}</ImageCredit>
              )}
            </ImageWrapper>
          </Col>
        </Row>
      </Container>
    </LargeImageSection>
  );
}
