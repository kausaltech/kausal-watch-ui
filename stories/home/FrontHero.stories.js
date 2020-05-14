import React from 'react';
import HeroFullImage from '../../components/home/HeroFullImage';
import FrontHero from '../../components/FrontHero';
import HnhHero from '../../components/HnhHero';
import i18n from '../../.storybook/i18n';

export default {
  title: 'HomePageHero',
};

export const FullImageHero = () => {
  return (
    <HeroFullImage
      bgImage="https://source.unsplash.com/collection/1597991"
      title="Liikkumisohjelma"
      siteDescription="Noin 60 toimenpidettä tuovat liikkumisen näkyväksi osaksi kaupunkilaisten arkielämää."
      actionsDescription="Noin 60 toimenpidettä tuovat liikkumisen näkyväksi osaksi kaupunkilaisten arkielämää."
      indicatorsDescription="Liikkumisohjelman johto- ja projektiryhmä seuraavat ohjelman osatavoitteiden ja
      toimenpiteiden toteutumista ohjelmaan kirjattujen mittareiden suunnassa."
    />
  );
};

export const SimpleHero = () => {
  return (
    <FrontHero
      bgImage="https://source.unsplash.com/collection/1597991"
      title="Liikkumisohjelma"
      siteDescription="Noin 60 toimenpidettä tuovat liikkumisen näkyväksi osaksi kaupunkilaisten arkielämää."
      actionsDescription="Noin 60 toimenpidettä tuovat liikkumisen näkyväksi osaksi kaupunkilaisten arkielämää."
      indicatorsDescription="Liikkumisohjelman johto- ja projektiryhmä seuraavat ohjelman osatavoitteiden ja
      toimenpiteiden toteutumista ohjelmaan kirjattujen mittareiden suunnassa."
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
