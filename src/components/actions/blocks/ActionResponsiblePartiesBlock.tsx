import { ActionSection } from '@/components/actions/ActionContent';
import type { ActionContentAction } from '@/components/actions/ActionContent';
import ResponsibleList from '@/components/actions/ResponsibleList';

type Props = {
  block: { heading?: string | null };
  responsibleParties: ActionContentAction['responsibleParties'];
};

const ActionResponsiblePartiesBlock = (props: Props) => {
  const { block, responsibleParties } = props;

  return (
    <ActionSection>
      <ResponsibleList heading={block.heading ?? null} responsibleParties={responsibleParties} />
    </ActionSection>
  );
};

export default ActionResponsiblePartiesBlock;
