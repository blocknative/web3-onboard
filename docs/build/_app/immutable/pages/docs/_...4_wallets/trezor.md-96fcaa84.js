import{S as os,i as ts,s as rs,e as O,t as m,k as z,w as D,c as I,a as L,h as u,d as e,m as x,x as F,b as v,g as t,M as P,y as i,q as A,o as f,B as $,E as es}from"../../../chunks/index-4af071d0.js";import"../../../chunks/scroll-9ce8c56b.js";import{C as Y}from"../../../chunks/CodeFence-7c02fe57.js";import{L as S}from"../../../chunks/Link-5aa5b43b.js";/* empty css                                                            */import{T as cs,a as ps}from"../../../chunks/Tabs-6a4561b3.js";import"../../../chunks/singletons-13ae2ec1.js";import"../../../chunks/contexts-e4ffdb2f.js";function Cs(r){let n;return{c(){n=m("#")},l(a){n=u(a,"#")},m(a,l){t(a,n,l)},d(a){a&&e(n)}}}function ys(r){let n,a;return n=new Y({props:{lang:"bash",ext:"sh",linesCount:2,rawCode:`yarn add @web3-onboard/trezor
`,showCopyCode:!0,code:`<pre><code><span class="line"><span style="color: #A6ACCD">yarn add @web3-onboard/trezor</span></span>
<span class="line"></span></code></pre>`}}),{c(){D(n.$$.fragment)},l(l){F(n.$$.fragment,l)},m(l,c){i(n,l,c),a=!0},p:es,i(l){a||(A(n.$$.fragment,l),a=!0)},o(l){f(n.$$.fragment,l),a=!1},d(l){$(n,l)}}}function Ds(r){let n,a;return n=new Y({props:{lang:"bash",ext:"sh",linesCount:2,rawCode:`npm install @web3-onboard/trezor
`,showCopyCode:!0,code:`<pre><code><span class="line"><span style="color: #A6ACCD">npm install @web3-onboard/trezor</span></span>
<span class="line"></span></code></pre>`}}),{c(){D(n.$$.fragment)},l(l){F(n.$$.fragment,l)},m(l,c){i(n,l,c),a=!0},p:es,i(l){a||(A(n.$$.fragment,l),a=!0)},o(l){f(n.$$.fragment,l),a=!1},d(l){$(n,l)}}}function Fs(r){let n,a,l,c;return n=new ps({props:{value:"yarn",$$slots:{default:[ys]},$$scope:{ctx:r}}}),l=new ps({props:{value:"npm",$$slots:{default:[Ds]},$$scope:{ctx:r}}}),{c(){D(n.$$.fragment),a=z(),D(l.$$.fragment)},l(o){F(n.$$.fragment,o),a=x(o),F(l.$$.fragment,o)},m(o,C){i(n,o,C),t(o,a,C),i(l,o,C),c=!0},p(o,C){const y={};C&1&&(y.$$scope={dirty:C,ctx:o}),n.$set(y);const d={};C&1&&(d.$$scope={dirty:C,ctx:o}),l.$set(d)},i(o){c||(A(n.$$.fragment,o),A(l.$$.fragment,o),c=!0)},o(o){f(n.$$.fragment,o),f(l.$$.fragment,o),c=!1},d(o){$(n,o),o&&e(a),$(l,o)}}}function is(r){let n;return{c(){n=m("#")},l(a){n=u(a,"#")},m(a,l){t(a,n,l)},d(a){a&&e(n)}}}function As(r){let n;return{c(){n=m("#")},l(a){n=u(a,"#")},m(a,l){t(a,n,l)},d(a){a&&e(n)}}}function fs(r){let n;return{c(){n=m("#")},l(a){n=u(a,"#")},m(a,l){t(a,n,l)},d(a){a&&e(n)}}}function $s(r){let n;return{c(){n=m("here")},l(a){n=u(a,"here")},m(a,l){t(a,n,l)},d(a){a&&e(n)}}}function ms(r){let n,a,l,c,o,C,y,d,Z,j,g,J,B,h,ss,K,T,_,w,ns,Q,H,b,E,as,V,N,ls,k,X;return d=new S({props:{class:"header-anchor",href:"#install","aria-hidden":"true",$$slots:{default:[Cs]},$$scope:{ctx:r}}}),g=new cs({props:{values:["yarn","npm"],$$slots:{default:[Fs]},$$scope:{ctx:r}}}),h=new S({props:{class:"header-anchor",href:"#options","aria-hidden":"true",$$slots:{default:[is]},$$scope:{ctx:r}}}),T=new Y({props:{lang:"typescript",ext:"ts",linesCount:38,code:`<pre><code><span class="line"><span style="color: #C792EA">type</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">TrezorOptions</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">email</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">appUrl</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">customNetwork</span><span style="color: #89DDFF">?:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">CustomNetwork</span></span>
<span class="line"><span style="color: #89DDFF">}</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">interface</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">CustomNetwork</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">networkId</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">number</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">genesis</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">GenesisBlock</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">hardforks</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">Hardfork</span><span style="color: #A6ACCD">[]</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">bootstrapNodes</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">BootstrapNode</span><span style="color: #A6ACCD">[]</span></span>
<span class="line"><span style="color: #89DDFF">}</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">interface</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">GenesisBlock</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">hash</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">timestamp</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">|</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">null</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">gasLimit</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">number</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">difficulty</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">number</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">nonce</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">extraData</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">stateRoot</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span></span>
<span class="line"><span style="color: #89DDFF">}</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">interface</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">Hardfork</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">block</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">number</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">|</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">null</span></span>
<span class="line"><span style="color: #89DDFF">}</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">interface</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">BootstrapNode</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">ip</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">port</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">number</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">|</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">network</span><span style="color: #89DDFF">?:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">chainId</span><span style="color: #89DDFF">?:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">number</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">id</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">location</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">comment</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span></span>
<span class="line"><span style="color: #89DDFF">}</span></span>
<span class="line"></span></code></pre>`}}),w=new S({props:{class:"header-anchor",href:"#usage","aria-hidden":"true",$$slots:{default:[As]},$$scope:{ctx:r}}}),H=new Y({props:{lang:"typescript",ext:"ts",linesCount:19,code:`<pre><code><span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> Onboard </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/core</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> trezorModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/trezor</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> trezor </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">trezorModule</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">email</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">&lt;EMAIL_CONTACT&gt;</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">appUrl</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">&lt;APP_URL&gt;</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF">}</span><span style="color: #A6ACCD">)</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> onboard </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">Onboard</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #89DDFF">  </span><span style="color: #464B5D; font-style: italic">// ... other Onboard options</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">wallets</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span></span>
<span class="line"><span style="color: #A6ACCD">    trezor</span></span>
<span class="line"><span style="color: #89DDFF">    </span><span style="color: #464B5D; font-style: italic">//... other wallets</span></span>
<span class="line"><span style="color: #A6ACCD">  ]</span></span>
<span class="line"><span style="color: #89DDFF">}</span><span style="color: #A6ACCD">)</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> connectedWallets </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">await</span><span style="color: #A6ACCD"> onboard</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">connectWallet</span><span style="color: #A6ACCD">()</span></span>
<span class="line"><span style="color: #A6ACCD">console</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">log</span><span style="color: #A6ACCD">(connectedWallets)</span></span>
<span class="line"></span></code></pre>`}}),E=new S({props:{class:"header-anchor",href:"#build-environments","aria-hidden":"true",$$slots:{default:[fs]},$$scope:{ctx:r}}}),k=new S({props:{href:"/docs/modules/core#build-environments",$$slots:{default:[$s]},$$scope:{ctx:r}}}),{c(){n=O("h1"),a=m("Trezor"),l=z(),c=O("p"),o=m("Wallet module for connecting Trezor hardware wallets to web3-onboard"),C=z(),y=O("h3"),D(d.$$.fragment),Z=m(" Install"),j=z(),D(g.$$.fragment),J=z(),B=O("h3"),D(h.$$.fragment),ss=m(" Options"),K=z(),D(T.$$.fragment),_=O("h3"),D(w.$$.fragment),ns=m(" Usage"),Q=z(),D(H.$$.fragment),b=O("h2"),D(E.$$.fragment),as=m(" Build Environments"),V=z(),N=O("p"),ls=m("For build env configurations and setups please see the Build Env section "),D(k.$$.fragment),this.h()},l(s){n=I(s,"H1",{});var p=L(n);a=u(p,"Trezor"),p.forEach(e),l=x(s),c=I(s,"P",{});var R=L(c);o=u(R,"Wallet module for connecting Trezor hardware wallets to web3-onboard"),R.forEach(e),C=x(s),y=I(s,"H3",{id:!0,tabindex:!0});var U=L(y);F(d.$$.fragment,U),Z=u(U," Install"),U.forEach(e),j=x(s),F(g.$$.fragment,s),J=x(s),B=I(s,"H3",{id:!0,tabindex:!0});var W=L(B);F(h.$$.fragment,W),ss=u(W," Options"),W.forEach(e),K=x(s),F(T.$$.fragment,s),_=I(s,"H3",{id:!0,tabindex:!0});var M=L(_);F(w.$$.fragment,M),ns=u(M," Usage"),M.forEach(e),Q=x(s),F(H.$$.fragment,s),b=I(s,"H2",{id:!0,tabindex:!0});var q=L(b);F(E.$$.fragment,q),as=u(q," Build Environments"),q.forEach(e),V=x(s),N=I(s,"P",{});var G=L(N);ls=u(G,"For build env configurations and setups please see the Build Env section "),F(k.$$.fragment,G),G.forEach(e),this.h()},h(){v(y,"id","install"),v(y,"tabindex","-1"),v(B,"id","options"),v(B,"tabindex","-1"),v(_,"id","usage"),v(_,"tabindex","-1"),v(b,"id","build-environments"),v(b,"tabindex","-1")},m(s,p){t(s,n,p),P(n,a),t(s,l,p),t(s,c,p),P(c,o),t(s,C,p),t(s,y,p),i(d,y,null),P(y,Z),t(s,j,p),i(g,s,p),t(s,J,p),t(s,B,p),i(h,B,null),P(B,ss),t(s,K,p),i(T,s,p),t(s,_,p),i(w,_,null),P(_,ns),t(s,Q,p),i(H,s,p),t(s,b,p),i(E,b,null),P(b,as),t(s,V,p),t(s,N,p),P(N,ls),i(k,N,null),X=!0},p(s,[p]){const R={};p&1&&(R.$$scope={dirty:p,ctx:s}),d.$set(R);const U={};p&1&&(U.$$scope={dirty:p,ctx:s}),g.$set(U);const W={};p&1&&(W.$$scope={dirty:p,ctx:s}),h.$set(W);const M={};p&1&&(M.$$scope={dirty:p,ctx:s}),w.$set(M);const q={};p&1&&(q.$$scope={dirty:p,ctx:s}),E.$set(q);const G={};p&1&&(G.$$scope={dirty:p,ctx:s}),k.$set(G)},i(s){X||(A(d.$$.fragment,s),A(g.$$.fragment,s),A(h.$$.fragment,s),A(T.$$.fragment,s),A(w.$$.fragment,s),A(H.$$.fragment,s),A(E.$$.fragment,s),A(k.$$.fragment,s),X=!0)},o(s){f(d.$$.fragment,s),f(g.$$.fragment,s),f(h.$$.fragment,s),f(T.$$.fragment,s),f(w.$$.fragment,s),f(H.$$.fragment,s),f(E.$$.fragment,s),f(k.$$.fragment,s),X=!1},d(s){s&&e(n),s&&e(l),s&&e(c),s&&e(C),s&&e(y),$(d),s&&e(j),$(g,s),s&&e(J),s&&e(B),$(h),s&&e(K),$(T,s),s&&e(_),$(w),s&&e(Q),$(H,s),s&&e(b),$(E),s&&e(V),s&&e(N),$(k)}}}class Es extends os{constructor(n){super(),ts(this,n,null,ms,rs,{})}}export{Es as default};
