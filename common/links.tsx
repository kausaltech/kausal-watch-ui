import React, { ReactElement, PropsWithChildren, ReactNode } from 'react';
import { default as NextLink, LinkProps } from 'next/link';
import PropTypes from 'prop-types';
import { getCategoryString } from './categories';
import { isAbsoluteUrl, stripSlashes } from '@/lib/utils/urls';
import { usePlan } from '@/context/plan';
import { PlanContextFragment } from './__generated__/graphql';
import { ACTIONS_PATH, INDICATORS_PATH } from '@/lib/constants/routes';

function usePrependSubPlanPath(path: string) {
  const plan = usePlan();

  return prependSubPlanPath(plan, path);
}

function prependSubPlanPath(plan: PlanContextFragment, path: string) {
  if (isAbsoluteUrl(path)) {
    return path;
  }

  const basePath = plan.domain?.basePath
    ? stripSlashes(plan.domain.basePath, { trailing: true })
    : undefined;

  if (basePath && !path.startsWith(`${basePath}/`)) {
    return `${basePath}/${stripSlashes(path, {
      leading: true,
    })}`;
  }

  return path;
}

// Return root slug of the current path
export function getActiveBranch(pathname: string, locale: string) {
  const pathSegmentsExcludingLocale = stripSlashes(pathname)
    .split('/')
    .filter((segment) => segment !== locale);

  const currentRootPath = pathSegmentsExcludingLocale[0] ?? '';

  return currentRootPath;
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

export const replaceHashWithoutScrolling = (hash) =>
  window.history.replaceState(
    {}, // state, not used
    '', // title, not used
    hash ? `#${hash}` : `${window.location.pathname}${window.location.search}`
  );

export function IndicatorLink({
  id,
  ...other
}: { id: string | number; children: ReactNode } & LinkProps) {
  const href = usePrependSubPlanPath(getIndicatorLinkProps(id).href);

  return <NextLink passHref {...other} href={href} legacyBehavior />;
}

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

  const actionLink = usePrependSubPlanPath(
    `${ACTIONS_PATH}/${targetIdentifier}`
  );

  if (crossPlan) {
    // nextjs NextLink doesn't properly handle links across plans in some cases,
    // specifically when we are in a plan without basepath and the link is to
    // a plan in the same hostname but with a basepath.
    return React.cloneElement(React.Children.only(other.children), {
      href: viewUrl,
    });
  }
  return <NextLink passHref {...other} href={actionLink} legacyBehavior />;
}

ActionLink.propTypes = {
  action: actionPropType.isRequired,
  planUrl: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export function OrganizationLink(
  props: { organizationId: string; children: ReactNode } & OtherLinkProps
) {
  const { organizationId, ...other } = props;
  const href = usePrependSubPlanPath(`/organizations/${organizationId}`);

  return <NextLink passHref {...other} href={href} legacyBehavior />;
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
  const pathname = usePrependSubPlanPath(ACTIONS_PATH);
  const { href, ...linkProps } = ActionListLink.getLinkProps(props);

  return (
    <NextLink
      href={{ ...href, pathname }}
      passHref
      {...linkProps}
      legacyBehavior
    />
  );
}
ActionListLink.getLinkProps = (
  opts: ActionListLinkProps,
  rest?: OtherLinkProps
) => {
  const { categoryFilters, organizationFilter, ...other } = opts;

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
    query,
  };
  return { ...opts, ...(rest || {}), href };
};

export function IndicatorListLink(
  props: Omit<LinkProps, 'href'> & { children: ReactElement }
) {
  const href = usePrependSubPlanPath(INDICATORS_PATH);

  return <NextLink href={href} passHref {...props} legacyBehavior />;
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

export function StaticPageLink({
  slug,
  page,
  ...other
}: PropsWithChildren<OtherLinkProps & StaticPageLinkProps>) {
  const href = usePrependSubPlanPath(slug ?? page!.urlPath);

  return <NextLink href={href} {...other} legacyBehavior />;
}

type NavigationLinkProps = PropsWithChildren<OtherLinkProps & { slug: string }>;
export function NavigationLink({
  slug,
  children,
  ...other
}: NavigationLinkProps) {
  const plan = usePlan();

  if (slug?.startsWith('http')) {
    return (
      <a href={slug} {...other}>
        {children}
      </a>
    );
  }

  const href = prependSubPlanPath(plan, slug);

  return (
    <NextLink href={href} {...other}>
      {children}
    </NextLink>
  );
}

NavigationLink.propTypes = {
  slug: PropTypes.string.isRequired,
  ...NextLink.propTypes,
};

/**
 * Wraps next/link and ensures the plan basePath is prepended to the href
 * if necessary. Note: This should *not* be used if linking to other
 * locales, as the locale is before plan in the pathname.
 */
export function Link({
  href: rawHref,
  children,
  ...linkProps
}: LinkProps & { children?: ReactNode; href: string }) {
  const href = usePrependSubPlanPath(rawHref);

  return (
    <NextLink href={href} {...linkProps}>
      {children}
    </NextLink>
  );
}
