import type { ReactNode } from 'react';

import styled from '@emotion/styled';

import { useTranslations } from 'next-intl';

import { usePlan } from '@/context/plan';

import { getActionTermContext } from '../../common/i18n';
import type { ActionLinkProps } from '../../common/links';
import { UnprefetchedLink, useActionHref } from '../../common/links';
import Button from '../common/Button';
import Icon from '../common/Icon';

const Pager = styled.div`
  display: flex;
  margin: 2rem 0;

  @media print {
    display: none;
  }
`;

const Previous = styled.div`
  flex: 1;
`;

const Next = styled.div`
  flex: 1;
  text-align: right;
`;

const PageButton = styled(Button)`
  line-height: ${(props) => props.theme.lineHeightSm};
`;

/** A button-styled link to an action: a single `<a>`, not a button inside a link. */
function PageLink({
  action,
  children,
}: {
  action: ActionLinkProps['action'];
  children: ReactNode;
}) {
  const href = useActionHref(action);
  return (
    <PageButton variant="outlined" href={href} LinkComponent={UnprefetchedLink}>
      {children}
    </PageButton>
  );
}

type Props = {
  previousAction: ActionLinkProps['action'] | null;
  nextAction: ActionLinkProps['action'] | null;
};

const ActionPager = ({ nextAction = null, previousAction = null }: Props) => {
  const plan = usePlan();
  const t = useTranslations();

  return (
    <Pager>
      <Previous>
        {previousAction && (
          <PageLink action={previousAction}>
            <Icon.ArrowLeft />
            {t('action-previous', getActionTermContext(plan))}
          </PageLink>
        )}
      </Previous>
      <Next>
        {nextAction && (
          <PageLink action={nextAction}>
            {t('action-next', getActionTermContext(plan))}
            <Icon.ArrowRight />
          </PageLink>
        )}
      </Next>
    </Pager>
  );
};

export default ActionPager;
