import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'common/i18n';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';

const HeaderImage = styled.div`
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: ${(props) => props.theme.imageAlign};
  color: ${(props) => props.theme.themeColors.white};
  height: calc(4 * ${(props) => props.theme.spaces.s400});
  background-color: ${(props) => props.theme.brandDark};
`;

const HeaderBg = styled.div`
  background-color: ${(props) => props.theme.brandDark};
  color: ${(props) => props.theme.themeColors.white};
  position: relative;
`;

const ContentHeader = styled.header`
  padding: ${(props) => props.theme.spaces.s400} 0
    ${(props) => props.theme.spaces.s200};
  font-family: ${(props) => props.theme.fontFamilyContent};

  h1 {
    margin-bottom: ${(props) => props.theme.spaces.s150};
    font-size: ${(props) => props.theme.fontSizeXxl};
    color: ${(props) => props.theme.themeColors.white} !important;
  }

  .lead {
    max-width: ${(props) => props.theme.breakpointLg};
  }
`;

const ImageCredit = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.25rem 0.5rem;
  background-color: rgba(255, 255, 255, 0.66);
  color: #000000;
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => props.theme.fontFamilyTiny};

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    top: inherit;
    bottom: 0;
  }
`;

const ContentPageHeaderBlock = (props) => {
  const { title, lead, headerImage, imageAlign, altText, imageCredit } = props;

  const { t } = useTranslation();

  return (
    <>
      {/* TODO: animate image entry? */}
      <HeaderBg>
        {headerImage && (
          <HeaderImage image={headerImage} imageAlign={imageAlign} />
        )}
        {altText && (
          <span className="sr-only" role="img" aria-label={altText} />
        )}
        {imageCredit && (
          <ImageCredit>{`${t('image-credit')}: ${imageCredit}`}</ImageCredit>
        )}
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
};

ContentPageHeaderBlock.defaultProps = {
  lead: null,
  headerImage: null,
  imageAlign: 'center',
};

ContentPageHeaderBlock.propTypes = {
  title: PropTypes.string.isRequired,
  lead: PropTypes.string,
  headerImage: PropTypes.string,
  imageAlign: PropTypes.string,
};

export default ContentPageHeaderBlock;
