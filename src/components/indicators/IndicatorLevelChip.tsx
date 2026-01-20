import { useTranslations } from 'next-intl';
import { readableColor } from 'polished';
import styled from 'styled-components';

import { getActionTermContext } from '@/common/i18n';
import { IndicatorListLink } from '@/common/links';
import { usePlan } from '@/context/plan';

import { getIndicatorTranslation } from './IndicatorCard';

const IndicatorLevel = styled.span<{ $level: string }>`
  a {
    display: inline-block;
    border-radius: ${(props) => props.theme.badgeBorderRadius};
    padding: ${(props) => props.theme.badgePaddingY} ${(props) => props.theme.badgePaddingX};
    font-weight: ${(props) => props.theme.badgeFontWeight};

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
    }} !important;

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

    &:hover {
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
      text-decoration: underline;
    }
  }
`;

const IndicatorLevelChip = ({ level }: { level: string }) => {
  const t = useTranslations();
  const plan = usePlan();
  // FIXME: It sucks that we only use the context for the translation key 'action'
  const indicatorType =
    level === 'action'
      ? t('action', getActionTermContext(plan))
      : level != null
        ? getIndicatorTranslation(level, t)
        : null;
  return (
    <IndicatorLevel $level={level}>
      <IndicatorListLink>
        <span>{indicatorType}</span>
      </IndicatorListLink>
    </IndicatorLevel>
  );
};

export default IndicatorLevelChip;
