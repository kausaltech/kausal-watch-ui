import type {
  ActionListFilterFragment,
  ActionTableColumnFragmentFragment,
  DashboardActionListQuery,
  PlanContextFragment,
} from '@/common/__generated__/graphql';
import type {
  CategoryHierarchyMember,
  CategoryMappedAction,
  CategoryTypeHierarchy,
} from '@/common/categories';
import type { OrgMappedAction, OrganizationWithHierarchy } from '@/common/organizations';

type OrganizationInput = NonNullable<DashboardActionListQuery['planOrganizations']>[0];

export type ActionListOrganization = OrganizationWithHierarchy<OrganizationInput>;

type QueryAction = NonNullable<DashboardActionListQuery['planActions']>[0];

export type ActionListAction = QueryAction &
  OrgMappedAction<ActionListOrganization> &
  CategoryMappedAction<ActionListCategoryType, ActionListCategory>;

export type ActionListCategoryTypeFilterBlock = ActionListFilterFragment & {
  __typename?: 'CategoryTypeFilterBlock';
};

export type ActionListActionAttributeTypeFilterBlock = ActionListFilterFragment & {
  __typename?: 'ActionAttributeTypeFilterBlock';
};

type QueryCategoryType = NonNullable<DashboardActionListQuery['plan']>['categoryTypes'][0];

type CategoryInput = QueryCategoryType['categories'][0];

export type ActionListCategory = CategoryInput & CategoryHierarchyMember<ActionListCategoryType>;

export type ActionListCategoryType = QueryCategoryType & CategoryTypeHierarchy<ActionListCategory>;

export type ActionListPrimaryOrg = NonNullable<DashboardActionListQuery['plan']>['primaryOrgs'][0];

type ActionTableColumn = NonNullable<ActionTableColumnFragmentFragment['dashboardColumns']>[number];

export type ColumnBlock = ActionTableColumn['__typename'] | 'PlanColumnBlock';

export interface ColumnConfig {
  __typename: ColumnBlock;
  columnLabel?: string | null;
  attributeType?: {
    __typename?: 'ActionAttributeType';
    id: string;
    name: string;
    format?: string;
  };
}

export interface ActionListPlan {
  id: string;
  name: string;
  identifier?: string;
  shortName?: string | null;
  viewUrl?: string | null;
  generalContent: Pick<
    PlanContextFragment['generalContent'],
    'actionTaskTerm' | 'actionTerm' | 'organizationTerm' | 'indicatorTerm'
  >;
  image?: {
    rendition?: {
      src: string;
    } | null;
    /* Square-cropped rendition; only fetched for the plan context plan,
     * whose default rendition is a non-square 300x200 card image. */
    square?: {
      src: string;
    } | null;
  } | null;
  actionImplementationPhases: PlanContextFragment['actionImplementationPhases'];
}
