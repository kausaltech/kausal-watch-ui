import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Row, Col, Media } from 'reactstrap';

import moment from '../../common/moment';
import PlanContext from '../../context/plan';


const ActionUpdate = styled.article`
  padding: .75rem;
  margin: 0 0 1.5rem;
  background: ${(props) => props.theme.themeColors.white};
`;

const ActionUpdateHeader = styled.header`
  h3 {
    font-size: 1.25rem;
    line-height: 24px;
  }
`;

const AuthorAvatar = styled.img`
  width: 2.75rem;
  height: 2.75rem;
  margin-right: .5rem;
`;

const AuthorName = styled.div`
  font-weight: 600;
`;

const UpdateDate = styled.div`
  font-size: 0.8em;
  font-weight: 400;
  color: ${(props) => props.theme.themeColors.dark};
`;

const GET_ACTION_UPDATES = gql`
query ActionDetails($plan: ID!, $id: ID!) {
  action(plan: $plan, id: $id) {
    statusUpdates {
        id
        title
        date
        author {
          id
          firstName
          lastName
          avatarUrl
        }
        content
    }
  }
}`;

function ActionStatusUpdate(props) {
  const {
    author,
    date,
    title,
    content,
  } = props;
  let avatarUrl = '/static/images/default-avatar.png';
  let name = 'Ylläpitäjä';
  if (author) {
    avatarUrl = author.avatarUrl;
    name = `${author.firstName} ${author.lastName}`;
  }

  return (
    <ActionUpdate>
      <ActionUpdateHeader>
        <Media className="mb-3">
          <Media left top>
            <AuthorAvatar
              src={avatarUrl}
              className="rounded-circle"
              alt="name"
            />
          </Media>
          <Media body>
            <AuthorName>
              {name}
            </AuthorName>
            <UpdateDate>
              <time dateTime={date}>{ moment(date).format('DD.MM.YYYY') }</time>
            </UpdateDate>
          </Media>
        </Media>
        <h3>{ title }</h3>
      </ActionUpdateHeader>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </ActionUpdate>
  );
}

class ActionUpdatesList extends React.Component {
  static contextType = PlanContext;

  render() {
    const { id } = this.props;
    const plan = this.context;

    return (
      <Query query={GET_ACTION_UPDATES} variables={{ id, plan: plan.identifier }}>
        {({ loading, error, data }) => {
          if (loading) return <span>Ladataan</span>;
          if (error) return <span>{error.message}</span>;

          const { action } = data;
          return (
            <Row>
              { action.statusUpdates.map((update) => (
                <Col sm="12" md={{ size: 10, offset: 0 }}>
                  <ActionStatusUpdate
                    author={update.author}
                    date={update.date}
                    title={update.title}
                    content={update.content}
                    key={update.id}
                  />
                </Col>
              ))}
            </Row>
          );
        }}
      </Query>
    );
  }
}

ActionStatusUpdate.propTypes = {
  author: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string,
  }).isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

ActionUpdatesList.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ActionUpdatesList;
