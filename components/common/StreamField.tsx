import React, { useContext } from 'react';
import { Container, Row, Col } from 'reactstrap';
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
import IndicatorHighlightsBlock from 'components/contentblocks/IndicatorHighlightsBlock';
import RelatedIndicatorsBlock from 'components/contentblocks/RelatedIndicatorsBlock';
import RelatedPlanListBlock from 'components/contentblocks/RelatedPlanListBlock';
import ActionCategoryFilterCardsBlock from 'components/contentblocks/ActionCategoryFilterCardsBlock';

import type { StreamFieldFragmentFragment } from 'common/__generated__/graphql';


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
    ...on QuestionAnswerBlock {
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
    ... on CategoryListBlock {
      style
      heading
      lead
      categoryType {
        categories {
          id
          name
          parent {
            id
          }
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
        }
        goals {
          id
          date
          value
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
    ...on CategoryTreeMapBlock {
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
  }
${images.fragments.multiUseImage}
`;

type StreamFieldBlockProps = {
  page: any,
  block: StreamFieldFragmentFragment,
  color?: string,
}

function StreamFieldBlock(props: StreamFieldBlockProps) {
  const { page, block, color } = props;
  const { __typename } = block;
  const plan = useContext(PlanContext);

  switch (__typename) {
    case 'RichTextBlock': {
      const { value } = block;
      return (
        <Container className="my-5">
          <Row>
            <Col lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }}>
              <RichText html={value} />
            </Col>
          </Row>
        </Container>
      );
    }
    case 'QuestionAnswerBlock': {
      const { heading, questions } = block;
      return <QuestionAnswerBlock heading={heading} questions={questions} />;
    }
    case 'CharBlock': {
      const { value } = block;
      return <Container><Row><Col><div>{value}</div></Col></Row></Container>;
    }
    case 'IndicatorGroupBlock': {
      const { items } = block;
      return <IndicatorGroupBlock indicators={items} />;
    }
    case 'ActionListBlock': {
      const { categoryFilter, } = block;
      return <ActionListBlock categoryId={categoryFilter?.id || page.category.id} color={color} />;
    }
    case 'CategoryListBlock': {
      const { heading, lead, style, categoryType } = block;
      const { category: pageCategory } = page;
      let categories;

      /* If the block specifies a category type, use cats from there.
       * Otherwise, fall back on the containing page's sub-categories.
       * If even that doesn't work, use plan's main categories.
       */
      if (categoryType) {
        categories = categoryType.categories.filter((cat) => cat.parent == null);
      } else if (pageCategory) {
        categories = pageCategory.children;
      }
      const fallbackImage = (pageCategory?.image || plan.image);
      return (
        <CategoryListBlock
          style={style}
          categories={categories}
          color={color}
          fallbackImage={fallbackImage}
          heading={heading}
          lead={lead}
        />
      );
    }
    case 'FrontPageHeroBlock': {
      const {
        layout, image, heading, lead,
      } = block;
      return (
        <FrontPageHeroBlock
          layout={layout}
          imageSrc={image.large.src}
          imageAlign={getBgImageAlignment(image)}
          heading={heading}
          lead={lead}
          actionsDescription={plan.generalContent.actionShortDescription}
          indicatorsDescription={plan.generalContent.indicatorShortDescription}
        />
      );
    }
    case 'IndicatorShowcaseBlock': {
      const { indicator, title, body } = block;
      return <IndicatorShowcaseBlock indicator={indicator} title={title} body={body} />;
    }
    case 'CardListBlock': {
      const { cards, lead, heading } = block;
      return <CardListBlock cards={cards} lead={lead} heading={heading} />;
    }
    case 'ActionHighlightsBlock': {
      return <ActionHighlightsBlock />;
    }
    case 'IndicatorHighlightsBlock': {
      return <IndicatorHighlightsBlock />;
    }
    case 'RelatedIndicatorsBlock': {
      return <RelatedIndicatorsBlock indicators={page?.category?.indicators} />;
    }
    case 'RelatedPlanListBlock': {
      return <RelatedPlanListBlock />;
    }
    case 'ActionCategoryFilterCardsBlock': {
      const { cards } = block;
      return <ActionCategoryFilterCardsBlock cards={cards} />;
    }
    case 'CategoryTreeMapBlock': {
      return <CategoryTreeBlock {...block} />
    }
    default:
      return (
        <div>
          { `Component for ${__typename} does not exist` }
        </div>
      );
  }
}

function StreamField(props) {
  const { page, blocks, color } = props;
  return (
    <>
      { blocks.map((block) => (
        <StreamFieldBlock
          block={block}
          page={page}
          key={block.id}
          color={color}
        />
      ))}
    </>
  );
}

StreamField.fragments = {
  streamField: STREAM_FIELD_FRAGMENT,
};

export default StreamField;
