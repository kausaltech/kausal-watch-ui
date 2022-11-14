import styled from 'styled-components';
import { Link } from 'common/links';

const NavigationContainer = styled.div`
  padding: ${(props) => props.theme.spaces.s100};
  background-color: #f2f2f2;
`;

const Nav = styled.ul`
  list-style: none;
  padding: 0;
`;

const NavItem = styled.li<{ isActive: boolean }>`
  margin-bottom: 0.5rem;
  padding: 0;
  
  a {
    font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};
  }
`;

export interface SecondaryNavigationLink {
  id: string,
  title: string,
  urlPath: string,
}

interface SecondaryNavigationProps {
  links: SecondaryNavigationLink[],
  activeLink: string,
  title?: string,
}

const SecondaryNavigation = (props: SecondaryNavigationProps) => {
  const { links, activeLink, title } = props;

  return (
    <NavigationContainer>
      { title && <h3>{ title }</h3> }
      <Nav>
        {links.map((link) => (
          <NavItem key={link.id} isActive={ link.id === activeLink}>
            <Link href={link.urlPath}>
              {link.title}
            </Link>
          </NavItem>
        ))}
      </Nav>
    </NavigationContainer>
  );
};

export default SecondaryNavigation;
