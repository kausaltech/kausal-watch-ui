import styled from '@emotion/styled';

import dayjs from '@/common/dayjs';

import { ActionListAction } from '../dashboard.types';

interface Props {
  action: ActionListAction;
}

const Wrapper = styled.div`
  display: inline-block;
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`};
  white-space: nowrap;
  cursor: default;
  padding: ${(props) => props.theme.spaces.s050};
`;

// `fromNow()` is computed relative to the current time, so the value produced
// during SSR can differ from the one produced at hydration (the clocks differ
// by the render-to-hydrate gap, and can straddle a rounding boundary).
// `suppressHydrationWarning` tells React to accept this expected text
// difference instead of reporting a hydration error.
const UpdatedAtCell = ({ action }: Props) => (
  <Wrapper suppressHydrationWarning>{dayjs(action.updatedAt).fromNow(false)}</Wrapper>
);

export default UpdatedAtCell;
