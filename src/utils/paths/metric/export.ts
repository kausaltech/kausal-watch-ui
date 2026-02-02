import dayjs from 'dayjs';
import type { Font, Style } from 'exceljs';

import { slugify } from '@/common/utils';

import { createTable } from '../metric-slice';
import { flatten, sliceBy } from './slicing';
import type { ExportOptions, ParsedMetric, SliceConfig, TableData } from './types';

/**
 * Create a filename for the export.
 */
function createFilename(metricName: string, tableTitle?: string): string {
  const ts = dayjs().format('YYYY-MM-DD_HHmm');
  return tableTitle ? slugify(tableTitle) : `${metricName || 'placeholder'}_${ts}`;
}

/**
 * Download data as CSV.
 */
function downloadCsv(filename: string, table: TableData): void {
  const delimiter = ';';
  const lines = [
    table.header.map((h) => h.label),
    ...table.rows.map((row) =>
      table.header.map((hdr) => {
        const val = row[hdr.key];
        if (val === null) return '';
        if (typeof val === 'number') return parseFloat(val.toPrecision(2));
        return `"${String(val).replace(/"/g, '""')}"`;
      })
    ),
  ].map((row) => row.join(delimiter));

  const csvAsString = lines.join('\r\n');
  // BOM support for special characters in Excel
  const byteOrderMark = '\ufeff';
  const blob = new Blob([byteOrderMark, csvAsString], {
    type: 'text/csv;charset=utf-8;',
  });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Download data as Excel file.
 */
async function downloadXlsx(
  filename: string,
  metricName: string,
  table: TableData,
  tableTitle?: string
): Promise<void> {
  const ExcelJS = await import('exceljs');
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet('Results');

  const header = table.header.map((h) => h.label);
  const rows = table.rows.map((row) => table.header.map((hdr) => row[hdr.key]));

  const tableColumns = header.map((label, idx) => ({
    name: label.toString(),
    filterButton: idx === 0,
  }));

  const tb = ws.addTable({
    name: 'ResultsTable',
    ref: 'A2',
    headerRow: true,
    style: {
      showRowStripes: true,
      theme: 'TableStyleLight1',
    },
    columns: tableColumns,
    rows: rows,
  });
  tb.commit();

  const fontConfig: Partial<Font> = {
    name: 'Calibri',
  };

  const firstRow = ws.getRow(1);
  if (header[0] !== metricName) {
    firstRow.getCell(1).value = tableTitle ?? metricName;
  }
  firstRow.font = { ...fontConfig };

  const lastCol = ws.lastColumn;
  if (lastCol) {
    const lastColLetter = String.fromCharCode(64 + lastCol.number);
    ws.mergeCells('A1:' + lastColLetter + '1');
  }

  const hdrRow = ws.getRow(2);
  hdrRow.font = {
    ...fontConfig,
    bold: true,
  };

  ws.views.push({
    state: 'frozen',
    ySplit: 2,
    xSplit: 1,
  });

  ws.columns.forEach((col, idx) => {
    const style: Partial<Style> = {
      font: { ...fontConfig },
    };
    if (idx === table.forecastFromColumn) {
      style.border = {
        left: {
          style: 'mediumDashed',
          color: {
            argb: '#000000',
          },
        },
      };
    }
    if (idx >= table.forecastFromColumn) {
      style.font!.italic = true;
    }
    col.style = style;
  });

  const buf = await wb.xlsx.writeBuffer();
  const blob = new Blob([buf], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.xlsx`;
  link.click();
  URL.revokeObjectURL(link.href);
}

/**
 * Download metric data as CSV or Excel file.
 *
 * @param metric - The parsed metric
 * @param config - Slice configuration
 * @param format - Export format ('xlsx' or 'csv')
 * @param options - Additional export options
 */
export async function downloadData(
  metric: ParsedMetric,
  config: SliceConfig,
  format: 'xlsx' | 'csv',
  options?: ExportOptions
): Promise<void> {
  const { years, tableTitle, labels } = options ?? {};

  // Get sliced data
  let sliceData;
  if (config.dimensionId) {
    sliceData = sliceBy(metric, config.dimensionId, false, config.categories, false, years);
  } else {
    sliceData = flatten(metric, config.categories, years);
  }

  if (!sliceData) return;

  const filename = createFilename(metric.name, tableTitle);
  const table = createTable(sliceData, years, labels);

  if (format === 'csv') {
    downloadCsv(filename, table);
  } else {
    await downloadXlsx(filename, metric.name, table, tableTitle);
  }
}
