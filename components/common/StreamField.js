import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { gql } from '@apollo/client';

import Accordion from 'components/common/Accordion';

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
  }
`;

export const possibleTypes = {
  StreamFieldInterface: [
    'CharBlock', 'TextBlock', 'RichTextBlock', 'ChoiceBlock', 'QuestionAnswerBlock',
  ]
};


const ContentMarkup = styled.div`
  padding: ${(props) => props.theme.spaces.s300} 0;
`;

const FaqSection = styled.section`
  padding: ${(props) => props.theme.spaces.s400} 0;
  background: ${(props) => props.theme.themeColors.light};

  h2 {
    text-align: center;
    font-size: ${(props) => props.theme.fontSizeXl};
    margin-bottom: ${(props) => props.theme.spaces.s300};
  }
`;


function QuestionAnswerBlock({heading, questions}) {
  return (
    <FaqSection>
      <Container>
        <Row>
          <Col lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }}>
            { heading && (<h2>{ heading }</h2>)}
            <Accordion>
              { questions.map(q => (
                <Accordion.Item key={q.id} id={q.id}>
                  <Accordion.Header>
                    {q.question}
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="text-content" dangerouslySetInnerHTML={{ __html: q.answer }}/>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>
    </FaqSection>
  );
}

function StreamFieldBlock(props) {
  const { field, blockType } = props;
  switch (blockType) {
    case 'RichTextBlock':
      return (
        <Container>
          <Row>
            <Col lg={{ size:8, offset: 2 }} md={{ size: 10, offset: 1 }}>
              <ContentMarkup dangerouslySetInnerHTML={{ __html: props.value }} />
            </Col>
          </Row>
        </Container>
      );
    case 'QuestionAnswerBlock':
      return <QuestionAnswerBlock {...props} />
    case 'CharBlock':
      return <Container><Row><Col><div>{props.value}</div></Col></Row></Container>
  }
}

function StreamField({ blocks }) {
  return (
    <>
      { blocks.map((block) => <StreamFieldBlock {...block} />) }
    </>
  );
}

StreamField.fragments = {
  streamField: STREAM_FIELD_FRAGMENT,
};

export default StreamField;
