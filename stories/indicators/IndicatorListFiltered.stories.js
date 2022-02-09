import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import IndicatorListFiltered from '../../components/indicators/IndicatorListFiltered';

const categoriesData = [
  {
    id: '1',
    identifier: '1.1',
    name: 'Category 1',
    parent: null,
  },
  {
    id: '2',
    identifier: '1.1.1',
    name: 'Sub Category 2',
    parent: {
      id: '116',
    },
  },
  {
    id: '3',
    identifier: '1.1.2',
    name: 'Sub Category 3',
  },
  {
    id: '4',
    identifier: '1.1.3',
    name: 'Sub Category 4',
  },
  {
    id: '5',
    identifier: '1.1.4',
    name: 'Sub Category 5',
  },
];

const indicatorsData = [
  {
    id: '21',
    name: 'Tactical Indicator',
    categories: [
      {
        id: '4',
        name: 'Sub Category 1',
      },
    ],
    latestGraph: null,
    latestValue: {
      id: '610',
      date: '2018-12-31',
    },
    level: 'tactical',
  },
  {
    id: '2',
    name: 'Operational Indicator with a longer title that probably wraps',
    categories: [
      {
        id: '3',
        name: 'Cat',
      },
    ],
    latestGraph: null,
    latestValue: {
      id: '630',
      date: '2018-12-31',
    },
    level: 'operational',
  },
  {
    id: '111',
    name: 'Some Strategic Indicator',
    categories: [
      {
        id: '4',
        name: 'This is a category',
      },
    ],
    latestGraph: null,
    latestValue: {
      id: '658',
      date: '2018-12-31',
    },
    level: 'strategic',
  },
  {
    id: '165',
    name: 'Another one with longer title',
    categories: [
      null,
    ],
    latestGraph: null,
    latestValue: {
      id: '668',
      date: '2018-12-31',
    },
    level: 'strategic',
  },
  {
    id: '4',
    name: 'Tactical indicator with a title that ',
    categories: [
      {
        id: '5',
        name: 'Another Category',
      },
      {
        id: '1',
        name: 'Category with also long title',
      },
    ],
    latestGraph: null,
    latestValue: {
      id: '527',
      date: '2017-12-31',
    },
    level: 'tactical',
  },
];

export default {
  title: 'Indicators/List',
};

function IndicatorListStory() {
  const theme = useContext(ThemeContext);

  return (
    <div className="p-5">
      <IndicatorListFiltered
        indicators={indicatorsData}
        categories={categoriesData}
      />
    </div>
  );
}

export function List(theme) {
  return <IndicatorListStory theme={theme} />;
}
