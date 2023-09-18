import { getActionTermContext, useTranslation } from 'common/i18n';
import { ActionSection, SectionHeader } from 'components/actions/ActionContent';
import ResponsibleList from 'components/actions/ResponsibleList';

const ActionResponsiblePartiesBlock = (props) => {
  const { block, responsibleParties } = props;
  const { t } = useTranslation();

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
