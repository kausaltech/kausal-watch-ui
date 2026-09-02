import { useTranslations } from 'next-intl';

import type { ActionContentAction } from '@/components/actions/ActionContent';

type ActionLinksBlockProps = {
  links: ActionContentAction['links'];
};

const ActionLinksBlock = (props: ActionLinksBlockProps) => {
  const { links } = props;
  const t = useTranslations();

  return (
    <>
      <h3>{t('read-more')}</h3>
      <ul>
        {links.map((actionLink) => (
          <li key={actionLink.id}>
            <a href={actionLink.url} target="_blank" rel="noreferrer">
              {actionLink.title}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ActionLinksBlock;
