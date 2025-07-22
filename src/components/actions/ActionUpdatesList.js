import React from 'react';

import { gql, useQuery } from '@apollo/client';
import { useTranslations } from 'next-intl';
import PropTypes from 'prop-types';
import { Col, Media, Row } from 'reactstrap';
import styled from 'styled-components';

import { getThemeStaticURL } from '@/common/theme';
import RichText from '@/components/common/RichText';

import dayjs from '../../common/dayjs';
import { usePlan } from '../../context/plan';

const ActionUpdate = styled.article`
  padding: ${(props) => props.theme.spaces.s100};
  margin: 0 0 ${(props) => props.theme.spaces.s150};
  background: ${(props) => props.theme.themeColors.white};
  border: 2px solid ${(props) => props.theme.themeColors.light};
  border-radius: ${(props) => props.theme.cardBorderRadius};
`;

const ActionUpdateHeader = styled.header`
  h3 {
    font-size: ${(props) => props.theme.fontSizeMd};
    line-height: ${(props) => props.theme.lineHeightMd};
  }
`;

const AuthorAvatar = styled.img`
  width: ${(props) => props.theme.spaces.s300};
  height: ${(props) => props.theme.spaces.s300};
  margin-right: ${(props) => props.theme.spaces.s050};
`;

const AuthorName = styled.div`
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

const UpdateDate = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`};
  font-weight: ${(props) => props.theme.fontWeightNormal};
  color: ${(props) => props.theme.themeColors.dark};
`;

const GET_ACTION_UPDATES = gql`
  query ActionUpdates($plan: ID!, $id: ID!) {
    action(plan: $plan, id: $id) {
      statusUpdates {
        id
        title
        date
        author {
          id
          firstName
          lastName
          avatarUrl(size: "150x150")
        }
        content
      }
    }
  }
`;

function ActionStatusUpdate(props) {
  const { author = null, date, title, content } = props;

  const defaultAvatarUrl = getThemeStaticURL(theme.defaultAvatarOrgImage);

  return (
    <ActionUpdate>
      <ActionUpdateHeader>
        <Media className="mb-3">
          <Media left top>
            <AuthorAvatar
              src={author?.avatarUrl || defaultAvatarUrl}
              className="rounded-circle"
              alt={author ? `${author.firstName} ${author.lastName}` : 'Author'}
            />
          </Media>
          <Media body>
            <AuthorName>{author ? `${author.firstName} ${author.lastName}` : 'Author'}</AuthorName>
            <UpdateDate>
              <time dateTime={date}>{dayjs(date).format('L')}</time>
            </UpdateDate>
          </Media>
        </Media>
        <h3>{title}</h3>
      </ActionUpdateHeader>
      <RichText html={content} />
    </ActionUpdate>
  );
}

function ActionUpdatesList() {
  const { id } = this.props;
  const t = useTranslations();
  const plan = usePlan();
  const { loading, error, data } = useQuery(GET_ACTION_UPDATES, {
    variables: { id, plan: plan.identifier },
  });

  if (loading) return <span>{t('loading')}</span>;
  if (error) return <span>{error.message}</span>;
  const { action } = data;

  return (
    <Row>
      {action.statusUpdates.map((update) => (
        <Col sm="12" key={update.id}>
          <ActionStatusUpdate
            author={update.author}
            date={update.date}
            title={update.title}
            content={update.content}
          />
        </Col>
      ))}
    </Row>
  );
}

ActionStatusUpdate.propTypes = {
  author: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string,
  }),
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

ActionUpdatesList.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ActionUpdatesList;
