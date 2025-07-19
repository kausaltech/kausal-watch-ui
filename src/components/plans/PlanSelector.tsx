import { CSSProperties } from 'react';

import { transparentize } from 'polished';
import { DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import styled, { useTheme } from 'styled-components';

import { getThemeStaticURL } from '@/common/theme';
import Icon from '@/components/common/Icon';
import { usePlan } from '@/context/plan';

import PlanLink from './PlanLink';

const PlanSelect = styled.div`
  display: flex;
  align-items: center;
`;

const PlanDivider = styled.div<{ $color: CSSProperties['color'] }>`
  &:before {
    content: '/';
    margin: 0 0.25rem 0 0.5rem;
    color: ${(props) => props.$color};
  }
`;

const PlanAvatar = styled.img`
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  box-shadow: 0 0 3px 1px ${(props) => transparentize(0.8, props.theme.themeColors.black)};
`;

const PlanTitle = styled.div`
  margin-left: 0.5rem;
  font-size: ${(props) => props.theme.fontSizeSm};
`;

const StyledDropdownToggle = styled(DropdownToggle)<{
  $color: CSSProperties['color'];
}>`
  display: flex;
  align-items: center;
  padding: 0.25rem;
  background: none;
  line-height: 1.5rem;
  border: 1px solid transparent;
  border-radius: 1.75rem;
  font-size: 1rem;
  color: ${(props) => props.$color};
  font: inherit;
  cursor: pointer;
  outline: inherit;

  &:hover {
    background: ${(props) => props.theme.themeColors.white};
    border-color: ${(props) => props.theme.themeColors.dark};
    color: ${(props) => props.theme.themeColors.dark};

    svg {
      fill: ${(props) => props.theme.themeColors.dark} !important;
    }
  }

  svg {
    fill: ${(props) => props.$color} !important;
  }
`;

interface PlanSelectorProps {
  color: CSSProperties['color'];
}

const PlanSelector = (props: PlanSelectorProps) => {
  const { color } = props;
  const plan = usePlan();
  const { allRelatedPlans } = plan;
  const theme = useTheme();

  if (!allRelatedPlans.length) return null;

  const selectablePlans = [
    ...plan.allRelatedPlans.filter((pl) => pl?.id !== plan.id && pl?.id !== plan.parent?.id),
  ];

  return (
    <PlanSelect>
      <PlanDivider $color={color} />
      <UncontrolledDropdown>
        <StyledDropdownToggle data-toggle="dropdown" tag="button" $color={color}>
          <PlanAvatar
            src={plan.image?.small?.src ?? getThemeStaticURL(theme.defaultAvatarOrgImage)}
            alt=""
          />
          <PlanTitle>{plan.shortName || plan.name}</PlanTitle>
          <Icon.AngleDown />
        </StyledDropdownToggle>
        <DropdownMenu>
          {selectablePlans.map((plan) => !!plan && <PlanLink key={plan?.id} plan={plan} />)}
        </DropdownMenu>
      </UncontrolledDropdown>
    </PlanSelect>
  );
};

export default PlanSelector;
