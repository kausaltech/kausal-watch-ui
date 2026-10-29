'use client';

import { type MouseEvent, type RefObject, useId, useState } from 'react';

import { Box, Button, Menu, MenuItem } from '@mui/material';

import { useTranslations } from 'next-intl';
import { ChevronDown, FiletypePng } from 'react-bootstrap-icons';

import type { ChartHandle } from '@common/components/Chart';

import Icon from '@/components/common/Icon';

function saveDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

type Props = {
  chartRef: RefObject<ChartHandle | null>;
  /** Without the extension */
  filename: string;
};

/**
 * Downloads a chart as a PNG. An HTML button rather than the ECharts
 * toolbox, which draws on the canvas and can't take keyboard focus.
 * Styled like the page's PDF download (ExportActionPdfButton).
 */
export default function ChartDownloadButton({ chartRef, filename }: Props) {
  const t = useTranslations();
  const menuId = useId();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownloadPng = () => {
    handleClose();
    // The background defaults to the chart option's backgroundColor
    const dataUrl = chartRef.current?.getDataURL({ type: 'png', pixelRatio: 2 });
    if (dataUrl) saveDataUrl(dataUrl, `${filename}.png`);
  };

  return (
    // Right-aligned, whether alone under the chart or at the end of the
    // data table toggle's row
    <Box className="d-print-none" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button
        variant="text"
        // Small, like the data table toggle beside it
        size="small"
        onClick={handleOpen}
        aria-haspopup="menu"
        aria-controls={anchorEl ? menuId : undefined}
        aria-expanded={anchorEl ? 'true' : undefined}
        // The theme's icon, as on the data table toggle
        startIcon={<Icon name="download" width="14px" height="14px" />}
        endIcon={<ChevronDown size={12} />}
        // The common Button's small font size, as on the toggle
        sx={{
          textTransform: 'none',
          px: 0,
          minWidth: 0,
          fontWeight: 'normal',
          fontSize: '0.75rem',
          // MUI's 8px icon gap is wide for the small text
          '& .MuiButton-startIcon': { mr: 0.5 },
        }}
      >
        {t('download')}
      </Button>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* Dense, to suit the small button */}
        <MenuItem dense onClick={handleDownloadPng}>
          <FiletypePng style={{ marginRight: '0.5rem' }} />
          {t('download-chart-png')}
        </MenuItem>
      </Menu>
    </Box>
  );
}
