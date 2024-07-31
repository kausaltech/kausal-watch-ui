import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Tag = styled.div`
  display: flex;
  max-width: 600px;
  margin-bottom: ${(props) => props.theme.spaces.s025};
`;

const OrgAvatar = styled.img`
  display: block;
  width: ${(props) => props.theme.spaces[props.size]};
  height: ${(props) => props.theme.spaces[props.size]};
`;

const OrgName = styled.div`
  margin-left: ${(props) => props.theme.spaces.s050};
  line-height: 1.2;
`;

const OrgTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) =>
    `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`};
  font-weight: ${(props) => props.theme[props.weight]};
`;

const OrgChip = React.forwardRef((props, ref) => {
  const { image, name, size = 'md' } = props;

  const IMAGE_SIZES = {
    sm: 's100',
    md: 's200',
  };

  return (
    <Tag ref={ref} {...props}>
      <OrgAvatar src={image} size={IMAGE_SIZES[size]} alt="" />
      <OrgName>
        <OrgTitle
          weight={size === 'sm' ? 'fontWeightNormal' : 'fontWeightBold'}
        >
          {name}
        </OrgTitle>
      </OrgName>
    </Tag>
  );
});

OrgChip.displayName = 'OrgChip';

OrgChip.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.string,
};

export default OrgChip;
