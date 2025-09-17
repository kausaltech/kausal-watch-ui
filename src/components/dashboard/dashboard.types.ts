import type {
  ActionDashboardColumnBlock,
  ActionListFilterFragment,
  DashboardActionListQuery,
  Plan,
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

export type ColumnBlock = NonNullable<ActionDashboardColumnBlock['__typename'] | 'PlanColumnBlock'>;

export interface ColumnConfig {
  __typename: ColumnBlock;
  columnLabel?: string | null;
  attributeType?: {
    __typename?: 'ActionAttributeType';
    id: string;
    name: string;
  };
}

export interface ActionListPlan {
  id: string;
  name: string;
  shortName?: string;
  viewUrl: string;
  generalContent: {
    actionTaskTerm: Plan['generalContent']['actionTaskTerm'];
    organizationTerm: Plan['generalContent']['organizationTerm'];
  };
  image: {
    rendition: {
      src: string;
    };
  };
  actionImplementationPhases: Plan['actionImplementationPhases'];
}
