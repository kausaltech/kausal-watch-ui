import React from 'react';
import dynamic from 'next/dynamic';
import _ from 'lodash';

const Plot = dynamic(import('./Plot'));

function makeTrace(cats) {
  const hasChildren = new Map();
  cats.forEach((cat) => {
    if (cat.parent) hasChildren.set(cat.parent.id, true);
  });

  const rootSection = {
    id: 'root',
    name: 'Total utsläpp',
    color: '#999999',
    parent: null,
    metadata: [
      {
        value: 50.921,
      },
    ],
  };

  const trace = {
    type: 'icicle',
    name: 'Utsläpp',
    labels: _.concat(`<b>${rootSection.name}</b>`, cats.map((cat) => `<b>${cat.name}</b>`)),
    text: _.concat(`${rootSection.metadata[0]?.value} CO<sub>2</sub>e`, cats.map((cat) => (cat.metadata[0]?.value ? `${cat.metadata[0]?.value} Mt` : '-'))),
    ids: _.concat('root', cats.map((cat) => cat.id)),
    parents: _.concat(null, cats.map((cat) => cat.parent?.id || 'root')),
    values: _.concat(0, cats.map((cat) => {
      if (hasChildren.get(cat.id)) return 0;
      return cat.metadata[0]?.value || 0;
    })),
    marker: {
      colors: _.concat('#B4B4B4', cats.map((cat) => cat.color || null)),
    },
    branchvalues: 'remainder',
    maxdepth: 2,
    textinfo: 'label+text',
    pathbar: {
      edgeshape: '>',
      thickness: 24,
      side: 'top',
    },
    tiling: {
      pad: 2,
    },
  };
  return trace;
}

const CategoryTreeMap = React.memo((props) => {
  const { data, onChangeSection } = props;

  console.log('data for viz', data);
  const trace = makeTrace(data);

  // console.log(trace);
  const layout = {
    showlegend: false,
    paper_bgcolor: 'rgba(0,0,0,0)',
    margin: { t: 30, b: 0, l: 0, r: 0 },
    font: {
      family: "-apple-system, -apple-system, BlinkMacSystemFont, 'Segoe UI', "
      + "Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', "
      + 'sans-serif, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif',
    },
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
