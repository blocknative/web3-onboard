import { n as noop, p as safe_not_equal, j as subscribe, r as run_all, q as is_function, t as getContext, s as setContext } from "./index-8615df27.js";
function isNull(value) {
  return value === null;
}
function isUndefined(value) {
  return typeof value === "undefined";
}
function isString(value) {
  return typeof value === "string";
}
function isFunction(value) {
  return typeof value === "function";
}
function isRegExp(value) {
  return value instanceof RegExp;
}
const subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  const auto = fn.length < 2;
  return readable(initial_value, (set) => {
    let inited = false;
    const values = [];
    let pending = 0;
    let cleanup = noop;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop;
      }
    };
    const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
      values[i] = value;
      pending &= ~(1 << i);
      if (inited) {
        sync();
      }
    }, () => {
      pending |= 1 << i;
    }));
    inited = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
    };
  });
}
const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    page: {
      subscribe: stores.page.subscribe
    },
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    get preloading() {
      console.error("stores.preloading is deprecated; use stores.navigating instead");
      return {
        subscribe: stores.navigating.subscribe
      };
    },
    session: stores.session,
    updated: stores.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function uppercaseFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function kebabToTitleCase(str) {
  return uppercaseFirstLetter((str == null ? void 0 : str.replace(/-./g, (x) => " " + x[1].toUpperCase())) ?? "");
}
function titleToKebabCase(str) {
  return (str == null ? void 0 : str.replace(/\s/g, "-").toLowerCase()) ?? "";
}
const NAVIGATION_CONTEXT_KEY = Symbol("");
const DEFAULT_NAVIGATION_CONFIG = {
  canUpdateHash: () => true,
  cleanHash: (hash) => hash
};
function getNavigationContext() {
  try {
    return getContext(NAVIGATION_CONTEXT_KEY);
  } catch (e) {
    console.error(e);
    console.warn("[kit-docs]: attempted to get navigation context before setting it.");
  }
}
function setNavigationContext(context) {
  setContext(NAVIGATION_CONTEXT_KEY, context);
}
const NAVBAR_CONTEXT_KEY = Symbol("");
function getNavbarContext() {
  try {
    return getContext(NAVBAR_CONTEXT_KEY);
  } catch (e) {
    console.error(e);
    console.warn("[kit-docs]: attempted to get navbar context before setting it.");
  }
}
function setNavbarContext(context) {
  setContext(NAVBAR_CONTEXT_KEY, context);
}
function normalizeSidebarConfig(config) {
  var _a;
  if (!config)
    return { links: {} };
  const links = {};
  const baseUrl = ((_a = config.baseUrl) == null ? void 0 : _a.replace(/\/$/, "")) ?? "";
  for (const category of Object.keys(config.links)) {
    const categoryLinks = config.links[category];
    const categorySlug = titleToKebabCase(category);
    const categoryName = isString(config.links[category][0]) ? kebabToTitleCase(category) : category;
    for (const categoryLink of categoryLinks) {
      const link = isString(categoryLink) ? {
        title: kebabToTitleCase(categoryLink),
        slug: `${baseUrl}/${categorySlug}/${categoryLink}`
      } : categoryLink;
      if (!links[categoryName])
        links[categoryName] = [];
      links[categoryName].push(link);
    }
  }
  return {
    ...config,
    links
  };
}
function isActiveSidebarLink({ match, slug }, currentPath) {
  const path = currentPath.replace(/\.html/, "");
  if (match === "deep") {
    return path === slug || path.startsWith(slug) && path[slug.length] === "/";
  }
  if (isRegExp(match)) {
    return match.test(slug);
  }
  return path === slug;
}
const SIDEBAR_CONTEXT_KEY = Symbol();
function createSidebarContext(config) {
  const configStore = config && "subscribe" in config ? config : readable(config);
  const normalizedConfig = derived(configStore, ($config) => normalizeSidebarConfig($config));
  const allLinks = derived(normalizedConfig, ($config) => Object.values($config.links).flat());
  const activeLinkIndex = derived([allLinks, page], ([$allLinks, $page]) => $allLinks.findIndex((link) => isActiveSidebarLink(link, $page.url.pathname)));
  const activeLink = derived([allLinks, activeLinkIndex], ([$allLinks, $activeLinkIndex]) => $allLinks[$activeLinkIndex]);
  const previousLink = derived([allLinks, activeLinkIndex], ([$allLinks, $activeLinkIndex]) => $allLinks[$activeLinkIndex - 1]);
  const nextLink = derived([allLinks, activeLinkIndex], ([$allLinks, $activeLinkIndex]) => $allLinks[$activeLinkIndex + 1]);
  const activeCategory = derived([normalizedConfig, activeLink], ([$config, $activeLink]) => {
    const category = Object.keys($config.links).find((category2) => {
      var _a;
      return (_a = $config.links[category2]) == null ? void 0 : _a.some((link) => link.title === ($activeLink == null ? void 0 : $activeLink.title) && link.slug === ($activeLink == null ? void 0 : $activeLink.slug));
    });
    return category !== "." ? category : null;
  });
  const context = {
    config: normalizedConfig,
    allLinks,
    activeLinkIndex,
    activeLink,
    previousLink,
    nextLink,
    activeCategory
  };
  return context;
}
function setSidebarContext(context) {
  setContext(SIDEBAR_CONTEXT_KEY, context);
}
function getSidebarContext() {
  try {
    return getContext(SIDEBAR_CONTEXT_KEY);
  } catch (e) {
    console.error(e);
    console.warn("[kit-docs]: attempted to get sidebar context before setting it.");
  }
}
const DEFAULT_I18N_TRANSLATIONS = {
  nav: {
    previous: "Previous",
    next: "Next",
    mainMenu: "Main navigation menu",
    openSidebar: "Open main sidebar",
    options: "Options",
    links: "Links"
  },
  toc: {
    title: "On this page"
  },
  colorScheme: {
    title: "Color Scheme",
    light: "Light",
    dark: "Dark",
    system: "System",
    theme: "Theme"
  },
  dialog: {
    close: "Close dialog"
  },
  admonition: {
    note: "NOTE",
    info: "INFO",
    tip: "TIP",
    warning: "WARNING",
    danger: "DANGER",
    experimental: "EXPERIMENTAL"
  },
  code: {
    copy: "Copy code",
    copied: "Copied!"
  }
};
const I18N_CONTEXT_KEY = Symbol();
function getI18nContext() {
  try {
    return getContext(I18N_CONTEXT_KEY);
  } catch (e) {
    console.error(e);
    console.warn("[kit-docs]: attempted to get i18n context before setting it.");
  }
}
function setI18nContext(context) {
  setContext(I18N_CONTEXT_KEY, context);
}
export { DEFAULT_NAVIGATION_CONFIG as D, isNull as a, getNavbarContext as b, getSidebarContext as c, derived as d, isFunction as e, isActiveSidebarLink as f, getI18nContext as g, getNavigationContext as h, isUndefined as i, setNavbarContext as j, setSidebarContext as k, createSidebarContext as l, setI18nContext as m, DEFAULT_I18N_TRANSLATIONS as n, isString as o, page as p, readable as r, setNavigationContext as s, uppercaseFirstLetter as u, writable as w };
