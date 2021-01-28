import React from 'react';
import Card from 'components/common/Card';

export default {
  title: 'Global/Card',
  component: Card,
  argTypes: {
    customColor: { control: 'color' },
  },
};

export const NormalImage = ({ ...args }) => (
  <Card {...args}>
    <h2>Card</h2>
    <p>sfsdfsdfsdf</p>
  </Card>
);

NormalImage.args = {
  imageUrl: 'https://source.unsplash.com/random/1200x900',
};
