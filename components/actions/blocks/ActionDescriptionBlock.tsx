import { useTranslation } from 'common/i18n';
import { ActionSection } from 'components/actions/ActionContent';
import RichText from 'components/common/RichText';

const ActionDescriptionBlock = (props) => {
  const { content } = props;
  const { t } = useTranslation();
  return (
    <ActionSection className="text-content">
      <h2 className="visually-hidden">{t('actions:action-description')}</h2>
      <RichText html={content} />
    </ActionSection>
  );
};

export default ActionDescriptionBlock;
