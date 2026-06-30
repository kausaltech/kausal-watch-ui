import styled from '@emotion/styled';

export const ImageCredit = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.1rem 0.25rem;
  background-color: rgba(255, 255, 255, 0.66);
  color: #000000;
  font-size: ${(props) => props.theme.fontSizeXs};
  font-family: ${(props) => `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`};
  z-index: 1;
`;
