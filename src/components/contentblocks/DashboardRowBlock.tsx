import React from 'react';

import Link from 'next/link';

import { useTranslations } from 'next-intl';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';

import {
  type DashboardIndicatorAreaChartBlock,
  type DashboardIndicatorBarChartBlock,
  type DashboardIndicatorLineChartBlock,
  type DashboardIndicatorPieChartBlock,
  type DashboardIndicatorSummaryBlock,
  type DashboardParagraphBlock,
  type DashboardRowBlock,
} from '@/common/__generated__/graphql';

import Card from '../common/Card';
import DashboardIndicatorSummaryBlockComponent from './DashboardIndicatorSummaryBlock';
import DashboardIndicatorAreaChartBlockComponent from './indicator-chart/DashboardIndicatorAreaChartBlock';
import DashboardIndicatorBarChartBlockComponent from './indicator-chart/DashboardIndicatorBarChartBlock';
import DashboardIndicatorLineChartBlockComponent from './indicator-chart/DashboardIndicatorLineChartBlock';
import DashboardIndicatorPieChartBlockComponent from './indicator-chart/DashboardIndicatorPieChartBlock';

const DashboardRowSection = styled.div<{
  $topPadding?: boolean;
  $bottomPadding?: boolean;
}>`
  background-color: ${(props) => props.theme.themeColors.light};
  color: ${(props) => props.theme.neutralDark};
  position: relative;
  padding-top: ${(props) =>
    props.$topPadding ? props.theme.spaces.s400 : props.theme.spaces.s100};
  padding-bottom: ${(props) =>
    props.$bottomPadding ? props.theme.spaces.s400 : props.theme.spaces.s100};
`;

type DashboardBlock =
  | DashboardParagraphBlock
  | DashboardIndicatorPieChartBlock
  | DashboardIndicatorAreaChartBlock
  | DashboardIndicatorBarChartBlock
  | DashboardIndicatorLineChartBlock
  | TDashboardIndicatorSummaryBlock;

interface DashboardRowBlockProps extends Omit<TDashboardRowBlock, 'rawValue'> {
  topPadding?: boolean;
  bottomPadding?: boolean;
  blocks: DashboardBlock[];
}

const StyledRow = styled(Row)`
  --bs-gutter-y: ${({ theme }) => theme.spaces.s200};
`;

/* Style richtext content slightly smaller on dashboard cards*/
const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;

  .card-body {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizeLg};
  }
  h3 {
    font-size: ${({ theme }) => theme.fontSizeMd};
  }
`;

const StyledLink = styled(Link)`
  margin-top: auto;
  padding-top: ${({ theme }) => theme.spaces.s200};
  align-self: flex-end;
  font-size: ${({ theme }) => theme.fontSizeSm};
  text-decoration: none;
  color: ${({ theme }) => theme.linkColor};

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.linkColor};
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
      const summaryBlock = block as DashboardIndicatorSummaryBlock;
      return <DashboardIndicatorSummaryBlockComponent indicator={summaryBlock.indicator} />;
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
  topPadding = true,
  bottomPadding = true,
}: DashboardRowBlockProps) => {
  const t = useTranslations();
  const columnWidth = 12 / blocks.length;
  const chartTypes = [
    'DashboardIndicatorPieChartBlock',
    'DashboardIndicatorLineChartBlock',
    'DashboardIndicatorBarChartBlock',
    'DashboardIndicatorAreaChartBlock',
  ];

  return (
    <DashboardRowSection
      id={id ?? undefined}
      $topPadding={topPadding}
      $bottomPadding={bottomPadding}
    >
      <Container>
        <StyledRow>
          {blocks.map((block) => {
            const { blockType } = block;
            const isChart = chartTypes.includes(blockType);
            const indicatorId =
              isChart && 'indicator' in block && block.indicator ? block.indicator.id : undefined;

            return (
              <Col key={block.id} md={columnWidth}>
                <StyledCard outline>
                  <DashboardCardContents block={block} />
                  {isChart && indicatorId && (
                    <StyledLink href={`/indicators/${indicatorId}`}>
                      {t('see-full-data')}
                    </StyledLink>
                  )}
                </StyledCard>
              </Col>
            );
          })}
        </StyledRow>
      </Container>
    </DashboardRowSection>
  );
};

export default DashboardRowBlock;
