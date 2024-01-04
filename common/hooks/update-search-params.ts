import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import omitBy from 'lodash/omitBy';
import debounce from 'lodash/debounce';
import { Filters } from '@/components/actions/ActionListFilters';

const isEmptyOrArray = (val) =>
  val == null || val === '' || val instanceof Array;

export function useUpdateSearchParams() {
  const router = useRouter();
  const pathname = usePathname();

  function updateSearchParams(filters: Filters) {
    const searchParams = new URLSearchParams(omitBy(filters, isEmptyOrArray));

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

  const debouncedUpdateSearchParams = useRef(
    debounce(updateSearchParams, 300)
  ).current;

  useEffect(() => {
    return () => {
      debouncedUpdateSearchParams.cancel();
    };
  }, [debouncedUpdateSearchParams]);

  return debouncedUpdateSearchParams;
}
