import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { Link } from '@/common/links';
import Icon from '@/components/common/Icon';

const NavigationContainer = styled(Container)`
  @media (min-width: ${(props) => props.theme.breakpointLg}) {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    pointer-events: none;
  }
`;

const NavigationCard = styled.div`
  padding: ${(props) => props.theme.spaces.s100};
  margin: ${(props) => props.theme.spaces.s200} 0;
  background-color: #f2f2f2;
  pointer-events: all;

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

  a {
    color: ${(props) =>
      props.$isActive ? props.theme.linkColor : props.theme.themeColors.black};
    border-bottom: 3px solid
      ${(props) => (props.$isActive ? props.theme.brandDark : 'transparent')};
    font-weight: ${(props) => (props.$isActive ? 'bold' : 'normal')};

    &:hover {
      color: ${(props) =>
        props.$isActive
          ? props.theme.linkColor
          : props.theme.themeColors.black};
      text-decoration: none;
      border-bottom: 3px solid ${(props) => props.theme.brandDark};
    }
  }
`;

export interface SecondaryNavigationLink {
  id: string;
  title: string;
  urlPath: string;
}

interface SecondaryNavigationProps {
  links: SecondaryNavigationLink[];
  activeLink: string;
  title?: string;
}

const SecondaryNavigation = (props: SecondaryNavigationProps) => {
  const { links, activeLink, title } = props;

  return (
    <NavigationContainer>
      <Row>
        <Col md={{ size: 10, offset: 1 }} lg={{ size: 4, offset: 0 }} xl={3}>
          <NavigationCard>
            {title && <h3>{title}</h3>}
            <Nav>
              {links.map((link) => (
                <NavItem key={link.id} $isActive={link.id === activeLink}>
                  <Link href={link.urlPath}>{link.title}</Link>
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
