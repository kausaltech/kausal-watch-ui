import React from 'react';
import GlobalNav from '../../components/common/GlobalNav';
import i18n from '../../.storybook/i18n';

export default {
  title: 'Global/Global Navigation',
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
  { id: '4', name: 'Link 4', slug: 'link3' },
];


export const GlobalNavBasic = () => {
  return (
    <div style={{ backgroundColor: '#cccccc', height: '50rem' }}>
      <GlobalNav
        siteTitle="Kausal Watch"
        navItems={testPages}
        active="link2"
      />
    </div>
  );
};

export const GlobalNavSticky = () => {
  return (
    <div style={{ backgroundColor: '#cccccc', height: '50rem' }}>
      <GlobalNav
        siteTitle="Kausal Watch"
        navItems={testPages}
        active="link2"
        sticky
      />
      <p style={{ padding: '2rem' }}>(Navbar gets sticky when scrolling up)</p>
    </div>
  );
};

export const GlobalNavFullWidth = () => {
  return (
    <div style={{ backgroundColor: '#cccccc', height: '50rem' }}>
      <GlobalNav
        siteTitle="Kausal Watch"
        navItems={testPages}
        active="link2"
        fullwidth
      />
      <p style={{ padding: '2rem' }}>(Navbar content not aligned with content container)</p>
    </div>
  );
};

export const GlobalNavWithChildren = () => {
  return (
    <div style={{ backgroundColor: '#cccccc', height: '50rem' }}>
      <GlobalNav
        siteTitle="Kausal Watch"
        navItems={testTree}
        active="link2"
      />
    </div>
  );
};

export const GlobalNavStressTest = () => {
  return (
    <div style={{ backgroundColor: '#cccccc', height: '50rem' }}>
      <GlobalNav
        siteTitle="Äteritsiputeritsipuolilautatsijänkän Ilmastovahti"
        navItems={testTree}
        active="link2"
      />
    </div>
  );
};
