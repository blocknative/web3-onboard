import { c as create_ssr_component, e as escape } from "./index-8615df27.js";
const CodeInline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { code } = $$props;
  if ($$props.code === void 0 && $$bindings.code && code !== void 0)
    $$bindings.code(code);
  return `<code>${escape(code)}</code>`;
});
export { CodeInline as C };
