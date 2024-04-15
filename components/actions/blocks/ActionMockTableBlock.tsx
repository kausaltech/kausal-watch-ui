import DataTable from '@/components/common/DataTable';
import styled from 'styled-components';

const ActionContentContainer = styled.div`
  > div {
    margin-left: 0 !important;
  }
`;

const ActionLinksBlock = () => {
  const mockBudget = {
    title: 'Budjetti',
    headers: ['EUR', '2025', '2026', '2027'],
    data: [
      ['Investoinnit', '', '', ''],
      ['Tulot ja säästöt', '-', '-', '-'],
      ['Menot', '1530000', '1530000', '1530000'],
      ['Käyttötalous', '', '', ''],
      ['Tulot', '-', '-', '-'],
      ['Menot', '123000', '123000', '123000'],
      ['Yhteensä', '1646000', '1646000', '1646000'],
    ],
  };

  return (
    <ActionContentContainer>
      <DataTable
        title={mockBudget.title}
        headers={mockBudget.headers}
        data={mockBudget.data}
      />
    </ActionContentContainer>
  );
};

export default ActionLinksBlock;
