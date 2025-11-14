import React from 'react';

import { useTranslations } from 'next-intl';
import { readableColor } from 'polished';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';

const HeaderImage = styled.div<{ $image: string; $imageAlign: string }>`
  background-image: url(${(props) => props.$image});
  background-size: cover;
  background-position: ${(props) => props.$imageAlign};
  color: ${(props) => props.theme.themeColors.white};
  height: calc(4 * ${(props) => props.theme.spaces.s400});
  background-color: ${(props) => props.theme.brandDark};
`;

const HeaderBg = styled.div`
  background-color: ${(props) => props.theme.brandDark};
  color: ${(props) =>
    readableColor(
      props.theme.brandDark,
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
        props.theme.brandDark,
        props.theme.themeColors.black,
        props.theme.themeColors.white,
        true
      )} !important;
  }

  .lead {
    max-width: ${(props) => props.theme.breakpointLg};
  }
`;

export const ImageCredit = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.1rem 0.25rem;
  background-color: rgba(255, 255, 255, 0.66);
  color: #000000;
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`};
`;

type Props = {
  title: string;
  lead?: string | null;
  headerImage?: string | null | undefined;
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

  return (
    <>
      {/* TODO: animate image entry? */}
      <HeaderBg>
        {headerImage && <HeaderImage $image={headerImage} $imageAlign={imageAlign} />}
        {altText && <span className="sr-only" role="img" aria-label={altText} />}
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
