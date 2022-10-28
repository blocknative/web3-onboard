import { c as create_ssr_component, b as compute_rest_props, d as spread, g as escape_object } from "./index-8615df27.js";
const Link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `
<a${spread([escape_object($$restProps)], {})}>${slots.default ? slots.default({}) : ``}</a>`;
});
export { Link as L };
