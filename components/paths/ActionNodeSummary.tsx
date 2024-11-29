import React, { useEffect } from 'react';

import {
  ActionNode,
  InstanceGoalEntry,
} from 'common/__generated__/paths/graphql';

import ActionParameters from 'components/paths/ActionParameters';
import { useFormatter, useTranslations } from 'next-intl';

import styled from 'styled-components';

import HighlightValue from '@/components/paths/HighlightValue';
import { yearRangeVar } from '@/context/paths/cache';
import PathsActionNode from '@/utils/paths/PathsActionNode';
import { useReactiveVar } from '@apollo/client';

const Values = styled.div<{ $muted: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 0 10px;
  align-items: stretch;
  height: 100%;
  background-color: ${({ $muted, theme }) =>
    $muted ? theme.cardBackground.secondary : theme.themeColors.white};

  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spaces.s100};
  }
`;

const ValuesHeader = styled.div`
  flex: 100% 0 0;
  padding: 0 0.5rem;
  font-weight: 700;
  font-size: 0.75rem;
  line-height: 1.25rem;
`;

const SubValue = styled.div`
  flex: 45% 1 0;

  > div {
    height: 100%;
  }
`;

const ParametersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 45% 1 0;
  align-items: center;
  height: 100%;
`;

type PathsActionNodeContentProps = {
  categoryId: string;
  node: ActionNode;
  refetching: boolean;
  onLoaded: (id: string, impact: number) => void;
  displayGoal?: InstanceGoalEntry;
};

const ActionNodeSummary = (props: PathsActionNodeContentProps) => {
  const { categoryId, node, refetching = false, onLoaded, displayGoal } = props;
  const t = useTranslations();
  const format = useFormatter();
  const yearRange = useReactiveVar(yearRangeVar);
  const pathsAction = new PathsActionNode(node);
  const impact = pathsAction.getYearlyImpact(yearRange[1]) || 0;

  useEffect(() => {
    onLoaded(categoryId, impact);
    // Using exhaustive deps here causes an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearRange[1]]);

  return (
    <Values $muted={refetching || !pathsAction.isEnabled()}>
      <ValuesHeader>{displayGoal?.label}</ValuesHeader>
      <SubValue>
        <HighlightValue
          displayValue={
            pathsAction.isEnabled()
              ? format.number(impact, { maximumSignificantDigits: 2 })
              : '-'
          }
          header={`${t('impact')} (${yearRange[1]})`}
          unit={pathsAction.getUnit() || ''}
          size="md"
          muted={refetching || !pathsAction.isEnabled()}
          mutedReason={
            !pathsAction.isEnabled() ? t('action-not-included-in-scenario') : ''
          }
        />
      </SubValue>
      <ParametersWrapper>
        <ActionParameters parameters={node.parameters} />
      </ParametersWrapper>
    </Values>
  );
};

export default ActionNodeSummary;
