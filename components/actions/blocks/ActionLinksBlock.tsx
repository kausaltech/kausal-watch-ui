import { getActionTermContext, useTranslation } from 'common/i18n';

const ActionLinksBlock = (props) => {
  const { links } = props;
  const { t } = useTranslation();

  return (
    <>
      <h4>{t('read-more')}</h4>
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
  )
}

export default ActionLinksBlock;
