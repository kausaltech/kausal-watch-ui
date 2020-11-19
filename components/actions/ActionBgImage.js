import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PlanContext from '../../context/plan';
import { getActionImageURL } from '../../common/utils';

const ImgBg = styled.div`
  background-color: ${(props) => props.bgColor};
  background-image: url(${(props) => props.bgImage});
  background-position: center;
  background-size: cover;
  background-blend-mode: multiply;
`;


function ActionBgImage(props) {
  const {
    children,
    color,
    action,
    width,
    height,
  } = props;

  return (
    <PlanContext.Consumer>
      {(plan) => (
        <ImgBg bgImage={getActionImageURL(plan, action, width, height)} bgColor={color}>
          {children}
        </ImgBg>
      )}
    </PlanContext.Consumer>
  );

}

ActionBgImage.propTypes = {
  action: PropTypes.object.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  children: PropTypes.node,
  color: PropTypes.string,
};

export default ActionBgImage;
