import { useEffect, useRef } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import debounce from 'lodash/debounce';
import omitBy from 'lodash/omitBy';

import type { Filters } from '@/components/actions/ActionListFilters';

function isEmptyOrArray(val: unknown): val is string | Array<unknown> | null {
  return val == null || val === '' || val instanceof Array;
}

export function useUpdateSearchParams() {
  const router = useRouter();
  const pathname = usePathname();

  function updateSearchParams(filters: Filters) {
    const nonEmptyFilters = omitBy(filters, isEmptyOrArray) as Record<string, string>;
    const searchParams = new URLSearchParams(nonEmptyFilters);

    /**
     * Append arrays to search params separately, as our approach is to add multiple
     * keys for each key value in an array, e.g. { foo: [1,2] } becomes '?foo=1&foo=2'
     */
    Object.entries(filters).forEach(([filterKey, filterValue]) => {
      if (filterValue instanceof Array) {
        filterValue.map((singleFilterValue) => {
          searchParams.append(filterKey, singleFilterValue);
        });
      }
    });

    const query = searchParams.toString() ? `?${searchParams.toString()}` : '';

    router.replace(`${pathname}${query}`, { scroll: false });
  }

  const debouncedUpdate = debounce(updateSearchParams, 300);
  const debouncedUpdateSearchParams = useRef(debouncedUpdate).current;

  useEffect(() => {
    return () => {
      debouncedUpdateSearchParams.cancel();
    };
  }, [debouncedUpdateSearchParams]);

  return debouncedUpdateSearchParams;
}
