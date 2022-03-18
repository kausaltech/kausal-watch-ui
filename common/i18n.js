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

export {
  appWithTranslation,
  withTranslation,
  Trans,
  useTranslation,
};
