import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import ActionCard from '../../components/actions/ActionCard';

const actionProp = {
  identifier: '24',
  name: 'Action title goes here',
  status: {
    name: 'On Time',
    identifier: 'on_time',
  },
  completion: 50,
  mergedWith: null,
};

const actionPropCompleted = {
  identifier: '138',
  name: 'This action is completed. Action title goes here',
  status: {
    name: 'Completed',
    identifier: 'completed',
  },
  completion: 100,
  mergedWith: null,
};

const actionPropLate= {
  identifier: '7',
  name: 'This action is Late. Action title goes here',
  status: {
    name: 'Late',
    identifier: 'late',
  },
  completion: 15,
  mergedWith: null,
};

const actionPropSeverelyLate= {
  identifier: '68',
  name: 'This action is Severely Late. Action title goes here',
  status: {
    name: 'Severely Late',
    identifier: 'severely_late',
  },
  completion: 5,
  mergedWith: null,
};

const actionPropMerged= {
  identifier: '68',
  name: 'This action is merged',
  status: {
    name: 'Severely Late',
    identifier: 'severely_late',
  },
  completion: 0,
  mergedWith: { identifier: '222' },
};

export default {
  title: 'Actions',
};

const ActionCards = () => {
  const theme = useContext(ThemeContext);

  return (
    <div className="container" style={{ backgroundColor: theme.neutralLight, color: theme.themeColors.light }}>
      <div className="row p-2 pm-5">
        <div className="col col-sm-8 col-md-6">
          <ActionCard
            action={actionPropCompleted}
            id="12"
          />
          <br />
          <ActionCard
            action={actionProp}
            id="12"
          />
          <br />
          <ActionCard
            action={actionPropLate}
            id="12"
          />
          <br />
          <ActionCard
            action={actionPropSeverelyLate}
            id="12"
          />
          <br />
          <ActionCard
            action={actionPropMerged}
            id="12"
          />
          <br />
        </div>
      </div>
    </div>
  );
};

export const ActionCardStory = (theme) => <ActionCards theme={theme} />;
