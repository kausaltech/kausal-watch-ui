import React from 'react';
import { Alert } from 'reactstrap';
import GlobalNav from '../../components/common/GlobalNav';
import i18n from '../../.storybook/i18n';

export default {
  title: 'Global Navigation',
};

const testPages = [
  { id: '1', name: 'Link 1', slug: 'link1' },
  { id: '2', name: 'Link 2', slug: 'link2' },
  { id: '3', name: 'Link 3', slug: 'link3' },
];

const testTree = [
  { id: '1',
    name: 'Link 1',
    slug: 'link1',
    children: [
      { id: '1.1', name: 'Link 1.1', slug: 'link1-1' },
      { id: '1.2', name: 'Link 1.2', slug: 'link1-2' },
    ],
  },
  { id: '2', name: 'Link 2', slug: 'link2' },
  { id: '3', name: 'Link 3', slug: 'link3' },
];

export const GlobalNavBasic = () => {
  return (
    <GlobalNav
      siteTitle="Test Plan"
      navItems={testPages}
      active="link2"
    />
  );
};

export const GlobalNavWithChildren = () => {
  return (
    <div>
      <GlobalNav
        siteTitle="Test Plan"
        navItems={testTree}
        active="link3"
      />
      <Alert>
        We do not have two level navigation yet. Let's work out the branching logic first.
      </Alert>
    </div>
  );
};