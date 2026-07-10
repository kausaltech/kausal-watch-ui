import React from 'react';

import styled from '@emotion/styled';

import { useTranslations } from 'next-intl';
import { readableColor } from 'polished';
import { Col, Container, Row } from 'reactstrap';

import { type ImageRenditionRef, getImageSrcSet } from '@/common/images';

import { ImageCredit } from '../common/ImageCredit';

const HeaderImage = styled.div`
  position: relative;
  overflow: hidden;
  color: ${(props) => props.theme.themeColors.white};
  height: calc(4 * ${(props) => props.theme.spaces.s400});
  background-color: ${(props) => props.theme.brandDark};

  @media (min-width: ${(props) => props.theme.breakpointLg}) {
    height: calc(4.5 * ${(props) => props.theme.spaces.s400});
  }

  @media (min-width: ${(props) => props.theme.breakpointXl}) {
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

const ContentHeader = styled.header`
  padding: ${(props) => props.theme.spaces.s400} 0 ${(props) => props.theme.spaces.s200};
  font-family: ${(props) => `${props.theme.fontFamilyContent}, ${props.theme.fontFamilyFallback}`};
  h1 {
    margin-bottom: ${(props) => props.theme.spaces.s150};
    font-size: ${(props) => props.theme.fontSizeXxl};
    color: ${(props) =>
      readableColor(
        props.theme.pageHeaderBackgroundColor,
        props.theme.themeColors.black,
        props.theme.themeColors.white,
        true
      )} !important;
  }

  .lead {
    max-width: ${(props) => props.theme.breakpointLg};
  }
`;

interface HeaderImageRenditions {
  small?: ImageRenditionRef;
  large?: ImageRenditionRef;
  full?: ImageRenditionRef;
}

type Props = {
  title: string;
  lead?: string | null;
  headerImage?: HeaderImageRenditions | null;
  imageAlign?: string;
  altText?: string;
  imageCredit?: string;
};

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

  const headerImageSrc = headerImage
    ? (headerImage.large ?? headerImage.full ?? headerImage.small)?.src
    : undefined;

  return (
    <>
      <HeaderBg>
        {headerImage && headerImageSrc && (
          <HeaderImage>
            <HeaderImageImg
              src={headerImageSrc}
              srcSet={getImageSrcSet([headerImage.small, headerImage.large, headerImage.full])}
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
