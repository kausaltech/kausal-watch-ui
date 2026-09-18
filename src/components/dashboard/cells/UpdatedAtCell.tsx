'use client';

import { useSyncExternalStore } from 'react';

import styled from '@emotion/styled';

import dayjs from '@/common/dayjs';

import { type ActionListAction } from '../dashboard.types';

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

const subscribeToClock = (onStoreChange: () => void) => {
  const id = setInterval(onStoreChange, REFRESH_INTERVAL_MS);

  return () => clearInterval(id);
};

// Bucketed so that the snapshot is stable between ticks rather than changing on
// every read. It is never 0, which is what makes it differ from the server
// snapshot — see `useClockTick`.
const getClockTick = () => Math.floor(Date.now() / REFRESH_INTERVAL_MS);
const getServerClockTick = () => 0;

/**
 * Re-renders the caller once directly after hydration, and then once per
 * refresh interval.
 *
 * The post-hydration render is the point: React renders with the server
 * snapshot while hydrating and afterwards compares it against the client
 * snapshot. Those two never match here, so the re-render is guaranteed.
 */
const useClockTick = () => useSyncExternalStore(subscribeToClock, getClockTick, getServerClockTick);

const UpdatedAtCell = ({ action }: Props) => {
  // `fromNow()` is relative to the current time, so the value rendered during
  // SSR differs from the one rendered at hydration whenever the two straddle a
  // rounding boundary. `suppressHydrationWarning` tells React to accept the
  // server text instead of reporting a hydration error, which also means the
  // DOM keeps that text until this component re-renders. Recomputing from an
  // effect is not enough to cause one: the recomputed string is normally the
  // string the hydration render already produced, so the state does not change
  // and React bails out without touching the DOM, leaving the server value on
  // screen until the relative label happens to move on — which for a timestamp
  // a day or more old can take hours. `useClockTick` forces the render.
  useClockTick();

  return <Wrapper suppressHydrationWarning>{dayjs(action.updatedAt).fromNow(false)}</Wrapper>;
};

export default UpdatedAtCell;
