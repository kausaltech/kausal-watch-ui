import React, { ReactNode } from 'react';

import { PlanContextFragment } from 'common/__generated__/graphql';
import dayjs from 'common/dayjs';
import { getActionTaskTermContext, getActionTermContext } from 'common/i18n';
import { ActionLink } from 'common/links';
import ActionAttribute from 'components/common/ActionAttribute';
import Icon from 'components/common/Icon';

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
import DateCell from './cells/DateCell';
import ImplementationPhaseCell from './cells/ImplementationPhaseCell';
import IndicatorsCell from './cells/IndicatorsCell';
import OrganizationCell from './cells/OrganizationCell';
import ResponsiblePartiesCell from './cells/ResponsiblePartiesCell';
import StatusCell from './cells/StatusCell';
import TasksStatusCell from './cells/TasksStatusCell';
import UpdatedAtCell from './cells/UpdatedAtCell';
import { ActionListAction, ColumnBlock } from './dashboard.types';

const getPlanUrl = (mergedWith, actionPlan, planId) => {
  if (mergedWith && mergedWith?.plan.id !== planId) return mergedWith.plan.viewUrl;
  if (actionPlan.id !== planId) return actionPlan.viewUrl;
  return undefined;
};

interface Column {
  sortable?: boolean;
  headerKey?: keyof ActionListAction;
  rowHeader?: boolean;
  renderTooltipContent?: (
    t: TFunction,
    action: ActionListAction,
    plan: PlanContextFragment,
    attribute?: any // TODO: tighter type
  ) => ReactNode;
  headerClassName?: string;
  cellClassName?: string;
  renderHeader: (t: TFunction, plan: PlanContextFragment, label?: string | null) => ReactNode;
  renderCell: (
    t: TFunction,
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
    renderCell: (_, action, plan) => <StatusCell action={action} plan={plan} />,
  },

  IdentifierColumnBlock: {
    renderHeader: (t, _, label) => <abbr>{label || t('action-id')}</abbr>,
    renderCell: (_, action) => action.identifier,
  },

  NameColumnBlock: {
    sortable: true,
    headerKey: 'name',
    rowHeader: true,
    renderHeader: (t, plan, label) => label || t('action-name-title', getActionTermContext(plan)),
    renderCell: (_, action, plan, planViewUrl) => {
      const { mergedWith } = action;
      const fromOtherPlan = action.plan ? action.plan.id !== plan.id : false;
      const mergedWithActionFromOtherPlan = mergedWith != null && mergedWith.plan.id !== plan.id;
      return (
        <ActionLink
          action={action}
          viewUrl={action.mergedWith?.viewUrl ?? action.viewUrl}
          planUrl={getPlanUrl(mergedWith, action.plan, plan.id) ?? planViewUrl}
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
    renderCell: (_, action) => <OrganizationCell action={action} />,
    renderTooltipContent: (_, action) => <OrganizationTooltipContent action={action} />,
  },

  ImplementationPhaseColumnBlock: {
    sortable: true,
    headerKey: 'implementationPhase',
    renderHeader: (t, _, label) => label || t('action-implementation-phase'),
    renderCell: (_, action, plan) => {
      const fromOtherPlan = action.plan ? action.plan.id !== plan.id : false;
      return <ImplementationPhaseCell action={action} plan={fromOtherPlan ? action.plan : plan} />;
    },
    renderTooltipContent: (_, action, plan) => {
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
    renderHeader: (t, plan, label) => label || t('action-tasks', getActionTaskTermContext(plan)),
    renderCell: (_, action, plan) => <TasksStatusCell action={action} plan={plan} />,
    renderTooltipContent: (_, action, plan) => {
      const fromOtherPlan = action.plan ? action.plan.id !== plan.id : false;
      return <TasksTooltipContent action={action} plan={fromOtherPlan ? action.plan : plan} />;
    },
  },

  ResponsiblePartiesColumnBlock: {
    renderHeader: (t, _, label) => label || t('action-responsibles-short'),
    renderCell: (_, action) => <ResponsiblePartiesCell action={action} />,
    renderTooltipContent: (_, action, plan) => {
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
    renderCell: (_, action) => <IndicatorsCell action={action} />,
    renderTooltipContent: (_, action) => <IndicatorsTooltipContent action={action} />,
  },

  UpdatedAtColumnBlock: {
    sortable: true,
    headerKey: 'updatedAt',
    renderHeader: (t, _, label) => label || t('action-last-updated'),
    renderCell: (_, action) => <UpdatedAtCell action={action} />,
    renderTooltipContent: (_, action) => <LastUpdatedTooltipContent action={action} />,
  },

  StartDateColumnBlock: {
    sortable: true,
    headerKey: 'startDate',
    renderHeader: (t, _, label) => label || t('action-start-date'),
    renderCell: (_, action) => <DateCell date={action.startDate} />,
  },

  EndDateColumnBlock: {
    sortable: true,
    headerKey: 'endDate',
    renderHeader: (t, _, label) => label || t('action-end-date'),
    renderCell: (_, action) => <DateCell date={action.endDate} />,
  },

  ScheduleContinuousColumnBlock: {
    sortable: true,
    headerKey: 'scheduleContinuous',
    renderHeader: (t, _, label) => label || t('action-continuous'),
    renderCell: (t, action) => (
      <Icon
        name={action.scheduleContinuous ? 'check-circle' : 'circle-outline'}
        alt={action.scheduleContinuous ? t('action-continuous') : t('action-not-continuous')}
      />
    ),
    renderTooltipContent: (t, action) =>
      action.scheduleContinuous ? t('action-continuous') : t('action-not-continuous'),
  },

  FieldColumnBlock: {
    renderHeader: (t, _, label) => label,
    renderCell: (_, action, __, ___, attributeType) => {
      const attributeContent = action.attributes.find((a) => a.type.id === attributeType.id);
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
    renderTooltipContent: (_, action, __, attributeType) => {
      const attributeContent = action.attributes.find((a) => a.type.id === attributeType.id);
      if (!attributeContent) return null;
      return <AttributeTooltipContent attribute={attributeContent} attributeType={attributeType} />;
    },
  },
  PlanColumnBlock: {
    renderHeader: (t, _, label) => label || t('filter-plan'),
    renderCell: (_, action, plan) =>
      action.plan?.shortIdentifier ||
      plan?.shortIdentifier || (
        <PlanChip
          planImage={action.plan?.image?.rendition?.src || plan?.image?.rendition?.src}
          size="lg"
        />
      ),
    renderTooltipContent: (_, action, plan) => <PlanTooltipContent action={action} plan={plan} />,
  },
};
