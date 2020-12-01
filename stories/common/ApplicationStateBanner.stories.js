import React from 'react';
import ApplicationStateBanner from 'components/common/ApplicationStateBanner';

export default {
  title: 'Global/Application State',
};

export const ApplicationStateTesting = () => (
  <ApplicationStateBanner
    instanceType="testing"
  />
);

export const ApplicationStateDevelopment = () => (
  <ApplicationStateBanner
    instanceType="development"
  />
);
