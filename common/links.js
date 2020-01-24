/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '../routes';


export function getIndicatorLinkProps(id) {
  return {
    href: '/indicators/[id]',
    as: `/indicators/${id}`,
  };
}

export function getActionLinkProps(id) {
  return {
    href: '/actions/[id]',
    as: `/actions/${id}`,
  };
}

export function getActionListLinkProps(query) {
  return {
    href: {
      pathname: '/actions',
      query,
    },
  };
}

export function getDashboardLinkProps(query) {
  return {
    href: {
      pathname: '/dashboard',
      query,
    },
  };
}

export const replaceHashWithoutScrolling = hash => window
  .history.replaceState({}, '', `#${hash}`);

export function IndicatorLink(props) {
  const { id, ...other } = props;

  return (
    <Link {...getIndicatorLinkProps(id)} passHref {...other} />
  );
}
IndicatorLink.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  ...Link.propTypes,
};

export function ActionLink(props) {
  const { action, ...other } = props;
  // If this action is merged with another, replace all links with
  // a link to the master action.
  const targetIdentifier = action.mergedWith ? action.mergedWith.identifier : action.identifier;

  return (
    <Link {...getActionLinkProps(targetIdentifier)} passHref {...other} />
  );
}
ActionLink.propTypes = {
  action: PropTypes.shape({
    identifier: PropTypes.string.isRequired,
    mergedWith: PropTypes.shape({
      identifier: PropTypes.string.isRequired,
    }),
  }).isRequired,
};


export function ActionListLink(props) {
  const { query, ...other } = props;
  const pathname = '/actions';
  const href = {
    pathname,
    query,
  };

  return <Link href={href} passHref {...other} />;
}
ActionListLink.propTypes = {
  query: PropTypes.shape({
    organization: PropTypes.string,
  }),
  ...Link.propTypes,
};
ActionListLink.defaultProps = {
  query: null,
};


export function IndicatorListLink(props) {
  return <Link href="/indicators" passHref {...props} />;
}
IndicatorListLink.propTypes = {
  ...Link.propTypes,
};

export function DashboardLink(props) {
  return <Link href="/dashboard" passHref {...props} />;
}
DashboardLink.propTypes = {
  ...Link.propTypes,
};

export function StaticPageLink(props) {
  const { slug, ...other } = props;
  return <Link href="/[slug]" as={`/${slug}`} {...other} />;
}
StaticPageLink.propTypes = {
  slug: PropTypes.string.isRequired,
  ...Link.propTypes,
};
