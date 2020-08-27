import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTranslation } from '../../common/i18n';
import { ActionListLink } from '../../common/links';
import BadgeTooltip from '../common/BadgeTooltip';

const Responsibles = styled.div`
  font-size: ${(props) => props.theme.fontSizeMd};

  .badge-pill {
    margin-right: .5em;
  }

  .lg {
    display: block;
  }
`;

function ResponsibleBadge(props) {
  const {
    index,
    id,
    name,
    abbreviation,
  } = props;
  let size = 'md';
  let ariaLabel;

  // TODO: translate päävastuutaho
  if (index === 0) {
    size = 'lg';
    ariaLabel = `Päävastuutaho: ${name}`;
  } else {
    ariaLabel = name;
  }

  return (
    <ActionListLink query={{ organization: id }}>
      <BadgeTooltip
        id={`org-${id}`}
        name={name}
        ariaLabel={ariaLabel}
        abbreviation={abbreviation}
        size={size}
      />
    </ActionListLink>
  );
}

function ResponsibleList(props) {
  const { t, data } = props;

  return (
    <Responsibles>
      <h5>{t('responsible-parties')}</h5>
      { data
        ? data.map((item, index) => (
          <ResponsibleBadge
            key={item.id}
            index={index}
            id={item.id}
            name={item.name}
            abbreviation={item.abbreviation}
          />
        ))
        : <h6>{t('responsible-parties-missing')}</h6> }
    </Responsibles>
  );
}

ResponsibleBadge.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  abbreviation: PropTypes.string,
};

ResponsibleList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    abbreviation: PropTypes.string,
  })).isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(ResponsibleList);
