import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import styled from 'styled-components';

import { getStatusSummary } from 'common/ActionStatusSummary';
import { ActionLink } from 'common/links';
import PlanContext from 'context/plan';
import { getActionTermContext, withTranslation } from 'common/i18n';

import StatusBadge from 'components/common/StatusBadge';

const ActionName = styled.span`
  a {
    color: ${(props) => props.theme.themeColors.black};
  }
`;

const Status = (props) => {
  const { action, plan } = props;

  return (
    <StatusBadge
      plan={plan}
      statusSummary={getStatusSummary(plan, action.statusSummary)}
    />
  );
};

const ImpactGroupActionList = (props) => {
  const {
    t,
    actions,
  } = props;
  const plan = useContext(PlanContext);
  const impacts = Object.fromEntries(plan.actionImpacts.map((x) => [x.id, x]));
  return (
    <div className="mb-5 pb-5">
      <Table hover>
        <thead>
          <tr>
            <th scope="col">{t('action-num')}</th>
            <th scope="col">{t('action-name-title', getActionTermContext(plan))}</th>
            <th scope="col">{t('action-impact')}</th>
            <th scope="col">{t('action-progress')}</th>
          </tr>
        </thead>
        <tbody>
          {actions.map((item) => (
            <tr key={item.action.id}>
              <td>{item.action.identifier}</td>
              <td>
                <ActionName>
                  <ActionLink action={item.action}>
                    <a>{item.action.name}</a>
                  </ActionLink>
                </ActionName>
              </td>
              <td>{impacts[item.impact.id].name}</td>
              <td>
                <Status action={item.action} plan={plan} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

ImpactGroupActionList.propTypes = {
  t: PropTypes.func.isRequired,
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withTranslation('common')(ImpactGroupActionList);
