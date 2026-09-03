import type React from 'react';

import { Paper } from '@mui/material';

import styled from '@emotion/styled';

import { useTranslations } from 'next-intl';
import { Alert, Col, Container, Row } from 'reactstrap';

import type { StreamFieldFragment } from '@/common/__generated__/graphql';
import { deploymentType } from '@/common/environment';
import RichText from '@/components/common/RichText';
import IndicatorProgressBar from '@/components/indicators/IndicatorProgressBar';
import IndicatorVisualisation from '@/components/indicators/IndicatorVisualisation';

import {
  canNormalize,
  getNormalizedUnit,
  getNormalizedValue,
  normalizesByDefault,
} from './indicatorShowcase.utils';

type IndicatorShowcaseBlockData = Extract<
  StreamFieldFragment,
  { __typename: 'IndicatorShowcaseBlock' }
>;
type Indicator = NonNullable<IndicatorShowcaseBlockData['indicator']>;

interface IndicatorShowcaseBlockProps {
  id?: string;
  title: IndicatorShowcaseBlockData['title'];
  body: IndicatorShowcaseBlockData['body'];
  significantDigits: IndicatorShowcaseBlockData['significantDigits'];
  indicatorIsNormalized: IndicatorShowcaseBlockData['indicatorIsNormalized'];
  indicator: Indicator;
  linkButton: IndicatorShowcaseBlockData['linkButton'];
}

const IndicatorShowcase = styled.div`
  padding: var(--block-padding-top) 0 var(--block-padding-bottom);
  background-color: ${({ theme }) => theme.section.indicatorShowcase.background};
  color: ${({ theme }) => theme.section.indicatorShowcase.color};
  text-align: center;

  h2 {
    color: ${({ theme }) => theme.section.indicatorShowcase.color};
  }

  a {
    color: ${({ theme }) => theme.section.indicatorShowcase.color};
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
`;

const IndicatorShowcaseBlock = (props: IndicatorShowcaseBlockProps) => {
  const {
    id = '',
    indicator,
    title,
    body,
    significantDigits,
    indicatorIsNormalized,
    linkButton,
  } = props;

  const t = useTranslations();
  const goals = indicator.goals ?? [];
  const lastGoal = goals[goals.length - 1];
  const firstValue = indicator.values[0];
  const lastValue = indicator.values[indicator.values.length - 1];

  const indicatorHasGoal = goals.length > 0;

  const pageLinkButton =
    linkButton?.__typename === 'PageLinkBlock'
      ? { text: linkButton.text ?? undefined, page: linkButton.page }
      : null;

  let indicatorVisualisation: React.ReactNode | null = null;
  if (!indicatorHasGoal) {
    indicatorVisualisation = (
      <>
        {deploymentType !== 'production' && (
          <Alert color="warning">
            {t('error-no-goals', { indicatorName: indicator?.name ?? 'undefined' })}
          </Alert>
        )}
        <Paper>
          <IndicatorVisualisation indicatorId={indicator.id} />
        </Paper>
      </>
    );
  } else {
    // Only show normalization if all values including goal are available as normalized
    const normalizable = canNormalize(firstValue, lastValue, lastGoal, indicator);
    const normalizeByDefault = normalizesByDefault(normalizable, indicatorIsNormalized);

    const baseValue = {
      date: firstValue.date ?? '',
      value: firstValue.value,
      normalizedValue: getNormalizedValue(firstValue, indicator),
    };

    const latestValue = {
      date: lastValue.date ?? '',
      value: lastValue.value,
      normalizedValue: getNormalizedValue(lastValue, indicator),
    };

    const goalValue = {
      date: lastGoal?.date ?? '',
      value: lastGoal?.value ?? 0,
      normalizedValue: getNormalizedValue(lastGoal, indicator),
    };

    const unit = {
      name: indicator.unit.shortName || indicator.unit.name || '',
      normalizedName: getNormalizedUnit(indicator),
    };
    indicatorVisualisation = (
      <IndicatorProgressBar
        indicatorId={indicator.id}
        note={indicator.name}
        linkButton={pageLinkButton}
        significantDigits={significantDigits ?? undefined}
        baseValue={baseValue}
        lastValue={latestValue}
        goalValue={goalValue}
        normalize={normalizable}
        normalizeByDefault={normalizeByDefault}
        unit={unit}
      />
    );
  }
  return (
    <IndicatorShowcase id={id}>
      <Container>
        <Row>
          <Col xl={{ size: 8, offset: 2 }} lg={{ size: 10, offset: 1 }}>
            <h2>{title}</h2>
            <RichText html={body ?? ''} className="mb-5" />
            {indicatorVisualisation}
          </Col>
        </Row>
      </Container>
    </IndicatorShowcase>
  );
};

export default IndicatorShowcaseBlock;
