import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { Tooltip } from 'reactstrap';

const VALUE_SMALL = 3.5;

const Segment = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  cursor: pointer;
  overflow: hidden;
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
    const { active, segment, width, onSelect } = this.props;
    const id = `segment-${segment.id}`;

    let className = 'bar-segment';
    if (active) {
      className += ' active';
    }
    if (segment.value < VALUE_SMALL) {
      className += ' small';
    }

    return (
      <>
        <Segment
          id={id}
          className={className}
          style={{
            width: `${width}%`,
          }}
          onClick={() => onSelect(segment)}
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

BarSegment.propTypes = {
  active: PropTypes.object,
  segment: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default withTheme(BarSegment);
