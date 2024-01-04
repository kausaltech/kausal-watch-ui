import { useTranslations } from 'next-intl';
import {
  SiteGeneralContentActionTaskTerm,
  SiteGeneralContentActionTerm,
} from './__generated__/graphql';

// TODO: New translation
export function getActionTermContext(plan: {
  generalContent?: { actionTerm: SiteGeneralContentActionTerm };
}) {
  const actionTerm = plan.generalContent?.actionTerm;
  return actionTerm === 'ACTION' ? undefined : { context: actionTerm };
}

export function getActionTaskTermContext(plan: {
  generalContent?: {
    actionTaskTerm: SiteGeneralContentActionTaskTerm;
  };
}) {
  const actionTaskTerm = plan.generalContent?.actionTaskTerm;
  return actionTaskTerm === 'TASK' ? undefined : { context: actionTaskTerm };
}

export type TFunction = ReturnType<typeof useTranslations>;
