'use client';

import React, { useCallback, useState } from 'react';

import { usePathname } from 'next/navigation';

import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useLocale, useTranslations } from 'next-intl';

import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';

const StyledButton = styled(Button)`
  @media print {
    display: none;
  }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const SpinnerIcon = styled.span`
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  ${css`
    animation: ${spin} 0.75s linear infinite;
  `}
`;

export default function ExportActionPdfButton() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/export-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: pathname, locale }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || 'PDF export failed');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'export.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'PDF export failed';
      setError(message);
      console.error('PDF export failed:', err);
    } finally {
      setLoading(false);
    }
  }, [pathname, locale]);

  return (
    <div>
      <StyledButton color="outline-dark" size="sm" onClick={handleExport} disabled={loading}>
        {loading ? <SpinnerIcon className="me-2" /> : <Icon name="download" className="me-2" />}
        {t('export-pdf')}
      </StyledButton>
      {error && (
        <div className="text-danger mt-1" style={{ fontSize: '0.85em' }}>
          {error}
        </div>
      )}
    </div>
  );
}
