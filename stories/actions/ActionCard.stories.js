import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import ActionCard from 'components/actions/ActionCard';

const mockPhases = [
  {
    id: '1',
    identifier: 'not_started',
    name: 'Not started',
    description: 'Action has not been started',
  },
  {
    id: '2',
    identifier: 'initiation',
    name: 'Initiation',
    description: 'Action is being initiated',
  },
  {
    id: '3',
    identifier: 'in_progress',
    name: 'In progress',
    description: 'Action is in progress',
  },
  {
    id: '4',
    identifier: 'decision_making',
    name: 'Decision making',
    description: 'Action is in decision making',
  },
  {
    id: '5',
    identifier: 'completed',
    name: 'Completed',
    description: 'Action is completed',
  },
];

const actionProp = {
  identifier: '24',
  name: 'Action title goes here',
  status: {
    name: 'On Time',
    identifier: 'on_time',
  },
  completion: 50,
  mergedWith: null,
  categories: [],
};

const actionPhaseOnTime = {
  identifier: '24',
  name: 'Action title goes here',
  status: {
    name: 'On Time',
    identifier: 'on_time',
  },
  completion: 50,
  mergedWith: null,
  activePhase: 'in_progress',
  categories: [],
};

const actionPropCompleted = {
  identifier: '138',
  name: 'Action title goes here',
  status: {
    name: 'Completed',
    identifier: 'completed',
  },
  completion: 100,
  mergedWith: null,
  categories: [],
};

const actionPropLate = {
  identifier: '7',
  name: 'Action title goes here',
  status: {
    name: 'Late',
    identifier: 'late',
  },
  completion: 15,
  mergedWith: null,
  categories: [],
};

const actionPropSeverelyLate = {
  identifier: '68',
  name: 'Action title goes here',
  status: {
    name: 'Severely Late',
    identifier: 'severely_late',
  },
  completion: 5,
  mergedWith: null,
  categories: [],
};

const actionPropMerged = {
  identifier: '68',
  name: 'Action title goes here',
  status: {
    name: 'Severely Late',
    identifier: 'severely_late',
  },
  completion: 0,
  mergedWith: { identifier: '222' },
  categories: [],
};

export default {
  title: 'Action/Card',
  component: ActionCard,
};

function ActionCardTemplate(args) {
  return <ActionCard {...args} />;
}

export const Completed = ActionCardTemplate.bind({});
Completed.args = { action: actionPropCompleted, id: '12' };

export const OnTime = ActionCardTemplate.bind({});
OnTime.args = { action: actionProp, id: '12' };

export const Late = ActionCardTemplate.bind({});
Late.args = { action: actionPropLate, id: '12' };

export const SeverelyLate = ActionCardTemplate.bind({});
SeverelyLate.args = { action: actionPropSeverelyLate, id: '12' };

export const Merged = ActionCardTemplate.bind({});
Merged.args = { action: actionPropMerged, id: '12' };

export const PhaseOnTime = ActionCardTemplate.bind({});
PhaseOnTime.args = { action: actionPhaseOnTime, id: '12', phases: mockPhases };

function ActionCards() {
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
}

export function ActionCardStory(theme) {
  return <ActionCards theme={theme} />;
}

/*
const ACTION_CARD_FRAGMENT = gql`
  fragment ActionCard on Action {
    id
    identifier
    name(hyphenated: true)
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
    status {
      id
      identifier
      name
    }
    activePhase
  }
`;
*/
