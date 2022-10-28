import { c as create_ssr_component, v as validate_component, u as is_promise, n as noop, m as missing_component, j as subscribe, e as escape, a as add_attribute } from "./index-8615df27.js";
import { K as KitDocs, a as KitDocsLayout, S as SocialLink, B as Blocknative } from "./blocknative-25834683.js";
import { o as isString, l as createSidebarContext, p as page } from "./contexts-8ef4e4d1.js";
import "clsx";
function slugToRequestParam(slug) {
  return normalizePath(slug).replace(/\//g, "_");
}
function normalizePath(path) {
  return path.replace(/^\//, "").replace(/\/$/, "");
}
async function loadKitDocsMeta(slug, { fetch }) {
  try {
    const res = await fetch(`/kit-docs/${slug === "/" ? "index" : slugToRequestParam(slug.replace(/\.html$/, ""))}.meta.json`);
    return await res.json();
  } catch (e) {
    return null;
  }
}
async function loadKitDocsSidebar(path, { url, fetch }) {
  const matchedPath = matchSidebarPath(url, path);
  if (!matchedPath) {
    return null;
  }
  try {
    const res = await fetch(`/kit-docs/${slugToRequestParam(matchedPath)}.sidebar.json`);
    return res.json();
  } catch (e) {
    return null;
  }
}
function matchSidebarPath(url, path) {
  if (isString(path))
    return path;
  const currentPath = url.pathname;
  const sortedPaths = Object.keys(path).sort((a, b) => b.length - a.length);
  for (const possiblePath of sortedPaths) {
    if (currentPath.startsWith(possiblePath)) {
      return path[possiblePath];
    }
  }
  return null;
}
function createKitDocsLoader(options = {}) {
  return async ({ url, fetch }) => {
    const meta = await loadKitDocsMeta(url.pathname, { fetch });
    return {
      props: options.sidebar ? { meta, sidebar: await loadKitDocsSidebar(options.sidebar, { url, fetch }) } : { meta }
    };
  };
}
const AlgoliaSkeleton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `
<div class="${"hidden w-full items-center rounded-sm border border-gray-divider bg-gray-elevate py-2.5 px-3 text-[15px] shadow-sm 992:flex"}"><div class="${"flex-1 flex items-center"}"><svg width="${"20"}" height="${"20"}" class="${"DocSearch-Search-Icon"}" viewBox="${"0 0 20 20"}"><path d="${"M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"}" stroke="${"currentColor"}" fill="${"none"}" fill-rule="${"evenodd"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}"></path><span>Search</span></svg></div>

  <span class="${"flex space-x-0.5 font-semibold"}"><span>\u2318</span>
    <span>K</span></span></div>

<div class="${"flex h-12 w-12 items-center justify-center rounded-sm border-0 992:hidden text-gray-soft"}"><svg width="${"20"}" height="${"20"}" class="${"DocSearch-Search-Icon"}" viewBox="${"0 0 20 20"}"><path d="${"M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"}" stroke="${"currentColor"}" fill="${"none"}" fill-rule="${"evenodd"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}"></path></svg></div>`;
});
var AlgoliaSkeleton$1 = AlgoliaSkeleton;
const Algolia = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { appId } = $$props;
  let { indexName } = $$props;
  let { apiKey } = $$props;
  let { placeholder = "Search documentation" } = $$props;
  let hasDocSearchLoaded = false;
  const DocSearchLoader = async () => {
    const Component = await import("./AlgoliaSearch-b73b70d7.js");
    hasDocSearchLoaded = true;
    return Component;
  };
  if ($$props.appId === void 0 && $$bindings.appId && appId !== void 0)
    $$bindings.appId(appId);
  if ($$props.indexName === void 0 && $$bindings.indexName && indexName !== void 0)
    $$bindings.indexName(indexName);
  if ($$props.apiKey === void 0 && $$bindings.apiKey && apiKey !== void 0)
    $$bindings.apiKey(apiKey);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  return `${!hasDocSearchLoaded ? `${validate_component(AlgoliaSkeleton$1, "AlgoliaSkeleton").$$render($$result, {}, {}, {})}` : ``}

${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ``;
    }
    return function(Component) {
      return `
  ${validate_component(Component.default || missing_component, "svelte:component").$$render($$result, { appId, indexName, apiKey, placeholder }, {}, {})}
`;
    }(__value);
  }(DocSearchLoader())}`;
});
var Algolia$1 = Algolia;
var __layoutKitDocs_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ":root{--kd-color-brand-rgb:99, 112, 229}")();
const css = {
  code: ":root{--kd-color-brand-rgb:99, 112, 229}",
  map: null
};
const prerender = true;
const load = createKitDocsLoader({
  sidebar: {
    "/": "/",
    "/docs": "/docs",
    "/faq": "/faq",
    "/examples": "/examples",
    "/theming-tool": "/theming-tool"
  }
});
const _layout_kit_docs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let category;
  let title;
  let description;
  let $activeCategory, $$unsubscribe_activeCategory;
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let { meta = null } = $$props;
  let { sidebar = null } = $$props;
  const navbar = {
    links: [
      {
        title: "Documentation",
        slug: "/docs",
        match: /\/docs/
      },
      {
        title: "Examples",
        slug: "/examples",
        match: /\/examples/
      },
      {
        title: "FAQ",
        slug: "/faq",
        match: /\/faq/
      },
      {
        title: "Blog",
        slug: "https://www.blocknative.com/blog/tag/web3-onboard"
      }
    ]
  };
  const { activeCategory } = createSidebarContext(sidebar);
  $$unsubscribe_activeCategory = subscribe(activeCategory, (value) => $activeCategory = value);
  if ($$props.meta === void 0 && $$bindings.meta && meta !== void 0)
    $$bindings.meta(meta);
  if ($$props.sidebar === void 0 && $$bindings.sidebar && sidebar !== void 0)
    $$bindings.sidebar(sidebar);
  $$result.css.add(css);
  category = $activeCategory ? `${$activeCategory}: ` : "";
  title = meta ? `${category}${meta.title} | Web3-Onboard` : null;
  description = meta == null ? void 0 : meta.description;
  $$unsubscribe_activeCategory();
  $$unsubscribe_page();
  return `${$$result.head += `${title ? `${$$result.title = `<title>${escape(title)}</title>`, ""}` : ``}
    ${description ? `<meta name="${"description"}"${add_attribute("content", description, 0)} data-svelte="svelte-3cm5o9">` : ``}`, ""}

${validate_component(KitDocs, "KitDocs").$$render($$result, { meta }, {}, {
    default: () => {
      return `${validate_component(KitDocsLayout, "KitDocsLayout").$$render($$result, { navbar, sidebar, search: true }, {}, {
        "navbar-right-alt": () => {
          return `<div slot="${"navbar-right-alt"}"><div class="${"flex"}">${validate_component(SocialLink, "SocialLink").$$render($$result, {
            type: "gitHub",
            href: "//github.com/blocknative/web3-onboard"
          }, {}, {})}
        ${validate_component(SocialLink, "SocialLink").$$render($$result, {
            type: "discord",
            href: "//discord.com/invite/KZaBVME"
          }, {}, {})}</div></div>`;
        },
        search: () => {
          return `${validate_component(Algolia$1, "Algolia").$$render($$result, {
            apiKey: "1bce9c4755cea3698e16830544503ee2",
            appId: "02BH13PRRI",
            indexName: "docsearch",
            placeholder: "Search documentation",
            slot: "search"
          }, {}, {})}`;
        },
        "navbar-left": () => {
          return `<div slot="${"navbar-left"}"><a class="${"text-base flex items-center"}" href="${"/"}">${validate_component(Blocknative, "IconBN").$$render($$result, {}, {}, {})}
        <span class="${"ml-4"}">${escape("Web3-Onboard")}</span></a></div>`;
        },
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      })}`;
    }
  })}`;
});
export { AlgoliaSkeleton$1 as A, _layout_kit_docs as _, load as l, prerender as p };
