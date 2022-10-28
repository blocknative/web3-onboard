import{S as ss,i as ns,s as es,e as z,t as u,k as x,w as f,c as I,a as K,h as A,d as o,m as B,x as $,b as T,g as c,M as q,y as D,q as C,o as m,B as y,E as Z}from"../../../chunks/index-c32358ff.js";import"../../../chunks/scroll-5387a6f1.js";import{C as N}from"../../../chunks/CodeFence-ac7b69e1.js";import{L as J}from"../../../chunks/Link-d3089e65.js";/* empty css                                                            */import{T as as,a as Y}from"../../../chunks/Tabs-f2c9522f.js";import"../../../chunks/singletons-37dfeae3.js";import"../../../chunks/contexts-2aef7541.js";function ls(i){let n;return{c(){n=u("Coinbase Wallet Developer Docs")},l(e){n=A(e,"Coinbase Wallet Developer Docs")},m(e,a){c(e,n,a)},d(e){e&&o(n)}}}function ts(i){let n;return{c(){n=u("#")},l(e){n=A(e,"#")},m(e,a){c(e,n,a)},d(e){e&&o(n)}}}function os(i){let n,e;return n=new N({props:{lang:"bash",ext:"sh",linesCount:2,rawCode:`yarn add @web3-onboard/coinbase
`,showCopyCode:!0,code:`<pre><code><span class="line"><span style="color: #A6ACCD">yarn add @web3-onboard/coinbase</span></span>
<span class="line"></span></code></pre>`}}),{c(){f(n.$$.fragment)},l(a){$(n.$$.fragment,a)},m(a,p){D(n,a,p),e=!0},p:Z,i(a){e||(C(n.$$.fragment,a),e=!0)},o(a){m(n.$$.fragment,a),e=!1},d(a){y(n,a)}}}function ps(i){let n,e;return n=new N({props:{lang:"bash",ext:"sh",linesCount:2,rawCode:`npm install @web3-onboard/coinbase
`,showCopyCode:!0,code:`<pre><code><span class="line"><span style="color: #A6ACCD">npm install @web3-onboard/coinbase</span></span>
<span class="line"></span></code></pre>`}}),{c(){f(n.$$.fragment)},l(a){$(n.$$.fragment,a)},m(a,p){D(n,a,p),e=!0},p:Z,i(a){e||(C(n.$$.fragment,a),e=!0)},o(a){m(n.$$.fragment,a),e=!1},d(a){y(n,a)}}}function rs(i){let n,e,a,p;return n=new Y({props:{value:"yarn",$$slots:{default:[os]},$$scope:{ctx:i}}}),a=new Y({props:{value:"npm",$$slots:{default:[ps]},$$scope:{ctx:i}}}),{c(){f(n.$$.fragment),e=x(),f(a.$$.fragment)},l(t){$(n.$$.fragment,t),e=B(t),$(a.$$.fragment,t)},m(t,r){D(n,t,r),c(t,e,r),D(a,t,r),p=!0},p(t,r){const S={};r&1&&(S.$$scope={dirty:r,ctx:t}),n.$set(S);const k={};r&1&&(k.$$scope={dirty:r,ctx:t}),a.$set(k)},i(t){p||(C(n.$$.fragment,t),C(a.$$.fragment,t),p=!0)},o(t){m(n.$$.fragment,t),m(a.$$.fragment,t),p=!1},d(t){y(n,t),t&&o(e),y(a,t)}}}function cs(i){let n;return{c(){n=u("#")},l(e){n=A(e,"#")},m(e,a){c(e,n,a)},d(e){e&&o(n)}}}function is(i){let n;return{c(){n=u("#")},l(e){n=A(e,"#")},m(e,a){c(e,n,a)},d(e){e&&o(n)}}}function fs(i){let n,e,a,p,t,r,S,k,d,_,Q,L,g,P,F,h,R,U,W,b,w,V,j,E,G;return r=new J({props:{href:"https://docs.cloud.coinbase.com/wallet-sdk/docs",target:"_blank",rel:"noopener noreferrer",$$slots:{default:[ls]},$$scope:{ctx:i}}}),_=new J({props:{class:"header-anchor",href:"#install","aria-hidden":"true",$$slots:{default:[ts]},$$scope:{ctx:i}}}),g=new as({props:{values:["yarn","npm"],$$slots:{default:[rs]},$$scope:{ctx:i}}}),h=new J({props:{class:"header-anchor",href:"#options","aria-hidden":"true",$$slots:{default:[cs]},$$scope:{ctx:i}}}),W=new N({props:{lang:"typescript",ext:"ts",linesCount:4,code:`<pre><code><span class="line"><span style="color: #C792EA">type</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">CoinbaseWalletOptions</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">darkMode</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">boolean</span><span style="color: #A6ACCD"> </span><span style="color: #464B5D; font-style: italic">// default = false</span></span>
<span class="line"><span style="color: #89DDFF">}</span></span>
<span class="line"></span></code></pre>`}}),w=new J({props:{class:"header-anchor",href:"#usage","aria-hidden":"true",$$slots:{default:[is]},$$scope:{ctx:i}}}),E=new N({props:{lang:"typescript",ext:"ts",linesCount:20,code:`<pre><code><span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> Onboard </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/core</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> coinbaseWalletModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/coinbase</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #464B5D; font-style: italic">// initialize the module with options</span></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> coinbaseWalletSdk </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">coinbaseWalletModule</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">darkMode</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FF9CAC">true</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD">)</span></span>
<span class="line"></span>
<span class="line"><span style="color: #464B5D; font-style: italic">// can also initialize with no options...</span></span>
<span class="line"><span style="color: #464B5D; font-style: italic">// const coinbaseWalletSdk = coinbaseWalletSdk()</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> onboard </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">Onboard</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #89DDFF">  </span><span style="color: #464B5D; font-style: italic">// ... other Onboard options</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">wallets</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span></span>
<span class="line"><span style="color: #A6ACCD">    coinbaseWalletSdk</span></span>
<span class="line"><span style="color: #89DDFF">    </span><span style="color: #464B5D; font-style: italic">//... other wallets</span></span>
<span class="line"><span style="color: #A6ACCD">  ]</span></span>
<span class="line"><span style="color: #89DDFF">}</span><span style="color: #A6ACCD">)</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> connectedWallets </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">await</span><span style="color: #A6ACCD"> onboard</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">connectWallet</span><span style="color: #A6ACCD">()</span></span>
<span class="line"><span style="color: #A6ACCD">console</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">log</span><span style="color: #A6ACCD">(connectedWallets)</span></span>
<span class="line"></span></code></pre>`}}),{c(){n=z("h1"),e=u("@web3-onboard/coinbase"),a=x(),p=z("p"),t=u("Wallet module for connecting Coinbase Wallet SDK to web3-onboard. Check out the "),f(r.$$.fragment),S=u(" for more information."),k=x(),d=z("h2"),f(_.$$.fragment),Q=u(" Install"),L=x(),f(g.$$.fragment),P=x(),F=z("h2"),f(h.$$.fragment),R=u(" Options"),U=x(),f(W.$$.fragment),b=z("h2"),f(w.$$.fragment),V=u(" Usage"),j=x(),f(E.$$.fragment),this.h()},l(s){n=I(s,"H1",{});var l=K(n);e=A(l,"@web3-onboard/coinbase"),l.forEach(o),a=B(s),p=I(s,"P",{});var v=K(p);t=A(v,"Wallet module for connecting Coinbase Wallet SDK to web3-onboard. Check out the "),$(r.$$.fragment,v),S=A(v," for more information."),v.forEach(o),k=B(s),d=I(s,"H2",{id:!0,tabindex:!0});var O=K(d);$(_.$$.fragment,O),Q=A(O," Install"),O.forEach(o),L=B(s),$(g.$$.fragment,s),P=B(s),F=I(s,"H2",{id:!0,tabindex:!0});var M=K(F);$(h.$$.fragment,M),R=A(M," Options"),M.forEach(o),U=B(s),$(W.$$.fragment,s),b=I(s,"H2",{id:!0,tabindex:!0});var H=K(b);$(w.$$.fragment,H),V=A(H," Usage"),H.forEach(o),j=B(s),$(E.$$.fragment,s),this.h()},h(){T(d,"id","install"),T(d,"tabindex","-1"),T(F,"id","options"),T(F,"tabindex","-1"),T(b,"id","usage"),T(b,"tabindex","-1")},m(s,l){c(s,n,l),q(n,e),c(s,a,l),c(s,p,l),q(p,t),D(r,p,null),q(p,S),c(s,k,l),c(s,d,l),D(_,d,null),q(d,Q),c(s,L,l),D(g,s,l),c(s,P,l),c(s,F,l),D(h,F,null),q(F,R),c(s,U,l),D(W,s,l),c(s,b,l),D(w,b,null),q(b,V),c(s,j,l),D(E,s,l),G=!0},p(s,[l]){const v={};l&1&&(v.$$scope={dirty:l,ctx:s}),r.$set(v);const O={};l&1&&(O.$$scope={dirty:l,ctx:s}),_.$set(O);const M={};l&1&&(M.$$scope={dirty:l,ctx:s}),g.$set(M);const H={};l&1&&(H.$$scope={dirty:l,ctx:s}),h.$set(H);const X={};l&1&&(X.$$scope={dirty:l,ctx:s}),w.$set(X)},i(s){G||(C(r.$$.fragment,s),C(_.$$.fragment,s),C(g.$$.fragment,s),C(h.$$.fragment,s),C(W.$$.fragment,s),C(w.$$.fragment,s),C(E.$$.fragment,s),G=!0)},o(s){m(r.$$.fragment,s),m(_.$$.fragment,s),m(g.$$.fragment,s),m(h.$$.fragment,s),m(W.$$.fragment,s),m(w.$$.fragment,s),m(E.$$.fragment,s),G=!1},d(s){s&&o(n),s&&o(a),s&&o(p),y(r),s&&o(k),s&&o(d),y(_),s&&o(L),y(g,s),s&&o(P),s&&o(F),y(h),s&&o(U),y(W,s),s&&o(b),y(w),s&&o(j),y(E,s)}}}class Fs extends ss{constructor(n){super(),ns(this,n,null,fs,es,{})}}export{Fs as default};
