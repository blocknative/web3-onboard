import{S as je,i as Me,s as Fe,e as c,k as E,t as j,c as d,a as f,d as u,m as w,h as M,b as o,g as He,M as e,ae as te,P as q,j as we,G as ze,af as Ve,f as Ae,ag as Ye,E as Te,ab as Ge,$ as Xe,v as Je,w as Ke,x as Qe,y as Ze,q as $e,o as xe,B as et}from"../../chunks/index-c32358ff.js";import"../../chunks/scroll-5387a6f1.js";import{i as tt,s as at}from"../../chunks/ThemeCustomizer.svelte_svelte_type_style_lang-eee81db4.js";/* empty css                                                         */import{i as rt}from"../../chunks/index-92058c84.js";import"../../chunks/singletons-37dfeae3.js";import"../../chunks/preload-helper-60cab3ee.js";function Be(a,n,t){const r=a.slice();return r[31]=n[t],r[32]=n,r[33]=t,r}function Ne(a){let n,t,r,B,h,U=a[31]+"",_,T,S=a[3][a[31]]+"",I,g,H,W;function z(){a[15].call(r,a[31])}function C(...v){return a[16](a[31],...v)}return{c(){n=c("div"),t=c("div"),r=c("input"),B=E(),h=c("span"),_=j(U),T=j(" : "),I=j(S),g=E(),this.h()},l(v){n=d(v,"DIV",{class:!0});var m=f(n);t=d(m,"DIV",{class:!0});var P=f(t);r=d(P,"INPUT",{type:!0,name:!0,class:!0}),P.forEach(u),B=w(m),h=d(m,"SPAN",{class:!0,id:!0});var b=f(h);_=M(b,U),T=M(b," : "),I=M(b,S),b.forEach(u),g=w(m),m.forEach(u),this.h()},h(){o(r,"type","color"),o(r,"name","Theme"),o(r,"class","svelte-15p6d5d"),o(t,"class","theming-inputs svelte-15p6d5d"),o(h,"class","text"),o(h,"id","current-theme"),o(n,"class","theming-inputs-wrapper svelte-15p6d5d")},m(v,m){He(v,n,m),e(n,t),e(t,r),te(r,a[3][a[31]]),e(n,B),e(n,h),e(h,_),e(h,T),e(h,I),e(n,g),H||(W=[q(r,"input",z),q(r,"input",C)],H=!0)},p(v,m){a=v,m[0]&8&&te(r,a[3][a[31]]),m[0]&8&&U!==(U=a[31]+"")&&we(_,U),m[0]&8&&S!==(S=a[3][a[31]]+"")&&we(I,S)},d(v){v&&u(n),H=!1,ze(W)}}}function ot(a){let n,t,r,B,h,U,_,T,S,I,g,H,W,z,C,v,m,P,b,V,ae,F,$,Y,G,O,N,Q,re,oe,R,A,le,l,p,D,L,be,de,me,X,ne=!!a[7]&&a[7].length?"Disconnect Wallet":"Connect Wallet",ie,ve,J,ue,_e,Z,se,ge,ye,Ie,x=Object.keys(a[3]),y=[];for(let i=0;i<x.length;i+=1)y[i]=Ne(Be(a,x,i));return{c(){n=c("section"),t=c("div"),r=c("label"),B=j("Click Color Circles to Set Theme:"),h=E(),U=c("hr"),_=E(),T=c("div");for(let i=0;i<y.length;i+=1)y[i].c();S=E(),I=c("div"),g=c("textarea"),H=E(),W=c("button"),z=j("Copy Styling Config"),C=E(),v=c("hr"),m=E(),P=c("div"),b=c("label"),V=c("input"),ae=E(),F=c("span"),$=j(`
      Disabled Backdrop for Styling`),Y=E(),G=c("div"),O=c("div"),N=c("form"),Q=c("div"),re=j("Enter your website url or drag and drop a screenshot to preview web3-onboard on your site"),oe=E(),R=c("div"),A=c("input"),le=E(),l=c("button"),p=j("Preview On Your Website"),D=E(),L=c("button"),be=j("Reset"),me=E(),X=c("button"),ie=j(ne),ve=E(),J=c("iframe"),_e=E(),Z=c("div"),se=c("div"),ge=j("Drag and drop an image here to preview"),this.h()},l(i){n=d(i,"SECTION",{class:!0});var k=f(n);t=d(k,"DIV",{class:!0});var s=f(t);r=d(s,"LABEL",{for:!0});var ce=f(r);B=M(ce,"Click Color Circles to Set Theme:"),ce.forEach(u),h=w(s),U=d(s,"HR",{class:!0}),_=w(s),T=d(s,"DIV",{class:!0});var De=f(T);for(let Ee=0;Ee<y.length;Ee+=1)y[Ee].l(De);De.forEach(u),S=w(s),I=d(s,"DIV",{class:!0});var pe=f(I);g=d(pe,"TEXTAREA",{rows:!0,class:!0}),f(g).forEach(u),H=w(pe),W=d(pe,"BUTTON",{class:!0});var Se=f(W);z=M(Se,"Copy Styling Config"),Se.forEach(u),pe.forEach(u),C=w(s),v=d(s,"HR",{class:!0}),m=w(s),P=d(s,"DIV",{class:!0});var ke=f(P);b=d(ke,"LABEL",{class:!0});var fe=f(b);V=d(fe,"INPUT",{type:!0,class:!0}),ae=w(fe),F=d(fe,"SPAN",{class:!0}),f(F).forEach(u),fe.forEach(u),$=M(ke,`
      Disabled Backdrop for Styling`),ke.forEach(u),s.forEach(u),Y=w(k),G=d(k,"DIV",{class:!0});var Ce=f(G);O=d(Ce,"DIV",{id:!0,class:!0});var ee=f(O);N=d(ee,"FORM",{class:!0});var he=f(N);Q=d(he,"DIV",{});var Re=f(Q);re=M(Re,"Enter your website url or drag and drop a screenshot to preview web3-onboard on your site"),Re.forEach(u),oe=w(he),R=d(he,"DIV",{class:!0});var K=f(R);A=d(K,"INPUT",{type:!0,class:!0,placeholder:!0}),le=w(K),l=d(K,"BUTTON",{class:!0});var Ue=f(l);p=M(Ue,"Preview On Your Website"),Ue.forEach(u),D=w(K),L=d(K,"BUTTON",{type:!0,class:!0});var Pe=f(L);be=M(Pe,"Reset"),Pe.forEach(u),me=w(K),X=d(K,"BUTTON",{type:!0,class:!0});var Oe=f(X);ie=M(Oe,ne),Oe.forEach(u),K.forEach(u),he.forEach(u),ve=w(ee),J=d(ee,"IFRAME",{id:!0,title:!0,class:!0}),f(J).forEach(u),_e=w(ee),Z=d(ee,"DIV",{});var Le=f(Z);se=d(Le,"DIV",{});var We=f(se);ge=M(We,"Drag and drop an image here to preview"),We.forEach(u),Le.forEach(u),ee.forEach(u),Ce.forEach(u),k.forEach(u),this.h()},h(){o(r,"for","Theme"),o(U,"class","svelte-15p6d5d"),o(T,"class","theming-container svelte-15p6d5d"),g.readOnly=!0,o(g,"rows","10"),o(g,"class","copy-styles-textarea svelte-15p6d5d"),o(W,"class","svelte-15p6d5d"),o(I,"class","copy-styles-container svelte-15p6d5d"),o(v,"class","svelte-15p6d5d"),o(V,"type","checkbox"),o(V,"class","svelte-15p6d5d"),o(F,"class","slider svelte-15p6d5d"),o(b,"class","switch svelte-15p6d5d"),o(P,"class","backdrop-toggle svelte-15p6d5d"),o(t,"class","control-panel svelte-15p6d5d"),o(A,"type","text"),o(A,"class","iframe-input svelte-15p6d5d"),o(A,"placeholder","Enter your Website URL"),o(l,"class","svelte-15p6d5d"),o(L,"type","button"),L.disabled=de=!(a[1]||!!a[6]),o(L,"class","svelte-15p6d5d"),o(X,"type","button"),o(X,"class","svelte-15p6d5d"),o(R,"class","website-input-row svelte-15p6d5d"),o(N,"class","drop-area-controls svelte-15p6d5d"),o(J,"id","iframe_underlay"),o(J,"title","iframe area for testing W3O with your app"),o(J,"class",ue=Ve(a[1]?"iframe-visible":"iframe-hidden")+" svelte-15p6d5d"),Ae(Z,"display",a[2]?"none":"",!1),o(O,"id","image_drop_area"),o(O,"class","svelte-15p6d5d"),o(G,"class","image-drop-container svelte-15p6d5d"),o(n,"class","svelte-15p6d5d")},m(i,k){He(i,n,k),e(n,t),e(t,r),e(r,B),e(t,h),e(t,U),e(t,_),e(t,T);for(let s=0;s<y.length;s+=1)y[s].m(T,null);e(t,S),e(t,I),e(I,g),te(g,a[4]),e(I,H),e(I,W),e(W,z),e(t,C),e(t,v),e(t,m),e(t,P),e(P,b),e(b,V),V.checked=a[5],e(b,ae),e(b,F),e(P,$),e(n,Y),e(n,G),e(G,O),e(O,N),e(N,Q),e(Q,re),e(N,oe),e(N,R),e(R,A),te(A,a[0]),e(R,le),e(R,l),e(l,p),e(R,D),e(R,L),e(L,be),e(R,me),e(R,X),e(X,ie),e(O,ve),e(O,J),e(O,_e),e(O,Z),e(Z,se),e(se,ge),ye||(Ie=[q(g,"input",a[17]),q(W,"click",a[18]),q(V,"change",a[19]),q(V,"change",a[20]),q(A,"input",a[21]),q(l,"click",a[9]),q(L,"click",a[10]),q(X,"click",a[11]),q(N,"submit",Ye(a[9]))],ye=!0)},p(i,k){if(k[0]&8200){x=Object.keys(i[3]);let s;for(s=0;s<x.length;s+=1){const ce=Be(i,x,s);y[s]?y[s].p(ce,k):(y[s]=Ne(ce),y[s].c(),y[s].m(T,null))}for(;s<y.length;s+=1)y[s].d(1);y.length=x.length}k[0]&16&&te(g,i[4]),k[0]&32&&(V.checked=i[5]),k[0]&1&&A.value!==i[0]&&te(A,i[0]),k[0]&66&&de!==(de=!(i[1]||!!i[6]))&&(L.disabled=de),k[0]&128&&ne!==(ne=!!i[7]&&i[7].length?"Disconnect Wallet":"Connect Wallet")&&we(ie,ne),k[0]&2&&ue!==(ue=Ve(i[1]?"iframe-visible":"iframe-hidden")+" svelte-15p6d5d")&&o(J,"class",ue),k[0]&4&&Ae(Z,"display",i[2]?"none":"",!1)},i:Te,o:Te,d(i){i&&u(n),Ge(y,i),ye=!1,ze(Ie)}}}const qe="e0b15c21b7d54cd4814586334af72618";function lt(a,n,t){let r;const B=rt(),h=tt({wallets:[B],chains:[{id:"0x1",token:"ETH",label:"Ethereum Mainnet",rpcUrl:`https://mainnet.infura.io/v3/${qe}`},{id:"0x3",token:"tROP",label:"Ethereum Ropsten Testnet",rpcUrl:`https://ropsten.infura.io/v3/${qe}`}],appMetadata:{name:"Documentation",icon:"<svg></svg>",description:"Example showcasing how to connect a wallet.",recommendedInjectedWallets:[{name:"MetaMask",url:"https://metamask.io"},{name:"Coinbase",url:"https://wallet.coinbase.com/"}]},accountCenter:{desktop:{enabled:!1},mobile:{enabled:!1}}}),U=h.state.select("wallets").pipe(at());Xe(a,U,l=>t(7,r=l));let _="",T=!1,S=!1;const I=l=>{try{return Boolean(new URL(l))}catch{return!1}},g=()=>{if(!_||!I(_)){alert("Invaled URL entered");return}t(1,T=!0),document.querySelector("#iframe_underlay").setAttribute("src",_),t(2,S=!0),h.connectWallet()},H=()=>{var p,D;t(1,T=!1),document.querySelector("#iframe_underlay").setAttribute("src",""),t(2,S=!1),document.querySelector("#image_drop_area").style.backgroundImage="",t(6,Y=void 0),t(0,_=""),ae();const l=(D=(p=document==null?void 0:document.querySelector("body > onboard-v2"))==null?void 0:p.shadowRoot)==null?void 0:D.querySelector(".close-button");l&&(l==null||l.click())},W=()=>{!!r&&r.length?h.disconnectWallet({label:r[0].label}):h.connectWallet()},z={"--background-color":"#ffffff","--text-color":"#1a1d26","--border-color":"#ebebed","--accent-background":"#ebebed","--accent-color":"#929bed","--accent-color-hover":"#eff1fc","--secondary-text-color":"#707481"};let C={...z};const v=`--onboard-connect-sidebar-background: var(--accent-background);
  --onboard-close-button-background: var(--accent-background);
  --onboard-connect-sidebar-color: var(--text-color);
  --onboard-connect-sidebar-progress-background: var(--secondary-text-color);
  --onboard-connect-sidebar-progress-color: var(--accent-color);
  --onboard-connect-header-background: var(--background-color);
  --onboard-connect-header-color: var(--text-color);
  --onboard-main-scroll-container-background: var(--background-color);
  --onboard-link-color: var(--accent-color);
  --onboard-wallet-button-background: var(--background-color);
  --onboard-wallet-button-background-hover: var(--accent-color-hover);
  --onboard-wallet-button-border-color: var(--border-color);
  --onboard-wallet-app-icon-border-color: var(--border-color);`,m=l=>Object.keys(l).reduce((p,D)=>p+D+": "+l[D]+`; 
  `,"");async function P(){try{return await navigator.clipboard.writeText(b)}catch(l){console.error("Failed to copy: ",l)}}let b=`:root {
  ${m(C)}${v}
}`;const V=(l,p)=>{document.documentElement.style.setProperty(p,l.target.value),t(4,b=`:root {
  ${m(C)}${v}
}`)},ae=()=>{t(3,C={...z}),Object.keys(C).forEach(l=>{document.documentElement.style.setProperty(l,C[l])})};let F=!1;const $=()=>{F?document.documentElement.style.setProperty("--onboard-modal-backdrop","rgba(0, 0, 0, 0.6)"):document.documentElement.style.setProperty("--onboard-modal-backdrop","rgba(0, 0, 0, 0)")};let Y;const G=l=>{const p=new FileReader;p.addEventListener("load",D=>{var L;t(6,Y=(L=D==null?void 0:D.target)==null?void 0:L.result),document.querySelector("#image_drop_area").style.backgroundImage=`url(${Y})`}),p.readAsDataURL(l)},O=()=>{const l=document.querySelector("#image_drop_area");l&&(l.addEventListener("dragover",p=>{p.stopPropagation(),p.preventDefault(),p.dataTransfer.dropEffect="copy"}),l.addEventListener("drop",p=>{t(2,S=!0),h.connectWallet(),p.stopPropagation(),p.preventDefault();let D=p.dataTransfer.files;G(D[0])}))};Je(async()=>{O()});function N(l){C[l]=this.value,t(3,C)}const Q=(l,p)=>V(p,l);function re(){b=this.value,t(4,b)}const oe=async()=>await P(),R=()=>$();function A(){F=this.checked,t(5,F)}function le(){_=this.value,t(0,_)}return[_,T,S,C,b,F,Y,r,U,g,H,W,P,V,$,N,Q,re,oe,R,A,le]}class nt extends je{constructor(n){super(),Me(this,n,lt,ot,Fe,{},null,[-1,-1])}}function st(a){let n,t;return n=new nt({}),{c(){Ke(n.$$.fragment)},l(r){Qe(n.$$.fragment,r)},m(r,B){Ze(n,r,B),t=!0},p:Te,i(r){t||($e(n.$$.fragment,r),t=!0)},o(r){xe(n.$$.fragment,r),t=!1},d(r){et(n,r)}}}class bt extends je{constructor(n){super(),Me(this,n,null,st,Fe,{})}}export{bt as default};
