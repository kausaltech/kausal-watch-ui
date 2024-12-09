import { usePlan } from 'context/plan';
import { useTranslations } from 'next-intl';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

export default function ActionStatusExport({ actions }) {
  const t = useTranslations();
  const plan = usePlan();
  const url = plan.actionReportExportViewUrl;
  const csvExportUrl = `${url}?format=csv`;
  const excelExportUrl = `${url}?format=xlsx`;
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
