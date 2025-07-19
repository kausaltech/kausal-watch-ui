import { apiUrl } from './environment';

export const aplans = {
  get: async (path: string, { params }) => {
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
    const data = resp.json();
    return data;
  },
};
