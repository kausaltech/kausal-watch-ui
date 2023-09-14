import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import ActionHero from '../../components/actions/ActionHero';

export default {
  title: 'Action/Hero',
};

const categories = [
  {
    id: '103',
    identifier: '3',
    name: 'Action Category 1 With a very Long Title',
    imageUrl: null,
    type: {
      identifier: 'action',
    },
    parent: {
      id: '102',
      identifier: '2',
      name: 'Parent Category',
      imageUrl: '',
      type: {
        identifier: 'action',
      },
    },
  },
  {
    id: '104',
    identifier: '4',
    name: 'Category 2',
    imageUrl: null,
    type: {
      identifier: 'action',
    },
    parent: {
      id: '102',
      identifier: '2',
      name: 'Parent Category 2',
      imageUrl: '',
      type: {
        identifier: 'action',
      },
    },
  },
];

function ActionHeros() {
  const theme = useContext(ThemeContext);

  return (
    <ActionHero
      categories={categories}
      previousAction={12}
      nextAction={14}
      identifier="13"
      name="Action Headline that can be lengthy or short and fall on several liness"
      imageUrl="https://source.unsplash.com/collection/1597991"
    />
  );
}

export function ActionHeroStory(theme) {
  return <ActionHeros theme={theme} />;
}
