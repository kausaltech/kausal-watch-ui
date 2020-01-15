import axios from 'axios';
import getConfig from 'next/config';

export const { CancelToken } = axios;
const { publicRuntimeConfig } = getConfig();

export const aplans = {};

aplans.get = async function get(path, configIn) {
  let url = `${publicRuntimeConfig.aplansApiBaseURL}/${path}`;
  const config = { ...configIn, method: 'get' };
  const headers = { ...config.headers };

  if (!url.endsWith('/')) url += '/';
  config.url = url;

  headers.Accept = headers.Accept || 'application/json';
  config.headers = headers;

  return axios.request(config);
};


class KerrokantasiAPI {
  get(path, configIn) {
    let apiUrl = `${publicRuntimeConfig.kerrokantasiApiBaseURL}/${path}`;

    if (!apiUrl.endsWith('/')) apiUrl += '/';

    return axios.get(apiUrl, configIn);
  }
}

export const kerrokantasi = new KerrokantasiAPI();

export default {
  aplans,
  kerrokantasi,
  CancelToken,
};
