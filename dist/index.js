'use strict';

var React = require('react');
var reactDom = require('react-dom');

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production = {};

/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production;

function requireReactJsxRuntime_production () {
	if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
	hasRequiredReactJsxRuntime_production = 1;
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
	  var key = null;
	  void 0 !== maybeKey && (key = "" + maybeKey);
	  void 0 !== config.key && (key = "" + config.key);
	  if ("key" in config) {
	    maybeKey = {};
	    for (var propName in config)
	      "key" !== propName && (maybeKey[propName] = config[propName]);
	  } else maybeKey = config;
	  config = maybeKey.ref;
	  return {
	    $$typeof: REACT_ELEMENT_TYPE,
	    type: type,
	    key: key,
	    ref: void 0 !== config ? config : null,
	    props: maybeKey
	  };
	}
	reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
	reactJsxRuntime_production.jsx = jsxProd;
	reactJsxRuntime_production.jsxs = jsxProd;
	return reactJsxRuntime_production;
}

var reactJsxRuntime_development = {};

/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_development;

function requireReactJsxRuntime_development () {
	if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
	hasRequiredReactJsxRuntime_development = 1;
	"production" !== process.env.NODE_ENV &&
	  (function () {
	    function getComponentNameFromType(type) {
	      if (null == type) return null;
	      if ("function" === typeof type)
	        return type.$$typeof === REACT_CLIENT_REFERENCE
	          ? null
	          : type.displayName || type.name || null;
	      if ("string" === typeof type) return type;
	      switch (type) {
	        case REACT_FRAGMENT_TYPE:
	          return "Fragment";
	        case REACT_PROFILER_TYPE:
	          return "Profiler";
	        case REACT_STRICT_MODE_TYPE:
	          return "StrictMode";
	        case REACT_SUSPENSE_TYPE:
	          return "Suspense";
	        case REACT_SUSPENSE_LIST_TYPE:
	          return "SuspenseList";
	        case REACT_ACTIVITY_TYPE:
	          return "Activity";
	      }
	      if ("object" === typeof type)
	        switch (
	          ("number" === typeof type.tag &&
	            console.error(
	              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
	            ),
	          type.$$typeof)
	        ) {
	          case REACT_PORTAL_TYPE:
	            return "Portal";
	          case REACT_CONTEXT_TYPE:
	            return (type.displayName || "Context") + ".Provider";
	          case REACT_CONSUMER_TYPE:
	            return (type._context.displayName || "Context") + ".Consumer";
	          case REACT_FORWARD_REF_TYPE:
	            var innerType = type.render;
	            type = type.displayName;
	            type ||
	              ((type = innerType.displayName || innerType.name || ""),
	              (type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef"));
	            return type;
	          case REACT_MEMO_TYPE:
	            return (
	              (innerType = type.displayName || null),
	              null !== innerType
	                ? innerType
	                : getComponentNameFromType(type.type) || "Memo"
	            );
	          case REACT_LAZY_TYPE:
	            innerType = type._payload;
	            type = type._init;
	            try {
	              return getComponentNameFromType(type(innerType));
	            } catch (x) {}
	        }
	      return null;
	    }
	    function testStringCoercion(value) {
	      return "" + value;
	    }
	    function checkKeyStringCoercion(value) {
	      try {
	        testStringCoercion(value);
	        var JSCompiler_inline_result = !1;
	      } catch (e) {
	        JSCompiler_inline_result = true;
	      }
	      if (JSCompiler_inline_result) {
	        JSCompiler_inline_result = console;
	        var JSCompiler_temp_const = JSCompiler_inline_result.error;
	        var JSCompiler_inline_result$jscomp$0 =
	          ("function" === typeof Symbol &&
	            Symbol.toStringTag &&
	            value[Symbol.toStringTag]) ||
	          value.constructor.name ||
	          "Object";
	        JSCompiler_temp_const.call(
	          JSCompiler_inline_result,
	          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
	          JSCompiler_inline_result$jscomp$0
	        );
	        return testStringCoercion(value);
	      }
	    }
	    function getTaskName(type) {
	      if (type === REACT_FRAGMENT_TYPE) return "<>";
	      if (
	        "object" === typeof type &&
	        null !== type &&
	        type.$$typeof === REACT_LAZY_TYPE
	      )
	        return "<...>";
	      try {
	        var name = getComponentNameFromType(type);
	        return name ? "<" + name + ">" : "<...>";
	      } catch (x) {
	        return "<...>";
	      }
	    }
	    function getOwner() {
	      var dispatcher = ReactSharedInternals.A;
	      return null === dispatcher ? null : dispatcher.getOwner();
	    }
	    function UnknownOwner() {
	      return Error("react-stack-top-frame");
	    }
	    function hasValidKey(config) {
	      if (hasOwnProperty.call(config, "key")) {
	        var getter = Object.getOwnPropertyDescriptor(config, "key").get;
	        if (getter && getter.isReactWarning) return false;
	      }
	      return void 0 !== config.key;
	    }
	    function defineKeyPropWarningGetter(props, displayName) {
	      function warnAboutAccessingKey() {
	        specialPropKeyWarningShown ||
	          ((specialPropKeyWarningShown = true),
	          console.error(
	            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
	            displayName
	          ));
	      }
	      warnAboutAccessingKey.isReactWarning = true;
	      Object.defineProperty(props, "key", {
	        get: warnAboutAccessingKey,
	        configurable: true
	      });
	    }
	    function elementRefGetterWithDeprecationWarning() {
	      var componentName = getComponentNameFromType(this.type);
	      didWarnAboutElementRef[componentName] ||
	        ((didWarnAboutElementRef[componentName] = true),
	        console.error(
	          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
	        ));
	      componentName = this.props.ref;
	      return void 0 !== componentName ? componentName : null;
	    }
	    function ReactElement(
	      type,
	      key,
	      self,
	      source,
	      owner,
	      props,
	      debugStack,
	      debugTask
	    ) {
	      self = props.ref;
	      type = {
	        $$typeof: REACT_ELEMENT_TYPE,
	        type: type,
	        key: key,
	        props: props,
	        _owner: owner
	      };
	      null !== (void 0 !== self ? self : null)
	        ? Object.defineProperty(type, "ref", {
	            enumerable: false,
	            get: elementRefGetterWithDeprecationWarning
	          })
	        : Object.defineProperty(type, "ref", { enumerable: false, value: null });
	      type._store = {};
	      Object.defineProperty(type._store, "validated", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: 0
	      });
	      Object.defineProperty(type, "_debugInfo", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: null
	      });
	      Object.defineProperty(type, "_debugStack", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: debugStack
	      });
	      Object.defineProperty(type, "_debugTask", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: debugTask
	      });
	      Object.freeze && (Object.freeze(type.props), Object.freeze(type));
	      return type;
	    }
	    function jsxDEVImpl(
	      type,
	      config,
	      maybeKey,
	      isStaticChildren,
	      source,
	      self,
	      debugStack,
	      debugTask
	    ) {
	      var children = config.children;
	      if (void 0 !== children)
	        if (isStaticChildren)
	          if (isArrayImpl(children)) {
	            for (
	              isStaticChildren = 0;
	              isStaticChildren < children.length;
	              isStaticChildren++
	            )
	              validateChildKeys(children[isStaticChildren]);
	            Object.freeze && Object.freeze(children);
	          } else
	            console.error(
	              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
	            );
	        else validateChildKeys(children);
	      if (hasOwnProperty.call(config, "key")) {
	        children = getComponentNameFromType(type);
	        var keys = Object.keys(config).filter(function (k) {
	          return "key" !== k;
	        });
	        isStaticChildren =
	          0 < keys.length
	            ? "{key: someKey, " + keys.join(": ..., ") + ": ...}"
	            : "{key: someKey}";
	        didWarnAboutKeySpread[children + isStaticChildren] ||
	          ((keys =
	            0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}"),
	          console.error(
	            'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
	            isStaticChildren,
	            children,
	            keys,
	            children
	          ),
	          (didWarnAboutKeySpread[children + isStaticChildren] = true));
	      }
	      children = null;
	      void 0 !== maybeKey &&
	        (checkKeyStringCoercion(maybeKey), (children = "" + maybeKey));
	      hasValidKey(config) &&
	        (checkKeyStringCoercion(config.key), (children = "" + config.key));
	      if ("key" in config) {
	        maybeKey = {};
	        for (var propName in config)
	          "key" !== propName && (maybeKey[propName] = config[propName]);
	      } else maybeKey = config;
	      children &&
	        defineKeyPropWarningGetter(
	          maybeKey,
	          "function" === typeof type
	            ? type.displayName || type.name || "Unknown"
	            : type
	        );
	      return ReactElement(
	        type,
	        children,
	        self,
	        source,
	        getOwner(),
	        maybeKey,
	        debugStack,
	        debugTask
	      );
	    }
	    function validateChildKeys(node) {
	      "object" === typeof node &&
	        null !== node &&
	        node.$$typeof === REACT_ELEMENT_TYPE &&
	        node._store &&
	        (node._store.validated = 1);
	    }
	    var React$1 = React,
	      REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	      REACT_PORTAL_TYPE = Symbol.for("react.portal"),
	      REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
	      REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
	      REACT_PROFILER_TYPE = Symbol.for("react.profiler");
	    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),
	      REACT_CONTEXT_TYPE = Symbol.for("react.context"),
	      REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
	      REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
	      REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"),
	      REACT_MEMO_TYPE = Symbol.for("react.memo"),
	      REACT_LAZY_TYPE = Symbol.for("react.lazy"),
	      REACT_ACTIVITY_TYPE = Symbol.for("react.activity"),
	      REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"),
	      ReactSharedInternals =
	        React$1.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
	      hasOwnProperty = Object.prototype.hasOwnProperty,
	      isArrayImpl = Array.isArray,
	      createTask = console.createTask
	        ? console.createTask
	        : function () {
	            return null;
	          };
	    React$1 = {
	      "react-stack-bottom-frame": function (callStackForError) {
	        return callStackForError();
	      }
	    };
	    var specialPropKeyWarningShown;
	    var didWarnAboutElementRef = {};
	    var unknownOwnerDebugStack = React$1["react-stack-bottom-frame"].bind(
	      React$1,
	      UnknownOwner
	    )();
	    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
	    var didWarnAboutKeySpread = {};
	    reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
	    reactJsxRuntime_development.jsx = function (type, config, maybeKey, source, self) {
	      var trackActualOwner =
	        1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
	      return jsxDEVImpl(
	        type,
	        config,
	        maybeKey,
	        false,
	        source,
	        self,
	        trackActualOwner
	          ? Error("react-stack-top-frame")
	          : unknownOwnerDebugStack,
	        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
	      );
	    };
	    reactJsxRuntime_development.jsxs = function (type, config, maybeKey, source, self) {
	      var trackActualOwner =
	        1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
	      return jsxDEVImpl(
	        type,
	        config,
	        maybeKey,
	        true,
	        source,
	        self,
	        trackActualOwner
	          ? Error("react-stack-top-frame")
	          : unknownOwnerDebugStack,
	        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
	      );
	    };
	  })();
	return reactJsxRuntime_development;
}

var hasRequiredJsxRuntime;

function requireJsxRuntime () {
	if (hasRequiredJsxRuntime) return jsxRuntime.exports;
	hasRequiredJsxRuntime = 1;

	if (process.env.NODE_ENV === 'production') {
	  jsxRuntime.exports = requireReactJsxRuntime_production();
	} else {
	  jsxRuntime.exports = requireReactJsxRuntime_development();
	}
	return jsxRuntime.exports;
}

var jsxRuntimeExports = requireJsxRuntime();

var styles$b = {"button":"Button-module_button__18Bed","button-primary":"Button-module_button-primary__wEPNt","disabled":"Button-module_disabled__UzdWL","button-secondary":"Button-module_button-secondary__nRFiY","button-outline":"Button-module_button-outline__zKhUk","button-text":"Button-module_button-text__8GFeA","button-danger":"Button-module_button-danger__MRboG","button-link":"Button-module_button-link__44NZ0","button-small":"Button-module_button-small__btpZ4","button-medium":"Button-module_button-medium__6yd9j","button-large":"Button-module_button-large__zNlxT","button-success":"Button-module_button-success__cb-Id","button-warning":"Button-module_button-warning__ixyGP","button-rounded-none":"Button-module_button-rounded-none__LkA4g","button-rounded-small":"Button-module_button-rounded-small__9jSqP","button-rounded-medium":"Button-module_button-rounded-medium__YB0g4","button-rounded-large":"Button-module_button-rounded-large__-RAYn","button-height-small":"Button-module_button-height-small__jNohx","button-height-medium":"Button-module_button-height-medium__crPgl","button-height-large":"Button-module_button-height-large__IydXG","loading":"Button-module_loading__QfItr","button-spin":"Button-module_button-spin__mQSue","button-icon":"Button-module_button-icon__5ByEL","button-block":"Button-module_button-block__GO1c1","button-group":"Button-module_button-group__emwZY"};

/*
基础按钮组件
*/
const Button = ({ children, variant = "primary", size = "medium", rounded = "medium", height = "medium", onClick, disabled = false, className = "", }) => {
    const buttonClasses = [
        styles$b.button,
        styles$b[`button-${variant}`],
        styles$b[`button-${size}`],
        styles$b[`button-rounded-${rounded}`],
        styles$b[`button-height${height}`],
        disabled ? styles$b.disabled : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");
    return (jsxRuntimeExports.jsx("button", { className: buttonClasses, onClick: onClick, disabled: disabled, type: "button", children: children }));
};

var styles$a = {"input-text":"Input-module_input-text__XcNOB","disabled":"Input-module_disabled__nzcnQ","input-small":"Input-module_input-small__9GUx7","input-medium":"Input-module_input-medium__l3uKK","input-large":"Input-module_input-large__cGDd5"};

const Input = ({ type, placeholder, value, size, disabled, className = "", onChange, }) => {
    const inputClasses = [
        styles$a.input,
        styles$a[`input-${type}`],
        styles$a[`input-${size}`],
        disabled ? styles$a.disabled : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");
    return (jsxRuntimeExports.jsx("input", { className: inputClasses, type: type, placeholder: placeholder, value: value, disabled: disabled, onChange: onChange }));
};

const warn = (i18n, code, msg, rest) => {
  const args = [msg, {
    code,
    ...(rest || {})
  }];
  if (i18n?.services?.logger?.forward) {
    return i18n.services.logger.forward(args, 'warn', 'react-i18next::', true);
  }
  if (isString$1(args[0])) args[0] = `react-i18next:: ${args[0]}`;
  if (i18n?.services?.logger?.warn) {
    i18n.services.logger.warn(...args);
  } else if (console?.warn) {
    console.warn(...args);
  }
};
const alreadyWarned = {};
const warnOnce = (i18n, code, msg, rest) => {
  if (isString$1(msg) && alreadyWarned[msg]) return;
  if (isString$1(msg)) alreadyWarned[msg] = new Date();
  warn(i18n, code, msg, rest);
};
const loadedClb = (i18n, cb) => () => {
  if (i18n.isInitialized) {
    cb();
  } else {
    const initialized = () => {
      setTimeout(() => {
        i18n.off('initialized', initialized);
      }, 0);
      cb();
    };
    i18n.on('initialized', initialized);
  }
};
const loadNamespaces = (i18n, ns, cb) => {
  i18n.loadNamespaces(ns, loadedClb(i18n, cb));
};
const loadLanguages = (i18n, lng, ns, cb) => {
  if (isString$1(ns)) ns = [ns];
  if (i18n.options.preload && i18n.options.preload.indexOf(lng) > -1) return loadNamespaces(i18n, ns, cb);
  ns.forEach(n => {
    if (i18n.options.ns.indexOf(n) < 0) i18n.options.ns.push(n);
  });
  i18n.loadLanguages(lng, loadedClb(i18n, cb));
};
const hasLoadedNamespace = (ns, i18n, options = {}) => {
  if (!i18n.languages || !i18n.languages.length) {
    warnOnce(i18n, 'NO_LANGUAGES', 'i18n.languages were undefined or empty', {
      languages: i18n.languages
    });
    return true;
  }
  return i18n.hasLoadedNamespace(ns, {
    lng: options.lng,
    precheck: (i18nInstance, loadNotPending) => {
      if (options.bindI18n && options.bindI18n.indexOf('languageChanging') > -1 && i18nInstance.services.backendConnector.backend && i18nInstance.isLanguageChangingTo && !loadNotPending(i18nInstance.isLanguageChangingTo, ns)) return false;
    }
  });
};
const isString$1 = obj => typeof obj === 'string';
const isObject = obj => typeof obj === 'object' && obj !== null;

const matchHtmlEntity = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g;
const htmlEntities = {
  '&amp;': '&',
  '&#38;': '&',
  '&lt;': '<',
  '&#60;': '<',
  '&gt;': '>',
  '&#62;': '>',
  '&apos;': "'",
  '&#39;': "'",
  '&quot;': '"',
  '&#34;': '"',
  '&nbsp;': ' ',
  '&#160;': ' ',
  '&copy;': '©',
  '&#169;': '©',
  '&reg;': '®',
  '&#174;': '®',
  '&hellip;': '…',
  '&#8230;': '…',
  '&#x2F;': '/',
  '&#47;': '/'
};
const unescapeHtmlEntity = m => htmlEntities[m];
const unescape = text => text.replace(matchHtmlEntity, unescapeHtmlEntity);

let defaultOptions = {
  bindI18n: 'languageChanged',
  bindI18nStore: '',
  transEmptyNodeValue: '',
  transSupportBasicHtmlNodes: true,
  transWrapTextNodes: '',
  transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
  useSuspense: true,
  unescape
};
const setDefaults = (options = {}) => {
  defaultOptions = {
    ...defaultOptions,
    ...options
  };
};
const getDefaults$1 = () => defaultOptions;

let i18nInstance;
const setI18n = instance => {
  i18nInstance = instance;
};
const getI18n = () => i18nInstance;

const initReactI18next = {
  type: '3rdParty',
  init(instance) {
    setDefaults(instance.options.react);
    setI18n(instance);
  }
};

const I18nContext = React.createContext();
class ReportNamespaces {
  constructor() {
    this.usedNamespaces = {};
  }
  addUsedNamespaces(namespaces) {
    namespaces.forEach(ns => {
      if (!this.usedNamespaces[ns]) this.usedNamespaces[ns] = true;
    });
  }
  getUsedNamespaces() {
    return Object.keys(this.usedNamespaces);
  }
}

const usePrevious = (value, ignore) => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  }, [value, ignore]);
  return ref.current;
};
const alwaysNewT = (i18n, language, namespace, keyPrefix) => i18n.getFixedT(language, namespace, keyPrefix);
const useMemoizedT = (i18n, language, namespace, keyPrefix) => React.useCallback(alwaysNewT(i18n, language, namespace, keyPrefix), [i18n, language, namespace, keyPrefix]);
const useTranslation$1 = (ns, props = {}) => {
  const {
    i18n: i18nFromProps
  } = props;
  const {
    i18n: i18nFromContext,
    defaultNS: defaultNSFromContext
  } = React.useContext(I18nContext) || {};
  const i18n = i18nFromProps || i18nFromContext || getI18n();
  if (i18n && !i18n.reportNamespaces) i18n.reportNamespaces = new ReportNamespaces();
  if (!i18n) {
    warnOnce(i18n, 'NO_I18NEXT_INSTANCE', 'useTranslation: You will need to pass in an i18next instance by using initReactI18next');
    const notReadyT = (k, optsOrDefaultValue) => {
      if (isString$1(optsOrDefaultValue)) return optsOrDefaultValue;
      if (isObject(optsOrDefaultValue) && isString$1(optsOrDefaultValue.defaultValue)) return optsOrDefaultValue.defaultValue;
      return Array.isArray(k) ? k[k.length - 1] : k;
    };
    const retNotReady = [notReadyT, {}, false];
    retNotReady.t = notReadyT;
    retNotReady.i18n = {};
    retNotReady.ready = false;
    return retNotReady;
  }
  if (i18n.options.react?.wait) warnOnce(i18n, 'DEPRECATED_OPTION', 'useTranslation: It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.');
  const i18nOptions = {
    ...getDefaults$1(),
    ...i18n.options.react,
    ...props
  };
  const {
    useSuspense,
    keyPrefix
  } = i18nOptions;
  let namespaces = ns || defaultNSFromContext || i18n.options?.defaultNS;
  namespaces = isString$1(namespaces) ? [namespaces] : namespaces || ['translation'];
  i18n.reportNamespaces.addUsedNamespaces?.(namespaces);
  const ready = (i18n.isInitialized || i18n.initializedStoreOnce) && namespaces.every(n => hasLoadedNamespace(n, i18n, i18nOptions));
  const memoGetT = useMemoizedT(i18n, props.lng || null, i18nOptions.nsMode === 'fallback' ? namespaces : namespaces[0], keyPrefix);
  const getT = () => memoGetT;
  const getNewT = () => alwaysNewT(i18n, props.lng || null, i18nOptions.nsMode === 'fallback' ? namespaces : namespaces[0], keyPrefix);
  const [t, setT] = React.useState(getT);
  let joinedNS = namespaces.join();
  if (props.lng) joinedNS = `${props.lng}${joinedNS}`;
  const previousJoinedNS = usePrevious(joinedNS);
  const isMounted = React.useRef(true);
  React.useEffect(() => {
    const {
      bindI18n,
      bindI18nStore
    } = i18nOptions;
    isMounted.current = true;
    if (!ready && !useSuspense) {
      if (props.lng) {
        loadLanguages(i18n, props.lng, namespaces, () => {
          if (isMounted.current) setT(getNewT);
        });
      } else {
        loadNamespaces(i18n, namespaces, () => {
          if (isMounted.current) setT(getNewT);
        });
      }
    }
    if (ready && previousJoinedNS && previousJoinedNS !== joinedNS && isMounted.current) {
      setT(getNewT);
    }
    const boundReset = () => {
      if (isMounted.current) setT(getNewT);
    };
    if (bindI18n) i18n?.on(bindI18n, boundReset);
    if (bindI18nStore) i18n?.store.on(bindI18nStore, boundReset);
    return () => {
      isMounted.current = false;
      if (i18n && bindI18n) bindI18n?.split(' ').forEach(e => i18n.off(e, boundReset));
      if (bindI18nStore && i18n) bindI18nStore.split(' ').forEach(e => i18n.store.off(e, boundReset));
    };
  }, [i18n, joinedNS]);
  React.useEffect(() => {
    if (isMounted.current && ready) {
      setT(getT);
    }
  }, [i18n, keyPrefix, ready]);
  const ret = [t, i18n, ready];
  ret.t = t;
  ret.i18n = i18n;
  ret.ready = ready;
  if (ready) return ret;
  if (!ready && !useSuspense) return ret;
  throw new Promise(resolve => {
    if (props.lng) {
      loadLanguages(i18n, props.lng, namespaces, () => resolve());
    } else {
      loadNamespaces(i18n, namespaces, () => resolve());
    }
  });
};

/**
 * 自定义的国际化 Hook，提供类型安全的翻译功能
 */
const useTranslation = () => {
    const { t, i18n, ready } = useTranslation$1();
    return {
        t: (key, options) => {
            const result = t(key, options);
            return typeof result === 'string' ? result : String(result);
        },
        i18n: {
            language: i18n.language,
            changeLanguage: (lng) => i18n.changeLanguage(lng),
        },
        ready,
    };
};
/**
 * 获取当前语言
 */
const useCurrentLanguage = () => {
    const { i18n } = useTranslation$1();
    return i18n.language;
};
/**
 * 语言切换 Hook
 */
const useLanguageSwitch = () => {
    const { i18n } = useTranslation$1();
    const switchLanguage = (language) => {
        i18n.changeLanguage(language);
    };
    const getCurrentLanguage = () => {
        return i18n.language;
    };
    return {
        switchLanguage,
        getCurrentLanguage,
        currentLanguage: i18n.language,
    };
};

const isString = obj => typeof obj === 'string';
const defer = () => {
  let res;
  let rej;
  const promise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  promise.resolve = res;
  promise.reject = rej;
  return promise;
};
const makeString = object => {
  if (object == null) return '';
  return '' + object;
};
const copy = (a, s, t) => {
  a.forEach(m => {
    if (s[m]) t[m] = s[m];
  });
};
const lastOfPathSeparatorRegExp = /###/g;
const cleanKey = key => key && key.indexOf('###') > -1 ? key.replace(lastOfPathSeparatorRegExp, '.') : key;
const canNotTraverseDeeper = object => !object || isString(object);
const getLastOfPath = (object, path, Empty) => {
  const stack = !isString(path) ? path : path.split('.');
  let stackIndex = 0;
  while (stackIndex < stack.length - 1) {
    if (canNotTraverseDeeper(object)) return {};
    const key = cleanKey(stack[stackIndex]);
    if (!object[key] && Empty) object[key] = new Empty();
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      object = object[key];
    } else {
      object = {};
    }
    ++stackIndex;
  }
  if (canNotTraverseDeeper(object)) return {};
  return {
    obj: object,
    k: cleanKey(stack[stackIndex])
  };
};
const setPath = (object, path, newValue) => {
  const {
    obj,
    k
  } = getLastOfPath(object, path, Object);
  if (obj !== undefined || path.length === 1) {
    obj[k] = newValue;
    return;
  }
  let e = path[path.length - 1];
  let p = path.slice(0, path.length - 1);
  let last = getLastOfPath(object, p, Object);
  while (last.obj === undefined && p.length) {
    e = `${p[p.length - 1]}.${e}`;
    p = p.slice(0, p.length - 1);
    last = getLastOfPath(object, p, Object);
    if (last?.obj && typeof last.obj[`${last.k}.${e}`] !== 'undefined') {
      last.obj = undefined;
    }
  }
  last.obj[`${last.k}.${e}`] = newValue;
};
const pushPath = (object, path, newValue, concat) => {
  const {
    obj,
    k
  } = getLastOfPath(object, path, Object);
  obj[k] = obj[k] || [];
  obj[k].push(newValue);
};
const getPath = (object, path) => {
  const {
    obj,
    k
  } = getLastOfPath(object, path);
  if (!obj) return undefined;
  if (!Object.prototype.hasOwnProperty.call(obj, k)) return undefined;
  return obj[k];
};
const getPathWithDefaults = (data, defaultData, key) => {
  const value = getPath(data, key);
  if (value !== undefined) {
    return value;
  }
  return getPath(defaultData, key);
};
const deepExtend = (target, source, overwrite) => {
  for (const prop in source) {
    if (prop !== '__proto__' && prop !== 'constructor') {
      if (prop in target) {
        if (isString(target[prop]) || target[prop] instanceof String || isString(source[prop]) || source[prop] instanceof String) {
          if (overwrite) target[prop] = source[prop];
        } else {
          deepExtend(target[prop], source[prop], overwrite);
        }
      } else {
        target[prop] = source[prop];
      }
    }
  }
  return target;
};
const regexEscape = str => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
var _entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;'
};
const escape = data => {
  if (isString(data)) {
    return data.replace(/[&<>"'\/]/g, s => _entityMap[s]);
  }
  return data;
};
class RegExpCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.regExpMap = new Map();
    this.regExpQueue = [];
  }
  getRegExp(pattern) {
    const regExpFromCache = this.regExpMap.get(pattern);
    if (regExpFromCache !== undefined) {
      return regExpFromCache;
    }
    const regExpNew = new RegExp(pattern);
    if (this.regExpQueue.length === this.capacity) {
      this.regExpMap.delete(this.regExpQueue.shift());
    }
    this.regExpMap.set(pattern, regExpNew);
    this.regExpQueue.push(pattern);
    return regExpNew;
  }
}
const chars = [' ', ',', '?', '!', ';'];
const looksLikeObjectPathRegExpCache = new RegExpCache(20);
const looksLikeObjectPath = (key, nsSeparator, keySeparator) => {
  nsSeparator = nsSeparator || '';
  keySeparator = keySeparator || '';
  const possibleChars = chars.filter(c => nsSeparator.indexOf(c) < 0 && keySeparator.indexOf(c) < 0);
  if (possibleChars.length === 0) return true;
  const r = looksLikeObjectPathRegExpCache.getRegExp(`(${possibleChars.map(c => c === '?' ? '\\?' : c).join('|')})`);
  let matched = !r.test(key);
  if (!matched) {
    const ki = key.indexOf(keySeparator);
    if (ki > 0 && !r.test(key.substring(0, ki))) {
      matched = true;
    }
  }
  return matched;
};
const deepFind = (obj, path, keySeparator = '.') => {
  if (!obj) return undefined;
  if (obj[path]) {
    if (!Object.prototype.hasOwnProperty.call(obj, path)) return undefined;
    return obj[path];
  }
  const tokens = path.split(keySeparator);
  let current = obj;
  for (let i = 0; i < tokens.length;) {
    if (!current || typeof current !== 'object') {
      return undefined;
    }
    let next;
    let nextPath = '';
    for (let j = i; j < tokens.length; ++j) {
      if (j !== i) {
        nextPath += keySeparator;
      }
      nextPath += tokens[j];
      next = current[nextPath];
      if (next !== undefined) {
        if (['string', 'number', 'boolean'].indexOf(typeof next) > -1 && j < tokens.length - 1) {
          continue;
        }
        i += j - i + 1;
        break;
      }
    }
    current = next;
  }
  return current;
};
const getCleanedCode = code => code?.replace('_', '-');

const consoleLogger = {
  type: 'logger',
  log(args) {
    this.output('log', args);
  },
  warn(args) {
    this.output('warn', args);
  },
  error(args) {
    this.output('error', args);
  },
  output(type, args) {
    console?.[type]?.apply?.(console, args);
  }
};
class Logger {
  constructor(concreteLogger, options = {}) {
    this.init(concreteLogger, options);
  }
  init(concreteLogger, options = {}) {
    this.prefix = options.prefix || 'i18next:';
    this.logger = concreteLogger || consoleLogger;
    this.options = options;
    this.debug = options.debug;
  }
  log(...args) {
    return this.forward(args, 'log', '', true);
  }
  warn(...args) {
    return this.forward(args, 'warn', '', true);
  }
  error(...args) {
    return this.forward(args, 'error', '');
  }
  deprecate(...args) {
    return this.forward(args, 'warn', 'WARNING DEPRECATED: ', true);
  }
  forward(args, lvl, prefix, debugOnly) {
    if (debugOnly && !this.debug) return null;
    if (isString(args[0])) args[0] = `${prefix}${this.prefix} ${args[0]}`;
    return this.logger[lvl](args);
  }
  create(moduleName) {
    return new Logger(this.logger, {
      ...{
        prefix: `${this.prefix}:${moduleName}:`
      },
      ...this.options
    });
  }
  clone(options) {
    options = options || this.options;
    options.prefix = options.prefix || this.prefix;
    return new Logger(this.logger, options);
  }
}
var baseLogger = new Logger();

class EventEmitter {
  constructor() {
    this.observers = {};
  }
  on(events, listener) {
    events.split(' ').forEach(event => {
      if (!this.observers[event]) this.observers[event] = new Map();
      const numListeners = this.observers[event].get(listener) || 0;
      this.observers[event].set(listener, numListeners + 1);
    });
    return this;
  }
  off(event, listener) {
    if (!this.observers[event]) return;
    if (!listener) {
      delete this.observers[event];
      return;
    }
    this.observers[event].delete(listener);
  }
  emit(event, ...args) {
    if (this.observers[event]) {
      const cloned = Array.from(this.observers[event].entries());
      cloned.forEach(([observer, numTimesAdded]) => {
        for (let i = 0; i < numTimesAdded; i++) {
          observer(...args);
        }
      });
    }
    if (this.observers['*']) {
      const cloned = Array.from(this.observers['*'].entries());
      cloned.forEach(([observer, numTimesAdded]) => {
        for (let i = 0; i < numTimesAdded; i++) {
          observer.apply(observer, [event, ...args]);
        }
      });
    }
  }
}

class ResourceStore extends EventEmitter {
  constructor(data, options = {
    ns: ['translation'],
    defaultNS: 'translation'
  }) {
    super();
    this.data = data || {};
    this.options = options;
    if (this.options.keySeparator === undefined) {
      this.options.keySeparator = '.';
    }
    if (this.options.ignoreJSONStructure === undefined) {
      this.options.ignoreJSONStructure = true;
    }
  }
  addNamespaces(ns) {
    if (this.options.ns.indexOf(ns) < 0) {
      this.options.ns.push(ns);
    }
  }
  removeNamespaces(ns) {
    const index = this.options.ns.indexOf(ns);
    if (index > -1) {
      this.options.ns.splice(index, 1);
    }
  }
  getResource(lng, ns, key, options = {}) {
    const keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
    const ignoreJSONStructure = options.ignoreJSONStructure !== undefined ? options.ignoreJSONStructure : this.options.ignoreJSONStructure;
    let path;
    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
    } else {
      path = [lng, ns];
      if (key) {
        if (Array.isArray(key)) {
          path.push(...key);
        } else if (isString(key) && keySeparator) {
          path.push(...key.split(keySeparator));
        } else {
          path.push(key);
        }
      }
    }
    const result = getPath(this.data, path);
    if (!result && !ns && !key && lng.indexOf('.') > -1) {
      lng = path[0];
      ns = path[1];
      key = path.slice(2).join('.');
    }
    if (result || !ignoreJSONStructure || !isString(key)) return result;
    return deepFind(this.data?.[lng]?.[ns], key, keySeparator);
  }
  addResource(lng, ns, key, value, options = {
    silent: false
  }) {
    const keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
    let path = [lng, ns];
    if (key) path = path.concat(keySeparator ? key.split(keySeparator) : key);
    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
      value = ns;
      ns = path[1];
    }
    this.addNamespaces(ns);
    setPath(this.data, path, value);
    if (!options.silent) this.emit('added', lng, ns, key, value);
  }
  addResources(lng, ns, resources, options = {
    silent: false
  }) {
    for (const m in resources) {
      if (isString(resources[m]) || Array.isArray(resources[m])) this.addResource(lng, ns, m, resources[m], {
        silent: true
      });
    }
    if (!options.silent) this.emit('added', lng, ns, resources);
  }
  addResourceBundle(lng, ns, resources, deep, overwrite, options = {
    silent: false,
    skipCopy: false
  }) {
    let path = [lng, ns];
    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
      deep = resources;
      resources = ns;
      ns = path[1];
    }
    this.addNamespaces(ns);
    let pack = getPath(this.data, path) || {};
    if (!options.skipCopy) resources = JSON.parse(JSON.stringify(resources));
    if (deep) {
      deepExtend(pack, resources, overwrite);
    } else {
      pack = {
        ...pack,
        ...resources
      };
    }
    setPath(this.data, path, pack);
    if (!options.silent) this.emit('added', lng, ns, resources);
  }
  removeResourceBundle(lng, ns) {
    if (this.hasResourceBundle(lng, ns)) {
      delete this.data[lng][ns];
    }
    this.removeNamespaces(ns);
    this.emit('removed', lng, ns);
  }
  hasResourceBundle(lng, ns) {
    return this.getResource(lng, ns) !== undefined;
  }
  getResourceBundle(lng, ns) {
    if (!ns) ns = this.options.defaultNS;
    return this.getResource(lng, ns);
  }
  getDataByLanguage(lng) {
    return this.data[lng];
  }
  hasLanguageSomeTranslations(lng) {
    const data = this.getDataByLanguage(lng);
    const n = data && Object.keys(data) || [];
    return !!n.find(v => data[v] && Object.keys(data[v]).length > 0);
  }
  toJSON() {
    return this.data;
  }
}

var postProcessor = {
  processors: {},
  addPostProcessor(module) {
    this.processors[module.name] = module;
  },
  handle(processors, value, key, options, translator) {
    processors.forEach(processor => {
      value = this.processors[processor]?.process(value, key, options, translator) ?? value;
    });
    return value;
  }
};

const checkedLoadedFor = {};
const shouldHandleAsObject = res => !isString(res) && typeof res !== 'boolean' && typeof res !== 'number';
class Translator extends EventEmitter {
  constructor(services, options = {}) {
    super();
    copy(['resourceStore', 'languageUtils', 'pluralResolver', 'interpolator', 'backendConnector', 'i18nFormat', 'utils'], services, this);
    this.options = options;
    if (this.options.keySeparator === undefined) {
      this.options.keySeparator = '.';
    }
    this.logger = baseLogger.create('translator');
  }
  changeLanguage(lng) {
    if (lng) this.language = lng;
  }
  exists(key, o = {
    interpolation: {}
  }) {
    const opt = {
      ...o
    };
    if (key == null) return false;
    const resolved = this.resolve(key, opt);
    return resolved?.res !== undefined;
  }
  extractFromKey(key, opt) {
    let nsSeparator = opt.nsSeparator !== undefined ? opt.nsSeparator : this.options.nsSeparator;
    if (nsSeparator === undefined) nsSeparator = ':';
    const keySeparator = opt.keySeparator !== undefined ? opt.keySeparator : this.options.keySeparator;
    let namespaces = opt.ns || this.options.defaultNS || [];
    const wouldCheckForNsInKey = nsSeparator && key.indexOf(nsSeparator) > -1;
    const seemsNaturalLanguage = !this.options.userDefinedKeySeparator && !opt.keySeparator && !this.options.userDefinedNsSeparator && !opt.nsSeparator && !looksLikeObjectPath(key, nsSeparator, keySeparator);
    if (wouldCheckForNsInKey && !seemsNaturalLanguage) {
      const m = key.match(this.interpolator.nestingRegexp);
      if (m && m.length > 0) {
        return {
          key,
          namespaces: isString(namespaces) ? [namespaces] : namespaces
        };
      }
      const parts = key.split(nsSeparator);
      if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.indexOf(parts[0]) > -1) namespaces = parts.shift();
      key = parts.join(keySeparator);
    }
    return {
      key,
      namespaces: isString(namespaces) ? [namespaces] : namespaces
    };
  }
  translate(keys, o, lastKey) {
    let opt = typeof o === 'object' ? {
      ...o
    } : o;
    if (typeof opt !== 'object' && this.options.overloadTranslationOptionHandler) {
      opt = this.options.overloadTranslationOptionHandler(arguments);
    }
    if (typeof options === 'object') opt = {
      ...opt
    };
    if (!opt) opt = {};
    if (keys == null) return '';
    if (!Array.isArray(keys)) keys = [String(keys)];
    const returnDetails = opt.returnDetails !== undefined ? opt.returnDetails : this.options.returnDetails;
    const keySeparator = opt.keySeparator !== undefined ? opt.keySeparator : this.options.keySeparator;
    const {
      key,
      namespaces
    } = this.extractFromKey(keys[keys.length - 1], opt);
    const namespace = namespaces[namespaces.length - 1];
    let nsSeparator = opt.nsSeparator !== undefined ? opt.nsSeparator : this.options.nsSeparator;
    if (nsSeparator === undefined) nsSeparator = ':';
    const lng = opt.lng || this.language;
    const appendNamespaceToCIMode = opt.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (lng?.toLowerCase() === 'cimode') {
      if (appendNamespaceToCIMode) {
        if (returnDetails) {
          return {
            res: `${namespace}${nsSeparator}${key}`,
            usedKey: key,
            exactUsedKey: key,
            usedLng: lng,
            usedNS: namespace,
            usedParams: this.getUsedParamsDetails(opt)
          };
        }
        return `${namespace}${nsSeparator}${key}`;
      }
      if (returnDetails) {
        return {
          res: key,
          usedKey: key,
          exactUsedKey: key,
          usedLng: lng,
          usedNS: namespace,
          usedParams: this.getUsedParamsDetails(opt)
        };
      }
      return key;
    }
    const resolved = this.resolve(keys, opt);
    let res = resolved?.res;
    const resUsedKey = resolved?.usedKey || key;
    const resExactUsedKey = resolved?.exactUsedKey || key;
    const noObject = ['[object Number]', '[object Function]', '[object RegExp]'];
    const joinArrays = opt.joinArrays !== undefined ? opt.joinArrays : this.options.joinArrays;
    const handleAsObjectInI18nFormat = !this.i18nFormat || this.i18nFormat.handleAsObject;
    const needsPluralHandling = opt.count !== undefined && !isString(opt.count);
    const hasDefaultValue = Translator.hasDefaultValue(opt);
    const defaultValueSuffix = needsPluralHandling ? this.pluralResolver.getSuffix(lng, opt.count, opt) : '';
    const defaultValueSuffixOrdinalFallback = opt.ordinal && needsPluralHandling ? this.pluralResolver.getSuffix(lng, opt.count, {
      ordinal: false
    }) : '';
    const needsZeroSuffixLookup = needsPluralHandling && !opt.ordinal && opt.count === 0;
    const defaultValue = needsZeroSuffixLookup && opt[`defaultValue${this.options.pluralSeparator}zero`] || opt[`defaultValue${defaultValueSuffix}`] || opt[`defaultValue${defaultValueSuffixOrdinalFallback}`] || opt.defaultValue;
    let resForObjHndl = res;
    if (handleAsObjectInI18nFormat && !res && hasDefaultValue) {
      resForObjHndl = defaultValue;
    }
    const handleAsObject = shouldHandleAsObject(resForObjHndl);
    const resType = Object.prototype.toString.apply(resForObjHndl);
    if (handleAsObjectInI18nFormat && resForObjHndl && handleAsObject && noObject.indexOf(resType) < 0 && !(isString(joinArrays) && Array.isArray(resForObjHndl))) {
      if (!opt.returnObjects && !this.options.returnObjects) {
        if (!this.options.returnedObjectHandler) {
          this.logger.warn('accessing an object - but returnObjects options is not enabled!');
        }
        const r = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(resUsedKey, resForObjHndl, {
          ...opt,
          ns: namespaces
        }) : `key '${key} (${this.language})' returned an object instead of string.`;
        if (returnDetails) {
          resolved.res = r;
          resolved.usedParams = this.getUsedParamsDetails(opt);
          return resolved;
        }
        return r;
      }
      if (keySeparator) {
        const resTypeIsArray = Array.isArray(resForObjHndl);
        const copy = resTypeIsArray ? [] : {};
        const newKeyToUse = resTypeIsArray ? resExactUsedKey : resUsedKey;
        for (const m in resForObjHndl) {
          if (Object.prototype.hasOwnProperty.call(resForObjHndl, m)) {
            const deepKey = `${newKeyToUse}${keySeparator}${m}`;
            if (hasDefaultValue && !res) {
              copy[m] = this.translate(deepKey, {
                ...opt,
                defaultValue: shouldHandleAsObject(defaultValue) ? defaultValue[m] : undefined,
                ...{
                  joinArrays: false,
                  ns: namespaces
                }
              });
            } else {
              copy[m] = this.translate(deepKey, {
                ...opt,
                ...{
                  joinArrays: false,
                  ns: namespaces
                }
              });
            }
            if (copy[m] === deepKey) copy[m] = resForObjHndl[m];
          }
        }
        res = copy;
      }
    } else if (handleAsObjectInI18nFormat && isString(joinArrays) && Array.isArray(res)) {
      res = res.join(joinArrays);
      if (res) res = this.extendTranslation(res, keys, opt, lastKey);
    } else {
      let usedDefault = false;
      let usedKey = false;
      if (!this.isValidLookup(res) && hasDefaultValue) {
        usedDefault = true;
        res = defaultValue;
      }
      if (!this.isValidLookup(res)) {
        usedKey = true;
        res = key;
      }
      const missingKeyNoValueFallbackToKey = opt.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey;
      const resForMissing = missingKeyNoValueFallbackToKey && usedKey ? undefined : res;
      const updateMissing = hasDefaultValue && defaultValue !== res && this.options.updateMissing;
      if (usedKey || usedDefault || updateMissing) {
        this.logger.log(updateMissing ? 'updateKey' : 'missingKey', lng, namespace, key, updateMissing ? defaultValue : res);
        if (keySeparator) {
          const fk = this.resolve(key, {
            ...opt,
            keySeparator: false
          });
          if (fk && fk.res) this.logger.warn('Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.');
        }
        let lngs = [];
        const fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, opt.lng || this.language);
        if (this.options.saveMissingTo === 'fallback' && fallbackLngs && fallbackLngs[0]) {
          for (let i = 0; i < fallbackLngs.length; i++) {
            lngs.push(fallbackLngs[i]);
          }
        } else if (this.options.saveMissingTo === 'all') {
          lngs = this.languageUtils.toResolveHierarchy(opt.lng || this.language);
        } else {
          lngs.push(opt.lng || this.language);
        }
        const send = (l, k, specificDefaultValue) => {
          const defaultForMissing = hasDefaultValue && specificDefaultValue !== res ? specificDefaultValue : resForMissing;
          if (this.options.missingKeyHandler) {
            this.options.missingKeyHandler(l, namespace, k, defaultForMissing, updateMissing, opt);
          } else if (this.backendConnector?.saveMissing) {
            this.backendConnector.saveMissing(l, namespace, k, defaultForMissing, updateMissing, opt);
          }
          this.emit('missingKey', l, namespace, k, res);
        };
        if (this.options.saveMissing) {
          if (this.options.saveMissingPlurals && needsPluralHandling) {
            lngs.forEach(language => {
              const suffixes = this.pluralResolver.getSuffixes(language, opt);
              if (needsZeroSuffixLookup && opt[`defaultValue${this.options.pluralSeparator}zero`] && suffixes.indexOf(`${this.options.pluralSeparator}zero`) < 0) {
                suffixes.push(`${this.options.pluralSeparator}zero`);
              }
              suffixes.forEach(suffix => {
                send([language], key + suffix, opt[`defaultValue${suffix}`] || defaultValue);
              });
            });
          } else {
            send(lngs, key, defaultValue);
          }
        }
      }
      res = this.extendTranslation(res, keys, opt, resolved, lastKey);
      if (usedKey && res === key && this.options.appendNamespaceToMissingKey) {
        res = `${namespace}${nsSeparator}${key}`;
      }
      if ((usedKey || usedDefault) && this.options.parseMissingKeyHandler) {
        res = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${namespace}${nsSeparator}${key}` : key, usedDefault ? res : undefined, opt);
      }
    }
    if (returnDetails) {
      resolved.res = res;
      resolved.usedParams = this.getUsedParamsDetails(opt);
      return resolved;
    }
    return res;
  }
  extendTranslation(res, key, opt, resolved, lastKey) {
    if (this.i18nFormat?.parse) {
      res = this.i18nFormat.parse(res, {
        ...this.options.interpolation.defaultVariables,
        ...opt
      }, opt.lng || this.language || resolved.usedLng, resolved.usedNS, resolved.usedKey, {
        resolved
      });
    } else if (!opt.skipInterpolation) {
      if (opt.interpolation) this.interpolator.init({
        ...opt,
        ...{
          interpolation: {
            ...this.options.interpolation,
            ...opt.interpolation
          }
        }
      });
      const skipOnVariables = isString(res) && (opt?.interpolation?.skipOnVariables !== undefined ? opt.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
      let nestBef;
      if (skipOnVariables) {
        const nb = res.match(this.interpolator.nestingRegexp);
        nestBef = nb && nb.length;
      }
      let data = opt.replace && !isString(opt.replace) ? opt.replace : opt;
      if (this.options.interpolation.defaultVariables) data = {
        ...this.options.interpolation.defaultVariables,
        ...data
      };
      res = this.interpolator.interpolate(res, data, opt.lng || this.language || resolved.usedLng, opt);
      if (skipOnVariables) {
        const na = res.match(this.interpolator.nestingRegexp);
        const nestAft = na && na.length;
        if (nestBef < nestAft) opt.nest = false;
      }
      if (!opt.lng && resolved && resolved.res) opt.lng = this.language || resolved.usedLng;
      if (opt.nest !== false) res = this.interpolator.nest(res, (...args) => {
        if (lastKey?.[0] === args[0] && !opt.context) {
          this.logger.warn(`It seems you are nesting recursively key: ${args[0]} in key: ${key[0]}`);
          return null;
        }
        return this.translate(...args, key);
      }, opt);
      if (opt.interpolation) this.interpolator.reset();
    }
    const postProcess = opt.postProcess || this.options.postProcess;
    const postProcessorNames = isString(postProcess) ? [postProcess] : postProcess;
    if (res != null && postProcessorNames?.length && opt.applyPostProcessor !== false) {
      res = postProcessor.handle(postProcessorNames, res, key, this.options && this.options.postProcessPassResolved ? {
        i18nResolved: {
          ...resolved,
          usedParams: this.getUsedParamsDetails(opt)
        },
        ...opt
      } : opt, this);
    }
    return res;
  }
  resolve(keys, opt = {}) {
    let found;
    let usedKey;
    let exactUsedKey;
    let usedLng;
    let usedNS;
    if (isString(keys)) keys = [keys];
    keys.forEach(k => {
      if (this.isValidLookup(found)) return;
      const extracted = this.extractFromKey(k, opt);
      const key = extracted.key;
      usedKey = key;
      let namespaces = extracted.namespaces;
      if (this.options.fallbackNS) namespaces = namespaces.concat(this.options.fallbackNS);
      const needsPluralHandling = opt.count !== undefined && !isString(opt.count);
      const needsZeroSuffixLookup = needsPluralHandling && !opt.ordinal && opt.count === 0;
      const needsContextHandling = opt.context !== undefined && (isString(opt.context) || typeof opt.context === 'number') && opt.context !== '';
      const codes = opt.lngs ? opt.lngs : this.languageUtils.toResolveHierarchy(opt.lng || this.language, opt.fallbackLng);
      namespaces.forEach(ns => {
        if (this.isValidLookup(found)) return;
        usedNS = ns;
        if (!checkedLoadedFor[`${codes[0]}-${ns}`] && this.utils?.hasLoadedNamespace && !this.utils?.hasLoadedNamespace(usedNS)) {
          checkedLoadedFor[`${codes[0]}-${ns}`] = true;
          this.logger.warn(`key "${usedKey}" for languages "${codes.join(', ')}" won't get resolved as namespace "${usedNS}" was not yet loaded`, 'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!');
        }
        codes.forEach(code => {
          if (this.isValidLookup(found)) return;
          usedLng = code;
          const finalKeys = [key];
          if (this.i18nFormat?.addLookupKeys) {
            this.i18nFormat.addLookupKeys(finalKeys, key, code, ns, opt);
          } else {
            let pluralSuffix;
            if (needsPluralHandling) pluralSuffix = this.pluralResolver.getSuffix(code, opt.count, opt);
            const zeroSuffix = `${this.options.pluralSeparator}zero`;
            const ordinalPrefix = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (needsPluralHandling) {
              finalKeys.push(key + pluralSuffix);
              if (opt.ordinal && pluralSuffix.indexOf(ordinalPrefix) === 0) {
                finalKeys.push(key + pluralSuffix.replace(ordinalPrefix, this.options.pluralSeparator));
              }
              if (needsZeroSuffixLookup) {
                finalKeys.push(key + zeroSuffix);
              }
            }
            if (needsContextHandling) {
              const contextKey = `${key}${this.options.contextSeparator}${opt.context}`;
              finalKeys.push(contextKey);
              if (needsPluralHandling) {
                finalKeys.push(contextKey + pluralSuffix);
                if (opt.ordinal && pluralSuffix.indexOf(ordinalPrefix) === 0) {
                  finalKeys.push(contextKey + pluralSuffix.replace(ordinalPrefix, this.options.pluralSeparator));
                }
                if (needsZeroSuffixLookup) {
                  finalKeys.push(contextKey + zeroSuffix);
                }
              }
            }
          }
          let possibleKey;
          while (possibleKey = finalKeys.pop()) {
            if (!this.isValidLookup(found)) {
              exactUsedKey = possibleKey;
              found = this.getResource(code, ns, possibleKey, opt);
            }
          }
        });
      });
    });
    return {
      res: found,
      usedKey,
      exactUsedKey,
      usedLng,
      usedNS
    };
  }
  isValidLookup(res) {
    return res !== undefined && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === '');
  }
  getResource(code, ns, key, options = {}) {
    if (this.i18nFormat?.getResource) return this.i18nFormat.getResource(code, ns, key, options);
    return this.resourceStore.getResource(code, ns, key, options);
  }
  getUsedParamsDetails(options = {}) {
    const optionsKeys = ['defaultValue', 'ordinal', 'context', 'replace', 'lng', 'lngs', 'fallbackLng', 'ns', 'keySeparator', 'nsSeparator', 'returnObjects', 'returnDetails', 'joinArrays', 'postProcess', 'interpolation'];
    const useOptionsReplaceForData = options.replace && !isString(options.replace);
    let data = useOptionsReplaceForData ? options.replace : options;
    if (useOptionsReplaceForData && typeof options.count !== 'undefined') {
      data.count = options.count;
    }
    if (this.options.interpolation.defaultVariables) {
      data = {
        ...this.options.interpolation.defaultVariables,
        ...data
      };
    }
    if (!useOptionsReplaceForData) {
      data = {
        ...data
      };
      for (const key of optionsKeys) {
        delete data[key];
      }
    }
    return data;
  }
  static hasDefaultValue(options) {
    const prefix = 'defaultValue';
    for (const option in options) {
      if (Object.prototype.hasOwnProperty.call(options, option) && prefix === option.substring(0, prefix.length) && undefined !== options[option]) {
        return true;
      }
    }
    return false;
  }
}

class LanguageUtil {
  constructor(options) {
    this.options = options;
    this.supportedLngs = this.options.supportedLngs || false;
    this.logger = baseLogger.create('languageUtils');
  }
  getScriptPartFromCode(code) {
    code = getCleanedCode(code);
    if (!code || code.indexOf('-') < 0) return null;
    const p = code.split('-');
    if (p.length === 2) return null;
    p.pop();
    if (p[p.length - 1].toLowerCase() === 'x') return null;
    return this.formatLanguageCode(p.join('-'));
  }
  getLanguagePartFromCode(code) {
    code = getCleanedCode(code);
    if (!code || code.indexOf('-') < 0) return code;
    const p = code.split('-');
    return this.formatLanguageCode(p[0]);
  }
  formatLanguageCode(code) {
    if (isString(code) && code.indexOf('-') > -1) {
      let formattedCode;
      try {
        formattedCode = Intl.getCanonicalLocales(code)[0];
      } catch (e) {}
      if (formattedCode && this.options.lowerCaseLng) {
        formattedCode = formattedCode.toLowerCase();
      }
      if (formattedCode) return formattedCode;
      if (this.options.lowerCaseLng) {
        return code.toLowerCase();
      }
      return code;
    }
    return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
  }
  isSupportedCode(code) {
    if (this.options.load === 'languageOnly' || this.options.nonExplicitSupportedLngs) {
      code = this.getLanguagePartFromCode(code);
    }
    return !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(code) > -1;
  }
  getBestMatchFromCodes(codes) {
    if (!codes) return null;
    let found;
    codes.forEach(code => {
      if (found) return;
      const cleanedLng = this.formatLanguageCode(code);
      if (!this.options.supportedLngs || this.isSupportedCode(cleanedLng)) found = cleanedLng;
    });
    if (!found && this.options.supportedLngs) {
      codes.forEach(code => {
        if (found) return;
        const lngScOnly = this.getScriptPartFromCode(code);
        if (this.isSupportedCode(lngScOnly)) return found = lngScOnly;
        const lngOnly = this.getLanguagePartFromCode(code);
        if (this.isSupportedCode(lngOnly)) return found = lngOnly;
        found = this.options.supportedLngs.find(supportedLng => {
          if (supportedLng === lngOnly) return supportedLng;
          if (supportedLng.indexOf('-') < 0 && lngOnly.indexOf('-') < 0) return;
          if (supportedLng.indexOf('-') > 0 && lngOnly.indexOf('-') < 0 && supportedLng.substring(0, supportedLng.indexOf('-')) === lngOnly) return supportedLng;
          if (supportedLng.indexOf(lngOnly) === 0 && lngOnly.length > 1) return supportedLng;
        });
      });
    }
    if (!found) found = this.getFallbackCodes(this.options.fallbackLng)[0];
    return found;
  }
  getFallbackCodes(fallbacks, code) {
    if (!fallbacks) return [];
    if (typeof fallbacks === 'function') fallbacks = fallbacks(code);
    if (isString(fallbacks)) fallbacks = [fallbacks];
    if (Array.isArray(fallbacks)) return fallbacks;
    if (!code) return fallbacks.default || [];
    let found = fallbacks[code];
    if (!found) found = fallbacks[this.getScriptPartFromCode(code)];
    if (!found) found = fallbacks[this.formatLanguageCode(code)];
    if (!found) found = fallbacks[this.getLanguagePartFromCode(code)];
    if (!found) found = fallbacks.default;
    return found || [];
  }
  toResolveHierarchy(code, fallbackCode) {
    const fallbackCodes = this.getFallbackCodes((fallbackCode === false ? [] : fallbackCode) || this.options.fallbackLng || [], code);
    const codes = [];
    const addCode = c => {
      if (!c) return;
      if (this.isSupportedCode(c)) {
        codes.push(c);
      } else {
        this.logger.warn(`rejecting language code not found in supportedLngs: ${c}`);
      }
    };
    if (isString(code) && (code.indexOf('-') > -1 || code.indexOf('_') > -1)) {
      if (this.options.load !== 'languageOnly') addCode(this.formatLanguageCode(code));
      if (this.options.load !== 'languageOnly' && this.options.load !== 'currentOnly') addCode(this.getScriptPartFromCode(code));
      if (this.options.load !== 'currentOnly') addCode(this.getLanguagePartFromCode(code));
    } else if (isString(code)) {
      addCode(this.formatLanguageCode(code));
    }
    fallbackCodes.forEach(fc => {
      if (codes.indexOf(fc) < 0) addCode(this.formatLanguageCode(fc));
    });
    return codes;
  }
}

const suffixesOrder = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
};
const dummyRule = {
  select: count => count === 1 ? 'one' : 'other',
  resolvedOptions: () => ({
    pluralCategories: ['one', 'other']
  })
};
class PluralResolver {
  constructor(languageUtils, options = {}) {
    this.languageUtils = languageUtils;
    this.options = options;
    this.logger = baseLogger.create('pluralResolver');
    this.pluralRulesCache = {};
  }
  addRule(lng, obj) {
    this.rules[lng] = obj;
  }
  clearCache() {
    this.pluralRulesCache = {};
  }
  getRule(code, options = {}) {
    const cleanedCode = getCleanedCode(code === 'dev' ? 'en' : code);
    const type = options.ordinal ? 'ordinal' : 'cardinal';
    const cacheKey = JSON.stringify({
      cleanedCode,
      type
    });
    if (cacheKey in this.pluralRulesCache) {
      return this.pluralRulesCache[cacheKey];
    }
    let rule;
    try {
      rule = new Intl.PluralRules(cleanedCode, {
        type
      });
    } catch (err) {
      if (!Intl) {
        this.logger.error('No Intl support, please use an Intl polyfill!');
        return dummyRule;
      }
      if (!code.match(/-|_/)) return dummyRule;
      const lngPart = this.languageUtils.getLanguagePartFromCode(code);
      rule = this.getRule(lngPart, options);
    }
    this.pluralRulesCache[cacheKey] = rule;
    return rule;
  }
  needsPlural(code, options = {}) {
    let rule = this.getRule(code, options);
    if (!rule) rule = this.getRule('dev', options);
    return rule?.resolvedOptions().pluralCategories.length > 1;
  }
  getPluralFormsOfKey(code, key, options = {}) {
    return this.getSuffixes(code, options).map(suffix => `${key}${suffix}`);
  }
  getSuffixes(code, options = {}) {
    let rule = this.getRule(code, options);
    if (!rule) rule = this.getRule('dev', options);
    if (!rule) return [];
    return rule.resolvedOptions().pluralCategories.sort((pluralCategory1, pluralCategory2) => suffixesOrder[pluralCategory1] - suffixesOrder[pluralCategory2]).map(pluralCategory => `${this.options.prepend}${options.ordinal ? `ordinal${this.options.prepend}` : ''}${pluralCategory}`);
  }
  getSuffix(code, count, options = {}) {
    const rule = this.getRule(code, options);
    if (rule) {
      return `${this.options.prepend}${options.ordinal ? `ordinal${this.options.prepend}` : ''}${rule.select(count)}`;
    }
    this.logger.warn(`no plural rule found for: ${code}`);
    return this.getSuffix('dev', count, options);
  }
}

const deepFindWithDefaults = (data, defaultData, key, keySeparator = '.', ignoreJSONStructure = true) => {
  let path = getPathWithDefaults(data, defaultData, key);
  if (!path && ignoreJSONStructure && isString(key)) {
    path = deepFind(data, key, keySeparator);
    if (path === undefined) path = deepFind(defaultData, key, keySeparator);
  }
  return path;
};
const regexSafe = val => val.replace(/\$/g, '$$$$');
class Interpolator {
  constructor(options = {}) {
    this.logger = baseLogger.create('interpolator');
    this.options = options;
    this.format = options?.interpolation?.format || (value => value);
    this.init(options);
  }
  init(options = {}) {
    if (!options.interpolation) options.interpolation = {
      escapeValue: true
    };
    const {
      escape: escape$1,
      escapeValue,
      useRawValueToEscape,
      prefix,
      prefixEscaped,
      suffix,
      suffixEscaped,
      formatSeparator,
      unescapeSuffix,
      unescapePrefix,
      nestingPrefix,
      nestingPrefixEscaped,
      nestingSuffix,
      nestingSuffixEscaped,
      nestingOptionsSeparator,
      maxReplaces,
      alwaysFormat
    } = options.interpolation;
    this.escape = escape$1 !== undefined ? escape$1 : escape;
    this.escapeValue = escapeValue !== undefined ? escapeValue : true;
    this.useRawValueToEscape = useRawValueToEscape !== undefined ? useRawValueToEscape : false;
    this.prefix = prefix ? regexEscape(prefix) : prefixEscaped || '{{';
    this.suffix = suffix ? regexEscape(suffix) : suffixEscaped || '}}';
    this.formatSeparator = formatSeparator || ',';
    this.unescapePrefix = unescapeSuffix ? '' : unescapePrefix || '-';
    this.unescapeSuffix = this.unescapePrefix ? '' : unescapeSuffix || '';
    this.nestingPrefix = nestingPrefix ? regexEscape(nestingPrefix) : nestingPrefixEscaped || regexEscape('$t(');
    this.nestingSuffix = nestingSuffix ? regexEscape(nestingSuffix) : nestingSuffixEscaped || regexEscape(')');
    this.nestingOptionsSeparator = nestingOptionsSeparator || ',';
    this.maxReplaces = maxReplaces || 1000;
    this.alwaysFormat = alwaysFormat !== undefined ? alwaysFormat : false;
    this.resetRegExp();
  }
  reset() {
    if (this.options) this.init(this.options);
  }
  resetRegExp() {
    const getOrResetRegExp = (existingRegExp, pattern) => {
      if (existingRegExp?.source === pattern) {
        existingRegExp.lastIndex = 0;
        return existingRegExp;
      }
      return new RegExp(pattern, 'g');
    };
    this.regexp = getOrResetRegExp(this.regexp, `${this.prefix}(.+?)${this.suffix}`);
    this.regexpUnescape = getOrResetRegExp(this.regexpUnescape, `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`);
    this.nestingRegexp = getOrResetRegExp(this.nestingRegexp, `${this.nestingPrefix}(.+?)${this.nestingSuffix}`);
  }
  interpolate(str, data, lng, options) {
    let match;
    let value;
    let replaces;
    const defaultData = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
    const handleFormat = key => {
      if (key.indexOf(this.formatSeparator) < 0) {
        const path = deepFindWithDefaults(data, defaultData, key, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format(path, undefined, lng, {
          ...options,
          ...data,
          interpolationkey: key
        }) : path;
      }
      const p = key.split(this.formatSeparator);
      const k = p.shift().trim();
      const f = p.join(this.formatSeparator).trim();
      return this.format(deepFindWithDefaults(data, defaultData, k, this.options.keySeparator, this.options.ignoreJSONStructure), f, lng, {
        ...options,
        ...data,
        interpolationkey: k
      });
    };
    this.resetRegExp();
    const missingInterpolationHandler = options?.missingInterpolationHandler || this.options.missingInterpolationHandler;
    const skipOnVariables = options?.interpolation?.skipOnVariables !== undefined ? options.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
    const todos = [{
      regex: this.regexpUnescape,
      safeValue: val => regexSafe(val)
    }, {
      regex: this.regexp,
      safeValue: val => this.escapeValue ? regexSafe(this.escape(val)) : regexSafe(val)
    }];
    todos.forEach(todo => {
      replaces = 0;
      while (match = todo.regex.exec(str)) {
        const matchedVar = match[1].trim();
        value = handleFormat(matchedVar);
        if (value === undefined) {
          if (typeof missingInterpolationHandler === 'function') {
            const temp = missingInterpolationHandler(str, match, options);
            value = isString(temp) ? temp : '';
          } else if (options && Object.prototype.hasOwnProperty.call(options, matchedVar)) {
            value = '';
          } else if (skipOnVariables) {
            value = match[0];
            continue;
          } else {
            this.logger.warn(`missed to pass in variable ${matchedVar} for interpolating ${str}`);
            value = '';
          }
        } else if (!isString(value) && !this.useRawValueToEscape) {
          value = makeString(value);
        }
        const safeValue = todo.safeValue(value);
        str = str.replace(match[0], safeValue);
        if (skipOnVariables) {
          todo.regex.lastIndex += value.length;
          todo.regex.lastIndex -= match[0].length;
        } else {
          todo.regex.lastIndex = 0;
        }
        replaces++;
        if (replaces >= this.maxReplaces) {
          break;
        }
      }
    });
    return str;
  }
  nest(str, fc, options = {}) {
    let match;
    let value;
    let clonedOptions;
    const handleHasOptions = (key, inheritedOptions) => {
      const sep = this.nestingOptionsSeparator;
      if (key.indexOf(sep) < 0) return key;
      const c = key.split(new RegExp(`${sep}[ ]*{`));
      let optionsString = `{${c[1]}`;
      key = c[0];
      optionsString = this.interpolate(optionsString, clonedOptions);
      const matchedSingleQuotes = optionsString.match(/'/g);
      const matchedDoubleQuotes = optionsString.match(/"/g);
      if ((matchedSingleQuotes?.length ?? 0) % 2 === 0 && !matchedDoubleQuotes || matchedDoubleQuotes.length % 2 !== 0) {
        optionsString = optionsString.replace(/'/g, '"');
      }
      try {
        clonedOptions = JSON.parse(optionsString);
        if (inheritedOptions) clonedOptions = {
          ...inheritedOptions,
          ...clonedOptions
        };
      } catch (e) {
        this.logger.warn(`failed parsing options string in nesting for key ${key}`, e);
        return `${key}${sep}${optionsString}`;
      }
      if (clonedOptions.defaultValue && clonedOptions.defaultValue.indexOf(this.prefix) > -1) delete clonedOptions.defaultValue;
      return key;
    };
    while (match = this.nestingRegexp.exec(str)) {
      let formatters = [];
      clonedOptions = {
        ...options
      };
      clonedOptions = clonedOptions.replace && !isString(clonedOptions.replace) ? clonedOptions.replace : clonedOptions;
      clonedOptions.applyPostProcessor = false;
      delete clonedOptions.defaultValue;
      const keyEndIndex = /{.*}/.test(match[1]) ? match[1].lastIndexOf('}') + 1 : match[1].indexOf(this.formatSeparator);
      if (keyEndIndex !== -1) {
        formatters = match[1].slice(keyEndIndex).split(this.formatSeparator).map(elem => elem.trim()).filter(Boolean);
        match[1] = match[1].slice(0, keyEndIndex);
      }
      value = fc(handleHasOptions.call(this, match[1].trim(), clonedOptions), clonedOptions);
      if (value && match[0] === str && !isString(value)) return value;
      if (!isString(value)) value = makeString(value);
      if (!value) {
        this.logger.warn(`missed to resolve ${match[1]} for nesting ${str}`);
        value = '';
      }
      if (formatters.length) {
        value = formatters.reduce((v, f) => this.format(v, f, options.lng, {
          ...options,
          interpolationkey: match[1].trim()
        }), value.trim());
      }
      str = str.replace(match[0], value);
      this.regexp.lastIndex = 0;
    }
    return str;
  }
}

const parseFormatStr = formatStr => {
  let formatName = formatStr.toLowerCase().trim();
  const formatOptions = {};
  if (formatStr.indexOf('(') > -1) {
    const p = formatStr.split('(');
    formatName = p[0].toLowerCase().trim();
    const optStr = p[1].substring(0, p[1].length - 1);
    if (formatName === 'currency' && optStr.indexOf(':') < 0) {
      if (!formatOptions.currency) formatOptions.currency = optStr.trim();
    } else if (formatName === 'relativetime' && optStr.indexOf(':') < 0) {
      if (!formatOptions.range) formatOptions.range = optStr.trim();
    } else {
      const opts = optStr.split(';');
      opts.forEach(opt => {
        if (opt) {
          const [key, ...rest] = opt.split(':');
          const val = rest.join(':').trim().replace(/^'+|'+$/g, '');
          const trimmedKey = key.trim();
          if (!formatOptions[trimmedKey]) formatOptions[trimmedKey] = val;
          if (val === 'false') formatOptions[trimmedKey] = false;
          if (val === 'true') formatOptions[trimmedKey] = true;
          if (!isNaN(val)) formatOptions[trimmedKey] = parseInt(val, 10);
        }
      });
    }
  }
  return {
    formatName,
    formatOptions
  };
};
const createCachedFormatter = fn => {
  const cache = {};
  return (v, l, o) => {
    let optForCache = o;
    if (o && o.interpolationkey && o.formatParams && o.formatParams[o.interpolationkey] && o[o.interpolationkey]) {
      optForCache = {
        ...optForCache,
        [o.interpolationkey]: undefined
      };
    }
    const key = l + JSON.stringify(optForCache);
    let frm = cache[key];
    if (!frm) {
      frm = fn(getCleanedCode(l), o);
      cache[key] = frm;
    }
    return frm(v);
  };
};
const createNonCachedFormatter = fn => (v, l, o) => fn(getCleanedCode(l), o)(v);
class Formatter {
  constructor(options = {}) {
    this.logger = baseLogger.create('formatter');
    this.options = options;
    this.init(options);
  }
  init(services, options = {
    interpolation: {}
  }) {
    this.formatSeparator = options.interpolation.formatSeparator || ',';
    const cf = options.cacheInBuiltFormats ? createCachedFormatter : createNonCachedFormatter;
    this.formats = {
      number: cf((lng, opt) => {
        const formatter = new Intl.NumberFormat(lng, {
          ...opt
        });
        return val => formatter.format(val);
      }),
      currency: cf((lng, opt) => {
        const formatter = new Intl.NumberFormat(lng, {
          ...opt,
          style: 'currency'
        });
        return val => formatter.format(val);
      }),
      datetime: cf((lng, opt) => {
        const formatter = new Intl.DateTimeFormat(lng, {
          ...opt
        });
        return val => formatter.format(val);
      }),
      relativetime: cf((lng, opt) => {
        const formatter = new Intl.RelativeTimeFormat(lng, {
          ...opt
        });
        return val => formatter.format(val, opt.range || 'day');
      }),
      list: cf((lng, opt) => {
        const formatter = new Intl.ListFormat(lng, {
          ...opt
        });
        return val => formatter.format(val);
      })
    };
  }
  add(name, fc) {
    this.formats[name.toLowerCase().trim()] = fc;
  }
  addCached(name, fc) {
    this.formats[name.toLowerCase().trim()] = createCachedFormatter(fc);
  }
  format(value, format, lng, options = {}) {
    const formats = format.split(this.formatSeparator);
    if (formats.length > 1 && formats[0].indexOf('(') > 1 && formats[0].indexOf(')') < 0 && formats.find(f => f.indexOf(')') > -1)) {
      const lastIndex = formats.findIndex(f => f.indexOf(')') > -1);
      formats[0] = [formats[0], ...formats.splice(1, lastIndex)].join(this.formatSeparator);
    }
    const result = formats.reduce((mem, f) => {
      const {
        formatName,
        formatOptions
      } = parseFormatStr(f);
      if (this.formats[formatName]) {
        let formatted = mem;
        try {
          const valOptions = options?.formatParams?.[options.interpolationkey] || {};
          const l = valOptions.locale || valOptions.lng || options.locale || options.lng || lng;
          formatted = this.formats[formatName](mem, l, {
            ...formatOptions,
            ...options,
            ...valOptions
          });
        } catch (error) {
          this.logger.warn(error);
        }
        return formatted;
      } else {
        this.logger.warn(`there was no format function for ${formatName}`);
      }
      return mem;
    }, value);
    return result;
  }
}

const removePending = (q, name) => {
  if (q.pending[name] !== undefined) {
    delete q.pending[name];
    q.pendingCount--;
  }
};
class Connector extends EventEmitter {
  constructor(backend, store, services, options = {}) {
    super();
    this.backend = backend;
    this.store = store;
    this.services = services;
    this.languageUtils = services.languageUtils;
    this.options = options;
    this.logger = baseLogger.create('backendConnector');
    this.waitingReads = [];
    this.maxParallelReads = options.maxParallelReads || 10;
    this.readingCalls = 0;
    this.maxRetries = options.maxRetries >= 0 ? options.maxRetries : 5;
    this.retryTimeout = options.retryTimeout >= 1 ? options.retryTimeout : 350;
    this.state = {};
    this.queue = [];
    this.backend?.init?.(services, options.backend, options);
  }
  queueLoad(languages, namespaces, options, callback) {
    const toLoad = {};
    const pending = {};
    const toLoadLanguages = {};
    const toLoadNamespaces = {};
    languages.forEach(lng => {
      let hasAllNamespaces = true;
      namespaces.forEach(ns => {
        const name = `${lng}|${ns}`;
        if (!options.reload && this.store.hasResourceBundle(lng, ns)) {
          this.state[name] = 2;
        } else if (this.state[name] < 0) ; else if (this.state[name] === 1) {
          if (pending[name] === undefined) pending[name] = true;
        } else {
          this.state[name] = 1;
          hasAllNamespaces = false;
          if (pending[name] === undefined) pending[name] = true;
          if (toLoad[name] === undefined) toLoad[name] = true;
          if (toLoadNamespaces[ns] === undefined) toLoadNamespaces[ns] = true;
        }
      });
      if (!hasAllNamespaces) toLoadLanguages[lng] = true;
    });
    if (Object.keys(toLoad).length || Object.keys(pending).length) {
      this.queue.push({
        pending,
        pendingCount: Object.keys(pending).length,
        loaded: {},
        errors: [],
        callback
      });
    }
    return {
      toLoad: Object.keys(toLoad),
      pending: Object.keys(pending),
      toLoadLanguages: Object.keys(toLoadLanguages),
      toLoadNamespaces: Object.keys(toLoadNamespaces)
    };
  }
  loaded(name, err, data) {
    const s = name.split('|');
    const lng = s[0];
    const ns = s[1];
    if (err) this.emit('failedLoading', lng, ns, err);
    if (!err && data) {
      this.store.addResourceBundle(lng, ns, data, undefined, undefined, {
        skipCopy: true
      });
    }
    this.state[name] = err ? -1 : 2;
    if (err && data) this.state[name] = 0;
    const loaded = {};
    this.queue.forEach(q => {
      pushPath(q.loaded, [lng], ns);
      removePending(q, name);
      if (err) q.errors.push(err);
      if (q.pendingCount === 0 && !q.done) {
        Object.keys(q.loaded).forEach(l => {
          if (!loaded[l]) loaded[l] = {};
          const loadedKeys = q.loaded[l];
          if (loadedKeys.length) {
            loadedKeys.forEach(n => {
              if (loaded[l][n] === undefined) loaded[l][n] = true;
            });
          }
        });
        q.done = true;
        if (q.errors.length) {
          q.callback(q.errors);
        } else {
          q.callback();
        }
      }
    });
    this.emit('loaded', loaded);
    this.queue = this.queue.filter(q => !q.done);
  }
  read(lng, ns, fcName, tried = 0, wait = this.retryTimeout, callback) {
    if (!lng.length) return callback(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng,
        ns,
        fcName,
        tried,
        wait,
        callback
      });
      return;
    }
    this.readingCalls++;
    const resolver = (err, data) => {
      this.readingCalls--;
      if (this.waitingReads.length > 0) {
        const next = this.waitingReads.shift();
        this.read(next.lng, next.ns, next.fcName, next.tried, next.wait, next.callback);
      }
      if (err && data && tried < this.maxRetries) {
        setTimeout(() => {
          this.read.call(this, lng, ns, fcName, tried + 1, wait * 2, callback);
        }, wait);
        return;
      }
      callback(err, data);
    };
    const fc = this.backend[fcName].bind(this.backend);
    if (fc.length === 2) {
      try {
        const r = fc(lng, ns);
        if (r && typeof r.then === 'function') {
          r.then(data => resolver(null, data)).catch(resolver);
        } else {
          resolver(null, r);
        }
      } catch (err) {
        resolver(err);
      }
      return;
    }
    return fc(lng, ns, resolver);
  }
  prepareLoading(languages, namespaces, options = {}, callback) {
    if (!this.backend) {
      this.logger.warn('No backend was added via i18next.use. Will not load resources.');
      return callback && callback();
    }
    if (isString(languages)) languages = this.languageUtils.toResolveHierarchy(languages);
    if (isString(namespaces)) namespaces = [namespaces];
    const toLoad = this.queueLoad(languages, namespaces, options, callback);
    if (!toLoad.toLoad.length) {
      if (!toLoad.pending.length) callback();
      return null;
    }
    toLoad.toLoad.forEach(name => {
      this.loadOne(name);
    });
  }
  load(languages, namespaces, callback) {
    this.prepareLoading(languages, namespaces, {}, callback);
  }
  reload(languages, namespaces, callback) {
    this.prepareLoading(languages, namespaces, {
      reload: true
    }, callback);
  }
  loadOne(name, prefix = '') {
    const s = name.split('|');
    const lng = s[0];
    const ns = s[1];
    this.read(lng, ns, 'read', undefined, undefined, (err, data) => {
      if (err) this.logger.warn(`${prefix}loading namespace ${ns} for language ${lng} failed`, err);
      if (!err && data) this.logger.log(`${prefix}loaded namespace ${ns} for language ${lng}`, data);
      this.loaded(name, err, data);
    });
  }
  saveMissing(languages, namespace, key, fallbackValue, isUpdate, options = {}, clb = () => {}) {
    if (this.services?.utils?.hasLoadedNamespace && !this.services?.utils?.hasLoadedNamespace(namespace)) {
      this.logger.warn(`did not save key "${key}" as the namespace "${namespace}" was not yet loaded`, 'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!');
      return;
    }
    if (key === undefined || key === null || key === '') return;
    if (this.backend?.create) {
      const opts = {
        ...options,
        isUpdate
      };
      const fc = this.backend.create.bind(this.backend);
      if (fc.length < 6) {
        try {
          let r;
          if (fc.length === 5) {
            r = fc(languages, namespace, key, fallbackValue, opts);
          } else {
            r = fc(languages, namespace, key, fallbackValue);
          }
          if (r && typeof r.then === 'function') {
            r.then(data => clb(null, data)).catch(clb);
          } else {
            clb(null, r);
          }
        } catch (err) {
          clb(err);
        }
      } else {
        fc(languages, namespace, key, fallbackValue, clb, opts);
      }
    }
    if (!languages || !languages[0]) return;
    this.store.addResource(languages[0], namespace, key, fallbackValue);
  }
}

const get = () => ({
  debug: false,
  initAsync: true,
  ns: ['translation'],
  defaultNS: ['translation'],
  fallbackLng: ['dev'],
  fallbackNS: false,
  supportedLngs: false,
  nonExplicitSupportedLngs: false,
  load: 'all',
  preload: false,
  simplifyPluralSuffix: true,
  keySeparator: '.',
  nsSeparator: ':',
  pluralSeparator: '_',
  contextSeparator: '_',
  partialBundledLanguages: false,
  saveMissing: false,
  updateMissing: false,
  saveMissingTo: 'fallback',
  saveMissingPlurals: true,
  missingKeyHandler: false,
  missingInterpolationHandler: false,
  postProcess: false,
  postProcessPassResolved: false,
  returnNull: false,
  returnEmptyString: true,
  returnObjects: false,
  joinArrays: false,
  returnedObjectHandler: false,
  parseMissingKeyHandler: false,
  appendNamespaceToMissingKey: false,
  appendNamespaceToCIMode: false,
  overloadTranslationOptionHandler: args => {
    let ret = {};
    if (typeof args[1] === 'object') ret = args[1];
    if (isString(args[1])) ret.defaultValue = args[1];
    if (isString(args[2])) ret.tDescription = args[2];
    if (typeof args[2] === 'object' || typeof args[3] === 'object') {
      const options = args[3] || args[2];
      Object.keys(options).forEach(key => {
        ret[key] = options[key];
      });
    }
    return ret;
  },
  interpolation: {
    escapeValue: true,
    format: value => value,
    prefix: '{{',
    suffix: '}}',
    formatSeparator: ',',
    unescapePrefix: '-',
    nestingPrefix: '$t(',
    nestingSuffix: ')',
    nestingOptionsSeparator: ',',
    maxReplaces: 1000,
    skipOnVariables: true
  },
  cacheInBuiltFormats: true
});
const transformOptions = options => {
  if (isString(options.ns)) options.ns = [options.ns];
  if (isString(options.fallbackLng)) options.fallbackLng = [options.fallbackLng];
  if (isString(options.fallbackNS)) options.fallbackNS = [options.fallbackNS];
  if (options.supportedLngs?.indexOf?.('cimode') < 0) {
    options.supportedLngs = options.supportedLngs.concat(['cimode']);
  }
  if (typeof options.initImmediate === 'boolean') options.initAsync = options.initImmediate;
  return options;
};

const noop = () => {};
const bindMemberFunctions = inst => {
  const mems = Object.getOwnPropertyNames(Object.getPrototypeOf(inst));
  mems.forEach(mem => {
    if (typeof inst[mem] === 'function') {
      inst[mem] = inst[mem].bind(inst);
    }
  });
};
class I18n extends EventEmitter {
  constructor(options = {}, callback) {
    super();
    this.options = transformOptions(options);
    this.services = {};
    this.logger = baseLogger;
    this.modules = {
      external: []
    };
    bindMemberFunctions(this);
    if (callback && !this.isInitialized && !options.isClone) {
      if (!this.options.initAsync) {
        this.init(options, callback);
        return this;
      }
      setTimeout(() => {
        this.init(options, callback);
      }, 0);
    }
  }
  init(options = {}, callback) {
    this.isInitializing = true;
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    if (options.defaultNS == null && options.ns) {
      if (isString(options.ns)) {
        options.defaultNS = options.ns;
      } else if (options.ns.indexOf('translation') < 0) {
        options.defaultNS = options.ns[0];
      }
    }
    const defOpts = get();
    this.options = {
      ...defOpts,
      ...this.options,
      ...transformOptions(options)
    };
    this.options.interpolation = {
      ...defOpts.interpolation,
      ...this.options.interpolation
    };
    if (options.keySeparator !== undefined) {
      this.options.userDefinedKeySeparator = options.keySeparator;
    }
    if (options.nsSeparator !== undefined) {
      this.options.userDefinedNsSeparator = options.nsSeparator;
    }
    const createClassOnDemand = ClassOrObject => {
      if (!ClassOrObject) return null;
      if (typeof ClassOrObject === 'function') return new ClassOrObject();
      return ClassOrObject;
    };
    if (!this.options.isClone) {
      if (this.modules.logger) {
        baseLogger.init(createClassOnDemand(this.modules.logger), this.options);
      } else {
        baseLogger.init(null, this.options);
      }
      let formatter;
      if (this.modules.formatter) {
        formatter = this.modules.formatter;
      } else {
        formatter = Formatter;
      }
      const lu = new LanguageUtil(this.options);
      this.store = new ResourceStore(this.options.resources, this.options);
      const s = this.services;
      s.logger = baseLogger;
      s.resourceStore = this.store;
      s.languageUtils = lu;
      s.pluralResolver = new PluralResolver(lu, {
        prepend: this.options.pluralSeparator,
        simplifyPluralSuffix: this.options.simplifyPluralSuffix
      });
      const usingLegacyFormatFunction = this.options.interpolation.format && this.options.interpolation.format !== defOpts.interpolation.format;
      if (usingLegacyFormatFunction) {
        this.logger.warn(`init: you are still using the legacy format function, please use the new approach: https://www.i18next.com/translation-function/formatting`);
      }
      if (formatter && (!this.options.interpolation.format || this.options.interpolation.format === defOpts.interpolation.format)) {
        s.formatter = createClassOnDemand(formatter);
        if (s.formatter.init) s.formatter.init(s, this.options);
        this.options.interpolation.format = s.formatter.format.bind(s.formatter);
      }
      s.interpolator = new Interpolator(this.options);
      s.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      };
      s.backendConnector = new Connector(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
      s.backendConnector.on('*', (event, ...args) => {
        this.emit(event, ...args);
      });
      if (this.modules.languageDetector) {
        s.languageDetector = createClassOnDemand(this.modules.languageDetector);
        if (s.languageDetector.init) s.languageDetector.init(s, this.options.detection, this.options);
      }
      if (this.modules.i18nFormat) {
        s.i18nFormat = createClassOnDemand(this.modules.i18nFormat);
        if (s.i18nFormat.init) s.i18nFormat.init(this);
      }
      this.translator = new Translator(this.services, this.options);
      this.translator.on('*', (event, ...args) => {
        this.emit(event, ...args);
      });
      this.modules.external.forEach(m => {
        if (m.init) m.init(this);
      });
    }
    this.format = this.options.interpolation.format;
    if (!callback) callback = noop;
    if (this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
      const codes = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
      if (codes.length > 0 && codes[0] !== 'dev') this.options.lng = codes[0];
    }
    if (!this.services.languageDetector && !this.options.lng) {
      this.logger.warn('init: no languageDetector is used and no lng is defined');
    }
    const storeApi = ['getResource', 'hasResourceBundle', 'getResourceBundle', 'getDataByLanguage'];
    storeApi.forEach(fcName => {
      this[fcName] = (...args) => this.store[fcName](...args);
    });
    const storeApiChained = ['addResource', 'addResources', 'addResourceBundle', 'removeResourceBundle'];
    storeApiChained.forEach(fcName => {
      this[fcName] = (...args) => {
        this.store[fcName](...args);
        return this;
      };
    });
    const deferred = defer();
    const load = () => {
      const finish = (err, t) => {
        this.isInitializing = false;
        if (this.isInitialized && !this.initializedStoreOnce) this.logger.warn('init: i18next is already initialized. You should call init just once!');
        this.isInitialized = true;
        if (!this.options.isClone) this.logger.log('initialized', this.options);
        this.emit('initialized', this.options);
        deferred.resolve(t);
        callback(err, t);
      };
      if (this.languages && !this.isInitialized) return finish(null, this.t.bind(this));
      this.changeLanguage(this.options.lng, finish);
    };
    if (this.options.resources || !this.options.initAsync) {
      load();
    } else {
      setTimeout(load, 0);
    }
    return deferred;
  }
  loadResources(language, callback = noop) {
    let usedCallback = callback;
    const usedLng = isString(language) ? language : this.language;
    if (typeof language === 'function') usedCallback = language;
    if (!this.options.resources || this.options.partialBundledLanguages) {
      if (usedLng?.toLowerCase() === 'cimode' && (!this.options.preload || this.options.preload.length === 0)) return usedCallback();
      const toLoad = [];
      const append = lng => {
        if (!lng) return;
        if (lng === 'cimode') return;
        const lngs = this.services.languageUtils.toResolveHierarchy(lng);
        lngs.forEach(l => {
          if (l === 'cimode') return;
          if (toLoad.indexOf(l) < 0) toLoad.push(l);
        });
      };
      if (!usedLng) {
        const fallbacks = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
        fallbacks.forEach(l => append(l));
      } else {
        append(usedLng);
      }
      this.options.preload?.forEach?.(l => append(l));
      this.services.backendConnector.load(toLoad, this.options.ns, e => {
        if (!e && !this.resolvedLanguage && this.language) this.setResolvedLanguage(this.language);
        usedCallback(e);
      });
    } else {
      usedCallback(null);
    }
  }
  reloadResources(lngs, ns, callback) {
    const deferred = defer();
    if (typeof lngs === 'function') {
      callback = lngs;
      lngs = undefined;
    }
    if (typeof ns === 'function') {
      callback = ns;
      ns = undefined;
    }
    if (!lngs) lngs = this.languages;
    if (!ns) ns = this.options.ns;
    if (!callback) callback = noop;
    this.services.backendConnector.reload(lngs, ns, err => {
      deferred.resolve();
      callback(err);
    });
    return deferred;
  }
  use(module) {
    if (!module) throw new Error('You are passing an undefined module! Please check the object you are passing to i18next.use()');
    if (!module.type) throw new Error('You are passing a wrong module! Please check the object you are passing to i18next.use()');
    if (module.type === 'backend') {
      this.modules.backend = module;
    }
    if (module.type === 'logger' || module.log && module.warn && module.error) {
      this.modules.logger = module;
    }
    if (module.type === 'languageDetector') {
      this.modules.languageDetector = module;
    }
    if (module.type === 'i18nFormat') {
      this.modules.i18nFormat = module;
    }
    if (module.type === 'postProcessor') {
      postProcessor.addPostProcessor(module);
    }
    if (module.type === 'formatter') {
      this.modules.formatter = module;
    }
    if (module.type === '3rdParty') {
      this.modules.external.push(module);
    }
    return this;
  }
  setResolvedLanguage(l) {
    if (!l || !this.languages) return;
    if (['cimode', 'dev'].indexOf(l) > -1) return;
    for (let li = 0; li < this.languages.length; li++) {
      const lngInLngs = this.languages[li];
      if (['cimode', 'dev'].indexOf(lngInLngs) > -1) continue;
      if (this.store.hasLanguageSomeTranslations(lngInLngs)) {
        this.resolvedLanguage = lngInLngs;
        break;
      }
    }
    if (!this.resolvedLanguage && this.languages.indexOf(l) < 0 && this.store.hasLanguageSomeTranslations(l)) {
      this.resolvedLanguage = l;
      this.languages.unshift(l);
    }
  }
  changeLanguage(lng, callback) {
    this.isLanguageChangingTo = lng;
    const deferred = defer();
    this.emit('languageChanging', lng);
    const setLngProps = l => {
      this.language = l;
      this.languages = this.services.languageUtils.toResolveHierarchy(l);
      this.resolvedLanguage = undefined;
      this.setResolvedLanguage(l);
    };
    const done = (err, l) => {
      if (l) {
        if (this.isLanguageChangingTo === lng) {
          setLngProps(l);
          this.translator.changeLanguage(l);
          this.isLanguageChangingTo = undefined;
          this.emit('languageChanged', l);
          this.logger.log('languageChanged', l);
        }
      } else {
        this.isLanguageChangingTo = undefined;
      }
      deferred.resolve((...args) => this.t(...args));
      if (callback) callback(err, (...args) => this.t(...args));
    };
    const setLng = lngs => {
      if (!lng && !lngs && this.services.languageDetector) lngs = [];
      const fl = isString(lngs) ? lngs : lngs && lngs[0];
      const l = this.store.hasLanguageSomeTranslations(fl) ? fl : this.services.languageUtils.getBestMatchFromCodes(isString(lngs) ? [lngs] : lngs);
      if (l) {
        if (!this.language) {
          setLngProps(l);
        }
        if (!this.translator.language) this.translator.changeLanguage(l);
        this.services.languageDetector?.cacheUserLanguage?.(l);
      }
      this.loadResources(l, err => {
        done(err, l);
      });
    };
    if (!lng && this.services.languageDetector && !this.services.languageDetector.async) {
      setLng(this.services.languageDetector.detect());
    } else if (!lng && this.services.languageDetector && this.services.languageDetector.async) {
      if (this.services.languageDetector.detect.length === 0) {
        this.services.languageDetector.detect().then(setLng);
      } else {
        this.services.languageDetector.detect(setLng);
      }
    } else {
      setLng(lng);
    }
    return deferred;
  }
  getFixedT(lng, ns, keyPrefix) {
    const fixedT = (key, opts, ...rest) => {
      let o;
      if (typeof opts !== 'object') {
        o = this.options.overloadTranslationOptionHandler([key, opts].concat(rest));
      } else {
        o = {
          ...opts
        };
      }
      o.lng = o.lng || fixedT.lng;
      o.lngs = o.lngs || fixedT.lngs;
      o.ns = o.ns || fixedT.ns;
      if (o.keyPrefix !== '') o.keyPrefix = o.keyPrefix || keyPrefix || fixedT.keyPrefix;
      const keySeparator = this.options.keySeparator || '.';
      let resultKey;
      if (o.keyPrefix && Array.isArray(key)) {
        resultKey = key.map(k => `${o.keyPrefix}${keySeparator}${k}`);
      } else {
        resultKey = o.keyPrefix ? `${o.keyPrefix}${keySeparator}${key}` : key;
      }
      return this.t(resultKey, o);
    };
    if (isString(lng)) {
      fixedT.lng = lng;
    } else {
      fixedT.lngs = lng;
    }
    fixedT.ns = ns;
    fixedT.keyPrefix = keyPrefix;
    return fixedT;
  }
  t(...args) {
    return this.translator?.translate(...args);
  }
  exists(...args) {
    return this.translator?.exists(...args);
  }
  setDefaultNamespace(ns) {
    this.options.defaultNS = ns;
  }
  hasLoadedNamespace(ns, options = {}) {
    if (!this.isInitialized) {
      this.logger.warn('hasLoadedNamespace: i18next was not initialized', this.languages);
      return false;
    }
    if (!this.languages || !this.languages.length) {
      this.logger.warn('hasLoadedNamespace: i18n.languages were undefined or empty', this.languages);
      return false;
    }
    const lng = options.lng || this.resolvedLanguage || this.languages[0];
    const fallbackLng = this.options ? this.options.fallbackLng : false;
    const lastLng = this.languages[this.languages.length - 1];
    if (lng.toLowerCase() === 'cimode') return true;
    const loadNotPending = (l, n) => {
      const loadState = this.services.backendConnector.state[`${l}|${n}`];
      return loadState === -1 || loadState === 0 || loadState === 2;
    };
    if (options.precheck) {
      const preResult = options.precheck(this, loadNotPending);
      if (preResult !== undefined) return preResult;
    }
    if (this.hasResourceBundle(lng, ns)) return true;
    if (!this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages) return true;
    if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns))) return true;
    return false;
  }
  loadNamespaces(ns, callback) {
    const deferred = defer();
    if (!this.options.ns) {
      if (callback) callback();
      return Promise.resolve();
    }
    if (isString(ns)) ns = [ns];
    ns.forEach(n => {
      if (this.options.ns.indexOf(n) < 0) this.options.ns.push(n);
    });
    this.loadResources(err => {
      deferred.resolve();
      if (callback) callback(err);
    });
    return deferred;
  }
  loadLanguages(lngs, callback) {
    const deferred = defer();
    if (isString(lngs)) lngs = [lngs];
    const preloaded = this.options.preload || [];
    const newLngs = lngs.filter(lng => preloaded.indexOf(lng) < 0 && this.services.languageUtils.isSupportedCode(lng));
    if (!newLngs.length) {
      if (callback) callback();
      return Promise.resolve();
    }
    this.options.preload = preloaded.concat(newLngs);
    this.loadResources(err => {
      deferred.resolve();
      if (callback) callback(err);
    });
    return deferred;
  }
  dir(lng) {
    if (!lng) lng = this.resolvedLanguage || (this.languages?.length > 0 ? this.languages[0] : this.language);
    if (!lng) return 'rtl';
    try {
      const l = new Intl.Locale(lng);
      if (l && l.getTextInfo) {
        const ti = l.getTextInfo();
        if (ti && ti.direction) return ti.direction;
      }
    } catch (e) {}
    const rtlLngs = ['ar', 'shu', 'sqr', 'ssh', 'xaa', 'yhd', 'yud', 'aao', 'abh', 'abv', 'acm', 'acq', 'acw', 'acx', 'acy', 'adf', 'ads', 'aeb', 'aec', 'afb', 'ajp', 'apc', 'apd', 'arb', 'arq', 'ars', 'ary', 'arz', 'auz', 'avl', 'ayh', 'ayl', 'ayn', 'ayp', 'bbz', 'pga', 'he', 'iw', 'ps', 'pbt', 'pbu', 'pst', 'prp', 'prd', 'ug', 'ur', 'ydd', 'yds', 'yih', 'ji', 'yi', 'hbo', 'men', 'xmn', 'fa', 'jpr', 'peo', 'pes', 'prs', 'dv', 'sam', 'ckb'];
    const languageUtils = this.services?.languageUtils || new LanguageUtil(get());
    if (lng.toLowerCase().indexOf('-latn') > 1) return 'ltr';
    return rtlLngs.indexOf(languageUtils.getLanguagePartFromCode(lng)) > -1 || lng.toLowerCase().indexOf('-arab') > 1 ? 'rtl' : 'ltr';
  }
  static createInstance(options = {}, callback) {
    return new I18n(options, callback);
  }
  cloneInstance(options = {}, callback = noop) {
    const forkResourceStore = options.forkResourceStore;
    if (forkResourceStore) delete options.forkResourceStore;
    const mergedOptions = {
      ...this.options,
      ...options,
      ...{
        isClone: true
      }
    };
    const clone = new I18n(mergedOptions);
    if (options.debug !== undefined || options.prefix !== undefined) {
      clone.logger = clone.logger.clone(options);
    }
    const membersToCopy = ['store', 'services', 'language'];
    membersToCopy.forEach(m => {
      clone[m] = this[m];
    });
    clone.services = {
      ...this.services
    };
    clone.services.utils = {
      hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
    };
    if (forkResourceStore) {
      const clonedData = Object.keys(this.store.data).reduce((prev, l) => {
        prev[l] = {
          ...this.store.data[l]
        };
        prev[l] = Object.keys(prev[l]).reduce((acc, n) => {
          acc[n] = {
            ...prev[l][n]
          };
          return acc;
        }, prev[l]);
        return prev;
      }, {});
      clone.store = new ResourceStore(clonedData, mergedOptions);
      clone.services.resourceStore = clone.store;
    }
    clone.translator = new Translator(clone.services, mergedOptions);
    clone.translator.on('*', (event, ...args) => {
      clone.emit(event, ...args);
    });
    clone.init(mergedOptions, callback);
    clone.translator.options = mergedOptions;
    clone.translator.backendConnector.services.utils = {
      hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
    };
    return clone;
  }
  toJSON() {
    return {
      options: this.options,
      store: this.store,
      language: this.language,
      languages: this.languages,
      resolvedLanguage: this.resolvedLanguage
    };
  }
}
const instance = I18n.createInstance();
instance.createInstance = I18n.createInstance;

instance.createInstance;
instance.dir;
instance.init;
instance.loadResources;
instance.reloadResources;
instance.use;
instance.changeLanguage;
instance.getFixedT;
instance.t;
instance.exists;
instance.setDefaultNamespace;
instance.hasLoadedNamespace;
instance.loadNamespaces;
instance.loadLanguages;

const {
  slice,
  forEach
} = [];
function defaults(obj) {
  forEach.call(slice.call(arguments, 1), source => {
    if (source) {
      for (const prop in source) {
        if (obj[prop] === undefined) obj[prop] = source[prop];
      }
    }
  });
  return obj;
}
function hasXSS(input) {
  if (typeof input !== 'string') return false;

  // Common XSS attack patterns
  const xssPatterns = [/<\s*script.*?>/i, /<\s*\/\s*script\s*>/i, /<\s*img.*?on\w+\s*=/i, /<\s*\w+\s*on\w+\s*=.*?>/i, /javascript\s*:/i, /vbscript\s*:/i, /expression\s*\(/i, /eval\s*\(/i, /alert\s*\(/i, /document\.cookie/i, /document\.write\s*\(/i, /window\.location/i, /innerHTML/i];
  return xssPatterns.some(pattern => pattern.test(input));
}

// eslint-disable-next-line no-control-regex
const fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
const serializeCookie = function (name, val) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    path: '/'
  };
  const opt = options;
  const value = encodeURIComponent(val);
  let str = `${name}=${value}`;
  if (opt.maxAge > 0) {
    const maxAge = opt.maxAge - 0;
    if (Number.isNaN(maxAge)) throw new Error('maxAge should be a Number');
    str += `; Max-Age=${Math.floor(maxAge)}`;
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }
    str += `; Domain=${opt.domain}`;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }
    str += `; Path=${opt.path}`;
  }
  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== 'function') {
      throw new TypeError('option expires is invalid');
    }
    str += `; Expires=${opt.expires.toUTCString()}`;
  }
  if (opt.httpOnly) str += '; HttpOnly';
  if (opt.secure) str += '; Secure';
  if (opt.sameSite) {
    const sameSite = typeof opt.sameSite === 'string' ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += '; SameSite=Strict';
        break;
      case 'lax':
        str += '; SameSite=Lax';
        break;
      case 'strict':
        str += '; SameSite=Strict';
        break;
      case 'none':
        str += '; SameSite=None';
        break;
      default:
        throw new TypeError('option sameSite is invalid');
    }
  }
  if (opt.partitioned) str += '; Partitioned';
  return str;
};
const cookie = {
  create(name, value, minutes, domain) {
    let cookieOptions = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
      path: '/',
      sameSite: 'strict'
    };
    if (minutes) {
      cookieOptions.expires = new Date();
      cookieOptions.expires.setTime(cookieOptions.expires.getTime() + minutes * 60 * 1000);
    }
    if (domain) cookieOptions.domain = domain;
    document.cookie = serializeCookie(name, value, cookieOptions);
  },
  read(name) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  remove(name, domain) {
    this.create(name, '', -1, domain);
  }
};
var cookie$1 = {
  name: 'cookie',
  // Deconstruct the options object and extract the lookupCookie property
  lookup(_ref) {
    let {
      lookupCookie
    } = _ref;
    if (lookupCookie && typeof document !== 'undefined') {
      return cookie.read(lookupCookie) || undefined;
    }
    return undefined;
  },
  // Deconstruct the options object and extract the lookupCookie, cookieMinutes, cookieDomain, and cookieOptions properties
  cacheUserLanguage(lng, _ref2) {
    let {
      lookupCookie,
      cookieMinutes,
      cookieDomain,
      cookieOptions
    } = _ref2;
    if (lookupCookie && typeof document !== 'undefined') {
      cookie.create(lookupCookie, lng, cookieMinutes, cookieDomain, cookieOptions);
    }
  }
};

var querystring = {
  name: 'querystring',
  // Deconstruct the options object and extract the lookupQuerystring property
  lookup(_ref) {
    let {
      lookupQuerystring
    } = _ref;
    let found;
    if (typeof window !== 'undefined') {
      let {
        search
      } = window.location;
      if (!window.location.search && window.location.hash?.indexOf('?') > -1) {
        search = window.location.hash.substring(window.location.hash.indexOf('?'));
      }
      const query = search.substring(1);
      const params = query.split('&');
      for (let i = 0; i < params.length; i++) {
        const pos = params[i].indexOf('=');
        if (pos > 0) {
          const key = params[i].substring(0, pos);
          if (key === lookupQuerystring) {
            found = params[i].substring(pos + 1);
          }
        }
      }
    }
    return found;
  }
};

var hash = {
  name: 'hash',
  // Deconstruct the options object and extract the lookupHash property and the lookupFromHashIndex property
  lookup(_ref) {
    let {
      lookupHash,
      lookupFromHashIndex
    } = _ref;
    let found;
    if (typeof window !== 'undefined') {
      const {
        hash
      } = window.location;
      if (hash && hash.length > 2) {
        const query = hash.substring(1);
        if (lookupHash) {
          const params = query.split('&');
          for (let i = 0; i < params.length; i++) {
            const pos = params[i].indexOf('=');
            if (pos > 0) {
              const key = params[i].substring(0, pos);
              if (key === lookupHash) {
                found = params[i].substring(pos + 1);
              }
            }
          }
        }
        if (found) return found;
        if (!found && lookupFromHashIndex > -1) {
          const language = hash.match(/\/([a-zA-Z-]*)/g);
          if (!Array.isArray(language)) return undefined;
          const index = typeof lookupFromHashIndex === 'number' ? lookupFromHashIndex : 0;
          return language[index]?.replace('/', '');
        }
      }
    }
    return found;
  }
};

let hasLocalStorageSupport = null;
const localStorageAvailable = () => {
  if (hasLocalStorageSupport !== null) return hasLocalStorageSupport;
  try {
    hasLocalStorageSupport = typeof window !== 'undefined' && window.localStorage !== null;
    if (!hasLocalStorageSupport) {
      return false;
    }
    const testKey = 'i18next.translate.boo';
    window.localStorage.setItem(testKey, 'foo');
    window.localStorage.removeItem(testKey);
  } catch (e) {
    hasLocalStorageSupport = false;
  }
  return hasLocalStorageSupport;
};
var localStorage$1 = {
  name: 'localStorage',
  // Deconstruct the options object and extract the lookupLocalStorage property
  lookup(_ref) {
    let {
      lookupLocalStorage
    } = _ref;
    if (lookupLocalStorage && localStorageAvailable()) {
      return window.localStorage.getItem(lookupLocalStorage) || undefined; // Undefined ensures type consistency with the previous version of this function
    }
    return undefined;
  },
  // Deconstruct the options object and extract the lookupLocalStorage property
  cacheUserLanguage(lng, _ref2) {
    let {
      lookupLocalStorage
    } = _ref2;
    if (lookupLocalStorage && localStorageAvailable()) {
      window.localStorage.setItem(lookupLocalStorage, lng);
    }
  }
};

let hasSessionStorageSupport = null;
const sessionStorageAvailable = () => {
  if (hasSessionStorageSupport !== null) return hasSessionStorageSupport;
  try {
    hasSessionStorageSupport = typeof window !== 'undefined' && window.sessionStorage !== null;
    if (!hasSessionStorageSupport) {
      return false;
    }
    const testKey = 'i18next.translate.boo';
    window.sessionStorage.setItem(testKey, 'foo');
    window.sessionStorage.removeItem(testKey);
  } catch (e) {
    hasSessionStorageSupport = false;
  }
  return hasSessionStorageSupport;
};
var sessionStorage = {
  name: 'sessionStorage',
  lookup(_ref) {
    let {
      lookupSessionStorage
    } = _ref;
    if (lookupSessionStorage && sessionStorageAvailable()) {
      return window.sessionStorage.getItem(lookupSessionStorage) || undefined;
    }
    return undefined;
  },
  cacheUserLanguage(lng, _ref2) {
    let {
      lookupSessionStorage
    } = _ref2;
    if (lookupSessionStorage && sessionStorageAvailable()) {
      window.sessionStorage.setItem(lookupSessionStorage, lng);
    }
  }
};

var navigator$1 = {
  name: 'navigator',
  lookup(options) {
    const found = [];
    if (typeof navigator !== 'undefined') {
      const {
        languages,
        userLanguage,
        language
      } = navigator;
      if (languages) {
        // chrome only; not an array, so can't use .push.apply instead of iterating
        for (let i = 0; i < languages.length; i++) {
          found.push(languages[i]);
        }
      }
      if (userLanguage) {
        found.push(userLanguage);
      }
      if (language) {
        found.push(language);
      }
    }
    return found.length > 0 ? found : undefined;
  }
};

var htmlTag = {
  name: 'htmlTag',
  // Deconstruct the options object and extract the htmlTag property
  lookup(_ref) {
    let {
      htmlTag
    } = _ref;
    let found;
    const internalHtmlTag = htmlTag || (typeof document !== 'undefined' ? document.documentElement : null);
    if (internalHtmlTag && typeof internalHtmlTag.getAttribute === 'function') {
      found = internalHtmlTag.getAttribute('lang');
    }
    return found;
  }
};

var path = {
  name: 'path',
  // Deconstruct the options object and extract the lookupFromPathIndex property
  lookup(_ref) {
    let {
      lookupFromPathIndex
    } = _ref;
    if (typeof window === 'undefined') return undefined;
    const language = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
    if (!Array.isArray(language)) return undefined;
    const index = typeof lookupFromPathIndex === 'number' ? lookupFromPathIndex : 0;
    return language[index]?.replace('/', '');
  }
};

var subdomain = {
  name: 'subdomain',
  lookup(_ref) {
    let {
      lookupFromSubdomainIndex
    } = _ref;
    // If given get the subdomain index else 1
    const internalLookupFromSubdomainIndex = typeof lookupFromSubdomainIndex === 'number' ? lookupFromSubdomainIndex + 1 : 1;
    // get all matches if window.location. is existing
    // first item of match is the match itself and the second is the first group match which should be the first subdomain match
    // is the hostname no public domain get the or option of localhost
    const language = typeof window !== 'undefined' && window.location?.hostname?.match(/^(\w{2,5})\.(([a-z0-9-]{1,63}\.[a-z]{2,6})|localhost)/i);

    // if there is no match (null) return undefined
    if (!language) return undefined;
    // return the given group match
    return language[internalLookupFromSubdomainIndex];
  }
};

// some environments, throws when accessing document.cookie
let canCookies = false;
try {
  // eslint-disable-next-line no-unused-expressions
  document.cookie;
  canCookies = true;
  // eslint-disable-next-line no-empty
} catch (e) {}
const order = ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'];
if (!canCookies) order.splice(1, 1);
const getDefaults = () => ({
  order,
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupSessionStorage: 'i18nextLng',
  // cache user language
  caches: ['localStorage'],
  excludeCacheFor: ['cimode'],
  // cookieMinutes: 10,
  // cookieDomain: 'myDomain'

  convertDetectedLanguage: l => l
});
class Browser {
  constructor(services) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.type = 'languageDetector';
    this.detectors = {};
    this.init(services, options);
  }
  init() {
    let services = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      languageUtils: {}
    };
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let i18nOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    this.services = services;
    this.options = defaults(options, this.options || {}, getDefaults());
    if (typeof this.options.convertDetectedLanguage === 'string' && this.options.convertDetectedLanguage.indexOf('15897') > -1) {
      this.options.convertDetectedLanguage = l => l.replace('-', '_');
    }

    // backwards compatibility
    if (this.options.lookupFromUrlIndex) this.options.lookupFromPathIndex = this.options.lookupFromUrlIndex;
    this.i18nOptions = i18nOptions;
    this.addDetector(cookie$1);
    this.addDetector(querystring);
    this.addDetector(localStorage$1);
    this.addDetector(sessionStorage);
    this.addDetector(navigator$1);
    this.addDetector(htmlTag);
    this.addDetector(path);
    this.addDetector(subdomain);
    this.addDetector(hash);
  }
  addDetector(detector) {
    this.detectors[detector.name] = detector;
    return this;
  }
  detect() {
    let detectionOrder = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options.order;
    let detected = [];
    detectionOrder.forEach(detectorName => {
      if (this.detectors[detectorName]) {
        let lookup = this.detectors[detectorName].lookup(this.options);
        if (lookup && typeof lookup === 'string') lookup = [lookup];
        if (lookup) detected = detected.concat(lookup);
      }
    });
    detected = detected.filter(d => d !== undefined && d !== null && !hasXSS(d)).map(d => this.options.convertDetectedLanguage(d));
    if (this.services && this.services.languageUtils && this.services.languageUtils.getBestMatchFromCodes) return detected; // new i18next v19.5.0
    return detected.length > 0 ? detected[0] : null; // a little backward compatibility
  }
  cacheUserLanguage(lng) {
    let caches = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.options.caches;
    if (!caches) return;
    if (this.options.excludeCacheFor && this.options.excludeCacheFor.indexOf(lng) > -1) return;
    caches.forEach(cacheName => {
      if (this.detectors[cacheName]) this.detectors[cacheName].cacheUserLanguage(lng, this.options);
    });
  }
}
Browser.type = 'languageDetector';

var common$1 = {
	loading: "Loading...",
	error: "Error",
	success: "Success",
	cancel: "Cancel",
	confirm: "Confirm",
	save: "Save",
	"delete": "Delete",
	edit: "Edit",
	add: "Add",
	search: "Search",
	close: "Close",
	back: "Back",
	next: "Next",
	previous: "Previous",
	submit: "Submit",
	reset: "Reset"
};
var button$1 = {
	primary: "Primary Button",
	secondary: "Secondary Button",
	outline: "Outline Button",
	text: "Text Button",
	small: "Small",
	medium: "Medium",
	large: "Large",
	disabled: "Disabled"
};
var navigation$1 = {
	home: "Home",
	about: "About",
	contact: "Contact",
	services: "Services",
	products: "Products"
};
var form$1 = {
	required: "This field is required",
	email: "Please enter a valid email address",
	password: "Password must be at least 8 characters",
	confirmPassword: "Passwords do not match",
	name: "Name",
	phone: "Phone Number",
	address: "Address"
};
var message$1 = {
	welcome: "Welcome to {{name}}",
	goodbye: "Goodbye, {{name}}!",
	itemCount: "You have {{count}} item",
	itemCount_plural: "You have {{count}} items"
};
var input$1 = {
	small: "Small Input",
	medium: "Medium Input",
	large: "Large Input"
};
var en = {
	common: common$1,
	button: button$1,
	navigation: navigation$1,
	form: form$1,
	message: message$1,
	input: input$1
};

var common = {
	loading: "加载中...",
	error: "错误",
	success: "成功",
	cancel: "取消",
	confirm: "确认",
	save: "保存",
	"delete": "删除",
	edit: "编辑",
	add: "添加",
	search: "搜索",
	close: "关闭",
	back: "返回",
	next: "下一步",
	previous: "上一步",
	submit: "提交",
	reset: "重置"
};
var button = {
	primary: "主要按钮",
	secondary: "次要按钮",
	outline: "边框按钮",
	text: "文本按钮",
	small: "小号",
	medium: "中号",
	large: "大号",
	disabled: "禁用"
};
var navigation = {
	home: "首页",
	about: "关于我们",
	contact: "联系我们",
	services: "服务",
	products: "产品"
};
var form = {
	required: "此字段为必填项",
	email: "请输入有效的邮箱地址",
	password: "密码至少需要8个字符",
	confirmPassword: "密码不匹配",
	name: "姓名",
	phone: "电话号码",
	address: "地址"
};
var message = {
	welcome: "欢迎来到{{name}}",
	goodbye: "再见，{{name}}！",
	itemCount: "您有{{count}}个项目"
};
var input = {
	small: "小号输入框",
	medium: "中号输入框",
	large: "大号输入框"
};
var zh = {
	common: common,
	button: button,
	navigation: navigation,
	form: form,
	message: message,
	input: input
};

// 支持的语言列表
const supportedLanguages = {
    en: "English",
    zh: "中文",
};
// 语言资源
const resources = {
    en: {
        translation: en,
    },
    zh: {
        translation: zh,
    },
};
instance
    // 检测用户语言
    .use(Browser)
    // 传递 i18n 实例给 react-i18next
    .use(initReactI18next)
    // 初始化 i18next
    .init({
    resources,
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "development",
    interpolation: {
        escapeValue: false, // React 已经默认转义
    },
    detection: {
        order: ["localStorage", "navigator", "htmlTag"],
        caches: ["localStorage"],
    },
});

/**
 * 获取浏览器默认语言
 */
const getBrowserLanguage = () => {
    const browserLang = navigator.language.split('-')[0];
    return (browserLang === 'zh' ? 'zh' : 'en');
};
/**
 * 从本地存储获取保存的语言
 */
const getSavedLanguage = () => {
    try {
        const saved = localStorage.getItem('i18nextLng');
        return saved;
    }
    catch (_a) {
        return null;
    }
};
/**
 * 保存语言到本地存储
 */
const saveLanguage = (language) => {
    try {
        localStorage.setItem('i18nextLng', language);
    }
    catch (_a) {
        // 忽略存储错误
    }
};
/**
 * 格式化数字（考虑不同语言的数字格式）
 */
const formatNumber = (num, language) => {
    const locale = language === 'zh' ? 'zh-CN' : 'en-US';
    return new Intl.NumberFormat(locale).format(num);
};
/**
 * 格式化日期（考虑不同语言的日期格式）
 */
const formatDate = (date, language, options) => {
    const locale = language === 'zh' ? 'zh-CN' : 'en-US';
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return new Intl.DateTimeFormat(locale, Object.assign(Object.assign({}, defaultOptions), options)).format(date);
};
/**
 * 格式化货币（考虑不同语言的货币格式）
 */
const formatCurrency = (amount, language, currency = 'USD') => {
    const locale = language === 'zh' ? 'zh-CN' : 'en-US';
    const currencyCode = language === 'zh' && currency === 'USD' ? 'CNY' : currency;
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
    }).format(amount);
};
/**
 * 获取文本方向（RTL/LTR）
 */
const getTextDirection = (language) => {
    // 目前支持的语言都是 LTR，如果以后添加阿拉伯语等 RTL 语言需要修改
    return 'ltr';
};
/**
 * 检查是否为有效的语言代码
 */
const isValidLanguage = (lang) => {
    return ['en', 'zh'].includes(lang);
};
/**
 * 获取语言的本地化名称
 */
const getLanguageNativeName = (language) => {
    const names = {
        en: 'English',
        zh: '中文',
    };
    return names[language];
};

var styles$9 = {"dropdown":"LanguageSwitcher-module_dropdown__LT1O-","select":"LanguageSwitcher-module_select__LL4YO","buttonGroup":"LanguageSwitcher-module_buttonGroup__YWhtE","indicator":"LanguageSwitcher-module_indicator__RN9Va","languageButton":"LanguageSwitcher-module_languageButton__ZUCZN","active":"LanguageSwitcher-module_active__7Npr-"};

const LanguageSwitcher = ({ className, variant = 'dropdown', }) => {
    const { switchLanguage, currentLanguage } = useLanguageSwitch();
    const handleLanguageChange = (language) => {
        switchLanguage(language);
    };
    const containerRef = React.useRef(null);
    const [indicatorStyle, setIndicatorStyle] = React.useState({});
    const languageEntries = Object.entries(supportedLanguages);
    const currentIndex = languageEntries.findIndex(([code]) => code === currentLanguage);
    React.useEffect(() => {
        if (containerRef.current && variant === 'buttons') {
            const buttons = containerRef.current.querySelectorAll('button');
            const activeButton = buttons[currentIndex];
            if (activeButton) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const buttonRect = activeButton.getBoundingClientRect();
                setIndicatorStyle({
                    width: `${buttonRect.width}px`,
                    transform: `translateX(${buttonRect.left - containerRect.left}px)`,
                });
            }
        }
    }, [currentLanguage, variant, currentIndex]);
    if (variant === 'buttons') {
        return (jsxRuntimeExports.jsxs("div", { ref: containerRef, className: `${styles$9.buttonGroup} ${className || ''}`, children: [jsxRuntimeExports.jsx("div", { className: styles$9.indicator, style: indicatorStyle }), languageEntries.map(([code, name]) => (jsxRuntimeExports.jsx("button", { className: `${styles$9.languageButton} ${currentLanguage === code ? styles$9.active : ''}`, onClick: () => handleLanguageChange(code), type: "button", children: name }, code)))] }));
    }
    return (jsxRuntimeExports.jsx("div", { className: `${styles$9.dropdown} ${className || ''}`, children: jsxRuntimeExports.jsx("select", { value: currentLanguage, onChange: (e) => handleLanguageChange(e.target.value), className: styles$9.select, children: Object.entries(supportedLanguages).map(([code, name]) => (jsxRuntimeExports.jsx("option", { value: code, children: name }, code))) }) }));
};

var styles$8 = {"menu":"Menu-module_menu__ZGJ--","menu-horizontal":"Menu-module_menu-horizontal__sepgv","menuItem":"Menu-module_menuItem__vKvih","active":"Menu-module_active__8g-22","menu-vertical":"Menu-module_menu-vertical__ZU7Yf","theme-light":"Menu-module_theme-light__CMlGr","theme-dark":"Menu-module_theme-dark__GN4M-","theme-glass":"Menu-module_theme-glass__AJYYa","disabled":"Menu-module_disabled__IXs87","danger":"Menu-module_danger__t-0VF","item":"Menu-module_item__S3HKY","item-vertical":"Menu-module_item-vertical__bDGRE","item-dark":"Menu-module_item-dark__mG-BW","item-glass":"Menu-module_item-glass__vvOgm","icon":"Menu-module_icon__XtO-r","label":"Menu-module_label__QMf-9","subMenu":"Menu-module_subMenu__RrWRN","subMenuTitle":"Menu-module_subMenuTitle__MR5Qj","open":"Menu-module_open__iHB1t","arrow":"Menu-module_arrow__ZE4Ag","subMenuList":"Menu-module_subMenuList__oqGX8","subMenuList-light":"Menu-module_subMenuList-light__jYaq0","subMenuList-dark":"Menu-module_subMenuList-dark__eMP7C","subMenuList-glass":"Menu-module_subMenuList-glass__pjNDg","submenu":"Menu-module_submenu__1p11G","submenu-horizontal":"Menu-module_submenu-horizontal__4EWDI","slideDown":"Menu-module_slideDown__k-cSj","submenu-vertical":"Menu-module_submenu-vertical__Od2LN","submenu-inline":"Menu-module_submenu-inline__xaW3E","submenu-dark":"Menu-module_submenu-dark__qCv5P","submenu-glass":"Menu-module_submenu-glass__znOmd","slideUp":"Menu-module_slideUp__fRfHr"};

// 主菜单组件
const Menu = ({ children, className = "", mode = "horizontal", defaultSelectedKey = "", selectedKey: controlledSelectedKey, onSelect, theme = "light", expandIcon, }) => {
    const [internalSelectedKey, setInternalSelectedKey] = React.useState(defaultSelectedKey);
    const [openSubMenus, setOpenSubMenus] = React.useState(new Set());
    const menuRef = React.useRef(null);
    const selectedKey = controlledSelectedKey !== null && controlledSelectedKey !== void 0 ? controlledSelectedKey : internalSelectedKey;
    const menuClasses = [
        styles$8.menu,
        styles$8[`menu-${mode}`],
        styles$8[`theme-${theme}`],
        className
    ].filter(Boolean).join(" ");
    const handleItemClick = React.useCallback((key, onClick) => {
        if (controlledSelectedKey === undefined) {
            setInternalSelectedKey(key);
        }
        onSelect === null || onSelect === void 0 ? void 0 : onSelect(key);
        onClick === null || onClick === void 0 ? void 0 : onClick();
    }, [controlledSelectedKey, onSelect]);
    const handleSubMenuToggle = React.useCallback((key) => {
        setOpenSubMenus(prev => {
            const newSet = new Set(prev);
            if (newSet.has(key)) {
                newSet.delete(key);
            }
            else {
                newSet.add(key);
            }
            return newSet;
        });
    }, []);
    const handleKeyDown = React.useCallback((event) => {
        var _a;
        const { key } = event;
        const menuItems = (_a = menuRef.current) === null || _a === void 0 ? void 0 : _a.querySelectorAll('[role="menuitem"]');
        if (!menuItems)
            return;
        const currentIndex = Array.from(menuItems).findIndex(item => item === document.activeElement);
        let nextIndex = currentIndex;
        switch (key) {
            case 'ArrowDown':
                event.preventDefault();
                nextIndex = mode === 'horizontal' ? currentIndex : (currentIndex + 1) % menuItems.length;
                break;
            case 'ArrowUp':
                event.preventDefault();
                nextIndex = mode === 'horizontal' ? currentIndex : (currentIndex - 1 + menuItems.length) % menuItems.length;
                break;
            case 'ArrowRight':
                event.preventDefault();
                nextIndex = mode === 'horizontal' ? (currentIndex + 1) % menuItems.length : currentIndex;
                break;
            case 'ArrowLeft':
                event.preventDefault();
                nextIndex = mode === 'horizontal' ? (currentIndex - 1 + menuItems.length) % menuItems.length : currentIndex;
                break;
            case 'Home':
                event.preventDefault();
                nextIndex = 0;
                break;
            case 'End':
                event.preventDefault();
                nextIndex = menuItems.length - 1;
                break;
            default:
                return;
        }
        if (nextIndex !== currentIndex) {
            menuItems[nextIndex].focus();
        }
    }, [mode]);
    const renderMenuItems = (items) => {
        return React.Children.map(items, (child) => {
            if (React.isValidElement(child)) {
                if (child.type === MenuItem) {
                    const itemProps = child.props;
                    return React.cloneElement(child, {
                        isActive: itemProps.itemKey === selectedKey,
                        onClick: () => handleItemClick(itemProps.itemKey, itemProps.onClick),
                        mode,
                        theme,
                    });
                }
                if (child.type === SubMenu) {
                    const subMenuProps = child.props;
                    return React.cloneElement(child, {
                        isActive: hasActiveChild(subMenuProps.children, selectedKey),
                        isOpen: openSubMenus.has(subMenuProps.itemKey),
                        onItemSelect: handleItemClick,
                        onToggle: handleSubMenuToggle,
                        mode,
                        theme,
                        expandIcon,
                    });
                }
            }
            return child;
        });
    };
    const hasActiveChild = (children, activeKey) => {
        let hasActive = false;
        React.Children.forEach(children, (child) => {
            if (React.isValidElement(child) && child.type === MenuItem) {
                const itemProps = child.props;
                if (itemProps.itemKey === activeKey) {
                    hasActive = true;
                }
            }
        });
        return hasActive;
    };
    React.useEffect(() => {
        if (controlledSelectedKey !== undefined) {
            setInternalSelectedKey(controlledSelectedKey);
        }
    }, [controlledSelectedKey]);
    return (jsxRuntimeExports.jsx("ul", { ref: menuRef, className: menuClasses, role: "menubar", onKeyDown: handleKeyDown, "aria-orientation": mode === 'horizontal' ? 'horizontal' : 'vertical', children: renderMenuItems(children) }));
};
// 菜单项组件
const MenuItem = ({ children, className = "", onClick, disabled = false, icon, isActive = false, mode = "horizontal", theme = "light", danger = false, }) => {
    const itemClasses = [
        styles$8.menuItem,
        isActive && styles$8.active,
        disabled && styles$8.disabled,
        danger && styles$8.danger,
        styles$8[`item-${mode}`],
        styles$8[`item-${theme}`],
        className
    ].filter(Boolean).join(" ");
    const handleClick = () => {
        if (!disabled) {
            onClick === null || onClick === void 0 ? void 0 : onClick();
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleClick();
        }
    };
    return (jsxRuntimeExports.jsxs("li", { className: itemClasses, onClick: handleClick, onKeyDown: handleKeyDown, role: "menuitem", tabIndex: disabled ? -1 : 0, "aria-disabled": disabled, "aria-current": isActive ? 'page' : undefined, children: [icon && jsxRuntimeExports.jsx("span", { className: styles$8.icon, children: icon }), jsxRuntimeExports.jsx("span", { className: styles$8.label, children: children })] }));
};
// 子菜单组件
const SubMenu = ({ children, title, className = "", itemKey, icon, disabled = false, isActive = false, isOpen = false, onItemSelect, onToggle, mode = "horizontal", theme = "light", expandIcon, }) => {
    const subMenuRef = React.useRef(null);
    const [maxHeight, setMaxHeight] = React.useState('0px');
    const subMenuClasses = [
        styles$8.subMenu,
        isOpen && styles$8.open,
        isActive && styles$8.active,
        disabled && styles$8.disabled,
        styles$8[`submenu-${mode}`],
        styles$8[`submenu-${theme}`],
        className
    ].filter(Boolean).join(" ");
    const handleToggle = () => {
        if (!disabled && onToggle) {
            onToggle(itemKey);
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleToggle();
        }
    };
    React.useEffect(() => {
        if (subMenuRef.current) {
            setMaxHeight(isOpen ? `${subMenuRef.current.scrollHeight}px` : '0px');
        }
    }, [isOpen, children]);
    const renderSubMenuItems = () => {
        return React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === MenuItem) {
                const itemProps = child.props;
                return React.cloneElement(child, {
                    onClick: () => {
                        var _a;
                        onItemSelect === null || onItemSelect === void 0 ? void 0 : onItemSelect(itemProps.itemKey);
                        (_a = itemProps.onClick) === null || _a === void 0 ? void 0 : _a.call(itemProps);
                    },
                    mode,
                    theme,
                });
            }
            return null;
        });
    };
    const defaultExpandIcon = isOpen ? (jsxRuntimeExports.jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "currentColor", children: jsxRuntimeExports.jsx("path", { d: "M2 4l4 4 4-4", stroke: "currentColor", strokeWidth: "1.5", fill: "none", strokeLinecap: "round", strokeLinejoin: "round" }) })) : (jsxRuntimeExports.jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "currentColor", children: jsxRuntimeExports.jsx("path", { d: "M4 2l4 4-4 4", stroke: "currentColor", strokeWidth: "1.5", fill: "none", strokeLinecap: "round", strokeLinejoin: "round" }) }));
    return (jsxRuntimeExports.jsxs("li", { className: subMenuClasses, children: [jsxRuntimeExports.jsxs("div", { className: styles$8.subMenuTitle, onClick: handleToggle, onKeyDown: handleKeyDown, role: "menuitem", tabIndex: disabled ? -1 : 0, "aria-disabled": disabled, "aria-expanded": isOpen, "aria-haspopup": "menu", children: [icon && jsxRuntimeExports.jsx("span", { className: styles$8.icon, children: icon }), jsxRuntimeExports.jsx("span", { className: styles$8.label, children: title }), jsxRuntimeExports.jsx("span", { className: styles$8.arrow, children: expandIcon || defaultExpandIcon })] }), jsxRuntimeExports.jsx("ul", { ref: subMenuRef, className: styles$8.subMenuList, style: { maxHeight }, role: "menu", "aria-hidden": !isOpen, children: renderSubMenuItems() })] }));
};

var styles$7 = {"tabs-container":"Tabs-module_tabs-container__U9u1K","tabs":"Tabs-module_tabs__QzIkz","tab":"Tabs-module_tab__IdDYc","active":"Tabs-module_active__PTNtG","content":"Tabs-module_content__A4evF"};

/**
 * Tab 组件 - 单个标签页
 * @param children 标签页内容
 */
const Tab = ({ children }) => {
    return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: children });
};
/**
 * Tabs 组件 - 标签页容器
 * 支持受控和非受控两种模式
 */
const Tabs = ({ activeKey, children, className, defaultActiveKey, onChange, }) => {
    var _a, _b;
    // 将 children 转换为数组，并保持原始的 key
    const tabs = (_a = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return child;
        }
        return null;
    })) === null || _a === void 0 ? void 0 : _a.filter(Boolean);
    // 获取第一个标签的 key 作为默认值
    const firstTabKey = ((_b = tabs[0]) === null || _b === void 0 ? void 0 : _b.key) || "";
    const [internalActiveKey, setInternalActiveKey] = React.useState(activeKey || defaultActiveKey || firstTabKey);
    // 同步外部 activeKey 和内部状态
    React.useEffect(() => {
        if (activeKey !== undefined && activeKey !== internalActiveKey) {
            setInternalActiveKey(activeKey);
        }
    }, [activeKey, internalActiveKey]);
    const handleTabClick = (key) => {
        // 如果是非受控模式，更新内部状态
        if (activeKey === undefined) {
            setInternalActiveKey(key);
        }
        if (onChange) {
            onChange(key);
        }
    };
    const currentActiveKey = activeKey !== null && activeKey !== void 0 ? activeKey : internalActiveKey;
    const activeTab = tabs.find((tab) => tab.key === currentActiveKey);
    return (jsxRuntimeExports.jsxs("div", { className: `${styles$7['tabs-container']} ${className || ""}`, children: [jsxRuntimeExports.jsx("div", { className: styles$7.tabs, children: tabs.map((tab) => (jsxRuntimeExports.jsx("div", { className: `${styles$7.tab} ${tab.key === currentActiveKey ? styles$7.active : ""}`, onClick: () => handleTabClick(tab.key), children: tab.props.label }, tab.key))) }), jsxRuntimeExports.jsx("div", { className: styles$7.content, children: activeTab && activeTab.props.children })] }));
};

var styles$6 = {"radio":"Radio-module_radio__MfgN-","disabled":"Radio-module_disabled__0-cna","label":"Radio-module_label__vAFIP","radioGroup":"Radio-module_radioGroup__W9xve","vertical":"Radio-module_vertical__WksGU","horizontal":"Radio-module_horizontal__1Ovgu"};

const Radio = ({ children, value, disabled = false, checked, defaultChecked = false, name, onChange, className, }) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    // 受控或非受控模式
    const isChecked = checked !== undefined ? checked : internalChecked;
    const handleChange = (event) => {
        const isChecked = event.target.checked;
        // 非受控模式下更新内部状态
        if (checked === undefined) {
            setInternalChecked(isChecked);
        }
        // 调用外部回调
        if (onChange && isChecked) {
            onChange(value);
        }
    };
    const radioId = React.useId();
    return (jsxRuntimeExports.jsxs("label", { className: `${styles$6.radio} ${disabled ? styles$6.disabled : ""} ${className || ""}`, htmlFor: radioId, children: [jsxRuntimeExports.jsx("input", { id: radioId, type: "radio", value: value, checked: isChecked, disabled: disabled, name: name, onChange: handleChange }), jsxRuntimeExports.jsx("span", { className: styles$6.label, children: children })] }));
};
const RadioGroup = ({ value, defaultValue, name, onChange, disabled = false, className, children, direction = "vertical", }) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || "");
    const groupName = name || React.useId();
    // 受控或非受控模式
    const currentValue = value !== undefined ? value : internalValue;
    const handleChange = (newValue) => {
        // 非受控模式下更新内部状态
        if (value === undefined) {
            setInternalValue(newValue);
        }
        // 调用外部回调
        if (onChange) {
            onChange(newValue);
        }
    };
    const renderChildren = () => {
        return React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === Radio) {
                const radioProps = child.props;
                return React.cloneElement(child, Object.assign(Object.assign({}, radioProps), { name: groupName, checked: currentValue !== "" && radioProps.value === currentValue, disabled: disabled || radioProps.disabled, onChange: handleChange }));
            }
            return child;
        });
    };
    return (jsxRuntimeExports.jsx("div", { className: `${styles$6.radioGroup} ${styles$6[direction]} ${className || ""}`, role: "radiogroup", children: renderChildren() }));
};

var styles$5 = {"switch":"Switch-module_switch__hgdMu","disabled":"Switch-module_disabled__2aZ0V","loading":"Switch-module_loading__9JppX","input":"Switch-module_input__5BPNu","slider":"Switch-module_slider__5suBx","spinner":"Switch-module_spinner__sMDyM","spin":"Switch-module_spin__r-2lA","small":"Switch-module_small__BI6-m","medium":"Switch-module_medium__22u-1","large":"Switch-module_large__Nv-ed","switchWrapper":"Switch-module_switchWrapper__q7qsQ","label-left":"Switch-module_label-left__da-Ux","label-right":"Switch-module_label-right__9wrC2","label":"Switch-module_label__LrH7V"};

const Switch = ({ checked, defaultChecked = false, disabled = false, onChange, className, size = 'medium', children, labelPosition = 'right', loading = false, color, }) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    // 判断是否为受控模式
    const isControlled = checked !== undefined;
    // 受控或非受控模式的当前值
    const isChecked = isControlled ? checked : internalChecked;
    const handleChange = (event) => {
        const newChecked = event.target.checked;
        // 非受控模式下更新内部状态
        if (!isControlled) {
            setInternalChecked(newChecked);
        }
        // 调用外部回调
        if (onChange && !loading) {
            onChange(newChecked);
        }
    };
    const switchId = React.useId();
    const switchElement = (jsxRuntimeExports.jsxs("label", { className: `${styles$5.switch} ${styles$5[size]} ${disabled ? styles$5.disabled : ''} ${loading ? styles$5.loading : ''} ${className || ''}`, htmlFor: switchId, children: [jsxRuntimeExports.jsx("input", { id: switchId, type: "checkbox", checked: isChecked, disabled: disabled || loading, onChange: handleChange, className: styles$5.input, role: "switch", "aria-checked": isChecked ? "true" : "false", "aria-disabled": disabled || loading ? "true" : "false" }), jsxRuntimeExports.jsx("span", { className: styles$5.slider, style: color && isChecked ? { backgroundColor: color } : undefined, children: loading && jsxRuntimeExports.jsx("span", { className: styles$5.spinner }) })] }));
    if (children) {
        return (jsxRuntimeExports.jsxs("div", { className: `${styles$5.switchWrapper} ${styles$5[`label-${labelPosition}`]}`, children: [labelPosition === 'left' && (jsxRuntimeExports.jsx("span", { className: styles$5.label, children: children })), switchElement, labelPosition === 'right' && (jsxRuntimeExports.jsx("span", { className: styles$5.label, children: children }))] }));
    }
    return switchElement;
};

var styles$4 = {"form":"Form-module_form__jNBDR","bordered":"Form-module_bordered__kBopT","vertical":"Form-module_vertical__kme69","formItem":"Form-module_formItem__R7Y1M","horizontal":"Form-module_horizontal__obPd4","label":"Form-module_label__eeQ-m","inline":"Form-module_inline__LBQAv","small":"Form-module_small__AYGfB","medium":"Form-module_medium__10nxr","large":"Form-module_large__mbQ50","error":"Form-module_error__tGSoc","control":"Form-module_control__SeA--","required":"Form-module_required__V5rxn","errorMessage":"Form-module_errorMessage__iI97c","slideInDown":"Form-module_slideInDown__cmiaE","pulse":"Form-module_pulse__qE0es","helpText":"Form-module_helpText__fIhhQ","formActions":"Form-module_formActions__bHjHX","align-left":"Form-module_align-left__kIYC7","align-center":"Form-module_align-center__xH6DF","align-right":"Form-module_align-right__3CC5U","fadeInUp":"Form-module_fadeInUp__O640y"};

const FormItem = ({ label, required = false, error, help, className, children, labelPosition = 'top', }) => {
    const itemId = React.useId();
    return (jsxRuntimeExports.jsxs("div", { className: `${styles$4.formItem} ${styles$4[`label-${labelPosition}`]} ${error ? styles$4.error : ''} ${className || ''}`, children: [label && (jsxRuntimeExports.jsxs("label", { htmlFor: itemId, className: styles$4.label, children: [label, required && jsxRuntimeExports.jsx("span", { className: styles$4.required, children: "*" })] })), jsxRuntimeExports.jsx("div", { className: styles$4.control, children: React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        const additionalProps = {
                            id: itemId,
                        };
                        if (error) {
                            additionalProps['aria-describedby'] = `${itemId}-error`;
                            additionalProps['aria-invalid'] = true;
                        }
                        else if (help) {
                            additionalProps['aria-describedby'] = `${itemId}-help`;
                        }
                        return React.cloneElement(child, additionalProps);
                    }
                    return child;
                }) }), error && (jsxRuntimeExports.jsx("div", { id: `${itemId}-error`, className: styles$4.errorMessage, role: "alert", children: error })), help && !error && (jsxRuntimeExports.jsx("div", { id: `${itemId}-help`, className: styles$4.helpText, children: help }))] }));
};
const Form = ({ onSubmit, layout = 'vertical', className, children, size = 'medium', bordered = true, }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(e);
        }
    };
    return (jsxRuntimeExports.jsx("form", { className: `${styles$4.form} ${styles$4[layout]} ${styles$4[size]} ${bordered ? styles$4.bordered : ''} ${className || ''}`, onSubmit: handleSubmit, noValidate: true, children: children }));
};
const FormActions = ({ align = 'left', className, children, }) => {
    return (jsxRuntimeExports.jsx("div", { className: `${styles$4.formActions} ${styles$4[`align-${align}`]} ${className || ''}`, children: children }));
};

var styles$3 = {"card":"Card-module_card__Cb1o4","bordered":"Card-module_bordered__fBy0-","borderless":"Card-module_borderless__YB3u0","shadow-none":"Card-module_shadow-none__z6-54","shadow-sm":"Card-module_shadow-sm__wDVK9","shadow-md":"Card-module_shadow-md__67vf0","shadow-lg":"Card-module_shadow-lg__64Kwt","shadow-xl":"Card-module_shadow-xl__QOvW4","clickable":"Card-module_clickable__qbwhm","header":"Card-module_header__PTXf2","titleSection":"Card-module_titleSection__sNCOq","icon":"Card-module_icon__jzes9","title":"Card-module_title__mSgoo","actions":"Card-module_actions__AUI-1","content":"Card-module_content__oFIQa","small":"Card-module_small__n-USZ","medium":"Card-module_medium__6Gszi","large":"Card-module_large__CSDTa","default":"Card-module_default__qq3ax","primary":"Card-module_primary__dDgYl","success":"Card-module_success__Numc6","warning":"Card-module_warning__20v4Q","danger":"Card-module_danger__cv1fT","glass":"Card-module_glass__YcnwR","gradient":"Card-module_gradient__oGNK8","loading":"Card-module_loading__pF1ro","loadingOverlay":"Card-module_loadingOverlay__D0ZLN","spinner":"Card-module_spinner__eUbE8","spin":"Card-module_spin__iMQ71","fadeInUp":"Card-module_fadeInUp__hR-uu"};

const Card = ({ title, children, className, size = "medium", type = "default", clickable = false, onClick, bordered = true, shadow = "md", icon, actions, loading = false, }) => {
    const cardClasses = [
        styles$3.card,
        styles$3[size],
        styles$3[type],
        bordered ? styles$3.bordered : styles$3.borderless,
        styles$3[`shadow-${shadow}`],
        clickable ? styles$3.clickable : '',
        loading ? styles$3.loading : '',
        className || ''
    ].filter(Boolean).join(' ');
    return (jsxRuntimeExports.jsxs("div", { className: cardClasses, onClick: clickable ? onClick : undefined, role: clickable ? "button" : undefined, tabIndex: clickable ? 0 : undefined, children: [loading && jsxRuntimeExports.jsx("div", { className: styles$3.loadingOverlay, children: jsxRuntimeExports.jsx("div", { className: styles$3.spinner }) }), (title || icon || actions) && (jsxRuntimeExports.jsxs("div", { className: styles$3.header, children: [jsxRuntimeExports.jsxs("div", { className: styles$3.titleSection, children: [icon && jsxRuntimeExports.jsx("div", { className: styles$3.icon, children: icon }), title && jsxRuntimeExports.jsx("div", { className: styles$3.title, children: title })] }), actions && jsxRuntimeExports.jsx("div", { className: styles$3.actions, children: actions })] })), jsxRuntimeExports.jsx("div", { className: styles$3.content, children: children })] }));
};

var styles$2 = {"pagination":"Pagination-module_pagination__icb-v","pageButton":"Pagination-module_pageButton__AL1wT","disabled":"Pagination-module_disabled__x47WD","active":"Pagination-module_active__1kqsJ","prevButton":"Pagination-module_prevButton__MAF64","nextButton":"Pagination-module_nextButton__-k5WS","dots":"Pagination-module_dots__Yl9da"};

// 生成页码范围的工具函数
const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};
const DOTS = '...';
const Pagination = ({ total, current, pageSize, onChange, siblingCount = 1, ellipsis = "...", className = "", }) => {
    // 计算总页数
    const totalPageCount = Math.ceil(total / pageSize);
    // 生成分页数组
    const paginationRange = React.useMemo(() => {
        const totalPageNumbers = siblingCount + 5; // 首页 + 末页 + 当前页 + 2*siblingCount
        // 如果页数少于要显示的页码数，直接返回所有页码
        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }
        const leftSiblingIndex = Math.max(current - siblingCount, 1);
        const rightSiblingIndex = Math.min(current + siblingCount, totalPageCount);
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;
        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;
        // 只显示右侧省略号
        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * siblingCount;
            const leftRange = range(1, leftItemCount);
            return [...leftRange, DOTS, totalPageCount];
        }
        // 只显示左侧省略号
        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * siblingCount;
            const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
            return [firstPageIndex, DOTS, ...rightRange];
        }
        // 显示两侧省略号
        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }
        return [];
    }, [totalPageCount, siblingCount, current]);
    // 如果页数小于等于1，不显示分页
    if (current < 1 || totalPageCount < 2) {
        return null;
    }
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPageCount && page !== current) {
            onChange(page);
        }
    };
    const handlePrevious = () => {
        handlePageChange(current - 1);
    };
    const handleNext = () => {
        handlePageChange(current + 1);
    };
    return (jsxRuntimeExports.jsxs("nav", { className: `${styles$2.pagination} ${className}`, "aria-label": "\u5206\u9875\u5BFC\u822A", children: [jsxRuntimeExports.jsx("button", { className: `${styles$2.pageButton} ${styles$2.prevButton} ${current === 1 ? styles$2.disabled : ''}`, onClick: handlePrevious, disabled: current === 1, "aria-label": "\u4E0A\u4E00\u9875", children: jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", children: jsxRuntimeExports.jsx("path", { d: "M10 12l-4-4 4-4v8z" }) }) }), paginationRange.map((pageNumber, index) => {
                if (pageNumber === DOTS) {
                    return (jsxRuntimeExports.jsx("span", { className: styles$2.dots, children: ellipsis }, `dots-${index}`));
                }
                return (jsxRuntimeExports.jsx("button", { className: `${styles$2.pageButton} ${pageNumber === current ? styles$2.active : ''}`, onClick: () => handlePageChange(pageNumber), "aria-label": `第 ${pageNumber} 页`, "aria-current": pageNumber === current ? 'page' : undefined, children: pageNumber }, pageNumber));
            }), jsxRuntimeExports.jsx("button", { className: `${styles$2.pageButton} ${styles$2.nextButton} ${current === totalPageCount ? styles$2.disabled : ''}`, onClick: handleNext, disabled: current === totalPageCount, "aria-label": "\u4E0B\u4E00\u9875", children: jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", children: jsxRuntimeExports.jsx("path", { d: "M6 4l4 4-4 4V4z" }) }) })] }));
};

var styles$1 = {"overlay":"Drawer-module_overlay__YWL02","entering":"Drawer-module_entering__ia4Cx","entered":"Drawer-module_entered__-f3NF","exiting":"Drawer-module_exiting__Co1mt","exited":"Drawer-module_exited__8rCfM","drawer":"Drawer-module_drawer__IKoOm","drawer-left":"Drawer-module_drawer-left__xanOl","drawer-right":"Drawer-module_drawer-right__Xah9j","drawer-top":"Drawer-module_drawer-top__NhSXJ","drawer-bottom":"Drawer-module_drawer-bottom__YyFIt","drawer-small":"Drawer-module_drawer-small__fH0k3","drawer-large":"Drawer-module_drawer-large__6NnLl","drawer-light":"Drawer-module_drawer-light__w-QlZ","drawer-dark":"Drawer-module_drawer-dark__eUw-z","drawer-glass":"Drawer-module_drawer-glass__3ihP2","header":"Drawer-module_header__-OScS","title":"Drawer-module_title__-yf3P","closeButton":"Drawer-module_closeButton__WdXyR","content":"Drawer-module_content__L0Scr","footer":"Drawer-module_footer__0kQ83"};

const Drawer = ({ open, onClose, title, children, placement = 'right', size = 'default', theme = 'light', closable = true, maskClosable = true, footer, className, closeIcon, afterOpenChange, }) => {
    const drawerRef = React.useRef(null);
    const [animationState, setAnimationState] = React.useState('exited');
    // 处理动画状态
    React.useEffect(() => {
        if (open) {
            setAnimationState('entering');
            const timer = setTimeout(() => {
                setAnimationState('entered');
                afterOpenChange === null || afterOpenChange === void 0 ? void 0 : afterOpenChange(true);
            }, 50);
            return () => clearTimeout(timer);
        }
        else {
            setAnimationState('exiting');
            const timer = setTimeout(() => {
                setAnimationState('exited');
                afterOpenChange === null || afterOpenChange === void 0 ? void 0 : afterOpenChange(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [open, afterOpenChange]);
    // 处理键盘事件
    React.useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && open) {
                onClose();
            }
        };
        if (open) {
            document.addEventListener('keydown', handleKeyDown);
            // 禁止背景滚动
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [open, onClose]);
    // 焦点管理
    React.useEffect(() => {
        if (open && drawerRef.current) {
            const focusableElements = drawerRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const firstElement = focusableElements[0];
            firstElement === null || firstElement === void 0 ? void 0 : firstElement.focus();
        }
    }, [open]);
    const handleMaskClick = () => {
        if (maskClosable) {
            onClose();
        }
    };
    const handleDrawerClick = (e) => {
        e.stopPropagation();
    };
    const drawerClasses = [
        styles$1.drawer,
        styles$1[`drawer-${placement}`],
        styles$1[`drawer-${theme}`],
        size !== 'default' && styles$1[`drawer-${size}`],
        styles$1[animationState],
        className
    ].filter(Boolean).join(' ');
    const overlayClasses = [
        styles$1.overlay,
        styles$1[animationState]
    ].join(' ');
    if (!open && animationState === 'exited') {
        return null;
    }
    const drawerContent = (jsxRuntimeExports.jsx("div", { className: overlayClasses, onClick: handleMaskClick, children: jsxRuntimeExports.jsxs("div", { ref: drawerRef, className: drawerClasses, onClick: handleDrawerClick, role: "dialog", "aria-modal": "true", "aria-labelledby": title ? 'drawer-title' : undefined, children: [(title || closable) && (jsxRuntimeExports.jsxs("div", { className: styles$1.header, children: [title && (jsxRuntimeExports.jsx("h3", { id: "drawer-title", className: styles$1.title, children: title })), closable && (jsxRuntimeExports.jsx("button", { className: styles$1.closeButton, onClick: onClose, "aria-label": "\u5173\u95ED\u62BD\u5C49", children: closeIcon || (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", children: jsxRuntimeExports.jsx("path", { d: "M8 7.293l2.146-2.147a.5.5 0 01.708.708L8.707 8l2.147 2.146a.5.5 0 01-.708.708L8 8.707l-2.146 2.147a.5.5 0 01-.708-.708L7.293 8 5.146 5.854a.5.5 0 01.708-.708L8 7.293z" }) })) }))] })), jsxRuntimeExports.jsx("div", { className: styles$1.content, children: children }), footer && (jsxRuntimeExports.jsx("div", { className: styles$1.footer, children: footer }))] }) }));
    return reactDom.createPortal(drawerContent, document.body);
};

var styles = {"notification":"Notification-module_notification__WfYqO","top-left":"Notification-module_top-left__-uozQ","top-right":"Notification-module_top-right__S3dv9","bottom-left":"Notification-module_bottom-left__kstSy","bottom-right":"Notification-module_bottom-right__4cvNX","content":"Notification-module_content__xt6uE","close":"Notification-module_close__FllIm"};

const Notification = ({ closeIcon, duration = 3000, // 默认 3 秒自动关闭
message = "", onClick, onClose, position = "top-right", className, show, }) => {
    const [internalShow, setInternalShow] = React.useState(show);
    // 监听 show 变化（外部控制）
    React.useEffect(() => {
        setInternalShow(show);
    }, [show]);
    // 处理自动关闭
    React.useEffect(() => {
        if (!internalShow)
            return;
        if (duration === null)
            return; // 不自动关闭
        const timer = setTimeout(() => {
            setInternalShow(false);
            onClose === null || onClose === void 0 ? void 0 : onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [internalShow, duration, onClose]);
    const handleClose = () => {
        setInternalShow(false);
        onClose === null || onClose === void 0 ? void 0 : onClose();
    };
    // 只有在显示时才渲染
    if (!internalShow) {
        return null;
    }
    const notificationClass = [styles.notification, styles[position], className]
        .filter(Boolean)
        .join(" ");
    return (jsxRuntimeExports.jsxs("div", { className: notificationClass, children: [jsxRuntimeExports.jsx("div", { className: styles.content, onClick: onClick, children: message }), jsxRuntimeExports.jsx("button", { className: styles.close, onClick: handleClose, "aria-label": "\u5173\u95ED\u901A\u77E5", children: closeIcon || "×" })] }));
};

// 设计令牌 - 定义设计系统的基础变量
const tokens = {
    colors: {
        primary: '#3366FF',
        secondary: '#6C757D',
        success: '#28A745',
        danger: '#DC3545',
        warning: '#FFC107',
        info: '#17A2B8',
        light: '#F8F9FA',
        dark: '#343A40',
    },
    typography: {
        fontFamily: '"Segoe UI", "Roboto", "Oxygen", sans-serif',
        fontSize: {
            xs: '0.75rem', // 12px
            sm: '0.875rem', // 14px
            md: '1rem', // 16px
            lg: '1.125rem', // 18px
            xl: '1.25rem', // 20px
            xxl: '1.5rem', // 24px
        },
        fontWeight: {
            regular: 400,
            medium: 500,
            bold: 700,
        },
    },
    spacing: {
        xs: '0.25rem', // 4px
        sm: '0.5rem', // 8px
        md: '1rem', // 16px
        lg: '1.5rem', // 24px
        xl: '2rem', // 32px
        xxl: '3rem', // 48px
    },
    borderRadius: {
        sm: '0.25rem', // 4px
        md: '0.5rem', // 8px
        lg: '1rem', // 16px
        pill: '50rem', // 圆形按钮
    },
    shadows: {
        sm: '0 1px 3px rgba(0,0,0,0.12)',
        md: '0 4px 6px rgba(0,0,0,0.1)',
        lg: '0 10px 15px rgba(0,0,0,0.1)',
    },
    transitions: {
        fast: '0.15s ease-in-out',
        normal: '0.3s ease-in-out',
        slow: '0.5s ease-in-out',
    },
};

exports.Button = Button;
exports.ButtonDefault = Button;
exports.Card = Card;
exports.CardDefault = Card;
exports.Drawer = Drawer;
exports.Form = Form;
exports.FormActions = FormActions;
exports.FormDefault = Form;
exports.FormItem = FormItem;
exports.Input = Input;
exports.InputDefault = Input;
exports.LanguageSwitcher = LanguageSwitcher;
exports.LanguageSwitcherDefault = LanguageSwitcher;
exports.Menu = Menu;
exports.MenuItem = MenuItem;
exports.Notification = Notification;
exports.Pagination = Pagination;
exports.Radio = Radio;
exports.RadioDefault = Radio;
exports.RadioGroup = RadioGroup;
exports.SubMenu = SubMenu;
exports.Switch = Switch;
exports.SwitchDefault = Switch;
exports.Tab = Tab;
exports.Tabs = Tabs;
exports.TabsDefault = Tabs;
exports.formatCurrency = formatCurrency;
exports.formatDate = formatDate;
exports.formatNumber = formatNumber;
exports.getBrowserLanguage = getBrowserLanguage;
exports.getLanguageNativeName = getLanguageNativeName;
exports.getSavedLanguage = getSavedLanguage;
exports.getTextDirection = getTextDirection;
exports.i18n = instance;
exports.isValidLanguage = isValidLanguage;
exports.saveLanguage = saveLanguage;
exports.supportedLanguages = supportedLanguages;
exports.tokens = tokens;
exports.useCurrentLanguage = useCurrentLanguage;
exports.useLanguageSwitch = useLanguageSwitch;
exports.useTranslation = useTranslation;
//# sourceMappingURL=index.js.map
