import React from 'react';
import PropTypes from 'prop-types';

import { Tooltip } from 'reactstrap';
import styled from 'styled-components';
import Icon from '../common/Icon';

const IconContainer = styled.span`
  margin-right: 0.5em;
`;

class EmissionScopeIcon extends React.Component {

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

  mapIcon(scope) {
    // TODO: move scope -> icon mapping somewhere else
    // TODO: use (create) more fitting icons
    switch (scope) {
      case 'scope1_2':
        return 'home';

      case 'scope3':
        return 'globe';

      default:
        return 'circleOutline';
    }
  }


  render() {
    const { category, color, size } = this.props;
    const { id, identifier, name, shortDescription } = category;
    const iconId = `em-sc-${id}`;
    const iconName = this.mapIcon(identifier);

    // Fade effect looks jerky for some reason
    const fade = false;
    return (
      <IconContainer>
        <Icon id={iconId} name={iconName} color={color} width={size} height={size} />
        <Tooltip
          placement="top"
          isOpen={this.state.tooltipOpen}
          target={iconId}
          toggle={this.toggle}
          fade={fade}
          innerClassName="emission-scope-icon-tooltip"
        >
          <strong>{name}</strong><br />
          {shortDescription}
        </Tooltip>
      </IconContainer>
    );
  }
}

EmissionScopeIcon.propTypes = {
  category: PropTypes.shape({}).isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.string,
};

export default EmissionScopeIcon;
