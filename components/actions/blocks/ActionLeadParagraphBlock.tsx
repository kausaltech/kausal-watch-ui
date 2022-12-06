
import { ActionSection } from 'components/actions/ActionContent';
import RichText from 'components/common/RichText';

const ActionLeadParagraphBlock = (props) => {
  const { content } = props;
  return (
    <ActionSection className="text-content">
      <strong><RichText html={content} /></strong>
    </ActionSection>
  )
}

export default ActionLeadParagraphBlock;