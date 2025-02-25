import React, { useState } from 'react';
import styled from 'styled-components';
import dayjs from 'common/dayjs';
import { Table, Collapse, Button } from 'reactstrap';
import { beautifyValue } from 'common/data/format';
import Icon from 'components/common/Icon';
import { useFormatter, useTranslations } from 'next-intl';

const CollapsibleTable = styled.div`
  background-color: ${(props) => props.theme.themeColors.white};
  padding: ${(props) => props.theme.spaces.s050};
`;

const Trigger = styled.div`
  background-color: ${(props) => props.theme.cardBackground.primary};
  text-align: center;
`;

const TableContainer = styled.div`
  padding: ${(props) =>
    `${props.theme.spaces.s200} ${props.theme.spaces.s050} ${props.theme.spaces.s100}`};
  background-color: ${(props) => props.theme.cardBackground.primary};

  table {
    font-family: ${(props) =>
      `${props.theme.fontFamilyContent}, ${props.theme.fontFamilyFallback}`};
    font-size: ${(props) => props.theme.fontSizeSm};
    line-height: 1.25;
    background-color: ${(props) => props.theme.themeColors.white};
    width: auto;
    min-width: 480px;
    margin: 0 auto;

    > caption {
      text-align: center;
      color: ${(props) => props.theme.themeColors.black};
    }

    td,
    th {
      text-align: right;
    }
  }
`;

const TriggerButton = styled(Button)`
  text-decoration: none;
  color: ${(props) => props.theme.linkColor};

  &:hover {
    text-decoration: underline;
    color: ${(props) => props.theme.linkColor};
  }
`;

function GraphAsTable(props) {
  const t = useTranslations();
  const format = useFormatter();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const { data, timeResolution, specification, title, language, goalTraces } =
    props;

  // Collect all x values from all traces and filter out duplicates
  const allRows = [];
  data.map((trace, i) => {
    trace.x.map((x, i) => {
      allRows.push(x);
    });
  });
  goalTraces.map((trace, i) => {
    trace.x.map((x, i) => {
      allRows.push(x);
    });
  });
  const tableRows = allRows.filter(
    (row, index, rows) => rows.indexOf(row) === index
  );

  // Sort rows by date if we are dealing with time series
  if (data[0].xType === 'time') {
    tableRows.sort((a, b) => dayjs(a).diff(dayjs(b)));
  }

  const dateFormat =
    timeResolution === 'YEAR'
      ? {
          year: 'numeric',
        }
      : {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        };

  // Create table data row by row
  const tableData = [];
  tableRows.map((row, i) => {
    const rowObj = {};
    rowObj.label =
      data[0].xType === 'time'
        ? format.dateTime(new Date(row), dateFormat)
        : row;
    rowObj.values = [];
    data.map((trace, i) => {
      const indexOfX = trace.x.indexOf(row);
      trace.y[indexOfX]
        ? rowObj.values.push(trace.y[indexOfX])
        : rowObj.values.push(null);
    });
    goalTraces.map((trace, i) => {
      const indexOfX = trace.x.indexOf(row);
      trace.y[indexOfX]
        ? rowObj.values.push(trace.y[indexOfX])
        : rowObj.values.push(null);
    });
    tableData.push(rowObj);
  });

  // Check if there are dimensions and create table category headers for them
  const tableCategoryHeaders = [];
  const categoryCounts = data.map((trace, idx, traces) => {
    if (
      idx !== 0 &&
      trace._parentName &&
      trace._parentName === traces[idx - 1]?._parentName
    ) {
      tableCategoryHeaders[tableCategoryHeaders.length - 1].count++;
      return tableCategoryHeaders[tableCategoryHeaders.length - 1].count;
    } else {
      tableCategoryHeaders.push({ name: trace._parentName, count: 1 });
      return 1;
    }
  });
  if (categoryCounts.find((count) => count > 1) === undefined) {
    tableCategoryHeaders.length = 0;
  }

  return (
    <CollapsibleTable>
      <Trigger>
        <TriggerButton color="link" size="sm" onClick={toggle}>
          {isOpen ? t('graph-hideTable') : t('graph-showTable')}
          <Icon name={isOpen ? 'angle-down' : 'angle-right'} />
        </TriggerButton>
      </Trigger>
      <Collapse isOpen={isOpen}>
        <TableContainer>
          <Table responsive bordered size="sm">
            <caption>{title}</caption>
            <thead>
              {tableCategoryHeaders.length > 0 && (
                <tr>
                  <th></th>
                  {tableCategoryHeaders.map((header, i) => (
                    <th key={i} colSpan={header.count} scope="colgroup">
                      {header.name}
                    </th>
                  ))}
                </tr>
              )}
              <tr>
                <td></td>
                {data.map((trace, i) => (
                  <th key={i} scope="col">
                    {trace.name.replace(`${trace._parentName}, `, '')}
                    {specification.unit ? ` (${specification.unit})` : ''}
                  </th>
                ))}
                {goalTraces.map((trace, i) => (
                  <th key={i} scope="col">
                    {trace.name}
                    {specification.unit ? ` (${specification.unit})` : ''}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={i}>
                  <th scope="row">{row.label}</th>
                  {row.values.map((val, i) => (
                    <td key={i}>{beautifyValue(val, language)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </Collapse>
    </CollapsibleTable>
  );
}

export default GraphAsTable;
