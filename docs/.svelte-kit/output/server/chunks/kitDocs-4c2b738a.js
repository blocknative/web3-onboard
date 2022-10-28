import { d as derived, w as writable } from "./contexts-8ef4e4d1.js";
const __kitDocs = writable({ meta: null });
const kitDocs = {
  subscribe: __kitDocs.subscribe
};
const frontmatter = derived(kitDocs, ($kitDocs) => {
  var _a;
  return (_a = $kitDocs == null ? void 0 : $kitDocs.meta) == null ? void 0 : _a.frontmatter;
});
function hasMarkdownHeaders(meta) {
  if (!meta)
    return false;
  const { headers } = meta;
  return headers && [...headers.map((h) => h.title), ...headers.map((h) => h.children).flat()].length > 1;
}
export { __kitDocs as _, frontmatter as f, hasMarkdownHeaders as h, kitDocs as k };
