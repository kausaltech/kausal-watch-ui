import styled from '@emotion/styled';

import { useTranslations } from 'next-intl';

import { titleHyphenation } from '@common/themes/styles/hyphenation';

import { type IndicatorDetailsQuery } from '@/common/__generated__/graphql';
import { useContainedLayout } from '@/common/hooks/use-contained-layout';
import { getIndicatorTermContext } from '@/common/i18n';
import { IndicatorListLink } from '@/common/links';
import { Col, Container, Row } from '@/components/common/layout/LayoutGrid';
import IndicatorValueSummary from '@/components/indicators/IndicatorValueSummary';
import OrgSelector, { type OrganizationOption } from '@/components/orgs/OrgSelector';
import { usePlan } from '@/context/plan';

import IndicatorLevelChip from './IndicatorLevelChip';

const Hero = styled.header<{ $contained?: boolean }>`
  position: relative;
  background-color: ${(props) =>
    props.$contained ? 'transparent' : props.theme.pageHeaderBackgroundColor};
  margin-bottom: ${(props) => props.theme.spaces.s400};
  a {
    color: ${(props) => props.theme.linkColor};

    &:hover {
      color: ${(props) => props.theme.linkColor};
    }
  }
`;

const PrimaryOrg = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s100};
  padding-bottom: ${(props) => props.theme.spaces.s100};
  border-bottom: 1px solid #eeeeee;
`;

const HeroCardBg = styled.div`
  margin-bottom: -${(props) => props.theme.spaces.s400};
  background-color: white;
  border-radius: ${(props) => props.theme.cardBorderRadius};
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
`;

const CardContent = styled.div<{ $flush?: boolean }>`
  padding: ${({ theme, $flush }) => ($flush ? `${theme.spaces.s200} 0 0` : theme.spaces.s150)};

  ${(props) => props.theme.breakpoints.up('md')} {
    padding: ${({ theme, $flush }) => ($flush ? `${theme.spaces.s300} 0 0` : theme.spaces.s200)};
  }

  /* The grid column keeps the title margin from collapsing into the hero's */
  ${({ $flush }) => $flush && `> h1:last-child { margin-bottom: 0; }`}
`;

const OverlayContainer = styled.div<{ $legacyMode: boolean }>`
  display: flex;
  align-items: flex-end;
  min-height: ${(props) => (props.$legacyMode ? '18rem' : '14rem')};
  padding: ${(props) => props.theme.spaces.s300} 0 ${(props) => props.theme.spaces.s300};
`;

const IndexLink = styled.span`
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

const IndicatorHeadline = styled.h1`
  ${titleHyphenation}
  /* Long compound words would otherwise widen a narrow page */
  overflow-wrap: break-word;
  margin: ${(props) => props.theme.spaces.s100} 0 ${(props) => props.theme.spaces.s200};
  font-size: ${(props) => props.theme.fontSizeXl};
  color: ${(props) => props.theme.themeColors.black} !important;

  ${(props) => props.theme.breakpoints.up('md')} {
    display: flex;
    font-size: ${(props) => props.theme.fontSizeXl};
  }
`;

interface IndicatorHeroProps {
  indicator: NonNullable<IndicatorDetailsQuery['indicator']>;
  orgs: OrganizationOption[] | null;
  goals: NonNullable<NonNullable<IndicatorDetailsQuery['indicator']>['goals']>;
  legacyMode?: boolean;
  /** Defaults to `contained` when the contained layout is on (see useContainedLayout) */
  layout?: IndicatorHeroLayout;
}

export type IndicatorHeroLayout = 'overlay' | 'contained';

type IndicatorHeroCardProps = Omit<IndicatorHeroProps, 'layout'> & {
  /** Lay the content out in the page flow rather than as a padded card */
  flush?: boolean;
};

function IndicatorHeroCard(props: IndicatorHeroCardProps) {
  const { indicator, orgs, goals, legacyMode = false, flush } = props;
  const t = useTranslations();
  const plan = usePlan();
  const indicatorTermContext = getIndicatorTermContext(plan);

  const options = {
    referenceValue: {
      show: true,
      year: null,
      defaultReferenceValue: null,
    },
    currentValue: {
      show: false,
    },
    goalValue: {
      show: true,
      defaultGoalYear: null,
    },
    goalGap: {
      show: true,
    },
    nonQuantifiedGoal: {
      trend: null,
      date: null,
    },
    valueRounding: indicator.valueRounding ?? null,
  };

  return (
    <CardContent $flush={flush}>
      {orgs && orgs.length > 0 && (
        <PrimaryOrg>
          <OrgSelector orgs={orgs} />
        </PrimaryOrg>
      )}
      <IndicatorListLink>
        <IndexLink>{t('indicators', indicatorTermContext)}</IndexLink>
      </IndicatorListLink>
      <IndicatorHeadline>
        <span>{indicator.name}</span>
      </IndicatorHeadline>
      {legacyMode && goals.length > 0 && (
        <IndicatorValueSummary
          timeResolution={indicator.timeResolution}
          values={indicator.values}
          unit={indicator.unit}
          goals={goals}
          desiredTrend={indicator.desiredTrend}
          options={options}
        />
      )}
      {legacyMode && indicator.level && <IndicatorLevelChip level={indicator.level} />}
    </CardContent>
  );
}

function IndicatorHero(props: IndicatorHeroProps) {
  const containedLayout = useContainedLayout();
  const layout: IndicatorHeroLayout = props.layout ?? (containedLayout ? 'contained' : 'overlay');

  if (layout === 'contained') {
    return (
      <Hero $contained>
        <Container>
          <Row>
            {/* Same width as the main column in IndicatorContent */}
            <Col md={7} lg={8}>
              <IndicatorHeroCard {...props} flush />
            </Col>
          </Row>
        </Container>
      </Hero>
    );
  }

  return (
    <Hero>
      <OverlayContainer $legacyMode={props.legacyMode ?? false}>
        <Container>
          <Row>
            <Col lg={8}>
              <HeroCardBg>
                <IndicatorHeroCard {...props} />
              </HeroCardBg>
            </Col>
          </Row>
        </Container>
      </OverlayContainer>
    </Hero>
  );
}

export default IndicatorHero;
