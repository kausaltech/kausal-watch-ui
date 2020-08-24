import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Tooltip } from 'reactstrap';
import styled from 'styled-components';
import { lighten } from 'polished';

const BadgeWrapper = styled.a`
  &.lg {
    font-size: ${(props) => props.theme.fontSizeLg};
  }
`;

const StyledBadge = styled(Badge)`
  background-color: ${(props) => props.theme.brandDark};
  color: ${(props) => props.theme.themeColors.white};
  border-radius: ${(props) => props.theme.badgeBorderRadius};
  padding: ${(props) => props.theme.badgePaddingY} ${(props) => props.theme.badgePaddingX};
  font-weight: ${(props) => props.theme.badgeFontWeight};
  margin-right: ${(props) => props.theme.spaces.s050};
  margin-bottom: ${(props) => props.theme.spaces.s050};

  &.badge-secondary:hover {
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
      abbreviation, name, size, id, href, ariaLabel,
    } = this.props;
    const { tooltipOpen } = this.state;
    const badgeId = id.replace(/[: ]/g, '_');

    return (
      <BadgeWrapper className={size} href={href}>
        <StyledBadge id={badgeId} aria-label={ariaLabel}>{abbreviation || name}</StyledBadge>
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
  abbreviation: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
  size: PropTypes.string,
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
BadgeTooltip.defaultProps = {
  ariaLabel: null,
  abbreviation: null,
  href: null,
};

export default BadgeTooltip;
