import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Tag = styled.div`
  display: flex;
  max-width: 600px;
  margin-bottom: ${(props) => props.theme.spaces.s100};
  border-radius: 4px;
`;

const PlanAvatar = styled.img`
  display: block;
  width: ${(props) => props.theme.spaces.s200};
  height: ${(props) => props.theme.spaces.s200};
  border-radius: 50%;
`;

const PlanName = styled.div`
  margin-left: ${(props) => props.theme.spaces.s050};
  line-height: 1.2;
`;

const PlanTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

const PlanOrg = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
`;

const PlanTag = React.forwardRef((props, ref) => {
  const {
    planImage,
    planShortName,
    organization,
    size } = props;

  return (
    <Tag ref={ref} {...props}>
      <PlanAvatar src={planImage} size={size} />
      <PlanName>
        <PlanTitle>
          {planShortName}
        </PlanTitle>
        <PlanOrg>
          {organization}
        </PlanOrg>
      </PlanName>
    </Tag>
  );
});

PlanTag.defaultProps = {
  size: 'sm',
};

PlanTag.propTypes = {
  planImage: PropTypes.string,
  planShortName: PropTypes.string,
  planLongName: PropTypes.string,
  organization: PropTypes.string,
  size: PropTypes.string,
};

export default PlanTag;
