import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import i18n from '../../.storybook/i18n';

import IndicatorHighlightCard from '../../components/indicators/IndicatorHighlightCard';

export default {
  title: 'Indicators/Card',
};

const IndicatorCards = () => {
  const theme = useContext(ThemeContext);

  return (
    <div className="container" style={{ backgroundColor: theme.neutralLight, color: theme.themeColors.light }}>
      <div className="row p-2 pm-5">
        <div className="col col-sm-8 col-md-6">
          <IndicatorHighlightCard
            objectid="24"
            level="action"
            name="Mittari"
            value={30000}
            unit="m"
          />
          <br />
          <IndicatorHighlightCard
            objectid="24"
            level="operational"
            name="Mittari"
            value={30000}
            unit="m"
          />
          <br />
          <IndicatorHighlightCard
            objectid="24"
            level="tactical"
            name="Mittari"
            value={30000}
            unit="m"
          />
          <br />
          <IndicatorHighlightCard
            objectid="24"
            level="strategic"
            name="Mittari"
            value={30000}
            unit="m"
          />
          <br />
        </div>
      </div>
    </div>
  );
};

export const HighlightCard = (theme) => <IndicatorCards theme={theme} />;
