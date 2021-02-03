import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { DynamicLink } from 'common/links';

const CategoryPageHeader = styled.div`
  background-color: ${(props) => props.bg};
  padding: ${(props) => props.theme.spaces.s300};
  background-image: url(${(props) => props.image});
  background-position: center;
  background-size: cover;
`;

const HeaderContent = styled.div`
  padding: ${(props) => props.theme.spaces.s300};
  overflow: hidden;
  border-width: ${(props) => props.theme.cardBorderWidth};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) => props.theme.themeColors.white };
`;

const CategoryPageHeaderBlock = (props) => {
  const { title, lead, headerImage, parentTitle, parentUrl, color } = props;
  const fakeprops = {
    themeColor: color,
  };

  const { themeColor } = fakeprops;
  return (
    <CategoryPageHeader bg={themeColor} image={headerImage}>
      <Container>
        <Row>
          <Col lg={{ size: 10, offset: 1 }}>
            <HeaderContent>
              <p><DynamicLink href={parentUrl}><a>{parentTitle}</a></DynamicLink></p>
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
};

CategoryPageHeaderBlock.propTypes = {
  title: PropTypes.string.isRequired,
  lead: PropTypes.string,
  headerImage: PropTypes.string,
};

export default CategoryPageHeaderBlock;
