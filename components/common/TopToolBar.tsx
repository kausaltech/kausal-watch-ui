import React, { useEffect } from 'react';
import {
  Container,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import styled from 'styled-components';
import Icon from '@/components/common/Icon';
import { useTranslations } from 'next-intl';
import { usePlan } from 'context/plan';
import { signOut, useSession } from 'next-auth/react';
import { useWorkflowSelector } from '@/context/workflow-selector';
import { useRouter } from 'next/navigation';
import { gql, useSuspenseQuery } from '@apollo/client';
import { GetWorkflowsQuery } from '@/common/__generated__/graphql';

const ToolbarContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: ${(props) => props.theme.spaces.s100};
  background-color: ${(props) => props.theme.themeColors.black};
  font-family: 'Inter, system-ui, sans-serif';
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
  font-family: 'Inter, system-ui, sans-serif';
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
  const [versionsDropdownOpen, setVersionsDropdownOpen] = React.useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = React.useState(false);
  const versionsToggle = () =>
    setVersionsDropdownOpen((prevState) => !prevState);
  const userToggle = () => setUserDropdownOpen((prevState) => !prevState);
  const t = useTranslations();
  const plan = usePlan();
  const { workflow: selectedWorkflowId, setWorkflow } = useWorkflowSelector();
  const router = useRouter();

  const { data: workflowsData } = useSuspenseQuery<GetWorkflowsQuery>(gql`
    query GetWorkflows {
      __type(name: "WorkflowState") {
        name
        description
        enumValues {
          name
          description
        }
      }
    }
  `);

  const workflows = workflowsData.__type?.enumValues;

  const selectedWorkflow = workflows?.find(
    (workflow) => workflow.name === selectedWorkflowId
  );

  useEffect(() => {
    // If the selected workflow wasn't found from the available options
    // the user may have an invalid option stored so we reset it.
    if (workflows?.length && !selectedWorkflow) {
      setWorkflow(workflows[0].name);
    }
  }, [workflows, selectedWorkflow, setWorkflow]);

  function handleSelectWorkflow(workflow: string) {
    setWorkflow(workflow);
    router.refresh();
  }

  if (session.status !== 'authenticated') {
    return null;
  }

  return (
    <ToolbarContainer fluid>
      {selectedWorkflow && !!workflows?.length && (
        <StyledDropdown isOpen={versionsDropdownOpen} toggle={versionsToggle}>
          <StyledDropdownToggle caret aria-label="action-versions">
            <StyledIcon
              name="pencil"
              className="icon"
              aria-label="actions-versions"
            />
            {selectedWorkflow.description}
          </StyledDropdownToggle>
          <StyledDropdownMenu>
            <DropdownHeader>{t('action-versions')}</DropdownHeader>
            {workflows.map((workflow) => (
              <DropdownItem
                key={workflow.name}
                onClick={() => handleSelectWorkflow(workflow.name)}
              >
                <DropdownItemText>
                  <StyledIcon
                    name="file"
                    className="icon"
                    aria-label={workflow.description ?? workflow.name}
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
          <DropdownItem onClick={() => signOut()}>
            <StyledIcon
              name="arrowRight"
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
