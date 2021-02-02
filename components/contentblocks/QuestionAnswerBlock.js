import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import Accordion from 'components/common/Accordion';

const FaqSection = styled.section`
  padding: ${(props) => props.theme.spaces.s400} 0;
  background: ${(props) => props.theme.themeColors.light};

  h2 {
    text-align: center;
    font-size: ${(props) => props.theme.fontSizeXl};
    margin-bottom: ${(props) => props.theme.spaces.s300};
  }
`;

const QuestionAnswerBlock = (props) => {
  const { heading, questions} = props;
  const questionList = [];
  // create ids
  questions.forEach((question, index) => questionList.push({
    id: index.toString(),
    ...question,
  }));
  return (
    <FaqSection>
      <Container>
        <Row>
          <Col lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }}>
            { heading && (<h2>{ heading }</h2>)}
            <Accordion>
              { questionList.map((q) => (
                <Accordion.Item key={q.id} id={q.id}>
                  <Accordion.Header>
                    {q.question}
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="text-content" dangerouslySetInnerHTML={{ __html: q.answer }} />
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>
    </FaqSection>
  );
};

QuestionAnswerBlock.defaultProps = {
  heading: null,
};

QuestionAnswerBlock.propTypes = {
  heading: PropTypes.string,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default QuestionAnswerBlock;
