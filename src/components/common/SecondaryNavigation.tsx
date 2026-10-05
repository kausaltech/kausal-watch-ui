import styled from '@emotion/styled';

import { transientOptions } from '@common/themes/styles/styled';

import { type StaticPage } from '@/app/root/[domain]/[lang]/[plan]/(with-layout-elements)/[...slug]/ContentPage';
import { useContainImages } from '@/common/hooks/use-contain-images';
import { Link } from '@/common/links';
import { Col, Container, Row } from '@/components/common/layout/LayoutGrid';

const NavigationContainer = styled(Container, transientOptions)<{ $pageHasContent: boolean }>`
  ${(props) => props.theme.breakpoints.up('lg')} {
    // When there is no body content, render the navigation as
    // relative to ensure it's not clipped by the footer
    position: ${(props) => (props.$pageHasContent ? 'absolute' : 'relative')};
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    pointer-events: none;
  }
`;

/* Beside the content, line the card up with where unpadded rich text starts:
 * flush below the contained header, or a block gap below a coloured header */
const NavigationCard = styled('div', transientOptions)<{ $alignWithContent: boolean }>`
  padding: ${(props) => props.theme.spaces.s100};
  margin: ${(props) => props.theme.spaces.s200} 0;
  background-color: ${(props) => props.theme.cardBackground.secondary};
  pointer-events: all;

  ${(props) => props.theme.breakpoints.up('lg')} {
    margin-top: ${(props) => (props.$alignWithContent ? '0' : 'var(--block-gap)')};
  }

  h3 {
    font-size: ${(props) => props.theme.fontSizeMd};
    margin-bottom: ${(props) => props.theme.spaces.s100};
  }
`;

const Nav = styled.ul`
  list-style: none;
  padding: 0;
`;

const NavItem = styled.li<{ $isActive: boolean }>`
  margin-bottom: 0.5rem;
  padding: 0;
  padding-left: ${(props) => (props.$isActive ? props.theme.spaces.s050 : 0)};
  border-left: ${(props) => (props.$isActive ? `3px solid ${props.theme.brandDark}` : 'none')};
  font-weight: ${(props) => (props.$isActive ? 'bold' : 'normal')};
  a {
    color: ${(props) => props.theme.themeColors.black};

    &:hover {
      color: ${(props) =>
        props.$isActive ? props.theme.linkColor : props.theme.themeColors.black};
      text-decoration: none;
      border-bottom: 2px solid ${(props) => props.theme.themeColors.black};
    }
  }
`;

type StaticPageParentsChildren = NonNullable<StaticPage['parent']>['children'];
interface SecondaryNavigationProps {
  links: StaticPageParentsChildren;
  activeLink?: string | null;
  title?: string;
  pageHasContent?: boolean;
}

const SecondaryNavigation = (props: SecondaryNavigationProps) => {
  const { links, activeLink, title, pageHasContent = true } = props;
  const containImages = useContainImages();

  return (
    <NavigationContainer $pageHasContent={pageHasContent}>
      <Row>
        <Col md={containImages ? 12 : { size: 10, offset: 1 }} lg={{ size: 4, offset: 0 }} xl={3}>
          <NavigationCard $alignWithContent={containImages}>
            {title && <h3>{title}</h3>}
            <Nav>
              {links.map((link) => (
                <NavItem key={link.id} $isActive={link.id === activeLink}>
                  {link.id === activeLink ? (
                    <span>{link.title}</span>
                  ) : (
                    <Link href={link.urlPath}>{link.title}</Link>
                  )}
                </NavItem>
              ))}
            </Nav>
          </NavigationCard>
        </Col>
      </Row>
    </NavigationContainer>
  );
};

export default SecondaryNavigation;
