const IndicatorTableHeader = (props: { column: string }) => {
  const { column } = props;
  return <th key={column}>{column}</th>;
};

export default IndicatorTableHeader;
