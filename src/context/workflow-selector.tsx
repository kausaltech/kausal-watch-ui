'use client';

import { useState } from 'react';
import { createContext, useContext } from 'react';

import { useCookie } from '@/common/hooks/use-cookie';
import { SELECTED_WORKFLOW_COOKIE_KEY, WORKFLOW_DEFAULT } from '@/constants/workflow';

interface WorkflowSelectorValue {
  workflow: string | null;
  setWorkflow: React.Dispatch<React.SetStateAction<string | null>>;
  workflowStates: any; //  TODO
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const WorkflowSelectorContext = createContext<WorkflowSelectorValue | undefined>(undefined);

type Props = {
  initialWorkflow?: string;
  workflowStates: any; // TODO
} & React.PropsWithChildren;

export function WorkflowProvider({
  children,
  initialWorkflow = WORKFLOW_DEFAULT,
  workflowStates,
}: Props) {
  const [workflow, setWorkflow] = useCookie<string>(SELECTED_WORKFLOW_COOKIE_KEY, initialWorkflow);
  const [loading, setLoading] = useState(false);

  return (
    <WorkflowSelectorContext.Provider
      value={{ workflow, setWorkflow, workflowStates, loading, setLoading }}
    >
      {children}
    </WorkflowSelectorContext.Provider>
  );
}

export const useWorkflowSelector = () => {
  const context = useContext(WorkflowSelectorContext);

  if (!context) {
    throw new Error(
      'useWorkflowSelector context is undefined, did you forget to wrap this in WorkflowProvider?'
    );
  }

  return context;
};
