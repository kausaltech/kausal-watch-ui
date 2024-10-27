import { ActionSection } from '@/components/actions/ActionContent';
import ResponsibleList from '@/components/actions/ResponsibleList';

const ActionResponsiblePartiesBlock = (props) => {
  const { block, responsibleParties } = props;

  return (
    <ActionSection>
      <ResponsibleList
        heading={block?.heading}
        responsibleParties={responsibleParties}
      />
    </ActionSection>
  );
};

export default ActionResponsiblePartiesBlock;
