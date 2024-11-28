import React, { useEffect, useState } from 'react';

import {
  CausalGridNodeFragment,
  InstanceGoalEntry,
} from 'common/__generated__/paths/graphql';

import { useFormatter } from 'next-intl';
import styled from 'styled-components';

import HighlightValue from '@/components/paths/HighlightValue';
import { yearRangeVar } from '@/context/paths/cache';
import { DimensionalMetric, type SliceConfig } from '@/utils/paths/metric';
import { useReactiveVar } from '@apollo/client';

const CardContentBlock = styled.div<{ $disabled?: boolean }>`
  margin: ${({ theme }) => `0 ${theme.spaces.s100} ${theme.spaces.s100}`};
  opacity: ${({ $disabled = false }) => ($disabled ? 0.5 : 1)};
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
};

type EmissionDisplay = {
  value: number | null;
  label: string | null;
  year: number | null;
  change?: number | null;
};
type Emissions = { latest: EmissionDisplay; reference: EmissionDisplay };

const InventoryNodeSummary = (props: PathsBasicNodeContentProps) => {
  const { categoryId, node, onLoaded, displayGoals } = props;
  const yearRange = useReactiveVar(yearRangeVar);
  const format = useFormatter();

  const [emissions, setEmissions] = useState<Emissions[]>([
    {
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

  useEffect(() => {
    const nodeMetric = new DimensionalMetric(node.metricDim!);
    const historicalYears = nodeMetric.getHistoricalYears();
    const lastHistoricalYear = historicalYears[historicalYears.length - 1];
    setUnit(nodeMetric.getUnit());

    const displayEmissions: Emissions[] = [];

    displayGoals.forEach((goal) => {
      const sliceConfig: SliceConfig = nodeMetric.getDefaultSliceConfig(goal);
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
        const referenceValue = goal?.hideForecast
          ? null
          : getTotalValues(referenceData)[0];

        displayEmissions.push({
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
        });
      }
    });

    setEmissions(displayEmissions);
    onLoaded(categoryId, 100);
    // using exhausive deps here causes an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearRange[1]]);

  return (
    <CardContentBlock>
      {emissions.map((em) => (
        <Values key={em.latest.value}>
          {em.latest.value ? (
            <SubValue>
              <HighlightValue
                displayValue={
                  em.latest.value
                    ? format.number(em.latest.value, {
                        maximumSignificantDigits: 2,
                      })
                    : ''
                }
                header={`${em.latest.label} (${em.latest.year})`}
                unit={unit || ''}
                size="md"
                change={
                  em.latest.change != null
                    ? `${em.latest.change > 0 ? '+' : ''}${format.number(
                        em.latest.change * 100,
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
          ) : null}
          {em.reference.value ? (
            <SubValue>
              <HighlightValue
                displayValue={
                  em.reference.value
                    ? format.number(em.reference.value, {
                        maximumSignificantDigits: 2,
                      })
                    : ''
                }
                header={`${em.reference.label} (${em.reference.year})`}
                unit={unit || ''}
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
          ) : null}
        </Values>
      ))}
    </CardContentBlock>
  );
};

export default InventoryNodeSummary;
