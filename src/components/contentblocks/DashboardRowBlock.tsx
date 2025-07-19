import React from 'react';

import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';

import {
  DashboardIndicatorAreaChartBlock,
  DashboardIndicatorBarChartBlock,
  DashboardIndicatorLineChartBlock,
  DashboardIndicatorPieChartBlock,
  DashboardParagraphBlock,
  DashboardIndicatorSummaryBlock as TDashboardIndicatorSummaryBlock,
  DashboardRowBlock as TDashboardRowBlock,
} from '@/common/__generated__/graphql';

import Card from '../common/Card';
import DashboardIndicatorSummaryBlock from './DashboardIndicatorSummaryBlock';
import DashboardIndicatorAreaChartBlockComponent from './indicator-chart/DashboardIndicatorAreaChartBlock';
import DashboardIndicatorBarChartBlockComponent from './indicator-chart/DashboardIndicatorBarChartBlock';
import DashboardIndicatorLineChartBlockComponent from './indicator-chart/DashboardIndicatorLineChartBlock';
import DashboardIndicatorPieChartBlockComponent from './indicator-chart/DashboardIndicatorPieChartBlock';

const DashboardRowSection = styled.div<{
  $topMargin?: boolean;
  $bottomMargin?: boolean;
}>`
  background-color: ${(props) => props.theme.themeColors.light};
  color: ${(props) => props.theme.neutralDark};
  position: relative;
  padding-top: ${(props) => (props.$topMargin ? props.theme.spaces.s300 : props.theme.spaces.s100)};
  padding-bottom: ${(props) =>
    props.$bottomMargin ? props.theme.spaces.s300 : props.theme.spaces.s100};
  margin-top: ${(props) => (props.$topMargin ? props.theme.spaces.s400 : 0)};
  margin-bottom: ${(props) => (props.$bottomMargin ? props.theme.spaces.s200 : 0)};
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

/* Style richtext content slightly smaller on dashboard cards*/
const StyledCard = styled(Card)`
  height: 100%;

  h2 {
    font-size: ${({ theme }) => theme.fontSizeLg};
  }
  h3 {
    font-size: ${({ theme }) => theme.fontSizeMd};
  }
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
      return <DashboardIndicatorSummaryBlock indicator={summaryBlock.indicator} />;
    }
    case 'DashboardIndicatorPieChartBlock': {
      const pieChartBlock = block as DashboardIndicatorPieChartBlock;

      return <DashboardIndicatorPieChartBlockComponent {...pieChartBlock} />;
    }
    case 'DashboardIndicatorLineChartBlock': {
      const lineChartBlock = block as DashboardIndicatorLineChartBlock;
      return <DashboardIndicatorLineChartBlockComponent {...lineChartBlock} />;
    }
    case 'DashboardIndicatorBarChartBlock': {
      const barChartBlock = block as DashboardIndicatorBarChartBlock;
      return <DashboardIndicatorBarChartBlockComponent {...barChartBlock} />;
    }
    case 'DashboardIndicatorAreaChartBlock': {
      const areaChartBlock = block as DashboardIndicatorAreaChartBlock;
      return <DashboardIndicatorAreaChartBlockComponent {...areaChartBlock} />;
    }
  }
}

const DashboardCardContents = ({ block }: { block: DashboardBlock }) => {
  const isSummaryBlock = block.blockType === 'DashboardIndicatorSummaryBlock';
  const title = !isSummaryBlock && 'indicator' in block ? block.indicator?.name : undefined;

  const helpText = !isSummaryBlock && 'helpText' in block ? block.helpText : undefined;
  const component = getBlockComponent(block);

  return (
    <>
      {!!title && <h2>{title}</h2>}
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
    <DashboardRowSection id={id ?? undefined} $topMargin={topMargin} $bottomMargin={bottomMargin}>
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
