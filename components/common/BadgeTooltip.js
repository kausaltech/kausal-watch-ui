import React from 'react';
import { Badge, Tooltip } from 'reactstrap';
import styled from 'styled-components';
import { lighten } from 'polished';

const BadgeWrapper = styled.span`
  &.leader {
    font-size: 1.75rem;
    display: block;
  }
`;

const StyledBadge = styled(Badge)`
  background-color: ${props => props.theme.brandDark};
  color: #ffffff;
  
  &.badge-pill.badge-secondary:hover {
    background-color:  ${(props) => lighten(0.05, props.theme.brandDark)};
    color: ${props => props.theme.themeColors.white};
  }
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
    const { abbreviation, name, leader } = this.props;
    const id = this.props.id.replace(/[: ]/g, '_');

    return (
      <BadgeWrapper className={leader && `leader`}>
        <StyledBadge pill href="#" id={id}>{abbreviation || name}</StyledBadge>
        <Tooltip placement="top" isOpen={this.state.tooltipOpen} target={id} toggle={this.toggle}>
          {name}
        </Tooltip>
      </BadgeWrapper>
    );
  }
}

export default BadgeTooltip;
