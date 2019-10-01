import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PlanContext from '../../context/plan';


const ImgBg = styled.div`
  background-color: ${props => props.bgColor};
  background-image: url(${props => props.bgImage});
  background-position: center;
  background-size: cover;
  background-blend-mode: multiply;
`;


class ActionBgImage extends React.Component {
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
    const { children, color } = this.props;
    return (
      <PlanContext.Consumer>
        {plan => (
          <ImgBg bgImage={this.getImageURL(plan)} bgColor={color}>
            {children}
          </ImgBg>
        )}
      </PlanContext.Consumer>
    );
  }
}

ActionBgImage.propTypes = {
  action: PropTypes.object.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  children: PropTypes.node,
  color: PropTypes.string,
};

export default ActionBgImage;
