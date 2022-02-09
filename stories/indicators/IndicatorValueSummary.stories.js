import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

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

const goalsData2 = [
  {
    id: '43',
    date: '2018-12-31',
    value: 32,
  },
  {
    id: '74',
    date: '2021-12-31',
    value: 60,
  },
  {
    id: '13',
    date: '2022-12-31',
    value: 105,
  },
  {
    id: '25',
    date: '2025-12-31',
    value: 150,
  },
];

const unitData = {
  id: '217',
  name: 'MW',
  shortName: null,
  verboseName: 'megawatti',
  verboseNamePlural: null,
};

const unitData2 = {
  id: '68',
  name: 'km',
  shortName: null,
  verboseName: null,
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

const valuesData2 = [
  {
    id: '704',
    date: '2015-12-31',
    value: 8.7,
  },
  {
    id: '829',
    date: '2016-12-31',
    value: 30.1,
  },
  {
    id: '830',
    date: '2017-12-31',
    value: 34.2,
  },
  {
    id: '1089',
    date: '2018-12-31',
    value: 32,
  },
];

export default {
  title: 'Indicators/ValueSummary',
};

function IndicatorValueSummaryStory() {
  const theme = useContext(ThemeContext);

  return (
    <div className="p-5">
      <IndicatorValueSummary
        timeResolution="YEAR"
        values={valuesData}
        unit={unitData}
        goals={goalsData}
      />
      <br />
      <br />
      <IndicatorValueSummary
        timeResolution="YEAR"
        values={valuesData2}
        unit={unitData2}
        goals={goalsData2}
      />

    </div>
  );
}

export function Summary(theme) {
  return <IndicatorValueSummaryStory theme={theme} />;
}
