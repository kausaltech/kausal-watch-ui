import DataTable from '@/components/common/DataTable';

const ActionLinksBlock = () => {
  const mockBudget = {
    title: 'Budjetti',
    headers: ['EUR', '2025', '2026', '2027'],
    data: [
      ['Investinnit', '', '', ''],
      ['Tulot ja säästöt', '-', '-', '-'],
      ['Menot', '1530000', '1530000', '1530000'],
      ['Käyttötalous', '', '', ''],
      ['Tulot', '-', '-', '-'],
      ['Menot', '123000', '123000', '123000'],
      ['Yhteensä', '1646000', '1646000', '1646000'],
    ],
  };

  return (
    <>
      <h3>Budjetti</h3>
      <DataTable
        title={mockBudget.title}
        headers={mockBudget.headers}
        data={mockBudget.data}
      />
    </>
  );
};

export default ActionLinksBlock;
