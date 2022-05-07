import { useContext } from 'react';
import styled from 'styled-components';
import { darken, transparentize } from 'polished';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import PlanContext from 'context/plan';
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
  border: 1px solid ${(props)=> transparentize(0.8, props.theme.brandNavColor)};
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
  border-radius: 1rem;

  &:hover {
    background: ${(props)=> props.theme.themeColors.light};
    border-color: ${(props)=> props.theme.themeColors.light};
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
  const plan = useContext(PlanContext);
  if (!plan.relatedPlans || !plan.children) return null;
  return (

    <PlanSelect>
      <PlanDivider />
      <UncontrolledDropdown>
        <StyledDropdownToggle
          data-toggle="dropdown"
          tag="button"
        >
            <PlanAvatar src={plan.image?.small.src} />
            <PlanTitle>
              {plan.shortName}
            </PlanTitle>
            <Icon name="angle-down" />
        </StyledDropdownToggle>
        <DropdownMenu>
          { !plan.children?.length > 0 && (
            <PlanDropdownItem>
              <PlanChip
                planImage={plan.image?.rendition.src}
                planShortName={plan.shortName}
                organization={plan.name}
                size="md"
              />
            </PlanDropdownItem>
            )
          }
          { plan.relatedPlans.map((relPlan) => (
            <PlanDropdownItem href={relPlan.viewUrl} key={relPlan.identifier}>
              <PlanChip
                planImage={relPlan.image?.rendition.src}
                planShortName={relPlan.shortName}
                organization={relPlan.name}
                size="md"
              />
            </PlanDropdownItem>
          ))}
          { plan.children.map((relPlan) => (
            <PlanDropdownItem href={relPlan.viewUrl} key={relPlan.identifier}>
              <PlanChip
                planImage={relPlan.image?.rendition.src}
                planShortName={relPlan.shortName}
                organization={relPlan.name}
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