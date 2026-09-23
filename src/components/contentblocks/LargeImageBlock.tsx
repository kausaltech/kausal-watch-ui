import styled from '@emotion/styled';

import { useTranslations } from 'next-intl';
import { Col, Container, Row } from 'reactstrap';

import type { StreamFieldFragment } from '@/common/__generated__/graphql';
import { getImageSrcSet } from '@/common/images';

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

// Rendered width of the image at each Bootstrap container breakpoint,
// derived from the container widths (1320/1140/960/720) and the column
// fractions in getColSize, so the browser picks the smallest sufficient rendition.
function getSizes(width: LargeImageBlockFragment['width'], hasSidebar: boolean) {
  if (width === 'maximum') {
    return '(min-width: 1400px) 1320px, (min-width: 1200px) 1140px, (min-width: 992px) 960px, (min-width: 768px) 720px, 100vw';
  }
  return hasSidebar
    ? '(min-width: 1400px) 770px, (min-width: 1200px) 665px, (min-width: 992px) 640px, (min-width: 768px) 600px, 100vw'
    : '(min-width: 1400px) 660px, (min-width: 1200px) 570px, (min-width: 992px) 640px, (min-width: 768px) 600px, 100vw';
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
