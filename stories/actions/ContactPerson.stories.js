import React from 'react';
import ContactPerson from '../../components/actions/ContactPerson';

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

};

export const ContactPersonTest = () => {
  return <ContactPerson person={personProp} leader={false} />;
};

export const ContactPersonLeader = () => {
  return <ContactPerson person={personProp} leader />;
};
