import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import { Link } from '../../routes';
import { ActionLink } from '../../common/links';
import Icon from '../common/Icon';

const Pager = styled.div`
  display: flex;
`;

const Previous = styled.div`
  flex: 1;
`;

const Next = styled.div`
  flex: 1;
  text-align: right;
`;

const PageButton = styled(Button)`
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
  const { nextId, previousId } = props;

  return (
    <Pager>
      <Previous>
        { previousId
          && (
            <ActionLink id={previousId}>
              <PageButton color="primary" outline><Icon name="arrowLeft" />Edellinen toimenpide</PageButton>
            </ActionLink>
          )
        }
      </Previous>
      <Next>
        { nextId
          && (
            <ActionLink id={nextId}>
              <PageButton color="primary" outline>Seuraava toimenpide <Icon name="arrowRight" /></PageButton>
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
};

ActionPager.defaultProps = {
  previousId: '',
  nextId: '',
};

export default ActionPager;
