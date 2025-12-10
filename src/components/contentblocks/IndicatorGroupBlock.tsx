import React from 'react';

import { useTranslations } from 'next-intl';
import { readableColor } from 'polished';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';

import type { StreamFieldFragmentFragment } from '@/common/__generated__/graphql';
import { IndicatorLink, IndicatorListLink } from '@/common/links';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import IndicatorHighlightCard from '@/components/indicators/IndicatorHighlightCard';
import IndicatorVisualisation from '@/components/indicators/IndicatorVisualisation';
import { usePlan } from '@/context/plan';

import { SectionHeader } from './ActionListBlock';

const IndicatorGraphSection = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  padding: ${(props) => props.theme.spaces.s300} 0;
  color: ${(props) =>
    readableColor(
      props.theme.neutralLight,
      props.theme.themeColors.black,
      props.theme.themeColors.white
    )};

  h2 {
    text-align: center;
    margin-bottom: ${(props) => props.theme.spaces.s300};
  }
`;

const IndicatorContainer = styled.div`
  flex: 1 1 auto;
  background-color: ${(props) => props.theme.themeColors.white};
  padding: ${(props) => props.theme.spaces.s100};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  h3 {
    font-size: ${(props) => props.theme.fontSizeBase};
    color: ${(props) =>
      readableColor(
        props.theme.neutralLight,
        props.theme.themeColors.black,
        props.theme.themeColors.white
      )};
  }
`;

type IndicatorGroupBlock = Extract<
  StreamFieldFragmentFragment,
  { __typename: 'IndicatorGroupBlock' }
>;
type IndicatorGroupItems = NonNullable<IndicatorGroupBlock['indicators']>;
type IndicatorBlockItem = Extract<
  NonNullable<IndicatorGroupItems[number]>,
  { __typename: 'IndicatorBlock' }
>;
type IndicatorGroupItem = IndicatorBlockItem;

type IndicatorItemProps = {
  indicator: NonNullable<IndicatorGroupItem['indicator']>;
  display: IndicatorGroupItem['style'];
  linkToPage?: boolean;
};

function IndicatorItem(props: IndicatorItemProps) {
  const { indicator, display, linkToPage = true } = props;
  if (display === 'graph')
    return (
      <Col className="mb-4 d-flex align-items-stretch" lg={{ size: 8 }}>
        <IndicatorContainer>
          {linkToPage ? (
            <IndicatorLink id={indicator.id}>
              <h3>
                {indicator.name}
                <Icon.ArrowRight color="" />
              </h3>
            </IndicatorLink>
          ) : (
            <h3>{indicator.name}</h3>
          )}
          <IndicatorVisualisation indicatorId={indicator.id} useLegacyGraph={false} />
        </IndicatorContainer>
      </Col>
    );

  return (
    <Col md={6} xl={4} className="mb-4 d-flex align-items-stretch">
      <IndicatorHighlightCard
        level={indicator.level}
        objectid={indicator.id}
        name={indicator.name}
        value={indicator.latestValue?.value}
        unit={indicator.unit.name}
      />
    </Col>
  );
}

const StyledColCentered = styled(Col)`
  display: flex;
  justify-content: center;
`;

const StyledRow = styled(Row)`
  margin-top: ${(props) => props.theme.spaces.s200};
  align-items: stretch;
`;

type Props = {
  id?: string;
  title?: string;
  indicators: IndicatorGroupItems;
};

// TODO: Format as list for a11y
export default function IndicatorGroupBlock(props: Props) {
  const { id = '', title, indicators } = props;
  const t = useTranslations();
  const displayHeader = title === '-' ? null : title || t('indicators');
  const plan = usePlan();

  const hasIndicatorsPage =
    plan.mainMenu?.items.findIndex(
      (menuItem) =>
        menuItem?.__typename === 'PageMenuItem' &&
        menuItem?.page?.__typename === 'IndicatorListPage'
    ) !== -1;

  const openIndicatorsInModal = plan.features.indicatorsOpenInModal === true;

  const showSeeAllIndicatorsButton = hasIndicatorsPage && !openIndicatorsInModal;

  return (
    <IndicatorGraphSection id={id}>
      <Container>
        {displayHeader ? (
          <Row>
            <Col>
              <SectionHeader>{displayHeader}</SectionHeader>{' '}
            </Col>
          </Row>
        ) : null}
        <StyledRow className="justify-content-center">
          {indicators
            .filter(
              (
                item
              ): item is IndicatorBlockItem & {
                indicator: NonNullable<IndicatorBlockItem['indicator']>;
              } => item !== null && item.__typename === 'IndicatorBlock' && item.indicator !== null
            )
            .map((item) => (
              <IndicatorItem
                indicator={item.indicator}
                display={item.style}
                key={item.indicator.id}
                linkToPage={hasIndicatorsPage}
              />
            ))}
        </StyledRow>
        {showSeeAllIndicatorsButton && (
          <Row>
            <StyledColCentered>
              <IndicatorListLink>
                <Button color="primary">
                  {t('see-all-indicators')} <Icon.ArrowRight />
                </Button>
              </IndicatorListLink>
            </StyledColCentered>
          </Row>
        )}
      </Container>
    </IndicatorGraphSection>
  );
}
