import { useTranslations } from 'next-intl';

const ActionLinksBlock = (props) => {
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
