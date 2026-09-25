import styled from '@emotion/styled';

import PropTypes from 'prop-types';

import Tooltip from '@/components/common/Tooltip';

import Icon from '../common/Icon';

const IconContainer = styled.a`
  display: inline-block;
  margin-right: 0.5em;
`;

const EmissionScopeIcon = (props) => {
  const { category, color, size } = props;
  const { id, identifier, name, leadParagraph } = category;
  const iconId = `em-sc-${id}`;

  function mapIcon(scope) {
    // TODO: move scope -> icon mapping somewhere else
    // TODO: use (create) more fitting icons
    switch (scope) {
      case 'scope1_2':
        return 'home';
      case 'scope3':
        return 'globe';
      default:
        return 'circle-outline';
    }
  }

  return (
    <Tooltip
      title={
        <>
          <strong>{name}</strong>
          <br />
          {leadParagraph}
        </>
      }
    >
      <IconContainer id={iconId} style={{ width: size, height: size }} href="#">
        <span className="visually-hidden">
          {name}
          {leadParagraph}
        </span>
        <Icon name={mapIcon(identifier)} color={color} width={size} height={size} />
      </IconContainer>
    </Tooltip>
  );
};

EmissionScopeIcon.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    identifier: PropTypes.string.isRequired,
    leadParagraph: PropTypes.string,
    name: PropTypes.string.isRequired,
  }).isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.string,
};

export default EmissionScopeIcon;
