import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTranslation } from '../../common/i18n';

import ContactPerson from './ContactPerson';

const ContactList = styled.ul`
  margin-top: 2em;
  list-style: none;
  padding: 0;

  h3 {
    font-size: ${(props) => props.theme.fontSizeBase};
  }
`;

const Note = styled.div`
    color: ${(props) => props.theme.themeColors.dark};
`;

function ContactPersons(props) {
  const { t, persons } = props;
  return (
    <ContactList>
      <h3>{ t('contact-persons') }</h3>
      { persons.length !== 0
        ? persons.map((person, index) => (
          <li key={person.id}>
            <ContactPerson
              person={person}
              leader={index === 0}
            />
          </li>
        ))
        : <Note>{ t('contact-persons-missing') }</Note>}
    </ContactList>
  );
}
ContactPersons.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string,
    title: PropTypes.string,
    organization: PropTypes.shape({
      name: PropTypes.string,
    }),
  })).isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(ContactPersons);
