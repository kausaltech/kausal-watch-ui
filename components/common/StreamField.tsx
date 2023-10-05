import React, { useContext } from 'react';
import { Container, Row, Col, ColProps } from 'reactstrap';
import { gql } from '@apollo/client';
import PlanContext from 'context/plan';
import images, { getBgImageAlignment } from 'common/images';
import RichText from 'components/common/RichText';
import QuestionAnswerBlock from 'components/contentblocks/QuestionAnswerBlock';
import ActionListBlock from 'components/contentblocks/ActionListBlock';
import CategoryListBlock from 'components/contentblocks/CategoryListBlock';
import CategoryTreeBlock from 'components/contentblocks/CategoryTreeBlock';
import IndicatorGroupBlock from 'components/contentblocks/IndicatorGroupBlock';
import FrontPageHeroBlock from 'components/contentblocks/FrontPageHeroBlock';
import IndicatorShowcaseBlock from 'components/contentblocks/IndicatorShowcaseBlock';
import CardListBlock from 'components/contentblocks/CardListBlock';
import ActionHighlightsBlock from 'components/contentblocks/ActionHighlightsBlock';
import ActionStatusGraphsBlock from 'components/contentblocks/ActionStatusGraphsBlock';
import IndicatorHighlightsBlock from 'components/contentblocks/IndicatorHighlightsBlock';
import RelatedIndicatorsBlock from 'components/contentblocks/RelatedIndicatorsBlock';
import RelatedPlanListBlock from 'components/contentblocks/RelatedPlanListBlock';
import ActionCategoryFilterCardsBlock from 'components/contentblocks/ActionCategoryFilterCardsBlock';
import AccessibilityStatementComplianceStatusBlock from 'components/contentblocks/AccessibilityStatementComplianceStatusBlock';
import AccessibilityStatementPreparationInformationBlock from 'components/contentblocks/AccessibilityStatementPreparationInformationBlock';
import AccessibilityStatementContactFormBlock from 'components/contentblocks/AccessibilityStatementContactFormBlock';
import AccessibilityStatementContactInformationBlock from 'components/contentblocks/AccessibilityStatementContactInformationBlock';

import type { StreamFieldFragmentFragment } from 'common/__generated__/graphql';
import CartographyVisualisationBlock from 'components/contentblocks/CartographyVisualisationBlock';
import { useTheme } from 'common/theme';
import styled from 'styled-components';

const STREAM_FIELD_FRAGMENT = gql`
  fragment StreamFieldFragment on StreamFieldInterface {
    id
    blockType
    field
    ... on CharBlock {
      value
    }
    ... on TextBlock {
      value
    }
    ... on RichTextBlock {
      value
    }
    ... on ChoiceBlock {
      value
      choices {
        key
        value
      }
    }
    ... on QuestionAnswerBlock {
      heading
      questions {
        ... on QuestionBlock {
          question
          answer
        }
      }
    }
    ... on IndicatorBlock {
      style
      indicator {
        id
      }
    }
    ... on IndicatorGroupBlock {
      items {
        id
        ... on IndicatorBlock {
          style
          indicator {
            id
            identifier
            name
            unit {
              id
              name
            }
            description
            timeResolution
            latestValue {
              id
              date
              value
            }
            goals {
              id
              date
              value
            }
            level(plan: $plan)
          }
        }
      }
    }
    ... on ActionListBlock {
      categoryFilter {
        id
      }
    }
    ... on AdaptiveEmbedBlock {
      embed {
        html
      }
    }
    ... on CartographyVisualisationBlock {
      style
      styleOverrides
      account {
        provider
        account
        publicAccessToken
      }
    }
    ... on CategoryListBlock {
      style
      heading
      lead
      categoryType {
        id
        hideCategoryIdentifiers
        categories {
          ...CategoryListCategory
        }
      }
      category {
        id
        children {
          ...CategoryListCategory
        }
      }
    }
    ... on FrontPageHeroBlock {
      layout
      image {
        ...MultiUseImageFragment
      }
      heading
      lead
    }
    ... on IndicatorShowcaseBlock {
      blocks {
        id
        __typename
      }
      title
      body
      indicator {
        id
        identifier
        name
        unit {
          id
          shortName
        }
        minValue
        maxValue
        latestValue {
          id
          date
          value
        }
        values {
          id
          date
          value
          normalizedValues {
            normalizerId
            value
          }
          categories {
            id
          }
        }
        goals {
          id
          date
          value
          normalizedValues {
            normalizerId
            value
          }
        }
        common {
          id
          normalizations {
            unit {
              shortName
            }
            normalizer {
              name
              id
              identifier
            }
          }
        }
      }
      linkButton {
        blockType
        ... on PageLinkBlock {
          text
          page {
            url
            urlPath
            slug
          }
        }
      }
    }
    ... on CardListBlock {
      heading
      lead
      cards {
        ... on CardBlock {
          image {
            ...MultiUseImageFragment
          }
          heading
          content
          link
        }
      }
    }
    ... on ActionCategoryFilterCardsBlock {
      cards {
        ... on ActionCategoryFilterCardBlock {
          heading
          lead
          category {
            id
            type {
              identifier
            }
          }
        }
      }
    }
    ... on CategoryTreeMapBlock {
      heading
      lead
      valueAttribute {
        identifier
        unit {
          shortName
        }
      }
      categoryType {
        identifier
      }
    }
    ... on AccessibilityStatementComplianceStatusBlock {
      id
      blockType
      field
    }
    ... on AccessibilityStatementPreparationInformationBlock {
      id
      blockType
      field
    }
    ... on AccessibilityStatementContactInformationBlock {
      id
      blockType
      field
      blocks {
        id
        field
        ... on CharBlock {
          value
        }
      }
    }
  }
  ${images.fragments.multiUseImage}
  ${CategoryListBlock.fragments.category}
`;

enum EmbedProvider {
  YOUTUBE = 'YouTube',
  PLOTLY = 'Plotly Chart Studio',
}

const ResponsiveStyles = styled.div`
  .responsive-object {
    width: 100%;
    text-align: center;
  }

  .responsive-object iframe,
  .responsive-object object,
  .responsive-object embed {
    width: 100%;
    height: 100%;
  }

  .responsive-object[data-embed-provider='${EmbedProvider.YOUTUBE}'] {
    &.responsive-object-small {
      iframe {
        aspect-ratio: 16 / 9;
        max-width: 300px;
      }
    }
    &.responsive-object-medium {
      iframe {
        aspect-ratio: 16 / 9;
        max-width: 480px;
      }
    }
    &.responsive-object-large {
      iframe {
        aspect-ratio: 16 / 9;
        max-width: 960px;
      }
    }
  }

  .responsive-object[data-embed-provider='${EmbedProvider.PLOTLY}'] {
    &.responsive-object-small {
      iframe {
        height: 400px;
      }
    }
    &.responsive-object-medium {
      iframe {
        height: 600px;
      }
    }
    &.responsive-object-large {
      iframe {
        height: 800px;
      }
    }
  }
`;

type StreamFieldBlockProps = {
  id: string;
  page: any;
  block: StreamFieldFragmentFragment;
  color: string;
  hasSidebar: boolean;
  columnProps?: ColProps;
};

function StreamFieldBlock(props: StreamFieldBlockProps) {
  const { id, page, block, color, hasSidebar, columnProps } = props;
  const { __typename } = block;
  const plan = useContext(PlanContext);
  const theme = useTheme();

  switch (__typename) {
    case 'RichTextBlock': {
      const { value } = block;
      const COLLAPSIBLE_BREAKPOINT = 1200;
      const isCollapsible =
        page.__typename === 'CategoryPage' &&
        value.length > COLLAPSIBLE_BREAKPOINT;
      return (
        <Container id={id}>
          <Row>
            <Col
              xl={{ size: hasSidebar ? 7 : 6, offset: hasSidebar ? 4 : 3 }}
              lg={{ size: 8, offset: hasSidebar ? 4 : 2 }}
              md={{ size: 10, offset: 1 }}
              className="my-4"
              {...columnProps}
            >
              <RichText html={value} isCollapsible={isCollapsible} />
            </Col>
          </Row>
        </Container>
      );
    }
    case 'QuestionAnswerBlock': {
      const { heading, questions } = block;

      return (
        <QuestionAnswerBlock
          id={id}
          alignWithContent={
            page.__typename === 'CategoryPage' &&
            theme.settings.leftAlignCategoryPages
          }
          heading={heading}
          questions={questions}
          hasSidebar={hasSidebar}
          columnProps={columnProps}
        />
      );
    }
    case 'CharBlock': {
      const { value } = block;
      return (
        <Container id={id}>
          <Row>
            <Col {...columnProps}>
              <div>{value}</div>
            </Col>
          </Row>
        </Container>
      );
    }
    case 'IndicatorGroupBlock': {
      const { items } = block;
      return <IndicatorGroupBlock indicators={items} />;
    }
    case 'ActionListBlock': {
      const { categoryFilter } = block;
      return (
        <ActionListBlock
          categoryId={categoryFilter?.id || page.category.id}
          color={color}
        />
      );
    }
    case 'CategoryListBlock': {
      const { heading, lead, categoryType, category } = block;
      const { category: pageCategory } = page;
      let categories;

      /* If the block specifies a category type, use cats from there.
       * Otherwise, fall back on the containing page's sub-categories.
       * If even that doesn't work, use plan's main categories.
       */
      if (category) {
        categories = category.children;
      } else if (categoryType) {
        categories = categoryType.categories.filter(
          (cat) => cat.parent == null
        );
      } else if (pageCategory) {
        categories = pageCategory.children;
      }
      const fallbackImage = pageCategory?.image || plan.image;
      return (
        <CategoryListBlock
          id={id}
          categories={categories}
          color={color}
          fallbackImage={fallbackImage}
          heading={heading ?? undefined}
          lead={lead}
        />
      );
    }
    case 'FrontPageHeroBlock': {
      const { layout, image, heading, lead } = block;
      return (
        <FrontPageHeroBlock
          id={id}
          layout={layout}
          image={image}
          imageAlign={getBgImageAlignment(image)}
          heading={heading}
          lead={lead}
          altText={image?.altText}
          imageCredit={image?.imageCredit}
        />
      );
    }
    case 'IndicatorShowcaseBlock': {
      const { indicator, title, body } = block;
      return (
        <IndicatorShowcaseBlock
          id={id}
          indicator={indicator}
          title={title}
          body={body}
        />
      );
    }
    case 'CardListBlock': {
      const { cards, lead, heading } = block;
      return (
        <CardListBlock
          id={id}
          cards={cards}
          lead={lead}
          heading={heading}
          style="negative"
        />
      );
    }
    case 'ActionHighlightsBlock': {
      return <ActionHighlightsBlock id={id} />;
    }
    case 'ActionStatusGraphsBlock': {
      return <ActionStatusGraphsBlock id={id} />;
    }
    case 'IndicatorHighlightsBlock': {
      return <IndicatorHighlightsBlock id={id} />;
    }
    case 'RelatedIndicatorsBlock': {
      return (
        <RelatedIndicatorsBlock
          id={id}
          indicators={page?.category?.indicators}
        />
      );
    }
    case 'RelatedPlanListBlock': {
      return <RelatedPlanListBlock id={id} />;
    }
    case 'ActionCategoryFilterCardsBlock': {
      const { cards } = block;
      return <ActionCategoryFilterCardsBlock id={id} cards={cards} />;
    }
    case 'CategoryTreeMapBlock': {
      return <CategoryTreeBlock {...block} id={id} hasSidebar={hasSidebar} />;
    }
    case 'AdaptiveEmbedBlock': {
      return (
        <Container id={id}>
          <Row>
            <Col
              xl={{ size: hasSidebar ? 7 : 6, offset: hasSidebar ? 4 : 3 }}
              lg={{ size: 8, offset: hasSidebar ? 4 : 2 }}
              md={{ size: 10, offset: 1 }}
              className="my-4"
              {...columnProps}
            >
              <ResponsiveStyles
                dangerouslySetInnerHTML={{ __html: block.embed.html }}
              ></ResponsiveStyles>
            </Col>
          </Row>
        </Container>
      );
    }
    case 'CartographyVisualisationBlock': {
      const { account, style, styleOverrides } = block;
      const accessToken = account?.publicAccessToken;
      return (
        <CartographyVisualisationBlock
          id={id}
          styleUrl={style}
          accessToken={accessToken}
          styleOverrides={styleOverrides}
          hasSidebar={hasSidebar}
        />
      );
    }
    case 'AccessibilityStatementComplianceStatusBlock': {
      return <AccessibilityStatementComplianceStatusBlock {...block} id={id} />;
    }
    case 'AccessibilityStatementContactFormBlock': {
      return <AccessibilityStatementContactFormBlock {...block} id={id} />;
    }
    case 'AccessibilityStatementContactInformationBlock': {
      const { blocks } = block;
      return (
        <AccessibilityStatementContactInformationBlock
          id={id}
          content={blocks}
        />
      );
    }
    case 'AccessibilityStatementPreparationInformationBlock': {
      return (
        <AccessibilityStatementPreparationInformationBlock {...block} id={id} />
      );
    }
    default:
      return <div id={id}>{`Component for ${__typename} does not exist`}</div>;
  }
}

interface StreamFieldProps {
  color: string;
  page: any;
  blocks: any;
  hasSidebar?: boolean;
  columnProps?: ColProps;
}

function StreamField(props: StreamFieldProps) {
  const { page, blocks, color, hasSidebar = false, columnProps } = props;

  return (
    <>
      {blocks.map((block, index) => (
        <StreamFieldBlock
          id={`section-${index + 1}`}
          block={block}
          page={page}
          key={block.id}
          color={color}
          hasSidebar={hasSidebar}
          columnProps={columnProps}
        />
      ))}
    </>
  );
}

StreamField.fragments = {
  streamField: STREAM_FIELD_FRAGMENT,
};

export default StreamField;
