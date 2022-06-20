import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'reactstrap';
import styled from 'styled-components';
import { transparentize } from 'polished';
import { usePopper } from 'react-popper';
import { useTheme } from 'common/theme';
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
    min-height: 1px;

    &.has-tooltip > a {
      display: block;
      width: 100%;
      height: 100%;
    }

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
`;

const PhasesTooltipList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const PhasesTooltipListItem = styled.li`
  color: ${(props) => props.active === 'true' ? '#333' : '#ccc'}
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

const TaskTooltip = styled.div`

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

  h5 {
    font-family: ${(props) => props.theme.fontFamily}, ${(props) => props.theme.fontFamilyFallback};
    font-weight: ${(props) => props.theme.fontWeightBold};
    font-size: ${(props) => props.theme.fontSizeSm};
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

const IndicatorsDisplay = styled.div`
  display: inline-block;
  padding: ${(props) => props.theme.spaces.s050};
`;

const getTaskCounts = (tasks, t) => {
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
    ? t('actions:action-no-tasks')
    : `${tasksCount} ${t('actions:action-tasks-count')}`;

  return {
    total: tasksCount,
    displayTotal: displayTasksCount,
    onTime: ontimeTasks,
    late: lateTasks,
    completed: completedTasks,
  }
};

const TasksStatusBar = (props) => {
  const { t } = useTranslation(['common', 'actions']);
  const { tasks } = props;
  const taskCounts = getTaskCounts(tasks, t);

  return (
    <>
      <TaskStatusViz>
        <div
          className="completed"
          style={{ width: `${(taskCounts.completed / taskCounts.total) * 100}%` }}
        />
        <div
          className="late"
          style={{ width: `${(taskCounts.late / taskCounts.total) * 100}%` }}
        />
        <div
          className="on-time"
          style={{ width: `${(taskCounts.onTime / taskCounts.total) * 100}%` }}
        />
      </TaskStatusViz>
      <VizLabel className={taskCounts.total === 0 && 'disabled'}>{taskCounts.displayTotal}</VizLabel>
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
        color={hasIndicators ? theme.graphColors.green070 : theme.graphColors.grey030}
        height="1.2em"
        width="1.2em"
      />
      <Icon
        name="bullseye"
        color={hasGoals ? theme.graphColors.green070 : theme.graphColors.grey030}
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

const ActionRow = React.memo(function ActionRow(props) {
  const { item, plan, hasResponsibles, hasImpacts, hasIndicators, hasImplementationPhases, popperRef } = props;
  const theme = useTheme();
  const { t } = useTranslation(['common', 'actions']);
  const actionStatus = cleanActionStatus(item, plan.actionStatuses);

  const showTooltip = (evt, content) => {
    content && popperRef(evt.currentTarget, content);
  };

  const hideTooltip = (evt) => {
    popperRef(null, null);
  };

  const primaryOrgTooltipContent = (primaryOrg) => (
    <div>
      <h5>{ t('common:primary-organization') }</h5>
      { primaryOrg}
    </div>
  );

  const tasksTooltipContent = (tasks) => {
    const taskCounts = getTaskCounts(tasks, t);
    if (taskCounts.total < 1) return <div><h5>{ t('actions:action-no-tasks') }</h5></div>
    return (
    <TaskTooltip>
      <h5>{ t('actions:action-tasks') } </h5>
      <table>
        <tbody>
          { taskCounts.completed > 0 && (
            <tr>
              <td>{t('actions:tasks-completed')}</td>
              <td>{taskCounts.completed}</td>
            </tr>
          ) }
       { taskCounts.late > 0 && <tr><td>{ t('actions:tasks-late') }</td><td>{ taskCounts.late }</td></tr> }
       { taskCounts.onTime > 0 && <tr><td>{ t('actions:tasks-on-time') }</td><td>{ taskCounts.onTime }</td></tr> }
       </tbody>
      </table>
    </TaskTooltip>
  )};

  const phasesTooltipContent = (status, activePhase, merged, planId) => {

    const getMergedName = (mergedWith, planId) => {
      if (mergedWith.plan.id !== planId) return `${mergedWith.plan.shortName} ${mergedWith.identifier}`;
      else return mergedWith.identifier;
    };

    if (merged) return (
      <div>
        <h5>{ ` ${t('actions:action-status-merged')}: ${getMergedName(merged, planId)}.` }</h5>
      </div>
    )
    if (!activePhase) return (
      <div>
        {!status?.name && <h5>{ t('actions:action-implementation-phase-unknown')}</h5>}
        {status?.name}
      </div>
    )
    if (status?.identifier === 'cancelled') return (
      <div>
        <h5>{ status.name }</h5>
      </div>
    )
    return hasImplementationPhases ?
    (
      <div>
        <h5>{ t('actions:action-implementation-phase') }</h5>
        <PhasesTooltipList>
        {plan.actionImplementationPhases.map((phase) => (
          <PhasesTooltipListItem key={phase.id} active={(activePhase?.id === phase.id).toString()}>
            {phase.name}
            {activePhase?.id === phase.id && status.name && !status.isCompleted ? ` (${status.name})` : ''}
          </PhasesTooltipListItem>
        ))}
        </PhasesTooltipList>
      </div>
    ) : (
      <div>
        <h5>Status</h5>
        {status.name}
      </div>
    )
  };

  const responsiblesTooltipContent = (parties) => {
    if (parties.length < 1) return (
      <div>
        <h5>{ t('common:responsible-parties') }</h5>
      </div>
    )
    return (
    <div>
      <h5>{ t('common:responsible-parties') }</h5>
      { parties.find((party) => party.hasContactPerson) && <strong>{ t('common:with-contact-persons') }:</strong>}
      <ResponsibleTooltipList>
        {parties.map((party) => (
          party.hasContactPerson ? (
            <ResponsibleTooltipListItem key={party.id}>
              <Icon
                name={party.hasContactPerson ? 'dot-circle' : 'circle-outline'}
                color={theme.actionOnTimeColor}
                width="1em"
                height="1em"
              />
              {' '}
              {party.organization.abbreviation || party.organization.name }
            </ResponsibleTooltipListItem>
          ) : null
        ))}
      </ResponsibleTooltipList>
      { parties.find((party) => !party.hasContactPerson) && <strong>{ t('common:without-contact-person') }:</strong>}
      <ResponsibleTooltipList>
        { parties.map((party) => (
          !party.hasContactPerson ? (
            <ResponsibleTooltipListItem key={party.id}>
              <Icon
                name={party.hasContactPerson ? 'dot-circle' : 'circle-outline'}
                color={theme.actionOnTimeColor}
                width="1em"
                height="1em"
              />
              {' '}
              {party.organization.abbreviation || party.organization.name }
            </ResponsibleTooltipListItem>
          ) : null
        ))}
      </ResponsibleTooltipList>
    </div>
  )};

  const indicatorsTooltipContent = (relatedIndicators) => {
  const hasIndicators = relatedIndicators.length > 0;
  const hasGoals = relatedIndicators.find((ri) => ri.indicator.goals.length > 0);
  return (
    <div>
      <h5>{ t('common:indicators') }</h5>
      <Icon
        name="tachometer"
        color={hasIndicators ? theme.graphColors.green070 : theme.graphColors.grey030}
        height="1.2em"
        width="1.2em"
      />
      {hasIndicators ? ` ${t('common:indicators')}: ${relatedIndicators.length}` : ` ${t('actions:no-defined-indicators')}`}<br />
      <Icon
        name="bullseye"
        color={hasGoals ? theme.graphColors.green070 : theme.graphColors.grey030}
        height="1.2em"
        width="1.2em"
      />
      { hasGoals ? ` ${t('common:has-goals')}` : ` ${t('common:indicator-time-no-goals')}` }
      {}
    </div>
  )};

  const lastUpdatedTooltipContent = (updateDate) => (
    <div>
      <h5>{ t('common:latest-update') }</h5>
      {dayjs(updateDate).format('L')}
    </div>
  );

  const impactTooltipContent = (impact, impacts) => {
    if (!impact) return null;
    const activeImpact = impacts.find((item) => item.id === impact.id);
    return (
    <div>
      <h5>{ t('common:impact') }</h5>
      {activeImpact.identifier !== '0' && <div>{activeImpact.identifier}/{impacts.length - 1}</div>}
      {activeImpact.name}
    </div>
  )};

  const getPlanUrl = (mergedWith, actionPlan, planId) => {
    if (mergedWith && (mergedWith?.plan.id !== planId)) return mergedWith.plan.viewUrl;
    if (actionPlan.id !== planId) return actionPlan.viewUrl;
    return undefined;
  };

  return (
    <StyledRow>
      { plan.primaryOrgs.length > 0 && (
        <td
          className="logo-column has-tooltip"
          onMouseEnter={(e)=> showTooltip(e, primaryOrgTooltipContent(item.primaryOrg.name))}
          onMouseLeave={(e)=> hideTooltip(e)}
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
      <td className="has-tooltip">
        <ActionLink
          action={item}
          planUrl={getPlanUrl(item.mergedWith, item.plan, plan.id)}
        >
          { item.name }
        </ActionLink>
      </td>
      <td
        className="has-tooltip"
        onMouseEnter={(e)=> showTooltip(e, phasesTooltipContent(actionStatus, item.implementationPhase, item.mergedWith, plan))}
        onMouseLeave={(e)=> hideTooltip(e)}
      >
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
              statusName={item.mergedWith? 'coucou' : actionStatus.name}
            />
          )}
        </StatusDisplay>
      </td>
      <td
        className="has-tooltip"
        onMouseEnter={(e)=> showTooltip(e, tasksTooltipContent(item.tasks))}
        onMouseLeave={(e)=> hideTooltip(e)}
      >
        <TasksStatusBar
          tasks={item.tasks}
        />
      </td>
      { hasResponsibles && (
        <td
          className="has-tooltip"
          onMouseEnter={(e)=> showTooltip(e, responsiblesTooltipContent(item.responsibleParties))}
          onMouseLeave={(e)=> hideTooltip(e)}
        >
          <ResponsiblesViz
            parties={item.responsibleParties}
            persons={item.contactPersons}
          />
        </td>
      )}
      { hasImpacts && (
        <td
          className="has-tooltip"
          onMouseEnter={(e)=> showTooltip(e, impactTooltipContent(item.impact, plan.actionImpacts))}
          onMouseLeave={(e)=> hideTooltip(e)}
        >
          { item.impact && (
            <ActionImpact
              identifier={item.impact.identifier}
              name=""
              max={plan.actionImpacts.length - 1}
              size="sm"
            />
          )}
        </td>
      )}
      { hasIndicators && (
        <td
          className="has-tooltip"
          onMouseEnter={(e) => showTooltip(e, indicatorsTooltipContent(item.relatedIndicators))}
          onMouseLeave={(e)=> hideTooltip(e)}
        >
          { item.relatedIndicators && !item.mergedWith
            && <IndicatorsViz relatedIndicators={item.relatedIndicators}/>}
        </td>
      )}
      <td
        className="has-tooltip"
        onMouseEnter={(e)=> showTooltip(e, lastUpdatedTooltipContent(item.updatedAt))}
        onMouseLeave={(e)=> hideTooltip(e)}
      >
        <UpdatedAgo>
          { `${dayjs(item.updatedAt).fromNow(false)}` }
        </UpdatedAgo>
      </td>
    </StyledRow>
  );
});

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
  const { actions, orgs, plan, enableExport } = props;
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
  const directionLabel = direction === 1 ? t('common:ascending') : t('common:descending');
  const columnLabel = {
    identifier: t('actions:action-id'),
    name: t('actions:action-name-title'),
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
    <TableWrapper>
      <div style={{flexGrow: 4, alignSelf: 'end' }}>
        { sort.key !== 'order' && <>
          <Button outline size="sm" color="primary" onClick={clickHandler('order')}>
            {t('common:default-sorting')}
          </Button>
        </>
        }
      </div>
    <div>
      { enableExport && <ActionStatusExport actions={actions} actionStatuses={plan.actionStatuses} /> }
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
          <ActionRow
            item={item}
            key={item.id}
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
