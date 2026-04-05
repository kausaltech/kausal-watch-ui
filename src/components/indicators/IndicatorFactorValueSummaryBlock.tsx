import styled from '@emotion/styled';
import { useFormatter, useTranslations } from 'next-intl';

import type {
  IndicatorDetailsQuery,
  IndicatorFactorValueSummaryContentBlockFragmentFragment,
} from '@/common/__generated__/graphql';
import { IndicatorTimeResolution } from '@/common/__generated__/graphql';

import dayjs from '../../common/dayjs';
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

export default function IndicatorFactorValueSummaryBlock({ block, indicator }: Props) {
  const format = useFormatter();
  const t = useTranslations();
  const series = getComputedMetricSeries(indicator.datasets);

  let timeFormat = 'l';
  if (indicator.timeResolution === IndicatorTimeResolution.Year) {
    timeFormat = 'YYYY';
  }

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
                <ValueDate>{dayjs(reference.date).format(timeFormat)}</ValueDate>
                <ValueDisplay>
                  <div>
                    {format.number(reference.value)}
                    {metric.unit && <ValueUnit>{metric.unit}</ValueUnit>}
                  </div>
                </ValueDisplay>
              </ValueBlock>

              <ValueBlock>
                <ValueLabel>Latest value</ValueLabel>
                <ValueDate>{dayjs(latest.date).format(timeFormat)}</ValueDate>
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
