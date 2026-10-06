import type React from 'react';

import MuiCollapse from '@mui/material/Collapse';
import type { Breakpoint } from '@mui/material/styles';

import styled from '@emotion/styled';

import { Container } from '@/components/common/layout/LayoutGrid';

/*
 * Navigation parts with reactstrap's API and markup. They keep Bootstrap's
 * navbar and nav classes (`navbar`, `navbar-expand-md`, `navbar-nav`,
 * `nav-item`, `navbar-collapse`, …), which give them their layout and which
 * parent components style through.
 */

const classes = (...names: (string | false | null | undefined)[]) =>
  names.filter(Boolean).join(' ') || undefined;

/* Navbar */

type NavbarProps = React.HTMLAttributes<HTMLElement> & {
  /** Breakpoint from which the navbar is expanded, or `true` for always */
  expand?: boolean | 'sm' | 'md' | 'lg' | 'xl';
  /** `top` or `bottom` to fix the navbar to the viewport */
  fixed?: string;
  /** Wrap the content in a Container: `true` for a capped one, `fluid` for full width, or a breakpoint below which it is full width */
  container?: boolean | 'fluid' | Breakpoint;
};

export function Navbar({
  expand = false,
  fixed,
  container = 'fluid',
  className,
  children,
  ...props
}: NavbarProps) {
  const expandClass = expand === true ? 'navbar-expand' : expand && `navbar-expand-${expand}`;
  return (
    <nav
      className={classes(className, 'navbar', expandClass, fixed && `fixed-${fixed}`)}
      {...props}
    >
      {container ? (
        <Container fluid={container === true ? undefined : container === 'fluid' || container}>
          {children}
        </Container>
      ) : (
        children
      )}
    </nav>
  );
}

/* Nav and NavItem */

type NavProps = React.HTMLAttributes<HTMLUListElement> & {
  /** A navbar's nav (`.navbar-nav`) rather than a plain `.nav` */
  navbar?: boolean;
};

export function Nav({ navbar, className, ...props }: NavProps) {
  return <ul className={classes(className, navbar ? 'navbar-nav' : 'nav')} {...props} />;
}

type NavItemProps = React.LiHTMLAttributes<HTMLLIElement> & {
  active?: boolean;
};

export function NavItem({ active, className, ...props }: NavItemProps) {
  return <li className={classes(className, 'nav-item', active && 'active')} {...props} />;
}

/* NavbarCollapse */

// MUI's Collapse animates the menu open on small screens. From md up the
// navbar is expanded: the collapse is forced open, and its wrappers are taken
// out of the layout so the navs stay direct flex items of `.navbar-collapse`.
// No !important: MUI sets the closed state through its class styles, which
// these override, and callers can still override these.
const StyledCollapse = styled(MuiCollapse)`
  ${({ theme }) => theme.breakpoints.up('md')} {
    height: auto;
    min-height: 0;
    visibility: visible;
    overflow: visible;

    > .MuiCollapse-wrapper,
    > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner {
      display: contents;
    }
  }
`;

type NavbarCollapseProps = {
  isOpen: boolean;
  className?: string;
  children?: React.ReactNode;
};

/** reactstrap's `<Collapse navbar>`: the menu that collapses on small screens. */
export function NavbarCollapse({ isOpen, className, children }: NavbarCollapseProps) {
  return (
    <StyledCollapse in={isOpen} className={classes(className, 'navbar-collapse', isOpen && 'show')}>
      {children}
    </StyledCollapse>
  );
}
