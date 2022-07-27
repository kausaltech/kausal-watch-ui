import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ActionLink, actionPropType } from '../../common/links';
import Icon from '../common/Icon';
import Button from '../common/Button';
import { withTranslation } from '../../common/i18n';
import { usePlan } from 'context/plan';

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
  const { t, nextAction, previousAction } = props;
  const plan = usePlan();

  return (
    <Pager>
      <Previous>
        { previousAction
          && (
            <ActionLink action={previousAction}>
              <a>
                <PageButton color="primary" outline>
                  <Icon name="arrowLeft" />
                  { t('action-previous', { context: plan.generalContent.actionTerm }) }
                </PageButton>
              </a>
            </ActionLink>
          )}
      </Previous>
      <Next>
        { nextAction
          && (
            <ActionLink action={nextAction}>
              <a>
                <PageButton color="primary" outline>
                  { t('action-next', { context: plan.generalContent.actionTerm }) }
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
  t: PropTypes.func.isRequired,
};

ActionPager.defaultProps = {
  previousAction: null,
  nextAction: null,
};

export default withTranslation('common')(ActionPager);
