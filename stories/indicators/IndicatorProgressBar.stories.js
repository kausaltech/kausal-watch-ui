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
    <div className="container" style={{ backgroundColor: theme.neutralLight, color: theme.themeColors.light }}>
      <div className="row p-2 pm-5">
        <div className="col col-sm-8 col-md-10">
          <IndicatorProgressBar
            startDate="1990"
            startValue="2000"
            latestDate="2019"
            latestValue="1500"
            goalDate="2030"
            goalValue="500"
            unit="CO2"
          />
        </div>
      </div>
    </div>
  );
};

export const IndicatorProgress = (theme) => <IndicatorProgresses theme={theme} />;
