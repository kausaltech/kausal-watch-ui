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
    const { action } = this.props;
    
    return (
      <diV><Link>Prev</Link> | Next</diV>
    );
  }
}


export default ActionPager;
