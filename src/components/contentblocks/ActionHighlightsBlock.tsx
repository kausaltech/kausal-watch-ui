import React, { useContext } from 'react';

import styled from '@emotion/styled';
import { readableColor } from 'polished';
import { Container } from 'reactstrap';

import { CommonContentBlockProps } from '@/common/blocks.types';
import ActionHighlightsList from '@/components/actions/ActionHighlightsList';
import PlanContext, { usePlan } from '@/context/plan';

const ActionsSection = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  position: relative;
  padding: ${(props) => props.theme.spaces.s800} 0 ${(props) => props.theme.spaces.s400};
  color: ${(props) =>
    readableColor(
      props.theme.neutralLight,
      props.theme.themeColors.black,
      props.theme.themeColors.white
    )};

  .container {
    text-align: center;
  }

  h2 {
    color: ${(props) =>
      readableColor(
        props.theme.neutralLight,
        props.theme.headingsColor,
        props.theme.themeColors.white
      )};
  }
`;

const ActionHighlightsBlock = ({ id = '' }: CommonContentBlockProps) => {
  const plan = usePlan();

  return (
    <ActionsSection id={id} className="actions-section">
      <Container>
        <ActionHighlightsList plan={plan} />
      </Container>
    </ActionsSection>
  );
};

export default ActionHighlightsBlock;
