import React, { type PropsWithChildren, type ReactElement, type ReactNode } from 'react';

import NextLink, { type LinkProps } from 'next/link';

import { useLocale } from 'next-intl';

import { ACTIONS_PATH, INDICATORS_PATH } from '@/constants/routes';
import { usePlan } from '@/context/plan';
import { isAbsoluteUrl, stripLocaleAndPlan, stripSlashes } from '@/utils/urls';

import type { PlanContextFragment } from './__generated__/graphql';
import { getCategoryString } from './categories';

export function usePrependPlanAndLocale(path: string, viewUrl: string | null = null) {
  // If cross plan link, use the viewUrl instead of the plan basePath
  if (viewUrl) {
    return `${viewUrl}${path}`;
  }

  const plan = usePlan();
  const locale = useLocale();

  return prependPlanAndLocale(plan, path, locale);
}

type LinkPropsWithoutHref = Omit<Parameters<typeof NextLink>[0], 'href'>;

export function disablePrefetch(linkProps: LinkPropsWithoutHref) {
  if (!('prefetch' in linkProps))
    return {
      ...linkProps,
      prefetch: false,
    };
  return linkProps;
}

export function prependPlanAndLocale(plan: PlanContextFragment, path: string, locale: string) {
  if (typeof path !== 'string' || isAbsoluteUrl(path)) {
    return path;
  }

  const basePath = plan.domain?.basePath ? stripSlashes(plan.domain.basePath) : undefined;
  const strippedPath = stripLocaleAndPlan(plan, locale, path);
  const shouldPrependBasePath = !!basePath;
  const shouldPrependLocale = locale !== plan.primaryLanguage;

  if (shouldPrependBasePath && shouldPrependLocale) {
    return `/${locale}/${basePath}/${strippedPath}`;
  }

  if (shouldPrependBasePath) {
    return `/${basePath}/${strippedPath}`;
  }

  if (shouldPrependLocale) {
    return `/${locale}/${strippedPath}`;
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

export type IndicatorLinkProps = {
  id?: string | number;
  viewUrl?: string | null;
  children: ReactNode;
} & LinkPropsWithoutHref;

export function IndicatorLink({ id, viewUrl, ...other }: IndicatorLinkProps) {
  const href = usePrependPlanAndLocale(getIndicatorLinkProps(id).href, viewUrl);
  return <NextLink passHref {...disablePrefetch(other)} href={href} />;
}

export function PathsNodeLink({
  id,
  ...other
}: { id: string | number; children: ReactNode } & LinkProps) {
  // TODO: implement this
  return <span {...other} data-id={id} />;
}

export type ActionLinkProps = LinkPropsWithoutHref & {
  action: {
    identifier: string;
    mergedWith?: {
      identifier: string;
    } | null;
  };
  planUrl?: string | null;
  viewUrl?: string;
  crossPlan?: boolean;
};

export function ActionLink({
  action,
  planUrl,
  viewUrl,
  crossPlan,
  children,
  ...other
}: ActionLinkProps) {
  // If this action is merged with another, replace all links with
  // a link to the master action.
  const targetIdentifier = action.mergedWith ? action.mergedWith.identifier : action.identifier;

  const actionLink = usePrependPlanAndLocale(`${planUrl ?? ''}${ACTIONS_PATH}/${targetIdentifier}`);

  if (crossPlan && viewUrl) {
    // nextjs NextLink doesn't properly handle links across plans in some cases,
    // specifically when we are in a plan without basepath and the link is to
    // a plan in the same hostname but with a basepath.
    return <a href={viewUrl}>{children}</a>;
  }
  return (
    <NextLink passHref {...disablePrefetch(other)} href={actionLink}>
      {children}
    </NextLink>
  );
}

export function OrganizationLink(
  props: { organizationId: string; children: ReactNode } & OtherLinkProps
) {
  const { organizationId, ...other } = props;
  const href = usePrependPlanAndLocale(`/organizations/${organizationId}`);

  return <NextLink passHref {...disablePrefetch(other)} href={href} />;
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

export function ActionListLink(props: PropsWithChildren<OtherLinkProps & ActionListLinkProps>) {
  const pathname = usePrependPlanAndLocale(ACTIONS_PATH);
  const { href, ...linkProps } = ActionListLink.getLinkProps(props);

  return <NextLink href={{ ...href, pathname }} passHref {...disablePrefetch(linkProps)} />;
}
ActionListLink.getLinkProps = (opts: ActionListLinkProps, rest?: OtherLinkProps) => {
  const { categoryFilters, organizationFilter, ...other } = opts;

  const query = {};
  if (categoryFilters) {
    categoryFilters.forEach((f) => (query[getCategoryString(f.typeIdentifier)] = f.categoryId));
  }
  if (organizationFilter) {
    query['responsible_party'] = organizationFilter.id;
  }
  const href = {
    query,
  };
  return { ...other, ...(rest || {}), href };
};

export function IndicatorListLink(
  props: Omit<LinkProps, 'href'> & { children: ReactElement<unknown> }
) {
  const href = usePrependPlanAndLocale(INDICATORS_PATH);

  return <NextLink href={href} passHref {...disablePrefetch(props)} />;
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
  const href = usePrependPlanAndLocale(slug ?? page.urlPath);

  return <NextLink href={href} {...disablePrefetch(other)} />;
}

type NavigationLinkProps = PropsWithChildren<OtherLinkProps & { slug: string }>;
export function NavigationLink({ slug, children, ...other }: NavigationLinkProps) {
  const plan = usePlan();
  const locale = useLocale();

  if (slug?.startsWith('http')) {
    return (
      <a href={slug} {...other}>
        {children}
      </a>
    );
  }

  const href = prependPlanAndLocale(plan, slug, locale);

  return (
    <NextLink href={href} {...disablePrefetch(other)}>
      {children}
    </NextLink>
  );
}

type AllLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  LinkProps & {
    children?: ReactNode;
    href: string;
  };

/**
 * Wraps next/link and ensures the plan basePath is prepended to the href
 * if necessary. Note: This should *not* be used if linking to other
 * locales, as the locale is before plan in the pathname.
 */
export function Link({ href: rawHref, children, ...linkProps }: AllLinkProps) {
  const href = usePrependPlanAndLocale(rawHref);

  return (
    <NextLink href={href} {...disablePrefetch(linkProps)}>
      {children}
    </NextLink>
  );
}
