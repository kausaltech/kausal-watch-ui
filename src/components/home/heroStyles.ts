import styled from '@emotion/styled';

import { transientOptions } from '@common/themes/styles/styled';

export const HeroCard = styled('div', transientOptions)<{ $cardColor: string }>`
  position: relative;
  padding: ${(props) =>
    `${props.theme.spaces.s200} ${props.theme.spaces.s200} ${props.theme.spaces.s100}`};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) =>
    props.$cardColor === 'dark' ? props.theme.brandDark : props.theme.cardBackground.primary};
  color: ${(props) =>
    props.$cardColor === 'dark' ? props.theme.themeColors.white : props.theme.neutralDark};
  box-shadow:
    0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(166, 173, 201, 0.2);
  z-index: 1;

  h1 {
    font-size: ${(props) => props.theme.fontSizeLg};
    margin-bottom: ${(props) => props.theme.spaces.s100};

    @media (min-width: ${(props) => props.theme.breakpointMd}) {
      font-size: ${(props) => props.theme.fontSizeXl};
    }
  }

  h1,
  h2,
  h3,
  h4 {
    color: ${(props) =>
      props.$cardColor === 'dark' ? props.theme.themeColors.white : props.theme.headingsColor};
  }

  a {
    color: ${(props) =>
      props.$cardColor === 'dark' ? props.theme.themeColors.white : props.theme.neutralDark};

    &:hover {
      text-decoration: none;
    }
  }

  .lead-content {
    font-size: ${(props) => props.theme.fontSizeBase};
    line-height: ${(props) => props.theme.lineHeightMd};
    font-family: ${(props) =>
      `${props.theme.fontFamilyContent}, ${props.theme.fontFamilyFallback}`};

    @media (min-width: ${(props) => props.theme.breakpointMd}) {
      font-size: ${(props) => props.theme.fontSizeMd};
    }
  }
`;
