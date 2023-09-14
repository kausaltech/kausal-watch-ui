import { getActionTermContext, useTranslation } from 'common/i18n';
import { ActionSection, SectionHeader } from 'components/actions/ActionContent';
import ResponsibleList from 'components/actions/ResponsibleList';

const ActionResponsiblePartiesBlock = (props) => {
  const { responsibleParties } = props;
  const { t } = useTranslation();

  return (
    <ActionSection>
      <ResponsibleList responsibleParties={responsibleParties} />
    </ActionSection>
  );
};

export default ActionResponsiblePartiesBlock;
