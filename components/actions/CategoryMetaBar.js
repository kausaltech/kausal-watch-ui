import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { gql, useQuery } from '@apollo/client';
import { useTranslation } from 'common/i18n';
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
      color
      status {
        id
        identifier
        name
      }
      statusSummary {
        identifier
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

const CategoryMetaStatus = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s200};

  h3 {
    font-size: ${(props) => props.theme.fontSizeBase};
  }
`;

const Status = styled.div`
  color: ${(props) => props.theme.themeColors.black};
`;

const BarGraph = styled.div`
  display: flex;
  height: 1rem;
  width: auto;
  background-color: ${(props) => props.theme.themeColors.light};
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
  font-family: ${(props) => props.theme.fontFamilyTiny};
  line-height: ${(props) => props.theme.lineHeightMd};

  span {
    align-self: flex-start;
  }

  .value {
    font-weight: ${(props) => props.theme.fontWeightBold};
  }
`;

function CategoryMetaBar(props) {
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
  statusData = getStatusData(planActions, plan.actionStatusSummaries, theme);
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
    <CategoryMetaStatus>
      <h3>{t('action-progress')}</h3>
      <div>
        <Status>
          <BarGraph>
            {segments.map((segment) => (
              <Segment
                key={segment.id}
                color={segment.color}
                portion={(segment.portion) * 100}
              />
            ))}
          </BarGraph>
          <Labels>
            {segments.map((segment) => (
              <SegmentLabel key={segment.id} portion={(segments.length === 1 ? 1 : segment.portion) * 100}>
                <span className="value">
                  { segment.value }
                </span>
                <span>
                  {' '}
                  { segment.label }
                </span>
              </SegmentLabel>
            ))}
          </Labels>
        </Status>
      </div>
    </CategoryMetaStatus>
  );
}

// TODO: prop types and defaults
CategoryMetaBar.propTypes = {
};

CategoryMetaBar.defaultProps = {
};

export default CategoryMetaBar;
