import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';
import { Row, Col } from 'reactstrap';
import { useTranslation } from 'common/i18n';
import { TFunction } from 'next-i18next';
import { gql } from '@apollo/client';

import RichText from 'components/common/RichText';
import Icon from 'components/common/Icon';
import { CategoryContent } from 'components/actions/CategoryTags';
import {
  AttributesBlockAttributeFragment, AttributesBlockAttributeTypeFragment,
  AttributesBlockAttributeWithNestedTypeFragment
 } from 'common/__generated__/graphql';


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

type AttributeProps = {
  vertical: boolean,
}

const Attributes = styled.div<AttributeProps>`
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

type AttributeContentProps = {
  attribute: AttributesBlockAttributeFragment,
  attributeType: AttributesBlockAttributeTypeFragment,
  t: TFunction, 
}

type AttributeContentNestedTypeProps = {
  attribute: AttributesBlockAttributeWithNestedTypeFragment,
  attributeType: null | undefined,
}

function AttributeContent(props: AttributeContentProps | AttributeContentNestedTypeProps) {
  const { attribute, attributeType, t } = props;
  let type = attributeType ?? attribute.type;

  let dataElement: ReactElement;

  switch (attribute.__typename) {
    case 'AttributeChoice':
      const valueIndex = type.choiceOptions.findIndex(
        (option) => option.id === attribute.choice?.id
      );
      // const choiceCount = contentType.choiceOptions.length;
      dataElement = (
        <div>
          { type.choiceOptions.map((choice, idx) => (
            (idx > 0 || !type.hasZeroOption) && <ScaleIcon
              name="circleFull"
              className={idx <= valueIndex ? 'icon-on' : 'icon-off'}
              size="md"
              key={choice.identifier}
            />
          ))}
          { type.showChoiceNames && <AttributeChoiceLabel>{ attribute.choice?.name }</AttributeChoiceLabel> }
          { attribute.text ? <RichText html={attribute.text} /> : null}
        </div>
      );
      break;
    case 'AttributeRichText':
      dataElement = (
        <RichText html={attribute.value} />
      );
      break;
    case 'AttributeNumericValue':
      dataElement = (
        <span>
          {attribute.numericValue} {type.unit?.name}
        </span>
      );
      break;
    case 'AttributeCategoryChoice':
      dataElement = (
        <CategoryContent category={attribute.categories} t={t}/>
      );
      break;
    default: return <div />;
  }
  // Render horizontal layout
  return (
    <AttributeContainer>
      <h3>{type.name}</h3>
      {dataElement}
    </AttributeContainer>
  );
}

type AttributesBlockProps = {
  children?: any,
  vertical: boolean,
} & ({
  attributes: AttributeContentProps['attribute'][],
  types: AttributeContentProps['attributeType'][],
} | {
  attributes: AttributeContentNestedTypeProps['attribute'][],
  types: undefined,
});

function AttributesBlock(props: AttributesBlockProps) {
  const {
    attributes,
    children,  // extra children that can be passed by nesting in the JSX tag
    types,
    vertical,
  } = props;
  const { t } = useTranslation();

  let typesById: Map<string, AttributeContentProps['attributeType']> | null;

  if (types) {
    typesById = new Map(types.map((type) => [type.id, type]));
  }

  function attributeHasValue(attribute: AttributesBlockProps['attributes'][0]) {
    const { __typename } = attribute;

    if (__typename === 'AttributeChoice') {
      return !!(attribute.choice || attribute.text);
    } else if (__typename === 'AttributeRichText') {
      return !!attribute.value;
    }
    return true;
  }
  const attributesWithValue = attributes.filter(attributeHasValue);

  return (
    <Attributes vertical={vertical}>
      <AttributesList
        vertical={vertical}
        tag="ul"
      >
      {attributesWithValue.map((item: typeof attributes[0]) => {
        return (
          <AttributeItem
            tag="li"
            key={item.id}
            md={vertical ? 12 : 6} lg={vertical ? 12 : 4}
          >
            {/* @ts-ignore */}
            <AttributeContent
              t={t}
              key={item.id}
              attribute={item}
              attributeType={typesById && typesById.get(item.type.id)}
            />
          </AttributeItem>
        );
      })}
      </AttributesList>
      {children}
    </Attributes>
  );
}

const attributeFragment = gql`
fragment AttributesBlockAttribute on AttributeInterface {
  __typename
  id
  type {
    id
  }
  ...on AttributeChoice {
    choice {
      id
      name
    }
    text
  }
  ...on AttributeRichText {
    value
  }
  ...on AttributeNumericValue {
    numericValue: value
  }
  ...on AttributeCategoryChoice {
    categories {
      name
      identifier
      iconSvgUrl
      iconImage {
        rendition(size:"400x400", crop:false) {
          src
        }
      }
    }
  }
}
`;

const attributeTypeFragment = gql`
fragment AttributesBlockAttributeType on AttributeType {
  __typename
  id
  format
  name
  identifier
  choiceOptions {
    id
    identifier
  }
  unit {
    id
    name
  }
  showChoiceNames
  hasZeroOption
}
`;

const attributeWithNestedTypeFragment = gql`
fragment AttributesBlockAttributeWithNestedType on AttributeInterface {
  ...AttributesBlockAttribute
  type {
    ...AttributesBlockAttributeType
  }
}
${attributeFragment}
${attributeTypeFragment}
`;


AttributesBlock.fragments = {
  attribute: attributeFragment,
  attributeType: attributeTypeFragment,
  attributeWithNestedType: attributeWithNestedTypeFragment,
}

export default AttributesBlock;
