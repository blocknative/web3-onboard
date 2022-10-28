import{S as K,i as Q,s as R,e as q,t as h,k as T,w as d,c as I,a as L,h as g,d as p,m as W,x as m,b as v,g as c,M as N,y as u,q as D,o as C,B as y,E as J}from"../../../chunks/index-c32358ff.js";import"../../../chunks/scroll-5387a6f1.js";import{C as j}from"../../../chunks/CodeFence-ac7b69e1.js";import{L as P}from"../../../chunks/Link-d3089e65.js";/* empty css                                                            */import{T as V,a as G}from"../../../chunks/Tabs-f2c9522f.js";import"../../../chunks/singletons-37dfeae3.js";import"../../../chunks/contexts-2aef7541.js";function X(r){let n;return{c(){n=h("#")},l(a){n=g(a,"#")},m(a,e){c(a,n,e)},d(a){a&&p(n)}}}function Y(r){let n;return{c(){n=h("#")},l(a){n=g(a,"#")},m(a,e){c(a,n,e)},d(a){a&&p(n)}}}function Z(r){let n,a;return n=new j({props:{lang:"bash",ext:"sh",linesCount:2,rawCode:`yarn add @web3-onboard/dcent
`,showCopyCode:!0,code:`<pre><code><span class="line"><span style="color: #A6ACCD">yarn add @web3-onboard/dcent</span></span>
<span class="line"></span></code></pre>`}}),{c(){d(n.$$.fragment)},l(e){m(n.$$.fragment,e)},m(e,o){u(n,e,o),a=!0},p:J,i(e){a||(D(n.$$.fragment,e),a=!0)},o(e){C(n.$$.fragment,e),a=!1},d(e){y(n,e)}}}function ss(r){let n,a;return n=new j({props:{lang:"bash",ext:"sh",linesCount:2,rawCode:`npm install @web3-onboard/dcent
`,showCopyCode:!0,code:`<pre><code><span class="line"><span style="color: #A6ACCD">npm install @web3-onboard/dcent</span></span>
<span class="line"></span></code></pre>`}}),{c(){d(n.$$.fragment)},l(e){m(n.$$.fragment,e)},m(e,o){u(n,e,o),a=!0},p:J,i(e){a||(D(n.$$.fragment,e),a=!0)},o(e){C(n.$$.fragment,e),a=!1},d(e){y(n,e)}}}function ns(r){let n,a,e,o;return n=new G({props:{value:"yarn",$$slots:{default:[Z]},$$scope:{ctx:r}}}),e=new G({props:{value:"npm",$$slots:{default:[ss]},$$scope:{ctx:r}}}),{c(){d(n.$$.fragment),a=T(),d(e.$$.fragment)},l(t){m(n.$$.fragment,t),a=W(t),m(e.$$.fragment,t)},m(t,i){u(n,t,i),c(t,a,i),u(e,t,i),o=!0},p(t,i){const _={};i&1&&(_.$$scope={dirty:i,ctx:t}),n.$set(_);const $={};i&1&&($.$$scope={dirty:i,ctx:t}),e.$set($)},i(t){o||(D(n.$$.fragment,t),D(e.$$.fragment,t),o=!0)},o(t){C(n.$$.fragment,t),C(e.$$.fragment,t),o=!1},d(t){y(n,t),t&&p(a),y(e,t)}}}function es(r){let n;return{c(){n=h("#")},l(a){n=g(a,"#")},m(a,e){c(a,n,e)},d(a){a&&p(n)}}}function as(r){let n,a,e,o,t,i,_,$,A,S,H,F,B,f,b,U,M,w,O;return t=new P({props:{class:"header-anchor",href:"#wallet-module-for-connecting-d-cent-hardware-wallets-to-web3-onboard","aria-hidden":"true",$$slots:{default:[X]},$$scope:{ctx:r}}}),A=new P({props:{class:"header-anchor",href:"#install","aria-hidden":"true",$$slots:{default:[Y]},$$scope:{ctx:r}}}),F=new V({props:{values:["yarn","npm"],$$slots:{default:[ns]},$$scope:{ctx:r}}}),b=new P({props:{class:"header-anchor",href:"#usage","aria-hidden":"true",$$slots:{default:[es]},$$scope:{ctx:r}}}),w=new j({props:{lang:"typescript",ext:"ts",linesCount:16,code:`<pre><code><span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> Onboard </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/core</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> dcentModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/dcent</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> dcent </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">dcentModule</span><span style="color: #A6ACCD">()</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> onboard </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">Onboard</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #89DDFF">  </span><span style="color: #464B5D; font-style: italic">// ... other Onboard options</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">wallets</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span></span>
<span class="line"><span style="color: #A6ACCD">    dcent</span></span>
<span class="line"><span style="color: #89DDFF">    </span><span style="color: #464B5D; font-style: italic">//... other wallets</span></span>
<span class="line"><span style="color: #A6ACCD">  ]</span></span>
<span class="line"><span style="color: #89DDFF">}</span><span style="color: #A6ACCD">)</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> connectedWallets </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">await</span><span style="color: #A6ACCD"> onboard</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">connectWallet</span><span style="color: #A6ACCD">()</span></span>
<span class="line"><span style="color: #A6ACCD">console</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">log</span><span style="color: #A6ACCD">(connectedWallets)</span></span>
<span class="line"></span></code></pre>`}}),{c(){n=q("h1"),a=h("@web3-onboard/dcent"),e=T(),o=q("h2"),d(t.$$.fragment),i=h(" Wallet module for connecting D'CENT hardware wallets to web3-onboard"),_=T(),$=q("h3"),d(A.$$.fragment),S=h(" Install"),H=T(),d(F.$$.fragment),B=T(),f=q("h3"),d(b.$$.fragment),U=h(" Usage"),M=T(),d(w.$$.fragment),this.h()},l(s){n=I(s,"H1",{});var l=L(n);a=g(l,"@web3-onboard/dcent"),l.forEach(p),e=W(s),o=I(s,"H2",{id:!0,tabindex:!0});var E=L(o);m(t.$$.fragment,E),i=g(E," Wallet module for connecting D'CENT hardware wallets to web3-onboard"),E.forEach(p),_=W(s),$=I(s,"H3",{id:!0,tabindex:!0});var x=L($);m(A.$$.fragment,x),S=g(x," Install"),x.forEach(p),H=W(s),m(F.$$.fragment,s),B=W(s),f=I(s,"H3",{id:!0,tabindex:!0});var k=L(f);m(b.$$.fragment,k),U=g(k," Usage"),k.forEach(p),M=W(s),m(w.$$.fragment,s),this.h()},h(){v(o,"id","wallet-module-for-connecting-d-cent-hardware-wallets-to-web3-onboard"),v(o,"tabindex","-1"),v($,"id","install"),v($,"tabindex","-1"),v(f,"id","usage"),v(f,"tabindex","-1")},m(s,l){c(s,n,l),N(n,a),c(s,e,l),c(s,o,l),u(t,o,null),N(o,i),c(s,_,l),c(s,$,l),u(A,$,null),N($,S),c(s,H,l),u(F,s,l),c(s,B,l),c(s,f,l),u(b,f,null),N(f,U),c(s,M,l),u(w,s,l),O=!0},p(s,[l]){const E={};l&1&&(E.$$scope={dirty:l,ctx:s}),t.$set(E);const x={};l&1&&(x.$$scope={dirty:l,ctx:s}),A.$set(x);const k={};l&1&&(k.$$scope={dirty:l,ctx:s}),F.$set(k);const z={};l&1&&(z.$$scope={dirty:l,ctx:s}),b.$set(z)},i(s){O||(D(t.$$.fragment,s),D(A.$$.fragment,s),D(F.$$.fragment,s),D(b.$$.fragment,s),D(w.$$.fragment,s),O=!0)},o(s){C(t.$$.fragment,s),C(A.$$.fragment,s),C(F.$$.fragment,s),C(b.$$.fragment,s),C(w.$$.fragment,s),O=!1},d(s){s&&p(n),s&&p(e),s&&p(o),y(t),s&&p(_),s&&p($),y(A),s&&p(H),y(F,s),s&&p(B),s&&p(f),y(b),s&&p(M),y(w,s)}}}class fs extends K{constructor(n){super(),Q(this,n,null,as,R,{})}}export{fs as default};
