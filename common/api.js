import axios from 'axios';
import getConfig from 'next/config';
import JsonApi from 'devour-client';
import moment from 'moment';


const { publicRuntimeConfig } = getConfig();

const paramsArraySerializerMiddleware = {
  name: 'params-serializer',
  req: (payload) => {
    const { req } = payload;

    if (req.method === 'GET') {
      const params = { ...req.params };
      let changed = false;

      Object.entries(params).forEach(([key, value]) => {
        if (!Array.isArray(value)) return;
        params[key] = value.join(',');
        changed = true;
      });
      if (changed) req.params = params;
    }
    return payload;
  },
};

function forEachObject(payload, func) {
  const { jsonApi } = payload;
  const resData = payload.res.data;
  const { included } = resData;
  let objects = resData.data;

  if (!Array.isArray(objects)) objects = [objects];

  objects.forEach((object) => {
    func(jsonApi.modelFor(payload.req.model), object);
  });

  if (included) {
    resData.included.forEach((item) => {
      const model = jsonApi.modelFor(item.type);
      func(model, item);
    });
  }
}

const datetimeDeserializerMiddleware = {
  name: 'datetime-deserializer',
  res: (payload) => {
    function deserializeModel(model, object) {
      const { attributes } = object;

      Object.entries(model.attributes).forEach(([key, type]) => {
        const value = attributes[key];

        if (value == null || value == undefined || value === '') return;

        if (type == 'datetime') {
          attributes[key] = moment(value);
        } else if (type == 'date') {
          attributes[key] = moment(value);
        }
      });
    }

    forEachObject(payload, deserializeModel);

    return payload;
  },
};


class ObjectStore {
  constructor() {
    this._objects = {};
  }

  add(object) {
    const { type } = object;
    const store = this._objects[type] || (this._objects[type] = {});

    store[object.id] = object;
  }

  get(type, id) {
    const store = this._objects[type] || {};

    return store[id];
  }

  getAll(type) {
    const store = this._objects[type] || {};

    return Object.values(store);
  }
}

const generateObjectStoreMiddleware = {
  name: 'generate-object-store',
  res: (payload) => {
    const store = new ObjectStore();

    forEachObject(payload, (model, object) => {
      store.add(object);
    });
    payload.store = store;
    return payload;
  },
};

const betterResponseMiddleware = {
  name: 'better-response',
  res: (payload) => {
    const jsonApi = payload.jsonApi;

    const resp = jsonApi._defaultResponseMiddleware.res(payload);
    resp.store = payload.store;
    return resp;
  },
};

const fixCyclicObjectsMiddleware = {
  name: 'fix-cyclic-objects',
  res: (payload) => {
    function detect(path, obj) {
      if (Array.isArray(obj)) {
        obj.forEach((item) => {
          detect(path, item);
        });
        return false;
      }
      if (typeof obj !== 'object') return false;
      if (!obj) return false;
      if (!('id' in obj) || !('type' in obj)) return false;
      const objId = `${obj.type}:${obj.id}`;
      if (path.indexOf(objId) !== -1) {
        return true;
      }
      const newPath = path.concat([objId]);
      Object.keys(obj).forEach((key) => {
        if (detect(newPath, obj[key])) {
          delete obj[key];
        }
      });
      return false;
    }

    detect([], payload.data);
    return payload;
  },
};

class BetterJsonApi extends JsonApi {
  constructor(...args) {
    super(...args);
    this.insertMiddlewareBefore('rails-params-serializer', paramsArraySerializerMiddleware);
    this.insertMiddlewareBefore('response', datetimeDeserializerMiddleware);
    this.insertMiddlewareAfter('datetime-deserializer', generateObjectStoreMiddleware);
    this._defaultResponseMiddleware = this.middleware.filter(mw => mw.name == 'response')[0];
    this.replaceMiddleware('response', betterResponseMiddleware);
    this.insertMiddlewareAfter('better-response', fixCyclicObjectsMiddleware);
  }
}


export const aplans = new BetterJsonApi({
  apiUrl: publicRuntimeConfig.aplansApiBaseURL,
  pluralize: false,
  trailingSlash: true,
});


aplans.getActionList = async function getActionList() {
  const params = {
    include: 'status,categories,categories.parent,categories.parent.parent,responsible_parties',
    'fields[action]': 'identifier,name,categories,responsible_parties,status,completion',
    'fields[category]': 'identifier,name,parent',
    'fields[organization]': 'name,abbreviation,parent',
    'fields[action_status]': 'identifier,name',
  };

  return this.get('action', { params });
};

aplans.get = async function get(path, configIn) {
  let url = `${publicRuntimeConfig.aplansApiBaseURL}/${path}`;
  const config = { ...configIn, method: 'get' };
  const headers = { ...config.headers };

  if (!url.endsWith('/')) url += '/';
  config.url = url;

  headers.Accept = headers.Accept || 'application/vnd.api+json';
  config.headers = headers;

  return axios.request(config);
};


aplans.define('plan', {
  name: '',
  identifier: '',
  image_url: '',
});

aplans.define('action', {
  name: '',
  identifier: '',
  image_url: '',
  official_name: '',
  description: '',
  impact: 0,
  completion: 0,
  updated_at: 'datetime',
  contact_persons: [],
  tasks: {
    jsonApi: 'hasMany',
    type: 'action_task',
  },
  responsible_parties: {
    jsonApi: 'hasMany',
    type: 'organization',
  },
  plan: {
    jsonApi: 'hasOne',
    type: 'plan',
  },
  status: {
    jsonApi: 'hasOne',
    type: 'action_status',
  },
  decision_level: {
    jsonApi: 'hasOne',
    type: 'action_decision_level',
  },
  schedule: {
    jsonApi: 'hasOne',
    type: 'action_schedule',
  },
  categories: {
    jsonApi: 'hasMany',
    type: 'category',
  },
  indicators: {
    jsonApi: 'hasMany',
    type: 'indicator',
  },
});

aplans.define('person', {
  first_name: '',
  last_name: '',
  avatar_url: '',
});
aplans.define('organization', {
  name: '',
  abbreviation: '',
  parent: {
    jsonApi: 'hasOne',
    type: 'organization',
  },
});
aplans.define('action_task', {
  name: '',
  state: '',
  comment: '',
  modified_at: 'datetime',
  created_at: 'datetime',
  due_at: 'date',
  completed_at: 'datetime',
  action: {
    jsonApi: 'hasOne',
    type: 'action',
  },
});
aplans.define('action_status', {
  name: '',
  identifier: '',
  plan: {
    jsonApi: 'hasOne',
    type: 'plan',
  },
});

aplans.define('category', {
  name: '',
  order: 0,
  identifier: '',
  image_url: '',
  // relationships
  type: {
    jsonApi: 'hasOne',
    type: 'category_type',
  },
  parent: {
    jsonApi: 'hasOne',
    type: 'category',
  },
});

aplans.define('indicator', {
  name: '',
  unit_name: '',
  description: '',
  time_resolution: '',
  level: '',
  updated_at: 'datetime',
  plan: {
    jsonApi: 'hasOne',
    type: 'plan',
  },
  unit: {
    jsonApi: 'hasOne',
    type: 'unit',
  },
  categories: {
    jsonApi: 'hasMany',
    type: 'category',
  },
  related_effects: {
    jsonApi: 'hasMany',
    type: 'indicator',
  },
  related_causes: {
    jsonApi: 'hasMany',
    type: 'indicator',
  },
  latest_graph: {
    jsonApi: 'hasOne',
    type: 'indicator_graph',
  },
  actions: {
    jsonApi: 'hasMany',
    type: 'action',
  },
  estimates: {
    jsonApi: 'hasMany',
    type: 'indicator_estimate',
  },
});

aplans.define('indicator_graph', {
  data: '',
  created_at: 'datetime',
  indicator: {
    jsonApi: 'hasOne',
    type: 'indicator',
  },
});

aplans.define('related_indicator', {
  effect_type: '',
  confidence_level: '',
  causal_indicator: {
    jsonApi: 'hasOne',
    type: 'indicator',
  },
  effect_indicator: {
    jsonApi: 'hasOne',
    type: 'indicator',
  },
});

aplans.define('unit', {
  name: '',
});

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
};
