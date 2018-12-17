import React from 'react';
import axios from 'axios';
import { Link } from "gatsby";
import { Container, Row, Col, Alert, Badge, Card, CardBody, Progress } from 'reactstrap';
import TimeSeries from '../Graphs/TimeSeries';
import Timeline from '../Graphs/Timeline';
import TaskList from './TaskList';
import ResponsibleList from './ResponsibleList';
import ContactPersons from './ContactPersons';
import ContentLoader from '../Common/ContentLoader';
import CommentForm from '../Comments/CommentForm';
import CommentList from '../Comments/CommentList';

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

class ActionContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      data: [],
      responsibles: [],
      tasks: [],
      newComments: false
    };
    this.reloadComments = this.reloadComments.bind(this);
  }

  reloadComments() {
    this.setState({ newComments: !this.state.newComments });
  }
  
  componentDidMount() {
    const apiUrl = `${process.env.GATSBY_HNH_API}/action/${this.props.action}/`;
    axios.get(apiUrl,{
      params: {
        include: "responsible_parties,tasks"
      },
      headers: {'Accept': 'application/vnd.api+json'}
    })
    .then(
      (result) => {
        let responsibles, tasks = []; 
        console.log(JSON.stringify(result.data));
        if (result.data.included) {
          responsibles = result.data.included.filter(function(item) {
            return item.type === "organization";
          });
          tasks = result.data.included.filter(function(item) {
            return item.type === "action_task";
          });
        };
        console.log("responsibles: " + responsibles + "  tasks: " + tasks);
        this.setState({
          isLoaded: true,
          data: result.data.data,
          responsibles: responsibles,
          tasks: tasks
        });
      })
     .catch(
      (error) => {
        this.setState({
          isLoaded: true,
          error: error
        });
      }
    );
  }
  
  render() {
    const { error, isLoaded, data, responsibles, tasks } = this.state;
    let plot;

    if (typeof window !== 'undefined') {
      plot = <TimeSeries />
    } else {
      plot = <Container />
    }

    if (error) {
      return <Alert color="danger">Error: {error.message}</Alert>;
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
                <h2 className="display-4">{data.attributes.identifier}</h2>
                <h1 className="mb-4">{ data.attributes.name.substring(0,100) }…</h1>
                <p>7 kommenttia | <a href="#comments">osallistu keskusteluun</a></p>
              </Col>
            </Row>
          </Container>
        </ActionHero>
        <Container className="mb-5">
          <Row>
            <Col md="6" lg="8">
              <ActionSection>
                <h5>Tämä on Toimenpiteen ymmärrettävä tiivistelmä. Tämä saattaa poiketa virallisesta tekstistä niin että tämä on ymmärrettävä kaikille.</h5>
                <p>Tämä on Toimenpiteen ymmärrettävä sisältö. Tämä saattaa poiketa virallisesta tekstistä niin että tämä on ymmärrettävä kaikille. Toimenpiteen ymmärrettävää sisältöä voidaan myös tarpeen vaatiessa päivittää ymmärryksen lisääntyessä toimenpiteen toteutuksesta. </p>
              </ActionSection>
              <ActionSection className="official-text">
                <h5>Virallinen kuvaus</h5>
                <strong>Toimenpideohjelman mukaisesti</strong>
                <p>{data.attributes.name}</p>
                <small>(Hiilineutraali Helsinki 2035 toimenpideohjelmasta)</small>
              </ActionSection>
            </Col>
            <Col md="6" lg="4">
              <ActionSection>
                <ResponsibleList data={responsibles}/>
              </ActionSection>
              <ActionSection>
                <ContactPersons data={data.attributes.contact_persons}/>
              </ActionSection>
              <ActionSection>
                <h5>Eteneminen</h5>
                <strong>20% valmis</strong>
                <Progress value={20} color="status" />
                <strong>Etenee aikataulussa</strong>
              </ActionSection>
              <ActionSection>
                <h5>Aikajänne</h5>
                <Timeline />
              </ActionSection>

            </Col>
          </Row> 
          <Row>
            <Col>
              <h2 className="mb-5">Tehtävät</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <ActionSection>
                <TaskList data={tasks}/>
              </ActionSection>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2 className="mb-5">Mittarit</h2>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              
            </Col>
            <Col md={6}>
 
            </Col>
          </Row> 
          <Row>
            <Col sm="12">
            <Card>
              <CardBody>
              <Col sm="12" style={{height: '400px'}}>
                {plot}
              </Col>
              <Col sm="12">
                <p>
                  <a href="/indicator/1">Katso mittarin tarkemmat tiedot</a>
                  {' '}|{' '}
                  Tämä mittari liittyy myös toimenpiteisiin: <Badge>25</Badge> <Badge>28</Badge> <Badge>30</Badge>
                </p>
              </Col>
              </CardBody>
            </Card>
            </Col>
          </Row> 
        </Container>
        <CommentsSection className="comments-section" id="comments">
          <Container>
            <Row>
              <Col sm="12" md={{ size: 8, offset: 2 }}>
                <h2 className="mb-4">Kommentoi toimenpidettä <sup>nro</sup>{data.attributes.identifier}</h2>
                <CommentForm section="hFz7Xjt0JJzMkKFslq1JqMwAusPeJ1er" onPost={this.reloadComments}/>
                <CommentList section="hFz7Xjt0JJzMkKFslq1JqMwAusPeJ1er" newMessages={this.state.newMessages} refresh={this.state.newComments}/>
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
