import React, { useEffect } from 'react';

import { useReactiveVar } from '@apollo/client';
import { useFormatter, useTranslations } from 'next-intl';
import styled, { useTheme } from 'styled-components';

import type {
  GetInstanceContextQuery,
  GetNodeContentQuery,
} from '@/common/__generated__/paths/graphql';
import ActionParameters from '@/components/paths/ActionParameters';
import HighlightValue from '@/components/paths/HighlightValue';
import { yearRangeVar } from '@/context/paths/cache';
import PathsActionNode from '@/utils/paths/PathsActionNode';

const ValuesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: stretch;
  justify-content: stretch;
  height: 100%;
  margin-bottom: ${({ theme }) => theme.spaces.s100};
`;

const Values = styled.div<{ $muted: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 0 10px;
  align-items: stretch;
  flex: 0 1 780px;
  background-color: ${({ theme }) => theme.themeColors.white};
  opacity: ${({ $muted }) => ($muted ? 0.5 : 1)};
`;

const ValuesHeader = styled.div`
  flex: 100% 0 0;
  padding: 0 0.5rem;
  font-weight: 700;
  font-size: 0.75rem;
  line-height: 1.25rem;
`;

const SubValue = styled.div`
  flex: 1 0 45%;

  > div {
    height: 100%;
  }
`;

const ParametersWrapper = styled.div`
  flex: 1 0 45%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

type PathsActionNodeContentProps = {
  categoryId: string;
  node: GetNodeContentQuery['node'] & { __typename: 'ActionNode' };
  refetching: boolean;
  onLoaded: (id: string, impact: number) => void;
  displayGoal?: GetInstanceContextQuery['instance']['goals'][number];
};

const ActionNodeSummary = (props: PathsActionNodeContentProps) => {
  const { categoryId, node, refetching = false, onLoaded, displayGoal } = props;
  const t = useTranslations();
  const theme = useTheme();
  const format = useFormatter();
  const yearRange = useReactiveVar(yearRangeVar);
  const pathsAction = new PathsActionNode(node);
  const impact = pathsAction.getYearlyImpact(yearRange[1]) || 0;

  useEffect(() => {
    onLoaded(categoryId, impact);
    // Using exhaustive deps here causes an infinite loop
  }, [yearRange[1]]);

  return (
    <ValuesContainer>
      <Values $muted={refetching || !pathsAction.isEnabled()}>
        <ValuesHeader>{displayGoal?.label}</ValuesHeader>
        <SubValue>
          <HighlightValue
            displayValue={
              pathsAction.isEnabled() ? format.number(impact, { maximumSignificantDigits: 2 }) : '-'
            }
            header={`${t('impact')} (${yearRange[1]})`}
            unit={pathsAction.getUnit() || ''}
            size="md"
            muted={refetching || !pathsAction.isEnabled()}
            mutedReason={!pathsAction.isEnabled() ? t('action-not-included-in-scenario') : ''}
          />
        </SubValue>
        {!theme.settings.paths.disableScenarioEditing && (
          <ParametersWrapper>
            <ActionParameters parameters={node.parameters} />
          </ParametersWrapper>
        )}
      </Values>
    </ValuesContainer>
  );
};

export default ActionNodeSummary;
