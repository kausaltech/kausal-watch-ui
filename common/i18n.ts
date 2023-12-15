import * as NextI18Next from 'next-i18next';
import {
  ContentSiteGeneralContentActionTermChoices,
  ContentSiteGeneralContentActionTaskTermChoices,
} from './__generated__/graphql';

const { appWithTranslation, withTranslation, Trans, useTranslation } =
  NextI18Next;

export function getI18n() {
  return NextI18Next.i18n;
}

export function getActionTermContext(plan: {
  generalContent?: { actionTerm: ContentSiteGeneralContentActionTermChoices };
}) {
  const actionTerm = plan.generalContent?.actionTerm;
  return actionTerm === 'ACTION' ? undefined : { context: actionTerm };
}

export function getActionTaskTermContext(plan: {
  generalContent?: {
    actionTaskTerm: ContentSiteGeneralContentActionTaskTermChoices;
  };
}) {
  const actionTaskTerm = plan.generalContent?.actionTaskTerm;
  return actionTaskTerm === 'TASK' ? undefined : { context: actionTaskTerm };
}

export { appWithTranslation, withTranslation, Trans, useTranslation };
