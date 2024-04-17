import { ActionSection } from 'components/actions/ActionContent';
import RichText from 'components/common/RichText';
import { useTranslations } from 'next-intl';
import { useTheme } from 'styled-components';

const ActionDescriptionBlock = (props) => {
  const { content, fieldLabel } = props;
  const t = useTranslations();
  const theme = useTheme();

  const headerClass =
    fieldLabel != null && fieldLabel.length > 0 ? '' : 'visually-hidden';

  return (
    <ActionSection className="text-content">
      <h2 className={headerClass}>{fieldLabel}</h2>
      <RichText html={content} />
    </ActionSection>
  );
};

export default ActionDescriptionBlock;
