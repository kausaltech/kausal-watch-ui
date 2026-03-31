import styled from '@emotion/styled';
import { useFormatter } from 'next-intl';

import type {
  IndicatorDetailsQuery,
  IndicatorFactorValueSummaryContentBlockFragmentFragment,
} from '@/common/__generated__/graphql';

import PopoverTip from '../common/PopoverTip';
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

const ValueSummary = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spaces.s100};
  flex-direction: row;
  align-items: flex-start;
  justify-content: stretch;
  text-align: left;
  margin-bottom: ${(props) => props.theme.spaces.s100};
  padding-top: ${(props) => props.theme.spaces.s100};
  border-top: 1px solid ${(props) => props.theme.graphColors.grey030};
  border-bottom: 1px solid ${(props) => props.theme.graphColors.grey030};
`;

const ValueBlock = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`;

const ValueLabel = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s050};
  font-size: ${(props) => props.theme.fontSizeBase};
  font-weight: ${(props) => props.theme.fontWeightBold};
  line-height: ${(props) => props.theme.lineHeightSm};
`;

const ValueDate = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
  color: ${(props) => props.theme.themeColors.dark};
`;

const ValueDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  font-size: ${(props) => props.theme.fontSizeLg};
  font-weight: ${(props) => props.theme.fontWeightBold};
  line-height: ${(props) => props.theme.lineHeightSm};
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

const ValueUnit = styled.span`
  margin: 0 0.5em 0 0.25em;
  font-size: ${(props) => props.theme.fontSizeBase};
  font-weight: ${(props) => props.theme.fontWeightNormal};
  color: ${(props) => props.theme.themeColors.dark};
`;

type Props = {
  block: IndicatorFactorValueSummaryContentBlockFragmentFragment;
  indicator: NonNullable<IndicatorDetailsQuery['indicator']>;
};

const getYear = (date: string) => new Date(date).getFullYear().toString();

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
