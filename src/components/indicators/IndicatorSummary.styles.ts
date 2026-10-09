import styled from '@emotion/styled';

// Equal columns that wrap onto new rows when the summary is narrow (aside
// column, mobile), so a long unit wraps within its column instead of
// pushing the row wider than its container
export const ValueSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: ${(props) => props.theme.spaces.s100};
  align-items: start;
  text-align: left;
  margin-bottom: ${(props) => props.theme.spaces.s100};
  padding-top: ${(props) => props.theme.spaces.s100};
  border-top: 1px solid ${(props) => props.theme.graphColors.grey030};
  border-bottom: 1px solid ${(props) => props.theme.graphColors.grey030};
`;

export const ValueBlock = styled.div`
  min-width: 0;
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

/**
 * Units longer than this always go on their own line under the number, so
 * every column wraps alike whatever the length of its number.
 */
const LONG_UNIT_LENGTH = 12;

export const isLongUnit = (unit: string | null | undefined) =>
  (unit?.length ?? 0) > LONG_UNIT_LENGTH;

// A short unit is atomic: it fits after the number or moves under it whole.
// Either way it wraps with its own line height, not the number's.
export const ValueUnit = styled.span<{ $long?: boolean }>`
  display: ${(props) => (props.$long ? 'block' : 'inline-block')};
  margin: ${(props) => (props.$long ? '0' : '0 0.5em 0 0.25em')};
  font-size: ${(props) => props.theme.fontSizeBase};
  font-weight: ${(props) => props.theme.fontWeightNormal};
  color: ${(props) => props.theme.themeColors.dark};
  /* Units without spaces (e.g. long compound words) may break anywhere */
  overflow-wrap: anywhere;
`;
