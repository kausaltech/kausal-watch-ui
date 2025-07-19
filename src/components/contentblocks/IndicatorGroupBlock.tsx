import React from 'react';

import {
  Indicator,
  IndicatorGroupBlock as TIndicatorGroupBlock,
} from 'common/__generated__/graphql';
import { IndicatorLink, IndicatorListLink } from 'common/links';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import IndicatorHighlightCard from 'components/indicators/IndicatorHighlightCard';
import IndicatorVisualisation from 'components/indicators/IndicatorVisualisation';
import { useTranslations } from 'next-intl';
import { readableColor } from 'polished';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';

import { usePlan } from '@/context/plan';

import { SectionHeader } from './ActionListBlock';

const IndicatorGraphSection = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  padding: ${(props) => props.theme.spaces.s100};
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
  background-color: ${(props) => props.theme.themeColors.white};
  padding: ${(props) => props.theme.spaces.s300};
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

type IndicatorItemProps = {
  indicator: Indicator;
  display: IndicatorStyle;
  linkToPage?: boolean;
};

const IndicatorItem = (props: IndicatorItemProps) => {
  const { indicator, display, linkToPage = true } = props;
  if (display === 'graph')
    return (
      <Col className="mb-5" lg={{ size: 8 }}>
        <IndicatorContainer>
          {linkToPage ? (
            <IndicatorLink id={indicator.id}>
              <a>
                <h3>
                  {indicator.name}
                  <Icon.ArrowRight color="" />
                </h3>
              </a>
            </IndicatorLink>
          ) : (
            <h3>{indicator.name}</h3>
          )}
          <IndicatorVisualisation indicatorId={indicator.id} />
        </IndicatorContainer>
      </Col>
    );

  return (
    <Col md={6} xl={4} className="mb-5">
      <IndicatorHighlightCard
        level={indicator.level}
        objectid={indicator.id}
        name={indicator.name}
        value={indicator.latestValue?.value}
        unit={indicator.unit.name}
      />
    </Col>
  );
};

const StyledColCentered = styled(Col)`
  display: flex;
  justify-content: center;
`;

const StyledRow = styled(Row)`
  margin-top: ${(props) => props.theme.spaces.s400};
`;

type Props = {
  id?: string;
  title?: string;
  indicators: NonNullable<TIndicatorGroupBlock['indicators']>;
};

// TODO: Format as list for a11y
const IndicatorGroupBlock = ({ id = '', title, indicators }: Props) => {
  const t = useTranslations();
  const displayHeader = title === '-' ? null : title || t('indicators');
  const plan = usePlan();

  const hasIndicatorsPage =
    plan.mainMenu?.items.findIndex((menuItem) => menuItem?.page?.slug === 'indicators') !== -1;

  return (
    <IndicatorGraphSection id={id}>
      <Container>
        {displayHeader ? <SectionHeader>{displayHeader}</SectionHeader> : null}
        <StyledRow className="justify-content-center">
          {indicators.map((item) => (
            <IndicatorItem
              indicator={item.indicator}
              display={item.style}
              key={item.indicator.id}
              linkToPage={hasIndicatorsPage}
            />
          ))}
        </StyledRow>
        {hasIndicatorsPage && (
          <Row>
            <StyledColCentered>
              <IndicatorListLink>
                <Button color="primary" tag="a">
                  {t('see-all-indicators')} <Icon.ArrowRight />
                </Button>
              </IndicatorListLink>
            </StyledColCentered>
          </Row>
        )}
      </Container>
    </IndicatorGraphSection>
  );
};

export default IndicatorGroupBlock;
