import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'common/i18n';
import styled, { useTheme } from 'styled-components';
import PlanContext from 'context/plan';
import { getStatusData } from 'common/preprocess';

const Status = styled.div`
  color: ${(props) => props.theme.themeColors.black};
`;

const BarGraph = styled.div`
  display: flex;
  height: 1rem;
  width: auto;
  background-color: ${(props) => props.theme.themeColors.light};
`;

const Segment = styled.div`
  background-color: ${(props) => props.color};
  width:  ${(props) => props.portion}%;
  height: 1rem;
`;

const Labels = styled.div`
  display: flex;
  width: auto;
`;

const SegmentLabel = styled.span`
  display: flex;
  flex-direction: column;
  flex-basis:  ${(props) => props.portion}%;
  text-align: left;
  margin: ${(props) => props.theme.spaces.s050} ${(props) => props.theme.spaces.s050} 0 0;
  font-size: ${(props) => props.theme.fontSizeSm};
  line-height: ${(props) => props.theme.lineHeightMd};

  span {
    align-self: flex-start;
  }

  .value {
    font-weight: ${(props) => props.theme.fontWeightBold};
  }
`;

function CategoryMetaBar(props) {
  const { title, segments } = props;

  return (
    <>
      <dt>{title}</dt>
      <dd>
        <Status>
          <BarGraph>
            {segments.map((segment) => (
              <Segment
                key={segment.id}
                color={segment.color}
                portion={(segment.portion) * 100}
              />
            ))}
          </BarGraph>
          <Labels>
            {segments.map((segment) => (
              <SegmentLabel key={segment.id} portion={(segments.length === 1 ? 1 : segment.portion) * 100}>
                <span className="value">
                  { segment.value }
                </span>
                <span>
                  {' '}
                  { segment.label }
                </span>
              </SegmentLabel>
            ))}
          </Labels>
        </Status>
      </dd>
    </>
  );
}

// TODO: prop types and defaults
CategoryMetaBar.propTypes = {
};

CategoryMetaBar.defaultProps = {
};

export default CategoryMetaBar;
