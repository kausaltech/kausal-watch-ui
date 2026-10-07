import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Popper from '@mui/material/Popper';

/*
 * Dropdowns with reactstrap's API, markup and keyboard behaviour, on MUI's
 * ClickAwayListener and Popper. The markup keeps Bootstrap's dropdown classes
 * (`dropdown`, `dropdown-toggle`, `dropdown-menu`, `dropdown-item`, `show`),
 * which give it its look and which parent components style through.
 */

const classes = (...names: (string | false | null | undefined)[]) =>
  names.filter(Boolean).join(' ') || undefined;

type DropdownContextValue = {
  isOpen: boolean;
  toggle: () => void;
  inNavbar: boolean;
  toggleRef: React.RefObject<HTMLElement | null>;
  menuRef: React.RefObject<HTMLElement | null>;
  toggleEl: HTMLElement | null;
  setToggleEl: (el: HTMLElement | null) => void;
};

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdown() {
  const context = useContext(DropdownContext);
  if (!context) throw new Error('Dropdown parts must be used inside UncontrolledDropdown');
  return context;
}

const setRef = <T,>(ref: React.Ref<T> | undefined, value: T) => {
  if (typeof ref === 'function') ref(value);
  else if (ref) (ref as React.RefObject<T>).current = value;
};

/* Dropdown */

type UncontrolledDropdownProps = React.HTMLAttributes<HTMLElement> & {
  /** A dropdown in a Nav: renders an `li.nav-item` */
  nav?: boolean;
  /** A dropdown in a Navbar: the menu is positioned by CSS, not Popper */
  inNavbar?: boolean;
  /** A button group, as in UncontrolledButtonDropdown */
  group?: boolean;
};

export function UncontrolledDropdown({
  nav = false,
  inNavbar = false,
  group = false,
  className,
  children,
  onKeyDown,
  ...props
}: UncontrolledDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [toggleEl, setToggleEl] = useState<HTMLElement | null>(null);
  const toggleRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLElement | null>(null);
  const toggle = useCallback(() => setIsOpen((open) => !open), []);

  const context = useMemo(
    () => ({ isOpen, toggle, inNavbar, toggleRef, menuRef, toggleEl, setToggleEl }),
    [isOpen, toggle, inNavbar, toggleEl]
  );

  const getMenuItems = () =>
    Array.from(menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);

  // Keyboard handling, following reactstrap's Dropdown.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    onKeyDown?.(e);
    const target = e.target as HTMLElement;
    const isMenuItem = target.getAttribute('role') === 'menuitem';
    const isToggle = target === toggleRef.current;
    const { key } = e;
    const isLetter = key.length === 1 && /[a-z0-9]/i.test(key);
    if (/input|textarea/i.test(target.tagName) || (key === 'Tab' && !(isMenuItem || isToggle))) {
      return;
    }
    if ([' ', 'Enter', 'ArrowUp', 'ArrowDown', 'End', 'Home'].includes(key) || isLetter) {
      e.preventDefault();
    }

    if (isToggle) {
      if ([' ', 'Enter', 'ArrowUp', 'ArrowDown'].includes(key)) {
        if (!isOpen) setIsOpen(true);
        // ArrowUp starts from the last item, the other keys from the first
        const index = key === 'ArrowUp' ? -1 : 0;
        setTimeout(() => getMenuItems().at(index)?.focus());
      } else if (isOpen && key === 'Tab') {
        e.preventDefault();
        getMenuItems()[0]?.focus();
      } else if (isOpen && key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen && isMenuItem) {
      const items = getMenuItems();
      const index = items.indexOf(target);
      if (key === 'Tab' || key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
      } else if (key === ' ' || key === 'Enter') {
        target.click();
        toggleRef.current?.focus();
      } else if (key === 'ArrowUp' || (key === 'p' && e.ctrlKey)) {
        items[index !== 0 ? index - 1 : items.length - 1]?.focus();
      } else if (key === 'ArrowDown' || (key === 'n' && e.ctrlKey)) {
        items[index === items.length - 1 ? 0 : index + 1]?.focus();
      } else if (key === 'End') {
        items[items.length - 1]?.focus();
      } else if (key === 'Home') {
        items[0]?.focus();
      } else if (isLetter) {
        items.find((item) => item.textContent?.[0]?.toLowerCase() === key.toLowerCase())?.focus();
      }
    }
  };

  const Tag = nav ? 'li' : 'div';
  const root = (
    <Tag
      className={classes(
        group ? 'btn-group' : 'dropdown',
        nav && 'nav-item',
        isOpen && 'show',
        className
      )}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </Tag>
  );

  // Always rendered: wrapping the root only while open would remount the
  // dropdown on every toggle and lose focus.
  return (
    <DropdownContext.Provider value={context}>
      <ClickAwayListener onClickAway={() => isOpen && setIsOpen(false)}>{root}</ClickAwayListener>
    </DropdownContext.Provider>
  );
}

export function UncontrolledButtonDropdown(props: Omit<UncontrolledDropdownProps, 'group'>) {
  return <UncontrolledDropdown group {...props} />;
}

/* Toggle */

type DropdownToggleProps = React.HTMLAttributes<HTMLElement> & {
  /** Render as a nav link (`a.nav-link`) */
  nav?: boolean;
  /** Show Bootstrap's caret */
  caret?: boolean;
  /** Element to render instead of the default button */
  tag?: React.ElementType;
  /** Button colour, for the default Bootstrap button */
  color?: string;
  disabled?: boolean;
};

export const DropdownToggle = React.forwardRef<HTMLElement, DropdownToggleProps>(
  function DropdownToggle(
    { nav, caret, tag, color = 'secondary', className, children, onClick, disabled, ...props },
    ref
  ) {
    const { isOpen, toggle, toggleRef, setToggleEl } = useDropdown();

    const handleRef = (el: HTMLElement | null) => {
      toggleRef.current = el;
      setToggleEl(el);
      setRef(ref, el);
    };

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      if (nav && !tag) e.preventDefault();
      onClick?.(e);
      toggle();
    };

    const Tag: React.ElementType = tag ?? (nav ? 'a' : 'button');
    const isBootstrapButton = !tag && !nav;

    return (
      <Tag
        {...(nav && !tag ? { href: '#' } : {})}
        {...(isBootstrapButton ? { type: 'button', disabled } : {})}
        {...props}
        ref={handleRef}
        className={classes(
          className,
          isBootstrapButton && `btn btn-${color}`,
          caret && 'dropdown-toggle',
          nav && 'nav-link'
        )}
        onClick={handleClick}
        aria-expanded={isOpen}
        aria-haspopup={props['aria-haspopup'] ?? true}
      >
        {children ?? (
          <span className="visually-hidden">{props['aria-label'] ?? 'Toggle Dropdown'}</span>
        )}
      </Tag>
    );
  }
);

/* Menu */

type DropdownMenuProps = React.HTMLAttributes<HTMLElement> & {
  /** Align the menu to the toggle's end */
  end?: boolean;
  /** reactstrap's older name for `end` */
  right?: boolean;
  /** Render the open menu into `document.body` */
  container?: 'body';
  tag?: React.ElementType;
};

export function DropdownMenu({
  end = false,
  right = false,
  container,
  tag: Tag = 'div',
  className,
  role = 'menu',
  children,
  ...props
}: DropdownMenuProps) {
  const { isOpen, inNavbar, menuRef, toggleEl } = useDropdown();
  const menuClass = classes(
    className,
    'dropdown-menu',
    (end || right) && 'dropdown-menu-end',
    isOpen && 'show'
  );

  if (isOpen && !inNavbar && toggleEl) {
    return (
      <Popper
        open
        anchorEl={toggleEl}
        placement={end || right ? 'bottom-end' : 'bottom-start'}
        disablePortal={!container}
        ref={(el: HTMLDivElement | null) => {
          menuRef.current = el;
        }}
        className={menuClass}
        role={role}
        tabIndex={-1}
        aria-hidden={false}
        {...props}
      >
        {children}
      </Popper>
    );
  }

  return (
    <Tag
      tabIndex={-1}
      role={role}
      {...props}
      ref={(el: HTMLElement | null) => {
        menuRef.current = el;
      }}
      aria-hidden={!isOpen}
      className={menuClass}
      data-bs-popper="static"
    >
      {children}
    </Tag>
  );
}

/* Item */

type DropdownItemProps = React.HTMLAttributes<HTMLElement> & {
  header?: boolean;
  divider?: boolean;
  text?: boolean;
  active?: boolean;
  disabled?: boolean;
  href?: string;
  tag?: React.ElementType;
  /** Close the menu on click (default true) */
  toggle?: boolean;
};

export function DropdownItem({
  header = false,
  divider = false,
  text = false,
  active,
  disabled,
  tag,
  toggle: closeOnClick = true,
  className,
  onClick,
  ...props
}: DropdownItemProps) {
  const { toggle } = useDropdown();
  const isFocusable = !disabled && !header && !divider && !text;

  let Tag: React.ElementType = tag ?? 'button';
  if (!tag) {
    if (header) Tag = 'h6';
    else if (divider) Tag = 'div';
    else if (props.href) Tag = 'a';
    else if (text) Tag = 'span';
  }

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!isFocusable) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
    if (closeOnClick) toggle();
  };

  return (
    <Tag
      type={Tag === 'button' ? 'button' : undefined}
      {...props}
      tabIndex={isFocusable ? 0 : -1}
      role={isFocusable ? 'menuitem' : undefined}
      className={classes(
        className,
        disabled && 'disabled',
        !divider && !header && !text && 'dropdown-item',
        active && 'active',
        header && 'dropdown-header',
        divider && 'dropdown-divider',
        text && 'dropdown-item-text'
      )}
      onClick={handleClick}
    />
  );
}
