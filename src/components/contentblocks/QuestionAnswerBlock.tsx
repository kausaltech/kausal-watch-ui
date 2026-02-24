import React from 'react';

import { type Theme, css } from '@emotion/react';
import styled from '@emotion/styled';
import { Col, type ColProps, Container, Row } from 'reactstrap';

import Accordion from '@/components/common/Accordion';
import RichText from '@/components/common/RichText';

const inlineStyles = (theme: Theme) => css`
  h2 {
    text-align: left;
    font-size: ${theme.fontSizeLg};
  }
`;

const breakOutStyles = (theme: Theme) => css`
  background: ${theme.themeColors.light};

  h2 {
    text-align: center;
    font-size: ${theme.fontSizeXl};
  }
`;

const FaqSection = styled.section<{ $inline?: boolean }>`
  ${({ $inline, theme }) => ($inline ? inlineStyles(theme) : breakOutStyles(theme))};
  padding: ${(props) => props.theme.spaces.s400} 0;

  h2 {
    margin-bottom: ${(props) => props.theme.spaces.s300};
  }

  @media print {
    .accordion .collapse {
      display: block;
    }
  }
`;

const QuestionAnswerBlock = ({
  id = '',
  heading,
  questions,
  hasSidebar,
  alignWithContent = false,
  columnProps,
}: Props) => {
  if (questions == null) {
    return null;
  }

  const colSizes = alignWithContent
    ? {
        xl: { size: 6, offset: 3 },
        lg: { size: 8, offset: 2 },
        md: { size: 10, offset: 1 },
      }
    : {
        xl: { size: 8, offset: hasSidebar ? 4 : 2 },
        lg: { size: 8, offset: hasSidebar ? 4 : 2 },
        md: { size: 10, offset: 1 },
      };

  return (
    <FaqSection id={id} $inline={alignWithContent}>
      <Container>
        <Row>
          <Col {...colSizes} {...columnProps}>
            {heading && <h2>{heading}</h2>}
            <Accordion>
              {questions.map((q, i) => (
                <Accordion.Item key={i}>
                  <Accordion.Header small={alignWithContent}>{q.question}</Accordion.Header>
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

interface Props {
  id: string;
  hasSidebar: boolean;
  heading?: string;
  questions: { question: string; answer: string }[];
  alignWithContent?: boolean;
  columnProps?: ColProps;
}

export default QuestionAnswerBlock;
