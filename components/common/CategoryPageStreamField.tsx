import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { usePlan } from 'context/plan';
import CategoryMetaBar from 'components/actions/CategoryMetaBar';
import { attributeHasValue } from 'components/common/AttributesBlock';
import { useTheme } from 'common/theme';
import {
  CategoryPageMainBottomBlock,
  CategoryPageMainTopBlock,
  GetPlanPageGeneralQuery,
} from 'common/__generated__/graphql';
import ActionAttribute from 'components/common/ActionAttribute';
import CategoryListBlock from 'components/contentblocks/CategoryListBlock';
import ExpandableFeedbackFormBlock from 'components/contentblocks/ExpandableFeedbackFormBlock';
import StreamField from 'components/common/StreamField';

export type CategoryPage = { __typename: 'CategoryPage' } & NonNullable<
  GetPlanPageGeneralQuery['planPage']
>;

type OmitUnion<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

type OmitFields<T> = OmitUnion<
  T,
  'blockType' | 'field' | 'rawValue' | 'blocks'
>;

interface WrapperProps {
  children: React.ReactNode;
  withContainer: boolean;
}

const Wrapper = ({ children, withContainer }: WrapperProps) =>
  withContainer ? (
    <Container>
      <Row>{children}</Row>
    </Container>
  ) : (
    <>{children}</>
  );

const DEFAULT_COL_PROPS = {
  xl: { size: 6, offset: 3 },
  lg: { size: 8, offset: 2 },
  md: { size: 10, offset: 1 },
  className: 'my-4',
};

interface Props {
  page: CategoryPage;
  context?: 'hero' | 'main' | 'aside';
  block:
    | OmitFields<CategoryPageMainTopBlock>
    | OmitFields<CategoryPageMainBottomBlock>;
}

export const CategoryPageStreamField = ({
  block,
  page,
  context = 'main',
}: Props) => {
  const theme = useTheme();
  const plan = usePlan();

  switch (block.__typename) {
    case 'CategoryPageAttributeTypeBlock': {
      const withContainer = context === 'main';
      const attribute = page.category?.attributes?.find(
        (attribute) =>
          attribute.type.identifier === block.attributeType.identifier
      );

      if (attribute && attributeHasValue(attribute)) {
        return (
          <Wrapper withContainer={withContainer}>
            <Col {...(withContainer ? DEFAULT_COL_PROPS : { md: 6 })}>
              <ActionAttribute
                attribute={attribute}
                attributeType={undefined}
              />
            </Col>
          </Wrapper>
        );
      }

      return null;
    }

    case 'CategoryPageContactFormBlock': {
      return (
        <Wrapper withContainer>
          <Col {...DEFAULT_COL_PROPS}>
            <ExpandableFeedbackFormBlock
              heading={block.heading || undefined}
              description={block.description || undefined}
            />
          </Col>
        </Wrapper>
      );
    }

    case 'CategoryPageProgressBlock': {
      if (!page.category?.id) {
        return null;
      }

      return (
        <Wrapper withContainer={context === 'main'}>
          <Col xs={12}>
            <CategoryMetaBar category={page.category.id} />
          </Col>
        </Wrapper>
      );
    }

    case 'CategoryPageBodyBlock': {
      const color =
        page.category?.color ||
        page.category?.parent?.color ||
        theme.brandLight;

      return <StreamField page={page} blocks={page.body} color={color} />;
    }

    case 'CategoryPageCategoryListBlock': {
      const childCategories = page.category?.children ?? [];
      const fallbackImage = page.category?.image || plan.image;
      const color =
        page.category?.color ||
        page.category?.parent?.color ||
        theme.brandLight;

      if (childCategories.length) {
        return (
          <CategoryListBlock
            fallbackImage={fallbackImage || undefined}
            categories={childCategories}
            color={color}
          />
        );
      }

      return null;
    }

    default:
      return null;
  }
};

export default CategoryPageStreamField;
