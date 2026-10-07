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
};

type TreeMapOption = ComposeOption<CustomSeriesOption | AriaComponentOption>;

/** Height reserved above the tiles for the path bar */
const PATH_BAR_SPACE = 30;
const PATH_BAR_HEIGHT = 24;
/** Depth of the chevron on the path bar segments */
const PATH_BAR_NOTCH = 8;
const FONT_SIZE = 13;
const SMALL_FONT_SIZE = 9;
const LABEL_PADDING = 4;

/**
 * A tile of the icicle, or a segment of the path bar above it. Tile
 * coordinates are fractions of the tile area; path segments are laid out by
 * their index.
 */
type Tile = {
  categoryId: string;
  kind: 'root' | 'child' | 'path';
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  name: string;
  valueText: string;
  color: string;
};

function buildTree(catsIn: CategoryInput[]) {
  const cats: Category[] = catsIn.map(
    (cat) => ({ ...cat, value: 0, children: [] }) satisfies Category
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
  return catMap;
}

/**
 * Lay out the current root and its children like a horizontal icicle: the root
 * fills the left column, its children are stacked in the right one in
 * proportion to their values. Ancestors of the root form the path bar.
 */
function layoutTiles(
  catMap: Map<string, Category>,
  rootId: string,
  formatValue: (value: number) => string,
  fallbackColor: string
): Tile[] {
  const root = catMap.get(rootId);
  if (!root) return [];
  const toTile = (
    cat: Category,
    kind: Tile['kind'],
    rect: Omit<Tile, 'categoryId' | 'kind' | 'name' | 'valueText' | 'color'>
  ): Tile => ({
    categoryId: cat.id,
    kind,
    ...rect,
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
    toTile(cat, 'path', {
      x0: idx / ancestors.length,
      x1: (idx + 1) / ancestors.length,
      y0: 0,
      y1: 0,
    })
  );

  const hasChildren = root.children.length > 0 && root.value > 0;
  tiles.push(toTile(root, 'root', { x0: 0, x1: hasChildren ? 0.5 : 1, y0: 0, y1: 1 }));
  if (hasChildren) {
    let y = 0;
    root.children.forEach((child) => {
      const height = child.value / root.value;
      tiles.push(toTile(child, 'child', { x0: 0.5, x1: 1, y0: y, y1: y + height }));
      y += height;
    });
  }
  return tiles;
}

function renderPathSegment(
  tile: Tile,
  width: number,
  isFirst: boolean
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
  const x = tile.x0 * width + 1;
  const y = PATH_BAR_SPACE + tile.y0 * areaHeight + 1;
  const w = Math.max(0, (tile.x1 - tile.x0) * width - 2);
  const h = Math.max(0, (tile.y1 - tile.y0) * areaHeight - 2);
  const textWidth = w - 2 * LABEL_PADDING;
  const textHeight = h - 2 * LABEL_PADDING;
  const lineHeight = FONT_SIZE + 4;
  // Rich text markup characters would break the label
  const name = tile.name.replace(/[{}|]/g, '');
  const fill = readableColor(tile.color);
  const rect = {
    type: 'rect' as const,
    shape: { x, y, width: w, height: h },
    style: { fill: tile.color },
  };

  if (textWidth <= 20) return rect;
  if (textHeight < lineHeight) {
    // Too thin for a full label: squeeze in the name in a small font, if possible
    if (h < SMALL_FONT_SIZE + 2) return rect;
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
  const [rootId, setRootId] = useState(topRootId);

  const unit = valueAttribute.unit?.shortName ?? '';
  const formatValue = useMemo(() => {
    const numberFormat = new Intl.NumberFormat(locale, { maximumSignificantDigits: 3 });
    return (value: number) => `${numberFormat.format(value)} ${unit}`.trim();
  }, [locale, unit]);

  const tiles = useMemo(
    () => layoutTiles(catMap, rootId, formatValue, theme.graphColors.grey050),
    [catMap, rootId, formatValue, theme.graphColors.grey050]
  );

  const option = useMemo((): TreeMapOption => {
    const root = tiles.find((tile) => tile.kind === 'root');
    const children = tiles.filter((tile) => tile.kind === 'child');
    const firstPathIdx = tiles.findIndex((tile) => tile.kind === 'path');
    const renderItem: CustomSeriesRenderItem = (params, api) => {
      const tile = tiles[params.dataIndex];
      return tile.kind === 'path'
        ? renderPathSegment(tile, api.getWidth(), params.dataIndex === firstPathIdx)
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
          data: tiles.map((tile) => ({ name: `${tile.kind}-${tile.categoryId}`, value: 0 })),
          animation: false,
        },
      ],
    };
  }, [tiles, heading, t]);

  const handleClick = useCallback(
    (params: unknown) => {
      const { dataIndex } = params as { dataIndex: number };
      const tile = tiles[dataIndex];
      if (!tile) return;
      // Clicking the root zooms out, anything else zooms in to that category
      const newRootId =
        tile.kind === 'root' ? catMap.get(tile.categoryId)?.parent?.id : tile.categoryId;
      if (!newRootId || newRootId === rootId) return;
      setRootId(newRootId);
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
