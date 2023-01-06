import {
  Row, Col,
} from 'reactstrap';

import { getActionTermContext, useTranslation } from 'common/i18n';
import { ActionSection, SectionHeader } from 'components/actions/ActionContent';
import TaskList from 'components/actions/TaskList';

const ActionTasksBlock = (props) => {
  const { tasks } = props;
  const { t } = useTranslation();

  return (
    <div>
    <Row>
      <Col>
        <SectionHeader>{ t('actions:action-tasks') }</SectionHeader>
      </Col>
    </Row>
    <Row>
      <Col>
        <ActionSection>
          <TaskList tasks={tasks} />
        </ActionSection>
      </Col>
    </Row>
  </div>
  )
}

export default ActionTasksBlock;
