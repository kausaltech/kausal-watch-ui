import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import BarSegment from './BarSegment';

const SegmentContainer = styled.div`
  display: flex;
`;

const ArrowContainer = styled.div`
  margin-top: -12px;
`;

const Arrow = styled.div`
  position: relative;
  z-index: 1;
  width: 20px;
  height: 20px;
  transform: rotate(45deg);
  margin-left: -10px;
`;

class Bar extends React.Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  calcSum() {
    const { segments } = this.props;
    let sum = 0;
    for (let i = 0; i < segments.length; i++) {
      sum += segments[i].value;
    }
    return sum;
  }

  onSelect(segment) {
    // fire callback
    if (this.props.onSelect) {
      this.props.onSelect(segment);
    }
  }

  render() {
    const { segments, active } = this.props;
    const sum = this.calcSum();
    let arrowColor;

    const calcArrowPos = () => {
      let val = 0;
      for (let i = 0; i < segments.length; i++) {
        if (segments[i].id === active) {
          val += segments[i].value / 2;
          arrowColor = segments[i].color;
          break;
        }
        val += segments[i].value;
      }
      return val / sum * 100;
    };

    const arrowStyle = {
      left: `${calcArrowPos()}%`,
      backgroundColor: arrowColor,
    };

    return (
      <div className="mb-4">
        <SegmentContainer className="bar-segment-container">
          {segments.map((segment) => (
            <BarSegment
              key={segment.id}
              segment={segment}
              active={segment.id === active}
              width={segment.value / sum * 100 + 0.001}
              color={segment.color}
              onSelect={this.onSelect}
            />
          ))}
        </SegmentContainer>
        <ArrowContainer>
          <Arrow className="bar-arrow" style={arrowStyle} />
        </ArrowContainer>
      </div>
    );
  }
}

Bar.propTypes = {
  active: PropTypes.string,
  segments: PropTypes.array.isRequired,
  onSelect: PropTypes.func,
};

export default withTheme(Bar);
