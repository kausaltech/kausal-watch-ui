import React from 'react';

import { gql, useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import { useTranslations } from 'next-intl';
import { Col, Row } from 'reactstrap';

import ContentLoader from '@common/components/ContentLoader';

import type { IndicatorHightlightListQuery } from '@/common/__generated__/graphql';
import { IndicatorListLink } from '@/common/links';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';

import IndicatorHighlightCard from './IndicatorHighlightCard';

export const GET_INDICATOR_HIGHLIGHTS = gql`
  query IndicatorHightlightList($plan: ID!, $first: Int!, $orderBy: String!) {
    planIndicators(plan: $plan, first: $first, orderBy: $orderBy, hasData: true, hasGoals: true) {
      id
      identifier
      name
      unit {
        id
        name
        shortName
      }
      latestValue {
        id
        value
      }
      updatedAt
      level(plan: $plan)
    }
  }
`;

const ListHeader = styled(Col)`
  h2 {
    text-align: center;
    padding: ${(props) => props.theme.spaces.s100};
    border-radius: ${(props) => props.theme.cardBorderRadius};
    background-color: ${(props) => props.theme.themeColors.white};
    color: ${(props) => props.theme.headingsColor};
    margin-bottom: ${(props) => props.theme.spaces.s300};
    font-size: ${(props) => props.theme.fontSizeLg};

    @media (min-width: ${(props) => props.theme.breakpointMd}) {
      font-size: ${(props) => props.theme.fontSizeXl};
    }
  }
`;

const CardContainer = styled(Col)`
  margin-bottom: ${(props) => props.theme.spaces.s150};

  .card {
    height: 100%;
  }
`;

export type IndicatorHighlightListIndicator = NonNullable<
  IndicatorHightlightListQuery['planIndicators']
>;

type IndicatorCardListProps = {
  indicators: IndicatorHighlightListIndicator | null | undefined;
};

function IndicatorCardList(props: IndicatorCardListProps) {
  const t = useTranslations();
  const { indicators } = props;

  return (
    <Row>
      <ListHeader xs="12">
        <h2>{t('recently-updated-indicators')}</h2>
      </ListHeader>
      {indicators?.map(
        (item) =>
          item && (
            <CardContainer
              xs="12"
              md="6"
              lg="4"
              key={item?.id}
              className="mb-4 d-flex"
              style={{ transition: 'all 0.5s ease' }}
            >
              <IndicatorHighlightCard
                objectid={item?.id}
                level={item?.level}
                name={item?.name}
                value={item?.latestValue?.value}
                unit={item?.unit.shortName || item?.unit.name}
              />
            </CardContainer>
          )
      )}
      <Col xs="12" className="mt-5 mb-3">
        <IndicatorListLink>
          <Button color="primary">
            {t('see-all-indicators')} <Icon.ArrowRight />
          </Button>
        </IndicatorListLink>
      </Col>
    </Row>
  );
}

type IndicatorHighlightsListProps = {
  planIdentifier: string;
};

function IndicatorHighlightsList(props: IndicatorHighlightsListProps) {
  const t = useTranslations();
  const { planIdentifier } = props;
  const queryParams = {
    plan: planIdentifier,
    first: 6,
    orderBy: '-updatedAt',
  };

  const { loading, error, data } = useQuery<IndicatorHightlightListQuery>(
    GET_INDICATOR_HIGHLIGHTS,
    {
      variables: queryParams,
    }
  );

  if (loading) return <ContentLoader message={t('loading')} />;
  if (error) return <p>{t('error-loading-indicators')}</p>;
  return <IndicatorCardList indicators={data?.planIndicators} />;
}

export default IndicatorHighlightsList;
