import { c as create_ssr_component, a as add_attribute, v as validate_component } from "./index-8615df27.js";
import "@docsearch/js";
import clsx from "clsx";
import { A as AlgoliaSkeleton } from "./__layout-kit-docs-4037cc79.js";
import "./blocknative-25834683.js";
import "./twitter-fill-08c56211.js";
import "./contexts-8ef4e4d1.js";
import "./kitDocs-4c2b738a.js";
const AlgoliaSearch = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { appId } = $$props;
  let { indexName } = $$props;
  let { apiKey } = $$props;
  let { placeholder = "Search documentation" } = $$props;
  let container;
  if ($$props.appId === void 0 && $$bindings.appId && appId !== void 0)
    $$bindings.appId(appId);
  if ($$props.indexName === void 0 && $$bindings.indexName && indexName !== void 0)
    $$bindings.indexName(indexName);
  if ($$props.apiKey === void 0 && $$bindings.apiKey && apiKey !== void 0)
    $$bindings.apiKey(apiKey);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  return `${$$result.head += `<link rel="${"preconnect"}"${add_attribute("href", `https://${appId}-dsn.algolia.net`, 0)} crossorigin="${""}" data-svelte="svelte-w392de">`, ""}

<div class="${"contents"}"${add_attribute("this", container, 0)}></div>

<div${add_attribute("class", clsx("contents"), 0)}>${validate_component(AlgoliaSkeleton, "AlgoliaSkeleton").$$render($$result, {}, {}, {})}</div>`;
});
export { AlgoliaSearch as default };
