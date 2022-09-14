import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';
import { readableColor } from 'polished';
import { useTranslation } from 'common/i18n';
import { GetCategoriesForTreeMapQuery } from 'common/__generated__/graphql';

function makeTrace(catsIn, i18n, unit) {
  const { language } = i18n;
  const numberFormat = new Intl.NumberFormat(language, {
    maximumSignificantDigits: 3,
  });
  const cats = catsIn.map((cat) => ({ ...cat, value: 0, children: [] }));

  const catMap = new Map(cats.map((cat) => [cat.id, cat]));
  cats.forEach((cat) => {
    if (cat.parent) {
      const parent = catMap.get(cat.parent.id);
      parent.children.push(cat);
    }
  });
  // Aggregate the treemap values starting from the leaves
  cats.filter((cat) => cat.children.length === 0).forEach((cat) => {
    let { parent } = cat;
    cat.value = cat.attributes[0].value;
    while (parent) {
      const p = catMap.get(parent.id);
      p.value += cat.value;
      parent = p.parent;
    }
  });

  const segmentBgColors = cats.map((cat) => cat.color);
  const segmentTextColors = segmentBgColors.map((segment) => (
    segment ? readableColor(segment, '#000000', '#ffffff') : null));

  const trace = {
    type: 'icicle',
    name: 'Utsläpp',
    labels: cats.map((cat) => `<b>${cat.name}</b>`),
    text: cats.map((cat) => `${numberFormat.format(cat.value)} ${unit.shortName}`),
    ids: cats.map((cat) => cat.id),
    parents: cats.map((cat) => cat.parent?.id),
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
      family: "-apple-system, -apple-system, BlinkMacSystemFont, 'Segoe UI', "
      + "Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', "
      + 'sans-serif, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif',
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
  data: GetCategoriesForTreeMapQuery['planCategories'],
  valueAttribute: {
    unit: {
      shortName: string,
    }
  }
  onChangeSection: (cat: string) => void,
}
function CategoryTreeMap(props: CategoryTreeMapProps) {
  if (!process.browser) {
    return null;
  }

  const { data, onChangeSection, valueAttribute } = props;
  const { i18n } = useTranslation();

  const Plot = dynamic(import('./Plot'));
  const trace = makeTrace(data, i18n, valueAttribute.unit);

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

  const handleSectionChange = useCallback((evt) => {
    console.log('handleSectionChange');
    console.log(evt.frame);
    const newCat = evt.frame.data[0].level;
    onChangeSection(newCat);
  }, []);

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
}

export default CategoryTreeMap;
