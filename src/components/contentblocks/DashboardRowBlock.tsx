import React from 'react';

import styled from '@emotion/styled';
import { useTranslations } from 'next-intl';
import { Col, Container, Row } from 'reactstrap';

import type { StreamFieldFragmentFragment } from '@/common/__generated__/graphql';
import { IndicatorLink } from '@/common/links';

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

// Extract the DashboardRowBlock fragment type from the union
type DashboardRowBlockFragment = Extract<
  StreamFieldFragmentFragment,
  { __typename: 'DashboardRowBlock' }
>;
// Get the element type of the blocks array
export type DashboardBlock = NonNullable<DashboardRowBlockFragment['blocks']>[number];

interface DashboardRowBlockProps extends Omit<DashboardRowBlockFragment, 'rawValue'> {
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

const StyledLink = styled(IndicatorLink)`
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
  switch (block.__typename) {
    case 'DashboardParagraphBlock': {
      if ('text' in block) {
        return block.text ? <div dangerouslySetInnerHTML={{ __html: block.text }} /> : null;
      }
      return null;
    }
    case 'DashboardIndicatorSummaryBlock': {
      if ('indicator' in block) {
        return <DashboardIndicatorSummaryBlockComponent indicator={block.indicator} />;
      }
      return null;
    }
    case 'DashboardIndicatorPieChartBlock': {
      const pieBlock = block as Extract<
        DashboardBlock,
        { __typename: 'DashboardIndicatorPieChartBlock' }
      >;
      return <DashboardIndicatorPieChartBlockComponent {...(pieBlock as any)} />;
    }
    case 'DashboardIndicatorLineChartBlock': {
      const lineBlock = block as Extract<
        DashboardBlock,
        { __typename: 'DashboardIndicatorLineChartBlock' }
      >;
      return <DashboardIndicatorLineChartBlockComponent {...(lineBlock as any)} />;
    }
    case 'DashboardIndicatorBarChartBlock': {
      const barBlock = block as Extract<
        DashboardBlock,
        { __typename: 'DashboardIndicatorBarChartBlock' }
      >;
      return <DashboardIndicatorBarChartBlockComponent {...(barBlock as any)} />;
    }
    case 'DashboardIndicatorAreaChartBlock': {
      const areaBlock = block as Extract<
        DashboardBlock,
        { __typename: 'DashboardIndicatorAreaChartBlock' }
      >;
      return <DashboardIndicatorAreaChartBlockComponent {...(areaBlock as any)} />;
    }
    default:
      return null;
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
          {blocks.map((block, index) => {
            const { blockType } = block;
            const isChart = chartTypes.includes(blockType);
            const indicatorId =
              isChart && 'indicator' in block && block.indicator ? block.indicator.id : undefined;

            const blockId = 'id' in block && block.id ? block.id : `${block.blockType}-${index}`;
            return (
              <Col key={blockId} md={columnWidth}>
                <StyledCard outline>
                  <DashboardCardContents block={block} />
                  {isChart && indicatorId && (
                    <StyledLink id={indicatorId}>{t('see-full-data')}</StyledLink>
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
