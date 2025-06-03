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
  DashboardIndicatorSummaryBlock as TDashboardIndicatorSummaryBlock,
} from '@/common/__generated__/graphql';
import Card from '../common/Card';
import DashboardIndicatorSummaryBlock from './DashboardIndicatorSummaryBlock';
import DashboardIndicatorPieChartBlockComponent from './indicator-chart/DashboardIndicatorPieChartBlock';

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
  | TDashboardIndicatorSummaryBlock;

interface DashboardRowBlockProps extends Omit<TDashboardRowBlock, 'rawValue'> {
  topMargin?: boolean;
  bottomMargin?: boolean;
  blocks: DashboardBlock[];
}

const StyledRow = styled(Row)`
  --bs-gutter-y: ${({ theme }) => theme.spaces.s200};
`;

const StyledCard = styled(Card)`
  height: 100%;
`;

function getBlockComponent(block: DashboardBlock) {
  switch (block.blockType) {
    case 'DashboardParagraphBlock': {
      const paragraphBlock = block as DashboardParagraphBlock;
      return paragraphBlock.text ? (
        <div dangerouslySetInnerHTML={{ __html: paragraphBlock.text }} />
      ) : null;
    }
    case 'DashboardIndicatorSummaryBlock': {
      const summaryBlock = block as TDashboardIndicatorSummaryBlock;
      return (
        <DashboardIndicatorSummaryBlock indicator={summaryBlock.indicator} />
      );
    }
    case 'DashboardIndicatorPieChartBlock': {
      const pieChartBlock = block as DashboardIndicatorPieChartBlock;

      return <DashboardIndicatorPieChartBlockComponent {...pieChartBlock} />;
    }
    case 'DashboardIndicatorAreaChartBlock':
    case 'DashboardIndicatorBarChartBlock':
    case 'DashboardIndicatorLineChartBlock':
      // TODO: Add component for each block type
      return null;
  }
}

const DashboardCardContents = ({ block }: { block: DashboardBlock }) => {
  const isSummaryBlock = block.blockType === 'DashboardIndicatorSummaryBlock';
  const title =
    !isSummaryBlock && 'indicator' in block ? block.indicator?.name : undefined;

  const helpText =
    !isSummaryBlock && 'helpText' in block ? block.helpText : undefined;
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

  return (
    <DashboardRowSection
      id={id ?? undefined}
      $topMargin={topMargin}
      $bottomMargin={bottomMargin}
    >
      <Container>
        <StyledRow>
          {blocks.map((block, index) => (
            <Col key={`${block.id}-${index}`} md={columnWidth}>
              <StyledCard outline>
                <DashboardCardContents block={block} />
              </StyledCard>
            </Col>
          ))}
        </StyledRow>
      </Container>
    </DashboardRowSection>
  );
};

export default DashboardRowBlock;
