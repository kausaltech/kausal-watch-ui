import getConfig from 'next/config';
import { getI18n } from 'common/i18n';

const { publicRuntimeConfig } = getConfig();
const i18n = getI18n();

export const aplans = {
  get: async (path, { params }) => {
    const locale = i18n ? i18n.language : publicRuntimeConfig.locale;
    let url = `${publicRuntimeConfig.aplansApiBaseURL}/${path}`;

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
