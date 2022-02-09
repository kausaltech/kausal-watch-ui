import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import IndicatorCard from '../../components/indicators/IndicatorCard';

export default {
  title: 'Indicators/Card',
};

function IndicatorCards() {
  const theme = useContext(ThemeContext);

  return (
    <div className="container" style={{ backgroundColor: theme.themeColors.light, color: theme.themeColors.dark }}>
      <div className="row p-2 pm-5">
        <div className="col col-sm-8 col-md-6">
          <IndicatorCard
            objectid="24"
            level="action"
            number={12}
            name="Action title"
          />
          <br />
          <IndicatorCard
            objectid="24"
            level="operational"
            name="Indicator title"
          />
          <br />
          <IndicatorCard
            objectid="24"
            level="tactical"
            name="Indicator title"
          />
          <br />
          <IndicatorCard
            objectid="24"
            level="strategic"
            name="Indicator title"
          />
          <br />
        </div>
        <div className="col col-sm-8 col-md-6">
          <IndicatorCard
            objectid="24"
            level="action"
            number={12}
            name="Action title"
          />
          <br />
          <IndicatorCard
            objectid="24"
            level="operational"
            name="Indicator title"
            latestValue={{ value: 12400, date: '12-04-2020', unit: 'm' }}
            resolution="year"
          />
          <br />
          <IndicatorCard
            objectid="24"
            level="tactical"
            name="Indicator title"
            latestValue={{ value: 12400, date: '12-04-2020', unit: 'm' }}
            resolution="year"
          />
          <br />
          <IndicatorCard
            objectid="24"
            level="strategic"
            name="Indicator title"
            latestValue={{ value: 12400, date: '12-04-2020', unit: 'm' }}
            resolution="year"
          />
          <br />
        </div>
      </div>
    </div>
  );
}

export function Card(theme) {
  return <IndicatorCards theme={theme} />;
}
