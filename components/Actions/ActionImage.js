import React from 'react';
import PropTypes from 'prop-types';

import { CardImg as BaseCardImg } from 'reactstrap';
import styled from 'styled-components';

import PlanContext from '../../context/plan';


const CardImg = styled(BaseCardImg)`
  mix-blend-mode: multiply;
`;

const ImgBg = styled.div`
  background-color: ${props => props.theme.brandDark};
`;


class ActionImage extends React.Component {
  getImageURL(plan) {
    const { action, height, width } = this.props;
    let url;
    if (action.image_url) {
      url = action.image_url;
    } else {
      action.categories.forEach((cat) => {
        if (url)
          return;
        while (cat) {
          if (cat.image_url) {
            url = cat.image_url;
            return;
          }
          cat = cat.parent;
        }
      });
    }
    if (!url) {
      url = plan.image_url;
    }

    const params = [];
    if (height) {
      params.push(`height=${height}`);
    }
    if (width) {
      params.push(`width=${width}`);
    }
    if (params.length) {
      url += `?${params.join('&')}`
    }
    return url;
  }
  render() {
    return (
      <ImgBg>
        <PlanContext.Consumer>
          {plan => (
            <CardImg top width="100%" src={this.getImageURL(plan)} alt="Action Image" />
          )}
        </PlanContext.Consumer>
      </ImgBg>
    );
  }
}

ActionImage.propTypes = {
  action: PropTypes.object.isRequired,
  height: PropTypes.number,
  width: PropTypes.number
};

export default ActionImage;
