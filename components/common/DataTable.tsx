import styled from 'styled-components';
import { Table } from 'reactstrap';

export interface DataTableProps {
  title: 'Budjetti';
  headers: ['EUR', '2025', '2026', '2027'];
  data: [
    ['Investinnit', '', '', ''],
    ['Tulot ja säästöt', '-', '-', '-'],
    ['Menot', '1530000', '1530000', '1530000'],
    ['Käyttötalous', '', '', ''],
    ['Tulot', '-', '-', '-'],
    ['Menot', '123000', '123000', '123000'],
    ['Yhteensä', '1646000', '1646000', '1646000']
  ];
}

const TableContainer = styled.div`
  max-width: ${(props) => props.theme.breakpointSm};
  background-color: ${({ theme }) => theme.themeColors.white};
  margin: ${(props) => props.theme.spaces.s100} auto;
  margin-bottom: ${(props) => props.theme.spaces.s600};
  padding: ${(props) => props.theme.spaces.s200} 0 0;
  border-collapse: collapse;
`;

const StyledTable = styled(Table)`
  margin: 0 auto;

  th,
  td {
    padding: 8px;
    text-align: left;
    vertical-align: top;
  }

  th {
    border-bottom: 1px solid ${(props) => props.theme.graphColors.grey040};
    color: ${(props) => props.theme.headingsColor};
  }
  td {
    border-bottom: none;
  }
  .bold {
    font-weight: ${(props) => props.theme.fontWeightBold};
  }
`;

const DataTable: React.FC = () => {
  const title = 'Budjetti';
  const headers = ['EUR', '2025', '2026', '2027'];
  const data = [
    ['Investinnit', '', '', ''],
    ['Tulot ja säästöt', '-', '-', '-'],
    ['Menot', '1530000', '1530000', '1530000'],
    ['Käyttötalous', '', '', ''],
    ['Tulot', '-', '-', '-'],
    ['Menot', '123000', '123000', '123000'],
    ['Yhteensä', '1646000', '1646000', '1646000'],
  ];
  return (
    <TableContainer>
      {title && <h3>{title}</h3>}
      <StyledTable>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex === data.length - 1 ? 'bold' : ''}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={
                    cellIndex === 0 && row.slice(1).every((cell) => !cell)
                      ? 'bold'
                      : ''
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default DataTable;
