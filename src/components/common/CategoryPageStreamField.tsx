import React from 'react';

import { useTheme } from '@emotion/react';
import * as Sentry from '@sentry/nextjs';
import { Col, type ColProps, Container, Row } from 'reactstrap';

import type { CategoryPage } from '@/app/root/[domain]/[lang]/[plan]/(with-layout-elements)/[...slug]/ContentPage';
import ActionAttribute from '@/components/common/ActionAttribute';
import { attributeHasValue } from '@/components/common/AttributesBlock';
import StreamField from '@/components/common/StreamField';
import ActionStatusGraphsBlock from '@/components/contentblocks/ActionStatusGraphsBlock';
import CategoryListBlock from '@/components/contentblocks/CategoryListBlock';
import ExpandableFeedbackFormBlock from '@/components/contentblocks/ExpandableFeedbackFormBlock';
import PlanDatasetsBlock from '@/components/contentblocks/PlanDatasetsBlock';
import { ChartType } from '@/components/dashboard/ActionStatusGraphs';
import { usePlan } from '@/context/plan';

import ChangeHistory from './ChangeHistory';

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

type CategoryPageLayout = NonNullable<CategoryPage['layout']>;

export type CategoryPageMainTopBlock = NonNullable<CategoryPageLayout['layoutMainTop']>[number];
export type CategoryPageMainBottomBlock = NonNullable<
  CategoryPageLayout['layoutMainBottom']
>[number];

interface Props {
  page: CategoryPage;
  context?: 'hero' | 'main' | 'aside';
  /** Passed down to reactstrap Col components */
  columnProps?: ColProps;
  block: OmitFields<CategoryPageMainTopBlock> | OmitFields<CategoryPageMainBottomBlock>;
}

const findAttributeByType = (attributeTypeIdentifier: string, page: CategoryPage) =>
  page.category?.attributes?.find(
    (attribute) => attribute.type.identifier === attributeTypeIdentifier
  );

export const checkAttributeHasValueByType = (
  attributeTypeIdentifier: string,
  page: CategoryPage
) => {
  const attribute = findAttributeByType(attributeTypeIdentifier, page);

  return attribute && attributeHasValue(attribute);
};

export default function CategoryPageStreamField({
  block,
  page,
  context = 'main',
  columnProps: customColumnProps,
}: Props) {
  const theme = useTheme();
  const plan = usePlan();
  const columnProps = {};
  switch (block.__typename) {
    case 'CategoryPageAttributeTypeBlock': {
      const withContainer = context === 'main';
      const attribute = findAttributeByType(block.attributeType.identifier, page);

      if (attribute && attributeHasValue(attribute)) {
        return (
          <Wrapper withContainer={withContainer}>
            <Col {...(withContainer ? columnProps : { md: 6 })} {...customColumnProps}>
              <ActionAttribute attribute={attribute} attributeType={undefined} />
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
              emailVisible={block.emailVisible ?? undefined}
              emailRequired={block.emailRequired ?? undefined}
              feedbackVisible={block.feedbackVisible ?? undefined}
              feedbackRequired={block.feedbackRequired ?? undefined}
              categoryId={page.category?.id || undefined}
              fields={block.fields ?? []}
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
              withContainer={context === 'main'}
            />
          </Col>
        </Wrapper>
      );
    }

    case 'CategoryPageBodyBlock': {
      if (!page.body) {
        return null;
      }
      return <StreamField page={page} blocks={page.body} columnProps={columnProps} />;
    }

    case 'CategoryPageCategoryListBlock': {
      const childCategories = page.category?.children ?? [];
      const fallbackImage = page.category?.image || plan.image;
      const color = page.category?.color || page.category?.parent?.color || theme.brandLight;

      if (childCategories.length) {
        return (
          <CategoryListBlock
            fallbackImage={fallbackImage || undefined}
            categories={childCategories}
          />
        );
      }

      return null;
    }

    case 'CategoryTypeDatasetsBlock': {
      const { heading, helpText, datasetSchema } = block;
      const dataset =
        page.category?.datasets && datasetSchema?.uuid
          ? page.category.datasets.find((set) => set?.schema?.uuid === datasetSchema.uuid)
          : undefined;
      if (!dataset || !dataset.schema) return null;
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

    case 'ChangeLogMessageBlock': {
      if (!plan.features.enableChangeLog || !page.category?.id || !page.category?.changeLogMessage)
        return null;

      const withContainer = context === 'main';

      return (
        <Wrapper withContainer={withContainer}>
          <Col xs={12} {...customColumnProps}>
            <ChangeHistory
              entityType="page"
              entityId={String(page.category.id)}
              entry={page.category.changeLogMessage}
            />
          </Col>
        </Wrapper>
      );
    }

    default:
      Sentry.captureMessage(`Unknown block type: ${(block as { __typename: string }).__typename}`, {
        extra: {
          block,
        },
      });
      return null;
  }
}
