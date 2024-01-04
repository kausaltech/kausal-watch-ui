import styled from 'styled-components';

import { ActionSection } from 'components/actions/ActionContent';
import Timeline from 'components/graphs/Timeline';
import ScheduleTimeline from 'components/graphs/ScheduleTimeline';
import { useTranslations } from 'next-intl';

const SideHeader = styled.h3`
  font-size: ${(props) => props.theme.fontSizeBase};
`;

const ActionScheduleBlock = (props) => {
  const { action, plan } = props;
  const t = useTranslations();

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
