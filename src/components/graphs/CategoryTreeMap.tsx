import React, { useCallback } from 'react';

import dynamic from 'next/dynamic';

import { useLocale } from 'next-intl';
import { readableColor } from 'polished';

import type { GetCategoriesForTreeMapQuery } from '@/common/__generated__/graphql';

type CategoryInput = NonNullable<GetCategoriesForTreeMapQuery['planCategories']>[number];
type Category = CategoryInput & {
  value: number;
  children: Category[];
};

function makeTrace(
  catsIn: CategoryInput[],
  locale: string,
  unit: { shortName: string | null } | null,
  heading: string | null
): Plotly.Data {
  const numberFormat = new Intl.NumberFormat(locale, {
    maximumSignificantDigits: 3,
  });
  const cats: Category[] = catsIn.map(
    (cat) => ({ ...cat, value: 0, children: [] }) satisfies Category
  );

  const catMap = new Map(cats.map((cat) => [cat.id, cat]));
  cats.forEach((cat) => {
    if (cat.parent) {
      const parent = catMap.get(cat.parent.id)!;
      parent.children.push(cat);
    }
  });
  // Aggregate the treemap values starting from the leaves
  cats
    .filter((cat) => cat.children.length === 0)
    .forEach((cat) => {
      let { parent } = cat;
      cat.value = cat.attributes[0].value;
      while (parent) {
        const p = catMap.get(parent.id)!;
        p.value += cat.value;
        parent = p.parent;
      }
    });

  const segmentBgColors = cats.map((cat) => cat.color);
  const segmentTextColors = segmentBgColors.map((segment) =>
    segment ? readableColor(segment) : null
  );

  const trace: Plotly.Data = {
    type: 'icicle',
    name: heading || '',
    labels: cats.map((cat) => `<b>${cat.name}</b>`),
    text: cats.map((cat) => `${numberFormat.format(cat.value)} ${unit?.shortName || ''}`),
    ids: cats.map((cat) => cat.id),
    parents: cats.map((cat) => cat.parent?.id || ''),
    values: cats.map((cat) => cat.value),
    marker: {
      colors: segmentBgColors,
    },
    branchvalues: 'total',
    maxdepth: 2,
    textinfo: 'label+text',
    pathbar: {
      edgeshape: '>',
      thickness: 24,
      side: 'top',
    },
    textfont: {
      family:
        "-apple-system, -apple-system, BlinkMacSystemFont, 'Segoe UI', " +
        "Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', " +
        'sans-serif, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif',
      color: segmentTextColors,
      size: 13,
    },
    tiling: {
      pad: 2,
    },
  };
  return trace;
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

  const Plot = dynamic(() => import('./Plot'), { ssr: false });
  const trace = makeTrace(data, locale, valueAttribute.unit, heading ?? null);

  const layout = {
    showlegend: false,
    paper_bgcolor: 'rgba(0,0,0,0)',
    margin: { t: 30, b: 0, l: 0, r: 0 },
    hovermode: false,
  };

  const config = {
    displayModeBar: false,
    responsive: true,
  };

  const handleSectionChange = useCallback(
    (evt: Readonly<Plotly.FrameAnimationEvent>) => {
      const newCat: string = evt.frame.data[0].level;
      onChangeSection(newCat);
    },
    [onChangeSection]
  );

  return (
    <Plot
      data={[trace]}
      layout={layout}
      config={config}
      useResizeHandler
      onAnimatingFrame={handleSectionChange}
      style={{ width: '100%', height: '100%' }}
    />
  );
});

export default CategoryTreeMap;
