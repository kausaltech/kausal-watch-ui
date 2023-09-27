import React from 'react';
import styled from 'styled-components';

import { Progress } from 'components/dashboard/ActionStatusGraphs';

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
  width: auto;
  background-color: ${(props) => props.theme.themeColors.light};
`;

const Segment = styled.div<{ portion: number }>`
  background-color: ${(props) => props.color};
  width: ${(props) => props.portion}%;
  height: 1rem;
`;

const Labels = styled.div`
  display: flex;
  width: auto;
`;

const SegmentLabel = styled.span<{ portion: number }>`
  display: flex;
  flex-direction: column;
  flex-basis: ${(props) => props.portion}%;
  text-align: left;
  margin: ${(props) => props.theme.spaces.s050}
    ${(props) => props.theme.spaces.s050} 0 0;
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => props.theme.fontFamilyTiny};
  line-height: ${(props) => props.theme.lineHeightMd};

  span {
    align-self: flex-start;
  }

  .value {
    font-weight: ${(props) => props.theme.fontWeightBold};
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

  return (
    <BarChartWrapper>
      <h3>{title}</h3>
      <div>
        <Status>
          <BarGraph>
            {segments.map((segment) => (
              <Segment
                key={segment.id}
                color={segment.color}
                portion={segment.portion * 100}
              />
            ))}
          </BarGraph>
          <Labels>
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
