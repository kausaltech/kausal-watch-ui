import React from 'react';
import styled from 'styled-components';
import { Table } from 'reactstrap';

export interface DataTableProps {
  title: string;
  headers: string[];
  data: any[][];
}

const TableContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
  border-radius: 8px;
`;

const StyledTable = styled(Table)`
  margin: 0 auto;
  background-color: #f9f9f9;

  th,
  td {
    text-align: left;
  }
`;

const DataTable: React.FC<DataTableProps> = ({ title, headers, data }) => {
  return (
    <TableContainer>
      {title && <h2>{title}</h2>}
      <StyledTable bordered>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default DataTable;
