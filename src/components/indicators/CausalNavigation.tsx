import React from 'react';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import type { IndicatorDetailsQuery } from '@/common/__generated__/graphql';
import { usePlan } from '@/context/plan';

import IndicatorCard from './IndicatorCard';
import { BlockLabel } from './IndicatorModalContentBlock';

type Indicator = NonNullable<IndicatorDetailsQuery['indicator']>;
type RelatedCause = Indicator['relatedCauses'][number];
type RelatedEffect = Indicator['relatedEffects'][number];

type CausalNavigationProps = {
  causes: Indicator['relatedCauses'];
  effects: Indicator['relatedEffects'];
};

const CausalNav = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${(props) => props.theme.spaces.s100};

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    flex-direction: row;
  }
`;

const CausalList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spaces.s100};

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    flex: 0 1 400px;
  }
`;

const CardWrapper = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

function CausalNavigation({ causes, effects }: CausalNavigationProps) {
  const t = useTranslations();
  const currentPlan = usePlan();

  const getIndicatorLink = (
    indicator: RelatedCause['causalIndicator'] | RelatedEffect['effectIndicator']
  ): string | null => {
    // If the indicator has no plans, or current plan includes the indicator, default behaviour.
    // If the indicator is connected only to another plan, link to the correct indicator page.
    if (!indicator.plans || !Array.isArray(indicator.plans) || indicator.plans.length === 0) {
      return null;
    }

    const currentPlanInList = indicator.plans.some(
      (plan) => plan.identifier === currentPlan.identifier
    );

    if (currentPlanInList) {
      return null;
    }

    const rootPlan = indicator.plans.find((plan) => !plan.parent);
    if (rootPlan) {
      return rootPlan.viewUrl;
    }

    return indicator.plans[0].viewUrl;
  };

  return (
    <CausalNav>
      <CausalList>
        {causes.length > 0 && (
          <div>
            <BlockLabel>{t('indicator-affected-by')}</BlockLabel>
            {causes.map((cause) => (
              <CardWrapper key={cause.causalIndicator.id}>
                <IndicatorCard
                  objectid={cause.causalIndicator.id}
                  name={cause.causalIndicator.name}
                  level={cause.causalIndicator.level}
                  customHref={getIndicatorLink(cause.causalIndicator)}
                />
              </CardWrapper>
            ))}
          </div>
        )}
      </CausalList>

      <CausalList>
        {effects.length > 0 && (
          <div>
            <BlockLabel>{t('indicator-has-effect-on')}</BlockLabel>
            {effects.map((effect) => (
              <CardWrapper key={effect.effectIndicator.id}>
                <IndicatorCard
                  objectid={effect.effectIndicator.id}
                  name={effect.effectIndicator.name}
                  level={effect.effectIndicator.level}
                  customHref={getIndicatorLink(effect.effectIndicator)}
                />
              </CardWrapper>
            ))}
          </div>
        )}
      </CausalList>
    </CausalNav>
  );
}

export default CausalNavigation;
