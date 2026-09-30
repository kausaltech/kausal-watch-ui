import React from 'react';

type TableProps = React.TableHTMLAttributes<HTMLTableElement> & {
  /** Highlight rows on hover. */
  hover?: boolean;
  /** Borders on all sides of the table and cells. */
  bordered?: boolean;
  /** Compact cell padding. */
  size?: 'sm';
  /** Wrap the table in a horizontally scrolling container. */
  responsive?: boolean;
};

/**
 * A plain `<table>` with Bootstrap's table classes, which give it its styling.
 * Parent components style it through these classes too.
 */
const Table = React.forwardRef<HTMLTableElement, TableProps>(function Table(
  { hover = false, bordered = false, size, responsive = false, className, ...props },
  ref
) {
  const classes = [
    'table',
    hover && 'table-hover',
    bordered && 'table-bordered',
    size && `table-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const table = <table ref={ref} className={classes} {...props} />;

  return responsive ? <div className="table-responsive">{table}</div> : table;
});

export default Table;
