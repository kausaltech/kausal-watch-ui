import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';

import { getActionTermContext } from 'common/i18n';
import { ActionLink } from 'common/links';
import { usePlan } from 'context/plan';
import { getStatusSummary } from 'common/ActionStatusSummary';
import StatusBadge from 'components/common/StatusBadge';
import ActionImpact from 'components/actions/ActionImpact';
import { useTranslations } from 'next-intl';

function ActionsTable(props) {
  const t = useTranslations();
  const { actions } = props;
  const plan = usePlan();

  return (
    <Table hover responsive>
      <thead>
        <tr>
          <th colSpan="2" scope="col">
            {t('action', getActionTermContext(plan))}
          </th>
          <th scope="col">{t('action-progress')}</th>
          <th scope="col">{t('action-impact')}</th>
        </tr>
      </thead>
      <tbody>
        {actions.map((action) => (
          <ActionLink action={action} key={action.id}>
            <tr>
              <td>
                <strong>{action.identifier}</strong>
              </td>
              <td>
                <strong>{action.name}</strong>
              </td>
              <td width="200">
                {action.status && (
                  <StatusBadge
                    plan={plan}
                    action={{
                      ...action,
                      statusSummary: getStatusSummary(
                        plan,
                        action.statusSummary
                      ),
                    }}
                  />
                )}
              </td>
              <td>
                {action.impact && (
                  <ActionImpact
                    identifier={action.impact.identifier}
                    name={action.impact.name}
                  />
                )}
              </td>
            </tr>
          </ActionLink>
        ))}
      </tbody>
    </Table>
  );
}

ActionsTable.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ActionsTable;
