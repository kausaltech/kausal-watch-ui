import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import ActionImpact from '../../components/actions/ActionImpact';

const actionProp = {
  identifier: '24',
  name: 'Action title goes here',
  status: {
    name: 'On Time',
    identifier: 'on_time',
  },
  completion: 50,
};

const actionPropCompleted = {
  identifier: '138',
  name: 'This action is completed. Action title goes here',
  status: {
    name: 'Completed',
    identifier: 'completed',
  },
  completion: 100,
};

const actionPropLate= {
  identifier: '7',
  name: 'This action is Late. Action title goes here',
  status: {
    name: 'Late',
    identifier: 'late',
  },
  completion: 15,
};

const actionPropSeverelyLate= {
  identifier: '68',
  name: 'This action is Severely Late. Action title goes here',
  status: {
    name: 'Severely Late',
    identifier: 'severely_late',
  },
  completion: 5,
};

export default {
  title: 'Action/Impact',
};

export const normal = () => {
  return (
    <div className="row">
      <div className="col-8 p-5">
        <ActionImpact
          name="High Impact"
          identifier="4"
          max="4"
        />
        <br />
        <ActionImpact
          name="Very Low Impact"
          identifier="1"
          max="6"
        />
        <br />
        <ActionImpact
          name="Opposite Impact"
          identifier="-4"
          max="6"
        />
      </div>
    </div>
  );
};
