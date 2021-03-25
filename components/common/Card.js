import React from 'react';
import PropTypes from 'prop-types';
import {
  Card as BSCard, CardBody,
} from 'reactstrap';
import styled from 'styled-components';
import { transparentize } from 'polished';
import { Spring } from 'react-spring/renderprops.cjs';

const StyledCard = styled(BSCard)`
  width: 100%;
  transition: all 0.5s ease;
  overflow: hidden;
  border-width: ${(props) => props.theme.cardBorderWidth};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) => (props.customcolor ? props.customcolor : props.theme.themeColors.white)};
  box-shadow: 2px 2px 8px ${(props) => transparentize(0.9, props.theme.themeColors.dark)};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 4px 4px 8px ${(props) => transparentize(0.8, props.theme.themeColors.dark)};
  }

  &.negative {
    color: ${(props) => props.theme.themeColors.white};
    background-color: ${(props) => (props.customcolor ? props.customcolor : props.theme.themeColors.black)};

    h1, h2, h3, h4, h5, h6 {
      color: ${(props) => props.theme.themeColors.white};
    }
  }

  a::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }
`;

const ImgArea = styled.div`
  position: relative;
  background-color: ${(props) => props.imageTone};
`;

const ImgBg = styled.div`
  height: 9rem;
  background-image: url(${(props) => props.background});
  background-position: ${(props) => props.imageAlign};
  background-size: cover;
  mix-blend-mode: multiply;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    height: 8rem;
  }
`;

const Card = (props) => {
  const {
    imageUrl,
    imageTone,
    imageAlign,
    negative,
    customColor,
    children } = props;

  return (
    <Spring
      from={{ opacity: 0 }}
      to={{ opacity: 1 }}
    >
      {(springProps) => (
        <StyledCard
          style={springProps}
          className={negative && 'negative'}
          customcolor={customColor}
        >
          {imageUrl && (
            <ImgArea imageTone={imageTone}>
              <ImgBg background={imageUrl} imageAlign={imageAlign} />
            </ImgArea>
          )}
          <CardBody>
            { children }
          </CardBody>
        </StyledCard>
      )}
    </Spring>
  );
};

Card.defaultProps = {
  imageUrl: '',
  imageAlign: 'center',
  imageTone: '#ffffff',
  negative: false,
  customColor: '',
};

Card.propTypes = {
  imageUrl: PropTypes.string,
  imageAlign: PropTypes.string,
  imageTone: PropTypes.string,
  negative: PropTypes.bool,
  customColor: PropTypes.string,
  children: PropTypes.element.isRequired,
};

export default Card;
