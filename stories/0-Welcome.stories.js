import React from 'react';
import { linkTo } from '@storybook/addon-links';
import { Welcome } from '@storybook/react/demo';

const Basics = () => (
  <div className="container">
    <h1>Headline 1</h1>
    <h2>Headline 2</h2>
    <h3>Headline 3</h3>
    <h4>Headline 4</h4>
  </div>
);

export default {
  title: 'Basics',
  component: Basics,
};

export const ToStorybook = () => <Basics />;

ToStorybook.story = {
  name: 'Typography',
};
