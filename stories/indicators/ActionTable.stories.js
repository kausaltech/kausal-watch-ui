import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import ActionsTable from '../../components/actions/ActionsTable';

const actionsData = [
  {
    id: '318',
    identifier: '01',
    name: 'Action Title',
    status: {
      id: '2',
      identifier: 'on_time',
      name: 'On Time',
    },
    completion: null,
    impact: {
      id: '4',
      identifier: '1',
      name: 'Small',
    },
  },
  {
    id: '319',
    identifier: '30',
    name: 'Action Title That is longer',
    completion: null,
    impact: {
      id: '5',
      identifier: '2',
      name: 'Moderate',
    },
  },
];

export default {
  title: 'Indicators/RelatedActions',
};

function ActionTableStory() {
  const theme = useContext(ThemeContext);

  return (
    <div className="p-5">
      <ActionsTable actions={actionsData} />
    </div>
  );
}

export function Table(theme) {
  return <ActionTableStory theme={theme} />;
}
