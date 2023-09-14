(() => {
  /* IMPORTANT: remember to manually run the typescript compilation
  with "yarn build-embed-script" when you want to release any changes
  to this script -- or use yarn watch-embed-script to automatically
  compile upon changes while developing.  */

  const KAUSAL_PRODUCT = 'Watch';
  const KAUSAL_EMBED_NAME = `Kausal ${KAUSAL_PRODUCT} Embed`;

  const warn = (message: string) => {
    console.warn(
      KAUSAL_EMBED_NAME,
      `${KAUSAL_EMBED_MAJOR_SCRIPT_VERSION}:`,
      message
    );
  };
  /* In script version a the contract is that all data attributes get
   forwarded as query parameters to the view except for the type data
   attribute which gets used as the url subpath and the version data
   attribute which gets used as part of the version path segment.

    Major version only needs to be updated if this contract changes.
    It must match the filename embed-{MAJOR_SCRIPT_VERSION}.ts
   */
  const KAUSAL_EMBED_MAJOR_SCRIPT_VERSION = 'a';

  /* These parameters are set from data attributes and are handled by
  this script as path elements */
  interface EmbedSpecification {
    type: string;
    /* The major API version supported by the embedded view, and is
    part of the view url. The API consists of the subpath and query
    parameters supported by the view.
     */
    version: string;
    /* This is used to differentiate between multiple embeds
       on the same page.  */
    identifier: string;
  }

  /* These parameters are set from data attributes and are handled by
  this script as query parameters. They are intentionally left
  unvalidated */
  interface EmbedParameters {
    [key: string]: string;
  }

  // This is needed to find out the embed view base path relative to
  // the source url of this script
  const STATIC_PATH_NAME = 'static';
  const KAUSAL_EMBED_VIEW_PATH = 'embed';

  const SCRIPT_NAME = `embed-${KAUSAL_EMBED_MAJOR_SCRIPT_VERSION}.js`;
  const ALLOWED_PATH_ELEMENT_REGEX = /^[/a-zA-Z0-9-_]+$/;
  const ALLOWED_VERSION_REGEX = /^[a-zA-Z0-9-_]+$/;
  const INITIAL_HEIGHT = '400px';

  const createIFrame = (url: string): HTMLIFrameElement => {
    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = INITIAL_HEIGHT;
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.src = url;
    return iframe;
  };

  const addMessageListenerToWindow = (
    iframe: HTMLIFrameElement,
    embId: string
  ) => {
    window.addEventListener('message', (event) => {
      if (event.data?.source == embId && event.data?.height != null) {
        iframe.height = event.data.height + 1;
      }
    });
  };

  const getEmbedUrl = (
    el: HTMLScriptElement,
    specs: EmbedSpecification,
    params: EmbedParameters
  ): URL => {
    const scriptUrl: URL = new URL(el.src);
    const pathElements = scriptUrl.pathname.split('/');
    const staticPathIndex = pathElements.indexOf(STATIC_PATH_NAME);
    if (
      staticPathIndex === -1 ||
      pathElements.length < 2 ||
      staticPathIndex + 2 !== pathElements.length ||
      pathElements[pathElements.length - 1] !== SCRIPT_NAME
    ) {
      throw new Error(
        `This script expects to be served from a ${STATIC_PATH_NAME}/${SCRIPT_NAME} path.`
      );
    }
    const url = new URL(scriptUrl.origin);
    url.pathname = pathElements
      .slice(0, staticPathIndex)
      .concat([KAUSAL_EMBED_VIEW_PATH, `${specs.version}`, specs.type])
      .join('/');
    Object.entries(params).forEach(([k, v]) => {
      url.searchParams.append(k, v);
    });
    url.searchParams.set('embId', specs.identifier);
    return url;
  };

  const validateSpecification = (
    specs: {
      type: string | undefined;
      version: string | undefined;
      identifier: string;
    },
    dataset: DOMStringMap
  ): EmbedSpecification => {
    const { type, version } = specs;
    if (type === undefined) {
      throw new Error(`Invalid embed type ${dataset.type}`);
    }
    if (!type.match(ALLOWED_PATH_ELEMENT_REGEX)) {
      throw new Error(`Unallowed embed type ${type}`);
    }
    if (version === undefined) {
      throw new Error(`Version ${dataset.version} is invalid.`);
    }
    if (!version.match(ALLOWED_VERSION_REGEX)) {
      throw new Error(`Unallowed embed version ${version}`);
    }
    return { type, version, identifier: specs.identifier };
  };

  const getUniqueDOMPosition = (el: HTMLScriptElement) => {
    /* Since there can be many embeds on a single page, a single embed
    must react only to height messages from it's own embedded view, not
    the others.
     */
    const elements = document.getElementsByClassName(el.className);
    for (let i = 0; i < elements.length; i++) {
      if (elements[i] === el) {
        return `${el.className}-${i.toString()}`;
      }
    }
    return el.className;
  };

  const getEmbedSpecification = (
    el: HTMLScriptElement
  ): [EmbedSpecification, EmbedParameters] => {
    const type = el.dataset.type;
    const version = el.dataset.version;
    const identifier = getUniqueDOMPosition(el);
    const specs = {
      type,
      version,
      identifier,
    };
    const validSpecs = validateSpecification(specs, el.dataset);
    return [validSpecs, getEmbedParameters(validSpecs, el.dataset)];
  };

  const getEmbedParameters = (
    specs: EmbedSpecification,
    dataset: DOMStringMap
  ) => {
    const params: EmbedParameters = {};
    for (const key in dataset) {
      if (Object.keys(specs).includes(key)) continue;
      const val = dataset[key];
      if (val !== undefined) {
        params[key] = val;
      }
    }
    return params;
  };

  try {
    const scriptElement = document.currentScript as HTMLScriptElement;
    const [specs, parameters] = getEmbedSpecification(scriptElement);
    const embedUrl = getEmbedUrl(scriptElement, specs, parameters);
    const iframe = createIFrame(embedUrl.href);
    addMessageListenerToWindow(iframe, specs.identifier);
    scriptElement.after(iframe);
  } catch (exception: any) {
    warn(exception.toString());
  }
})();
