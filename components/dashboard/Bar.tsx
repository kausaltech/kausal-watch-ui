// REMINDER: Is this even used?

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BarSegment from './BarSegment';
import { useTranslations } from 'next-intl';

const SegmentContainer = styled.div`
  display: flex;
  height: 4em;
  border: 2px solid ${(props) => props.theme.themeColors.dark};
  background-color: ${(props) => props.theme.themeColors.light};
`;

const ArrowContainer = styled.div`
  margin-top: -12px;
`;

const Arrow = styled.div`
  position: relative;
  z-index: 1;
  width: 20px;
  height: 20px;
  transform: rotate(45deg);
  margin-left: -10px;
  background-color: ${(props) => props.theme.themeColors.dark};
  border: 2px solid ${(props) => props.theme.themeColors.dark};
`;

// TESTME (migrated from class component)
function Bar({ onSelect, segments, active }) {
  const t = useTranslations();

  function handleSelect(segment) {
    // fire callback
    if (onSelect) {
      onSelect(segment);
    }
  }

  function calcSum() {
    let sum = 0;
    for (let i = 0; i < segments.length; i++) {
      sum += segments[i].value;
    }
    return sum;
  }

  const sum = calcSum();
  let arrowColor;

  const calcArrowPos = () => {
    let val = 0;
    for (let i = 0; i < segments.length; i++) {
      if (segments[i].id === active) {
        val += segments[i].value / 2;
        arrowColor = segments[i].color;
        break;
      }
      val += segments[i].value;
    }
    return (val / sum) * 100;
  };

  const arrowStyle = {
    left: `${calcArrowPos()}%`,
    backgroundColor: arrowColor,
  };

  return (
    <div className="mb-4">
      <SegmentContainer role="tablist" aria-label={t('dashboard-tabs')}>
        {segments.map((segment) => (
          <BarSegment
            key={segment.id}
            segment={segment}
            active={segment.id === active}
            width={(segment.value / sum) * 100 + 0.001}
            color={segment.color}
            onSelect={handleSelect}
          />
        ))}
      </SegmentContainer>
      <ArrowContainer>
        <Arrow className="bar-arrow" style={arrowStyle} />
      </ArrowContainer>
    </div>
  );
}

Bar.propTypes = {
  active: PropTypes.string,
  segments: PropTypes.array.isRequired,
  onSelect: PropTypes.func,
};

export default Bar;
