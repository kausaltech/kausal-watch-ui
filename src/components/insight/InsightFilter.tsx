import React from 'react';

import styled from '@emotion/styled';
import { useTranslations } from 'next-intl';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

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

type InsightFilterProps = {
  nodes: {
    id: string;
    name: string;
    indicator_level: string;
  }[];
  activeFilterNode: string | null;
  onFilterNode: (nodeId: string | null) => void;
};

type TypeaheadOption = {
  id: string;
  label: string;
};

function InsightFilter(props: InsightFilterProps) {
  const t = useTranslations();
  const { nodes, activeFilterNode } = props;
  const options: TypeaheadOption[] = nodes
    .filter((node) => node.indicator_level === 'strategic' || node.id == activeFilterNode)
    .map((node) => {
      const out: TypeaheadOption = {
        id: node.id,
        label: node.name,
      };
      return out;
    });

  function handleChange(data: TypeaheadOption[]) {
    const selectedNode = data[0];
    let nodeId: string | null;

    if (selectedNode) {
      nodeId = selectedNode.id;
    } else {
      nodeId = null;
    }
    props.onFilterNode(nodeId);
  }

  let defaultSelected: TypeaheadOption[];
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
