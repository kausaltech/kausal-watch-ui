import { useTranslation } from 'common/i18n';
import { stripTrailingSlash } from 'common/utils';
import { usePlan } from 'context/plan';

/**
 * Applies the locale to the end of the link, this can't
 * yet be used in cases where the locale should be injected
 * to the middle of the path e.g. /<plan>/<locale>/actions/
 */
export const useLocalizedLink = (link: string) => {
  const { i18n } = useTranslation();
  const plan = usePlan();

  if (plan.primaryLanguage === i18n.language) {
    return link;
  }

  return `${stripTrailingSlash(link)}/${i18n.language}`;
};
