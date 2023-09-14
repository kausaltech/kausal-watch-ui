import * as NextI18Next from 'next-i18next';
import { ContentSiteGeneralContentActionTermChoices } from './__generated__/graphql';
import numbro from 'numbro';
import numbroDe from 'numbro/dist/languages/de-DE.min.js';

numbro.registerLanguage({
  ...numbroDe,
  languageTag: 'de',
});

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

export { appWithTranslation, withTranslation, Trans, useTranslation };
