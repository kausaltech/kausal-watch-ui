import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Responsibles = styled.div`
  font-size: 1.5em;
  
  .badge-pill {
    margin-right: .5em;
  }
`;

const Avatar = styled.img`
  width: 4em;
  height: 4em;
`;


function ContactPersons(props) {
  const { persons } = props;
  return (
    <Responsibles>
      <h5>Yhteyshenkilöt</h5>
      { persons.length !== 0
        ? persons.map((person, index) => (
          <div key={index}>
            <Avatar src={person.avatarUrl} className="rounded-circle border my-3" />
            <h6>
              {`${person.firstName} ${person.lastName}`}
            </h6>
          </div>
        ))
        : <h6>Ei merkittyjä yhteyshenkilöitä</h6>
      }
    </Responsibles>
  );
}
ContactPersons.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string,
  })).isRequired,
};

export default ContactPersons;
