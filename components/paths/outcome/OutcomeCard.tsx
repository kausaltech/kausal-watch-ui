import { useEffect, useRef } from 'react';

import chroma from 'chroma-js';
import { useFormatter, useTranslations } from 'next-intl';
import styled from 'styled-components';

import { getMetricChange, getMetricValue } from '@/common/paths/preprocess';
import ContentLoader from '@/components/common/ContentLoader';
import DashCard from '@/components/paths/DashCard';

const StyledTab = styled.div<{ $disabled: boolean }>`
  flex: 0 0 175px;
  margin: 0 0.25rem 0;
  cursor: ${(props) => (props.$disabled ? 'default' : 'pointer')};
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.$disabled ? 'none' : 'auto')};

  &:first-child {
    margin-left: 0;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  &.root h2 {
    font-size: 1.5rem;
  }
`;

const Title = styled.div`
  // border-left: 6px solid ${(props) => props.color};
  // padding-left: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Name = styled.h2`
  margin-bottom: 0;
  font-size: 1rem;
`;

const Status = styled.div`
  margin-top: 0.5rem;
  white-space: nowrap;
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textColor.tertiary};
`;

const Body = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 0.5rem;
`;

const MainValue = styled.div`
  text-align: left;
  font-size: 1.25rem;
  line-height: 1.2;
  font-weight: 700;
`;

const NoValue = styled.div`
  text-align: left;
  font-weight: 700;
  color: ${({ theme }) => theme.graphColors.grey030};
  &:before {
    content: '—';
  }
`;

const Label = styled.div<{ $active?: boolean }>`
  font-size: 0.7rem;
  font-weight: 700;
  color: ${({ theme, $active }) =>
    $active ? theme.textColor.primary : theme.textColor.tertiary};
`;

const MainUnit = styled.span`
  margin-left: 0.25rem;
  font-size: 0.6rem;
`;

// bottom: ${(props) => props.$size > 0 ? props.offset * 100 : 0}%;
const ProportionBarBar = styled.div<{ $size: number; $color: string }>`
  position: absolute;
  bottom: ${(props) => (props.$size > 0 ? '0' : 'auto')}%;
  //bottom: 0;
  top: ${(props) => (props.$size > 0 ? 'auto' : '0')}%;
  left: 0;
  height: ${(props) => Math.abs(props.$size) * 100}%;
  width: 14px;
  background-color: ${(props) => props.$color};
`;

const ProportionBarContainer = styled.div<{ $active: boolean }>`
  position: absolute;
  height: 170px;
  bottom: ${(props) => (props.$active ? '36px' : '0')};
  left: 0;
  width: 12px;
`;

const ProportionBar = ({
  size,
  color,
  active,
  offset,
}: {
  size: number;
  color: string;
  active: boolean;
  offset?: number;
}) => {
  return (
    <ProportionBarContainer $active={active}>
      <ProportionBarBar $size={size} $color={color} />
    </ProportionBarContainer>
  );
};

type OutcomeCardProps = {
  node: OutcomeNodeFieldsFragment;
  startYear: number;
  endYear: number;
  //subNodes: OutcomeNodeFieldsFragment[],
  state: 'open' | 'closed';
  hovered: boolean;
  active: boolean;
  onHover: (evt) => void;
  handleClick: (segmentId: string) => void;
  color: string;
  total: number;
  positiveTotal: number;
  negativeTotal: number;
  refetching: boolean;
  hideForecast: boolean | null;
  disabled: boolean;
};

const OutcomeCard = (props: OutcomeCardProps) => {
  const {
    node,
    state,
    hovered,
    onHover,
    handleClick,
    active,
    color,
    startYear,
    endYear,
    total,
    positiveTotal,
    negativeTotal,
    refetching,
    hideForecast,
    disabled,
  } = props;

  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (active && cardRef.current)
      cardRef.current.scrollIntoView({
        inline: 'center',
        behavior: 'smooth',
        block: 'nearest',
      });
  }, [active]);

  const separateYearsColorChange = hideForecast ? 1.75 : 0;
  const displayColor = chroma(color).brighten(separateYearsColorChange).hex();
  //console.log(state);
  const t = useTranslations();
  const format = useFormatter();
  const baseOutcomeValue = getMetricValue(node, startYear) || 0;
  const goalOutcomeValue = getMetricValue(node, endYear);
  const change = getMetricChange(baseOutcomeValue, goalOutcomeValue);
  const lastMeasuredYear =
    node?.metric.historicalValues[node.metric.historicalValues.length - 1]
      ?.year;
  const isForecast = !lastMeasuredYear || endYear > lastMeasuredYear;

  // const unit = `kt CO<sub>2</sub>e${t('abbr-per-annum')}`;
  const unit = node.metric?.unit?.htmlShort;

  const handleClickTab = () => handleClick(node.id);

  const handleKeyDownOnTab = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter' || e.code === 'Space') {
      e.preventDefault();
      handleClick(node.id);
    }
  };

  return (
    <StyledTab
      key={node.id}
      role="tab"
      tabIndex={0}
      $disabled={disabled}
      onMouseEnter={() => (disabled ? undefined : onHover(node.id))}
      onMouseLeave={() => (disabled ? undefined : onHover(undefined))}
      onClick={disabled ? undefined : handleClickTab}
      onKeyDown={disabled ? undefined : handleKeyDownOnTab}
      aria-selected={active}
      aria-controls={`tabpanel-${node.id}`}
      aria-disabled={disabled}
    >
      <DashCard
        state={state}
        hovered={hovered}
        active={active}
        color={displayColor}
        refProp={cardRef}
      >
        {refetching && <ContentLoader />}

        <ProportionBar
          size={
            goalOutcomeValue || goalOutcomeValue === 0
              ? goalOutcomeValue / total
              : 0
          }
          color={displayColor}
          active={active}
          offset={negativeTotal < 0 ? Math.abs(negativeTotal / total) : 0}
        />
        <Header className={state}>
          <Title color={displayColor}>
            <Name>{node.shortName || node.name}</Name>
          </Title>
        </Header>

        <Body>
          <MainValue>
            <Label $active={active}>
              {isForecast
                ? t('table-scenario-forecast')
                : t('table-historical')}{' '}
              {endYear}
            </Label>
            {goalOutcomeValue !== undefined ? (
              <>
                {format.number(goalOutcomeValue, {
                  maximumSignificantDigits: 2,
                })}
                <MainUnit dangerouslySetInnerHTML={{ __html: unit || '' }} />
              </>
            ) : (
              <NoValue />
            )}

            <Status>
              <Label>
                {t('change-over-time')} {startYear} - {endYear}
              </Label>
              {change ? (
                <>
                  {change > 0 && <span>+</span>}
                  {change ? (
                    <span>{`${format.number(change, {
                      style: 'unit',
                      unit: 'percent',
                    })}`}</span>
                  ) : (
                    <span>-</span>
                  )}
                </>
              ) : (
                <NoValue />
              )}
            </Status>
          </MainValue>
        </Body>
      </DashCard>
    </StyledTab>
  );
};

export default OutcomeCard;
