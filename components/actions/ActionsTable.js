import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { gql } from '@apollo/client';

import { getActionTermContext, withTranslation } from 'common/i18n';
import { ActionLink } from 'common/links';
import PlanContext from 'context/plan';
import { cleanActionStatus } from 'common/preprocess';
import { getStatusSummary } from 'common/ActionStatusSummary';
import StatusBadge from 'components/common/StatusBadge';
import ActionImpact from 'components/actions/ActionImpact';
import { useTranslation } from 'next-i18next';

const ACTION_ROW_FRAGMENT = gql`
  fragment ActionsTable on Action {
    id
    identifier
    name
    color
    status {
      id
      identifier
      name
    }
    implementationPhase {
      id
      identifier
      name
    }
    statusSummary {
      identifier
    }
    completion
    categories {
      id
      identifier
      name
      image {
        rendition {
          id
          src
        }
      }
    }
    impact {
      id
      identifier
      name
    }
  }
`;

const Status = (props) => {
  const { action, plan } = props;
  const checkedStatus = cleanActionStatus(action, plan.actionStatuses);

  return (
    <StatusBadge
      plan={plan}
      statusSummary={getStatusSummary(plan, action.statusSummary)}
    />
  );
};
function ActionsTable(props) {
  const { t } = useTranslation();
  const { actions } = props;
  const plan = useContext(PlanContext);

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
                {action.status && <Status action={action} plan={plan} />}
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
  t: PropTypes.func.isRequired,
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

ActionsTable.fragments = {
  action: ACTION_ROW_FRAGMENT,
};

export default ActionsTable;
