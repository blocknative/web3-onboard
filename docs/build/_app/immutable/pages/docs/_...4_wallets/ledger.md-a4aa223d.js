import{S as os,i as ts,s as rs,e as W,t as u,k as x,w as y,c as I,a as M,h as m,d as p,m as L,x as F,b as v,g as t,M as P,y as D,q as A,o as f,B as $,E as ps}from"../../../chunks/index-4af071d0.js";import"../../../chunks/scroll-9ce8c56b.js";import{C as Y}from"../../../chunks/CodeFence-7c02fe57.js";import{L as j}from"../../../chunks/Link-5aa5b43b.js";/* empty css                                                            */import{T as cs,a as es}from"../../../chunks/Tabs-6a4561b3.js";import"../../../chunks/singletons-13ae2ec1.js";import"../../../chunks/contexts-e4ffdb2f.js";function Cs(r){let n;return{c(){n=u("#")},l(a){n=m(a,"#")},m(a,l){t(a,n,l)},d(a){a&&p(n)}}}function is(r){let n,a;return n=new Y({props:{lang:"bash",ext:"sh",linesCount:2,rawCode:`yarn add @web3-onboard/ledger
`,showCopyCode:!0,code:`<pre><code><span class="line"><span style="color: #A6ACCD">yarn add @web3-onboard/ledger</span></span>
<span class="line"></span></code></pre>`}}),{c(){y(n.$$.fragment)},l(l){F(n.$$.fragment,l)},m(l,c){D(n,l,c),a=!0},p:ps,i(l){a||(A(n.$$.fragment,l),a=!0)},o(l){f(n.$$.fragment,l),a=!1},d(l){$(n,l)}}}function ys(r){let n,a;return n=new Y({props:{lang:"bash",ext:"sh",linesCount:2,rawCode:`npm install @web3-onboard/ledger
`,showCopyCode:!0,code:`<pre><code><span class="line"><span style="color: #A6ACCD">npm install @web3-onboard/ledger</span></span>
<span class="line"></span></code></pre>`}}),{c(){y(n.$$.fragment)},l(l){F(n.$$.fragment,l)},m(l,c){D(n,l,c),a=!0},p:ps,i(l){a||(A(n.$$.fragment,l),a=!0)},o(l){f(n.$$.fragment,l),a=!1},d(l){$(n,l)}}}function Fs(r){let n,a,l,c;return n=new es({props:{value:"yarn",$$slots:{default:[is]},$$scope:{ctx:r}}}),l=new es({props:{value:"npm",$$slots:{default:[ys]},$$scope:{ctx:r}}}),{c(){y(n.$$.fragment),a=x(),y(l.$$.fragment)},l(o){F(n.$$.fragment,o),a=L(o),F(l.$$.fragment,o)},m(o,C){D(n,o,C),t(o,a,C),D(l,o,C),c=!0},p(o,C){const i={};C&1&&(i.$$scope={dirty:C,ctx:o}),n.$set(i);const d={};C&1&&(d.$$scope={dirty:C,ctx:o}),l.$set(d)},i(o){c||(A(n.$$.fragment,o),A(l.$$.fragment,o),c=!0)},o(o){f(n.$$.fragment,o),f(l.$$.fragment,o),c=!1},d(o){$(n,o),o&&p(a),$(l,o)}}}function Ds(r){let n;return{c(){n=u("#")},l(a){n=m(a,"#")},m(a,l){t(a,n,l)},d(a){a&&p(n)}}}function As(r){let n;return{c(){n=u("#")},l(a){n=m(a,"#")},m(a,l){t(a,n,l)},d(a){a&&p(n)}}}function fs(r){let n;return{c(){n=u("#")},l(a){n=m(a,"#")},m(a,l){t(a,n,l)},d(a){a&&p(n)}}}function $s(r){let n;return{c(){n=u("here")},l(a){n=m(a,"here")},m(a,l){t(a,n,l)},d(a){a&&p(n)}}}function us(r){let n,a,l,c,o,C,i,d,Z,z,_,J,B,h,ss,K,H,g,w,ns,Q,N,b,k,as,V,O,ls,E,X;return d=new j({props:{class:"header-anchor",href:"#install","aria-hidden":"true",$$slots:{default:[Cs]},$$scope:{ctx:r}}}),_=new cs({props:{values:["yarn","npm"],$$slots:{default:[Fs]},$$scope:{ctx:r}}}),h=new j({props:{class:"header-anchor",href:"#options","aria-hidden":"true",$$slots:{default:[Ds]},$$scope:{ctx:r}}}),H=new Y({props:{lang:"typescript",ext:"ts",linesCount:36,code:`<pre><code><span class="line"><span style="color: #C792EA">type</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">LedgerOptions</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>
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
<span class="line"></span></code></pre>`}}),w=new j({props:{class:"header-anchor",href:"#usage","aria-hidden":"true",$$slots:{default:[As]},$$scope:{ctx:r}}}),N=new Y({props:{lang:"typescript",ext:"ts",linesCount:16,code:`<pre><code><span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> Onboard </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/core</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> ledgerModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/ledger</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> ledger </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">ledgerModule</span><span style="color: #A6ACCD">()</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> onboard </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">Onboard</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #89DDFF">  </span><span style="color: #464B5D; font-style: italic">// ... other Onboard options</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">wallets</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span></span>
<span class="line"><span style="color: #A6ACCD">    ledger</span></span>
<span class="line"><span style="color: #89DDFF">    </span><span style="color: #464B5D; font-style: italic">//... other wallets</span></span>
<span class="line"><span style="color: #A6ACCD">  ]</span></span>
<span class="line"><span style="color: #89DDFF">}</span><span style="color: #A6ACCD">)</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> connectedWallets </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">await</span><span style="color: #A6ACCD"> onboard</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">connectWallet</span><span style="color: #A6ACCD">()</span></span>
<span class="line"><span style="color: #A6ACCD">console</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">log</span><span style="color: #A6ACCD">(connectedWallets)</span></span>
<span class="line"></span></code></pre>`}}),k=new j({props:{class:"header-anchor",href:"#build-environments","aria-hidden":"true",$$slots:{default:[fs]},$$scope:{ctx:r}}}),E=new j({props:{href:"/docs/modules/core#build-environments",$$slots:{default:[$s]},$$scope:{ctx:r}}}),{c(){n=W("h1"),a=u("Ledger"),l=x(),c=W("p"),o=u("Wallet module for connecting Ledger hardware wallets to web3-onboard"),C=x(),i=W("h2"),y(d.$$.fragment),Z=u(" Install"),z=x(),y(_.$$.fragment),J=x(),B=W("h2"),y(h.$$.fragment),ss=u(" Options"),K=x(),y(H.$$.fragment),g=W("h2"),y(w.$$.fragment),ns=u(" Usage"),Q=x(),y(N.$$.fragment),b=W("h2"),y(k.$$.fragment),as=u(" Build Environments"),V=x(),O=W("p"),ls=u("For build env configurations and setups please see the Build Env section "),y(E.$$.fragment),this.h()},l(s){n=I(s,"H1",{});var e=M(n);a=m(e,"Ledger"),e.forEach(p),l=L(s),c=I(s,"P",{});var R=M(c);o=m(R,"Wallet module for connecting Ledger hardware wallets to web3-onboard"),R.forEach(p),C=L(s),i=I(s,"H2",{id:!0,tabindex:!0});var T=M(i);F(d.$$.fragment,T),Z=m(T," Install"),T.forEach(p),z=L(s),F(_.$$.fragment,s),J=L(s),B=I(s,"H2",{id:!0,tabindex:!0});var q=M(B);F(h.$$.fragment,q),ss=m(q," Options"),q.forEach(p),K=L(s),F(H.$$.fragment,s),g=I(s,"H2",{id:!0,tabindex:!0});var G=M(g);F(w.$$.fragment,G),ns=m(G," Usage"),G.forEach(p),Q=L(s),F(N.$$.fragment,s),b=I(s,"H2",{id:!0,tabindex:!0});var S=M(b);F(k.$$.fragment,S),as=m(S," Build Environments"),S.forEach(p),V=L(s),O=I(s,"P",{});var U=M(O);ls=m(U,"For build env configurations and setups please see the Build Env section "),F(E.$$.fragment,U),U.forEach(p),this.h()},h(){v(i,"id","install"),v(i,"tabindex","-1"),v(B,"id","options"),v(B,"tabindex","-1"),v(g,"id","usage"),v(g,"tabindex","-1"),v(b,"id","build-environments"),v(b,"tabindex","-1")},m(s,e){t(s,n,e),P(n,a),t(s,l,e),t(s,c,e),P(c,o),t(s,C,e),t(s,i,e),D(d,i,null),P(i,Z),t(s,z,e),D(_,s,e),t(s,J,e),t(s,B,e),D(h,B,null),P(B,ss),t(s,K,e),D(H,s,e),t(s,g,e),D(w,g,null),P(g,ns),t(s,Q,e),D(N,s,e),t(s,b,e),D(k,b,null),P(b,as),t(s,V,e),t(s,O,e),P(O,ls),D(E,O,null),X=!0},p(s,[e]){const R={};e&1&&(R.$$scope={dirty:e,ctx:s}),d.$set(R);const T={};e&1&&(T.$$scope={dirty:e,ctx:s}),_.$set(T);const q={};e&1&&(q.$$scope={dirty:e,ctx:s}),h.$set(q);const G={};e&1&&(G.$$scope={dirty:e,ctx:s}),w.$set(G);const S={};e&1&&(S.$$scope={dirty:e,ctx:s}),k.$set(S);const U={};e&1&&(U.$$scope={dirty:e,ctx:s}),E.$set(U)},i(s){X||(A(d.$$.fragment,s),A(_.$$.fragment,s),A(h.$$.fragment,s),A(H.$$.fragment,s),A(w.$$.fragment,s),A(N.$$.fragment,s),A(k.$$.fragment,s),A(E.$$.fragment,s),X=!0)},o(s){f(d.$$.fragment,s),f(_.$$.fragment,s),f(h.$$.fragment,s),f(H.$$.fragment,s),f(w.$$.fragment,s),f(N.$$.fragment,s),f(k.$$.fragment,s),f(E.$$.fragment,s),X=!1},d(s){s&&p(n),s&&p(l),s&&p(c),s&&p(C),s&&p(i),$(d),s&&p(z),$(_,s),s&&p(J),s&&p(B),$(h),s&&p(K),$(H,s),s&&p(g),$(w),s&&p(Q),$(N,s),s&&p(b),$(k),s&&p(V),s&&p(O),$(E)}}}class ks extends os{constructor(n){super(),ts(this,n,null,us,rs,{})}}export{ks as default};
