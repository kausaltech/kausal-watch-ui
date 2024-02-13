import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export function useCookie<T extends string>(
  name: string,
  initialValue: T | null = null
): [T | null, (newValue: T | null) => void] {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (initialValue && Cookies.get(name) !== initialValue) {
      Cookies.set(name, initialValue);
    }
  }, [name, initialValue]);

  function handleChangeCookie(newValue: T | null) {
    setValue(newValue);

    if (newValue) {
      Cookies.set(name, newValue);
    } else {
      Cookies.remove(name);
    }
  }

  return [value, handleChangeCookie];
}
