import React from 'react';
import styled from 'styled-components';
import BadgeTooltip from '../common/BadgeTooltip';

const Responsibles = styled.div`
  font-size: 1.25rem;
  
  .badge-pill {
    margin-right: .5em;
  }
`;

function ResponsibleList(props) {
  return (
    <Responsibles>
      <h5>Vastuuorganisaatiot</h5>
      { props.data
        ? props.data.map((item, index) => (
          <BadgeTooltip
            key={index}
            id={item.id}
            name={item.name}
            abbreviation={item.abbreviation}
            leader={index===0}
          />
        ))
        : <h6>Ei merkittyjä vastuuorganisaatioita</h6>
      }
    </Responsibles>
  );
}

export default ResponsibleList;
