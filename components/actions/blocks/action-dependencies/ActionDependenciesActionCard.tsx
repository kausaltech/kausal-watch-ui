import { ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  title: NonNullable<ReactNode>;
  status: {
    label: string;
    identifier: string;
  };
};

const StyledCard = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.textColor.secondary};
  background: ${({ theme }) => theme.cardBackground.secondary};
  border-radius: ${({ theme }) => theme.cardBorderRadius};
  padding: ${({ theme }) => theme.spaces.s050};
`;

export function ActionDependenciesActionCard({ title, status }: Props) {
  return <StyledCard>{title}</StyledCard>;
}
