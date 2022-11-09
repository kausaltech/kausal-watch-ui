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

const CategoryHeader = styled.div`
  width: 100%;
  position: relative;
  background-color: ${(props) => props.bg ? props.bg : props.theme.brandDark};
  padding: 0 0 2rem;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    display: flex;
    align-items: flex-start;
    min-height: ${(props) => props.hasImage ? '32rem' : '0'};
    padding: 0;
  }

  @media (min-width: ${(props) => props.theme.breakpointLg}) {
    ${(props) => props.hasImage ? '28rem' : '0'};
  }

  @media (min-width: ${(props) => props.theme.breakpointXl}) {
    ${(props) => props.hasImage ? '30rem' : '0'};
  }
`;

const CategoryHeaderImage = styled.div`
  min-height: ${(props) => props.image ? '14rem' : '0'};
  margin: 0 -1rem;
  background-size: cover;
  background-color: ${(props) => props.bg ? props.bg : props.theme.branddark};
  background-position: ${(props) => props.imageAlign};
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    position: absolute;
    width: 100%;
    min-height: ${(props) => props.image ? '32rem' : '0'};
    margin: 0;
  }
`;

const Identifier = styled.span`
  color: ${(props) => props.theme.graphColors.grey050};
`;

const HeaderContent = styled.div`
  position: relative;
  max-width: ${(props) => props.theme.breakpointMd};
  margin: ${(props) => props.hasImage ? '-2rem auto 0' : '1rem auto'};
  padding: ${(props) =>
    `${props.theme.spaces.s200}`};
  text-align: center;
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) => props.theme.themeColors.white};
  color: ${(props) => props.theme.neutralDark};
  box-shadow: 4px 4px 8px rgba(0,0,0,0.1);
  z-index: 100;

  h1 {
    font-size: ${(props) => props.theme.fontSizeLg};
    margin-bottom: ${(props) => props.theme.spaces.s200};

    &:last-child {
      margin-bottom: 0;
    }
  }

  p {
    font-size: ${(props) => props.theme.fontSizeMd};
    margin-bottom: ${(props) => props.theme.spaces.s100};

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    margin: ${(props) => props.hasImage ? '14rem auto 3rem' : '3rem auto'};

    h1 {
      font-size: ${(props) => props.theme.fontSizeXl};
    }
  }
`;

const AttributesContainer = styled.div`
  max-width: ${(props) => props.theme.breakpointMd};
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
    <CategoryHeader
      bg={color}
      hasImage={!!headerImage}
    >
      <CategoryHeaderImage
        bg={color}
        imageAlign={imageAlign}
        image={headerImage}
      />
      <Container className="header-container">
        <Row>
          <Col lg={{ size: 10, offset: 1 }} xl={{ size: 12, offset: 0 }}>
            <HeaderContent
              hasImage={!!headerImage}
            >
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
              { lead && <p>{ lead }</p> }
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
    </CategoryHeader>
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
