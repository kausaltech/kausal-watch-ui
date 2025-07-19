import { useEffect, useRef } from 'react';

import { Theme } from '@kausal/themes/types';
import type { BarSeriesOption, LineSeriesOption } from 'echarts/charts';
// Import bar charts, all suffixed with Chart
import { LineChart } from 'echarts/charts';
import type {
  DatasetComponentOption,
  GridComponentOption,
  TitleComponentOption,
  TooltipComponentOption,
} from 'echarts/components';
// Import the tooltip, title, rectangular coordinate system, dataset and transform components
import {
  DatasetComponent,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  TransformComponent,
} from 'echarts/components';
import type { ComposeOption } from 'echarts/core';
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
// Features like Universal Transition and Label Layout
import { LabelLayout, UniversalTransition } from 'echarts/features';
// Import the Canvas renderer
// Note that including the CanvasRenderer or SVGRenderer is a required step
import { SVGRenderer } from 'echarts/renderers';
import throttle from 'lodash/throttle';
import { transparentize } from 'polished';
import styled, { useTheme } from 'styled-components';

// Create an Option type with only the required components and charts via ComposeOption
export type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

export function getChartTheme(theme: Theme) {
  return {
    version: 1,
    themeName: theme.name,
    theme: {
      seriesCnt: '4',
      backgroundColor: 'rgba(0,0,0,0)',
      titleColor: theme.headingsColor,
      subtitleColor: theme.textColor,
      textColorShow: false,
      textColor: theme.textColor,
      markTextColor: '#eeeeee',
      color: [
        theme.graphColors.blue030,
        theme.graphColors.green030,
        theme.graphColors.red030,
        theme.graphColors.yellow030,
        theme.graphColors.grey030,
      ],
      borderColor: '#ccc',
      borderWidth: 0,
      visualMapColor: ['#516b91', '#59c4e6', '#a5e7f0'],
      legendTextColor: '#999999',
      kColor: '#edafda',
      kColor0: 'transparent',
      kBorderColor: '#d680bc',
      kBorderColor0: '#8fd3e8',
      kBorderWidth: '2',
      lineWidth: '2',
      symbolSize: '6',
      symbol: 'emptyCircle',
      symbolBorderWidth: '2',
      lineSmooth: true,
      graphLineWidth: 1,
      graphLineColor: '#aaaaaa',
      mapLabelColor: '#000',
      mapLabelColorE: '#516b91',
      mapBorderColor: '#516b91',
      mapBorderColorE: '#516b91',
      mapBorderWidth: 0.5,
      mapBorderWidthE: 1,
      mapAreaColor: '#f3f3f3',
      mapAreaColorE: '#a5e7f0',
      axes: [
        {
          type: 'all',
          name: 'Universal axes',
          axisLineShow: true,
          axisLineColor: '#cccccc',
          axisTickShow: false,
          axisTickColor: '#333',
          axisLabelShow: true,
          axisLabelColor: '#999999',
          splitLineShow: true,
          splitLineColor: ['#eeeeee'],
          splitAreaShow: true,
          splitAreaColor: [transparentize(0.1, theme.brandDark), 'transparent'],
        },
        {
          type: 'category',
          name: 'Category axis',
          axisLineShow: true,
          axisLineColor: '#333',
          axisTickShow: true,
          axisTickColor: '#333',
          axisLabelShow: true,
          axisLabelColor: '#333',
          splitLineShow: false,
          splitLineColor: ['#ccc'],
          splitAreaShow: true,
          splitAreaColor: [transparentize(0.1, theme.brandDark), 'transparent'],
        },
        {
          type: 'value',
          name: 'Numeric axis',
          axisLineShow: true,
          axisLineColor: '#333',
          axisTickShow: true,
          axisTickColor: '#333',
          axisLabelShow: true,
          axisLabelColor: '#333',
          splitLineShow: true,
          splitLineColor: ['#ccc'],
          splitAreaShow: false,
          splitAreaColor: [transparentize(0.1, theme.brandDark), 'transparent'],
        },
        {
          type: 'log',
          name: 'Logarithmic axis',
          axisLineShow: true,
          axisLineColor: '#333',
          axisTickShow: true,
          axisTickColor: '#333',
          axisLabelShow: true,
          axisLabelColor: '#333',
          splitLineShow: true,
          splitLineColor: ['#ccc'],
          splitAreaShow: false,
          splitAreaColor: [transparentize(0.1, theme.brandDark), 'transparent'],
        },
        {
          type: 'time',
          name: 'Time axis',
          axisLineShow: true,
          axisLineColor: '#333',
          axisTickShow: true,
          axisTickColor: '#333',
          axisLabelShow: true,
          axisLabelColor: '#333',
          splitLineShow: true,
          splitLineColor: ['#ccc'],
          splitAreaShow: false,
          splitAreaColor: [transparentize(0.1, theme.brandDark), 'transparent'],
        },
      ],
      axisSeperateSetting: false,
      toolboxColor: '#999999',
      toolboxEmphasisColor: '#666666',
      tooltipAxisColor: '#cccccc',
      tooltipAxisWidth: 1,
      timelineLineColor: '#8fd3e8',
      timelineLineWidth: 1,
      timelineItemColor: '#8fd3e8',
      timelineItemColorE: '#8fd3e8',
      timelineCheckColor: '#8fd3e8',
      timelineCheckBorderColor: '#8a7ca8',
      timelineItemBorderWidth: 1,
      timelineControlColor: '#8fd3e8',
      timelineControlBorderColor: '#8fd3e8',
      timelineControlBorderWidth: 0.5,
      timelineLabelColor: '#8fd3e8',
      datazoomBackgroundColor: 'rgba(0,0,0,0)',
      datazoomDataColor: 'rgba(255,255,255,0.3)',
      datazoomFillColor: 'rgba(167,183,204,0.4)',
      datazoomHandleColor: '#a7b7cc',
      datazoomHandleWidth: '100',
      datazoomLabelColor: '#333',
    },
  };
}

// Register the required components
echarts.use([
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  SVGRenderer,
]);

const StyledChartWrapper = styled.div<{ $height?: string }>`
  height: ${({ $height }) => $height || '100px'};
`;

type Props = {
  isLoading: boolean;
  data?: ECOption;
  height?: string;
};

const Chart = ({ isLoading, data, height }: Props) => {
  const theme = useTheme();
  const chartRef = useRef<echarts.ECharts | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chart = echarts.init(wrapperRef.current);
    chartRef.current = chart;

    const throttledResize = throttle(() => chart.resize(), 1000, {
      leading: false,
      trailing: true,
    });

    window.addEventListener('resize', throttledResize);

    return () => {
      throttledResize.flush();
      window.removeEventListener('resize', throttledResize);
      chart.clear();
      chart.dispose();
    };
  }, [theme]);

  useEffect(() => {
    if (chartRef.current) {
      if (isLoading) {
        chartRef.current.showLoading();
      } else {
        chartRef.current.hideLoading();
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (chartRef.current && data) {
      chartRef.current.setOption(data);
    }
  }, [data]);

  return <StyledChartWrapper ref={wrapperRef} $height={height} />;
};

export default Chart;
