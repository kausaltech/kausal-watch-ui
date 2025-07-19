import styled from 'styled-components';

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
  const formattedDate = date ? dayjs(date).format('L') : null;
  return <Wrapper>{formattedDate}</Wrapper>;
};

export default DateCell;
