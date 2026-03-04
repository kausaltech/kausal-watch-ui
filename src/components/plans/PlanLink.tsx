import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { PlanContextType } from '@/context/plan';

import PlanChip from './PlanChip';

const PlanDropdownItem = styled.a`
  display: block;
  padding: 0.25rem 0;
  margin: 0 0.5rem 0.5rem;
  border: 1px solid ${(props) => props.theme.themeColors.light};
  border-radius: 0.5rem;
  text-decoration: none !important;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: ${(props) => props.theme.themeColors.light};
    border-color: ${(props) => props.theme.themeColors.light};
    text-decoration: none;
  }
`;

interface Props {
  plan: PlanContextType | NonNullable<PlanContextType['allRelatedPlans'][0]>;
}

const isLocalLink = (link: string) => link.endsWith('.localhost');

function appendPort(link?: string) {
  if (typeof link !== 'string') {
    return link;
  }

  if (isLocalLink(link)) {
    return `${link}:3000`;
  }

  return link;
}

const PlanLink = ({ plan }: Props) => {
  const theme = useTheme();
  const planUrl = appendPort(plan.viewUrl ?? undefined) ?? '';

  if (!plan.viewUrl) {
    return null;
  }

  return (
    <PlanDropdownItem
      key={plan.identifier}
      href={planUrl}
      type="button"
      tabIndex={0}
      role="menuitem"
    >
      <PlanChip
        planImage={plan.image?.rendition?.src}
        planShortName={plan.shortName ?? undefined}
        organization={theme.settings?.multiplan?.hideLongPlanNames ? undefined : plan.name}
        size="md"
      />
    </PlanDropdownItem>
  );
};

export default PlanLink;
