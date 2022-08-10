import * as NextI18Next from 'next-i18next';


const {
  appWithTranslation,
  withTranslation,
  Trans,
  useTranslation,
} = NextI18Next;

export function getI18n() {
  return NextI18Next.i18n;
}

export function getActionTermContext(plan) {
  const actionTerm = plan.generalContent?.actionTerm;
  return actionTerm === 'ACTION' ? undefined : { context: actionTerm };
}

export {
  appWithTranslation,
  withTranslation,
  Trans,
  useTranslation,
};
