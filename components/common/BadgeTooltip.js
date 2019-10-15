import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Tooltip } from 'reactstrap';
import styled from 'styled-components';
import { lighten } from 'polished';
import { Link } from '../../routes';

const BadgeWrapper = styled.span`
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
      abbreviation,
      name,
      size,
      link,
      id,
    } = this.props;
    const { tooltipOpen } = this.state;
    const badgeId = id.replace(/[: ]/g, '_');

    const badgeElement = (
      <BadgeWrapper className={size}>
        <StyledBadge pill href="#" id={badgeId}>{abbreviation || name}</StyledBadge>
        <Tooltip placement="top" isOpen={tooltipOpen} target={badgeId} toggle={this.toggle}>
          {name}
        </Tooltip>
      </BadgeWrapper>
    )

    if (link) {
      return (
        <Link href={link}>
          { badgeElement }
        </Link>
      );
    }

    return badgeElement;
  }
}

BadgeTooltip.defaultProps = {
  size: 'md',
  link: null,
};

BadgeTooltip.propTypes = {
  abbreviation: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  size: PropTypes.string,
  link: PropTypes.string,

};

export default BadgeTooltip;
