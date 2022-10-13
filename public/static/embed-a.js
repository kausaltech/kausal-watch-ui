"use strict";
(function () {
    var KAUSAL_PRODUCT = 'Watch';
    var KAUSAL_EMBED_NAME = "Kausal ".concat(KAUSAL_PRODUCT, " Embed");
    var KAUSAL_EMBED_API_VERSION = 1;
    var KAUSAL_EMBED_REQUIRED_API_VERSION = 1;
    var KAUSAL_EMBED_MAJOR_SCRIPT_VERSION = 'a';
    var KAUSAL_EMBED_VIEW_PATH = 'embed';
    var KAUSAL_EMBED_VIEW_VERSION = 'v1';
    var STATIC_PATH_NAME = 'static';
    var SCRIPT_NAME_REGEX = /^embed-[a-z0-9]+.js$/;
    var DEFAULT_HEIGHT = '400px';
    var VALID_TYPE_REGEX = /^([a-z]+-)*[a-z]+$/;
    var IFRAME_LOAD_TIMEOUT = 30;
    ;
    var createIFrame = function (url) {
        var iframe = document.createElement('iframe');
        iframe.width = '100%';
        iframe.height = DEFAULT_HEIGHT;
        iframe.style.border = 'none';
        iframe.src = url;
        return iframe;
    };
    var addMessageListenerToWindow = function (iframe) {
        window.addEventListener('message', function (event) {
            var _a, _b;
            if (((_a = event.data) === null || _a === void 0 ? void 0 : _a.source) == 'kausal-watch-embed' &&
                ((_b = event.data) === null || _b === void 0 ? void 0 : _b.height) != null) {
                iframe.height = event.data.height;
            }
        });
    };
    var getEmbedUrl = function (el, type) {
        var scriptUrl = new URL(el.src);
        var pathElements = scriptUrl.pathname.split('/');
        var staticPathIndex = pathElements.indexOf(STATIC_PATH_NAME);
        if (pathElements.length < 2 ||
            staticPathIndex + 2 !== pathElements.length ||
            pathElements[pathElements.length - 1].match(SCRIPT_NAME_REGEX) == null) {
            throw new Error("This script expects to be served from a ".concat(STATIC_PATH_NAME, "/").concat(SCRIPT_NAME_REGEX, " path."));
        }
        var url = new URL((pathElements.slice(0, staticPathIndex).concat([
            KAUSAL_EMBED_VIEW_PATH,
            KAUSAL_EMBED_VIEW_VERSION,
            type
        ])).join('/'), scriptUrl.origin);
        return url;
    };
    var validateSpecification = function (_a, dataset) {
        var type = _a.type, version = _a.version;
        if (type == null || type.match(VALID_TYPE_REGEX) == null) {
            throw new Error("Invalid embed type ".concat(dataset.type));
        }
        if (isNaN(version)) {
            throw new Error("Version ".concat(dataset.version, " is invalid."));
        }
        if (version < KAUSAL_EMBED_REQUIRED_API_VERSION) {
            throw new Error("Version ".concat(version, " is below the required ").concat(KAUSAL_EMBED_REQUIRED_API_VERSION));
        }
        if (version > KAUSAL_EMBED_API_VERSION) {
            warn("Version ".concat(version, " is too high (current version is ").concat(KAUSAL_EMBED_API_VERSION, ")"));
        }
    };
    var warn = function (message) {
        console.warn(KAUSAL_EMBED_NAME, "".concat(KAUSAL_EMBED_MAJOR_SCRIPT_VERSION, ".").concat(KAUSAL_EMBED_API_VERSION, ":"), message);
    };
    var getEmbedSpecification = function (el) {
        var _a, _b;
        var type = (_a = el.dataset.type) !== null && _a !== void 0 ? _a : '';
        var version = Number.parseInt((_b = el.dataset.version) !== null && _b !== void 0 ? _b : '-1', 10);
        var specs = {
            type: type,
            version: version,
        };
        validateSpecification(specs, el.dataset);
        return specs;
    };
    try {
        var scriptElement = document.currentScript;
        var embedSpecification = getEmbedSpecification(scriptElement);
        var embedUrl = getEmbedUrl(scriptElement, embedSpecification.type);
        var iframe = createIFrame(embedUrl.href);
        addMessageListenerToWindow(iframe);
        scriptElement.after(iframe);
    }
    catch (exception) {
        warn(exception.toString());
    }
})();
