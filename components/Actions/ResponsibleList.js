import React from 'react';
import styled from 'styled-components';
import BadgeTooltip from '../Common/BadgeTooltip';

const Responsibles = styled.div`
  font-size: 1.5em;
  
  .badge-pill {
    margin-right: .5em;
  }
`;

class ResponsibleList extends React.Component {
  render() {
    return (
      <Responsibles>
        <h5>Vastuuorganisaatiot</h5>
        { this.props.data
          ? this.props.data.map((item, index) => (
            <BadgeTooltip key={index} name={item.name} abbreviation={item.abbreviation} />
          ))
          : <h6>Ei merkittyjä vastuuorganisaatioita</h6>
        }
      </Responsibles>
    );
  }
}

export default ResponsibleList;
