import React from 'react';

import { useTranslations } from 'next-intl';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import styled from 'styled-components';

const StyledTypeahead = styled(Typeahead)`
  .rbt-close-content {
    display: none;
  }
  width: 100%;
`;

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

function InsightFilter(props) {
  const t = useTranslations();
  const { nodes, activeFilterNode } = props;
  const options = nodes
    .filter((node) => node.indicator_level === 'strategic' || node.id == activeFilterNode)
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
    defaultSelected = options.filter((opt) => opt.id === activeFilterNode);
  } else {
    defaultSelected = [];
  }

  return (
    <div className="mb-4">
      <StyledLabel htmlFor="insight-filter">
        {t('insight-filter-label')}
        <StyledTypeahead
          id="insight-filter"
          clearButton
          onChange={handleChange}
          ignoreDiacritics={false}
          emptyLabel={t('insight-filter-no-results')}
          defaultSelected={defaultSelected}
          options={options}
        />
      </StyledLabel>
    </div>
  );
}

export default InsightFilter;
