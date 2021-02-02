import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { gql } from '@apollo/client';
import QuestionAnswerBlock from 'components/contentblocks/QuestionAnswerBlock';
import CategoryListBlock from 'components/contentblocks/CategoryListBlock';

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
    'CategoryListBlock',
  ],
};

const ContentMarkup = styled.div`
  padding: ${(props) => props.theme.spaces.s300} 0;
`;

function StreamFieldBlock(props) {
  const { field, blockType } = props;
  console.log(props);
  switch (blockType) {
    case 'RichTextBlock':
      return (
        <Container>
          <Row>
            <Col lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }}>
              <ContentMarkup dangerouslySetInnerHTML={{ __html: props.value }} />
            </Col>
          </Row>
        </Container>
      );
    case 'QuestionAnswerBlock':
      return <QuestionAnswerBlock {...props} />;
    case 'CharBlock':
      return <Container><Row><Col><div>{props.value}</div></Col></Row></Container>;
    case 'IndicatorBlock':
      return <div>INDICATOR BLOCK</div>;
    case 'CategoryListBlock':
      return <CategoryListBlock {...props} />;
    default:
      return <div />;
  }
}

function StreamField({ blocks }) {
  console.log(blocks);
  return (
    <>
      { blocks.map((block) => <StreamFieldBlock {...block} key={block.id} />) }
    </>
  );
}

StreamField.fragments = {
  streamField: STREAM_FIELD_FRAGMENT,
};

export default StreamField;
