import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';

import { Button, Collapse } from 'reactstrap';
import Icon from 'components/common/Icon';
import { usePlan } from 'context/plan';
import { PlanFeaturesContactPersonsPublicData } from 'common/__generated__/graphql';
import { useTranslations } from 'next-intl';

const Person = styled.div`
  display: flex;
  margin-top: 1em;
  padding-bottom: 1em;
  border-bottom: 2px solid ${(props) => props.theme.themeColors.light};

  img {
    border: 2px solid ${(props) => props.theme.themeColors.light};
  }

  &.leader {
    img {
      border: 4px solid ${(props) => props.theme.brandDark};
    }
  }
`;

const PersonDetails = styled.div`
  margin-left: 1em;

  .btn-link,
  .btn-link:hover {
    color: ${(props) => props.theme.linkColor};
  }
`;

const Name = styled.div`
  line-height: ${(props) => props.theme.lineHeightSm};
  margin-bottom: 0.5em;
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

const PersonRole = styled.div`
  margin-bottom: 0.5em;
  color: ${(props) => props.theme.themeColors.dark};
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => props.theme.fontFamilyTiny};
  font-weight: ${(props) => props.theme.fontWeightBold};
  line-height: ${(props) => props.theme.lineHeightSm};
`;

const PersonOrg = styled.div`
  margin-bottom: 1em;
  color: ${(props) => props.theme.themeColors.dark};
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => props.theme.fontFamilyTiny};
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
  font-family: ${(props) => props.theme.fontFamilyTiny};
`;

const CollapseButton = styled(Button)`
  padding: 0;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
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
  }
`;

function ContactDetails(props) {
  const { id, plan } = props;
  const t = useTranslations();
  const { loading, error, data } = useQuery(GET_CONTACT_DETAILS, {
    variables: { id },
  });

  if (loading) return <span>{t('loading')}</span>;
  if (error) return <span>{error.message}</span>;
  const { person } = data;

  let orgAncestors;

  if (person.organization && person.organization.ancestors) {
    orgAncestors = person.organization.ancestors
      .filter(
        (org) =>
          org.classification?.name !== 'Valtuusto' &&
          org.classification?.name !== 'Hallitus'
      )
      .map((org) => ({ id: org.id, name: org.name }));
    orgAncestors.push({
      id: person.organization.id,
      name: person.organization.name,
    });
  } else {
    orgAncestors = [];
  }

  return (
    <div className="mt-2">
      {plan.features.contactPersonsShowOrganizationAncestors &&
        orgAncestors.length > 1 && (
          <PersonOrg>
            {orgAncestors.map((item, idx) => (
              <span key={item.key}>
                {item.name}
                {idx < orgAncestors.length - 1 ? ' / ' : ''}
              </span>
            ))}
          </PersonOrg>
        )}
      <Address>
        {t('email')}: <a href={`mailto:${person.email}`}>{person.email}</a>
      </Address>
    </div>
  );
}

function ContactPerson(props) {
  const { person, leader = false } = props;
  const plan = usePlan();
  const t = useTranslations();
  const [collapse, setCollapse] = useState(false);
  const isLeader = leader ? 'leader' : '';
  const fullName = `${person.firstName} ${person.lastName}`;
  const role = isLeader ? t('contact-person-main') : '';

  return (
    <Person className={isLeader}>
      <div>
        <Avatar
          src={
            person.avatarUrl ||
            '/static/themes/default/images/default-avatar-user.png'
          }
          className={`rounded-circle ${isLeader}`}
          alt={`${role} ${fullName}`}
        />
      </div>
      <PersonDetails>
        <Name>{fullName}</Name>
        <PersonRole>{person.title}</PersonRole>
        {person.organization && (
          <PersonOrg>{person.organization.name}</PersonOrg>
        )}
        {plan.features.contactPersonsPublicData ===
          PlanFeaturesContactPersonsPublicData.All && (
          <CollapseButton
            onClick={() => setCollapse(!collapse)}
            color="link"
            size="sm"
            aria-expanded={collapse}
            aria-controls={`contact-${person.id}`}
          >
            {t('contact-info')}
            <Icon name={collapse ? 'angle-down' : 'angle-right'} />
          </CollapseButton>
        )}
        <Collapse isOpen={collapse} id={`contact-${person.id}`}>
          {collapse && <ContactDetails id={person.id} plan={plan} />}
        </Collapse>
      </PersonDetails>
    </Person>
  );
}

ContactDetails.propTypes = {
  id: PropTypes.string.isRequired,
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
};

export default ContactPerson;
