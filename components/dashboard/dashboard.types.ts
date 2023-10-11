import {
  OrganizationHierarchyMember,
  OrgMappedAction,
} from 'common/organizations';
import {
  ActionDashboardColumnBlock,
  ActionListFilterFragment,
  DashboardActionListQuery,
} from 'common/__generated__/graphql';
import {
  CategoryMappedAction,
  CategoryHierarchyMember,
  CategoryTypeHierarchy,
} from 'common/categories';

type OrganizationInput = NonNullable<
  DashboardActionListQuery['planOrganizations']
>[0];

export type ActionListOrganization = OrganizationInput &
  OrganizationHierarchyMember<OrganizationInput>;

type QueryAction = NonNullable<DashboardActionListQuery['planActions']>[0];

export type ActionListAction = QueryAction &
  OrgMappedAction<ActionListOrganization> &
  CategoryMappedAction<ActionListCategoryType, ActionListCategory>;

export type ActionListCategoryTypeFilterBlock = ActionListFilterFragment & {
  __typename?: 'CategoryTypeFilterBlock';
};

export type ActionListActionAttributeTypeFilterBlock =
  ActionListFilterFragment & { __typename?: 'ActionAttributeTypeFilterBlock' };

type QueryCategoryType = NonNullable<
  DashboardActionListQuery['plan']
>['categoryTypes'][0];

type CategoryInput = QueryCategoryType['categories'][0];

export type ActionListCategory = CategoryInput &
  CategoryHierarchyMember<ActionListCategoryType>;

export type ActionListCategoryType = QueryCategoryType &
  CategoryTypeHierarchy<ActionListCategory>;

export type ActionListPrimaryOrg = NonNullable<
  DashboardActionListQuery['plan']
>['primaryOrgs'][0];

export type ColumnBlock = NonNullable<ActionDashboardColumnBlock['__typename']>;

export interface ColumnConfig {
  __typename: ColumnBlock;
  columnLabel?: string | null;
}
