import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import i18n from '../../.storybook/i18n';

import IndicatorProgressBar from '../../components/indicators/IndicatorProgressBar';

export default {
  title: 'Indicators/IndicatorProgressBar',
};

const IndicatorProgresses = () => {
  const theme = useContext(ThemeContext);

  return (
    <div className="container">
          <IndicatorProgressBar
            startDate="1990"
            startValue="2000"
            latestDate="2019"
            latestValue="1500"
            goalDate="2030"
            goalValue="500"
            unit="kt CO₂e"
            note="Target maximum emissions 500 kt CO₂em, the rest will be compensated"
          />
          <br />
          <IndicatorProgressBar
            startDate="1990"
            startValue="30000"
            latestDate="2019"
            latestValue="9000"
            goalDate="2030"
            goalValue="100"
            unit="kt CO₂e"
            note="Target maximum emissions 500 kt CO₂em, the rest will be compensated"
          />
          <IndicatorProgressBar
            startDate="4/2020"
            startValue="123456"
            latestDate="1/2021"
            latestValue="120000"
            goalDate="12/2020"
            goalValue="100000"
            unit="kt CO₂e"
            note="Target maximum emissions 500 kt CO₂em, the rest will be compensated"
          />
    </div>
  );
};

export const IndicatorProgress = (theme) => <IndicatorProgresses theme={theme} />;
