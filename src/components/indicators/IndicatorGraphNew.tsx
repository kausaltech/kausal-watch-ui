import { Chart, type ECOption } from '@common/components/Chart';

const IndicatorGraph = () => {
  const option: ECOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
  };
  return <Chart data={option} isLoading={false} height="300px" />;
};

export default IndicatorGraph;
