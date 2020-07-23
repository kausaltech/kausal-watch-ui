import React from 'react';

import ApplicationStateBanner from '../../components/common/ApplicationStateBanner';
import i18n from '../../.storybook/i18n';

export default {
  title: 'Global/Application State',
};

export const ApplicationStateTesting = () => {
  return (
    <ApplicationStateBanner
      instanceType="testing"
    />
  );
};

export const ApplicationStateDevelopment = () => {
  return (
    <ApplicationStateBanner
      instanceType="development"
    />
  );
};
