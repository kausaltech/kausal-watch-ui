import { type MouseEvent, useCallback, useEffect, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  Button,
  CircularProgress,
  Divider,
  ListItemIcon,
  ListSubheader,
  Menu,
  MenuItem,
} from '@mui/material';

import styled from '@emotion/styled';

import { useApolloClient } from '@apollo/client/react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import {
  type Icon as BootstrapIcon,
  BoxArrowRight,
  ChevronDown,
  FileEarmarkCheck,
  FileEarmarkLock2,
  FileEarmarkMedical,
  Lock,
  Pencil,
  Person,
} from 'react-bootstrap-icons';

import { type GetPlanContextQuery, WorkflowState } from '@/common/__generated__/graphql';
import { getActionTermContext } from '@/common/i18n';
import { usePlan } from '@/context/plan';
import { useWorkflowSelector } from '@/context/workflow-selector';
import { useHandleSignOut } from '@/utils/auth.utils';
import { hasSessionExpired } from '@/utils/session.utils';

type WorkflowStateDescription = NonNullable<
  NonNullable<GetPlanContextQuery['workflowStates']>[number]
>;

/* The workflow id is sent back as a GraphQL variable of the WorkflowState
 * enum type, so only ids matching the enum are usable */
type StrictWorkflowStateDescription = WorkflowStateDescription & {
  id: WorkflowState;
  description: string;
};

const VALID_WORKFLOW_IDS: string[] = Object.values(WorkflowState);

/* Exhaustive by construction: adding a WorkflowState member without an icon
 * fails to type-check */
const WORKFLOW_STATE_ICONS: Record<WorkflowState, BootstrapIcon> = {
  [WorkflowState.Draft]: FileEarmarkMedical,
  [WorkflowState.Approved]: FileEarmarkCheck,
  [WorkflowState.Published]: FileEarmarkLock2,
};

const ToolbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: ${(props) => props.theme.spaces.s100};
  background-color: ${(props) => props.theme.themeColors.black};
  font-family: Inter, system-ui, sans-serif;

  @media print {
    display: none;
  }
`;

const ToolbarButton = styled(Button)`
  margin: ${(props) => props.theme.spaces.s025} 0;
  padding: 4px 10px;
  background-color: ${(props) => props.theme.themeColors.black};
  color: ${(props) => props.theme.themeColors.light};
  font-family: Inter, system-ui, sans-serif;
  font-size: ${(props) => props.theme.fontSizeSm};
  text-transform: none;

  .MuiButton-endIcon {
    margin-left: 12px;
  }

  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.themeColors.dark};
    color: ${(props) => props.theme.themeColors.light};
  }

  &.Mui-disabled {
    color: ${(props) => props.theme.themeColors.light};
  }
`;

export const TopToolBar = () => {
  const session = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [versionsAnchorEl, setVersionsAnchorEl] = useState<HTMLElement | null>(null);
  const [userAnchorEl, setUserAnchorEl] = useState<HTMLElement | null>(null);
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
      workflow != null && VALID_WORKFLOW_IDS.includes(workflow.id) && workflow.description != null
  );

  const selectedWorkflow = workflows?.find((workflow) => workflow?.id === selectedWorkflowId);

  useEffect(() => {
    // If the selected workflow wasn't found from the available options
    // the user may have an invalid option stored so we reset it.
    if (workflows?.length && !selectedWorkflow) {
      setWorkflow(workflows[0]?.id ?? WorkflowState.Published);
    }
  }, [workflows, selectedWorkflow, setWorkflow]);

  const apolloClient = useApolloClient();

  const handleSelectWorkflow = useCallback(
    (workflow: WorkflowState) => {
      setVersionsAnchorEl(null);
      void apolloClient.clearStore();
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

  const openVersionsMenu = (event: MouseEvent<HTMLElement>) =>
    setVersionsAnchorEl(event.currentTarget);
  const openUserMenu = (event: MouseEvent<HTMLElement>) => setUserAnchorEl(event.currentTarget);

  const SelectedWorkflowIcon = selectedWorkflow
    ? WORKFLOW_STATE_ICONS[selectedWorkflow.id]
    : Pencil;

  return (
    <ToolbarContainer>
      {selectedWorkflow && !!workflows?.length && (
        <div>
          <ToolbarButton
            size="small"
            disabled={loading}
            onClick={openVersionsMenu}
            aria-label="action-versions"
            startIcon={
              loading ? (
                <CircularProgress size={14} color="inherit" />
              ) : (
                <SelectedWorkflowIcon size={16} />
              )
            }
            endIcon={<ChevronDown />}
          >
            {selectedWorkflow.description}
          </ToolbarButton>
          <Menu
            anchorEl={versionsAnchorEl}
            open={Boolean(versionsAnchorEl)}
            onClose={() => setVersionsAnchorEl(null)}
          >
            <ListSubheader disableSticky>
              {t('action-versions', getActionTermContext(plan))}
            </ListSubheader>
            <Divider />
            {workflows.map((workflow) => {
              const StateIcon = WORKFLOW_STATE_ICONS[workflow.id];
              return (
                <MenuItem key={workflow.id} onClick={() => handleSelectWorkflow(workflow.id)}>
                  <ListItemIcon>
                    <StateIcon size={18} />
                  </ListItemIcon>
                  {workflow.description}
                </MenuItem>
              );
            })}
          </Menu>
        </div>
      )}
      <div>
        <ToolbarButton
          size="small"
          onClick={openUserMenu}
          aria-label="user-name-icon"
          startIcon={<Person size={16} />}
          endIcon={<ChevronDown />}
        >
          {session.data.user?.name}
        </ToolbarButton>
        <Menu
          anchorEl={userAnchorEl}
          open={Boolean(userAnchorEl)}
          onClose={() => setUserAnchorEl(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          {plan.adminUrl && (
            <MenuItem component="a" href={plan.adminUrl} target="_blank" rel="noopener noreferrer">
              <ListItemIcon>
                <Lock size={18} />
              </ListItemIcon>
              {t('admin-login')}
            </MenuItem>
          )}
          <MenuItem onClick={() => handleSignOut()}>
            <ListItemIcon>
              <BoxArrowRight size={18} />
            </ListItemIcon>
            {t('ui-sign-out')}
          </MenuItem>
        </Menu>
      </div>
    </ToolbarContainer>
  );
};

export default TopToolBar;
