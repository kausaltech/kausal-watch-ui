import React, { useCallback, useState } from 'react';
import { Spring, Transition } from 'react-spring/renderprops.cjs';
import {
  Row, Col, Badge,
} from 'reactstrap';
import _ from 'lodash';
import styled from 'styled-components';
import { useTheme } from 'common/theme';
import { useTranslation } from 'common/i18n';
import TextInput from 'components/common/TextInput';
import Button from 'components/common/Button';
import DropDown from 'components/common/DropDown';

const FiltersList = styled.div`
  margin: ${(props) => props.theme.spaces.s150} 0;
  padding: ${(props) => props.theme.spaces.s100} 0;
  font-size: ${(props) => props.theme.fontSizeLg};
  line-height: ${(props) => props.theme.lineHeightBase};
  border-color: ${(props) => props.theme.themeColors.dark};
  border-top: 1px solid;
  border-bottom: 1px solid;

  .count {
    margin: ${(props) => props.theme.spaces.s100}
      ${(props) => props.theme.spaces.s100}
      ${(props) => props.theme.spaces.s100}
      0;
    padding-bottom: ${(props) => props.theme.spaces.s100};
    font-weight: ${(props) => props.theme.fontWeightBold};
    font-size: ${(props) => props.theme.fontSizeMd};
  }

  .close {
    color: ${(props) => props.theme.themeColors.white};
    margin-left: .75em;
    font-size: ${(props) => props.theme.fontSizeMd};
  }
`;

const StyledBadge = styled(Badge)`
  margin-bottom: ${(props) => props.theme.spaces.s050};
  background-color: ${(props) => props.theme.brandDark};
  color: ${(props) => props.theme.themeColors.light};
  line-height: 1.25;
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
  filter, currentValue, onChange,
}) {
  const [filterValue, setValue] = useState(currentValue);
  const delayedQuery = useCallback(_.debounce(
    (value) => onChange(filter.identifier, value), 500,
  ), [filter.identifier, onChange]);

  const callback = (event) => {
    setValue(event.target.value);
    delayedQuery(event.target.value);
  };

  if (filter.type === 'text') {
    return (
      <TextInput
        label={filter.label}
        id={`${filter.identifier}-field`}
        name={filter.identifier}
        placeholder={filter.placeholder}
        value={filterValue || ''}
        onChange={callback}
      />
    );
  }
  return (
    <DropDown
      label={filter.label}
      id={`${filter.identifier}-field`}
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
  filters, activeFilters, actionCount, onReset,
}) {
  const { t } = useTranslation();
  const badges = filters.filter((item) => activeFilters[item.identifier]).map((item, index) => {
    let name;
    if (item.type !== 'text') {
      const activeOption = item.options.find((opt) => opt.id === activeFilters[item.identifier]);
      name = activeOption?.label || activeOption?.name;
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
    <FiltersList aria-live="assertive">
      <span className="count">
        { `${actionCount} ${t('filter-result-actions')}` }
      </span>
      { badges.length > 0 && <span className="sr-only">{t('active-filters')}</span>}
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
            <Button close size="sm" onClick={makeCallback(item.identifier)} aria-label={t('remove-filter')}>
              <span aria-hidden="true">x</span>
            </Button>
            { item.name?.trim() }
          </StyledBadge>
        )}
      </Transition>
    </FiltersList>
  );
}

function ActionListFilters(props) {
  const {
    filters, orgs, categoryTypes, impacts, actionCount, onChange, phases, schedules,
  } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const sortedOrgs = generateSortedOrgTree(orgs.filter((org) => !org.parent), 0);
  const allFilters = [];

  allFilters.push({
    label: t('filter-organization'),
    showAllLabel: t('filter-all-organizations'),
    md: 6,
    lg: 4,
    identifier: 'organization',
    options: sortedOrgs.map((org) => ({
      id: org.id,
      label: ' '.repeat(org.depth * 4) + org.name,
    })),
  });

  if (impacts.length > 0) {
    allFilters.push({
      label: t('filter-impact'),
      showAllLabel: t('filter-all-impacts'),
      md: 6,
      lg: 4,
      identifier: 'impact',
      options: impacts,
    });
  }

  if (phases.length > 0) {
    allFilters.push({
      label: t('filter-phase'),
      showAllLabel: t('filter-all-phases'),
      md: 6,
      lg: 4,
      identifier: 'implementationPhase',
      options: phases,
    });
  }

  if (schedules.length > 0) {
    allFilters.push({
      label: t('filter-schedule'),
      showAllLabel: t('filter-all-schedules'),
      md: 6,
      lg: 4,
      identifier: 'schedule',
      options: schedules,
    });
  }

  // Find categories with no parents, if there is only one root category return the next level
  const getRootCategories = (allCategories) => {
    const mainCategories = allCategories.filter((cat) => cat.parent === null);
    if (mainCategories.length === 1) return allCategories.filter((cat) => cat.parent?.id === mainCategories[0].id);
    return mainCategories;
  };

  categoryTypes.forEach((ct) => {
    allFilters.push({
      label: ct.name,
      showAllLabel: t('filter-all-categories'),
      md: 6,
      lg: 4,
      identifier: `category_${ct.identifier}`,
      options: getRootCategories(ct.categories).map((topCat) => ({
        id: topCat.id,
        label: `${theme.settings.categories.showIdentifiers ? `${topCat.identifier}. ` : ''}${topCat.name}`,
      })),
    });
  });

  allFilters[allFilters.length - 1].isLast = true;

  allFilters.push({
    label: t('filter-text'),
    placeholder: t('filter-text-default'),
    sm: 9,
    md: 9,
    lg: 6,
    identifier: 'text',
    type: 'text',
  });

  return (
    <div className="filters mb-2 text-left">
      <form onSubmit={(event) => { event.preventDefault(); }} role="search" aria-label="Toimenpiteet">
        <Spring
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}
        >
          {(props) => (
            <Row style={props}>
              {allFilters.map((filter) => (
                <Col
                  sm={filter.sm}
                  md={filter.md}
                  lg={filter.lg}
                  key={filter.identifier}
                >
                  <ActionListFilterInput
                    filter={filter}
                    currentValue={filters[filter.identifier]}
                    onChange={onChange}
                  />
                </Col>
              ))}
              <Col xs={6} sm={3} md={3} lg={2} xl={2} className="d-flex flex-column justify-content-end">
                <Button type="submit" color="primary" className="mb-3" block>{ t('search') }</Button>
              </Col>
            </Row>
          )}
        </Spring>
      </form>
      <Row>
        <Col>
          <ActionListFilterBadges
            t={t}
            filters={allFilters}
            activeFilters={filters}
            onReset={onChange}
            actionCount={actionCount}
          />
        </Col>
      </Row>
    </div>
  );
}

export default ActionListFilters;
