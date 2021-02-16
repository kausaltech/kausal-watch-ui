import React, { useContext } from 'react';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { gql } from '@apollo/client';
import PlanContext from 'context/plan';
import images, { getBgImageAlignment } from 'common/images';
import QuestionAnswerBlock from 'components/contentblocks/QuestionAnswerBlock';
import ActionListBlock from 'components/contentblocks/ActionListBlock';
import CategoryListBlock from 'components/contentblocks/CategoryListBlock';
import IndicatorBlock from 'components/contentblocks/IndicatorBlock';
import FrontPageHeroBlock from 'components/contentblocks/FrontPageHeroBlock';
import IndicatorShowcaseBlock from 'components/contentblocks/IndicatorShowcaseBlock';

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
    ... on ActionListBlock {
      categoryFilter {
        id
      }
    }
    ... on CategoryListBlock {
      style
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
  ],
};

const ContentMarkup = styled.div`
  padding: ${(props) => props.theme.spaces.s300} 0;
`;

function StreamFieldBlock(props) {
  const { blockType, page } = props;
  const plan = useContext(PlanContext);

  switch (blockType) {
    case 'RichTextBlock': {
      const { value } = props;
      return (
        <Container>
          <Row>
            <Col lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }}>
              <ContentMarkup dangerouslySetInnerHTML={{ __html: value }} />
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
    case 'IndicatorBlock': {
      const { indicator } = props;
      return <IndicatorBlock indicator={indicator} />;
    }
    case 'ActionListBlock': {
      const { categoryFilter, color } = props;
      return <ActionListBlock categoryId={categoryFilter?.id || page.category.id} color={color} />;
    }
    case 'CategoryListBlock': {
      const { color } = props;
      const { category } = page;
      const fallbackImage = (category?.image || plan.image);
      return <CategoryListBlock categories={category.children} color={color} fallbackImage={fallbackImage} />;
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
    default:
      return <div>Component for { blockType } does not exist</div>;
  }
}

function StreamField({ page, blocks, color }) {
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
