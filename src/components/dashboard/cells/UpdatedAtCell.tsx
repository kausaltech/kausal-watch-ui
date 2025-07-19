import dayjs from 'common/dayjs';
import styled from 'styled-components';

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

const UpdatedAtCell = ({ action }: Props) => (
  <Wrapper>{dayjs(action.updatedAt).fromNow(false)}</Wrapper>
);

export default UpdatedAtCell;
