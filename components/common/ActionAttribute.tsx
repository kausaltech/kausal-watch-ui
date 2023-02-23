import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { TFunction } from 'next-i18next';
import { gql } from '@apollo/client';
import numbro from 'numbro';

import RichText from 'components/common/RichText';
import Icon from 'components/common/Icon';
import { CategoryContent, categoryFragment, } from 'components/actions/CategoryTags';
import PopoverTip from 'components/common/PopoverTip';
import {
  AttributesBlockAttributeFragment, AttributesBlockAttributeTypeFragment,
  AttributesBlockAttributeWithNestedTypeFragment,
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

const AttributeChoiceLabel = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s100};
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => props.theme.fontFamilyTiny};
  font-weight: 700;
`;

const NumericValue = styled.span`
  font-weight: 700;
  margin-right: 0.2rem;
`;

const NumericValueUnit = styled.span`
  font-size: ${(props) => props.theme.fontSizeSm};
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

const ActionAttribute = (props: AttributeContentProps | AttributeContentNestedTypeProps) => {
  const { attribute, attributeType } = props;
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
    case 'AttributeText':
      // FIXME: attribute.value is not HTML
      dataElement = (
        <RichText html={attribute.value} />
      );
      break;
    case 'AttributeRichText':
      dataElement = (
        <RichText html={attribute.value} />
      );
      break;
    case 'AttributeNumericValue':
      const formattedValue = numbro(attribute.numericValue).format({thousandSeparated: true});
      dataElement = (
        <div>
          <NumericValue>
            {formattedValue}
          </NumericValue>
          <NumericValueUnit>
            {type.unit?.name}
          </NumericValueUnit>
        </div>
      );
      break;
    case 'AttributeCategoryChoice':
      dataElement = (
        <CategoryContent
          categories={attribute.categories}
          categoryType={attribute.type}
          noLink={true}
        />
      );
      break;
    default: return <div />;
  }
  // Render horizontal layout
  return (
    <AttributeContainer>
      <h3>
        {type.name}
        {type.helpText && (
          <PopoverTip
            content={type.helpText}
            identifier={type.id}
          />
        )}
      </h3>
      {dataElement}
    </AttributeContainer>
  );
}

const attributeFragment = gql`
${categoryFragment}
fragment AttributesBlockAttribute on AttributeInterface {
  __typename
  id
  type {
    id
    identifier
    format
    reportField
    report {
      identifier
      name
      startDate
      endDate
    }
  }
  ...on AttributeChoice {
    choice {
      id
      name
    }
    text
  }
  ...on AttributeText {
    value
  }
  ...on AttributeRichText {
    value
  }
  ...on AttributeNumericValue {
    numericValue: value
  }
  ...on AttributeCategoryChoice {
    categories {
      ...CategoryTagsCategory
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
  helpText
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


ActionAttribute.fragments = {
  attribute: attributeFragment,
  attributeType: attributeTypeFragment,
  attributeWithNestedType: attributeWithNestedTypeFragment,
}

export default ActionAttribute;
