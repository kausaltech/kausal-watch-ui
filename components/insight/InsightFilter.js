import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import { Typeahead } from 'react-bootstrap-typeahead';


function InsightFilter(props) {
  const { nodes, activeFilterNode } = props;
  const options = nodes
    .filter(node => node.indicator_level === 'strategic' || node.id == activeFilterNode)
    .map((node) => {
      const out = {};
      out.id = node.id;
      out.label = node.name;
      return out;
    });

  function handleChange(data) {
    const selectedNode = data[0];
    let nodeId;

    if (selectedNode) {
      nodeId = selectedNode.id;
    } else {
      nodeId = null;
    }
    props.onFilterNode(nodeId);
  }

  let defaultSelected;
  if (activeFilterNode) {
    defaultSelected = options.filter(opt => opt.id === activeFilterNode);
  } else {
    defaultSelected = [];
  }

  return (
    <div className="mb-4">
      <h5>Suodata mittarin perusteella</h5>

      <Typeahead
        id="insight-filter"
        onChange={handleChange}
        ignoreDiacritics={false}
        clearButton
        emptyLabel="Ei osumia"
        defaultSelected={defaultSelected}
        options={options}
      />
    </div>
  );
}

export default InsightFilter;
