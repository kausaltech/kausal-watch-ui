import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import { getThemeStaticURL } from '@common/themes/theme';

import type { ActionDetailsQuery } from '@/common/__generated__/graphql';
import { getBreadcrumbsFromCategoryHierarchy } from '@/common/categories';
import { getActionTermContext } from '@/common/i18n';
import { type HeroImageRenditions, getImageSrcSet } from '@/common/images';
import { ActionLink, ActionListLink, OrganizationLink } from '@/common/links';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import ContainedHeaderImage from '@/components/common/ContainedHeaderImage';
import Icon from '@/components/common/Icon';
import { Col, Container, Row } from '@/components/common/layout/LayoutGrid';
import { usePlan } from '@/context/plan';
import { PRINT_MODE_SELECTOR } from '@/context/print';

import { ImageCredit } from '../common/ImageCredit';
import ActionLogBanner from './ActionLogBanner';

const Hero = styled.header<{ $bgColor: string }>`
  position: relative;
  background-color: ${(props) => props.$bgColor};
  margin-bottom: ${(props) => props.theme.spaces.s400};
  a {
    color: ${(props) => props.theme.linkColor};

    &:hover {
      color: ${(props) => props.theme.linkColor};
    }
  }
  @media print {
    background-color: transparent;
    margin-bottom: 0;
  }
`;

const ActionBgImage = styled.div<{ $bgColor: string }>`
  position: relative;
  /* Keep the image's multiply blending contained to this element */
  isolation: isolate;
  background-color: ${(props) => props.$bgColor};
  @media print {
    background-color: transparent;
  }
`;

const ActionBgImageImg = styled.img<{ $imageAlign: string }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${(props) => props.$imageAlign};
  mix-blend-mode: multiply;
  @media print {
    display: none;
  }
`;

const PrimaryOrg = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s100};
  padding-bottom: ${(props) => props.theme.spaces.s100};
  border-bottom: 1px solid #eeeeee;
`;

const OrgLogo = styled.img`
  height: ${(props) => props.theme.spaces.s300};
  margin-right: ${(props) => props.theme.spaces.s100};
`;

const HeroCardBg = styled.div`
  overflow: hidden;
  position: relative;
  margin-bottom: -${(props) => props.theme.spaces.s400};
  background-color: ${(props) => props.theme.themeColors.white};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  @media print {
    margin-bottom: 0;
    box-shadow: none;
    border-radius: 0;
    background-color: #fff;
  }
`;

const CardContent = styled.div<{ $flush?: boolean }>`
  padding: ${({ theme, $flush }) => ($flush ? `${theme.spaces.s200} 0 0` : theme.spaces.s150)};

  ${(props) => props.theme.breakpoints.up('md')} {
    padding: ${({ theme, $flush }) => ($flush ? `${theme.spaces.s300} 0 0` : theme.spaces.s200)};
  }
`;

const OverlayContainer = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  min-height: 24rem;
  padding: ${(props) => props.theme.spaces.s300} 0 ${(props) => props.theme.spaces.s300};
  @media print {
    min-height: 0;
    padding: 0;
  }
`;

/* Matches the width of the main column in ActionContent's StyledContentGrid */
const MainColumnWidth = styled.div`
  ${(props) => props.theme.breakpoints.up('md')} {
    max-width: calc((100% - var(--bs-gutter-x)) * 7 / 12);
  }

  ${(props) => props.theme.breakpoints.up('lg')} {
    max-width: calc((100% - var(--bs-gutter-x)) * 8 / 12);
  }

  ${PRINT_MODE_SELECTOR} & {
    max-width: none;
  }
`;

const ActionsNav = styled.nav`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.spaces.s100};
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`};
  ${(props) => props.theme.breakpoints.up('md')} {
    font-size: ${(props) => props.theme.fontSizeBase};
    font-family: ${(props) => `${props.theme.fontFamily}, ${props.theme.fontFamilyFallback}`};
  }
`;

const ActionsPagination = styled.div`
  @media print {
    display: none;
  }
`;

const NavDivider = styled.span`
  color: ${(props) => props.theme.linkColor};
  &::after {
    content: ' | ';
  }
`;

const IndexLink = styled.span`
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

const ActionHeadline = styled.h1`
  hyphens: auto;
  display: flex;
  flex-wrap: wrap;
  margin: ${(props) => props.theme.spaces.s100} 0;
  font-size: ${(props) => props.theme.fontSizeLg};
  color: ${(props) => props.theme.textColor.primary} !important;

  html:lang(fi) & {
    hyphens: manual;
  }

  ${(props) => props.theme.breakpoints.up('md')} {
    font-size: ${(props) => props.theme.fontSizeXl};
  }
`;

const ActionNumber = styled.span`
  display: block;
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 1;
  margin-right: ${(props) => props.theme.spaces.s050};
  white-space: nowrap;

  &:after {
    content: '.';
  }
`;

const ActionName = styled.span`
  display: block;
  flex-basis: 75%; // Wrap on separate line if ActionNumber takes over 25% of the space
  flex-grow: 3;
  flex-shrink: 0;
  max-width: 100%;
`;

type ActionDetails = NonNullable<ActionDetailsQuery['action']>;
type Category = ActionDetails['categories'][number];

/* The generated category types bound the parent recursion depth, so the
 * hierarchy helpers only require the fields they actually traverse */
type CategoryHierarchy = {
  id: string;
  parent?: CategoryHierarchy | null;
};

/**
 * Check whether multiple categories at different levels of a single category type hierarchy
 * have been added to an action. Required to filter duplicate categories from the breadcrumb.
 */
function isCategoryInSiblingsParentTree(
  category: { id: string },
  siblingParentCategory: CategoryHierarchy
): boolean {
  if (category.id === siblingParentCategory.id) return true;
  if (!siblingParentCategory.parent) return false;
  return isCategoryInSiblingsParentTree(category, siblingParentCategory.parent);
}

function ActionCategories({ categories }: { categories: Category[] }) {
  const plan = usePlan();
  const showIdentifiers = !plan.primaryActionClassification?.hideCategoryIdentifiers;
  const primaryCT = plan.primaryActionClassification;
  const primaryCatId = primaryCT?.id;

  const displayCategories = categories.filter(
    (category) =>
      category.type.id === primaryCatId &&
      // Check whether this category is included in a sibling's parent
      !categories.some(
        (otherCategory) =>
          otherCategory.id !== category.id &&
          otherCategory.parent &&
          isCategoryInSiblingsParentTree(category, otherCategory.parent)
      )
  );

  return (
    <Breadcrumbs
      breadcrumbs={getBreadcrumbsFromCategoryHierarchy(
        displayCategories,
        showIdentifiers,
        primaryCT
      )}
    />
  );
}

type ActionHeroProps = {
  categories: Category[];
  previousAction: ActionDetails['previousAction'];
  nextAction: ActionDetails['nextAction'];
  identifier?: string;
  name: string;
  image?: HeroImageRenditions | null;
  imageAlign: string;
  altText?: string;
  imageCredit?: string;
  imageTitle?: string;
  hideActionIdentifiers?: boolean;
  primaryOrg: ActionDetails['primaryOrg'];
  state?: string;
  matchingVersion: NonNullable<ActionDetails['workflowStatus']>['matchingVersion'] | null;
  updatedAt: string;
  /** Defaults to `contained` when the theme sets `settings.layout.containImages` */
  layout?: ActionHeroLayout;
};

export type ActionHeroLayout = 'overlay' | 'contained';

type ActionHeroCardProps = Pick<
  ActionHeroProps,
  | 'categories'
  | 'previousAction'
  | 'nextAction'
  | 'identifier'
  | 'name'
  | 'primaryOrg'
  | 'matchingVersion'
  | 'updatedAt'
> & {
  /** Lay the content out in the page flow rather than as a padded card */
  flush?: boolean;
};

function ActionHeroCard(props: ActionHeroCardProps) {
  const {
    matchingVersion,
    updatedAt,
    categories,
    previousAction,
    nextAction,
    identifier,
    name,
    primaryOrg,
    flush,
  } = props;
  const theme = useTheme();
  const t = useTranslations();
  const plan = usePlan();
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

  const title = (
    <>
      <ActionCategories categories={categories} />
      <ActionHeadline>
        {identifier && <ActionNumber>{identifier}</ActionNumber>}
        <ActionName>{name}</ActionName>
      </ActionHeadline>
    </>
  );

  return (
    <>
      {isAuthenticated && (
        <ActionLogBanner matchingVersion={matchingVersion} updatedAt={updatedAt} />
      )}
      <CardContent $flush={flush}>
        {primaryOrg && (
          <PrimaryOrg>
            <OrgLogo
              src={
                primaryOrg.logo?.rendition?.src || getThemeStaticURL(theme.defaultAvatarOrgImage)
              }
              alt=""
            />
            <strong>
              <OrganizationLink organizationId={primaryOrg.id}>
                {primaryOrg.abbreviation || primaryOrg.name}
              </OrganizationLink>
            </strong>
          </PrimaryOrg>
        )}
        <ActionsNav aria-label={t('nav-actions-pager', getActionTermContext(plan))}>
          <ActionListLink>
            <IndexLink>{t('actions-plural', getActionTermContext(plan))}</IndexLink>
          </ActionListLink>
          {theme.settings?.actionView?.showPaginationTop && (
            <ActionsPagination>
              {previousAction && (
                <ActionLink action={previousAction}>
                  <>
                    <Icon.ArrowLeft color={theme.linkColor} aria-hidden="true" /> {t('previous')}
                  </>
                </ActionLink>
              )}
              {nextAction && previousAction && <NavDivider />}
              {nextAction && (
                <ActionLink action={nextAction}>
                  <>
                    {t('next')}
                    <Icon.ArrowRight color={theme.linkColor} aria-hidden="true" />
                  </>
                </ActionLink>
              )}
            </ActionsPagination>
          )}
        </ActionsNav>
        {flush ? <MainColumnWidth>{title}</MainColumnWidth> : title}
      </CardContent>
    </>
  );
}

function ActionHero(props: ActionHeroProps) {
  const { categories, image, imageAlign, altText, imageCredit } = props;
  const theme = useTheme();
  const t = useTranslations();

  const layout: ActionHeroLayout =
    props.layout ?? (theme.settings.layout.containImages ? 'contained' : 'overlay');
  const imageSrc = image ? (image.fullMedium ?? image.full ?? image.fullSmall)?.src : undefined;
  const srcSet = image
    ? getImageSrcSet([image.fullSmall, image.fullMedium, image.full])
    : undefined;
  const credit = imageCredit ? `${t('image-credit')}: ${imageCredit}` : null;

  if (layout === 'contained') {
    return (
      <Hero $bgColor="transparent">
        {image && (
          <ContainedHeaderImage
            image={image}
            imageAlign={imageAlign}
            altText={altText}
            imageCredit={imageCredit}
          />
        )}
        <Container>
          <ActionHeroCard {...props} flush />
        </Container>
      </Hero>
    );
  }

  // Theme overlay color as fallback
  let categoryColor = theme.imageOverlay;
  // If category or its parent has color defined
  const categoryWithColor = categories.find(
    (cat) => cat?.color !== null || (cat.parent !== null && cat.parent?.color !== null)
  );
  // Override overlay color with that
  if (categoryWithColor && theme.imageOverlay !== 'rgb(255, 255, 255)') {
    categoryColor = categoryWithColor.color || categoryWithColor.parent?.color || categoryColor;
  }

  return (
    <Hero $bgColor={theme.brandDark}>
      <ActionBgImage $bgColor={categoryColor}>
        {image && imageSrc && (
          <ActionBgImageImg
            src={imageSrc}
            srcSet={srcSet}
            sizes="100vw"
            alt={altText ?? ''}
            $imageAlign={imageAlign}
          />
        )}
        <OverlayContainer>
          <Container>
            <Row>
              <Col lg={8}>
                <HeroCardBg>
                  <ActionHeroCard {...props} />
                </HeroCardBg>
              </Col>
            </Row>
          </Container>
          {credit && <ImageCredit>{credit}</ImageCredit>}
        </OverlayContainer>
      </ActionBgImage>
    </Hero>
  );
}

export default ActionHero;
