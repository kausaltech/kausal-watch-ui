import React from 'react';
import styled, { withTheme } from 'styled-components';
import { Tooltip } from 'reactstrap';

const Segment = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  font-weight: 700;
  font-size: 1.6em;
  cursor: pointer;

  &.active {
    color: white;
  }
`;

class BarSegment extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false,
    };
  }

  toggle() {
    const { tooltipOpen } = this.state;
    this.setState({
      tooltipOpen: !tooltipOpen,
    });
  }

  render() {
    const { active, idx, segment, sum, onSelect } = this.props;

    const getBgColor = (i) => {
      if (active) {
        return 'firebrick';
      }
      switch (i % 3) {
        case 0:
          return '#ccc';
        case 1:
          return '#ddd';
        case 2:
          return '#eee';
      }
      return '#fff';
    };

    const width = segment.value / sum * 100 + 0.001;
    const id = `segment-${idx}`;

    return (
      <>
        <Segment
          id={id}
          className={active ? 'active' : ''}
          style={{
            width: `${width}%`,
            backgroundColor: getBgColor(idx),
          }}
          onClick={() => onSelect(segment, idx)}
        >
          {`${Math.round(segment.value)}`}%
        </Segment>
        <Tooltip
          placement="top"
          isOpen={this.state.tooltipOpen}
          target={id}
          toggle={this.toggle}
          fade={false}
        >
          {segment.name}
        </Tooltip>
      </>
    );
  }
}

export default withTheme(BarSegment);
