'use client';

import React, { type JSX } from 'react';

import { captureMessage } from '@sentry/nextjs';
import SVG from 'react-inlinesvg';
import { useTheme } from 'styled-components';

import { getThemeStaticURL } from '@/common/theme';
import defaultTheme from '@/public/static/themes/default/theme.json';

const makeIconId = (name: string): string => `symbol-icon-${name}`;

type HiddenReusableIconProps = {
  key: string;
  name: ValidIconName;
};

export function HiddenReusableIcon(props: HiddenReusableIconProps) {
  // There needs to be one of these in the DOM for each available icon
  // so they can be referenced through the SVG use mechanism at the
  // site of use. Include the SharedIcons component to the layout add
  // these to the DOM
  const { name } = props;
  const iconFilename = name.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  if (!defaultTheme.icons[iconFilename]) {
    captureMessage(`Icon ${iconFilename} not found in default theme`);
    return null;
  }
  const icon = defaultTheme.icons[iconFilename] as string;
  return (
    <SVG
      src={getThemeStaticURL(icon)}
      id={makeIconId(name)}
      onError={(error) => console.log(error.message)}
      key={`${name}`}
    />
  );
}

export function SharedIcons() {
  const iconReferences = Object.values(AvailableIcons);
  const hiddenIcons = iconReferences.map((iconRef) => (
    <HiddenReusableIcon key={iconRef} name={iconRef} />
  ));
  return (
    <div id="shared-reusable-icons" style={{ display: 'none' }}>
      {hiddenIcons}
    </div>
  );
}

export enum AvailableIcons {
  ActionDependency = 'action-dependency',
  AngleDown = 'angle-down',
  AngleLeft = 'angle-left',
  AngleRight = 'angle-right',
  AngleUp = 'angle-up',
  AngleUpDown = 'angle-up-down',
  ArrowDown = 'arrow-down',
  ArrowDownShortWide = 'arrow-down-short-wide',
  ArrowLeft = 'arrow-left',
  ArrowRight = 'arrow-right',
  ArrowUp = 'arrow-up',
  ArrowUpDown = 'arrow-up-down',
  ArrowUpRightFromSquare = 'arrow-up-right-from-square',
  ArrowUpWideShort = 'arrow-up-wide-short',
  Bars = 'bars',
  Bullseye = 'bullseye',
  Calendar = 'calendar',
  CaretDown = 'caret-down',
  CaretLeft = 'caret-left',
  CaretRight = 'caret-right',
  CaretUp = 'caret-up',
  ChartArea = 'chart-area',
  ChartColumn = 'chart-column',
  ChartLine = 'chart-line',
  ChartPieSimple = 'chart-pie-simple',
  ChartTreeMap = 'chart-tree-map',
  Check = 'check',
  CheckCircle = 'check-circle',
  CircleFull = 'circle-full',
  CircleHalf = 'circle-half',
  CircleHelp = 'circle-help',
  CircleInfo = 'circle-info',
  CircleOutline = 'circle-outline',
  Commenting = 'commenting',
  DashCircle = 'dash-circle',
  DotCircle = 'dot-circle',
  Download = 'download',
  ExclamationCircle = 'exclamation-circle',
  File = 'file',
  Gear = 'gear',
  Globe = 'globe',
  Grid = 'grid',
  Heart = 'heart',
  Help = 'help',
  Hidden = 'hidden',
  Home = 'home',
  Link = 'link',
  List = 'list',
  Lock = 'lock',
  Pencil = 'pencil',
  PlusCircle = 'plus-circle',
  ScopeGlobal = 'scope-global',
  ScopeLocal = 'scope-local',
  Search = 'search',
  Sort = 'sort',
  SortDown = 'sort-down',
  SortUp = 'sort-up',
  Sync = 'sync',
  Table = 'table',
  Tachometer = 'tachometer',
  Times = 'times',
  User = 'user',
  Version = 'version',
}

export type ValidIconName = `${AvailableIcons}`;

type Props = {
  color?: string;
  width?: string;
  height?: string;
  className?: string;
  alt?: string;
} & React.SVGProps<SVGUseElement>;

type IconProps = {
  name?: ValidIconName;
} & Props;

const IconComponent = ({
  name = 'circle-outline',
  color = 'inherit',
  width = '1em',
  height = '1em',
  className = '',
  alt,
  ...rest
}: IconProps) => {
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
      <use fill={color} xlinkHref={`#${makeIconId(name)}`} {...rest} />
    </svg>
  );
};

type IconsInterface = {
  [K in keyof typeof AvailableIcons]: (props: Props) => JSX.Element;
} & typeof IconComponent;

for (const [key, _val] of Object.entries(AvailableIcons)) {
  const iconName = AvailableIcons[key] as ValidIconName;
  const fn = ({ name, ...rest }: Props) => <IconComponent name={iconName} {...rest} />;
  IconComponent[key] = fn;
}

const Icon = IconComponent as IconsInterface;
export default Icon;
