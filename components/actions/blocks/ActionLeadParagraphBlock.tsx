import styled from 'styled-components';
import { ActionSection } from 'components/actions/ActionContent';
import { useTranslations } from 'next-intl';
import RichText from 'components/common/RichText';
import { useTheme } from 'styled-components';

const LeadParagraph = styled.div`
  font-size: 110%;
`;

const ActionLeadParagraphBlock = (props) => {
  const { content, fieldLabel } = props;
  const t = useTranslations();
  const theme = useTheme();

  let headerClass = '';
  let headerText = fieldLabel;

  if (fieldLabel == null || fieldLabel.length === 0) {
    headerClass = 'visually-hidden';
    headerText = t('action-leadParagraph');
  }
  return (
    <ActionSection className="text-content">
      <h2 className={headerClass}>{headerText}</h2>
      <LeadParagraph>
        <RichText html={content} />
      </LeadParagraph>
    </ActionSection>
  );
};

export default ActionLeadParagraphBlock;
