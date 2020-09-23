import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { transparentize, darken, readableColor } from 'polished';
import { Tooltip } from 'reactstrap';
import { withTranslation } from '../../common/i18n';

const VALUE_SMALL = 3.5;
const VALUE_VERY_SMALL = 2;

const Segment = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  cursor: pointer;
  overflow: hidden;
  /* button reset styles */ 
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  background: transparent;
  color: inherit;
  line-height: normal;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;

  font-weight: 700;
  font-size: 1.6em;
  color: ${(props) => props.theme.themeColors.black};

  &:hover {
    background-color: ${(props) => transparentize(0.1, props.theme.themeColors.white)};
  }

  &.small {
    font-weight: 400;
    font-size: 1em;
  }

  &.very-small {
    font-weight: 400;
    font-size: 0.8em;
  }

  &:nth-child(3n + 1) {
    background-color: ${(props) => darken(0.15, props.theme.themeColors.white)};
  }

  &:nth-child(3n + 2) {
    background-color: ${(props) => darken(0.10, props.theme.themeColors.white)};
  }

  &:nth-child(3n) {
    background-color: ${(props) => darken(0.05, props.theme.themeColors.white)};
  }

  &.active {
    background-color: ${(props) => props.theme.themeColors.dark};
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
    const {
      t,
      theme,
      active,
      segment,
      width,
      color,
      onSelect,
    } = this.props;
    const id = `segment-${segment.id}`;

    let className = 'bar-segment';
    const style = {
      width: `${width}%`,
    };

    if (active) {
      className += ' active';
      if (color) {
        style.backgroundColor = color;
        style.color = readableColor(color, theme.themeColors.black, theme.themeColors.white);
      }
    }
    if (segment.value <= VALUE_VERY_SMALL) {
      className += ' very-small';
    } else if (segment.value <= VALUE_SMALL) {
      className += ' small';
    }

    return (
      <>
        <Segment
          id={id}
          className={className}
          style={style}
          onClick={() => onSelect(segment)}
          role="tab"
          aria-label={`${segment.name}: ${t('dashboard-segment-description')} ${Math.round(segment.value)} %`}
          aria-selected={active}
          aria-controls={`tab-${segment.id}`}
          tabIndex={active ? '0' : '-1'}
        >
          {`${Math.round(segment.value)}`}
          %
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
  active: PropTypes.bool.isRequired,
  segment: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  color: PropTypes.string,
};

export default withTranslation('common')(withTheme(BarSegment));
