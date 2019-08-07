import React from 'react';
import { Badge, Tooltip } from 'reactstrap';
import styled from 'styled-components';

const StyledBadge = styled(Badge)`
  background-color: ${props => props.theme.brandDark};
  color: #ffffff;
`;

class BadgeTooltip extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false,
    };
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen,
    });
  }

  render() {
    const id = (this.props.abbreviation || this.props.name).replace(/[ &]/g, '_')

    return (
      <span>
        <StyledBadge pill href="#" id={id}>{this.props.abbreviation || this.props.name}</StyledBadge>
        <Tooltip placement="top" isOpen={this.state.tooltipOpen} target={id} toggle={this.toggle}>
          {this.props.name}
        </Tooltip>
      </span>
    );
    return ret;
  }
}

export default BadgeTooltip;
