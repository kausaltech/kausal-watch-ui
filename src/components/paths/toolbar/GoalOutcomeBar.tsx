import { NetworkStatus, gql, useQuery, useReactiveVar } from '@apollo/client';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { max, min, sortBy } from 'lodash-es';
import { useFormatter, useTranslations } from 'next-intl';
import ContentLoader from 'react-content-loader';
import { Button, CardBody, UncontrolledCollapse } from 'reactstrap';

import type {
  GetInstanceGoalOutcomeQuery,
  GetInstanceGoalOutcomeQueryVariables,
} from '@/common/__generated__/paths/graphql';
import type { TFunction } from '@/common/i18n';
import Icon from '@/components/common/Icon';
import { activeGoalVar, activeScenarioVar, yearRangeVar } from '@/context/paths/cache';
import { usePaths } from '@/context/paths/paths';
import { getHttpHeaders } from '@/utils/paths/paths.utils';

export const GET_INSTANCE_GOAL_OUTCOME = gql`
  query GetInstanceGoalOutcome($goal: ID!) {
    instance {
      id
      goals(id: $goal) {
        values {
          year
          goal
          actual
          isForecast
          isInterpolated
        }
        unit {
          htmlShort
        }
      }
    }
  }
`;

const OutcomeBarLoader = (props) => (
  <ContentLoader
    speed={2}
    width={500}
    height={80}
    viewBox="0 0 500 80"
    backgroundColor="#f4f4f4"
    foregroundColor="#d6d6d6"
    {...props}
  >
    <rect x="100" y="33" rx="2" ry="2" width="385" height="6" />
    <rect x="100" y="45" rx="2" ry="2" width="385" height="6" />
    <rect x="100" y="58" rx="2" ry="2" width="385" height="6" />
  </ContentLoader>
);

const AccordionHeader = styled(Button)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-align: left;
  border-radius: 0;
  //border-bottom: 2px solid ${(props) => props.theme.graphColors.grey050};
  border-top: none;
  border-left: none;
  border-right: none;
  background-color: ${(props) => props.theme.graphColors.grey000};
  color: ${(props) => props.theme.graphColors.grey090};
  //box-shadow: 0 0 4px 4px rgba(20,20,20,0.05);
  //border-top: 2px solid ${(props) => props.theme.graphColors.grey050};

  &:hover,
  &:active,
  &:focus {
    background-color: ${(props) => props.theme.graphColors.grey010} !important;
    color: ${(props) => props.theme.graphColors.grey090} !important;
  }
`;

const OutcomeText = styled.div`
  font-size: ${({ theme }) => theme.fontSizeSm};
  line-height: ${({ theme }) => theme.lineHeightMd};
`;

const EmissionsBar = styled.div<{ $disabled?: boolean }>`
  position: relative;
  margin: 2.5rem auto;
  max-width: 500px;
  height: 24px;
  opacity: ${({ $disabled = false }) => ($disabled ? 0.5 : 1)};
`;

type BarLabelProps = {
  $side?: 'top' | undefined;
  $negative: boolean;
  $placement: number;
  $small?: boolean;
};

const BarLabel = styled.div<BarLabelProps>`
  font-size: 0.75rem;
  text-align: ${(props) => (props.$small ? 'right' : 'left')};
  white-space: nowrap;
  line-height: 1;
  z-index: 1001 + ${(props) => props.$placement};
  position: absolute;
  padding: ${(props) =>
    props.$side === 'top'
      ? `0 5px ${12 + props.$placement * 7}px 5px`
      : `${24 - props.$placement * 7}px 5px 0 5px`};
  bottom: ${(props) => (props.$side === 'top' ? '0' : 'auto')};
  left: ${(props) => (props.$negative || props.$small ? 'auto' : '-1px')};
  right: ${(props) => (props.$small ? (props.$negative ? '-1px' : '100%') : 'auto')};
  border-left: ${(props) =>
    !props.$small ? `1px solid ${props.theme.graphColors.grey070}` : 'none'};
  border-right: ${(props) =>
    props.$small ? `1px solid ${props.theme.graphColors.grey070}` : 'none'};
  font-weight: 700;
`;

const Label = styled.div`
  background-color: ${(props) => props.theme.graphColors.grey000};
`;

const Value = styled.div`
  background-color: ${(props) => props.theme.graphColors.grey000};
  font-weight: 400;
`;

const Unit = styled.span`
  font-size: 0.75rem;
`;

type EmissionBarProps = {
  $barWidth: number;
  $barColor: string;
  $placement: number;
  $zeroOffset: number;
};

const EmissionBar = styled.div<EmissionBarProps>`
  position: absolute;
  top: ${(props) => props.$placement * 7}px;
  right: ${(props) => (props.$barWidth < 0 ? 0 : `${Math.abs(props.$zeroOffset)}%`)};
  height: 6px;
  width: ${(props) => Math.abs(props.$barWidth)}%;
  background-color: ${(props) => props.$barColor};
  border-right: ${(props) =>
    props.$barWidth > 0 ? `1px solid ${props.theme.graphColors.grey070}` : 'none'};
  border-left: ${(props) =>
    props.$barWidth < 0 ? `1px solid ${props.theme.graphColors.grey070}` : 'none'};
`;

const Card = styled.div`
  background-color: ${(props) => props.theme.graphColors.grey000};
  padding: 1rem;
`;

type Formatter = ReturnType<typeof useFormatter>;

type BarWithLabelProps = {
  label: string;
  value: number;
  unit: string;
  barWidth: number;
  barColor: string;
  labelSide?: 'top' | undefined;
  placement: number;
  zeroOffset: number;
  format: Formatter;
};

function BarWithLabel(props: BarWithLabelProps) {
  const { label, value, unit, barWidth, barColor, labelSide, placement, zeroOffset, format } =
    props;

  return (
    <EmissionBar
      $barWidth={barWidth}
      $barColor={barColor}
      $placement={placement}
      $zeroOffset={zeroOffset}
    >
      <BarLabel
        $side={labelSide}
        $placement={placement}
        $negative={barWidth < 0}
        $small={barWidth < 20}
      >
        <Label>{label}</Label>
        <Value>
          {format.number(value, { maximumSignificantDigits: 2 })}{' '}
          <Unit dangerouslySetInnerHTML={{ __html: unit }} />
        </Value>
      </BarLabel>
    </EmissionBar>
  );
}

function outcomeAsText(
  isForecast: boolean,
  scenarioName: string,
  goalType: string,
  selectedYear: number,
  selectedYearDifference: string,
  selectedYearValue: string,
  nearestGoalYear: number,
  nearestGoalValue: string,
  t: TFunction
) {
  if (isForecast)
    return t.markup('outcome-bar-summary-forecast', {
      scenarioName: scenarioName,
      goalType: goalType,
      selectedYear: selectedYear,
      selectedYearValue: selectedYearValue,
      nearestGoalYear: nearestGoalYear,
      nearestGoalValue: nearestGoalValue,
      strong: (chunks) => `<b>${chunks}</b>`,
      interpolation: { escapeValue: false },
    });
  return t.markup('outcome-bar-summary-historical', {
    goalType: goalType,
    selectedYear: selectedYear,
    selectedYearDifference: selectedYearDifference,
    nearestGoalYear: nearestGoalYear,
    nearestGoalValue: nearestGoalValue,
    strong: (chunks) => `<b>${chunks}</b>`,
    interpolation: { escapeValue: false },
  });
}

type GoalOutcomeBarProps = {
  compact?: boolean;
};

type GoalOutcomeBarBar = {
  label: string;
  value: number;
  unit: string;
  barColor: string;
  barWidth: number;
  labelSide?: 'top';
  placement?: number;
};

function GoalOutcomeBar(props: GoalOutcomeBarProps) {
  const { compact } = props;
  const t = useTranslations();
  const format = useFormatter();
  const theme = useTheme();
  const paths = usePaths();
  const activeScenario = useReactiveVar(activeScenarioVar);
  const yearRange = useReactiveVar(yearRangeVar);
  const activeGoal = useReactiveVar(activeGoalVar);

  const { loading, error, data, networkStatus } = useQuery<
    GetInstanceGoalOutcomeQuery,
    GetInstanceGoalOutcomeQueryVariables
  >(GET_INSTANCE_GOAL_OUTCOME, {
    context: {
      uri: '/api/graphql-paths',
      headers: getHttpHeaders({ instanceIdentifier: paths?.instance.id }),
    },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    variables: {
      goal: activeGoal?.id || '',
    },
    skip: !activeGoal?.id,
  });

  const refetching = networkStatus === NetworkStatus.refetch;
  if (!activeGoal?.id) return null;

  if (loading && !refetching) return <OutcomeBarLoader />;
  if (error) return <div>error!</div>;
  if (!data || !data.instance.goals.length) return <div>no data</div>;

  const goal = data.instance.goals[0];
  const firstForecastYear = goal.values.find((val) => val.isForecast)?.year;
  const isForecast = yearRange[1] >= firstForecastYear!;
  const valuesByYear = new Map(goal.values.map((goal) => [goal.year, goal]));
  const unit = goal.unit.htmlShort;
  const historical = goal.values.filter((val) => !val.isForecast);
  const goalValues = goal.values.filter((val) => val.goal !== null);
  const outcomeNow = historical[historical.length - 1];
  // Use the closest goal value to the end of the year range
  const comparisonGoal =
    goalValues.filter((v) => v.year >= yearRange[1])[0] || goalValues[goalValues.length - 1];
  // const comparisonGoal = goalValues[goalValues.length - 1];
  const comparisonActual = valuesByYear.get(yearRange[1])!;

  const maxOutcome = max([outcomeNow.actual, comparisonActual.actual, comparisonGoal.goal])!;
  const minOutcome = min([outcomeNow.actual, comparisonActual.actual, comparisonGoal.goal])!;
  const totalRange = minOutcome < 0 ? maxOutcome - minOutcome : maxOutcome;
  const zeroOffset = minOutcome < 0 ? (minOutcome / totalRange) * 100 : 0;
  const outcomeColor =
    comparisonActual.actual! > comparisonGoal.goal!
      ? theme.graphColors.red050
      : theme.graphColors.green050;
  const outcomeNowWidth = (outcomeNow.actual! / totalRange) * 100;
  const outcomeTotalWidth = (comparisonActual.actual! / totalRange) * 100;
  const outcomeTargetWidth = (comparisonGoal.goal! / totalRange) * 100;

  const bars: GoalOutcomeBarBar[] = sortBy(
    [
      {
        label: `${t('emissions')} ${outcomeNow.year}`,
        value: outcomeNow.actual!,
        unit,
        barColor: theme.graphColors.grey030,
        barWidth: outcomeNowWidth,
        labelSide: undefined,
      } satisfies GoalOutcomeBarBar,
      {
        label: `${
          isForecast ? t('scenario-outcome') : t('historical-outcome')
        } ${comparisonActual.year}`,
        value: comparisonActual.actual!,
        unit,
        barColor: outcomeColor,
        barWidth: outcomeTotalWidth,
        labelSide: 'top',
      } satisfies GoalOutcomeBarBar,
      {
        label: `${t('target')} ${comparisonGoal.year}`,
        value: comparisonGoal.goal!,
        unit,
        barColor: theme.graphColors.green050,
        barWidth: outcomeTargetWidth,
        labelSide: undefined,
      } satisfies GoalOutcomeBarBar,
    ],
    [(bar) => -bar.value]
  );

  const missingFromTarget = comparisonActual.actual! - comparisonGoal.goal!;

  let longUnit = goal.unit.htmlShort;
  // FIXME: Nasty hack to show 'CO2e' where it might be applicable until
  // the backend gets proper support for unit specifiers.
  if (unit === 't∕(Einw.·a)') {
    longUnit = t.raw('tco2-e-inhabitant') as string;
  } else if (unit === 'kt∕a') {
    longUnit = t.raw('ktco2-e') as string;
  }

  const verbalizedOutcome = outcomeAsText(
    isForecast,
    activeScenario.name,
    activeGoal.label || '',
    yearRange[1],
    `${format.number(missingFromTarget, {
      maximumSignificantDigits: 2,
    })} ${longUnit}`,
    `${format.number(comparisonActual.actual!, {
      maximumSignificantDigits: 2,
    })} ${longUnit}`,
    comparisonGoal.year,
    `${format.number(comparisonGoal.goal!, {
      maximumSignificantDigits: 2,
    })} ${longUnit}`,
    t
  );

  return (
    <>
      {compact ? (
        <div>
          <EmissionsBar $disabled={refetching} aria-live="polite">
            {bars.map((bar, index) => (
              <BarWithLabel
                {...bar}
                key={bar.label}
                placement={index}
                zeroOffset={zeroOffset}
                format={format}
              />
            ))}
          </EmissionsBar>
        </div>
      ) : (
        <>
          <AccordionHeader color="primary" id="outcome-toggler" className="settings-section-header">
            <div>
              <h4>{isForecast ? t('scenario-outcome') : t('historical-outcome')}</h4>
              <OutcomeText dangerouslySetInnerHTML={{ __html: verbalizedOutcome }} />
            </div>
            <Icon name="angle-down" width="24px" height="24px" />
          </AccordionHeader>
          <UncontrolledCollapse toggler="#outcome-toggler" defaultOpen>
            <Card>
              <CardBody>
                <div>
                  <EmissionsBar>
                    {bars.map((bar, index) => (
                      <BarWithLabel
                        {...bar}
                        key={bar.label}
                        placement={index}
                        zeroOffset={zeroOffset}
                        format={format}
                      />
                    ))}
                  </EmissionsBar>
                </div>
              </CardBody>
            </Card>
          </UncontrolledCollapse>
        </>
      )}
    </>
  );
}

export default GoalOutcomeBar;
