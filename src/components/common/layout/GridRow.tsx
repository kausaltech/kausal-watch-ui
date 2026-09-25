import Grid, { type GridProps } from '@mui/material/Grid';

/** Horizontal gutter between columns, matching Bootstrap's `$grid-gutter-width`. */
export const GRID_GUTTER = '1.5rem';

/** Responsive column sizing props, the MUI counterpart of reactstrap's `ColProps`. */
export type ColumnProps = Pick<GridProps, 'size' | 'offset'>;

type GridRowProps = Omit<GridProps, 'container'>;

/**
 * A `Grid` container spaced like a Bootstrap `.row`: columns are separated by
 * `GRID_GUTTER` and wrapped rows sit flush against each other.
 *
 * Children are plain MUI `Grid` items. Unlike a Bootstrap column, an item
 * without a `size` at a breakpoint takes its content width, so give columns an
 * explicit `xs` size (usually 12) when they have larger breakpoint sizes.
 */
export default function GridRow({
  columnSpacing = GRID_GUTTER,
  rowSpacing = 0,
  ...props
}: GridRowProps) {
  return <Grid container columnSpacing={columnSpacing} rowSpacing={rowSpacing} {...props} />;
}
