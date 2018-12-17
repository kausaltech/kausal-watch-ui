import React from 'react'
import BadgeTooltip from '../Common/BadgeTooltip';
import styled from 'styled-components';

const Responsibles = styled.div`
  font-size: 1.5em;
  
  .badge-pill {
    margin-right: .5em;
  }
`

const Avatar = styled.img`
  width: 4em;
  height: 4em;
`

class ContactPersons extends React.Component {

  render() {
    return (
      <Responsibles>
        <h5>Yhteyshenkilöt</h5>
        { this.props.data.length != 0 ?
          this.props.data.map((person,index) => (
            <div key={index}>
              <Avatar src={person.avatar_url} className="rounded-circle border my-3"/>
              <h6>{person.first_name} {person.last_name}</h6>
            </div>
            )) :
          <h6>Ei merkittyjä yhteyshenkilöitä</h6>
        }
      </Responsibles>
    );
  }
}

export default ContactPersons
