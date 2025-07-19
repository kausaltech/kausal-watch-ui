import React, { useContext } from 'react';

import { CommonContentBlockProps } from 'common/blocks.types';
import IndicatorHighlightsList from 'components/indicators/IndicatorHighlightsList';
import PlanContext, { usePlan } from 'context/plan';
import { Container } from 'reactstrap';
import styled from 'styled-components';

const IndicatorsSection = styled.div`
  background-color: ${(props) => props.theme.themeColors.white};
  color: ${(props) => props.theme.neutralDark};
  position: relative;
  padding: ${(props) => props.theme.spaces.s600} 0;

  .container {
    text-align: center;
  }
`;

const IndicatorHighlightsBlock = ({ id = '' }: CommonContentBlockProps) => {
  const plan = usePlan();

  return (
    <IndicatorsSection id={id} className="indicators-section">
      <Container>
        <IndicatorHighlightsList planIdentifier={plan.identifier} />
      </Container>
    </IndicatorsSection>
  );
};

export default IndicatorHighlightsBlock;
