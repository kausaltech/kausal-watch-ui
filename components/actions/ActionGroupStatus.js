import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'common/i18n';
import { gql, useQuery } from '@apollo/client';
import styled, { useTheme } from 'styled-components';
import PlanContext from 'context/plan';
import { getStatusData } from 'common/preprocess';
import CategoryMetaBar from './CategoryMetaBar';

export const GET_ACTION_STATUSES = gql`
  query GetActionStatuses($plan: ID!, $actionCategory: ID) {
    planActions(plan: $plan, category: $actionCategory) {
      id
      identifier
      plan {
        id
      }
      status {
        id
        identifier
        name
      }
      implementationPhase {
        id
        identifier
        name
      }
      mergedWith {
        id
        identifier
        plan {
          id
          shortName
          viewUrl
        }
      }
    }
  }
`;

const Status = styled.div`
  color: ${(props) => props.theme.themeColors.black};
`;

const BarGraph = styled.div`
  display: flex;
  height: 1rem;
  width: auto;
`;

const Segment = styled.div`
  background-color: ${(props) => props.color};
  width:  ${(props) => props.portion}%;
  height: 1rem;
`;

const Labels = styled.div`
  display: flex;
  width: auto;
`;

const SegmentLabel = styled.span`
  display: flex;
  flex-direction: column;
  flex-basis:  ${(props) => props.portion}%;
  text-align: left;
  margin: ${(props) => props.theme.spaces.s050} ${(props) => props.theme.spaces.s050} 0 0;
  font-size: ${(props) => props.theme.fontSizeSm};
  line-height: ${(props) => props.theme.lineHeightMd};

  span {
    align-self: flex-start;
  }

  .value {
    font-weight: ${(props) => props.theme.fontWeightBold};
  }
`;

function ActionGroupStatus(props) {
  const { category } = props;
  const plan = useContext(PlanContext);
  const { t } = useTranslation(['actions']);
  const theme = useTheme();
  let statusData = {};
  let actionCount = 0;
  const { loading, error, data } = useQuery(GET_ACTION_STATUSES, {
    variables: { plan: plan.identifier, actionCategory: category },
  });

  if (loading) return <div />;
  if (error) return <div />;

  const { planActions } = data;
  statusData = getStatusData(planActions, plan.actionStatuses, theme);
  actionCount = statusData.values.reduce((total, num) => total + num, 0);

  if (statusData.values.length < 1) return null;

  const segments = statusData?.labels.map((segment, indx) => ({
    id: segment,
    label: statusData.labels[indx],
    value: `${Math.round((statusData.values[indx] / actionCount) * 100)} %`,
    portion: statusData.values[indx] / actionCount,
    color: statusData.colors[indx]
  }));

  return (
    <>
      <CategoryMetaBar
        title={t('action-progress')}
        segments={segments}
      />
    </>
  );
}

// TODO: prop types and defaults
ActionGroupStatus.propTypes = {
};

ActionGroupStatus.defaultProps = {
};

export default ActionGroupStatus;
