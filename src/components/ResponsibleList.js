import React from 'react'
import { Badge, Tooltip } from 'reactstrap';
import styled from 'styled-components';

const Responsibles = styled.div`
  font-size: 1.5em;
  
  .badge-pill {
    margin-right: .5em;
  }
`

class ResponsibleList extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false
    };
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    return (
      <Responsibles>
        <h5>Vastuuorganisaatiot</h5>
        <Badge pill href="#" id="TooltipExample">SOTE</Badge>
        <Tooltip placement="top" isOpen={this.state.tooltipOpen} target="TooltipExample" toggle={this.toggle}>
          Sosiaali- ja terveystoimiala
        </Tooltip>
        <Badge pill>Kuva</Badge>
        <Badge pill>Kymp</Badge>
        <Badge pill>HSL</Badge>
        <Badge pill>Rya/Yleiset alueet</Badge>
      </Responsibles>
    );
  }
}

export default ResponsibleList
