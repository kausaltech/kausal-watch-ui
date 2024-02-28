import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Collapse, Button } from 'reactstrap';

import { ActionLink } from 'common/links';
import Icon from 'components/common/Icon';
import { deploymentType } from '@/common/environment';
import { useTranslations } from 'next-intl';
import { ActionContentAction } from '../actions/ActionContent';

const VersionHistory = styled.div`
  color: ${(props) => props.theme.graphColors.grey090};
`;

const VersionHistoryTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSizeMd};
`;

const ToggleButton = styled(Button)`
  padding: 0;
  margin: 0;
  color: ${(props) => props.theme.themeColors.dark};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &.open {
    color: ${(props) => props.theme.graphColors.grey050};
  }
`;

const VersionHistoryList = styled.ul`
  list-style: none;
  padding: 0;
`;

const StyledVersionHistoryListItem = styled.li<{ $active: boolean }>`
  margin-left: 0.5rem;
  padding: 1rem;
  border-left: 2px solid ${(props) => props.theme.graphColors.grey090};
  background-color: ${({ $active, theme }) =>
    $active ? theme.graphColors.blue010 : 'none'};
`;

const VersionHistoryListItemDate = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

const VersionHistoryListItemName = styled.span``;

type Props = {
  action: ActionContentAction;
};

type ActionVersions = (
  | ActionContentAction
  | ActionContentAction['supersededActions'][0]
)[];

const ActionVersionHistory = ({ action }: Props) => {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(action.supersededBy ? true : false);
  const toggle = () => setIsOpen(!isOpen);
  const isProduction = deploymentType === 'production';

  const versions: ActionVersions = [];
  const supersededActions = !isProduction
    ? action?.supersededActions || []
    : action?.supersededActions.filter((a) => a.plan.publishedAt);

  versions.push(...supersededActions);
  versions.push(action);

  if (action?.supersededBy) {
    !isProduction
      ? versions.push(action.supersededBy)
      : action.supersededBy.plan.publishedAt &&
        versions.push(action.supersededBy);
  }
  if (versions.length < 2) return null;

  return (
    <VersionHistory>
      <ToggleButton
        color="link"
        onClick={toggle}
        className={isOpen ? 'open' : ''}
      >
        <VersionHistoryTitle>
          <Icon
            name="version"
            className="me-2"
            width="1.5rem"
            height="1.5rem"
          />
          {t('version-history')}
          <Icon name={isOpen ? 'angle-down' : 'angle-right'} />
        </VersionHistoryTitle>
      </ToggleButton>
      <Collapse isOpen={isOpen}>
        <VersionHistoryList>
          {versions.reverse().map((v) => (
            <StyledVersionHistoryListItem
              key={v.identifier}
              $active={v.identifier === action.identifier}
            >
              <VersionHistoryListItemDate>
                {v.plan?.versionName || v.plan.shortName}
              </VersionHistoryListItemDate>
              <ActionLink
                action={v}
                crossPlan={
                  'viewUrl' in v && action?.plan && action.plan.id !== v.plan.id
                }
                viewUrl={'viewUrl' in v ? v.viewUrl : undefined}
              >
                <a>
                  <VersionHistoryListItemName>
                    {v.plan?.hideActionIdentifiers !== true &&
                      `${v.identifier}. `}
                    {v.name} {'viewUrl' in v ? v.viewUrl : null}
                  </VersionHistoryListItemName>
                </a>
              </ActionLink>
            </StyledVersionHistoryListItem>
          ))}
        </VersionHistoryList>
      </Collapse>
    </VersionHistory>
  );
};

export default ActionVersionHistory;
