import styled from 'styled-components';
import { ActionSection } from 'components/actions/ActionContent';
import RichText from 'components/common/RichText';

const LeadParagraph = styled.div`
  font-size: 110%;
`;

const ActionLeadParagraphBlock = (props) => {
  const { content } = props;
  return (
    <ActionSection className="text-content">
      <LeadParagraph>
        <RichText html={content} />
      </LeadParagraph>
    </ActionSection>
  );
};

export default ActionLeadParagraphBlock;
