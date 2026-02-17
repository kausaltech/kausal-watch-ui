import { NetworkStatus, gql, useQuery, useReactiveVar } from '@apollo/client';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

import type {
  GetActionListQuery,
  GetActionListQueryVariables,
} from '@/common/__generated__/graphql';
import { activeGoalVar } from '@/common/cache';
import { findActionEnabledParam } from '@/common/preprocess';
import ContentLoader from '@/components/common/ContentLoader';
import { GET_ACTION_LIST } from '@/queries/getActionList';

import ParameterWidget from './ParameterWidget';

const GlobalParametersPanel = styled.div`
  max-height: 400px;
  overflow-y: auto;
  padding: 2rem 0;
  background-color: ${(props) => props.theme.themeColors.white};
  border-top: 1px solid ${(props) => props.theme.graphColors.grey050};
  border-bottom: 1px solid ${(props) => props.theme.graphColors.grey050};
`;

const ActionsList = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 0.5rem 1rem;
`;

const ActionsListItem = styled.div`
  flex: 1 1 320px;
`;

const ActionCard = styled.div<{ $isActive: boolean; $groupColor: string }>`
  position: relative;
  flex: 1 1 320px;
  min-height: 3rem;
  height: 100%;
  padding: 0.25rem 0.5rem 0.25rem 1rem;
  border: 1px solid ${(props) => props.theme.graphColors.grey010};
  border-left: 4px solid ${(props) => props.$groupColor};
  border-radius: 0.25rem;
  background-color: ${(props) =>
    props.$isActive ? props.theme.themeColors.white : props.theme.graphColors.grey010};

  &:hover {
    background-color: ${(props) => props.theme.graphColors.grey010};
  }

  a {
    display: block;
    text-decoration: none;
    width: 100%;
    height: 100%;
  }

  a,
  a > h6 {
    color: ${(props) =>
      props.$isActive ? props.theme.graphColors.grey090 : props.theme.graphColors.grey050};
  }
`;

const WidgetWrapper = styled.div`
  font-size: 0.8rem;

  .form-check-input {
    &:checked {
      background-color: ${(props) => props.theme.brandDark};
      border-color: ${(props) => props.theme.brandDark};
    }
  }

  .form-check-label {
    margin-left: 0.5rem;
    line-height: 1;
  }
`;

const SET_PARAMETER = gql`
  mutation SetGlobalParameterFromActionSummary(
    $parameterId: ID!
    $boolValue: Boolean
    $numberValue: Float
    $stringValue: String
  ) {
    setParameter(
      id: $parameterId
      boolValue: $boolValue
      numberValue: $numberValue
      stringValue: $stringValue
    ) {
      ok
      parameter {
        isCustomized
        isCustomizable
        ... on BoolParameterType {
          boolValue: value
          boolDefaultValue: defaultValue
        }
      }
    }
  }
`;

type ActionListCardProps = {
  action: ActionsSummaryAction;
  refetching: boolean;
};

const ActionListCard = (props: ActionListCardProps) => {
  const { action, refetching } = props;
  const actionParameterSwitch = findActionEnabledParam(action.parameters);
  const isActive = !refetching && (actionParameterSwitch?.boolValue ?? false);
  const theme = useTheme();

  return (
    <ActionCard $isActive={isActive} $groupColor={action.group?.color ?? theme.actionColor}>
      <small>{action.group?.name}</small>
      <h5>{action.name}</h5>
      {actionParameterSwitch && (
        <ParameterWidget
          key={actionParameterSwitch.id}
          parameter={actionParameterSwitch}
          WidgetWrapper={WidgetWrapper}
        />
      )}
    </ActionCard>
  );
};

type ActionsSummaryAction = GetActionListQuery['actions'][0];

const ActionsSummary = () => {
  const activeGoal = useReactiveVar(activeGoalVar);
  const { t } = useTranslation();
  const queryResp = useQuery<GetActionListQuery, GetActionListQueryVariables>(GET_ACTION_LIST, {
    variables: {
      goal: activeGoal?.id ?? null,
    },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  const { error, loading, networkStatus, previousData } = queryResp;
  const data = queryResp.data ?? previousData;
  const refetching = networkStatus === NetworkStatus.refetch;

  if (loading && !previousData) {
    return <ContentLoader />;
  }
  if (error) {
    return (
      <>
        <div>{t('error-loading-data')}</div>
      </>
    );
  }

  const actions = (data?.actions ?? []).filter((action) => action.decisionLevel === 'MUNICIPALITY');
  const activeActions = actions.filter((action) => {
    const { parameters } = action;
    const enabledParam = parameters.find(
      (param) => param.node && param.id === `${param.node.id}.enabled`
    ) as ((typeof parameters)[0] & { __typename: 'BoolParameterType' }) | null;
    if (!enabledParam) return false;
    return enabledParam.boolValue;
  });

  return (
    <GlobalParametersPanel>
      <p>
        {t('active-actions', {
          count: activeActions.length,
          total: actions.length,
        })}
      </p>
      <ActionsList>
        {actions.map((action) => {
          return (
            <ActionsListItem key={action.id}>
              <ActionListCard action={action} refetching={refetching} />
            </ActionsListItem>
          );
        })}
        <ActionsListItem />
        <ActionsListItem />
      </ActionsList>
    </GlobalParametersPanel>
  );
};

export default ActionsSummary;
