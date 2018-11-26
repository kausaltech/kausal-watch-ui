import React from 'react';
import { Progress } from 'reactstrap';

import styled from 'styled-components';

const ProgressYears = styled.div`
  font-size: 10px;
  display: flex;
  justify-content: space-between;
`

class Timeline extends React.Component {
  
  render() {
    return (
      <div>
        <Progress color="success" value={75} />
        <ProgressYears>
          <div>2010</div>
          <div>2011</div>
          <div>2012</div>
          <div>2013</div>
          <div>2014</div>
          <div>2015</div>
          <div>2016</div>
          <div>2017</div>
          <div>2018</div>
          <div>2019</div>
          <div>2020</div>
          <div>2021</div>
          <div>2022</div>
          <div>2023</div>
          <div>2024</div>
          <div>2025</div>
        </ProgressYears>
      </div>
    );
  }
}

export default Timeline;
