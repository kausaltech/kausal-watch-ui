import React, { type ReactElement } from 'react';

import styled from '@emotion/styled';
import { useLocale } from 'next-intl';

import { transientOptions } from '@common/themes/styles/styled';

import type {
  AttributesBlockAttributeFragment,
  AttributesBlockAttributeTypeFragment,
  AttributesBlockAttributeWithNestedTypeFragment,
} from '@/common/__generated__/graphql';
import { CategoryContent } from '@/components/actions/CategoryTags';
import Icon from '@/components/common/Icon';
import PopoverTip from '@/components/common/PopoverTip';
import RichText from '@/components/common/RichText';
import {
  ATTRIBUTE_FRAGMENT,
  ATTRIBUTE_TYPE_FRAGMENT,
  ATTRIBUTE_WITH_NESTED_TYPE_FRAGMENT,
} from '@/fragments/action-attribute.fragment';

type Variant = 'default' | 'minimized' | 'chip';

const ScaleIcon = styled(Icon, transientOptions)<{ $active?: boolean }>`
  font-size: 1.5rem;
  fill: ${({ theme, $active }) =>
    $active ? (theme.actionAttributeColor ?? theme.brandDark) : theme.themeColors.light} !important;
`;

const AttributeContainer = styled.div<{
  $fontSize?: string;
  $noMargins?: boolean;
}>`
  margin-bottom: ${(props) => (props?.$noMargins ? 0 : props.theme.spaces.s200)};

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

const AttributeScaleContainer = styled.div`
  display: flex;
`;

const AttributeChoiceLabel = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s100};
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`};
  font-weight: 700;

  &.highlighted {
    display: inline-block;
    background-color: ${(props) => props.theme.brandLight};
    padding: ${(props) => props.theme.spaces.s025} ${(props) => props.theme.spaces.s050};
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

const StyledChipContainer = styled.span`
  display: inline;
  font-size: ${(props) => props.theme.fontSizeSm};
`;

const StyledChipLabel = styled.span`
  color: ${(props) => props.theme.textColor.secondary};
`;

const StyledChipValue = styled.span`
  color: ${(props) => props.theme.textColor.primary};
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

/**
 * Extracts the display value from an attribute as plain text for chip rendering.
 */
export function getAttributeValueText(
  attribute: AttributesBlockAttributeFragment | AttributesBlockAttributeWithNestedTypeFragment,
  locale?: string
): string | null {
  switch (attribute.__typename) {
    case 'AttributeChoice':
      return attribute.choice?.name ?? null;
    case 'AttributeText':
    case 'AttributeRichText':
      // Strip angle brackets to prevent any residual HTML tags or fragments
      return attribute.value?.replace(/[<>]/g, '').trim() || null;
    case 'AttributeNumericValue':
      const unit = attribute.type.unit?.shortName ?? attribute.type.unit?.name ?? '';
      return attribute.numericValue != null
        ? `${attribute.numericValue.toLocaleString(locale)}${unit ? ` ${unit}` : ''}`
        : null;
    case 'AttributeCategoryChoice':
      return attribute.categories.map((cat) => cat.name).join(', ') || null;
    default:
      return null;
  }
}

type AttributeContentProps = {
  attribute: AttributesBlockAttributeFragment;
  attributeType: AttributesBlockAttributeTypeFragment;
  fontSize?: string;
  notitle?: boolean;
  variant?: Variant;
};

type AttributeContentNestedTypeProps = {
  attribute: AttributesBlockAttributeWithNestedTypeFragment;
  attributeType: null | undefined;
  fontSize?: string;
  notitle?: boolean;
  variant?: Variant;
};

const ActionAttribute = (props: AttributeContentProps | AttributeContentNestedTypeProps) => {
  const locale = useLocale();

  const { attribute, attributeType, fontSize, notitle = false, variant = 'default' } = props;
  const type = attributeType ?? attribute.type;
  const isMinimized = variant === 'minimized';
  const MAX_MINIMIZED_TEXT_LENGTH = 50;

  // Chip variant with a simple "label: value" format
  if (variant === 'chip') {
    const chipValue = getAttributeValueText(attribute, locale);

    if (!chipValue) return null;

    return (
      <StyledChipContainer>
        <StyledChipLabel>{type.name}: </StyledChipLabel>
        <StyledChipValue>{chipValue}</StyledChipValue>
      </StyledChipContainer>
    );
  }

  let dataElement: ReactElement<any>;

  switch (attribute.__typename) {
    case 'AttributeChoice':
      const valueIndex = type.choiceOptions.findIndex(
        (option) => option.id === attribute.choice?.id
      );
      // const choiceCount = contentType.choiceOptions.length;
      dataElement = (
        <div>
          {type.format === 'ORDERED_CHOICE' && (
            <AttributeScaleContainer>
              {type.choiceOptions.map(
                (choice, idx) =>
                  (idx > 0 || !type.hasZeroOption) && (
                    <ScaleIcon
                      $active={idx <= valueIndex}
                      name="circle-full"
                      key={choice.identifier}
                    />
                  )
              )}
            </AttributeScaleContainer>
          )}
          {type.showChoiceNames && (
            <AttributeChoiceLabel
              className={
                type.format === 'OPTIONAL_CHOICE' || type.format === 'UNORDERED_CHOICE'
                  ? 'highlighted'
                  : ''
              }
            >
              {attribute.choice?.name}
            </AttributeChoiceLabel>
          )}
          {!isMinimized && attribute.text ? <RichText html={attribute.text} /> : null}
        </div>
      );
      break;
    case 'AttributeText':
      // FIXME: attribute.value is not HTML
      dataElement = (
        <RichText
          html={attribute.value}
          maxLength={isMinimized ? MAX_MINIMIZED_TEXT_LENGTH : undefined}
        />
      );
      break;
    case 'AttributeRichText':
      dataElement = (
        <RichText
          html={attribute.value}
          maxLength={isMinimized ? MAX_MINIMIZED_TEXT_LENGTH : undefined}
        />
      );
      break;
    case 'AttributeNumericValue':
      const formattedValue = attribute.numericValue?.toLocaleString(locale);

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
    <AttributeContainer $fontSize={fontSize} $noMargins={notitle}>
      {!notitle && (
        <h3>
          {type.name}
          {type.helpText && <PopoverTip content={type.helpText} identifier={type.id} />}
        </h3>
      )}
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
