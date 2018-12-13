import React from 'react';
import { Progress } from 'reactstrap';

import styled from 'styled-components';

const ProgressYears = styled.div`
  font-size: 10px;
  display: flex;
  justify-content: space-between;
`

const ProgressBar = styled(Progress)`
  .progress-bar {
    background-color: ${props => props.theme.helTram};
  }
`

class Timeline extends React.Component {
  
  render() {
    return (
      <div>
        <ProgressBar value={75} />
        <ProgressYears>
          <div>2017</div>
          <div>2019</div>
          <div>2021</div>
          <div>2023</div>
          <div>2025</div>
          <div>2027</div>
          <div>2029</div>
          <div>2031</div>
          <div>2033</div>
          <div>2035</div>
        </ProgressYears>
      </div>
    );
  }
}

export default Timeline;
