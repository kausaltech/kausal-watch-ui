import React from 'react';
import { Container, Row, Col, ColProps } from 'reactstrap';
import { usePlan } from 'context/plan';
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
import ActionStatusGraphsBlock from 'components/contentblocks/ActionStatusGraphsBlock';
import { ChartType } from 'components/dashboard/ActionStatusGraphs';

export type CategoryPage = { __typename: 'CategoryPage' } & NonNullable<
  GetPlanPageGeneralQuery['planPage']
>;

type OmitUnion<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

type OmitFields<T> = OmitUnion<T, 'blockType' | 'field' | 'rawValue'>;

interface WrapperProps {
  children: React.ReactNode;
  withContainer?: boolean;
}

const Wrapper = ({ children, withContainer = true }: WrapperProps) =>
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

const TIGHT_COL_PROPS = {
  xl: { size: 12 },
  lg: { size: 12 },
  md: { size: 12 },
  className: 'my-4',
};

interface Props {
  page: CategoryPage;
  context?: 'hero' | 'main' | 'aside';
  /** Passed down to reactstrap Col components */
  columnProps?: ColProps;
  hasAsideColumn?: boolean;
  block:
    | OmitFields<CategoryPageMainTopBlock>
    | OmitFields<CategoryPageMainBottomBlock>;
}

const findAttributeByType = (attributeTypeIdentifier: string, page) =>
  page.category?.attributes?.find(
    (attribute) => attribute.type.identifier === attributeTypeIdentifier
  );

export const checkAttributeHasValueByType = (
  attributeTypeIdentifier: string,
  page
) => {
  const attribute = findAttributeByType(attributeTypeIdentifier, page);

  return attribute && attributeHasValue(attribute);
};

export const CategoryPageStreamField = ({
  block,
  page,
  context = 'main',
  columnProps: customColumnProps,
  hasAsideColumn = false,
}: Props) => {
  const theme = useTheme();
  const plan = usePlan();
  const columnProps =
    context === 'main' && hasAsideColumn ? TIGHT_COL_PROPS : DEFAULT_COL_PROPS;

  switch (block.__typename) {
    case 'CategoryPageAttributeTypeBlock': {
      const withContainer = context === 'main';
      const attribute = findAttributeByType(
        block.attributeType.identifier,
        page
      );

      if (attribute && attributeHasValue(attribute)) {
        return (
          <Wrapper withContainer={withContainer}>
            <Col
              {...(withContainer ? columnProps : { md: 6 })}
              {...customColumnProps}
            >
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
        <Wrapper>
          <Col {...columnProps} {...customColumnProps}>
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

      // The editor specifies whether to visualise action progress by implementation phase or status
      const progressDataset = block.blocks[0].value || 'implementation_phase';

      return (
        <Wrapper withContainer={context === 'main'}>
          <Col xs={12} {...customColumnProps}>
            <ActionStatusGraphsBlock
              categoryId={page.category.id}
              chart={ChartType.BAR}
              shownDatasets={{
                progress: progressDataset !== 'implementation_phase', // TODO get proper types
                phase: progressDataset === 'implementation_phase',
              }}
              columnProps={{ md: 12, lg: 12, xl: 12 }}
            />
          </Col>
        </Wrapper>
      );
    }

    case 'CategoryPageBodyBlock': {
      const color =
        page.category?.color ||
        page.category?.parent?.color ||
        theme.brandLight;

      return (
        <StreamField
          page={page}
          blocks={page.body}
          color={color}
          hasSidebar={hasAsideColumn}
          columnProps={columnProps}
        />
      );
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
