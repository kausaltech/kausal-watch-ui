import { Box, FormControl, MenuItem, Select } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { useTranslations } from 'next-intl';
import { BarChartLineFill, InfoCircleFill, PieChartFill, Table } from 'react-bootstrap-icons';

// Ported from kausal-paths-ui (src/components/general/Outcome/NodeViewSelector.tsx),
// without its link to the node page, which watch-ui doesn't have.

const StyledMenuItem = styled(MenuItem)`
  padding: 0.5rem 1rem;

  svg.bi {
    margin-right: 0.5rem;
    fill: ${({ theme }) => theme.textColor.tertiary};
  }
`;

export type NodeView = 'year' | 'graph' | 'table' | 'info';

type NodeViewSelectorProps = {
  idPrefix: string;
  activeTabId: NodeView;
  setActiveTabId: (tabId: NodeView) => void;
  showDistribution: boolean;
  disableDistribution: boolean;
  showDetails: boolean;
};

function useNodeViewItems({
  showDistribution,
  disableDistribution,
  showDetails,
}: Pick<NodeViewSelectorProps, 'showDistribution' | 'disableDistribution' | 'showDetails'>) {
  const t = useTranslations();
  const theme = useTheme();
  const iconProps = {
    'aria-hidden': true,
    focusable: 'false',
    color: theme.textColor.tertiary,
  } as const;

  return [
    {
      id: 'year' as const,
      icon: <PieChartFill {...iconProps} />,
      label: t('distribution'),
      show: showDistribution,
      disabled: disableDistribution,
    },
    {
      id: 'graph' as const,
      icon: <BarChartLineFill {...iconProps} />,
      label: t('time-series'),
      show: true,
      disabled: false,
    },
    {
      id: 'table' as const,
      icon: <Table {...iconProps} />,
      label: t('table'),
      show: true,
      disabled: false,
    },
    {
      id: 'info' as const,
      icon: <InfoCircleFill {...iconProps} />,
      label: t('details'),
      show: showDetails,
      disabled: false,
    },
  ].filter((item) => item.show);
}

/** Switches an outcome node between its views. */
const NodeViewSelector = ({
  idPrefix,
  activeTabId,
  setActiveTabId,
  showDistribution,
  disableDistribution,
  showDetails,
}: NodeViewSelectorProps) => {
  const t = useTranslations();
  const items = useNodeViewItems({ showDistribution, disableDistribution, showDetails });

  const handleChange = (event: SelectChangeEvent<NodeView>) => {
    const tabId = event.target.value;
    setActiveTabId(tabId);
    // A11y: after switching the view, move focus to the new region
    requestAnimationFrame(() => {
      document.getElementById(`${idPrefix}-panel-${tabId}`)?.focus();
    });
  };

  return (
    <Box>
      <FormControl size="small">
        <Select<NodeView>
          id={`${idPrefix}-view-select`}
          value={activeTabId}
          onChange={handleChange}
          inputProps={{ 'aria-label': t('outcome-tabs-label') }}
          sx={{
            backgroundColor: 'transparent',
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
          }}
          renderValue={(value) => {
            const item = items.find((i) => i.id === value);
            return (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {item?.icon}
                {item?.label}
              </Box>
            );
          }}
          size="small"
        >
          {items.map((item) => (
            <StyledMenuItem key={item.id} value={item.id} disabled={item.disabled}>
              {item.icon} {item.label}
            </StyledMenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default NodeViewSelector;
