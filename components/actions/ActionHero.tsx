import React from 'react';
import { Container, Row, Col, UncontrolledTooltip } from 'reactstrap';
import styled from 'styled-components';
import { useTheme } from 'common/theme';
import { getActionTermContext, useTranslation } from 'common/i18n';
import {
  ActionLink,
  ActionListLink,
  OrganizationLink,
  Link,
} from 'common/links';
import { usePlan } from 'context/plan';

import Icon from 'components/common/Icon';
import { getCategoryString } from 'common/categories';
import { Category } from 'common/__generated__/graphql';

const Hero = styled.header<{ bgColor: string }>`
  position: relative;
  background-color: ${(props) => props.bgColor};
  margin-bottom: ${(props) => props.theme.spaces.s400};
  a {
    color: ${(props) => props.theme.brandDark};

    &:hover {
      color: ${(props) => props.theme.brandDark};
    }
  }
`;

const ActionBgImage = styled.div<{
  bgColor: string;
  bgImage: string;
  imageAlign: string;
}>`
  background-color: ${(props) => props.bgColor};
  background-image: url(${(props) => props.bgImage});
  background-position: ${(props) => props.imageAlign};
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

const DraftBanner = styled.div`
  padding: ${(props) => props.theme.spaces.s150};
  background-color: ${(props) => props.theme.graphColors.yellow010};
  border-radius: ${(props) =>
    `${props.theme.cardBorderRadius} ${props.theme.cardBorderRadius} 0 0`};

  p {
    margin-bottom: 0;
    font-weight: ${(props) => props.theme.fontWeightBold};
  }
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
  font-family: ${(props) => props.theme.fontFamilyTiny};

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    font-size: ${(props) => props.theme.fontSizeBase};
    font-family: ${(props) => props.theme.fontFamily};
  }
`;

const CategoriesBreadcrumb = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

const NavDivider = styled.span`
  color: ${(props) => props.theme.brandDark};
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
  padding: 0.25rem 0.5rem;
  background-color: rgba(255, 255, 255, 0.66);
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => props.theme.fontFamilyTiny};

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    top: inherit;
    bottom: 0;
  }
`;

const ActionHeadline = styled.h1`
  hyphens: manual;
  margin: ${(props) => props.theme.spaces.s100} 0;
  font-size: ${(props) => props.theme.fontSizeXl};
  color: ${(props) => props.theme.themeColors.black} !important;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    display: flex;
    font-size: ${(props) => props.theme.fontSizeXl};
  }
`;

const ActionNumber = styled.span`
  margin-right: ${(props) => props.theme.spaces.s100};
  white-space: nowrap;

  &:after {
    content: '.';
  }
`;

const MAX_CRUMB_LENGTH = 90;

const isIdentifierVisible = (category: Category, showIdentifiers: boolean) =>
  category.categoryPage && category.identifier && showIdentifiers;

const getCategoryName = (category: Category, showIdentifiers: boolean) =>
  isIdentifierVisible(category, showIdentifiers)
    ? `${category.identifier}. ${category.name}`
    : category.name;

const getCategoryUrl = (category: Category, primaryCategory) => {
  if (category.categoryPage) {
    return category.categoryPage.urlPath;
  }

  if (primaryCategory) {
    return `/actions?cat-${primaryCategory.identifier}=${category.id}`;
  }

  return undefined;
};

type PartialCategory = Pick<Category, 'id' | 'name'> & {
  url?: string;
  parent?: PartialCategory;
};

function Crumb({ category }: { category: PartialCategory }) {
  const id = `crumb-${category.id}`;
  const ariaId = `tt-content-${category.id}`;
  const isTruncated = category.name.length > MAX_CRUMB_LENGTH;
  const name = isTruncated
    ? `${category.name.slice(0, MAX_CRUMB_LENGTH).trim()}...`
    : category.name;

  return (
    <>
      <span id={id} aria-describedby={isTruncated ? ariaId : undefined}>
        {category.url ? (
          <Link href={category.url} passHref>
            {name}
          </Link>
        ) : (
          name
        )}
        {` / `}
      </span>

      {isTruncated && (
        <UncontrolledTooltip
          target={id}
          id={ariaId}
          placement="top"
          role="tooltip"
          trigger="focus hover"
        >
          {category.name}
        </UncontrolledTooltip>
      )}
    </>
  );
}

function ActionCategories({ categories }: { categories: Category[] }) {
  const plan = usePlan();
  const showIdentifiers =
    !plan.primaryActionClassification?.hideCategoryIdentifiers;
  const primaryCT = plan.primaryActionClassification;
  const primaryCatId = primaryCT?.id;

  const displayCategories: PartialCategory[] = categories
    .filter((cat) => cat.type.id === primaryCatId)
    .map((cat) => ({
      id: cat.id,
      name: getCategoryName(cat, showIdentifiers),
      url: getCategoryUrl(cat, primaryCT),
      parent: cat.parent
        ? {
            id: cat.parent.id,
            name: getCategoryName(cat.parent, showIdentifiers),
            url: getCategoryUrl(cat.parent, primaryCT),
          }
        : undefined,
    }));

  return (
    <CategoriesBreadcrumb>
      {displayCategories.map((category) => (
        <div key={category.id} className="me-3">
          {category.parent && <Crumb category={category.parent} />}

          <Crumb category={category} />
        </div>
      ))}
    </CategoriesBreadcrumb>
  );
}

type ActionHeroProps = {
  categories: [];
  previousAction: any; //TODO: type these
  nextAction: any;
  identifier: string;
  name: string;
  imageUrl: string;
  imageAlign: string;
  altText?: string;
  imageCredit?: string;
  imageTitle?: string;
  hideActionIdentifiers?: boolean;
  primaryOrg: any;
  state: string;
};

function ActionHero(props: ActionHeroProps) {
  const {
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
    hideActionIdentifiers = true,
    primaryOrg,
    state,
  } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  const plan = usePlan();

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
    <Hero bgColor={theme.brandDark}>
      <ActionBgImage
        bgImage={imageUrl}
        imageAlign={imageAlign}
        bgColor={categoryColor}
      >
        <OverlayContainer>
          <Container>
            <Row>
              <Col lg={8}>
                <HeroCardBg>
                  {state === 'draft' && (
                    <DraftBanner>
                      <p role="status">{t('action-draft')}</p>
                    </DraftBanner>
                  )}
                  <CardContent>
                    {primaryOrg && (
                      <PrimaryOrg>
                        <OrgLogo
                          src={
                            primaryOrg.logo?.rendition?.src ||
                            '/static/themes/default/images/default-avatar-org.png'
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
                              <Icon
                                name="arrowLeft"
                                color={theme.brandDark}
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
                              <Icon
                                name="arrowRight"
                                color={theme.brandDark}
                                aria-hidden="true"
                              />
                            </a>
                          </ActionLink>
                        )}
                      </div>
                    </ActionsNav>
                    <ActionCategories categories={categories} />
                    <ActionHeadline>
                      {!hideActionIdentifiers && (
                        <ActionNumber>{identifier}</ActionNumber>
                      )}
                      <span>{name}</span>
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
