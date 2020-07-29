import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import i18n from '../../.storybook/i18n';

import IndicatorValueSummary from '../../components/indicators/IndicatorValueSummary';

const goalsData = [
  {
    id: '55',
    date: '2030-12-31',
    value: 211,
  },
  {
    id: '3',
    date: '2035-12-31',
    value: 214,
  },
];

const unitData = {
  id: '217',
  name: 'MW',
  shortName: null,
  verboseName: 'megawatti',
  verboseNamePlural: null,
};

const valuesData = [
  {
    id: '652',
    date: '2009-12-31',
    value: 0.03,
  },
  {
    id: '653',
    date: '2011-12-31',
    value: 0.06,
  },
  {
    id: '654',
    date: '2012-12-31',
    value: 0.10725,
  },
  {
    id: '655',
    date: '2015-12-31',
    value: 0.12525,
  },
  {
    id: '656',
    date: '2016-12-31',
    value: 0.53495,
  },
  {
    id: '657',
    date: '2017-12-31',
    value: 1.24895,
  },
  {
    id: '658',
    date: '2018-12-31',
    value: 1.86195,
  },
];

export default {
  title: 'Indicators/ValueSummary',
};

const IndicatorValueSummaryStory = () => {
  const theme = useContext(ThemeContext);

  return (
    <div className="p-5">
      <IndicatorValueSummary
        timeResolution="YEAR"
        values={valuesData}
        unit={unitData}
        goals={goalsData}
      />
    </div>
  );
};

export const Summary = (theme) => <IndicatorValueSummaryStory theme={theme} />;
