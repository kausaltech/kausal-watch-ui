'use client';

import { Fragment, useSyncExternalStore } from 'react';

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
 * Re-renders the caller directly after hydration, and then once per refresh
 * interval. Returns 0 while rendering on the server and during the hydration
 * render, and a non-zero tick from the first client render onwards.
 */
const useClockTick = () => useSyncExternalStore(subscribeToClock, getClockTick, getServerClockTick);

const UpdatedAtCell = ({ action }: Props) => {
  const tick = useClockTick();

  /*
   * `fromNow()` is relative to the current time, so the string rendered during
   * SSR differs from the one rendered at hydration whenever the two straddle a
   * rounding boundary -- "a minute ago" against "2 minutes ago", say.
   * `suppressHydrationWarning` tells React to accept the server text rather
   * than report a hydration error, and the DOM therefore keeps it.
   *
   * Getting that text replaced takes more than a re-render. React records the
   * string the hydration render produced as the text node's props while the
   * node itself still holds the server string, so the two have already
   * diverged; a later render that produces the same string again diffs equal
   * against those props and React never touches the DOM. The server text would
   * then survive until `fromNow()` itself moved on, which for a timestamp
   * around the 21-hours/a-day boundary is some fourteen hours.
   *
   * So key the text on whether this is the hydration render. The key changes
   * exactly once, immediately after hydration, which makes React drop the text
   * node and mount a fresh one from the client's clock. From then on the props
   * and the DOM agree again and the interval's re-renders diff normally.
   */
  return (
    <Wrapper suppressHydrationWarning>
      <Fragment key={tick === 0 ? 'hydrating' : 'hydrated'}>
        {dayjs(action.updatedAt).fromNow(false)}
      </Fragment>
    </Wrapper>
  );
};

export default UpdatedAtCell;
