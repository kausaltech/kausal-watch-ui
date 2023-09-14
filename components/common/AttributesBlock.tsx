import React from 'react';
import styled, { css } from 'styled-components';
import { Row, Col } from 'reactstrap';
import { useTranslation } from 'common/i18n';
import { TFunction } from 'next-i18next';

import {
  AttributesBlockAttributeFragment,
  AttributesBlockAttributeTypeFragment,
  AttributesBlockAttributeWithNestedTypeFragment,
} from 'common/__generated__/graphql';
import ActionAttribute from './ActionAttribute';

type AttributeProps = {
  vertical: boolean;
};

const Attributes = styled.div<AttributeProps>`
  ${(props) =>
    props.vertical &&
    css`
      max-width: ${(props) => props.theme.breakpointSm};
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
`;

const AttributeItem = styled(Col)`
  display: block;
`;

type AttributeContentProps = {
  attribute: AttributesBlockAttributeFragment;
  attributeType: AttributesBlockAttributeTypeFragment;
  t: TFunction;
};

type AttributeContentNestedTypeProps = {
  attribute: AttributesBlockAttributeWithNestedTypeFragment;
  attributeType: null | undefined;
};

type AttributesBlockProps = {
  children?: any;
  vertical?: boolean;
} & (
  | {
      attributes: AttributeContentProps['attribute'][];
      types: AttributeContentProps['attributeType'][];
    }
  | {
      attributes: AttributeContentNestedTypeProps['attribute'][];
      types: undefined;
    }
);

function AttributesBlock(props: AttributesBlockProps) {
  const {
    attributes,
    children, // extra children that can be passed by nesting in the JSX tag
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
    } else if (
      __typename === 'AttributeText' ||
      __typename === 'AttributeRichText'
    ) {
      return !!attribute.value;
    } else if (__typename === 'AttributeCategoryChoice') {
      return !!attribute.categories.length;
    }
    return true;
  }
  const attributesWithValue = attributes.filter(attributeHasValue);

  return (
    <Attributes vertical={vertical ?? false}>
      <AttributesList vertical={vertical} tag="ul">
        {attributesWithValue.map((item: typeof attributes[0]) => {
          return (
            <AttributeItem tag="li" key={item.id} md={vertical ? 12 : 6}>
              {/* @ts-ignore */}
              <ActionAttribute
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

export default AttributesBlock;
