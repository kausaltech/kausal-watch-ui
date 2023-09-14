import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Collapse, Button } from 'reactstrap';
import { useTranslation } from 'common/i18n';
import { ActionLink } from 'common/links';
import Icon from 'components/common/Icon';
import SiteContext from 'context/site';

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

const VersionHistoryListItem = styled.li`
  margin-left: 0.5rem;
  padding: 1rem;
  border-left: 2px solid ${(props) => props.theme.graphColors.grey090};
  background-color: ${(props) =>
    props.active ? props.theme.graphColors.blue010 : 'none'};
`;

const VersionHistoryListItemDate = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

const VersionHistoryListItemName = styled.span``;

const ActionVersionHistory = (props: ActionVersionHistoryProps) => {
  const { action } = props;
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(action.supersededBy ? true : false);
  const toggle = () => setIsOpen(!isOpen);
  const site = useContext(SiteContext);
  const isProduction = site.deploymentType === 'production';

  const versions = [];
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
          {t('common:version-history')}
          <Icon name={isOpen ? 'angle-down' : 'angle-right'} />
        </VersionHistoryTitle>
      </ToggleButton>
      <Collapse isOpen={isOpen}>
        <VersionHistoryList>
          {versions.reverse().map((v) => (
            <VersionHistoryListItem
              key={v.identifier}
              active={v.identifier === action.identifier}
            >
              <VersionHistoryListItemDate>
                {v.plan?.versionName || v.plan.shortName}
              </VersionHistoryListItemDate>
              <ActionLink action={v} planUrl={v.plan.viewUrl}>
                <a href>
                  <VersionHistoryListItemName>
                    {v.plan?.hideActionIdentifiers !== true &&
                      `${v.identifier}. `}
                    {v.name}
                    {v.viewUrl}
                  </VersionHistoryListItemName>
                </a>
              </ActionLink>
            </VersionHistoryListItem>
          ))}
        </VersionHistoryList>
      </Collapse>
    </VersionHistory>
  );
};

export default ActionVersionHistory;
