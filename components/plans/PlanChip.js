import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Tag = styled.div`
  display: flex;
  align-items: center;
  max-width: 600px;
  border-radius: 4px;
`;

const PlanAvatar = styled.img`
  display: block;
  width: ${(props) => props.theme.spaces[props.size]};
  height: ${(props) => props.theme.spaces[props.size]};
  border-radius: 50%;
`;

const PlanName = styled.div`
  margin-left: ${(props) => props.theme.spaces.s025};
  line-height: 1.2;
`;

const PlanTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
  font-weight: ${(props) => props.theme[props.weight]};
`;

const PlanOrg = styled.div`
  font-size: 80%;
`;

const PlanChip = React.forwardRef((props, ref) => {
  const {
    planImage,
    planShortName,
    organization,
    size } = props;

    const IMAGE_SIZES = {
      'sm': 's100',
      'md': 's200',
    }

  return (
    <Tag ref={ref} {...props}>
      <PlanAvatar src={planImage} size={IMAGE_SIZES[size]} />
      <PlanName>
        <PlanTitle weight={size==='sm' ? 'fontWeightNormal' : 'fontWeightBold'}>
          {planShortName}
        </PlanTitle>
        <PlanOrg>
          {organization}
        </PlanOrg>
      </PlanName>
    </Tag>
  );
});

PlanChip.displayName = "PlanChip";

PlanChip.defaultProps = {
  size: 'md',
};

PlanChip.propTypes = {
  planImage: PropTypes.string,
  planShortName: PropTypes.string,
  planLongName: PropTypes.string,
  organization: PropTypes.string,
  size: PropTypes.string,
};

export default PlanChip;
