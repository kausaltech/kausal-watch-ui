import React, { ReactNode } from 'react';

import { PlanContextFragment } from 'common/__generated__/graphql';
import { getActionTaskTermContext, getActionTermContext } from 'common/i18n';
import { ActionLink } from 'common/links';
import ActionAttribute from 'components/common/ActionAttribute';

import { TFunction } from '@/common/i18n';

import PlanChip from '../plans/PlanChip';
import {
  AttributeTooltipContent,
  ImplementationPhaseTooltipContent,
  IndicatorsTooltipContent,
  LastUpdatedTooltipContent,
  OrganizationTooltipContent,
  PlanTooltipContent,
  ResponsiblePartiesTooltipContent,
  TasksTooltipContent,
} from './ActionTableTooltips';
import ImplementationPhaseCell from './cells/ImplementationPhaseCell';
import IndicatorsCell from './cells/IndicatorsCell';
import OrganizationCell from './cells/OrganizationCell';
import ResponsiblePartiesCell from './cells/ResponsiblePartiesCell';
import StatusCell from './cells/StatusCell';
import TasksStatusCell from './cells/TasksStatusCell';
import UpdatedAtCell from './cells/UpdatedAtCell';
import { ActionListAction, ColumnBlock } from './dashboard.types';

const getPlanUrl = (mergedWith, actionPlan, planId) => {
  if (mergedWith && mergedWith?.plan.id !== planId)
    return mergedWith.plan.viewUrl;
  if (actionPlan.id !== planId) return actionPlan.viewUrl;
  return undefined;
};

interface Column {
  sortable?: boolean;
  headerKey?: keyof ActionListAction;
  rowHeader?: boolean;
  renderTooltipContent?: (
    action: ActionListAction,
    plan: PlanContextFragment,
    attribute?: any // TODO: tighter type
  ) => ReactNode;
  headerClassName?: string;
  cellClassName?: string;
  renderHeader: (
    t: TFunction,
    plan: PlanContextFragment,
    label?: string | null
  ) => ReactNode;
  renderCell: (
    action: ActionListAction,
    plan: PlanContextFragment,
    planViewUrl?: string | null,
    attribute?: any // TODO: tighter type
  ) => ReactNode;
}

export const COLUMN_CONFIG: { [key in ColumnBlock]: Column } = {
  // TODO: Add tooltip?
  StatusColumnBlock: {
    renderHeader: (t, _, label) => label || t('status'),
    renderCell: (action, plan) => <StatusCell action={action} plan={plan} />,
  },

  IdentifierColumnBlock: {
    renderHeader: (t, _, label) => <abbr>{label || t('action-id')}</abbr>,
    renderCell: (action) => action.identifier,
  },

  // TODO: Remove from the backend
  ImpactColumnBlock: {
    renderHeader: () => '',
    renderCell: () => '',
  },

  NameColumnBlock: {
    sortable: true,
    headerKey: 'name',
    rowHeader: true,
    renderHeader: (t, plan, label) =>
      label || t('action-name-title', getActionTermContext(plan)),
    renderCell: (action, plan, planViewUrl) => {
      const { mergedWith } = action;
      const fromOtherPlan = action.plan ? action.plan.id !== plan.id : false;
      const mergedWithActionFromOtherPlan =
        mergedWith != null && mergedWith.plan.id !== plan.id;
      return (
        <ActionLink
          action={action}
          viewUrl={action.mergedWith?.viewUrl ?? action.viewUrl}
          planUrl={getPlanUrl(mergedWith, action.plan, plan.id)}
          crossPlan={fromOtherPlan || mergedWithActionFromOtherPlan}
        >
          <a>{action.name}</a>
        </ActionLink>
      );
    },
  },

  OrganizationColumnBlock: {
    headerClassName: 'logo-column',
    renderHeader: (t, _, label) => label || t('logo'),
    renderCell: (action) => <OrganizationCell action={action} />,
    renderTooltipContent: (action) => (
      <OrganizationTooltipContent action={action} />
    ),
  },

  ImplementationPhaseColumnBlock: {
    sortable: true,
    headerKey: 'implementationPhase',
    renderHeader: (t, _, label) => label || t('action-implementation-phase'),
    renderCell: (action, plan) => {
      const fromOtherPlan = action.plan ? action.plan.id !== plan.id : false;
      return (
        <ImplementationPhaseCell
          action={action}
          plan={fromOtherPlan ? action.plan : plan}
        />
      );
    },
    renderTooltipContent: (action, plan) => {
      const fromOtherPlan = action.plan ? action.plan.id !== plan.id : false;
      return (
        <ImplementationPhaseTooltipContent
          action={action}
          plan={fromOtherPlan ? action.plan : plan}
        />
      );
    },
  },

  TasksColumnBlock: {
    renderHeader: (t, plan, label) =>
      label || t('action-tasks', getActionTaskTermContext(plan)),
    renderCell: (action, plan) => (
      <TasksStatusCell action={action} plan={plan} />
    ),
    renderTooltipContent: (action, plan) => {
      const fromOtherPlan = action.plan ? action.plan.id !== plan.id : false;
      return (
        <TasksTooltipContent
          action={action}
          plan={fromOtherPlan ? action.plan : plan}
        />
      );
    },
  },

  ResponsiblePartiesColumnBlock: {
    renderHeader: (t, _, label) => label || t('action-responsibles-short'),
    renderCell: (action) => <ResponsiblePartiesCell action={action} />,
    renderTooltipContent: (action, plan) => {
      const fromOtherPlan = action.plan ? action.plan.id !== plan.id : false;
      return (
        <ResponsiblePartiesTooltipContent
          action={action}
          plan={fromOtherPlan ? action.plan : plan}
        />
      );
    },
  },

  IndicatorsColumnBlock: {
    renderHeader: (t, _, label) => label || t('indicators'),
    renderCell: (action) => <IndicatorsCell action={action} />,
    renderTooltipContent: (action) => (
      <IndicatorsTooltipContent action={action} />
    ),
  },

  UpdatedAtColumnBlock: {
    sortable: true,
    headerKey: 'updatedAt',
    renderHeader: (t, _, label) => label || t('action-last-updated'),
    renderCell: (action) => <UpdatedAtCell action={action} />,
    renderTooltipContent: (action) => (
      <LastUpdatedTooltipContent action={action} />
    ),
  },
  FieldColumnBlock: {
    renderHeader: (t, _, label) => label,
    renderCell: (action, _, __, attributeType) => {
      const attributeContent = action.attributes.find(
        (a) => a.type.id === attributeType.id
      );
      if (!attributeContent) return null;
      return (
        <ActionAttribute
          attribute={attributeContent}
          attributeType={attributeType}
          notitle
          minimized
        />
      );
    },
    renderTooltipContent: (action, _, attributeType) => {
      const attributeContent = action.attributes.find(
        (a) => a.type.id === attributeType.id
      );
      if (!attributeContent) return null;
      return (
        <AttributeTooltipContent
          attribute={attributeContent}
          attributeType={attributeType}
        />
      );
    },
  },
  PlanColumnBlock: {
    renderHeader: (t, _, label) => label || t('filter-plan'),
    renderCell: (action, plan) =>
      action.plan?.shortIdentifier ||
      plan?.shortIdentifier || (
        <PlanChip
          planImage={
            action.plan?.image?.rendition?.src || plan?.image?.rendition?.src
          }
          size="lg"
        />
      ),
    renderTooltipContent: (action, plan) => (
      <PlanTooltipContent action={action} plan={plan} />
    ),
  },
};
