import { useEffect, useMemo } from 'react';

import styled from '@emotion/styled';

import { type TypedDocumentNode, gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { useTranslations } from 'next-intl';
import { Container } from 'reactstrap';

import ContentLoader from '@common/components/ContentLoader';

import type {
  ActionCardFragment,
  ActionListForBlockQuery,
  ActionListForBlockQueryVariables,
} from '@/common/__generated__/graphql';
import { getActionTermContext } from '@/common/i18n';
import ActionCard from '@/components/actions/ActionCard';
import ActionCardList from '@/components/actions/ActionCardList';
import ErrorMessage from '@/components/common/ErrorMessage';
import { usePlan } from '@/context/plan';
import { useWorkflowSelector } from '@/context/workflow-selector';

import { getReadableThemeTextColor } from './colorUtils';

const GET_ACTION_LIST_FOR_BLOCK: TypedDocumentNode<
  ActionListForBlockQuery,
  ActionListForBlockQueryVariables
> = gql`
  query ActionListForBlock($plan: ID!, $category: ID, $clientUrl: String, $workflow: WorkflowState)
  @workflow(state: $workflow) {
    planActions(plan: $plan, category: $category) {
      ...ActionCard
      hasDependencyRelationships
    }
  }
  ${ActionCard.fragments.action}
`;

const ActionListSection = styled.div`
  background-color: ${(props) => props.theme.section.actionListBlock.background};
  padding: var(--block-padding-top) 0 var(--block-padding-bottom);
`;

export const SectionHeader = styled.h2`
  text-align: center;
  padding: 0;
  color: ${(props) =>
    getReadableThemeTextColor(
      props.theme.neutralLight,
      props.theme.headingsColor,
      props.theme.themeColors.white
    )};
  margin-bottom: var(--block-header-margin-bottom);
  font-size: ${(props) => props.theme.fontSizeLg};

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    font-size: ${(props) => props.theme.fontSizeXl};
  }
`;

const ParentGroupHeading = styled.h3`
  margin: ${({ theme }) => `${theme.spaces.s400} 0 ${theme.spaces.s400}`};
  font-size: ${({ theme }) => theme.fontSizeLg};
  color: ${({ theme }) => theme.headingsColor};
`;

const GroupHeading = styled.h4`
  margin: ${({ theme }) => `${theme.spaces.s150} 0 ${theme.spaces.s150}`};
  font-size: ${({ theme }) => theme.fontSizeBase};
  color: ${({ theme }) => theme.textColor.primary};
`;

type CategoryNode = {
  id: string;
  name?: string | null;
  order?: number | null;
  level?: { id?: string | null } | null;
  parent?: CategoryNode | null;
};

// Convert a category parent hierarchy to a flat array (typed version of getDeepParents)
const getParents = (cat?: CategoryNode | null): CategoryNode[] => {
  if (!cat) return [];
  return [...getParents(cat.parent), cat];
};

const getNodeAtLevel = (cat?: CategoryNode | null, levelId?: string | null) => {
  if (!cat || !levelId) return undefined;
  if (cat.level?.id === levelId) return cat;
  return getParents(cat).find((p) => p?.level?.id === levelId);
};

const compareOrderName = (a?: CategoryNode, b?: CategoryNode) => {
  const ao = a?.order ?? 0;
  const bo = b?.order ?? 0;
  if (ao !== bo) return ao - bo;
  const an = (a?.name ?? '').toLocaleLowerCase();
  const bn = (b?.name ?? '').toLocaleLowerCase();
  return an.localeCompare(bn);
};

function buildGroupsForPageCategory(
  actions: ActionCardFragment[],
  groupLevelId: string,
  pageCategoryId: string
): {
  mode: 'oneLevel' | 'twoLevels';
  oneLevel?: Array<{ group: CategoryNode; actions: ActionCardFragment[] }>;
  twoLevels?: Array<{
    parentGroup: CategoryNode;
    children: Array<{ group: CategoryNode; actions: ActionCardFragment[] }>;
  }>;
  /** Actions that don't resolve to any category at the grouping level */
  ungrouped: ActionCardFragment[];
} {
  const groupedActionIds = new Set<string>();
  const getUngrouped = () => actions.filter((a) => !groupedActionIds.has(a.id));

  let sample: { parentId?: string; grandParentId?: string } | null = null;
  outer: for (const a of actions) {
    for (const c of a.categories as unknown as CategoryNode[]) {
      const node = getNodeAtLevel(c, groupLevelId);
      if (node) {
        sample = {
          parentId: node.parent?.id,
          grandParentId: node.parent?.parent?.id,
        };
        break outer;
      }
    }
  }

  // oneLevel-level (group is a child of page category)
  if (sample?.parentId === pageCategoryId) {
    const map = new Map<string, { group: CategoryNode; actions: ActionCardFragment[] }>();
    for (const a of actions) {
      for (const c of a.categories as unknown as CategoryNode[]) {
        const node = getNodeAtLevel(c, groupLevelId);
        if (!node) continue;
        if (!map.has(node.id)) map.set(node.id, { group: node, actions: [] });
        map.get(node.id)!.actions.push(a);
        groupedActionIds.add(a.id);
      }
    }
    const oneLevel = Array.from(map.values()).sort((x, y) => compareOrderName(x.group, y.group));
    return { mode: 'oneLevel', oneLevel, ungrouped: getUngrouped() };
  }

  // twoLevels-level (group is a grandchild under page category)
  if (sample?.grandParentId === pageCategoryId) {
    const parentMap = new Map<
      string,
      {
        parentGroup: CategoryNode;
        children: Map<string, { group: CategoryNode; actions: ActionCardFragment[] }>;
      }
    >();

    for (const a of actions) {
      for (const c of a.categories as unknown as CategoryNode[]) {
        const node = getNodeAtLevel(c, groupLevelId);
        if (!node) continue;
        const parent = node.parent;
        if (!parent) continue;

        let parentBucket = parentMap.get(parent.id);
        if (!parentBucket) {
          parentBucket = { parentGroup: parent, children: new Map() };
          parentMap.set(parent.id, parentBucket);
        }

        let child = parentBucket.children.get(node.id);
        if (!child) {
          child = { group: node, actions: [] };
          parentBucket.children.set(node.id, child);
        }
        child.actions.push(a);
        groupedActionIds.add(a.id);
      }
    }

    const twoLevels = Array.from(parentMap.values())
      .sort((a, b) => compareOrderName(a.parentGroup, b.parentGroup))
      .map(({ parentGroup, children }) => ({
        parentGroup,
        children: Array.from(children.values()).sort((a, b) => compareOrderName(a.group, b.group)),
      }));

    return { mode: 'twoLevels', twoLevels, ungrouped: getUngrouped() };
  }

  const fallback = new Map<string, { group: CategoryNode; actions: ActionCardFragment[] }>();
  for (const a of actions) {
    for (const c of a.categories as unknown as CategoryNode[]) {
      const node = getNodeAtLevel(c, groupLevelId);
      if (!node) continue;
      if (!fallback.has(node.id)) fallback.set(node.id, { group: node, actions: [] });
      fallback.get(node.id)!.actions.push(a);
      groupedActionIds.add(a.id);
    }
  }
  const oneLevel = Array.from(fallback.values()).sort((x, y) => compareOrderName(x.group, y.group));
  return { mode: 'oneLevel', oneLevel, ungrouped: getUngrouped() };
}

type ActionListBlockProps = {
  id?: string;
  categoryId: string;
  heading?: string | null;
  lead?: string | null;
  groupByLevel?: { id: string } | null;
};

const ActionListBlock = (props: ActionListBlockProps) => {
  const { id = '', categoryId, heading, groupByLevel } = props;
  const t = useTranslations();

  const plan = usePlan();
  const { workflow, setLoading } = useWorkflowSelector();
  const { loading, error, data } = useQuery(GET_ACTION_LIST_FOR_BLOCK, {
    variables: {
      plan: plan.identifier,
      category: categoryId,
      clientUrl: plan.viewUrl,
      workflow,
    },
  });
  useEffect(() => {
    if (!loading) setLoading(false);
  }, [loading, setLoading]);

  const planActions: ActionCardFragment[] = useMemo(() => data?.planActions ?? [], [data]);
  const groupLevelId = groupByLevel?.id ?? null;

  const groups = useMemo(
    () => (groupLevelId ? buildGroupsForPageCategory(planActions, groupLevelId, categoryId) : null),
    [planActions, groupLevelId, categoryId]
  );

  // Don't group by primary org inside the cards when grouping by category level
  const innerGroupBy = !groupLevelId && plan.primaryOrgs.length > 0 ? 'primaryOrg' : 'none';

  const displayHeader = heading ? heading : t('actions-plural', getActionTermContext(plan));

  const namedGroupCount = groups
    ? groups.mode === 'oneLevel'
      ? groups.oneLevel!.length
      : groups.twoLevels!.length
    : 0;

  // Actions whose categories don't resolve to any group are listed last under "Other"
  const ungroupedSection = groups && groups.ungrouped.length > 0 && (
    <section aria-labelledby="group-other">
      <GroupHeading id="group-other">{t('other')}</GroupHeading>
      <ActionCardList
        actions={groups.ungrouped}
        groupBy={innerGroupBy}
        headingHierarchyDepth={2}
        includeRelatedPlans={false}
        showOtherCategory={false}
        compactTopMargin={true}
      />
    </section>
  );

  if (error)
    return (
      <ErrorMessage
        message={t('error-loading-actions', getActionTermContext(plan))}
        details={error?.message}
      />
    );
  if (loading && !data) return <ContentLoader message={t('loading')} />;

  return (
    <ActionListSection id={id}>
      <Container>
        {/* Terrible hack to be able to hide header completely if it's set to '-' */}
        {displayHeader && displayHeader !== '-' ? (
          <SectionHeader>{displayHeader}</SectionHeader>
        ) : null}
        {!groups || namedGroupCount === 0 ? (
          // No grouping configured, or nothing resolved to a group — plain list
          <ActionCardList
            actions={planActions}
            groupBy={innerGroupBy}
            headingHierarchyDepth={2}
            includeRelatedPlans={false}
            showOtherCategory={false}
            compactTopMargin={false}
            centerAlignOnSingleRow
          />
        ) : groups.mode === 'oneLevel' ? (
          <>
            {groups.oneLevel!.map(({ group, actions }) => (
              <section key={group.id} aria-labelledby={`group-${group.id}`}>
                <GroupHeading id={`group-${group.id}`}>{group.name ?? '—'}</GroupHeading>
                <ActionCardList
                  actions={actions}
                  groupBy={innerGroupBy}
                  headingHierarchyDepth={2}
                  includeRelatedPlans={false}
                  showOtherCategory={false}
                  compactTopMargin={true}
                />
              </section>
            ))}
            {ungroupedSection}
          </>
        ) : (
          <>
            {groups.twoLevels!.map(({ parentGroup, children }) => (
              <div key={parentGroup.id}>
                <ParentGroupHeading>{parentGroup.name ?? '—'}</ParentGroupHeading>
                {children.map(({ group, actions }) => (
                  <section key={group.id} aria-labelledby={`group-${group.id}`}>
                    <GroupHeading id={`group-${group.id}`}>{group.name ?? '—'}</GroupHeading>
                    <ActionCardList
                      actions={actions}
                      groupBy={innerGroupBy}
                      headingHierarchyDepth={2}
                      includeRelatedPlans={false}
                      showOtherCategory={false}
                      compactTopMargin={true}
                    />
                  </section>
                ))}
              </div>
            ))}
            {ungroupedSection}
          </>
        )}
      </Container>
    </ActionListSection>
  );
};

export default ActionListBlock;
