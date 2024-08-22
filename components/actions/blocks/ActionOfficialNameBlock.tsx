import styled from 'styled-components';
import { useTranslations } from 'next-intl';

const OfficialText = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s300};
  font-family: ${(props) =>
    `${props.theme.fontFamilyContent}, ${props.theme.fontFamilyFallback}`};
  .official-text-content {
    color: ${(props) => props.theme.neutralDark};
    padding-left: ${(props) => props.theme.spaces.s100};
    border-left: 4px solid ${(props) => props.theme.neutralLight};
  }

  h2 {
    font-size: ${(props) => props.theme.fontSizeBase};
  }
`;

const ActionOfficialNameBlock = (props) => {
  const { plan, block, action } = props;
  const t = useTranslations();

  const generalContent = plan.generalContent || {};
  const cleanOfficialText =
    action.officialName?.replace(/(?:\r\n|\r|\n)/g, '<br>') || '';
  if (!cleanOfficialText) return null;
  const caption = block.caption || generalContent.officialNameDescription;
  const fieldLabel = block.fieldLabel || t('action-description-official');

  return (
    <OfficialText>
      <h2>{fieldLabel}</h2>
      <div className="official-text-content">
        <div dangerouslySetInnerHTML={{ __html: cleanOfficialText }} />
        {caption && <small>{`(${caption})`}</small>}
      </div>
    </OfficialText>
  );
};

export default ActionOfficialNameBlock;
