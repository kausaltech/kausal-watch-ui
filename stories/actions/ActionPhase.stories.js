import React from 'react';

import ActionPhase from 'components/actions/ActionPhase';

const actionProp = {
  status: 'on_time',
  message: 'Toimenpidettä ei ole aloitettu ja aloittaminen on myöhässä.',
  reason: 'Toimenpiteelle varattu budjetti on käytetty toisaalla.',
  phases: [
    {
      id: 1,
      name: 'Ei aloitettu',
      completed: true,
      active: false,
    },
    {
      id: 2,
      name: 'Käynnistysvaihe',
      completed: true,
      active: false,
    },
    {
      id: 3,
      name: 'Toteutus',
      completed: false,
      active: true,
    },
    {
      id: 4,
      name: 'Päätöksenteko',
      completed: false,
      active: false,
    },
    {
      id: 5,
      name: 'Valmis',
      completed: false,
      active: false,
    },
  ],
};

export default {
  title: 'Action/Phase',
  component: ActionPhase,
};

const ActionCardTemplate = (args) => <ActionPhase {...args} />;

export const Completed = ActionCardTemplate.bind({});
Completed.args = actionProp;
