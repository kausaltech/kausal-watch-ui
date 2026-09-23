import styled from '@emotion/styled';

import { transparentize } from 'polished';
import { Card as BSCard, CardBody } from 'reactstrap';

import { transientOptions } from '@common/themes/styles/styled';

const StyledCard = styled(BSCard, transientOptions)<{
  $customColor?: string;
  $customBackgroundColor?: string;
}>`
  width: 100%;
  transition: all 0.5s ease;
  overflow: hidden;
  border-width: ${(props) => props.theme.cardBorderWidth};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) => props.$customBackgroundColor || props.theme.themeColors.white};
  color: ${(props) => (props.$customColor ? props.$customColor : props.theme.themeColors.black)};
  box-shadow: 2px 2px 8px ${(props) => transparentize(0.9, props.theme.themeColors.dark)};

  &.negative {
  }

  &.outline {
    border-color: ${(props) =>
      props.$customColor ? props.$customColor : props.theme.themeColors.white};
    border-width: 1px;
  }

  .card-body {
    line-height: ${(props) => props.theme.lineHeightMd};
    padding-bottom: 0.5rem;
  }

  /* Styles when the Card is clickable */
  a & {
    cursor: pointer;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 4px 4px 8px ${(props) => transparentize(0.8, props.theme.themeColors.dark)};
    }
  }

  /* Deprecated */
  &.negative {
    color: ${(props) => props.theme.themeColors.white};
    background-color: ${(props) =>
      props.$customColor ? props.$customColor : props.theme.themeColors.black};

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

const CardImage = styled.img<{ $imageAlign: string }>`
  display: block;
  width: 100%;
  height: 9rem;
  flex: 1 1 100%;
  object-fit: cover;
  object-position: ${(props) => props.$imageAlign};

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    height: 8rem;
  }
`;
const CategoryIcon = styled.div<{ $imageSrc: string }>`
  width: ${(props) => props.theme.spaces.s800};
  height: ${(props) => props.theme.spaces.s800};
  background-image: url(${(props) => props.$imageSrc || 'none'});
  background-size: cover;
  background-position: center center;
`;
interface CardProps {
  imageUrl?: string;
  /* Responsive candidates for the card image, see getImageSrcSet */
  imageSrcSet?: string;
  imageSizes?: string;
  imageAlign?: string;
  imageType?: 'icon' | 'image';
  colorEffect?: string;
  negative?: boolean;
  customColor?: string;
  customBackgroundColor?: string;
  children: React.ReactNode;
  outline?: boolean;
  altText?: string;
  className?: string;
}

const Card = (props: CardProps) => {
  const {
    imageUrl,
    imageSrcSet,
    imageSizes,
    colorEffect,
    imageAlign = 'center center',
    imageType = 'image',
    altText,
    customBackgroundColor,
    customColor,
    children,
    outline,
    className = '',
  } = props;

  /*
    Support icon or image as cards main image
  */
  const imageComponent = (() => {
    if (imageType === 'icon') {
      return (
        <ImgArea $colorEffect={colorEffect} data-testid="card-icon">
          {imageUrl && <CategoryIcon $imageSrc={imageUrl} />}
        </ImgArea>
      );
    }
    if (imageType === 'image' && imageUrl) {
      return (
        <ImgArea $colorEffect={colorEffect}>
          <CardImage
            src={imageUrl}
            srcSet={imageSrcSet}
            sizes={imageSrcSet ? imageSizes : undefined}
            alt={altText ?? ''}
            $imageAlign={imageAlign}
            data-testid="card-image"
          />
        </ImgArea>
      );
    }
    return null;
  })();

  return (
    <StyledCard
      className={`${className} ${outline ? 'outline' : ''}`}
      $customColor={customColor}
      $customBackgroundColor={customBackgroundColor}
      data-testid="card"
    >
      {imageComponent}
      <CardBody>{children}</CardBody>
    </StyledCard>
  );
};

export default Card;
