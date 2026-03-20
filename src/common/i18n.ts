import { useTranslations } from 'next-intl';

import {
  SiteGeneralContentActionTaskTerm,
  SiteGeneralContentActionTerm,
  SiteGeneralContentIndicatorTerm,
} from './__generated__/graphql';

export function getActionTermContext(plan: {
  generalContent?: { actionTerm?: SiteGeneralContentActionTerm };
}) {
  const actionTerm = plan.generalContent?.actionTerm;
  return actionTerm === 'ACTION' ? { context: '' } : { context: actionTerm || '' };
}

export function getIndicatorTermContext(plan: {
  generalContent?: { indicatorTerm?: SiteGeneralContentIndicatorTerm };
}) {
  const indicatorTerm = plan.generalContent?.indicatorTerm;
  return { context: indicatorTerm || 'INDICATOR' };
}

export function getActionTaskTermContext(plan: {
  generalContent?: {
    actionTaskTerm: SiteGeneralContentActionTaskTerm;
  };
}) {
  const actionTaskTerm = plan.generalContent?.actionTaskTerm;
  return actionTaskTerm === 'TASK' ? { context: undefined } : { context: actionTaskTerm };
}

export type TFunction = ReturnType<typeof useTranslations>;
