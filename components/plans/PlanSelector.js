import styled from 'styled-components';
import { transparentize } from 'polished';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { usePlan } from 'context/plan';
import { useTheme } from 'common/theme';
import Icon from 'components/common/Icon';
import PlanChip from './PlanChip';

const PlanSelect = styled.div`
  display: flex;
  align-items: center;
`;

const PlanDivider = styled.div`
  &:before {
    content: '/';
    margin: 0 .25rem 0 .5rem;
    color: ${(props)=> props.theme.brandNavColor};
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
  margin-left: .5rem;
  font-size: ${(props) => props.theme.fontSizeSm};
  font-weight: ${(props) => props.theme[props.weight]};
`;

const PlanDropdownItem = styled.a`
  display: block;
  padding: .25rem 0;
  margin: 0 .5rem .5rem;
  border: 1px solid ${(props)=> props.theme.themeColors.light};
  border-radius: .5rem;
  text-decoration: none !important;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: ${(props)=> props.theme.themeColors.light};
    border-color: ${(props)=> props.theme.themeColors.light};
    text-decoration: none;
  }
`;

const StyledDropdownToggle = styled(DropdownToggle)`
  display: flex;
  align-items: center;
  padding: .25rem;
  background: none;
  line-height: 1.5rem;
  border: 1px solid transparent;
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

    svg {
      fill: ${(props) => props.theme.themeColors.dark} !important;
    }
  }

  svg {
    fill: ${(props)=> props.theme.brandNavColor} !important;
  }
`;

const PlanSelector = (props) => {
  const plan = usePlan();
  const theme = useTheme();
  //console.log(theme)
  const { allRelatedPlans } = plan;
  if (!allRelatedPlans.length) return null;

  const selectablePlans = plan.allRelatedPlans.filter((pl) => pl.id !== plan.parent?.id);
  if (!plan.children.length) {
    selectablePlans.unshift({
      ...plan,
      viewUrl: '/',
    });
  }
  return (
    <PlanSelect>
      <PlanDivider />
      <UncontrolledDropdown>
        <StyledDropdownToggle
          data-toggle="dropdown"
          tag="button"
        >
            <PlanAvatar src={plan.image?.small.src} alt=""/>
            <PlanTitle>
              {plan.shortName || plan.name}
            </PlanTitle>
            <Icon name="angle-down" />
        </StyledDropdownToggle>
        <DropdownMenu>
          { selectablePlans.map((pl) => (
            <PlanDropdownItem
              href={pl.viewUrl}
              key={pl.identifier}
              type="button"
              tabIndex={0}
              role="menuitem"
            >
              <PlanChip
                planImage={pl.image?.rendition.src}
                planShortName={pl.shortName}
                organization={theme.settings?.multiplan?.hideLongPlanNames ? undefined : pl.name}
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