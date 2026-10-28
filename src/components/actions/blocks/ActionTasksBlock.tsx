import { useTranslations } from 'next-intl';

import type {
  ActionDetailsQuery,
  ActionMainContentBlocksFragment,
} from '@/common/__generated__/graphql';
import { getActionTaskTermContext } from '@/common/i18n';
import { ActionSection, SectionHeader } from '@/components/actions/ActionContent';
import TaskList from '@/components/actions/TaskList';
import PopoverTip from '@/components/common/PopoverTip';
import { Col, Row } from '@/components/common/layout/LayoutGrid';
import { usePlan } from '@/context/plan';

type ActionTasksBlockFragment = Extract<
  ActionMainContentBlocksFragment,
  { __typename: 'ActionTasksBlock' }
>;

type ActionTasksBlockProps = {
  tasks: NonNullable<ActionDetailsQuery['action']>['tasks'];
  sections?: ActionTasksBlockFragment['sections'];
  heading?: string | null;
  helpText?: string | null;
};

const ActionTasksBlock = ({ tasks, sections, heading, helpText }: ActionTasksBlockProps) => {
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
            <TaskList tasks={tasks} sections={sections} />
          </ActionSection>
        </Col>
      </Row>
    </div>
  );
};

export default ActionTasksBlock;
