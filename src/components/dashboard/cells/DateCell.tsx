import styled from '@emotion/styled';

import dayjs from '@/common/dayjs';

interface Props {
  date: string | null;
}

const Wrapper = styled.span`
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`};
  white-space: nowrap;
  padding: ${(props) => props.theme.spaces.s050};
  color: ${(props) => props.theme.textColorPrimary};
`;

const DateCell = ({ date }: Props) => {
  // These are date-only calendar values (an action's start/end date), which
  // have no time zone. Formatting them directly is deterministic across the
  // server and client; applying `.tz()` here would instead re-parse the date
  // in the local zone first and could shift it by a day, causing a mismatch.
  const formattedDate = date ? dayjs(date).format('L') : null;
  return <Wrapper>{formattedDate}</Wrapper>;
};

export default DateCell;
