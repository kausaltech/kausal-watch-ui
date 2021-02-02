import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';

const CategoryPageHeader = styled.div`
  background-color: ${(props) => props.bg};
  padding: ${(props) => props.theme.spaces.s300};
`;

const HeaderContent = styled.div`
  padding: ${(props) => props.theme.spaces.s300};
  overflow: hidden;
  border-width: ${(props) => props.theme.cardBorderWidth};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) => props.theme.themeColors.white };
`;

const CategoryPageHeaderBlock = (props) => {
  const { title, lead, headerImage } = props;
  const fakeprops = {
    themeColor: '#29549A',
  };

  const { categories, themeColor } = fakeprops;
  return (
    <CategoryPageHeader bg={themeColor}>
      <Container>
        <Row>
          <Col lg={{ size: 10, offset: 1 }}>
            <HeaderContent>
              <h1>{ title }</h1>
              <p className="lead">{ lead }</p>
            </HeaderContent>
          </Col>
        </Row>
      </Container>
    </CategoryPageHeader>
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

export default CategoryPageHeaderBlock;
