import React from 'react';
import PropTypes from 'prop-types';
import {
  Card as BSCard, CardBody,
} from 'reactstrap';
import styled from 'styled-components';
import { transparentize } from 'polished';

const StyledCard = styled(BSCard)`
  width: 100%;
  transition: all 0.5s ease;
  overflow: hidden;
  border-width: ${(props) => props.theme.cardBorderWidth};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) => (props.customcolor ? props.customcolor : props.theme.themeColors.white)};
  box-shadow: 2px 2px 8px ${(props) => transparentize(0.9, props.theme.themeColors.dark)};

  &.negative {
  }

  &.outline {
    border-color: ${(props) => props.theme.themeColors.white};
    border-width: 1px;
  }

  .card-body {
    line-height: ${(props) => props.theme.lineHeightMd};
    padding-bottom: .5rem;
  }

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
`;

const ImgArea = styled.div`
  position: relative;
  border-bottom: ${(props) => props.colorEffect ? '6px' : '0'} solid ${(props) => props.colorEffect};
`;

const ImgBg = styled.div`
  height: 9rem;
  background-image: url(${(props) => props.background});
  background-position: ${(props) => props.imageAlign};
  background-size: cover;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    height: 8rem;
  }
`;

const Card = (props) => {
  const {
    imageUrl,
    colorEffect,
    imageAlign,
    negative,
    customColor,
    children,
    outline,
  } = props;

  return (
    <StyledCard
      className={`${negative && 'negative'} ${outline && 'outline'}`}
      customcolor={customColor}
    >
      {/* TODO: maybe animate transition */}
      {imageUrl && (
        <ImgArea colorEffect={colorEffect}>
          <ImgBg background={imageUrl} imageAlign={imageAlign} />
        </ImgArea>
      )}
      <CardBody>
        { children }
      </CardBody>
    </StyledCard>
  );
};

Card.defaultProps = {
  imageUrl: '',
  imageAlign: 'center',
  colorEffect: undefined,
  negative: false,
  customColor: '',
  outline: false,
};

Card.propTypes = {
  imageUrl: PropTypes.string,
  imageAlign: PropTypes.string,
  colorEffect: PropTypes.string,
  negative: PropTypes.bool,
  customColor: PropTypes.string,
  children: PropTypes.element.isRequired,
  outline: PropTypes.bool,
};

export default Card;
