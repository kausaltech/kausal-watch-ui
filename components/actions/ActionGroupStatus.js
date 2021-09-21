import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'common/i18n';
import { gql, useQuery } from '@apollo/client';
import styled, { useTheme } from 'styled-components';
import PlanContext from 'context/plan';
import { getStatusData } from 'common/preprocess';

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

  return (
    <>
      <dt>{t('action-progress')}</dt>
      <dd>
        <Status>
          <BarGraph>
            {statusData?.labels.map((segment, indx) => (
              <Segment
                key={segment}
                color={statusData.colors[indx]}
                portion={(statusData.values[indx] / actionCount) * 100}
              />
            ))}
          </BarGraph>
          <Labels>
            {statusData?.labels.map((segment, indx) => (
              <SegmentLabel key={segment} portion={(statusData.values[indx] / actionCount) * 100}>
                <span className="value">
                  { Math.round((statusData.values[indx] / actionCount) * 100) }
                  %
                </span>
                <span>
                  {' '}
                  { statusData.labels[indx] }
                </span>
              </SegmentLabel>
            ))}
          </Labels>
        </Status>
      </dd>
    </>
  );
}

// TODO: prop types and defaults
ActionGroupStatus.propTypes = {
};

ActionGroupStatus.defaultProps = {
};

export default ActionGroupStatus;
