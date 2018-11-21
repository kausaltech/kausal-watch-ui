import React from 'react'
import { Jumbotron, Container } from 'reactstrap';

class ActionContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      data: []
    };
  }

  componentDidMount() {
    fetch(process.env.GATSBY_HNH_API + "/action/" + this.props.action + "/")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result.data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  
  render() {
    const { error, isLoaded, data } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading..........</div>;
    } else {
    return (
      <div>
        <Jumbotron>
          <Container>
            <h2>{this.props.action}</h2>
            <h1>{data.attributes.name}</h1>
          </Container>
        </Jumbotron>
        <Container>
          <p>{data.attributes.name}</p>
        </Container>
      </div>
    );
  }
}
}

export default ActionContent
