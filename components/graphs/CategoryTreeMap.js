import React from 'react';
import dynamic from 'next/dynamic';
import { readableColor } from 'polished';
import { useTranslation } from 'common/i18n';

function makeTrace(catsIn, i18n) {
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
    cat.value = cat.metadata[0].value;
    while (parent) {
      const p = catMap.get(parent.id);
      p.value += cat.value;
      parent = p.parent;
    }
  });

  // return category color, if category has no color set, recursively find first ancestor color
  const findFirstAncestorColor = (id, color = null) => {
    const currentCat = cats.find((cat) => cat.id === id);
    if (currentCat.color === null) return findFirstAncestorColor(currentCat.parent?.id, color);
    return currentCat.color;
  };

  const segmentBgColors = cats.map((cat) => (findFirstAncestorColor(cat.id)));
  const segmentTextColors = segmentBgColors.map((segment) => (
    segment ? readableColor(segment, '#000000', '#ffffff') : null));

  const trace = {
    type: 'icicle',
    name: 'Utsläpp',
    labels: cats.map((cat) => `<b>${cat.name}</b>`),
    text: cats.map((cat) => `${numberFormat.format(cat.value)} Mt`),
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

const CategoryTreeMap = React.memo((props) => {
  const { data, onChangeSection } = props;
  const { i18n } = useTranslation();

  if (!process.browser) {
    return null;
  }

  const Plot = dynamic(import('./Plot'));
  const trace = makeTrace(data, i18n);

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

  const handleSectionChange = (evt) => {
    const newCat = evt.frame.data[0].level;
    onChangeSection(newCat);
  };

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
