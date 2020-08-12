import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Media, Button, Collapse } from 'reactstrap';
import { withTranslation } from '../../common/i18n';

const Person = styled.div`
  margin-top: 1em;
  padding-bottom: 1em;
  border-bottom: 2px solid ${(props) => props.theme.themeColors.light};

  img {
    border: 2px solid ${(props) => props.theme.themeColors.light};
  }

  &.leader {
    img {
      border: 2px solid ${(props) => props.theme.brandDark};
    }
  }
`;

const PersonDetails = styled(Media)`
  margin-left: 1em;

  .btn-link, .btn-link:hover {
    color: ${(props) => props.theme.brandDark};
  }
`;

const Name = styled.p`
  line-height: ${(props) => props.theme.lineHeightSm};
  margin-bottom: .5em;
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

const PersonRole = styled.p`
  margin-bottom: .5em;
  color: ${(props) => props.theme.themeColors.dark};
  font-size: ${(props) => props.theme.fontSizeSm};
  font-weight: ${(props) => props.theme.fontWeightBold};
  line-height: ${(props) => props.theme.lineHeightSm};
`;

const PersonOrg = styled.p`
  margin-bottom: 1em;
  color: ${(props) => props.theme.themeColors.dark};
  font-size: ${(props) => props.theme.fontSizeSm};
  line-height: ${(props) => props.theme.lineHeightSm};
`;

const Avatar = styled.img`
  width: 5em;
  height: 5em;
`;

const Address = styled.address`
  margin-top: 1em;
  margin-bottom: 0;
  font-size: ${(props) => props.theme.fontSizeSm};
`;

const CollapseButton = styled(Button)`
  padding: 0;
`;

const GET_CONTACT_DETAILS = gql`
query ContactDetails($id: ID!) {
  person(id: $id) {
    email
    organization {
      id
      name
      ancestors {
        name
        classification {
          id
          name
        }
      }
    }
  }
}`;

const ContactDetails = (props) => {
  const { t, id } = props;
  return (
    <Query query={GET_CONTACT_DETAILS} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) return <span>{ t('loading') }</span>;
        if (error) return <span>{error.message}</span>;
        const { person } = data;

        let orgAncestors;

        if (person.organization && person.organization.ancestors) {
          orgAncestors = person.organization.ancestors
            .filter((org) => org.classification.name !== 'Valtuusto' && org.classification.name !== 'Hallitus')
            .map((org) => ({ id: org.id, name: org.name }));
          orgAncestors.push({ id: person.organization.id, name: person.organization.name });
        } else {
          orgAncestors = [];
        }

        return (
          <div className="mt-2">
            {orgAncestors.length > 1 && (
              <PersonOrg>
                {orgAncestors.map((item) => (
                  <span key={item.key}>
                    {item.name}
                    {' '}
                    /
                    {' '}
                  </span>
                ))}
              </PersonOrg>
            )}
            <Address>
              { t('email') }
              :
              {' '}
              <a href={`mailto:${person.email}`}>{person.email}</a>
            </Address>
          </div>
        );
      }}
    </Query>
  );
};

class ContactPerson extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState((state) => ({ collapse: !state.collapse }));
  }

  render() {
    const { t, person, leader } = this.props;
    const { collapse } = this.state;
    let isLeader = '';
    isLeader = leader ? 'leader' : '';
    return (
      <Person className={isLeader}>
        <Media key={person.id}>
          <Media left>
            <Avatar
              src={person.avatarUrl || '/static/images/default-avatar.png'}
              className={`rounded-circle ${isLeader}`}
              alt={`${person.firstName} ${person.lastName}`}
            />
          </Media>
          <PersonDetails body>
            <Name>
              {`${person.firstName} ${person.lastName}`}
            </Name>
            <PersonRole>{person.title}</PersonRole>
            {person.organization && (
              <PersonOrg>{person.organization.name}</PersonOrg>
            )}
            <CollapseButton
              onClick={this.toggle}
              color="link"
              size="sm"
              aria-expanded={collapse}
              aria-controls={`contact-${person.id}`}
            >
              { t('contact-info') }
            </CollapseButton>
            <Collapse isOpen={collapse} id={`contact-${person.id}`}>
              {collapse && <ContactDetails id={person.id} t={t} />}
            </Collapse>
          </PersonDetails>
        </Media>
      </Person>
    );
  }
}

ContactPerson.defaultProps = {
  leader: false,
};

ContactDetails.propTypes = {
  id: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

ContactPerson.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string,
    title: PropTypes.string,
    organization: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  leader: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(ContactPerson);
