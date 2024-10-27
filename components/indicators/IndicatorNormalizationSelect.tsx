import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Switch from '@/components/common/Switch';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations();

  const callback = () => handleChange(!currentValue);

  return (
    <NormalizerChooser>
      <Switch
        label={t('indicator-normalize-per-capita')}
        state={currentValue || false}
        onChange={callback}
        id="normalize-per-capita-switch"
      />
    </NormalizerChooser>
  );
};

export default IndicatorNormalizationSelect;

IndicatorNormalizationSelect.propTypes = {
  handleChange: PropTypes.func.isRequired,
  currentValue: PropTypes.bool,
};
