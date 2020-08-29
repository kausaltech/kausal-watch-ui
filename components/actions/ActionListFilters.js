import React, { useCallback } from 'react';
import { Spring, Transition } from 'react-spring/renderprops.cjs';
import {
  CustomInput as BaseCustomInput, FormGroup, Label, Row, Col, Badge, Button,
} from 'reactstrap';

import styled from 'styled-components';
import { withTranslation } from '../../common/i18n';
import TextInput from '../common/TextInput';
import DropDown from '../common/DropDown';

const CustomInput = styled(BaseCustomInput)`
  background-color: transparent !important;
`;

const FiltersList = styled.div`
  font-size: ${(props) => props.theme.fontSizeLg};
  line-height: ${(props) => props.theme.lineHeightBase};

  .count {
    margin-top: ${(props) => props.theme.spaces.s100};
    font-weight: ${(props) => props.theme.fontWeightBold};
    font-size: ${(props) => props.theme.fontSizeMd};
  }

  .close {
    color: white;
    margin-left: .5em;
  }

`;

const StyledBadge = styled(Badge)`
  background-color: ${(props) => props.theme.brandDark};
  color: ${(props) => props.theme.themeColors.light};
`;

function generateSortedOrgTree(orgs, depth) {
  const sortedOrgs = orgs.sort((a, b) => a.name.localeCompare(b.name));
  let out = [];

  sortedOrgs.forEach((org) => {
    org.depth = depth;
    out.push(org);
    if (!org.children.length) return;
    out = out.concat(generateSortedOrgTree(org.children, depth + 1));
  });

  return out;
}

function ActionListFilterInput({
  filter, currentValue, onChange
}) {
  const callback = useCallback(
    (event) => {
      onChange(filter.identifier, event.target.value);
    },
    [filter.identifier, onChange],
  );

  if (filter.type === 'text') {
    return (
      <TextInput
        label={filter.label}
        id={filter.identifier + '-field'}
        name={filter.identifier}
        placeholder={filter.placeholder}
        value={currentValue || ''}
        onChange={callback}
      />
    );
  }
  return (
    <DropDown
      label={filter.label}
      id={filter.identifier + '-field'}
      name={filter.identifier}
      value={currentValue || ''}
      onChange={callback}
    >
      <option value="">{ filter.showAllLabel }</option>
      {filter.options.map((opt) => (
        <option value={opt.id} key={opt.id}>{ opt.label || opt.name }</option>
      ))}
    </DropDown>
  );
}

function ActionListFilterBadges({
  t, filters, activeFilters, actionCount, onReset
}) {
  const badges = filters.filter((item) => activeFilters[item.identifier]).map((item, index) => {
    let name;
    if (item.type !== 'text') {
      const activeOption = item.options.find((opt) => opt.id === activeFilters[item.identifier]);
      name = activeOption.label || activeOption.name;
    } else {
      name = activeFilters[item.identifier];
    }
    return {
      id: index,
      identifier: item.identifier,
      name,
    };
  });

  function makeCallback(identifier) {
    return () => onReset(identifier);
  }

  return (
    <FiltersList className="mb-4 mt-3">
      <Transition
        items={badges}
        keys={(item) => item.id}
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
      >
        {(item) => (props) => (
          <StyledBadge
            className="mr-3"
            style={props}
          >
            <Button close size="sm" onClick={makeCallback(item.identifier)} />
            { item.name }
          </StyledBadge>
        )}
      </Transition>
      <div className="count">
        { actionCount }
        { ' ' }
        { t('filter-result-actions') }
      </div>
    </FiltersList>
  )
}


function ActionListFilters({
  t, filters, orgs, categoryTypes, impacts, actionCount, onChange,
}) {
  const sortedOrgs = generateSortedOrgTree(orgs.filter((org) => !org.parent), 0);
  const allFilters = [];

  allFilters.push({
    label: t('filter-organization'),
    showAllLabel: t('filter-all-organizations'),
    md: 6,
    lg: 6,
    identifier: 'organization',
    options: sortedOrgs.map((org) => ({
      id: org.id,
      label: ' '.repeat(org.depth * 4) + org.name,
    })),
  });
  allFilters.push({
    label: t('filter-impact'),
    showAllLabel: t('filter-all-impacts'),
    md: 6,
    lg: 4,
    identifier: 'impact',
    options: impacts,
  });

  categoryTypes.forEach((ct) => {
    allFilters.push({
      label: ct.name,
      showAllLabel: t('filter-all-categories'),
      md: 6,
      lg: 6,
      identifier: `category_${ct.identifier}`,
      options: ct.categories.filter((cat) => !cat.parent),
    });
  });

  allFilters[allFilters.length - 1].isLast = true;

  allFilters.push({
    label: t('filter-text'),
    placeholder: t('filter-text-default'),
    md: 12,
    lg: 12,
    identifier: 'text',
    type: 'text',
  });

  return (
    <div className="filters mb-2 text-left">
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
      >
        {(props) => (
          <Row style={props}>
            {allFilters.map((filter) => (
              <Col
                sm="12"
                md={{ size: filter.md }}
                lg={{ size: filter.lg }}
                className={`mb-2 d-flex${filter.isLast ? ' align-items-end' : ''}`}
                key={filter.identifier}
              >
                <ActionListFilterInput filter={filter} currentValue={filters[filter.identifier]} onChange={onChange} />
              </Col>
            ))}
          </Row>
        )}
      </Spring>
      <Row>
        <Col>
          <ActionListFilterBadges t={t} filters={allFilters} activeFilters={filters} onReset={onChange} actionCount={actionCount} />
        </Col>
      </Row>
    </div>
  );
}

export default withTranslation(['common', 'actions'])(ActionListFilters);
