import React from 'react';
import PropTypes from 'prop-types';

import { CardImg as BaseCardImg } from 'reactstrap';
import styled from 'styled-components';

import PlanContext from '../../context/plan';


const CardImg = styled(BaseCardImg)`
  mix-blend-mode: multiply;
`;

const ImgBg = styled.div`
  background-color: ${(props) => props.theme.imageOverlay};
`;


class ActionImage extends React.Component {
  getImageURL(plan) {
    const { action, height, width } = this.props;
    let url;
    if (action.imageUrl) {
      url = action.imageUrl;
    } else {
      action.categories.forEach((cat) => {
        if (url) return;
        let parent = cat;
        while (parent) {
          if (parent.imageUrl) {
            url = parent.imageUrl;
            return;
          }
          parent = parent.parent;
        }
      });
    }
    if (!url) {
      url = plan.imageUrl;
    }

    const params = [];
    if (height) {
      params.push(`height=${height}`);
    }
    if (width) {
      params.push(`width=${width}`);
    }
    if (params.length) {
      url += `?${params.join('&')}`;
    }
    return url;
  }

  render() {
    return (
      <ImgBg>
        <PlanContext.Consumer>
          {(plan) => (
            <CardImg top width="100%" src={this.getImageURL(plan)} alt="Action Image" />
          )}
        </PlanContext.Consumer>
      </ImgBg>
    );
  }
}

ActionImage.propTypes = {
  action: PropTypes.shape({}).isRequired,
  height: PropTypes.number,
  width: PropTypes.number
};

export default ActionImage;
