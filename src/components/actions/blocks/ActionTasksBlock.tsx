import { useTranslations } from 'next-intl';
import { Col, Row } from 'reactstrap';

import type { GetActionDetailsQuery } from '@/common/__generated__/graphql';
import { getActionTaskTermContext } from '@/common/i18n';
import { ActionSection, SectionHeader } from '@/components/actions/ActionContent';
import TaskList from '@/components/actions/TaskList';
import PopoverTip from '@/components/common/PopoverTip';
import { usePlan } from '@/context/plan';

type ActionTasksBlockProps = {
  tasks: NonNullable<GetActionDetailsQuery['action']>['tasks'];
  heading?: string | null;
  helpText?: string | null;
};

const ActionTasksBlock = ({ tasks, heading, helpText }: ActionTasksBlockProps) => {
  const t = useTranslations();
  const plan = usePlan();

  return (
    <div>
      <Row>
        <Col>
          <SectionHeader>
            {heading || t('action-tasks', getActionTaskTermContext(plan))}
            {helpText && <PopoverTip content={helpText} identifier="action-tasks" />}
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
