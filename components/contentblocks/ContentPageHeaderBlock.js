import React from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { Spring } from 'react-spring/renderprops.cjs';

const HeaderImage = styled.div`
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
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
  padding: ${(props) => props.theme.spaces.s400} 0 ${(props) => props.theme.spaces.s200};

  h1 {
    margin-bottom: ${(props) => props.theme.spaces.s150};
    font-size: ${(props) => props.theme.fontSizeXxl};
    color: ${(props) => props.theme.themeColors.white} !important;
  }
`;

const ContentPageHeaderBlock = (props) => {
  const { title, lead, headerImage } = props;
  return (
    <>
      <HeaderBg>
        { headerImage && (
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
          >
            {(props) => (
              <HeaderImage image={headerImage} style={props} />
            )}
          </Spring>
        )}
      </HeaderBg>
      <HeaderBg>
        <Container>
          <Row>
            <Col>
              <ContentHeader>
                <h1>{title}</h1>
                {lead && <p className="lead">{ lead }</p>}
              </ContentHeader>
            </Col>
          </Row>
        </Container>
      </HeaderBg>
    </>
  );
};

/*
CategoryListBlock.defaultProps = {
  heading: null,
};

CategoryListBlock.propTypes = {
  heading: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};
*/

export default ContentPageHeaderBlock;
