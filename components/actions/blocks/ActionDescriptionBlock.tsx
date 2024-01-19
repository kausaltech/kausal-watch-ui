import { ActionSection } from 'components/actions/ActionContent';
import RichText from 'components/common/RichText';
import { useTranslations } from 'next-intl';

const ActionDescriptionBlock = (props) => {
  const { content } = props;
  const t = useTranslations();

  return (
    <ActionSection className="text-content">
      <h2 className="visually-hidden">{t('action-description')}</h2>
      <RichText html={content} />
    </ActionSection>
  );
};

export default ActionDescriptionBlock;
