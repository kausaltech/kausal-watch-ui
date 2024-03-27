import React, { ReactElement } from 'react';
import styled from 'styled-components';

import RichText from 'components/common/RichText';
import Icon from 'components/common/Icon';
import { CategoryContent } from 'components/actions/CategoryTags';
import PopoverTip from 'components/common/PopoverTip';
import {
  AttributesBlockAttributeFragment,
  AttributesBlockAttributeTypeFragment,
  AttributesBlockAttributeWithNestedTypeFragment,
} from 'common/__generated__/graphql';
import { useLocale } from 'next-intl';
import {
  ATTRIBUTE_FRAGMENT,
  ATTRIBUTE_TYPE_FRAGMENT,
  ATTRIBUTE_WITH_NESTED_TYPE_FRAGMENT,
} from '@/fragments/action-attribute.fragment';

const ScaleIcon = styled(Icon)<{ $active?: boolean }>`
  font-size: 1.5rem;
  fill: ${({ theme, $active }) =>
    $active
      ? theme.actionAttributeColor ?? theme.brandDark
      : theme.themeColors.light} !important;
`;

const AttributeContainer = styled.div<{ $fontSize?: string }>`
  margin-bottom: ${(props) => props.theme.spaces.s200};

  h3 {
    font-size: ${(props) => props.theme.fontSizeBase};
  }

  .text-content {
    text-align: left;
    font-size: ${({ $fontSize, theme }) => theme[$fontSize ?? 'fontSizeSm']};
    line-height: ${(props) => props.theme.lineHeightMd};
    color: ${(props) => props.theme.textColor.secondary};
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

  &.highlighted {
    display: inline-block;
    background-color: ${(props) => props.theme.brandLight};
    padding: ${(props) => props.theme.spaces.s025}
      ${(props) => props.theme.spaces.s050};
    border-radius: ${(props) => props.theme.badgeBorderRadius};
  }
`;

const NumericValue = styled.span`
  font-weight: 700;
  margin-right: 0.2rem;
`;

const NumericValueUnit = styled.span`
  font-size: ${(props) => props.theme.fontSizeSm};
`;

type AttributeContentProps = {
  attribute: AttributesBlockAttributeFragment;
  attributeType: AttributesBlockAttributeTypeFragment;
  fontSize: string;
};

type AttributeContentNestedTypeProps = {
  attribute: AttributesBlockAttributeWithNestedTypeFragment;
  attributeType: null | undefined;
  fontSize?: string;
};

const ActionAttribute = (
  props: AttributeContentProps | AttributeContentNestedTypeProps
) => {
  const locale = useLocale();

  const { attribute, attributeType, fontSize } = props;
  const type = attributeType ?? attribute.type;
  let dataElement: ReactElement;

  switch (attribute.__typename) {
    case 'AttributeChoice':
      const valueIndex = type.choiceOptions.findIndex(
        (option) => option.id === attribute.choice?.id
      );
      // const choiceCount = contentType.choiceOptions.length;
      dataElement = (
        <div>
          {type.format === 'ORDERED_CHOICE' &&
            type.choiceOptions.map(
              (choice, idx) =>
                (idx > 0 || !type.hasZeroOption) && (
                  <ScaleIcon
                    $active={idx <= valueIndex}
                    name="circleFull"
                    key={choice.identifier}
                  />
                )
            )}
          {type.showChoiceNames && (
            <AttributeChoiceLabel
              className={
                type.format === 'OPTIONAL_CHOICE' ||
                type.format === 'UNORDERED_CHOICE'
                  ? 'highlighted'
                  : ''
              }
            >
              {attribute.choice?.name}
            </AttributeChoiceLabel>
          )}
          {attribute.text ? <RichText html={attribute.text} /> : null}
        </div>
      );
      break;
    case 'AttributeText':
      // FIXME: attribute.value is not HTML
      dataElement = <RichText html={attribute.value} />;
      break;
    case 'AttributeRichText':
      dataElement = <RichText html={attribute.value} />;
      break;
    case 'AttributeNumericValue':
      const formattedValue = attribute.numericValue.toLocaleString(locale);

      dataElement = (
        <div>
          <NumericValue>{formattedValue}</NumericValue>
          <NumericValueUnit>{type.unit?.name}</NumericValueUnit>
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
    default:
      return <div />;
  }
  // Render horizontal layout
  return (
    <AttributeContainer $fontSize={fontSize}>
      <h3>
        {type.name}
        {type.helpText && (
          <PopoverTip content={type.helpText} identifier={type.id} />
        )}
      </h3>
      {dataElement}
    </AttributeContainer>
  );
};

ActionAttribute.fragments = {
  attribute: ATTRIBUTE_FRAGMENT,
  attributeType: ATTRIBUTE_TYPE_FRAGMENT,
  attributeWithNestedType: ATTRIBUTE_WITH_NESTED_TYPE_FRAGMENT,
};

export default ActionAttribute;
