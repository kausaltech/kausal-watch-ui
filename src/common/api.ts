import { apiUrl } from './environment';

export const aplans = {
  get: async <T = unknown>(
    path: string,
    { params }: { params: Record<string, string> }
  ): Promise<T> => {
    const locale = params.language;
    let url = `${apiUrl}/${path}`;

    if (!url.endsWith('/')) url += '/';
    if (params) {
      const queryParams = new URLSearchParams(params);
      url += '?' + queryParams.toString();
    }
    const headers = {
      Accept: 'application/json',
      'Accept-Language': locale,
    };
    const resp = await fetch(url, { headers });
    return (await resp.json()) as T;
  },
};
