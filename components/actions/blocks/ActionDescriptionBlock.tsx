import { ActionSection } from 'components/actions/ActionContent';
import RichText from 'components/common/RichText';
import { useTranslations } from 'next-intl';
import { useTheme } from 'styled-components';

const ActionDescriptionBlock = (props) => {
  const { content } = props;
  const t = useTranslations();
  const theme = useTheme();

  const headerClass =
    content && theme.settings.showActionDescriptionHeader
      ? ''
      : 'visually-hidden';

  return (
    <ActionSection className="text-content">
      <h2 className={headerClass}>{t('action-description')}</h2>
      <RichText html={content} />
    </ActionSection>
  );
};

export default ActionDescriptionBlock;
