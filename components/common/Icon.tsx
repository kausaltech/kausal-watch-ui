'use client';

import React from 'react';
import SVG from 'react-inlinesvg';
import { useTheme } from 'styled-components';

const camelToKebabCase = (s) =>
  s.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();

type AvailableIcons =
  | 'action-dependency'
  | 'angle-down'
  | 'angle-left'
  | 'angle-right'
  | 'angle-up'
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-up-down'
  | 'arrow-up-right-from-square'
  | 'arrow-up'
  | 'bars'
  | 'bullseye'
  | 'calendar'
  | 'chart-line'
  | 'check'
  | 'caret-down'
  | 'caret-left'
  | 'caret-right'
  | 'caret-up'
  | 'circle-full'
  | 'circle-outline'
  | 'commenting'
  | 'dot-circle'
  | 'exclamation-circle'
  | 'globe'
  | 'heart'
  | 'hidden'
  | 'home'
  | 'link'
  | 'lock'
  | 'pencil'
  | 'scope-global'
  | 'scope-local'
  | 'search'
  | 'sort-down'
  | 'sort-up'
  | 'sort'
  | 'sync'
  | 'tachometer'
  | 'times'
  | 'user';

type Props = {
  name?: AvailableIcons;
  color?: string;
  width?: string;
  height?: string;
  className?: string;
  alt?: string;
} & React.SVGProps<SVGUseElement>;

const Icon = ({
  name = 'circle-outline',
  color = 'inherit',
  width = '1em',
  height = '1em',
  className = '',
  alt,
  ...rest
}: Props) => {
  const theme = useTheme();

  return (
    <svg
      className={`icon ${className}`}
      onError={() => console.error(`Failed to load icon ${name}`)}
      key={`${theme.name}-${name}`}
      style={{ width, height }}
      aria-hidden={alt ? 'false' : 'true'}
      focusable={alt ? 'true' : 'false'}
    >
      {alt ? <title>{alt}</title> : null}
      <use
        fill={color}
        xlinkHref={`#symbol-icon-${camelToKebabCase(name)}`}
        {...rest}
      />
    </svg>
  );
};

export const CombinedIconSymbols = () => {
  const theme = useTheme();
  /* Find the correct icon file from static folder for now */
  /* TODO: Get themed icon url from API */
  const iconFileName = camelToKebabCase(theme.combinedIconsFilename);
  const icon = `${theme.iconsUrl}/${iconFileName}.svg`;

  return <SVG style={{ display: 'none' }} src={icon} />;
};

export default Icon;
