import React, { useEffect, useMemo, useState } from 'react';

import { useReactiveVar } from '@apollo/client';
import styled from '@emotion/styled';
import { useFormatter } from 'next-intl';

import type { GetNodeContentQuery } from '@/common/__generated__/paths/graphql';
import HighlightValue from '@/components/paths/HighlightValue';
import type { PathsInstanceType } from '@/components/providers/PathsProvider';
import { yearRangeVar } from '@/context/paths/cache';
import {
  type SliceConfig,
  flatten,
  getDefaultSliceConfig,
  getHistoricalYears,
  getName,
  getSingleYear,
  getUnit,
  parseMetric,
} from '@/utils/paths/metric';

const ValuesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: stretch;
  justify-content: stretch;
  height: 100%;
  margin-bottom: ${({ theme }) => theme.spaces.s100};
`;

const Values = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0 10px;
  align-items: stretch;
  flex: 0 1 780px;
  background-color: ${({ theme }) => theme.themeColors.white};
`;

const ValuesHeader = styled.div`
  flex: 100% 0 0;
  padding: 0 0.5rem;
  font-weight: 700;
  font-size: 0.75rem;
  line-height: 1.25rem;
`;

const SubValue = styled.div`
  flex: 1 0 45%;

  > div {
    height: 100%;
  }
`;

const getTotalValues = (yearData: {
  categoryTypes: readonly { options: readonly string[] }[];
  rows: readonly (readonly (number | null)[])[];
}) => {
  const totals: number[] = [];
  yearData.categoryTypes[1]?.options.forEach((colId, cIdx) => {
    const pieSegmentValues: (number | null)[] = [];
    yearData.categoryTypes[0]?.options.forEach((rowId, rIdx) => {
      const datum = yearData.rows[rIdx]?.[cIdx];
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

type AugmentedGoal = NonNullable<PathsInstanceType>['instance']['goals'][number];

type PathsBasicNodeContentProps = {
  categoryId: string;
  node: GetNodeContentQuery['node'] & { __typename: 'Node' };
  onLoaded: (id: string, impact: number) => void;
  displayGoals: AugmentedGoal[];
  refetching: boolean;
};

type EmissionDisplay = {
  value: number | null;
  label: string | null;
  year: number | null;
  change?: number | null;
};
type Emissions = {
  label: string | null;
  id: number | string;
  metricName: string | null;
  latest: EmissionDisplay;
  reference: EmissionDisplay;
};

const InventoryNodeSummary = (props: PathsBasicNodeContentProps) => {
  const { categoryId, node, onLoaded, displayGoals, refetching } = props;
  const yearRange = useReactiveVar(yearRangeVar);
  const format = useFormatter();

  const [emissions, setEmissions] = useState<Emissions[]>([
    {
      label: null,
      metricName: null,
      id: 0,
      latest: {
        value: null,
        label: null,
        year: null,
        change: null,
      },
      reference: {
        value: null,
        label: null,
        year: null,
        change: null,
      },
    },
  ]);

  const [unit, setUnit] = useState<string | null>(null);

  // Parse metric data once when node changes
  const metric = useMemo(() => parseMetric(node.metricDim!), [node.metricDim]);

  // Redefine values if yearRange has been manipulated
  useEffect(() => {
    const historicalYears = getHistoricalYears(metric);
    const lastHistoricalYear = historicalYears[historicalYears.length - 1];
    setUnit(getUnit(metric));

    const displayEmissions: Emissions[] = [];

    displayGoals.forEach((goal) => {
      const sliceConfig: SliceConfig = getDefaultSliceConfig(metric, goal);
      const hasCategoryFilters = Object.keys(sliceConfig.categories).length > 0;
      const hasTwoDimensions = metric.dimensions.length >= 2;

      let latestValue: number | null = null;
      let referenceValue: number | null = null;
      let latestLabel: string | null = null;
      let referenceLabel: string | null = null;

      if (hasCategoryFilters && hasTwoDimensions) {
        // Use the 2D matrix approach for multi-dimension metrics with filters
        const latestData = getSingleYear(metric, lastHistoricalYear, sliceConfig.categories);
        const referenceData = getSingleYear(metric, yearRange[1], sliceConfig.categories);

        const displayCategoryType = sliceConfig.categories[Object.keys(sliceConfig.categories)[0]];
        const displayCategory =
          displayCategoryType && displayCategoryType.groups?.length
            ? { id: displayCategoryType?.groups[0], type: 'group' }
            : { id: displayCategoryType?.categories[0], type: 'category' };

        const hasDataForThisGoal = !!displayCategory.id;

        latestLabel =
          latestData.allLabels.find((label) => label.id === displayCategory.id)?.label ?? null;
        referenceLabel =
          referenceData.allLabels.find((label) => label.id === displayCategory.id)?.label ?? null;

        latestValue = hasDataForThisGoal ? (getTotalValues(latestData)[0] ?? null) : null;
        referenceValue =
          goal.hideForecast || !hasDataForThisGoal
            ? null
            : (getTotalValues(referenceData)[0] ?? null);
      } else {
        // Use flatten for single-dimension metrics or when no category filters
        const sliceData = flatten(metric, sliceConfig.categories);

        // Find the value for the specific year
        const latestYearIndex = sliceData.historicalYears.indexOf(lastHistoricalYear);
        const referenceYearIndex =
          sliceData.historicalYears.indexOf(yearRange[1]) >= 0
            ? sliceData.historicalYears.indexOf(yearRange[1])
            : sliceData.forecastYears.indexOf(yearRange[1]);
        const isReferenceForecast = sliceData.forecastYears.includes(yearRange[1]);

        if (latestYearIndex >= 0) {
          latestValue = sliceData.categoryValues[0]?.historicalValues[latestYearIndex] ?? null;
        }

        if (!goal.hideForecast) {
          if (isReferenceForecast && referenceYearIndex >= 0) {
            referenceValue =
              sliceData.categoryValues[0]?.forecastValues[referenceYearIndex] ?? null;
          } else if (referenceYearIndex >= 0) {
            referenceValue =
              sliceData.categoryValues[0]?.historicalValues[referenceYearIndex] ?? null;
          }
        }

        // Use the metric name as the label when flattening
        latestLabel = getName(metric);
        referenceLabel = getName(metric);
      }

      displayEmissions.push({
        metricName: getName(metric),
        label: goal.label ? goal.label : null,
        id: goal.id,
        latest: {
          value: latestValue,
          label: latestLabel,
          year: lastHistoricalYear,
          change:
            latestValue !== null &&
            lastHistoricalYear > yearRange[1] &&
            referenceValue &&
            referenceValue !== latestValue
              ? (latestValue - referenceValue) / Math.abs(referenceValue)
              : null,
        },
        reference: {
          value: referenceValue,
          label: referenceLabel,
          year: yearRange[1],
          change:
            referenceValue !== null &&
            lastHistoricalYear < yearRange[1] &&
            latestValue &&
            latestValue !== referenceValue
              ? (referenceValue - latestValue) / Math.abs(latestValue)
              : null,
        },
      });
    });

    setEmissions(displayEmissions);
    onLoaded(categoryId, 100);
    // using exhausive deps here causes an infinite loop
  }, [yearRange[1], refetching, metric]);

  console.log('InventoryNodeSummary render emissions', { emissions, unit });
  return (
    <ValuesContainer>
      {emissions.map((em) => (
        <Values key={em.id}>
          <ValuesHeader>{em.label}</ValuesHeader>

          <SubValue>
            <HighlightValue
              displayValue={
                em.latest.value != null
                  ? format.number(em.latest.value, {
                      maximumSignificantDigits: 2,
                    })
                  : ' '
              }
              header={`${em.latest.value != null ? em.latest.year : '-'}`}
              unit={em.latest.value && unit ? unit : ''}
              size="md"
              change={
                em.latest.change != null
                  ? `${em.latest.change > 0 ? '+' : ''}${format.number(em.latest.change * 100, {
                      style: 'unit',
                      unit: 'percent',
                      maximumSignificantDigits: 2,
                    })}`
                  : undefined
              }
            />
          </SubValue>

          <SubValue>
            <HighlightValue
              displayValue={
                em.reference.value != null
                  ? format.number(em.reference.value, {
                      maximumSignificantDigits: 2,
                    })
                  : ' '
              }
              header={`${em.reference.value != null ? em.reference.year : '-'}`}
              unit={em.reference.value && unit ? unit : ''}
              size="md"
              change={
                em.reference.change != null
                  ? `${em.reference.change > 0 ? '+' : ''}${format.number(
                      em.reference.change * 100,
                      {
                        style: 'unit',
                        unit: 'percent',
                        maximumSignificantDigits: 2,
                      }
                    )}`
                  : undefined
              }
            />
          </SubValue>
        </Values>
      ))}
    </ValuesContainer>
  );
};

export default InventoryNodeSummary;
