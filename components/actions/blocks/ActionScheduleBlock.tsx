import styled from 'styled-components';

import { getActionTermContext, useTranslation } from 'common/i18n';
import { ActionSection, SectionHeader } from 'components/actions/ActionContent';
import Timeline from 'components/graphs/Timeline';
import ScheduleTimeline from 'components/graphs/ScheduleTimeline';


const SideHeader = styled.h3`
  font-size: ${(props) => props.theme.fontSizeBase};
`;

const ActionScheduleBlock = (props) => {
  const { action } = props;
  const { t } = useTranslation();

  return (
    <>
      { action.schedule.length ? (
        <ActionSection>
          <SideHeader>{ t('actions:action-timeline') }</SideHeader>
          <ScheduleTimeline schedules={action.schedule} allSchedules={plan.actionSchedules} />
        </ActionSection>
      ) : null}
      { action.startDate || action.endDate || action.scheduleContinuous ? (
        <ActionSection>
          <SideHeader>{ t('actions:action-timeline') }</SideHeader>
          <Timeline
            startDate={action.startDate}
            endDate={action.endDate}
            continuous={action.scheduleContinuous}
          />
        </ActionSection>
      ) : null}
    </>
  )
}

export default ActionScheduleBlock;
