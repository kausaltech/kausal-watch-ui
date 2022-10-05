import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { Row, Col } from 'reactstrap';

import RichText from 'components/common/RichText';
import PlanContext from 'context/plan';
import Icon from 'components/common/Icon';

const ScaleIcon = styled(Icon)`
  font-size: ${(props) => {
    switch (props.size) {
      case 'sm': return '.8em';
      case 'md': return '1.5em';
      default: return '1.5em';
    }
  }};

  &.icon-on {
    fill: ${(props) => props.theme.brandDark} !important;
  }

  &.icon-off {
    fill: ${(props) => props.theme.themeColors.light} !important;
  }

  &.icon-bad {
    fill: ${(props) => props.theme.graphColors.red070} !important;
  }
`;

const AttributeContainer = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s200};
`;

const Attributes = styled.div`
  ${props => props.vertical && css`
    max-width: 320px;
  `}
  margin: ${(props) => props.theme.spaces.s100} auto;
  padding: ${(props) => props.theme.spaces.s200} 0 0;
  border-top: 1px solid ${(props) => props.theme.graphColors.grey040};
  border-bottom: 1px solid ${(props) => props.theme.graphColors.grey040};
  text-align: left;
`;

const AttributesList = styled(Row)`
  list-style: none;
  padding: 0;
  margin-bottom: 0;

  h3 {
    font-size: ${(props) => props.theme.fontSizeBase};
  }

  .text-content {
      text-align: left;
      font-size: ${(props) => props.theme.fontSizeSm};
      line-height: ${(props) => props.theme.lineHeightMd};
      color: ${(props) => props.theme.graphColors.grey080};
    }
    .text-content > *:last-child {
      margin-bottom: 0;
    }
`;

const AttributeItem = styled(Col)`
  display: block;
`;

const AttributeChoiceLabel = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => props.theme.fontFamilyTiny};
`;

function AttributeContent(props) {
  const { contentData, contentType, title, vertical } = props;

  let dataElement;
  switch (contentData.__typename) {
    case 'AttributeChoice':
      if (contentType) {
        const valueIndex = contentType.choiceOptions.findIndex(
          (choiceType) => choiceType.identifier === contentData.valueIdentifier
        );
        // const choiceCount = contentType.choiceOptions.length;
        dataElement = (
          <div>
            { contentType.choiceOptions.map((choice, idx) => (
              <ScaleIcon
                name="circleFull"
                className={idx <= valueIndex ? 'icon-on' : 'icon-off'}
                size="md"
                key={choice.identifier}
              />
            ))}
            <AttributeChoiceLabel>{ contentData.value }</AttributeChoiceLabel>
          </div>
        );
      }
      break;
    case 'AttributeChoiceAndText':
      // TODO
      return null;
    case 'AttributeRichText':
      dataElement = (
        <RichText html={contentData.value} />
      );
      break;
    case 'AttributeNumericValue':
      dataElement = (
        <span>
          {contentData.numericValue} {contentData.type.unit?.name}
        </span>
      );
      break;
    default: return <div />;
  }
  // Render horizontal layout
  return (
    <AttributeContainer>
      <h3>{title}</h3>
      {dataElement}
    </AttributeContainer>
  );
}

function AttributesBlock(props) {
  const plan = useContext(PlanContext);
  const {
    attributes,
    children,  // extra children that can be passed by nesting in the JSX tag
    types,
    vertical,
  } = props;

  return (
    <Attributes vertical={vertical}>
      <AttributesList
        vertical={vertical}
        tag="ul"
      >
      {attributes.map((item) => (
        item?.value &&
        <AttributeItem
          tag="li"
          key={item.id}
          md={vertical ? 12 : 6} lg={vertical ? 12 : 4}
        >
        <React.Fragment key={item.id}>
          <AttributeContent
            title={item.key}
            contentData={item}
            contentType={types?.find((type) => type.identifier === item.keyIdentifier)}
            vertical={vertical}
          />
        </React.Fragment>
        </AttributeItem>

      ))}
      </AttributesList>
      {children}
    </Attributes>
  );
}

// TODO: prop types and defaults
AttributesBlock.defaultProps = {

};

AttributesBlock.propTypes = {

};

export default AttributesBlock;
