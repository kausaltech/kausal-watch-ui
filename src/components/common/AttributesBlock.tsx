import { type PropsWithChildren } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Col, Row } from 'reactstrap';

import type {
  AttributesBlockAttributeFragment,
  AttributesBlockAttributeTypeFragment,
  AttributesBlockAttributeWithNestedTypeFragment,
} from '@/common/__generated__/graphql';

import RestrictedBlockWrapper from '../actions/blocks/RestrictedBlockWrapper';
import ActionAttribute from './ActionAttribute';

type AttributeProps = {
  $vertical?: boolean;
};

export const Attributes = styled.div<AttributeProps>`
  ${(props) =>
    props.$vertical &&
    css`
      max-width: ${props.theme.breakpointSm};
    `}
  margin: ${(props) => props.theme.spaces.s100} auto;
  padding: ${(props) => props.theme.spaces.s200} 0 0;
  border-top: 1px solid ${(props) => props.theme.graphColors.grey030};
  border-bottom: 1px solid ${(props) => props.theme.graphColors.grey030};
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

type Attribute = AttributesBlockAttributeFragment | AttributesBlockAttributeWithNestedTypeFragment;

export function attributeHasValue(attribute: Attribute) {
  const { __typename } = attribute;

  if (__typename === 'AttributeChoice') {
    return !!(attribute.choice || attribute.text);
  } else if (__typename === 'AttributeText' || __typename === 'AttributeRichText') {
    return !!attribute.value;
  } else if (__typename === 'AttributeCategoryChoice') {
    return !!attribute.categories.length;
  }
  return true;
}

type AttributeContentProps = {
  attribute: AttributesBlockAttributeFragment;
  attributeType: AttributesBlockAttributeTypeFragment;
};

type AttributeContentNestedTypeProps = {
  attribute: AttributesBlockAttributeWithNestedTypeFragment;
  attributeType: null | undefined;
};

type AttributesBlockProps = PropsWithChildren<{
  vertical?: boolean;
  attributes?: Attribute[];
  types?: AttributeContentProps['attributeType'][];
}>;

function AttributesBlock(props: AttributesBlockProps) {
  const {
    attributes,
    children, // extra children that can be passed by nesting in the JSX tag
    types,
    vertical,
  } = props;

  if (!attributes) {
    if (children) {
      return (
        <Attributes $vertical={vertical ?? false}>
          <AttributesList tag="ul">{children}</AttributesList>
        </Attributes>
      );
    }
    return null;
  }

  let typesById: Map<string, AttributeContentProps['attributeType']> | null;

  if (types) {
    typesById = new Map(types.map((type) => [type.id, type]));
  }

  const attributesWithValue = attributes.filter(attributeHasValue);

  return (
    <Attributes $vertical={vertical ?? false}>
      <AttributesList tag="ul">
        {attributesWithValue.map((item: (typeof attributes)[0]) => {
          const attributeType = typesById?.get(item.type.id);
          const typeMeta = attributeType as
            | (typeof attributeType & { meta?: { restricted?: boolean; hidden?: boolean } })
            | undefined;
          return (
            <RestrictedBlockWrapper
              key={item.id}
              isRestricted={typeMeta?.meta?.restricted ?? false}
              isHidden={typeMeta?.meta?.hidden ?? false}
            >
              <AttributeItem tag="li" key={item.id} md={vertical ? 12 : 6}>
                {attributeType ? (
                  <ActionAttribute
                    key={item.id}
                    attribute={item as AttributesBlockAttributeFragment}
                    attributeType={attributeType}
                  />
                ) : (
                  <ActionAttribute
                    key={item.id}
                    attribute={item as AttributesBlockAttributeWithNestedTypeFragment}
                    attributeType={undefined}
                  />
                )}
              </AttributeItem>
            </RestrictedBlockWrapper>
          );
        })}
      </AttributesList>
      {children}
    </Attributes>
  );
}

export default AttributesBlock;
