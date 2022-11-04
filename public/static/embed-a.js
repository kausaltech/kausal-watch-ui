"use strict";
(function () {
    var KAUSAL_PRODUCT = 'Watch';
    var KAUSAL_EMBED_NAME = "Kausal ".concat(KAUSAL_PRODUCT, " Embed");
    var warn = function (message) {
        console.warn(KAUSAL_EMBED_NAME, "".concat(KAUSAL_EMBED_MAJOR_SCRIPT_VERSION, ":"), message);
    };
    var KAUSAL_EMBED_MAJOR_SCRIPT_VERSION = 'a';
    ;
    ;
    var STATIC_PATH_NAME = 'static';
    var KAUSAL_EMBED_VIEW_PATH = 'embed';
    var SCRIPT_NAME = "embed-".concat(KAUSAL_EMBED_MAJOR_SCRIPT_VERSION, ".js");
    var ALLOWED_PATH_ELEMENT_REGEX = /^[/a-zA-Z0-9-_]+$/;
    var ALLOWED_VERSION_REGEX = /^[a-zA-Z0-9-_]+$/;
    var INITIAL_HEIGHT = '400px';
    var createIFrame = function (url) {
        var iframe = document.createElement('iframe');
        iframe.width = '100%';
        iframe.height = INITIAL_HEIGHT;
        iframe.style.border = 'none';
        iframe.src = url;
        return iframe;
    };
    var addMessageListenerToWindow = function (iframe, embId) {
        window.addEventListener('message', function (event) {
            var _a, _b;
            if (((_a = event.data) === null || _a === void 0 ? void 0 : _a.source) == embId &&
                ((_b = event.data) === null || _b === void 0 ? void 0 : _b.height) != null) {
                iframe.height = event.data.height + 1;
            }
        });
    };
    var getEmbedUrl = function (el, specs, params) {
        var scriptUrl = new URL(el.src);
        var pathElements = scriptUrl.pathname.split('/');
        var staticPathIndex = pathElements.indexOf(STATIC_PATH_NAME);
        if (staticPathIndex === -1 ||
            pathElements.length < 2 ||
            staticPathIndex + 2 !== pathElements.length ||
            pathElements[pathElements.length - 1] !== SCRIPT_NAME) {
            throw new Error("This script expects to be served from a ".concat(STATIC_PATH_NAME, "/").concat(SCRIPT_NAME, " path."));
        }
        var url = new URL(scriptUrl.origin);
        url.pathname = pathElements
            .slice(0, staticPathIndex)
            .concat([KAUSAL_EMBED_VIEW_PATH, "".concat(specs.version), specs.type])
            .join('/');
        Object.entries(params).forEach(function (_a) {
            var k = _a[0], v = _a[1];
            url.searchParams.append(k, v);
        });
        url.searchParams.set('embId', specs.identifier);
        return url;
    };
    var validateSpecification = function (specs, dataset) {
        var type = specs.type, version = specs.version;
        if (type === undefined) {
            throw new Error("Invalid embed type ".concat(dataset.type));
        }
        if (!type.match(ALLOWED_PATH_ELEMENT_REGEX)) {
            throw new Error("Unallowed embed type ".concat(type));
        }
        if (version === undefined) {
            throw new Error("Version ".concat(dataset.version, " is invalid."));
        }
        if (!version.match(ALLOWED_VERSION_REGEX)) {
            throw new Error("Unallowed embed version ".concat(version));
        }
        return { type: type, version: version, identifier: specs.identifier };
    };
    var getUniqueDOMPosition = function (el) {
        var elements = document.getElementsByClassName(el.className);
        for (var i = 0; i < elements.length; i++) {
            if (elements[i] === el) {
                return "".concat(el.className, "-").concat(i.toString());
            }
        }
        return el.className;
    };
    var getEmbedSpecification = function (el) {
        var type = el.dataset.type;
        var version = el.dataset.version;
        var identifier = getUniqueDOMPosition(el);
        var specs = {
            type: type,
            version: version,
            identifier: identifier
        };
        var validSpecs = validateSpecification(specs, el.dataset);
        return [validSpecs, getEmbedParameters(validSpecs, el.dataset)];
    };
    var getEmbedParameters = function (specs, dataset) {
        var params = {};
        for (var key in dataset) {
            if (Object.keys(specs).includes(key))
                continue;
            var val = dataset[key];
            if (val !== undefined) {
                params[key] = val;
            }
        }
        return params;
    };
    try {
        var scriptElement = document.currentScript;
        var _a = getEmbedSpecification(scriptElement), specs = _a[0], parameters = _a[1];
        var embedUrl = getEmbedUrl(scriptElement, specs, parameters);
        var iframe = createIFrame(embedUrl.href);
        addMessageListenerToWindow(iframe, specs.identifier);
        scriptElement.after(iframe);
    }
    catch (exception) {
        warn(exception.toString());
    }
})();
