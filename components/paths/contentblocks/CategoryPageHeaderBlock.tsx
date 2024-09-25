import React from 'react';

import { CategoryTypePageLevelLayout } from 'common/__generated__/graphql';
import Breadcrumbs from 'components/common/Breadcrumbs';
import { CategoryPage } from 'components/common/CategoryPageStreamField';
import { usePaths } from 'context/paths/paths';
import { usePlan } from 'context/plan';
import { useTranslations } from 'next-intl';
import styled, { useTheme } from 'styled-components';

import { gql } from '@apollo/client';

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

const PathsActionImpact = styled.div`
  display: flex;
  margin-right: 1rem;
  gap: 1rem;
  align-content: stretch;
  align-items: stretch;

  > div {
    padding: 1rem;
    background: #fff;
    flex: 50% 0 0;

    > div {
      display: flex;
      > div {
        margin-right: 1rem;
      }
    }
  }
`;

const CategoryHeader = styled.div`
  width: 100%;
  position: relative;
  padding: 1rem;
  background-color: ${(props) => props.theme.cardBackground.primary};
  margin-bottom: 1rem;

  h1 {
    font-size: ${(props) => props.theme.fontSizeXl};
  }
`;

const Identifier = styled.span`
  color: ${(props) => props.theme.textColor.tertiary};
`;

// TODO: Type props
interface Props {
  page: CategoryPage;
  title: string;
  categoryId: string;
  identifier;
  lead?: string;
  attributes;
  typeId;
  level;
  layout?: CategoryTypePageLevelLayout['layoutMainTop'];
}

function CategoryPageHeaderBlock(props: Props) {
  const { title, identifier, lead, level } = props;
  const plan = usePlan();
  const paths = usePaths();
  const theme = useTheme();
  const t = useTranslations();

  const hasPaths = paths?.instance.id;
  const showLevel =
    level && !theme.settings.categories.categoryPageHideCategoryLabel;

  return (
    <CategoryHeader>
      <Breadcrumbs
        breadcrumbs={[
          {
            id: '1',
            name: 'Massnahmenpakete',
            url: '/',
          },
          {
            id: '2',
            name: 'Pakete',
            url: '/categories/',
          },
          {
            id: '3',
            name: title,
            url: `/categories/${identifier}/`,
          },
        ]}
      />
      <h1>
        {identifier && <Identifier>{identifier}.</Identifier>} {title}
      </h1>
      {hasPaths && (
        <PathsActionImpact>
          <div>
            <h4>Emissions (2022)</h4>
            <div>
              <div>
                Direct emissions<h5>XXX</h5>
              </div>
              <div>
                Indirect emissions<h5>XXX</h5>
              </div>
            </div>
          </div>
          <div>
            <h4>Emissions target (2024)</h4>
            <div>
              <div>
                Direct emissions<h5>XXX</h5>
              </div>
              <div>
                Indirect emissions<h5>XXX</h5>
              </div>
            </div>
          </div>
        </PathsActionImpact>
      )}
      {lead && <p>{lead}</p>}
    </CategoryHeader>
  );
}

export default CategoryPageHeaderBlock;
