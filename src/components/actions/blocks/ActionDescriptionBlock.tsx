import { useTranslations } from 'next-intl';
import { useTheme } from 'styled-components';

import { ActionSection } from '@/components/actions/ActionContent';
import RichText from '@/components/common/RichText';

const ActionDescriptionBlock = (props) => {
  const { content, fieldLabel } = props;
  const t = useTranslations();
  const theme = useTheme();

  let headerClass = '';
  let headerText = fieldLabel;

  if (fieldLabel == null || fieldLabel.length === 0) {
    headerClass = 'visually-hidden';
    headerText = t('action-description');
  }

  return (
    <ActionSection className="text-content">
      <h2 className={headerClass}>{headerText}</h2>
      <RichText html={content} />
    </ActionSection>
  );
};

export default ActionDescriptionBlock;
