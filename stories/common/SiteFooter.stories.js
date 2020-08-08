import React from 'react';
import SiteFooter from '../../components/common/SiteFooter';
import i18n from '../../.storybook/i18n';

export default {
  title: 'Global/Footer',
};

const testPages = [
  { id: '1', name: 'Link 1', slug: 'link1' },
  { id: '2', name: 'Link 2', slug: 'link2' },
  { id: '3', name: 'Link 3', slug: 'link3' },
];

const testTree = [
  { id: '1', name: 'Link 1', slug: 'link1' },
  { id: '2',
    name: 'Link 2',
    slug: 'link2',
    children: [
      { id: '2.1', name: 'Link 2.1', slug: 'link2-1' },
      { id: '2.2', name: 'Link 2.2', slug: 'link2-2' },
    ],
  },
  { id: '3', name: 'Link 3', slug: 'link2' },
  { id: '4', name: 'Link 4 with a longer title', slug: 'link3' },
  { id: '1', name: 'Link 1', slug: 'link1' },
  { id: '2',
    name: 'Link with children and long title',
    slug: 'link2',
    children: [
      { id: '2.1', name: 'Link 2.1 continues here', slug: 'link2-1' },
      { id: '2.2', name: 'Link 2.2 with long title', slug: 'link2-2' },
    ],
  },
  { id: '3', name: 'Link 3', slug: 'link2' },
  { id: '4', name: 'Link 4', slug: 'link3' },
];

export const SiteFooterBasic = () => {
  return (
    <div style={{ backgroundColor: '#cccccc', height: '50rem' }}>
      <SiteFooter
        siteTitle="Program Monitoring"
        ownerName="Helsingin kaupunki"
        ownerUrl="https://hel.fi"
        creativeCommonsLicense="CC BY 4.0"
        copyrightText="2020 Helsingin kaupunki"
        navItems={testTree}
      />
    </div>
  );
};