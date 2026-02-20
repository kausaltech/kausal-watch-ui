import React, { useMemo, useState } from 'react';

import styled from '@emotion/styled';
import { useTranslations } from 'next-intl';
import { Button, Collapse, Table } from 'reactstrap';

import { IndicatorTimeResolution } from '@/common/__generated__/graphql';
import { beautifyValue } from '@/common/data/format';
import dayjs from '@/common/dayjs';
import Icon from '@/components/common/Icon';

type XValue = string | number | Date;

type Trace = {
  name: string;
  _parentName?: string | null;
  xType?: 'time' | 'category';
  x: XValue[];
  y: Array<number | null>;
};

type Spec = { unit?: string | null };

type GraphAsTableProps = {
  data: Trace[];
  goalTraces: Trace[];
  timeResolution: IndicatorTimeResolution;
  specification: Spec;
  title?: string;
  language: string;
};

const CollapsibleTable = styled.div`
  background-color: ${(p) => p.theme.themeColors.white};
  margin-bottom: ${(p) => p.theme.spaces.s100};
`;

const TableContainer = styled.div`
  padding: ${(p) => `${p.theme.spaces.s200} ${p.theme.spaces.s050} ${p.theme.spaces.s100}`};
  background-color: ${(p) => p.theme.cardBackground.primary};
  table {
    font-family: ${(p) => `${p.theme.fontFamilyContent}, ${p.theme.fontFamilyFallback}`};
    font-size: ${(p) => p.theme.fontSizeSm};
    line-height: 1.25;
    background-color: ${(p) => p.theme.themeColors.white};
    width: auto;
    min-width: 480px;
    margin: 0 auto;
    > caption {
      text-align: center;
      color: ${(p) => p.theme.themeColors.black};
    }
    td,
    th {
      text-align: right;
    }
  }
`;
const TriggerButton = styled(Button)`
  text-decoration: none;
  color: ${(p) => p.theme.linkColor};
  padding-left: 0;
  &:hover {
    text-decoration: underline;
    color: ${(p) => p.theme.linkColor};
  }
`;

const normalize = (v: XValue): string => String(v);

function formatLabel(
  raw: XValue,
  isTime: boolean,
  timeResolution: IndicatorTimeResolution
): string {
  if (!isTime) return String(raw);
  const d = dayjs.utc(raw as string | number | Date);
  if (!d.isValid()) return String(raw);
  switch (timeResolution) {
    case IndicatorTimeResolution.Year:
      return d.format('YYYY');
    case IndicatorTimeResolution.Month:
      return d.format('YYYY-MM');
    case IndicatorTimeResolution.Day:
    default:
      return d.format('YYYY-MM-DD');
  }
}

function GraphAsTable({
  data,
  goalTraces,
  timeResolution,
  specification,
  title,
  language,
}: GraphAsTableProps) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const isTime = data?.[0]?.xType === 'time';

  const { tableData, tableCategoryHeaders } = useMemo(() => {
    // Collect all x values from all traces and filter out duplicates
    const allXValues: XValue[] = [
      ...data.flatMap((trace) => trace.x),
      ...goalTraces.flatMap((trace) => trace.x),
    ];
    const tableRows = Array.from(new Set(allXValues));

    // Sort rows by date if we are dealing with time series
    if (isTime) {
      tableRows.sort((a, b) =>
        dayjs(a as string | number | Date).diff(dayjs(b as string | number | Date))
      );
    }

    // Create table data row by row
    const tableData = tableRows.map((row) => {
      const key = normalize(row);
      const values: Array<number | null> = [];

      data.forEach((trace) => {
        const index = trace.x.map(normalize).indexOf(key);
        values.push(index !== -1 ? (trace.y[index] ?? null) : null);
      });

      goalTraces.forEach((trace) => {
        const index = trace.x.map(normalize).indexOf(key);
        values.push(index !== -1 ? (trace.y[index] ?? null) : null);
      });

      return {
        raw: row,
        label: formatLabel(row, isTime, timeResolution),
        values,
      };
    });

    // Check if there are dimensions and create table category headers for them
    const tableCategoryHeaders: Array<{ name?: string | null; count: number }> = [];
    const categoryCounts = data.map((trace, idx, traces) => {
      if (idx !== 0 && trace._parentName && trace._parentName === traces[idx - 1]?._parentName) {
        tableCategoryHeaders[tableCategoryHeaders.length - 1].count += 1;
        return tableCategoryHeaders[tableCategoryHeaders.length - 1].count;
      }
      tableCategoryHeaders.push({ name: trace._parentName, count: 1 });
      return 1;
    });
    if (!categoryCounts.some((count) => count > 1)) {
      tableCategoryHeaders.length = 0;
    }

    return { tableData, tableCategoryHeaders };
  }, [data, goalTraces, isTime, timeResolution]);

  return (
    <CollapsibleTable>
      <TriggerButton color="link" size="sm" onClick={toggle}>
        {isOpen ? t('graph-hideTable') : t('graph-showTable')}
        <Icon name={isOpen ? 'angle-down' : 'angle-right'} />
      </TriggerButton>

      <Collapse isOpen={isOpen}>
        <TableContainer>
          <Table responsive bordered size="sm">
            {title && <caption>{title}</caption>}
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
                    {trace.name.replace(`${trace._parentName ?? ''}, `, '')}
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
                  {row.values.map((value, j) => (
                    <td key={j}>{beautifyValue(value, language)}</td>
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
