import { ApolloLink } from '@apollo/client';
import { type DirectiveNode, Kind } from 'graphql';

function createDirective(name: string, args: { name: string; val: string }[]) {
  const out: DirectiveNode = {
    kind: Kind.DIRECTIVE,
    name: {
      kind: Kind.NAME,
      value: name,
    },
    arguments: args.map((arg) => ({
      kind: Kind.ARGUMENT,
      name: { kind: Kind.NAME, value: arg.name },
      value: {
        kind: Kind.STRING,
        value: arg.val,
        block: false,
      },
    })),
  };
  return out;
}

export function getHttpHeaders(opts: ApolloClientOpts) {
  const {
    instanceHostname,
    instanceIdentifier,
    authorizationToken,
    currentURL,
    clientIp,
    clientCookies,
  } = opts;
  const headers = {};

  if (instanceIdentifier) {
    headers['x-paths-instance-identifier'] = opts.instanceIdentifier;
  }
  if (instanceHostname) {
    // headers[INSTANCE_HOSTNAME_HEADER] = instanceHostname;
  }
  if (authorizationToken) {
    headers['authorization'] = `Bearer ${authorizationToken}`;
  }
  if (currentURL) {
    const { baseURL, path } = currentURL;
    headers['referer'] = baseURL + path;
  }
  if (!process.browser) {
    if (clientIp) {
      headers['x-forwarded-for'] = clientIp;
    }
    if (clientCookies) {
      headers['cookie'] = clientCookies;
    }
  }
  return headers;
}

export type ApolloClientOpts = {
  instanceHostname?: string;
  instanceIdentifier?: string;
  wildcardDomains?: string[];
  authorizationToken?: string | undefined;
  clientIp?: string | null;
  locale?: string;
  currentURL?: {
    baseURL: string;
    path: string;
  };
  clientCookies?: string;
};

export const makeInstanceMiddleware = (opts: ApolloClientOpts) => {
  /**
   * Middleware that sets HTTP headers for identifying the Paths instance.
   *
   * If identifier is set directly, use that, or fall back to request hostname.
   */
  const { instanceHostname, instanceIdentifier } = opts;
  if (!instanceHostname && !instanceIdentifier) {
    throw new Error('Neither hostname or identifier set for the instance');
  }

  const middleware = new ApolloLink((operation, forward) => {
    const context = operation.getContext();
    const locale = context?.locale;
    operation.query = {
      ...operation.query,
      definitions: operation.query.definitions.map((def) => {
        if (def.kind !== Kind.OPERATION_DEFINITION) return def;
        const directives: DirectiveNode[] = [...(def.directives || [])];
        if (locale) {
          directives.push(createDirective('locale', [{ name: 'lang', val: locale }]));
        }
        const instanceArgs: { name: string; val: string }[] = [];
        if (instanceIdentifier) {
          instanceArgs.push({ name: 'identifier', val: instanceIdentifier });
        }
        if (instanceHostname) {
          instanceArgs.push({ name: 'hostname', val: instanceHostname });
        }
        if (instanceArgs.length) {
          directives.push(createDirective('instance', instanceArgs));
        }
        return {
          ...def,
          directives,
        };
      }),
    };

    operation.setContext(({ headers = {} }) => {
      return {
        headers: {
          ...headers,
          ...getHttpHeaders(opts),
        },
      };
    });

    return forward(operation);
  });

  return middleware;
};
