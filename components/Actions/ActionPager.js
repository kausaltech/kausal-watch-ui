import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardImgOverlay, CardBody,
  CardTitle, Progress,
} from 'reactstrap';
import styled from 'styled-components';
import { Link } from '../../routes';

class ActionPager extends React.Component {

  render() {
    const { next, previous } = this.props;
    return (
      <div>
        <Link route="action" params={{ id: previous }} passHref={ true }><a>Edellinen toimenpide</a></Link>
        {' '}|{' '}
        <Link route="action" params={{ id: next }} passHref={ true }><a>Seuraava toimenpide</a></Link>
      </div>
    );
  }
}


export default ActionPager;
 