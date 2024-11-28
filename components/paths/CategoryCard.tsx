import React, { useEffect, useState } from 'react';

import {
  Category,
  CategoryFragmentFragment,
} from 'common/__generated__/graphql';
import {
  ActionNode,
  CausalGridNodeFragment,
} from 'common/__generated__/paths/graphql';
import { Link } from 'common/links';

import ActionParameters from 'components/paths/ActionParameters';
import { useFormatter, useTranslations } from 'next-intl';
import { readableColor, transparentize } from 'polished';
import ContentLoader from 'react-content-loader';
import styled, { useTheme } from 'styled-components';

import HighlightValue from '@/components/paths/HighlightValue';
import { activeGoalVar, yearRangeVar } from '@/context/paths/cache';
import { GET_NODE_CONTENT } from '@/queries/paths/get-paths-node';
import { DimensionalMetric, type SliceConfig } from '@/utils/paths/metric';
import { getHttpHeaders } from '@/utils/paths/paths.utils';
import PathsActionNode from '@/utils/paths/PathsActionNode';
import { NetworkStatus, useQuery, useReactiveVar } from '@apollo/client';

import IndicatorSparkline from './graphs/IndicatorSparkline';

const GroupIdentifierHeader = styled.div<{
  $color?: string | null | undefined;
}>`
  background-color: ${(props) => props.$color};
  color: ${(props) => readableColor(props.$color || '#ffffff')};
  padding: 6px;
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: all 0.5s ease;
  overflow: hidden;
  border-width: ${(props) => props.theme.cardBorderWidth};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) => props.theme.cardBackground.primary};
  color: ${(props) => props.theme.textColor.primary};
  box-shadow: 2px 2px 8px
    ${(props) => transparentize(0.9, props.theme.themeColors.dark)};
`;

const CardContentBlock = styled.div<{ $disabled?: boolean }>`
  margin: ${({ theme }) => `0 ${theme.spaces.s100} ${theme.spaces.s100}`};
  opacity: ${({ $disabled = false }) => ($disabled ? 0.5 : 1)};
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const CardHeaderBlock = styled.div``;
const CardDataBlock = styled.div``;
const CardHeader = styled.h3`
  margin: ${({ theme }) => `0 ${theme.spaces.s100} ${theme.spaces.s100}`};
  color: ${(props) => props.theme.neutralDark};
  font-size: ${(props) => props.theme.fontSizeMd};
  line-height: ${(props) => props.theme.lineHeightMd};
`;

const Identifier = styled.span`
  color: ${(props) => props.theme.textColor.tertiary};
`;

const Values = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 10px;
  align-items: stretch;
  height: 100%;
`;

const SubValue = styled.div`
  flex: 45% 1 0;

  > div {
    height: 100%;
  }
`;

const ParametersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 45% 1 0;
  align-items: flex-end;
  height: 100%;
`;

const CardGoalBlock = styled.div`
  margin: ${({ theme }) => `0 0 ${theme.spaces.s100}`};
  line-height: ${(props) => props.theme.lineHeightMd};
  font-size: ${(props) => props.theme.fontSizeBase};

  p {
    display: inline;
    margin: 0;
  }

  strong,
  span {
    display: inline;
  }
`;

const PathsContentLoader = (props) => {
  const theme = useTheme();
  return (
    <ContentLoader
      speed={1}
      width={330}
      height={80}
      viewBox="0 0 330 80"
      backgroundColor={theme.graphColors.grey010}
      foregroundColor={theme.graphColors.grey030}
      {...props}
    >
      <rect x="5" y="1" rx="3" ry="3" width="166" height="16" />
      <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
      <rect x="6" y="24" rx="3" ry="3" width="130" height="27" />
      <rect x="4" y="61" rx="3" ry="3" width="166" height="16" />
    </ContentLoader>
  );
};

const getTotalValues = (yearData) => {
  const totals: number[] = [];
  yearData.categoryTypes[1].options.forEach((colId, cIdx) => {
    const pieSegmentValues: (number | null)[] = [];
    yearData.categoryTypes[0].options.forEach((rowId, rIdx) => {
      const datum = yearData.rows[rIdx][cIdx];
      if (datum != 0) {
        pieSegmentValues.push(datum ? Math.abs(datum) : null);
      }
    });
    // Calculate total and percentages
    const total =
      pieSegmentValues.reduce((sum, value) => {
        const numSum = sum === null ? 0 : sum;
        const numValue = value === null ? 0 : value;
        return numSum + numValue;
      }, 0) || 0;
    totals.push(total);
  });
  return totals;
};

type PathsBasicNodeContentProps = {
  categoryId: string;
  node: CausalGridNodeFragment;
  onLoaded: (id: string, impact: number) => void;
};

type EmissionDisplay = {
  value: number | null;
  label: string | null;
  year: number | null;
  change?: number | null;
};
type Emissions = {
  total: { latest: EmissionDisplay; reference: EmissionDisplay };
};

const PathsBasicNodeContent = (props: PathsBasicNodeContentProps) => {
  const { categoryId, node, onLoaded } = props;
  const yearRange = useReactiveVar(yearRangeVar);
  const activeGoal = useReactiveVar(activeGoalVar);
  const format = useFormatter();
  //const [sliceConfig, setSliceConfig] = useState<SliceConfig>(null);

  const [emissions, setEmissions] = useState<Emissions>({
    total: {
      latest: {
        value: null,
        label: null,
        year: null,
        change: null,
      },
      reference: { value: null, label: null, year: null, change: null },
    },
  });

  const [unit, setUnit] = useState<string | null>(null);

  useEffect(() => {
    const nodeMetric = new DimensionalMetric(node.metricDim!);
    const sliceConfig: SliceConfig =
      nodeMetric.getDefaultSliceConfig(activeGoal);

    const historicalYears = nodeMetric.getHistoricalYears();
    const lastHistoricalYear = historicalYears[historicalYears.length - 1];

    setUnit(nodeMetric.getUnit());
    const latestData = nodeMetric.getSingleYear(
      lastHistoricalYear,
      sliceConfig.categories
    );
    const referenceData = nodeMetric.getSingleYear(
      yearRange[1],
      sliceConfig.categories
    );

    // Let's assume the first key is the one we want to display
    //const displayCategoryType = Object.keys(sliceConfig.categories)[0];
    const displayCategoryType =
      sliceConfig.categories[Object.keys(sliceConfig.categories)[0]];

    const displayCategory =
      displayCategoryType && displayCategoryType.groups?.length
        ? { id: displayCategoryType?.groups[0], type: 'group' }
        : { id: displayCategoryType?.categories[0], type: 'category' };

    if (displayCategory.id) {
      const latestLabel = latestData.allLabels.find(
        (label) => label.id === displayCategory.id
      )?.label;
      const referenceLabel = referenceData.allLabels.find(
        (label) => label.id === displayCategory.id
      )?.label;

      const latestValue = getTotalValues(latestData)[0];
      const referenceValue = getTotalValues(referenceData)[0];

      setEmissions({
        total: {
          latest: {
            value: latestValue,
            label: latestLabel || null,
            year: lastHistoricalYear,
            change:
              lastHistoricalYear > yearRange[1] &&
              referenceValue &&
              referenceValue !== latestValue
                ? (latestValue - referenceValue) / Math.abs(referenceValue)
                : null,
          },
          reference: {
            value: referenceValue,
            label: referenceLabel || null,
            year: yearRange[1],
            change:
              lastHistoricalYear < yearRange[1] &&
              latestValue &&
              latestValue !== referenceValue
                ? (referenceValue - latestValue) / Math.abs(latestValue)
                : null,
          },
        },
      });
      setUnit(nodeMetric.getUnit());
      onLoaded(categoryId, referenceValue);
    }
    // using exhausive deps here causes an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearRange[1]]);

  return (
    <CardContentBlock>
      <Values>
        {emissions.total.latest.value ? (
          <SubValue>
            <HighlightValue
              displayValue={
                emissions.total.latest.value
                  ? format.number(emissions.total.latest.value, {
                      maximumSignificantDigits: 2,
                    })
                  : ''
              }
              header={`${emissions.total.latest.label} (${emissions.total.latest.year})`}
              unit={unit || ''}
              size="md"
              change={
                emissions.total.latest.change != null
                  ? `${
                      emissions.total.latest.change > 0 ? '+' : ''
                    }${format.number(emissions.total.latest.change * 100, {
                      style: 'unit',
                      unit: 'percent',
                      maximumSignificantDigits: 2,
                    })}`
                  : undefined
              }
            />
          </SubValue>
        ) : null}
        {emissions.total.reference.value ? (
          <SubValue>
            <HighlightValue
              displayValue={
                emissions.total.reference.value
                  ? format.number(emissions.total.reference.value, {
                      maximumSignificantDigits: 2,
                    })
                  : ''
              }
              header={`${emissions.total.reference.label} (${emissions.total.reference.year})`}
              unit={unit || ''}
              size="md"
              change={
                emissions.total.reference.change != null
                  ? `${
                      emissions.total.reference.change > 0 ? '+' : ''
                    }${format.number(emissions.total.reference.change * 100, {
                      style: 'unit',
                      unit: 'percent',
                      maximumSignificantDigits: 2,
                    })}`
                  : undefined
              }
            />
          </SubValue>
        ) : null}
      </Values>
    </CardContentBlock>
  );
};

type PathsActionNodeContentProps = {
  categoryId: string;
  node: ActionNode;
  refetching: boolean;
  onLoaded: (id: string, impact: number) => void;
};

const PathsActionNodeContent = (props: PathsActionNodeContentProps) => {
  const { categoryId, node, refetching = false, onLoaded } = props;
  const t = useTranslations();
  const format = useFormatter();
  const yearRange = useReactiveVar(yearRangeVar);
  const pathsAction = new PathsActionNode(node);
  const impact = pathsAction.getYearlyImpact(yearRange[1]) || 0;

  useEffect(() => {
    onLoaded(categoryId, impact);
    // Using exhaustive deps here causes an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearRange[1]]);

  return (
    <CardContentBlock>
      <Values>
        <SubValue>
          <HighlightValue
            displayValue={
              pathsAction.isEnabled()
                ? format.number(impact, { maximumSignificantDigits: 2 })
                : '-'
            }
            header={`${t('impact')} ${yearRange[1]}`}
            unit={pathsAction.getUnit() || ''}
            size="md"
            muted={refetching || !pathsAction.isEnabled()}
            mutedReason={
              !pathsAction.isEnabled()
                ? t('action-not-included-in-scenario')
                : ''
            }
          />
        </SubValue>
        <ParametersWrapper>
          <ActionParameters parameters={node.parameters} />
        </ParametersWrapper>
      </Values>
    </CardContentBlock>
  );
};

type PathsNodeContentProps = {
  categoryId: string;
  node: string;
  paths: string;
  onLoaded: (id: string, impact: number) => void;
};

const PathsNodeContent = React.memo((props: PathsNodeContentProps) => {
  const { categoryId, node, paths, onLoaded } = props;
  const activeGoal = useReactiveVar(activeGoalVar);

  const { data, loading, error, networkStatus } = useQuery(GET_NODE_CONTENT, {
    fetchPolicy: 'no-cache',
    variables: { node: node, goal: activeGoal?.id },
    notifyOnNetworkStatusChange: true,
    context: {
      uri: '/api/graphql-paths',
      headers: getHttpHeaders({ instanceIdentifier: paths }),
    },
  });

  const refetching = networkStatus === NetworkStatus.refetch;

  if (loading && !refetching) {
    return <PathsContentLoader />;
  }
  if (error) {
    return <div>Error: {error.message}</div>; // Handle error appropriately
  }
  if (data) {
    if (data.node.__typename === 'ActionNode') {
      return (
        <PathsActionNodeContent
          categoryId={categoryId}
          node={data.node}
          onLoaded={onLoaded}
          refetching={refetching}
        />
      );
    } else if (data.node.__typename) {
      return (
        <PathsBasicNodeContent
          categoryId={categoryId}
          node={data.node}
          onLoaded={onLoaded}
        />
      );
    }
    return null;
  }
});

PathsNodeContent.displayName = 'PathsNodeContent';

type CategoryCardProps = {
  category: Category;
  group?: CategoryFragmentFragment;
  pathsInstance?: string;
  onLoaded: (id: string, impact: number) => void;
};

const CategoryCard = (props: CategoryCardProps) => {
  const { category, group, pathsInstance, onLoaded } = props;

  const mainGoalAttribute = category.attributes?.find(
    (attr) => attr.key === 'Hauptziel'
  );

  const mainGoalLabel = mainGoalAttribute?.key || 'Main Goal';
  const mainGoalValue = mainGoalAttribute?.value;

  const flattenHTML = (html: string) => html.replace(/<\/?p[^>]*>/g, '');

  const flattenedMainGoalValue = mainGoalValue
    ? flattenHTML(mainGoalValue)
    : null;

  return (
    <Card>
      {group && (
        <GroupIdentifierHeader $color={group?.color || category?.color}>
          {group.id !== 'all' ? group?.name : ' '}
        </GroupIdentifierHeader>
      )}
      <CardContent>
        <CardHeaderBlock>
          <Link href={category?.categoryPage?.urlPath || ''} legacyBehavior>
            <a className="card-wrapper">
              <CardHeader className="card-title">
                {!category?.type.hideCategoryIdentifiers && (
                  <Identifier>{category.identifier}. </Identifier>
                )}
                {category.name}
              </CardHeader>
            </a>
          </Link>
          {/* Leave this out for now */}
          {category.leadParagraph && false && (
            <CardContentBlock>{category.leadParagraph}</CardContentBlock>
          )}
        </CardHeaderBlock>
        <CardDataBlock>
          {category.kausalPathsNodeUuid && pathsInstance && (
            <PathsNodeContent
              categoryId={category.id}
              node={category.kausalPathsNodeUuid}
              paths={pathsInstance}
              onLoaded={onLoaded}
            />
          )}
          <CardContentBlock>
            {mainGoalValue && (
              <CardGoalBlock>
                <p>
                  <strong>{mainGoalLabel}:</strong> {flattenedMainGoalValue}
                </p>
              </CardGoalBlock>
            )}
            {category.indicators?.length > 0 && (
              <IndicatorSparkline indicatorId={category.indicators[0].id} />
            )}
          </CardContentBlock>
        </CardDataBlock>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
