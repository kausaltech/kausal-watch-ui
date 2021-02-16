import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { DynamicLink } from 'common/links';

const CategoryPageHeader = styled.div`
  min-height: 24rem;
  background-color: ${(props) => props.bg};
  padding: ${(props) => props.theme.spaces.s200} ${(props) => props.theme.spaces.s050};
  background-color: ${(props) => props.bg};
  background-image: url(${(props) => props.image});
  background-position: ${(props) => props.imageAlign};
  background-size: cover;
  background-blend-mode: multiply;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    padding: ${(props) => props.theme.spaces.s400} ${(props) => props.theme.spaces.s050};
  }
`;

const HeaderContent = styled.div`
  padding: ${(props) => props.theme.spaces.s150};
  overflow: hidden;
  border-width: ${(props) => props.theme.cardBorderWidth};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) => props.theme.themeColors.white};

  h1 {
    font-size: ${(props) => props.theme.fontSizeLg};
  }

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    padding: ${(props) => props.theme.spaces.s300};
    h1 {
      font-size: ${(props) => props.theme.fontSizeXxl};
    }
  }
`;

const Breadcrumb = styled.div`
  font-size: ${(props) => props.theme.fontSizeMd};
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

const CategoryPageHeaderBlock = (props) => {
  const {
    title,
    identifier,
    lead,
    headerImage,
    imageAlign,
    parentTitle,
    parentUrl,
    color } = props;


  return (
    <CategoryPageHeader
      bg={color}
      imageAlign={imageAlign}
      image={headerImage}
    >
      <Container>
        <Row>
          <Col lg={{ size: 10, offset: 1 }}>
            <HeaderContent>
              { parentTitle && (
                <Breadcrumb>
                  <DynamicLink href={parentUrl}><a>{parentTitle}</a></DynamicLink>
                  {' '}
                  /
                </Breadcrumb>
              )}
              <h1>{ title }</h1>
              <p className="lead">{ lead }</p>
            </HeaderContent>
          </Col>
        </Row>
      </Container>
    </CategoryPageHeader>
  );
};

CategoryPageHeaderBlock.defaultProps = {
  lead: null,
  headerImage: null,
  imageAlign: 'center',
};

CategoryPageHeaderBlock.propTypes = {
  title: PropTypes.string.isRequired,
  lead: PropTypes.string,
  headerImage: PropTypes.string,
  imageAlign: PropTypes.string,
};

export default CategoryPageHeaderBlock;
