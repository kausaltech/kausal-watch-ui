import React from 'react';

import { Category } from 'common/__generated__/graphql';
import { getBreadcrumbsFromCategoryHierarchy } from 'common/categories';
import { getActionTermContext } from 'common/i18n';
import { ActionLink, ActionListLink, OrganizationLink } from 'common/links';
import Breadcrumbs from 'components/common/Breadcrumbs';
import Icon from 'components/common/Icon';
import { usePlan } from 'context/plan';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Col, Container, Row } from 'reactstrap';
import styled, { useTheme } from 'styled-components';

import { getThemeStaticURL } from '@/common/theme';

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
`;

const ActionBgImage = styled.div<{
  $bgColor: string;
  $bgImage: string;
  $imageAlign: string;
}>`
  background-color: ${(props) => props.$bgColor};
  background-image: url(${(props) => props.$bgImage});
  background-position: ${(props) => props.$imageAlign};
  background-size: cover;
  background-blend-mode: multiply;
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
`;

const CardContent = styled.div`
  padding: ${(props) => props.theme.spaces.s150};

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    padding: ${(props) => props.theme.spaces.s200};
  }
`;

const OverlayContainer = styled.div`
  display: flex;
  align-items: flex-end;
  min-height: 24rem;
  padding: ${(props) => props.theme.spaces.s300} 0
    ${(props) => props.theme.spaces.s300};
`;

const ActionsNav = styled.nav`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.spaces.s100};
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) =>
    `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`};
  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    font-size: ${(props) => props.theme.fontSizeBase};
    font-family: ${(props) =>
      `${props.theme.fontFamily}, ${props.theme.fontFamilyFallback}`};
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

const ImageCredit = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.1rem 0.25rem;
  background-color: rgba(255, 255, 255, 0.66);
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) =>
    `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`};
`;

const ActionHeadline = styled.h1`
  hyphens: manual;
  display: flex;
  flex-wrap: wrap;
  margin: ${(props) => props.theme.spaces.s100} 0;
  font-size: ${(props) => props.theme.fontSizeLg};
  color: ${(props) => props.theme.textColor.primary} !important;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
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

/**
 * Check whether multiple categories at different levels of a single category type hierarchy
 * have been added to an action. Required to filter duplicate categories from the breadcrumb.
 */
const isCategoryInSiblingsParentTree = (
  category: Category,
  siblingParentCategory: Category
) =>
  category.id === siblingParentCategory.id ||
  (siblingParentCategory.parent &&
    isCategoryInSiblingsParentTree(category, siblingParentCategory.parent));

function ActionCategories({ categories }: { categories: Category[] }) {
  const plan = usePlan();
  const showIdentifiers =
    !plan.primaryActionClassification?.hideCategoryIdentifiers;
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
  categories: [];
  previousAction: any; //TODO: type these
  nextAction: any;
  identifier?: string;
  name: string;
  imageUrl: string;
  imageAlign: string;
  altText?: string;
  imageCredit?: string;
  imageTitle?: string;
  hideActionIdentifiers?: boolean;
  primaryOrg: any;
  state: string;
  actionID: string;
  matchingVersion: any;
  updatedAt: string;
};

function ActionHero(props: ActionHeroProps) {
  const {
    matchingVersion,
    updatedAt,
    categories,
    previousAction,
    nextAction,
    identifier,
    name,
    imageUrl,
    imageAlign,
    altText,
    imageCredit,
    imageTitle,
    primaryOrg,
    state,
  } = props;
  const theme = useTheme();
  const t = useTranslations();
  const plan = usePlan();
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

  // Theme overlay color as fallback
  let categoryColor = theme.imageOverlay;
  // If category or its parent has color defined
  const categoryWithColor = categories.find(
    (cat) =>
      cat.color !== null || (cat.parent !== null && cat.parent.color !== null)
  );
  // Override overlay color with that
  if (categoryWithColor && theme.imageOverlay !== 'rgb(255, 255, 255)') {
    categoryColor = categoryWithColor.color
      ? categoryWithColor.color
      : categoryWithColor?.parent.color;
  }

  return (
    <Hero $bgColor={theme.brandDark}>
      <ActionBgImage
        $bgImage={imageUrl}
        $imageAlign={imageAlign}
        $bgColor={categoryColor}
      >
        <OverlayContainer>
          <Container>
            <Row>
              <Col lg={8}>
                <HeroCardBg>
                  {isAuthenticated && (
                    <ActionLogBanner
                      matchingVersion={matchingVersion}
                      updatedAt={updatedAt}
                    />
                  )}
                  <CardContent>
                    {primaryOrg && (
                      <PrimaryOrg>
                        <OrgLogo
                          src={
                            primaryOrg.logo?.rendition?.src ||
                            getThemeStaticURL(theme.defaultAvatarOrgImage)
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
                    <ActionsNav aria-label={t('nav-actions-pager')}>
                      <ActionListLink>
                        <a>
                          <IndexLink>
                            {t('actions', getActionTermContext(plan))}
                          </IndexLink>
                        </a>
                      </ActionListLink>
                      <div>
                        {previousAction && (
                          <ActionLink action={previousAction}>
                            <a>
                              <Icon.ArrowLeft
                                color={theme.linkColor}
                                aria-hidden="true"
                              />{' '}
                              {t('previous')}
                            </a>
                          </ActionLink>
                        )}
                        {nextAction && previousAction && <NavDivider />}
                        {nextAction && (
                          <ActionLink action={nextAction}>
                            <a>
                              {t('next')}
                              <Icon.ArrowRight
                                color={theme.linkColor}
                                aria-hidden="true"
                              />
                            </a>
                          </ActionLink>
                        )}
                      </div>
                    </ActionsNav>
                    <ActionCategories categories={categories} />
                    <ActionHeadline>
                      {identifier && <ActionNumber>{identifier}</ActionNumber>}
                      <ActionName>{name}</ActionName>
                    </ActionHeadline>
                  </CardContent>
                </HeroCardBg>
              </Col>
            </Row>
          </Container>
          {altText && (
            <span className="sr-only" role="img" aria-label={altText} />
          )}
          {imageCredit && (
            <ImageCredit>{`${t('image-credit')}: ${imageCredit}`}</ImageCredit>
          )}
        </OverlayContainer>
      </ActionBgImage>
    </Hero>
  );
}

export default ActionHero;
