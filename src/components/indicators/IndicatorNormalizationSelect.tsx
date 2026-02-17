import React from 'react';

import styled from '@emotion/styled';
import { useTranslations } from 'next-intl';

import Switch from '@/components/common/Switch';

const NormalizerChooser = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${(props) => props.theme.spaces.s100};
  margin-top: ${(props) => props.theme.spaces.s200};
  padding: ${(props) => props.theme.spaces.s050} ${(props) => props.theme.spaces.s150};
`;

interface IndicatorNormalizationSelectProps {
  handleChange(...args: unknown[]): unknown;
  currentValue?: boolean;
}

const IndicatorNormalizationSelect = (props: IndicatorNormalizationSelectProps) => {
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
