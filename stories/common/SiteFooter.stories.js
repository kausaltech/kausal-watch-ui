import React from 'react';
import SiteFooter from '../../components/common/SiteFooter';
import i18n from '../../.storybook/i18n';

export default {
  title: 'Footer',
};

const testPages = [
  { id: '1', name: 'Link 1', slug: 'link1' },
  { id: '2', name: 'Link 2', slug: 'link2' },
  { id: '3', name: 'Link 3', slug: 'link3' },
];

const testTree = [
  { id: '4', name: 'Link 4', slug: 'link4' },
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


export const SiteFooterBasic = () => {
  return (
    <div style={{ backgroundColor: '#cccccc', height: '50rem' }}>
      <SiteFooter
        siteTitle="Kausal Watch"
        ownerUrl="#"
        creativeCommonsLicense="dfdfsdfsdf"
        copyrightText="ddsfsfgfg"
      />
    </div>
  );
};