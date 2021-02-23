import React from 'react';
import HeroFullImage from 'components/home/HeroFullImage';
import FrontHero from 'components/home/FrontHero';
import HnhHero from 'components/home/HnhHero';
import i18n from '.storybook/i18n';

export default {
  title: 'Global/Home Hero',
};

export const FullImageHero = () => {
  return (
    <HeroFullImage
      bgImage="https://source.unsplash.com/collection/1597991"
      title="Ilmasto-ohjelma"
      siteDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      actionsDescription="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      indicatorsDescription="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    />
  );
};

export const SimpleHero = () => {
  return (
    <FrontHero
      bgImage="https://source.unsplash.com/collection/1597991"
      title="Strategiaohjelma"
      siteDescription="Noin 60 toimenpidettä tuovat liikkumisen näkyväksi osaksi kaupunkilaisten arkielämää."
      actionsDescription="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      indicatorsDescription="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    />
  );
};

export const HelsinkiHero = () => {
  return (
    <HnhHero
      bgImage="https://source.unsplash.com/collection/1597991"
      title="Helsingin Ilmastovahti"
      siteDescription="Noin 60 toimenpidettä tuovat liikkumisen näkyväksi osaksi kaupunkilaisten arkielämää."
      actionsDescription="Noin 60 toimenpidettä tuovat liikkumisen näkyväksi osaksi kaupunkilaisten arkielämää."
      indicatorsDescription="Liikkumisohjelman johto- ja projektiryhmä seuraavat ohjelman osatavoitteiden ja
      toimenpiteiden toteutumista ohjelmaan kirjattujen mittareiden suunnassa."
    />
  );
};
