import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'reactstrap';
import styled from 'styled-components';
import { transparentize } from 'polished';
import { usePopper } from 'react-popper';
import { useTheme } from 'common/theme';
import PlanContext from 'context/plan';
import dayjs from 'common/dayjs';
import { useTranslation } from 'common/i18n';
import StatusBadge from 'components/common/StatusBadge';
import ActionImpact from 'components/actions/ActionImpact';
import ActionPhase from 'components/actions/ActionPhase';
import { ActionLink } from 'common/links';
import Icon from 'components/common/Icon';
import { actionStatusOrder } from 'common/data/actions';
import { cleanActionStatus } from 'common/preprocess';

import ActionStatusExport from './ActionStatusExport';

const TableWrapper = styled.div`
  width: auto;
  display: flex;
  flex-flow: wrap;

  background-image: ${(props) => `linear-gradient(to right, ${props.theme.themeColors.white}, ${props.theme.themeColors.white}),
    linear-gradient(to right, ${props.theme.themeColors.white}, ${props.theme.themeColors.white}),
    linear-gradient(to right, rgba(0, 0, 0, 0.25), ${transparentize(0, props.theme.themeColors.white)}),
    linear-gradient(to left, rgba(0, 0, 0, 0.25), ${transparentize(0, props.theme.themeColors.white)})`};
  background-position: left center, right center, left center, right center;
  background-repeat: no-repeat;
  background-color: ${(props) => props.theme.themeColors.white};
  background-size: 20px 100%, 20px 100%, 10px 100%, 10px 100%;
  background-attachment: local, local, scroll, scroll;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    background-image: none;
  }
`;

const DashTable = styled(Table)`
  margin-bottom: ${(props) => props.theme.spaces.s600};
  margin-top: ${(props) => props.theme.spaces.s100};
  line-height: ${(props) => props.theme.lineHeightMd};

  .logo-column {
    width: 2rem;
  }
`;

const StyledRow = styled.tr`
  &.merged {
    opacity: .25;
  }

  td {
    vertical-align: top;

    &.has-tooltip:hover {
      box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    }
  }

  a {
    color: ${(props) => props.theme.themeColors.black};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
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


const OrgLogo = styled.img`
  display: block;
  width: ${(props) => props.theme.spaces.s200};
  height: ${(props) => props.theme.spaces.s200};
`;

const StatusDisplay = styled.div`
  padding: ${(props) => props.theme.spaces.s050};
  height: 100%;
`;

const ResponsibleList = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: ${(props) => props.theme.spaces.s050};
`;

const ResponsibleTooltipList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ResponsibleTooltipListItem = styled.li`
  color: ${(props) => props.hasContact ? '#333' : '#900'}
`;

const UpdatedAgo = styled.div`
  display: inline-block;
  font-size: ${(props) => props.theme.fontSizeSm};
  white-space: nowrap;
  cursor: default;
  padding: ${(props) => props.theme.spaces.s050};
`;

const TaskStatusViz = styled.div`
  display: flex;
  min-width: ${(props) => props.theme.spaces.s600};
  height: 8px;
  margin-bottom: ${(props) => props.theme.spaces.s050};
  background-color: ${(props) => props.theme.themeColors.light};

  .on-time {
    display: inline-block;
    background-color: ${(props) => props.theme.graphColors.green010};
  }
  .late {
    display: inline-block;
    background-color: ${(props) => props.theme.graphColors.yellow050};
  }
  .completed {
    display: inline-block;
    background-color: ${(props) => props.theme.graphColors.green070};
  }
`;

const VizLabel = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
  line-height: ${(props) => props.theme.lineHeightMd};
  hyphens: auto;

  &.active {
    font-weight: ${(props) => props.theme.fontWeightBold};
  }

  &.disabled {
    color: ${(props) => props.theme.themeColors.dark};
  }
`;

const Tooltip = styled.div`
  background: ${(props) => props.theme.themeColors.white};
  color: ${(props) => props.theme.themeColors.black};
  padding: ${(props) => props.theme.spaces.s050} ${(props) => props.theme.spaces.s100};
  font-size: ${(props) => props.theme.fontSizeSm};
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
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  }
`;

const IndicatorsDisplay = styled.div`
  display: inline-block;
  padding: ${(props) => props.theme.spaces.s050};
`;

const TasksStatusBar = (props) => {
  const { tasks } = props;
  const { t } = useTranslation(['common', 'actions']);
  let tasksCount = tasks.length;
  let ontimeTasks = 0;
  let lateTasks = 0;
  let completedTasks = 0;
  const nowDate = new Date();

  if (!tasks) return (<span />);

  tasks.forEach((task) => {
    const taskDue = new Date(task.dueAt);
    switch (task.state) {
      case 'NOT_STARTED':
      case 'IN_PROGRESS':
        if (taskDue < nowDate) lateTasks += 1;
        else ontimeTasks += 1;
        break;
      case 'COMPLETED':
        completedTasks += 1;
        break;
      default:
        tasksCount -= 1;
    }
  });

  const displayTasksCount = tasksCount === 0
    ? t('action-no-tasks')
    : `${tasksCount} ${t('action-tasks-count')}`;

  return (
    <>
      <TaskStatusViz>
        <div
          className="completed"
          style={{ width: `${(completedTasks / tasksCount) * 100}%` }}
        />
        <div
          className="late"
          style={{ width: `${(lateTasks / tasksCount) * 100}%` }}
        />
        <div
          className="on-time"
          style={{ width: `${(ontimeTasks / tasksCount) * 100}%` }}
        />
      </TaskStatusViz>
      <VizLabel className={tasksCount === 0 && 'disabled'}>{displayTasksCount}</VizLabel>
      </>
  );
};

const IndicatorsViz = (props) => {
  const { relatedIndicators } = props;
  const theme = useTheme();
  let hasProgress = false;
  let hasGoals = false;
  const hasIndicators = relatedIndicators.length > 0;

  relatedIndicators.forEach((ri) => {
    const { indicator, indicatesActionProgress } = ri;
    if (indicatesActionProgress) hasProgress = true;
    if (indicator.goals.length > 0) hasGoals = true;
  });

  return (
    <IndicatorsDisplay>
      <Icon
        name="tachometer"
        color={hasIndicators ? theme.actionOnTimeColor : theme.actionNotStartedColor}
        height="1.2em"
        width="1.2em"
      />
      <Icon
        name="bullseye"
        color={hasGoals ? theme.actionOnTimeColor : theme.actionNotStartedColor}
        height="1.2em"
        width="1.2em"
      />
    </IndicatorsDisplay>
  );
};

const ResponsiblesViz = (props) => {
  const { parties } = props;
  const theme = useTheme();
  const contactList = [];
  const noContactList = [];

  parties.forEach((party) => {
    if (party.hasContactPerson) contactList.push(party.organization.id);
    else noContactList.push(party.organization.id);
  });

  return (
    <ResponsibleList>
      { contactList.map((contact) => (
        <Icon name="dot-circle" color={theme.actionOnTimeColor} key={contact} width=".8em" height=".8em" />
      ))}
      { noContactList.map((contact) => (
        <Icon name="circle-outline" color={theme.actionOnTimeColor} key={contact} width=".8em" height=".8em" />
      ))}
    </ResponsibleList>
  );
};

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
    const found = action.contactPersons.some(({ person }) => {
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

const ActionRow = (props) => {
  const { item, plan, hasResponsibles, hasImpacts, hasIndicators, hasImplementationPhases, popperRef } = props;
  const theme = useTheme();
  const actionStatus = cleanActionStatus(item, plan.actionStatuses);

  const popUp = (evt, name) => {
    popperRef(evt.currentTarget, name);
  };

  const tasksTooltipContent = (tasks) => (
    <div>
      Tasks: { tasks.length }
    </div>
  );

  const phasesTooltipContent = () => { hasImplementationPhases ?
    (
      <ul>
      {plan.actionImplementationPhases.map((phase) => (
        <li>{phase.name}</li>
      ))}
      </ul>
    ) : null
  };

  const responsiblesTooltipContent = (parties) => (
    <div>
      <h5>{parties.length} responsible organizations</h5>
      <ResponsibleTooltipList>
        {parties.map((party) => (
          <ResponsibleTooltipListItem hasContact={party.hasContactPerson.toString()} key={party.id}>
            <Icon
              name={party.hasContactPerson ? 'dot-circle' : 'circle-outline'}
              color={theme.actionOnTimeColor}
              width="1em"
              height="1em"
            />
            {' '}
            {party.organization.abbreviation || party.organization.name }
          </ResponsibleTooltipListItem>
        ))}
      </ResponsibleTooltipList>
    </div>
  );

  const indicatorsTooltipContent = (relatedIndicators) => (
    <div>
      Indicators: {relatedIndicators.length}<br />
      Goals: ?
    </div>
  );

  return (
    <StyledRow>
      { plan.primaryOrgs.length > 0 && (
        <td
          className="logo-column has-tooltip"
          onMouseEnter={(e)=> popUp(e, item.primaryOrg.name)}
        >
          { item.primaryOrg && (
            <OrgLogo
              src={item.primaryOrg?.logo?.rendition?.src || '/static/themes/default/images/default-avatar-org.png'}
              alt={item.primaryOrg.name}
              id={`L${item.primaryOrg.id}`}
            />
          )}
        </td>
      )}
      { !plan.hideActionIdentifiers && (
      <td>
        { item.identifier }
        .
      </td>
      )}
      <td>
        <ActionLink action={item}>
          { item.name }
        </ActionLink>
      </td>
      <td className="has-tooltip" onMouseEnter={(e)=> popUp(e, phasesTooltipContent())}>
        <StatusDisplay>
          { hasImplementationPhases ? (
            <ActionPhase
              status={actionStatus}
              activePhase={item.implementationPhase}
              reason={item.manualStatusReason}
              mergedWith={item.mergedWith?.identifier}
              phases={plan.actionImplementationPhases}
              compact
            />
          ) : (
            <StatusBadge
              statusIdentifier={actionStatus.identifier}
              statusName={actionStatus.name}
            />
          )}
        </StatusDisplay>
      </td>
      <td className="has-tooltip" onMouseEnter={(e)=> popUp(e, tasksTooltipContent(item.tasks))}>
        <TasksStatusBar
          tasks={item.tasks}
        />
      </td>
      { hasResponsibles && (
        <td className="has-tooltip" onMouseEnter={(e)=> popUp(e, responsiblesTooltipContent(item.responsibleParties))}>
          <ResponsiblesViz
            parties={item.responsibleParties}
            persons={item.contactPersons}
          />
        </td>
      )}
      { hasImpacts && (
        <td className="has-tooltip" onMouseEnter={(e)=> popUp(e, 'Impact')}>
          { item.impact && (
            <ActionImpact
              identifier={item.impact.identifier}
              name=""
              size="sm"
            />
          )}
        </td>
      )}
      { hasIndicators && (
        <td className="has-tooltip" onMouseEnter={(e) => popUp(e, indicatorsTooltipContent(item.relatedIndicators))}>
          { item.relatedIndicators && !item.mergedWith
            && <IndicatorsViz relatedIndicators={item.relatedIndicators}/>}
        </td>
      )}
      <td className="has-tooltip" onMouseEnter={(e)=> popUp(e, dayjs(item.updatedAt).format('L'))}>
        <UpdatedAgo>
          { `${dayjs(item.updatedAt).fromNow(false)}` }
        </UpdatedAgo>
      </td>
    </StyledRow>
  );
};

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
  const { actions, orgs, plan } = props;
  const orgMap = new Map(orgs.map((org) => [org.id, org]));
  const theme = useTheme();
  const [ sort, setSort ] = useState({key: 'order', direction: 1});
  const { key, direction } = sort;
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
  const sortedActions = actions.sort(comparator)
    .map((action) => processAction(action, orgMap));

  const { showResponsibles, showIndicators } = theme.settings.dashboard;
  const showColumn = {};
  showColumn.logos = plan.primaryOrgs.length > 0;
  showColumn.actionIdentifiers = !plan.hideActionIdentifiers;
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
  const directionLabel = direction === 1 ? t('ascending') : t('descending');
  const columnLabel = {
    identifier: t('action-id'),
    name: t('action-name-title'),
    updatedAt: t('action-last-updated'),
    implementationPhase: t('action-implementation-phase')

  };

  const onPop = (target, content) => {
    setPopperContent(content);
    setReferenceElement(target);
  };

  return (
    <TableWrapper>
      <div style={{flexGrow: 4, alignSelf: 'end' }}>
        { sort.key !== 'order' && <>
          <Button outline size="sm" color="primary" onClick={clickHandler('order')}>
            {t('default-sorting')}
          </Button>
        </>
        }
      </div>
    <div>
      <ActionStatusExport actions={actions} actionStatuses={plan.actionStatuses} />
    </div>
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
          <th>{ t('action-tasks') }</th>
          { showColumn.responsibles && <th>{t('action-responsibles-short')}</th> }
          { showColumn.impacts && <th>{t('action-impact')}</th> }
          { showColumn.indicators && <th>{ t('indicators') }</th> }
          <SortableTableHeader sort={sort} headerKey="updatedAt" onClick={clickHandler('updatedAt')}>
          { columnLabel.updatedAt }
          </SortableTableHeader>
        </tr>
      </thead>
      <tbody>
        {sortedActions.map((item) => (
          <ActionRow
            item={item}
            key={item.id}
            plan={plan}
            hasResponsibles={showResponsibles}
            hasImpacts={showColumn.impacts}
            hasIndicators={showColumn.indicators}
            hasImplementationPhases={hasImplementationPhases}
            popperRef={onPop}
          />
        ))}
      </tbody>
    </DashTable>
    <Tooltip ref={setPopperElement} style={styles.popper} {...attributes.popper}>
      {popperContent}

    </Tooltip>
  </TableWrapper>);
};

ActionStatusTable.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  orgs: PropTypes.arrayOf(PropTypes.object).isRequired,
  plan: PropTypes.shape({
    identifier: PropTypes.string,
  }).isRequired,
};

export default ActionStatusTable;
