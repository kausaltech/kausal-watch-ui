import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const aplans = {
  get: async (path, { params }) => {
    let url = `${publicRuntimeConfig.aplansApiBaseURL}/${path}`;

    if (!url.endsWith('/')) url += '/';
    if (params) {
      const queryParams = new URLSearchParams(params);
      url += '?' + queryParams.toString();
    }
    const headers = {
      Accept: 'application/json',
    };
    const resp = await fetch(url, { headers });
    const data = resp.json();
    return data;
  },
}
