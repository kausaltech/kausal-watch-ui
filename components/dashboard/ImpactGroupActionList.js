import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import styled from 'styled-components';

import { cleanActionStatus } from 'common/preprocess';
import { ActionLink } from 'common/links';
import PlanContext from 'context/plan';
import { withTranslation } from 'common/i18n';

import StatusBadge from 'components/common/StatusBadge';

const ActionName = styled.span`
  a {
    color: ${(props) => props.theme.themeColors.black};
  }
`;

const Status = (props) => {
  const { action, plan } = props;
  const checkedStatus = cleanActionStatus(action, plan.actionStatuses);

  return (
    <StatusBadge
      statusIdentifier={checkedStatus.identifier}
      statusName={checkedStatus.name}
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
            <th>{t('action-num')}</th>
            <th>{t('action-name-title', { context: plan.generalContent.actionTerm })}</th>
            <th>{t('action-impact')}</th>
            <th>{t('action-progress')}</th>
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
