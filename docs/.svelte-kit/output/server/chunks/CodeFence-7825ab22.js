import { c as create_ssr_component, d as spread, g as escape_object, j as subscribe, a as add_attribute, e as escape, v as validate_component, k as each } from "./index-8615df27.js";
import { g as getI18nContext } from "./contexts-8ef4e4d1.js";
import clsx from "clsx";
const File_copy_line = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread([
    { width: "1.2em" },
    { height: "1.2em" },
    { preserveAspectRatio: "xMidYMid meet" },
    { viewBox: "0 0 24 24" },
    escape_object($$props)
  ], {})}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zM5.003 8L5 20h10V8H5.003zM9 6h8v10h2V4H9v2z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const CodeFence = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentHighlightedLines;
  let lines;
  let showTopBar;
  let hasTopbarTitle;
  let topbarTitle;
  let $i18n, $$unsubscribe_i18n;
  let { lang = null } = $$props;
  let { ext = null } = $$props;
  let { code = null } = $$props;
  let { rawCode = null } = $$props;
  let { title = null } = $$props;
  let { linesCount = ((code == null ? void 0 : code.match(/"line"/g)) || []).length } = $$props;
  let { showLineNumbers = false } = $$props;
  let { highlightLines = [] } = $$props;
  let { showCopyCode = false } = $$props;
  let { copyHighlightOnly = false } = $$props;
  let { copySteps = false } = $$props;
  const i18n = getI18nContext();
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let currentStep = 1;
  let stepHighlightLines = [];
  const isHighlightLine = (lineNumber, _) => currentHighlightedLines.some(([start, end]) => lineNumber >= start && lineNumber <= end);
  if ($$props.lang === void 0 && $$bindings.lang && lang !== void 0)
    $$bindings.lang(lang);
  if ($$props.ext === void 0 && $$bindings.ext && ext !== void 0)
    $$bindings.ext(ext);
  if ($$props.code === void 0 && $$bindings.code && code !== void 0)
    $$bindings.code(code);
  if ($$props.rawCode === void 0 && $$bindings.rawCode && rawCode !== void 0)
    $$bindings.rawCode(rawCode);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.linesCount === void 0 && $$bindings.linesCount && linesCount !== void 0)
    $$bindings.linesCount(linesCount);
  if ($$props.showLineNumbers === void 0 && $$bindings.showLineNumbers && showLineNumbers !== void 0)
    $$bindings.showLineNumbers(showLineNumbers);
  if ($$props.highlightLines === void 0 && $$bindings.highlightLines && highlightLines !== void 0)
    $$bindings.highlightLines(highlightLines);
  if ($$props.showCopyCode === void 0 && $$bindings.showCopyCode && showCopyCode !== void 0)
    $$bindings.showCopyCode(showCopyCode);
  if ($$props.copyHighlightOnly === void 0 && $$bindings.copyHighlightOnly && copyHighlightOnly !== void 0)
    $$bindings.copyHighlightOnly(copyHighlightOnly);
  if ($$props.copySteps === void 0 && $$bindings.copySteps && copySteps !== void 0)
    $$bindings.copySteps(copySteps);
  {
    if (copySteps) {
      stepHighlightLines = [highlightLines[currentStep - 1] ?? [currentStep, currentStep]];
    }
  }
  currentHighlightedLines = copySteps ? stepHighlightLines : highlightLines;
  lines = [...Array(linesCount - 1).keys()].map((n) => n + 1);
  rawCode == null ? void 0 : rawCode.replace(/&#8203/g, "");
  showTopBar = title || showCopyCode;
  hasTopbarTitle = title || ext;
  topbarTitle = title ?? (ext === "sh" ? "terminal" : ext);
  $$unsubscribe_i18n();
  return `<div${add_attribute("class", clsx("code-fence overflow-y-auto relative max-h-[60vh] 576:max-h-[32rem] my-8 rounded-md shadow-lg mx-auto", "border border-gray-divider", lang && `lang-${lang}`, ext && `ext-${ext}`), 0)} style="${"background-color: var(--kd-code-fence-bg);"}">${showTopBar ? `<div class="${"sticky top-0 left-0 z-10 flex items-center rounded-md pt-2 backdrop-blur supports-backdrop-blur:bg-white/60"}" style="${"background-color: var(--kd-code-fence-top-bar-bg);"}">${hasTopbarTitle ? `<span class="${"ml-3.5 font-mono text-sm text-gray-300"}">${escape(topbarTitle)}</span>` : ``}

      <div class="${"flex-1"}"></div>

      ${showCopyCode ? `<button type="${"button"}" class="${"mr-2 px-2 py-1 hover:text-white"}"><div${add_attribute("class", clsx("text-white absolute top-2.5 right-4 transition-opacity z-10 duration-300 px-2 py-1 rounded-md ease-out text-sm font-mono", "hidden opacity-0"), 0)} aria-hidden="${"true"}" style="${"background-color: var(--kd-code-copied-bg-color);"}">${escape($i18n.code.copied)}</div>

          ${validate_component(File_copy_line, "CopyFileIcon").$$render($$result, {
    width: "24",
    height: "24",
    class: clsx("opacity-100 transition-opacity duration-600 ease-in")
  }, {}, {})}
          <span class="${"sr-only"}">${escape($i18n.code.copy)}</span></button>` : ``}</div>` : ``}

  <div class="${"code relative z-0 overflow-hidden"}"><div${add_attribute("class", clsx(showLineNumbers && "pl-10"), 0)}><!-- HTML_TAG_START -->${code}<!-- HTML_TAG_END --></div>

    ${showLineNumbers ? `<pre class="${"absolute top-3.5 left-0 m-0 flex flex-col text-sm leading-[27px]"}" style="${"background-color: transparent; border-radius: 0; padding-top: 0;"}">			<div class="${"hidden flex-none select-none text-right text-slate-600 992:block"}" aria-hidden="${"true"}">${escape(lines.join("\n"))}</div>
		</pre>` : ``}

    ${currentHighlightedLines.length > 0 ? `<div class="${"pointer-events-none absolute inset-0 mt-[0.7em] h-full w-full leading-[27px]"}" aria-hidden="${"true"}">${each(lines, (lineNumber) => {
    return `${isHighlightLine(lineNumber) ? `<div class="${"w-full border-l-[5px] font-mono text-transparent"}" style="${"border-color: var(--kd-code-highlight-border); background-color: var(--kd-code-highlight-color);"}">\xA0
            </div>` : `<br>`}`;
  })}</div>` : ``}</div></div>`;
});
export { CodeFence as C };
