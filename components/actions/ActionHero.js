import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Row, Col,
} from 'reactstrap';
import styled from 'styled-components';
import { Link } from 'routes';
import { useTheme } from 'common/theme';
import { useTranslation } from 'common/i18n';
import { ActionLink, ActionListLink } from 'common/links';

import Icon from 'components/common/Icon';

const Hero = styled.header`
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

const ActionBgImage = styled.div`
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
  margin-bottom: -${(props) => props.theme.spaces.s400};
  background-color: white;
  border-radius: ${(props) => props.theme.cardBorderRadius};
  box-shadow: 4px 4px 8px rgba(0,0,0,0.1);
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
  padding: ${(props) => props.theme.spaces.s300} 0 ${(props) => props.theme.spaces.s300};
`;

const ActionsNav = styled.nav`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.spaces.s100};
  font-size: ${(props) => props.theme.fontSizeSm};

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    font-size: ${(props) => props.theme.fontSizeBase};
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
  background-color: rgba(255,255,255,0.66);
  font-size: ${(props) => props.theme.fontSizeSm};

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    top: inherit;
    bottom: 0;
  }
`;

const ActionHeadline = styled.h1`
  hyphens: auto;
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

  &:after {
    content: ".";
  }
`;

const ActionCategories = (categories) => {
  const theme = useTheme();
  const { showIdentifiers } = theme.settings.categories;

  const displayCategories = [];
  categories.categories.every((cat, indx) => {
    if (cat.type.identifier !== 'action') return false;
    displayCategories[indx] = {};
    let categoryTitle = cat.name;
    if (cat.categoryPage) {
      displayCategories[indx].url = cat.categoryPage.urlPath;
      if (cat.identifier && showIdentifiers) categoryTitle = `${cat.identifier}. ${cat.name}`;
    } else {
      displayCategories[indx].url = `/actions?category_action=${cat.id}`;
    }
    displayCategories[indx].name = categoryTitle;
    displayCategories[indx].id = cat.id;
    if (cat.parent) {
      displayCategories[indx].parent = {};
      let categoryParentTitle = cat.parent.name;
      if (cat.parent.categoryPage) {
        displayCategories[indx].parent.url = cat.parent.categoryPage.urlPath;
        if (cat.parent.identifier && showIdentifiers) {
          categoryParentTitle = `${cat.parent.identifier}. ${cat.parent.name}`;
        }
      } else {
        displayCategories[indx].parent.url = `/actions?category_action=${cat.parent.id}`;
      }
      displayCategories[indx].parent.name = categoryParentTitle;
      displayCategories[indx].parent.id = cat.parent.id;
    }
    return true;
  });
  return (
    <CategoriesBreadcrumb>
      {displayCategories.map((item) => (
        <div key={item.id} className="mr-3">
          {item.parent && (
            <span>
              <Link href={item.parent.url} passHref>
                {item.parent.name}
              </Link>
              {' '}
              /
              {' '}
            </span>
          )}
          <Link href={item.url} passHref>
            {item.name}
          </Link>
          {' '}
          /
          {' '}
        </div>
      ))}
    </CategoriesBreadcrumb>
  );
};

function ActionHero(props) {
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
    hideActionIdentifiers,
    primaryOrg,
  } = props;
  const theme = useTheme();
  const { t } = useTranslation();

  // Theme overlay color as fallback
  let categoryColor = theme.imageOverlay;
  // If category or its parent has color defined
  const categoryWithColor = categories.find((cat) => (
    cat.color !== null || (cat.parent !== null && cat.parent.color !== null)
  ));
  // Override overlay color with that
  if (categoryWithColor && theme.imageOverlay !== 'rgb(255, 255, 255)') {
    categoryColor = categoryWithColor.color ? categoryWithColor.color : categoryWithColor?.parent.color;
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
                  <CardContent>
                    { primaryOrg && (
                      <PrimaryOrg>
                        { primaryOrg.logo && (
                        <OrgLogo
                          src={primaryOrg.logo.rendition.src}
                        />
                        )}
                        <strong><ActionListLink query={{ primaryOrg: primaryOrg.id }}>{ primaryOrg.abbreviation || primaryOrg.name }</ActionListLink></strong>
                      </PrimaryOrg>
                    ) }
                    <ActionsNav aria-label="Actions Pager">
                      <ActionListLink>
                        <a href>
                          <IndexLink>{ t('actions') }</IndexLink>
                        </a>
                      </ActionListLink>
                      <div>
                        { previousAction
                              && (
                                <ActionLink action={previousAction}>
                                  <a href>
                                    <Icon name="arrowLeft" color={theme.brandDark} aria-hidden="true" />
                                    {' '}
                                    { t('previous') }
                                  </a>
                                </ActionLink>
                              )}
                        { nextAction
                              && previousAction
                              && (
                                <NavDivider />
                              )}
                        { nextAction
                              && (
                                <ActionLink action={nextAction}>
                                  <a href>
                                    { t('next') }
                                    <Icon name="arrowRight" color={theme.brandDark} aria-hidden="true" />
                                  </a>
                                </ActionLink>
                              )}
                      </div>
                    </ActionsNav>
                    <ActionCategories categories={categories} />
                    <ActionHeadline>
                      { !hideActionIdentifiers && <ActionNumber>{identifier}</ActionNumber> }
                      <span>{name}</span>
                    </ActionHeadline>
                  </CardContent>
                </HeroCardBg>
              </Col>
            </Row>
          </Container>
          { imageCredit
            && (
            <ImageCredit>
              {`${t('image-credit')}: ${imageCredit}`}
            </ImageCredit>
            )}
        </OverlayContainer>
      </ActionBgImage>
    </Hero>
  );
}

export default ActionHero;
