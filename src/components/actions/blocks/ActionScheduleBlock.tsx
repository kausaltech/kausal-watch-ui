import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import {
  ActionDateFormat,
  GetActionDetailsQuery,
  PlanContextFragment,
} from '@/common/__generated__/graphql';
import { ActionSection } from '@/components/actions/ActionContent';
import ScheduleTimeline from '@/components/graphs/ScheduleTimeline';
import Timeline from '@/components/graphs/Timeline';
import { getDateFormat } from '@/utils/dates.utils';

const SideHeader = styled.h3`
  font-size: ${(props) => props.theme.fontSizeBase};
`;

type Props = {
  action: NonNullable<GetActionDetailsQuery['action']>;
  plan: PlanContextFragment;
  heading: string;
};

const ActionScheduleBlock = ({ action, plan, heading }: Props) => {
  const t = useTranslations();

  const dateFormat = action.dateFormat || plan.actionListPage?.actionDateFormat || undefined;
  const headingText = heading != null && heading.trim().length > 0 ? heading : t('action-timeline');

  return (
    <>
      {action.schedule.length ? (
        <ActionSection>
          <SideHeader>{headingText}</SideHeader>
          <ScheduleTimeline schedules={action.schedule} allSchedules={plan.actionSchedules} />
        </ActionSection>
      ) : null}
      {action.startDate || action.endDate || action.scheduleContinuous ? (
        <ActionSection>
          <SideHeader>{headingText}</SideHeader>
          <Timeline
            formatOptions={getDateFormat(dateFormat as ActionDateFormat | undefined)}
            startDate={action.startDate}
            endDate={action.endDate}
            continuous={action.scheduleContinuous}
          />
        </ActionSection>
      ) : null}
    </>
  );
};

export default ActionScheduleBlock;
