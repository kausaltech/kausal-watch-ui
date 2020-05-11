import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import apolloStorybookDecorator from 'apollo-storybook-react';
import HeroFullImage from '../../components/home/HeroFullImage';
import i18n from '../../.storybook/i18n';

const typeDefs = `
  type Query {
    helloWorld: String
  }

  schema {
    query: Query
  }
`;

const mocks = {
  Query: () => {
    return {
      helloWorld: () => {
        return 'Hello from Apollo!!';
      },
    };
  },
};

export default {
  title: 'HomePageHero',

  decorators: [
    apolloStorybookDecorator({
      typeDefs,
      mocks,
    }),
  ],
};

export const HeroImageTop = () => {
  return (
    <HeroFullImage
      bgImage="https://source.unsplash.com/collection/1597991"
      title="Liikkumisohjelma"
      siteDescription="Noin 60 toimenpidettä tuovat liikkumisen näkyväksi osaksi kaupunkilaisten arkielämää."
      actionsDescription="Noin 60 toimenpidettä tuovat liikkumisen näkyväksi osaksi kaupunkilaisten arkielämää."
      indicatorsDescription="Liikkumisohjelman johto- ja projektiryhmä seuraavat ohjelman osatavoitteiden ja toimenpiteiden toteutumista ohjelmaan kirjattujen mittareiden suunnassa."
    />
  );
};

export const HeroImageSide = () => {
  return (
    <HeroFullImage
      bgImage="https://source.unsplash.com/random"
      title="Liikkumisohjelma"
      siteDescription="sdfsdfdsfsfd"
      actionsDescription="sdfsdfdsfs"
      indicatorsDescription="sdfsdfsdf"
    />
  );
};
