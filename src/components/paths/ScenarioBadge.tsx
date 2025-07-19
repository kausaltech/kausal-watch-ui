import React from 'react';

import styled from 'styled-components';

const StyledBadge = styled.div`
  display: inline-block;
  max-width: 100%;
  padding: 0.25rem 0.5rem;
  margin-bottom: 0.5rem;
  background-color: white !important;
  font-size: ${(props) => props.theme.fontSizeSm};
  color: ${(props) => props.theme.graphColors.grey070};
  word-break: break-all;
  word-break: break-word;
  hyphens: manual;
  white-space: normal;
  text-align: left;
`;

const BadgeYears = styled.span`
  font-weight: ${(props) => props.theme.fontWeightBold};
  color: ${(props) => props.theme.themeColors.black};
  margin-bottom: 0.5rem;
`;

type ScenarioBadgeProps = {
  children?: React.ReactNode;
  type?: string;
  startYear?: number;
  endYear?: number;
};

const ScenarioBadge = (props: ScenarioBadgeProps) => {
  const { children, startYear, endYear } = props;

  return (
    <StyledBadge>
      {startYear && endYear && <BadgeYears>{`${startYear} - ${endYear}`}: </BadgeYears>}
      {children}
    </StyledBadge>
  );
};

export default ScenarioBadge;
