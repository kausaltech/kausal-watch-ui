import React, { ReactNode } from 'react';
import { TFunction } from '@/common/i18n';
import { ActionListAction, ColumnBlock } from './dashboard.types';
import { PlanContextFragment } from 'common/__generated__/graphql';
import { getActionTaskTermContext, getActionTermContext } from 'common/i18n';
import {
  ImplementationPhaseTooltipContent,
  IndicatorsTooltipContent,
  LastUpdatedTooltipContent,
  OrganizationTooltipContent,
  ResponsiblePartiesTooltipContent,
  TasksTooltipContent,
} from './ActionTableTooltips';
import StatusCell from './cells/StatusCell';
import ImplementationPhaseCell from './cells/ImplementationPhaseCell';
import { ActionLink } from 'common/links';
import OrganizationCell from './cells/OrganizationCell';
import TasksStatusCell from './cells/TasksStatusCell';
import ResponsiblePartiesCell from './cells/ResponsiblePartiesCell';
import IndicatorsCell from './cells/IndicatorsCell';
import UpdatedAtCell from './cells/UpdatedAtCell';

interface Column {
  sortable?: boolean;
  headerKey?: keyof ActionListAction;
  rowHeader?: boolean;
  renderTooltipContent?: (
    action: ActionListAction,
    plan: PlanContextFragment
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
    planViewUrl?: string | null
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
    renderCell: (action, _, planViewUrl) => (
      <ActionLink action={action} planUrl={planViewUrl}>
        {action.name}
      </ActionLink>
    ),
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
    renderCell: (action, plan) => (
      <ImplementationPhaseCell action={action} plan={plan} />
    ),
    renderTooltipContent: (action, plan) => (
      <ImplementationPhaseTooltipContent action={action} plan={plan} />
    ),
  },

  TasksColumnBlock: {
    renderHeader: (t, plan, label) =>
      label || t('action-tasks', getActionTaskTermContext(plan)),
    renderCell: (action, plan) => (
      <TasksStatusCell action={action} plan={plan} />
    ),
    renderTooltipContent: (action, plan) => (
      <TasksTooltipContent action={action} plan={plan} />
    ),
  },

  ResponsiblePartiesColumnBlock: {
    renderHeader: (t, _, label) => label || t('action-responsibles-short'),
    renderCell: (action) => <ResponsiblePartiesCell action={action} />,
    renderTooltipContent: (action) => (
      <ResponsiblePartiesTooltipContent action={action} />
    ),
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
};
