import React, { useContext } from 'react';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import PlanContext from 'context/plan';

import IndicatorHighlightsList from 'components/indicators/IndicatorHighlightsList';

const IndicatorsSection = styled.div`
  background-color: ${(props) => props.theme.themeColors.white};
  color: ${(props) => props.theme.neutralDark};
  position: relative;
  padding: ${(props) => props.theme.spaces.s600} 0;

  .container {
    text-align: center;
  }
`;

const IndicatorHighlightsBlock = () => {
  const plan = useContext(PlanContext);

  return (
    <IndicatorsSection className="indicators-section">
      <Container>
        <IndicatorHighlightsList plan={plan} />
      </Container>
    </IndicatorsSection>
  );
};

export default IndicatorHighlightsBlock;
