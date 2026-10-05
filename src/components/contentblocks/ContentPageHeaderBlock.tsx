import styled from '@emotion/styled';

import { useTranslations } from 'next-intl';
import { readableColor } from 'polished';

import { useContainImages } from '@/common/hooks/use-contain-images';
import { type HeroImageRenditions, getImageSrcSet } from '@/common/images';
import ContainedHeaderImage from '@/components/common/ContainedHeaderImage';
import { Col, Container, Row } from '@/components/common/layout/LayoutGrid';

import { ImageCredit } from '../common/ImageCredit';

const HeaderImage = styled.div`
  position: relative;
  overflow: hidden;
  color: ${(props) => props.theme.themeColors.white};
  height: calc(4 * ${(props) => props.theme.spaces.s400});
  background-color: ${(props) => props.theme.brandDark};

  ${(props) => props.theme.breakpoints.up('lg')} {
    height: calc(4.5 * ${(props) => props.theme.spaces.s400});
  }

  ${(props) => props.theme.breakpoints.up('xl')} {
    height: calc(6 * ${(props) => props.theme.spaces.s400});
  }
`;

const HeaderImageImg = styled.img<{ $imageAlign: string }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${(props) => props.$imageAlign};
`;

const HeaderBg = styled.div`
  background-color: ${(props) => props.theme.pageHeaderBackgroundColor};
  color: ${(props) =>
    readableColor(
      props.theme.pageHeaderBackgroundColor,
      props.theme.themeColors.black,
      props.theme.themeColors.white
    )};
  position: relative;
`;

const ContentHeader = styled.header<{ $contained?: boolean }>`
  padding: ${(props) => props.theme.spaces.s400} 0 ${(props) => props.theme.spaces.s200};
  font-family: ${(props) => `${props.theme.fontFamilyContent}, ${props.theme.fontFamilyFallback}`};
  h1 {
    margin-bottom: ${(props) => props.theme.spaces.s150};
    font-size: ${(props) => props.theme.fontSizeXxl};
    ${({ theme, $contained }) =>
      !$contained &&
      `color: ${readableColor(
        theme.pageHeaderBackgroundColor,
        theme.themeColors.black,
        theme.themeColors.white,
        true
      )} !important;`}
  }

  .lead {
    max-width: 992px;
  }
`;

type Props = {
  title: string;
  lead?: string | null;
  headerImage?: HeroImageRenditions | null;
  imageAlign?: string;
  altText?: string;
  imageCredit?: string;
  /** Defaults to `contained` when the theme sets `settings.layout.containImages` */
  layout?: ContentPageHeaderLayout;
};

export type ContentPageHeaderLayout = 'full-width' | 'contained';

export default function ContentPageHeaderBlock(props: Props) {
  const {
    title,
    lead = null,
    headerImage = null,
    imageAlign = 'center',
    altText = '',
    imageCredit,
  } = props;

  const t = useTranslations();
  const containImages = useContainImages();
  const layout: ContentPageHeaderLayout =
    props.layout ?? (containImages ? 'contained' : 'full-width');

  if (layout === 'contained') {
    return (
      <>
        {headerImage && (
          <ContainedHeaderImage
            image={headerImage}
            imageAlign={imageAlign}
            altText={altText}
            imageCredit={imageCredit}
          />
        )}
        <Container>
          <Row>
            <Col>
              <ContentHeader $contained>
                <h1>{title}</h1>
                {lead && <p className="lead">{lead}</p>}
              </ContentHeader>
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  const headerImageSrc = headerImage
    ? (headerImage.fullMedium ?? headerImage.full ?? headerImage.fullSmall)?.src
    : undefined;

  return (
    <>
      <HeaderBg>
        {headerImage && headerImageSrc && (
          <HeaderImage>
            <HeaderImageImg
              src={headerImageSrc}
              srcSet={getImageSrcSet([
                headerImage.fullSmall,
                headerImage.fullMedium,
                headerImage.full,
              ])}
              sizes="100vw"
              alt={altText ?? ''}
              $imageAlign={imageAlign}
            />
          </HeaderImage>
        )}
        {imageCredit && <ImageCredit>{`${t('image-credit')}: ${imageCredit}`}</ImageCredit>}
      </HeaderBg>
      <HeaderBg>
        <Container>
          <Row>
            <Col>
              <ContentHeader>
                <h1>{title}</h1>
                {lead && <p className="lead">{lead}</p>}
              </ContentHeader>
            </Col>
          </Row>
        </Container>
      </HeaderBg>
    </>
  );
}
