import styled from 'styled-components';
import { transparentize } from 'polished';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { usePlan } from 'context/plan';
import Icon from 'components/common/Icon';
import { useTranslation } from 'common/i18n';
import PlanLink from './PlanLink';

const PlanSelect = styled.div`
  display: flex;
  align-items: center;
`;

const PlanDivider = styled.div`
  &:before {
    content: '/';
    margin: 0 0.25rem 0 0.5rem;
    color: ${(props) => props.theme.brandNavColor};
  }
`;

const PlanAvatar = styled.img`
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  box-shadow: 0 0 3px 1px
    ${(props) => transparentize(0.8, props.theme.themeColors.black)};
`;

const PlanTitle = styled.div`
  margin-left: 0.5rem;
  font-size: ${(props) => props.theme.fontSizeSm};
`;

const StyledDropdownToggle = styled(DropdownToggle)`
  display: flex;
  align-items: center;
  padding: 0.25rem;
  background: none;
  line-height: 1.5rem;
  border: 1px solid transparent;
  border-radius: 1.75rem;
  font-size: 1rem;
  color: ${(props) => props.theme.brandNavColor};
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
    fill: ${(props) => props.theme.brandNavColor} !important;
  }
`;

const PlanSelector = () => {
  const plan = usePlan();
  const { allRelatedPlans } = plan;
  if (!allRelatedPlans.length) return null;

  const selectablePlans = [
    { ...plan, viewUrl: '/' },
    ...plan.allRelatedPlans.filter((pl) => pl?.id !== plan.parent?.id),
  ];

  return (
    <PlanSelect>
      <PlanDivider />
      <UncontrolledDropdown>
        <StyledDropdownToggle data-toggle="dropdown" tag="button">
          <PlanAvatar
            src={
              plan.image?.small?.src ??
              '/static/themes/default/images/default-avatar-org.png'
            }
            alt=""
          />
          <PlanTitle>{plan.shortName || plan.name}</PlanTitle>
          <Icon name="angle-down" />
        </StyledDropdownToggle>
        <DropdownMenu>
          {selectablePlans.map(
            (plan) => !!plan && <PlanLink key={plan?.id} plan={plan} />
          )}
        </DropdownMenu>
      </UncontrolledDropdown>
    </PlanSelect>
  );
};

export default PlanSelector;
