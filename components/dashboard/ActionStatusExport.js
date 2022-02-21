import { useTranslation } from 'common/i18n';
import { cleanActionStatus } from 'common/preprocess';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

async function exportActions(t, actions, actionStatuses, fileFormat = 'excel') {
  const Excel = (await import('exceljs')).default;
  const fileSaver = (await import('file-saver')).default;
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet(t('actions'))
  worksheet.columns = [
    { header: t('actions:action-identifier'), key: 'id', width: 10 },
    { header: t('actions:action-name-title'), key: 'name', width: 50 },
    // TODO: i18n
    { header: 'Status', key: 'status', width: 20 },
    { header: t('actions:action-implementation-phase'), key: 'implementationPhase', width: 20 },
    { header: t('actions:action-last-updated'), key: 'lastUpdated', width: 15 },
    // TODO: i18n
    { header: 'On-time tasks', key: 'ontimeTasks', width: 10 },
    // TODO: i18n
    { header: 'Late tasks', key: 'lateTasks', width: 10 },
    // TODO: i18n
    { header: 'Completed tasks', key: 'completedTasks', width: 10 },
    { header: t('actions:action-tasks'), key: 'tasks', width: 10 },
    // TODO: i18n
    { header: 'Main responsible organization', key: 'mainResponsibleOrg', width: 20 },
    // TODO: i18n
    { header: 'Other responsible organizations', key: 'otherResponsibleOrgs', width: 20 },
  ];
  console.log(actions);
  actions.forEach((act) => {
    const status = cleanActionStatus(act, actionStatuses);
    let activePhaseName = act.implementationPhase?.name;
    if (status != null) {
      // FIXME: Duplicated logic from ActionPhase.js
      const inactive = ['cancelled', 'merged', 'postponed', 'completed'].includes(status.identifier);
      if (inactive) activePhaseName = status.name;
    }

    const tasks = act.tasks;
    let tasksCount = tasks.length;
    // FIXME: Duplicated logic from ActionStatusTable.js
    let ontimeTasks = 0;
    let lateTasks = 0;
    let completedTasks = 0;
    const nowDate = new Date();

    tasks.forEach((task) => {
      const taskDue = new Date(task.dueAt);
      switch (task.state) {
        case 'NOT_STARTED':
        case 'IN_PROGRESS':
          if (taskDue < nowDate) lateTasks += 1;
          else ontimeTasks += 1;
          break;
        case 'COMPLETED':
          completedTasks += 1;
          break;
        default:
          tasksCount -= 1;
      }
    });

    const responsibleOrgs = act.responsibleParties.map(({ organization }) => organization.name);
    const mainResponsibleOrg = responsibleOrgs.length > 0 ? responsibleOrgs[0] : null;
    const otherResponsibleOrgs = responsibleOrgs.slice(1);

    worksheet.addRow([
      act.identifier,
      act.name,
      status?.name,
      activePhaseName,
      new Date(act.updatedAt),
      ontimeTasks,
      lateTasks,
      completedTasks,
      tasksCount,
      mainResponsibleOrg,
      otherResponsibleOrgs.join(';'),
    ]);
  });

  const today = new Date().toISOString().split('T')[0];
  switch(fileFormat) {
    case 'excel':
      const xls64 = await workbook.xlsx.writeBuffer({ base64: true });
      fileSaver.saveAs(
        new Blob([xls64], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
        `${t('actions')}-${today}.xlsx`,
      );
      break;

    case 'csv':
      const csv64 = await workbook.csv.writeBuffer({ base64: true });
      fileSaver.saveAs(
        new Blob([csv64], { type: 'text/csv' }),
        `${t('actions')}-${today}.csv`,
      );
      break;

    default:
      throw new Error("Unknown file format");
  }
}

export default function ActionStatusExport({ actions, actionStatuses }) {
  const { t } = useTranslation(['common', 'actions']);
  const handleExport = async (format) => {
    await exportActions(t, actions, actionStatuses, format);
  };
  return (
    <UncontrolledDropdown>
      <DropdownToggle caret>
        { t('export') }
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={() => handleExport('excel')}>Excel</DropdownItem>
        <DropdownItem onClick={() => handleExport('csv')}>CSV</DropdownItem>
      </DropdownMenu>
   </UncontrolledDropdown>
  );
}
