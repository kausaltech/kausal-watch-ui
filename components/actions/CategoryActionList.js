import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';

import ActionCard from 'components/actions/ActionCard';
import ContentLoader from 'components/common/ContentLoader';
import ErrorMessage from 'components/common/ErrorMessage';
import { usePlan } from 'context/plan';
import { useTranslations } from 'next-intl';
import { getActionTermContext } from '@/common/i18n';

const GET_ACTION_LIST = gql`
  query GetActionList($plan: ID!, $clientUrl: String!) {
    planActions(plan: $plan) {
      ...ActionCard
      hasDependencyRelationships
      image {
        id
        rendition(size: "600x300") {
          id
          width
          height
          src
          alt
        }
      }
    }
  }
  ${ActionCard.fragments.action}
`;

const ActionListSection = styled.div`
  background-color: ${(props) => props.color};
  padding: ${(props) => props.theme.spaces.s200} 0
    ${(props) => props.theme.spaces.s400};
`;

const SectionHeader = styled.h2`
  text-align: center;
  padding: ${(props) => props.theme.spaces.s100};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) => props.theme.themeColors.white};
  color: ${(props) => props.theme.headingsColor};
  margin-bottom: ${(props) => props.theme.spaces.s300};
`;

const EmptyActionListHeader = styled.p`
  text-align: center;
  opacity: 0.6;
  font-size: 1.2em;
  padding: ${(props) => props.theme.spaces.s100};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  margin-bottom: ${(props) => props.theme.spaces.s300};
`;

const ListRow = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  margin: 0 -0.5rem;
  padding: 0;

  .lazyload-wrapper {
    width: 100%;
  }

  .card {
    height: 100%;
  }
`;

const ListColumn = styled.li`
  flex: 0 0 50%;
  padding: 0.5rem;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    flex: 0 0 33%;
  }

  @media (min-width: ${(props) => props.theme.breakpointLg}) {
    flex: 0 0 25%;
  }
`;

const childIds = (categoryID, cats) => {
  const immediateChildren = cats.filter((cat) => {
    if (categoryID === 0) return cat.parent === null;
    return cat.parent?.id === categoryID;
  });
  return immediateChildren.length > 0
    ? immediateChildren.map((child) => child.id)
    : null;
};

const findAllChildren = (categoryID, cats, children = []) => {
  const immediateChildren = childIds(categoryID, cats);
  let allChildren = immediateChildren
    ? children.concat(immediateChildren)
    : children;
  if (immediateChildren?.length > 0)
    immediateChildren.forEach((element) => {
      allChildren = findAllChildren(element, cats, allChildren);
    });
  return allChildren;
};

const filterByCategory = (actions, catId, categories, categoryIsRoot) => {
  // For the root category, don't show _all_ actions recursively but
  // only the ones which are directly connected to the root category.
  const recursiveCategories = categoryIsRoot
    ? []
    : findAllChildren(catId, categories);
  recursiveCategories.push(catId);
  return actions.filter((action) =>
    action.categories.find((cat) => recursiveCategories.indexOf(cat.id) > -1)
  );
};

const CategoryActionList = (props) => {
  const { activeCategory, categories } = props;
  const t = useTranslations();
  const plan = usePlan();
  const { loading, error, data } = useQuery(GET_ACTION_LIST, {
    variables: {
      plan: plan.identifier,
      clientUrl: plan.viewUrl,
    },
  });
  if (loading) return <ContentLoader />;
  if (error) return <ErrorMessage message={error.message} />;

  const { planActions } = data;
  const isCategoryRoot = activeCategory.parent == null;

  if (!planActions) {
    return <ErrorMessage statusCode={404} message={t('page-not-found')} />;
  }

  const filteredActions = filterByCategory(
    planActions,
    activeCategory.id,
    categories,
    isCategoryRoot
  );
  if (filteredActions.length === 0) {
    return (
      <EmptyActionListHeader>
        {isCategoryRoot ? t('select-sector-for-actions') : t('no-actions')}
      </EmptyActionListHeader>
    );
  }
  const heading = t('filter-result-actions', getActionTermContext(plan));

  // const MotionCard = motion(ActionCard);
  return (
    <ActionListSection>
      <Container>
        {heading && (
          <SectionHeader>
            {filteredActions.length} {heading}
          </SectionHeader>
        )}
        {/* TODO: animate transition with Framer */}
        <ListRow>
          {filteredActions.map((action) => (
            <ListColumn
              key={action.id}
              className="mb-4 d-flex align-items-stretch"
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              layout
            >
              <ActionCard action={action} />
            </ListColumn>
          ))}
        </ListRow>
      </Container>
    </ActionListSection>
  );
};

CategoryActionList.propTypes = {
  activeCategory: PropTypes.any.isRequired,
  categories: PropTypes.array,
};

export default CategoryActionList;
