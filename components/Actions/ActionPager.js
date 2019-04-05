import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import { Link } from '../../routes';

import { Router } from '../../routes';
import Icon from '../Common/Icon';

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
            <Link route="action" params={{ id: previousId }} passHref={ true }><PageButton>Edellinen toimenpide</PageButton></Link>
          )
        }
      </Previous>
      <Next>
        { nextId
          && (
            <Link route="action" params={{ id: nextId }} passHref={ true }><PageButton>Seuraava toimenpide</PageButton></Link>
          )
        }
      </Next>
    </Pager>
  );
};

ActionPager.defaultProps = {
  previousId: false,
  nextId: false,
};

ActionPager.propTypes = {
  previousId: PropTypes.string,
  nextId: PropTypes.string,
};

export default ActionPager;
