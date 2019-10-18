import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import gql from 'graphql-tag';

import { withTranslation } from '../../common/i18n';
import { ActionLink } from '../../common/links';
import ActionStatus from './ActionStatus';
import ActionImpact from './ActionImpact';

const ACTION_ROW_FRAGMENT = gql`
  fragment ActionsTable on Action {
    id
    identifier
    name
    status {
      id
      identifier
      name
    }
    completion
    categories {
      id
      identifier
      name
      imageUrl
    }
    impact {
      id
      identifier
      name
    }
  }
`;


function ActionsTable(props) {
  const { t, actions } = props;

  return (
    <Table hover responsive>
      <thead>
        <tr>
          <th colSpan="2" scope="col">{ t('action') }</th>
          <th scope="col">{ t('action-progress') }</th>
          <th scope="col">{ t('action-impact') }</th>
        </tr>
      </thead>
      <tbody>
        { actions.map((action) => (
          <ActionLink id={action.identifier} key={action.id}>
            <tr>
              <td><strong>{ action.identifier }</strong></td>
              <td><strong>{ action.name }</strong></td>
              <td width="200">
                { action.status
                  && (
                  <ActionStatus
                    identifier={action.status.identifier}
                    name={action.status.name}
                    completion={action.status.completion}
                  />
                  )}
              </td>
              <td>
                { action.impact
                  && (
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

export default withTranslation('common')(ActionsTable);
