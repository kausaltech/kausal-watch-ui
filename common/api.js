import axios from 'axios';
import getConfig from 'next/config';


const {publicRuntimeConfig} = getConfig()


class AplansAPI {
  get(path, configIn) {
    let apiUrl = `${publicRuntimeConfig.aplansApiBaseURL}/${path}`
    let config = {...configIn}
    let headers = {...headers}

    if (!apiUrl.endsWith('/'))
      apiUrl += '/'

    headers['Accept'] = headers['Accept'] || 'application/vnd.api+json'
    config.headers = headers

    return axios.get(apiUrl, config)
  }
}

class KerrokantasiAPI {
  get(path, configIn) {
    let apiUrl = `${publicRuntimeConfig.kerrokantasiApiBaseURL}/${path}`

    if (!apiUrl.endsWith('/'))
      apiUrl += '/'

    return axios.get(apiUrl, configIn)
  }
}

export const aplans = new AplansAPI()
export const kerrokantasi = new KerrokantasiAPI()

export default {
  aplans,
  kerrokantasi
}
