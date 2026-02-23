import React from 'react';

import styled from 'styled-components';

import type { Progress } from '@/components/dashboard/ActionStatusGraphs';

const BarChartWrapper = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s200};

  h3 {
    font-size: ${(props) => props.theme.fontSizeBase};
  }
`;

const Status = styled.div`
  color: ${(props) => props.theme.themeColors.black};
`;

const BarGraph = styled.div`
  display: flex;
  height: 1rem;
  width: 100%;
  background-color: ${(props) => props.theme.themeColors.light};
`;

const Segment = styled.div<{ portion: number; color: string }>`
  background-color: ${(props) => props.color};
  width: ${(props) => props.portion}%;
  height: 1rem;
`;

const Labels = styled.div<{ columns: string }>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  width: 100%;
  margin-top: ${(props) => props.theme.spaces.s050};
  column-gap: 0;

  @media (max-width: 768px) {
    display: flex;
    width: auto;
    margin-top: ${(props) => props.theme.spaces.s050};
  }
`;

const SegmentLabel = styled.span<{ portion: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 ${(props) => props.theme.spaces.s050};
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`};
  line-height: ${(props) => props.theme.lineHeightMd};

  .value {
    font-weight: ${(props) => props.theme.fontWeightBold};
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    align-items: flex-start;
    text-align: left;
    flex-basis: ${(props) => props.portion}%;
    padding: 0;
    margin: ${(props) => props.theme.spaces.s050} ${(props) => props.theme.spaces.s050} 0 0;

    span {
      align-self: flex-start;
    }
  }
`;

interface BarChartProps {
  title: string;
  data: Progress;
}

interface Segment {
  id: string;
  label: string;
  value: string;
  portion: number;
  color: string;
}

function BarChart({ title, data }: BarChartProps) {
  if (data.values.length < 1) {
    return null;
  }

  const valueSum = data.values.reduce((total, value) => total + value, 0);
  const segments = data.labels
    .map((label, i) => ({
      id: label,
      label: data.labels[i],
      value: `${Math.round((data.values[i] / valueSum) * 100)} %`,
      portion: data.values[i] / valueSum,
      color: data.colors[i],
    }))
    .filter(({ portion }) => portion > 0);

  // Match grid columns with bar segment width
  const labelColumns =
    segments.length === 1 ? '1fr' : segments.map((s) => `${s.portion * 100}%`).join(' ');

  return (
    <BarChartWrapper>
      <h3>{title}</h3>
      <div>
        <Status>
          <BarGraph>
            {segments.map((segment) => (
              <Segment key={segment.id} color={segment.color} portion={segment.portion * 100} />
            ))}
          </BarGraph>
          <Labels columns={labelColumns}>
            {segments.map((segment) => (
              <SegmentLabel
                key={segment.id}
                portion={(segments.length === 1 ? 1 : segment.portion) * 100}
              >
                <span className="value">{segment.value}</span>
                <span> {segment.label}</span>
              </SegmentLabel>
            ))}
          </Labels>
        </Status>
      </div>
    </BarChartWrapper>
  );
}

export default BarChart;
