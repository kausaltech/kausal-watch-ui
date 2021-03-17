import React, { useContext } from 'react';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { gql } from '@apollo/client';
import PlanContext from 'context/plan';
import images, { getBgImageAlignment } from 'common/images';
import RichText from 'components/common/RichText';
import QuestionAnswerBlock from 'components/contentblocks/QuestionAnswerBlock';
import ActionListBlock from 'components/contentblocks/ActionListBlock';
import CategoryListBlock from 'components/contentblocks/CategoryListBlock';
import IndicatorGroupBlock from 'components/contentblocks/IndicatorGroupBlock';
import FrontPageHeroBlock from 'components/contentblocks/FrontPageHeroBlock';
import IndicatorShowcaseBlock from 'components/contentblocks/IndicatorShowcaseBlock';
import CardListBlock from 'components/contentblocks/CardListBlock';
import ActionHighlightsBlock from 'components/contentblocks/ActionHighlightsBlock';
import IndicatorHighlightsBlock from 'components/contentblocks/IndicatorHighlightsBlock';

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
      id
      blockType
      rawValue
      items {
        ... on IndicatorBlock {
          id
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
    }
    ... on FrontPageHeroBlock {
      id
      layout
      image {
        ...MultiUseImageFragment
      }
      heading
      lead
    }
    ... on IndicatorShowcaseBlock {
      id
      blockType
      field
      rawValue
      blocks {
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
          date
          value
        }
        values {
          date
          value
        }
        goals {
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
      id
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
    ... on ActionHighlightsBlock {
      field
    }
    ... on IndicatorHighlightsBlock {
      field
    }
  }
${images.fragments.multiUseImage}
`;

export const possibleTypes = {
  StreamFieldInterface: [
    'CharBlock',
    'TextBlock',
    'RichTextBlock',
    'ChoiceBlock',
    'QuestionAnswerBlock',
    'IndicatorBlock',
    'ActionListBlock',
    'CategoryListBlock',
    'IndicatorShowcaseBlock',
    'FrontPageHeroBlock',
    'IndicatorGroupBlock',
    'CardListBlock',
  ],
};

const ContentMarkup = styled.div`
  padding: ${(props) => props.theme.spaces.s300} 0;
`;

function StreamFieldBlock(props) {
  const { __typename, page } = props;
  const plan = useContext(PlanContext);

  switch (__typename) {
    case 'RichTextBlock': {
      const { value } = props;
      return (
        <Container>
          <Row>
            <Col lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }} className="py-5">
              <RichText html={value} />
            </Col>
          </Row>
        </Container>
      );
    }
    case 'QuestionAnswerBlock': {
      const { heading, questions } = props;
      return <QuestionAnswerBlock heading={heading} questions={questions} />;
    }
    case 'CharBlock': {
      const { value } = props;
      return <Container><Row><Col><div>{value}</div></Col></Row></Container>;
    }
    case 'IndicatorGroupBlock': {
      const { items } = props;
      return <IndicatorGroupBlock indicators={items} />;
    }
    case 'ActionListBlock': {
      const { categoryFilter, color } = props;
      return <ActionListBlock categoryId={categoryFilter?.id || page.category.id} color={color} />;
    }
    case 'CategoryListBlock': {
      const { color, heading, lead } = props;
      const { category } = page;
      const fallbackImage = (category?.image || plan.image);
      return (
        <CategoryListBlock
          categories={category.children}
          color={color}
          fallbackImage={fallbackImage}
          heading={heading}
          lead={lead}
        />
      );
    }
    case 'FrontPageHeroBlock': {
      const {
        layout, image, heading, lead
      } = props;
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
      const { indicator, title, body } = props;
      return <IndicatorShowcaseBlock indicator={indicator} title={title} body={body} />;
    }
    case 'CardListBlock': {
      const { cards, lead, heading } = props;
      return <CardListBlock cards={cards} lead={lead} heading={heading} />;
    }
    case 'ActionHighlightsBlock': {
      return <ActionHighlightsBlock />;
    }
    case 'IndicatorHighlightsBlock': {
      return <IndicatorHighlightsBlock />;
    }
    default:
      return (
        <div>
          Component for
          { __typename }
          does not exist
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
          {...block}
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
