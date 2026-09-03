import { useTranslations } from 'next-intl';

import { ActionSection } from '@/components/actions/ActionContent';
import RichText from '@/components/common/RichText';

type Props = {
  content: string;
  fieldLabel?: string | null;
};

const ActionDescriptionBlock = (props: Props) => {
  const { content, fieldLabel } = props;
  const t = useTranslations();

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
