import ActionHighlightCard from '../../components/actions/ActionHighlightCard';
import ActionStatus from '../../components/actions/ActionStatus';

import React from 'react';

const actionProp = {
  identifier: 24,
  name: 'Action title goes here',
  status: {
    name: 'On Time',
    identifier: 'on_time',
  },
  completion: 50,
};

const actionPropCompleted = {
  identifier: 138,
  name: 'This action is completed. Action title goes here',
  status: {
    name: 'Completed',
    identifier: 'completed',
  },
  completion: 100,
};

const actionPropLate= {
  identifier: 7,
  name: 'This action is Late. Action title goes here',
  status: {
    name: 'Late',
    identifier: 'late',
  },
  completion: 15,
};

const actionPropSeverelyLate= {
  identifier: 68,
  name: 'This action is Severely Late. Action title goes here',
  status: {
    name: 'Severely Late',
    identifier: 'severely_late',
  },
  completion: 5,
};

export default {
  title: 'Action',
};

export const ActionCard = () => {
  return (
    <div className="row p-2 pm-5">
      <div className="col col-sm-8 col-md-6">
        <ActionHighlightCard
          action={actionPropCompleted}
          id="12"
          imageUrl="https://source.unsplash.com/collection/1597991"
        />
        <ActionHighlightCard
          action={actionProp}
          id="12"
          imageUrl="https://source.unsplash.com/collection/1597991"
        />
        <ActionHighlightCard
          action={actionPropLate}
          id="12"
          imageUrl="https://source.unsplash.com/collection/1597991"
        />
        <ActionHighlightCard
          action={actionPropSeverelyLate}
          id="12"
          imageUrl="https://source.unsplash.com/collection/1597991"
        />
      </div>
    </div>
  );
};

export const ActionStatusStory = () => {
  return (
    <div className="row">
      <div className="col-6 p-5">
        <ActionStatus identifier="on_time" name="On Time" completion="90" />
      </div>
      <div className="col-6 p-5">
        <ActionStatus identifier="completed" name="Completed" completion="50" />
      </div>
      <div className="col-6 p-5">
        <ActionStatus identifier="late" name="Late" completion="25" />
      </div>
      <div className="col-6 p-5">
        <ActionStatus identifier="severely_late" name="Severely Late" completion="10" />
      </div>
      <div className="col-6 p-5">
        <ActionStatus identifier="not_started" name="Not Started" completion="0" />
      </div>
    </div>
  );
};
