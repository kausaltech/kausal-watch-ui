import React from 'react';
import GlobalNav from '../../components/common/GlobalNav';

export default {
  title: 'Global/Global Navigation',
};

const testPages = [
  { id: '1', name: 'Link 1', slug: 'link1' },
  { id: '2', name: 'Link 2', slug: 'link2' },
  { id: '3', name: 'Link 3', slug: 'link3', active: true },
];

const testTree = [
  { id: '1', name: 'Link 1', slug: 'link1' },
  { id: '2',
    name: 'Link 2',
    slug: 'link2',
    active: true,
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
      />
    </div>
  );
};
