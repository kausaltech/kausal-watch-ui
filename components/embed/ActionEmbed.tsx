import { useContext } from 'react';
import ActionHighlightsList from 'components/actions/ActionHighlightsList';
import { usePlan } from 'context/plan';
import { useTranslation } from 'common/i18n';
import { useRouter } from 'next/router';

import EmbedContext from 'context/embed';

const DEFAULT_COUNT = 3
const DEFAULT_DISPLAY_HEADER = true;

const validateQueryParameters = (query) => {
  const count = Number.parseInt(query['count'] ?? DEFAULT_COUNT.toString(), 10);
  const displayHeader = (query['header'] ?? DEFAULT_DISPLAY_HEADER.toString()) === 'true';
  return {
    count,
    displayHeader,
  }
}

const ActionEmbed = () => {
  const plan = usePlan();
  const { t } = useTranslation();
  const { query } = useRouter();
  const { count, displayHeader } = validateQueryParameters(query);
  const embedContext = useContext(EmbedContext);
  return <ActionHighlightsList
    plan={plan} t={t} count={count} displayHeader={displayHeader}
  />;
}

export default ActionEmbed;
