import styled from '@emotion/styled';
import { useFormatter } from 'next-intl';

import type {
  IndicatorDetailsQuery,
  IndicatorFactorValueSummaryContentBlockFragmentFragment,
} from '@/common/__generated__/graphql';

import PopoverTip from '../common/PopoverTip';
import {
  ValueBlock,
  ValueDate,
  ValueDisplay,
  ValueLabel,
  ValueSummary,
  ValueUnit,
} from './IndicatorSummary.styles';
import { getComputedMetricSeries } from './indicatorFactorUtils';

const ContentBlockWrapper = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s300};
`;

const BlockLabel = styled.h2`
  font-size: ${(props) => props.theme.fontSizeMd};
  font-weight: ${(props) => props.theme.fontWeightBold};
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

const SummarySection = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s200};
`;

const MetricTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spaces.s050};
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

const MetricTitle = styled.h3`
  margin: 0;
  font-size: ${(props) => props.theme.fontSizeBase};
  font-weight: ${(props) => props.theme.fontWeightBold};
  line-height: ${(props) => props.theme.lineHeightSm};
`;

type Props = {
  block: IndicatorFactorValueSummaryContentBlockFragmentFragment;
  indicator: NonNullable<IndicatorDetailsQuery['indicator']>;
};

const getYear = (date: string) => date.split('-')[0] ?? '';

export default function IndicatorFactorValueSummaryBlock({ block, indicator }: Props) {
  const format = useFormatter();
  const series = getComputedMetricSeries(indicator.datasets);

  if (!series.length) return null;

  return (
    <ContentBlockWrapper>
      {block.fieldLabel && (
        <BlockLabel>
          {block.fieldLabel}
          {block.fieldHelpText && block.id && (
            <PopoverTip content={block.fieldHelpText} identifier={block.id} />
          )}
        </BlockLabel>
      )}

      {series.map((metric) => {
        const reference = metric.referencePoint;
        const latest = metric.latestPoint;

        if (!reference || !latest) return null;

        return (
          <SummarySection key={metric.key}>
            <MetricTitleRow>
              <MetricTitle>{metric.label}</MetricTitle>
            </MetricTitleRow>

            <ValueSummary>
              <ValueBlock>
                <ValueLabel>Reference value</ValueLabel>
                <ValueDate>{getYear(reference.date)}</ValueDate>
                <ValueDisplay>
                  <div>
                    {format.number(reference.value)}
                    {metric.unit && <ValueUnit>{metric.unit}</ValueUnit>}
                  </div>
                </ValueDisplay>
              </ValueBlock>

              <ValueBlock>
                <ValueLabel>Latest value</ValueLabel>
                <ValueDate>{getYear(latest.date)}</ValueDate>
                <ValueDisplay>
                  <div>
                    {format.number(latest.value)}
                    {metric.unit && <ValueUnit>{metric.unit}</ValueUnit>}
                  </div>
                </ValueDisplay>
              </ValueBlock>
            </ValueSummary>
          </SummarySection>
        );
      })}
    </ContentBlockWrapper>
  );
}
