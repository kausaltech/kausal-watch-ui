import React, { useCallback, useMemo, useState } from 'react';

import { useTheme } from '@emotion/react';

import type { CustomSeriesOption } from 'echarts/charts';
import type { AriaComponentOption } from 'echarts/components';
import type { ComposeOption } from 'echarts/core';
import type {
  CustomSeriesRenderItem,
  CustomSeriesRenderItemReturn,
} from 'echarts/types/dist/shared';
import { useLocale, useTranslations } from 'next-intl';
import { readableColor } from 'polished';

import { Chart } from '@common/components/Chart';

import type { CategoriesForTreeMapQuery } from '@/common/__generated__/graphql';

type CategoryInput = NonNullable<CategoriesForTreeMapQuery['planCategories']>[number];
type Category = CategoryInput & {
  value: number;
  children: Category[];
  /** Position in the icicle of the whole tree: column, and vertical span as fractions */
  depth: number;
  y0: number;
  y1: number;
};

type Rect = { x0: number; x1: number; y0: number; y1: number };

/** The part of the whole-tree icicle that is shown, in columns and fractions */
type Viewport = { x0: number; width: number; y0: number; height: number };

type TreeMapOption = ComposeOption<CustomSeriesOption | AriaComponentOption>;

/** Height reserved above the tiles for the path bar */
const PATH_BAR_SPACE = 30;
const PATH_BAR_HEIGHT = 24;
/** Depth of the chevron on the path bar segments */
const PATH_BAR_NOTCH = 8;
const FONT_SIZE = 13;
const SMALL_FONT_SIZE = 9;
const LABEL_PADDING = 4;
const ZOOM_DURATION = 500;

/**
 * A tile of the icicle, or a segment of the path bar above it. Tile
 * coordinates are fractions of the tile area; path segments are laid out by
 * their index. Tiles that were shown before the last zoom but no longer are
 * ('leaving') are kept, so that they can animate out of view.
 */
type Tile = Rect & {
  categoryId: string;
  kind: 'root' | 'child' | 'leaving' | 'path';
  /** Where the tile was before the last zoom, to animate from */
  from: Rect | null;
  name: string;
  valueText: string;
  color: string;
};

function buildTree(catsIn: CategoryInput[]) {
  const cats: Category[] = catsIn.map(
    (cat) => ({ ...cat, value: 0, children: [], depth: 0, y0: 0, y1: 0 }) satisfies Category
  );
  const catMap = new Map(cats.map((cat) => [cat.id, cat]));
  cats.forEach((cat) => {
    if (cat.parent) {
      catMap.get(cat.parent.id)?.children.push(cat);
    }
  });
  // Aggregate the values starting from the leaves
  cats
    .filter((cat) => cat.children.length === 0)
    .forEach((cat) => {
      cat.value = (cat.attributes[0] as { value: number } | undefined)?.value ?? 0;
      let parentId = cat.parent?.id;
      while (parentId) {
        const p = catMap.get(parentId);
        if (!p) break;
        p.value += cat.value;
        parentId = p.parent?.id;
      }
    });
  cats.forEach((cat) => cat.children.sort((a, b) => b.value - a.value));

  // Lay out the whole tree as an icicle: one column per level, and each
  // category's children stacked within its vertical span by value
  const place = (siblings: Category[], depth: number, y0: number, y1: number, total: number) => {
    let y = y0;
    siblings.forEach((cat) => {
      const height = total > 0 ? ((y1 - y0) * cat.value) / total : 0;
      Object.assign(cat, { depth, y0: y, y1: y + height });
      place(cat.children, depth + 1, y, y + height, cat.value);
      y += height;
    });
  };
  const topLevel = cats.filter((cat) => !cat.parent).sort((a, b) => b.value - a.value);
  place(
    topLevel,
    0,
    0,
    1,
    topLevel.reduce((sum, cat) => sum + cat.value, 0)
  );
  return catMap;
}

const hasVisibleChildren = (cat: Category) => cat.children.length > 0 && cat.value > 0;

/** Show the root in the left column and its children in the right one */
function getViewport(root: Category): Viewport {
  return {
    x0: root.depth,
    width: hasVisibleChildren(root) ? 2 : 1,
    y0: root.y0,
    // Avoid dividing by zero with an empty root
    height: Math.max(root.y1 - root.y0, 1e-9),
  };
}

function project(cat: Category, viewport: Viewport): Rect {
  return {
    x0: (cat.depth - viewport.x0) / viewport.width,
    x1: (cat.depth + 1 - viewport.x0) / viewport.width,
    y0: (cat.y0 - viewport.y0) / viewport.height,
    y1: (cat.y1 - viewport.y0) / viewport.height,
  };
}

const getShownCategories = (root: Category) =>
  hasVisibleChildren(root) ? [root, ...root.children] : [root];

/**
 * Lay out the current root and its children like a horizontal icicle: the root
 * fills the left column, its children are stacked in the right one in
 * proportion to their values. Ancestors of the root form the path bar.
 *
 * Zooming moves the viewport over the whole-tree icicle, like Plotly's icicle
 * does. Every tile shown before or after the zoom gets its position in both
 * viewports, so it can animate from the old one to the new one.
 */
function layoutTiles(
  catMap: Map<string, Category>,
  rootId: string,
  prevRootId: string | null,
  formatValue: (value: number) => string,
  fallbackColor: string
): Tile[] {
  const root = catMap.get(rootId);
  if (!root) return [];
  const prevRoot = prevRootId ? catMap.get(prevRootId) : undefined;
  const viewport = getViewport(root);
  const prevViewport = prevRoot ? getViewport(prevRoot) : null;
  const toTile = (cat: Category, kind: Tile['kind'], rect: Rect, from: Rect | null): Tile => ({
    categoryId: cat.id,
    kind,
    ...rect,
    from,
    name: cat.name,
    valueText: formatValue(cat.value),
    color: cat.color || fallbackColor,
  });

  const ancestors: Category[] = [];
  for (let id = root.parent?.id; id; id = catMap.get(id)?.parent?.id) {
    const ancestor = catMap.get(id);
    if (!ancestor) break;
    ancestors.unshift(ancestor);
  }
  const tiles = ancestors.map((cat, idx) =>
    toTile(
      cat,
      'path',
      { x0: idx / ancestors.length, x1: (idx + 1) / ancestors.length, y0: 0, y1: 0 },
      null
    )
  );

  const shown = getShownCategories(root);
  const prevShown = prevRoot ? getShownCategories(prevRoot) : [];
  const leaving = prevShown.filter((cat) => !shown.includes(cat));
  [...shown, ...leaving].forEach((cat) => {
    const kind = cat === root ? 'root' : shown.includes(cat) ? 'child' : 'leaving';
    const from = prevViewport ? project(cat, prevViewport) : null;
    tiles.push(toTile(cat, kind, project(cat, viewport), from));
  });
  return tiles;
}

function renderPathSegment(
  tile: Tile,
  width: number,
  isFirst: boolean,
  fadeIn: boolean
): CustomSeriesRenderItemReturn {
  const x0 = tile.x0 * width;
  const x1 = tile.x1 * width - 2;
  const h = PATH_BAR_HEIGHT;
  const notch = isFirst ? 0 : PATH_BAR_NOTCH;
  return {
    type: 'polygon',
    shape: {
      points: [
        [x0, 0],
        [x1 - PATH_BAR_NOTCH, 0],
        [x1, h / 2],
        [x1 - PATH_BAR_NOTCH, h],
        [x0, h],
        [x0 + notch, h / 2],
      ],
    },
    style: { fill: tile.color },
    enterFrom: fadeIn ? { shape: {}, style: { opacity: 0 } } : undefined,
    textContent: {
      type: 'text',
      style: {
        text: tile.name,
        fill: readableColor(tile.color),
        fontSize: FONT_SIZE,
        fontWeight: 'bold',
        width: Math.max(0, x1 - x0 - notch - PATH_BAR_NOTCH - LABEL_PADDING),
        overflow: 'truncate',
      },
    },
    textConfig: { position: 'insideLeft', distance: notch + LABEL_PADDING },
  };
}

function renderTile(tile: Tile, width: number, height: number): CustomSeriesRenderItemReturn {
  const areaHeight = height - PATH_BAR_SPACE;
  // Inset by a pixel for a 2px gap between the tiles
  const toPixels = (rect: Rect) => ({
    x: rect.x0 * width + 1,
    y: PATH_BAR_SPACE + rect.y0 * areaHeight + 1,
    width: Math.max(0, (rect.x1 - rect.x0) * width - 2),
    height: Math.max(0, (rect.y1 - rect.y0) * areaHeight - 2),
  });
  const element = renderTileRect(tile, toPixels(tile), tile.from ? toPixels(tile.from) : null);
  // Clip to the tile area, so that tiles zooming in or out of view don't
  // cover the path bar
  return {
    type: 'group',
    clipPath: { type: 'rect', shape: { x: 0, y: PATH_BAR_SPACE, width, height: areaHeight } },
    children: element ? [element] : [],
  };
}

type PixelRect = { x: number; y: number; width: number; height: number };

function renderTileRect(
  tile: Tile,
  shape: PixelRect,
  from: PixelRect | null
): Exclude<CustomSeriesRenderItemReturn, null | undefined> {
  const textWidth = shape.width - 2 * LABEL_PADDING;
  const textHeight = shape.height - 2 * LABEL_PADDING;
  const lineHeight = FONT_SIZE + 4;
  // Rich text markup characters would break the label
  const name = tile.name.replace(/[{}|]/g, '');
  const fill = readableColor(tile.color);
  const rect = {
    type: 'rect' as const,
    shape,
    style: { fill: tile.color },
    // New tiles zoom in from their previous position; tiles already shown are
    // matched by name and need their shape transition enabled explicitly
    enterFrom: from ? { shape: from } : undefined,
    transition: 'shape' as const,
  };

  if (textWidth <= 20) return rect;
  if (textHeight < lineHeight) {
    // Too thin for a full label: squeeze in the name in a small font, if possible
    if (shape.height < SMALL_FONT_SIZE + 2) return rect;
    return {
      ...rect,
      textContent: {
        type: 'text',
        style: {
          text: name,
          fill,
          fontSize: SMALL_FONT_SIZE,
          fontWeight: 'bold',
          width: textWidth,
          overflow: 'truncate',
        },
      },
      textConfig: { position: 'insideLeft', distance: LABEL_PADDING },
    };
  }
  return {
    ...rect,
    textContent: {
      type: 'text',
      style: {
        // The value line is plain text: with `overflow: 'break'`, zrender
        // drops a newline between two rich tokens
        text: textHeight >= 2 * lineHeight ? `{name|${name}}\n${tile.valueText}` : `{name|${name}}`,
        fill,
        fontSize: FONT_SIZE,
        lineHeight,
        width: textWidth,
        height: textHeight,
        overflow: 'break',
        lineOverflow: 'truncate',
        rich: {
          name: { fontSize: FONT_SIZE, fontWeight: 'bold', lineHeight, fill },
        },
      },
    },
    textConfig: { position: 'insideTopLeft', distance: LABEL_PADDING },
  };
}

type CategoryTreeMapProps = {
  data: CategoryInput[];
  heading?: string | null;
  valueAttribute: {
    unit: {
      shortName: string | null;
    } | null;
  };
  onChangeSection: (cat: string) => void;
};

const CategoryTreeMap = React.memo(function CategoryTreeMap(props: CategoryTreeMapProps) {
  const { data, onChangeSection, valueAttribute, heading } = props;
  const locale = useLocale();
  const theme = useTheme();
  const t = useTranslations();

  const catMap = useMemo(() => buildTree(data), [data]);
  const topRootId = useMemo(() => data.find((cat) => cat.parent === null)?.id ?? '', [data]);
  // The previous root is kept for animating the zoom from it
  const [view, setView] = useState<{ rootId: string; prevRootId: string | null }>({
    rootId: topRootId,
    prevRootId: null,
  });
  const { rootId, prevRootId } = view;

  const unit = valueAttribute.unit?.shortName ?? '';
  const formatValue = useMemo(() => {
    const numberFormat = new Intl.NumberFormat(locale, { maximumSignificantDigits: 3 });
    return (value: number) => `${numberFormat.format(value)} ${unit}`.trim();
  }, [locale, unit]);

  const tiles = useMemo(
    () => layoutTiles(catMap, rootId, prevRootId, formatValue, theme.graphColors.grey050),
    [catMap, rootId, prevRootId, formatValue, theme.graphColors.grey050]
  );

  const option = useMemo((): TreeMapOption => {
    const root = tiles.find((tile) => tile.kind === 'root');
    const children = tiles.filter((tile) => tile.kind === 'child');
    const firstPathIdx = tiles.findIndex((tile) => tile.kind === 'path');
    const isZoom = prevRootId !== null;
    const renderItem: CustomSeriesRenderItem = (params, api) => {
      const tile = tiles[params.dataIndex];
      return tile.kind === 'path'
        ? renderPathSegment(tile, api.getWidth(), params.dataIndex === firstPathIdx, isZoom)
        : renderTile(tile, api.getWidth(), api.getHeight());
    };
    const description = root
      ? t('chart-aria-series-values', {
          name: `${root.name} (${root.valueText})`,
          values: children.map((child) => `${child.name} ${child.valueText}`).join('; '),
        })
      : '';

    return {
      aria: {
        enabled: true,
        label: { description: heading ? `${heading}. ${description}` : description },
      },
      series: [
        {
          type: 'custom',
          // The tiles are laid out in pixels by renderItem, not on axes
          coordinateSystem: 'none',
          renderItem,
          data: tiles.map((tile) => ({
            name: tile.kind === 'path' ? `path-${tile.categoryId}` : tile.categoryId,
            value: 0,
          })),
          // Tiles zoom from their previous positions (`enterFrom`, shape
          // transitions). Kept on for the first render too: switching it on
          // only at the first zoom washes out the whole chart for a moment.
          animation: true,
          animationDuration: ZOOM_DURATION,
          animationEasing: 'cubicInOut',
          animationDurationUpdate: ZOOM_DURATION,
          animationEasingUpdate: 'cubicInOut',
        },
      ],
    };
  }, [tiles, prevRootId, heading, t]);

  const handleClick = useCallback(
    (params: unknown) => {
      const { dataIndex } = params as { dataIndex: number };
      const tile = tiles[dataIndex];
      // Leaving tiles are out of view after the zoom animation
      if (!tile || tile.kind === 'leaving') return;
      // Clicking the root zooms out, anything else zooms in to that category
      const newRootId =
        tile.kind === 'root' ? catMap.get(tile.categoryId)?.parent?.id : tile.categoryId;
      if (!newRootId || newRootId === rootId) return;
      setView({ rootId: newRootId, prevRootId: rootId });
      onChangeSection(newRootId);
    },
    [tiles, catMap, rootId, onChangeSection]
  );

  return (
    <Chart
      data={option}
      isLoading={false}
      height="450px"
      withResizeLegend={false}
      locale={locale}
      onEvents={{ click: handleClick }}
    />
  );
});

export default CategoryTreeMap;
