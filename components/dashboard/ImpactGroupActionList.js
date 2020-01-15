import React from 'react';
import PropTypes from 'prop-types';
import {
  Badge, Table,
} from 'reactstrap';

import styled from 'styled-components';

import { ActionLink } from '../../common/links';
import PlanContext from '../../context/plan';
import { withTranslation } from '../../common/i18n';

const ActionName = styled.span`
  a {
    color: ${(props) => props.theme.themeColors.black};
  }
`;

const StatusBadge = styled(Badge)`
  color: white;
  font-size: 1em;
`;

class ImpactGroupActionList extends React.Component {
  static contextType = PlanContext;

  renderStatus(status) {
  }

  render() {
    const { t, actions } = this.props;
    const impacts = this.context.actionImpacts;
    console.debug('actions', actions);

    return (
      <div className="mb-5 pb-5">
        <Table hover>
          <thead>
            <tr>
              <th>{t('action-num')}</th>
              <th>{t('action-name-title')}</th>
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
                <td>{impacts.find(imp => imp.id === item.impact.id).name}</td>
                <td>
                  <StatusBadge className={`bg-${item.action.status.identifier}`}>{item.action.status.name}</StatusBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

ImpactGroupActionList.propTypes = {
  t: PropTypes.func.isRequired,
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withTranslation('common')(ImpactGroupActionList);
