import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import IndicatorListFiltered from '../../components/indicators/IndicatorListFiltered';
import {
  categoriesData,
  nonHierarchicalIndicatorsData,
  hierarchy,
  hierarchicalIndicatorsData,
} from './indicators.fixtures';

export default {
  title: 'Indicators/List',
};

const Template = (args) => {
  console.log(args);
  return (
    <div className="p-5">
      <IndicatorListFiltered {...args} />
    </div>
  );
};

export const SimpleList = Template.bind({});
SimpleList.args = {
  indicators: nonHierarchicalIndicatorsData,
  categories: categoriesData,
};

export const HierarchicalList = Template.bind({});
HierarchicalList.args = {
  indicators: hierarchicalIndicatorsData,
  categories: categoriesData,
  displayMunicipality: true,
  hierarchy,
};
