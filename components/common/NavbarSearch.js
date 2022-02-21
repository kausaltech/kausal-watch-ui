import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Input, InputGroup, InputGroupText, Button,
} from 'reactstrap';
import styled from 'styled-components';
import { useTheme } from 'common/theme';
import Icon from './Icon';

function NavbarSearch(props) {
  const theme = useTheme();
  const [userSearch, setUserSearch] = useState('');

  const router = useRouter();

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
    router.push({
      pathname: '/search',
      query: { q: userSearch.q },
    });
  };

  return (
    <form>
      <InputGroup>
        <Input
          type="search"
          id="q"
          name="q"
          placeholder="Search"
          aria-label="Search"
          onChange={handleValueChange}
        />
        <InputGroupText>
          <Button
            color="link"
            type="submit"
            onClick={handleSubmit}
          >
            <Icon
              name="search"
              color={theme.themeColors.black}
            />
          </Button>
        </InputGroupText>
      </InputGroup>
    </form>
  );
}

export default NavbarSearch;
