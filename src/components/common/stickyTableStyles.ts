import { css } from '@emotion/react';

export const STICKY_TABLE_NAME_COLUMN_CLASS = 'sticky-table-name-column';

type ThemeProps = {
  theme: {
    breakpointMd: string;
    spaces: {
      s050: string;
      s100: string;
    };
    themeColors: {
      white: string;
    };
  };
};

type MobileStickyTableStylesOptions = {
  scrollableColumnWidth?: string;
  stickyColumnWidth?: string;
  stickyColumnMinWidth?: string;
  stickyColumnMaxWidth?: string;
  containScrollableCellContent?: boolean;
};

export const mobileScrollableTableWrapperStyles = (props: ThemeProps) => css`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: ${props.theme.breakpointMd}) {
    max-height: calc(100vh - ${props.theme.spaces.s100});
    overflow: auto;
  }
`;

export const mobileStickyTableStyles = (
  props: ThemeProps,
  {
    scrollableColumnWidth,
    stickyColumnWidth = 'min(44vw, 11rem)',
    stickyColumnMinWidth = '8.5rem',
    stickyColumnMaxWidth = '11rem',
    containScrollableCellContent = false,
  }: MobileStickyTableStylesOptions = {}
) => css`
  @media (max-width: ${props.theme.breakpointMd}) {
    border-collapse: separate;
    border-spacing: 0;
    min-width: max-content;

    th,
    td {
      left: auto;
      z-index: auto;
      padding-left: ${props.theme.spaces.s050};
      padding-right: ${props.theme.spaces.s050};
    }

    ${scrollableColumnWidth &&
    css`
      th:not(.${STICKY_TABLE_NAME_COLUMN_CLASS}),
      td:not(.${STICKY_TABLE_NAME_COLUMN_CLASS}) {
        width: ${scrollableColumnWidth};
        min-width: ${scrollableColumnWidth};
        max-width: ${scrollableColumnWidth};
      }
    `}

    tbody td:not(.${STICKY_TABLE_NAME_COLUMN_CLASS}) {
      position: static !important;
    }

    th:not(.${STICKY_TABLE_NAME_COLUMN_CLASS}) {
      white-space: normal;
      overflow-wrap: break-word;
      word-break: normal;
      hyphens: auto;
    }

    td:not(.${STICKY_TABLE_NAME_COLUMN_CLASS}) {
      white-space: normal;
      overflow-wrap: normal;
      word-break: normal;

      ${containScrollableCellContent &&
      css`
        hyphens: none;
        overflow: hidden;
      `}
    }

    ${containScrollableCellContent &&
    css`
      td:not(.${STICKY_TABLE_NAME_COLUMN_CLASS}) > * {
        max-width: 100%;
        min-width: 0;
        box-sizing: border-box;
      }

      td:not(.${STICKY_TABLE_NAME_COLUMN_CLASS}) * {
        max-width: 100%;
        white-space: normal;
        overflow-wrap: break-word;
        word-break: normal;
        hyphens: none;
      }
    `}

    thead th {
      position: sticky !important;
      top: -1px;
      z-index: 30 !important;
      background-color: ${props.theme.themeColors.white};
      background-clip: padding-box;
      box-shadow:
        0 -2px 0 ${props.theme.themeColors.white},
        0 2px 4px rgba(0, 0, 0, 0.08);
    }

    .${STICKY_TABLE_NAME_COLUMN_CLASS} {
      position: sticky !important;
      left: 0 !important;

      width: ${stickyColumnWidth};
      min-width: ${stickyColumnMinWidth};
      max-width: ${stickyColumnMaxWidth};

      white-space: normal;
      overflow-wrap: normal;
      word-break: normal;
      hyphens: auto;

      background-color: ${props.theme.themeColors.white};
      background-clip: padding-box;
    }

    thead .${STICKY_TABLE_NAME_COLUMN_CLASS} {
      z-index: 50 !important;
    }

    tbody .${STICKY_TABLE_NAME_COLUMN_CLASS} {
      z-index: 20 !important;
    }
  }
`;