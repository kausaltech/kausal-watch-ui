import styled from '@emotion/styled';

export const ValueSummary = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spaces.s100};
  flex-direction: row;
  align-items: flex-start;
  justify-content: stretch;
  text-align: left;
  margin-bottom: ${(props) => props.theme.spaces.s100};
  padding-top: ${(props) => props.theme.spaces.s100};
  border-top: 1px solid ${(props) => props.theme.graphColors.grey030};
  border-bottom: 1px solid ${(props) => props.theme.graphColors.grey030};
`;

export const ValueBlock = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`;

export const ValueLabel = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s050};
  font-size: ${(props) => props.theme.fontSizeBase};
  font-weight: ${(props) => props.theme.fontWeightBold};
  line-height: ${(props) => props.theme.lineHeightSm};
`;

export const ValueDate = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
  color: ${(props) => props.theme.themeColors.dark};
`;

export const ValueDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  font-size: ${(props) => props.theme.fontSizeLg};
  font-weight: ${(props) => props.theme.fontWeightBold};
  line-height: ${(props) => props.theme.lineHeightSm};
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

export const ValueUnit = styled.span`
  margin: 0 0.5em 0 0.25em;
  font-size: ${(props) => props.theme.fontSizeBase};
  font-weight: ${(props) => props.theme.fontWeightNormal};
  color: ${(props) => props.theme.themeColors.dark};
`;
