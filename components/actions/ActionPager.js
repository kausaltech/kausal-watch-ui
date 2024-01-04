import React from 'react';
import styled from 'styled-components';
import { ActionLink, actionPropType } from '../../common/links';
import Icon from '../common/Icon';
import Button from '../common/Button';
import { getActionTermContext } from '../../common/i18n';
import { usePlan } from 'context/plan';
import { useTranslations } from 'next-intl';

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

const ActionPager = (props) => {
  const { nextAction = null, previousAction = null } = props;
  const plan = usePlan();
  const t = useTranslations();

  return (
    <Pager>
      <Previous>
        {previousAction && (
          <ActionLink action={previousAction}>
            <a>
              <PageButton color="primary" outline>
                <Icon name="arrowLeft" />
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
                <Icon name="arrowRight" />
              </PageButton>
            </a>
          </ActionLink>
        )}
      </Next>
    </Pager>
  );
};

ActionPager.propTypes = {
  previousAction: actionPropType,
  nextAction: actionPropType,
};

export default ActionPager;
