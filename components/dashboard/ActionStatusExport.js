import { getActionTaskTermContext, getActionTermContext } from 'common/i18n';
import { cleanActionStatus } from 'common/preprocess';
import { usePlan } from 'context/plan';
import { useTranslations } from 'next-intl';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

async function exportActions(
  t,
  actions,
  actionStatuses,
  plan,
  fileFormat = 'excel'
) {
  const Excel = (await import('exceljs')).default;
  const fileSaver = (await import('file-saver')).default;
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet(
    t('actions', getActionTermContext(plan))
  );
  worksheet.columns = [
    { header: t('action-identifier'), key: 'id', width: 10 },
    {
      header: t('action-name-title', getActionTermContext(plan)),
      key: 'name',
      width: 50,
    },
    { header: t('status'), key: 'status', width: 20 },
    {
      header: t('action-implementation-phase'),
      key: 'implementationPhase',
      width: 20,
    },
    { header: t('action-last-updated'), key: 'lastUpdated', width: 15 },
    {
      header: t('tasks-on-time', getActionTaskTermContext(plan)),
      key: 'ontimeTasks',
      width: 10,
    },
    {
      header: t('tasks-late', getActionTaskTermContext(plan)),
      key: 'lateTasks',
      width: 10,
    },
    {
      header: t('tasks-completed', getActionTaskTermContext(plan)),
      key: 'completedTasks',
      width: 10,
    },
    {
      header: t('action-tasks', getActionTaskTermContext(plan)),
      key: 'tasks',
      width: 10,
    },
    {
      header: t('responsible-organizations-primary'),
      key: 'primaryResponsibleOrgs',
      width: 20,
    },
    {
      header: t('responsible-organizations-collaborator'),
      key: 'collaboratorResponsibleOrgs',
      width: 20,
    },
    {
      header: t('responsible-organizations-other'),
      key: 'otherResponsibleOrgs',
      width: 20,
    },
  ];
  actions.forEach((act) => {
    const status = cleanActionStatus(act, actionStatuses);
    // Remove any soft hyphens in action name (due to `hyphenated: true` when querying the name) as Excel renders
    // visible hyphens instead.
    const actionName = act.name?.replaceAll('­', '');
    let activePhaseName = act.implementationPhase?.name;
    if (status != null) {
      // FIXME: Duplicated logic from ActionPhase.js
      const inactive = [
        'cancelled',
        'merged',
        'postponed',
        'completed',
      ].includes(status.identifier);
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

    const getOrgName = ({ organization }) => organization.name;

    const parties = act.responsibleParties;
    const primaryResponsibleOrgs = parties
      .filter((p) => p.role === 'PRIMARY')
      .map(getOrgName);
    const collaboratorResponsibleOrgs = parties
      .filter((p) => p.role === 'COLLABORATOR')
      .map(getOrgName);
    const otherResponsibleOrgs = parties
      .filter((p) => p.role === null)
      .map(getOrgName);

    worksheet.addRow([
      act.identifier,
      actionName,
      status?.name,
      activePhaseName,
      new Date(act.updatedAt),
      ontimeTasks,
      lateTasks,
      completedTasks,
      tasksCount,
      primaryResponsibleOrgs.join(';'),
      collaboratorResponsibleOrgs.join(';'),
      otherResponsibleOrgs.join(';'),
    ]);
  });

  const today = new Date().toISOString().split('T')[0];
  switch (fileFormat) {
    case 'excel':
      const xls64 = await workbook.xlsx.writeBuffer({ base64: true });
      fileSaver.saveAs(
        new Blob([xls64], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }),
        `${t('actions', getActionTermContext(plan))}-${today}.xlsx`
      );
      break;

    case 'csv':
      const csv64 = await workbook.csv.writeBuffer({ base64: true });
      fileSaver.saveAs(
        new Blob([csv64], { type: 'text/csv' }),
        `${t('actions', getActionTermContext(plan))}-${today}.csv`
      );
      break;

    default:
      throw new Error('Unknown file format');
  }
}

export default function ActionStatusExport({ actions }) {
  const t = useTranslations();
  const plan = usePlan();
  const { actionStatuses } = plan;
  const handleExport = async (format) => {
    await exportActions(t, actions, actionStatuses, plan, format);
  };
  return (
    <UncontrolledDropdown>
      <DropdownToggle caret>{t('export')}</DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={() => handleExport('excel')}>Excel</DropdownItem>
        <DropdownItem onClick={() => handleExport('csv')}>CSV</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}
