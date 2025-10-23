import { useTranslations } from 'next-intl';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

import { usePlan } from '@/context/plan';

export default function ActionStatusExport({ actions }) {
  const t = useTranslations();
  const plan = usePlan();
  const url = plan.actionReportExportViewUrl;
  const actionIds = actions.map(({ id }) => id).join(',');
  const csvExportUrl = `${url}?actions=${actionIds}&format=csv`;
  const excelExportUrl = `${url}?actions=${actionIds}&format=xlsx`;
  return (
    <UncontrolledDropdown>
      <DropdownToggle caret>{t('export')}</DropdownToggle>
      <DropdownMenu>
        <DropdownItem href={excelExportUrl}>Excel</DropdownItem>
        <DropdownItem href={csvExportUrl}>CSV</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}
