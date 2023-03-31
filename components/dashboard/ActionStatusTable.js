import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'reactstrap';
import styled from 'styled-components';
import { transparentize } from 'polished';
import { usePopper } from 'react-popper';
import { useTheme } from 'common/theme';
import { getActionTermContext, useTranslation } from 'common/i18n';
import Icon from 'components/common/Icon';
import { actionStatusOrder } from 'common/data/actions';
import ActionTableRow from 'components/dashboard/ActionTableRow';

import ActionStatusExport from './ActionStatusExport';

const TableWrapper = styled.div`
  width: 100%;
  display: flex;
  overflow-x: auto;

  padding: 0 0 ${(props) => props.theme.spaces.s100} 0;
  background-image:
    linear-gradient(to right, white, white),
    linear-gradient(to right, white, white),
    linear-gradient(to right, rgba(0,0,0,.25), rgba(255,255,255,0)),
    linear-gradient(to left, rgba(0,0,0,.25), rgba(255,255,255,0));
  background-position: left center, right center, left center, right center;
  background-repeat: no-repeat;
  background-color: white;
  background-size: 20px 100%, 20px 100%, 10px 100%, 10px 100%;
  background-attachment: local, local, scroll, scroll;
`;

const DashTable = styled(Table)`
  margin-bottom: ${(props) => props.theme.spaces.s600};
  margin-top: ${(props) => props.theme.spaces.s100};
  line-height: ${(props) => props.theme.lineHeightMd};

  .logo-column {
    width: 2rem;
  }
`;

const ToolBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: ${(props) => props.theme.spaces.s050};
`;

const ResetSorting = styled.div`
`;


const StyledTableHeader = styled.th`
  cursor: pointer;
  paddingRight: 15;
`;

const HeaderContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  text-decoration: ${(props) => props.selected ? 'underline' : null};
  align-items: flex-end;
`;

const TableSortingIcon = styled(Icon)`
  width: 0.8em;
  height: 0.8em;
  opacity: ${(props) => (props.selected ? 1 : 0.3)};
`;

const Tooltip = styled.div`
  background: ${(props) => props.theme.themeColors.white};
  color: ${(props) => props.theme.themeColors.black};
  padding: ${(props) => props.theme.spaces.s050} ${(props) => props.theme.spaces.s100};
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => props.theme.fontFamilyTiny};
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;

  &[data-popper-placement^='top'] > div {
    bottom: -4px;
  }

  &[data-popper-placement^='bottom'] > div {
    top: -4px;
  }

  &[data-popper-placement^='left'] > div {
    right: -4px;
  }

  &[data-popper-placement^='right'] > div {
    left: -4px;
  }

  h5 {
    font-weight: ${(props) => props.theme.fontWeightBold};
    font-size: ${(props) => props.theme.fontSizeSm};
    font-family: ${(props) => props.theme.fontFamilyTiny};
    color: ${(props) => props.theme.themeColors.black};
  }
`;

const Arrow = styled.div`
  visibility: hidden;
  position: absolute;
  width: 8px;
  height: 8px;
  background: inherit;

  &:before {
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
    visibility: visible;
    content: '';
    transform: rotate(45deg);
  }
`;

function isChildOrg(childOrg, parentOrg) {
  function makeTree(org) {
    const ids = [];
    while (org) {
      ids.push(org.id);
      org = org.parent;
    }
    return ids;
  }
  const childTree = makeTree(childOrg);
  const parentTree = [parentOrg.id];
  return childTree.some((id) => parentTree.indexOf(id) >= 0);
}

function processAction(actionIn, orgMap) {
  const action = { ...actionIn };

  action.responsibleParties = actionIn.responsibleParties.map((rp) => {
    const org = orgMap.get(rp.organization.id);
    const found = (action?.contactPersons ?? []).some(({ person }) => {
      if (!person.organization) return false;
      const personOrg = orgMap.get(person.organization.id);
      return isChildOrg(personOrg, org);
    });
    return {
      ...rp,
      hasContactPerson: found,
    };
  });
  return action;
}



const SortableTableHeader = ({children, headerKey, sort, onClick}) => {
  const selected = (sort.key == headerKey);
  const iconName = selected ?
    (sort.direction ?? 1) === 1 ? 'sortDown' : 'sortUp' :
    'sort'
  return (
    <StyledTableHeader onClick={onClick}>
      <HeaderContentWrapper selected={selected}>
        <div>
          { children }
        </div>
        <TableSortingIcon name={iconName} selected={selected} />
      </HeaderContentWrapper>
    </StyledTableHeader>
  );
}

const preprocessForSorting = (key, items, hasImplementationPhases) => {
  const values = items.map(item => item[key]);
  switch (key) {
  case 'updatedAt':
    const [x, y] = values;
    return [y, x];
  case 'implementationPhase':
    return hasImplementationPhases ?
      items.map(item => item[key]?.order) :
      items.map(item => actionStatusOrder(item.status));
  default:
    return values;
  }
}

const ActionStatusTable = (props) => {
  const { actions, orgs, plan, enableExport, planViewUrl } = props;

  const orgMap = new Map(orgs.map((org) => [org.id, org]));
  const theme = useTheme();
  const [ sort, setSort ] = useState({key: 'order', direction: 1});
  const { key, direction } = sort;
  const [showTooltip, setShowTooltip] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const [popperContent, setPopperContent] = useState("null");
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'top',
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
      { name: 'offset', options: { offset: [0, 12] } },
    ],
  });
  const hasImplementationPhases = plan.actionImplementationPhases?.length > 0;


  const comparator = (g1, g2) =>  {
    let [v1, v2] = preprocessForSorting(key, [g1, g2], hasImplementationPhases);
    const val = (
      v1 == v2 ? 0
        : (v1 == null || (v2 > v1)) ? -1 : 1
    );
    return (direction === 1 ? val : -val);
  };
  const sortedActions = [...actions].sort(comparator)
    .map((action) => processAction(action, orgMap));

  const { showResponsibles, showIndicators } = theme.settings.dashboard;
  const showColumn = {};
  showColumn.logos = plan.primaryOrgs.length > 0;
  showColumn.actionIdentifiers = plan.features.hasActionIdentifiers;
  showColumn.impacts = plan.actionImpacts.length > 0;
  showColumn.responsibles = showResponsibles;
  showColumn.indicators = showIndicators;

  const clickHandler = (key) => () => {
    let direction = 1
    if (key === sort.key) {
      direction -= sort.direction;
    }
    setSort({key, direction});
  }

  const { t } = useTranslation(['common', 'actions']);
  const directionLabel = direction === 1 ? t('common:ascending') : t('common:descending');
  const columnLabel = {
    identifier: t('actions:action-id'),
    name: t('actions:action-name-title', getActionTermContext(plan)),
    updatedAt: t('actions:action-last-updated'),
    implementationPhase: t('actions:action-implementation-phase')

  };

  const handleTooltip = (target, content) => {
    if (!target) setShowTooltip(false)
    else {
      setPopperContent(content);
      setReferenceElement(target);
      setShowTooltip(true);
    }
  };

  return (
    <>
    <ToolBar>
      <ResetSorting>
        { sort.key !== 'order' && (
          <Button outline size="sm" color="primary" onClick={clickHandler('order')}>
            {t('common:default-sorting')}
          </Button>
        ) }
      </ResetSorting>
      { enableExport && <ActionStatusExport actions={actions} actionStatuses={plan.actionStatuses} /> }
    </ToolBar>
    <TableWrapper>
    <DashTable role="list">
      <thead>
        <tr>
          { showColumn.logos && <th className="logo-column" />}
          { showColumn.actionIdentifiers && <th><abbr>{ columnLabel.identifier }</abbr></th> }
          <SortableTableHeader sort={sort} headerKey="name" onClick={clickHandler('name')}>
            { columnLabel.name }
          </SortableTableHeader>
          <SortableTableHeader sort={sort} headerKey="implementationPhase"
                               onClick={clickHandler('implementationPhase')}>
            { columnLabel.implementationPhase }
          </SortableTableHeader>
          <th>{ t('actions:action-tasks') }</th>
          { showColumn.responsibles && <th>{t('actions:action-responsibles-short')}</th> }
          { showColumn.impacts && <th>{t('actions:action-impact')}</th> }
          { showColumn.indicators && <th>{ t('common:indicators') }</th> }
          <SortableTableHeader sort={sort} headerKey="updatedAt" onClick={clickHandler('updatedAt')}>
          { columnLabel.updatedAt }
          </SortableTableHeader>
        </tr>
      </thead>
      <tbody>
        {sortedActions.map((item) => (
          <ActionTableRow
            item={item}
            key={item.id}
            planViewUrl={planViewUrl}
            plan={plan}
            hasResponsibles={showResponsibles}
            hasImpacts={showColumn.impacts}
            hasIndicators={showColumn.indicators}
            hasImplementationPhases={hasImplementationPhases}
            popperRef={handleTooltip}
          />
        ))}
      </tbody>
    </DashTable>
    { showTooltip && (
      <Tooltip ref={setPopperElement} style={styles.popper} {...attributes.popper}>
        {popperContent}
        <Arrow ref={setArrowElement} style={styles.arrow} />
      </Tooltip>
    )}
  </TableWrapper>
  </>
  );
};

ActionStatusTable.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  orgs: PropTypes.arrayOf(PropTypes.object).isRequired,
  plan: PropTypes.shape({
    identifier: PropTypes.string,
  }).isRequired,
};

export default ActionStatusTable;
