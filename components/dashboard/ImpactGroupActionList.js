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
  font-size: ${(props) => props.theme.fontSizeBase};
  color: ${(props) => props.theme.themeColors.white};

  &.bg-not_started {
    background-color: ${(props) => props.theme.actionNotStartedColor};
    color: ${(props) => props.theme.themeColors.black};
  }

  &.bg-in_progress {
    background-color: ${(props) => props.theme.actionOnTimeColor};
  }

  &.bg-on_time {
    background-color: ${(props) => props.theme.actionOnTimeColor};
  }

  &.bg-completed {
    background-color: ${(props) => props.theme.actionCompletedColor};
  }

  &.bg-late {
    background-color: ${(props) => props.theme.actionLateColor};
    color: ${(props) => props.theme.themeColors.black};
  }

  &.bg-severely_late {
    background-color: ${(props) => props.theme.actionSeverelyLateColor};
  }
`;

class ImpactGroupActionList extends React.PureComponent {
  static contextType = PlanContext;

  render() {
    const {
      t,
      actions,
    } = this.props;
    const impacts = Object.fromEntries(this.context.actionImpacts.map((x) => [x.id, x]));
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
                <td>{impacts[item.impact.id].name}</td>
                <td>
                  <StatusBadge
                    className={`bg-${item.action.status.identifier}`}>{item.action.status.name}
                  </StatusBadge>
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
