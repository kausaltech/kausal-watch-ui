import { useTranslation } from 'common/i18n';

async function exportActions(t, actions) {
  const Excel = (await import('exceljs')).default;
  const fileSaver = (await import('file-saver')).default;
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet(t('actions'))
  worksheet.columns = [
    { header: t('actions:action-identifier'), key: 'id', width: 10 },
    { header: t('common:name'), key: 'name', width: 50 },
  ];
  console.log(actions);
  actions.forEach((act) => {
    worksheet.addRow([act.identifier, act.name]);
    // FIXME: Add rest of the columns
  });

  const xls64 = await workbook.xlsx.writeBuffer({ base64: true });
  const today = new Date().toISOString().split('T')[0];
  fileSaver.saveAs(
    new Blob([xls64], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
    `${t('actions')}-${today}.xlsx`,
  );
}

export default function ActionStatusExport({ actions }) {
  const { t } = useTranslation(['common', 'actions']);
  const handleExport = async () => {
    await exportActions(t, actions);
  };

  return <button onClick={handleExport}>Export</button>;
}
