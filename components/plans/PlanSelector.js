import styled from 'styled-components';
import { darken, transparentize } from 'polished';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import PlanChip from './PlanChip';

const PlanSelect = styled.div`
  display: flex;
  align-items: center;
`;

const PlanDivider = styled.div`
  &:before {
    content: '/';
    margin: 0 .5rem;
    color: ${(props)=> props.theme.brandNavColor};
  }
`;

const PlanAvatar = styled.img`
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
`;

const PlanTitle = styled.div`
  margin-left: .5rem;
  font-size: ${(props) => props.theme.fontSizeSm};
  font-weight: ${(props) => props.theme[props.weight]};
`;

const PlanDropdownItem = styled.a`
  display: block;
  padding: .25rem .75rem .25rem .25rem;
  margin: .5rem;
  border: 1px solid ${(props)=> props.theme.themeColors.light};
  border-radius: 1.75rem;

  &:hover {
    background: ${(props)=> props.theme.themeColors.light};
    border-color: ${(props)=> props.theme.themeColors.light};
  }
`;

const StyledDropdownToggle = styled(DropdownToggle)`
  display: flex;
  align-items: center;
  padding: .25rem .75rem .25rem .25rem;
  background: none;
  line-height: 1.5rem;
  border: 1px solid ${(props)=> transparentize(0.75, props.theme.brandNavColor)};
  border-radius: 1.75rem;
  font-size: 1rem;
  color: ${(props)=> props.theme.brandNavColor};
  font: inherit;
  cursor: pointer;
  outline: inherit;

  &:hover {
    background: ${(props) => props.theme.themeColors.white};
    border-color: ${(props) => props.theme.themeColors.dark};
    color: ${(props) => props.theme.themeColors.dark};
  }
`;

const PlanSelector = (props) => {
  const { plans } = props;
  const activePlan = plans.find((plan) => plan.active === true);

  return (

    <PlanSelect>
      <PlanDivider />
      <UncontrolledDropdown>
        <StyledDropdownToggle
          data-toggle="dropdown"
          tag="button"
        >

            <PlanAvatar src={activePlan.image} />
            <PlanTitle>
              {activePlan.shortName}
            </PlanTitle>

        </StyledDropdownToggle>
        <DropdownMenu>
          { plans.map((plan) => (
            <PlanDropdownItem href={plan.planUrl} key={plan.identifier}>
              <PlanChip
                planImage={plan.image}
                planShortName={plan.shortName}
                organization={plan.name}
                size="md"
              />
            </PlanDropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    </PlanSelect>
  )
};

export default PlanSelector;