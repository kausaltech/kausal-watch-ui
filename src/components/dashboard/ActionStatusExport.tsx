import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

import { usePlan } from '@/context/plan';

type Props = {
  actions: { id: string }[];
};

export default function ActionStatusExport({ actions }: Props) {
  const t = useTranslations();
  const plan = usePlan();
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

  const url = plan.actionReportExportViewUrl;
  const actionIds = actions.map(({ id }) => id).join(',');
  const exportUrl = (format: 'csv' | 'xlsx', allFields = false) =>
    `${url}?actions=${actionIds}&format=${format}${allFields ? '&fields=all' : ''}`;

  return (
    <UncontrolledDropdown>
      <DropdownToggle caret>{t('export')}</DropdownToggle>
      <DropdownMenu>
        {isAuthenticated && <DropdownItem header>{t('export-current-view')}</DropdownItem>}
        <DropdownItem href={exportUrl('xlsx')}>Excel</DropdownItem>
        <DropdownItem href={exportUrl('csv')}>CSV</DropdownItem>
        {isAuthenticated && (
          <>
            <DropdownItem divider />
            <DropdownItem header>{t('export-all-action-data')}</DropdownItem>
            <DropdownItem href={exportUrl('xlsx', true)}>Excel</DropdownItem>
            <DropdownItem href={exportUrl('csv', true)}>CSV</DropdownItem>
          </>
        )}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}
