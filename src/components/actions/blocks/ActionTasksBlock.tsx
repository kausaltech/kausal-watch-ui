import { useTranslations } from 'next-intl';
import { Col, Row } from 'reactstrap';

import { getActionTaskTermContext } from '@/common/i18n';
import { ActionSection, SectionHeader } from '@/components/actions/ActionContent';
import TaskList from '@/components/actions/TaskList';
import { usePlan } from '@/context/plan';

type ActionTasksBlockProps = {
  tasks: React.ComponentProps<typeof TaskList>['tasks'];
  heading?: string | null;
};

const ActionTasksBlock = ({ tasks, heading }: ActionTasksBlockProps) => {
  const t = useTranslations();
  const plan = usePlan();

  return (
    <div>
      <Row>
        <Col>
          <SectionHeader>
            {heading || t('action-tasks', getActionTaskTermContext(plan))}
          </SectionHeader>
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
  );
};

export default ActionTasksBlock;
