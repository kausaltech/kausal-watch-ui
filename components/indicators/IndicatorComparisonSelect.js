import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DropDown from 'components/common/DropDown';
import { useTranslation } from 'common/i18n';

const CompareChooser = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: ${(props) => props.theme.spaces.s100};
  margin-top: ${(props) => props.theme.spaces.s200};
  padding: ${(props) => props.theme.spaces.s050} ${(props) => props.theme.spaces.s150};
  background-color: ${(props) => props.theme.themeColors.light};
`;

const CompareFrom = styled.div`
  flex: 0 1 220px;
`;

const CompareTo = styled.div`
  flex: 0 1 220px;
`;

const IndicatorComparisonSelect = (props) => {
  const { handleChange, currentValue, options, defaultOrg } = props;
  const { t } = useTranslation();

  const callback = (evt) => {
    const value = evt.target.value;
    handleChange(value === '' ? null : value);
  };

  return (
    <CompareChooser>
      <CompareFrom>
        <DropDown
          label={t('indicator-compare-source')}
          id="compare-from"
          name="compare-from"
          disabled
        >
          <option value="">{defaultOrg.name}</option>
        </DropDown>
      </CompareFrom>
      <CompareTo>
        <DropDown
          label={t('indicator-compare-to')}
          id="compare-select"
          name="compare-select"
          value={currentValue || ''}
          onChange={callback}
        >
          <option value="">-</option>
          {options.map((opt) => (
            <option value={opt.id} key={opt.id}>
              { opt.name }
            </option>
          ))}
        </DropDown>
      </CompareTo>
    </CompareChooser>
  );
};

export default IndicatorComparisonSelect;

IndicatorComparisonSelect.defaultProps = {
  currentValue: undefined,
};

IndicatorComparisonSelect.propTypes = {
  handleChange: PropTypes.func.isRequired,
  currentValue: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
