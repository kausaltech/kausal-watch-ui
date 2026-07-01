import { useTranslations } from 'next-intl';
import { Table } from 'reactstrap';

import type { IndicatorDetailsQuery } from '@/common/__generated__/graphql';
import { getActionTermContext } from '@/common/i18n';
import { ActionLink } from '@/common/links';
import ActionImpact from '@/components/actions/ActionImpact';
import StatusBadge from '@/components/common/StatusBadge';
import { usePlan } from '@/context/plan';

type Action = NonNullable<NonNullable<IndicatorDetailsQuery['indicator']>['actions']>[number];

const getPlanUrl = (
  mergedWith: Action['mergedWith'],
  actionPlan: Action['plan'],
  planId: string
) => {
  if (mergedWith && mergedWith.plan.id !== planId) return mergedWith.plan.viewUrl;
  if (actionPlan && actionPlan.id !== planId) return actionPlan.viewUrl;
  return undefined;
};

export default function ActionsTable({ actions }: { actions: Action[] }) {
  const t = useTranslations();
  const plan = usePlan();

  const actionsUseImpact = actions.some((action) => action.impact != null);
  return (
    <Table hover responsive>
      <thead>
        <tr>
          <th colSpan={2} scope="col">
            {t('action', getActionTermContext(plan))}
          </th>
          <th scope="col">{t('action-progress')}</th>
          {actionsUseImpact && <th scope="col">{t('action-impact')}</th>}
        </tr>
      </thead>
      <tbody>
        {actions.map((action) => {
          const { mergedWith } = action;
          const fromOtherPlan = action.plan ? action.plan.id !== plan.id : false;
          const mergedWithActionFromOtherPlan =
            mergedWith != null && mergedWith.plan.id !== plan.id;
          const linkProps = {
            viewUrl: mergedWith?.viewUrl ?? action.viewUrl ?? undefined,
            planUrl: getPlanUrl(mergedWith, action.plan, plan.id),
            crossPlan: fromOtherPlan || mergedWithActionFromOtherPlan,
          };
          return (
            <tr key={action.id}>
              <td>
                {plan.features.hasActionIdentifiers ? (
                  <ActionLink action={action} {...linkProps}>
                    <strong>{action.identifier}</strong>
                  </ActionLink>
                ) : null}
              </td>
              <td>
                <ActionLink action={action} {...linkProps}>
                  <strong>{action.name}</strong>
                </ActionLink>
              </td>
              <td width="200">
                {action.status && (
                  <StatusBadge
                    action={action}
                    plan={plan}
                    statusName={
                      action.mergedWith
                        ? t('action-status-merged', getActionTermContext(plan))
                        : (action.status?.name ?? undefined)
                    }
                  />
                )}
              </td>
              {actionsUseImpact && (
                <td>
                  {action.impact && (
                    <ActionImpact identifier={action.impact.identifier} name={action.impact.name} />
                  )}
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
