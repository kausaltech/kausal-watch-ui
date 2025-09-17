import React from 'react';

import { useTranslations } from 'next-intl';
import { Table } from 'reactstrap';

import { getStatusSummary } from '@/common/ActionStatusSummary';
import type { IndicatorDetailsQuery } from '@/common/__generated__/graphql';
import { getActionTermContext } from '@/common/i18n';
import { ActionLink } from '@/common/links';
import ActionImpact from '@/components/actions/ActionImpact';
import StatusBadge from '@/components/common/StatusBadge';
import { usePlan } from '@/context/plan';

type Action = NonNullable<NonNullable<IndicatorDetailsQuery['indicator']>['actions']>[number];

export default function ActionsTable({ actions }: { actions: Action[] }) {
  const t = useTranslations();
  const plan = usePlan();

  return (
    <Table hover responsive>
      <thead>
        <tr>
          <th colSpan={2} scope="col">
            {t('action', getActionTermContext(plan))}
          </th>
          <th scope="col">{t('action-progress')}</th>
          <th scope="col">{t('action-impact')}</th>
        </tr>
      </thead>
      <tbody>
        {actions.map((action) => (
          <tr key={action.id}>
            <td>
              {plan.features.hasActionIdentifiers ? (
                <ActionLink action={action} key={action.id}>
                  <strong>{action.identifier}</strong>
                </ActionLink>
              ) : null}
            </td>
            <td>
              <ActionLink action={action} key={action.id}>
                <strong>{action.name}</strong>
              </ActionLink>
            </td>
            <td width="200">
              {action.status && (
                <StatusBadge
                  plan={plan}
                  action={{
                    ...action,
                    statusSummary: getStatusSummary(plan, action.statusSummary),
                  }}
                />
              )}
            </td>
            <td>
              {action.impact && (
                <ActionImpact identifier={action.impact.identifier} name={action.impact.name} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
