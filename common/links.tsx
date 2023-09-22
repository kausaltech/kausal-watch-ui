/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement, PropsWithChildren } from 'react';
import { setBasePath as setNextRouterBasePath } from 'next/dist/shared/lib/router/router';
import { useRouter } from 'next/router';
import Link, { LinkProps } from 'next/link';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import { getCategoryString } from './categories';

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

export function getActionLinkProps(id: string, planUrl?: string) {
  if (planUrl)
    return {
      href: `${planUrl}/actions/${id}`,
    };
  return {
    href: `/actions/${id}`,
    as: undefined,
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

export const replaceHashWithoutScrolling = (hash) =>
  window.history.replaceState(
    {}, // state, not used
    '', // title, not used
    hash ? `#${hash}` : `${window.location.pathname}${window.location.search}`
  );

export function IndicatorLink(props) {
  const { id, ...other } = props;

  return <Link {...getIndicatorLinkProps(id)} passHref {...other} />;
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
  const { action, planUrl, viewUrl, crossPlan, ...other } = props;
  // If this action is merged with another, replace all links with
  // a link to the master action.
  const targetIdentifier = action.mergedWith
    ? action.mergedWith.identifier
    : action.identifier;
  if (crossPlan) {
    // nextjs Link doesn't properly handle links across plans in some cases,
    // specifically when we are in a plan without basepath and the link is to
    // a plan in the same hostname but with a basepath.
    return React.cloneElement(React.Children.only(other.children), {
      href: viewUrl,
    });
  }
  return (
    <Link
      {...getActionLinkProps(targetIdentifier, planUrl)}
      passHref
      {...other}
    />
  );
}

ActionLink.defaultProps = {
  planUrl: undefined,
};

ActionLink.propTypes = {
  action: actionPropType.isRequired,
  planUrl: PropTypes.string,
};

export function OrganizationLink(props) {
  const { organizationId, ...other } = props;
  const href = `/organizations/${organizationId}`;
  return <Link href={href} passHref {...other} />;
}

type ActionListLinkProps = {
  categoryFilters?: {
    typeIdentifier: string;
    categoryId: string;
  }[];
  organizationFilter?: {
    id: string;
  };
};

type OtherLinkProps = Omit<LinkProps, 'href' | 'as'>;

export function ActionListLink(
  props: PropsWithChildren<OtherLinkProps & ActionListLinkProps>
) {
  const linkProps = ActionListLink.getLinkProps(props);
  return <Link passHref {...linkProps} />;
}
ActionListLink.getLinkProps = (
  opts: ActionListLinkProps,
  rest?: OtherLinkProps
) => {
  const { categoryFilters, organizationFilter, ...other } = opts;
  const pathname = '/actions';

  const query = {};
  if (categoryFilters) {
    categoryFilters.forEach(
      (f) => (query[getCategoryString(f.typeIdentifier)] = f.categoryId)
    );
  }
  if (organizationFilter) {
    query['responsible_party'] = organizationFilter.id;
  }
  const href = {
    pathname,
    query,
  };
  return { ...opts, ...(rest || {}), href };
};

export function IndicatorListLink(
  props: Omit<LinkProps, 'href'> & { children: ReactElement }
) {
  return <Link href="/indicators" passHref {...props} />;
}

type StaticPageLinkProps =
  | {
      slug: string;
      page?: undefined;
    }
  | {
      slug?: undefined;
      page: {
        urlPath: string;
      };
    };

export function StaticPageLink(
  props: PropsWithChildren<OtherLinkProps & StaticPageLinkProps>
) {
  const { slug, page, ...other } = props;
  if (slug) return <Link href={`/${slug}`} {...other} />;
  return <Link href={page!.urlPath} {...other} />;
}

type NavigationLinkProps = PropsWithChildren<OtherLinkProps & { slug: string }>;
export function NavigationLink(props: NavigationLinkProps) {
  const { slug, children, ...other } = props;
  return slug?.startsWith('http') ? (
    <a href={slug} {...other}>
      {children}
    </a>
  ) : (
    <Link href={`${slug}`} {...other}>
      <a>{children}</a>
    </Link>
  );
}

NavigationLink.propTypes = {
  slug: PropTypes.string.isRequired,
  ...Link.propTypes,
};

export { Link };
