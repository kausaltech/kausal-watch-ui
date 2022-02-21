import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { InputGroup } from 'reactstrap';
import styled from 'styled-components';
import { useTheme } from 'common/theme';
import Button from './Button';
import Icon from './Icon';

const TextInput = styled.input`
  width: ${(props) => (props.isopen === 'true' ? 'auto' : '0')};
  height: calc(${(props) => props.theme.inputLineHeight}em + ${(props) => props.theme.inputPaddingY} + ${(props) => props.theme.inputPaddingY});
  padding: ${(props) => (props.isopen === 'true' ? `${props.theme.inputPaddingY} ${props.theme.inputPaddingY}` : '0')};
  color: ${(props) => props.theme.brandNavColor};
  background-color: ${(props) => props.theme.brandNavBackground};
  border-radius: ${(props) => props.theme.inputBorderRadius};
  border-width:${(props) => (props.isopen === 'true' ? props.theme.inputBorderWidth : '0')};
  border-color: ${(props) => props.theme.themeColors.dark};
  transition: all 0.4s ease-in-out;
  &:focus {
    padding: ${(props) => props.theme.inputPaddingY} ${(props) => props.theme.inputPaddingX};
    border-width: ${(props) => props.theme.inputBorderWidth};
  }

`;

function NavbarSearch(props) {
  const theme = useTheme(null);
  const searchInput = useRef();
  const [userSearch, setUserSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const router = useRouter();

  const handleFocus = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setSearchOpen(false);
    }
  };

  const handleValueChange = (event) => {
    const { target } = event;
    const { value } = target;
    const { name } = target;
    setUserSearch({
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!searchOpen) {
      searchInput.current.focus();
      setSearchOpen(true);
    } else if (searchInput.current.value) {
      router.push({
        pathname: '/search',
        query: { q: userSearch.q },
      });
      setSearchOpen(false);
    } else setSearchOpen(false);
  };

  return (
    <form>
      <InputGroup onBlur={handleFocus}>
        <TextInput
          type="search"
          id="q"
          name="q"
          placeholder="Search"
          aria-label="Search"
          onChange={handleValueChange}
          ref={searchInput}
          isopen={searchOpen.toString()}
        />
        <Button
          color={!searchOpen ? 'link' : 'primary'}
          type="submit"
          onClick={handleSubmit}
        >
          <Icon
            name="search"
            color={theme.themeColors.white}
          />
        </Button>
      </InputGroup>
    </form>
  );
}

export default NavbarSearch;
