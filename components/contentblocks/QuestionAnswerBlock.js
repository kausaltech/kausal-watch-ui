import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import RichText from 'components/common/RichText';
import Accordion from 'components/common/Accordion';

const FaqSection = styled.section`
  padding: ${(props) => props.theme.spaces.s400} 0;
  background: ${(props) => props.theme.themeColors.light};

  h2 {
    text-align: center;
    font-size: ${(props) => props.theme.fontSizeXl};
    margin-bottom: ${(props) => props.theme.spaces.s300};
  }

  @media print {
    .accordion .collapse {
      display: block;
    }
  }
`;

const QuestionAnswerBlock = (props) => {
  const { id = '', heading, questions, hasSidebar } = props;
  if (questions == null) {
    return null;
  }
  const questionList = questions.map((question, index) => ({
    id: index.toString(),
    ...question,
  }));
  return (
    <FaqSection id={id}>
      <Container>
        <Row>
          <Col
            xl={{ size: 7, offset: hasSidebar ? 4 : 2 }}
            lg={{ size: 8, offset: hasSidebar ? 4 : 2 }}
            md={{ size: 10, offset: 1 }}
          >
            { heading && (<h2>{ heading }</h2>)}
            <Accordion>
              { questionList.map((q) => (
                <Accordion.Item key={q.id} id={q.id}>
                  <Accordion.Header>
                    {q.question}
                  </Accordion.Header>
                  <Accordion.Body>
                    <RichText html={q.answer} />
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
  id: PropTypes.string,
  hasSidebar: PropTypes.bool,
  heading: PropTypes.string,
  questions: PropTypes.arrayOf(PropTypes.object),
};

export default QuestionAnswerBlock;
