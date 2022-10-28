import{S as Q,i as j,s as J,e as g,t as F,k as L,w as _,c as $,a as h,h as d,d as l,m as N,x as E,b as Y,g as r,M as f,y as T,q as O,o as v,B as I,E as K}from"../../../chunks/index-c32358ff.js";import"../../../chunks/scroll-5387a6f1.js";import{C as V}from"../../../chunks/CodeFence-ac7b69e1.js";import{C as X}from"../../../chunks/CodeInline-8df56a89.js";import{L as G}from"../../../chunks/Link-d3089e65.js";import{A as q}from"../../../chunks/Admonition-5e8d71e1.js";/* empty css                                                            */import"../../../chunks/singletons-37dfeae3.js";import"../../../chunks/contexts-2aef7541.js";function ss(b){let n;return{c(){n=F("Try out our theming tool")},l(o){n=d(o,"Try out our theming tool")},m(o,e){r(o,n,e)},d(o){o&&l(n)}}}function ns(b){let n,o,e,D,c,C,t,w,A;return c=new G({props:{href:"/theming-tool",$$slots:{default:[ss]},$$scope:{ctx:b}}}),{c(){n=g("p"),o=F("Interested in seeing how web3-onboard will look on your site?"),e=L(),D=g("p"),_(c.$$.fragment),C=L(),t=g("p"),w=F("It will allow you to customize the look and feel of web3-onboard, copy your custom css properties, and preview how web3-onboard will look on your site by entering a URL or adding a screenshot.")},l(a){n=$(a,"P",{});var y=h(n);o=d(y,"Interested in seeing how web3-onboard will look on your site?"),y.forEach(l),e=N(a),D=$(a,"P",{});var m=h(D);E(c.$$.fragment,m),m.forEach(l),C=N(a),t=$(a,"P",{});var i=h(t);w=d(i,"It will allow you to customize the look and feel of web3-onboard, copy your custom css properties, and preview how web3-onboard will look on your site by entering a URL or adding a screenshot."),i.forEach(l)},m(a,y){r(a,n,y),f(n,o),r(a,e,y),r(a,D,y),T(c,D,null),r(a,C,y),r(a,t,y),f(t,w),A=!0},p(a,y){const m={};y&1&&(m.$$scope={dirty:y,ctx:a}),c.$set(m)},i(a){A||(O(c.$$.fragment,a),A=!0)},o(a){v(c.$$.fragment,a),A=!1},d(a){a&&l(n),a&&l(e),a&&l(D),I(c),a&&l(C),a&&l(t)}}}function as(b){let n;return{c(){n=F("#")},l(o){n=d(o,"#")},m(o,e){r(o,n,e)},d(o){o&&l(n)}}}function os(b){let n;return{c(){n=F("CSS custom properties")},l(o){n=d(o,"CSS custom properties")},m(o,e){r(o,n,e)},d(o){o&&l(n)}}}function ls(b){let n,o,e,D;return{c(){n=g("p"),o=g("strong"),e=F("Stay Tuned:"),D=F(" We're dedicated to providing a seamless customization experience and will soon be providing more tools and examples to help our community get the most out of their web3-onboard implementation.")},l(c){n=$(c,"P",{});var C=h(n);o=$(C,"STRONG",{});var t=h(o);e=d(t,"Stay Tuned:"),t.forEach(l),D=d(C," We're dedicated to providing a seamless customization experience and will soon be providing more tools and examples to help our community get the most out of their web3-onboard implementation."),C.forEach(l)},m(c,C){r(c,n,C),f(n,o),f(o,e),f(n,D)},p:K,d(c){c&&l(n)}}}function ps(b){let n,o,e,D,c,C,t,w,A,a,y,m,i,R,k,H,z,W,U,x,S,M;return t=new q({props:{type:"experimental",$$slots:{default:[ns]},$$scope:{ctx:b}}}),a=new G({props:{class:"header-anchor",href:"#css-custom-properties-variables","aria-hidden":"true",$$slots:{default:[as]},$$scope:{ctx:b}}}),k=new G({props:{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties",target:"_blank",rel:"noopener noreferrer",$$slots:{default:[os]},$$scope:{ctx:b}}}),z=new X({props:{code:":root"}}),x=new V({props:{lang:"css",ext:"css",linesCount:223,code:`<pre><code><span class="line"><span style="color: #89DDFF">:</span><span style="color: #C792EA">root</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #464B5D; font-style: italic">/* CUSTOMIZE THE COLOR  PALLETTE */</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-white</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> white</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-black</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> black</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-primary-1</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">2f80ed</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-primary-100</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">eff1fc</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-primary-200</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">d0d4f7</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-primary-300</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">b1b8f2</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-primary-400</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">929bed</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-primary-500</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">6370e5</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-primary-600</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">454ea0</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-primary-700</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">323873</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-gray-100</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">ebebed</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-gray-200</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">c2c4c9</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-gray-300</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">999ca5</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-gray-400</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">707481</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-gray-500</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">33394b</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-gray-600</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">242835</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-gray-700</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">1a1d26</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-success-100</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">d1fae3</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-success-200</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">baf7d5</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-success-300</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">a4f4c6</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-success-400</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">8df2b8</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-success-500</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">5aec99</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-success-600</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">18ce66</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-success-700</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">129b4d</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-danger-100</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">ffe5e6</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-danger-200</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">ffcccc</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-danger-300</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">ffb3b3</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-danger-400</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">ff8080</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-danger-500</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">ff4f4f</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-danger-600</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">cc0000</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-danger-700</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">660000</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-warning-100</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">ffefcc</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-warning-200</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">ffe7b3</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-warning-300</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">ffd780</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-warning-400</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">ffc74c</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-warning-500</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">ffaf00</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-warning-600</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">cc8c00</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-warning-700</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">664600</span><span style="color: #89DDFF">;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #464B5D; font-style: italic">/* CUSTOMIZE ACCOUNT CENTER*/</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-z-index</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-position-top</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-position-bottom</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-position-right</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-position-left</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-minimized-background</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-maximized-upper-background</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-maximized-network-section</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-maximized-app-info-section</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-minimized-address-color</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-maximized-address-color</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-maximized-account-section-background-hover</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-maximized-action-background-hover</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-minimized-chain-select-background</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-network-selector-color</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-maximized-network-selector-color</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-minimized-network-selector-color</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-app-btn-text-color</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-app-btn-background</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-app-btn-font-family</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-border</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-box-shadow</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-boarder-radius</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-chain-warning</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-minimized-balance-color</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-minimized-chain-select-background</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-maximized-network-section-background</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-maximized-network-text-color</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-maximized-info-section-background-color</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-maximized-upper-action-color</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-maximized-upper-action-background-hover</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-maximized-app-name-color</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-maximized-app-info-color</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-center-micro-background</span></span>
<span class="line"></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #464B5D; font-style: italic">/* CUSTOMIZE SECTIONS OF THE CONNECT MODAL */</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-connect-content-width</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-connect-content-height</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-wallet-columns</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-connect-sidebar-background</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-connect-sidebar-color</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-connect-sidebar-progress-background</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-connect-sidebar-progress-color</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-connect-header-background</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-connect-header-color</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-main-scroll-container-background</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-link-color</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-close-button-background</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-close-button-color</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-checkbox-background</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-checkbox-color</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-wallet-button-background</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-wallet-button-background-hover</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-wallet-button-color</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-wallet-button-border-color</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-wallet-button-border-radius</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-wallet-button-box-shadow</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-wallet-app-icon-border-color</span></span>
<span class="line"></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #464B5D; font-style: italic">/* CUSTOMIZE THE SHARED MODAL */</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-modal-background</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-modal-color</span></span>
<span class="line"></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #464B5D; font-style: italic">/* CUSTOMIZE THE CONNECT MODAL */</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-modal-border-radius</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-modal-backdrop</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-modal-box-shadow</span></span>
<span class="line"></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #464B5D; font-style: italic">/* CUSTOMIZE THE ACTION REQUIRED MODAL */</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-action-required-modal-background</span></span>
<span class="line"></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #464B5D; font-style: italic">/* FONTS */</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-font-family-normal</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> Sofia Pro</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-font-family-semibold</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> Sofia Pro Semibold</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-font-family-light</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> Sofia Pro Light</span><span style="color: #89DDFF">;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-font-size-1</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">3rem</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-font-size-2</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">2.25rem</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-font-size-3</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">1.5rem</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-font-size-4</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">1.25rem</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-font-size-5</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">1rem</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-font-size-6</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">0.875rem</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-font-size-7</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">0.75rem</span><span style="color: #89DDFF">;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #464B5D; font-style: italic">/* SPACING */</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-spacing-1</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">3rem</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-spacing-2</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">2rem</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-spacing-3</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">1.5rem</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-spacing-4</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">1rem</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-spacing-5</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">0.5rem</span><span style="color: #89DDFF">;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #464B5D; font-style: italic">/* BORDER RADIUS */</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-border-radius-1</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">24px</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-border-radius-2</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">20px</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-border-radius-3</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">16px</span><span style="color: #89DDFF">;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #464B5D; font-style: italic">/* SHADOWS */</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-shadow-0</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> none</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-shadow-1</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">0px</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">4px</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">12px</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">rgba</span><span style="color: #89DDFF">(</span><span style="color: #F78C6C">0</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">0</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">0</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">0.1</span><span style="color: #89DDFF">);</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-shadow-2</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> inset </span><span style="color: #F78C6C">0px</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">-1px</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">0px</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">rgba</span><span style="color: #89DDFF">(</span><span style="color: #F78C6C">0</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">0</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">0</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">0.1</span><span style="color: #89DDFF">);</span></span>
<span class="line"></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #464B5D; font-style: italic">/* MAIN MODAL POSITIONING */</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-modal-z-index</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-modal-top</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-modal-bottom</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-modal-right</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-modal-left</span></span>
<span class="line"></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #464B5D; font-style: italic">/* HD WALLET ACCOUNT SELECT MODAL POSITIONING */</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-account-select-modal-z-index</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-account-select-modal-top</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-account-select-modal-bottom</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-account-select-modal-right</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-account-select-modal-left</span></span>
<span class="line"></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #464B5D; font-style: italic">/* MAGIC WALLET MODAL POSITIONING */</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-login-modal-z-index</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-login-modal-top</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-login-modal-bottom</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-login-modal-right</span></span>
<span class="line"><span style="color: #A6ACCD">  --onboard-login-modal-left</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #464B5D; font-style: italic">/* HARDWARE WALLET STYLES  */</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #464B5D; font-style: italic">/* *if not set will fallback to variables with \`--onboard\` prefix shown above */</span></span>
<span class="line"></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #464B5D; font-style: italic">/* COLORS */</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-select-modal-white</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> white</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-select-modal-black</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> black</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-select-modal-primary-100</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">eff1fc</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-select-modal-primary-200</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">d0d4f7</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-select-modal-primary-300</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">b1b8f2</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-select-modal-primary-500</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">6370e5</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-select-modal-primary-600</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">454ea0</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-select-modal-gray-100</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">ebebed</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-select-modal-gray-200</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">c2c4c9</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-select-modal-gray-300</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">999ca5</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-select-modal-gray-500</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">33394b</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-select-modal-gray-700</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">1a1d26</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-select-modal-danger-500</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">ff4f4f</span><span style="color: #89DDFF">;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #464B5D; font-style: italic">/* FONTS */</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-select-modal-font-family-normal</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> Sofia Pro</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-select-modal-font-family-light</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> Sofia Pro Light</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-select-modal-font-size-5</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">1rem</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-select-modal-font-size-7</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">.75rem</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-select-modal-font-line-height-1</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">24px</span><span style="color: #89DDFF">;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #464B5D; font-style: italic">/* SPACING */</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-select-modal-margin-4</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">1rem</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #A6ACCD">  --account-select-modal-margin-5</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">0.5rem</span><span style="color: #89DDFF">;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #464B5D; font-style: italic">/* NOTIFY STYLES */</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #464B5D; font-style: italic">/* Notify Positioning variables only take effect if Notify is Positioned separate of Account Center */</span></span>
<span class="line"><span style="color: #A6ACCD">  --notify-onboard-container-position-top</span></span>
<span class="line"><span style="color: #A6ACCD">  --notify-onboard-container-position-bottom</span></span>
<span class="line"><span style="color: #A6ACCD">  --notify-onboard-container-position-right</span></span>
<span class="line"><span style="color: #A6ACCD">  --notify-onboard-container-position-left</span></span>
<span class="line"><span style="color: #A6ACCD">  --notify-onboard-font-family-normal</span></span>
<span class="line"><span style="color: #A6ACCD">  --notify-onboard-font-size-5</span></span>
<span class="line"><span style="color: #A6ACCD">  --notify-onboard-gray-300</span></span>
<span class="line"><span style="color: #A6ACCD">  --notify-onboard-gray-600</span></span>
<span class="line"><span style="color: #A6ACCD">  --notify-onboard-border-radius</span></span>
<span class="line"><span style="color: #A6ACCD">  --notify-onboard-font-size-7</span></span>
<span class="line"><span style="color: #A6ACCD">  --notify-onboard-font-size-6</span></span>
<span class="line"><span style="color: #A6ACCD">  --notify-onboard-line-height-4</span></span>
<span class="line"><span style="color: #A6ACCD">  --notify-onboard-primary-100</span></span>
<span class="line"><span style="color: #A6ACCD">  --notify-onboard-primary-400</span></span>
<span class="line"><span style="color: #A6ACCD">  --notify-onboard-main-padding</span></span>
<span class="line"><span style="color: #A6ACCD">  --notify-onboard-z-index</span></span>
<span class="line"><span style="color: #A6ACCD">  --notify-onboard-background</span></span>
<span class="line"><span style="color: #A6ACCD">  --notify-onboard-close-icon-color</span></span>
<span class="line"><span style="color: #A6ACCD">  --notify-onboard-close-icon-hover</span></span>
<span class="line"><span style="color: #A6ACCD">  --notify-onboard-transaction-status-color</span></span>
<span class="line"><span style="color: #A6ACCD">  --notify-onboard-transaction-font-size</span></span>
<span class="line"><span style="color: #A6ACCD">  --notify-onboard-hash-time-font-size</span></span>
<span class="line"><span style="color: #A6ACCD">  --notify-onboard-hash-time-font-line-height</span></span>
<span class="line"><span style="color: #A6ACCD">  --notify-onboard-address-hash-color</span></span>
<span class="line"><span style="color: #A6ACCD">  --notify-onboard-anchor-color</span></span>
<span class="line"><span style="color: #89DDFF">}</span></span>
<span class="line"></span></code></pre>`}}),S=new q({props:{type:"note",$$slots:{default:[ls]},$$scope:{ctx:b}}}),{c(){n=g("h1"),o=F("Custom Styling"),e=L(),D=g("p"),c=F("You can customize web3-onboard to match the look and feel of your dapp. web3-onboard exposes css variables for each of its UI components."),C=L(),_(t.$$.fragment),w=L(),A=g("h2"),_(a.$$.fragment),y=F(" CSS custom properties (variables)"),m=L(),i=g("p"),R=F("The Onboard styles can customized via "),_(k.$$.fragment),H=F(". The following properties and their default properties can be customized by adding these variables to the "),_(z.$$.fragment),W=F(" in your CSS file:"),U=L(),_(x.$$.fragment),_(S.$$.fragment),this.h()},l(s){n=$(s,"H1",{});var p=h(n);o=d(p,"Custom Styling"),p.forEach(l),e=N(s),D=$(s,"P",{});var P=h(D);c=d(P,"You can customize web3-onboard to match the look and feel of your dapp. web3-onboard exposes css variables for each of its UI components."),P.forEach(l),C=N(s),E(t.$$.fragment,s),w=N(s),A=$(s,"H2",{id:!0,tabindex:!0});var B=h(A);E(a.$$.fragment,B),y=d(B," CSS custom properties (variables)"),B.forEach(l),m=N(s),i=$(s,"P",{});var u=h(i);R=d(u,"The Onboard styles can customized via "),E(k.$$.fragment,u),H=d(u,". The following properties and their default properties can be customized by adding these variables to the "),E(z.$$.fragment,u),W=d(u," in your CSS file:"),u.forEach(l),U=N(s),E(x.$$.fragment,s),E(S.$$.fragment,s),this.h()},h(){Y(A,"id","css-custom-properties-variables"),Y(A,"tabindex","-1")},m(s,p){r(s,n,p),f(n,o),r(s,e,p),r(s,D,p),f(D,c),r(s,C,p),T(t,s,p),r(s,w,p),r(s,A,p),T(a,A,null),f(A,y),r(s,m,p),r(s,i,p),f(i,R),T(k,i,null),f(i,H),T(z,i,null),f(i,W),r(s,U,p),T(x,s,p),T(S,s,p),M=!0},p(s,[p]){const P={};p&1&&(P.$$scope={dirty:p,ctx:s}),t.$set(P);const B={};p&1&&(B.$$scope={dirty:p,ctx:s}),a.$set(B);const u={};p&1&&(u.$$scope={dirty:p,ctx:s}),k.$set(u);const Z={};p&1&&(Z.$$scope={dirty:p,ctx:s}),S.$set(Z)},i(s){M||(O(t.$$.fragment,s),O(a.$$.fragment,s),O(k.$$.fragment,s),O(z.$$.fragment,s),O(x.$$.fragment,s),O(S.$$.fragment,s),M=!0)},o(s){v(t.$$.fragment,s),v(a.$$.fragment,s),v(k.$$.fragment,s),v(z.$$.fragment,s),v(x.$$.fragment,s),v(S.$$.fragment,s),M=!1},d(s){s&&l(n),s&&l(e),s&&l(D),s&&l(C),I(t,s),s&&l(w),s&&l(A),I(a),s&&l(m),s&&l(i),I(k),I(z),s&&l(U),I(x,s),I(S,s)}}}class Fs extends Q{constructor(n){super(),j(this,n,null,ps,J,{})}}export{Fs as default};
