import { useTranslations } from 'next-intl';

import {
  SiteGeneralContentActionTaskTerm,
  SiteGeneralContentActionTerm,
  SiteGeneralContentIndicatorTerm,
} from './__generated__/graphql';

export function getActionTermContext(
  plan: {
    generalContent?: {
      actionTerm?: SiteGeneralContentActionTerm;
      indicatorTerm?: SiteGeneralContentIndicatorTerm;
    };
  },
  actionTerm?: string
) {
  if (actionTerm === 'INDICATOR') {
    const indicatorTerm = plan.generalContent?.indicatorTerm;
    return indicatorTerm === 'INDICATOR' || !indicatorTerm
      ? { context: '' }
      : { context: indicatorTerm };
  }

  if (!actionTerm) {
    actionTerm = plan.generalContent?.actionTerm;
  }

  return actionTerm === 'ACTION' ? { context: '' } : { context: actionTerm || '' };
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
