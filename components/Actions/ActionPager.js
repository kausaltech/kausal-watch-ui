import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import Router, { withRouter } from 'next/router';
import styled from 'styled-components';

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

  const handleClick = (e) => {
    const targetAction = e.target.attributes.params.value;
    const href = `/action/${targetAction}`;
    const as = href;
    Router.push(href, as, { shallow: true });
  };

  return (
    <Pager>
      <Previous>
        { previousId
          && (
            <PageButton params={previousId} onClick={handleClick} outline color="primary">
              <Icon name="arrowLeft" />
              Edellinen toimenpide
            </PageButton>
          )
        }
      </Previous>
      <Next>
        { nextId
          && (
            <PageButton params={nextId} onClick={handleClick} outline color="primary">
              Seuraava toimenpide
              <Icon name="arrowRight" />
            </PageButton>
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

export default withRouter(ActionPager);
