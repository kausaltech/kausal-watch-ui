import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Switch from 'components/common/Switch';
import { useTranslation } from 'common/i18n';

const NormalizerChooser = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${(props) => props.theme.spaces.s100};
  margin-top: ${(props) => props.theme.spaces.s200};
  padding: ${(props) => props.theme.spaces.s050}
    ${(props) => props.theme.spaces.s150};
`;

const IndicatorNormalizationSelect = (props) => {
  const { handleChange, currentValue } = props;
  const { t } = useTranslation();

  const callback = () => handleChange(!currentValue);

  return (
    <NormalizerChooser>
      <label>
        {t('indicator-normalize-per-capita')}
        <Switch
          label={t('indicator-normalize-per-capita')}
          state={currentValue || false}
          onChange={callback}
        />
      </label>
    </NormalizerChooser>
  );
};

export default IndicatorNormalizationSelect;

IndicatorNormalizationSelect.defaultProps = {
  currentValue: undefined,
};

IndicatorNormalizationSelect.propTypes = {
  handleChange: PropTypes.func.isRequired,
  currentValue: PropTypes.bool,
};
