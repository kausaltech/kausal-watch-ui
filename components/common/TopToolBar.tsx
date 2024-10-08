import React, { useCallback, useEffect } from 'react';

import { usePlan } from 'context/plan';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Spinner,
} from 'reactstrap';
import styled from 'styled-components';

import {
  WorkflowState,
  WorkflowStateDescription,
} from '@/common/__generated__/graphql';
import Icon from '@/components/common/Icon';
import { useWorkflowSelector } from '@/context/workflow-selector';
import { useHandleSignOut } from '@/utils/auth.utils';
import { hasSessionExpired } from '@/utils/session.utils';
import { useApolloClient } from '@apollo/client';

type StrictWorkflowStateDescription = {
  id: NonNullable<WorkflowStateDescription['id']>;
  description: NonNullable<WorkflowStateDescription['description']>;
};

const ToolbarContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: ${(props) => props.theme.spaces.s100};
  background-color: ${(props) => props.theme.themeColors.black};
  font-family: Inter, system-ui, sans-serif;
`;

const StyledDropdown = styled(Dropdown)`
  margin: ${(props) => props.theme.spaces.s050} 0;
`;

const StyledDropdownToggle = styled(DropdownToggle)`
  background-color: ${(props) => props.theme.themeColors.black};
  color: ${(props) => props.theme.themeColors.light};
  border-color: ${(props) => props.theme.themeColors.light};
  padding: 8px 15px;

  &:after {
    margin-left: 30px;
  }

  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.themeColors.dark};
    color: ${(props) => props.theme.themeColors.light};
    border-color: ${(props) => props.theme.themeColors.light};
  }
`;

const StyledIcon = styled(Icon)`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const StyledDropdownMenu = styled(DropdownMenu)`
  padding: 8px 10px;
  color: ${(props) => props.theme.headingsColor};
  font-weight: ${(props) => props.theme.headingsFontWeight};
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: Inter, system-ui, sans-serif;
`;

const DropdownHeader = styled.h6`
  border-bottom: 1px solid ${(props) => props.theme.headingsColor};
  margin: 0 auto;
  text-align: center;
`;

const DropdownItemText = styled.div`
  display: block;
`;

export const TopToolBar = () => {
  const session = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [versionsDropdownOpen, setVersionsDropdownOpen] = React.useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = React.useState(false);
  const versionsToggle = () =>
    setVersionsDropdownOpen((prevState) => !prevState);
  const userToggle = () => setUserDropdownOpen((prevState) => !prevState);
  const t = useTranslations();
  const plan = usePlan();
  const {
    workflow: selectedWorkflowId,
    setWorkflow,
    workflowStates,
    loading,
    setLoading,
  } = useWorkflowSelector();
  const router = useRouter();
  const handleSignOut = useHandleSignOut();

  const workflows = workflowStates?.filter(
    (workflow): workflow is StrictWorkflowStateDescription =>
      !!(workflow?.id && workflow?.description)
  );

  const selectedWorkflow = workflows?.find(
    (workflow) => workflow?.id === selectedWorkflowId
  );

  useEffect(() => {
    // If the selected workflow wasn't found from the available options
    // the user may have an invalid option stored so we reset it.
    if (workflows?.length && !selectedWorkflow) {
      setWorkflow(workflows[0]?.id ?? WorkflowState.Published);
    }
  }, [workflows, selectedWorkflow, setWorkflow]);

  const apolloClient = useApolloClient();

  const handleSelectWorkflow = useCallback(
    (workflow: string) => {
      apolloClient.clearStore();
      setWorkflow(workflow);
      router.refresh();
      setLoading(true);
    },
    [apolloClient, router, setWorkflow, setLoading]
  );

  useEffect(() => {
    if (session.status === 'authenticated' && !session.data.idToken) {
      handleSignOut();
    }
    if (session?.data != null && hasSessionExpired(session.data)) {
      handleSignOut();
    }
  }, [session, handleSignOut, pathname, searchParams]);

  if (session.status !== 'authenticated') {
    return null;
  }

  return (
    <ToolbarContainer fluid>
      {selectedWorkflow && !!workflows?.length && (
        <StyledDropdown isOpen={versionsDropdownOpen} toggle={versionsToggle}>
          <StyledDropdownToggle
            disabled={loading}
            caret
            aria-label="action-versions"
          >
            {loading && <Spinner size="sm" className="me-3" />}
            {!loading && (
              <StyledIcon
                name="pencil"
                className="icon"
                aria-label="actions-versions"
              />
            )}
            {selectedWorkflow.description}
          </StyledDropdownToggle>
          <StyledDropdownMenu>
            <DropdownHeader>{t('action-versions')}</DropdownHeader>
            {workflows.map((workflow) => (
              <DropdownItem
                key={workflow.id}
                onClick={() => handleSelectWorkflow(workflow.id)}
              >
                <DropdownItemText>
                  <StyledIcon
                    name="file"
                    className="icon"
                    aria-label={workflow.description}
                  />
                  {workflow.description}
                </DropdownItemText>
              </DropdownItem>
            ))}
          </StyledDropdownMenu>
        </StyledDropdown>
      )}
      <StyledDropdown isOpen={userDropdownOpen} toggle={userToggle}>
        <StyledDropdownToggle caret aria-label="user-name-icon">
          <StyledIcon name="user" className="icon" aria-label="user-icon" />
          {session.data.user?.name}
        </StyledDropdownToggle>
        <DropdownMenu end>
          {plan.adminUrl && (
            <DropdownItem
              as="a"
              href={plan.adminUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <StyledIcon
                name="lock"
                className="icon"
                aria-label="link-to-the-admin-site"
              />
              {t('admin-login')}
            </DropdownItem>
          )}
          <DropdownItem onClick={() => handleSignOut()}>
            <StyledIcon
              name="arrow-right"
              className="icon"
              aria-label="sign-out"
            />
            {t('ui-sign-out')}
          </DropdownItem>
        </DropdownMenu>
      </StyledDropdown>
    </ToolbarContainer>
  );
};

export default TopToolBar;
