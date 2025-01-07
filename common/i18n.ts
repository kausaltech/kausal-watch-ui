import { useTranslations } from 'next-intl';
import {
  SiteGeneralContentActionTaskTerm,
  SiteGeneralContentActionTerm,
} from './__generated__/graphql';

export function getActionTermContext(
  plan: {
    generalContent?: { actionTerm: SiteGeneralContentActionTerm };
  },
  actionTerm?: string
) {
  if (!actionTerm) {
    actionTerm = plan.generalContent?.actionTerm;
  }
  return actionTerm === 'ACTION'
    ? { context: undefined }
    : { context: actionTerm };
}

export function getActionTaskTermContext(plan: {
  generalContent?: {
    actionTaskTerm: SiteGeneralContentActionTaskTerm;
  };
}) {
  const actionTaskTerm = plan.generalContent?.actionTaskTerm;
  return actionTaskTerm === 'TASK'
    ? { context: undefined }
    : { context: actionTaskTerm };
}

export type TFunction = ReturnType<typeof useTranslations>;
