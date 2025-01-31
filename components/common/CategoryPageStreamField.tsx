import React from 'react';
import { Container, Row, Col, ColProps } from 'reactstrap';
import { usePlan } from 'context/plan';
import { attributeHasValue } from 'components/common/AttributesBlock';
import { useTheme } from 'styled-components';
import {
  CategoryPageMainBottomBlock,
  CategoryPageMainTopBlock,
  CategoryPage,
} from 'common/__generated__/graphql';
import ActionAttribute from 'components/common/ActionAttribute';
import CategoryListBlock from 'components/contentblocks/CategoryListBlock';
import ExpandableFeedbackFormBlock from 'components/contentblocks/ExpandableFeedbackFormBlock';
import StreamField from 'components/common/StreamField';
import ActionStatusGraphsBlock from 'components/contentblocks/ActionStatusGraphsBlock';
import PlanDatasetsBlock from 'components/contentblocks/PlanDatasetsBlock';
import { ChartType } from 'components/dashboard/ActionStatusGraphs';

type OmitUnion<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

type OmitFields<T> = OmitUnion<T, 'blockType' | 'field' | 'rawValue'>;

enum ProgressBasis {
  PHASE = 'implementation_phase',
  STATUS = 'status',
}

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
  console.log(block.id);
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
              emailVisible={block.emailVisible}
              emailRequired={block.emailRequired}
              feedbackVisible={block.feedbackVisible}
              feedbackRequired={block.feedbackRequired}
              categoryId={page.category?.id || undefined}
              fields={block.fields || undefined}
              id={block.id}
              pageId={page.id}
            />
          </Col>
        </Wrapper>
      );
    }

    case 'CategoryPageProgressBlock': {
      if (!page.category?.id) {
        return null;
      }

      /**
       * CategoryPageProgressBlock contains a single dropdown allowing allows the editor to
       * specify whether to visualise action progress by implementation phase or status.
       */
      const progressBasis = block.blocks[0]?.value || ProgressBasis.PHASE;

      return (
        <Wrapper withContainer={context === 'main'}>
          <Col xs={12} {...customColumnProps}>
            <ActionStatusGraphsBlock
              categoryId={page.category.id}
              chart={ChartType.BAR}
              shownDatasets={{
                progress: progressBasis === ProgressBasis.STATUS,
                phase: progressBasis === ProgressBasis.PHASE,
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

    case 'CategoryTypeDatasetsBlock': {
      const { heading, helpText, datasetSchema } = block;
      const dataset =
        page.category?.datasets && datasetSchema?.uuid
          ? page.category.datasets.find(
              (set) => set?.schema.uuid === datasetSchema.uuid
            )
          : undefined;
      if (!dataset) return null;
      return (
        <Wrapper>
          <Col {...columnProps} {...customColumnProps}>
            <PlanDatasetsBlock
              heading={heading}
              helpText={helpText}
              data={dataset.dataPoints}
              schema={dataset.schema}
            />
          </Col>
        </Wrapper>
      );
    }

    default:
      return null;
  }
};

export default CategoryPageStreamField;
