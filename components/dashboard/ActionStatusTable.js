import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import styled from 'styled-components';
import { useTheme } from 'common/theme';
import PlanContext from 'context/plan';
import dayjs from 'common/dayjs';
import { useTranslation } from 'common/i18n';
import StatusBadge from 'components/common/StatusBadge';
import ActionImpact from 'components/actions/ActionImpact';
import ActionPhase from 'components/actions/ActionPhase';
import { ActionLink } from 'common/links';
import Icon from 'components/common/Icon';
import { cleanActionStatus } from 'common/preprocess';

const DashTable = styled(Table)`
  margin-bottom: ${(props) => props.theme.spaces.s600};
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
  }

  a {
    color: ${(props) => props.theme.themeColors.black};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const OrgLogo = styled.img`
  display: block;
  width: 2rem;
  height: 2rem;
`;

const ResponsibleList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const UpdatedAgo = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
  white-space: nowrap;
`;

const TaskStatusBar = styled.div`
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
    <div>
      <TaskStatusBar>
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
      </TaskStatusBar>
      <VizLabel className={tasksCount === 0 && 'disabled'}>{displayTasksCount}</VizLabel>
    </div>
  );
};

const IndicatorsViz = ({ relatedIndicators }) => {
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
    <div>
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
    </div>
  );
};

const ResponsiblesViz = ({ parties }) => {
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

const ActionRow = ({ item, plan, hasResponsibles, hasImpacts, hasIndicators }) => {
  const actionStatus = cleanActionStatus(item, plan.actionStatuses);

  return (
    <StyledRow>
      { plan.primaryOrgs.length > 0 && (
        <td className="logo-column">
          { item.primaryOrg.logo && (
          <OrgLogo src={item.primaryOrg.logo.rendition.src} alt={item.primaryOrg.name} />
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
      <td>
        { plan.actionImplementationPhases?.length > 0 ? (
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
      </td>
      <td>
        <TasksStatusBar tasks={item.tasks} />
      </td>
      { hasResponsibles && (
        <td>
          <ResponsiblesViz parties={item.responsibleParties} persons={item.contactPersons} />
        </td>
      )}
      { hasImpacts && (
        <td>
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
        <td>
          { item.relatedIndicators && !item.mergedWith
            && <IndicatorsViz relatedIndicators={item.relatedIndicators} />}
        </td>
      )}
      <td>
        <UpdatedAgo>{ `${dayjs(item.updatedAt).fromNow(false)}` }</UpdatedAgo>
      </td>
    </StyledRow>
  );
};

const ActionsStatusTable = (props) => {
  const { actions, orgs } = props;
  const orgMap = new Map(orgs.map((org) => [org.id, org]));
  const plan = useContext(PlanContext);
  const theme = useTheme();
  const [ sort, setSort ] = useState({key: 'name', direction: 'asc'});

  const comparator = (g1, g2) =>  {
    const { key, direction } = sort;
    const val = (
      g1[key] == g2[key] ? 0 :
      (g1[key] == null || (g2[key] > g1[key])) ? -1 : 1
    );
    return (direction === 'asc' ? val : -val);
  };
  const sortedActions = actions.sort(comparator)
    .map((action) => processAction(action, orgMap));
  const showImpacts = plan.actionImpacts.length > 0;
  const { showResponsibles, showIndicators } = theme.settings.dashboard;
  const { t } = useTranslation(['common', 'actions']);

  return (
    <DashTable role="list">
      <thead>
        <tr>
          { plan.primaryOrgs.length > 0 && <th className="logo-column" />}
          { !plan.hideActionIdentifiers && <th><abbr>{ t('action-id') }</abbr></th>}
          <th>{ t('action-name-title') }</th>
          <th>{ t('action-implementation-phase') }</th>
          <th>{ t('action-tasks') }</th>
          { showResponsibles && <th>{t('action-responsibles-short')}</th> }
          { showImpacts && <th>{t('action-impact')}</th> }
          { showIndicators && <th>{ t('indicators') }</th> }
          <th>{ t('action-last-updated') }</th>
        </tr>
      </thead>
      <tbody>
        {sortedActions.map((item) => (
          <ActionRow
            item={item}
            key={item.id}
            plan={plan}
            hasResponsibles={showResponsibles}
            hasImpacts={showImpacts}
            hasIndicators={showIndicators}
          />
        ))}
      </tbody>
    </DashTable>
  );
};

ActionsStatusTable.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  orgs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ActionsStatusTable;
