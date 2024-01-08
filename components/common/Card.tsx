import SVG from 'react-inlinesvg';
import { Card as BSCard, CardBody } from 'reactstrap';
import styled from 'styled-components';
import { transparentize } from 'polished';

const StyledCard = styled(BSCard)`
  width: 100%;
  transition: all 0.5s ease;
  overflow: hidden;
  border-width: ${(props) => props.theme.cardBorderWidth};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) =>
    props.customcolor ? props.customcolor : props.theme.themeColors.white};
  box-shadow: 2px 2px 8px
    ${(props) => transparentize(0.9, props.theme.themeColors.dark)};

  &.negative {
  }

  &.outline {
    border-color: ${(props) => props.theme.themeColors.white};
    border-width: 1px;
  }

  .card-body {
    line-height: ${(props) => props.theme.lineHeightMd};
    padding-bottom: 0.5rem;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 4px 4px 8px
      ${(props) => transparentize(0.8, props.theme.themeColors.dark)};
  }

  &.negative {
    color: ${(props) => props.theme.themeColors.white};
    background-color: ${(props) =>
      props.customcolor ? props.customcolor : props.theme.themeColors.black};

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: ${(props) => props.theme.themeColors.white};
    }
  }
`;

const ImgArea = styled.div<{ $colorEffect?: string }>`
  height: 9rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.$colorEffect || props.theme.brandDark};
  border-bottom: ${(props) => (props.$colorEffect ? '6px' : '0')} solid
    ${(props) => props.$colorEffect};

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    height: 8rem;
  }
`;

const ImgBg = styled.div<{ $background: string; $imageAlign: string }>`
  height: 9rem;
  flex: 1 1 100%;
  background-image: url(${(props) => props.$background});
  background-position: ${(props) => props.$imageAlign};
  background-size: cover;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    height: 8rem;
  }
`;

const SvgIcon = styled(SVG)`
  width: ${(props) => props.theme.spaces.s800};
  fill: white;
`;

const BitmapIcon = styled.div<{ $imageSrc: string }>`
  width: ${(props) => props.theme.spaces.s800};
  height: ${(props) => props.theme.spaces.s800};
  background-image: url(${(props) => props.$imageSrc || 'none'});
  background-size: cover;
  background-position: center center;
`;

interface CardProps {
  imageUrl?: string;
  imageAlign?: string;
  imageType?: 'svgIcon' | 'bitmapIcon' | 'image';
  colorEffect?: string;
  negative?: boolean;
  customColor?: string;
  children: React.ReactNode;
  outline?: boolean;
}

const Card = (props: CardProps) => {
  const {
    imageUrl,
    colorEffect,
    imageAlign = 'center center',
    imageType = 'image',
    negative,
    customColor,
    children,
    outline,
  } = props;

  /*
    Support svgIcon, bitmapIcon, image as cards main image
  */
  const ImageComponent = () => {
    if (imageType === 'svgIcon') {
      return (
        <ImgArea $colorEffect={colorEffect} data-testid="svg-icon">
          {imageUrl && <SvgIcon src={imageUrl} />}
        </ImgArea>
      );
    }
    if (imageType === 'bitmapIcon') {
      return (
        <ImgArea $colorEffect={colorEffect} data-testid="bitmap-icon">
          {imageUrl && <BitmapIcon $imageSrc={imageUrl} />}
        </ImgArea>
      );
    }
    if (imageType === 'image' && imageUrl) {
      return (
        <ImgArea $colorEffect={colorEffect}>
          <ImgBg
            $background={imageUrl}
            $imageAlign={imageAlign}
            data-testid="image-bg"
          />
        </ImgArea>
      );
    }
    return null;
  };

  return (
    <StyledCard
      className={`${negative && 'negative'} ${outline && 'outline'}`}
      customcolor={customColor}
      data-testid="card"
    >
      <ImageComponent />
      <CardBody>{children}</CardBody>
    </StyledCard>
  );
};

export default Card;
