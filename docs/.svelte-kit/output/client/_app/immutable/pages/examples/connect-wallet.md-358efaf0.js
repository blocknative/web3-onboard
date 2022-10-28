import{S as ns,i as as,s as ls,I as ys,e as w,c as g,a as k,d as e,b,g as C,M as $,J as is,K as Cs,L as As,q as I,o as W,n as ds,p as us,$ as rs,t as h,h as v,P as Ds,j as ss,E as os,k as T,w as j,m as O,x as P,y as B,B as S,aa as ps}from"../../chunks/index-c32358ff.js";import{c as es}from"../../chunks/contexts-2aef7541.js";import{f as fs}from"../../chunks/scroll-5387a6f1.js";import{i as ms}from"../../chunks/ThemeCustomizer.svelte_svelte_type_style_lang-eee81db4.js";import{i as $s}from"../../chunks/index-92058c84.js";import{C as Q}from"../../chunks/CodeFence-ac7b69e1.js";import{C as Fs}from"../../chunks/CodeInline-8df56a89.js";import{L as X}from"../../chunks/Link-d3089e65.js";/* empty css                                                         */import{T as bs,a as ts}from"../../chunks/Tabs-f2c9522f.js";import"../../chunks/singletons-37dfeae3.js";import"../../chunks/preload-helper-60cab3ee.js";function hs(t){let s,a,l,c;const o=t[2].default,p=ys(o,t,t[1],null);return{c(){s=w("div"),a=w("span"),p&&p.c(),this.h()},l(y){s=g(y,"DIV",{class:!0});var D=k(s);a=g(D,"SPAN",{class:!0});var i=k(a);p&&p.l(i),i.forEach(e),D.forEach(e),this.h()},h(){b(a,"class","mt-px"),b(s,"class",l=es("inline-flex h-6 items-center justify-center rounded-full px-2.5 py-1 text-xs tracking-wide font-mono font-medium","border border-gray-divider shadow-sm",t[0]))},m(y,D){C(y,s,D),$(s,a),p&&p.m(a,null),c=!0},p(y,[D]){p&&p.p&&(!c||D&2)&&is(p,o,y,y[1],c?As(o,y[1],D,null):Cs(y[1]),null),(!c||D&1&&l!==(l=es("inline-flex h-6 items-center justify-center rounded-full px-2.5 py-1 text-xs tracking-wide font-mono font-medium","border border-gray-divider shadow-sm",y[0])))&&b(s,"class",l)},i(y){c||(I(p,y),c=!0)},o(y){W(p,y),c=!1},d(y){y&&e(s),p&&p.d(y)}}}function vs(t,s,a){let{$$slots:l={},$$scope:c}=s,{class:o=""}=s;return t.$$set=p=>{"class"in p&&a(0,o=p.class),"$$scope"in p&&a(1,c=p.$$scope)},[o,c,l]}class ws extends ns{constructor(s){super(),as(this,s,vs,hs,ls,{class:0})}}function gs(t){let s,a,l,c;return{c(){s=w("button"),a=h(t[2]),this.h()},l(o){s=g(o,"BUTTON",{class:!0});var p=k(s);a=v(p,t[2]),p.forEach(e),this.h()},h(){b(s,"class","rounded-lg bg-gray-inverse hover:bg-gray-hover hover:text-gray-inverse transition-all px-4 h-10 text-base text-gray-current")},m(o,p){C(o,s,p),$(s,a),l||(c=Ds(s,"click",t[4]),l=!0)},p(o,p){p&4&&ss(a,o[2])},i:os,o:os,d(o){o&&e(s),l=!1,c()}}}function Es(t){var z,K,q,G,L;let s,a,l,c,o,p=(z=t[1])!=null&&z.ens?`${(q=(K=t[1])==null?void 0:K.ens)==null?void 0:q.name} (${(G=t[1])==null?void 0:G.address})`:`${(L=t[1])==null?void 0:L.address}`,y,D,i,d,F,f,A,R,E,Y,V;function H(u,_){var n,r,N;return(N=(r=(n=u[1])==null?void 0:n.ens)==null?void 0:r.avatar)!=null&&N.url?ks:_s}let x=H(t),m=x(t);return F=new ws({props:{$$slots:{default:[xs]},$$scope:{ctx:t}}}),{c(){s=w("div"),a=w("div"),m.c(),l=T(),c=w("div"),o=w("div"),y=h(p),D=T(),i=w("div"),d=h("Connected to "),j(F.$$.fragment),f=T(),A=w("button"),R=h(t[2]),this.h()},l(u){s=g(u,"DIV",{class:!0});var _=k(s);a=g(_,"DIV",{class:!0});var n=k(a);m.l(n),n.forEach(e),l=O(_),c=g(_,"DIV",{});var r=k(c);o=g(r,"DIV",{class:!0});var N=k(o);y=v(N,p),N.forEach(e),D=O(r),i=g(r,"DIV",{class:!0});var U=k(i);d=v(U,"Connected to "),P(F.$$.fragment,U),U.forEach(e),r.forEach(e),f=O(_),A=g(_,"BUTTON",{class:!0});var M=k(A);R=v(M,t[2]),M.forEach(e),_.forEach(e),this.h()},h(){b(a,"class","w-9 h-9 rounded-full overflow-hidden mr-2"),b(o,"class",""),b(i,"class","text-sm"),b(A,"class","ml-auto rounded-lg bg-gray-inverse hover:bg-gray-hover hover:text-gray-inverse transition-all px-4 h-10 text-base text-gray-current"),b(s,"class","flex items-center w-full px-3 py-2 border border-gray-divider bg-gray-elevate text-gray-inverse rounded-md")},m(u,_){C(u,s,_),$(s,a),m.m(a,null),$(s,l),$(s,c),$(c,o),$(o,y),$(c,D),$(c,i),$(i,d),B(F,i,null),$(s,f),$(s,A),$(A,R),E=!0,Y||(V=Ds(A,"click",t[4]),Y=!0)},p(u,_){var r,N,U,M,J;x===(x=H(u))&&m?m.p(u,_):(m.d(1),m=x(u),m&&(m.c(),m.m(a,null))),(!E||_&2)&&p!==(p=(r=u[1])!=null&&r.ens?`${(U=(N=u[1])==null?void 0:N.ens)==null?void 0:U.name} (${(M=u[1])==null?void 0:M.address})`:`${(J=u[1])==null?void 0:J.address}`)&&ss(y,p);const n={};_&1025&&(n.$$scope={dirty:_,ctx:u}),F.$set(n),(!E||_&4)&&ss(R,u[2])},i(u){E||(I(F.$$.fragment,u),E=!0)},o(u){W(F.$$.fragment,u),E=!1},d(u){u&&e(s),m.d(),S(F),Y=!1,V()}}}function _s(t){let s;return{c(){s=w("div"),this.h()},l(a){s=g(a,"DIV",{class:!0}),k(s).forEach(e),this.h()},h(){b(s,"class","bg-gradient-to-r from-cyan-500 to-blue-500 w-full h-full")},m(a,l){C(a,s,l)},p:os,d(a){a&&e(s)}}}function ks(t){let s,a;return{c(){s=w("img"),this.h()},l(l){s=g(l,"IMG",{src:!0,alt:!0}),this.h()},h(){var l,c,o;ps(s.src,a=(o=(c=(l=t[1])==null?void 0:l.ens)==null?void 0:c.avatar)==null?void 0:o.url)||b(s,"src",a),b(s,"alt","")},m(l,c){C(l,s,c)},p(l,c){var o,p,y;c&2&&!ps(s.src,a=(y=(p=(o=l[1])==null?void 0:o.ens)==null?void 0:p.avatar)==null?void 0:y.url)&&b(s,"src",a)},d(l){l&&e(s)}}}function xs(t){var l,c;let s=((c=(l=t[0])==null?void 0:l[0])==null?void 0:c.label)+"",a;return{c(){a=h(s)},l(o){a=v(o,s)},m(o,p){C(o,a,p)},p(o,p){var y,D;p&1&&s!==(s=((D=(y=o[0])==null?void 0:y[0])==null?void 0:D.label)+"")&&ss(a,s)},d(o){o&&e(a)}}}function Is(t){let s,a,l,c;const o=[Es,gs],p=[];function y(D,i){var d,F;return(F=(d=D[0])==null?void 0:d[0])!=null&&F.provider?0:1}return a=y(t),l=p[a]=o[a](t),{c(){s=w("div"),l.c(),this.h()},l(D){s=g(D,"DIV",{class:!0});var i=k(s);l.l(i),i.forEach(e),this.h()},h(){b(s,"class","flex items-center justify-center border-gray-divider border rounded-md h-40 p-4")},m(D,i){C(D,s,i),p[a].m(s,null),c=!0},p(D,[i]){let d=a;a=y(D),a===d?p[a].p(D,i):(ds(),W(p[d],1,1,()=>{p[d]=null}),us(),l=p[a],l?l.p(D,i):(l=p[a]=o[a](D),l.c()),I(l,1),l.m(s,null))},i(D){c||(I(l),c=!0)},o(D){W(l),c=!1},d(D){D&&e(s),p[a].d()}}}const cs="e0b15c21b7d54cd4814586334af72618";function Ws(t,s,a){let l,c,o,p;const y=$s(),D=ms({wallets:[y],chains:[{id:"0x1",token:"ETH",label:"Ethereum Mainnet",rpcUrl:`https://mainnet.infura.io/v3/${cs}`},{id:"0x3",token:"tROP",label:"Ethereum Ropsten Testnet",rpcUrl:`https://ropsten.infura.io/v3/${cs}`}],appMetadata:{name:"Documentation",icon:"<svg></svg>",description:"Example showcasing how to connect a wallet.",recommendedInjectedWallets:[{name:"MetaMask",url:"https://metamask.io"},{name:"Coinbase",url:"https://wallet.coinbase.com/"}]},accountCenter:{desktop:{enabled:!1},mobile:{enabled:!1}}}),i=A=>A?A.slice(0,6)+"..."+A.slice(-6):null;let d=!1;const F=D.state.select("wallets");rs(t,F,A=>a(0,p=A));async function f(){var A,R;(A=p==null?void 0:p[0])!=null&&A.provider?D.disconnectWallet({label:(R=p==null?void 0:p[0])==null?void 0:R.label}):(a(5,d=!0),await D.connectWallet(),a(5,d=!1))}return t.$$.update=()=>{var A,R,E,Y;t.$$.dirty&1&&a(6,l=(R=(A=p==null?void 0:p[0])==null?void 0:A.accounts)==null?void 0:R[0]),t.$$.dirty&33&&a(2,c=(E=p==null?void 0:p[0])!=null&&E.provider?"Disconnect":d?"Connecting":"Connect"),t.$$.dirty&64&&a(1,o=(Y=l==null?void 0:l.ens)!=null&&Y.name?{ens:l==null?void 0:l.ens,address:i(l==null?void 0:l.address)}:{address:i(l==null?void 0:l.address)})},[p,o,c,F,f,d,l]}class Ms extends ns{constructor(s){super(),as(this,s,Ws,Is,ls,{})}}function js(t){let s;return{c(){s=h("#")},l(a){s=v(a,"#")},m(a,l){C(a,s,l)},d(a){a&&e(s)}}}function Ps(t){let s;return{c(){s=h("#")},l(a){s=v(a,"#")},m(a,l){C(a,s,l)},d(a){a&&e(s)}}}function Bs(t){let s;return{c(){s=h("#")},l(a){s=v(a,"#")},m(a,l){C(a,s,l)},d(a){a&&e(s)}}}function Ss(t){let s,a,l,c,o,p,y,D,i,d,F,f,A,R,E,Y,V,H,x,m,z,K,q,G,L,u,_;return a=new X({props:{class:"header-anchor",href:"#step-1-import-configure","aria-hidden":"true",$$slots:{default:[js]},$$scope:{ctx:t}}}),D=new Q({props:{title:"App.tsx",lang:"javascript",ext:"js",linesCount:49,rawCode:`import { Web3OnboardProvider, init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'

const INFURA_KEY = ''

const ethereumRopsten = {
  id: '0x3',
  token: 'rETH',
  label: 'Ethereum Ropsten',
  rpcUrl: \`https://ropsten.infura.io/v3/\${INFURA_KEY}\`
}

const polygonMainnet = {
  id: '0x89',
  token: 'MATIC',
  label: 'Polygon',
  rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
}

const chains = [ethereumRopsten, polygonMainnet]

const wallets = [injectedModule()]

const appMetadata = {
  name: 'Connect Wallet Example',
  icon: '<svg>My App Icon</svg>',
  description: 'Example showcasing how to connect a wallet.',
  recommendedInjectedWallets: [
    { name: 'MetaMask', url: 'https://metamask.io' },
    { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
  ]
}

const web3Onboard = init({
  wallets,
  chains
  appMetadata
})

function App() {
  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <ConnectWallet />
    </Web3OnboardProvider>
  )
}

export default MyApp
`,showCopyCode:!0,code:`<pre><code><span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">Web3OnboardProvider</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">init</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/react</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> injectedModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/injected-wallets</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> INFURA_KEY </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> ethereumRopsten </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">id</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">0x3</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">token</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">rETH</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">label</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">Ethereum Ropsten</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">rpcUrl</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">\`</span><span style="color: #C3E88D">https://ropsten.infura.io/v3/</span><span style="color: #89DDFF">\${</span><span style="color: #A6ACCD">INFURA_KEY</span><span style="color: #89DDFF">}\`</span></span>
<span class="line"><span style="color: #89DDFF">}</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> polygonMainnet </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">id</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">0x89</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">token</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">MATIC</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">label</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">Polygon</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">rpcUrl</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">https://matic-mainnet.chainstacklabs.com</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF">}</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> chains </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> [ethereumRopsten</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> polygonMainnet]</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> wallets </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> [</span><span style="color: #82AAFF">injectedModule</span><span style="color: #A6ACCD">()]</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> appMetadata </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">Connect Wallet Example</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">icon</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">&lt;svg&gt;My App Icon&lt;/svg&gt;</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">description</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">Example showcasing how to connect a wallet.</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">recommendedInjectedWallets</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">MetaMask</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">url</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">https://metamask.io</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">},</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">Coinbase</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">url</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">https://wallet.coinbase.com/</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">}</span></span>
<span class="line"><span style="color: #A6ACCD">  ]</span></span>
<span class="line"><span style="color: #89DDFF">}</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> web3Onboard </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">init</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">  wallets</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  chains</span></span>
<span class="line"><span style="color: #A6ACCD">  appMetadata</span></span>
<span class="line"><span style="color: #89DDFF">}</span><span style="color: #A6ACCD">)</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">function</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">App</span><span style="color: #89DDFF">()</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF; font-style: italic">return</span><span style="color: #F07178"> (</span></span>
<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF">&lt;</span><span style="color: #FFCB6B">Web3OnboardProvider</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">web3Onboard</span><span style="color: #89DDFF">={</span><span style="color: #A6ACCD">web3Onboard</span><span style="color: #89DDFF">}&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #89DDFF">&lt;</span><span style="color: #FFCB6B">ConnectWallet</span><span style="color: #89DDFF"> /&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">&lt;/</span><span style="color: #FFCB6B">Web3OnboardProvider</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #F07178">  )</span></span>
<span class="line"><span style="color: #89DDFF">}</span></span>
<span class="line"></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">export</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">default</span><span style="color: #A6ACCD"> MyApp</span></span>
<span class="line"></span></code></pre>`}}),d=new X({props:{class:"header-anchor",href:"#step-2-display-the-connect-wallet-button","aria-hidden":"true",$$slots:{default:[Ps]},$$scope:{ctx:t}}}),E=new Fs({props:{code:"useConnectWallet"}}),H=new Q({props:{title:"ConnectWallet.tsx",lang:"javascript",ext:"js",linesCount:26,rawCode:`import { useEffect } from 'react'
import { useConnectWallet } from '@web3-onboard/react'
import { ethers } from 'ethers'

export default function ConnectWallet() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [ethersProvider, setProvider] = useState<ethers.providers.Web3Provider | null>()

  useEffect(() => {
    // If the wallet has a provider than the wallet is connected
    if (wallet?.provider) {
      setProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
    }
  }, [wallet])

  return (
    <div>
      <button
        disabled={connecting}
        onClick={connect}>
        Connect
      </button>
    </div>
  )
}
`,showCopyCode:!0,code:`<pre><code><span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">useEffect</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">react</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">useConnectWallet</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/react</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">ethers</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">ethers</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">export</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">default</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">function</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">ConnectWallet</span><span style="color: #89DDFF">()</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #89DDFF">[{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">wallet</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">connecting</span><span style="color: #F07178"> </span><span style="color: #89DDFF">},</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">connect</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">disconnect</span><span style="color: #89DDFF">]</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #82AAFF">useConnectWallet</span><span style="color: #F07178">()</span></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #89DDFF">[</span><span style="color: #A6ACCD">ethersProvider</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">setProvider</span><span style="color: #89DDFF">]</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #82AAFF">useState</span><span style="color: #89DDFF">&lt;</span><span style="color: #FFCB6B">ethers</span><span style="color: #89DDFF">.</span><span style="color: #FFCB6B">providers</span><span style="color: #89DDFF">.</span><span style="color: #FFCB6B">Web3Provider</span><span style="color: #F07178"> </span><span style="color: #89DDFF">|</span><span style="color: #F07178"> </span><span style="color: #FFCB6B">null</span><span style="color: #89DDFF">&gt;</span><span style="color: #F07178">()</span></span>
<span class="line"></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #82AAFF">useEffect</span><span style="color: #F07178">(</span><span style="color: #89DDFF">()</span><span style="color: #F07178"> </span><span style="color: #C792EA">=&gt;</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #89DDFF">    </span><span style="color: #464B5D; font-style: italic">// If the wallet has a provider than the wallet is connected</span></span>
<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF; font-style: italic">if</span><span style="color: #F07178"> (</span><span style="color: #A6ACCD">wallet</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">provider</span><span style="color: #F07178">) </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #F07178">      </span><span style="color: #82AAFF">setProvider</span><span style="color: #F07178">(</span><span style="color: #89DDFF">new</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">ethers</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">providers</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">Web3Provider</span><span style="color: #F07178">(</span><span style="color: #A6ACCD">wallet</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">provider</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">any</span><span style="color: #89DDFF">&#39;</span><span style="color: #F07178">))</span></span>
<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF">}</span></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF">},</span><span style="color: #F07178"> [</span><span style="color: #A6ACCD">wallet</span><span style="color: #F07178">])</span></span>
<span class="line"></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF; font-style: italic">return</span><span style="color: #F07178"> (</span></span>
<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">button</span></span>
<span class="line"><span style="color: #89DDFF">        </span><span style="color: #C792EA">disabled</span><span style="color: #89DDFF">={</span><span style="color: #A6ACCD">connecting</span><span style="color: #89DDFF">}</span></span>
<span class="line"><span style="color: #89DDFF">        </span><span style="color: #C792EA">onClick</span><span style="color: #89DDFF">={</span><span style="color: #A6ACCD">connect</span><span style="color: #89DDFF">}&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">        Connect</span></span>
<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">button</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #F07178">  )</span></span>
<span class="line"><span style="color: #89DDFF">}</span></span>
<span class="line"></span></code></pre>`}}),m=new X({props:{class:"header-anchor",href:"#step-3-display-account-information","aria-hidden":"true",$$slots:{default:[Bs]},$$scope:{ctx:t}}}),u=new Q({props:{title:"ConnectWallet.tsx",lang:"javascript",ext:"js",linesCount:49,highlightLines:[[8,8],[10,19],[28,37]],rawCode:`import { useEffect } from 'react'
import { useConnectWallet } from '@web3-onboard/react'
import { ethers } from 'ethers'

export default function ConnectWallet() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [ethersProvider, setProvider] = useState<ethers.providers.Web3Provider | null>()
  const [account, setAccount] = useState<Account | null>(null)

  useEffect(() => {
    if (wallet?.provider) {
      const { name, avatar } = wallet?.accounts[0].ens ?? {}
      setAccount({
        address: wallet.accounts[0].address,
        balance: wallet.accounts[0].balance,
        ens: { name, avatar: avatar?.url }
      })
    }
  }, [wallet])

  useEffect(() => {
    // If the wallet has a provider than the wallet is connected
    if (wallet?.provider) {
      setProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
    }
  }, [wallet])

  if(wallet?.provider) {
    return (
        <div>
          <img src={ens?.avatar} alt="ENS Avatar" />
          <div>{ ens?.name ? ens.name : address }</div>
          <div>Connected to {wallet.label}</div>
          <button onClick={() => { disconnect({ label: wallet.label }) }>Disconnect</button>
        </div>
    )
  }

  return (
    <div>
      <button
        disabled={connecting}
        onClick={connect}>
        Connect
      </button>
    </div>
  )
}
`,showCopyCode:!0,code:`<pre><code><span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">useEffect</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">react</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">useConnectWallet</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/react</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">ethers</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">ethers</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">export</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">default</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">function</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">ConnectWallet</span><span style="color: #89DDFF">()</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #89DDFF">[{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">wallet</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">connecting</span><span style="color: #F07178"> </span><span style="color: #89DDFF">},</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">connect</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">disconnect</span><span style="color: #89DDFF">]</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #82AAFF">useConnectWallet</span><span style="color: #F07178">()</span></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #89DDFF">[</span><span style="color: #A6ACCD">ethersProvider</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">setProvider</span><span style="color: #89DDFF">]</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #82AAFF">useState</span><span style="color: #89DDFF">&lt;</span><span style="color: #FFCB6B">ethers</span><span style="color: #89DDFF">.</span><span style="color: #FFCB6B">providers</span><span style="color: #89DDFF">.</span><span style="color: #FFCB6B">Web3Provider</span><span style="color: #F07178"> </span><span style="color: #89DDFF">|</span><span style="color: #F07178"> </span><span style="color: #FFCB6B">null</span><span style="color: #89DDFF">&gt;</span><span style="color: #F07178">()</span></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #89DDFF">[</span><span style="color: #A6ACCD">account</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">setAccount</span><span style="color: #89DDFF">]</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #82AAFF">useState</span><span style="color: #89DDFF">&lt;</span><span style="color: #FFCB6B">Account</span><span style="color: #F07178"> </span><span style="color: #89DDFF">|</span><span style="color: #F07178"> </span><span style="color: #FFCB6B">null</span><span style="color: #89DDFF">&gt;</span><span style="color: #F07178">(</span><span style="color: #89DDFF">null</span><span style="color: #F07178">)</span></span>
<span class="line"></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #82AAFF">useEffect</span><span style="color: #F07178">(</span><span style="color: #89DDFF">()</span><span style="color: #F07178"> </span><span style="color: #C792EA">=&gt;</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF; font-style: italic">if</span><span style="color: #F07178"> (</span><span style="color: #A6ACCD">wallet</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">provider</span><span style="color: #F07178">) </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #F07178">      </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">name</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">avatar</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">wallet</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">accounts</span><span style="color: #F07178">[</span><span style="color: #F78C6C">0</span><span style="color: #F07178">]</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">ens</span><span style="color: #F07178"> </span><span style="color: #89DDFF">??</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{}</span></span>
<span class="line"><span style="color: #F07178">      </span><span style="color: #82AAFF">setAccount</span><span style="color: #F07178">(</span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #F07178">        address</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">wallet</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">accounts</span><span style="color: #F07178">[</span><span style="color: #F78C6C">0</span><span style="color: #F07178">]</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">address</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #F07178">        balance</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">wallet</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">accounts</span><span style="color: #F07178">[</span><span style="color: #F78C6C">0</span><span style="color: #F07178">]</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">balance</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #F07178">        ens</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">name</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> avatar</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">avatar</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">url</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span></span>
<span class="line"><span style="color: #F07178">      </span><span style="color: #89DDFF">}</span><span style="color: #F07178">)</span></span>
<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF">}</span></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF">},</span><span style="color: #F07178"> [</span><span style="color: #A6ACCD">wallet</span><span style="color: #F07178">])</span></span>
<span class="line"></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #82AAFF">useEffect</span><span style="color: #F07178">(</span><span style="color: #89DDFF">()</span><span style="color: #F07178"> </span><span style="color: #C792EA">=&gt;</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #89DDFF">    </span><span style="color: #464B5D; font-style: italic">// If the wallet has a provider than the wallet is connected</span></span>
<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF; font-style: italic">if</span><span style="color: #F07178"> (</span><span style="color: #A6ACCD">wallet</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">provider</span><span style="color: #F07178">) </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #F07178">      </span><span style="color: #82AAFF">setProvider</span><span style="color: #F07178">(</span><span style="color: #89DDFF">new</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">ethers</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">providers</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">Web3Provider</span><span style="color: #F07178">(</span><span style="color: #A6ACCD">wallet</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">provider</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">any</span><span style="color: #89DDFF">&#39;</span><span style="color: #F07178">))</span></span>
<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF">}</span></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF">},</span><span style="color: #F07178"> [</span><span style="color: #A6ACCD">wallet</span><span style="color: #F07178">])</span></span>
<span class="line"></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF; font-style: italic">if</span><span style="color: #F07178">(</span><span style="color: #A6ACCD">wallet</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">provider</span><span style="color: #F07178">) </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF; font-style: italic">return</span><span style="color: #F07178"> (</span></span>
<span class="line"><span style="color: #F07178">        </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">          </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">img</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">src</span><span style="color: #89DDFF">={</span><span style="color: #A6ACCD">ens</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">avatar</span><span style="color: #89DDFF">} </span><span style="color: #C792EA">alt</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">ENS Avatar</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF"> /&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">          </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;{</span><span style="color: #A6ACCD"> ens</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">name </span><span style="color: #89DDFF">?</span><span style="color: #A6ACCD"> ens</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">name </span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> address </span><span style="color: #89DDFF">}&lt;/</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">          </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;</span><span style="color: #A6ACCD">Connected to </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD">wallet</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">label</span><span style="color: #89DDFF">}&lt;/</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">          </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">button</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">onClick</span><span style="color: #89DDFF">={()</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">=&gt;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #82AAFF">disconnect</span><span style="color: #F07178">(</span><span style="color: #89DDFF">{</span><span style="color: #F07178"> label</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">wallet</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">label</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #F07178">) </span><span style="color: #89DDFF">}&gt;</span><span style="color: #A6ACCD">Disconnect</span><span style="color: #89DDFF">&lt;/</span><span style="color: #A6ACCD">button</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">        </span><span style="color: #89DDFF">&lt;/</span><span style="color: #A6ACCD">div</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">    )</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">}</span></span>
<span class="line"></span>
<span class="line"><span style="color: #89DDFF">  </span><span style="color: #C792EA">return</span><span style="color: #89DDFF"> (</span></span>
<span class="line"><span style="color: #89DDFF">    &lt;div&gt;</span></span>
<span class="line"><span style="color: #89DDFF">      &lt;button</span></span>
<span class="line"><span style="color: #89DDFF">        </span><span style="color: #C792EA">disabled</span><span style="color: #89DDFF">={</span><span style="color: #A6ACCD">connecting</span><span style="color: #89DDFF">}</span></span>
<span class="line"><span style="color: #89DDFF">        </span><span style="color: #C792EA">onClick</span><span style="color: #89DDFF">={</span><span style="color: #A6ACCD">connect</span><span style="color: #89DDFF">}&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">        Connect</span></span>
<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">button</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #F07178">  )</span></span>
<span class="line"><span style="color: #89DDFF">}</span></span>
<span class="line"></span></code></pre>`}}),{c(){s=w("h2"),j(a.$$.fragment),l=h(" Step 1: Import + Configure"),c=T(),o=w("p"),p=h("Import the libraries and any wallets you would like to use. For this example, we are going to use the injected wallets module. You can easily add more wallet support to your dapp via our other wallet modules. Additionally, we'll setup web3-onboard to support 2 chains: Ethereum mainnet and Polygon mainnet."),y=T(),j(D.$$.fragment),i=w("h2"),j(d.$$.fragment),F=h(" Step 2: Display the connect wallet button"),f=T(),A=w("p"),R=h("In another file we'll create the component that will display our connect wallet button. We'll be using the "),j(E.$$.fragment),Y=h(" hook in order to achieve this."),V=T(),j(H.$$.fragment),x=w("h2"),j(m.$$.fragment),z=h(" Step 3: Display account information"),K=T(),q=w("p"),G=h("Now that we have our wallet connected, let's display some basic information, such as the connected wallet's address, ENS name, and avatar."),L=T(),j(u.$$.fragment),this.h()},l(n){s=g(n,"H2",{id:!0,tabindex:!0});var r=k(s);P(a.$$.fragment,r),l=v(r," Step 1: Import + Configure"),r.forEach(e),c=O(n),o=g(n,"P",{});var N=k(o);p=v(N,"Import the libraries and any wallets you would like to use. For this example, we are going to use the injected wallets module. You can easily add more wallet support to your dapp via our other wallet modules. Additionally, we'll setup web3-onboard to support 2 chains: Ethereum mainnet and Polygon mainnet."),N.forEach(e),y=O(n),P(D.$$.fragment,n),i=g(n,"H2",{id:!0,tabindex:!0});var U=k(i);P(d.$$.fragment,U),F=v(U," Step 2: Display the connect wallet button"),U.forEach(e),f=O(n),A=g(n,"P",{});var M=k(A);R=v(M,"In another file we'll create the component that will display our connect wallet button. We'll be using the "),P(E.$$.fragment,M),Y=v(M," hook in order to achieve this."),M.forEach(e),V=O(n),P(H.$$.fragment,n),x=g(n,"H2",{id:!0,tabindex:!0});var J=k(x);P(m.$$.fragment,J),z=v(J," Step 3: Display account information"),J.forEach(e),K=O(n),q=g(n,"P",{});var Z=k(q);G=v(Z,"Now that we have our wallet connected, let's display some basic information, such as the connected wallet's address, ENS name, and avatar."),Z.forEach(e),L=O(n),P(u.$$.fragment,n),this.h()},h(){b(s,"id","step-1-import-configure"),b(s,"tabindex","-1"),b(i,"id","step-2-display-the-connect-wallet-button"),b(i,"tabindex","-1"),b(x,"id","step-3-display-account-information"),b(x,"tabindex","-1")},m(n,r){C(n,s,r),B(a,s,null),$(s,l),C(n,c,r),C(n,o,r),$(o,p),C(n,y,r),B(D,n,r),C(n,i,r),B(d,i,null),$(i,F),C(n,f,r),C(n,A,r),$(A,R),B(E,A,null),$(A,Y),C(n,V,r),B(H,n,r),C(n,x,r),B(m,x,null),$(x,z),C(n,K,r),C(n,q,r),$(q,G),C(n,L,r),B(u,n,r),_=!0},p(n,[r]){const N={};r&1&&(N.$$scope={dirty:r,ctx:n}),a.$set(N);const U={};r&1&&(U.$$scope={dirty:r,ctx:n}),d.$set(U);const M={};r&1&&(M.$$scope={dirty:r,ctx:n}),m.$set(M)},i(n){_||(I(a.$$.fragment,n),I(D.$$.fragment,n),I(d.$$.fragment,n),I(E.$$.fragment,n),I(H.$$.fragment,n),I(m.$$.fragment,n),I(u.$$.fragment,n),_=!0)},o(n){W(a.$$.fragment,n),W(D.$$.fragment,n),W(d.$$.fragment,n),W(E.$$.fragment,n),W(H.$$.fragment,n),W(m.$$.fragment,n),W(u.$$.fragment,n),_=!1},d(n){n&&e(s),S(a),n&&e(c),n&&e(o),n&&e(y),S(D,n),n&&e(i),S(d),n&&e(f),n&&e(A),S(E),n&&e(V),S(H,n),n&&e(x),S(m),n&&e(K),n&&e(q),n&&e(L),S(u,n)}}}class Ns extends ns{constructor(s){super(),as(this,s,null,Ss,ls,{})}}function Us(t){let s;return{c(){s=h("#")},l(a){s=v(a,"#")},m(a,l){C(a,s,l)},d(a){a&&e(s)}}}function Ts(t){let s;return{c(){s=h("#")},l(a){s=v(a,"#")},m(a,l){C(a,s,l)},d(a){a&&e(s)}}}function Os(t){let s;return{c(){s=h("#")},l(a){s=v(a,"#")},m(a,l){C(a,s,l)},d(a){a&&e(s)}}}function Rs(t){let s,a,l,c,o,p,y,D,i,d,F,f,A,R,E,Y,V,H,x,m,z,K,q,G,L,u,_;return a=new X({props:{class:"header-anchor",href:"#step-1-import-configure","aria-hidden":"true",$$slots:{default:[Us]},$$scope:{ctx:t}}}),D=new Q({props:{title:"onboard.js",lang:"javascript",ext:"js",linesCount:40,rawCode:`import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'

const INFURA_KEY = ''

const wallets = [injectedModule()]

const chains = [
  {
    id: '0x1',
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: \`https://mainnet.infura.io/v3/\${INFURA_ID}\`
  },
  {
    id: '0x89',
    token: 'MATIC',
    label: 'Polygon',
    rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
  }
]

const appMetadata = {
  name: 'Connect Wallet Example',
  icon: '<svg>My App Icon</svg>',
  description: 'Example showcasing how to connect a wallet.',
  recommendedInjectedWallets: [
    { name: 'MetaMask', url: 'https://metamask.io' },
    { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
  ]
}

const onboard = Onboard({
  wallets,
  chains,
  appMetadata,
})

export default onboard
`,showCopyCode:!0,code:`<pre><code><span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> Onboard </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/core</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> injectedModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/injected-wallets</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> INFURA_KEY </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> wallets </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> [</span><span style="color: #82AAFF">injectedModule</span><span style="color: #A6ACCD">()]</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> chains </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> [</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">id</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">0x1</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">token</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">ETH</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">label</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">Ethereum Mainnet</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">rpcUrl</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">\`</span><span style="color: #C3E88D">https://mainnet.infura.io/v3/</span><span style="color: #89DDFF">\${</span><span style="color: #A6ACCD">INFURA_ID</span><span style="color: #89DDFF">}\`</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">id</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">0x89</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">token</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">MATIC</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">label</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">Polygon</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">rpcUrl</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">https://matic-mainnet.chainstacklabs.com</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">}</span></span>
<span class="line"><span style="color: #A6ACCD">]</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> appMetadata </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">Connect Wallet Example</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">icon</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">&lt;svg&gt;My App Icon&lt;/svg&gt;</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">description</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">Example showcasing how to connect a wallet.</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">recommendedInjectedWallets</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">MetaMask</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">url</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">https://metamask.io</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">},</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">Coinbase</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">url</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">https://wallet.coinbase.com/</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">}</span></span>
<span class="line"><span style="color: #A6ACCD">  ]</span></span>
<span class="line"><span style="color: #89DDFF">}</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> onboard </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">Onboard</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">  wallets</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  chains</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  appMetadata</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #89DDFF">}</span><span style="color: #A6ACCD">)</span></span>
<span class="line"></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">export</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">default</span><span style="color: #A6ACCD"> onboard</span></span>
<span class="line"></span></code></pre>`}}),d=new X({props:{class:"header-anchor",href:"#step-2-display-the-connect-wallet-button","aria-hidden":"true",$$slots:{default:[Ts]},$$scope:{ctx:t}}}),E=new Fs({props:{code:"App.svelte"}}),H=new Q({props:{title:"App.svelte",lang:"svelte",ext:"svelte",linesCount:12,rawCode:`<script&#8203 lang="js">
import onboard from './onboard.js'
<\/script>

<div>
  <button
    disabled={connecting}
    onClick={connect}>
    Connect
  </button>
</div>
`,showCopyCode:!0,code:`<pre><code><span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">script</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">lang</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">js</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> onboard </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">./onboard.js</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">button</span></span>
<span class="line"><span style="color: #89DDFF">    </span><span style="color: #C792EA">disabled</span><span style="color: #89DDFF">={</span><span style="color: #A6ACCD">connecting</span><span style="color: #89DDFF">}</span></span>
<span class="line"><span style="color: #89DDFF">    </span><span style="color: #C792EA">onClick</span><span style="color: #89DDFF">={</span><span style="color: #A6ACCD">connect</span><span style="color: #89DDFF">}&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">    Connect</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">button</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"></span></code></pre>`}}),m=new X({props:{class:"header-anchor",href:"#step-3-display-account-information","aria-hidden":"true",$$slots:{default:[Os]},$$scope:{ctx:t}}}),u=new Q({props:{title:"App.svelte",lang:"svelte",ext:"svelte",linesCount:41,rawCode:`<script&#8203 lang="js">
  import onboard from './onboard.js'
  
  // Subscribe to wallet updates
  const wallets$ = onboard.state.select('wallets')

  // The first wallet in the array of connected wallets
  $: connectedAccount = $wallets$?.[0]?.accounts?.[0]

  $: account = connectedAccount?.ens?.name
  ? {
      ens: connectedAccount?.ens,
      address: connectedAccount?.address
    }
  : { address: connectedAccount?.address }
  
  const connect = async () => {
    await onboard.connectWallet()
  }

  const disconnect = ({ label }) => {
    onboard.disconnectWallet({ label })
  }
<\/script>

{#if $wallets$?.[0]?.provider}
  <div>
    <img src={ens?.avatar} alt="ENS Avatar" />
    <div>{ ens?.name ? ens.name : address }</div>
    <div>Connected to {wallet.label}</div>
    <button onClick={() => { disconnect($wallets$?.[0]) }>Disconnect</button>
  </div>
{:else}
  <div>
    <button
      onClick={connect}>
      Connect
    </button>
  </div>
{/if}
`,showCopyCode:!0,code:`<pre><code><span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">script</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">lang</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">js</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> onboard </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">./onboard.js</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #A6ACCD">  </span></span>
<span class="line"><span style="color: #89DDFF">  </span><span style="color: #464B5D; font-style: italic">// Subscribe to wallet updates</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> wallets$ </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> onboard</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">state</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">select</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">wallets</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD">)</span></span>
<span class="line"></span>
<span class="line"><span style="color: #89DDFF">  </span><span style="color: #464B5D; font-style: italic">// The first wallet in the array of connected wallets</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #FFCB6B">$</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> connectedAccount </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">$</span><span style="color: #A6ACCD">wallets$</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">[</span><span style="color: #F78C6C">0</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">accounts</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">[</span><span style="color: #F78C6C">0</span><span style="color: #A6ACCD">]</span></span>
<span class="line"></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #FFCB6B">$</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> account </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> connectedAccount</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">ens</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">name</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">?</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">ens</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> connectedAccount</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">ens</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">address</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> connectedAccount</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">address</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">}</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">address</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> connectedAccount</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">address </span><span style="color: #89DDFF">}</span></span>
<span class="line"><span style="color: #A6ACCD">  </span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> connect </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">async</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">()</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">=&gt;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF; font-style: italic">await</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">onboard</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">connectWallet</span><span style="color: #F07178">()</span></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF">}</span></span>
<span class="line"></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> disconnect </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">({</span><span style="color: #A6ACCD"> label </span><span style="color: #89DDFF">})</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">=&gt;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #F07178">    </span><span style="color: #A6ACCD">onboard</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">disconnectWallet</span><span style="color: #F07178">(</span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">label</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #F07178">)</span></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF">}</span></span>
<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #89DDFF">{#</span><span style="color: #89DDFF; font-style: italic">if</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">$</span><span style="color: #A6ACCD">wallets$</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">[</span><span style="color: #F78C6C">0</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">provider</span><span style="color: #89DDFF">}</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">img</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">src</span><span style="color: #89DDFF">={</span><span style="color: #A6ACCD">ens</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">avatar</span><span style="color: #89DDFF">} </span><span style="color: #C792EA">alt</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">ENS Avatar</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF"> /&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;{</span><span style="color: #A6ACCD"> ens</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">name </span><span style="color: #89DDFF">?</span><span style="color: #A6ACCD"> ens</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">name </span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> address </span><span style="color: #89DDFF">}&lt;/</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;</span><span style="color: #A6ACCD">Connected to </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD">wallet</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">label</span><span style="color: #89DDFF">}&lt;/</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">button</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">onClick</span><span style="color: #89DDFF">={()</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">=&gt;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #82AAFF">disconnect</span><span style="color: #F07178">(</span><span style="color: #89DDFF">$</span><span style="color: #A6ACCD">wallets$</span><span style="color: #89DDFF">?.</span><span style="color: #F07178">[</span><span style="color: #F78C6C">0</span><span style="color: #F07178">]) </span><span style="color: #89DDFF">}&gt;</span><span style="color: #A6ACCD">Disconnect</span><span style="color: #89DDFF">&lt;/</span><span style="color: #A6ACCD">button</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;/</span><span style="color: #A6ACCD">div</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #89DDFF">{</span><span style="color: #F07178">:</span><span style="color: #89DDFF; font-style: italic">else</span><span style="color: #89DDFF">}</span></span>
<span class="line"><span style="color: #A6ACCD">  &lt;</span><span style="color: #FFCB6B">div</span><span style="color: #A6ACCD">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">&lt;</span><span style="color: #A6ACCD">button</span></span>
<span class="line"><span style="color: #A6ACCD">      onClick</span><span style="color: #89DDFF">={</span><span style="color: #A6ACCD">connect</span><span style="color: #89DDFF">}&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">      Connect</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">&lt;/</span><span style="color: #A6ACCD">button</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;/</span><span style="color: #A6ACCD">div</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #89DDFF">{/</span><span style="color: #89DDFF; font-style: italic">if</span><span style="color: #89DDFF">}</span></span>
<span class="line"></span></code></pre>`}}),{c(){s=w("h2"),j(a.$$.fragment),l=h(" Step 1: Import + Configure"),c=T(),o=w("p"),p=h("Import the libraries and any wallets you would like to use. For this example, we are going to use the injected wallets module. You can easily add more wallet support to your dapp via our other wallet modules. Additionally, we'll setup web3-onboard to support 2 chains: Ethereum mainnet and Polygon mainnet."),y=T(),j(D.$$.fragment),i=w("h2"),j(d.$$.fragment),F=h(" Step 2: Display the connect wallet button"),f=T(),A=w("p"),R=h("In main "),j(E.$$.fragment),Y=h(" file we'll import our previously initialized web3-onboard instance and then display our connect wallet button."),V=T(),j(H.$$.fragment),x=w("h2"),j(m.$$.fragment),z=h(" Step 3: Display account information"),K=T(),q=w("p"),G=h("Now that we have our wallet connected, let's display some basic information, such as the connected wallet's address, ENS name, and avatar."),L=T(),j(u.$$.fragment),this.h()},l(n){s=g(n,"H2",{id:!0,tabindex:!0});var r=k(s);P(a.$$.fragment,r),l=v(r," Step 1: Import + Configure"),r.forEach(e),c=O(n),o=g(n,"P",{});var N=k(o);p=v(N,"Import the libraries and any wallets you would like to use. For this example, we are going to use the injected wallets module. You can easily add more wallet support to your dapp via our other wallet modules. Additionally, we'll setup web3-onboard to support 2 chains: Ethereum mainnet and Polygon mainnet."),N.forEach(e),y=O(n),P(D.$$.fragment,n),i=g(n,"H2",{id:!0,tabindex:!0});var U=k(i);P(d.$$.fragment,U),F=v(U," Step 2: Display the connect wallet button"),U.forEach(e),f=O(n),A=g(n,"P",{});var M=k(A);R=v(M,"In main "),P(E.$$.fragment,M),Y=v(M," file we'll import our previously initialized web3-onboard instance and then display our connect wallet button."),M.forEach(e),V=O(n),P(H.$$.fragment,n),x=g(n,"H2",{id:!0,tabindex:!0});var J=k(x);P(m.$$.fragment,J),z=v(J," Step 3: Display account information"),J.forEach(e),K=O(n),q=g(n,"P",{});var Z=k(q);G=v(Z,"Now that we have our wallet connected, let's display some basic information, such as the connected wallet's address, ENS name, and avatar."),Z.forEach(e),L=O(n),P(u.$$.fragment,n),this.h()},h(){b(s,"id","step-1-import-configure"),b(s,"tabindex","-1"),b(i,"id","step-2-display-the-connect-wallet-button"),b(i,"tabindex","-1"),b(x,"id","step-3-display-account-information"),b(x,"tabindex","-1")},m(n,r){C(n,s,r),B(a,s,null),$(s,l),C(n,c,r),C(n,o,r),$(o,p),C(n,y,r),B(D,n,r),C(n,i,r),B(d,i,null),$(i,F),C(n,f,r),C(n,A,r),$(A,R),B(E,A,null),$(A,Y),C(n,V,r),B(H,n,r),C(n,x,r),B(m,x,null),$(x,z),C(n,K,r),C(n,q,r),$(q,G),C(n,L,r),B(u,n,r),_=!0},p(n,[r]){const N={};r&1&&(N.$$scope={dirty:r,ctx:n}),a.$set(N);const U={};r&1&&(U.$$scope={dirty:r,ctx:n}),d.$set(U);const M={};r&1&&(M.$$scope={dirty:r,ctx:n}),m.$set(M)},i(n){_||(I(a.$$.fragment,n),I(D.$$.fragment,n),I(d.$$.fragment,n),I(E.$$.fragment,n),I(H.$$.fragment,n),I(m.$$.fragment,n),I(u.$$.fragment,n),_=!0)},o(n){W(a.$$.fragment,n),W(D.$$.fragment,n),W(d.$$.fragment,n),W(E.$$.fragment,n),W(H.$$.fragment,n),W(m.$$.fragment,n),W(u.$$.fragment,n),_=!1},d(n){n&&e(s),S(a),n&&e(c),n&&e(o),n&&e(y),S(D,n),n&&e(i),S(d),n&&e(f),n&&e(A),S(E),n&&e(V),S(H,n),n&&e(x),S(m),n&&e(K),n&&e(q),n&&e(L),S(u,n)}}}class Hs extends ns{constructor(s){super(),as(this,s,null,Rs,ls,{})}}function qs(t){let s,a;return s=new Ns({}),{c(){j(s.$$.fragment)},l(l){P(s.$$.fragment,l)},m(l,c){B(s,l,c),a=!0},i(l){a||(I(s.$$.fragment,l),a=!0)},o(l){W(s.$$.fragment,l),a=!1},d(l){S(s,l)}}}function Ys(t){let s,a;return s=new Hs({}),{c(){j(s.$$.fragment)},l(l){P(s.$$.fragment,l)},m(l,c){B(s,l,c),a=!0},i(l){a||(I(s.$$.fragment,l),a=!0)},o(l){W(s.$$.fragment,l),a=!1},d(l){S(s,l)}}}function Vs(t){let s,a,l,c;return s=new ts({props:{value:"react",$$slots:{default:[qs]},$$scope:{ctx:t}}}),l=new ts({props:{value:"svelte",$$slots:{default:[Ys]},$$scope:{ctx:t}}}),{c(){j(s.$$.fragment),a=T(),j(l.$$.fragment)},l(o){P(s.$$.fragment,o),a=O(o),P(l.$$.fragment,o)},m(o,p){B(s,o,p),C(o,a,p),B(l,o,p),c=!0},p(o,p){const y={};p&4&&(y.$$scope={dirty:p,ctx:o}),s.$set(y);const D={};p&4&&(D.$$scope={dirty:p,ctx:o}),l.$set(D)},i(o){c||(I(s.$$.fragment,o),I(l.$$.fragment,o),c=!0)},o(o){W(s.$$.fragment,o),W(l.$$.fragment,o),c=!1},d(o){S(s,o),o&&e(a),S(l,o)}}}function Ks(t){let s,a=t[0].title+"",l,c,o,p,y,D,i,d;return o=new Ms({}),i=new bs({props:{values:t[1],$$slots:{default:[Vs]},$$scope:{ctx:t}}}),{c(){s=w("h1"),l=h(a),c=T(),j(o.$$.fragment),p=T(),y=w("div"),D=T(),j(i.$$.fragment),this.h()},l(F){s=g(F,"H1",{});var f=k(s);l=v(f,a),f.forEach(e),c=O(F),P(o.$$.fragment,F),p=O(F),y=g(F,"DIV",{class:!0}),k(y).forEach(e),D=O(F),P(i.$$.fragment,F),this.h()},h(){b(y,"class","w-full h-5")},m(F,f){C(F,s,f),$(s,l),C(F,c,f),B(o,F,f),C(F,p,f),C(F,y,f),C(F,D,f),B(i,F,f),d=!0},p(F,[f]){(!d||f&1)&&a!==(a=F[0].title+"")&&ss(l,a);const A={};f&4&&(A.$$scope={dirty:f,ctx:F}),i.$set(A)},i(F){d||(I(o.$$.fragment,F),I(i.$$.fragment,F),d=!0)},o(F){W(o.$$.fragment,F),W(i.$$.fragment,F),d=!1},d(F){F&&e(s),F&&e(c),S(o,F),F&&e(p),F&&e(y),F&&e(D),S(i,F)}}}function Ls(t,s,a){let l;return rs(t,fs,o=>a(0,l=o)),[l,["react","svelte"]]}class en extends ns{constructor(s){super(),as(this,s,Ls,Ks,ls,{})}}export{en as default};
