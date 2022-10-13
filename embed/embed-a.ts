(() => {
  const KAUSAL_PRODUCT = 'Watch';
  const KAUSAL_EMBED_NAME = `Kausal ${KAUSAL_PRODUCT} Embed`;
  const KAUSAL_EMBED_API_VERSION = 1;
  const KAUSAL_EMBED_REQUIRED_API_VERSION = 1;
  const KAUSAL_EMBED_MAJOR_SCRIPT_VERSION = 'a';
  const KAUSAL_EMBED_VIEW_PATH = 'embed';
  const KAUSAL_EMBED_VIEW_VERSION = 'v1';
  const STATIC_PATH_NAME = 'static';
  const SCRIPT_NAME_REGEX = /^embed-[a-z0-9]+.js$/;
  const DEFAULT_HEIGHT = '400px';
  const VALID_TYPE_REGEX = /^([a-z]+-)*[a-z]+$/;
  const IFRAME_LOAD_TIMEOUT = 30;

  interface EmbedSpecification {
    // Since 0.1
    type: string;
    version: number;
  };

  const createIFrame = (url: string): HTMLIFrameElement => {
    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = DEFAULT_HEIGHT;
    iframe.style.border = 'none';
    iframe.src = url;
    return iframe;
  }

  const addMessageListenerToWindow = (iframe: HTMLIFrameElement) => {
    window.addEventListener('message', (event) => {
      if (event.data?.source == 'kausal-watch-embed' &&
        event.data?.height != null) {
          iframe.height = event.data.height;
      }
    });
  }

  const getEmbedUrl = (el: HTMLScriptElement, type: string): URL => {
    const scriptUrl: URL = new URL(el.src);
    const pathElements = scriptUrl.pathname.split('/');
    const staticPathIndex = pathElements.indexOf(STATIC_PATH_NAME);
    if (pathElements.length < 2 ||
        staticPathIndex + 2 !== pathElements.length ||
        pathElements[pathElements.length - 1].match(SCRIPT_NAME_REGEX) == null
    ) {
        throw new Error(`This script expects to be served from a ${STATIC_PATH_NAME}/${SCRIPT_NAME_REGEX} path.`);
    }
    const url = new URL(
      (pathElements.slice(0, staticPathIndex).concat([
        KAUSAL_EMBED_VIEW_PATH,
        KAUSAL_EMBED_VIEW_VERSION,
        type
      ])).join('/'),
      scriptUrl.origin
    );
    return url;
  }

  const validateSpecification = ({type, version}: EmbedSpecification, dataset: DOMStringMap): void => {
    if (type == null || type.match(VALID_TYPE_REGEX) == null) {
      throw new Error(`Invalid embed type ${dataset.type}`);
    }
    if (isNaN(version)) {
      throw new Error(`Version ${dataset.version} is invalid.`);
    }
    if (version < KAUSAL_EMBED_REQUIRED_API_VERSION) {
      throw new Error(`Version ${version} is below the required ${KAUSAL_EMBED_REQUIRED_API_VERSION}`);
    }
    if (version > KAUSAL_EMBED_API_VERSION) {
      warn(`Version ${version} is too high (current version is ${KAUSAL_EMBED_API_VERSION})`);
    }
  }

  const warn = (message: string) => {
    console.warn(KAUSAL_EMBED_NAME, `${KAUSAL_EMBED_MAJOR_SCRIPT_VERSION}.${KAUSAL_EMBED_API_VERSION}:`, message);
  }

  const getEmbedSpecification = (el: HTMLScriptElement): EmbedSpecification => {
    const type = el.dataset.type ?? '';
    const version = Number.parseInt(el.dataset.version ?? '-1', 10);
    const specs = {
      type,
      version,
    };
    validateSpecification(specs, el.dataset);
    return specs;
  }

  try {
    const scriptElement = document.currentScript as HTMLScriptElement;
    const embedSpecification = getEmbedSpecification(scriptElement);
    const embedUrl = getEmbedUrl(scriptElement, embedSpecification.type);
    const iframe = createIFrame(embedUrl.href);
    addMessageListenerToWindow(iframe);
    scriptElement.after(iframe);
  } catch (exception: any) {
    warn(exception.toString());
  }
})();
