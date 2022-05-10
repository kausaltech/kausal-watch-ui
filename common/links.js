/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { setBasePath as setNextRouterBasePath } from 'next/dist/shared/lib/router/router';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import getConfig from 'next/config';

export function setBasePath() {
  const { publicRuntimeConfig } = getConfig();
  setNextRouterBasePath(publicRuntimeConfig.basePath);
}

// Return root slug of the current path
export function getActiveBranch() {
  const router = useRouter();
  const splitCurrent = router.pathname.split('/');
  const currentPath = splitCurrent[1]; // [0] is ''
  // Resolve slug for a dynamic content page
  if (currentPath === '[...slug]') {
    return router.query.slug[0];
  }
  // Ignore the hashtag if present
  return currentPath.split('#')[0];
}

export function getIndicatorLinkProps(id) {
  return {
    href: `/indicators/${id}`,
  };
}

export function getActionLinkProps(id, planUrl) {
  if (planUrl) return {
    href: `${planUrl}/actions/${id}`
  }
  return {
    href: `/actions/${id}`,
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

export function getSearchResultsLinkProps(query) {
  return {
    href: {
      pathname: '/search',
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

export function getStatusboardLinkProps(query) {
  return {
    href: {
      pathname: '/dashboard/status',
      query,
    },
  };
}

export const replaceHashWithoutScrolling = (hash) => window.history.replaceState(
  {}, // state, not used
  '', // title, not used
  hash ? `#${hash}` : `${window.location.pathname}${window.location.search}`,
);

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

export const actionPropType = PropTypes.shape({
  identifier: PropTypes.string.isRequired,
  mergedWith: PropTypes.shape({
    identifier: PropTypes.string.isRequired,
  }),
});

export function ActionLink(props) {
  const { action, planUrl, ...other } = props;
  // If this action is merged with another, replace all links with
  // a link to the master action.
  const targetIdentifier = action.mergedWith ? action.mergedWith.identifier : action.identifier;

  return (
    <Link {...getActionLinkProps(targetIdentifier, planUrl)} passHref {...other} />
  );
}

ActionLink.defaultProps = {
  planUrl: undefined,
};

ActionLink.propTypes = {
  action: actionPropType.isRequired,
  planUrl: PropTypes.string,
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
  return <Link href={`/${slug}`} {...other} />;
}
StaticPageLink.propTypes = {
  slug: PropTypes.string.isRequired,
  ...Link.propTypes,
};

export function NavigationLink(props) {
  const { slug, children, ...other } = props;
  return slug?.startsWith('http')
    ? <a href={slug} {...other}>{children}</a>
    : <Link href={`${slug}`} {...other}><a>{children}</a></Link>;
}

NavigationLink.propTypes = {
  slug: PropTypes.string.isRequired,
  ...Link.propTypes,
};

export { Link };
