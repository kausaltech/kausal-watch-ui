import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Row, Col, Progress,
} from 'reactstrap';
import styled from 'styled-components';
import { Link } from '../../routes';
import { aplans } from '../../common/api';

import Timeline from '../Graphs/Timeline';
import TaskList from './TaskList';
import ResponsibleList from './ResponsibleList';
import ContactPersons from './ContactPersons';
import ActionStatus from './ActionStatus';
import ActionIndicators from './ActionIndicators';
import CommentForm from '../Comments/CommentForm';
import CommentList from '../Comments/CommentList';


const ActionHero = styled.div`
  background-color: ${props => props.theme.helSummer}; 
  padding: 5rem 0;
  margin-bottom: 4rem;
  a {
    color: ${props => props.theme.helTram};
  }
`;

const ActionSection = styled.section`
  margin-bottom: 3rem;
`;

const CommentsSection = styled.section`
  background-color: ${props => props.theme.helTram}; 
`;

class ActionContent extends React.Component {
  static async fetchData(actionIdentifier) {
    // Fetches the data needed by this component from the API and
    // returns them as props suitable for the component.
    if (!actionIdentifier) {
      throw new Error('Identifier not supplied');
    }
    const resp = await aplans.findAll('action', {
      'filter[identifier]': actionIdentifier,
      'filter[plan.identifier]': 'hnh2035',
      include: ['responsible_parties', 'tasks', 'status', 'indicators', 'indicators.latest_graph'],
    });
    if (!resp.data || resp.data.length < 1) {
      return null;
    }
    return {
      action: resp.data[0],
    };
  }

  static getHeadTags(props) {
    const { action } = props;

    return {
      subPageName: action.name,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      newComments: false,
      commentCount: 0,
    };
    this.reloadComments = this.reloadComments.bind(this);
    this.countComments = this.countComments.bind(this);
  }

  reloadComments() {
    const { newComments } = this.state;
    this.setState({ newComments: !newComments });
  }

  countComments(count) {
    this.setState({ commentCount: count });
  }

  render() {
    const { action } = this.props;
    const { commentCount, newMessages, newComments } = this.state;

    return (
      <div>
        <ActionHero>
          <Container>
            <Row>
              <Col md="10">
                <Link route="/">
                  <a>
                    <h4>Toimenpiteet</h4>
                  </a>
                </Link>
                <h2 className="display-4">{action.identifier}</h2>
                <h1 className="mb-4">{action.name}</h1>
                <div>
                  {commentCount > 0
                    ? (
                      <span>
                        {commentCount}
                        {' '}
kommenttia
                      </span>
                    )
                    : <span>Ei kommentteja</span>
                    }
                  {' '}
|
                  <a href="#comments">osallistu keskusteluun</a>
                </div>
              </Col>
            </Row>
          </Container>
        </ActionHero>
        <Container className="mb-5">
          <Row>
            <Col md="6" lg="8">

              {action.description
              && <ActionSection dangerouslySetInnerHTML={{ __html: action.description }} />}

              <ActionSection className="official-text">
                <h5>Virallinen kuvaus</h5>
                <strong>Toimenpideohjelman mukaisesti</strong>
                <div dangerouslySetInnerHTML={{ __html: action.official_name }} />
                <small>(Hiilineutraali Helsinki 2035 -toimenpideohjelmasta)</small>
              </ActionSection>
            </Col>
            <Col md="6" lg="4">
              <ActionSection>
                <ResponsibleList data={action.responsible_parties} />
              </ActionSection>
              <ActionSection>
                <ContactPersons data={action.contact_persons} />
              </ActionSection>
              <ActionSection>
                <h5>Eteneminen</h5>
                { action.completion > 0
                && (
                <strong>
                  {action.completion}
% valmis
                </strong>
                ) }
                <Progress value={action.completion} color="status" />
                { action.status
                  && <ActionStatus name={action.status.name} identifier={action.status.identifier} />
                }
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
                <TaskList data={action.tasks} />
              </ActionSection>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2 className="mb-5">Mittarit</h2>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              {action.indicators.length > 0
                ? <ActionIndicators indicators={action.indicators} />
                : <h6>Ei määriteltyjä mittareita</h6>
                }
            </Col>
          </Row>
        </Container>
        <CommentsSection className="comments-section" id="comments">
          <Container>
            <Row>
              <Col sm="12" md={{ size: 8, offset: 2 }}>
                <h2 className="mb-4">
Kommentoi toimenpidettä
                  <sup>nro</sup>
                  {action.identifier}
                </h2>
                <CommentForm section="hFz7Xjt0JJzMkKFslq1JqMwAusPeJ1er" onPost={this.reloadComments} />
                <CommentList section="hFz7Xjt0JJzMkKFslq1JqMwAusPeJ1er" newMessages={newMessages} refresh={newComments} updateCount={this.countComments} />
              </Col>
            </Row>
          </Container>
        </CommentsSection>
      </div>
    );
  }
}

ActionContent.propTypes = {
  action: PropTypes.object.isRequired,
};

export default ActionContent;
