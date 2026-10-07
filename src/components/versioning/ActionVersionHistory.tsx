import { useId, useState } from 'react';

import Collapse from '@mui/material/Collapse';

import styled from '@emotion/styled';

import { useTranslations } from 'next-intl';

import { deploymentType } from '@/common/environment';
import { ActionLink } from '@/common/links';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';

import { type ActionContentAction } from '../actions/ActionContent';

const VersionHistory = styled.div`
  color: ${(props) => props.theme.textColor.secondary};
`;

const VersionHistoryTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSizeMd};
`;

const ToggleButton = styled(Button)`
  font-weight: ${({ theme }) => theme.fontWeightNormal};
  padding: 0;
  margin: 0;
  color: ${(props) => props.theme.themeColors.dark};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    background-color: transparent;
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
  background-color: ${({ $active, theme }) => ($active ? theme.graphColors.blue010 : 'none')};
`;

const VersionHistoryListItemDate = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

const VersionHistoryListItemName = styled.span``;

type Props = {
  action: ActionContentAction;
};

type ActionVersions = (ActionContentAction | ActionContentAction['supersededActions'][0])[];

const ActionVersionHistory = ({ action }: Props) => {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(action.supersededBy ? true : false);
  const panelId = useId();
  const toggle = () => setIsOpen(!isOpen);
  const isProduction = deploymentType === 'production';

  const versions: ActionVersions = [];
  const supersededActions = !isProduction
    ? action?.supersededActions || []
    : action?.supersededActions.filter((a) => a.plan.publishedAt);

  versions.push(...supersededActions);
  versions.push(action);

  if (action?.supersededBy) {
    if (!isProduction || action.supersededBy.plan.publishedAt) {
      versions.push(action.supersededBy);
    }
  }
  if (versions.length < 2) return null;

  return (
    <VersionHistory>
      <ToggleButton
        variant="link"
        onClick={toggle}
        className={isOpen ? 'open' : ''}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <VersionHistoryTitle>
          <Icon.Version className="me-2" width="1.5rem" height="1.5rem" />
          {t('version-history')}
          <Icon name={isOpen ? 'angle-down' : 'angle-right'} />
        </VersionHistoryTitle>
      </ToggleButton>
      <Collapse in={isOpen} id={panelId}>
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
                crossPlan={'viewUrl' in v && action?.plan && action.plan.id !== v.plan.id}
                viewUrl={'viewUrl' in v ? v.viewUrl : undefined}
              >
                <VersionHistoryListItemName>
                  {v.plan?.hideActionIdentifiers !== true && `${v.identifier}. `}
                  {v.name}
                </VersionHistoryListItemName>
              </ActionLink>
            </StyledVersionHistoryListItem>
          ))}
        </VersionHistoryList>
      </Collapse>
    </VersionHistory>
  );
};

export default ActionVersionHistory;
