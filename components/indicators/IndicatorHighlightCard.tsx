import React from 'react';
import { Card, CardImgOverlay, CardBody, CardTitle } from 'reactstrap';
import styled from 'styled-components';
import { getActionTermContext } from 'common/i18n';
import { IndicatorLink } from 'common/links';
import { usePlan } from 'context/plan';
import { readableColor } from 'polished';
import { beautifyValue } from 'common/data/format';
import { useTranslations } from 'next-intl';
import { getIndicatorTranslation } from './IndicatorCard';

const IndicatorType = styled.div`
  margin-bottom: 0.5em;
  text-align: left;
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) =>
    `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`};
  color: ${(props) => props.theme.neutralDark};
`;

const IndicatorBg = styled.div<{ $level: string }>`
  height: ${(props) => props.theme.spaces.s600};
  background-color: ${(props) => {
    switch (props.$level) {
      case 'action':
        return props.theme.actionColor;
      case 'operational':
        return props.theme.graphColors.blue070;
      case 'tactical':
        return props.theme.graphColors.blue030;
      case 'strategic':
        return props.theme.graphColors.blue010;
      default:
        return '#cccccc';
    }
  }};
`;

const StyledCard = styled(Card)`
  width: 100%;
  background-color: ${(props) => props.theme.themeColors.light};
  transition: all 0.5s ease;
  border-width: ${(props) => props.theme.cardBorderWidth};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  overflow: hidden;
  a {
    color: ${(props) => props.theme.neutralDark};
  }
  &:hover {
    transform: translateY(-5px);
    box-shadow: 4px 4px 8px rgba(82, 90, 101, 0.5);
  }
`;

const IndicatorValue = styled.div<{ $level: string }>`
  margin-top: ${(props) => props.theme.spaces.s050};
  font-size: ${(props) => props.theme.fontSizeXl};
  font-weight: ${(props) => props.theme.fontWeightBold};
  line-height: ${(props) => props.theme.lineHeightSm};
  color: ${(props) => {
    switch (props.$level) {
      case 'action':
        return readableColor(props.theme.actionColor);
      case 'operational':
        return readableColor(props.theme.graphColors.blue070);
      case 'tactical':
        return readableColor(props.theme.graphColors.blue030);
      case 'strategic':
        return readableColor(props.theme.graphColors.blue010);
      default:
        return props.theme.themeColors.black;
    }
  }};
`;

const IndicatorUnit = styled.span`
  margin-left: 0.25em;
  font-size: ${(props) => props.theme.fontSizeSm};
`;

const StyledCardTitle = styled(CardTitle)`
  margin-bottom: 0;
  font-size: ${(props) => props.theme.fontSizeMd};
  color: ${(props) => props.theme.neutralDark};
  text-align: left;
  hyphens: manual;
`;

type IndicatorHighlightCardProps = {
  level: string | null | undefined;
  objectid: string;
  name: string;
  value?: number;
  unit?: string;
};

function IndicatorHighlightCard({
  level,
  objectid,
  name,
  value,
  unit = '',
}: IndicatorHighlightCardProps) {
  const t = useTranslations();
  const plan = usePlan();

  // FIXME: It sucks that we only use the context for the translation key 'action'
  const indicatorType =
    level === 'action'
      ? t('action', getActionTermContext(plan))
      : getIndicatorTranslation(level ?? null, t);

  return (
    <StyledCard>
      <IndicatorLink id={objectid} prefetch={false}>
        <a>
          <IndicatorBg $level={level} />
          <CardImgOverlay>
            <IndicatorValue $level={level} className="action-number">
              {typeof value === 'number' ? beautifyValue(value) : '-'}
              <IndicatorUnit>{unit === 'no unit' ? '' : unit}</IndicatorUnit>
            </IndicatorValue>
          </CardImgOverlay>
        </a>
      </IndicatorLink>
      <CardBody>
        <IndicatorType>{indicatorType}</IndicatorType>
        <IndicatorLink id={objectid}>
          <a>
            <StyledCardTitle tag="h3">{name}</StyledCardTitle>
          </a>
        </IndicatorLink>
      </CardBody>
    </StyledCard>
  );
}

export default IndicatorHighlightCard;
