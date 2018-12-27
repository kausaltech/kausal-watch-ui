import axios from 'axios';
import getConfig from 'next/config';


const {publicRuntimeConfig} = getConfig()


class AplansAPI {
  getActionList() {
    const params = {
      "include": "status,categories,categories.parent,categories.parent.parent,responsible_parties",
      "fields[action]": "identifier,name,categories,responsible_parties,status,completion",
      "fields[category]": "identifier,name,parent",
      "fields[organization]": "name,abbreviation,parent",
      "fields[action_status]": "identifier,name",
    }

    return this.get('action', {params})
  }
  get(path, configIn) {
    let url = `${publicRuntimeConfig.aplansApiBaseURL}/${path}`
    let config = {...configIn, method: 'get'}
    let headers = {...headers}

    if (!url.endsWith('/'))
      url += '/'
    config.url = url

    headers['Accept'] = headers['Accept'] || 'application/vnd.api+json'
    config.headers = headers

    if (this.cachios) {
      const resp = this.cachios.request(config)
      if (config.requireCache) {
        let isDone = false;

        resp.catch(() => {}).then(() => { isDone = true });
        if (!isDone)
          return Promise.resolve();
      }
      return resp
    } else {
      return axios.request(config)
    }
  }
  async enableCache() {
    if (this.cachios)
      return
    this.cachios = await import('cachios')
  }
  async disableCache() {
    this.cachios = null
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
