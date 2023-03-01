import React, { useState } from 'react';
import styled from 'styled-components';
import { Table, Collapse, Button } from 'reactstrap';
import { beautifyValue } from 'common/data/format';
import Icon from 'components/common/Icon';

const CollapsibleTable = styled.div`
  background-color: ${(props) => props.theme.themeColors.light};
  padding: ${(props) => props.theme.spaces.s050};
`;

const Trigger = styled.div`
  text-align: right;
`;

const TableContainer = styled.div`
  padding: ${(props) => props.theme.spaces.s100};

  table {
    font-family: ${(props) => props.theme.fontFamilyContent};
    line-height: 1.25;
    background-color: ${(props) => props.theme.themeColors.white};
    width: auto;
    min-width: 480px;
    margin: 0 auto;

    > caption {
      text-align: center;
    }

    td, th {
      text-align: right;
    }
  }
`;

const TriggerButton = styled(Button)`
  text-decoration: none;
`;


function GraphAsTable(props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const {
    data,
    timeResolution,
    specification,
    title,
    language,
    t,
  } = props;

  const allRows = [];
  data.map((trace, i) => {
    trace.x.map((x, i) => {
      allRows.push(x)
    })
  });
  const tableRows = allRows.filter((row, index, rows) => rows.indexOf(row) === index);

  const dateFormat = timeResolution === 'YEAR'
    ? { year: "numeric" }
    : { year: "numeric", month: "numeric", day: "numeric" };

  const tableData = [];
  tableRows.map((row, i) => {
    const rowObj = {};
    rowObj.label = data[0].xType === 'time' ? new Date(row).toLocaleString(language, dateFormat) : row;
    rowObj.values = [];
    data.map((trace, i) => {
      const indexOfX = trace.x.indexOf(row);
      trace.y[indexOfX] ? rowObj.values.push(trace.y[indexOfX]) : rowObj.values.push(null);
    });
    tableData.push(rowObj);
  });

  // Create table category headers
  const tableCategoryHeaders = [];
  const categoryCounts = data.map((trace, idx, traces) => {
    if(idx !== 0 && trace._parentName === traces[idx-1]?._parentName) {
      tableCategoryHeaders[tableCategoryHeaders.length - 1].count++;
      return tableCategoryHeaders[tableCategoryHeaders.length - 1].count;
    }
    else {
      tableCategoryHeaders.push({ name: trace._parentName, count: 1 });
      return 1;
    };
  });
  if (categoryCounts.find((count) => count > 1) === undefined) { tableCategoryHeaders.length = 0; };

  return (
    <CollapsibleTable>
      <Trigger>
        <TriggerButton
          color="link"
          onClick={toggle}
        >
          Indicator data as table
          <Icon name={isOpen ? 'angle-down' : 'angle-right'} />
        </TriggerButton>
      </Trigger>
      <Collapse isOpen={isOpen}>
      <TableContainer>
        <Table responsive bordered size="sm">
          <caption>{title}</caption>
          { tableCategoryHeaders.length > 0 && (
            <>
            <col />
            { tableCategoryHeaders.map((header, i) => (
              <colgroup key={i} span={header.count} />
            ))}
            </>
          )}
          <thead>
            {tableCategoryHeaders.length > 0 && (
              <tr>
                <th></th>
                {tableCategoryHeaders.map((header, i) => (
                  <th key={i} colspan={header.count} scope="colgroup">
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
