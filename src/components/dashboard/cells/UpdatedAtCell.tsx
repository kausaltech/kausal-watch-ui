'use client';

import { useEffect, useState } from 'react';

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

// Keep the relative timestamp reasonably current without a per-second timer.
const REFRESH_INTERVAL_MS = 60 * 1000;

const UpdatedAtCell = ({ action }: Props) => {
  // `fromNow()` is computed relative to the current time, so the value produced
  // during SSR can differ from the one produced at hydration (the clocks differ
  // by the render-to-hydrate gap, and can straddle a rounding boundary). We seed
  // state with the value for the current render — `suppressHydrationWarning`
  // tells React to accept the server text instead of reporting a hydration
  // error — and then recompute after mount so any stale server value is
  // reconciled to the client's clock. Without this, `suppressHydrationWarning`
  // would leave the server-rendered text in place indefinitely.
  const [relative, setRelative] = useState(() => dayjs(action.updatedAt).fromNow(false));

  useEffect(() => {
    const update = () => setRelative(dayjs(action.updatedAt).fromNow(false));
    update();
    const id = setInterval(update, REFRESH_INTERVAL_MS);
    return () => clearInterval(id);
  }, [action.updatedAt]);

  return <Wrapper suppressHydrationWarning>{relative}</Wrapper>;
};

export default UpdatedAtCell;
