import React from 'react'
import { Link } from "gatsby";
import { Container, Row, Col } from 'reactstrap';
import TimeSeries from './Graphs/TimeSeries';
import Timeline from './Graphs/Timeline';
import ResponsibleList from './ResponsibleList';
import ContentLoader from './ContentLoader';
import CommentList from './Comments/CommentList';

import styled from 'styled-components';

const ActionHero = styled.div`
  background-color: ${props => props.theme.helSummer}; 
  padding: 5rem 0;
  margin-bottom: 4rem;
  a {
    color: ${props => props.theme.helTram};
  }
`

const ActionSection = styled.section`
  margin-bottom: 3rem;
`

const CommentsSection = styled.section`
  background-color: ${props => props.theme.helTram}; 
`

const EventList = styled.ul`
  margin-top: 1em;
`

const Event = styled.li`
  .date {
    font-weight: 600;
  }
`

class ActionContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      data: [],
    };
  }

  componentDidMount() {
    fetch(process.env.GATSBY_HNH_API + "/action/" + this.props.action + "/?include=responsible_parties")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result,
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
                <Link to="/"><h4>Toimenpiteet</h4></Link>
                <h2 className="display-4">{data.data.attributes.identifier}</h2>
                <h1 className="mb-4">{ data.data.attributes.name.substring(0,100) }…</h1>
                <p>7 kommenttia | <a href="#comments">osallistu keskusteluun</a></p>
              </Col>
            </Row>
          </Container>
        </ActionHero>
        <Container className="mb-5">
          <Row>
            <Col md="6">
              <ActionSection>
                <h5>Tämä on Toimenpiteen ymmärrettävä tiivistelmä. Tämä saattaa poiketa virallisesta tekstistä niin että tämä on ymmärrettävä kaikille.</h5>
                <p>Tämä on Toimenpiteen ymmärrettävä sisältö. Tämä saattaa poiketa virallisesta tekstistä niin että tämä on ymmärrettävä kaikille. Toimenpiteen ymmärrettävää sisältöä voidaan myös tarpeen vaatiessa päivittää ymmärryksen lisääntyessä toimenpiteen toteutuksesta. </p>
              </ActionSection>
              <ActionSection>
                <h5>Mitä on tehty?</h5>
                <EventList>
                  <Event>
                    <div className="date">1.12.2018</div>
                    <div>Selvityksen valmistelu on aloitettu.</div>
                  </Event>
                  <Event>
                    <div className="date">12.12.2019</div>
                    <div>Selvitys valmistunut. <a href="http://hel.fi">Lue selvitys.</a></div>
                  </Event>
                </EventList>
              </ActionSection>
            </Col>
            <Col md="6">
              {data.included  &&
                <ActionSection>
                  <ResponsibleList data={data.included}/>
                </ActionSection>
              }
              <ActionSection>
                <h5>Yhteyshenkilö</h5>
                <p><strong>Eini Eksamble</strong> [Ota yhteyttä]</p>
              </ActionSection>
              <ActionSection className="official-text">
                <h5>Virallinen kuvaus</h5>
                <strong>Toimenpideohjelman mukaisesti</strong>
                <p>{data.data.attributes.name}</p>
                <small>(Hiilineutraali Helsinki 2035 toimenpideohjelmasta)</small>
              </ActionSection>
            </Col>
          </Row> 
          <Row>
            <Col>
              <h2 className="mb-5">Kuvaajat</h2>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <ActionSection>
                <h5>Aikajänne</h5>
                <Timeline />
              </ActionSection>
            </Col>
            <Col md={6}>
 
            </Col>
          </Row> 
          <Row>
            <Col md={6} style={{height: '400px'}}>
              <h5>Esimerkkigraafi</h5>
              {plot}
            </Col>
            <Col md={6} style={{height: '400px'}}>
              <h5>Esimerkkigraafi</h5>
              {plot}
            </Col>
          </Row> 
          
        </Container>
        <CommentsSection className="comments-section" id="comments">
          <Container>
            <Row>
              <Col sm="12" md={{ size: 8, offset: 2 }}>
                <h2 className="mb-4">Kommentoi toimenpidettä <sup>nro</sup>{data.data.attributes.identifier}</h2>
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
