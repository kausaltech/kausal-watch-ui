'use client';

import React, { useCallback, useState } from 'react';

import { usePathname } from 'next/navigation';

import { Button, Menu, MenuItem } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronDown, FilePdf } from 'react-bootstrap-icons';

export default function ExportActionPdfButton() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExport = useCallback(async () => {
    handleClose();
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
        throw new Error(data?.error || t('pdf-export-failed'));
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
      const message = err instanceof Error ? err.message : t('pdf-export-failed');
      setError(message);
      console.error('PDF export failed:', err);
    } finally {
      setLoading(false);
    }
  }, [pathname, locale, t]);

  return (
    <div className="d-print-none">
      <Button
        variant="text"
        size="medium"
        onClick={handleOpen}
        disabled={loading}
        startIcon={loading ? <CircularProgress size={14} color="inherit" /> : undefined}
        endIcon={<ChevronDown />}
        sx={{ textTransform: 'none', px: 0, fontWeight: 'normal' }}
      >
        {t('download')}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleExport}>
          <FilePdf style={{ marginRight: '0.5rem' }} />
          {t('download-page-as-pdf')}
        </MenuItem>
      </Menu>
      {error && (
        <div className="text-danger mt-1" style={{ fontSize: '0.85em' }}>
          {error}
        </div>
      )}
    </div>
  );
}
