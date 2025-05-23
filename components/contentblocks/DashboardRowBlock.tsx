import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import {
  DashboardRowBlock as TDashboardRowBlock,
  DashboardParagraphBlock,
  DashboardIndicatorPieChartBlock,
  DashboardIndicatorAreaChartBlock,
  DashboardIndicatorBarChartBlock,
  DashboardIndicatorLineChartBlock,
  DashboardIndicatorSummaryBlock,
} from '@/common/__generated__/graphql';
import Card from '../common/Card';

const DashboardRowSection = styled.div<{
  $topMargin?: boolean;
  $bottomMargin?: boolean;
}>`
  background-color: ${(props) => props.theme.themeColors.white};
  color: ${(props) => props.theme.neutralDark};
  position: relative;
  padding: ${(props) => props.theme.spaces.s100} 0;
  margin-top: ${(props) => (props.$topMargin ? props.theme.spaces.s400 : 0)};
  margin-bottom: ${(props) =>
    props.$bottomMargin ? props.theme.spaces.s400 : 0};
`;

type DashboardBlock =
  | DashboardParagraphBlock
  | DashboardIndicatorPieChartBlock
  | DashboardIndicatorAreaChartBlock
  | DashboardIndicatorBarChartBlock
  | DashboardIndicatorLineChartBlock
  | DashboardIndicatorSummaryBlock;

interface DashboardRowBlockProps extends Omit<TDashboardRowBlock, 'rawValue'> {
  topMargin?: boolean;
  bottomMargin?: boolean;
  blocks: DashboardBlock[];
}

function getBlockComponent(block: DashboardBlock) {
  switch (block.blockType) {
    case 'DashboardParagraphBlock': {
      const paragraphBlock = block as DashboardParagraphBlock;

      return paragraphBlock.text ? (
        <div dangerouslySetInnerHTML={{ __html: paragraphBlock.text }} />
      ) : null;
    }
    case 'DashboardIndicatorPieChartBlock':
    case 'DashboardIndicatorAreaChartBlock':
    case 'DashboardIndicatorBarChartBlock':
    case 'DashboardIndicatorLineChartBlock':
    case 'DashboardIndicatorSummaryBlock':
      // TODO: Add component for each block type
      return <pre>{JSON.stringify(block, null, 2)}</pre>;
    default:
      return null;
  }
}

const DashboardCardContents = ({ block }: { block: DashboardBlock }) => {
  const title = 'indicator' in block ? block.indicator?.name : undefined;
  const helpText = 'helpText' in block ? block.helpText : undefined;
  const component = getBlockComponent(block);

  return (
    <>
      {!!title && <h3>{title}</h3>}
      {!!helpText && <p>{helpText}</p>}
      {component}
    </>
  );
};

const DashboardRowBlock = ({
  id,
  blocks,
  topMargin = true,
  bottomMargin = true,
}: DashboardRowBlockProps) => {
  const columnWidth = 12 / blocks.length;
  console.log(blocks);

  return (
    <DashboardRowSection
      id={id ?? undefined}
      $topMargin={topMargin}
      $bottomMargin={bottomMargin}
    >
      <Container>
        <Row>
          {blocks.map((block, index) => (
            <Col key={`${block.id}-${index}`} md={columnWidth}>
              <Card outline>
                <DashboardCardContents block={block} />
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </DashboardRowSection>
  );
};

export default DashboardRowBlock;
