import React from 'react'
import { Container, Row, Col, Progress, Button } from 'reactstrap';
import TimeSeries from './Graphs/TimeSeries';
import ResponsibleList from './ResponsibleList';
import ContentLoader from './ContentLoader';
import CommentList from './Comments/CommentList';

import styled from 'styled-components';

const ActionHero = styled.div`
  background-color: ${props => props.theme.helSummer}; 
  padding: 6rem 0;
  margin-bottom: 4rem;
`

const ActionSection = styled.div`
  margin-bottom: 2rem;
`

const CommentsSection = styled.div`
  background-color: ${props => props.theme.helTram}; 
`

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
    let plot;

    if (typeof window !== 'undefined') {
      plot = <TimeSeries />
    } else {
      plot = <Container />
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <ContentLoader />;
    } else {
    return (
      <div>
        <ActionHero>
          <Container>
            <Row>
              <Col md="10">
                <h2 className="display-4">{data.attributes.identifier}</h2>
                <h1>{ data.attributes.name.substring(0,100) }[…]</h1>
              </Col>
            </Row>
          </Container>
        </ActionHero>
        <Container className="mb-5">
          <Row>
            <Col md="6">
              <ActionSection>
                <p lead>3 kommenttia | osallistu keskusteluun</p>
                <h5>Tämä on Toimenpiteen ymmärrettävä tiivistelmä. Tämä saattaa poiketa virallisesta tekstistä niin että tämä on ymmärrettävä kaikille.</h5>
              </ActionSection>
              <ActionSection>
                <p lead>Tämä on Toimenpiteen ymmärrettävä tiivistelmä. Tämä saattaa poiketa virallisesta tekstistä niin että tämä on ymmärrettävä kaikille.</p>
              </ActionSection>
              <ActionSection>
                <h5>Aikajänne</h5>
                <Progress value={75} />
              </ActionSection>
            </Col>
            <Col md="6">
              <ActionSection>
                <ResponsibleList />
              </ActionSection>
              <ActionSection>
                <h5>Yhteyshenkilö</h5>
                <p><strong>Eini Eksamble</strong></p>
                <Button outline color="primary" size="sm">Ota yhteyttä</Button>
              </ActionSection>
              <ActionSection className="official-text">
                <h5>Virallinen kuvaus</h5>
                <strong>Toimenpideohjelman mukaisesti</strong>
                <p>{data.attributes.name}</p>
              </ActionSection>
            </Col>
          </Row> 
          <Row>
            <Col style={{height: '400px'}}>
              <h2>Esimerkkigraafi</h2>
              {plot}
            </Col>
          </Row> 
        </Container>
        <CommentsSection className="comments-section">
          <Container>
            <Row>
              <Col sm="12" md={{ size: 8, offset: 2 }}>
                <h2>Kommentoi toimenpidettä</h2>
                <CommentList />
              </Col>
            </Row>
          </Container>
        </CommentsSection>
      </div>
    );
  }
}
}

export default ActionContent
