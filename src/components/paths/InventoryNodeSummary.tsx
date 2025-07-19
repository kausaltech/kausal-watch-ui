import React, { useEffect, useState } from 'react';

import { useReactiveVar } from '@apollo/client';
import { useFormatter } from 'next-intl';
import styled from 'styled-components';

import { CausalGridNodeFragment, InstanceGoalEntry } from '@/common/__generated__/paths/graphql';
import HighlightValue from '@/components/paths/HighlightValue';
import { yearRangeVar } from '@/context/paths/cache';
import { DimensionalMetric, type SliceConfig } from '@/utils/paths/metric';

const Values = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0 10px;
  align-items: stretch;
  height: 100%;
  background-color: ${({ theme }) => theme.themeColors.white};

  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spaces.s100};
  }
`;

const ValuesHeader = styled.div`
  flex: 100% 0 0;
  padding: 0 0.5rem;
  font-weight: 700;
  font-size: 0.75rem;
  line-height: 1.25rem;
`;

const SubValue = styled.div`
  flex: 45% 1 0;

  > div {
    height: 100%;
  }
`;

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
  displayGoals: InstanceGoalEntry[];
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
  const nodeMetric = new DimensionalMetric(node.metricDim!);

  // Redefine values if yearRange has been manipulated
  useEffect(() => {
    const historicalYears = nodeMetric.getHistoricalYears();
    const lastHistoricalYear = historicalYears[historicalYears.length - 1];
    setUnit(nodeMetric.getUnit());

    const displayEmissions: Emissions[] = [];

    displayGoals.forEach((goal) => {
      const sliceConfig: SliceConfig = nodeMetric.getDefaultSliceConfig(goal);

      // TODO: Data seems to exist even when goal is not available on metric?
      const latestData = nodeMetric.getSingleYear(lastHistoricalYear, sliceConfig.categories);
      const referenceData = nodeMetric.getSingleYear(yearRange[1], sliceConfig.categories);

      // So we check slice config to determine if data is valid
      // Let's assume the first key is the one we want to display
      //const displayCategoryType = Object.keys(sliceConfig.categories)[0];
      const displayCategoryType = sliceConfig.categories[Object.keys(sliceConfig.categories)[0]];

      const displayCategory =
        displayCategoryType && displayCategoryType.groups?.length
          ? { id: displayCategoryType?.groups[0], type: 'group' }
          : { id: displayCategoryType?.categories[0], type: 'category' };

      const hasDataForThisGoal = displayCategory.id ? true : false;

      const latestLabel = latestData.allLabels.find(
        (label) => label.id === displayCategory.id
      )?.label;
      const referenceLabel = referenceData.allLabels.find(
        (label) => label.id === displayCategory.id
      )?.label;

      const latestValue = hasDataForThisGoal ? getTotalValues(latestData)[0] : null;
      const referenceValue =
        goal?.hideForecast || !hasDataForThisGoal ? null : getTotalValues(referenceData)[0];

      displayEmissions.push({
        metricName: nodeMetric.getName(),
        label: goal.label ? goal.label : null,
        id: goal.id,
        latest: {
          value: latestValue,
          label: latestLabel || null,
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
          label: referenceLabel || null,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearRange[1], refetching]);

  return (
    <>
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
    </>
  );
};

export default InventoryNodeSummary;
