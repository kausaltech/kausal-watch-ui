import styled from 'styled-components';

import { ActionSection } from 'components/actions/ActionContent';
import Timeline from 'components/graphs/Timeline';
import ScheduleTimeline from 'components/graphs/ScheduleTimeline';
import {
  ActionDateFormat,
  GetActionDetailsQuery,
  PlanContextFragment,
} from 'common/__generated__/graphql';
import { getDateFormat } from 'utils/dates.utils';
import { useTranslations } from 'next-intl';

const SideHeader = styled.h3`
  font-size: ${(props) => props.theme.fontSizeBase};
`;

type Props = {
  action: NonNullable<GetActionDetailsQuery['action']>;
  plan: PlanContextFragment;
};

const ActionScheduleBlock = ({ action, plan }: Props) => {
  const t = useTranslations();

  const dateFormat =
    action.dateFormat || plan.actionListPage?.actionDateFormat || undefined;

  return (
    <>
      {action.schedule.length ? (
        <ActionSection>
          <SideHeader>{t('action-timeline')}</SideHeader>
          <ScheduleTimeline
            schedules={action.schedule}
            allSchedules={plan.actionSchedules}
          />
        </ActionSection>
      ) : null}
      {action.startDate || action.endDate || action.scheduleContinuous ? (
        <ActionSection>
          <SideHeader>{t('action-timeline')}</SideHeader>
          <Timeline
            formatOptions={getDateFormat(
              dateFormat as ActionDateFormat | undefined
            )}
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
