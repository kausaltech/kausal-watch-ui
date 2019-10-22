import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Tooltip } from 'reactstrap';
import styled from 'styled-components';
import { lighten } from 'polished';

const BadgeWrapper = styled.a`
  &.lg {
    font-size: 1.75rem;
  }
`;

const StyledBadge = styled(Badge)`
  background-color: ${(props) => props.theme.brandDark};
  color: #ffffff;

  &.badge-pill.badge-secondary:hover {
    background-color:  ${(props) => lighten(0.05, props.theme.brandDark)};
    color: ${(props) => props.theme.themeColors.white};
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
    const { tooltipOpen } = this.state;
    this.setState({
      tooltipOpen: !tooltipOpen,
    });
  }

  render() {
    const {
      abbreviation, name, size, id, href,
    } = this.props;
    const { tooltipOpen } = this.state;
    const badgeId = id.replace(/[: ]/g, '_');

    return (
      <BadgeWrapper className={size} href={href}>
        <StyledBadge pill id={badgeId}>{abbreviation || name}</StyledBadge>
        <Tooltip placement="top" isOpen={tooltipOpen} target={badgeId} toggle={this.toggle}>
          {name}
        </Tooltip>
      </BadgeWrapper>
    );
  }
}

BadgeTooltip.defaultProps = {
  size: 'md',
};

BadgeTooltip.propTypes = {
  abbreviation: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  size: PropTypes.string,
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default BadgeTooltip;
