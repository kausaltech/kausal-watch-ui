import React from 'react';

import MuiContainer from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import type { Breakpoint as MuiBreakpoint, Theme } from '@mui/material/styles';

/*
 * Container, Row and Col with reactstrap's API, on MUI's Container and Grid.
 *
 * Container is MUI's, with MUI's gutters. Like MUI's `fixed` Container it is
 * capped at each breakpoint's width, but only from lg, so it stays full width
 * on phones and tablets.
 *
 * MUI's Grid (with no spacing) computes the responsive column widths and
 * offsets, which are the same percentages as Bootstrap's at the same
 * breakpoints. The elements keep Bootstrap's `container` and `row` classes as
 * styling hooks, and Bootstrap's CSS still supplies the row's negative margins,
 * the columns' padding and the `gy-*` gutters. When Bootstrap's CSS is removed,
 * move those rules in here.
 */

const classes = (...names: (string | false | null | undefined)[]) =>
  names.filter(Boolean).join(' ') || undefined;

const BREAKPOINTS = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
type Breakpoint = (typeof BREAKPOINTS)[number];

type ColumnSize = boolean | number | string;

/** One breakpoint's column spec, as in reactstrap. */
export type ColumnProps =
  ColumnSize | { size?: ColumnSize; offset?: number | string; order?: number | string };

export type ColProps = React.HTMLAttributes<HTMLElement> & {
  [key in Breakpoint]?: ColumnProps;
} & {
  tag?: React.ElementType;
};

type GridSize = number | 'auto' | 'grow';

const toGridSize = (size: ColumnSize): GridSize | undefined => {
  if (size === true || size === '') return 'grow';
  if (size === false) return undefined;
  if (size === 'auto') return 'auto';
  const n = Number(size);
  return Number.isFinite(n) ? n : undefined;
};

/** Translates reactstrap's breakpoint props to MUI Grid's `size` and `offset`. */
function toGridProps(props: Partial<Record<Breakpoint, ColumnProps>>) {
  const size: Partial<Record<Breakpoint, GridSize>> = {};
  const offset: Partial<Record<Breakpoint, number>> = {};
  const order: Partial<Record<Breakpoint, number>> = {};
  let hasAny = false;

  for (const bp of BREAKPOINTS) {
    const value = props[bp];
    if (value === undefined || value === null) continue;
    hasAny = true;
    if (typeof value === 'object') {
      if (value.size !== undefined) {
        const s = toGridSize(value.size);
        if (s !== undefined) size[bp] = s;
      }
      if (value.offset !== undefined && value.offset !== '') offset[bp] = Number(value.offset);
      if (value.order !== undefined && value.order !== '') order[bp] = Number(value.order);
    } else {
      const s = toGridSize(value);
      if (s !== undefined) size[bp] = s;
    }
  }

  // A Col without any breakpoint props is Bootstrap's `.col`: equal-width.
  if (!hasAny) size.xs = 'grow';

  return { size, offset, order };
}

export const Col = React.forwardRef<HTMLElement, ColProps>(function Col(
  { xs, sm, md, lg, xl, tag, className, style, ...props },
  ref
) {
  const { size, offset, order } = toGridProps({ xs, sm, md, lg, xl });
  const hasOrder = Object.keys(order).length > 0;
  return (
    <Grid
      ref={ref}
      component={tag ?? 'div'}
      size={size}
      offset={offset}
      className={className}
      style={style}
      sx={hasOrder ? { order } : undefined}
      {...props}
    />
  );
});

type RowProps = React.HTMLAttributes<HTMLElement> & {
  tag?: React.ElementType;
};

export const Row = React.forwardRef<HTMLElement, RowProps>(function Row(
  { tag, className, ...props },
  ref
) {
  return (
    <Grid
      ref={ref}
      container
      spacing={0}
      component={tag ?? 'div'}
      className={classes('row', className)}
      {...props}
    />
  );
});

// The breakpoints at which the container is capped, at the breakpoint's width
const CONTAINER_CAPS = ['lg', 'xl'] as const satisfies readonly MuiBreakpoint[];

/** Caps from the `from` breakpoint up; smaller screens get the full width. */
function containerMaxWidth(theme: Theme, from: MuiBreakpoint | undefined) {
  const start = from ? theme.breakpoints.values[from] : 0;
  return Object.fromEntries(
    CONTAINER_CAPS.filter((bp) => theme.breakpoints.values[bp] >= start).map((bp) => [
      bp,
      theme.breakpoints.values[bp],
    ])
  );
}

type ContainerProps = React.HTMLAttributes<HTMLElement> & {
  /** `true` for full width, or a breakpoint (such as `lg`) below which it is full width */
  fluid?: boolean | MuiBreakpoint;
  tag?: React.ElementType;
};

export const Container = React.forwardRef<HTMLElement, ContainerProps>(function Container(
  { fluid, tag, className, ...props },
  ref
) {
  const containerClass =
    fluid === true ? 'container-fluid' : fluid ? `container-${fluid}` : 'container';
  return (
    <MuiContainer
      ref={ref}
      component={tag ?? 'div'}
      maxWidth={false}
      sx={
        fluid === true
          ? undefined
          : (theme) => ({ maxWidth: containerMaxWidth(theme, fluid || undefined) })
      }
      className={classes(className, containerClass)}
      {...props}
    />
  );
});
