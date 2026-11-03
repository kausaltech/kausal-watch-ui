import { useLayoutEffect, useRef } from 'react';

import styled from '@emotion/styled';

import type { Progress } from '@/components/dashboard/ActionStatusGraphs';

import { placeLabels } from './label-placement';

/** Space between labels, in px */
const LABEL_GAP = 12;

const Wrapper = styled.div`
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

const Segment = styled.div<{ $portion: number; $color: string }>`
  background-color: ${(props) => props.$color};
  width: ${(props) => props.$portion}%;
  /* Keeps tiny segments visible */
  min-width: 3px;
  height: 1rem;

  /* Separator (WCAG 1.4.11). Not a sibling selector: each segment has its own class. */
  &:not(:first-child) {
    box-shadow: inset 1px 0 0 ${(props) => props.theme.themeColors.white};
  }
`;

/* All labels in one grid cell: the row is as tall as the tallest label */
const Labels = styled.div`
  display: grid;
  margin-top: ${(props) => props.theme.spaces.s050};
`;

const SegmentLabel = styled.span<{ $center: number }>`
  grid-area: 1 / 1;
  justify-self: start;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: max-content;
  max-width: 10rem;
  text-align: center;
  hyphens: auto;
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`};
  line-height: ${(props) => props.theme.lineHeightMd};

  /* Centred under the segment until measured */
  margin-left: ${(props) => props.$center}%;
  transform: translateX(-50%);

  .value {
    font-weight: ${(props) => props.theme.fontWeightBold};
    white-space: nowrap;
  }
`;

interface StatusBarChartProps {
  title: string;
  data: Progress;
}

/** Rounded percentage; "<1 %" and ">99 %" instead of a misleading 0 or 100 */
function formatPortion(portion: number) {
  const percent = Math.round(portion * 100);
  if (portion > 0 && percent === 0) return '<1 %';
  if (portion < 1 && percent === 100) return '>99 %';
  return `${percent} %`;
}

/** Places the labels by their segments (see placeLabels), on resize and font load too. */
function useLabelPlacement(dependency: unknown) {
  const barRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const bar = barRef.current;
    const labels = labelsRef.current;
    if (!bar || !labels) return;

    const layout = () => {
      const labelEls = Array.from(labels.children) as HTMLElement[];
      const segmentEls = Array.from(bar.children) as HTMLElement[];
      const barLeft = bar.getBoundingClientRect().left;
      const boxes = labelEls.map((el, i) => {
        const segment = segmentEls[i].getBoundingClientRect();
        el.style.width = 'min-content';
        const minWidth = el.getBoundingClientRect().width;
        el.style.width = '';
        return {
          center: segment.left - barLeft + segment.width / 2,
          width: el.getBoundingClientRect().width,
          minWidth,
        };
      });
      placeLabels(boxes, bar.clientWidth, LABEL_GAP).forEach(({ left, width }, i) => {
        const el = labelEls[i];
        el.style.marginLeft = `${left}px`;
        el.style.transform = 'none';
        if (width < boxes[i].width) el.style.width = `${width}px`;
      });
    };

    layout();
    const observer = new ResizeObserver(layout);
    observer.observe(bar);
    void document.fonts?.ready.then(layout);
    return () => observer.disconnect();
  }, [dependency]);

  return { barRef, labelsRef };
}

/** A stacked bar of action statuses or phases, with a label under each segment */
function StatusBarChart({ title, data }: StatusBarChartProps) {
  const { barRef, labelsRef } = useLabelPlacement(data);

  if (data.values.length < 1) {
    return null;
  }

  const valueSum = data.values.reduce((total, value) => total + value, 0);
  const segments = data.labels
    .map((label, i) => ({
      id: label,
      label: data.labels[i],
      value: formatPortion(data.values[i] / valueSum),
      portion: data.values[i] / valueSum,
      color: data.colors[i],
    }))
    .filter(({ portion }) => portion > 0);

  // In %, for the labels' position before they are measured
  const centers = segments.map((segment, i) => {
    const start = segments.slice(0, i).reduce((sum, previous) => sum + previous.portion, 0);
    return (start + segment.portion / 2) * 100;
  });

  return (
    <Wrapper>
      <h3>{title}</h3>
      <div>
        <Status>
          <BarGraph ref={barRef}>
            {segments.map((segment) => (
              <Segment key={segment.id} $color={segment.color} $portion={segment.portion * 100} />
            ))}
          </BarGraph>
          <Labels ref={labelsRef}>
            {segments.map((segment, i) => (
              <SegmentLabel key={segment.id} $center={centers[i]}>
                <span className="value">{segment.value}</span>
                <span>{segment.label}</span>
              </SegmentLabel>
            ))}
          </Labels>
        </Status>
      </div>
    </Wrapper>
  );
}

export default StatusBarChart;
