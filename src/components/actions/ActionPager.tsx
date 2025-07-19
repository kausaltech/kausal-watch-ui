import React from 'react';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { usePlan } from '@/context/plan';

import { getActionTermContext } from '../../common/i18n';
import { ActionLink, ActionLinkProps } from '../../common/links';
import Button from '../common/Button';
import Icon from '../common/Icon';

const Pager = styled.div`
  display: flex;
  margin: 2rem 0;
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

  .icon {
    fill: ${(props) => props.theme.brandDark} !important;
  }
`;

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
          <ActionLink action={previousAction}>
            <a>
              <PageButton color="primary" outline>
                <Icon.ArrowLeft />
                {t('action-previous', getActionTermContext(plan))}
              </PageButton>
            </a>
          </ActionLink>
        )}
      </Previous>
      <Next>
        {nextAction && (
          <ActionLink action={nextAction}>
            <a>
              <PageButton color="primary" outline>
                {t('action-next', getActionTermContext(plan))}
                <Icon.ArrowRight />
              </PageButton>
            </a>
          </ActionLink>
        )}
      </Next>
    </Pager>
  );
};

export default ActionPager;
