import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import { Link } from '../../routes';
import { ActionLink } from '../../common/links';
import Icon from '../common/Icon';
import { withTranslation } from '../../common/i18n';

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
  line-height: 1;

  .icon {
    fill: ${props => props.theme.brandDark} !important;
  }
  
  &:hover {
    .icon {
      fill: #ffffff !important;
    }
  }
`;

const ActionPager = (props) => {
  const { t, nextId, previousId } = props;

  return (
    <Pager>
      <Previous>
        { previousId
          && (
            <ActionLink id={previousId}>
              <PageButton color="primary" outline><Icon name="arrowLeft" />{ t('action-previous') }</PageButton>
            </ActionLink>
          )
        }
      </Previous>
      <Next>
        { nextId
          && (
            <ActionLink id={nextId}>
              <PageButton color="primary" outline>{ t('action-next') } <Icon name="arrowRight" /></PageButton>
            </ActionLink>
          )
        }
      </Next>
    </Pager>
  );
};

ActionPager.propTypes = {
  previousId: PropTypes.string,
  nextId: PropTypes.string,
  t: PropTypes.func.isRequired,
};

ActionPager.defaultProps = {
  previousId: '',
  nextId: '',
};

export default withTranslation('common')(ActionPager);
