import { useState } from 'react';

import styled from '@emotion/styled';

import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

import { usePlan } from '@/context/plan';

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.graphColors.red070};
  font-size: ${({ theme }) => theme.fontSizeSm};
  margin-top: ${({ theme }) => theme.spaces.s050};
`;

type ExportFormat = 'csv' | 'xlsx';

type Props = {
  actions: { id: string }[];
};

function getFilename(contentDisposition: string | null, format: ExportFormat) {
  const match = contentDisposition?.match(/filename="([^"]+)"/);
  return match?.[1] ?? `actions.${format}`;
}

function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function ActionStatusExport({ actions }: Props) {
  const t = useTranslations();
  const plan = usePlan();
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Without an ID token the export route cannot authenticate the user to the backend.
  const canExportAllFields = session.status === 'authenticated' && !!session.data?.idToken;

  // Download through our own server, which authenticates to the backend with the session's ID token.
  const handleExport = async (format: ExportFormat, allFields = false) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/export-actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: plan.identifier,
          actions: actions.map(({ id }) => id),
          format,
          allFields,
        }),
      });
      if (response.status === 401) {
        setError(t('export-sign-in-again'));
        return;
      }
      if (!response.ok) {
        setError(t('export-failed'));
        return;
      }
      const filename = getFilename(response.headers.get('Content-Disposition'), format);
      saveBlob(await response.blob(), filename);
    } catch (err) {
      console.error('Action export failed:', err);
      setError(t('export-failed'));
    } finally {
      setLoading(false);
    }
  };

  const exportItem = (format: ExportFormat, allFields = false) => (
    <DropdownItem onClick={() => void handleExport(format, allFields)}>
      {format === 'xlsx' ? 'Excel' : 'CSV'}
    </DropdownItem>
  );

  return (
    <div>
      <UncontrolledDropdown>
        <DropdownToggle caret disabled={loading}>
          {t('export')}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>{t('export-action-count', { count: actions.length })}</DropdownItem>
          {canExportAllFields && (
            <>
              <DropdownItem divider />
              <DropdownItem header>{t('export-visible-columns')}</DropdownItem>
            </>
          )}
          {exportItem('xlsx')}
          {exportItem('csv')}
          {canExportAllFields && (
            <>
              <DropdownItem divider />
              <DropdownItem header>{t('export-all-columns')}</DropdownItem>
              {exportItem('xlsx', true)}
              {exportItem('csv', true)}
            </>
          )}
        </DropdownMenu>
      </UncontrolledDropdown>
      {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
    </div>
  );
}
