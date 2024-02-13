'use client';

import { useCookie } from '@/common/hooks/use-cookie';
import {
  SELECTED_WORKFLOW_COOKIE_KEY,
  WORKFLOW_DEFAULT,
} from '@/constants/workflow';
import { useContext, createContext } from 'react';

export type Workflow = 'DRAFT' | 'APPROVED' | 'PUBLISHED';

interface WorkflowSelectorValue {
  workflow: Workflow | null;
  setWorkflow: React.Dispatch<React.SetStateAction<string | null>>;
}

const WorkflowSelectorContext = createContext<
  WorkflowSelectorValue | undefined
>(undefined);

type Props = {
  initialWorkflow?: Workflow;
} & React.PropsWithChildren;

export function WorkflowProvider({
  children,
  initialWorkflow = WORKFLOW_DEFAULT,
}: Props) {
  const [workflow, setWorkflow] = useCookie<Workflow>(
    SELECTED_WORKFLOW_COOKIE_KEY,
    initialWorkflow
  );

  return (
    <WorkflowSelectorContext.Provider value={{ workflow, setWorkflow }}>
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
