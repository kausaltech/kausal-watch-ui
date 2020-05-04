import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import apolloStorybookDecorator from 'apollo-storybook-react';
import ContactPerson from '../../components/actions/ContactPerson';

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

const personProp = {
  id: '12',
  firstName: 'Firstname',
  lastName: 'Lastname',
  avatarUrl: 'https://thispersondoesnotexist.com/image?1587700464286',
  title: 'Occupation',
  organization: { name: 'Organization' },
};

export default {
  title: 'Contact Person',

  decorators: [
    apolloStorybookDecorator({
      typeDefs,
      mocks,
    }),
  ],
};

export const ContactPersonTest = () => {
  return <ContactPerson person={personProp} leader={false} />;
};
