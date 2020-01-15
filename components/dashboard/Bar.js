import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import BarSegment from './BarSegment';

const SegmentContainer = styled.div`
  display: flex;
  height: 4em;
  background-color: #ccc;
  border: 2px solid #231f20;
`;

const ArrowContainer = styled.div`
  margin-top: -12px;
`;

const Arrow = styled.div`
  position: relative;
  z-index: 1;
  width: 20px;
  height: 20px;
  border: 2px solid #231f20;
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

  onSelect(segment, key) {
    // fire callback
    if (this.props.onSelect) {
      this.props.onSelect(segment);
    }
  }

  render() {
    const { segments, active } = this.props;
    const sum = this.calcSum();

    const calcArrowPos = () => {
      let val = 0;
      for (let i = 0; i < segments.length; i++) {
        if (segments[i].id === active) {
          val += segments[i].value / 2;
          break;
        }
        val += segments[i].value;
      }
      return val / sum * 100;
    }

    return (
      <div className="mb-4">
        <SegmentContainer>
          {segments.map((segment, key) => (
            <BarSegment
              key={segment.id}
              idx={key}
              segment={segment}
              active={segment.id === active}
              sum={sum}
              onSelect={this.onSelect}
            />
          ))}
        </SegmentContainer>
        <ArrowContainer>
          <Arrow style={{ left: `${calcArrowPos()}%`, background: 'firebrick' }} />
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
