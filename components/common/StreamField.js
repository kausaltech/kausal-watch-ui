import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { gql } from '@apollo/client';
import QuestionAnswerBlock from 'components/contentblocks/QuestionAnswerBlock';
import ActionListBlock from 'components/contentblocks/ActionListBlock';
import CategoryListBlock from 'components/contentblocks/CategoryListBlock';
import IndicatorBlock from 'components/contentblocks/IndicatorBlock';

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
  }
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
  ],
};

const ContentMarkup = styled.div`
  padding: ${(props) => props.theme.spaces.s300} 0;
`;

function StreamFieldBlock(props) {
  const { blockType } = props;

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
      const { categoryFilter } = props;
      return <ActionListBlock categoryId={categoryFilter?.id || page.category.id} />;
    }
    case 'CategoryListBlock':
      return <CategoryListBlock categories={page.category.children} />;
    default:
      return <div />;
  }
}

function StreamField({ page, blocks }) {
  return (
    <>
      { blocks.map((block) => <StreamFieldBlock {...block} page={page} key={block.id} />) }
    </>
  );
}

StreamField.fragments = {
  streamField: STREAM_FIELD_FRAGMENT,
};

export default StreamField;
