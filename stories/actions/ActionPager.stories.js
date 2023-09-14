import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import ActionPager from '../../components/actions/ActionPager';

const nextAction = {
  identifier: '24',
  id: '308',
};

const prevAction = {
  identifier: '24',
  id: '308',
};

export default {
  title: 'Action/Pager',
};

const ActionPagerExample = () => {
  const theme = useContext(ThemeContext);

  return (
    <div className="container">
      <ActionPager nextAction={nextAction} previousAction={prevAction} />
      <br />
      <ActionPager nextAction={nextAction} />
      <br />
      <ActionPager nextAction={null} previousAction={prevAction} />
    </div>
  );
};

export const ActionPagerStory = (theme) => <ActionPagerExample theme={theme} />;
