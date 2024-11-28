import React, { useEffect } from 'react';

import { ActionNode } from 'common/__generated__/paths/graphql';

import ActionParameters from 'components/paths/ActionParameters';
import { useFormatter, useTranslations } from 'next-intl';

import styled from 'styled-components';

import HighlightValue from '@/components/paths/HighlightValue';
import { activeGoalVar, yearRangeVar } from '@/context/paths/cache';
import PathsActionNode from '@/utils/paths/PathsActionNode';
import { useReactiveVar } from '@apollo/client';

const CardContentBlock = styled.div<{ $disabled?: boolean }>`
  margin: ${({ theme }) => `0 ${theme.spaces.s100} ${theme.spaces.s100}`};
  opacity: ${({ $disabled = false }) => ($disabled ? 0.5 : 1)};
`;

const Values = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 10px;
  align-items: stretch;
  height: 100%;
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
  align-items: flex-end;
  height: 100%;
`;

type PathsActionNodeContentProps = {
  categoryId: string;
  node: ActionNode;
  refetching: boolean;
  onLoaded: (id: string, impact: number) => void;
};

const ActionNodeSummary = (props: PathsActionNodeContentProps) => {
  const { categoryId, node, refetching = false, onLoaded } = props;
  const t = useTranslations();
  const format = useFormatter();
  const yearRange = useReactiveVar(yearRangeVar);
  const activeGoal = useReactiveVar(activeGoalVar);
  const pathsAction = new PathsActionNode(node);
  const impact = pathsAction.getYearlyImpact(yearRange[1]) || 0;

  const hideForecast = activeGoal?.hideForecast;
  useEffect(() => {
    onLoaded(categoryId, impact);
    // Using exhaustive deps here causes an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearRange[1]]);

  if (hideForecast) return <CardContentBlock>-</CardContentBlock>;
  return (
    <Values>
      <SubValue>
        <HighlightValue
          displayValue={
            pathsAction.isEnabled()
              ? format.number(impact, { maximumSignificantDigits: 2 })
              : '-'
          }
          header={`${t('impact')} ${yearRange[1]}`}
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
