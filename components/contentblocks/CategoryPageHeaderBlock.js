import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { gql, useQuery } from '@apollo/client';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import PlanContext from 'context/plan';
import { Link } from 'common/links';
import CategoryAttributesBlock from './CategoryAttributesBlock';

export const GET_CATEGORY_ATTRIBUTE_TYPES = gql`
  query GetAttributeTypes($plan: ID!) {
    plan(id: $plan) {
      id
      categoryTypes {
        id
        name
        attributeTypes {
          __typename
          format
          identifier
          choiceOptions {
            identifier
          }
        }
      }
    }
  }
`;

const HeaderBackground = styled.div`
  position: relative;
  min-height: 26rem;
  background-color: ${(props) => props.bg};
`;

const CategoryPageHeader = styled.div`
  position: absolute;
  height: 26rem;
  width: 100%;
  top: 0;
  left: 0;
  background-color: ${(props) => props.bg};
  padding: ${(props) => props.theme.spaces.s200} ${(props) => props.theme.spaces.s050};
  background-image: url(${(props) => props.image});
  background-position: ${(props) => props.imageAlign};
  background-size: cover;


  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    padding: ${(props) => props.theme.spaces.s400} ${(props) => props.theme.spaces.s050};
  }
`;

const Identifier = styled.span`
  color: ${(props) => props.theme.graphColors.grey050};
`;

const HeaderContent = styled.div`
  position: relative;
  padding: ${(props) => props.theme.spaces.s150};
  margin: ${(props) => props.theme.spaces.s800} 0 ${(props) => props.theme.spaces.s400};
  overflow: hidden;
  border-width: ${(props) => props.theme.cardBorderWidth};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) => props.theme.themeColors.white};
  box-shadow: 4px 4px 8px rgba(0,0,0,0.1);
  text-align: center;

  h1 {
    font-size: ${(props) => props.theme.fontSizeLg};
    margin-bottom: ${(props) => props.theme.spaces.s200};
  }

  p {
    font-size: ${(props) => props.theme.fontSizeMd};
    margin-bottom: 0;
  }

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    padding: ${(props) => props.theme.spaces.s300};
    h1 {
      font-size: ${(props) => props.theme.fontSizeXl};
    }
  }
`;

const Breadcrumb = styled.div`
  font-size: ${(props) => props.theme.fontSizeMd};
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

function CategoryPageHeaderBlock(props) {
  const {
    title,
    categoryId,
    identifier,
    lead,
    headerImage,
    imageAlign,
    parentTitle,
    parentUrl,
    color,
    attributes,
    typeId,
    level,
  } = props;

  let attributeTypes = [];

  if (attributes?.length) {
    const plan = useContext(PlanContext);
    const { loading, error, data } = useQuery(GET_CATEGORY_ATTRIBUTE_TYPES, {
      variables: {
        plan: plan.identifier,
      },
    });
    if (data) {
      const thisType = data.plan.categoryTypes.find((type) => type.id === typeId);
      attributeTypes = thisType.attributeTypes;
    }
  }

  return (
    <HeaderBackground bg={color}>
      <CategoryPageHeader
        bg={color}
        imageAlign={imageAlign}
        image={headerImage}
      />
      <Container className="header-container">
        <Row>
          <Col lg={{ size: 10, offset: 1 }}>
            <HeaderContent>
              { parentTitle && (
                <Breadcrumb>
                  <Link href={parentUrl}><a>{parentTitle}</a></Link>
                  {' '}
                  /
                </Breadcrumb>
              )}
              <h1>
                { identifier && (
                <Identifier>
                  {identifier}
                  .
                </Identifier>
                )}
                {' '}
                { title }
              </h1>
              {level}
              <p>{ lead }</p>
              { attributes?.length > 0
                  && <CategoryAttributesBlock attributes={attributes} color={color} id={categoryId} types={attributeTypes} /> }
            </HeaderContent>
          </Col>
        </Row>
      </Container>
    </HeaderBackground>
  );
}

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
