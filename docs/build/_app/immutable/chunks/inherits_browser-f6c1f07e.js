var K=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};function R(e){if(e.__esModule)return e;var r=Object.defineProperty({},"__esModule",{value:!0});return Object.keys(e).forEach(function(t){var n=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(r,t,n.get?n:{enumerable:!0,get:function(){return e[t]}})}),r}var d=typeof global!="undefined"?global:typeof self!="undefined"?self:typeof window!="undefined"?window:{};function m(){throw new Error("setTimeout has not been defined")}function p(){throw new Error("clearTimeout has not been defined")}var i=m,a=p;typeof d.setTimeout=="function"&&(i=setTimeout);typeof d.clearTimeout=="function"&&(a=clearTimeout);function h(e){if(i===setTimeout)return setTimeout(e,0);if((i===m||!i)&&setTimeout)return i=setTimeout,setTimeout(e,0);try{return i(e,0)}catch{try{return i.call(null,e,0)}catch{return i.call(this,e,0)}}}function b(e){if(a===clearTimeout)return clearTimeout(e);if((a===p||!a)&&clearTimeout)return a=clearTimeout,clearTimeout(e);try{return a(e)}catch{try{return a.call(null,e)}catch{return a.call(this,e)}}}var o=[],c=!1,u,s=-1;function y(){!c||!u||(c=!1,u.length?o=u.concat(o):s=-1,o.length&&w())}function w(){if(!c){var e=h(y);c=!0;for(var r=o.length;r;){for(u=o,o=[];++s<r;)u&&u[s].run();s=-1,r=o.length}u=null,c=!1,b(e)}}function T(e){var r=new Array(arguments.length-1);if(arguments.length>1)for(var t=1;t<arguments.length;t++)r[t-1]=arguments[t];o.push(new g(e,r)),o.length===1&&!c&&h(w)}function g(e,r){this.fun=e,this.array=r}g.prototype.run=function(){this.fun.apply(null,this.array)};var x="browser",j="browser",N=!0,O={},_=[],L="",E={},A={},D={};function f(){}var M=f,P=f,k=f,q=f,I=f,Q=f,S=f;function $(e){throw new Error("process.binding is not supported")}function z(){return"/"}function G(e){throw new Error("process.chdir is not supported")}function U(){return 0}var l=d.performance||{},B=l.now||l.mozNow||l.msNow||l.oNow||l.webkitNow||function(){return new Date().getTime()};function F(e){var r=B.call(l)*.001,t=Math.floor(r),n=Math.floor(r%1*1e9);return e&&(t=t-e[0],n=n-e[1],n<0&&(t--,n+=1e9)),[t,n]}var H=new Date;function J(){var e=new Date,r=e-H;return r/1e3}var V={nextTick:T,title:x,browser:N,env:O,argv:_,version:L,versions:E,on:M,addListener:P,once:k,off:q,removeListener:I,removeAllListeners:Q,emit:S,binding:$,cwd:z,chdir:G,umask:U,hrtime:F,platform:j,release:A,config:D,uptime:J},v={exports:{}};typeof Object.create=="function"?v.exports=function(r,t){t&&(r.super_=t,r.prototype=Object.create(t.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}))}:v.exports=function(r,t){if(t){r.super_=t;var n=function(){};n.prototype=t.prototype,r.prototype=new n,r.prototype.constructor=r}};export{R as a,V as b,K as c,d as g,v as i};
