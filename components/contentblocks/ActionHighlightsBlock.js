import React, { useContext } from 'react';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import { readableColor } from 'polished';
import PlanContext from 'context/plan';

import ActionHighlightsList from 'components/actions/ActionHighlightsList';

const ActionsSection = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  position: relative;
  padding: ${(props) => props.theme.spaces.s800} 0 ${(props) => props.theme.spaces.s400};
  color: ${
    (props) => readableColor(props.theme.neutralLight, props.theme.themeColors.black, props.theme.themeColors.white)
    };

  .container {
    text-align: center;
  }

  h2 {
    color: ${
    (props) => readableColor(props.theme.neutralLight, props.theme.headingsColor, props.theme.themeColors.white)
    };
  }
`;

const ActionHighlightsBlock = () => {
  const plan = useContext(PlanContext);

  return (
    <ActionsSection className="actions-section">
      <Container>
        <ActionHighlightsList plan={plan} />
      </Container>
    </ActionsSection>
  );
};

export default ActionHighlightsBlock;
