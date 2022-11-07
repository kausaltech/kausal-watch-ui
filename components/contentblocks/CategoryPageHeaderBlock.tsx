import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { gql, useQuery } from '@apollo/client';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import PlanContext from 'context/plan';
import { Link } from 'common/links';
import CategoryMetaBar from 'components/actions/CategoryMetaBar';
import AttributesBlock from 'components/common/AttributesBlock';

export const GET_CATEGORY_ATTRIBUTE_TYPES = gql`
  query GetCategoryAttributeTypes($plan: ID!) {
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

const HeaderBackground = styled.div<{bg: string}>`
  position: relative;
  min-height: 26rem;
  background-color: ${(props) => props.bg};
`;

const CategoryPageHeader = styled.div<{bg: string, image: string, imageAlign: string}>`
  position: absolute;
  height: 26rem;
  width: 100%;
  top: 0;
  left: 0;
  background-color: ${(props) => props.bg ? props.bg : props.theme.brandDark};
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

const AttributesContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Breadcrumb = styled.div`
  font-size: ${(props) => props.theme.fontSizeMd};
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

const CategoryIconImage = styled.img`
  max-height: ${(props) => props.theme.spaces.s600};
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

function CategoryPageHeaderBlock(props) {
  const {
    title,
    categoryId,
    identifier,
    lead,
    iconImage,
    headerImage,
    imageAlign,
    parentTitle,
    parentUrl,
    color,
    attributes,
    typeId,
    level,
  } = props;

  const plan = useContext(PlanContext);
  let attributeTypes = [];
  if (attributes?.length) {
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
              {
                iconImage && (
                  <CategoryIconImage src={iconImage} alt />
                )
              }
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
              { attributes?.length > 0 && (
                <AttributesContainer>
                <AttributesBlock
                  attributes={attributes}
                  types={attributeTypes}
                />
                {plan.actionStatuses.length ? <CategoryMetaBar category={categoryId} /> : null}
                </AttributesContainer>
              )}
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
