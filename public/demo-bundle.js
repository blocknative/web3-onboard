(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var bnSelectWallet = createCommonjsModule(function (module, exports) {
	function asyncGeneratorStep(e,t,r,n,i,o,a){try{var s=e[o](a),u=s.value;}catch(e){return void r(e)}s.done?t(u):Promise.resolve(u).then(n,i);}function _asyncToGenerator(e){return function(){var t=this,r=arguments;return new Promise(function(n,i){var o=e.apply(t,r);function a(e){asyncGeneratorStep(o,n,i,a,s,"next",e);}function s(e){asyncGeneratorStep(o,n,i,a,s,"throw",e);}a(void 0);})}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n);}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),e}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n);}return r}function _objectSpread2(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(r,!0).forEach(function(t){_defineProperty(e,t,r[t]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t));});}return e}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t);}function _getPrototypeOf(e){return (_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _setPrototypeOf(e,t){return (_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _possibleConstructorReturn(e,t){return !t||"object"!=typeof t&&"function"!=typeof t?_assertThisInitialized(e):t}Object.defineProperty(exports,"__esModule",{value:!0});var commonjsGlobal$1="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof commonjsGlobal?commonjsGlobal:"undefined"!=typeof self?self:{};function commonjsRequire(){throw new Error("Dynamic requires are not currently supported by rollup-plugin-commonjs")}function unwrapExports(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function createCommonjsModule(e,t){return e(t={exports:{}},t.exports),t.exports}var fortmatic=createCommonjsModule(function(e){e.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n});},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0});},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=3)}([function(e,t){e.exports=function(e){return e&&e.__esModule?e:{default:e}};},function(e,t){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")};},function(e,t,r){function n(){return Math.floor(9e4*Math.random())+1e4}Object.defineProperty(t,"__esModule",{value:!0}),t.sendAsyncWrapper=function(e,t){var r=this;return new Promise(function(i,o){r.sendAsync({jsonrpc:"2.0",id:n(),method:e,params:t||[]},function(e,t){e?o(e):i(t.result);});})},t.sendFortmaticAsyncWrapper=function(e){var t=this;return new Promise(function(r,n){t.getProvider().sendFortmaticAsync(e,function(e,t){e?n(e):r(t?t.result:{});});})},t.randomId=n,t.findExistingResponse=function(e,t){for(var r=0;r<e.length;r++)if(e[r].id===t)return e[r];return null};},function(e,t,r){e.exports=r(4);},function(e,t,r){var n,i=r(0),o=i(r(1)),a=i(r(5)),s=r(2),u="fm_composeSend",c="fm_logout",l="fm_get_balances",f="fm_get_transactions",h="fm_is_logged_in",d="fm_accountSettings",p="fm_deposit";e.exports=function e(t,r,i){var m=this;if((0, o.default)(this,e),this.fortmaticClient="https://x2.fortmatic.com",!t)throw new Error("Please provide a Fortmatic API key that you acquired from the developer dashboard.");this.apiKey=t,this.options=i,this.ethNetwork=r,this.transactions={send:function(e,t){var r=new v(u,e);m.getProvider().sendFortmaticAsync(r,t);}},this.getProvider=function(){return n||(n=new a.default(m.fortmaticClient,{API_KEY:t,ETH_NETWORK:r})),n},this.user={login:function(){return m.getProvider().enable()},logout:function(){m.getProvider().account=null,m.getProvider().network=null;var e=new v(c);return s.sendFortmaticAsyncWrapper.call(m,e)},getBalances:function(){var e=new v(l);return s.sendFortmaticAsyncWrapper.call(m,e)},getTransactions:function(){var e=new v(f);return s.sendFortmaticAsyncWrapper.call(m,e)},isLoggedIn:function(){var e=new v(h);return s.sendFortmaticAsyncWrapper.call(m,e)},settings:function(){var e=new v(d);return s.sendFortmaticAsyncWrapper.call(m,e)},deposit:function(){var e=new v(p);return s.sendFortmaticAsyncWrapper.call(m,e)}};};var v=function e(t,r){if((0, o.default)(this,e),!t||t!==u&&t!==c&&t!==l&&t!==f&&t!==h&&t!==d&&t!==p)throw new Error("Invalid FmRequestPayload parameters. Please specify a valid method");this.id=(0, s.randomId)(),this.method=t,this.params=r?[{to:r.to,value:r.amount}]:[{}];};},function(e,t,r){var n=r(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(r(6)),o=n(r(9)),a=n(r(1)),s=n(r(10)),u=n(r(11)),c=r(2),l=function(){function e(t,r){if((0, a.default)(this,e),this.fortmaticClient=t,this.requests={},this.queue=[],this.account=null,this.network=null,this.isFortmatic=!0,this.overlayReady=!1,this.isLoggedIn=!1,!r.API_KEY)throw new Error("Please provide a Fortmatic API key that you acquired from the developer dashboard.");this.options={API_KEY:r.API_KEY,ETH_NETWORK:r.ETH_NETWORK,DOMAIN_ORIGIN:window.location?window.location.origin:""},this.overlay=this.createOverlay(),this.listenMessage();}return (0, s.default)(e,[{key:"createOverlay",value:function(){var e=this;return new Promise(function(t,r){var n=function(){if(0===document.getElementsByClassName("fortmatic-iframe").length){var r=document.createElement("style");r.innerHTML=u.default.css,r.type="text/css",document.head.appendChild(r);var n=document.createElement("iframe");n.className="fortmatic-iframe",n.src="".concat(e.fortmaticClient,"/send?params=").concat(btoa(JSON.stringify(e.options))),document.body.appendChild(n);var i=document.createElement("img");i.src="https://static.fortmatic.com/assets/trans.gif",document.body.appendChild(i),t({iframe:n});}else console.error("Fortmatic: Duplicate instances found.");};["loaded","interactive","complete"].indexOf(document.readyState)>-1?n():window.addEventListener("load",n.bind(e),!1);})}},{key:"showOverlay",value:function(){var e=(0, o.default)(i.default.mark(function e(){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.overlay;case 2:e.sent.iframe.style.display="block";case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"hideOverlay",value:function(){var e=(0, o.default)(i.default.mark(function e(){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.overlay;case 2:e.sent.iframe.style.display="none";case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"sendAsync",value:function(e,t){e.length>0?this.enqueue({payload:{id:(0, c.randomId)(),batch:e.map(function(e){return e.id=(0, c.randomId)(),e}),method:"eth_batchRequest"},cb:t}):this.enqueue({payload:e,cb:t});}},{key:"sendFortmaticAsync",value:function(e,t){this.enqueue({payload:e,cb:t,isNative:!0});}},{key:"send",value:function(e,t){if("string"==typeof e)return c.sendAsyncWrapper.call(this,e,t);if(!t){console.warn("Non-async web3 methods will be deprecated in web3 > 1.0, and are not supported by the Fortmatic provider. An async method to be used instead."),this.sendAsync(e,t||function(){});var r={};switch(e.method){case"eth_accounts":r=this.account?[this.account]:[];break;case"eth_coinbase":r=this.account;break;case"net_version":r=this.network||(this.options.API_KEY.startsWith("pk_live")?1:4);break;case"eth_uninstallFilter":r=!0;break;default:r={};}return {id:e.id,jsonrpc:e.jsonrpc,result:r}}this.sendAsync(e,t);}},{key:"enqueue",value:function(e){this.queue.push(e),this.overlayReady&&this.dequeue();}},{key:"dequeue",value:function(){var e=(0, o.default)(i.default.mark(function e(){var t,r,n,o=this;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==this.queue.length){e.next=2;break}return e.abrupt("return");case 2:if(!(t=this.queue.shift())){e.next=11;break}return r=t.payload,n=t.cb,r.id=(0, c.randomId)(),e.next=9,this.postMessage(t.isNative?"FORTMATIC_HANDLE_FORTMATIC_REQUEST":"FORTMATIC_HANDLE_REQUEST",t.payload);case 9:r.batch&&r.batch.length>0?(r.batch.forEach(function(e){o.requests[e.id]={parentId:r.id,payload:e,cb:function(e,t){var n=o.requests[r.id].batchResponse;if(e&&e.response&&!(0, c.findExistingResponse)(n,e.response.id))throw n.push({jsonrpc:"2.0",id:e.response.id,error:{code:e.response.code,message:e.response.message}}),o.requests[r.id].cb(null,n),e.response;if(t&&t.result&&!(0, c.findExistingResponse)(n,t.id))return n.push(t);throw new Error("Fortmatic: unexpected callback behavior")}};}),this.requests[r.id]={payload:r,cb:n,batchResponse:[]}):this.requests[r.id]={payload:r,cb:n},this.dequeue();case 11:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"postMessage",value:function(){var e=(0, o.default)(i.default.mark(function e(t,r){var n;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.overlay;case 2:(n=e.sent).iframe.contentWindow&&n.iframe.contentWindow.postMessage({msgType:t,payload:r},"*");case 4:case"end":return e.stop()}},e,this)}));return function(t,r){return e.apply(this,arguments)}}()},{key:"enable",value:function(){return c.sendAsyncWrapper.call(this,"eth_accounts")}},{key:"listenMessage",value:function(){var e=this;window.addEventListener("message",function(t){if(t.origin===e.fortmaticClient){var r=t.data.response?t.data.response.id:null;switch(t.data.msgType){case"FORTMATIC_OVERLAY_READY":e.overlayReady=!0,e.dequeue();break;case"FORTMATIC_HANDLE_RESPONSE":try{e.requests[r].cb(null,t.data.response);var n=e.requests[r].parentId;n&&e.requests[n].payload.batch.length===e.requests[n].batchResponse.length&&e.requests[n].cb(null,e.requests[n].batchResponse),"eth_accounts"===e.requests[r].payload.method?e.account=t.data.response.result[0]:"eth_coinbase"===e.requests[r].payload.method?e.account=t.data.response.result:"net_version"===e.requests[r].payload.method&&(e.network=t.data.response.result);}catch(e){}e.isLoggedIn=!0,e.dequeue();break;case"FORTMATIC_HIDE_OVERLAY":e.hideOverlay();break;case"FORTMATIC_SHOW_OVERLAY":e.showOverlay();break;case"FORTMATIC_USER_LOGOUT":e.account=null,e.network=null,e.isLoggedIn=!1;break;case"FORTMATIC_UNAUTHORIZED_API_KEY":throw e.overlayReady=!1,new Error("Given API key is not authorized to access the resource.");case"FORTMATIC_USER_DENIED":if(r){var i=t.data.response&&t.data.response.message?t.data.response.message:"Fortmatic: Modal was closed without executing action!",o=t.data.response&&t.data.response.code?t.data.response.code:1;e.requests[r].cb({message:i,code:o,response:t.data.response});}else e.queue.forEach(function(e){return e.cb({message:"Fortmatic: Modal was closed without executing action!",code:1})});e.dequeue();}}});}}]),e}();t.default=l;},function(e,t,r){e.exports=r(7);},function(e,t,r){var n=function(){return this||"object"==typeof self&&self}()||Function("return this")(),i=n.regeneratorRuntime&&Object.getOwnPropertyNames(n).indexOf("regeneratorRuntime")>=0,o=i&&n.regeneratorRuntime;if(n.regeneratorRuntime=void 0,e.exports=r(8),i)n.regeneratorRuntime=o;else try{delete n.regeneratorRuntime;}catch(e){n.regeneratorRuntime=void 0;}},function(e,t){!function(t){var r,n=Object.prototype,i=n.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",s=o.asyncIterator||"@@asyncIterator",u=o.toStringTag||"@@toStringTag",c="object"==typeof e,l=t.regeneratorRuntime;if(l)c&&(e.exports=l);else{(l=t.regeneratorRuntime=c?e.exports:{}).wrap=w;var f="suspendedStart",h="suspendedYield",d="executing",p="completed",v={},m={};m[a]=function(){return this};var y=Object.getPrototypeOf,g=y&&y(y(R([])));g&&g!==n&&i.call(g,a)&&(m=g);var b=A.prototype=_.prototype=Object.create(m);S.prototype=b.constructor=A,A.constructor=S,A[u]=S.displayName="GeneratorFunction",l.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return !!t&&(t===S||"GeneratorFunction"===(t.displayName||t.name))},l.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,A):(e.__proto__=A,u in e||(e[u]="GeneratorFunction")),e.prototype=Object.create(b),e},l.awrap=function(e){return {__await:e}},T(N.prototype),N.prototype[s]=function(){return this},l.AsyncIterator=N,l.async=function(e,t,r,n){var i=new N(w(e,t,r,n));return l.isGeneratorFunction(t)?i:i.next().then(function(e){return e.done?e.value:i.next()})},T(b),b[u]="Generator",b[a]=function(){return this},b.toString=function(){return "[object Generator]"},l.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){for(;t.length;){var n=t.pop();if(n in e)return r.value=n,r.done=!1,r}return r.done=!0,r}},l.values=R,O.prototype={constructor:O,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(I),!e)for(var t in this)"t"===t.charAt(0)&&i.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=r);},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(n,i){return s.type="throw",s.arg=e,t.next=n,i&&(t.method="next",t.arg=r),!!i}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],s=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var u=i.call(a,"catchLoc"),c=i.call(a,"finallyLoc");if(u&&c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&i.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=e,a.arg=t,o?(this.method="next",this.next=o.finallyLoc,v):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return "break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),v},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),I(r),v}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var i=n.arg;I(r);}return i}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:R(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=r),v}};}function w(e,t,r,n){var i=t&&t.prototype instanceof _?t:_,o=Object.create(i.prototype),a=new O(n||[]);return o._invoke=function(e,t,r){var n=f;return function(i,o){if(n===d)throw new Error("Generator is already running");if(n===p){if("throw"===i)throw o;return P()}for(r.method=i,r.arg=o;;){var a=r.delegate;if(a){var s=x(a,r);if(s){if(s===v)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=p,r.arg;r.dispatchException(r.arg);}else"return"===r.method&&r.abrupt("return",r.arg);n=d;var u=E(e,t,r);if("normal"===u.type){if(n=r.done?p:h,u.arg===v)continue;return {value:u.arg,done:r.done}}"throw"===u.type&&(n=p,r.method="throw",r.arg=u.arg);}}}(e,r,a),o}function E(e,t,r){try{return {type:"normal",arg:e.call(t,r)}}catch(e){return {type:"throw",arg:e}}}function _(){}function S(){}function A(){}function T(e){["next","throw","return"].forEach(function(t){e[t]=function(e){return this._invoke(t,e)};});}function N(e){var t;this._invoke=function(r,n){function o(){return new Promise(function(t,o){!function t(r,n,o,a){var s=E(e[r],e,n);if("throw"!==s.type){var u=s.arg,c=u.value;return c&&"object"==typeof c&&i.call(c,"__await")?Promise.resolve(c.__await).then(function(e){t("next",e,o,a);},function(e){t("throw",e,o,a);}):Promise.resolve(c).then(function(e){u.value=e,o(u);},function(e){return t("throw",e,o,a)})}a(s.arg);}(r,n,t,o);})}return t=t?t.then(o,o):o()};}function x(e,t){var n=e.iterator[t.method];if(n===r){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=r,x(e,t),"throw"===t.method))return v;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method");}return v}var i=E(n,e.iterator,t.arg);if("throw"===i.type)return t.method="throw",t.arg=i.arg,t.delegate=null,v;var o=i.arg;return o?o.done?(t[e.resultName]=o.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=r),t.delegate=null,v):o:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,v)}function M(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t);}function I(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t;}function O(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(M,this),this.reset(!0);}function R(e){if(e){var t=e[a];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,o=function t(){for(;++n<e.length;)if(i.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=r,t.done=!0,t};return o.next=o}}return {next:P}}function P(){return {value:r,done:!0}}}(function(){return this||"object"==typeof self&&self}()||Function("return this")());},function(e,t){function r(e,t,r,n,i,o,a){try{var s=e[o](a),u=s.value;}catch(e){return void r(e)}s.done?t(u):Promise.resolve(u).then(n,i);}e.exports=function(e){return function(){var t=this,n=arguments;return new Promise(function(i,o){var a=e.apply(t,n);function s(e){r(a,i,o,s,u,"next",e);}function u(e){r(a,i,o,s,u,"throw",e);}s(void 0);})}};},function(e,t){function r(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n);}}e.exports=function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e};},function(e,t,r){t.css="\n  .fortmatic-iframe {\n    display: none;\n    position: fixed;\n    top: 0;\n    right: 0;\n    width: 100%;\n    height: 100%;\n    border: none;\n    border-radius: 0;\n    z-index: 2147483647;\n  }\n";}]);}),Fortmatic=unwrapExports(fortmatic),ethers_min=createCommonjsModule(function(e,t){e.exports=function e(t,r,n){function i(a,s){if(!r[a]){if(!t[a]){var u="function"==typeof commonjsRequire&&commonjsRequire;if(!s&&u)return u(a,!0);if(o)return o(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var l=r[a]={exports:{}};t[a][0].call(l.exports,function(e){return i(t[a][1][e]||e)},l,l.exports,e,t,r,n);}return r[a].exports}for(var o="function"==typeof commonjsRequire&&commonjsRequire,a=0;a<n.length;a++)i(n[a]);return i}({1:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0}),r.version="4.0.33";},{}],2:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0});var n=e("./utils/properties"),i=(o.isSigner=function(e){return n.isType(e,"Signer")},o);function o(){n.setType(this,"Signer");}r.Signer=i;},{"./utils/properties":73}],3:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0});var n=e("./utils/bignumber");r.AddressZero="0x0000000000000000000000000000000000000000",r.HashZero="0x0000000000000000000000000000000000000000000000000000000000000000",r.EtherSymbol="Ξ";var i=n.bigNumberify(-1);r.NegativeOne=i;var o=n.bigNumberify(0);r.Zero=o;var a=n.bigNumberify(1);r.One=a;var s=n.bigNumberify(2);r.Two=s;var u=n.bigNumberify("1000000000000000000");r.WeiPerEther=u;var c=n.bigNumberify("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");r.MaxUint256=c;},{"./utils/bignumber":62}],4:[function(e,t,r){var n,i=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t;}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);},function(e,t){function r(){this.constructor=e;}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r);}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var a,s=e("./constants"),u=o(e("./errors")),c=e("./utils/abi-coder"),l=e("./utils/address"),f=e("./utils/bignumber"),h=e("./utils/bytes"),d=e("./utils/interface"),p=e("./utils/properties"),v=e("./providers/abstract-provider"),m=e("./abstract-signer"),y=(i(g,a=m.Signer),g.prototype.getAddress=function(){return Promise.resolve(this.address)},g.prototype._fail=function(e,t){return Promise.resolve().then(function(){u.throwError(e,u.UNSUPPORTED_OPERATION,{operation:t});})},g.prototype.signMessage=function(e){return this._fail("VoidSigner cannot sign messages","signMessage")},g.prototype.sendTransaction=function(e){return this._fail("VoidSigner cannot sign transactions","sendTransaction")},g.prototype.connect=function(e){return new g(this.address,e)},g);function g(e,t){var r=a.call(this)||this;return p.defineReadOnly(r,"address",e),p.defineReadOnly(r,"provider",t),r}r.VoidSigner=y;var b={chainId:!0,data:!0,from:!0,gasLimit:!0,gasPrice:!0,nonce:!0,to:!0,value:!0};function w(e,t,r){var n=e.interface.functions[t];return function(){for(var t=[],i=0;i<arguments.length;i++)t[i]=arguments[i];var o={},a=null;if(t.length===n.inputs.length+1&&"object"==typeof t[t.length-1])for(var l in null!=(o=p.shallowCopy(t.pop())).blockTag&&(a=o.blockTag),delete o.blockTag,o)if(!b[l])throw new Error("unknown transaction override "+l);if(t.length!=n.inputs.length)throw new Error("incorrect number of arguments");return ["data","to"].forEach(function(e){null!=o[e]&&u.throwError("cannot override "+e,u.UNSUPPORTED_OPERATION,{operation:e});}),o.to=e._deployed(a).then(function(){return e.addressPromise}),function e(t,r,n){if(Array.isArray(n)){var i=[];return n.forEach(function(n,o){var a;a=Array.isArray(r)?r[o]:r[n.name],i.push(e(t,a,n));}),Promise.all(i)}if("address"===n.type)return t.resolveName(r);if("tuple"===n.type)return e(t,r,n.components);var o=n.type.match(/(.*)(\[[0-9]*\]$)/);if(o){if(!Array.isArray(r))throw new Error("invalid value for array");var a=[],s={components:n.components,type:o[1]};return r.forEach(function(r){a.push(e(t,r,s));}),Promise.all(a)}return Promise.resolve(r)}(e.provider,t,n.inputs).then(function(t){if(o.data=n.encode(t),"call"===n.type)return r?Promise.resolve(s.Zero):(e.provider||u.throwError("call (constant functions) require a provider or a signer with a provider",u.UNSUPPORTED_OPERATION,{operation:"call"}),["gasLimit","gasPrice","value"].forEach(function(e){if(null!=o[e])throw new Error("call cannot override "+e)}),null==o.from&&e.signer&&(o.from=e.signer.getAddress()),e.provider.call(o,a).then(function(r){if(h.hexDataLength(r)%32==4&&"0x08c379a0"===h.hexDataSlice(r,0,4)){var i=c.defaultAbiCoder.decode(["string"],h.hexDataSlice(r,4));u.throwError("call revert exception",u.CALL_EXCEPTION,{address:e.address,args:t,method:n.signature,errorSignature:"Error(string)",errorArgs:[i],reason:i,transaction:o});}try{var a=n.decode(r);return 1===n.outputs.length&&(a=a[0]),a}catch(i){throw"0x"===r&&0<n.outputs.length&&u.throwError("call exception",u.CALL_EXCEPTION,{address:e.address,method:n.signature,args:t}),i}}));if("transaction"===n.type)return r?(e.provider||u.throwError("estimate gas require a provider or a signer with a provider",u.UNSUPPORTED_OPERATION,{operation:"estimateGas"}),null==o.from&&e.signer&&(o.from=e.signer.getAddress()),e.provider.estimateGas(o)):(null==o.gasLimit&&null!=n.gas&&(o.gasLimit=f.bigNumberify(n.gas).add(21e3)),e.signer||u.throwError("sending a transaction require a signer",u.UNSUPPORTED_OPERATION,{operation:"sendTransaction"}),null!=o.from&&u.throwError("cannot override from in a transaction",u.UNSUPPORTED_OPERATION,{operation:"sendTransaction"}),e.signer.sendTransaction(o).then(function(t){var r=t.wait.bind(t);return t.wait=function(t){return r(t).then(function(t){return t.events=t.logs.map(function(r){var n=p.deepCopy(r),i=e.interface.parseLog(r);return i&&(n.args=i.values,n.decode=i.decode,n.event=i.name,n.eventSignature=i.signature),n.removeListener=function(){return e.provider},n.getBlock=function(){return e.provider.getBlock(t.blockHash)},n.getTransaction=function(){return e.provider.getTransaction(t.transactionHash)},n.getTransactionReceipt=function(){return Promise.resolve(t)},n}),t})},t}));throw new Error("invalid type - "+n.type)})}}function E(e){return !e.address||null!=e.topics&&0!==e.topics.length?(e.address||"*")+"@"+(e.topics?e.topics.join(":"):""):"*"}var _=(S.prototype.deployed=function(){return this._deployed()},S.prototype._deployed=function(e){var t=this;return this._deployedPromise||(this.deployTransaction?this._deployedPromise=this.deployTransaction.wait().then(function(){return t}):this._deployedPromise=this.provider.getCode(this.address,e).then(function(e){return "0x"===e&&u.throwError("contract not deployed",u.UNSUPPORTED_OPERATION,{contractAddress:t.address,operation:"getDeployed"}),t})),this._deployedPromise},S.prototype.fallback=function(e){var t=this;this.signer||u.throwError("sending a transaction require a signer",u.UNSUPPORTED_OPERATION,{operation:"sendTransaction(fallback)"});var r=p.shallowCopy(e||{});return ["from","to"].forEach(function(e){null!=r[e]&&u.throwError("cannot override "+e,u.UNSUPPORTED_OPERATION,{operation:e});}),r.to=this.addressPromise,this.deployed().then(function(){return t.signer.sendTransaction(r)})},S.prototype.connect=function(e){"string"==typeof e&&(e=new y(e,this.provider));var t=new S(this.address,this.interface,e);return this.deployTransaction&&p.defineReadOnly(t,"deployTransaction",this.deployTransaction),t},S.prototype.attach=function(e){return new S(e,this.interface,this.signer||this.provider)},S.isIndexed=function(e){return d.Interface.isIndexed(e)},S.prototype._getEventFilter=function(e){var t=this;if("string"==typeof e){if("*"===e)return {prepareEvent:function(e){var r=t.interface.parseLog(e);return r&&(e.args=r.values,e.decode=r.decode,e.event=r.name,e.eventSignature=r.signature),[e]},eventTag:"*",filter:{address:this.address}};-1!==e.indexOf("(")&&(e=c.formatSignature(c.parseSignature("event "+e)));var r=this.interface.events[e];r||u.throwError("unknown event - "+e,u.INVALID_ARGUMENT,{argumnet:"eventName",value:e});var n={address:this.address,topics:[r.topic]};return {prepareEvent:function(e){var t=r.decode(e.data,e.topics);e.args=t;var n=Array.prototype.slice.call(t);return n.push(e),n},event:r,eventTag:E(n),filter:n}}var i={address:this.address},o=null;if(e.topics&&e.topics[0])for(var a in i.topics=e.topics,this.interface.events)if(-1!==a.indexOf("(")){var s=this.interface.events[a];if(s.topic===e.topics[0].toLowerCase()){o=s;break}}return {prepareEvent:function(e){if(!o)return [e];var t=o.decode(e.data,e.topics);e.args=t;var r=Array.prototype.slice.call(t);return r.push(e),r},event:o,eventTag:E(i),filter:i}},S.prototype._addEventListener=function(e,t,r){var n=this;function i(r){var i=p.deepCopy(r),o=e.prepareEvent(i);e.event&&(i.decode=e.event.decode,i.event=e.event.name,i.eventSignature=e.event.signature),i.removeListener=function(){n.removeListener(e.filter,t);},i.getBlock=function(){return n.provider.getBlock(r.blockHash)},i.getTransaction=function(){return n.provider.getTransaction(r.transactionHash)},i.getTransactionReceipt=function(){return n.provider.getTransactionReceipt(r.transactionHash)},n.emit.apply(n,[e.filter].concat(o));}this.provider||u.throwError("events require a provider or a signer with a provider",u.UNSUPPORTED_OPERATION,{operation:"once"}),this.provider.on(e.filter,i),this._events.push({eventFilter:e,listener:t,wrappedListener:i,once:r});},S.prototype.on=function(e,t){return this._addEventListener(this._getEventFilter(e),t,!1),this},S.prototype.once=function(e,t){return this._addEventListener(this._getEventFilter(e),t,!0),this},S.prototype.addListener=function(e,t){return this.on(e,t)},S.prototype.emit=function(e){for(var t=this,r=[],n=1;n<arguments.length;n++)r[n-1]=arguments[n];if(!this.provider)return !1;var i=!1,o=this._getEventFilter(e);return this._events=this._events.filter(function(e){return e.eventFilter.eventTag!==o.eventTag||(setTimeout(function(){e.listener.apply(t,r);},0),i=!0,!e.once)}),i},S.prototype.listenerCount=function(e){if(!this.provider)return 0;var t=this._getEventFilter(e);return this._events.filter(function(e){return e.eventFilter.eventTag===t.eventTag}).length},S.prototype.listeners=function(e){if(!this.provider)return [];var t=this._getEventFilter(e);return this._events.filter(function(e){return e.eventFilter.eventTag===t.eventTag}).map(function(e){return e.listener})},S.prototype.removeAllListeners=function(e){var t=this;if(!this.provider)return this;var r=this._getEventFilter(e);return this._events=this._events.filter(function(e){return e.eventFilter.eventTag!==r.eventTag||(t.provider.removeListener(e.eventFilter.filter,e.wrappedListener),!1)}),this},S.prototype.removeListener=function(e,t){var r=this;if(!this.provider)return this;var n=!1,i=this._getEventFilter(e);return this._events=this._events.filter(function(e){return e.eventFilter.eventTag!==i.eventTag||e.listener!==t||(r.provider.removeListener(e.eventFilter.filter,e.wrappedListener),!!n||!(n=!0))}),this},S);function S(e,t,r){var n=this;if(u.checkNew(this,S),d.Interface.isInterface(t)?p.defineReadOnly(this,"interface",t):p.defineReadOnly(this,"interface",new d.Interface(t)),m.Signer.isSigner(r)?(p.defineReadOnly(this,"provider",r.provider),p.defineReadOnly(this,"signer",r)):v.Provider.isProvider(r)?(p.defineReadOnly(this,"provider",r),p.defineReadOnly(this,"signer",null)):u.throwError("invalid signer or provider",u.INVALID_ARGUMENT,{arg:"signerOrProvider",value:r}),p.defineReadOnly(this,"estimate",{}),p.defineReadOnly(this,"functions",{}),p.defineReadOnly(this,"filters",{}),Object.keys(this.interface.events).forEach(function(e){var t=n.interface.events[e];p.defineReadOnly(n.filters,e,function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return {address:n.address,topics:t.encodeTopics(e)}});}),this._events=[],p.defineReadOnly(this,"address",e),this.provider)p.defineReadOnly(this,"addressPromise",this.provider.resolveName(e).then(function(e){if(null==e)throw new Error("name not found");return e}).catch(function(e){throw e}));else try{p.defineReadOnly(this,"addressPromise",Promise.resolve(l.getAddress(e)));}catch(t){u.throwError("provider is required to use non-address contract address",u.INVALID_ARGUMENT,{argument:"addressOrName",value:e});}Object.keys(this.interface.functions).forEach(function(e){var t=w(n,e,!1);null==n[e]?p.defineReadOnly(n,e,t):u.warn("WARNING: Multiple definitions for "+e),null==n.functions[e]&&(p.defineReadOnly(n.functions,e,t),p.defineReadOnly(n.estimate,e,w(n,e,!0)));});}r.Contract=_;var A=(T.prototype.getDeployTransaction=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var r={};if(e.length===this.interface.deployFunction.inputs.length+1)for(var n in r=p.shallowCopy(e.pop()))if(!b[n])throw new Error("unknown transaction override "+n);return ["data","from","to"].forEach(function(e){null!=r[e]&&u.throwError("cannot override "+e,u.UNSUPPORTED_OPERATION,{operation:e});}),u.checkArgumentCount(e.length,this.interface.deployFunction.inputs.length," in Contract constructor"),r.data=this.interface.deployFunction.encode(this.bytecode,e),r},T.prototype.deploy=function(){for(var e=this,t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];var n=this.getDeployTransaction.apply(this,t);return this.signer.sendTransaction(n).then(function(t){var r=new _(l.getContractAddress(t),e.interface,e.signer);return p.defineReadOnly(r,"deployTransaction",t),r})},T.prototype.attach=function(e){return new _(e,this.interface,this.signer)},T.prototype.connect=function(e){return new T(this.interface,this.bytecode,e)},T.fromSolidity=function(e,t){null==e&&u.throwError("missing compiler output",u.MISSING_ARGUMENT,{argument:"compilerOutput"}),"string"==typeof e&&(e=JSON.parse(e));var r=e.abi,n=null;return e.bytecode?n=e.bytecode:e.evm&&e.evm.bytecode&&(n=e.evm.bytecode),new T(r,n,t)},T);function T(e,t,r){var n=null;"string"==typeof t?n=t:h.isArrayish(t)?n=h.hexlify(t):"string"==typeof t.object?n=t.object:u.throwError("bytecode must be a valid hex string",u.INVALID_ARGUMENT,{arg:"bytecode",value:t}),"0x"!==n.substring(0,2)&&(n="0x"+n),h.isHexString(n)||u.throwError("bytecode must be a valid hex string",u.INVALID_ARGUMENT,{arg:"bytecode",value:t}),n.length%2!=0&&u.throwError("bytecode must be valid data (even length)",u.INVALID_ARGUMENT,{arg:"bytecode",value:t}),p.defineReadOnly(this,"bytecode",n),d.Interface.isInterface(e)?p.defineReadOnly(this,"interface",e):p.defineReadOnly(this,"interface",new d.Interface(e)),r&&!m.Signer.isSigner(r)&&u.throwError("invalid signer",u.INVALID_ARGUMENT,{arg:"signer",value:null}),p.defineReadOnly(this,"signer",r||null);}r.ContractFactory=A;},{"./abstract-signer":2,"./constants":3,"./errors":5,"./providers/abstract-provider":49,"./utils/abi-coder":58,"./utils/address":59,"./utils/bignumber":62,"./utils/bytes":63,"./utils/interface":68,"./utils/properties":73}],5:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0});var n=e("./_version");r.UNKNOWN_ERROR="UNKNOWN_ERROR",r.NOT_IMPLEMENTED="NOT_IMPLEMENTED",r.MISSING_NEW="MISSING_NEW",r.CALL_EXCEPTION="CALL_EXCEPTION",r.INVALID_ARGUMENT="INVALID_ARGUMENT",r.MISSING_ARGUMENT="MISSING_ARGUMENT",r.UNEXPECTED_ARGUMENT="UNEXPECTED_ARGUMENT",r.NUMERIC_FAULT="NUMERIC_FAULT",r.INSUFFICIENT_FUNDS="INSUFFICIENT_FUNDS",r.NONCE_EXPIRED="NONCE_EXPIRED",r.REPLACEMENT_UNDERPRICED="REPLACEMENT_UNDERPRICED";var i=!(r.UNSUPPORTED_OPERATION="UNSUPPORTED_OPERATION"),o=!1;function a(e,t,i){if(o)throw new Error("unknown error");t=t||r.UNKNOWN_ERROR,i=i||{};var a=[];Object.keys(i).forEach(function(e){try{a.push(e+"="+JSON.stringify(i[e]));}catch(t){a.push(e+"="+JSON.stringify(i[e].toString()));}}),a.push("version="+n.version);var s=e;a.length&&(e+=" ("+a.join(", ")+")");var u=new Error(e);throw u.reason=s,u.code=t,Object.keys(i).forEach(function(e){u[e]=i[e];}),u}r.throwError=a,r.checkNew=function(e,t){e instanceof t||a("missing new",r.MISSING_NEW,{name:t.name});},r.checkArgumentCount=function(e,t,n){n=n||"",e<t&&a("missing argument"+n,r.MISSING_ARGUMENT,{count:e,expectedCount:t}),t<e&&a("too many arguments"+n,r.UNEXPECTED_ARGUMENT,{count:e,expectedCount:t});},r.setCensorship=function(e,t){i&&a("error censorship permanent",r.UNSUPPORTED_OPERATION,{operation:"setCensorship"}),o=!!e,i=!!t;},r.checkNormalize=function(){try{if(["NFD","NFC","NFKD","NFKC"].forEach(function(e){try{"test".normalize(e);}catch(t){throw new Error("missing "+e)}}),String.fromCharCode(233).normalize("NFD")!==String.fromCharCode(101,769))throw new Error("broken implementation")}catch(e){a("platform missing String.prototype.normalize",r.UNSUPPORTED_OPERATION,{operation:"String.prototype.normalize",form:e.message});}};var s={debug:1,default:2,info:2,warn:3,error:4,off:5},u=s.default;function c(e,t){u>s[e]||console.log.apply(console,t);}function l(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];c("warn",e);}r.setLogLevel=function(e){var t=s[e];null!=t?u=t:l("invliad log level - "+e);},r.warn=l,r.info=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];c("info",e);};},{"./_version":1}],6:[function(e,t,r){var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var i=e("./contract");r.Contract=i.Contract,r.ContractFactory=i.ContractFactory,r.VoidSigner=i.VoidSigner;var o=e("./abstract-signer");r.Signer=o.Signer;var a=e("./wallet");r.Wallet=a.Wallet;var s=n(e("./constants"));r.constants=s;var u=n(e("./errors"));r.errors=u;var c=n(e("./providers"));r.providers=c;var l=n(e("./utils"));r.utils=l;var f=n(e("./wordlists"));r.wordlists=f;var h=e("./utils/shims");r.platform=h.platform;var d=e("./_version");r.version=d.version,r.getDefaultProvider=function(e){null==e&&(e="homestead");var t=l.getNetwork(e);return t&&t._defaultProvider||u.throwError("unsupported getDefaultProvider network",u.UNSUPPORTED_OPERATION,{operation:"getDefaultProvider",network:e}),t._defaultProvider(c)};},{"./_version":1,"./abstract-signer":2,"./constants":3,"./contract":4,"./errors":5,"./providers":53,"./utils":67,"./utils/shims":79,"./wallet":87,"./wordlists":88}],7:[function(e,t,r){var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var i=n(e("./ethers"));r.ethers=i,function(e){for(var t in e)r.hasOwnProperty(t)||(r[t]=e[t]);}(e("./ethers"));},{"./ethers":6}],8:[function(e,t,r){!function(e){function n(e){return parseInt(e)===e}function i(e){if(!n(e.length))return !1;for(var t=0;t<e.length;t++)if(!n(e[t])||e[t]<0||255<e[t])return !1;return !0}function o(e,t){if(e.buffer&&ArrayBuffer.isView(e)&&"Uint8Array"===e.name)return t&&(e=e.slice?e.slice():Array.prototype.slice.call(e)),e;if(Array.isArray(e)){if(!i(e))throw new Error("Array contains invalid value: "+e);return new Uint8Array(e)}if(n(e.length)&&i(e))return new Uint8Array(e);throw new Error("unsupported array-like object")}function a(e){return new Uint8Array(e)}function s(e,t,r,n,i){null==n&&null==i||(e=e.slice?e.slice(n,i):Array.prototype.slice.call(e,n,i)),t.set(e,r);}var u,c={toBytes:function(e){var t=[],r=0;for(e=encodeURI(e);r<e.length;){var n=e.charCodeAt(r++);37===n?(t.push(parseInt(e.substr(r,2),16)),r+=2):t.push(n);}return o(t)},fromBytes:function(e){for(var t=[],r=0;r<e.length;){var n=e[r];n<128?(t.push(String.fromCharCode(n)),r++):191<n&&n<224?(t.push(String.fromCharCode((31&n)<<6|63&e[r+1])),r+=2):(t.push(String.fromCharCode((15&n)<<12|(63&e[r+1])<<6|63&e[r+2])),r+=3);}return t.join("")}},l=(u="0123456789abcdef",{toBytes:function(e){for(var t=[],r=0;r<e.length;r+=2)t.push(parseInt(e.substr(r,2),16));return t},fromBytes:function(e){for(var t=[],r=0;r<e.length;r++){var n=e[r];t.push(u[(240&n)>>4]+u[15&n]);}return t.join("")}}),f={16:10,24:12,32:14},h=[1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145],d=[99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22],p=[82,9,106,213,48,54,165,56,191,64,163,158,129,243,215,251,124,227,57,130,155,47,255,135,52,142,67,68,196,222,233,203,84,123,148,50,166,194,35,61,238,76,149,11,66,250,195,78,8,46,161,102,40,217,36,178,118,91,162,73,109,139,209,37,114,248,246,100,134,104,152,22,212,164,92,204,93,101,182,146,108,112,72,80,253,237,185,218,94,21,70,87,167,141,157,132,144,216,171,0,140,188,211,10,247,228,88,5,184,179,69,6,208,44,30,143,202,63,15,2,193,175,189,3,1,19,138,107,58,145,17,65,79,103,220,234,151,242,207,206,240,180,230,115,150,172,116,34,231,173,53,133,226,249,55,232,28,117,223,110,71,241,26,113,29,41,197,137,111,183,98,14,170,24,190,27,252,86,62,75,198,210,121,32,154,219,192,254,120,205,90,244,31,221,168,51,136,7,199,49,177,18,16,89,39,128,236,95,96,81,127,169,25,181,74,13,45,229,122,159,147,201,156,239,160,224,59,77,174,42,245,176,200,235,187,60,131,83,153,97,23,43,4,126,186,119,214,38,225,105,20,99,85,33,12,125],v=[3328402341,4168907908,4000806809,4135287693,4294111757,3597364157,3731845041,2445657428,1613770832,33620227,3462883241,1445669757,3892248089,3050821474,1303096294,3967186586,2412431941,528646813,2311702848,4202528135,4026202645,2992200171,2387036105,4226871307,1101901292,3017069671,1604494077,1169141738,597466303,1403299063,3832705686,2613100635,1974974402,3791519004,1033081774,1277568618,1815492186,2118074177,4126668546,2211236943,1748251740,1369810420,3521504564,4193382664,3799085459,2883115123,1647391059,706024767,134480908,2512897874,1176707941,2646852446,806885416,932615841,168101135,798661301,235341577,605164086,461406363,3756188221,3454790438,1311188841,2142417613,3933566367,302582043,495158174,1479289972,874125870,907746093,3698224818,3025820398,1537253627,2756858614,1983593293,3084310113,2108928974,1378429307,3722699582,1580150641,327451799,2790478837,3117535592,0,3253595436,1075847264,3825007647,2041688520,3059440621,3563743934,2378943302,1740553945,1916352843,2487896798,2555137236,2958579944,2244988746,3151024235,3320835882,1336584933,3992714006,2252555205,2588757463,1714631509,293963156,2319795663,3925473552,67240454,4269768577,2689618160,2017213508,631218106,1269344483,2723238387,1571005438,2151694528,93294474,1066570413,563977660,1882732616,4059428100,1673313503,2008463041,2950355573,1109467491,537923632,3858759450,4260623118,3218264685,2177748300,403442708,638784309,3287084079,3193921505,899127202,2286175436,773265209,2479146071,1437050866,4236148354,2050833735,3362022572,3126681063,840505643,3866325909,3227541664,427917720,2655997905,2749160575,1143087718,1412049534,999329963,193497219,2353415882,3354324521,1807268051,672404540,2816401017,3160301282,369822493,2916866934,3688947771,1681011286,1949973070,336202270,2454276571,201721354,1210328172,3093060836,2680341085,3184776046,1135389935,3294782118,965841320,831886756,3554993207,4068047243,3588745010,2345191491,1849112409,3664604599,26054028,2983581028,2622377682,1235855840,3630984372,2891339514,4092916743,3488279077,3395642799,4101667470,1202630377,268961816,1874508501,4034427016,1243948399,1546530418,941366308,1470539505,1941222599,2546386513,3421038627,2715671932,3899946140,1042226977,2521517021,1639824860,227249030,260737669,3765465232,2084453954,1907733956,3429263018,2420656344,100860677,4160157185,470683154,3261161891,1781871967,2924959737,1773779408,394692241,2579611992,974986535,664706745,3655459128,3958962195,731420851,571543859,3530123707,2849626480,126783113,865375399,765172662,1008606754,361203602,3387549984,2278477385,2857719295,1344809080,2782912378,59542671,1503764984,160008576,437062935,1707065306,3622233649,2218934982,3496503480,2185314755,697932208,1512910199,504303377,2075177163,2824099068,1841019862,739644986],m=[2781242211,2230877308,2582542199,2381740923,234877682,3184946027,2984144751,1418839493,1348481072,50462977,2848876391,2102799147,434634494,1656084439,3863849899,2599188086,1167051466,2636087938,1082771913,2281340285,368048890,3954334041,3381544775,201060592,3963727277,1739838676,4250903202,3930435503,3206782108,4149453988,2531553906,1536934080,3262494647,484572669,2923271059,1783375398,1517041206,1098792767,49674231,1334037708,1550332980,4098991525,886171109,150598129,2481090929,1940642008,1398944049,1059722517,201851908,1385547719,1699095331,1587397571,674240536,2704774806,252314885,3039795866,151914247,908333586,2602270848,1038082786,651029483,1766729511,3447698098,2682942837,454166793,2652734339,1951935532,775166490,758520603,3000790638,4004797018,4217086112,4137964114,1299594043,1639438038,3464344499,2068982057,1054729187,1901997871,2534638724,4121318227,1757008337,0,750906861,1614815264,535035132,3363418545,3988151131,3201591914,1183697867,3647454910,1265776953,3734260298,3566750796,3903871064,1250283471,1807470800,717615087,3847203498,384695291,3313910595,3617213773,1432761139,2484176261,3481945413,283769337,100925954,2180939647,4037038160,1148730428,3123027871,3813386408,4087501137,4267549603,3229630528,2315620239,2906624658,3156319645,1215313976,82966005,3747855548,3245848246,1974459098,1665278241,807407632,451280895,251524083,1841287890,1283575245,337120268,891687699,801369324,3787349855,2721421207,3431482436,959321879,1469301956,4065699751,2197585534,1199193405,2898814052,3887750493,724703513,2514908019,2696962144,2551808385,3516813135,2141445340,1715741218,2119445034,2872807568,2198571144,3398190662,700968686,3547052216,1009259540,2041044702,3803995742,487983883,1991105499,1004265696,1449407026,1316239930,504629770,3683797321,168560134,1816667172,3837287516,1570751170,1857934291,4014189740,2797888098,2822345105,2754712981,936633572,2347923833,852879335,1133234376,1500395319,3084545389,2348912013,1689376213,3533459022,3762923945,3034082412,4205598294,133428468,634383082,2949277029,2398386810,3913789102,403703816,3580869306,2297460856,1867130149,1918643758,607656988,4049053350,3346248884,1368901318,600565992,2090982877,2632479860,557719327,3717614411,3697393085,2249034635,2232388234,2430627952,1115438654,3295786421,2865522278,3633334344,84280067,33027830,303828494,2747425121,1600795957,4188952407,3496589753,2434238086,1486471617,658119965,3106381470,953803233,334231800,3005978776,857870609,3151128937,1890179545,2298973838,2805175444,3056442267,574365214,2450884487,550103529,1233637070,4289353045,2018519080,2057691103,2399374476,4166623649,2148108681,387583245,3664101311,836232934,3330556482,3100665960,3280093505,2955516313,2002398509,287182607,3413881008,4238890068,3597515707,975967766],y=[1671808611,2089089148,2006576759,2072901243,4061003762,1807603307,1873927791,3310653893,810573872,16974337,1739181671,729634347,4263110654,3613570519,2883997099,1989864566,3393556426,2191335298,3376449993,2106063485,4195741690,1508618841,1204391495,4027317232,2917941677,3563566036,2734514082,2951366063,2629772188,2767672228,1922491506,3227229120,3082974647,4246528509,2477669779,644500518,911895606,1061256767,4144166391,3427763148,878471220,2784252325,3845444069,4043897329,1905517169,3631459288,827548209,356461077,67897348,3344078279,593839651,3277757891,405286936,2527147926,84871685,2595565466,118033927,305538066,2157648768,3795705826,3945188843,661212711,2999812018,1973414517,152769033,2208177539,745822252,439235610,455947803,1857215598,1525593178,2700827552,1391895634,994932283,3596728278,3016654259,695947817,3812548067,795958831,2224493444,1408607827,3513301457,0,3979133421,543178784,4229948412,2982705585,1542305371,1790891114,3410398667,3201918910,961245753,1256100938,1289001036,1491644504,3477767631,3496721360,4012557807,2867154858,4212583931,1137018435,1305975373,861234739,2241073541,1171229253,4178635257,33948674,2139225727,1357946960,1011120188,2679776671,2833468328,1374921297,2751356323,1086357568,2408187279,2460827538,2646352285,944271416,4110742005,3168756668,3066132406,3665145818,560153121,271589392,4279952895,4077846003,3530407890,3444343245,202643468,322250259,3962553324,1608629855,2543990167,1154254916,389623319,3294073796,2817676711,2122513534,1028094525,1689045092,1575467613,422261273,1939203699,1621147744,2174228865,1339137615,3699352540,577127458,712922154,2427141008,2290289544,1187679302,3995715566,3100863416,339486740,3732514782,1591917662,186455563,3681988059,3762019296,844522546,978220090,169743370,1239126601,101321734,611076132,1558493276,3260915650,3547250131,2901361580,1655096418,2443721105,2510565781,3828863972,2039214713,3878868455,3359869896,928607799,1840765549,2374762893,3580146133,1322425422,2850048425,1823791212,1459268694,4094161908,3928346602,1706019429,2056189050,2934523822,135794696,3134549946,2022240376,628050469,779246638,472135708,2800834470,3032970164,3327236038,3894660072,3715932637,1956440180,522272287,1272813131,3185336765,2340818315,2323976074,1888542832,1044544574,3049550261,1722469478,1222152264,50660867,4127324150,236067854,1638122081,895445557,1475980887,3117443513,2257655686,3243809217,489110045,2662934430,3778599393,4162055160,2561878936,288563729,1773916777,3648039385,2391345038,2493985684,2612407707,505560094,2274497927,3911240169,3460925390,1442818645,678973480,3749357023,2358182796,2717407649,2306869641,219617805,3218761151,3862026214,1120306242,1756942440,1103331905,2578459033,762796589,252780047,2966125488,1425844308,3151392187,372911126],g=[1667474886,2088535288,2004326894,2071694838,4075949567,1802223062,1869591006,3318043793,808472672,16843522,1734846926,724270422,4278065639,3621216949,2880169549,1987484396,3402253711,2189597983,3385409673,2105378810,4210693615,1499065266,1195886990,4042263547,2913856577,3570689971,2728590687,2947541573,2627518243,2762274643,1920112356,3233831835,3082273397,4261223649,2475929149,640051788,909531756,1061110142,4160160501,3435941763,875846760,2779116625,3857003729,4059105529,1903268834,3638064043,825316194,353713962,67374088,3351728789,589522246,3284360861,404236336,2526454071,84217610,2593830191,117901582,303183396,2155911963,3806477791,3958056653,656894286,2998062463,1970642922,151591698,2206440989,741110872,437923380,454765878,1852748508,1515908788,2694904667,1381168804,993742198,3604373943,3014905469,690584402,3823320797,791638366,2223281939,1398011302,3520161977,0,3991743681,538992704,4244381667,2981218425,1532751286,1785380564,3419096717,3200178535,960056178,1246420628,1280103576,1482221744,3486468741,3503319995,4025428677,2863326543,4227536621,1128514950,1296947098,859002214,2240123921,1162203018,4193849577,33687044,2139062782,1347481760,1010582648,2678045221,2829640523,1364325282,2745433693,1077985408,2408548869,2459086143,2644360225,943212656,4126475505,3166494563,3065430391,3671750063,555836226,269496352,4294908645,4092792573,3537006015,3452783745,202118168,320025894,3974901699,1600119230,2543297077,1145359496,387397934,3301201811,2812801621,2122220284,1027426170,1684319432,1566435258,421079858,1936954854,1616945344,2172753945,1330631070,3705438115,572679748,707427924,2425400123,2290647819,1179044492,4008585671,3099120491,336870440,3739122087,1583276732,185277718,3688593069,3772791771,842159716,976899700,168435220,1229577106,101059084,606366792,1549591736,3267517855,3553849021,2897014595,1650632388,2442242105,2509612081,3840161747,2038008818,3890688725,3368567691,926374254,1835907034,2374863873,3587531953,1313788572,2846482505,1819063512,1448540844,4109633523,3941213647,1701162954,2054852340,2930698567,134748176,3132806511,2021165296,623210314,774795868,471606328,2795958615,3031746419,3334885783,3907527627,3722280097,1953799400,522133822,1263263126,3183336545,2341176845,2324333839,1886425312,1044267644,3048588401,1718004428,1212733584,50529542,4143317495,235803164,1633788866,892690282,1465383342,3115962473,2256965911,3250673817,488449850,2661202215,3789633753,4177007595,2560144171,286339874,1768537042,3654906025,2391705863,2492770099,2610673197,505291324,2273808917,3924369609,3469625735,1431699370,673740880,3755965093,2358021891,2711746649,2307489801,218961690,3217021541,3873845719,1111672452,1751693520,1094828930,2576986153,757954394,252645662,2964376443,1414855848,3149649517,370555436],b=[1374988112,2118214995,437757123,975658646,1001089995,530400753,2902087851,1273168787,540080725,2910219766,2295101073,4110568485,1340463100,3307916247,641025152,3043140495,3736164937,632953703,1172967064,1576976609,3274667266,2169303058,2370213795,1809054150,59727847,361929877,3211623147,2505202138,3569255213,1484005843,1239443753,2395588676,1975683434,4102977912,2572697195,666464733,3202437046,4035489047,3374361702,2110667444,1675577880,3843699074,2538681184,1649639237,2976151520,3144396420,4269907996,4178062228,1883793496,2403728665,2497604743,1383856311,2876494627,1917518562,3810496343,1716890410,3001755655,800440835,2261089178,3543599269,807962610,599762354,33778362,3977675356,2328828971,2809771154,4077384432,1315562145,1708848333,101039829,3509871135,3299278474,875451293,2733856160,92987698,2767645557,193195065,1080094634,1584504582,3178106961,1042385657,2531067453,3711829422,1306967366,2438237621,1908694277,67556463,1615861247,429456164,3602770327,2302690252,1742315127,2968011453,126454664,3877198648,2043211483,2709260871,2084704233,4169408201,0,159417987,841739592,504459436,1817866830,4245618683,260388950,1034867998,908933415,168810852,1750902305,2606453969,607530554,202008497,2472011535,3035535058,463180190,2160117071,1641816226,1517767529,470948374,3801332234,3231722213,1008918595,303765277,235474187,4069246893,766945465,337553864,1475418501,2943682380,4003061179,2743034109,4144047775,1551037884,1147550661,1543208500,2336434550,3408119516,3069049960,3102011747,3610369226,1113818384,328671808,2227573024,2236228733,3535486456,2935566865,3341394285,496906059,3702665459,226906860,2009195472,733156972,2842737049,294930682,1206477858,2835123396,2700099354,1451044056,573804783,2269728455,3644379585,2362090238,2564033334,2801107407,2776292904,3669462566,1068351396,742039012,1350078989,1784663195,1417561698,4136440770,2430122216,775550814,2193862645,2673705150,1775276924,1876241833,3475313331,3366754619,270040487,3902563182,3678124923,3441850377,1851332852,3969562369,2203032232,3868552805,2868897406,566021896,4011190502,3135740889,1248802510,3936291284,699432150,832877231,708780849,3332740144,899835584,1951317047,4236429990,3767586992,866637845,4043610186,1106041591,2144161806,395441711,1984812685,1139781709,3433712980,3835036895,2664543715,1282050075,3240894392,1181045119,2640243204,25965917,4203181171,4211818798,3009879386,2463879762,3910161971,1842759443,2597806476,933301370,1509430414,3943906441,3467192302,3076639029,3776767469,2051518780,2631065433,1441952575,404016761,1942435775,1408749034,1610459739,3745345300,2017778566,3400528769,3110650942,941896748,3265478751,371049330,3168937228,675039627,4279080257,967311729,135050206,3635733660,1683407248,2076935265,3576870512,1215061108,3501741890],w=[1347548327,1400783205,3273267108,2520393566,3409685355,4045380933,2880240216,2471224067,1428173050,4138563181,2441661558,636813900,4233094615,3620022987,2149987652,2411029155,1239331162,1730525723,2554718734,3781033664,46346101,310463728,2743944855,3328955385,3875770207,2501218972,3955191162,3667219033,768917123,3545789473,692707433,1150208456,1786102409,2029293177,1805211710,3710368113,3065962831,401639597,1724457132,3028143674,409198410,2196052529,1620529459,1164071807,3769721975,2226875310,486441376,2499348523,1483753576,428819965,2274680428,3075636216,598438867,3799141122,1474502543,711349675,129166120,53458370,2592523643,2782082824,4063242375,2988687269,3120694122,1559041666,730517276,2460449204,4042459122,2706270690,3446004468,3573941694,533804130,2328143614,2637442643,2695033685,839224033,1973745387,957055980,2856345839,106852767,1371368976,4181598602,1033297158,2933734917,1179510461,3046200461,91341917,1862534868,4284502037,605657339,2547432937,3431546947,2003294622,3182487618,2282195339,954669403,3682191598,1201765386,3917234703,3388507166,0,2198438022,1211247597,2887651696,1315723890,4227665663,1443857720,507358933,657861945,1678381017,560487590,3516619604,975451694,2970356327,261314535,3535072918,2652609425,1333838021,2724322336,1767536459,370938394,182621114,3854606378,1128014560,487725847,185469197,2918353863,3106780840,3356761769,2237133081,1286567175,3152976349,4255350624,2683765030,3160175349,3309594171,878443390,1988838185,3704300486,1756818940,1673061617,3403100636,272786309,1075025698,545572369,2105887268,4174560061,296679730,1841768865,1260232239,4091327024,3960309330,3497509347,1814803222,2578018489,4195456072,575138148,3299409036,446754879,3629546796,4011996048,3347532110,3252238545,4270639778,915985419,3483825537,681933534,651868046,2755636671,3828103837,223377554,2607439820,1649704518,3270937875,3901806776,1580087799,4118987695,3198115200,2087309459,2842678573,3016697106,1003007129,2802849917,1860738147,2077965243,164439672,4100872472,32283319,2827177882,1709610350,2125135846,136428751,3874428392,3652904859,3460984630,3572145929,3593056380,2939266226,824852259,818324884,3224740454,930369212,2801566410,2967507152,355706840,1257309336,4148292826,243256656,790073846,2373340630,1296297904,1422699085,3756299780,3818836405,457992840,3099667487,2135319889,77422314,1560382517,1945798516,788204353,1521706781,1385356242,870912086,325965383,2358957921,2050466060,2388260884,2313884476,4006521127,901210569,3990953189,1014646705,1503449823,1062597235,2031621326,3212035895,3931371469,1533017514,350174575,2256028891,2177544179,1052338372,741876788,1606591296,1914052035,213705253,2334669897,1107234197,1899603969,3725069491,2631447780,2422494913,1635502980,1893020342,1950903388,1120974935],E=[2807058932,1699970625,2764249623,1586903591,1808481195,1173430173,1487645946,59984867,4199882800,1844882806,1989249228,1277555970,3623636965,3419915562,1149249077,2744104290,1514790577,459744698,244860394,3235995134,1963115311,4027744588,2544078150,4190530515,1608975247,2627016082,2062270317,1507497298,2200818878,567498868,1764313568,3359936201,2305455554,2037970062,1047239e3,1910319033,1337376481,2904027272,2892417312,984907214,1243112415,830661914,861968209,2135253587,2011214180,2927934315,2686254721,731183368,1750626376,4246310725,1820824798,4172763771,3542330227,48394827,2404901663,2871682645,671593195,3254988725,2073724613,145085239,2280796200,2779915199,1790575107,2187128086,472615631,3029510009,4075877127,3802222185,4107101658,3201631749,1646252340,4270507174,1402811438,1436590835,3778151818,3950355702,3963161475,4020912224,2667994737,273792366,2331590177,104699613,95345982,3175501286,2377486676,1560637892,3564045318,369057872,4213447064,3919042237,1137477952,2658625497,1119727848,2340947849,1530455833,4007360968,172466556,266959938,516552836,0,2256734592,3980931627,1890328081,1917742170,4294704398,945164165,3575528878,958871085,3647212047,2787207260,1423022939,775562294,1739656202,3876557655,2530391278,2443058075,3310321856,547512796,1265195639,437656594,3121275539,719700128,3762502690,387781147,218828297,3350065803,2830708150,2848461854,428169201,122466165,3720081049,1627235199,648017665,4122762354,1002783846,2117360635,695634755,3336358691,4234721005,4049844452,3704280881,2232435299,574624663,287343814,612205898,1039717051,840019705,2708326185,793451934,821288114,1391201670,3822090177,376187827,3113855344,1224348052,1679968233,2361698556,1058709744,752375421,2431590963,1321699145,3519142200,2734591178,188127444,2177869557,3727205754,2384911031,3215212461,2648976442,2450346104,3432737375,1180849278,331544205,3102249176,4150144569,2952102595,2159976285,2474404304,766078933,313773861,2570832044,2108100632,1668212892,3145456443,2013908262,418672217,3070356634,2594734927,1852171925,3867060991,3473416636,3907448597,2614737639,919489135,164948639,2094410160,2997825956,590424639,2486224549,1723872674,3157750862,3399941250,3501252752,3625268135,2555048196,3673637356,1343127501,4130281361,3599595085,2957853679,1297403050,81781910,3051593425,2283490410,532201772,1367295589,3926170974,895287692,1953757831,1093597963,492483431,3528626907,1446242576,1192455638,1636604631,209336225,344873464,1015671571,669961897,3375740769,3857572124,2973530695,3747192018,1933530610,3464042516,935293895,3454686199,2858115069,1863638845,3683022916,4085369519,3292445032,875313188,1080017571,3279033885,621591778,1233856572,2504130317,24197544,3017672716,3835484340,3247465558,2220981195,3060847922,1551124588,1463996600],_=[4104605777,1097159550,396673818,660510266,2875968315,2638606623,4200115116,3808662347,821712160,1986918061,3430322568,38544885,3856137295,718002117,893681702,1654886325,2975484382,3122358053,3926825029,4274053469,796197571,1290801793,1184342925,3556361835,2405426947,2459735317,1836772287,1381620373,3196267988,1948373848,3764988233,3385345166,3263785589,2390325492,1480485785,3111247143,3780097726,2293045232,548169417,3459953789,3746175075,439452389,1362321559,1400849762,1685577905,1806599355,2174754046,137073913,1214797936,1174215055,3731654548,2079897426,1943217067,1258480242,529487843,1437280870,3945269170,3049390895,3313212038,923313619,679998e3,3215307299,57326082,377642221,3474729866,2041877159,133361907,1776460110,3673476453,96392454,878845905,2801699524,777231668,4082475170,2330014213,4142626212,2213296395,1626319424,1906247262,1846563261,562755902,3708173718,1040559837,3871163981,1418573201,3294430577,114585348,1343618912,2566595609,3186202582,1078185097,3651041127,3896688048,2307622919,425408743,3371096953,2081048481,1108339068,2216610296,0,2156299017,736970802,292596766,1517440620,251657213,2235061775,2933202493,758720310,265905162,1554391400,1532285339,908999204,174567692,1474760595,4002861748,2610011675,3234156416,3693126241,2001430874,303699484,2478443234,2687165888,585122620,454499602,151849742,2345119218,3064510765,514443284,4044981591,1963412655,2581445614,2137062819,19308535,1928707164,1715193156,4219352155,1126790795,600235211,3992742070,3841024952,836553431,1669664834,2535604243,3323011204,1243905413,3141400786,4180808110,698445255,2653899549,2989552604,2253581325,3252932727,3004591147,1891211689,2487810577,3915653703,4237083816,4030667424,2100090966,865136418,1229899655,953270745,3399679628,3557504664,4118925222,2061379749,3079546586,2915017791,983426092,2022837584,1607244650,2118541908,2366882550,3635996816,972512814,3283088770,1568718495,3499326569,3576539503,621982671,2895723464,410887952,2623762152,1002142683,645401037,1494807662,2595684844,1335535747,2507040230,4293295786,3167684641,367585007,3885750714,1865862730,2668221674,2960971305,2763173681,1059270954,2777952454,2724642869,1320957812,2194319100,2429595872,2815956275,77089521,3973773121,3444575871,2448830231,1305906550,4021308739,2857194700,2516901860,3518358430,1787304780,740276417,1699839814,1592394909,2352307457,2272556026,188821243,1729977011,3687994002,274084841,3594982253,3613494426,2701949495,4162096729,322734571,2837966542,1640576439,484830689,1202797690,3537852828,4067639125,349075736,3342319475,4157467219,4255800159,1030690015,1155237496,2951971274,1757691577,607398968,2738905026,499347990,3794078908,1011452712,227885567,2818666809,213114376,3034881240,1455525988,3414450555,850817237,1817998408,3092726480],S=[0,235474187,470948374,303765277,941896748,908933415,607530554,708780849,1883793496,2118214995,1817866830,1649639237,1215061108,1181045119,1417561698,1517767529,3767586992,4003061179,4236429990,4069246893,3635733660,3602770327,3299278474,3400528769,2430122216,2664543715,2362090238,2193862645,2835123396,2801107407,3035535058,3135740889,3678124923,3576870512,3341394285,3374361702,3810496343,3977675356,4279080257,4043610186,2876494627,2776292904,3076639029,3110650942,2472011535,2640243204,2403728665,2169303058,1001089995,899835584,666464733,699432150,59727847,226906860,530400753,294930682,1273168787,1172967064,1475418501,1509430414,1942435775,2110667444,1876241833,1641816226,2910219766,2743034109,2976151520,3211623147,2505202138,2606453969,2302690252,2269728455,3711829422,3543599269,3240894392,3475313331,3843699074,3943906441,4178062228,4144047775,1306967366,1139781709,1374988112,1610459739,1975683434,2076935265,1775276924,1742315127,1034867998,866637845,566021896,800440835,92987698,193195065,429456164,395441711,1984812685,2017778566,1784663195,1683407248,1315562145,1080094634,1383856311,1551037884,101039829,135050206,437757123,337553864,1042385657,807962610,573804783,742039012,2531067453,2564033334,2328828971,2227573024,2935566865,2700099354,3001755655,3168937228,3868552805,3902563182,4203181171,4102977912,3736164937,3501741890,3265478751,3433712980,1106041591,1340463100,1576976609,1408749034,2043211483,2009195472,1708848333,1809054150,832877231,1068351396,766945465,599762354,159417987,126454664,361929877,463180190,2709260871,2943682380,3178106961,3009879386,2572697195,2538681184,2236228733,2336434550,3509871135,3745345300,3441850377,3274667266,3910161971,3877198648,4110568485,4211818798,2597806476,2497604743,2261089178,2295101073,2733856160,2902087851,3202437046,2968011453,3936291284,3835036895,4136440770,4169408201,3535486456,3702665459,3467192302,3231722213,2051518780,1951317047,1716890410,1750902305,1113818384,1282050075,1584504582,1350078989,168810852,67556463,371049330,404016761,841739592,1008918595,775550814,540080725,3969562369,3801332234,4035489047,4269907996,3569255213,3669462566,3366754619,3332740144,2631065433,2463879762,2160117071,2395588676,2767645557,2868897406,3102011747,3069049960,202008497,33778362,270040487,504459436,875451293,975658646,675039627,641025152,2084704233,1917518562,1615861247,1851332852,1147550661,1248802510,1484005843,1451044056,933301370,967311729,733156972,632953703,260388950,25965917,328671808,496906059,1206477858,1239443753,1543208500,1441952575,2144161806,1908694277,1675577880,1842759443,3610369226,3644379585,3408119516,3307916247,4011190502,3776767469,4077384432,4245618683,2809771154,2842737049,3144396420,3043140495,2673705150,2438237621,2203032232,2370213795],A=[0,185469197,370938394,487725847,741876788,657861945,975451694,824852259,1483753576,1400783205,1315723890,1164071807,1950903388,2135319889,1649704518,1767536459,2967507152,3152976349,2801566410,2918353863,2631447780,2547432937,2328143614,2177544179,3901806776,3818836405,4270639778,4118987695,3299409036,3483825537,3535072918,3652904859,2077965243,1893020342,1841768865,1724457132,1474502543,1559041666,1107234197,1257309336,598438867,681933534,901210569,1052338372,261314535,77422314,428819965,310463728,3409685355,3224740454,3710368113,3593056380,3875770207,3960309330,4045380933,4195456072,2471224067,2554718734,2237133081,2388260884,3212035895,3028143674,2842678573,2724322336,4138563181,4255350624,3769721975,3955191162,3667219033,3516619604,3431546947,3347532110,2933734917,2782082824,3099667487,3016697106,2196052529,2313884476,2499348523,2683765030,1179510461,1296297904,1347548327,1533017514,1786102409,1635502980,2087309459,2003294622,507358933,355706840,136428751,53458370,839224033,957055980,605657339,790073846,2373340630,2256028891,2607439820,2422494913,2706270690,2856345839,3075636216,3160175349,3573941694,3725069491,3273267108,3356761769,4181598602,4063242375,4011996048,3828103837,1033297158,915985419,730517276,545572369,296679730,446754879,129166120,213705253,1709610350,1860738147,1945798516,2029293177,1239331162,1120974935,1606591296,1422699085,4148292826,4233094615,3781033664,3931371469,3682191598,3497509347,3446004468,3328955385,2939266226,2755636671,3106780840,2988687269,2198438022,2282195339,2501218972,2652609425,1201765386,1286567175,1371368976,1521706781,1805211710,1620529459,2105887268,1988838185,533804130,350174575,164439672,46346101,870912086,954669403,636813900,788204353,2358957921,2274680428,2592523643,2441661558,2695033685,2880240216,3065962831,3182487618,3572145929,3756299780,3270937875,3388507166,4174560061,4091327024,4006521127,3854606378,1014646705,930369212,711349675,560487590,272786309,457992840,106852767,223377554,1678381017,1862534868,1914052035,2031621326,1211247597,1128014560,1580087799,1428173050,32283319,182621114,401639597,486441376,768917123,651868046,1003007129,818324884,1503449823,1385356242,1333838021,1150208456,1973745387,2125135846,1673061617,1756818940,2970356327,3120694122,2802849917,2887651696,2637442643,2520393566,2334669897,2149987652,3917234703,3799141122,4284502037,4100872472,3309594171,3460984630,3545789473,3629546796,2050466060,1899603969,1814803222,1730525723,1443857720,1560382517,1075025698,1260232239,575138148,692707433,878443390,1062597235,243256656,91341917,409198410,325965383,3403100636,3252238545,3704300486,3620022987,3874428392,3990953189,4042459122,4227665663,2460449204,2578018489,2226875310,2411029155,3198115200,3046200461,2827177882,2743944855],T=[0,218828297,437656594,387781147,875313188,958871085,775562294,590424639,1750626376,1699970625,1917742170,2135253587,1551124588,1367295589,1180849278,1265195639,3501252752,3720081049,3399941250,3350065803,3835484340,3919042237,4270507174,4085369519,3102249176,3051593425,2734591178,2952102595,2361698556,2177869557,2530391278,2614737639,3145456443,3060847922,2708326185,2892417312,2404901663,2187128086,2504130317,2555048196,3542330227,3727205754,3375740769,3292445032,3876557655,3926170974,4246310725,4027744588,1808481195,1723872674,1910319033,2094410160,1608975247,1391201670,1173430173,1224348052,59984867,244860394,428169201,344873464,935293895,984907214,766078933,547512796,1844882806,1627235199,2011214180,2062270317,1507497298,1423022939,1137477952,1321699145,95345982,145085239,532201772,313773861,830661914,1015671571,731183368,648017665,3175501286,2957853679,2807058932,2858115069,2305455554,2220981195,2474404304,2658625497,3575528878,3625268135,3473416636,3254988725,3778151818,3963161475,4213447064,4130281361,3599595085,3683022916,3432737375,3247465558,3802222185,4020912224,4172763771,4122762354,3201631749,3017672716,2764249623,2848461854,2331590177,2280796200,2431590963,2648976442,104699613,188127444,472615631,287343814,840019705,1058709744,671593195,621591778,1852171925,1668212892,1953757831,2037970062,1514790577,1463996600,1080017571,1297403050,3673637356,3623636965,3235995134,3454686199,4007360968,3822090177,4107101658,4190530515,2997825956,3215212461,2830708150,2779915199,2256734592,2340947849,2627016082,2443058075,172466556,122466165,273792366,492483431,1047239e3,861968209,612205898,695634755,1646252340,1863638845,2013908262,1963115311,1446242576,1530455833,1277555970,1093597963,1636604631,1820824798,2073724613,1989249228,1436590835,1487645946,1337376481,1119727848,164948639,81781910,331544205,516552836,1039717051,821288114,669961897,719700128,2973530695,3157750862,2871682645,2787207260,2232435299,2283490410,2667994737,2450346104,3647212047,3564045318,3279033885,3464042516,3980931627,3762502690,4150144569,4199882800,3070356634,3121275539,2904027272,2686254721,2200818878,2384911031,2570832044,2486224549,3747192018,3528626907,3310321856,3359936201,3950355702,3867060991,4049844452,4234721005,1739656202,1790575107,2108100632,1890328081,1402811438,1586903591,1233856572,1149249077,266959938,48394827,369057872,418672217,1002783846,919489135,567498868,752375421,209336225,24197544,376187827,459744698,945164165,895287692,574624663,793451934,1679968233,1764313568,2117360635,1933530610,1343127501,1560637892,1243112415,1192455638,3704280881,3519142200,3336358691,3419915562,3907448597,3857572124,4075877127,4294704398,3029510009,3113855344,2927934315,2744104290,2159976285,2377486676,2594734927,2544078150],N=[0,151849742,303699484,454499602,607398968,758720310,908999204,1059270954,1214797936,1097159550,1517440620,1400849762,1817998408,1699839814,2118541908,2001430874,2429595872,2581445614,2194319100,2345119218,3034881240,3186202582,2801699524,2951971274,3635996816,3518358430,3399679628,3283088770,4237083816,4118925222,4002861748,3885750714,1002142683,850817237,698445255,548169417,529487843,377642221,227885567,77089521,1943217067,2061379749,1640576439,1757691577,1474760595,1592394909,1174215055,1290801793,2875968315,2724642869,3111247143,2960971305,2405426947,2253581325,2638606623,2487810577,3808662347,3926825029,4044981591,4162096729,3342319475,3459953789,3576539503,3693126241,1986918061,2137062819,1685577905,1836772287,1381620373,1532285339,1078185097,1229899655,1040559837,923313619,740276417,621982671,439452389,322734571,137073913,19308535,3871163981,4021308739,4104605777,4255800159,3263785589,3414450555,3499326569,3651041127,2933202493,2815956275,3167684641,3049390895,2330014213,2213296395,2566595609,2448830231,1305906550,1155237496,1607244650,1455525988,1776460110,1626319424,2079897426,1928707164,96392454,213114376,396673818,514443284,562755902,679998e3,865136418,983426092,3708173718,3557504664,3474729866,3323011204,4180808110,4030667424,3945269170,3794078908,2507040230,2623762152,2272556026,2390325492,2975484382,3092726480,2738905026,2857194700,3973773121,3856137295,4274053469,4157467219,3371096953,3252932727,3673476453,3556361835,2763173681,2915017791,3064510765,3215307299,2156299017,2307622919,2459735317,2610011675,2081048481,1963412655,1846563261,1729977011,1480485785,1362321559,1243905413,1126790795,878845905,1030690015,645401037,796197571,274084841,425408743,38544885,188821243,3613494426,3731654548,3313212038,3430322568,4082475170,4200115116,3780097726,3896688048,2668221674,2516901860,2366882550,2216610296,3141400786,2989552604,2837966542,2687165888,1202797690,1320957812,1437280870,1554391400,1669664834,1787304780,1906247262,2022837584,265905162,114585348,499347990,349075736,736970802,585122620,972512814,821712160,2595684844,2478443234,2293045232,2174754046,3196267988,3079546586,2895723464,2777952454,3537852828,3687994002,3234156416,3385345166,4142626212,4293295786,3841024952,3992742070,174567692,57326082,410887952,292596766,777231668,660510266,1011452712,893681702,1108339068,1258480242,1343618912,1494807662,1715193156,1865862730,1948373848,2100090966,2701949495,2818666809,3004591147,3122358053,2235061775,2352307457,2535604243,2653899549,3915653703,3764988233,4219352155,4067639125,3444575871,3294430577,3746175075,3594982253,836553431,953270745,600235211,718002117,367585007,484830689,133361907,251657213,2041877159,1891211689,1806599355,1654886325,1568718495,1418573201,1335535747,1184342925];function x(e){for(var t=[],r=0;r<e.length;r+=4)t.push(e[r]<<24|e[r+1]<<16|e[r+2]<<8|e[r+3]);return t}var M=function(e){if(!(this instanceof M))throw Error("AES must be instanitated with `new`");Object.defineProperty(this,"key",{value:o(e,!0)}),this._prepare();};M.prototype._prepare=function(){var e=f[this.key.length];if(null==e)throw new Error("invalid key size (must be 16, 24 or 32 bytes)");this._Ke=[],this._Kd=[];for(var t=0;t<=e;t++)this._Ke.push([0,0,0,0]),this._Kd.push([0,0,0,0]);var r,n=4*(e+1),i=this.key.length/4,o=x(this.key);for(t=0;t<i;t++)r=t>>2,this._Ke[r][t%4]=o[t],this._Kd[e-r][t%4]=o[t];for(var a,s=0,u=i;u<n;){if(a=o[i-1],o[0]^=d[a>>16&255]<<24^d[a>>8&255]<<16^d[255&a]<<8^d[a>>24&255]^h[s]<<24,s+=1,8!=i)for(t=1;t<i;t++)o[t]^=o[t-1];else{for(t=1;t<i/2;t++)o[t]^=o[t-1];for(a=o[i/2-1],o[i/2]^=d[255&a]^d[a>>8&255]<<8^d[a>>16&255]<<16^d[a>>24&255]<<24,t=i/2+1;t<i;t++)o[t]^=o[t-1];}for(t=0;t<i&&u<n;)c=u>>2,l=u%4,this._Ke[c][l]=o[t],this._Kd[e-c][l]=o[t++],u++;}for(var c=1;c<e;c++)for(var l=0;l<4;l++)a=this._Kd[c][l],this._Kd[c][l]=S[a>>24&255]^A[a>>16&255]^T[a>>8&255]^N[255&a];},M.prototype.encrypt=function(e){if(16!=e.length)throw new Error("invalid plaintext size (must be 16 bytes)");for(var t=this._Ke.length-1,r=[0,0,0,0],n=x(e),i=0;i<4;i++)n[i]^=this._Ke[0][i];for(var o=1;o<t;o++){for(i=0;i<4;i++)r[i]=v[n[i]>>24&255]^m[n[(i+1)%4]>>16&255]^y[n[(i+2)%4]>>8&255]^g[255&n[(i+3)%4]]^this._Ke[o][i];n=r.slice();}var s,u=a(16);for(i=0;i<4;i++)s=this._Ke[t][i],u[4*i]=255&(d[n[i]>>24&255]^s>>24),u[4*i+1]=255&(d[n[(i+1)%4]>>16&255]^s>>16),u[4*i+2]=255&(d[n[(i+2)%4]>>8&255]^s>>8),u[4*i+3]=255&(d[255&n[(i+3)%4]]^s);return u},M.prototype.decrypt=function(e){if(16!=e.length)throw new Error("invalid ciphertext size (must be 16 bytes)");for(var t=this._Kd.length-1,r=[0,0,0,0],n=x(e),i=0;i<4;i++)n[i]^=this._Kd[0][i];for(var o=1;o<t;o++){for(i=0;i<4;i++)r[i]=b[n[i]>>24&255]^w[n[(i+3)%4]>>16&255]^E[n[(i+2)%4]>>8&255]^_[255&n[(i+1)%4]]^this._Kd[o][i];n=r.slice();}var s,u=a(16);for(i=0;i<4;i++)s=this._Kd[t][i],u[4*i]=255&(p[n[i]>>24&255]^s>>24),u[4*i+1]=255&(p[n[(i+3)%4]>>16&255]^s>>16),u[4*i+2]=255&(p[n[(i+2)%4]>>8&255]^s>>8),u[4*i+3]=255&(p[255&n[(i+1)%4]]^s);return u};var I=function(e){if(!(this instanceof I))throw Error("AES must be instanitated with `new`");this.description="Electronic Code Block",this.name="ecb",this._aes=new M(e);};I.prototype.encrypt=function(e){if((e=o(e)).length%16!=0)throw new Error("invalid plaintext size (must be multiple of 16 bytes)");for(var t=a(e.length),r=a(16),n=0;n<e.length;n+=16)s(e,r,0,n,n+16),s(r=this._aes.encrypt(r),t,n);return t},I.prototype.decrypt=function(e){if((e=o(e)).length%16!=0)throw new Error("invalid ciphertext size (must be multiple of 16 bytes)");for(var t=a(e.length),r=a(16),n=0;n<e.length;n+=16)s(e,r,0,n,n+16),s(r=this._aes.decrypt(r),t,n);return t};var O=function(e,t){if(!(this instanceof O))throw Error("AES must be instanitated with `new`");if(this.description="Cipher Block Chaining",this.name="cbc",t){if(16!=t.length)throw new Error("invalid initialation vector size (must be 16 bytes)")}else t=a(16);this._lastCipherblock=o(t,!0),this._aes=new M(e);};O.prototype.encrypt=function(e){if((e=o(e)).length%16!=0)throw new Error("invalid plaintext size (must be multiple of 16 bytes)");for(var t=a(e.length),r=a(16),n=0;n<e.length;n+=16){s(e,r,0,n,n+16);for(var i=0;i<16;i++)r[i]^=this._lastCipherblock[i];this._lastCipherblock=this._aes.encrypt(r),s(this._lastCipherblock,t,n);}return t},O.prototype.decrypt=function(e){if((e=o(e)).length%16!=0)throw new Error("invalid ciphertext size (must be multiple of 16 bytes)");for(var t=a(e.length),r=a(16),n=0;n<e.length;n+=16){s(e,r,0,n,n+16),r=this._aes.decrypt(r);for(var i=0;i<16;i++)t[n+i]=r[i]^this._lastCipherblock[i];s(e,this._lastCipherblock,0,n,n+16);}return t};var R=function(e,t,r){if(!(this instanceof R))throw Error("AES must be instanitated with `new`");if(this.description="Cipher Feedback",this.name="cfb",t){if(16!=t.length)throw new Error("invalid initialation vector size (must be 16 size)")}else t=a(16);r=r||1,this.segmentSize=r,this._shiftRegister=o(t,!0),this._aes=new M(e);};R.prototype.encrypt=function(e){if(e.length%this.segmentSize!=0)throw new Error("invalid plaintext size (must be segmentSize bytes)");for(var t,r=o(e,!0),n=0;n<r.length;n+=this.segmentSize){t=this._aes.encrypt(this._shiftRegister);for(var i=0;i<this.segmentSize;i++)r[n+i]^=t[i];s(this._shiftRegister,this._shiftRegister,0,this.segmentSize),s(r,this._shiftRegister,16-this.segmentSize,n,n+this.segmentSize);}return r},R.prototype.decrypt=function(e){if(e.length%this.segmentSize!=0)throw new Error("invalid ciphertext size (must be segmentSize bytes)");for(var t,r=o(e,!0),n=0;n<r.length;n+=this.segmentSize){t=this._aes.encrypt(this._shiftRegister);for(var i=0;i<this.segmentSize;i++)r[n+i]^=t[i];s(this._shiftRegister,this._shiftRegister,0,this.segmentSize),s(e,this._shiftRegister,16-this.segmentSize,n,n+this.segmentSize);}return r};var P=function(e,t){if(!(this instanceof P))throw Error("AES must be instanitated with `new`");if(this.description="Output Feedback",this.name="ofb",t){if(16!=t.length)throw new Error("invalid initialation vector size (must be 16 bytes)")}else t=a(16);this._lastPrecipher=o(t,!0),this._lastPrecipherIndex=16,this._aes=new M(e);};P.prototype.encrypt=function(e){for(var t=o(e,!0),r=0;r<t.length;r++)16===this._lastPrecipherIndex&&(this._lastPrecipher=this._aes.encrypt(this._lastPrecipher),this._lastPrecipherIndex=0),t[r]^=this._lastPrecipher[this._lastPrecipherIndex++];return t},P.prototype.decrypt=P.prototype.encrypt;var k=function(e){if(!(this instanceof k))throw Error("Counter must be instanitated with `new`");0===e||e||(e=1),"number"==typeof e?(this._counter=a(16),this.setValue(e)):this.setBytes(e);};k.prototype.setValue=function(e){if("number"!=typeof e||parseInt(e)!=e)throw new Error("invalid counter value (must be an integer)");for(var t=15;0<=t;--t)this._counter[t]=e%256,e>>=8;},k.prototype.setBytes=function(e){if(16!=(e=o(e,!0)).length)throw new Error("invalid counter bytes size (must be 16 bytes)");this._counter=e;},k.prototype.increment=function(){for(var e=15;0<=e;e--){if(255!==this._counter[e]){this._counter[e]++;break}this._counter[e]=0;}};var C=function(e,t){if(!(this instanceof C))throw Error("AES must be instanitated with `new`");this.description="Counter",this.name="ctr",t instanceof k||(t=new k(t)),this._counter=t,this._remainingCounter=null,this._remainingCounterIndex=16,this._aes=new M(e);};C.prototype.encrypt=function(e){for(var t=o(e,!0),r=0;r<t.length;r++)16===this._remainingCounterIndex&&(this._remainingCounter=this._aes.encrypt(this._counter._counter),this._remainingCounterIndex=0,this._counter.increment()),t[r]^=this._remainingCounter[this._remainingCounterIndex++];return t},C.prototype.decrypt=C.prototype.encrypt;var L={AES:M,Counter:k,ModeOfOperation:{ecb:I,cbc:O,cfb:R,ofb:P,ctr:C},utils:{hex:l,utf8:c},padding:{pkcs7:{pad:function(e){var t=16-(e=o(e,!0)).length%16,r=a(e.length+t);s(e,r);for(var n=e.length;n<r.length;n++)r[n]=t;return r},strip:function(e){if((e=o(e,!0)).length<16)throw new Error("PKCS#7 invalid length");var t=e[e.length-1];if(16<t)throw new Error("PKCS#7 padding byte out of range");for(var r=e.length-t,n=0;n<t;n++)if(e[r+n]!==t)throw new Error("PKCS#7 invalid padding byte");var i=a(r);return s(e,i,0,0,r),i}}},_arrayTest:{coerceArray:o,createArray:a,copyArray:s}};void 0!==r?t.exports=L:(e.aesjs&&(L._aesjs=e.aesjs),e.aesjs=L);}(this);},{}],9:[function(e,t,r){!function(t,r){function n(e,t){if(!e)throw new Error(t||"Assertion failed")}function i(e,t){function r(){}e.super_=t,r.prototype=t.prototype,e.prototype=new r,e.prototype.constructor=e;}function o(e,t,r){if(o.isBN(e))return e;this.negative=0,this.words=null,this.length=0,(this.red=null)!==e&&("le"!==t&&"be"!==t||(r=t,t=10),this._init(e||0,t||10,r||"be"));}var a;"object"==typeof t?t.exports=o:r.BN=o,(o.BN=o).wordSize=26;try{a=e("buffer").Buffer;}catch(t){}function s(e,t,r){for(var n=0,i=Math.min(e.length,r),o=t;o<i;o++){var a=e.charCodeAt(o)-48;n<<=4,n|=49<=a&&a<=54?a-49+10:17<=a&&a<=22?a-17+10:15&a;}return n}function u(e,t,r,n){for(var i=0,o=Math.min(e.length,r),a=t;a<o;a++){var s=e.charCodeAt(a)-48;i*=n,i+=49<=s?s-49+10:17<=s?s-17+10:s;}return i}o.isBN=function(e){return e instanceof o||null!==e&&"object"==typeof e&&e.constructor.wordSize===o.wordSize&&Array.isArray(e.words)},o.max=function(e,t){return 0<e.cmp(t)?e:t},o.min=function(e,t){return e.cmp(t)<0?e:t},o.prototype._init=function(e,t,r){if("number"==typeof e)return this._initNumber(e,t,r);if("object"==typeof e)return this._initArray(e,t,r);"hex"===t&&(t=16),n(t===(0|t)&&2<=t&&t<=36);var i=0;"-"===(e=e.toString().replace(/\s+/g,""))[0]&&i++,16===t?this._parseHex(e,i):this._parseBase(e,t,i),"-"===e[0]&&(this.negative=1),this.strip(),"le"===r&&this._initArray(this.toArray(),t,r);},o.prototype._initNumber=function(e,t,r){e<0&&(this.negative=1,e=-e),e<67108864?(this.words=[67108863&e],this.length=1):e<4503599627370496?(this.words=[67108863&e,e/67108864&67108863],this.length=2):(n(e<9007199254740992),this.words=[67108863&e,e/67108864&67108863,1],this.length=3),"le"===r&&this._initArray(this.toArray(),t,r);},o.prototype._initArray=function(e,t,r){if(n("number"==typeof e.length),e.length<=0)return this.words=[0],this.length=1,this;this.length=Math.ceil(e.length/3),this.words=new Array(this.length);for(var i=0;i<this.length;i++)this.words[i]=0;var o,a,s=0;if("be"===r)for(i=e.length-1,o=0;0<=i;i-=3)a=e[i]|e[i-1]<<8|e[i-2]<<16,this.words[o]|=a<<s&67108863,this.words[o+1]=a>>>26-s&67108863,26<=(s+=24)&&(s-=26,o++);else if("le"===r)for(o=i=0;i<e.length;i+=3)a=e[i]|e[i+1]<<8|e[i+2]<<16,this.words[o]|=a<<s&67108863,this.words[o+1]=a>>>26-s&67108863,26<=(s+=24)&&(s-=26,o++);return this.strip()},o.prototype._parseHex=function(e,t){this.length=Math.ceil((e.length-t)/6),this.words=new Array(this.length);for(var r=0;r<this.length;r++)this.words[r]=0;var n,i,o=0;for(r=e.length-6,n=0;t<=r;r-=6)i=s(e,r,r+6),this.words[n]|=i<<o&67108863,this.words[n+1]|=i>>>26-o&4194303,26<=(o+=24)&&(o-=26,n++);r+6!==t&&(i=s(e,t,r+6),this.words[n]|=i<<o&67108863,this.words[n+1]|=i>>>26-o&4194303),this.strip();},o.prototype._parseBase=function(e,t,r){this.words=[0];for(var n=0,i=this.length=1;i<=67108863;i*=t)n++;n--,i=i/t|0;for(var o=e.length-r,a=o%n,s=Math.min(o,o-a)+r,c=0,l=r;l<s;l+=n)c=u(e,l,l+n,t),this.imuln(i),this.words[0]+c<67108864?this.words[0]+=c:this._iaddn(c);if(0!=a){var f=1;for(c=u(e,l,e.length,t),l=0;l<a;l++)f*=t;this.imuln(f),this.words[0]+c<67108864?this.words[0]+=c:this._iaddn(c);}},o.prototype.copy=function(e){e.words=new Array(this.length);for(var t=0;t<this.length;t++)e.words[t]=this.words[t];e.length=this.length,e.negative=this.negative,e.red=this.red;},o.prototype.clone=function(){var e=new o(null);return this.copy(e),e},o.prototype._expand=function(e){for(;this.length<e;)this.words[this.length++]=0;return this},o.prototype.strip=function(){for(;1<this.length&&0===this.words[this.length-1];)this.length--;return this._normSign()},o.prototype._normSign=function(){return 1===this.length&&0===this.words[0]&&(this.negative=0),this},o.prototype.inspect=function(){return (this.red?"<BN-R: ":"<BN: ")+this.toString(16)+">"};var c=["","0","00","000","0000","00000","000000","0000000","00000000","000000000","0000000000","00000000000","000000000000","0000000000000","00000000000000","000000000000000","0000000000000000","00000000000000000","000000000000000000","0000000000000000000","00000000000000000000","000000000000000000000","0000000000000000000000","00000000000000000000000","000000000000000000000000","0000000000000000000000000"],l=[0,0,25,16,12,11,10,9,8,8,7,7,7,7,6,6,6,6,6,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],f=[0,0,33554432,43046721,16777216,48828125,60466176,40353607,16777216,43046721,1e7,19487171,35831808,62748517,7529536,11390625,16777216,24137569,34012224,47045881,64e6,4084101,5153632,6436343,7962624,9765625,11881376,14348907,17210368,20511149,243e5,28629151,33554432,39135393,45435424,52521875,60466176];function h(e,t,r){r.negative=t.negative^e.negative;var n=e.length+t.length|0;n=(r.length=n)-1|0;var i=0|e.words[0],o=0|t.words[0],a=i*o,s=67108863&a,u=a/67108864|0;r.words[0]=s;for(var c=1;c<n;c++){for(var l=u>>>26,f=67108863&u,h=Math.min(c,t.length-1),d=Math.max(0,c-e.length+1);d<=h;d++){var p=c-d|0;l+=(a=(i=0|e.words[p])*(o=0|t.words[d])+f)/67108864|0,f=67108863&a;}r.words[c]=0|f,u=0|l;}return 0!==u?r.words[c]=0|u:r.length--,r.strip()}o.prototype.toString=function(e,t){var r;if(t=0|t||1,16===(e=e||10)||"hex"===e){r="";for(var i=0,o=0,a=0;a<this.length;a++){var s=this.words[a],u=(16777215&(s<<i|o)).toString(16);r=0!=(o=s>>>24-i&16777215)||a!==this.length-1?c[6-u.length]+u+r:u+r,26<=(i+=2)&&(i-=26,a--);}for(0!==o&&(r=o.toString(16)+r);r.length%t!=0;)r="0"+r;return 0!==this.negative&&(r="-"+r),r}if(e===(0|e)&&2<=e&&e<=36){var h=l[e],d=f[e];r="";var p=this.clone();for(p.negative=0;!p.isZero();){var v=p.modn(d).toString(e);r=(p=p.idivn(d)).isZero()?v+r:c[h-v.length]+v+r;}for(this.isZero()&&(r="0"+r);r.length%t!=0;)r="0"+r;return 0!==this.negative&&(r="-"+r),r}n(!1,"Base should be between 2 and 36");},o.prototype.toNumber=function(){var e=this.words[0];return 2===this.length?e+=67108864*this.words[1]:3===this.length&&1===this.words[2]?e+=4503599627370496+67108864*this.words[1]:2<this.length&&n(!1,"Number can only safely store up to 53 bits"),0!==this.negative?-e:e},o.prototype.toJSON=function(){return this.toString(16)},o.prototype.toBuffer=function(e,t){return n(void 0!==a),this.toArrayLike(a,e,t)},o.prototype.toArray=function(e,t){return this.toArrayLike(Array,e,t)},o.prototype.toArrayLike=function(e,t,r){var i=this.byteLength(),o=r||Math.max(1,i);n(i<=o,"byte array longer than desired length"),n(0<o,"Requested array length <= 0"),this.strip();var a,s,u="le"===t,c=new e(o),l=this.clone();if(u){for(s=0;!l.isZero();s++)a=l.andln(255),l.iushrn(8),c[s]=a;for(;s<o;s++)c[s]=0;}else{for(s=0;s<o-i;s++)c[s]=0;for(s=0;!l.isZero();s++)a=l.andln(255),l.iushrn(8),c[o-s-1]=a;}return c},o.prototype._countBits=Math.clz32?function(e){return 32-Math.clz32(e)}:function(e){var t=e,r=0;return 4096<=t&&(r+=13,t>>>=13),64<=t&&(r+=7,t>>>=7),8<=t&&(r+=4,t>>>=4),2<=t&&(r+=2,t>>>=2),r+t},o.prototype._zeroBits=function(e){if(0===e)return 26;var t=e,r=0;return 0==(8191&t)&&(r+=13,t>>>=13),0==(127&t)&&(r+=7,t>>>=7),0==(15&t)&&(r+=4,t>>>=4),0==(3&t)&&(r+=2,t>>>=2),0==(1&t)&&r++,r},o.prototype.bitLength=function(){var e=this.words[this.length-1],t=this._countBits(e);return 26*(this.length-1)+t},o.prototype.zeroBits=function(){if(this.isZero())return 0;for(var e=0,t=0;t<this.length;t++){var r=this._zeroBits(this.words[t]);if(e+=r,26!==r)break}return e},o.prototype.byteLength=function(){return Math.ceil(this.bitLength()/8)},o.prototype.toTwos=function(e){return 0!==this.negative?this.abs().inotn(e).iaddn(1):this.clone()},o.prototype.fromTwos=function(e){return this.testn(e-1)?this.notn(e).iaddn(1).ineg():this.clone()},o.prototype.isNeg=function(){return 0!==this.negative},o.prototype.neg=function(){return this.clone().ineg()},o.prototype.ineg=function(){return this.isZero()||(this.negative^=1),this},o.prototype.iuor=function(e){for(;this.length<e.length;)this.words[this.length++]=0;for(var t=0;t<e.length;t++)this.words[t]=this.words[t]|e.words[t];return this.strip()},o.prototype.ior=function(e){return n(0==(this.negative|e.negative)),this.iuor(e)},o.prototype.or=function(e){return this.length>e.length?this.clone().ior(e):e.clone().ior(this)},o.prototype.uor=function(e){return this.length>e.length?this.clone().iuor(e):e.clone().iuor(this)},o.prototype.iuand=function(e){var t;t=this.length>e.length?e:this;for(var r=0;r<t.length;r++)this.words[r]=this.words[r]&e.words[r];return this.length=t.length,this.strip()},o.prototype.iand=function(e){return n(0==(this.negative|e.negative)),this.iuand(e)},o.prototype.and=function(e){return this.length>e.length?this.clone().iand(e):e.clone().iand(this)},o.prototype.uand=function(e){return this.length>e.length?this.clone().iuand(e):e.clone().iuand(this)},o.prototype.iuxor=function(e){var t,r;r=this.length>e.length?(t=this,e):(t=e,this);for(var n=0;n<r.length;n++)this.words[n]=t.words[n]^r.words[n];if(this!==t)for(;n<t.length;n++)this.words[n]=t.words[n];return this.length=t.length,this.strip()},o.prototype.ixor=function(e){return n(0==(this.negative|e.negative)),this.iuxor(e)},o.prototype.xor=function(e){return this.length>e.length?this.clone().ixor(e):e.clone().ixor(this)},o.prototype.uxor=function(e){return this.length>e.length?this.clone().iuxor(e):e.clone().iuxor(this)},o.prototype.inotn=function(e){n("number"==typeof e&&0<=e);var t=0|Math.ceil(e/26),r=e%26;this._expand(t),0<r&&t--;for(var i=0;i<t;i++)this.words[i]=67108863&~this.words[i];return 0<r&&(this.words[i]=~this.words[i]&67108863>>26-r),this.strip()},o.prototype.notn=function(e){return this.clone().inotn(e)},o.prototype.setn=function(e,t){n("number"==typeof e&&0<=e);var r=e/26|0,i=e%26;return this._expand(1+r),this.words[r]=t?this.words[r]|1<<i:this.words[r]&~(1<<i),this.strip()},o.prototype.iadd=function(e){var t,r,n;if(0!==this.negative&&0===e.negative)return this.negative=0,t=this.isub(e),this.negative^=1,this._normSign();if(0===this.negative&&0!==e.negative)return e.negative=0,t=this.isub(e),e.negative=1,t._normSign();n=this.length>e.length?(r=this,e):(r=e,this);for(var i=0,o=0;o<n.length;o++)t=(0|r.words[o])+(0|n.words[o])+i,this.words[o]=67108863&t,i=t>>>26;for(;0!==i&&o<r.length;o++)t=(0|r.words[o])+i,this.words[o]=67108863&t,i=t>>>26;if(this.length=r.length,0!==i)this.words[this.length]=i,this.length++;else if(r!==this)for(;o<r.length;o++)this.words[o]=r.words[o];return this},o.prototype.add=function(e){var t;return 0!==e.negative&&0===this.negative?(e.negative=0,t=this.sub(e),e.negative^=1,t):0===e.negative&&0!==this.negative?(this.negative=0,t=e.sub(this),this.negative=1,t):this.length>e.length?this.clone().iadd(e):e.clone().iadd(this)},o.prototype.isub=function(e){if(0!==e.negative){e.negative=0;var t=this.iadd(e);return e.negative=1,t._normSign()}if(0!==this.negative)return this.negative=0,this.iadd(e),this.negative=1,this._normSign();var r,n,i=this.cmp(e);if(0===i)return this.negative=0,this.length=1,this.words[0]=0,this;n=0<i?(r=this,e):(r=e,this);for(var o=0,a=0;a<n.length;a++)o=(t=(0|r.words[a])-(0|n.words[a])+o)>>26,this.words[a]=67108863&t;for(;0!==o&&a<r.length;a++)o=(t=(0|r.words[a])+o)>>26,this.words[a]=67108863&t;if(0===o&&a<r.length&&r!==this)for(;a<r.length;a++)this.words[a]=r.words[a];return this.length=Math.max(this.length,a),r!==this&&(this.negative=1),this.strip()},o.prototype.sub=function(e){return this.clone().isub(e)};var d=function(e,t,r){var n,i,o,a=e.words,s=t.words,u=r.words,c=0,l=0|a[0],f=8191&l,h=l>>>13,d=0|a[1],p=8191&d,v=d>>>13,m=0|a[2],y=8191&m,g=m>>>13,b=0|a[3],w=8191&b,E=b>>>13,_=0|a[4],S=8191&_,A=_>>>13,T=0|a[5],N=8191&T,x=T>>>13,M=0|a[6],I=8191&M,O=M>>>13,R=0|a[7],P=8191&R,k=R>>>13,C=0|a[8],L=8191&C,D=C>>>13,U=0|a[9],B=8191&U,F=U>>>13,j=0|s[0],G=8191&j,V=j>>>13,z=0|s[1],H=8191&z,q=z>>>13,W=0|s[2],Q=8191&W,K=W>>>13,J=0|s[3],Z=8191&J,X=J>>>13,$=0|s[4],Y=8191&$,ee=$>>>13,te=0|s[5],re=8191&te,ne=te>>>13,ie=0|s[6],oe=8191&ie,ae=ie>>>13,se=0|s[7],ue=8191&se,ce=se>>>13,le=0|s[8],fe=8191&le,he=le>>>13,de=0|s[9],pe=8191&de,ve=de>>>13;r.negative=e.negative^t.negative,r.length=19;var me=(c+(n=Math.imul(f,G))|0)+((8191&(i=(i=Math.imul(f,V))+Math.imul(h,G)|0))<<13)|0;c=((o=Math.imul(h,V))+(i>>>13)|0)+(me>>>26)|0,me&=67108863,n=Math.imul(p,G),i=(i=Math.imul(p,V))+Math.imul(v,G)|0,o=Math.imul(v,V);var ye=(c+(n=n+Math.imul(f,H)|0)|0)+((8191&(i=(i=i+Math.imul(f,q)|0)+Math.imul(h,H)|0))<<13)|0;c=((o=o+Math.imul(h,q)|0)+(i>>>13)|0)+(ye>>>26)|0,ye&=67108863,n=Math.imul(y,G),i=(i=Math.imul(y,V))+Math.imul(g,G)|0,o=Math.imul(g,V),n=n+Math.imul(p,H)|0,i=(i=i+Math.imul(p,q)|0)+Math.imul(v,H)|0,o=o+Math.imul(v,q)|0;var ge=(c+(n=n+Math.imul(f,Q)|0)|0)+((8191&(i=(i=i+Math.imul(f,K)|0)+Math.imul(h,Q)|0))<<13)|0;c=((o=o+Math.imul(h,K)|0)+(i>>>13)|0)+(ge>>>26)|0,ge&=67108863,n=Math.imul(w,G),i=(i=Math.imul(w,V))+Math.imul(E,G)|0,o=Math.imul(E,V),n=n+Math.imul(y,H)|0,i=(i=i+Math.imul(y,q)|0)+Math.imul(g,H)|0,o=o+Math.imul(g,q)|0,n=n+Math.imul(p,Q)|0,i=(i=i+Math.imul(p,K)|0)+Math.imul(v,Q)|0,o=o+Math.imul(v,K)|0;var be=(c+(n=n+Math.imul(f,Z)|0)|0)+((8191&(i=(i=i+Math.imul(f,X)|0)+Math.imul(h,Z)|0))<<13)|0;c=((o=o+Math.imul(h,X)|0)+(i>>>13)|0)+(be>>>26)|0,be&=67108863,n=Math.imul(S,G),i=(i=Math.imul(S,V))+Math.imul(A,G)|0,o=Math.imul(A,V),n=n+Math.imul(w,H)|0,i=(i=i+Math.imul(w,q)|0)+Math.imul(E,H)|0,o=o+Math.imul(E,q)|0,n=n+Math.imul(y,Q)|0,i=(i=i+Math.imul(y,K)|0)+Math.imul(g,Q)|0,o=o+Math.imul(g,K)|0,n=n+Math.imul(p,Z)|0,i=(i=i+Math.imul(p,X)|0)+Math.imul(v,Z)|0,o=o+Math.imul(v,X)|0;var we=(c+(n=n+Math.imul(f,Y)|0)|0)+((8191&(i=(i=i+Math.imul(f,ee)|0)+Math.imul(h,Y)|0))<<13)|0;c=((o=o+Math.imul(h,ee)|0)+(i>>>13)|0)+(we>>>26)|0,we&=67108863,n=Math.imul(N,G),i=(i=Math.imul(N,V))+Math.imul(x,G)|0,o=Math.imul(x,V),n=n+Math.imul(S,H)|0,i=(i=i+Math.imul(S,q)|0)+Math.imul(A,H)|0,o=o+Math.imul(A,q)|0,n=n+Math.imul(w,Q)|0,i=(i=i+Math.imul(w,K)|0)+Math.imul(E,Q)|0,o=o+Math.imul(E,K)|0,n=n+Math.imul(y,Z)|0,i=(i=i+Math.imul(y,X)|0)+Math.imul(g,Z)|0,o=o+Math.imul(g,X)|0,n=n+Math.imul(p,Y)|0,i=(i=i+Math.imul(p,ee)|0)+Math.imul(v,Y)|0,o=o+Math.imul(v,ee)|0;var Ee=(c+(n=n+Math.imul(f,re)|0)|0)+((8191&(i=(i=i+Math.imul(f,ne)|0)+Math.imul(h,re)|0))<<13)|0;c=((o=o+Math.imul(h,ne)|0)+(i>>>13)|0)+(Ee>>>26)|0,Ee&=67108863,n=Math.imul(I,G),i=(i=Math.imul(I,V))+Math.imul(O,G)|0,o=Math.imul(O,V),n=n+Math.imul(N,H)|0,i=(i=i+Math.imul(N,q)|0)+Math.imul(x,H)|0,o=o+Math.imul(x,q)|0,n=n+Math.imul(S,Q)|0,i=(i=i+Math.imul(S,K)|0)+Math.imul(A,Q)|0,o=o+Math.imul(A,K)|0,n=n+Math.imul(w,Z)|0,i=(i=i+Math.imul(w,X)|0)+Math.imul(E,Z)|0,o=o+Math.imul(E,X)|0,n=n+Math.imul(y,Y)|0,i=(i=i+Math.imul(y,ee)|0)+Math.imul(g,Y)|0,o=o+Math.imul(g,ee)|0,n=n+Math.imul(p,re)|0,i=(i=i+Math.imul(p,ne)|0)+Math.imul(v,re)|0,o=o+Math.imul(v,ne)|0;var _e=(c+(n=n+Math.imul(f,oe)|0)|0)+((8191&(i=(i=i+Math.imul(f,ae)|0)+Math.imul(h,oe)|0))<<13)|0;c=((o=o+Math.imul(h,ae)|0)+(i>>>13)|0)+(_e>>>26)|0,_e&=67108863,n=Math.imul(P,G),i=(i=Math.imul(P,V))+Math.imul(k,G)|0,o=Math.imul(k,V),n=n+Math.imul(I,H)|0,i=(i=i+Math.imul(I,q)|0)+Math.imul(O,H)|0,o=o+Math.imul(O,q)|0,n=n+Math.imul(N,Q)|0,i=(i=i+Math.imul(N,K)|0)+Math.imul(x,Q)|0,o=o+Math.imul(x,K)|0,n=n+Math.imul(S,Z)|0,i=(i=i+Math.imul(S,X)|0)+Math.imul(A,Z)|0,o=o+Math.imul(A,X)|0,n=n+Math.imul(w,Y)|0,i=(i=i+Math.imul(w,ee)|0)+Math.imul(E,Y)|0,o=o+Math.imul(E,ee)|0,n=n+Math.imul(y,re)|0,i=(i=i+Math.imul(y,ne)|0)+Math.imul(g,re)|0,o=o+Math.imul(g,ne)|0,n=n+Math.imul(p,oe)|0,i=(i=i+Math.imul(p,ae)|0)+Math.imul(v,oe)|0,o=o+Math.imul(v,ae)|0;var Se=(c+(n=n+Math.imul(f,ue)|0)|0)+((8191&(i=(i=i+Math.imul(f,ce)|0)+Math.imul(h,ue)|0))<<13)|0;c=((o=o+Math.imul(h,ce)|0)+(i>>>13)|0)+(Se>>>26)|0,Se&=67108863,n=Math.imul(L,G),i=(i=Math.imul(L,V))+Math.imul(D,G)|0,o=Math.imul(D,V),n=n+Math.imul(P,H)|0,i=(i=i+Math.imul(P,q)|0)+Math.imul(k,H)|0,o=o+Math.imul(k,q)|0,n=n+Math.imul(I,Q)|0,i=(i=i+Math.imul(I,K)|0)+Math.imul(O,Q)|0,o=o+Math.imul(O,K)|0,n=n+Math.imul(N,Z)|0,i=(i=i+Math.imul(N,X)|0)+Math.imul(x,Z)|0,o=o+Math.imul(x,X)|0,n=n+Math.imul(S,Y)|0,i=(i=i+Math.imul(S,ee)|0)+Math.imul(A,Y)|0,o=o+Math.imul(A,ee)|0,n=n+Math.imul(w,re)|0,i=(i=i+Math.imul(w,ne)|0)+Math.imul(E,re)|0,o=o+Math.imul(E,ne)|0,n=n+Math.imul(y,oe)|0,i=(i=i+Math.imul(y,ae)|0)+Math.imul(g,oe)|0,o=o+Math.imul(g,ae)|0,n=n+Math.imul(p,ue)|0,i=(i=i+Math.imul(p,ce)|0)+Math.imul(v,ue)|0,o=o+Math.imul(v,ce)|0;var Ae=(c+(n=n+Math.imul(f,fe)|0)|0)+((8191&(i=(i=i+Math.imul(f,he)|0)+Math.imul(h,fe)|0))<<13)|0;c=((o=o+Math.imul(h,he)|0)+(i>>>13)|0)+(Ae>>>26)|0,Ae&=67108863,n=Math.imul(B,G),i=(i=Math.imul(B,V))+Math.imul(F,G)|0,o=Math.imul(F,V),n=n+Math.imul(L,H)|0,i=(i=i+Math.imul(L,q)|0)+Math.imul(D,H)|0,o=o+Math.imul(D,q)|0,n=n+Math.imul(P,Q)|0,i=(i=i+Math.imul(P,K)|0)+Math.imul(k,Q)|0,o=o+Math.imul(k,K)|0,n=n+Math.imul(I,Z)|0,i=(i=i+Math.imul(I,X)|0)+Math.imul(O,Z)|0,o=o+Math.imul(O,X)|0,n=n+Math.imul(N,Y)|0,i=(i=i+Math.imul(N,ee)|0)+Math.imul(x,Y)|0,o=o+Math.imul(x,ee)|0,n=n+Math.imul(S,re)|0,i=(i=i+Math.imul(S,ne)|0)+Math.imul(A,re)|0,o=o+Math.imul(A,ne)|0,n=n+Math.imul(w,oe)|0,i=(i=i+Math.imul(w,ae)|0)+Math.imul(E,oe)|0,o=o+Math.imul(E,ae)|0,n=n+Math.imul(y,ue)|0,i=(i=i+Math.imul(y,ce)|0)+Math.imul(g,ue)|0,o=o+Math.imul(g,ce)|0,n=n+Math.imul(p,fe)|0,i=(i=i+Math.imul(p,he)|0)+Math.imul(v,fe)|0,o=o+Math.imul(v,he)|0;var Te=(c+(n=n+Math.imul(f,pe)|0)|0)+((8191&(i=(i=i+Math.imul(f,ve)|0)+Math.imul(h,pe)|0))<<13)|0;c=((o=o+Math.imul(h,ve)|0)+(i>>>13)|0)+(Te>>>26)|0,Te&=67108863,n=Math.imul(B,H),i=(i=Math.imul(B,q))+Math.imul(F,H)|0,o=Math.imul(F,q),n=n+Math.imul(L,Q)|0,i=(i=i+Math.imul(L,K)|0)+Math.imul(D,Q)|0,o=o+Math.imul(D,K)|0,n=n+Math.imul(P,Z)|0,i=(i=i+Math.imul(P,X)|0)+Math.imul(k,Z)|0,o=o+Math.imul(k,X)|0,n=n+Math.imul(I,Y)|0,i=(i=i+Math.imul(I,ee)|0)+Math.imul(O,Y)|0,o=o+Math.imul(O,ee)|0,n=n+Math.imul(N,re)|0,i=(i=i+Math.imul(N,ne)|0)+Math.imul(x,re)|0,o=o+Math.imul(x,ne)|0,n=n+Math.imul(S,oe)|0,i=(i=i+Math.imul(S,ae)|0)+Math.imul(A,oe)|0,o=o+Math.imul(A,ae)|0,n=n+Math.imul(w,ue)|0,i=(i=i+Math.imul(w,ce)|0)+Math.imul(E,ue)|0,o=o+Math.imul(E,ce)|0,n=n+Math.imul(y,fe)|0,i=(i=i+Math.imul(y,he)|0)+Math.imul(g,fe)|0,o=o+Math.imul(g,he)|0;var Ne=(c+(n=n+Math.imul(p,pe)|0)|0)+((8191&(i=(i=i+Math.imul(p,ve)|0)+Math.imul(v,pe)|0))<<13)|0;c=((o=o+Math.imul(v,ve)|0)+(i>>>13)|0)+(Ne>>>26)|0,Ne&=67108863,n=Math.imul(B,Q),i=(i=Math.imul(B,K))+Math.imul(F,Q)|0,o=Math.imul(F,K),n=n+Math.imul(L,Z)|0,i=(i=i+Math.imul(L,X)|0)+Math.imul(D,Z)|0,o=o+Math.imul(D,X)|0,n=n+Math.imul(P,Y)|0,i=(i=i+Math.imul(P,ee)|0)+Math.imul(k,Y)|0,o=o+Math.imul(k,ee)|0,n=n+Math.imul(I,re)|0,i=(i=i+Math.imul(I,ne)|0)+Math.imul(O,re)|0,o=o+Math.imul(O,ne)|0,n=n+Math.imul(N,oe)|0,i=(i=i+Math.imul(N,ae)|0)+Math.imul(x,oe)|0,o=o+Math.imul(x,ae)|0,n=n+Math.imul(S,ue)|0,i=(i=i+Math.imul(S,ce)|0)+Math.imul(A,ue)|0,o=o+Math.imul(A,ce)|0,n=n+Math.imul(w,fe)|0,i=(i=i+Math.imul(w,he)|0)+Math.imul(E,fe)|0,o=o+Math.imul(E,he)|0;var xe=(c+(n=n+Math.imul(y,pe)|0)|0)+((8191&(i=(i=i+Math.imul(y,ve)|0)+Math.imul(g,pe)|0))<<13)|0;c=((o=o+Math.imul(g,ve)|0)+(i>>>13)|0)+(xe>>>26)|0,xe&=67108863,n=Math.imul(B,Z),i=(i=Math.imul(B,X))+Math.imul(F,Z)|0,o=Math.imul(F,X),n=n+Math.imul(L,Y)|0,i=(i=i+Math.imul(L,ee)|0)+Math.imul(D,Y)|0,o=o+Math.imul(D,ee)|0,n=n+Math.imul(P,re)|0,i=(i=i+Math.imul(P,ne)|0)+Math.imul(k,re)|0,o=o+Math.imul(k,ne)|0,n=n+Math.imul(I,oe)|0,i=(i=i+Math.imul(I,ae)|0)+Math.imul(O,oe)|0,o=o+Math.imul(O,ae)|0,n=n+Math.imul(N,ue)|0,i=(i=i+Math.imul(N,ce)|0)+Math.imul(x,ue)|0,o=o+Math.imul(x,ce)|0,n=n+Math.imul(S,fe)|0,i=(i=i+Math.imul(S,he)|0)+Math.imul(A,fe)|0,o=o+Math.imul(A,he)|0;var Me=(c+(n=n+Math.imul(w,pe)|0)|0)+((8191&(i=(i=i+Math.imul(w,ve)|0)+Math.imul(E,pe)|0))<<13)|0;c=((o=o+Math.imul(E,ve)|0)+(i>>>13)|0)+(Me>>>26)|0,Me&=67108863,n=Math.imul(B,Y),i=(i=Math.imul(B,ee))+Math.imul(F,Y)|0,o=Math.imul(F,ee),n=n+Math.imul(L,re)|0,i=(i=i+Math.imul(L,ne)|0)+Math.imul(D,re)|0,o=o+Math.imul(D,ne)|0,n=n+Math.imul(P,oe)|0,i=(i=i+Math.imul(P,ae)|0)+Math.imul(k,oe)|0,o=o+Math.imul(k,ae)|0,n=n+Math.imul(I,ue)|0,i=(i=i+Math.imul(I,ce)|0)+Math.imul(O,ue)|0,o=o+Math.imul(O,ce)|0,n=n+Math.imul(N,fe)|0,i=(i=i+Math.imul(N,he)|0)+Math.imul(x,fe)|0,o=o+Math.imul(x,he)|0;var Ie=(c+(n=n+Math.imul(S,pe)|0)|0)+((8191&(i=(i=i+Math.imul(S,ve)|0)+Math.imul(A,pe)|0))<<13)|0;c=((o=o+Math.imul(A,ve)|0)+(i>>>13)|0)+(Ie>>>26)|0,Ie&=67108863,n=Math.imul(B,re),i=(i=Math.imul(B,ne))+Math.imul(F,re)|0,o=Math.imul(F,ne),n=n+Math.imul(L,oe)|0,i=(i=i+Math.imul(L,ae)|0)+Math.imul(D,oe)|0,o=o+Math.imul(D,ae)|0,n=n+Math.imul(P,ue)|0,i=(i=i+Math.imul(P,ce)|0)+Math.imul(k,ue)|0,o=o+Math.imul(k,ce)|0,n=n+Math.imul(I,fe)|0,i=(i=i+Math.imul(I,he)|0)+Math.imul(O,fe)|0,o=o+Math.imul(O,he)|0;var Oe=(c+(n=n+Math.imul(N,pe)|0)|0)+((8191&(i=(i=i+Math.imul(N,ve)|0)+Math.imul(x,pe)|0))<<13)|0;c=((o=o+Math.imul(x,ve)|0)+(i>>>13)|0)+(Oe>>>26)|0,Oe&=67108863,n=Math.imul(B,oe),i=(i=Math.imul(B,ae))+Math.imul(F,oe)|0,o=Math.imul(F,ae),n=n+Math.imul(L,ue)|0,i=(i=i+Math.imul(L,ce)|0)+Math.imul(D,ue)|0,o=o+Math.imul(D,ce)|0,n=n+Math.imul(P,fe)|0,i=(i=i+Math.imul(P,he)|0)+Math.imul(k,fe)|0,o=o+Math.imul(k,he)|0;var Re=(c+(n=n+Math.imul(I,pe)|0)|0)+((8191&(i=(i=i+Math.imul(I,ve)|0)+Math.imul(O,pe)|0))<<13)|0;c=((o=o+Math.imul(O,ve)|0)+(i>>>13)|0)+(Re>>>26)|0,Re&=67108863,n=Math.imul(B,ue),i=(i=Math.imul(B,ce))+Math.imul(F,ue)|0,o=Math.imul(F,ce),n=n+Math.imul(L,fe)|0,i=(i=i+Math.imul(L,he)|0)+Math.imul(D,fe)|0,o=o+Math.imul(D,he)|0;var Pe=(c+(n=n+Math.imul(P,pe)|0)|0)+((8191&(i=(i=i+Math.imul(P,ve)|0)+Math.imul(k,pe)|0))<<13)|0;c=((o=o+Math.imul(k,ve)|0)+(i>>>13)|0)+(Pe>>>26)|0,Pe&=67108863,n=Math.imul(B,fe),i=(i=Math.imul(B,he))+Math.imul(F,fe)|0,o=Math.imul(F,he);var ke=(c+(n=n+Math.imul(L,pe)|0)|0)+((8191&(i=(i=i+Math.imul(L,ve)|0)+Math.imul(D,pe)|0))<<13)|0;c=((o=o+Math.imul(D,ve)|0)+(i>>>13)|0)+(ke>>>26)|0,ke&=67108863;var Ce=(c+(n=Math.imul(B,pe))|0)+((8191&(i=(i=Math.imul(B,ve))+Math.imul(F,pe)|0))<<13)|0;return c=((o=Math.imul(F,ve))+(i>>>13)|0)+(Ce>>>26)|0,Ce&=67108863,u[0]=me,u[1]=ye,u[2]=ge,u[3]=be,u[4]=we,u[5]=Ee,u[6]=_e,u[7]=Se,u[8]=Ae,u[9]=Te,u[10]=Ne,u[11]=xe,u[12]=Me,u[13]=Ie,u[14]=Oe,u[15]=Re,u[16]=Pe,u[17]=ke,u[18]=Ce,0!==c&&(u[19]=c,r.length++),r};function p(e,t,r){return (new v).mulp(e,t,r)}function v(e,t){this.x=e,this.y=t;}Math.imul||(d=h),o.prototype.mulTo=function(e,t){var r=this.length+e.length;return 10===this.length&&10===e.length?d(this,e,t):r<63?h(this,e,t):r<1024?function(e,t,r){r.negative=t.negative^e.negative,r.length=e.length+t.length;for(var n=0,i=0,o=0;o<r.length-1;o++){var a=i;i=0;for(var s=67108863&n,u=Math.min(o,t.length-1),c=Math.max(0,o-e.length+1);c<=u;c++){var l=o-c,f=(0|e.words[l])*(0|t.words[c]),h=67108863&f;s=67108863&(h=h+s|0),i+=(a=(a=a+(f/67108864|0)|0)+(h>>>26)|0)>>>26,a&=67108863;}r.words[o]=s,n=a,a=i;}return 0!==n?r.words[o]=n:r.length--,r.strip()}(this,e,t):p(this,e,t)},v.prototype.makeRBT=function(e){for(var t=new Array(e),r=o.prototype._countBits(e)-1,n=0;n<e;n++)t[n]=this.revBin(n,r,e);return t},v.prototype.revBin=function(e,t,r){if(0===e||e===r-1)return e;for(var n=0,i=0;i<t;i++)n|=(1&e)<<t-i-1,e>>=1;return n},v.prototype.permute=function(e,t,r,n,i,o){for(var a=0;a<o;a++)n[a]=t[e[a]],i[a]=r[e[a]];},v.prototype.transform=function(e,t,r,n,i,o){this.permute(o,e,t,r,n,i);for(var a=1;a<i;a<<=1)for(var s=a<<1,u=Math.cos(2*Math.PI/s),c=Math.sin(2*Math.PI/s),l=0;l<i;l+=s)for(var f=u,h=c,d=0;d<a;d++){var p=r[l+d],v=n[l+d],m=r[l+d+a],y=n[l+d+a],g=f*m-h*y;y=f*y+h*m,m=g,r[l+d]=p+m,n[l+d]=v+y,r[l+d+a]=p-m,n[l+d+a]=v-y,d!==s&&(g=u*f-c*h,h=u*h+c*f,f=g);}},v.prototype.guessLen13b=function(e,t){var r=1|Math.max(t,e),n=1&r,i=0;for(r=r/2|0;r;r>>>=1)i++;return 1<<i+1+n},v.prototype.conjugate=function(e,t,r){if(!(r<=1))for(var n=0;n<r/2;n++){var i=e[n];e[n]=e[r-n-1],e[r-n-1]=i,i=t[n],t[n]=-t[r-n-1],t[r-n-1]=-i;}},v.prototype.normalize13b=function(e,t){for(var r=0,n=0;n<t/2;n++){var i=8192*Math.round(e[2*n+1]/t)+Math.round(e[2*n]/t)+r;e[n]=67108863&i,r=i<67108864?0:i/67108864|0;}return e},v.prototype.convert13b=function(e,t,r,i){for(var o=0,a=0;a<t;a++)o+=0|e[a],r[2*a]=8191&o,o>>>=13,r[2*a+1]=8191&o,o>>>=13;for(a=2*t;a<i;++a)r[a]=0;n(0===o),n(0==(-8192&o));},v.prototype.stub=function(e){for(var t=new Array(e),r=0;r<e;r++)t[r]=0;return t},v.prototype.mulp=function(e,t,r){var n=2*this.guessLen13b(e.length,t.length),i=this.makeRBT(n),o=this.stub(n),a=new Array(n),s=new Array(n),u=new Array(n),c=new Array(n),l=new Array(n),f=new Array(n),h=r.words;h.length=n,this.convert13b(e.words,e.length,a,n),this.convert13b(t.words,t.length,c,n),this.transform(a,o,s,u,n,i),this.transform(c,o,l,f,n,i);for(var d=0;d<n;d++){var p=s[d]*l[d]-u[d]*f[d];u[d]=s[d]*f[d]+u[d]*l[d],s[d]=p;}return this.conjugate(s,u,n),this.transform(s,u,h,o,n,i),this.conjugate(h,o,n),this.normalize13b(h,n),r.negative=e.negative^t.negative,r.length=e.length+t.length,r.strip()},o.prototype.mul=function(e){var t=new o(null);return t.words=new Array(this.length+e.length),this.mulTo(e,t)},o.prototype.mulf=function(e){var t=new o(null);return t.words=new Array(this.length+e.length),p(this,e,t)},o.prototype.imul=function(e){return this.clone().mulTo(e,this)},o.prototype.imuln=function(e){n("number"==typeof e),n(e<67108864);for(var t=0,r=0;r<this.length;r++){var i=(0|this.words[r])*e,o=(67108863&i)+(67108863&t);t>>=26,t+=i/67108864|0,t+=o>>>26,this.words[r]=67108863&o;}return 0!==t&&(this.words[r]=t,this.length++),this},o.prototype.muln=function(e){return this.clone().imuln(e)},o.prototype.sqr=function(){return this.mul(this)},o.prototype.isqr=function(){return this.imul(this.clone())},o.prototype.pow=function(e){var t=function(e){for(var t=new Array(e.bitLength()),r=0;r<t.length;r++){var n=r/26|0,i=r%26;t[r]=(e.words[n]&1<<i)>>>i;}return t}(e);if(0===t.length)return new o(1);for(var r=this,n=0;n<t.length&&0===t[n];n++,r=r.sqr());if(++n<t.length)for(var i=r.sqr();n<t.length;n++,i=i.sqr())0!==t[n]&&(r=r.mul(i));return r},o.prototype.iushln=function(e){n("number"==typeof e&&0<=e);var t,r=e%26,i=(e-r)/26,o=67108863>>>26-r<<26-r;if(0!=r){var a=0;for(t=0;t<this.length;t++){var s=this.words[t]&o,u=(0|this.words[t])-s<<r;this.words[t]=u|a,a=s>>>26-r;}a&&(this.words[t]=a,this.length++);}if(0!=i){for(t=this.length-1;0<=t;t--)this.words[t+i]=this.words[t];for(t=0;t<i;t++)this.words[t]=0;this.length+=i;}return this.strip()},o.prototype.ishln=function(e){return n(0===this.negative),this.iushln(e)},o.prototype.iushrn=function(e,t,r){var i;n("number"==typeof e&&0<=e),i=t?(t-t%26)/26:0;var o=e%26,a=Math.min((e-o)/26,this.length),s=67108863^67108863>>>o<<o,u=r;if(i-=a,i=Math.max(0,i),u){for(var c=0;c<a;c++)u.words[c]=this.words[c];u.length=a;}if(0===a);else if(this.length>a)for(this.length-=a,c=0;c<this.length;c++)this.words[c]=this.words[c+a];else this.words[0]=0,this.length=1;var l=0;for(c=this.length-1;0<=c&&(0!==l||i<=c);c--){var f=0|this.words[c];this.words[c]=l<<26-o|f>>>o,l=f&s;}return u&&0!==l&&(u.words[u.length++]=l),0===this.length&&(this.words[0]=0,this.length=1),this.strip()},o.prototype.ishrn=function(e,t,r){return n(0===this.negative),this.iushrn(e,t,r)},o.prototype.shln=function(e){return this.clone().ishln(e)},o.prototype.ushln=function(e){return this.clone().iushln(e)},o.prototype.shrn=function(e){return this.clone().ishrn(e)},o.prototype.ushrn=function(e){return this.clone().iushrn(e)},o.prototype.testn=function(e){n("number"==typeof e&&0<=e);var t=e%26,r=(e-t)/26,i=1<<t;return !(this.length<=r||!(this.words[r]&i))},o.prototype.imaskn=function(e){n("number"==typeof e&&0<=e);var t=e%26,r=(e-t)/26;if(n(0===this.negative,"imaskn works only with positive numbers"),this.length<=r)return this;if(0!=t&&r++,this.length=Math.min(r,this.length),0!=t){var i=67108863^67108863>>>t<<t;this.words[this.length-1]&=i;}return this.strip()},o.prototype.maskn=function(e){return this.clone().imaskn(e)},o.prototype.iaddn=function(e){return n("number"==typeof e),n(e<67108864),e<0?this.isubn(-e):0!==this.negative?(1===this.length&&(0|this.words[0])<e?(this.words[0]=e-(0|this.words[0]),this.negative=0):(this.negative=0,this.isubn(e),this.negative=1),this):this._iaddn(e)},o.prototype._iaddn=function(e){this.words[0]+=e;for(var t=0;t<this.length&&67108864<=this.words[t];t++)this.words[t]-=67108864,t===this.length-1?this.words[t+1]=1:this.words[t+1]++;return this.length=Math.max(this.length,t+1),this},o.prototype.isubn=function(e){if(n("number"==typeof e),n(e<67108864),e<0)return this.iaddn(-e);if(0!==this.negative)return this.negative=0,this.iaddn(e),this.negative=1,this;if(this.words[0]-=e,1===this.length&&this.words[0]<0)this.words[0]=-this.words[0],this.negative=1;else for(var t=0;t<this.length&&this.words[t]<0;t++)this.words[t]+=67108864,this.words[t+1]-=1;return this.strip()},o.prototype.addn=function(e){return this.clone().iaddn(e)},o.prototype.subn=function(e){return this.clone().isubn(e)},o.prototype.iabs=function(){return this.negative=0,this},o.prototype.abs=function(){return this.clone().iabs()},o.prototype._ishlnsubmul=function(e,t,r){var i,o,a=e.length+r;this._expand(a);var s=0;for(i=0;i<e.length;i++){o=(0|this.words[i+r])+s;var u=(0|e.words[i])*t;s=((o-=67108863&u)>>26)-(u/67108864|0),this.words[i+r]=67108863&o;}for(;i<this.length-r;i++)s=(o=(0|this.words[i+r])+s)>>26,this.words[i+r]=67108863&o;if(0===s)return this.strip();for(n(-1===s),i=s=0;i<this.length;i++)s=(o=-(0|this.words[i])+s)>>26,this.words[i]=67108863&o;return this.negative=1,this.strip()},o.prototype._wordDiv=function(e,t){var r=(this.length,e.length),n=this.clone(),i=e,a=0|i.words[i.length-1];0!=(r=26-this._countBits(a))&&(i=i.ushln(r),n.iushln(r),a=0|i.words[i.length-1]);var s,u=n.length-i.length;if("mod"!==t){(s=new o(null)).length=1+u,s.words=new Array(s.length);for(var c=0;c<s.length;c++)s.words[c]=0;}var l=n.clone()._ishlnsubmul(i,1,u);0===l.negative&&(n=l,s&&(s.words[u]=1));for(var f=u-1;0<=f;f--){var h=67108864*(0|n.words[i.length+f])+(0|n.words[i.length+f-1]);for(h=Math.min(h/a|0,67108863),n._ishlnsubmul(i,h,f);0!==n.negative;)h--,n.negative=0,n._ishlnsubmul(i,1,f),n.isZero()||(n.negative^=1);s&&(s.words[f]=h);}return s&&s.strip(),n.strip(),"div"!==t&&0!=r&&n.iushrn(r),{div:s||null,mod:n}},o.prototype.divmod=function(e,t,r){return n(!e.isZero()),this.isZero()?{div:new o(0),mod:new o(0)}:0!==this.negative&&0===e.negative?(s=this.neg().divmod(e,t),"mod"!==t&&(i=s.div.neg()),"div"!==t&&(a=s.mod.neg(),r&&0!==a.negative&&a.iadd(e)),{div:i,mod:a}):0===this.negative&&0!==e.negative?(s=this.divmod(e.neg(),t),"mod"!==t&&(i=s.div.neg()),{div:i,mod:s.mod}):0!=(this.negative&e.negative)?(s=this.neg().divmod(e.neg(),t),"div"!==t&&(a=s.mod.neg(),r&&0!==a.negative&&a.isub(e)),{div:s.div,mod:a}):e.length>this.length||this.cmp(e)<0?{div:new o(0),mod:this}:1===e.length?"div"===t?{div:this.divn(e.words[0]),mod:null}:"mod"===t?{div:null,mod:new o(this.modn(e.words[0]))}:{div:this.divn(e.words[0]),mod:new o(this.modn(e.words[0]))}:this._wordDiv(e,t);var i,a,s;},o.prototype.div=function(e){return this.divmod(e,"div",!1).div},o.prototype.mod=function(e){return this.divmod(e,"mod",!1).mod},o.prototype.umod=function(e){return this.divmod(e,"mod",!0).mod},o.prototype.divRound=function(e){var t=this.divmod(e);if(t.mod.isZero())return t.div;var r=0!==t.div.negative?t.mod.isub(e):t.mod,n=e.ushrn(1),i=e.andln(1),o=r.cmp(n);return o<0||1===i&&0===o?t.div:0!==t.div.negative?t.div.isubn(1):t.div.iaddn(1)},o.prototype.modn=function(e){n(e<=67108863);for(var t=(1<<26)%e,r=0,i=this.length-1;0<=i;i--)r=(t*r+(0|this.words[i]))%e;return r},o.prototype.idivn=function(e){n(e<=67108863);for(var t=0,r=this.length-1;0<=r;r--){var i=(0|this.words[r])+67108864*t;this.words[r]=i/e|0,t=i%e;}return this.strip()},o.prototype.divn=function(e){return this.clone().idivn(e)},o.prototype.egcd=function(e){n(0===e.negative),n(!e.isZero());var t=this,r=e.clone();t=0!==t.negative?t.umod(e):t.clone();for(var i=new o(1),a=new o(0),s=new o(0),u=new o(1),c=0;t.isEven()&&r.isEven();)t.iushrn(1),r.iushrn(1),++c;for(var l=r.clone(),f=t.clone();!t.isZero();){for(var h=0,d=1;0==(t.words[0]&d)&&h<26;++h,d<<=1);if(0<h)for(t.iushrn(h);0<h--;)(i.isOdd()||a.isOdd())&&(i.iadd(l),a.isub(f)),i.iushrn(1),a.iushrn(1);for(var p=0,v=1;0==(r.words[0]&v)&&p<26;++p,v<<=1);if(0<p)for(r.iushrn(p);0<p--;)(s.isOdd()||u.isOdd())&&(s.iadd(l),u.isub(f)),s.iushrn(1),u.iushrn(1);0<=t.cmp(r)?(t.isub(r),i.isub(s),a.isub(u)):(r.isub(t),s.isub(i),u.isub(a));}return {a:s,b:u,gcd:r.iushln(c)}},o.prototype._invmp=function(e){n(0===e.negative),n(!e.isZero());var t=this,r=e.clone();t=0!==t.negative?t.umod(e):t.clone();for(var i,a=new o(1),s=new o(0),u=r.clone();0<t.cmpn(1)&&0<r.cmpn(1);){for(var c=0,l=1;0==(t.words[0]&l)&&c<26;++c,l<<=1);if(0<c)for(t.iushrn(c);0<c--;)a.isOdd()&&a.iadd(u),a.iushrn(1);for(var f=0,h=1;0==(r.words[0]&h)&&f<26;++f,h<<=1);if(0<f)for(r.iushrn(f);0<f--;)s.isOdd()&&s.iadd(u),s.iushrn(1);0<=t.cmp(r)?(t.isub(r),a.isub(s)):(r.isub(t),s.isub(a));}return (i=0===t.cmpn(1)?a:s).cmpn(0)<0&&i.iadd(e),i},o.prototype.gcd=function(e){if(this.isZero())return e.abs();if(e.isZero())return this.abs();var t=this.clone(),r=e.clone();t.negative=0;for(var n=r.negative=0;t.isEven()&&r.isEven();n++)t.iushrn(1),r.iushrn(1);for(;;){for(;t.isEven();)t.iushrn(1);for(;r.isEven();)r.iushrn(1);var i=t.cmp(r);if(i<0){var o=t;t=r,r=o;}else if(0===i||0===r.cmpn(1))break;t.isub(r);}return r.iushln(n)},o.prototype.invm=function(e){return this.egcd(e).a.umod(e)},o.prototype.isEven=function(){return 0==(1&this.words[0])},o.prototype.isOdd=function(){return 1==(1&this.words[0])},o.prototype.andln=function(e){return this.words[0]&e},o.prototype.bincn=function(e){n("number"==typeof e);var t=e%26,r=(e-t)/26,i=1<<t;if(this.length<=r)return this._expand(1+r),this.words[r]|=i,this;for(var o=i,a=r;0!==o&&a<this.length;a++){var s=0|this.words[a];o=(s+=o)>>>26,s&=67108863,this.words[a]=s;}return 0!==o&&(this.words[a]=o,this.length++),this},o.prototype.isZero=function(){return 1===this.length&&0===this.words[0]},o.prototype.cmpn=function(e){var t,r=e<0;if(0!==this.negative&&!r)return -1;if(0===this.negative&&r)return 1;if(this.strip(),1<this.length)t=1;else{r&&(e=-e),n(e<=67108863,"Number is too big");var i=0|this.words[0];t=i===e?0:i<e?-1:1;}return 0!==this.negative?0|-t:t},o.prototype.cmp=function(e){if(0!==this.negative&&0===e.negative)return -1;if(0===this.negative&&0!==e.negative)return 1;var t=this.ucmp(e);return 0!==this.negative?0|-t:t},o.prototype.ucmp=function(e){if(this.length>e.length)return 1;if(this.length<e.length)return -1;for(var t=0,r=this.length-1;0<=r;r--){var n=0|this.words[r],i=0|e.words[r];if(n!=i){n<i?t=-1:i<n&&(t=1);break}}return t},o.prototype.gtn=function(e){return 1===this.cmpn(e)},o.prototype.gt=function(e){return 1===this.cmp(e)},o.prototype.gten=function(e){return 0<=this.cmpn(e)},o.prototype.gte=function(e){return 0<=this.cmp(e)},o.prototype.ltn=function(e){return -1===this.cmpn(e)},o.prototype.lt=function(e){return -1===this.cmp(e)},o.prototype.lten=function(e){return this.cmpn(e)<=0},o.prototype.lte=function(e){return this.cmp(e)<=0},o.prototype.eqn=function(e){return 0===this.cmpn(e)},o.prototype.eq=function(e){return 0===this.cmp(e)},o.red=function(e){return new _(e)},o.prototype.toRed=function(e){return n(!this.red,"Already a number in reduction context"),n(0===this.negative,"red works only with positives"),e.convertTo(this)._forceRed(e)},o.prototype.fromRed=function(){return n(this.red,"fromRed works only with numbers in reduction context"),this.red.convertFrom(this)},o.prototype._forceRed=function(e){return this.red=e,this},o.prototype.forceRed=function(e){return n(!this.red,"Already a number in reduction context"),this._forceRed(e)},o.prototype.redAdd=function(e){return n(this.red,"redAdd works only with red numbers"),this.red.add(this,e)},o.prototype.redIAdd=function(e){return n(this.red,"redIAdd works only with red numbers"),this.red.iadd(this,e)},o.prototype.redSub=function(e){return n(this.red,"redSub works only with red numbers"),this.red.sub(this,e)},o.prototype.redISub=function(e){return n(this.red,"redISub works only with red numbers"),this.red.isub(this,e)},o.prototype.redShl=function(e){return n(this.red,"redShl works only with red numbers"),this.red.shl(this,e)},o.prototype.redMul=function(e){return n(this.red,"redMul works only with red numbers"),this.red._verify2(this,e),this.red.mul(this,e)},o.prototype.redIMul=function(e){return n(this.red,"redMul works only with red numbers"),this.red._verify2(this,e),this.red.imul(this,e)},o.prototype.redSqr=function(){return n(this.red,"redSqr works only with red numbers"),this.red._verify1(this),this.red.sqr(this)},o.prototype.redISqr=function(){return n(this.red,"redISqr works only with red numbers"),this.red._verify1(this),this.red.isqr(this)},o.prototype.redSqrt=function(){return n(this.red,"redSqrt works only with red numbers"),this.red._verify1(this),this.red.sqrt(this)},o.prototype.redInvm=function(){return n(this.red,"redInvm works only with red numbers"),this.red._verify1(this),this.red.invm(this)},o.prototype.redNeg=function(){return n(this.red,"redNeg works only with red numbers"),this.red._verify1(this),this.red.neg(this)},o.prototype.redPow=function(e){return n(this.red&&!e.red,"redPow(normalNum)"),this.red._verify1(this),this.red.pow(this,e)};var m={k256:null,p224:null,p192:null,p25519:null};function y(e,t){this.name=e,this.p=new o(t,16),this.n=this.p.bitLength(),this.k=new o(1).iushln(this.n).isub(this.p),this.tmp=this._tmp();}function g(){y.call(this,"k256","ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f");}function b(){y.call(this,"p224","ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001");}function w(){y.call(this,"p192","ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff");}function E(){y.call(this,"25519","7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed");}function _(e){if("string"==typeof e){var t=o._prime(e);this.m=t.p,this.prime=t;}else n(e.gtn(1),"modulus must be greater than 1"),this.m=e,this.prime=null;}function S(e){_.call(this,e),this.shift=this.m.bitLength(),this.shift%26!=0&&(this.shift+=26-this.shift%26),this.r=new o(1).iushln(this.shift),this.r2=this.imod(this.r.sqr()),this.rinv=this.r._invmp(this.m),this.minv=this.rinv.mul(this.r).isubn(1).div(this.m),this.minv=this.minv.umod(this.r),this.minv=this.r.sub(this.minv);}y.prototype._tmp=function(){var e=new o(null);return e.words=new Array(Math.ceil(this.n/13)),e},y.prototype.ireduce=function(e){for(var t,r=e;this.split(r,this.tmp),(t=(r=(r=this.imulK(r)).iadd(this.tmp)).bitLength())>this.n;);var n=t<this.n?-1:r.ucmp(this.p);return 0===n?(r.words[0]=0,r.length=1):0<n?r.isub(this.p):r.strip(),r},y.prototype.split=function(e,t){e.iushrn(this.n,0,t);},y.prototype.imulK=function(e){return e.imul(this.k)},i(g,y),g.prototype.split=function(e,t){for(var r=Math.min(e.length,9),n=0;n<r;n++)t.words[n]=e.words[n];if(t.length=r,e.length<=9)return e.words[0]=0,void(e.length=1);var i=e.words[9];for(t.words[t.length++]=4194303&i,n=10;n<e.length;n++){var o=0|e.words[n];e.words[n-10]=(4194303&o)<<4|i>>>22,i=o;}i>>>=22,0===(e.words[n-10]=i)&&10<e.length?e.length-=10:e.length-=9;},g.prototype.imulK=function(e){e.words[e.length]=0,e.words[e.length+1]=0,e.length+=2;for(var t=0,r=0;r<e.length;r++){var n=0|e.words[r];t+=977*n,e.words[r]=67108863&t,t=64*n+(t/67108864|0);}return 0===e.words[e.length-1]&&(e.length--,0===e.words[e.length-1]&&e.length--),e},i(b,y),i(w,y),i(E,y),E.prototype.imulK=function(e){for(var t=0,r=0;r<e.length;r++){var n=19*(0|e.words[r])+t,i=67108863&n;n>>>=26,e.words[r]=i,t=n;}return 0!==t&&(e.words[e.length++]=t),e},o._prime=function(e){if(m[e])return m[e];var t;if("k256"===e)t=new g;else if("p224"===e)t=new b;else if("p192"===e)t=new w;else{if("p25519"!==e)throw new Error("Unknown prime "+e);t=new E;}return m[e]=t},_.prototype._verify1=function(e){n(0===e.negative,"red works only with positives"),n(e.red,"red works only with red numbers");},_.prototype._verify2=function(e,t){n(0==(e.negative|t.negative),"red works only with positives"),n(e.red&&e.red===t.red,"red works only with red numbers");},_.prototype.imod=function(e){return this.prime?this.prime.ireduce(e)._forceRed(this):e.umod(this.m)._forceRed(this)},_.prototype.neg=function(e){return e.isZero()?e.clone():this.m.sub(e)._forceRed(this)},_.prototype.add=function(e,t){this._verify2(e,t);var r=e.add(t);return 0<=r.cmp(this.m)&&r.isub(this.m),r._forceRed(this)},_.prototype.iadd=function(e,t){this._verify2(e,t);var r=e.iadd(t);return 0<=r.cmp(this.m)&&r.isub(this.m),r},_.prototype.sub=function(e,t){this._verify2(e,t);var r=e.sub(t);return r.cmpn(0)<0&&r.iadd(this.m),r._forceRed(this)},_.prototype.isub=function(e,t){this._verify2(e,t);var r=e.isub(t);return r.cmpn(0)<0&&r.iadd(this.m),r},_.prototype.shl=function(e,t){return this._verify1(e),this.imod(e.ushln(t))},_.prototype.imul=function(e,t){return this._verify2(e,t),this.imod(e.imul(t))},_.prototype.mul=function(e,t){return this._verify2(e,t),this.imod(e.mul(t))},_.prototype.isqr=function(e){return this.imul(e,e.clone())},_.prototype.sqr=function(e){return this.mul(e,e)},_.prototype.sqrt=function(e){if(e.isZero())return e.clone();var t=this.m.andln(3);if(n(t%2==1),3===t){var r=this.m.add(new o(1)).iushrn(2);return this.pow(e,r)}for(var i=this.m.subn(1),a=0;!i.isZero()&&0===i.andln(1);)a++,i.iushrn(1);n(!i.isZero());var s=new o(1).toRed(this),u=s.redNeg(),c=this.m.subn(1).iushrn(1),l=this.m.bitLength();for(l=new o(2*l*l).toRed(this);0!==this.pow(l,c).cmp(u);)l.redIAdd(u);for(var f=this.pow(l,i),h=this.pow(e,i.addn(1).iushrn(1)),d=this.pow(e,i),p=a;0!==d.cmp(s);){for(var v=d,m=0;0!==v.cmp(s);m++)v=v.redSqr();n(m<p);var y=this.pow(f,new o(1).iushln(p-m-1));h=h.redMul(y),f=y.redSqr(),d=d.redMul(f),p=m;}return h},_.prototype.invm=function(e){var t=e._invmp(this.m);return 0!==t.negative?(t.negative=0,this.imod(t).redNeg()):this.imod(t)},_.prototype.pow=function(e,t){if(t.isZero())return new o(1).toRed(this);if(0===t.cmpn(1))return e.clone();var r=new Array(16);r[0]=new o(1).toRed(this),r[1]=e;for(var n=2;n<r.length;n++)r[n]=this.mul(r[n-1],e);var i=r[0],a=0,s=0,u=t.bitLength()%26;for(0===u&&(u=26),n=t.length-1;0<=n;n--){for(var c=t.words[n],l=u-1;0<=l;l--){var f=c>>l&1;i!==r[0]&&(i=this.sqr(i)),0!=f||0!==a?(a<<=1,a|=f,(4==++s||0===n&&0===l)&&(i=this.mul(i,r[a]),a=s=0)):s=0;}u=26;}return i},_.prototype.convertTo=function(e){var t=e.umod(this.m);return t===e?t.clone():t},_.prototype.convertFrom=function(e){var t=e.clone();return t.red=null,t},o.mont=function(e){return new S(e)},i(S,_),S.prototype.convertTo=function(e){return this.imod(e.ushln(this.shift))},S.prototype.convertFrom=function(e){var t=this.imod(e.mul(this.rinv));return t.red=null,t},S.prototype.imul=function(e,t){if(e.isZero()||t.isZero())return e.words[0]=0,e.length=1,e;var r=e.imul(t),n=r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),i=r.isub(n).iushrn(this.shift),o=i;return 0<=i.cmp(this.m)?o=i.isub(this.m):i.cmpn(0)<0&&(o=i.iadd(this.m)),o._forceRed(this)},S.prototype.mul=function(e,t){if(e.isZero()||t.isZero())return new o(0)._forceRed(this);var r=e.mul(t),n=r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),i=r.isub(n).iushrn(this.shift),a=i;return 0<=i.cmp(this.m)?a=i.isub(this.m):i.cmpn(0)<0&&(a=i.iadd(this.m)),a._forceRed(this)},S.prototype.invm=function(e){return this.imod(e._invmp(this.m).mul(this.r2))._forceRed(this)};}(void 0===t||t,this);},{buffer:11}],10:[function(e,t,r){(function(e){t.exports=function(t){var r=new Uint8Array(t);return (e.crypto||e.msCrypto).getRandomValues(r),r};}).call(this,void 0!==commonjsGlobal$1?commonjsGlobal$1:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});},{}],11:[function(e,t,r){},{}],12:[function(e,t,r){var n=r;n.version=e("../package.json").version,n.utils=e("./elliptic/utils"),n.rand=e("brorand"),n.hmacDRBG=e("./elliptic/hmac-drbg"),n.curve=e("./elliptic/curve"),n.curves=e("./elliptic/curves"),n.ec=e("./elliptic/ec"),n.eddsa=e("./elliptic/eddsa");},{"../package.json":26,"./elliptic/curve":15,"./elliptic/curves":18,"./elliptic/ec":19,"./elliptic/eddsa":22,"./elliptic/hmac-drbg":23,"./elliptic/utils":25,brorand:10}],13:[function(e,t,r){var n=e("bn.js"),i=e("../../elliptic").utils,o=i.getNAF,a=i.getJSF,s=i.assert;function u(e,t){this.type=e,this.p=new n(t.p,16),this.red=t.prime?n.red(t.prime):n.mont(this.p),this.zero=new n(0).toRed(this.red),this.one=new n(1).toRed(this.red),this.two=new n(2).toRed(this.red),this.n=t.n&&new n(t.n,16),this.g=t.g&&this.pointFromJSON(t.g,t.gRed),this._wnafT1=new Array(4),this._wnafT2=new Array(4),this._wnafT3=new Array(4),this._wnafT4=new Array(4);var r=this.n&&this.p.div(this.n);!r||0<r.cmpn(100)?this.redN=null:(this._maxwellTrick=!0,this.redN=this.n.toRed(this.red));}function c(e,t){this.curve=e,this.type=t,this.precomputed=null;}(t.exports=u).prototype.point=function(){throw new Error("Not implemented")},u.prototype.validate=function(){throw new Error("Not implemented")},u.prototype._fixedNafMul=function(e,t){s(e.precomputed);var r=e._getDoubles(),n=o(t,1),i=(1<<r.step+1)-(r.step%2==0?2:1);i/=3;for(var a=[],u=0;u<n.length;u+=r.step){var c=0;for(t=u+r.step-1;u<=t;t--)c=(c<<1)+n[t];a.push(c);}for(var l=this.jpoint(null,null,null),f=this.jpoint(null,null,null),h=i;0<h;h--){for(u=0;u<a.length;u++)(c=a[u])===h?f=f.mixedAdd(r.points[u]):c===-h&&(f=f.mixedAdd(r.points[u].neg()));l=l.add(f);}return l.toP()},u.prototype._wnafMul=function(e,t){var r=4,n=e._getNAFPoints(r);r=n.wnd;for(var i=n.points,a=o(t,r),u=this.jpoint(null,null,null),c=a.length-1;0<=c;c--){for(t=0;0<=c&&0===a[c];c--)t++;if(0<=c&&t++,u=u.dblp(t),c<0)break;var l=a[c];s(0!==l),u="affine"===e.type?0<l?u.mixedAdd(i[l-1>>1]):u.mixedAdd(i[-l-1>>1].neg()):0<l?u.add(i[l-1>>1]):u.add(i[-l-1>>1].neg());}return "affine"===e.type?u.toP():u},u.prototype._wnafMulAdd=function(e,t,r,n,i){for(var s=this._wnafT1,u=this._wnafT2,c=this._wnafT3,l=0,f=0;f<n;f++){var h=(T=t[f])._getNAFPoints(e);s[f]=h.wnd,u[f]=h.points;}for(f=n-1;1<=f;f-=2){var d=f-1,p=f;if(1===s[d]&&1===s[p]){var v=[t[d],null,null,t[p]];0===t[d].y.cmp(t[p].y)?(v[1]=t[d].add(t[p]),v[2]=t[d].toJ().mixedAdd(t[p].neg())):0===t[d].y.cmp(t[p].y.redNeg())?(v[1]=t[d].toJ().mixedAdd(t[p]),v[2]=t[d].add(t[p].neg())):(v[1]=t[d].toJ().mixedAdd(t[p]),v[2]=t[d].toJ().mixedAdd(t[p].neg()));var m=[-3,-1,-5,-7,0,7,5,1,3],y=a(r[d],r[p]);l=Math.max(y[0].length,l),c[d]=new Array(l),c[p]=new Array(l);for(var g=0;g<l;g++){var b=0|y[0][g],w=0|y[1][g];c[d][g]=m[3*(1+b)+(1+w)],c[p][g]=0,u[d]=v;}}else c[d]=o(r[d],s[d]),c[p]=o(r[p],s[p]),l=Math.max(c[d].length,l),l=Math.max(c[p].length,l);}var E=this.jpoint(null,null,null),_=this._wnafT4;for(f=l;0<=f;f--){for(var S=0;0<=f;){var A=!0;for(g=0;g<n;g++)_[g]=0|c[g][f],0!==_[g]&&(A=!1);if(!A)break;S++,f--;}if(0<=f&&S++,E=E.dblp(S),f<0)break;for(g=0;g<n;g++){var T,N=_[g];0!==N&&(0<N?T=u[g][N-1>>1]:N<0&&(T=u[g][-N-1>>1].neg()),E="affine"===T.type?E.mixedAdd(T):E.add(T));}}for(f=0;f<n;f++)u[f]=null;return i?E:E.toP()},(u.BasePoint=c).prototype.eq=function(){throw new Error("Not implemented")},c.prototype.validate=function(){return this.curve.validate(this)},u.prototype.decodePoint=function(e,t){e=i.toArray(e,t);var r=this.p.byteLength();if((4===e[0]||6===e[0]||7===e[0])&&e.length-1==2*r)return 6===e[0]?s(e[e.length-1]%2==0):7===e[0]&&s(e[e.length-1]%2==1),this.point(e.slice(1,1+r),e.slice(1+r,1+2*r));if((2===e[0]||3===e[0])&&e.length-1===r)return this.pointFromX(e.slice(1,1+r),3===e[0]);throw new Error("Unknown point format")},c.prototype.encodeCompressed=function(e){return this.encode(e,!0)},c.prototype._encode=function(e){var t=this.curve.p.byteLength(),r=this.getX().toArray("be",t);return e?[this.getY().isEven()?2:3].concat(r):[4].concat(r,this.getY().toArray("be",t))},c.prototype.encode=function(e,t){return i.encode(this._encode(t),e)},c.prototype.precompute=function(e){if(this.precomputed)return this;var t={doubles:null,naf:null,beta:null};return t.naf=this._getNAFPoints(8),t.doubles=this._getDoubles(4,e),t.beta=this._getBeta(),this.precomputed=t,this},c.prototype._hasDoubles=function(e){if(!this.precomputed)return !1;var t=this.precomputed.doubles;return !!t&&t.points.length>=Math.ceil((e.bitLength()+1)/t.step)},c.prototype._getDoubles=function(e,t){if(this.precomputed&&this.precomputed.doubles)return this.precomputed.doubles;for(var r=[this],n=this,i=0;i<t;i+=e){for(var o=0;o<e;o++)n=n.dbl();r.push(n);}return {step:e,points:r}},c.prototype._getNAFPoints=function(e){if(this.precomputed&&this.precomputed.naf)return this.precomputed.naf;for(var t=[this],r=(1<<e)-1,n=1==r?null:this.dbl(),i=1;i<r;i++)t[i]=t[i-1].add(n);return {wnd:e,points:t}},c.prototype._getBeta=function(){return null},c.prototype.dblp=function(e){for(var t=this,r=0;r<e;r++)t=t.dbl();return t};},{"../../elliptic":12,"bn.js":9}],14:[function(e,t,r){t.exports={};},{}],15:[function(e,t,r){var n=r;n.base=e("./base"),n.short=e("./short"),n.mont=e("./mont"),n.edwards=e("./edwards");},{"./base":13,"./edwards":14,"./mont":16,"./short":17}],16:[function(e,t,r){arguments[4][14][0].apply(r,arguments);},{dup:14}],17:[function(e,t,r){var n=e("../curve"),i=e("../../elliptic"),o=e("bn.js"),a=e("inherits"),s=n.base,u=i.utils.assert;function c(e){s.call(this,"short",e),this.a=new o(e.a,16).toRed(this.red),this.b=new o(e.b,16).toRed(this.red),this.tinv=this.two.redInvm(),this.zeroA=0===this.a.fromRed().cmpn(0),this.threeA=0===this.a.fromRed().sub(this.p).cmpn(-3),this.endo=this._getEndomorphism(e),this._endoWnafT1=new Array(4),this._endoWnafT2=new Array(4);}function l(e,t,r,n){s.BasePoint.call(this,e,"affine"),null===t&&null===r?(this.x=null,this.y=null,this.inf=!0):(this.x=new o(t,16),this.y=new o(r,16),n&&(this.x.forceRed(this.curve.red),this.y.forceRed(this.curve.red)),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.inf=!1);}function f(e,t,r,n){s.BasePoint.call(this,e,"jacobian"),null===t&&null===r&&null===n?(this.x=this.curve.one,this.y=this.curve.one,this.z=new o(0)):(this.x=new o(t,16),this.y=new o(r,16),this.z=new o(n,16)),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.z.red||(this.z=this.z.toRed(this.curve.red)),this.zOne=this.z===this.curve.one;}a(c,s),(t.exports=c).prototype._getEndomorphism=function(e){if(this.zeroA&&this.g&&this.n&&1===this.p.modn(3)){var t,r;if(e.beta)t=new o(e.beta,16).toRed(this.red);else{var n=this._getEndoRoots(this.p);t=(t=n[0].cmp(n[1])<0?n[0]:n[1]).toRed(this.red);}if(e.lambda)r=new o(e.lambda,16);else{var i=this._getEndoRoots(this.n);0===this.g.mul(i[0]).x.cmp(this.g.x.redMul(t))?r=i[0]:(r=i[1],u(0===this.g.mul(r).x.cmp(this.g.x.redMul(t))));}return {beta:t,lambda:r,basis:e.basis?e.basis.map(function(e){return {a:new o(e.a,16),b:new o(e.b,16)}}):this._getEndoBasis(r)}}},c.prototype._getEndoRoots=function(e){var t=e===this.p?this.red:o.mont(e),r=new o(2).toRed(t).redInvm(),n=r.redNeg(),i=new o(3).toRed(t).redNeg().redSqrt().redMul(r);return [n.redAdd(i).fromRed(),n.redSub(i).fromRed()]},c.prototype._getEndoBasis=function(e){for(var t,r,n,i,a,s,u,c,l,f=this.n.ushrn(Math.floor(this.n.bitLength()/2)),h=e,d=this.n.clone(),p=new o(1),v=new o(0),m=new o(0),y=new o(1),g=0;0!==h.cmpn(0);){var b=d.div(h);c=d.sub(b.mul(h)),l=m.sub(b.mul(p));var w=y.sub(b.mul(v));if(!n&&c.cmp(f)<0)t=u.neg(),r=p,n=c.neg(),i=l;else if(n&&2==++g)break;d=h,h=u=c,m=p,p=l,y=v,v=w;}a=c.neg(),s=l;var E=n.sqr().add(i.sqr());return 0<=a.sqr().add(s.sqr()).cmp(E)&&(a=t,s=r),n.negative&&(n=n.neg(),i=i.neg()),a.negative&&(a=a.neg(),s=s.neg()),[{a:n,b:i},{a:a,b:s}]},c.prototype._endoSplit=function(e){var t=this.endo.basis,r=t[0],n=t[1],i=n.b.mul(e).divRound(this.n),o=r.b.neg().mul(e).divRound(this.n),a=i.mul(r.a),s=o.mul(n.a),u=i.mul(r.b),c=o.mul(n.b);return {k1:e.sub(a).sub(s),k2:u.add(c).neg()}},c.prototype.pointFromX=function(e,t){(e=new o(e,16)).red||(e=e.toRed(this.red));var r=e.redSqr().redMul(e).redIAdd(e.redMul(this.a)).redIAdd(this.b),n=r.redSqrt();if(0!==n.redSqr().redSub(r).cmp(this.zero))throw new Error("invalid point");var i=n.fromRed().isOdd();return (t&&!i||!t&&i)&&(n=n.redNeg()),this.point(e,n)},c.prototype.validate=function(e){if(e.inf)return !0;var t=e.x,r=e.y,n=this.a.redMul(t),i=t.redSqr().redMul(t).redIAdd(n).redIAdd(this.b);return 0===r.redSqr().redISub(i).cmpn(0)},c.prototype._endoWnafMulAdd=function(e,t,r){for(var n=this._endoWnafT1,i=this._endoWnafT2,o=0;o<e.length;o++){var a=this._endoSplit(t[o]),s=e[o],u=s._getBeta();a.k1.negative&&(a.k1.ineg(),s=s.neg(!0)),a.k2.negative&&(a.k2.ineg(),u=u.neg(!0)),n[2*o]=s,n[2*o+1]=u,i[2*o]=a.k1,i[2*o+1]=a.k2;}for(var c=this._wnafMulAdd(1,n,i,2*o,r),l=0;l<2*o;l++)n[l]=null,i[l]=null;return c},a(l,s.BasePoint),c.prototype.point=function(e,t,r){return new l(this,e,t,r)},c.prototype.pointFromJSON=function(e,t){return l.fromJSON(this,e,t)},l.prototype._getBeta=function(){if(this.curve.endo){var e=this.precomputed;if(e&&e.beta)return e.beta;var t=this.curve.point(this.x.redMul(this.curve.endo.beta),this.y);if(e){var r=this.curve,n=function(e){return r.point(e.x.redMul(r.endo.beta),e.y)};(e.beta=t).precomputed={beta:null,naf:e.naf&&{wnd:e.naf.wnd,points:e.naf.points.map(n)},doubles:e.doubles&&{step:e.doubles.step,points:e.doubles.points.map(n)}};}return t}},l.prototype.toJSON=function(){return this.precomputed?[this.x,this.y,this.precomputed&&{doubles:this.precomputed.doubles&&{step:this.precomputed.doubles.step,points:this.precomputed.doubles.points.slice(1)},naf:this.precomputed.naf&&{wnd:this.precomputed.naf.wnd,points:this.precomputed.naf.points.slice(1)}}]:[this.x,this.y]},l.fromJSON=function(e,t,r){"string"==typeof t&&(t=JSON.parse(t));var n=e.point(t[0],t[1],r);if(!t[2])return n;function i(t){return e.point(t[0],t[1],r)}var o=t[2];return n.precomputed={beta:null,doubles:o.doubles&&{step:o.doubles.step,points:[n].concat(o.doubles.points.map(i))},naf:o.naf&&{wnd:o.naf.wnd,points:[n].concat(o.naf.points.map(i))}},n},l.prototype.inspect=function(){return this.isInfinity()?"<EC Point Infinity>":"<EC Point x: "+this.x.fromRed().toString(16,2)+" y: "+this.y.fromRed().toString(16,2)+">"},l.prototype.isInfinity=function(){return this.inf},l.prototype.add=function(e){if(this.inf)return e;if(e.inf)return this;if(this.eq(e))return this.dbl();if(this.neg().eq(e))return this.curve.point(null,null);if(0===this.x.cmp(e.x))return this.curve.point(null,null);var t=this.y.redSub(e.y);0!==t.cmpn(0)&&(t=t.redMul(this.x.redSub(e.x).redInvm()));var r=t.redSqr().redISub(this.x).redISub(e.x),n=t.redMul(this.x.redSub(r)).redISub(this.y);return this.curve.point(r,n)},l.prototype.dbl=function(){if(this.inf)return this;var e=this.y.redAdd(this.y);if(0===e.cmpn(0))return this.curve.point(null,null);var t=this.curve.a,r=this.x.redSqr(),n=e.redInvm(),i=r.redAdd(r).redIAdd(r).redIAdd(t).redMul(n),o=i.redSqr().redISub(this.x.redAdd(this.x)),a=i.redMul(this.x.redSub(o)).redISub(this.y);return this.curve.point(o,a)},l.prototype.getX=function(){return this.x.fromRed()},l.prototype.getY=function(){return this.y.fromRed()},l.prototype.mul=function(e){return e=new o(e,16),this._hasDoubles(e)?this.curve._fixedNafMul(this,e):this.curve.endo?this.curve._endoWnafMulAdd([this],[e]):this.curve._wnafMul(this,e)},l.prototype.mulAdd=function(e,t,r){var n=[this,t],i=[e,r];return this.curve.endo?this.curve._endoWnafMulAdd(n,i):this.curve._wnafMulAdd(1,n,i,2)},l.prototype.jmulAdd=function(e,t,r){var n=[this,t],i=[e,r];return this.curve.endo?this.curve._endoWnafMulAdd(n,i,!0):this.curve._wnafMulAdd(1,n,i,2,!0)},l.prototype.eq=function(e){return this===e||this.inf===e.inf&&(this.inf||0===this.x.cmp(e.x)&&0===this.y.cmp(e.y))},l.prototype.neg=function(e){if(this.inf)return this;var t=this.curve.point(this.x,this.y.redNeg());if(e&&this.precomputed){var r=this.precomputed,n=function(e){return e.neg()};t.precomputed={naf:r.naf&&{wnd:r.naf.wnd,points:r.naf.points.map(n)},doubles:r.doubles&&{step:r.doubles.step,points:r.doubles.points.map(n)}};}return t},l.prototype.toJ=function(){return this.inf?this.curve.jpoint(null,null,null):this.curve.jpoint(this.x,this.y,this.curve.one)},a(f,s.BasePoint),c.prototype.jpoint=function(e,t,r){return new f(this,e,t,r)},f.prototype.toP=function(){if(this.isInfinity())return this.curve.point(null,null);var e=this.z.redInvm(),t=e.redSqr(),r=this.x.redMul(t),n=this.y.redMul(t).redMul(e);return this.curve.point(r,n)},f.prototype.neg=function(){return this.curve.jpoint(this.x,this.y.redNeg(),this.z)},f.prototype.add=function(e){if(this.isInfinity())return e;if(e.isInfinity())return this;var t=e.z.redSqr(),r=this.z.redSqr(),n=this.x.redMul(t),i=e.x.redMul(r),o=this.y.redMul(t.redMul(e.z)),a=e.y.redMul(r.redMul(this.z)),s=n.redSub(i),u=o.redSub(a);if(0===s.cmpn(0))return 0!==u.cmpn(0)?this.curve.jpoint(null,null,null):this.dbl();var c=s.redSqr(),l=c.redMul(s),f=n.redMul(c),h=u.redSqr().redIAdd(l).redISub(f).redISub(f),d=u.redMul(f.redISub(h)).redISub(o.redMul(l)),p=this.z.redMul(e.z).redMul(s);return this.curve.jpoint(h,d,p)},f.prototype.mixedAdd=function(e){if(this.isInfinity())return e.toJ();if(e.isInfinity())return this;var t=this.z.redSqr(),r=this.x,n=e.x.redMul(t),i=this.y,o=e.y.redMul(t).redMul(this.z),a=r.redSub(n),s=i.redSub(o);if(0===a.cmpn(0))return 0!==s.cmpn(0)?this.curve.jpoint(null,null,null):this.dbl();var u=a.redSqr(),c=u.redMul(a),l=r.redMul(u),f=s.redSqr().redIAdd(c).redISub(l).redISub(l),h=s.redMul(l.redISub(f)).redISub(i.redMul(c)),d=this.z.redMul(a);return this.curve.jpoint(f,h,d)},f.prototype.dblp=function(e){if(0===e)return this;if(this.isInfinity())return this;if(!e)return this.dbl();if(this.curve.zeroA||this.curve.threeA){for(var t=this,r=0;r<e;r++)t=t.dbl();return t}var n=this.curve.a,i=this.curve.tinv,o=this.x,a=this.y,s=this.z,u=s.redSqr().redSqr(),c=a.redAdd(a);for(r=0;r<e;r++){var l=o.redSqr(),f=c.redSqr(),h=f.redSqr(),d=l.redAdd(l).redIAdd(l).redIAdd(n.redMul(u)),p=o.redMul(f),v=d.redSqr().redISub(p.redAdd(p)),m=p.redISub(v),y=d.redMul(m);y=y.redIAdd(y).redISub(h);var g=c.redMul(s);r+1<e&&(u=u.redMul(h)),o=v,s=g,c=y;}return this.curve.jpoint(o,c.redMul(i),s)},f.prototype.dbl=function(){return this.isInfinity()?this:this.curve.zeroA?this._zeroDbl():this.curve.threeA?this._threeDbl():this._dbl()},f.prototype._zeroDbl=function(){var e,t,r;if(this.zOne){var n=this.x.redSqr(),i=this.y.redSqr(),o=i.redSqr(),a=this.x.redAdd(i).redSqr().redISub(n).redISub(o);a=a.redIAdd(a);var s=n.redAdd(n).redIAdd(n),u=s.redSqr().redISub(a).redISub(a),c=o.redIAdd(o);c=(c=c.redIAdd(c)).redIAdd(c),e=u,t=s.redMul(a.redISub(u)).redISub(c),r=this.y.redAdd(this.y);}else{var l=this.x.redSqr(),f=this.y.redSqr(),h=f.redSqr(),d=this.x.redAdd(f).redSqr().redISub(l).redISub(h);d=d.redIAdd(d);var p=l.redAdd(l).redIAdd(l),v=p.redSqr(),m=h.redIAdd(h);m=(m=m.redIAdd(m)).redIAdd(m),e=v.redISub(d).redISub(d),t=p.redMul(d.redISub(e)).redISub(m),r=(r=this.y.redMul(this.z)).redIAdd(r);}return this.curve.jpoint(e,t,r)},f.prototype._threeDbl=function(){var e,t,r;if(this.zOne){var n=this.x.redSqr(),i=this.y.redSqr(),o=i.redSqr(),a=this.x.redAdd(i).redSqr().redISub(n).redISub(o);a=a.redIAdd(a);var s=n.redAdd(n).redIAdd(n).redIAdd(this.curve.a),u=s.redSqr().redISub(a).redISub(a);e=u;var c=o.redIAdd(o);c=(c=c.redIAdd(c)).redIAdd(c),t=s.redMul(a.redISub(u)).redISub(c),r=this.y.redAdd(this.y);}else{var l=this.z.redSqr(),f=this.y.redSqr(),h=this.x.redMul(f),d=this.x.redSub(l).redMul(this.x.redAdd(l));d=d.redAdd(d).redIAdd(d);var p=h.redIAdd(h),v=(p=p.redIAdd(p)).redAdd(p);e=d.redSqr().redISub(v),r=this.y.redAdd(this.z).redSqr().redISub(f).redISub(l);var m=f.redSqr();m=(m=(m=m.redIAdd(m)).redIAdd(m)).redIAdd(m),t=d.redMul(p.redISub(e)).redISub(m);}return this.curve.jpoint(e,t,r)},f.prototype._dbl=function(){var e=this.curve.a,t=this.x,r=this.y,n=this.z,i=n.redSqr().redSqr(),o=t.redSqr(),a=r.redSqr(),s=o.redAdd(o).redIAdd(o).redIAdd(e.redMul(i)),u=t.redAdd(t),c=(u=u.redIAdd(u)).redMul(a),l=s.redSqr().redISub(c.redAdd(c)),f=c.redISub(l),h=a.redSqr();h=(h=(h=h.redIAdd(h)).redIAdd(h)).redIAdd(h);var d=s.redMul(f).redISub(h),p=r.redAdd(r).redMul(n);return this.curve.jpoint(l,d,p)},f.prototype.trpl=function(){if(!this.curve.zeroA)return this.dbl().add(this);var e=this.x.redSqr(),t=this.y.redSqr(),r=this.z.redSqr(),n=t.redSqr(),i=e.redAdd(e).redIAdd(e),o=i.redSqr(),a=this.x.redAdd(t).redSqr().redISub(e).redISub(n),s=(a=(a=(a=a.redIAdd(a)).redAdd(a).redIAdd(a)).redISub(o)).redSqr(),u=n.redIAdd(n);u=(u=(u=u.redIAdd(u)).redIAdd(u)).redIAdd(u);var c=i.redIAdd(a).redSqr().redISub(o).redISub(s).redISub(u),l=t.redMul(c);l=(l=l.redIAdd(l)).redIAdd(l);var f=this.x.redMul(s).redISub(l);f=(f=f.redIAdd(f)).redIAdd(f);var h=this.y.redMul(c.redMul(u.redISub(c)).redISub(a.redMul(s)));h=(h=(h=h.redIAdd(h)).redIAdd(h)).redIAdd(h);var d=this.z.redAdd(a).redSqr().redISub(r).redISub(s);return this.curve.jpoint(f,h,d)},f.prototype.mul=function(e,t){return e=new o(e,t),this.curve._wnafMul(this,e)},f.prototype.eq=function(e){if("affine"===e.type)return this.eq(e.toJ());if(this===e)return !0;var t=this.z.redSqr(),r=e.z.redSqr();if(0!==this.x.redMul(r).redISub(e.x.redMul(t)).cmpn(0))return !1;var n=t.redMul(this.z),i=r.redMul(e.z);return 0===this.y.redMul(i).redISub(e.y.redMul(n)).cmpn(0)},f.prototype.eqXToP=function(e){var t=this.z.redSqr(),r=e.toRed(this.curve.red).redMul(t);if(0===this.x.cmp(r))return !0;for(var n=e.clone(),i=this.curve.redN.redMul(t);;){if(n.iadd(this.curve.n),0<=n.cmp(this.curve.p))return !1;if(r.redIAdd(i),0===this.x.cmp(r))return !0}return !1},f.prototype.inspect=function(){return this.isInfinity()?"<EC JPoint Infinity>":"<EC JPoint x: "+this.x.toString(16,2)+" y: "+this.y.toString(16,2)+" z: "+this.z.toString(16,2)+">"},f.prototype.isInfinity=function(){return 0===this.z.cmpn(0)};},{"../../elliptic":12,"../curve":15,"bn.js":9,inherits:39}],18:[function(e,t,r){var n,i=r,o=e("hash.js"),a=e("../elliptic"),s=a.utils.assert;function u(e){"short"===e.type?this.curve=new a.curve.short(e):"edwards"===e.type?this.curve=new a.curve.edwards(e):this.curve=new a.curve.mont(e),this.g=this.curve.g,this.n=this.curve.n,this.hash=e.hash,s(this.g.validate(),"Invalid curve"),s(this.g.mul(this.n).isInfinity(),"Invalid curve, G*N != O");}function c(e,t){Object.defineProperty(i,e,{configurable:!0,enumerable:!0,get:function(){var r=new u(t);return Object.defineProperty(i,e,{configurable:!0,enumerable:!0,value:r}),r}});}i.PresetCurve=u,c("p192",{type:"short",prime:"p192",p:"ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",a:"ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",b:"64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",n:"ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",hash:o.sha256,gRed:!1,g:["188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012","07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"]}),c("p224",{type:"short",prime:"p224",p:"ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",a:"ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",b:"b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",n:"ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",hash:o.sha256,gRed:!1,g:["b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21","bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"]}),c("p256",{type:"short",prime:null,p:"ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",a:"ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",b:"5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",n:"ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",hash:o.sha256,gRed:!1,g:["6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296","4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"]}),c("p384",{type:"short",prime:null,p:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",a:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",b:"b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",n:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",hash:o.sha384,gRed:!1,g:["aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7","3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"]}),c("p521",{type:"short",prime:null,p:"000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",a:"000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",b:"00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",n:"000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",hash:o.sha512,gRed:!1,g:["000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66","00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"]}),c("curve25519",{type:"mont",prime:"p25519",p:"7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",a:"76d06",b:"1",n:"1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",hash:o.sha256,gRed:!1,g:["9"]}),c("ed25519",{type:"edwards",prime:"p25519",p:"7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",a:"-1",c:"1",d:"52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",n:"1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",hash:o.sha256,gRed:!1,g:["216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a","6666666666666666666666666666666666666666666666666666666666666658"]});try{n=e("./precomputed/secp256k1");}catch(e){n=void 0;}c("secp256k1",{type:"short",prime:"k256",p:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",a:"0",b:"7",n:"ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",h:"1",hash:o.sha256,beta:"7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",lambda:"5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",basis:[{a:"3086d221a7d46bcde86c90e49284eb15",b:"-e4437ed6010e88286f547fa90abfe4c3"},{a:"114ca50f7a8e2f3f657c1108d9d44cfd8",b:"3086d221a7d46bcde86c90e49284eb15"}],gRed:!1,g:["79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798","483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",n]});},{"../elliptic":12,"./precomputed/secp256k1":24,"hash.js":27}],19:[function(e,t,r){var n=e("bn.js"),i=e("../../elliptic"),o=i.utils.assert,a=e("./key"),s=e("./signature");function u(e){if(!(this instanceof u))return new u(e);"string"==typeof e&&(o(i.curves.hasOwnProperty(e),"Unknown curve "+e),e=i.curves[e]),e instanceof i.curves.PresetCurve&&(e={curve:e}),this.curve=e.curve.curve,this.n=this.curve.n,this.nh=this.n.ushrn(1),this.g=this.curve.g,this.g=e.curve.g,this.g.precompute(e.curve.n.bitLength()+1),this.hash=e.hash||e.curve.hash;}(t.exports=u).prototype.keyPair=function(e){return new a(this,e)},u.prototype.keyFromPrivate=function(e,t){return a.fromPrivate(this,e,t)},u.prototype.keyFromPublic=function(e,t){return a.fromPublic(this,e,t)},u.prototype.genKeyPair=function(e){e=e||{};for(var t=new i.hmacDRBG({hash:this.hash,pers:e.pers,entropy:e.entropy||i.rand(this.hash.hmacStrength),nonce:this.n.toArray()}),r=this.n.byteLength(),o=this.n.sub(new n(2));;){var a=new n(t.generate(r));if(!(0<a.cmp(o)))return a.iaddn(1),this.keyFromPrivate(a)}},u.prototype._truncateToN=function(e,t){var r=8*e.byteLength()-this.n.bitLength();return 0<r&&(e=e.ushrn(r)),!t&&0<=e.cmp(this.n)?e.sub(this.n):e},u.prototype.sign=function(e,t,r,o){"object"==typeof r&&(o=r,r=null),o=o||{},t=this.keyFromPrivate(t,r),e=this._truncateToN(new n(e,16));for(var a=this.n.byteLength(),u=t.getPrivate().toArray("be",a),c=e.toArray("be",a),l=new i.hmacDRBG({hash:this.hash,entropy:u,nonce:c,pers:o.pers,persEnc:o.persEnc}),f=this.n.sub(new n(1)),h=0;;h++){var d=o.k?o.k(h):new n(l.generate(this.n.byteLength()));if(!((d=this._truncateToN(d,!0)).cmpn(1)<=0||0<=d.cmp(f))){var p=this.g.mul(d);if(!p.isInfinity()){var v=p.getX(),m=v.umod(this.n);if(0!==m.cmpn(0)){var y=d.invm(this.n).mul(m.mul(t.getPrivate()).iadd(e));if(0!==(y=y.umod(this.n)).cmpn(0)){var g=(p.getY().isOdd()?1:0)|(0!==v.cmp(m)?2:0);return o.canonical&&0<y.cmp(this.nh)&&(y=this.n.sub(y),g^=1),new s({r:m,s:y,recoveryParam:g})}}}}}},u.prototype.verify=function(e,t,r,i){e=this._truncateToN(new n(e,16)),r=this.keyFromPublic(r,i);var o=(t=new s(t,"hex")).r,a=t.s;if(o.cmpn(1)<0||0<=o.cmp(this.n))return !1;if(a.cmpn(1)<0||0<=a.cmp(this.n))return !1;var u,c=a.invm(this.n),l=c.mul(e).umod(this.n),f=c.mul(o).umod(this.n);return this.curve._maxwellTrick?!(u=this.g.jmulAdd(l,r.getPublic(),f)).isInfinity()&&u.eqXToP(o):!(u=this.g.mulAdd(l,r.getPublic(),f)).isInfinity()&&0===u.getX().umod(this.n).cmp(o)},u.prototype.recoverPubKey=function(e,t,r,i){o((3&r)===r,"The recovery param is more than two bits"),t=new s(t,i);var a=this.n,u=new n(e),c=t.r,l=t.s,f=1&r,h=r>>1;if(0<=c.cmp(this.curve.p.umod(this.curve.n))&&h)throw new Error("Unable to find sencond key candinate");c=h?this.curve.pointFromX(c.add(this.curve.n),f):this.curve.pointFromX(c,f);var d=t.r.invm(a),p=a.sub(u).mul(d).umod(a),v=l.mul(d).umod(a);return this.g.mulAdd(p,c,v)},u.prototype.getKeyRecoveryParam=function(e,t,r,n){if(null!==(t=new s(t,n)).recoveryParam)return t.recoveryParam;for(var i=0;i<4;i++){var o;try{o=this.recoverPubKey(e,t,i);}catch(e){continue}if(o.eq(r))return i}throw new Error("Unable to find valid recovery factor")};},{"../../elliptic":12,"./key":20,"./signature":21,"bn.js":9}],20:[function(e,t,r){var n=e("bn.js"),i=e("../../elliptic").utils.assert;function o(e,t){this.ec=e,this.priv=null,this.pub=null,t.priv&&this._importPrivate(t.priv,t.privEnc),t.pub&&this._importPublic(t.pub,t.pubEnc);}(t.exports=o).fromPublic=function(e,t,r){return t instanceof o?t:new o(e,{pub:t,pubEnc:r})},o.fromPrivate=function(e,t,r){return t instanceof o?t:new o(e,{priv:t,privEnc:r})},o.prototype.validate=function(){var e=this.getPublic();return e.isInfinity()?{result:!1,reason:"Invalid public key"}:e.validate()?e.mul(this.ec.curve.n).isInfinity()?{result:!0,reason:null}:{result:!1,reason:"Public key * N != O"}:{result:!1,reason:"Public key is not a point"}},o.prototype.getPublic=function(e,t){return "string"==typeof e&&(t=e,e=null),this.pub||(this.pub=this.ec.g.mul(this.priv)),t?this.pub.encode(t,e):this.pub},o.prototype.getPrivate=function(e){return "hex"===e?this.priv.toString(16,2):this.priv},o.prototype._importPrivate=function(e,t){this.priv=new n(e,t||16),this.priv=this.priv.umod(this.ec.curve.n);},o.prototype._importPublic=function(e,t){if(e.x||e.y)return "mont"===this.ec.curve.type?i(e.x,"Need x coordinate"):"short"!==this.ec.curve.type&&"edwards"!==this.ec.curve.type||i(e.x&&e.y,"Need both x and y coordinate"),void(this.pub=this.ec.curve.point(e.x,e.y));this.pub=this.ec.curve.decodePoint(e,t);},o.prototype.derive=function(e){return e.mul(this.priv).getX()},o.prototype.sign=function(e,t,r){return this.ec.sign(e,this,t,r)},o.prototype.verify=function(e,t){return this.ec.verify(e,t,this)},o.prototype.inspect=function(){return "<Key priv: "+(this.priv&&this.priv.toString(16,2))+" pub: "+(this.pub&&this.pub.inspect())+" >"};},{"../../elliptic":12,"bn.js":9}],21:[function(e,t,r){var n=e("bn.js"),i=e("../../elliptic").utils,o=i.assert;function a(e,t){if(e instanceof a)return e;this._importDER(e,t)||(o(e.r&&e.s,"Signature without r or s"),this.r=new n(e.r,16),this.s=new n(e.s,16),void 0===e.recoveryParam?this.recoveryParam=null:this.recoveryParam=e.recoveryParam);}function s(){this.place=0;}function u(e,t){var r=e[t.place++];if(!(128&r))return r;for(var n=15&r,i=0,o=0,a=t.place;o<n;o++,a++)i<<=8,i|=e[a];return t.place=a,i}function c(e){for(var t=0,r=e.length-1;!e[t]&&!(128&e[t+1])&&t<r;)t++;return 0===t?e:e.slice(t)}function l(e,t){if(t<128)e.push(t);else{var r=1+(Math.log(t)/Math.LN2>>>3);for(e.push(128|r);--r;)e.push(t>>>(r<<3)&255);e.push(t);}}(t.exports=a).prototype._importDER=function(e,t){e=i.toArray(e,t);var r=new s;if(48!==e[r.place++])return !1;if(u(e,r)+r.place!==e.length)return !1;if(2!==e[r.place++])return !1;var o=u(e,r),a=e.slice(r.place,o+r.place);if(r.place+=o,2!==e[r.place++])return !1;var c=u(e,r);if(e.length!==c+r.place)return !1;var l=e.slice(r.place,c+r.place);return 0===a[0]&&128&a[1]&&(a=a.slice(1)),0===l[0]&&128&l[1]&&(l=l.slice(1)),this.r=new n(a),this.s=new n(l),!(this.recoveryParam=null)},a.prototype.toDER=function(e){var t=this.r.toArray(),r=this.s.toArray();for(128&t[0]&&(t=[0].concat(t)),128&r[0]&&(r=[0].concat(r)),t=c(t),r=c(r);!(r[0]||128&r[1]);)r=r.slice(1);var n=[2];l(n,t.length),(n=n.concat(t)).push(2),l(n,r.length);var o=n.concat(r),a=[48];return l(a,o.length),a=a.concat(o),i.encode(a,e)};},{"../../elliptic":12,"bn.js":9}],22:[function(e,t,r){arguments[4][14][0].apply(r,arguments);},{dup:14}],23:[function(e,t,r){var n=e("hash.js"),i=e("../elliptic").utils,o=i.assert;function a(e){if(!(this instanceof a))return new a(e);this.hash=e.hash,this.predResist=!!e.predResist,this.outLen=this.hash.outSize,this.minEntropy=e.minEntropy||this.hash.hmacStrength,this.reseed=null,this.reseedInterval=null,this.K=null,this.V=null;var t=i.toArray(e.entropy,e.entropyEnc),r=i.toArray(e.nonce,e.nonceEnc),n=i.toArray(e.pers,e.persEnc);o(t.length>=this.minEntropy/8,"Not enough entropy. Minimum is: "+this.minEntropy+" bits"),this._init(t,r,n);}(t.exports=a).prototype._init=function(e,t,r){var n=e.concat(t).concat(r);this.K=new Array(this.outLen/8),this.V=new Array(this.outLen/8);for(var i=0;i<this.V.length;i++)this.K[i]=0,this.V[i]=1;this._update(n),this.reseed=1,this.reseedInterval=281474976710656;},a.prototype._hmac=function(){return new n.hmac(this.hash,this.K)},a.prototype._update=function(e){var t=this._hmac().update(this.V).update([0]);e&&(t=t.update(e)),this.K=t.digest(),this.V=this._hmac().update(this.V).digest(),e&&(this.K=this._hmac().update(this.V).update([1]).update(e).digest(),this.V=this._hmac().update(this.V).digest());},a.prototype.reseed=function(e,t,r,n){"string"!=typeof t&&(n=r,r=t,t=null),e=i.toBuffer(e,t),r=i.toBuffer(r,n),o(e.length>=this.minEntropy/8,"Not enough entropy. Minimum is: "+this.minEntropy+" bits"),this._update(e.concat(r||[])),this.reseed=1;},a.prototype.generate=function(e,t,r,n){if(this.reseed>this.reseedInterval)throw new Error("Reseed is required");"string"!=typeof t&&(n=r,r=t,t=null),r&&(r=i.toArray(r,n),this._update(r));for(var o=[];o.length<e;)this.V=this._hmac().update(this.V).digest(),o=o.concat(this.V);var a=o.slice(0,e);return this._update(r),this.reseed++,i.encode(a,t)};},{"../elliptic":12,"hash.js":27}],24:[function(e,t,r){t.exports=void 0;},{}],25:[function(e,t,r){var n=r,i=e("bn.js");function o(e){return 1===e.length?"0"+e:e}function a(e){for(var t="",r=0;r<e.length;r++)t+=o(e[r].toString(16));return t}n.assert=function(e,t){if(!e)throw new Error(t||"Assertion failed")},n.toArray=function(e,t){if(Array.isArray(e))return e.slice();if(!e)return [];var r=[];if("string"!=typeof e){for(var n=0;n<e.length;n++)r[n]=0|e[n];return r}if(t){if("hex"===t)for((e=e.replace(/[^a-z0-9]+/gi,"")).length%2!=0&&(e="0"+e),n=0;n<e.length;n+=2)r.push(parseInt(e[n]+e[n+1],16));}else for(n=0;n<e.length;n++){var i=e.charCodeAt(n),o=i>>8,a=255&i;o?r.push(o,a):r.push(a);}return r},n.zero2=o,n.toHex=a,n.encode=function(e,t){return "hex"===t?a(e):e},n.getNAF=function(e,t){for(var r=[],n=1<<t+1,i=e.clone();0<=i.cmpn(1);){var o;if(i.isOdd()){var a=i.andln(n-1);o=(n>>1)-1<a?(n>>1)-a:a,i.isubn(o);}else o=0;r.push(o);for(var s=0!==i.cmpn(0)&&0===i.andln(n-1)?t+1:1,u=1;u<s;u++)r.push(0);i.iushrn(s);}return r},n.getJSF=function(e,t){var r=[[],[]];e=e.clone(),t=t.clone();for(var n=0,i=0;0<e.cmpn(-n)||0<t.cmpn(-i);){var o,a,s,u=e.andln(3)+n&3,c=t.andln(3)+i&3;3===u&&(u=-1),3===c&&(c=-1),o=0==(1&u)?0:3!=(s=e.andln(7)+n&7)&&5!==s||2!==c?u:-u,r[0].push(o),a=0==(1&c)?0:3!=(s=t.andln(7)+i&7)&&5!==s||2!==u?c:-c,r[1].push(a),2*n===o+1&&(n=1-n),2*i===a+1&&(i=1-i),e.iushrn(1),t.iushrn(1);}return r},n.cachedProperty=function(e,t,r){var n="_"+t;e.prototype[t]=function(){return void 0!==this[n]?this[n]:this[n]=r.call(this)};},n.parseBytes=function(e){return "string"==typeof e?n.toArray(e,"hex"):e},n.intFromLE=function(e){return new i(e,"hex","le")};},{"bn.js":9}],26:[function(e,t,r){t.exports={version:"6.3.3"};},{}],27:[function(e,t,r){var n=r;n.utils=e("./hash/utils"),n.common=e("./hash/common"),n.sha=e("./hash/sha"),n.ripemd=e("./hash/ripemd"),n.hmac=e("./hash/hmac"),n.sha1=n.sha.sha1,n.sha256=n.sha.sha256,n.sha224=n.sha.sha224,n.sha384=n.sha.sha384,n.sha512=n.sha.sha512,n.ripemd160=n.ripemd.ripemd160;},{"./hash/common":28,"./hash/hmac":29,"./hash/ripemd":30,"./hash/sha":31,"./hash/utils":38}],28:[function(e,t,r){var n=e("./utils"),i=e("minimalistic-assert");function o(){this.pending=null,this.pendingTotal=0,this.blockSize=this.constructor.blockSize,this.outSize=this.constructor.outSize,this.hmacStrength=this.constructor.hmacStrength,this.padLength=this.constructor.padLength/8,this.endian="big",this._delta8=this.blockSize/8,this._delta32=this.blockSize/32;}(r.BlockHash=o).prototype.update=function(e,t){if(e=n.toArray(e,t),this.pending?this.pending=this.pending.concat(e):this.pending=e,this.pendingTotal+=e.length,this.pending.length>=this._delta8){var r=(e=this.pending).length%this._delta8;this.pending=e.slice(e.length-r,e.length),0===this.pending.length&&(this.pending=null),e=n.join32(e,0,e.length-r,this.endian);for(var i=0;i<e.length;i+=this._delta32)this._update(e,i,i+this._delta32);}return this},o.prototype.digest=function(e){return this.update(this._pad()),i(null===this.pending),this._digest(e)},o.prototype._pad=function(){var e=this.pendingTotal,t=this._delta8,r=t-(e+this.padLength)%t,n=new Array(r+this.padLength);n[0]=128;for(var i=1;i<r;i++)n[i]=0;if(e<<=3,"big"===this.endian){for(var o=8;o<this.padLength;o++)n[i++]=0;n[i++]=0,n[i++]=0,n[i++]=0,n[i++]=0,n[i++]=e>>>24&255,n[i++]=e>>>16&255,n[i++]=e>>>8&255,n[i++]=255&e;}else for(n[i++]=255&e,n[i++]=e>>>8&255,n[i++]=e>>>16&255,n[i++]=e>>>24&255,n[i++]=0,n[i++]=0,n[i++]=0,n[i++]=0,o=8;o<this.padLength;o++)n[i++]=0;return n};},{"./utils":38,"minimalistic-assert":41}],29:[function(e,t,r){var n=e("./utils"),i=e("minimalistic-assert");function o(e,t,r){if(!(this instanceof o))return new o(e,t,r);this.Hash=e,this.blockSize=e.blockSize/8,this.outSize=e.outSize/8,this.inner=null,this.outer=null,this._init(n.toArray(t,r));}(t.exports=o).prototype._init=function(e){e.length>this.blockSize&&(e=(new this.Hash).update(e).digest()),i(e.length<=this.blockSize);for(var t=e.length;t<this.blockSize;t++)e.push(0);for(t=0;t<e.length;t++)e[t]^=54;for(this.inner=(new this.Hash).update(e),t=0;t<e.length;t++)e[t]^=106;this.outer=(new this.Hash).update(e);},o.prototype.update=function(e,t){return this.inner.update(e,t),this},o.prototype.digest=function(e){return this.outer.update(this.inner.digest()),this.outer.digest(e)};},{"./utils":38,"minimalistic-assert":41}],30:[function(e,t,r){var n=e("./utils"),i=e("./common"),o=n.rotl32,a=n.sum32,s=n.sum32_3,u=n.sum32_4,c=i.BlockHash;function l(){if(!(this instanceof l))return new l;c.call(this),this.h=[1732584193,4023233417,2562383102,271733878,3285377520],this.endian="little";}function f(e,t,r,n){return e<=15?t^r^n:e<=31?t&r|~t&n:e<=47?(t|~r)^n:e<=63?t&n|r&~n:t^(r|~n)}function h(e){return e<=15?0:e<=31?1518500249:e<=47?1859775393:e<=63?2400959708:2840853838}function d(e){return e<=15?1352829926:e<=31?1548603684:e<=47?1836072691:e<=63?2053994217:0}n.inherits(l,c),(r.ripemd160=l).blockSize=512,l.outSize=160,l.hmacStrength=192,l.padLength=64,l.prototype._update=function(e,t){for(var r=this.h[0],n=this.h[1],i=this.h[2],c=this.h[3],l=this.h[4],g=r,b=n,w=i,E=c,_=l,S=0;S<80;S++){var A=a(o(u(r,f(S,n,i,c),e[p[S]+t],h(S)),m[S]),l);r=l,l=c,c=o(i,10),i=n,n=A,A=a(o(u(g,f(79-S,b,w,E),e[v[S]+t],d(S)),y[S]),_),g=_,_=E,E=o(w,10),w=b,b=A;}A=s(this.h[1],i,E),this.h[1]=s(this.h[2],c,_),this.h[2]=s(this.h[3],l,g),this.h[3]=s(this.h[4],r,b),this.h[4]=s(this.h[0],n,w),this.h[0]=A;},l.prototype._digest=function(e){return "hex"===e?n.toHex32(this.h,"little"):n.split32(this.h,"little")};var p=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13],v=[5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11],m=[11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6],y=[8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11];},{"./common":28,"./utils":38}],31:[function(e,t,r){r.sha1=e("./sha/1"),r.sha224=e("./sha/224"),r.sha256=e("./sha/256"),r.sha384=e("./sha/384"),r.sha512=e("./sha/512");},{"./sha/1":32,"./sha/224":33,"./sha/256":34,"./sha/384":35,"./sha/512":36}],32:[function(e,t,r){arguments[4][14][0].apply(r,arguments);},{dup:14}],33:[function(e,t,r){arguments[4][14][0].apply(r,arguments);},{dup:14}],34:[function(e,t,r){var n=e("../utils"),i=e("../common"),o=e("./common"),a=e("minimalistic-assert"),s=n.sum32,u=n.sum32_4,c=n.sum32_5,l=o.ch32,f=o.maj32,h=o.s0_256,d=o.s1_256,p=o.g0_256,v=o.g1_256,m=i.BlockHash,y=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];function g(){if(!(this instanceof g))return new g;m.call(this),this.h=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],this.k=y,this.W=new Array(64);}n.inherits(g,m),(t.exports=g).blockSize=512,g.outSize=256,g.hmacStrength=192,g.padLength=64,g.prototype._update=function(e,t){for(var r=this.W,n=0;n<16;n++)r[n]=e[t+n];for(;n<r.length;n++)r[n]=u(v(r[n-2]),r[n-7],p(r[n-15]),r[n-16]);var i=this.h[0],o=this.h[1],m=this.h[2],y=this.h[3],g=this.h[4],b=this.h[5],w=this.h[6],E=this.h[7];for(a(this.k.length===r.length),n=0;n<r.length;n++){var _=c(E,d(g),l(g,b,w),this.k[n],r[n]),S=s(h(i),f(i,o,m));E=w,w=b,b=g,g=s(y,_),y=m,m=o,o=i,i=s(_,S);}this.h[0]=s(this.h[0],i),this.h[1]=s(this.h[1],o),this.h[2]=s(this.h[2],m),this.h[3]=s(this.h[3],y),this.h[4]=s(this.h[4],g),this.h[5]=s(this.h[5],b),this.h[6]=s(this.h[6],w),this.h[7]=s(this.h[7],E);},g.prototype._digest=function(e){return "hex"===e?n.toHex32(this.h,"big"):n.split32(this.h,"big")};},{"../common":28,"../utils":38,"./common":37,"minimalistic-assert":41}],35:[function(e,t,r){arguments[4][14][0].apply(r,arguments);},{dup:14}],36:[function(e,t,r){var n=e("../utils"),i=e("../common"),o=e("minimalistic-assert"),a=n.rotr64_hi,s=n.rotr64_lo,u=n.shr64_hi,c=n.shr64_lo,l=n.sum64,f=n.sum64_hi,h=n.sum64_lo,d=n.sum64_4_hi,p=n.sum64_4_lo,v=n.sum64_5_hi,m=n.sum64_5_lo,y=i.BlockHash,g=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591];function b(){if(!(this instanceof b))return new b;y.call(this),this.h=[1779033703,4089235720,3144134277,2227873595,1013904242,4271175723,2773480762,1595750129,1359893119,2917565137,2600822924,725511199,528734635,4215389547,1541459225,327033209],this.k=g,this.W=new Array(160);}function w(e,t,r,n,i){var o=e&r^~e&i;return o<0&&(o+=4294967296),o}function E(e,t,r,n,i,o){var a=t&n^~t&o;return a<0&&(a+=4294967296),a}function _(e,t,r,n,i){var o=e&r^e&i^r&i;return o<0&&(o+=4294967296),o}function S(e,t,r,n,i,o){var a=t&n^t&o^n&o;return a<0&&(a+=4294967296),a}function A(e,t){var r=a(e,t,28)^a(t,e,2)^a(t,e,7);return r<0&&(r+=4294967296),r}function T(e,t){var r=s(e,t,28)^s(t,e,2)^s(t,e,7);return r<0&&(r+=4294967296),r}function N(e,t){var r=a(e,t,14)^a(e,t,18)^a(t,e,9);return r<0&&(r+=4294967296),r}function x(e,t){var r=s(e,t,14)^s(e,t,18)^s(t,e,9);return r<0&&(r+=4294967296),r}function M(e,t){var r=a(e,t,1)^a(e,t,8)^u(e,t,7);return r<0&&(r+=4294967296),r}function I(e,t){var r=s(e,t,1)^s(e,t,8)^c(e,t,7);return r<0&&(r+=4294967296),r}function O(e,t){var r=a(e,t,19)^a(t,e,29)^u(e,t,6);return r<0&&(r+=4294967296),r}function R(e,t){var r=s(e,t,19)^s(t,e,29)^c(e,t,6);return r<0&&(r+=4294967296),r}n.inherits(b,y),(t.exports=b).blockSize=1024,b.outSize=512,b.hmacStrength=192,b.padLength=128,b.prototype._prepareBlock=function(e,t){for(var r=this.W,n=0;n<32;n++)r[n]=e[t+n];for(;n<r.length;n+=2){var i=O(r[n-4],r[n-3]),o=R(r[n-4],r[n-3]),a=r[n-14],s=r[n-13],u=M(r[n-30],r[n-29]),c=I(r[n-30],r[n-29]),l=r[n-32],f=r[n-31];r[n]=d(i,o,a,s,u,c,l,f),r[n+1]=p(i,o,a,s,u,c,l,f);}},b.prototype._update=function(e,t){this._prepareBlock(e,t);var r=this.W,n=this.h[0],i=this.h[1],a=this.h[2],s=this.h[3],u=this.h[4],c=this.h[5],d=this.h[6],p=this.h[7],y=this.h[8],g=this.h[9],b=this.h[10],M=this.h[11],I=this.h[12],O=this.h[13],R=this.h[14],P=this.h[15];o(this.k.length===r.length);for(var k=0;k<r.length;k+=2){var C=R,L=P,D=N(y,g),U=x(y,g),B=w(y,0,b,0,I),F=E(0,g,0,M,0,O),j=this.k[k],G=this.k[k+1],V=r[k],z=r[k+1],H=v(C,L,D,U,B,F,j,G,V,z),q=m(C,L,D,U,B,F,j,G,V,z);C=A(n,i),L=T(n,i),D=_(n,0,a,0,u),U=S(0,i,0,s,0,c);var W=f(C,L,D,U),Q=h(C,L,D,U);R=I,P=O,I=b,O=M,b=y,M=g,y=f(d,p,H,q),g=h(p,p,H,q),d=u,p=c,u=a,c=s,a=n,s=i,n=f(H,q,W,Q),i=h(H,q,W,Q);}l(this.h,0,n,i),l(this.h,2,a,s),l(this.h,4,u,c),l(this.h,6,d,p),l(this.h,8,y,g),l(this.h,10,b,M),l(this.h,12,I,O),l(this.h,14,R,P);},b.prototype._digest=function(e){return "hex"===e?n.toHex32(this.h,"big"):n.split32(this.h,"big")};},{"../common":28,"../utils":38,"minimalistic-assert":41}],37:[function(e,t,r){var n=e("../utils").rotr32;function i(e,t,r){return e&t^~e&r}function o(e,t,r){return e&t^e&r^t&r}function a(e,t,r){return e^t^r}r.ft_1=function(e,t,r,n){return 0===e?i(t,r,n):1===e||3===e?a(t,r,n):2===e?o(t,r,n):void 0},r.ch32=i,r.maj32=o,r.p32=a,r.s0_256=function(e){return n(e,2)^n(e,13)^n(e,22)},r.s1_256=function(e){return n(e,6)^n(e,11)^n(e,25)},r.g0_256=function(e){return n(e,7)^n(e,18)^e>>>3},r.g1_256=function(e){return n(e,17)^n(e,19)^e>>>10};},{"../utils":38}],38:[function(e,t,r){var n=e("minimalistic-assert"),i=e("inherits");function o(e){return (e>>>24|e>>>8&65280|e<<8&16711680|(255&e)<<24)>>>0}function a(e){return 1===e.length?"0"+e:e}function s(e){return 7===e.length?"0"+e:6===e.length?"00"+e:5===e.length?"000"+e:4===e.length?"0000"+e:3===e.length?"00000"+e:2===e.length?"000000"+e:1===e.length?"0000000"+e:e}r.inherits=i,r.toArray=function(e,t){if(Array.isArray(e))return e.slice();if(!e)return [];var r=[];if("string"==typeof e)if(t){if("hex"===t)for((e=e.replace(/[^a-z0-9]+/gi,"")).length%2!=0&&(e="0"+e),n=0;n<e.length;n+=2)r.push(parseInt(e[n]+e[n+1],16));}else for(var n=0;n<e.length;n++){var i=e.charCodeAt(n),o=i>>8,a=255&i;o?r.push(o,a):r.push(a);}else for(n=0;n<e.length;n++)r[n]=0|e[n];return r},r.toHex=function(e){for(var t="",r=0;r<e.length;r++)t+=a(e[r].toString(16));return t},r.htonl=o,r.toHex32=function(e,t){for(var r="",n=0;n<e.length;n++){var i=e[n];"little"===t&&(i=o(i)),r+=s(i.toString(16));}return r},r.zero2=a,r.zero8=s,r.join32=function(e,t,r,i){var o=r-t;n(o%4==0);for(var a=new Array(o/4),s=0,u=t;s<a.length;s++,u+=4){var c;c="big"===i?e[u]<<24|e[u+1]<<16|e[u+2]<<8|e[u+3]:e[u+3]<<24|e[u+2]<<16|e[u+1]<<8|e[u],a[s]=c>>>0;}return a},r.split32=function(e,t){for(var r=new Array(4*e.length),n=0,i=0;n<e.length;n++,i+=4){var o=e[n];"big"===t?(r[i]=o>>>24,r[i+1]=o>>>16&255,r[i+2]=o>>>8&255,r[i+3]=255&o):(r[i+3]=o>>>24,r[i+2]=o>>>16&255,r[i+1]=o>>>8&255,r[i]=255&o);}return r},r.rotr32=function(e,t){return e>>>t|e<<32-t},r.rotl32=function(e,t){return e<<t|e>>>32-t},r.sum32=function(e,t){return e+t>>>0},r.sum32_3=function(e,t,r){return e+t+r>>>0},r.sum32_4=function(e,t,r,n){return e+t+r+n>>>0},r.sum32_5=function(e,t,r,n,i){return e+t+r+n+i>>>0},r.sum64=function(e,t,r,n){var i=e[t],o=n+e[t+1]>>>0,a=(o<n?1:0)+r+i;e[t]=a>>>0,e[t+1]=o;},r.sum64_hi=function(e,t,r,n){return (t+n>>>0<t?1:0)+e+r>>>0},r.sum64_lo=function(e,t,r,n){return t+n>>>0},r.sum64_4_hi=function(e,t,r,n,i,o,a,s){var u=0,c=t;return u+=(c=c+n>>>0)<t?1:0,u+=(c=c+o>>>0)<o?1:0,e+r+i+a+(u+=(c=c+s>>>0)<s?1:0)>>>0},r.sum64_4_lo=function(e,t,r,n,i,o,a,s){return t+n+o+s>>>0},r.sum64_5_hi=function(e,t,r,n,i,o,a,s,u,c){var l=0,f=t;return l+=(f=f+n>>>0)<t?1:0,l+=(f=f+o>>>0)<o?1:0,l+=(f=f+s>>>0)<s?1:0,e+r+i+a+u+(l+=(f=f+c>>>0)<c?1:0)>>>0},r.sum64_5_lo=function(e,t,r,n,i,o,a,s,u,c){return t+n+o+s+c>>>0},r.rotr64_hi=function(e,t,r){return (t<<32-r|e>>>r)>>>0},r.rotr64_lo=function(e,t,r){return (e<<32-r|t>>>r)>>>0},r.shr64_hi=function(e,t,r){return e>>>r},r.shr64_lo=function(e,t,r){return (e<<32-r|t>>>r)>>>0};},{inherits:39,"minimalistic-assert":41}],39:[function(e,t,r){"function"==typeof Object.create?t.exports=function(e,t){t&&(e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}));}:t.exports=function(e,t){if(t){function r(){}e.super_=t,r.prototype=t.prototype,e.prototype=new r,e.prototype.constructor=e;}};},{}],40:[function(e,t,r){(function(e,r){!function(){var n="object"==typeof window?window:{};!n.JS_SHA3_NO_NODE_JS&&"object"==typeof e&&e.versions&&e.versions.node&&(n=r);for(var i=!n.JS_SHA3_NO_COMMON_JS&&"object"==typeof t&&t.exports,o="0123456789abcdef".split(""),a=[0,8,16,24],s=[1,0,32898,0,32906,2147483648,2147516416,2147483648,32907,0,2147483649,0,2147516545,2147483648,32777,2147483648,138,0,136,0,2147516425,0,2147483658,0,2147516555,0,139,2147483648,32905,2147483648,32771,2147483648,32770,2147483648,128,2147483648,32778,0,2147483658,2147483648,2147516545,2147483648,32896,2147483648,2147483649,0,2147516424,2147483648],u=[224,256,384,512],c=["hex","buffer","arrayBuffer","array"],l=function(e,t,r){return function(n){return new E(e,t,e).update(n)[r]()}},f=function(e,t,r){return function(n,i){return new E(e,t,i).update(n)[r]()}},h=function(e,t){var r=l(e,t,"hex");r.create=function(){return new E(e,t,e)},r.update=function(e){return r.create().update(e)};for(var n=0;n<c.length;++n){var i=c[n];r[i]=l(e,t,i);}return r},d=[{name:"keccak",padding:[1,256,65536,16777216],bits:u,createMethod:h},{name:"sha3",padding:[6,1536,393216,100663296],bits:u,createMethod:h},{name:"shake",padding:[31,7936,2031616,520093696],bits:[128,256],createMethod:function(e,t){var r=f(e,t,"hex");r.create=function(r){return new E(e,t,r)},r.update=function(e,t){return r.create(t).update(e)};for(var n=0;n<c.length;++n){var i=c[n];r[i]=f(e,t,i);}return r}}],p={},v=[],m=0;m<d.length;++m)for(var y=d[m],g=y.bits,b=0;b<g.length;++b){var w=y.name+"_"+g[b];v.push(w),p[w]=y.createMethod(g[b],y.padding);}function E(e,t,r){this.blocks=[],this.s=[],this.padding=t,this.outputBits=r,this.reset=!0,this.block=0,this.start=0,this.blockCount=1600-(e<<1)>>5,this.byteCount=this.blockCount<<2,this.outputBlocks=r>>5,this.extraBytes=(31&r)>>3;for(var n=0;n<50;++n)this.s[n]=0;}E.prototype.update=function(e){var t="string"!=typeof e;t&&e.constructor===ArrayBuffer&&(e=new Uint8Array(e));for(var r,n,i=e.length,o=this.blocks,s=this.byteCount,u=this.blockCount,c=0,l=this.s;c<i;){if(this.reset)for(this.reset=!1,o[0]=this.block,r=1;r<u+1;++r)o[r]=0;if(t)for(r=this.start;c<i&&r<s;++c)o[r>>2]|=e[c]<<a[3&r++];else for(r=this.start;c<i&&r<s;++c)(n=e.charCodeAt(c))<128?o[r>>2]|=n<<a[3&r++]:(n<2048?o[r>>2]|=(192|n>>6)<<a[3&r++]:(n<55296||57344<=n?o[r>>2]|=(224|n>>12)<<a[3&r++]:(n=65536+((1023&n)<<10|1023&e.charCodeAt(++c)),o[r>>2]|=(240|n>>18)<<a[3&r++],o[r>>2]|=(128|n>>12&63)<<a[3&r++]),o[r>>2]|=(128|n>>6&63)<<a[3&r++]),o[r>>2]|=(128|63&n)<<a[3&r++]);if(s<=(this.lastByteIndex=r)){for(this.start=r-s,this.block=o[u],r=0;r<u;++r)l[r]^=o[r];_(l),this.reset=!0;}else this.start=r;}return this},E.prototype.finalize=function(){var e=this.blocks,t=this.lastByteIndex,r=this.blockCount,n=this.s;if(e[t>>2]|=this.padding[3&t],this.lastByteIndex===this.byteCount)for(e[0]=e[r],t=1;t<r+1;++t)e[t]=0;for(e[r-1]|=2147483648,t=0;t<r;++t)n[t]^=e[t];_(n);},E.prototype.toString=E.prototype.hex=function(){this.finalize();for(var e,t=this.blockCount,r=this.s,n=this.outputBlocks,i=this.extraBytes,a=0,s=0,u="";s<n;){for(a=0;a<t&&s<n;++a,++s)e=r[a],u+=o[e>>4&15]+o[15&e]+o[e>>12&15]+o[e>>8&15]+o[e>>20&15]+o[e>>16&15]+o[e>>28&15]+o[e>>24&15];s%t==0&&(_(r),a=0);}return i&&(e=r[a],0<i&&(u+=o[e>>4&15]+o[15&e]),1<i&&(u+=o[e>>12&15]+o[e>>8&15]),2<i&&(u+=o[e>>20&15]+o[e>>16&15])),u},E.prototype.buffer=E.prototype.arrayBuffer=function(){this.finalize();var e,t=this.blockCount,r=this.s,n=this.outputBlocks,i=this.extraBytes,o=0,a=0,s=this.outputBits>>3;e=i?new ArrayBuffer(n+1<<2):new ArrayBuffer(s);for(var u=new Uint32Array(e);a<n;){for(o=0;o<t&&a<n;++o,++a)u[a]=r[o];a%t==0&&_(r);}return i&&(u[o]=r[o],e=e.slice(0,s)),e},E.prototype.digest=E.prototype.array=function(){this.finalize();for(var e,t,r=this.blockCount,n=this.s,i=this.outputBlocks,o=this.extraBytes,a=0,s=0,u=[];s<i;){for(a=0;a<r&&s<i;++a,++s)e=s<<2,t=n[a],u[e]=255&t,u[e+1]=t>>8&255,u[e+2]=t>>16&255,u[e+3]=t>>24&255;s%r==0&&_(n);}return o&&(e=s<<2,t=n[a],0<o&&(u[e]=255&t),1<o&&(u[e+1]=t>>8&255),2<o&&(u[e+2]=t>>16&255)),u};var _=function(e){var t,r,n,i,o,a,u,c,l,f,h,d,p,v,m,y,g,b,w,E,_,S,A,T,N,x,M,I,O,R,P,k,C,L,D,U,B,F,j,G,V,z,H,q,W,Q,K,J,Z,X,$,Y,ee,te,re,ne,ie,oe,ae,se,ue,ce,le;for(n=0;n<48;n+=2)i=e[0]^e[10]^e[20]^e[30]^e[40],o=e[1]^e[11]^e[21]^e[31]^e[41],a=e[2]^e[12]^e[22]^e[32]^e[42],u=e[3]^e[13]^e[23]^e[33]^e[43],c=e[4]^e[14]^e[24]^e[34]^e[44],l=e[5]^e[15]^e[25]^e[35]^e[45],f=e[6]^e[16]^e[26]^e[36]^e[46],h=e[7]^e[17]^e[27]^e[37]^e[47],t=(d=e[8]^e[18]^e[28]^e[38]^e[48])^(a<<1|u>>>31),r=(p=e[9]^e[19]^e[29]^e[39]^e[49])^(u<<1|a>>>31),e[0]^=t,e[1]^=r,e[10]^=t,e[11]^=r,e[20]^=t,e[21]^=r,e[30]^=t,e[31]^=r,e[40]^=t,e[41]^=r,t=i^(c<<1|l>>>31),r=o^(l<<1|c>>>31),e[2]^=t,e[3]^=r,e[12]^=t,e[13]^=r,e[22]^=t,e[23]^=r,e[32]^=t,e[33]^=r,e[42]^=t,e[43]^=r,t=a^(f<<1|h>>>31),r=u^(h<<1|f>>>31),e[4]^=t,e[5]^=r,e[14]^=t,e[15]^=r,e[24]^=t,e[25]^=r,e[34]^=t,e[35]^=r,e[44]^=t,e[45]^=r,t=c^(d<<1|p>>>31),r=l^(p<<1|d>>>31),e[6]^=t,e[7]^=r,e[16]^=t,e[17]^=r,e[26]^=t,e[27]^=r,e[36]^=t,e[37]^=r,e[46]^=t,e[47]^=r,t=f^(i<<1|o>>>31),r=h^(o<<1|i>>>31),e[8]^=t,e[9]^=r,e[18]^=t,e[19]^=r,e[28]^=t,e[29]^=r,e[38]^=t,e[39]^=r,e[48]^=t,e[49]^=r,v=e[0],m=e[1],Q=e[11]<<4|e[10]>>>28,K=e[10]<<4|e[11]>>>28,I=e[20]<<3|e[21]>>>29,O=e[21]<<3|e[20]>>>29,se=e[31]<<9|e[30]>>>23,ue=e[30]<<9|e[31]>>>23,z=e[40]<<18|e[41]>>>14,H=e[41]<<18|e[40]>>>14,L=e[2]<<1|e[3]>>>31,D=e[3]<<1|e[2]>>>31,y=e[13]<<12|e[12]>>>20,g=e[12]<<12|e[13]>>>20,J=e[22]<<10|e[23]>>>22,Z=e[23]<<10|e[22]>>>22,R=e[33]<<13|e[32]>>>19,P=e[32]<<13|e[33]>>>19,ce=e[42]<<2|e[43]>>>30,le=e[43]<<2|e[42]>>>30,te=e[5]<<30|e[4]>>>2,re=e[4]<<30|e[5]>>>2,U=e[14]<<6|e[15]>>>26,B=e[15]<<6|e[14]>>>26,b=e[25]<<11|e[24]>>>21,w=e[24]<<11|e[25]>>>21,X=e[34]<<15|e[35]>>>17,$=e[35]<<15|e[34]>>>17,k=e[45]<<29|e[44]>>>3,C=e[44]<<29|e[45]>>>3,T=e[6]<<28|e[7]>>>4,N=e[7]<<28|e[6]>>>4,ne=e[17]<<23|e[16]>>>9,ie=e[16]<<23|e[17]>>>9,F=e[26]<<25|e[27]>>>7,j=e[27]<<25|e[26]>>>7,E=e[36]<<21|e[37]>>>11,_=e[37]<<21|e[36]>>>11,Y=e[47]<<24|e[46]>>>8,ee=e[46]<<24|e[47]>>>8,q=e[8]<<27|e[9]>>>5,W=e[9]<<27|e[8]>>>5,x=e[18]<<20|e[19]>>>12,M=e[19]<<20|e[18]>>>12,oe=e[29]<<7|e[28]>>>25,ae=e[28]<<7|e[29]>>>25,G=e[38]<<8|e[39]>>>24,V=e[39]<<8|e[38]>>>24,S=e[48]<<14|e[49]>>>18,A=e[49]<<14|e[48]>>>18,e[0]=v^~y&b,e[1]=m^~g&w,e[10]=T^~x&I,e[11]=N^~M&O,e[20]=L^~U&F,e[21]=D^~B&j,e[30]=q^~Q&J,e[31]=W^~K&Z,e[40]=te^~ne&oe,e[41]=re^~ie&ae,e[2]=y^~b&E,e[3]=g^~w&_,e[12]=x^~I&R,e[13]=M^~O&P,e[22]=U^~F&G,e[23]=B^~j&V,e[32]=Q^~J&X,e[33]=K^~Z&$,e[42]=ne^~oe&se,e[43]=ie^~ae&ue,e[4]=b^~E&S,e[5]=w^~_&A,e[14]=I^~R&k,e[15]=O^~P&C,e[24]=F^~G&z,e[25]=j^~V&H,e[34]=J^~X&Y,e[35]=Z^~$&ee,e[44]=oe^~se&ce,e[45]=ae^~ue&le,e[6]=E^~S&v,e[7]=_^~A&m,e[16]=R^~k&T,e[17]=P^~C&N,e[26]=G^~z&L,e[27]=V^~H&D,e[36]=X^~Y&q,e[37]=$^~ee&W,e[46]=se^~ce&te,e[47]=ue^~le&re,e[8]=S^~v&y,e[9]=A^~m&g,e[18]=k^~T&x,e[19]=C^~N&M,e[28]=z^~L&U,e[29]=H^~D&B,e[38]=Y^~q&Q,e[39]=ee^~W&K,e[48]=ce^~te&ne,e[49]=le^~re&ie,e[0]^=s[n],e[1]^=s[n+1];};if(i)t.exports=p;else for(m=0;m<v.length;++m)n[v[m]]=p[v[m]];}();}).call(this,e("_process"),void 0!==commonjsGlobal$1?commonjsGlobal$1:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});},{_process:42}],41:[function(e,t,r){(t.exports=function(e,t){if(!e)throw new Error(t||"Assertion failed")}).equal=function(e,t,r){if(e!=t)throw new Error(r||"Assertion failed: "+e+" != "+t)};},{}],42:[function(e,t,r){t.exports={browser:!0};},{}],43:[function(e,t,r){(function(e){function n(e){var t=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],r=1779033703,n=3144134277,i=1013904242,o=2773480762,a=1359893119,s=2600822924,u=528734635,c=1541459225,l=new Array(64);function f(e){for(var f=0,h=e.length;64<=h;){var d,p,v,m,y,g=r,b=n,w=i,E=o,_=a,S=s,A=u,T=c;for(p=0;p<16;p++)v=f+4*p,l[p]=(255&e[v])<<24|(255&e[v+1])<<16|(255&e[v+2])<<8|255&e[v+3];for(p=16;p<64;p++)m=((d=l[p-2])>>>17|d<<15)^(d>>>19|d<<13)^d>>>10,y=((d=l[p-15])>>>7|d<<25)^(d>>>18|d<<14)^d>>>3,l[p]=(m+l[p-7]|0)+(y+l[p-16]|0)|0;for(p=0;p<64;p++)m=(((_>>>6|_<<26)^(_>>>11|_<<21)^(_>>>25|_<<7))+(_&S^~_&A)|0)+(T+(t[p]+l[p]|0)|0)|0,y=((g>>>2|g<<30)^(g>>>13|g<<19)^(g>>>22|g<<10))+(g&b^g&w^b&w)|0,T=A,A=S,S=_,_=E+m|0,E=w,w=b,b=g,g=m+y|0;r=r+g|0,n=n+b|0,i=i+w|0,o=o+E|0,a=a+_|0,s=s+S|0,u=u+A|0,c=c+T|0,f+=64,h-=64;}}f(e);var h,d=e.length%64,p=e.length/536870912|0,v=e.length<<3,m=d<56?56:120,y=e.slice(e.length-d,e.length);for(y.push(128),h=1+d;h<m;h++)y.push(0);return y.push(p>>>24&255),y.push(p>>>16&255),y.push(p>>>8&255),y.push(p>>>0&255),y.push(v>>>24&255),y.push(v>>>16&255),y.push(v>>>8&255),y.push(v>>>0&255),f(y),[r>>>24&255,r>>>16&255,r>>>8&255,r>>>0&255,n>>>24&255,n>>>16&255,n>>>8&255,n>>>0&255,i>>>24&255,i>>>16&255,i>>>8&255,i>>>0&255,o>>>24&255,o>>>16&255,o>>>8&255,o>>>0&255,a>>>24&255,a>>>16&255,a>>>8&255,a>>>0&255,s>>>24&255,s>>>16&255,s>>>8&255,s>>>0&255,u>>>24&255,u>>>16&255,u>>>8&255,u>>>0&255,c>>>24&255,c>>>16&255,c>>>8&255,c>>>0&255]}function i(e,t,r){var i;e=e.length<=64?e:n(e);var o=64+t.length+4,a=new Array(o),s=new Array(64),u=[];for(i=0;i<64;i++)a[i]=54;for(i=0;i<e.length;i++)a[i]^=e[i];for(i=0;i<t.length;i++)a[64+i]=t[i];for(i=o-4;i<o;i++)a[i]=0;for(i=0;i<64;i++)s[i]=92;for(i=0;i<e.length;i++)s[i]^=e[i];function c(){for(var e=o-1;o-4<=e;e--){if(a[e]++,a[e]<=255)return;a[e]=0;}}for(;32<=r;)c(),u=u.concat(n(s.concat(n(a)))),r-=32;return 0<r&&(c(),u=u.concat(n(s.concat(n(a))).slice(0,r))),u}function o(e,t,r,n,i){var o;for(c(e,16*(2*r-1),i,0,16),o=0;o<2*r;o++)u(e,16*o,i,16),s(i,n),c(i,0,e,t+16*o,16);for(o=0;o<r;o++)c(e,t+2*o*16,e,16*o,16);for(o=0;o<r;o++)c(e,t+16*(2*o+1),e,16*(o+r),16);}function a(e,t){return e<<t|e>>>32-t}function s(e,t){c(e,0,t,0,16);for(var r=8;0<r;r-=2)t[4]^=a(t[0]+t[12],7),t[8]^=a(t[4]+t[0],9),t[12]^=a(t[8]+t[4],13),t[0]^=a(t[12]+t[8],18),t[9]^=a(t[5]+t[1],7),t[13]^=a(t[9]+t[5],9),t[1]^=a(t[13]+t[9],13),t[5]^=a(t[1]+t[13],18),t[14]^=a(t[10]+t[6],7),t[2]^=a(t[14]+t[10],9),t[6]^=a(t[2]+t[14],13),t[10]^=a(t[6]+t[2],18),t[3]^=a(t[15]+t[11],7),t[7]^=a(t[3]+t[15],9),t[11]^=a(t[7]+t[3],13),t[15]^=a(t[11]+t[7],18),t[1]^=a(t[0]+t[3],7),t[2]^=a(t[1]+t[0],9),t[3]^=a(t[2]+t[1],13),t[0]^=a(t[3]+t[2],18),t[6]^=a(t[5]+t[4],7),t[7]^=a(t[6]+t[5],9),t[4]^=a(t[7]+t[6],13),t[5]^=a(t[4]+t[7],18),t[11]^=a(t[10]+t[9],7),t[8]^=a(t[11]+t[10],9),t[9]^=a(t[8]+t[11],13),t[10]^=a(t[9]+t[8],18),t[12]^=a(t[15]+t[14],7),t[13]^=a(t[12]+t[15],9),t[14]^=a(t[13]+t[12],13),t[15]^=a(t[14]+t[13],18);for(r=0;r<16;++r)e[r]+=t[r];}function u(e,t,r,n){for(var i=0;i<n;i++)r[i]^=e[t+i];}function c(e,t,r,n,i){for(;i--;)r[n++]=e[t++];}function l(e){if(!e||"number"!=typeof e.length)return !1;for(var t=0;t<e.length;t++){if("number"!=typeof e[t])return !1;var r=parseInt(e[t]);if(r!=e[t]||r<0||256<=r)return !1}return !0}function f(e,t){var r=parseInt(e);if(e!=r)throw new Error("invalid "+t);return r}function h(t,r,n,a,s,h,d){if(!d)throw new Error("missing callback");if(n=f(n,"N"),a=f(a,"r"),s=f(s,"p"),h=f(h,"dkLen"),0===n||0!=(n&n-1))throw new Error("N must be power of 2");if(p/128/a<n)throw new Error("N too large");if(p/128/s<a)throw new Error("r too large");if(!l(t))throw new Error("password must be an array or buffer");if(t=Array.prototype.slice.call(t),!l(r))throw new Error("salt must be an array or buffer");r=Array.prototype.slice.call(r);for(var v=i(t,r,128*s*a),m=new Uint32Array(32*s*a),y=0;y<m.length;y++){var g=4*y;m[y]=(255&v[3+g])<<24|(255&v[2+g])<<16|(255&v[1+g])<<8|(255&v[0+g])<<0;}var b,w,E=new Uint32Array(64*a),_=new Uint32Array(32*a*n),S=32*a,A=new Uint32Array(16),T=new Uint32Array(16),N=s*n*2,x=0,M=null,I=!1,O=0,R=0,P=parseInt(1e3/a),k=void 0!==e?e:setTimeout,C=function(){if(I)return d(new Error("cancelled"),x/N);switch(O){case 0:c(m,w=32*R*a,E,0,S),O=1,b=0;case 1:P<(r=n-b)&&(r=P);for(var e=0;e<r;e++)c(E,0,_,(b+e)*S,S),o(E,S,a,A,T);if(b+=r,x+=r,(l=parseInt(1e3*x/N))!==M){if(I=d(null,x/N))break;M=l;}if(b<n)break;b=0,O=2;case 2:var r,l;for(P<(r=n-b)&&(r=P),e=0;e<r;e++){var f=E[16*(2*a-1)]&n-1;u(_,f*S,E,S),o(E,S,a,A,T);}if(b+=r,x+=r,(l=parseInt(1e3*x/N))!==M){if(I=d(null,x/N))break;M=l;}if(b<n)break;if(c(E,0,m,w,S),++R<s){O=0;break}for(v=[],e=0;e<m.length;e++)v.push(m[e]>>0&255),v.push(m[e]>>8&255),v.push(m[e]>>16&255),v.push(m[e]>>24&255);var p=i(t,v,h);return d(null,1,p)}k(C);};C();}var d,p;d=this,p=2147483647,void 0!==r?t.exports=h:d&&(d.scrypt&&(d._scrypt=d.scrypt),d.scrypt=h);}).call(this,e("timers").setImmediate);},{timers:45}],44:[function(e,t,r){(function(e,t,r){!function(t,r){if(!t.setImmediate){var n,i,o,a,s=1,u={},c=!1,l=t.document,f=Object.getPrototypeOf&&Object.getPrototypeOf(t);f=f&&f.setTimeout?f:t,n="[object process]"==={}.toString.call(t.process)?function(){var t=h(arguments);return e.nextTick(d(p,t)),t}:function(){if(t.postMessage&&!t.importScripts){var e=!0,r=t.onmessage;return t.onmessage=function(){e=!1;},t.postMessage("","*"),t.onmessage=r,e}}()?(a="setImmediate$"+Math.random()+"$",t.addEventListener?t.addEventListener("message",m,!1):t.attachEvent("onmessage",m),function(){var e=h(arguments);return t.postMessage(a+e,"*"),e}):t.MessageChannel?((o=new MessageChannel).port1.onmessage=function(e){p(e.data);},function(){var e=h(arguments);return o.port2.postMessage(e),e}):l&&"onreadystatechange"in l.createElement("script")?(i=l.documentElement,function(){var e=h(arguments),t=l.createElement("script");return t.onreadystatechange=function(){p(e),t.onreadystatechange=null,i.removeChild(t),t=null;},i.appendChild(t),e}):function(){var e=h(arguments);return setTimeout(d(p,e),0),e},f.setImmediate=n,f.clearImmediate=v;}function h(e){return u[s]=d.apply(r,e),s++}function d(e){var t=[].slice.call(arguments,1);return function(){"function"==typeof e?e.apply(r,t):new Function(""+e)();}}function p(e){if(c)setTimeout(d(p,e),0);else{var t=u[e];if(t){c=!0;try{t();}finally{v(e),c=!1;}}}}function v(e){delete u[e];}function m(e){e.source===t&&"string"==typeof e.data&&0===e.data.indexOf(a)&&p(+e.data.slice(a.length));}}("undefined"==typeof self?void 0===t?this:t:self);}).call(this,e("_process"),void 0!==commonjsGlobal$1?commonjsGlobal$1:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("timers").clearImmediate);},{_process:42,timers:45}],45:[function(e,t,r){(function(e){t.exports={setImmediate:e.setImmediate};}).call(this,void 0!==commonjsGlobal$1?commonjsGlobal$1:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});},{}],46:[function(e,t,r){(function(e){var r;if(e.crypto&&crypto.getRandomValues){var n=new Uint8Array(16);r=function(){return crypto.getRandomValues(n),n};}if(!r){var i=new Array(16);r=function(){for(var e,t=0;t<16;t++)0==(3&t)&&(e=4294967296*Math.random()),i[t]=e>>>((3&t)<<3)&255;return i};}t.exports=r;}).call(this,void 0!==commonjsGlobal$1?commonjsGlobal$1:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});},{}],47:[function(e,t,r){for(var n=e("./rng"),i=[],o={},a=0;a<256;a++)i[a]=(a+256).toString(16).substr(1),o[i[a]]=a;function s(e,t){var r=t||0,n=i;return n[e[r++]]+n[e[r++]]+n[e[r++]]+n[e[r++]]+"-"+n[e[r++]]+n[e[r++]]+"-"+n[e[r++]]+n[e[r++]]+"-"+n[e[r++]]+n[e[r++]]+"-"+n[e[r++]]+n[e[r++]]+n[e[r++]]+n[e[r++]]+n[e[r++]]+n[e[r++]]}var u=n(),c=[1|u[0],u[1],u[2],u[3],u[4],u[5]],l=16383&(u[6]<<8|u[7]),f=0,h=0;function d(e,t,r){var i=t&&r||0;"string"==typeof e&&(t="binary"==e?new Array(16):null,e=null);var o=(e=e||{}).random||(e.rng||n)();if(o[6]=15&o[6]|64,o[8]=63&o[8]|128,t)for(var a=0;a<16;a++)t[i+a]=o[a];return t||s(o)}var p=d;p.v1=function(e,t,r){var n=t&&r||0,i=t||[],o=void 0!==(e=e||{}).clockseq?e.clockseq:l,a=void 0!==e.msecs?e.msecs:(new Date).getTime(),u=void 0!==e.nsecs?e.nsecs:h+1,d=a-f+(u-h)/1e4;if(d<0&&void 0===e.clockseq&&(o=o+1&16383),(d<0||f<a)&&void 0===e.nsecs&&(u=0),1e4<=u)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");f=a,l=o;var p=(1e4*(268435455&(a+=122192928e5))+(h=u))%4294967296;i[n++]=p>>>24&255,i[n++]=p>>>16&255,i[n++]=p>>>8&255,i[n++]=255&p;var v=a/4294967296*1e4&268435455;i[n++]=v>>>8&255,i[n++]=255&v,i[n++]=v>>>24&15|16,i[n++]=v>>>16&255,i[n++]=o>>>8|128,i[n++]=255&o;for(var m=e.node||c,y=0;y<6;y++)i[n+y]=m[y];return t||s(i)},p.v4=d,p.parse=function(e,t,r){var n=t&&r||0,i=0;for(t=t||[],e.toLowerCase().replace(/[0-9a-f]{2}/g,function(e){i<16&&(t[n+i++]=o[e]);});i<16;)t[n+i++]=0;return t},p.unparse=s,t.exports=p;},{"./rng":46}],48:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0});try{t.exports.XMLHttpRequest=XMLHttpRequest;}catch(e){console.log("Warning: XMLHttpRequest is not defined"),t.exports.XMLHttpRequest=null;}},{}],49:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0});var n=e("../utils/properties"),i=(o.isProvider=function(e){return n.isType(e,"Provider")},o);function o(){n.setType(this,"Provider");}r.Provider=i;},{"../utils/properties":73}],50:[function(e,t,r){var n,i=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t;}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);},function(e,t){function r(){this.constructor=e;}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r);}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var a=e("../utils/address"),s=e("../utils/bignumber"),u=e("../utils/bytes"),c=e("../constants"),l=e("../utils/hash"),f=e("../utils/networks"),h=e("../utils/properties"),d=e("../utils/rlp"),p=e("../utils/transaction"),v=e("../utils/utf8"),m=e("../utils/web"),y=o(e("../errors")),g=e("./abstract-provider");function b(e,t){var r={};for(var n in e)try{var i=e[n](t[n]);void 0!==i&&(r[n]=i);}catch(e){throw e.checkKey=n,e.checkValue=t[n],e}return r}function w(e,t){return function(r){return null==r?t:e(r)}}function E(e){return function(t){if(!Array.isArray(t))throw new Error("not an array");var r=[];return t.forEach(function(t){r.push(e(t));}),r}}function _(e,t){return "string"==typeof e&&(t||"0x"===e.substring(0,2)||(e="0x"+e),32===u.hexDataLength(e))?e.toLowerCase():(y.throwError("invalid hash",y.INVALID_ARGUMENT,{arg:"hash",value:e}),null)}function S(e){return s.bigNumberify(e).toNumber()}function A(e){if(!u.isHexString(e))throw new Error("invalid uint256");for(;e.length<66;)e="0x0"+e.substring(2);return e}function T(e){if(null==e)return "latest";if("earliest"===e)return "0x0";if("latest"===e||"pending"===e)return e;if("number"==typeof e)return u.hexStripZeros(u.hexlify(e));if(u.isHexString(e))return u.hexStripZeros(e);throw new Error("invalid blockTag")}var N={hash:_,blockHash:w(_,null),blockNumber:w(S,null),transactionIndex:w(S,null),confirmations:w(S,null),from:a.getAddress,gasPrice:s.bigNumberify,gasLimit:s.bigNumberify,to:w(a.getAddress,null),value:s.bigNumberify,nonce:S,data:u.hexlify,r:w(A),s:w(A),v:w(S),creates:w(a.getAddress,null),raw:w(u.hexlify)};function x(e){if(null!=e.gas&&null==e.gasLimit&&(e.gasLimit=e.gas),e.to&&s.bigNumberify(e.to).isZero()&&(e.to="0x0000000000000000000000000000000000000000"),null!=e.input&&null==e.data&&(e.data=e.input),null==e.to&&null==e.creates&&(e.creates=a.getContractAddress(e)),!e.raw&&e.v&&e.r&&e.s){var t=[u.stripZeros(u.hexlify(e.nonce)),u.stripZeros(u.hexlify(e.gasPrice)),u.stripZeros(u.hexlify(e.gasLimit)),e.to||"0x",u.stripZeros(u.hexlify(e.value||"0x")),u.hexlify(e.data||"0x"),u.stripZeros(u.hexlify(e.v||"0x")),u.stripZeros(u.hexlify(e.r)),u.stripZeros(u.hexlify(e.s))];e.raw=d.encode(t);}var r=b(N,e),n=e.networkId;return null!=e.chainId&&null==n&&null==r.v&&(n=e.chainId),u.isHexString(n)&&(n=s.bigNumberify(n).toNumber()),"number"!=typeof n&&null!=r.v&&((n=(r.v-35)/2)<0&&(n=0),n=parseInt(n)),"number"!=typeof n&&(n=0),r.networkId=n,r.blockHash&&"x"===r.blockHash.replace(/0/g,"")&&(r.blockHash=null),r}var M={hash:_,parentHash:_,number:S,timestamp:S,nonce:w(u.hexlify),difficulty:function(e){var t=s.bigNumberify(e);try{return t.toNumber()}catch(e){}return null},gasLimit:s.bigNumberify,gasUsed:s.bigNumberify,miner:a.getAddress,extraData:u.hexlify,transactions:w(E(_))},I=h.shallowCopy(M);function O(e,t){return null!=e.author&&null==e.miner&&(e.miner=e.author),b(t?I:M,e)}I.transactions=w(E(x));var R={from:w(a.getAddress),nonce:w(S),gasLimit:w(s.bigNumberify),gasPrice:w(s.bigNumberify),to:w(a.getAddress),value:w(s.bigNumberify),data:w(u.hexlify)};function P(e){return b(R,e)}var k={transactionLogIndex:w(S),transactionIndex:S,blockNumber:S,transactionHash:_,address:a.getAddress,topics:E(_),data:u.hexlify,logIndex:S,blockHash:_},C={to:w(a.getAddress,null),from:w(a.getAddress,null),contractAddress:w(a.getAddress,null),transactionIndex:S,root:w(_),gasUsed:s.bigNumberify,logsBloom:w(u.hexlify),blockHash:_,transactionHash:_,logs:E(function(e){return b(k,e)}),blockNumber:S,confirmations:w(S,null),cumulativeGasUsed:s.bigNumberify,status:w(S)};function L(e){return Array.isArray(e)?e.forEach(function(e){L(e);}):null!=e&&_(e),e}var D,U={fromBlock:w(T,void 0),toBlock:w(T,void 0),address:w(a.getAddress,void 0),topics:w(L,void 0)},B={blockHash:w(_,void 0),address:w(a.getAddress,void 0),topics:w(L,void 0)},F={blockNumber:w(S),blockHash:w(_),transactionIndex:S,removed:w(function(e){if("boolean"==typeof e)return e;if("string"==typeof e){if("true"===e)return !0;if("false"===e)return !1}throw new Error("invaid boolean - "+e)}),address:a.getAddress,data:(D=u.hexlify,function(e){return e?D(e):"0x"}),topics:E(_),transactionHash:_,logIndex:S};function j(e){return b(F,e)}function G(e){return e.map(function(e){return "string"==typeof e?e:Array.isArray(e)?(e.forEach(function(e){null!==e&&32!==u.hexDataLength(e)&&y.throwError("invalid topic",y.INVALID_ARGUMENT,{argument:"topic",value:e});}),e.join(",")):null===e?"":y.throwError("invalid topic value",y.INVALID_ARGUMENT,{argument:"topic",value:e})}).join("&")}function V(e){if("string"==typeof e){if(20===u.hexDataLength(e))return "address:"+a.getAddress(e);if(e=e.toLowerCase(),32===u.hexDataLength(e))return "tx:"+e;if(-1===e.indexOf(":"))return e}else{if(Array.isArray(e))return "filter::"+G(e);if(e&&"object"==typeof e)return "filter:"+(e.address||"")+":"+G(e.topics||[])}throw new Error("invalid event - "+e)}function z(){return (new Date).getTime()}var H,q=(i(W,H=g.Provider),W.prototype._doPoll=function(){var e=this;this.getBlockNumber().then(function(t){if(e._setFastBlockNumber(t),t!==e._lastBlockNumber){-2===e._emitted.block&&(e._emitted.block=t-1);for(var r=e._emitted.block+1;r<=t;r++)e.emit("block",r);e._emitted.block!==t&&(e._emitted.block=t,Object.keys(e._emitted).forEach(function(r){if("block"!==r){var n=e._emitted[r];"pending"!==n&&12<t-n&&delete e._emitted[r];}})),-2===e._lastBlockNumber&&(e._lastBlockNumber=t-1);var n={},i={};return e._events.forEach(function(e){i[e.tag]=!0;}),Object.keys(i).forEach(function(r){var i=r.split(":");switch(i[0]){case"tx":var o=i[1];e.getTransactionReceipt(o).then(function(t){return t&&null!=t.blockNumber&&(e._emitted["t:"+o]=t.blockNumber,e.emit(o,t)),null}).catch(function(t){e.emit("error",t);});break;case"address":var a=i[1];e._balances[a]&&(n[a]=e._balances[a]),e.getBalance(a,"latest").then(function(t){var r=e._balances[a];if(!r||!t.eq(r))return e._balances[a]=t,e.emit(a,t),null}).catch(function(t){e.emit("error",t);});break;case"filter":var s=i[2].split(/&/g).map(function(e){var t=e.split(",");return 1===t.length?""===t[0]?null:e:t.map(function(e){return ""===e?null:e})}),u={address:i[1],fromBlock:e._lastBlockNumber+1,toBlock:t,topics:s};u.address||delete u.address,e.getLogs(u).then(function(t){if(0!==t.length)return t.forEach(function(t){e._emitted["b:"+t.blockHash]=t.blockNumber,e._emitted["t:"+t.transactionHash]=t.blockNumber,e.emit(u,t);}),null}).catch(function(t){e.emit("error",t);});}}),e._lastBlockNumber=t,e._balances=n,null}}).catch(function(e){}),this.doPoll();},W.prototype.resetEventsBlock=function(e){this._lastBlockNumber=e-1,this.polling&&this._doPoll();},Object.defineProperty(W.prototype,"network",{get:function(){return this._network},enumerable:!0,configurable:!0}),W.prototype.getNetwork=function(){return this.ready},Object.defineProperty(W.prototype,"blockNumber",{get:function(){return this._fastBlockNumber},enumerable:!0,configurable:!0}),Object.defineProperty(W.prototype,"polling",{get:function(){return null!=this._poller},set:function(e){var t=this;setTimeout(function(){e&&!t._poller?t._poller=setInterval(t._doPoll.bind(t),t.pollingInterval):!e&&t._poller&&(clearInterval(t._poller),t._poller=null);},0);},enumerable:!0,configurable:!0}),Object.defineProperty(W.prototype,"pollingInterval",{get:function(){return this._pollingInterval},set:function(e){var t=this;if("number"!=typeof e||e<=0||parseInt(String(e))!=e)throw new Error("invalid polling interval");this._pollingInterval=e,this._poller&&(clearInterval(this._poller),this._poller=setInterval(function(){t._doPoll();},this._pollingInterval));},enumerable:!0,configurable:!0}),W.prototype._getFastBlockNumber=function(){var e=this,t=z();return t-this._fastQueryDate>2*this._pollingInterval&&(this._fastQueryDate=t,this._fastBlockNumberPromise=this.getBlockNumber().then(function(t){return (null==e._fastBlockNumber||t>e._fastBlockNumber)&&(e._fastBlockNumber=t),e._fastBlockNumber})),this._fastBlockNumberPromise},W.prototype._setFastBlockNumber=function(e){null!=this._fastBlockNumber&&e<this._fastBlockNumber||(this._fastQueryDate=z(),(null==this._fastBlockNumber||e>this._fastBlockNumber)&&(this._fastBlockNumber=e,this._fastBlockNumberPromise=Promise.resolve(e)));},W.prototype.waitForTransaction=function(e,t){var r=this;return null==t&&(t=1),this.getTransactionReceipt(e).then(function(n){return 0===t||n&&n.confirmations>=t?n:new Promise(function(n){var i=function(o){o.confirmations<t||(r.removeListener(e,i),n(o));};r.on(e,i);})})},W.prototype.getBlockNumber=function(){var e=this;return this.ready.then(function(){return e.perform("getBlockNumber",{}).then(function(t){var r=parseInt(t);if(r!=t)throw new Error("invalid response - getBlockNumber");return e._setFastBlockNumber(r),r})})},W.prototype.getGasPrice=function(){var e=this;return this.ready.then(function(){return e.perform("getGasPrice",{}).then(function(e){return s.bigNumberify(e)})})},W.prototype.getBalance=function(e,t){var r=this;return this.ready.then(function(){return h.resolveProperties({addressOrName:e,blockTag:t}).then(function(e){var t=e.addressOrName,n=e.blockTag;return r._getAddress(t).then(function(e){var t={address:e,blockTag:T(n)};return r.perform("getBalance",t).then(function(e){return s.bigNumberify(e)})})})})},W.prototype.getTransactionCount=function(e,t){var r=this;return this.ready.then(function(){return h.resolveProperties({addressOrName:e,blockTag:t}).then(function(e){var t=e.addressOrName,n=e.blockTag;return r._getAddress(t).then(function(e){var t={address:e,blockTag:T(n)};return r.perform("getTransactionCount",t).then(function(e){return s.bigNumberify(e).toNumber()})})})})},W.prototype.getCode=function(e,t){var r=this;return this.ready.then(function(){return h.resolveProperties({addressOrName:e,blockTag:t}).then(function(e){var t=e.addressOrName,n=e.blockTag;return r._getAddress(t).then(function(e){var t={address:e,blockTag:T(n)};return r.perform("getCode",t).then(function(e){return u.hexlify(e)})})})})},W.prototype.getStorageAt=function(e,t,r){var n=this;return this.ready.then(function(){return h.resolveProperties({addressOrName:e,position:t,blockTag:r}).then(function(e){var t=e.addressOrName,r=e.position,i=e.blockTag;return n._getAddress(t).then(function(e){var t={address:e,blockTag:T(i),position:u.hexStripZeros(u.hexlify(r))};return n.perform("getStorageAt",t).then(function(e){return u.hexlify(e)})})})})},W.prototype.sendTransaction=function(e){var t=this;return this.ready.then(function(){return h.resolveProperties({signedTransaction:e}).then(function(e){var r=e.signedTransaction,n={signedTransaction:u.hexlify(r)};return t.perform("sendTransaction",n).then(function(e){return t._wrapTransaction(p.parse(r),e)},function(e){throw e.transaction=p.parse(r),e.transaction.hash&&(e.transactionHash=e.transaction.hash),e})})})},W.prototype._wrapTransaction=function(e,t){var r=this;if(null!=t&&32!==u.hexDataLength(t))throw new Error("invalid response - sendTransaction");var n=e;return null!=t&&e.hash!==t&&y.throwError("Transaction hash mismatch from Provider.sendTransaction.",y.UNKNOWN_ERROR,{expectedHash:e.hash,returnedHash:t}),n.wait=function(t){return 0!==t&&(r._emitted["t:"+e.hash]="pending"),r.waitForTransaction(e.hash,t).then(function(n){return null==n&&0===t?null:(r._emitted["t:"+e.hash]=n.blockNumber,0===n.status&&y.throwError("transaction failed",y.CALL_EXCEPTION,{transactionHash:e.hash,transaction:e}),n)})},n},W.prototype.call=function(e,t){var r=this,n=h.shallowCopy(e);return this.ready.then(function(){return h.resolveProperties({blockTag:t,tx:n}).then(function(e){var t=e.blockTag,n=e.tx;return r._resolveNames(n,["to","from"]).then(function(e){var n={blockTag:T(t),transaction:P(e)};return r.perform("call",n).then(function(e){return u.hexlify(e)})})})})},W.prototype.estimateGas=function(e){var t=this,r={to:e.to,from:e.from,data:e.data,gasPrice:e.gasPrice,value:e.value};return this.ready.then(function(){return h.resolveProperties(r).then(function(e){return t._resolveNames(e,["to","from"]).then(function(e){var r={transaction:P(e)};return t.perform("estimateGas",r).then(function(e){return s.bigNumberify(e)})})})})},W.prototype.getBlock=function(e,t){var r=this;return this.ready.then(function(){return h.resolveProperties({blockHashOrBlockTag:e}).then(function(e){var n=e.blockHashOrBlockTag;try{var i=u.hexlify(n);if(32===u.hexDataLength(i))return m.poll(function(){return r.perform("getBlock",{blockHash:i,includeTransactions:!!t}).then(function(e){return null==e?null==r._emitted["b:"+i]?null:void 0:O(e,t)})},{onceBlock:r})}catch(e){}try{var o=-128,a=T(n);return u.isHexString(a)&&(o=parseInt(a.substring(2),16)),m.poll(function(){return r.perform("getBlock",{blockTag:a,includeTransactions:!!t}).then(function(e){return null!=e?O(e,t):o<=r._emitted.block?void 0:null})},{onceBlock:r})}catch(e){}throw new Error("invalid block hash or block tag")})})},W.prototype.getTransaction=function(e){var t=this;return this.ready.then(function(){return h.resolveProperties({transactionHash:e}).then(function(e){var r=e.transactionHash,n={transactionHash:_(r,!0)};return m.poll(function(){return t.perform("getTransaction",n).then(function(e){if(null==e)return null==t._emitted["t:"+r]?null:void 0;var n=W.checkTransactionResponse(e);if(null==n.blockNumber)n.confirmations=0;else if(null==n.confirmations)return t._getFastBlockNumber().then(function(e){var r=e-n.blockNumber+1;return r<=0&&(r=1),n.confirmations=r,t._wrapTransaction(n)});return t._wrapTransaction(n)})},{onceBlock:t})})})},W.prototype.getTransactionReceipt=function(e){var t=this;return this.ready.then(function(){return h.resolveProperties({transactionHash:e}).then(function(e){var r=e.transactionHash,n={transactionHash:_(r,!0)};return m.poll(function(){return t.perform("getTransactionReceipt",n).then(function(e){if(null==e)return null==t._emitted["t:"+r]?null:void 0;if(null!=e.blockHash){var n=function(e){var t=b(C,e);return t.logs.forEach(function(e,t){null==e.transactionLogIndex&&(e.transactionLogIndex=t);}),null!=e.status&&(t.byzantium=!0),t}(e);if(null==n.blockNumber)n.confirmations=0;else if(null==n.confirmations)return t._getFastBlockNumber().then(function(e){var t=e-n.blockNumber+1;return t<=0&&(t=1),n.confirmations=t,n});return n}})},{onceBlock:t})})})},W.prototype.getLogs=function(e){var t=this;return this.ready.then(function(){return h.resolveProperties(e).then(function(e){return t._resolveNames(e,["address"]).then(function(e){var r={filter:function(e){return e&&e.blockHash?b(B,e):b(U,e)}(e)};return t.perform("getLogs",r).then(function(e){return E(j)(e)})})})})},W.prototype.getEtherPrice=function(){var e=this;return this.ready.then(function(){return e.perform("getEtherPrice",{}).then(function(e){return e})})},W.prototype._getAddress=function(e){return this.resolveName(e).then(function(t){return null==t&&y.throwError("ENS name not configured",y.UNSUPPORTED_OPERATION,{operation:"resolveName("+JSON.stringify(e)+")"}),t})},W.prototype._resolveNames=function(e,t){var r=[],n=h.shallowCopy(e);return t.forEach(function(e){null!=n[e]&&r.push(this._getAddress(n[e]).then(function(t){n[e]=t;}));},this),Promise.all(r).then(function(){return n})},W.prototype._getResolver=function(e){var t=this;return this.getNetwork().then(function(r){r.ensAddress||y.throwError("network does support ENS",y.UNSUPPORTED_OPERATION,{operation:"ENS",network:r.name});var n="0x0178b8bf"+l.namehash(e).substring(2),i={to:r.ensAddress,data:n};return t.call(i).then(function(e){if(32!==u.hexDataLength(e))return null;var t=a.getAddress(u.hexDataSlice(e,12));return t===c.AddressZero?null:t})})},W.prototype.resolveName=function(e){var t=this;if(e instanceof Promise)return e.then(function(e){return t.resolveName(e)});try{return Promise.resolve(a.getAddress(e))}catch(e){}var r=this,n=l.namehash(e);return this._getResolver(e).then(function(e){if(null==e)return null;var t={to:e,data:"0x3b3b57de"+n.substring(2)};return r.call(t)}).then(function(e){if(32!==u.hexDataLength(e))return null;var t=a.getAddress(u.hexDataSlice(e,12));return t===c.AddressZero?null:t})},W.prototype.lookupAddress=function(e){var t=this;if(e instanceof Promise)return e.then(function(e){return t.lookupAddress(e)});var r=(e=a.getAddress(e)).substring(2)+".addr.reverse",n=l.namehash(r),i=this;return this._getResolver(r).then(function(e){if(!e)return null;var t={to:e,data:"0x691f3431"+n.substring(2)};return i.call(t)}).then(function(t){if((t=t.substring(2)).length<64)return null;if((t=t.substring(64)).length<64)return null;var r=s.bigNumberify("0x"+t.substring(0,64)).toNumber();if(2*r>(t=t.substring(64)).length)return null;var n=v.toUtf8String("0x"+t.substring(0,2*r));return i.resolveName(n).then(function(t){return t!=e?null:n})})},W.checkTransactionResponse=function(e){return x(e)},W.prototype.doPoll=function(){},W.prototype.perform=function(e,t){return y.throwError(e+" not implemented",y.NOT_IMPLEMENTED,{operation:e}),null},W.prototype._startPending=function(){y.warn("WARNING: this provider does not support pending events");},W.prototype._stopPending=function(){},W.prototype._addEventListener=function(e,t,r){this._events.push({tag:V(e),listener:t,once:r}),"pending"===e&&this._startPending(),this.polling=!0;},W.prototype.on=function(e,t){return this._addEventListener(e,t,!1),this},W.prototype.once=function(e,t){return this._addEventListener(e,t,!0),this},W.prototype.addEventListener=function(e,t){return this.on(e,t)},W.prototype.emit=function(e){for(var t=this,r=[],n=1;n<arguments.length;n++)r[n-1]=arguments[n];var i=!1,o=V(e);return this._events=this._events.filter(function(e){return e.tag!==o||(setTimeout(function(){e.listener.apply(t,r);},0),i=!0,!e.once)}),0===this.listenerCount()&&(this.polling=!1),i},W.prototype.listenerCount=function(e){if(!e)return this._events.length;var t=V(e);return this._events.filter(function(e){return e.tag===t}).length},W.prototype.listeners=function(e){var t=V(e);return this._events.filter(function(e){return e.tag===t}).map(function(e){return e.listener})},W.prototype.removeAllListeners=function(e){if(null==e)this._events=[],this._stopPending();else{var t=V(e);this._events=this._events.filter(function(e){return e.tag!==t}),"pending"===e&&this._stopPending();}return 0===this._events.length&&(this.polling=!1),this},W.prototype.removeListener=function(e,t){var r=!1,n=V(e);return this._events=this._events.filter(function(e){return e.tag!==n||e.listener!=t||!!r||!(r=!0)}),"pending"===e&&0===this.listenerCount("pending")&&this._stopPending(),0===this.listenerCount()&&(this.polling=!1),this},W);function W(e){var t=H.call(this)||this;if(y.checkNew(t,g.Provider),e instanceof Promise)h.defineReadOnly(t,"ready",e.then(function(e){return h.defineReadOnly(t,"_network",e),e})),t.ready.catch(function(e){});else{var r=f.getNetwork(null==e?"homestead":e);r?(h.defineReadOnly(t,"_network",r),h.defineReadOnly(t,"ready",Promise.resolve(t._network))):y.throwError("invalid network",y.INVALID_ARGUMENT,{arg:"network",value:e});}return t._lastBlockNumber=-2,t._balances={},t._events=[],t._pollingInterval=4e3,t._emitted={block:-2},t._fastQueryDate=0,t}r.BaseProvider=q,h.defineReadOnly(g.Provider,"inherits",h.inheritable(g.Provider));},{"../constants":3,"../errors":5,"../utils/address":59,"../utils/bignumber":62,"../utils/bytes":63,"../utils/hash":64,"../utils/networks":71,"../utils/properties":73,"../utils/rlp":75,"../utils/transaction":82,"../utils/utf8":84,"../utils/web":85,"./abstract-provider":49}],51:[function(e,t,r){var n,i=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t;}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);},function(e,t){function r(){this.constructor=e;}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r);}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var a=e("./base-provider"),s=e("../utils/bytes"),u=e("../utils/properties"),c=e("../utils/web"),l=o(e("../errors"));function f(e){var t=[];for(var r in e)if(null!=e[r]){var n=s.hexlify(e[r]);!{gasLimit:!0,gasPrice:!0,nonce:!0,value:!0}[r]||(n=s.hexStripZeros(n)),t.push(r+"="+n);}return t.join("&")}function h(e){if(0==e.status&&("No records found"===e.message||"No transactions found"===e.message))return e.result;if(1==e.status&&"OK"==e.message)return e.result;var t=new Error("invalid response");throw t.result=JSON.stringify(e),t}function d(e){if("2.0"!=e.jsonrpc)throw(t=new Error("invalid response")).result=JSON.stringify(e),t;if(e.error){var t=new Error(e.error.message||"unknown error");throw e.error.code&&(t.code=e.error.code),e.error.data&&(t.data=e.error.data),t}return e.result}function p(e){if("pending"===e)throw new Error("pending not supported");return "latest"===e?e:parseInt(e.substring(2),16)}var v,m=(i(y,v=a.BaseProvider),y.prototype.perform=function(e,t){var r=this,n=this.baseUrl,i="";function o(e,t){return c.fetchJson(e,null,t||d).then(function(t){return r.emit("debug",{action:"perform",request:e,response:t,provider:r}),t})}switch(this.apiKey&&(i+="&apikey="+this.apiKey),e){case"getBlockNumber":return o(n+="/api?module=proxy&action=eth_blockNumber"+i);case"getGasPrice":return o(n+="/api?module=proxy&action=eth_gasPrice"+i);case"getBalance":return n+="/api?module=account&action=balance&address="+t.address,o(n+="&tag="+t.blockTag+i,h);case"getTransactionCount":return n+="/api?module=proxy&action=eth_getTransactionCount&address="+t.address,o(n+="&tag="+t.blockTag+i);case"getCode":return n+="/api?module=proxy&action=eth_getCode&address="+t.address,o(n+="&tag="+t.blockTag+i,d);case"getStorageAt":return n+="/api?module=proxy&action=eth_getStorageAt&address="+t.address,n+="&position="+t.position,o(n+="&tag="+t.blockTag+i,d);case"sendTransaction":return n+="/api?module=proxy&action=eth_sendRawTransaction&hex="+t.signedTransaction,o(n+=i).catch(function(e){throw e.responseText&&(0<=e.responseText.toLowerCase().indexOf("insufficient funds")&&l.throwError("insufficient funds",l.INSUFFICIENT_FUNDS,{}),0<=e.responseText.indexOf("same hash was already imported")&&l.throwError("nonce has already been used",l.NONCE_EXPIRED,{}),0<=e.responseText.indexOf("another transaction with same nonce")&&l.throwError("replacement fee too low",l.REPLACEMENT_UNDERPRICED,{})),e});case"getBlock":if(t.blockTag)return n+="/api?module=proxy&action=eth_getBlockByNumber&tag="+t.blockTag,t.includeTransactions?n+="&boolean=true":n+="&boolean=false",o(n+=i);throw new Error("getBlock by blockHash not implmeneted");case"getTransaction":return n+="/api?module=proxy&action=eth_getTransactionByHash&txhash="+t.transactionHash,o(n+=i);case"getTransactionReceipt":return n+="/api?module=proxy&action=eth_getTransactionReceipt&txhash="+t.transactionHash,o(n+=i);case"call":if(n+="/api?module=proxy&action=eth_call"+(a=(a=f(t.transaction))&&"&"+a),"latest"!==t.blockTag)throw new Error("EtherscanProvider does not support blockTag for call");return o(n+=i);case"estimateGas":var a;return n+="/api?module=proxy&action=eth_estimateGas&"+(a=(a=f(t.transaction))&&"&"+a),o(n+=i);case"getLogs":n+="/api?module=logs&action=getLogs";try{if(t.filter.fromBlock&&(n+="&fromBlock="+p(t.filter.fromBlock)),t.filter.toBlock&&(n+="&toBlock="+p(t.filter.toBlock)),t.filter.blockHash)try{l.throwError("Etherscan does not support blockHash filters",l.UNSUPPORTED_OPERATION,{operation:"getLogs(blockHash)"});}catch(e){return Promise.reject(e)}if(t.filter.address&&(n+="&address="+t.filter.address),t.filter.topics&&0<t.filter.topics.length){if(1<t.filter.topics.length)throw new Error("unsupported topic format");var s=t.filter.topics[0];if("string"!=typeof s||66!==s.length)throw new Error("unsupported topic0 format");n+="&topic0="+s;}}catch(e){return Promise.reject(e)}var u=this;return o(n+=i,h).then(function(e){var t={},r=Promise.resolve();return e.forEach(function(e){r=r.then(function(){return null!=e.blockHash?null:(e.blockHash=t[e.transactionHash],null==e.blockHash?u.getTransaction(e.transactionHash).then(function(r){return t[e.transactionHash]=r.blockHash,e.blockHash=r.blockHash,null}):null)});}),r.then(function(){return e})});case"getEtherPrice":return "homestead"!==this.network.name?Promise.resolve(0):(n+="/api?module=stats&action=ethprice",o(n+=i,h).then(function(e){return parseFloat(e.ethusd)}))}return v.prototype.perform.call(this,e,t)},y.prototype.getHistory=function(e,t,r){var n=this,i=this.baseUrl,o="";return this.apiKey&&(o+="&apikey="+this.apiKey),null==t&&(t=0),null==r&&(r=99999999),this.resolveName(e).then(function(e){return i+="/api?module=account&action=txlist&address="+e,i+="&startblock="+t,i+="&endblock="+r,i+="&sort=asc"+o,c.fetchJson(i,null,h).then(function(e){n.emit("debug",{action:"getHistory",request:i,response:e,provider:n});var t=[];return e.forEach(function(e){["contractAddress","to"].forEach(function(t){""==e[t]&&delete e[t];}),null==e.creates&&null!=e.contractAddress&&(e.creates=e.contractAddress);var r=a.BaseProvider.checkTransactionResponse(e);e.timeStamp&&(r.timestamp=parseInt(e.timeStamp)),t.push(r);}),t})})},y);function y(e,t){var r=v.call(this,e)||this;l.checkNew(r,y);var n="invalid";r.network&&(n=r.network.name);var i=null;switch(n){case"homestead":i="https://api.etherscan.io";break;case"ropsten":i="https://api-ropsten.etherscan.io";break;case"rinkeby":i="https://api-rinkeby.etherscan.io";break;case"kovan":i="https://api-kovan.etherscan.io";break;case"goerli":i="https://api-goerli.etherscan.io";break;default:throw new Error("unsupported network")}return u.defineReadOnly(r,"baseUrl",i),u.defineReadOnly(r,"apiKey",t),r}r.EtherscanProvider=m;},{"../errors":5,"../utils/bytes":63,"../utils/properties":73,"../utils/web":85,"./base-provider":50}],52:[function(e,t,r){var n,i=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t;}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);},function(e,t){function r(){this.constructor=e;}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r);}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var a=e("./base-provider"),s=o(e("../errors"));function u(e){var t=!0,r=null;return e.forEach(function(n){null!=n?null!=r?r.name===n.name&&r.chainId===n.chainId&&(r.ensAddress===n.ensAddress||null==r.ensAddress&&null==n.ensAddress)||s.throwError("provider mismatch",s.INVALID_ARGUMENT,{arg:"networks",value:e}):r=n:t=!1;}),t}var c,l=(i(f,c=a.BaseProvider),Object.defineProperty(f.prototype,"providers",{get:function(){return this._providers.slice(0)},enumerable:!0,configurable:!0}),f.prototype.perform=function(e,t){var r=this.providers;return new Promise(function(n,i){var o=null;!function a(){r.length?r.shift().perform(e,t).then(function(e){return n(e)}).catch(function(e){o=o||e,setTimeout(a,0);}):i(o);}();})},f);function f(e){var t=this;if(0===e.length)throw new Error("no providers");if(u(e.map(function(e){return e.network})))t=c.call(this,e[0].network)||this;else{var r=Promise.all(e.map(function(e){return e.getNetwork()})).then(function(e){return u(e)||s.throwError("getNetwork returned null",s.UNKNOWN_ERROR,{}),e[0]});t=c.call(this,r)||this;}return s.checkNew(t,f),t._providers=e.slice(0),t}r.FallbackProvider=l;},{"../errors":5,"./base-provider":50}],53:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0});var n=e("./abstract-provider");r.Provider=n.Provider;var i=e("./base-provider");r.BaseProvider=i.BaseProvider;var o=e("./etherscan-provider");r.EtherscanProvider=o.EtherscanProvider;var a=e("./fallback-provider");r.FallbackProvider=a.FallbackProvider;var s=e("./ipc-provider");r.IpcProvider=s.IpcProvider;var u=e("./infura-provider");r.InfuraProvider=u.InfuraProvider;var c=e("./json-rpc-provider");r.JsonRpcProvider=c.JsonRpcProvider,r.JsonRpcSigner=c.JsonRpcSigner;var l=e("./web3-provider");r.Web3Provider=l.Web3Provider;},{"./abstract-provider":49,"./base-provider":50,"./etherscan-provider":51,"./fallback-provider":52,"./infura-provider":54,"./ipc-provider":55,"./json-rpc-provider":56,"./web3-provider":57}],54:[function(e,t,r){var n,i=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t;}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);},function(e,t){function r(){this.constructor=e;}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r);}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var a,s=e("./json-rpc-provider"),u=e("../utils/bytes"),c=e("../utils/networks"),l=e("../utils/properties"),f=o(e("../errors")),h=(i(d,a=s.JsonRpcProvider),d.prototype._startPending=function(){f.warn("WARNING: INFURA does not support pending filters");},d.prototype.getSigner=function(e){return f.throwError("INFURA does not support signing",f.UNSUPPORTED_OPERATION,{operation:"getSigner"})},d.prototype.listAccounts=function(){return Promise.resolve([])},d);function d(e,t){var r=this,n=c.getNetwork(null==e?"homestead":e);null==t&&(t="7d0d81d0919f4f05b9ab6634be01ee73");var i=null;switch(n.name){case"homestead":i="mainnet.infura.io";break;case"ropsten":i="ropsten.infura.io";break;case"rinkeby":i="rinkeby.infura.io";break;case"goerli":i="goerli.infura.io";break;case"kovan":i="kovan.infura.io";break;default:f.throwError("unsupported network",f.INVALID_ARGUMENT,{argument:"network",value:e});}return u.isHexString("0x"+t,16)?(r=a.call(this,"https://"+i+"/v3/"+t,n)||this,l.defineReadOnly(r,"apiAccessToken",null),l.defineReadOnly(r,"projectId",t)):(f.warn("The legacy INFURA apiAccesToken API is deprecated; please upgrade to a Project ID instead (see INFURA dshboard; https://infura.io)"),r=a.call(this,"https://"+i+"/"+t,n)||this,l.defineReadOnly(r,"apiAccessToken",t),l.defineReadOnly(r,"projectId",null)),f.checkNew(r,d),r}r.InfuraProvider=h;},{"../errors":5,"../utils/bytes":63,"../utils/networks":71,"../utils/properties":73,"./json-rpc-provider":56}],55:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0});},{}],56:[function(e,t,r){var n,i=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t;}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);},function(e,t){function r(){this.constructor=e;}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r);}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var a=e("./base-provider"),s=e("../abstract-signer"),u=o(e("../errors")),c=e("../utils/address"),l=e("../utils/bytes"),f=e("../utils/networks"),h=e("../utils/properties"),d=e("../utils/utf8"),p=e("../utils/web");function v(e){if(e.error){var t=new Error(e.error.message);throw t.code=e.error.code,t.data=e.error.data,t}return e.result}function m(e){return e?e.toLowerCase():e}var y,g={},b=42,w=(i(E,y=s.Signer),E.prototype.getAddress=function(){var e=this;return this._address?Promise.resolve(this._address):this.provider.send("eth_accounts",[]).then(function(t){return t.length<=e._index&&u.throwError("unknown account #"+e._index,u.UNSUPPORTED_OPERATION,{operation:"getAddress"}),e._address=c.getAddress(t[e._index]),e._address})},E.prototype.getBalance=function(e){return this.provider.getBalance(this.getAddress(),e)},E.prototype.getTransactionCount=function(e){return this.provider.getTransactionCount(this.getAddress(),e)},E.prototype.sendUncheckedTransaction=function(e){var t=this;e=h.shallowCopy(e);var r=this.getAddress().then(function(e){return e&&e.toLowerCase()});if(null==e.gasLimit){var n=h.shallowCopy(e);n.from=r,e.gasLimit=this.provider.estimateGas(n);}return Promise.all([h.resolveProperties(e),r]).then(function(e){var r=e[0],n=A.hexlifyTransaction(r);return n.from=e[1],t.provider.send("eth_sendTransaction",[n]).then(function(e){return e},function(e){throw e.responseText&&(0<=e.responseText.indexOf("insufficient funds")&&u.throwError("insufficient funds",u.INSUFFICIENT_FUNDS,{transaction:r}),0<=e.responseText.indexOf("nonce too low")&&u.throwError("nonce has already been used",u.NONCE_EXPIRED,{transaction:r}),0<=e.responseText.indexOf("replacement transaction underpriced")&&u.throwError("replacement fee too low",u.REPLACEMENT_UNDERPRICED,{transaction:r})),e})})},E.prototype.sendTransaction=function(e){var t=this;return this.sendUncheckedTransaction(e).then(function(e){return p.poll(function(){return t.provider.getTransaction(e).then(function(r){if(null!==r)return t.provider._wrapTransaction(r,e)})},{fastRetry:250,onceBlock:t.provider}).catch(function(t){throw t.transactionHash=e,t})})},E.prototype.signMessage=function(e){var t=this,r="string"==typeof e?d.toUtf8Bytes(e):e;return this.getAddress().then(function(e){return t.provider.send("eth_sign",[e.toLowerCase(),l.hexlify(r)])})},E.prototype.unlock=function(e){var t=this.provider;return this.getAddress().then(function(r){return t.send("personal_unlockAccount",[r.toLowerCase(),e,null])})},E);function E(e,t,r){var n=y.call(this)||this;if(u.checkNew(n,E),e!==g)throw new Error("do not call the JsonRpcSigner constructor directly; use provider.getSigner");return h.defineReadOnly(n,"provider",t),r?"string"==typeof r?h.defineReadOnly(n,"_address",c.getAddress(r)):"number"==typeof r?h.defineReadOnly(n,"_index",r):u.throwError("invalid address or index",u.INVALID_ARGUMENT,{argument:"addressOrIndex",value:r}):h.defineReadOnly(n,"_index",0),n}r.JsonRpcSigner=w;var _,S={chainId:!0,data:!0,gasLimit:!0,gasPrice:!0,nonce:!0,to:!0,value:!0},A=(i(T,_=a.BaseProvider),T.prototype.getSigner=function(e){return new w(g,this,e)},T.prototype.listAccounts=function(){return this.send("eth_accounts",[]).then(function(e){return e.map(function(e){return c.getAddress(e)})})},T.prototype.send=function(e,t){var r=this,n={method:e,params:t,id:b++,jsonrpc:"2.0"};return p.fetchJson(this.connection,JSON.stringify(n),v).then(function(e){return r.emit("debug",{action:"send",request:n,response:e,provider:r}),e})},T.prototype.perform=function(e,t){switch(e){case"getBlockNumber":return this.send("eth_blockNumber",[]);case"getGasPrice":return this.send("eth_gasPrice",[]);case"getBalance":return this.send("eth_getBalance",[m(t.address),t.blockTag]);case"getTransactionCount":return this.send("eth_getTransactionCount",[m(t.address),t.blockTag]);case"getCode":return this.send("eth_getCode",[m(t.address),t.blockTag]);case"getStorageAt":return this.send("eth_getStorageAt",[m(t.address),t.position,t.blockTag]);case"sendTransaction":return this.send("eth_sendRawTransaction",[t.signedTransaction]).catch(function(e){throw e.responseText&&(0<e.responseText.indexOf("insufficient funds")&&u.throwError("insufficient funds",u.INSUFFICIENT_FUNDS,{}),0<e.responseText.indexOf("nonce too low")&&u.throwError("nonce has already been used",u.NONCE_EXPIRED,{}),0<e.responseText.indexOf("replacement transaction underpriced")&&u.throwError("replacement fee too low",u.REPLACEMENT_UNDERPRICED,{})),e});case"getBlock":return t.blockTag?this.send("eth_getBlockByNumber",[t.blockTag,!!t.includeTransactions]):t.blockHash?this.send("eth_getBlockByHash",[t.blockHash,!!t.includeTransactions]):Promise.reject(new Error("invalid block tag or block hash"));case"getTransaction":return this.send("eth_getTransactionByHash",[t.transactionHash]);case"getTransactionReceipt":return this.send("eth_getTransactionReceipt",[t.transactionHash]);case"call":return this.send("eth_call",[T.hexlifyTransaction(t.transaction,{from:!0}),t.blockTag]);case"estimateGas":return this.send("eth_estimateGas",[T.hexlifyTransaction(t.transaction,{from:!0})]);case"getLogs":return t.filter&&null!=t.filter.address&&(t.filter.address=m(t.filter.address)),this.send("eth_getLogs",[t.filter])}return u.throwError(e+" not implemented",u.NOT_IMPLEMENTED,{operation:e}),null},T.prototype._startPending=function(){if(null==this._pendingFilter){var e=this,t=this.send("eth_newPendingTransactionFilter",[]);(this._pendingFilter=t).then(function(r){return function n(){e.send("eth_getFilterChanges",[r]).then(function(r){if(e._pendingFilter!=t)return null;var n=Promise.resolve();return r.forEach(function(t){e._emitted["t:"+t.toLowerCase()]="pending",n=n.then(function(){return e.getTransaction(t).then(function(t){return e.emit("pending",t),null})});}),n.then(function(){return new Promise(function(e){setTimeout(function(){e();},1e3);})})}).then(function(){if(e._pendingFilter==t)return setTimeout(function(){n();},0),null;e.send("eth_uninstallFilter",[r]);}).catch(function(e){});}(),r}).catch(function(e){});}},T.prototype._stopPending=function(){this._pendingFilter=null;},T.hexlifyTransaction=function(e,t){var r=h.shallowCopy(S);if(t)for(var n in t)t[n]&&(r[n]=!0);h.checkProperties(e,r);var i={};return ["gasLimit","gasPrice","nonce","value"].forEach(function(t){if(null!=e[t]){var r=l.hexStripZeros(l.hexlify(e[t]));"gasLimit"===t&&(t="gas"),i[t]=r;}}),["from","to","data"].forEach(function(t){null!=e[t]&&(i[t]=l.hexlify(e[t]));}),i},T);function T(e,t){var r=this;if("string"==typeof e&&null===t&&f.getNetwork(e)&&(t=e,e=null),t)r=_.call(this,t)||this;else{var n=new Promise(function(e,t){setTimeout(function(){r.send("net_version",[]).then(function(t){return e(f.getNetwork(parseInt(t)))}).catch(function(e){t(e);});});});r=_.call(this,n)||this;}return u.checkNew(r,T),e=e||"http://localhost:8545",r.connection="string"==typeof e?{url:e}:e,r}r.JsonRpcProvider=A;},{"../abstract-signer":2,"../errors":5,"../utils/address":59,"../utils/bytes":63,"../utils/networks":71,"../utils/properties":73,"../utils/utf8":84,"../utils/web":85,"./base-provider":50}],57:[function(e,t,r){var n,i=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t;}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);},function(e,t){function r(){this.constructor=e;}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r);}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var a,s=e("./json-rpc-provider"),u=e("../utils/properties"),c=o(e("../errors")),l=42,f=(i(h,a=s.JsonRpcProvider),h.prototype.send=function(e,t){var r=this;return "eth_sign"==e&&this._web3Provider.isMetaMask&&(e="personal_sign",t=[t[1],t[0]]),new Promise(function(n,i){var o={method:e,params:t,id:l++,jsonrpc:"2.0"};r._sendAsync(o,function(e,t){if(e)i(e);else{if(t.error){var r=new Error(t.error.message);return r.code=t.error.code,r.data=t.error.data,void i(r)}n(t.result);}});})},h);function h(e,t){var r=a.call(this,e.host||e.path||"",t)||this;return c.checkNew(r,h),e&&(e.sendAsync?r._sendAsync=e.sendAsync.bind(e):e.send&&(r._sendAsync=e.send.bind(e))),e&&r._sendAsync||c.throwError("invalid web3Provider",c.INVALID_ARGUMENT,{arg:"web3Provider",value:e}),u.defineReadOnly(r,"_web3Provider",e),r}r.Web3Provider=f;},{"../errors":5,"../utils/properties":73,"./json-rpc-provider":56}],58:[function(e,t,r){var n,i=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t;}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);},function(e,t){function r(){this.constructor=e;}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r);}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var a=e("../constants"),s=o(e("../errors")),u=e("./address"),c=e("./bignumber"),l=e("./bytes"),f=e("./utf8"),h=e("./properties"),d=new RegExp(/^bytes([0-9]*)$/),p=new RegExp(/^(u?int)([0-9]*)$/),v=new RegExp(/^(.*)\[([0-9]*)\]$/);r.defaultCoerceFunc=function(e,t){var r=e.match(p);return r&&parseInt(r[2])<=48?t.toNumber():t};var m=new RegExp("^([^)(]*)\\((.*)\\)([^)(]*)$"),y=new RegExp("^[A-Za-z_][A-Za-z0-9_]*$");function g(e){return e.match(/^uint($|[^1-9])/)?e="uint256"+e.substring(4):e.match(/^int($|[^1-9])/)&&(e="int256"+e.substring(3)),e}function b(e,t){var r=e;function n(e){throw new Error('unexpected character "'+r[e]+'" at position '+e+' in "'+r+'"')}e=e.replace(/\s/g," ");for(var i={type:"",name:"",state:{allowType:!0}},o=i,a=0;a<e.length;a++){var s=e[a];switch(s){case"(":o.state.allowParams||n(a),o.state.allowType=!1,o.type=g(o.type),o.components=[{type:"",name:"",parent:o,state:{allowType:!0}}],o=o.components[0];break;case")":delete o.state,t&&"indexed"===o.name&&(o.indexed=!0,o.name=""),o.type=g(o.type);var u=o;(o=o.parent)||n(a),delete u.parent,o.state.allowParams=!1,o.state.allowName=!0,o.state.allowArray=!0;break;case",":delete o.state,t&&"indexed"===o.name&&(o.indexed=!0,o.name=""),o.type=g(o.type);var c={type:"",name:"",parent:o.parent,state:{allowType:!0}};o.parent.components.push(c),delete o.parent,o=c;break;case" ":o.state.allowType&&""!==o.type&&(o.type=g(o.type),delete o.state.allowType,o.state.allowName=!0,o.state.allowParams=!0),o.state.allowName&&""!==o.name&&(t&&"indexed"===o.name?(o.indexed=!0,o.name=""):o.state.allowName=!1);break;case"[":o.state.allowArray||n(a),o.type+=s,o.state.allowArray=!1,o.state.allowName=!1,o.state.readArray=!0;break;case"]":o.state.readArray||n(a),o.type+=s,o.state.readArray=!1,o.state.allowArray=!0,o.state.allowName=!0;break;default:o.state.allowType?(o.type+=s,o.state.allowParams=!0,o.state.allowArray=!0):o.state.allowName?(o.name+=s,delete o.state.allowArray):o.state.readArray?o.type+=s:n(a);}}if(o.parent)throw new Error("unexpected eof");return delete i.state,t&&"indexed"===o.name&&(o.indexed=!0,o.name=""),i.type=g(i.type),i}function w(e){return ae(r.defaultCoerceFunc,e).type}function E(e,t,r,n,i){this.coerceFunc=e,this.name=t,this.type=r,this.localName=n,this.dynamic=i;}r.parseParamType=function(e){return b(e,!0)},r.formatParamType=w,r.formatSignature=function(e){return e.name+"("+e.inputs.map(function(e){return w(e)}).join(",")+")"},r.parseSignature=function(e){if("string"==typeof e)return "event "===(e=(e=(e=e.replace(/\s/g," ")).replace(/\(/g," (").replace(/\)/g,") ").replace(/\s+/g," ")).trim()).substring(0,6)?function(e){var t={anonymous:!1,inputs:[],name:"",type:"event"},r=e.match(m);if(!r)throw new Error("invalid event: "+e);if(t.name=r[1].trim(),ie(r[2]).forEach(function(e){(e=b(e,!0)).indexed=!!e.indexed,t.inputs.push(e);}),r[3].split(" ").forEach(function(e){switch(e){case"anonymous":t.anonymous=!0;break;case"":break;default:s.info("unknown modifier: "+e);}}),t.name&&!t.name.match(y))throw new Error('invalid identifier: "'+t.name+'"');return t}(e.substring(6).trim()):("function "===e.substring(0,9)&&(e=e.substring(9)),function(e){var t={constant:!1,gas:null,inputs:[],name:"",outputs:[],payable:!1,stateMutability:null,type:"function"},r=e.split("@");if(1!==r.length){if(2<r.length)throw new Error("invalid signature");if(!r[1].match(/^[0-9]+$/))throw new Error("invalid signature gas");t.gas=c.bigNumberify(r[1]),e=r[0];}var n=(r=e.split(" returns "))[0].match(m);if(!n)throw new Error("invalid signature");if(t.name=n[1].trim(),!t.name.match(y))throw new Error('invalid identifier: "'+n[1]+'"');if(ie(n[2]).forEach(function(e){t.inputs.push(b(e));}),n[3].split(" ").forEach(function(e){switch(e){case"constant":t.constant=!0;break;case"payable":t.payable=!0,t.stateMutability="payable";break;case"pure":t.constant=!0,t.stateMutability="pure";break;case"view":t.constant=!0,t.stateMutability="view";break;case"external":case"public":case"":break;default:s.info("unknown modifier: "+e);}}),1<r.length){var i=r[1].match(m);if(""!=i[1].trim()||""!=i[3].trim())throw new Error("unexpected tokens");ie(i[2]).forEach(function(e){t.outputs.push(b(e));});}if("constructor"===t.name){if(t.type="constructor",t.outputs.length)throw new Error("constructor may not have outputs");delete t.name,delete t.outputs;}return t}(e.trim()));throw new Error("unknown signature")};var _,S=(i(A,_=E),A.prototype.encode=function(e){return this.coder.encode(e)},A.prototype.decode=function(e,t){return this.coder.decode(e,t)},A);function A(e){var t=_.call(this,e.coerceFunc,e.name,e.type,void 0,e.dynamic)||this;return h.defineReadOnly(t,"coder",e),t}var T,N=(i(x,T=E),x.prototype.encode=function(e){return l.arrayify([])},x.prototype.decode=function(e,t){if(t>e.length)throw new Error("invalid null");return {consumed:0,value:this.coerceFunc("null",void 0)}},x);function x(e,t){return T.call(this,e,"null","",t,!1)||this}var M,I=(i(O,M=E),O.prototype.encode=function(e){try{var t=c.bigNumberify(e);if(this.signed){var r=a.MaxUint256.maskn(8*this.size-1);if(t.gt(r))throw new Error("out-of-bounds");if(r=r.add(a.One).mul(a.NegativeOne),t.lt(r))throw new Error("out-of-bounds")}else if(t.lt(a.Zero)||t.gt(a.MaxUint256.maskn(8*this.size)))throw new Error("out-of-bounds");return t=t.toTwos(8*this.size).maskn(8*this.size),this.signed&&(t=t.fromTwos(8*this.size).toTwos(256)),l.padZeros(l.arrayify(t),32)}catch(t){s.throwError("invalid number value",s.INVALID_ARGUMENT,{arg:this.localName,coderType:this.name,value:e});}return null},O.prototype.decode=function(e,t){e.length<t+32&&s.throwError("insufficient data for "+this.name+" type",s.INVALID_ARGUMENT,{arg:this.localName,coderType:this.name,value:l.hexlify(e.slice(t,t+32))});var r=32-this.size,n=c.bigNumberify(e.slice(t+r,t+32));return n=this.signed?n.fromTwos(8*this.size):n.maskn(8*this.size),{consumed:32,value:this.coerceFunc(this.name,n)}},O);function O(e,t,r,n){var i=this,o=(r?"int":"uint")+8*t;return (i=M.call(this,e,o,o,n,!1)||this).size=t,i.signed=r,i}var R,P=new I(function(e,t){return t},32,!1,"none"),k=(i(C,R=E),C.prototype.encode=function(e){return P.encode(e?1:0)},C.prototype.decode=function(e,t){try{var r=P.decode(e,t);}catch(e){throw"insufficient data for uint256 type"===e.reason&&s.throwError("insufficient data for boolean type",s.INVALID_ARGUMENT,{arg:this.localName,coderType:"boolean",value:e.value}),e}return {consumed:r.consumed,value:this.coerceFunc("bool",!r.value.isZero())}},C);function C(e,t){return R.call(this,e,"bool","bool",t,!1)||this}var L,D=(i(U,L=E),U.prototype.encode=function(e){var t=new Uint8Array(32);try{var r=l.arrayify(e);if(r.length!==this.length)throw new Error("incorrect data length");t.set(r);}catch(t){s.throwError("invalid "+this.name+" value",s.INVALID_ARGUMENT,{arg:this.localName,coderType:this.name,value:t.value||e});}return t},U.prototype.decode=function(e,t){return e.length<t+32&&s.throwError("insufficient data for "+this.name+" type",s.INVALID_ARGUMENT,{arg:this.localName,coderType:this.name,value:l.hexlify(e.slice(t,t+32))}),{consumed:32,value:this.coerceFunc(this.name,l.hexlify(e.slice(t,t+this.length)))}},U);function U(e,t,r){var n=this,i="bytes"+t;return (n=L.call(this,e,i,i,r,!1)||this).length=t,n}var B,F=(i(j,B=E),j.prototype.encode=function(e){var t=new Uint8Array(32);try{t.set(l.arrayify(u.getAddress(e)),12);}catch(t){s.throwError("invalid address",s.INVALID_ARGUMENT,{arg:this.localName,coderType:"address",value:e});}return t},j.prototype.decode=function(e,t){return e.length<t+32&&s.throwError("insufficuent data for address type",s.INVALID_ARGUMENT,{arg:this.localName,coderType:"address",value:l.hexlify(e.slice(t,t+32))}),{consumed:32,value:this.coerceFunc("address",u.getAddress(l.hexlify(e.slice(t+12,t+32))))}},j);function j(e,t){return B.call(this,e,"address","address",t,!1)||this}function G(e){var t=32*Math.ceil(e.length/32),r=new Uint8Array(t-e.length);return l.concat([P.encode(e.length),e,r])}function V(e,t,r){e.length<t+32&&s.throwError("insufficient data for dynamicBytes length",s.INVALID_ARGUMENT,{arg:r,coderType:"dynamicBytes",value:l.hexlify(e.slice(t,t+32))});var n=P.decode(e,t).value;try{n=n.toNumber();}catch(e){s.throwError("dynamic bytes count too large",s.INVALID_ARGUMENT,{arg:r,coderType:"dynamicBytes",value:n.toString()});}return e.length<t+32+n&&s.throwError("insufficient data for dynamicBytes type",s.INVALID_ARGUMENT,{arg:r,coderType:"dynamicBytes",value:l.hexlify(e.slice(t,t+32+n))}),{consumed:32+32*Math.ceil(n/32),value:e.slice(t+32,t+32+n)}}var z,H=(i(q,z=E),q.prototype.encode=function(e){try{return G(l.arrayify(e))}catch(e){s.throwError("invalid bytes value",s.INVALID_ARGUMENT,{arg:this.localName,coderType:"bytes",value:e.value});}return null},q.prototype.decode=function(e,t){var r=V(e,t,this.localName);return r.value=this.coerceFunc("bytes",l.hexlify(r.value)),r},q);function q(e,t){return z.call(this,e,"bytes","bytes",t,!0)||this}var W,Q=(i(K,W=E),K.prototype.encode=function(e){return "string"!=typeof e&&s.throwError("invalid string value",s.INVALID_ARGUMENT,{arg:this.localName,coderType:"string",value:e}),G(f.toUtf8Bytes(e))},K.prototype.decode=function(e,t){var r=V(e,t,this.localName);return r.value=this.coerceFunc("string",f.toUtf8String(r.value)),r},K);function K(e,t){return W.call(this,e,"string","string",t,!0)||this}function J(e){return 32*Math.ceil(e/32)}function Z(e,t){if(Array.isArray(t));else if(t&&"object"==typeof t){var r=[];e.forEach(function(e){r.push(t[e.localName]);}),t=r;}else s.throwError("invalid tuple value",s.INVALID_ARGUMENT,{coderType:"tuple",value:t});e.length!==t.length&&s.throwError("types/value length mismatch",s.INVALID_ARGUMENT,{coderType:"tuple",value:t});var n=[];e.forEach(function(e,r){n.push({dynamic:e.dynamic,value:e.encode(t[r])});});var i=0,o=0;n.forEach(function(e){e.dynamic?(i+=32,o+=J(e.value.length)):i+=J(e.value.length);});var a=0,u=i,c=new Uint8Array(i+o);return n.forEach(function(e){e.dynamic?(c.set(P.encode(u),a),a+=32,c.set(e.value,u),u+=J(e.value.length)):(c.set(e.value,a),a+=J(e.value.length));}),c}function X(e,t,r){var n=r,i=0,o=[];return e.forEach(function(e){if(e.dynamic){var a=P.decode(t,r);(s=e.decode(t,n+a.value.toNumber())).consumed=a.consumed;}else var s=e.decode(t,r);null!=s.value&&o.push(s.value),r+=s.consumed,i+=s.consumed;}),e.forEach(function(e,t){var r=e.localName;r&&("length"===r&&(r="_length"),null==o[r]&&(o[r]=o[t]));}),{value:o,consumed:i}}var $,Y=(i(ee,$=E),ee.prototype.encode=function(e){Array.isArray(e)||s.throwError("expected array value",s.INVALID_ARGUMENT,{arg:this.localName,coderType:"array",value:e});var t=this.length,r=new Uint8Array(0);-1===t&&(t=e.length,r=P.encode(t)),s.checkArgumentCount(t,e.length," in coder array"+(this.localName?" "+this.localName:""));for(var n=[],i=0;i<e.length;i++)n.push(this.coder);return l.concat([r,Z(n,e)])},ee.prototype.decode=function(e,t){var r=0,n=this.length;if(-1===n){try{var i=P.decode(e,t);}catch(e){s.throwError("insufficient data for dynamic array length",s.INVALID_ARGUMENT,{arg:this.localName,coderType:"array",value:e.value});}try{n=i.value.toNumber();}catch(e){s.throwError("array count too large",s.INVALID_ARGUMENT,{arg:this.localName,coderType:"array",value:i.value.toString()});}r+=i.consumed,t+=i.consumed;}for(var o=[],a=0;a<n;a++)o.push(new S(this.coder));var u=X(o,e,t);return u.consumed+=r,u.value=this.coerceFunc(this.type,u.value),u},ee);function ee(e,t,r,n){var i=this,o=t.type+"["+(0<=r?r:"")+"]",a=-1===r||t.dynamic;return (i=$.call(this,e,"array",o,n,a)||this).coder=t,i.length=r,i}var te,re=(i(ne,te=E),ne.prototype.encode=function(e){return Z(this.coders,e)},ne.prototype.decode=function(e,t){var r=X(this.coders,e,t);return r.value=this.coerceFunc(this.type,r.value),r},ne);function ne(e,t,r){var n=this,i=!1,o=[];t.forEach(function(e){e.dynamic&&(i=!0),o.push(e.type);});var a="tuple("+o.join(",")+")";return (n=te.call(this,e,"tuple",a,r,i)||this).coders=t,n}function ie(e){e=e.trim();for(var t=[],r="",n=0,i=0;i<e.length;i++){var o=e[i];if(","===o&&0===n)t.push(r),r="";else if(r+=o,"("===o)n++;else if(")"===o&&-1==--n)throw new Error("unbalanced parenthsis")}return r&&t.push(r),t}var oe={address:F,bool:k,string:Q,bytes:H};function ae(e,t){var r,n=oe[t.type];if(n)return new n(e,t.name);if(r=t.type.match(p))return (0===(i=parseInt(r[2]||"256"))||256<i||i%8!=0)&&s.throwError("invalid "+r[1]+" bit length",s.INVALID_ARGUMENT,{arg:"param",value:t}),new I(e,i/8,"int"===r[1],t.name);if(r=t.type.match(d))return (0===(i=parseInt(r[1]))||32<i)&&s.throwError("invalid bytes length",s.INVALID_ARGUMENT,{arg:"param",value:t}),new D(e,i,t.name);if(r=t.type.match(v)){var i=parseInt(r[2]||"-1");return (t=h.shallowCopy(t)).type=r[1],t=h.deepCopy(t),new Y(e,ae(e,t),i,t.name)}return "tuple"===t.type.substring(0,5)?function(e,t,r){var n=[];return (t=t||[]).forEach(function(t){n.push(ae(e,t));}),new re(e,n,r)}(e,t.components,t.name):""===t.type?new N(e,t.name):(s.throwError("invalid type",s.INVALID_ARGUMENT,{arg:"type",value:t.type}),null)}var se=(ue.prototype.encode=function(e,t){e.length!==t.length&&s.throwError("types/values length mismatch",s.INVALID_ARGUMENT,{count:{types:e.length,values:t.length},value:{types:e,values:t}});var r=[];return e.forEach(function(e){var t;t="string"==typeof e?b(e):e,r.push(ae(this.coerceFunc,t));},this),l.hexlify(new re(this.coerceFunc,r,"_").encode(t))},ue.prototype.decode=function(e,t){var r=[];return e.forEach(function(e){var t;t="string"==typeof e?b(e):h.deepCopy(e),r.push(ae(this.coerceFunc,t));},this),new re(this.coerceFunc,r,"_").decode(l.arrayify(t),0).value},ue);function ue(e){s.checkNew(this,ue),e=e||r.defaultCoerceFunc,h.defineReadOnly(this,"coerceFunc",e);}r.AbiCoder=se,r.defaultAbiCoder=new se;},{"../constants":3,"../errors":5,"./address":59,"./bignumber":62,"./bytes":63,"./properties":73,"./utf8":84}],59:[function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0});var i=n(e("bn.js")),o=e("./bytes"),a=e("./keccak256"),s=e("./rlp"),u=e("../errors");function c(e){"string"==typeof e&&e.match(/^0x[0-9A-Fa-f]{40}$/)||u.throwError("invalid address",u.INVALID_ARGUMENT,{arg:"address",value:e});for(var t=(e=e.toLowerCase()).substring(2).split(""),r=new Uint8Array(40),n=0;n<40;n++)r[n]=t[n].charCodeAt(0);r=o.arrayify(a.keccak256(r));for(var i=0;i<40;i+=2)8<=r[i>>1]>>4&&(t[i]=t[i].toUpperCase()),8<=(15&r[i>>1])&&(t[i+1]=t[i+1].toUpperCase());return "0x"+t.join("")}for(var l={},f=0;f<10;f++)l[String(f)]=String(f);for(f=0;f<26;f++)l[String.fromCharCode(65+f)]=String(10+f);var h,d=Math.floor((h=9007199254740991,Math.log10?Math.log10(h):Math.log(h)/Math.LN10));function p(e){e=(e=e.toUpperCase()).substring(4)+e.substring(0,2)+"00";var t="";for(e.split("").forEach(function(e){t+=l[e];});t.length>=d;){var r=t.substring(0,d);t=parseInt(r,10)%97+t.substring(r.length);}for(var n=String(98-parseInt(t,10)%97);n.length<2;)n="0"+n;return n}function v(e){var t=null;if("string"!=typeof e&&u.throwError("invalid address",u.INVALID_ARGUMENT,{arg:"address",value:e}),e.match(/^(0x)?[0-9a-fA-F]{40}$/))"0x"!==e.substring(0,2)&&(e="0x"+e),t=c(e),e.match(/([A-F].*[a-f])|([a-f].*[A-F])/)&&t!==e&&u.throwError("bad address checksum",u.INVALID_ARGUMENT,{arg:"address",value:e});else if(e.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)){for(e.substring(2,4)!==p(e)&&u.throwError("bad icap checksum",u.INVALID_ARGUMENT,{arg:"address",value:e}),t=new i.default.BN(e.substring(4),36).toString(16);t.length<40;)t="0"+t;t=c("0x"+t);}else u.throwError("invalid address",u.INVALID_ARGUMENT,{arg:"address",value:e});return t}r.getAddress=v,r.getIcapAddress=function(e){for(var t=new i.default.BN(v(e).substring(2),16).toString(36).toUpperCase();t.length<30;)t="0"+t;return "XE"+p("XE00"+t)+t},r.getContractAddress=function(e){if(!e.from)throw new Error("missing from address");var t=e.nonce;return v("0x"+a.keccak256(s.encode([v(e.from),o.stripZeros(o.hexlify(t))])).substring(26))};},{"../errors":5,"./bytes":63,"./keccak256":70,"./rlp":75,"bn.js":9}],60:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0});var n=e("../utils/bytes");t.exports={decode:function(e){e=atob(e);for(var t=[],r=0;r<e.length;r++)t.push(e.charCodeAt(r));return n.arrayify(t)},encode:function(e){e=n.arrayify(e);for(var t="",r=0;r<e.length;r++)t+=String.fromCharCode(e[r]);return btoa(t)}};},{"../utils/bytes":63}],61:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0});var n=e("./bytes"),i=e("./properties"),o=(a.prototype.encode=function(e){var t=n.arrayify(e);if(0===t.length)return "";for(var r=[0],i=0;i<t.length;++i){for(var o=t[i],a=0;a<r.length;++a)o+=r[a]<<8,r[a]=o%this.base,o=o/this.base|0;for(;0<o;)r.push(o%this.base),o=o/this.base|0;}for(var s="",u=0;0===t[u]&&u<t.length-1;++u)s+=this._leader;for(var c=r.length-1;0<=c;--c)s+=this.alphabet[r[c]];return s},a.prototype.decode=function(e){if("string"!=typeof e)throw new TypeError("Expected String");var t=[];if(0===e.length)return new Uint8Array(t);t.push(0);for(var r=0;r<e.length;r++){var i=this._alphabetMap[e[r]];if(void 0===i)throw new Error("Non-base"+this.base+" character");for(var o=i,a=0;a<t.length;++a)o+=t[a]*this.base,t[a]=255&o,o>>=8;for(;0<o;)t.push(255&o),o>>=8;}for(var s=0;e[s]===this._leader&&s<e.length-1;++s)t.push(0);return n.arrayify(new Uint8Array(t.reverse()))},a);function a(e){i.defineReadOnly(this,"alphabet",e),i.defineReadOnly(this,"base",e.length),i.defineReadOnly(this,"_alphabetMap",{}),i.defineReadOnly(this,"_leader",e.charAt(0));for(var t=0;t<e.length;t++)this._alphabetMap[e.charAt(t)]=t;}var s=new(r.BaseX=o)("abcdefghijklmnopqrstuvwxyz234567");r.Base32=s;var u=new o("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");r.Base58=u;},{"./bytes":63,"./properties":73}],62:[function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var o=n(e("bn.js")),a=e("./bytes"),s=e("./properties"),u=i(e("../errors")),c=new o.default.BN(-1);function l(e){var t=e.toString(16);return "-"===t[0]?t.length%2==0?"-0x0"+t.substring(1):"-0x"+t.substring(1):t.length%2==1?"0x0"+t:"0x"+t}function f(e){return d(m(e))}function h(e){return new p(l(e))}function d(e){var t=e._hex;return "-"===t[0]?new o.default.BN(t.substring(3),16).mul(c):new o.default.BN(t.substring(2),16)}var p=(v.prototype.fromTwos=function(e){return h(d(this).fromTwos(e))},v.prototype.toTwos=function(e){return h(d(this).toTwos(e))},v.prototype.abs=function(){return "-"===this._hex[0]?h(d(this).mul(c)):this},v.prototype.add=function(e){return h(d(this).add(f(e)))},v.prototype.sub=function(e){return h(d(this).sub(f(e)))},v.prototype.div=function(e){return m(e).isZero()&&u.throwError("division by zero",u.NUMERIC_FAULT,{operation:"divide",fault:"division by zero"}),h(d(this).div(f(e)))},v.prototype.mul=function(e){return h(d(this).mul(f(e)))},v.prototype.mod=function(e){return h(d(this).mod(f(e)))},v.prototype.pow=function(e){return h(d(this).pow(f(e)))},v.prototype.maskn=function(e){return h(d(this).maskn(e))},v.prototype.eq=function(e){return d(this).eq(f(e))},v.prototype.lt=function(e){return d(this).lt(f(e))},v.prototype.lte=function(e){return d(this).lte(f(e))},v.prototype.gt=function(e){return d(this).gt(f(e))},v.prototype.gte=function(e){return d(this).gte(f(e))},v.prototype.isZero=function(){return d(this).isZero()},v.prototype.toNumber=function(){try{return d(this).toNumber()}catch(e){u.throwError("overflow",u.NUMERIC_FAULT,{operation:"setValue",fault:"overflow",details:e.message});}return null},v.prototype.toString=function(){return d(this).toString(10)},v.prototype.toHexString=function(){return this._hex},v.isBigNumber=function(e){return s.isType(e,"BigNumber")},v);function v(e){if(u.checkNew(this,v),s.setType(this,"BigNumber"),"string"==typeof e)a.isHexString(e)?("0x"==e&&(e="0x0"),s.defineReadOnly(this,"_hex",e)):"-"===e[0]&&a.isHexString(e.substring(1))?s.defineReadOnly(this,"_hex",e):e.match(/^-?[0-9]*$/)?(""==e&&(e="0"),s.defineReadOnly(this,"_hex",l(new o.default.BN(e)))):u.throwError("invalid BigNumber string value",u.INVALID_ARGUMENT,{arg:"value",value:e});else if("number"==typeof e){parseInt(String(e))!==e&&u.throwError("underflow",u.NUMERIC_FAULT,{operation:"setValue",fault:"underflow",value:e,outputValue:parseInt(String(e))});try{s.defineReadOnly(this,"_hex",l(new o.default.BN(e)));}catch(e){u.throwError("overflow",u.NUMERIC_FAULT,{operation:"setValue",fault:"overflow",details:e.message});}}else e instanceof v?s.defineReadOnly(this,"_hex",e._hex):e.toHexString?s.defineReadOnly(this,"_hex",l(f(e.toHexString()))):e._hex&&a.isHexString(e._hex)?s.defineReadOnly(this,"_hex",e._hex):a.isArrayish(e)?s.defineReadOnly(this,"_hex",l(new o.default.BN(a.hexlify(e).substring(2),16))):u.throwError("invalid BigNumber value",u.INVALID_ARGUMENT,{arg:"value",value:e});}function m(e){return p.isBigNumber(e)?e:new p(e)}r.BigNumber=p,r.bigNumberify=m;},{"../errors":5,"./bytes":63,"./properties":73,"bn.js":9}],63:[function(e,t,r){var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var i=n(e("../errors"));function o(e){return !!e.toHexString}function a(e){return e.slice||(e.slice=function(){var t=Array.prototype.slice.call(arguments);return a(new Uint8Array(Array.prototype.slice.apply(e,t)))}),e}function s(e){if(!e||parseInt(String(e.length))!=e.length||"string"==typeof e)return !1;for(var t=0;t<e.length;t++){var r=e[t];if(r<0||256<=r||parseInt(String(r))!=r)return !1}return !0}function u(e){if(null==e&&i.throwError("cannot convert null value to array",i.INVALID_ARGUMENT,{arg:"value",value:e}),o(e)&&(e=e.toHexString()),"string"!=typeof e)return s(e)?a(new Uint8Array(e)):(i.throwError("invalid arrayify value",null,{arg:"value",value:e,type:typeof e}),null);var t=e.match(/^(0x)?[0-9a-fA-F]*$/);t||i.throwError("invalid hexidecimal string",i.INVALID_ARGUMENT,{arg:"value",value:e}),"0x"!==t[1]&&i.throwError("hex string must have 0x prefix",i.INVALID_ARGUMENT,{arg:"value",value:e}),(e=e.substring(2)).length%2&&(e="0"+e);for(var r=[],n=0;n<e.length;n+=2)r.push(parseInt(e.substr(n,2),16));return a(new Uint8Array(r))}function c(e){for(var t=[],r=0,n=0;n<e.length;n++){var i=u(e[n]);t.push(i),r+=i.length;}var o=new Uint8Array(r),s=0;for(n=0;n<t.length;n++)o.set(t[n],s),s+=t[n].length;return a(o)}function l(e,t){return !("string"!=typeof e||!e.match(/^0x[0-9A-Fa-f]*$/)||t&&e.length!==2+2*t)}r.isHexable=o,r.isArrayish=s,r.arrayify=u,r.concat=c,r.stripZeros=function(e){var t=u(e);if(0===t.length)return t;for(var r=0;0===t[r];)r++;return r&&(t=t.slice(r)),t},r.padZeros=function(e,t){if(t<(e=u(e)).length)throw new Error("cannot pad");var r=new Uint8Array(t);return r.set(e,t-e.length),a(r)},r.isHexString=l;var f="0123456789abcdef";function h(e){if(o(e))return e.toHexString();if("number"==typeof e){e<0&&i.throwError("cannot hexlify negative value",i.INVALID_ARGUMENT,{arg:"value",value:e}),9007199254740991<=e&&i.throwError("out-of-range",i.NUMERIC_FAULT,{operartion:"hexlify",fault:"out-of-safe-range"});for(var t="";e;)t=f[15&e]+t,e=Math.floor(e/16);return t.length?(t.length%2&&(t="0"+t),"0x"+t):"0x00"}if("string"==typeof e){var r=e.match(/^(0x)?[0-9a-fA-F]*$/);return r||i.throwError("invalid hexidecimal string",i.INVALID_ARGUMENT,{arg:"value",value:e}),"0x"!==r[1]&&i.throwError("hex string must have 0x prefix",i.INVALID_ARGUMENT,{arg:"value",value:e}),e.length%2&&(e="0x0"+e.substring(2)),e}if(s(e)){for(var n=[],a=0;a<e.length;a++){var u=e[a];n.push(f[(240&u)>>4]+f[15&u]);}return "0x"+n.join("")}return i.throwError("invalid hexlify value",null,{arg:"value",value:e}),"never"}function d(e,t){for(l(e)||i.throwError("invalid hex string",i.INVALID_ARGUMENT,{arg:"value",value:e});e.length<2*t+2;)e="0x0"+e.substring(2);return e}function p(e){var t=0,r="0x",n="0x";if(function(e){return e&&null!=e.r&&null!=e.s}(e)){null==e.v&&null==e.recoveryParam&&i.throwError("at least on of recoveryParam or v must be specified",i.INVALID_ARGUMENT,{argument:"signature",value:e}),r=d(e.r,32),n=d(e.s,32),"string"==typeof(t=e.v)&&(t=parseInt(t,16));var o=e.recoveryParam;null==o&&null!=e.v&&(o=1-t%2),t=27+o;}else{var a=u(e);if(65!==a.length)throw new Error("invalid signature");r=h(a.slice(0,32)),n=h(a.slice(32,64)),27!==(t=a[64])&&28!==t&&(t=27+t%2);}return {r:r,s:n,recoveryParam:t-27,v:t}}r.hexlify=h,r.hexDataLength=function(e){return l(e)&&e.length%2==0?(e.length-2)/2:null},r.hexDataSlice=function(e,t,r){return l(e)||i.throwError("invalid hex data",i.INVALID_ARGUMENT,{arg:"value",value:e}),e.length%2!=0&&i.throwError("hex data length must be even",i.INVALID_ARGUMENT,{arg:"value",value:e}),t=2+2*t,null!=r?"0x"+e.substring(t,2+2*r):"0x"+e.substring(t)},r.hexStripZeros=function(e){for(l(e)||i.throwError("invalid hex string",i.INVALID_ARGUMENT,{arg:"value",value:e});3<e.length&&"0x0"===e.substring(0,3);)e="0x"+e.substring(3);return e},r.hexZeroPad=d,r.splitSignature=p,r.joinSignature=function(e){return h(c([(e=p(e)).r,e.s,e.recoveryParam?"0x1c":"0x1b"]))};},{"../errors":5}],64:[function(e,t,r){var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var i=n(e("../errors")),o=e("./bytes"),a=e("./utf8"),s=e("./keccak256"),u=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),c=new RegExp("^((.*)\\.)?([^.]+)$"),l=new RegExp("^[a-z0-9.-]*$");r.namehash=function(e){"string"!=typeof e&&i.throwError("invalid address - "+String(e),i.INVALID_ARGUMENT,{argument:"name",value:e}),(e=e.toLowerCase()).match(l)||i.throwError("contains invalid UseSTD3ASCIIRules characters",i.INVALID_ARGUMENT,{argument:"name",value:e});for(var t=u;e.length;){var r=e.match(c),n=a.toUtf8Bytes(r[3]);t=s.keccak256(o.concat([t,s.keccak256(n)])),e=r[2]||"";}return o.hexlify(t)},r.id=function(e){return s.keccak256(a.toUtf8Bytes(e))},r.hashMessage=function(e){return s.keccak256(o.concat([a.toUtf8Bytes("Ethereum Signed Message:\n"),a.toUtf8Bytes(String(e.length)),"string"==typeof e?a.toUtf8Bytes(e):e]))};},{"../errors":5,"./bytes":63,"./keccak256":70,"./utf8":84}],65:[function(e,t,r){var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var i=n(e("../errors")),o=e("../wordlists/lang-en"),a=e("./basex"),s=e("./bytes"),u=e("./bignumber"),c=e("./utf8"),l=e("./pbkdf2"),f=e("./hmac"),h=e("./properties"),d=e("./secp256k1"),p=e("./sha2"),v=u.bigNumberify("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),m=c.toUtf8Bytes("Bitcoin seed"),y=2147483648;function g(e){return (1<<e)-1<<8-e}function b(e){return s.hexZeroPad(s.hexlify(e),32)}function w(e){var t=s.hexDataSlice(p.sha256(p.sha256(e)),0,4);return a.Base58.encode(s.concat([e,t]))}var E={};r.defaultPath="m/44'/60'/0'/0/0";var _=(Object.defineProperty(S.prototype,"extendedKey",{get:function(){if(256<=this.depth)throw new Error("Depth too large!");return w(s.concat([null!=this.privateKey?"0x0488ADE4":"0x0488B21E",s.hexlify(this.depth),this.parentFingerprint,s.hexZeroPad(s.hexlify(this.index),4),this.chainCode,null!=this.privateKey?s.concat(["0x00",this.privateKey]):this.publicKey]))},enumerable:!0,configurable:!0}),S.prototype.neuter=function(){return new S(E,null,this.publicKey,this.parentFingerprint,this.chainCode,this.index,this.depth,null,this.path)},S.prototype._derive=function(e){if(4294967295<e)throw new Error("invalid index - "+String(e));var t=this.path;t&&(t+="/"+(e&~y));var r=new Uint8Array(37);if(e&y){if(!this.privateKey)throw new Error("cannot derive child of neutered node");r.set(s.arrayify(this.privateKey),1),t&&(t+="'");}else r.set(s.arrayify(this.publicKey));for(var n=24;0<=n;n-=8)r[33+(n>>3)]=e>>24-n&255;var i=f.computeHmac(f.SupportedAlgorithms.sha512,this.chainCode,r),o=i.slice(0,32),a=i.slice(32),c=null,l=null;return this.privateKey?c=b(u.bigNumberify(o).add(this.privateKey).mod(v)):l=new d.KeyPair(s.hexlify(o))._addPoint(this.publicKey),new S(E,c,l,this.fingerprint,b(a),e,this.depth+1,this.mnemonic,t)},S.prototype.derivePath=function(e){var t=e.split("/");if(0===t.length||"m"===t[0]&&0!==this.depth)throw new Error("invalid path - "+e);"m"===t[0]&&t.shift();for(var r=this,n=0;n<t.length;n++){var i=t[n];if(i.match(/^[0-9]+'$/)){var o=parseInt(i.substring(0,i.length-1));if(y<=o)throw new Error("invalid path index - "+i);r=r._derive(y+o);}else{if(!i.match(/^[0-9]+$/))throw new Error("invlaid path component - "+i);if(o=parseInt(i),y<=o)throw new Error("invalid path index - "+i);r=r._derive(o);}}return r},S.isHDNode=function(e){return h.isType(e,"HDNode")},S);function S(e,t,r,n,o,a,u,c,l){if(i.checkNew(this,S),e!==E)throw new Error("HDNode constructor cannot be called directly");if(t){var f=new d.KeyPair(t);h.defineReadOnly(this,"privateKey",f.privateKey),h.defineReadOnly(this,"publicKey",f.compressedPublicKey);}else h.defineReadOnly(this,"privateKey",null),h.defineReadOnly(this,"publicKey",s.hexlify(r));h.defineReadOnly(this,"parentFingerprint",n),h.defineReadOnly(this,"fingerprint",s.hexDataSlice(p.ripemd160(p.sha256(this.publicKey)),0,4)),h.defineReadOnly(this,"address",d.computeAddress(this.publicKey)),h.defineReadOnly(this,"chainCode",o),h.defineReadOnly(this,"index",a),h.defineReadOnly(this,"depth",u),h.defineReadOnly(this,"mnemonic",c),h.defineReadOnly(this,"path",l),h.setType(this,"HDNode");}function A(e,t){var r=s.arrayify(e);if(r.length<16||64<r.length)throw new Error("invalid seed");var n=s.arrayify(f.computeHmac(f.SupportedAlgorithms.sha512,m,r));return new _(E,b(n.slice(0,32)),null,"0x00000000",b(n.slice(32)),0,0,t,"m")}function T(e,t){t=t||"";var r=c.toUtf8Bytes("mnemonic"+t,c.UnicodeNormalizationForm.NFKD);return s.hexlify(l.pbkdf2(c.toUtf8Bytes(e,c.UnicodeNormalizationForm.NFKD),r,2048,64,"sha512"))}function N(e,t){t=t||o.langEn,i.checkNormalize();var r=t.split(e);if(r.length%3!=0)throw new Error("invalid mnemonic");for(var n=s.arrayify(new Uint8Array(Math.ceil(11*r.length/8))),a=0,u=0;u<r.length;u++){var c=t.getWordIndex(r[u].normalize("NFKD"));if(-1===c)throw new Error("invalid mnemonic");for(var l=0;l<11;l++)c&1<<10-l&&(n[a>>3]|=1<<7-a%8),a++;}var f=32*r.length/3,h=g(r.length/3),d=s.arrayify(p.sha256(n.slice(0,f/8)))[0];if((d&=h)!=(n[n.length-1]&h))throw new Error("invalid checksum");return s.hexlify(n.slice(0,f/8))}function x(e,t){if((e=s.arrayify(e)).length%4!=0||e.length<16||32<e.length)throw new Error("invalid entropy");for(var r=[0],n=11,i=0;i<e.length;i++)8<n?(r[r.length-1]<<=8,r[r.length-1]|=e[i],n-=8):(r[r.length-1]<<=n,r[r.length-1]|=e[i]>>8-n,r.push(e[i]&(1<<8-n)-1),n+=3);var a=s.arrayify(p.sha256(e))[0],u=e.length/4;return a&=g(u),r[r.length-1]<<=u,r[r.length-1]|=a>>8-u,(t=t||o.langEn).join(r.map(function(e){return t.getWord(e)}))}r.HDNode=_,r.fromExtendedKey=function(e){var t=a.Base58.decode(e);82===t.length&&w(t.slice(0,78))===e||i.throwError("invalid extended key",i.INVALID_ARGUMENT,{argument:"extendedKey",value:"[REDACTED]"});var r=t[4],n=s.hexlify(t.slice(5,9)),o=parseInt(s.hexlify(t.slice(9,13)).substring(2),16),u=s.hexlify(t.slice(13,45)),c=t.slice(45,78);switch(s.hexlify(t.slice(0,4))){case"0x0488b21e":case"0x043587cf":return new _(E,null,s.hexlify(c),n,u,o,r,null,null);case"0x0488ade4":case"0x04358394":if(0!==c[0])break;return new _(E,s.hexlify(c.slice(1)),null,n,u,o,r,null,null)}return i.throwError("invalid extended key",i.INVALID_ARGUMENT,{argument:"extendedKey",value:"[REDACTED]"})},r.fromMnemonic=function(e,t,r){return A(T(e=x(N(e,t),t),r),e)},r.fromSeed=function(e){return A(e,null)},r.mnemonicToSeed=T,r.mnemonicToEntropy=N,r.entropyToMnemonic=x,r.isValidMnemonic=function(e,t){try{return N(e,t),!0}catch(e){}return !1};},{"../errors":5,"../wordlists/lang-en":89,"./basex":61,"./bignumber":62,"./bytes":63,"./hmac":66,"./pbkdf2":72,"./properties":73,"./secp256k1":76,"./sha2":78,"./utf8":84}],66:[function(e,t,r){var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var i,o,a=n(e("hash.js")),s=e("../utils/bytes"),u=n(e("../errors"));(o=i=r.SupportedAlgorithms||(r.SupportedAlgorithms={})).sha256="sha256",o.sha512="sha512",r.computeHmac=function(e,t,r){return i[e]||u.throwError("unsupported algorithm "+e,u.UNSUPPORTED_OPERATION,{operation:"hmac",algorithm:e}),s.arrayify(a.hmac(a[e],s.arrayify(t)).update(s.arrayify(r)).digest())};},{"../errors":5,"../utils/bytes":63,"hash.js":27}],67:[function(e,t,r){var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var i=e("./abi-coder");r.AbiCoder=i.AbiCoder,r.defaultAbiCoder=i.defaultAbiCoder,r.formatSignature=i.formatSignature,r.formatParamType=i.formatParamType,r.parseSignature=i.parseSignature,r.parseParamType=i.parseParamType;var o=e("./address");r.getAddress=o.getAddress,r.getContractAddress=o.getContractAddress,r.getIcapAddress=o.getIcapAddress;var a=n(e("./base64"));r.base64=a;var s=e("./bignumber");r.BigNumber=s.BigNumber,r.bigNumberify=s.bigNumberify;var u=e("./bytes");r.arrayify=u.arrayify,r.concat=u.concat,r.hexDataSlice=u.hexDataSlice,r.hexDataLength=u.hexDataLength,r.hexlify=u.hexlify,r.hexStripZeros=u.hexStripZeros,r.hexZeroPad=u.hexZeroPad,r.isHexString=u.isHexString,r.joinSignature=u.joinSignature,r.padZeros=u.padZeros,r.splitSignature=u.splitSignature,r.stripZeros=u.stripZeros;var c=e("./hash");r.hashMessage=c.hashMessage,r.id=c.id,r.namehash=c.namehash;var l=n(e("./hdnode"));r.HDNode=l;var f=e("./interface");r.Interface=f.Interface;var h=e("./json-wallet");r.getJsonWalletAddress=h.getJsonWalletAddress;var d=e("./keccak256");r.keccak256=d.keccak256;var p=e("./sha2");r.sha256=p.sha256;var v=e("./solidity");r.solidityKeccak256=v.keccak256,r.solidityPack=v.pack,r.soliditySha256=v.sha256;var m=e("./random-bytes");r.randomBytes=m.randomBytes;var y=e("./networks");r.getNetwork=y.getNetwork;var g=e("./properties");r.checkProperties=g.checkProperties,r.deepCopy=g.deepCopy,r.defineReadOnly=g.defineReadOnly,r.resolveProperties=g.resolveProperties,r.shallowCopy=g.shallowCopy;var b=n(e("./rlp"));r.RLP=b;var w=e("./secp256k1");r.computeAddress=w.computeAddress,r.computePublicKey=w.computePublicKey,r.recoverAddress=w.recoverAddress,r.recoverPublicKey=w.recoverPublicKey,r.verifyMessage=w.verifyMessage;var E=e("./signing-key");r.SigningKey=E.SigningKey;var _=e("./transaction");r.populateTransaction=_.populateTransaction;var S=e("./transaction");r.parseTransaction=S.parse,r.serializeTransaction=S.serialize;var A=e("./utf8");r.formatBytes32String=A.formatBytes32String,r.parseBytes32String=A.parseBytes32String,r.toUtf8Bytes=A.toUtf8Bytes,r.toUtf8String=A.toUtf8String;var T=e("./units");r.commify=T.commify,r.formatEther=T.formatEther,r.parseEther=T.parseEther,r.formatUnits=T.formatUnits,r.parseUnits=T.parseUnits;var N=e("./web");r.fetchJson=N.fetchJson,r.poll=N.poll;var x=e("./hmac");r.SupportedAlgorithms=x.SupportedAlgorithms;var M=e("./utf8");r.UnicodeNormalizationForm=M.UnicodeNormalizationForm;var I=e("./wordlist");r.Wordlist=I.Wordlist;},{"./abi-coder":58,"./address":59,"./base64":60,"./bignumber":62,"./bytes":63,"./hash":64,"./hdnode":65,"./hmac":66,"./interface":68,"./json-wallet":69,"./keccak256":70,"./networks":71,"./properties":73,"./random-bytes":74,"./rlp":75,"./secp256k1":76,"./sha2":78,"./signing-key":80,"./solidity":81,"./transaction":82,"./units":83,"./utf8":84,"./web":85,"./wordlist":86}],68:[function(e,t,r){var n,i=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t;}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);},function(e,t){function r(){this.constructor=e;}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r);}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};function a(e){for(var t in p.setType(this,"Description"),e)p.defineReadOnly(this,t,p.deepCopy(e[t],!0));Object.freeze(this);}Object.defineProperty(r,"__esModule",{value:!0});var s,u=e("./address"),c=e("./abi-coder"),l=e("./bignumber"),f=e("./bytes"),h=e("./hash"),d=e("./keccak256"),p=e("./properties"),v=o(e("../errors")),m=function(e){p.setType(this,"Indexed"),p.defineReadOnly(this,"hash",e);},y=(i(g,s=a),g.prototype.encode=function(e,t){f.isHexString(e)||v.throwError("invalid contract bytecode",v.INVALID_ARGUMENT,{arg:"bytecode",value:e}),v.checkArgumentCount(t.length,this.inputs.length," in Interface constructor");try{return e+c.defaultAbiCoder.encode(this.inputs,t).substring(2)}catch(e){v.throwError("invalid constructor argument",v.INVALID_ARGUMENT,{arg:e.arg,reason:e.reason,value:e.value});}return null},g);function g(){return null!==s&&s.apply(this,arguments)||this}var b,w=(i(E,b=a),E.prototype.encode=function(e){v.checkArgumentCount(e.length,this.inputs.length," in interface function "+this.name);try{return this.sighash+c.defaultAbiCoder.encode(this.inputs,e).substring(2)}catch(e){v.throwError("invalid input argument",v.INVALID_ARGUMENT,{arg:e.arg,reason:e.reason,value:e.value});}return null},E.prototype.decode=function(e){try{return c.defaultAbiCoder.decode(this.outputs,f.arrayify(e))}catch(t){v.throwError("invalid data for function output",v.INVALID_ARGUMENT,{arg:"data",errorArg:t.arg,errorValue:t.value,value:e,reason:t.reason});}},E);function E(){return null!==b&&b.apply(this,arguments)||this}var _,S=(i(A,_=a),A);function A(){return null!==_&&_.apply(this,arguments)||this}var T,N=(i(x,T=a),x.prototype.encodeTopics=function(e){var t=this;e.length>this.inputs.length&&v.throwError("too many arguments for "+this.name,v.UNEXPECTED_ARGUMENT,{maxCount:e.length,expectedCount:this.inputs.length});var r=[];for(this.anonymous||r.push(this.topic),e.forEach(function(e,n){var i=t.inputs[n];i.indexed?null==e?r.push(null):"string"===i.type?r.push(h.id(e)):"bytes"===i.type?r.push(d.keccak256(e)):-1!==i.type.indexOf("[")||"tuple"===i.type.substring(0,5)?v.throwError("filtering with tuples or arrays not implemented yet; bug us on GitHub",v.NOT_IMPLEMENTED,{operation:"filter(array|tuple)"}):("address"===i.type&&u.getAddress(e),r.push(f.hexZeroPad(f.hexlify(e),32).toLowerCase())):null!=e&&v.throwError("cannot filter non-indexed parameters; must be null",v.INVALID_ARGUMENT,{argument:i.name||n,value:e});});r.length&&null===r[r.length-1];)r.pop();return r},x.prototype.decode=function(e,t){null==t||this.anonymous||(t=t.slice(1));var r=[],n=[],i=[];if(this.inputs.forEach(function(e,t){e.indexed?"string"===e.type||"bytes"===e.type||0<=e.type.indexOf("[")||"tuple"===e.type.substring(0,5)?(r.push({type:"bytes32",name:e.name||""}),i.push(!0)):(r.push(e),i.push(!1)):(n.push(e),i.push(!1));}),null!=t)var o=c.defaultAbiCoder.decode(r,f.concat(t));var a=c.defaultAbiCoder.decode(n,f.arrayify(e)),s={},u=0,l=0;return this.inputs.forEach(function(e,r){e.indexed?null==t?s[r]=new m(null):i[r]?s[r]=new m(o[l++]):s[r]=o[l++]:s[r]=a[u++],e.name&&(s[e.name]=s[r]);}),s.length=this.inputs.length,new S(s)},x);function x(){return null!==T&&T.apply(this,arguments)||this}var M,I=(i(O,M=a),O);function O(){return null!==M&&M.apply(this,arguments)||this}var R,P=(i(k,R=a),k);function k(){return null!==R&&R.apply(this,arguments)||this}function C(e){switch(e.type){case"constructor":var t=new y({inputs:e.inputs,payable:null==e.payable||!!e.payable});this.deployFunction||(this.deployFunction=t);break;case"function":var r=c.formatSignature(e).replace(/tuple/g,""),n=h.id(r).substring(0,10);t=new w({inputs:e.inputs,outputs:e.outputs,gas:e.gas,payable:null==e.payable||!!e.payable,type:e.constant?"call":"transaction",name:e.name,signature:r,sighash:n}),e.name&&(null==this.functions[e.name]?p.defineReadOnly(this.functions,e.name,t):v.warn("WARNING: Multiple definitions for "+e.name)),null==this.functions[t.signature]&&p.defineReadOnly(this.functions,t.signature,t);break;case"event":r=c.formatSignature(e).replace(/tuple/g,""),t=new N({name:e.name,signature:r,inputs:e.inputs,topic:h.id(r),anonymous:!!e.anonymous}),e.name&&null==this.events[e.name]&&p.defineReadOnly(this.events,e.name,t),null==this.events[t.signature]&&p.defineReadOnly(this.events,t.signature,t);break;case"fallback":break;default:v.warn("WARNING: unsupported ABI type - "+e.type);}}var L=(D.prototype.parseTransaction=function(e){var t=e.data.substring(0,10).toLowerCase();for(var r in this.functions)if(-1!==r.indexOf("(")){var n=this.functions[r];if(n.sighash===t){var i=c.defaultAbiCoder.decode(n.inputs,"0x"+e.data.substring(10));return new I({args:i,decode:n.decode,name:n.name,signature:n.signature,sighash:n.sighash,value:l.bigNumberify(e.value||"0")})}}return null},D.prototype.parseLog=function(e){for(var t in this.events)if(-1!==t.indexOf("(")){var r=this.events[t];if(!r.anonymous&&r.topic===e.topics[0])return new P({decode:r.decode,name:r.name,signature:r.signature,topic:r.topic,values:r.decode(e.data,e.topics)})}return null},D.isInterface=function(e){return p.isType(e,"Interface")},D.isIndexed=function(e){return p.isType(e,"Indexed")},D);function D(e){if(v.checkNew(this,D),"string"==typeof e){try{e=JSON.parse(e);}catch(t){v.throwError("could not parse ABI JSON",v.INVALID_ARGUMENT,{arg:"abi",errorMessage:t.message,value:e});}if(!Array.isArray(e))return v.throwError("invalid abi",v.INVALID_ARGUMENT,{arg:"abi",value:e}),null}p.defineReadOnly(this,"functions",{}),p.defineReadOnly(this,"events",{});var t=[];e.forEach(function(e){"string"==typeof e&&(e=c.parseSignature(e)),t.push(e);}),p.defineReadOnly(this,"abi",p.deepCopy(t,!0)),t.forEach(C,this),this.deployFunction||C.call(this,{type:"constructor",inputs:[]}),p.setType(this,"Interface");}r.Interface=L;},{"../errors":5,"./abi-coder":58,"./address":59,"./bignumber":62,"./bytes":63,"./hash":64,"./keccak256":70,"./properties":73}],69:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0});var n=e("./address");function i(e){try{var t=JSON.parse(e);}catch(e){return !1}return t.encseed&&t.ethaddr}function o(e){try{var t=JSON.parse(e);}catch(e){return !1}return !(!t.version||parseInt(t.version)!==t.version||3!==parseInt(t.version))}r.isCrowdsaleWallet=i,r.isSecretStorageWallet=o,r.getJsonWalletAddress=function(e){if(i(e))try{return n.getAddress(JSON.parse(e).ethaddr)}catch(e){return null}if(o(e))try{return n.getAddress(JSON.parse(e).address)}catch(e){return null}return null};},{"./address":59}],70:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0});var n=e("js-sha3"),i=e("./bytes");r.keccak256=function(e){return "0x"+n.keccak_256(i.arrayify(e))};},{"./bytes":63,"js-sha3":40}],71:[function(e,t,r){var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var i=n(e("../errors"));function o(e){return function(t){var r=[];return t.InfuraProvider&&r.push(new t.InfuraProvider(e)),t.EtherscanProvider&&r.push(new t.EtherscanProvider(e)),0===r.length?null:t.FallbackProvider?new t.FallbackProvider(r):r[0]}}function a(e,t){return function(r){return r.JsonRpcProvider?new r.JsonRpcProvider(e,t):null}}var s={chainId:1,ensAddress:"0x314159265dd8dbb310642f98f50c066173c1259b",name:"homestead",_defaultProvider:o("homestead")},u={chainId:3,ensAddress:"0x112234455c3a32fd11230c42e7bccd4a84e02010",name:"ropsten",_defaultProvider:o("ropsten")},c={unspecified:{chainId:0,name:"unspecified"},homestead:s,mainnet:s,morden:{chainId:2,name:"morden"},ropsten:u,testnet:u,rinkeby:{chainId:4,ensAddress:"0xe7410170f87102DF0055eB195163A03B7F2Bff4A",name:"rinkeby",_defaultProvider:o("rinkeby")},goerli:{chainId:5,ensAddress:"0x112234455c3a32fd11230c42e7bccd4a84e02010",name:"goerli",_defaultProvider:o("goerli")},kovan:{chainId:42,name:"kovan",_defaultProvider:o("kovan")},classic:{chainId:61,name:"classic",_defaultProvider:a("https://web3.gastracker.io","classic")},classicTestnet:{chainId:62,name:"classicTestnet",_defaultProvider:a("https://web3.gastracker.io/morden","classicTestnet")}};r.getNetwork=function(e){if(null==e)return null;if("number"==typeof e){for(var t in c){var r=c[t];if(r.chainId===e)return {name:r.name,chainId:r.chainId,ensAddress:r.ensAddress||null,_defaultProvider:r._defaultProvider||null}}return {chainId:e,name:"unknown"}}if("string"==typeof e){var n=c[e];return null==n?null:{name:n.name,chainId:n.chainId,ensAddress:n.ensAddress,_defaultProvider:n._defaultProvider||null}}var o=c[e.name];return o?(0!==e.chainId&&e.chainId!==o.chainId&&i.throwError("network chainId mismatch",i.INVALID_ARGUMENT,{arg:"network",value:e}),{name:e.name,chainId:o.chainId,ensAddress:e.ensAddress||o.ensAddress||null,_defaultProvider:e._defaultProvider||o._defaultProvider||null}):("number"!=typeof e.chainId&&i.throwError("invalid network chainId",i.INVALID_ARGUMENT,{arg:"network",value:e}),e)};},{"../errors":5}],72:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0});var n=e("../utils/bytes"),i=e("./hmac");r.pbkdf2=function(e,t,r,o,a){var s;e=n.arrayify(e),t=n.arrayify(t);var u,c,l=1,f=new Uint8Array(o),h=new Uint8Array(t.length+4);h.set(t);for(var d=1;d<=l;d++){h[t.length]=d>>24&255,h[t.length+1]=d>>16&255,h[t.length+2]=d>>8&255,h[t.length+3]=255&d;var p=i.computeHmac(a,e,h);s||(s=p.length,c=new Uint8Array(s),u=o-((l=Math.ceil(o/s))-1)*s),c.set(p);for(var v=1;v<r;v++){p=i.computeHmac(a,e,p);for(var m=0;m<s;m++)c[m]^=p[m];}var y=(d-1)*s,g=d===l?u:s;f.set(n.arrayify(c).slice(0,g),y);}return n.arrayify(f)};},{"../utils/bytes":63,"./hmac":66}],73:[function(e,t,r){var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var i=n(e("../errors"));function o(e,t,r){Object.defineProperty(e,t,{enumerable:!0,value:r,writable:!1});}function a(e,t){return e&&e._ethersType===t}r.defineReadOnly=o,r.setType=function(e,t){Object.defineProperty(e,"_ethersType",{configurable:!1,value:t,writable:!1});},r.isType=a,r.resolveProperties=function(e){var t={},r=[];return Object.keys(e).forEach(function(n){var i=e[n];i instanceof Promise?r.push(i.then(function(e){return t[n]=e,null})):t[n]=i;}),Promise.all(r).then(function(){return t})},r.checkProperties=function(e,t){e&&"object"==typeof e||i.throwError("invalid object",i.INVALID_ARGUMENT,{argument:"object",value:e}),Object.keys(e).forEach(function(r){t[r]||i.throwError("invalid object key - "+r,i.INVALID_ARGUMENT,{argument:"transaction",value:e,key:r});});},r.shallowCopy=function(e){var t={};for(var r in e)t[r]=e[r];return t};var s={boolean:!0,number:!0,string:!0};r.deepCopy=function e(t,r){if(null==t||s[typeof t])return t;if(Array.isArray(t)){var n=t.map(function(t){return e(t,r)});return r&&Object.freeze(n),n}if("object"==typeof t){if(a(t,"BigNumber"))return t;if(a(t,"Description"))return t;if(a(t,"Indexed"))return t;for(var i in n={},t){var u=t[i];void 0!==u&&o(n,i,e(u,r));}return r&&Object.freeze(n),n}if("function"==typeof t)return t;throw new Error("Cannot deepCopy "+typeof t)},r.inheritable=function e(t){return function(r){!function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}});}(r,t),o(r,"inherits",e(r));}};},{"../errors":5}],74:[function(e,t,r){(function(t){Object.defineProperty(r,"__esModule",{value:!0});var n=e("../utils/bytes"),i=e("../utils/properties"),o=t.crypto||t.msCrypto;function a(e){if(e<=0||1024<e||parseInt(String(e))!=e)throw new Error("invalid length");var t=new Uint8Array(e);return o.getRandomValues(t),n.arrayify(t)}o&&o.getRandomValues||(console.log("WARNING: Missing strong random number source; using weak randomBytes"),o={getRandomValues:function(e){for(var t=0;t<20;t++)for(var r=0;r<e.length;r++)t?e[r]^=Math.trunc(256*Math.random()):e[r]=Math.trunc(256*Math.random());return e},_weakCrypto:!0}),r.randomBytes=a,!0===o._weakCrypto&&i.defineReadOnly(a,"_weakCrypto",!0);}).call(this,void 0!==commonjsGlobal$1?commonjsGlobal$1:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});},{"../utils/bytes":63,"../utils/properties":73}],75:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0});var n=e("./bytes");function i(e){for(var t=[];e;)t.unshift(255&e),e>>=8;return t}function o(e,t,r){for(var n=0,i=0;i<r;i++)n=256*n+e[t+i];return n}function a(e,t,r,n){for(var i=[];r<t+1+n;){var o=s(e,r);if(i.push(o.result),t+1+n<(r+=o.consumed))throw new Error("invalid rlp")}return {consumed:1+n,result:i}}function s(e,t){if(0===e.length)throw new Error("invalid rlp data");if(248<=e[t]){if(t+1+(r=e[t]-247)>e.length)throw new Error("too short");if(t+1+r+(i=o(e,t+1,r))>e.length)throw new Error("to short");return a(e,t,t+1+r,r+i)}if(192<=e[t]){if(t+1+(i=e[t]-192)>e.length)throw new Error("invalid rlp data");return a(e,t,t+1,i)}if(184<=e[t]){var r;if(t+1+(r=e[t]-183)>e.length)throw new Error("invalid rlp data");if(t+1+r+(i=o(e,t+1,r))>e.length)throw new Error("invalid rlp data");return {consumed:1+r+i,result:n.hexlify(e.slice(t+1+r,t+1+r+i))}}if(128<=e[t]){var i;if(t+1+(i=e[t]-128)>e.length)throw new Error("invlaid rlp data");return {consumed:1+i,result:n.hexlify(e.slice(t+1,t+1+i))}}return {consumed:1,result:n.hexlify(e[t])}}r.encode=function(e){return n.hexlify(function e(t){if(Array.isArray(t)){var r=[];return t.forEach(function(t){r=r.concat(e(t));}),r.length<=55?(r.unshift(192+r.length),r):((o=i(r.length)).unshift(247+o.length),o.concat(r))}var o,a=Array.prototype.slice.call(n.arrayify(t));return 1===a.length&&a[0]<=127?a:a.length<=55?(a.unshift(128+a.length),a):((o=i(a.length)).unshift(183+o.length),o.concat(a))}(e))},r.decode=function(e){var t=n.arrayify(e),r=s(t,0);if(r.consumed!==t.length)throw new Error("invalid rlp data");return r.result};},{"./bytes":63}],76:[function(e,t,r){var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var i=e("elliptic"),o=e("./address"),a=e("./bytes"),s=e("./hash"),u=e("./keccak256"),c=e("./properties"),l=n(e("../errors")),f=null;function h(){return f=f||new i.ec("secp256k1")}var d=(p.prototype.sign=function(e){var t=h().keyFromPrivate(a.arrayify(this.privateKey)).sign(a.arrayify(e),{canonical:!0});return {recoveryParam:t.recoveryParam,r:a.hexZeroPad("0x"+t.r.toString(16),32),s:a.hexZeroPad("0x"+t.s.toString(16),32),v:27+t.recoveryParam}},p.prototype.computeSharedSecret=function(e){var t=h().keyFromPrivate(a.arrayify(this.privateKey)),r=h().keyFromPublic(a.arrayify(v(e)));return a.hexZeroPad("0x"+t.derive(r.getPublic()).toString(16),32)},p.prototype._addPoint=function(e){var t=h().keyFromPublic(a.arrayify(this.publicKey)),r=h().keyFromPublic(a.arrayify(e));return "0x"+t.pub.add(r.pub).encodeCompressed("hex")},p);function p(e){var t=h().keyFromPrivate(a.arrayify(e));c.defineReadOnly(this,"privateKey",a.hexlify(t.priv.toArray("be",32))),c.defineReadOnly(this,"publicKey","0x"+t.getPublic(!1,"hex")),c.defineReadOnly(this,"compressedPublicKey","0x"+t.getPublic(!0,"hex")),c.defineReadOnly(this,"publicKeyBytes",t.getPublic().encode(null,!0));}function v(e,t){var r=a.arrayify(e);if(32!==r.length)return 33===r.length?t?a.hexlify(r):"0x"+h().keyFromPublic(r).getPublic(!1,"hex"):65===r.length?t?"0x"+h().keyFromPublic(r).getPublic(!0,"hex"):a.hexlify(r):(l.throwError("invalid public or private key",l.INVALID_ARGUMENT,{arg:"key",value:"[REDACTED]"}),null);var n=new d(r);return t?n.compressedPublicKey:n.publicKey}function m(e){var t="0x"+v(e).slice(4);return o.getAddress("0x"+u.keccak256(t).substring(26))}function y(e,t){var r=a.splitSignature(t),n={r:a.arrayify(r.r),s:a.arrayify(r.s)};return "0x"+h().recoverPubKey(a.arrayify(e),n,r.recoveryParam).encode("hex",!1)}function g(e,t){return m(y(a.arrayify(e),t))}r.KeyPair=d,r.computePublicKey=v,r.computeAddress=m,r.recoverPublicKey=y,r.recoverAddress=g,r.verifyMessage=function(e,t){return g(s.hashMessage(e),t)};},{"../errors":5,"./address":59,"./bytes":63,"./hash":64,"./keccak256":70,"./properties":73,elliptic:12}],77:[function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var o=n(e("aes-js")),a=n(e("scrypt-js")),s=n(e("uuid")),u=e("./signing-key"),c=i(e("./hdnode")),l=e("./address"),f=e("./bytes"),h=e("./pbkdf2"),d=e("./keccak256"),p=e("./utf8"),v=e("./random-bytes");function m(e){return "string"==typeof e&&"0x"!==e.substring(0,2)&&(e="0x"+e),f.arrayify(e)}function y(e,t){for(e=String(e);e.length<t;)e="0"+e;return e}function g(e){return "string"==typeof e?p.toUtf8Bytes(e,p.UnicodeNormalizationForm.NFKC):f.arrayify(e)}function b(e,t){for(var r=e,n=t.toLowerCase().split("/"),i=0;i<n.length;i++){var o=null;for(var a in r)if(a.toLowerCase()===n[i]){o=r[a];break}if(null===o)return null;r=o;}return r}r.decryptCrowdsale=function(e,t){var r=JSON.parse(e);t=g(t);var n=l.getAddress(b(r,"ethaddr")),i=m(b(r,"encseed"));if(!i||i.length%16!=0)throw new Error("invalid encseed");var a=h.pbkdf2(t,t,2e3,32,"sha256").slice(0,16),s=i.slice(0,16),c=i.slice(16),v=new o.default.ModeOfOperation.cbc(a,s),y=f.arrayify(v.decrypt(c));y=o.default.padding.pkcs7.strip(y);for(var w="",E=0;E<y.length;E++)w+=String.fromCharCode(y[E]);var _=p.toUtf8Bytes(w),S=new u.SigningKey(d.keccak256(_));if(S.address!==n)throw new Error("corrupt crowdsale wallet");return S},r.decrypt=function(e,t,r){function n(e,t){var r=m(b(i,"crypto/ciphertext"));if(f.hexlify(function(e,t){return d.keccak256(f.concat([e,t]))}(e.slice(16,32),r)).substring(2)!==b(i,"crypto/mac").toLowerCase())return t(new Error("invalid password")),null;var n=function(e,t){if("aes-128-ctr"!==b(i,"crypto/cipher"))return null;var r=m(b(i,"crypto/cipherparams/iv")),n=new o.default.Counter(r),a=new o.default.ModeOfOperation.ctr(e,n);return f.arrayify(a.decrypt(t))}(e.slice(0,16),r),a=e.slice(32,64);if(!n)return t(new Error("unsupported cipher")),null;var s=new u.SigningKey(n);if(s.address!==l.getAddress(i.address))return t(new Error("address mismatch")),null;if("0.1"===b(i,"x-ethers/version")){var h=m(b(i,"x-ethers/mnemonicCiphertext")),p=m(b(i,"x-ethers/mnemonicCounter")),v=new o.default.Counter(p),y=new o.default.ModeOfOperation.ctr(a,v),g=b(i,"x-ethers/path")||c.defaultPath,w=f.arrayify(y.decrypt(h)),E=c.entropyToMnemonic(w),_=c.fromMnemonic(E).derivePath(g);if(_.privateKey!=f.hexlify(n))return t(new Error("mnemonic mismatch")),null;s=new u.SigningKey(_);}return s}var i=JSON.parse(e),s=g(t);return new Promise(function(e,t){var o=b(i,"crypto/kdf");if(o&&"string"==typeof o)if("scrypt"===o.toLowerCase()){var u=m(b(i,"crypto/kdfparams/salt")),c=parseInt(b(i,"crypto/kdfparams/n")),l=parseInt(b(i,"crypto/kdfparams/r")),d=parseInt(b(i,"crypto/kdfparams/p"));if(!c||!l||!d)return void t(new Error("unsupported key-derivation function parameters"));if(0!=(c&c-1))return void t(new Error("unsupported key-derivation function parameter value for N"));if(32!==(y=parseInt(b(i,"crypto/kdfparams/dklen"))))return void t(new Error("unsupported key-derivation derived-key length"));r&&r(0),a.default(s,u,c,l,d,64,function(i,o,a){if(i)i.progress=o,t(i);else if(a){var s=n(a=f.arrayify(a),t);if(!s)return;r&&r(1),e(s);}else if(r)return r(o)});}else if("pbkdf2"===o.toLowerCase()){u=m(b(i,"crypto/kdfparams/salt"));var p=null,v=b(i,"crypto/kdfparams/prf");if("hmac-sha256"===v)p="sha256";else{if("hmac-sha512"!==v)return void t(new Error("unsupported prf"));p="sha512";}var y,g=parseInt(b(i,"crypto/kdfparams/c"));if(32!==(y=parseInt(b(i,"crypto/kdfparams/dklen"))))return void t(new Error("unsupported key-derivation derived-key length"));var w=n(h.pbkdf2(s,u,g,y,p),t);if(!w)return;e(w);}else t(new Error("unsupported key-derivation function"));else t(new Error("unsupported key-derivation function"));})},r.encrypt=function(e,t,r,n){var i;if("function"!=typeof r||n||(n=r,r={}),r=r||{},32!==(i=u.SigningKey.isSigningKey(e)?f.arrayify(e.privateKey):f.arrayify(e)).length)throw new Error("invalid private key");var l=g(t),h=null;if(r.entropy&&(h=f.arrayify(r.entropy)),r.mnemonic)if(h){if(c.entropyToMnemonic(h)!==r.mnemonic)throw new Error("entropy and mnemonic mismatch")}else h=f.arrayify(c.mnemonicToEntropy(r.mnemonic));var p=r.path;h&&!p&&(p=c.defaultPath);var m,b=r.client;b=b||"ethers.js",m=r.salt?f.arrayify(r.salt):v.randomBytes(32);var w=null;if(r.iv){if(16!==(w=f.arrayify(r.iv)).length)throw new Error("invalid iv")}else w=v.randomBytes(16);var E=null;if(r.uuid){if(16!==(E=f.arrayify(r.uuid)).length)throw new Error("invalid uuid")}else E=v.randomBytes(16);var _=1<<17,S=8,A=1;return r.scrypt&&(r.scrypt.N&&(_=r.scrypt.N),r.scrypt.r&&(S=r.scrypt.r),r.scrypt.p&&(A=r.scrypt.p)),new Promise(function(e,t){n&&n(0),a.default(l,m,_,S,A,64,function(r,a,c){if(r)r.progress=a,t(r);else if(c){var l=(c=f.arrayify(c)).slice(0,16),g=c.slice(16,32),T=c.slice(32,64),N=new u.SigningKey(i).address,x=new o.default.Counter(w),M=new o.default.ModeOfOperation.ctr(l,x),I=f.arrayify(M.encrypt(i)),O=d.keccak256(f.concat([g,I])),R={address:N.substring(2).toLowerCase(),id:s.default.v4({random:E}),version:3,Crypto:{cipher:"aes-128-ctr",cipherparams:{iv:f.hexlify(w).substring(2)},ciphertext:f.hexlify(I).substring(2),kdf:"scrypt",kdfparams:{salt:f.hexlify(m).substring(2),n:_,dklen:32,p:A,r:S},mac:O.substring(2)}};if(h){var P=v.randomBytes(16),k=new o.default.Counter(P),C=new o.default.ModeOfOperation.ctr(T,k),L=f.arrayify(C.encrypt(h)),D=new Date,U=D.getUTCFullYear()+"-"+y(D.getUTCMonth()+1,2)+"-"+y(D.getUTCDate(),2)+"T"+y(D.getUTCHours(),2)+"-"+y(D.getUTCMinutes(),2)+"-"+y(D.getUTCSeconds(),2)+".0Z";R["x-ethers"]={client:b,gethFilename:"UTC--"+U+"--"+R.address,mnemonicCounter:f.hexlify(P).substring(2),mnemonicCiphertext:f.hexlify(L).substring(2),path:p,version:"0.1"};}n&&n(1),e(JSON.stringify(R));}else if(n)return n(a)});})};},{"./address":59,"./bytes":63,"./hdnode":65,"./keccak256":70,"./pbkdf2":72,"./random-bytes":74,"./signing-key":80,"./utf8":84,"aes-js":8,"scrypt-js":43,uuid:47}],78:[function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0});var i=n(e("hash.js")),o=e("./bytes");r.ripemd160=function(e){return "0x"+i.default.ripemd160().update(o.arrayify(e)).digest("hex")},r.sha256=function(e){return "0x"+i.default.sha256().update(o.arrayify(e)).digest("hex")},r.sha512=function(e){return "0x"+i.default.sha512().update(o.arrayify(e)).digest("hex")};},{"./bytes":63,"hash.js":27}],79:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0}),e("setimmediate"),r.platform="browser";},{setimmediate:44}],80:[function(e,t,r){var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var i=e("./hdnode"),o=e("./bytes"),a=e("./properties"),s=e("./secp256k1"),u=n(e("../errors")),c=(l.prototype.signDigest=function(e){return this.keyPair.sign(e)},l.prototype.computeSharedSecret=function(e){return this.keyPair.computeSharedSecret(o.arrayify(e))},l.isSigningKey=function(e){return a.isType(e,"SigningKey")},l);function l(e){var t;u.checkNew(this,l),t=i.HDNode.isHDNode(e)?(a.defineReadOnly(this,"mnemonic",e.mnemonic),a.defineReadOnly(this,"path",e.path),o.arrayify(e.privateKey)):("string"==typeof e&&e.match(/^[0-9a-f]*$/i)&&64===e.length&&(e="0x"+e),o.arrayify(e));try{32!==t.length&&u.throwError("exactly 32 bytes required",u.INVALID_ARGUMENT,{arg:"privateKey",value:"[REDACTED]"});}catch(e){var r={arg:"privateKey",reason:e.reason,value:"[REDACTED]"};e.value&&("number"==typeof e.value.length&&(r.length=e.value.length),r.type=typeof e.value),u.throwError("invalid private key",e.code,r);}a.defineReadOnly(this,"privateKey",o.hexlify(t)),a.defineReadOnly(this,"keyPair",new s.KeyPair(t)),a.defineReadOnly(this,"publicKey",this.keyPair.publicKey),a.defineReadOnly(this,"address",s.computeAddress(this.keyPair.publicKey)),a.setType(this,"SigningKey");}r.SigningKey=c;},{"../errors":5,"./bytes":63,"./hdnode":65,"./properties":73,"./secp256k1":76}],81:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0});var n=e("./bignumber"),i=e("./bytes"),o=e("./utf8"),a=e("./keccak256"),s=e("./sha2"),u=new RegExp("^bytes([0-9]+)$"),c=new RegExp("^(u?int)([0-9]*)$"),l=new RegExp("^(.*)\\[([0-9]*)\\]$"),f="0000000000000000000000000000000000000000000000000000000000000000";function h(e,t){if(e.length!=t.length)throw new Error("type/value count mismatch");var r=[];return e.forEach(function(e,a){r.push(function e(t,r,a){switch(t){case"address":return a?i.padZeros(r,32):i.arrayify(r);case"string":return o.toUtf8Bytes(r);case"bytes":return i.arrayify(r);case"bool":return r=r?"0x01":"0x00",a?i.padZeros(r,32):i.arrayify(r)}var s=t.match(c);if(s){if((h=parseInt(s[2]||"256"))%8!=0||0===h||256<h)throw new Error("invalid number type - "+t);return a&&(h=256),r=n.bigNumberify(r).toTwos(h),i.padZeros(r,h/8)}if(s=t.match(u)){var h=parseInt(s[1]);if(String(h)!=s[1]||0===h||32<h)throw new Error("invalid number type - "+t);if(i.arrayify(r).byteLength!==h)throw new Error("invalid value for "+t);return a?i.arrayify((r+f).substring(0,66)):r}if((s=t.match(l))&&Array.isArray(r)){var d=s[1];if(parseInt(s[2]||String(r.length))!=r.length)throw new Error("invalid value for "+t);var p=[];return r.forEach(function(t){p.push(e(d,t,!0));}),i.concat(p)}throw new Error("unknown type - "+t)}(e,t[a]));}),i.hexlify(i.concat(r))}r.pack=h,r.keccak256=function(e,t){return a.keccak256(h(e,t))},r.sha256=function(e,t){return s.sha256(h(e,t))};},{"./bignumber":62,"./bytes":63,"./keccak256":70,"./sha2":78,"./utf8":84}],82:[function(e,t,r){var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var i=e("../constants"),o=n(e("../errors")),a=e("./secp256k1"),s=e("./address"),u=e("./bignumber"),c=e("./bytes"),l=e("./keccak256"),f=e("./properties"),h=n(e("./rlp")),d=e("../providers/abstract-provider");function p(e){return "0x"===e?i.Zero:u.bigNumberify(e)}var v=[{name:"nonce",maxLength:32},{name:"gasPrice",maxLength:32},{name:"gasLimit",maxLength:32},{name:"to",length:20},{name:"value",maxLength:32},{name:"data"}],m={chainId:!0,data:!0,gasLimit:!0,gasPrice:!0,nonce:!0,to:!0,value:!0};r.serialize=function(e,t){f.checkProperties(e,m);var r=[];v.forEach(function(t){var n=e[t.name]||[];n=c.arrayify(c.hexlify(n)),t.length&&n.length!==t.length&&0<n.length&&o.throwError("invalid length for "+t.name,o.INVALID_ARGUMENT,{arg:"transaction"+t.name,value:n}),t.maxLength&&(n=c.stripZeros(n)).length>t.maxLength&&o.throwError("invalid length for "+t.name,o.INVALID_ARGUMENT,{arg:"transaction"+t.name,value:n}),r.push(c.hexlify(n));}),null!=e.chainId&&0!==e.chainId&&(r.push(c.hexlify(e.chainId)),r.push("0x"),r.push("0x"));var n=h.encode(r);if(!t)return n;var i=c.splitSignature(t),a=27+i.recoveryParam;return 9===r.length&&(r.pop(),r.pop(),r.pop(),a+=2*e.chainId+8),r.push(c.hexlify(a)),r.push(c.stripZeros(c.arrayify(i.r))),r.push(c.stripZeros(c.arrayify(i.s))),h.encode(r)},r.parse=function(e){var t=h.decode(e);9!==t.length&&6!==t.length&&o.throwError("invalid raw transaction",o.INVALID_ARGUMENT,{arg:"rawTransactin",value:e});var r={nonce:p(t[0]).toNumber(),gasPrice:p(t[1]),gasLimit:p(t[2]),to:function(e){return "0x"===e?null:s.getAddress(e)}(t[3]),value:p(t[4]),data:t[5],chainId:0};if(6===t.length)return r;try{r.v=u.bigNumberify(t[6]).toNumber();}catch(e){return o.info(e),r}if(r.r=c.hexZeroPad(t[7],32),r.s=c.hexZeroPad(t[8],32),u.bigNumberify(r.r).isZero()&&u.bigNumberify(r.s).isZero())r.chainId=r.v,r.v=0;else{r.chainId=Math.floor((r.v-35)/2),r.chainId<0&&(r.chainId=0);var n=r.v-27,i=t.slice(0,6);0!==r.chainId&&(i.push(c.hexlify(r.chainId)),i.push("0x"),i.push("0x"),n-=2*r.chainId+8);var f=l.keccak256(h.encode(i));try{r.from=a.recoverAddress(f,{r:c.hexlify(r.r),s:c.hexlify(r.s),recoveryParam:n});}catch(e){o.info(e);}r.hash=l.keccak256(e);}return r},r.populateTransaction=function(e,t,r){d.Provider.isProvider(t)||o.throwError("missing provider",o.INVALID_ARGUMENT,{argument:"provider",value:t}),f.checkProperties(e,m);var n=f.shallowCopy(e);if(null!=n.to&&(n.to=t.resolveName(n.to)),null==n.gasPrice&&(n.gasPrice=t.getGasPrice()),null==n.nonce&&(n.nonce=t.getTransactionCount(r)),null==n.gasLimit){var i=f.shallowCopy(n);i.from=r,n.gasLimit=t.estimateGas(i);}return null==n.chainId&&(n.chainId=t.getNetwork().then(function(e){return e.chainId})),f.resolveProperties(n)};},{"../constants":3,"../errors":5,"../providers/abstract-provider":49,"./address":59,"./bignumber":62,"./bytes":63,"./keccak256":70,"./properties":73,"./rlp":75,"./secp256k1":76}],83:[function(e,t,r){var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var i,o=e("../constants"),a=n(e("../errors")),s=e("./bignumber"),u={};function c(e){return {decimals:e.length-1,tenPower:s.bigNumberify(e)}}function l(e){var t=u[String(e).toLowerCase()];if(!t&&"number"==typeof e&&parseInt(String(e))==e&&0<=e&&e<=256){for(var r="1",n=0;n<e;n++)r+="0";t=c(r);}return t||a.throwError("invalid unitType",a.INVALID_ARGUMENT,{argument:"name",value:e}),t}function f(e,t){var r=l(t),n=(e=s.bigNumberify(e)).lt(o.Zero);n&&(e=e.mul(o.NegativeOne));for(var i=e.mod(r.tenPower).toString();i.length<r.decimals;)i="0"+i;return i=i.match(/^([0-9]*[1-9]|0)(0*)/)[1],e=e.div(r.tenPower).toString()+"."+i,n&&(e="-"+e),e}function h(e,t){null==t&&(t=18);var r=l(t);if("string"==typeof e&&e.match(/^-?[0-9.,]+$/)||a.throwError("invalid decimal value",a.INVALID_ARGUMENT,{arg:"value",value:e}),0===r.decimals)return s.bigNumberify(e);var n="-"===e.substring(0,1);n&&(e=e.substring(1)),"."===e&&a.throwError("missing value",a.INVALID_ARGUMENT,{arg:"value",value:e});var i=e.split(".");2<i.length&&a.throwError("too many decimal points",a.INVALID_ARGUMENT,{arg:"value",value:e});var u=i[0],c=i[1];for(u=u||"0",(c=c||"0").length>r.decimals&&a.throwError("underflow occurred",a.NUMERIC_FAULT,{operation:"division",fault:"underflow"});c.length<r.decimals;)c+="0";var f=s.bigNumberify(u),h=s.bigNumberify(c),d=f.mul(r.tenPower).add(h);return n&&(d=d.mul(o.NegativeOne)),d}i="1",["wei","kwei","Mwei","Gwei","szabo","finney","ether"].forEach(function(e){var t=c(i);u[e.toLowerCase()]=t,u[String(t.decimals)]=t,i+="000";}),r.commify=function(e){var t=String(e).split(".");(2<t.length||!t[0].match(/^-?[0-9]*$/)||t[1]&&!t[1].match(/^[0-9]*$/)||"."===e||"-."===e)&&a.throwError("invalid value",a.INVALID_ARGUMENT,{argument:"value",value:e});var r=t[0],n="";for("-"===r.substring(0,1)&&(n="-",r=r.substring(1));"0"===r.substring(0,1);)r=r.substring(1);""===r&&(r="0");var i="";2===t.length&&(i="."+(t[1]||"0"));for(var o=[];r.length;){if(r.length<=3){o.unshift(r);break}var s=r.length-3;o.unshift(r.substring(s)),r=r.substring(0,s);}return n+o.join(",")+i},r.formatUnits=f,r.parseUnits=h,r.formatEther=function(e){return f(e,18)},r.parseEther=function(e){return h(e,18)};},{"../constants":3,"../errors":5,"./bignumber":62}],84:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0});var n,i,o=e("../constants"),a=e("../errors"),s=e("./bytes");function u(e,t){void 0===t&&(t=n.current),t!=n.current&&(a.checkNormalize(),e=e.normalize(t));for(var r=[],i=0;i<e.length;i++){var o=e.charCodeAt(i);if(o<128)r.push(o);else if(o<2048)r.push(o>>6|192),r.push(63&o|128);else if(55296==(64512&o)){i++;var u=e.charCodeAt(i);if(i>=e.length||56320!=(64512&u))throw new Error("invalid utf-8 string");o=65536+((1023&o)<<10)+(1023&u),r.push(o>>18|240),r.push(o>>12&63|128),r.push(o>>6&63|128),r.push(63&o|128);}else r.push(o>>12|224),r.push(o>>6&63|128),r.push(63&o|128);}return s.arrayify(r)}function c(e,t){e=s.arrayify(e);for(var r="",n=0;n<e.length;){var i=e[n++];if(i>>7!=0){var o=null,a=null;if(192==(224&i))o=1,a=127;else if(224==(240&i))o=2,a=2047;else{if(240!=(248&i)){if(t)continue;if(128==(192&i))throw new Error("invalid utf8 byte sequence; unexpected continuation byte");throw new Error("invalid utf8 byte sequence; invalid prefix")}o=3,a=65535;}if(n+o>e.length){if(!t)throw new Error("invalid utf8 byte sequence; too short");for(;n<e.length&&e[n]>>6==2;n++);}else{for(var u=i&(1<<8-o-1)-1,c=0;c<o;c++){var l=e[n];if(128!=(192&l)){u=null;break}u=u<<6|63&l,n++;}if(null!==u)if(u<=a){if(!t)throw new Error("invalid utf8 byte sequence; overlong")}else if(1114111<u){if(!t)throw new Error("invalid utf8 byte sequence; out-of-range")}else if(55296<=u&&u<=57343){if(!t)throw new Error("invalid utf8 byte sequence; utf-16 surrogate")}else u<=65535?r+=String.fromCharCode(u):(u-=65536,r+=String.fromCharCode(55296+(u>>10&1023),56320+(1023&u)));else if(!t)throw new Error("invalid utf8 byte sequence; invalid continuation byte")}}else r+=String.fromCharCode(i);}return r}(i=n=r.UnicodeNormalizationForm||(r.UnicodeNormalizationForm={})).current="",i.NFC="NFC",i.NFD="NFD",i.NFKC="NFKC",i.NFKD="NFKD",r.toUtf8Bytes=u,r.toUtf8String=c,r.formatBytes32String=function(e){var t=u(e);if(31<t.length)throw new Error("bytes32 string must be less than 32 bytes");return s.hexlify(s.concat([t,o.HashZero]).slice(0,32))},r.parseBytes32String=function(e){var t=s.arrayify(e);if(32!==t.length)throw new Error("invalid bytes32 - not 32 bytes long");if(0!==t[31])throw new Error("invalid bytes32 string - no null terminator");for(var r=31;0===t[r-1];)r--;return c(t.slice(0,r))};},{"../constants":3,"../errors":5,"./bytes":63}],85:[function(e,t,r){var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var i=e("xmlhttprequest"),o=e("./base64"),a=e("./properties"),s=e("./utf8"),u=n(e("../errors"));r.fetchJson=function(e,t,r){var n={},a=null,c=12e4;if("string"==typeof e)a=e;else if("object"==typeof e){if(null==e.url&&u.throwError("missing URL",u.MISSING_ARGUMENT,{arg:"url"}),a=e.url,"number"==typeof e.timeout&&0<e.timeout&&(c=e.timeout),e.headers)for(var l in e.headers)n[l.toLowerCase()]={key:l,value:String(e.headers[l])};if(null!=e.user&&null!=e.password){"https:"!==a.substring(0,6)&&!0!==e.allowInsecure&&u.throwError("basic authentication requires a secure https url",u.INVALID_ARGUMENT,{arg:"url",url:a,user:e.user,password:"[REDACTED]"});var f=e.user+":"+e.password;n.authorization={key:"Authorization",value:"Basic "+o.encode(s.toUtf8Bytes(f))};}}return new Promise(function(e,o){var s=new i.XMLHttpRequest,u=null;function l(){null!=u&&(clearTimeout(u),u=null);}u=setTimeout(function(){null!=u&&(u=null,o(new Error("timeout")),setTimeout(function(){s.abort();},0));},c),t?(s.open("POST",a,!0),n["content-type"]={key:"Content-Type",value:"application/json"}):s.open("GET",a,!0),Object.keys(n).forEach(function(e){var t=n[e];s.setRequestHeader(t.key,t.value);}),s.onreadystatechange=function(){if(4===s.readyState){if(200!=s.status){l();var n=new Error("invalid response - "+s.status);return n.statusCode=s.status,s.responseText&&(n.responseText=s.responseText),void o(n)}var i=null;try{i=JSON.parse(s.responseText);}catch(n){l();var u=new Error("invalid json response");return u.orginialError=n,u.responseText=s.responseText,null!=t&&(u.requestBody=t),u.url=a,void o(u)}if(r)try{i=r(i);}catch(n){return l(),n.url=a,n.body=t,n.responseText=s.responseText,void o(n)}l(),e(i);}},s.onerror=function(e){l(),o(e);};try{null!=t?s.send(t):s.send();}catch(u){l();var f=new Error("connection error");f.error=u,o(f);}})},r.poll=function(e,t){return t=t||{},null==(t=a.shallowCopy(t)).floor&&(t.floor=0),null==t.ceiling&&(t.ceiling=1e4),null==t.interval&&(t.interval=250),new Promise(function(r,n){var i=null,o=!1,a=function(){return !o&&(o=!0,i&&clearTimeout(i),!0)};t.timeout&&(i=setTimeout(function(){a()&&n(new Error("timeout"));},t.timeout));var s=t.fastRetry||null,u=0;!function i(){return e().then(function(e){if(void 0!==e)a()&&r(e);else if(t.onceBlock)t.onceBlock.once("block",i);else if(!o){u++;var n=t.interval*parseInt(String(Math.random()*Math.pow(2,u)));n<t.floor&&(n=t.floor),n>t.ceiling&&(n=t.ceiling),s&&(u--,n=s,s=null),setTimeout(i,n);}return null},function(e){a()&&n(e);})}();})};},{"../errors":5,"./base64":60,"./properties":73,"./utf8":84,xmlhttprequest:48}],86:[function(e,t,r){(function(t){Object.defineProperty(r,"__esModule",{value:!0});var n=e("../utils/hash"),i=e("../utils/properties");r.check=function(e){for(var t=[],r=0;r<2048;r++){var i=e.getWord(r);if(r!==e.getWordIndex(i))return "0x";t.push(i);}return n.id(t.join("\n")+"\n")};var o=(a.prototype.split=function(e){return e.toLowerCase().split(/ +/g)},a.prototype.join=function(e){return e.join(" ")},a);function a(e){i.defineReadOnly(this,"locale",e);}r.Wordlist=o,r.register=function(e,t){t=t||e.locale;};}).call(this,void 0!==commonjsGlobal$1?commonjsGlobal$1:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});},{"../utils/hash":64,"../utils/properties":73}],87:[function(e,t,r){var n,i=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t;}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);},function(e,t){function r(){this.constructor=e;}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r);}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(r,"__esModule",{value:!0});var a,s=e("./utils/bytes"),u=e("./utils/hash"),c=e("./utils/hdnode"),l=e("./utils/json-wallet"),f=e("./utils/keccak256"),h=e("./utils/properties"),d=e("./utils/random-bytes"),p=o(e("./utils/secret-storage")),v=e("./utils/signing-key"),m=e("./utils/transaction"),y=e("./abstract-signer"),g=e("./providers/abstract-provider"),b=o(e("./errors")),w=(i(E,a=y.Signer),Object.defineProperty(E.prototype,"address",{get:function(){return this.signingKey.address},enumerable:!0,configurable:!0}),Object.defineProperty(E.prototype,"mnemonic",{get:function(){return this.signingKey.mnemonic},enumerable:!0,configurable:!0}),Object.defineProperty(E.prototype,"path",{get:function(){return this.signingKey.path},enumerable:!0,configurable:!0}),Object.defineProperty(E.prototype,"privateKey",{get:function(){return this.signingKey.privateKey},enumerable:!0,configurable:!0}),E.prototype.connect=function(e){return g.Provider.isProvider(e)||b.throwError("invalid provider",b.INVALID_ARGUMENT,{argument:"provider",value:e}),new E(this.signingKey,e)},E.prototype.getAddress=function(){return Promise.resolve(this.address)},E.prototype.sign=function(e){var t=this;return h.resolveProperties(e).then(function(e){var r=m.serialize(e),n=t.signingKey.signDigest(f.keccak256(r));return m.serialize(e,n)})},E.prototype.signMessage=function(e){return Promise.resolve(s.joinSignature(this.signingKey.signDigest(u.hashMessage(e))))},E.prototype.getBalance=function(e){if(!this.provider)throw new Error("missing provider");return this.provider.getBalance(this.address,e)},E.prototype.getTransactionCount=function(e){if(!this.provider)throw new Error("missing provider");return this.provider.getTransactionCount(this.address,e)},E.prototype.sendTransaction=function(e){var t=this;if(!this.provider)throw new Error("missing provider");return null==e.nonce&&((e=h.shallowCopy(e)).nonce=this.getTransactionCount("pending")),m.populateTransaction(e,this.provider,this.address).then(function(e){return t.sign(e).then(function(e){return t.provider.sendTransaction(e)})})},E.prototype.encrypt=function(e,t,r){if("function"!=typeof t||r||(r=t,t={}),r&&"function"!=typeof r)throw new Error("invalid callback");return t=t||{},this.mnemonic&&((t=h.shallowCopy(t)).mnemonic=this.mnemonic,t.path=this.path),p.encrypt(this.privateKey,e,t,r)},E.createRandom=function(e){var t=d.randomBytes(16);(e=e||{}).extraEntropy&&(t=s.arrayify(f.keccak256(s.concat([t,e.extraEntropy])).substring(0,34)));var r=c.entropyToMnemonic(t,e.locale);return E.fromMnemonic(r,e.path,e.locale)},E.fromEncryptedJson=function(e,t,r){if(l.isCrowdsaleWallet(e))try{r&&r(0);var n=p.decryptCrowdsale(e,t);return r&&r(1),Promise.resolve(new E(n))}catch(e){return Promise.reject(e)}else if(l.isSecretStorageWallet(e))return p.decrypt(e,t,r).then(function(e){return new E(e)});return Promise.reject("invalid wallet JSON")},E.fromMnemonic=function(e,t,r){return t=t||c.defaultPath,new E(c.fromMnemonic(e,r).derivePath(t))},E);function E(e,t){var r=a.call(this)||this;return b.checkNew(r,E),v.SigningKey.isSigningKey(e)?h.defineReadOnly(r,"signingKey",e):h.defineReadOnly(r,"signingKey",new v.SigningKey(e)),h.defineReadOnly(r,"provider",t),r}r.Wallet=w;},{"./abstract-signer":2,"./errors":5,"./providers/abstract-provider":49,"./utils/bytes":63,"./utils/hash":64,"./utils/hdnode":65,"./utils/json-wallet":69,"./utils/keccak256":70,"./utils/properties":73,"./utils/random-bytes":74,"./utils/secret-storage":77,"./utils/signing-key":80,"./utils/transaction":82}],88:[function(e,t,r){Object.defineProperty(r,"__esModule",{value:!0});var n=e("../wordlists/lang-en").langEn;r.en=n;},{"../wordlists/lang-en":89}],89:[function(e,t,r){var n,i=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t;}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);},function(e,t){function r(){this.constructor=e;}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r);});Object.defineProperty(r,"__esModule",{value:!0});var o,a=e("../utils/wordlist"),s="AbandonAbilityAbleAboutAboveAbsentAbsorbAbstractAbsurdAbuseAccessAccidentAccountAccuseAchieveAcidAcousticAcquireAcrossActActionActorActressActualAdaptAddAddictAddressAdjustAdmitAdultAdvanceAdviceAerobicAffairAffordAfraidAgainAgeAgentAgreeAheadAimAirAirportAisleAlarmAlbumAlcoholAlertAlienAllAlleyAllowAlmostAloneAlphaAlreadyAlsoAlterAlwaysAmateurAmazingAmongAmountAmusedAnalystAnchorAncientAngerAngleAngryAnimalAnkleAnnounceAnnualAnotherAnswerAntennaAntiqueAnxietyAnyApartApologyAppearAppleApproveAprilArchArcticAreaArenaArgueArmArmedArmorArmyAroundArrangeArrestArriveArrowArtArtefactArtistArtworkAskAspectAssaultAssetAssistAssumeAsthmaAthleteAtomAttackAttendAttitudeAttractAuctionAuditAugustAuntAuthorAutoAutumnAverageAvocadoAvoidAwakeAwareAwayAwesomeAwfulAwkwardAxisBabyBachelorBaconBadgeBagBalanceBalconyBallBambooBananaBannerBarBarelyBargainBarrelBaseBasicBasketBattleBeachBeanBeautyBecauseBecomeBeefBeforeBeginBehaveBehindBelieveBelowBeltBenchBenefitBestBetrayBetterBetweenBeyondBicycleBidBikeBindBiologyBirdBirthBitterBlackBladeBlameBlanketBlastBleakBlessBlindBloodBlossomBlouseBlueBlurBlushBoardBoatBodyBoilBombBoneBonusBookBoostBorderBoringBorrowBossBottomBounceBoxBoyBracketBrainBrandBrassBraveBreadBreezeBrickBridgeBriefBrightBringBriskBroccoliBrokenBronzeBroomBrotherBrownBrushBubbleBuddyBudgetBuffaloBuildBulbBulkBulletBundleBunkerBurdenBurgerBurstBusBusinessBusyButterBuyerBuzzCabbageCabinCableCactusCageCakeCallCalmCameraCampCanCanalCancelCandyCannonCanoeCanvasCanyonCapableCapitalCaptainCarCarbonCardCargoCarpetCarryCartCaseCashCasinoCastleCasualCatCatalogCatchCategoryCattleCaughtCauseCautionCaveCeilingCeleryCementCensusCenturyCerealCertainChairChalkChampionChangeChaosChapterChargeChaseChatCheapCheckCheeseChefCherryChestChickenChiefChildChimneyChoiceChooseChronicChuckleChunkChurnCigarCinnamonCircleCitizenCityCivilClaimClapClarifyClawClayCleanClerkCleverClickClientCliffClimbClinicClipClockClogCloseClothCloudClownClubClumpClusterClutchCoachCoastCoconutCodeCoffeeCoilCoinCollectColorColumnCombineComeComfortComicCommonCompanyConcertConductConfirmCongressConnectConsiderControlConvinceCookCoolCopperCopyCoralCoreCornCorrectCostCottonCouchCountryCoupleCourseCousinCoverCoyoteCrackCradleCraftCramCraneCrashCraterCrawlCrazyCreamCreditCreekCrewCricketCrimeCrispCriticCropCrossCrouchCrowdCrucialCruelCruiseCrumbleCrunchCrushCryCrystalCubeCultureCupCupboardCuriousCurrentCurtainCurveCushionCustomCuteCycleDadDamageDampDanceDangerDaringDashDaughterDawnDayDealDebateDebrisDecadeDecemberDecideDeclineDecorateDecreaseDeerDefenseDefineDefyDegreeDelayDeliverDemandDemiseDenialDentistDenyDepartDependDepositDepthDeputyDeriveDescribeDesertDesignDeskDespairDestroyDetailDetectDevelopDeviceDevoteDiagramDialDiamondDiaryDiceDieselDietDifferDigitalDignityDilemmaDinnerDinosaurDirectDirtDisagreeDiscoverDiseaseDishDismissDisorderDisplayDistanceDivertDivideDivorceDizzyDoctorDocumentDogDollDolphinDomainDonateDonkeyDonorDoorDoseDoubleDoveDraftDragonDramaDrasticDrawDreamDressDriftDrillDrinkDripDriveDropDrumDryDuckDumbDuneDuringDustDutchDutyDwarfDynamicEagerEagleEarlyEarnEarthEasilyEastEasyEchoEcologyEconomyEdgeEditEducateEffortEggEightEitherElbowElderElectricElegantElementElephantElevatorEliteElseEmbarkEmbodyEmbraceEmergeEmotionEmployEmpowerEmptyEnableEnactEndEndlessEndorseEnemyEnergyEnforceEngageEngineEnhanceEnjoyEnlistEnoughEnrichEnrollEnsureEnterEntireEntryEnvelopeEpisodeEqualEquipEraEraseErodeErosionErrorEruptEscapeEssayEssenceEstateEternalEthicsEvidenceEvilEvokeEvolveExactExampleExcessExchangeExciteExcludeExcuseExecuteExerciseExhaustExhibitExileExistExitExoticExpandExpectExpireExplainExposeExpressExtendExtraEyeEyebrowFabricFaceFacultyFadeFaintFaithFallFalseFameFamilyFamousFanFancyFantasyFarmFashionFatFatalFatherFatigueFaultFavoriteFeatureFebruaryFederalFeeFeedFeelFemaleFenceFestivalFetchFeverFewFiberFictionFieldFigureFileFilmFilterFinalFindFineFingerFinishFireFirmFirstFiscalFishFitFitnessFixFlagFlameFlashFlatFlavorFleeFlightFlipFloatFlockFloorFlowerFluidFlushFlyFoamFocusFogFoilFoldFollowFoodFootForceForestForgetForkFortuneForumForwardFossilFosterFoundFoxFragileFrameFrequentFreshFriendFringeFrogFrontFrostFrownFrozenFruitFuelFunFunnyFurnaceFuryFutureGadgetGainGalaxyGalleryGameGapGarageGarbageGardenGarlicGarmentGasGaspGateGatherGaugeGazeGeneralGeniusGenreGentleGenuineGestureGhostGiantGiftGiggleGingerGiraffeGirlGiveGladGlanceGlareGlassGlideGlimpseGlobeGloomGloryGloveGlowGlueGoatGoddessGoldGoodGooseGorillaGospelGossipGovernGownGrabGraceGrainGrantGrapeGrassGravityGreatGreenGridGriefGritGroceryGroupGrowGruntGuardGuessGuideGuiltGuitarGunGymHabitHairHalfHammerHamsterHandHappyHarborHardHarshHarvestHatHaveHawkHazardHeadHealthHeartHeavyHedgehogHeightHelloHelmetHelpHenHeroHiddenHighHillHintHipHireHistoryHobbyHockeyHoldHoleHolidayHollowHomeHoneyHoodHopeHornHorrorHorseHospitalHostHotelHourHoverHubHugeHumanHumbleHumorHundredHungryHuntHurdleHurryHurtHusbandHybridIceIconIdeaIdentifyIdleIgnoreIllIllegalIllnessImageImitateImmenseImmuneImpactImposeImproveImpulseInchIncludeIncomeIncreaseIndexIndicateIndoorIndustryInfantInflictInformInhaleInheritInitialInjectInjuryInmateInnerInnocentInputInquiryInsaneInsectInsideInspireInstallIntactInterestIntoInvestInviteInvolveIronIslandIsolateIssueItemIvoryJacketJaguarJarJazzJealousJeansJellyJewelJobJoinJokeJourneyJoyJudgeJuiceJumpJungleJuniorJunkJustKangarooKeenKeepKetchupKeyKickKidKidneyKindKingdomKissKitKitchenKiteKittenKiwiKneeKnifeKnockKnowLabLabelLaborLadderLadyLakeLampLanguageLaptopLargeLaterLatinLaughLaundryLavaLawLawnLawsuitLayerLazyLeaderLeafLearnLeaveLectureLeftLegLegalLegendLeisureLemonLendLengthLensLeopardLessonLetterLevelLiarLibertyLibraryLicenseLifeLiftLightLikeLimbLimitLinkLionLiquidListLittleLiveLizardLoadLoanLobsterLocalLockLogicLonelyLongLoopLotteryLoudLoungeLoveLoyalLuckyLuggageLumberLunarLunchLuxuryLyricsMachineMadMagicMagnetMaidMailMainMajorMakeMammalManManageMandateMangoMansionManualMapleMarbleMarchMarginMarineMarketMarriageMaskMassMasterMatchMaterialMathMatrixMatterMaximumMazeMeadowMeanMeasureMeatMechanicMedalMediaMelodyMeltMemberMemoryMentionMenuMercyMergeMeritMerryMeshMessageMetalMethodMiddleMidnightMilkMillionMimicMindMinimumMinorMinuteMiracleMirrorMiseryMissMistakeMixMixedMixtureMobileModelModifyMomMomentMonitorMonkeyMonsterMonthMoonMoralMoreMorningMosquitoMotherMotionMotorMountainMouseMoveMovieMuchMuffinMuleMultiplyMuscleMuseumMushroomMusicMustMutualMyselfMysteryMythNaiveNameNapkinNarrowNastyNationNatureNearNeckNeedNegativeNeglectNeitherNephewNerveNestNetNetworkNeutralNeverNewsNextNiceNightNobleNoiseNomineeNoodleNormalNorthNoseNotableNoteNothingNoticeNovelNowNuclearNumberNurseNutOakObeyObjectObligeObscureObserveObtainObviousOccurOceanOctoberOdorOffOfferOfficeOftenOilOkayOldOliveOlympicOmitOnceOneOnionOnlineOnlyOpenOperaOpinionOpposeOptionOrangeOrbitOrchardOrderOrdinaryOrganOrientOriginalOrphanOstrichOtherOutdoorOuterOutputOutsideOvalOvenOverOwnOwnerOxygenOysterOzonePactPaddlePagePairPalacePalmPandaPanelPanicPantherPaperParadeParentParkParrotPartyPassPatchPathPatientPatrolPatternPausePavePaymentPeacePeanutPearPeasantPelicanPenPenaltyPencilPeoplePepperPerfectPermitPersonPetPhonePhotoPhrasePhysicalPianoPicnicPicturePiecePigPigeonPillPilotPinkPioneerPipePistolPitchPizzaPlacePlanetPlasticPlatePlayPleasePledgePluckPlugPlungePoemPoetPointPolarPolePolicePondPonyPoolPopularPortionPositionPossiblePostPotatoPotteryPovertyPowderPowerPracticePraisePredictPreferPreparePresentPrettyPreventPricePridePrimaryPrintPriorityPrisonPrivatePrizeProblemProcessProduceProfitProgramProjectPromoteProofPropertyProsperProtectProudProvidePublicPuddingPullPulpPulsePumpkinPunchPupilPuppyPurchasePurityPurposePursePushPutPuzzlePyramidQualityQuantumQuarterQuestionQuickQuitQuizQuoteRabbitRaccoonRaceRackRadarRadioRailRainRaiseRallyRampRanchRandomRangeRapidRareRateRatherRavenRawRazorReadyRealReasonRebelRebuildRecallReceiveRecipeRecordRecycleReduceReflectReformRefuseRegionRegretRegularRejectRelaxReleaseReliefRelyRemainRememberRemindRemoveRenderRenewRentReopenRepairRepeatReplaceReportRequireRescueResembleResistResourceResponseResultRetireRetreatReturnReunionRevealReviewRewardRhythmRibRibbonRiceRichRideRidgeRifleRightRigidRingRiotRippleRiskRitualRivalRiverRoadRoastRobotRobustRocketRomanceRoofRookieRoomRoseRotateRoughRoundRouteRoyalRubberRudeRugRuleRunRunwayRuralSadSaddleSadnessSafeSailSaladSalmonSalonSaltSaluteSameSampleSandSatisfySatoshiSauceSausageSaveSayScaleScanScareScatterSceneSchemeSchoolScienceScissorsScorpionScoutScrapScreenScriptScrubSeaSearchSeasonSeatSecondSecretSectionSecuritySeedSeekSegmentSelectSellSeminarSeniorSenseSentenceSeriesServiceSessionSettleSetupSevenShadowShaftShallowShareShedShellSheriffShieldShiftShineShipShiverShockShoeShootShopShortShoulderShoveShrimpShrugShuffleShySiblingSickSideSiegeSightSignSilentSilkSillySilverSimilarSimpleSinceSingSirenSisterSituateSixSizeSkateSketchSkiSkillSkinSkirtSkullSlabSlamSleepSlenderSliceSlideSlightSlimSloganSlotSlowSlushSmallSmartSmileSmokeSmoothSnackSnakeSnapSniffSnowSoapSoccerSocialSockSodaSoftSolarSoldierSolidSolutionSolveSomeoneSongSoonSorrySortSoulSoundSoupSourceSouthSpaceSpareSpatialSpawnSpeakSpecialSpeedSpellSpendSphereSpiceSpiderSpikeSpinSpiritSplitSpoilSponsorSpoonSportSpotSpraySpreadSpringSpySquareSqueezeSquirrelStableStadiumStaffStageStairsStampStandStartStateStaySteakSteelStemStepStereoStickStillStingStockStomachStoneStoolStoryStoveStrategyStreetStrikeStrongStruggleStudentStuffStumbleStyleSubjectSubmitSubwaySuccessSuchSuddenSufferSugarSuggestSuitSummerSunSunnySunsetSuperSupplySupremeSureSurfaceSurgeSurpriseSurroundSurveySuspectSustainSwallowSwampSwapSwarmSwearSweetSwiftSwimSwingSwitchSwordSymbolSymptomSyrupSystemTableTackleTagTailTalentTalkTankTapeTargetTaskTasteTattooTaxiTeachTeamTellTenTenantTennisTentTermTestTextThankThatThemeThenTheoryThereTheyThingThisThoughtThreeThriveThrowThumbThunderTicketTideTigerTiltTimberTimeTinyTipTiredTissueTitleToastTobaccoTodayToddlerToeTogetherToiletTokenTomatoTomorrowToneTongueTonightToolToothTopTopicToppleTorchTornadoTortoiseTossTotalTouristTowardTowerTownToyTrackTradeTrafficTragicTrainTransferTrapTrashTravelTrayTreatTreeTrendTrialTribeTrickTriggerTrimTripTrophyTroubleTruckTrueTrulyTrumpetTrustTruthTryTubeTuitionTumbleTunaTunnelTurkeyTurnTurtleTwelveTwentyTwiceTwinTwistTwoTypeTypicalUglyUmbrellaUnableUnawareUncleUncoverUnderUndoUnfairUnfoldUnhappyUniformUniqueUnitUniverseUnknownUnlockUntilUnusualUnveilUpdateUpgradeUpholdUponUpperUpsetUrbanUrgeUsageUseUsedUsefulUselessUsualUtilityVacantVacuumVagueValidValleyValveVanVanishVaporVariousVastVaultVehicleVelvetVendorVentureVenueVerbVerifyVersionVeryVesselVeteranViableVibrantViciousVictoryVideoViewVillageVintageViolinVirtualVirusVisaVisitVisualVitalVividVocalVoiceVoidVolcanoVolumeVoteVoyageWageWagonWaitWalkWallWalnutWantWarfareWarmWarriorWashWaspWasteWaterWaveWayWealthWeaponWearWeaselWeatherWebWeddingWeekendWeirdWelcomeWestWetWhaleWhatWheatWheelWhenWhereWhipWhisperWideWidthWifeWildWillWinWindowWineWingWinkWinnerWinterWireWisdomWiseWishWitnessWolfWomanWonderWoodWoolWordWorkWorldWorryWorthWrapWreckWrestleWristWriteWrongYardYearYellowYouYoungYouthZebraZeroZoneZoo",u=null;function c(e){if(null==u&&(u=s.replace(/([A-Z])/g," $1").toLowerCase().substring(1).split(" "),"0x3c8acc1e7b08d8e76f9fda015ef48dc8c710a73cb7e0f77b2c18a9b5a7adde60"!==a.check(e)))throw u=null,new Error("BIP39 Wordlist for en (English) FAILED")}function l(){return o.call(this,"en")||this}var f=new(i(l,o=a.Wordlist),l.prototype.getWord=function(e){return c(this),u[e]},l.prototype.getWordIndex=function(e){return c(this),u.indexOf(e)},l);r.langEn=f,a.register(f);},{"../utils/wordlist":86}]},{},[7])(7);}),ethers=unwrapExports(ethers_min),interopRequireWildcard=createCommonjsModule(function(e){e.exports=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var n=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,r):{};n.get||n.set?Object.defineProperty(t,r,n):t[r]=e[r];}return t.default=e,t};});unwrapExports(interopRequireWildcard);var interopRequireDefault=createCommonjsModule(function(e){e.exports=function(e){return e&&e.__esModule?e:{default:e}};});function _defineProperty$1(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}unwrapExports(interopRequireDefault);var defineProperty=_defineProperty$1,runtime_1=createCommonjsModule(function(e){var t=function(e){var t,r=Object.prototype,n=r.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},o=i.iterator||"@@iterator",a=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag";function u(e,t,r,n){var i=t&&t.prototype instanceof v?t:v,o=Object.create(i.prototype),a=new x(n||[]);return o._invoke=function(e,t,r){var n=l;return function(i,o){if(n===h)throw new Error("Generator is already running");if(n===d){if("throw"===i)throw o;return I()}for(r.method=i,r.arg=o;;){var a=r.delegate;if(a){var s=A(a,r);if(s){if(s===p)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===l)throw n=d,r.arg;r.dispatchException(r.arg);}else"return"===r.method&&r.abrupt("return",r.arg);n=h;var u=c(e,t,r);if("normal"===u.type){if(n=r.done?d:f,u.arg===p)continue;return {value:u.arg,done:r.done}}"throw"===u.type&&(n=d,r.method="throw",r.arg=u.arg);}}}(e,r,a),o}function c(e,t,r){try{return {type:"normal",arg:e.call(t,r)}}catch(e){return {type:"throw",arg:e}}}e.wrap=u;var l="suspendedStart",f="suspendedYield",h="executing",d="completed",p={};function v(){}function m(){}function y(){}var g={};g[o]=function(){return this};var b=Object.getPrototypeOf,w=b&&b(b(M([])));w&&w!==r&&n.call(w,o)&&(g=w);var E=y.prototype=v.prototype=Object.create(g);function _(e){["next","throw","return"].forEach(function(t){e[t]=function(e){return this._invoke(t,e)};});}function S(e){var t;this._invoke=function(r,i){function o(){return new Promise(function(t,o){!function t(r,i,o,a){var s=c(e[r],e,i);if("throw"!==s.type){var u=s.arg,l=u.value;return l&&"object"==typeof l&&n.call(l,"__await")?Promise.resolve(l.__await).then(function(e){t("next",e,o,a);},function(e){t("throw",e,o,a);}):Promise.resolve(l).then(function(e){u.value=e,o(u);},function(e){return t("throw",e,o,a)})}a(s.arg);}(r,i,t,o);})}return t=t?t.then(o,o):o()};}function A(e,r){var n=e.iterator[r.method];if(n===t){if(r.delegate=null,"throw"===r.method){if(e.iterator.return&&(r.method="return",r.arg=t,A(e,r),"throw"===r.method))return p;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method");}return p}var i=c(n,e.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,p;var o=i.arg;return o?o.done?(r[e.resultName]=o.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,p):o:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,p)}function T(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t);}function N(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t;}function x(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(T,this),this.reset(!0);}function M(e){if(e){var r=e[o];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var i=-1,a=function r(){for(;++i<e.length;)if(n.call(e,i))return r.value=e[i],r.done=!1,r;return r.value=t,r.done=!0,r};return a.next=a}}return {next:I}}function I(){return {value:t,done:!0}}return m.prototype=E.constructor=y,y.constructor=m,y[s]=m.displayName="GeneratorFunction",e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return !!t&&(t===m||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,y):(e.__proto__=y,s in e||(e[s]="GeneratorFunction")),e.prototype=Object.create(E),e},e.awrap=function(e){return {__await:e}},_(S.prototype),S.prototype[a]=function(){return this},e.AsyncIterator=S,e.async=function(t,r,n,i){var o=new S(u(t,r,n,i));return e.isGeneratorFunction(r)?o:o.next().then(function(e){return e.done?e.value:o.next()})},_(E),E[s]="Generator",E[o]=function(){return this},E.toString=function(){return "[object Generator]"},e.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){for(;t.length;){var n=t.pop();if(n in e)return r.value=n,r.done=!1,r}return r.done=!0,r}},e.values=M,x.prototype={constructor:x,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(N),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t);},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function i(n,i){return s.type="throw",s.arg=e,r.next=n,i&&(r.method="next",r.arg=t),!!i}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],s=a.completion;if("root"===a.tryLoc)return i("end");if(a.tryLoc<=this.prev){var u=n.call(a,"catchLoc"),c=n.call(a,"finallyLoc");if(u&&c){if(this.prev<a.catchLoc)return i(a.catchLoc,!0);if(this.prev<a.finallyLoc)return i(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return i(a.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return i(a.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r];if(i.tryLoc<=this.prev&&n.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var o=i;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=e,a.arg=t,o?(this.method="next",this.next=o.finallyLoc,p):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return "break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),p},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),N(r),p}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var i=n.arg;N(r);}return i}}throw new Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:M(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),p}},e}(e.exports);try{regeneratorRuntime=t;}catch(e){Function("r","regeneratorRuntime = r")(t);}}),regenerator=runtime_1;function asyncGeneratorStep$1(e,t,r,n,i,o,a){try{var s=e[o](a),u=s.value;}catch(e){return void r(e)}s.done?t(u):Promise.resolve(u).then(n,i);}function _asyncToGenerator$1(e){return function(){var t=this,r=arguments;return new Promise(function(n,i){var o=e.apply(t,r);function a(e){asyncGeneratorStep$1(o,n,i,a,s,"next",e);}function s(e){asyncGeneratorStep$1(o,n,i,a,s,"throw",e);}a(void 0);})}}var domain,asyncToGenerator=_asyncToGenerator$1;function EventHandlers(){}function EventEmitter(){EventEmitter.init.call(this);}function $getMaxListeners(e){return void 0===e._maxListeners?EventEmitter.defaultMaxListeners:e._maxListeners}function emitNone(e,t,r){if(t)e.call(r);else for(var n=e.length,i=arrayClone(e,n),o=0;o<n;++o)i[o].call(r);}function emitOne(e,t,r,n){if(t)e.call(r,n);else for(var i=e.length,o=arrayClone(e,i),a=0;a<i;++a)o[a].call(r,n);}function emitTwo(e,t,r,n,i){if(t)e.call(r,n,i);else for(var o=e.length,a=arrayClone(e,o),s=0;s<o;++s)a[s].call(r,n,i);}function emitThree(e,t,r,n,i,o){if(t)e.call(r,n,i,o);else for(var a=e.length,s=arrayClone(e,a),u=0;u<a;++u)s[u].call(r,n,i,o);}function emitMany(e,t,r,n){if(t)e.apply(r,n);else for(var i=e.length,o=arrayClone(e,i),a=0;a<i;++a)o[a].apply(r,n);}function _addListener(e,t,r,n){var i,o,a;if("function"!=typeof r)throw new TypeError('"listener" argument must be a function');if((o=e._events)?(o.newListener&&(e.emit("newListener",t,r.listener?r.listener:r),o=e._events),a=o[t]):(o=e._events=new EventHandlers,e._eventsCount=0),a){if("function"==typeof a?a=o[t]=n?[r,a]:[a,r]:n?a.unshift(r):a.push(r),!a.warned&&(i=$getMaxListeners(e))&&i>0&&a.length>i){a.warned=!0;var s=new Error("Possible EventEmitter memory leak detected. "+a.length+" "+t+" listeners added. Use emitter.setMaxListeners() to increase limit");s.name="MaxListenersExceededWarning",s.emitter=e,s.type=t,s.count=a.length,emitWarning(s);}}else a=o[t]=r,++e._eventsCount;return e}function emitWarning(e){"function"==typeof console.warn?console.warn(e):console.log(e);}function _onceWrap(e,t,r){var n=!1;function i(){e.removeListener(t,i),n||(n=!0,r.apply(e,arguments));}return i.listener=r,i}function listenerCount(e){var t=this._events;if(t){var r=t[e];if("function"==typeof r)return 1;if(r)return r.length}return 0}function spliceOne(e,t){for(var r=t,n=r+1,i=e.length;n<i;r+=1,n+=1)e[r]=e[n];e.pop();}function arrayClone(e,t){for(var r=new Array(t);t--;)r[t]=e[t];return r}function unwrapListeners(e){for(var t=new Array(e.length),r=0;r<t.length;++r)t[r]=e[r].listener||e[r];return t}EventHandlers.prototype=Object.create(null),EventEmitter.EventEmitter=EventEmitter,EventEmitter.usingDomains=!1,EventEmitter.prototype.domain=void 0,EventEmitter.prototype._events=void 0,EventEmitter.prototype._maxListeners=void 0,EventEmitter.defaultMaxListeners=10,EventEmitter.init=function(){this.domain=null,EventEmitter.usingDomains&&domain.active&&domain.Domain,this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=new EventHandlers,this._eventsCount=0),this._maxListeners=this._maxListeners||void 0;},EventEmitter.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||isNaN(e))throw new TypeError('"n" argument must be a positive number');return this._maxListeners=e,this},EventEmitter.prototype.getMaxListeners=function(){return $getMaxListeners(this)},EventEmitter.prototype.emit=function(e){var t,r,n,i,o,a,s,u="error"===e;if(a=this._events)u=u&&null==a.error;else if(!u)return !1;if(s=this.domain,u){if(t=arguments[1],!s){if(t instanceof Error)throw t;var c=new Error('Uncaught, unspecified "error" event. ('+t+")");throw c.context=t,c}return t||(t=new Error('Uncaught, unspecified "error" event')),t.domainEmitter=this,t.domain=s,t.domainThrown=!1,s.emit("error",t),!1}if(!(r=a[e]))return !1;var l="function"==typeof r;switch(n=arguments.length){case 1:emitNone(r,l,this);break;case 2:emitOne(r,l,this,arguments[1]);break;case 3:emitTwo(r,l,this,arguments[1],arguments[2]);break;case 4:emitThree(r,l,this,arguments[1],arguments[2],arguments[3]);break;default:for(i=new Array(n-1),o=1;o<n;o++)i[o-1]=arguments[o];emitMany(r,l,this,i);}return !0},EventEmitter.prototype.addListener=function(e,t){return _addListener(this,e,t,!1)},EventEmitter.prototype.on=EventEmitter.prototype.addListener,EventEmitter.prototype.prependListener=function(e,t){return _addListener(this,e,t,!0)},EventEmitter.prototype.once=function(e,t){if("function"!=typeof t)throw new TypeError('"listener" argument must be a function');return this.on(e,_onceWrap(this,e,t)),this},EventEmitter.prototype.prependOnceListener=function(e,t){if("function"!=typeof t)throw new TypeError('"listener" argument must be a function');return this.prependListener(e,_onceWrap(this,e,t)),this},EventEmitter.prototype.removeListener=function(e,t){var r,n,i,o,a;if("function"!=typeof t)throw new TypeError('"listener" argument must be a function');if(!(n=this._events))return this;if(!(r=n[e]))return this;if(r===t||r.listener&&r.listener===t)0==--this._eventsCount?this._events=new EventHandlers:(delete n[e],n.removeListener&&this.emit("removeListener",e,r.listener||t));else if("function"!=typeof r){for(i=-1,o=r.length;o-- >0;)if(r[o]===t||r[o].listener&&r[o].listener===t){a=r[o].listener,i=o;break}if(i<0)return this;if(1===r.length){if(r[0]=void 0,0==--this._eventsCount)return this._events=new EventHandlers,this;delete n[e];}else spliceOne(r,i);n.removeListener&&this.emit("removeListener",e,a||t);}return this},EventEmitter.prototype.removeAllListeners=function(e){var t,r;if(!(r=this._events))return this;if(!r.removeListener)return 0===arguments.length?(this._events=new EventHandlers,this._eventsCount=0):r[e]&&(0==--this._eventsCount?this._events=new EventHandlers:delete r[e]),this;if(0===arguments.length){for(var n,i=Object.keys(r),o=0;o<i.length;++o)"removeListener"!==(n=i[o])&&this.removeAllListeners(n);return this.removeAllListeners("removeListener"),this._events=new EventHandlers,this._eventsCount=0,this}if("function"==typeof(t=r[e]))this.removeListener(e,t);else if(t)do{this.removeListener(e,t[t.length-1]);}while(t[0]);return this},EventEmitter.prototype.listeners=function(e){var t,r=this._events;return r&&(t=r[e])?"function"==typeof t?[t.listener||t]:unwrapListeners(t):[]},EventEmitter.listenerCount=function(e,t){return "function"==typeof e.listenerCount?e.listenerCount(t):listenerCount.call(e,t)},EventEmitter.prototype.listenerCount=listenerCount,EventEmitter.prototype.eventNames=function(){return this._eventsCount>0?Reflect.ownKeys(this._events):[]};var constants=createCommonjsModule(function(e,t){t.__esModule=!0,t.BLOCKCHAIN_EVENT=t.RESPONSE_EVENT=t.TRANSPORT_EVENT=t.DEVICE_EVENT=t.UI_EVENT=t.CORE_EVENT=void 0;t.CORE_EVENT="CORE_EVENT";t.UI_EVENT="UI_EVENT";t.DEVICE_EVENT="DEVICE_EVENT";t.TRANSPORT_EVENT="TRANSPORT_EVENT";t.RESPONSE_EVENT="RESPONSE_EVENT";t.BLOCKCHAIN_EVENT="BLOCKCHAIN_EVENT";});unwrapExports(constants);var constants_1=constants.BLOCKCHAIN_EVENT,constants_2=constants.RESPONSE_EVENT,constants_3=constants.TRANSPORT_EVENT,constants_4=constants.DEVICE_EVENT,constants_5=constants.UI_EVENT,constants_6=constants.CORE_EVENT,transport=createCommonjsModule(function(e,t){t.__esModule=!0,t.START_PENDING=t.RECONNECT=t.REQUEST=t.STREAM=t.UPDATE=t.ERROR=t.START=void 0;t.START="transport-start";t.ERROR="transport-error";t.UPDATE="transport-update";t.STREAM="transport-stream";t.REQUEST="transport-request_device";t.RECONNECT="transport-reconnect";t.START_PENDING="transport-start_pending";});unwrapExports(transport);var transport_1=transport.START_PENDING,transport_2=transport.RECONNECT,transport_3=transport.REQUEST,transport_4=transport.STREAM,transport_5=transport.UPDATE,transport_6=transport.ERROR,transport_7=transport.START,popup=createCommonjsModule(function(e,t){t.__esModule=!0,t.CLOSE_WINDOW=t.CANCEL_POPUP_REQUEST=t.CLOSED=t.CLOSE=t.HANDSHAKE=t.OPEN_TIMEOUT=t.OPENED=t.LOG=t.EXTENSION_USB_PERMISSIONS=t.EXTENSION_REQUEST=t.BOOTSTRAP=t.INIT=void 0;t.INIT="popup-init";t.BOOTSTRAP="popup-bootstrap";t.EXTENSION_REQUEST="popup-extension_request";t.EXTENSION_USB_PERMISSIONS="open-usb-permissions";t.LOG="popup-log";t.OPENED="popup-opened";t.OPEN_TIMEOUT="popup-open_timeout";t.HANDSHAKE="popup-handshake";t.CLOSE="popup-close";t.CLOSED="popup-closed";t.CANCEL_POPUP_REQUEST="ui-cancel-popup-request";t.CLOSE_WINDOW="window.close";});unwrapExports(popup);var popup_1=popup.CLOSE_WINDOW,popup_2=popup.CANCEL_POPUP_REQUEST,popup_3=popup.CLOSED,popup_4=popup.CLOSE,popup_5=popup.HANDSHAKE,popup_6=popup.OPEN_TIMEOUT,popup_7=popup.OPENED,popup_8=popup.LOG,popup_9=popup.EXTENSION_USB_PERMISSIONS,popup_10=popup.EXTENSION_REQUEST,popup_11=popup.BOOTSTRAP,popup_12=popup.INIT,iframe=createCommonjsModule(function(e,t){t.__esModule=!0,t.RESPONSE=t.CALL=t.ERROR=t.BOOTSTRAP=void 0;t.BOOTSTRAP="iframe-bootstrap";t.ERROR="iframe-error";t.CALL="iframe-call";t.RESPONSE="iframe-response";});unwrapExports(iframe);var iframe_1=iframe.RESPONSE,iframe_2=iframe.CALL,iframe_3=iframe.ERROR,iframe_4=iframe.BOOTSTRAP,ui=createCommonjsModule(function(e,t){t.__esModule=!0,t.ADDRESS_VALIDATION=t.BUNDLE_PROGRESS=t.LOGIN_CHALLENGE_RESPONSE=t.LOGIN_CHALLENGE_REQUEST=t.CUSTOM_MESSAGE_RESPONSE=t.CUSTOM_MESSAGE_REQUEST=t.CHANGE_SETTINGS=t.RECEIVE_WORD=t.RECEIVE_FEE=t.RECEIVE_ACCOUNT=t.CHANGE_ACCOUNT=t.RECEIVE_DEVICE=t.RECEIVE_PASSPHRASE=t.RECEIVE_PIN=t.RECEIVE_CONFIRMATION=t.RECEIVE_PERMISSION=t.REQUEST_WORD=t.REQUEST_BUTTON=t.INSUFFICIENT_FUNDS=t.UPDATE_CUSTOM_FEE=t.SELECT_FEE=t.SELECT_ACCOUNT=t.SELECT_DEVICE=t.SET_OPERATION=t.LOADING=t.CONNECT=t.INVALID_PASSPHRASE_ACTION=t.INVALID_PASSPHRASE=t.REQUEST_PASSPHRASE_ON_DEVICE=t.REQUEST_PASSPHRASE=t.INVALID_PIN=t.REQUEST_PIN=t.REQUEST_CONFIRMATION=t.REQUEST_PERMISSION=t.CLOSE_UI_WINDOW=t.REQUEST_UI_WINDOW=t.RECEIVE_BROWSER=t.BROWSER_OUTDATED=t.BROWSER_NOT_SUPPORTED=t.DEVICE_NEEDS_BACKUP=t.FIRMWARE_NOT_INSTALLED=t.FIRMWARE_NOT_COMPATIBLE=t.FIRMWARE_NOT_SUPPORTED=t.FIRMWARE_OUTDATED=t.FIRMWARE_OLD=t.SEEDLESS=t.INITIALIZE=t.REQUIRE_MODE=t.NOT_IN_BOOTLOADER=t.BOOTLOADER=t.TRANSPORT=t.IFRAME_HANDSHAKE=void 0;t.IFRAME_HANDSHAKE="iframe-handshake";t.TRANSPORT="ui-no_transport";t.BOOTLOADER="ui-device_bootloader_mode";t.NOT_IN_BOOTLOADER="ui-device_not_in_bootloader_mode";t.REQUIRE_MODE="ui-device_require_mode";t.INITIALIZE="ui-device_not_initialized";t.SEEDLESS="ui-device_seedless";t.FIRMWARE_OLD="ui-device_firmware_old";t.FIRMWARE_OUTDATED="ui-device_firmware_outdated";t.FIRMWARE_NOT_SUPPORTED="ui-device_firmware_unsupported";t.FIRMWARE_NOT_COMPATIBLE="ui-device_firmware_not_compatible";t.FIRMWARE_NOT_INSTALLED="ui-device_firmware_not_installed";t.DEVICE_NEEDS_BACKUP="ui-device_needs_backup";t.BROWSER_NOT_SUPPORTED="ui-browser_not_supported";t.BROWSER_OUTDATED="ui-browser_outdated";t.RECEIVE_BROWSER="ui-receive_browser";t.REQUEST_UI_WINDOW="ui-request_window";t.CLOSE_UI_WINDOW="ui-close_window";t.REQUEST_PERMISSION="ui-request_permission";t.REQUEST_CONFIRMATION="ui-request_confirmation";t.REQUEST_PIN="ui-request_pin";t.INVALID_PIN="ui-invalid_pin";t.REQUEST_PASSPHRASE="ui-request_passphrase";t.REQUEST_PASSPHRASE_ON_DEVICE="ui-request_passphrase_on_device";t.INVALID_PASSPHRASE="ui-invalid_passphrase";t.INVALID_PASSPHRASE_ACTION="ui-invalid_passphrase_action";t.CONNECT="ui-connect";t.LOADING="ui-loading";t.SET_OPERATION="ui-set_operation";t.SELECT_DEVICE="ui-select_device";t.SELECT_ACCOUNT="ui-select_account";t.SELECT_FEE="ui-select_fee";t.UPDATE_CUSTOM_FEE="ui-update_custom_fee";t.INSUFFICIENT_FUNDS="ui-insufficient_funds";t.REQUEST_BUTTON="ui-button";t.REQUEST_WORD="ui-request_word";t.RECEIVE_PERMISSION="ui-receive_permission";t.RECEIVE_CONFIRMATION="ui-receive_confirmation";t.RECEIVE_PIN="ui-receive_pin";t.RECEIVE_PASSPHRASE="ui-receive_passphrase";t.RECEIVE_DEVICE="ui-receive_device";t.CHANGE_ACCOUNT="ui-change_account";t.RECEIVE_ACCOUNT="ui-receive_account";t.RECEIVE_FEE="ui-receive_fee";t.RECEIVE_WORD="ui-receive_word";t.CHANGE_SETTINGS="ui-change_settings";t.CUSTOM_MESSAGE_REQUEST="ui-custom_request";t.CUSTOM_MESSAGE_RESPONSE="ui-custom_response";t.LOGIN_CHALLENGE_REQUEST="ui-login_challenge_request";t.LOGIN_CHALLENGE_RESPONSE="ui-login_challenge_response";t.BUNDLE_PROGRESS="ui-bundle_progress";t.ADDRESS_VALIDATION="ui-address_validation";});unwrapExports(ui);var ui_1=ui.ADDRESS_VALIDATION,ui_2=ui.BUNDLE_PROGRESS,ui_3=ui.LOGIN_CHALLENGE_RESPONSE,ui_4=ui.LOGIN_CHALLENGE_REQUEST,ui_5=ui.CUSTOM_MESSAGE_RESPONSE,ui_6=ui.CUSTOM_MESSAGE_REQUEST,ui_7=ui.CHANGE_SETTINGS,ui_8=ui.RECEIVE_WORD,ui_9=ui.RECEIVE_FEE,ui_10=ui.RECEIVE_ACCOUNT,ui_11=ui.CHANGE_ACCOUNT,ui_12=ui.RECEIVE_DEVICE,ui_13=ui.RECEIVE_PASSPHRASE,ui_14=ui.RECEIVE_PIN,ui_15=ui.RECEIVE_CONFIRMATION,ui_16=ui.RECEIVE_PERMISSION,ui_17=ui.REQUEST_WORD,ui_18=ui.REQUEST_BUTTON,ui_19=ui.INSUFFICIENT_FUNDS,ui_20=ui.UPDATE_CUSTOM_FEE,ui_21=ui.SELECT_FEE,ui_22=ui.SELECT_ACCOUNT,ui_23=ui.SELECT_DEVICE,ui_24=ui.SET_OPERATION,ui_25=ui.LOADING,ui_26=ui.CONNECT,ui_27=ui.INVALID_PASSPHRASE_ACTION,ui_28=ui.INVALID_PASSPHRASE,ui_29=ui.REQUEST_PASSPHRASE_ON_DEVICE,ui_30=ui.REQUEST_PASSPHRASE,ui_31=ui.INVALID_PIN,ui_32=ui.REQUEST_PIN,ui_33=ui.REQUEST_CONFIRMATION,ui_34=ui.REQUEST_PERMISSION,ui_35=ui.CLOSE_UI_WINDOW,ui_36=ui.REQUEST_UI_WINDOW,ui_37=ui.RECEIVE_BROWSER,ui_38=ui.BROWSER_OUTDATED,ui_39=ui.BROWSER_NOT_SUPPORTED,ui_40=ui.DEVICE_NEEDS_BACKUP,ui_41=ui.FIRMWARE_NOT_INSTALLED,ui_42=ui.FIRMWARE_NOT_COMPATIBLE,ui_43=ui.FIRMWARE_NOT_SUPPORTED,ui_44=ui.FIRMWARE_OUTDATED,ui_45=ui.FIRMWARE_OLD,ui_46=ui.SEEDLESS,ui_47=ui.INITIALIZE,ui_48=ui.REQUIRE_MODE,ui_49=ui.NOT_IN_BOOTLOADER,ui_50=ui.BOOTLOADER,ui_51=ui.TRANSPORT,ui_52=ui.IFRAME_HANDSHAKE,device=createCommonjsModule(function(e,t){t.__esModule=!0,t.UNREADABLE=t.WAIT_FOR_SELECTION=t.WORD=t.PASSPHRASE_ON_DEVICE=t.PASSPHRASE=t.PIN=t.BUTTON=t.LOADING=t.USED_ELSEWHERE=t.RELEASED=t.ACQUIRED=t.RELEASE=t.ACQUIRE=t.CHANGED=t.DISCONNECT=t.CONNECT_UNACQUIRED=t.CONNECT=void 0;t.CONNECT="device-connect";t.CONNECT_UNACQUIRED="device-connect_unacquired";t.DISCONNECT="device-disconnect";t.CHANGED="device-changed";t.ACQUIRE="device-acquire";t.RELEASE="device-release";t.ACQUIRED="device-acquired";t.RELEASED="device-released";t.USED_ELSEWHERE="device-used_elsewhere";t.LOADING="device-loading";t.BUTTON="button";t.PIN="pin";t.PASSPHRASE="passphrase";t.PASSPHRASE_ON_DEVICE="passphrase_on_device";t.WORD="word";t.WAIT_FOR_SELECTION="device-wait_for_selection";t.UNREADABLE="unreadable-device";});unwrapExports(device);var device_1=device.UNREADABLE,device_2=device.WAIT_FOR_SELECTION,device_3=device.WORD,device_4=device.PASSPHRASE_ON_DEVICE,device_5=device.PASSPHRASE,device_6=device.PIN,device_7=device.BUTTON,device_8=device.LOADING,device_9=device.USED_ELSEWHERE,device_10=device.RELEASED,device_11=device.ACQUIRED,device_12=device.RELEASE,device_13=device.ACQUIRE,device_14=device.CHANGED,device_15=device.DISCONNECT,device_16=device.CONNECT_UNACQUIRED,device_17=device.CONNECT,blockchain=createCommonjsModule(function(e,t){t.__esModule=!0,t.NOTIFICATION=t.BLOCK=t.CONNECT=t.ERROR=void 0;t.ERROR="blockchain-error";t.CONNECT="blockchain-connect";t.BLOCK="blockchain-block";t.NOTIFICATION="blockchain-notification";});unwrapExports(blockchain);var blockchain_1=blockchain.NOTIFICATION,blockchain_2=blockchain.BLOCK,blockchain_3=blockchain.CONNECT,blockchain_4=blockchain.ERROR;function _inheritsLoose(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t;}var inheritsLoose=_inheritsLoose,getPrototypeOf=createCommonjsModule(function(e){function t(r){return e.exports=t=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},t(r)}e.exports=t;}),setPrototypeOf=createCommonjsModule(function(e){function t(r,n){return e.exports=t=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},t(r,n)}e.exports=t;});function _isNativeFunction(e){return -1!==Function.toString.call(e).indexOf("[native code]")}var isNativeFunction=_isNativeFunction,construct=createCommonjsModule(function(e){function t(r,n,i){return !function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return !1}}()?e.exports=t=function(e,t,r){var n=[null];n.push.apply(n,t);var i=new(Function.bind.apply(e,n));return r&&setPrototypeOf(i,r.prototype),i}:e.exports=t=Reflect.construct,t.apply(null,arguments)}e.exports=t;}),wrapNativeSuper=createCommonjsModule(function(e){function t(r){var n="function"==typeof Map?new Map:void 0;return e.exports=t=function(e){if(null===e||!isNativeFunction(e))return e;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==n){if(n.has(e))return n.get(e);n.set(e,t);}function t(){return construct(e,arguments,getPrototypeOf(this).constructor)}return t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),setPrototypeOf(t,e)},t(r)}e.exports=t;}),errors=createCommonjsModule(function(e,t){t.__esModule=!0,t.NO_COIN_INFO=t.BACKEND_NO_URL=t.WEBUSB_ERROR_MESSAGE=t.INVALID_PIN_ERROR_MESSAGE=t.WRONG_PREVIOUS_SESSION_ERROR_MESSAGE=t.INVALID_STATE=t.CALL_OVERRIDE=t.INITIALIZATION_FAILED=t.DEVICE_USED_ELSEWHERE=t.PERMISSIONS_NOT_GRANTED=t.POPUP_CLOSED=t.INVALID_PARAMETERS=t.DEVICE_CALL_IN_PROGRESS=t.DEVICE_NOT_FOUND=t.WRONG_TRANSPORT_CONFIG=t.NO_TRANSPORT=t.MANAGEMENT_NOT_ALLOWED=t.MANIFEST_NOT_SET=t.BROWSER_NOT_SUPPORTED=t.POPUP_TIMEOUT=t.IFRAME_TIMEOUT=t.IFRAME_INITIALIZED=t.IFRAME_BLOCKED=t.NO_IFRAME=t.invalidParameter=t.TrezorError=void 0;var r=interopRequireDefault(inheritsLoose),n=function(e){function t(t,r){var n;return (n=e.call(this,r)||this).code=t,n.message=r,n}return (0, r.default)(t,e),t}((0, interopRequireDefault(wrapNativeSuper).default)(Error));t.TrezorError=n;var i=function(e){return new n("Connect_InvalidParameter",e)};t.invalidParameter=i;var o=new n(100,"TrezorConnect not yet initialized");t.NO_IFRAME=o;var a=new n("iframe_blocked","TrezorConnect iframe was blocked");t.IFRAME_BLOCKED=a;var s=new n(101,"TrezorConnect has been already initialized");t.IFRAME_INITIALIZED=s;var u=new n(102,"Iframe timeout");t.IFRAME_TIMEOUT=u;var c=new n(103,"Popup timeout");t.POPUP_TIMEOUT=c;var l=new n(104,"Browser not supported");t.BROWSER_NOT_SUPPORTED=l;var f=new n(105,"Manifest not set. Read more at https://github.com/trezor/connect/blob/develop/docs/index.md");t.MANIFEST_NOT_SET=f;var h=new n(105,"Management method not allowed for this configuration");t.MANAGEMENT_NOT_ALLOWED=h;var d=new n(500,"Transport is missing");t.NO_TRANSPORT=d;var p=new n(5002,"Wrong config response");t.WRONG_TRANSPORT_CONFIG=p;var v=new n(501,"Device not found");t.DEVICE_NOT_FOUND=v;var m=new n(503,"Device call in progress");t.DEVICE_CALL_IN_PROGRESS=m;var y=new n(504,"Invalid parameters");t.INVALID_PARAMETERS=y;var g=new Error("Popup closed");t.POPUP_CLOSED=g;var b=new n(403,"Permissions not granted");t.PERMISSIONS_NOT_GRANTED=b;var w=new n(700,"Device is used in another window");t.DEVICE_USED_ELSEWHERE=w;var E=new n("Failure_Initialize","Initialization failed");t.INITIALIZATION_FAILED=E;var _=new n("Failure_ActionOverride","override");t.CALL_OVERRIDE=_;var S=new n("Failure_PassphraseState","Passphrase is incorrect");t.INVALID_STATE=S;t.WRONG_PREVIOUS_SESSION_ERROR_MESSAGE="wrong previous session";t.INVALID_PIN_ERROR_MESSAGE="PIN invalid";t.WEBUSB_ERROR_MESSAGE="NetworkError: Unable to claim interface.";var A=new n("Backend_init","Url not found");t.BACKEND_NO_URL=A;var T=i("Coin not found.");t.NO_COIN_INFO=T;});unwrapExports(errors);var errors_1=errors.NO_COIN_INFO,errors_2=errors.BACKEND_NO_URL,errors_3=errors.WEBUSB_ERROR_MESSAGE,errors_4=errors.INVALID_PIN_ERROR_MESSAGE,errors_5=errors.WRONG_PREVIOUS_SESSION_ERROR_MESSAGE,errors_6=errors.INVALID_STATE,errors_7=errors.CALL_OVERRIDE,errors_8=errors.INITIALIZATION_FAILED,errors_9=errors.DEVICE_USED_ELSEWHERE,errors_10=errors.PERMISSIONS_NOT_GRANTED,errors_11=errors.POPUP_CLOSED,errors_12=errors.INVALID_PARAMETERS,errors_13=errors.DEVICE_CALL_IN_PROGRESS,errors_14=errors.DEVICE_NOT_FOUND,errors_15=errors.WRONG_TRANSPORT_CONFIG,errors_16=errors.NO_TRANSPORT,errors_17=errors.MANAGEMENT_NOT_ALLOWED,errors_18=errors.MANIFEST_NOT_SET,errors_19=errors.BROWSER_NOT_SUPPORTED,errors_20=errors.POPUP_TIMEOUT,errors_21=errors.IFRAME_TIMEOUT,errors_22=errors.IFRAME_INITIALIZED,errors_23=errors.IFRAME_BLOCKED,errors_24=errors.NO_IFRAME,errors_25=errors.invalidParameter,errors_26=errors.TrezorError;function _assertThisInitialized$1(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var assertThisInitialized=_assertThisInitialized$1,showPopupRequest_1=createCommonjsModule(function(e,t){t.__esModule=!0,t.showPopupRequest=void 0;var r="TrezorConnectInteractionLayer";t.showPopupRequest=function(e,t){if(!document.getElementById(r)){var n=document.createElement("div");n.id=r,n.className="trezorconnect-container",n.innerHTML='\n    <div class="trezorconnect-container" id="TrezorConnectInteractionLayer">\n        <div class="trezorconnect-window">\n            <div class="trezorconnect-head">\n                <svg class="trezorconnect-logo" x="0px" y="0px" viewBox="0 0 163.7 41.9" width="78px" height="20px" preserveAspectRatio="xMinYMin meet">\n                    <polygon points="101.1,12.8 118.2,12.8 118.2,17.3 108.9,29.9 118.2,29.9 118.2,35.2 101.1,35.2 101.1,30.7 110.4,18.1 101.1,18.1"/>\n                    <path d="M158.8,26.9c2.1-0.8,4.3-2.9,4.3-6.6c0-4.5-3.1-7.4-7.7-7.4h-10.5v22.3h5.8v-7.5h2.2l4.1,7.5h6.7L158.8,26.9z M154.7,22.5 h-4V18h4c1.5,0,2.5,0.9,2.5,2.2C157.2,21.6,156.2,22.5,154.7,22.5z"/>\n                    <path d="M130.8,12.5c-6.8,0-11.6,4.9-11.6,11.5s4.9,11.5,11.6,11.5s11.7-4.9,11.7-11.5S137.6,12.5,130.8,12.5z M130.8,30.3 c-3.4,0-5.7-2.6-5.7-6.3c0-3.8,2.3-6.3,5.7-6.3c3.4,0,5.8,2.6,5.8,6.3C136.6,27.7,134.2,30.3,130.8,30.3z"/>\n                    <polygon points="82.1,12.8 98.3,12.8 98.3,18 87.9,18 87.9,21.3 98,21.3 98,26.4 87.9,26.4 87.9,30 98.3,30 98.3,35.2 82.1,35.2 "/>\n                    <path d="M24.6,9.7C24.6,4.4,20,0,14.4,0S4.2,4.4,4.2,9.7v3.1H0v22.3h0l14.4,6.7l14.4-6.7h0V12.9h-4.2V9.7z M9.4,9.7 c0-2.5,2.2-4.5,5-4.5s5,2,5,4.5v3.1H9.4V9.7z M23,31.5l-8.6,4l-8.6-4V18.1H23V31.5z"/>\n                    <path d="M79.4,20.3c0-4.5-3.1-7.4-7.7-7.4H61.2v22.3H67v-7.5h2.2l4.1,7.5H80l-4.9-8.3C77.2,26.1,79.4,24,79.4,20.3z M71,22.5h-4V18 h4c1.5,0,2.5,0.9,2.5,2.2C73.5,21.6,72.5,22.5,71,22.5z"/>\n                    <polygon points="40.5,12.8 58.6,12.8 58.6,18.1 52.4,18.1 52.4,35.2 46.6,35.2 46.6,18.1 40.5,18.1 "/>\n                </svg>\n                <div class="trezorconnect-close">\n                    <svg x="0px" y="0px" viewBox="24 24 60 60" width="24px" height="24px" preserveAspectRatio="xMinYMin meet">\n                        <polygon class="st0" points="40,67.9 42.1,70 55,57.1 67.9,70 70,67.9 57.1,55 70,42.1 67.9,40 55,52.9 42.1,40 40,42.1 52.9,55 "/>\n                    </svg>\n                </div>\n            </div>\n            <div class="trezorconnect-body">\n                <h3>Popup was blocked</h3>\n                <p>Please click to “Continue” to open popup manually</p>\n                <button class="trezorconnect-open">Continue</button>\n            </div>\n        </div>\n    </div>\n',document.body&&document.body.appendChild(n),n.getElementsByClassName("trezorconnect-open")[0].onclick=function(){e(),document.body&&document.body.removeChild(n);},n.getElementsByClassName("trezorconnect-close")[0].onclick=function(){t(),document.body&&document.body.removeChild(n);};}};});unwrapExports(showPopupRequest_1);var showPopupRequest_2=showPopupRequest_1.showPopupRequest,support={searchParams:"URLSearchParams"in self,iterable:"Symbol"in self&&"iterator"in Symbol,blob:"FileReader"in self&&"Blob"in self&&function(){try{return new Blob,!0}catch(e){return !1}}(),formData:"FormData"in self,arrayBuffer:"ArrayBuffer"in self};function isDataView(e){return e&&DataView.prototype.isPrototypeOf(e)}if(support.arrayBuffer)var viewClasses=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],isArrayBufferView=ArrayBuffer.isView||function(e){return e&&viewClasses.indexOf(Object.prototype.toString.call(e))>-1};function normalizeName(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e))throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function normalizeValue(e){return "string"!=typeof e&&(e=String(e)),e}function iteratorFor(e){var t={next:function(){var t=e.shift();return {done:void 0===t,value:t}}};return support.iterable&&(t[Symbol.iterator]=function(){return t}),t}function Headers(e){this.map={},e instanceof Headers?e.forEach(function(e,t){this.append(t,e);},this):Array.isArray(e)?e.forEach(function(e){this.append(e[0],e[1]);},this):e&&Object.getOwnPropertyNames(e).forEach(function(t){this.append(t,e[t]);},this);}function consumed(e){if(e.bodyUsed)return Promise.reject(new TypeError("Already read"));e.bodyUsed=!0;}function fileReaderReady(e){return new Promise(function(t,r){e.onload=function(){t(e.result);},e.onerror=function(){r(e.error);};})}function readBlobAsArrayBuffer(e){var t=new FileReader,r=fileReaderReady(t);return t.readAsArrayBuffer(e),r}function readBlobAsText(e){var t=new FileReader,r=fileReaderReady(t);return t.readAsText(e),r}function readArrayBufferAsText(e){for(var t=new Uint8Array(e),r=new Array(t.length),n=0;n<t.length;n++)r[n]=String.fromCharCode(t[n]);return r.join("")}function bufferClone(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function Body(){return this.bodyUsed=!1,this._initBody=function(e){this._bodyInit=e,e?"string"==typeof e?this._bodyText=e:support.blob&&Blob.prototype.isPrototypeOf(e)?this._bodyBlob=e:support.formData&&FormData.prototype.isPrototypeOf(e)?this._bodyFormData=e:support.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)?this._bodyText=e.toString():support.arrayBuffer&&support.blob&&isDataView(e)?(this._bodyArrayBuffer=bufferClone(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):support.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(e)||isArrayBufferView(e))?this._bodyArrayBuffer=bufferClone(e):this._bodyText=e=Object.prototype.toString.call(e):this._bodyText="",this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):support.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"));},support.blob&&(this.blob=function(){var e=consumed(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?consumed(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(readBlobAsArrayBuffer)}),this.text=function(){var e=consumed(this);if(e)return e;if(this._bodyBlob)return readBlobAsText(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},support.formData&&(this.formData=function(){return this.text().then(decode)}),this.json=function(){return this.text().then(JSON.parse)},this}Headers.prototype.append=function(e,t){e=normalizeName(e),t=normalizeValue(t);var r=this.map[e];this.map[e]=r?r+", "+t:t;},Headers.prototype.delete=function(e){delete this.map[normalizeName(e)];},Headers.prototype.get=function(e){return e=normalizeName(e),this.has(e)?this.map[e]:null},Headers.prototype.has=function(e){return this.map.hasOwnProperty(normalizeName(e))},Headers.prototype.set=function(e,t){this.map[normalizeName(e)]=normalizeValue(t);},Headers.prototype.forEach=function(e,t){for(var r in this.map)this.map.hasOwnProperty(r)&&e.call(t,this.map[r],r,this);},Headers.prototype.keys=function(){var e=[];return this.forEach(function(t,r){e.push(r);}),iteratorFor(e)},Headers.prototype.values=function(){var e=[];return this.forEach(function(t){e.push(t);}),iteratorFor(e)},Headers.prototype.entries=function(){var e=[];return this.forEach(function(t,r){e.push([r,t]);}),iteratorFor(e)},support.iterable&&(Headers.prototype[Symbol.iterator]=Headers.prototype.entries);var methods=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function normalizeMethod(e){var t=e.toUpperCase();return methods.indexOf(t)>-1?t:e}function Request(e,t){var r=(t=t||{}).body;if(e instanceof Request){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new Headers(e.headers)),this.method=e.method,this.mode=e.mode,this.signal=e.signal,r||null==e._bodyInit||(r=e._bodyInit,e.bodyUsed=!0);}else this.url=String(e);if(this.credentials=t.credentials||this.credentials||"same-origin",!t.headers&&this.headers||(this.headers=new Headers(t.headers)),this.method=normalizeMethod(t.method||this.method||"GET"),this.mode=t.mode||this.mode||null,this.signal=t.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&r)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(r);}function decode(e){var t=new FormData;return e.trim().split("&").forEach(function(e){if(e){var r=e.split("="),n=r.shift().replace(/\+/g," "),i=r.join("=").replace(/\+/g," ");t.append(decodeURIComponent(n),decodeURIComponent(i));}}),t}function parseHeaders(e){var t=new Headers;return e.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach(function(e){var r=e.split(":"),n=r.shift().trim();if(n){var i=r.join(":").trim();t.append(n,i);}}),t}function Response(e,t){t||(t={}),this.type="default",this.status=void 0===t.status?200:t.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in t?t.statusText:"OK",this.headers=new Headers(t.headers),this.url=t.url||"",this._initBody(e);}Request.prototype.clone=function(){return new Request(this,{body:this._bodyInit})},Body.call(Request.prototype),Body.call(Response.prototype),Response.prototype.clone=function(){return new Response(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new Headers(this.headers),url:this.url})},Response.error=function(){var e=new Response(null,{status:0,statusText:""});return e.type="error",e};var redirectStatuses=[301,302,303,307,308];Response.redirect=function(e,t){if(-1===redirectStatuses.indexOf(t))throw new RangeError("Invalid status code");return new Response(null,{status:t,headers:{location:e}})};var DOMException=self.DOMException;try{new DOMException;}catch(e){(DOMException=function(e,t){this.message=e,this.name=t;var r=Error(e);this.stack=r.stack;}).prototype=Object.create(Error.prototype),DOMException.prototype.constructor=DOMException;}function fetch$1(e,t){return new Promise(function(r,n){var i=new Request(e,t);if(i.signal&&i.signal.aborted)return n(new DOMException("Aborted","AbortError"));var o=new XMLHttpRequest;function a(){o.abort();}o.onload=function(){var e={status:o.status,statusText:o.statusText,headers:parseHeaders(o.getAllResponseHeaders()||"")};e.url="responseURL"in o?o.responseURL:e.headers.get("X-Request-URL");var t="response"in o?o.response:o.responseText;r(new Response(t,e));},o.onerror=function(){n(new TypeError("Network request failed"));},o.ontimeout=function(){n(new TypeError("Network request failed"));},o.onabort=function(){n(new DOMException("Aborted","AbortError"));},o.open(i.method,i.url,!0),"include"===i.credentials?o.withCredentials=!0:"omit"===i.credentials&&(o.withCredentials=!1),"responseType"in o&&support.blob&&(o.responseType="blob"),i.headers.forEach(function(e,t){o.setRequestHeader(t,e);}),i.signal&&(i.signal.addEventListener("abort",a),o.onreadystatechange=function(){4===o.readyState&&i.signal.removeEventListener("abort",a);}),o.send(void 0===i._bodyInit?null:i._bodyInit);})}fetch$1.polyfill=!0,self.fetch||(self.fetch=fetch$1,self.Headers=Headers,self.Request=Request,self.Response=Response);var networkUtils=createCommonjsModule(function(e,t){t.__esModule=!0,t.getOrigin=t.httpRequest=void 0;var r=interopRequireDefault(regenerator),n=interopRequireDefault(asyncToGenerator),i=function(){var e=(0, n.default)(r.default.mark(function e(t,n){var i,o;return r.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return void 0===n&&(n="text"),e.next=3,fetch(t,{credentials:"same-origin"});case 3:if(!(i=e.sent).ok){e.next=23;break}if("json"!==n){e.next=12;break}return e.next=8,i.text();case 8:return o=e.sent,e.abrupt("return",JSON.parse(o));case 12:if("binary"!==n){e.next=18;break}return e.next=15,i.arrayBuffer();case 15:return e.abrupt("return",e.sent);case 18:return e.next=20,i.text();case 20:return e.abrupt("return",e.sent);case 21:e.next=24;break;case 23:throw new Error("httpRequest error: "+t+" "+i.statusText);case 24:case"end":return e.stop()}},e)}));return function(t,r){return e.apply(this,arguments)}}();t.httpRequest=i;t.getOrigin=function(e){var t=e.match(/^.+\:\/\/[^\/]+/);return Array.isArray(t)&&t.length>0?t[0]:"unknown"};});unwrapExports(networkUtils);var networkUtils_1=networkUtils.getOrigin,networkUtils_2=networkUtils.httpRequest,deferred=createCommonjsModule(function(e,t){t.__esModule=!0,t.create=function(e,t){var i,o=function(e){},a=function(e){},s=new Promise(function(){var t=(0, n.default)(r.default.mark(function t(n,s){return r.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(o=n,a=s,"function"!=typeof e){t.next=11;break}return t.prev=3,t.next=6,e();case 6:t.next=11;break;case 8:t.prev=8,t.t0=t.catch(3),s(t.t0);case 11:"string"==typeof e&&(i=e);case 12:case"end":return t.stop()}},t,null,[[3,8]])}));return function(e,r){return t.apply(this,arguments)}}());return {id:i,device:t,resolve:o,reject:a,promise:s}},t.createAsync=function(e){var t=function(e){},i=function(e){},o=new Promise(function(e,r){t=e,i=r;}),a=function(){var t=(0, n.default)(r.default.mark(function t(){return r.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e();case 2:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}}();return {resolve:t,reject:i,promise:o,run:function(){return a(),o}}},t.resolveTimeoutPromise=function(e,t){return new Promise(function(r){setTimeout(function(){r(t);},e);})},t.rejectTimeoutPromise=function(e,t){return new Promise(function(r,n){setTimeout(function(){n(t);},e);})};var r=interopRequireDefault(regenerator),n=interopRequireDefault(asyncToGenerator);});unwrapExports(deferred);var deferred_1=deferred.create,deferred_2=deferred.createAsync,deferred_3=deferred.resolveTimeoutPromise,deferred_4=deferred.rejectTimeoutPromise,PopupManager_1=createCommonjsModule(function(e,t){t.__esModule=!0,t.default=void 0;var r=interopRequireDefault(regenerator),n=interopRequireDefault(asyncToGenerator),i=interopRequireDefault(assertThisInitialized),o=interopRequireDefault(inheritsLoose),a=interopRequireDefault(defineProperty),s=interopRequireDefault(EventEmitter),u=interopRequireWildcard(popup),c=interopRequireWildcard(errors),l=function(e){function t(t){var r;return r=e.call(this)||this,(0, a.default)((0, i.default)(r),"requestTimeout",0),(0, a.default)((0, i.default)(r),"closeInterval",0),(0, a.default)((0, i.default)(r),"extension",!1),(0, a.default)((0, i.default)(r),"extensionTabId",0),r.settings=t,r.src=t.popupSrc,r.origin=(0, networkUtils.getOrigin)(t.popupSrc),r.handleLazyLoading=r.handleLazyLoading.bind((0, i.default)(r)),r.extension="undefined"!=typeof chrome&&chrome.runtime&&void 0!==chrome.runtime.onConnect,r.extension&&(r.handleExtensionConnect=r.handleExtensionConnect.bind((0, i.default)(r)),r.handleExtensionMessage=r.handleExtensionMessage.bind((0, i.default)(r)),chrome.runtime.onConnect.addListener(r.handleExtensionConnect)),r}(0, o.default)(t,e);var s=t.prototype;return s.request=function(e){var t=this;if(void 0===e&&(e=!1),this.locked)this._window&&(this.extension?chrome.tabs.update(this._window.id,{active:!0}):this._window.focus());else{this.lazyLoad=e?(0, deferred.create)(u.INIT):null,this.lazyLoad&&(this.extension||window.addEventListener("message",this.handleLazyLoading,!1));var r=this.open.bind(this);this.locked=!0,this.settings.supportedBrowser?this.requestTimeout=window.setTimeout(function(){t.requestTimeout=0,r();},e||this.extension?1:850):r();}},s.cancel=function(){this.close();},s.unlock=function(){this.locked=!1;},s.open=function(){var e=this;this.settings.supportedBrowser?(this.openWrapper(this.lazyLoad?this.src+"#loading":this.src),this.closeInterval=window.setInterval(function(){e._window&&(e.extension?chrome.tabs.get(e._window.id,function(t){t||(e.close(),e.emit(u.CLOSED));}):e._window.closed&&(e.close(),e.emit(u.CLOSED)));},500),this.openTimeout=window.setTimeout(function(){e._window&&!e._window.closed||(e.close(),(0, showPopupRequest_1.showPopupRequest)(e.open.bind(e),function(){e.emit(u.CLOSED);}));},2e3)):this.openWrapper(this.src+"#unsupported");},s.openWrapper=function(e){var t=this;this.extension?chrome.windows.getCurrent(null,function(r){"normal"!==r.type?chrome.windows.create({url:e},function(e){chrome.tabs.query({windowId:e.id,active:!0},function(e){t._window=e[0];});}):chrome.tabs.query({currentWindow:!0,active:!0},function(r){t.extensionTabId=r[0].id,chrome.tabs.create({url:e,index:r[0].index+1},function(e){t._window=e;});});}):(this._window=window.open("","_blank"),this._window&&(this._window.location.href=e));},s.handleExtensionConnect=function(e){if("trezor-connect"===e.name){if(!this._window||this._window&&this._window.id!==e.sender.tab.id)return void e.disconnect();this.extensionPort=e,this.extensionPort.onMessage.addListener(this.handleExtensionMessage);}else"trezor-usb-permissions"===e.name&&e.postMessage({broadcast:this.broadcast});},s.handleExtensionMessage=function(e){this.extensionPort&&(e===u.EXTENSION_REQUEST?this.extensionPort.postMessage({type:u.EXTENSION_REQUEST,broadcast:this.broadcast}):e===u.INIT&&this.lazyLoad?this.lazyLoad.resolve(!0):e===u.EXTENSION_USB_PERMISSIONS?chrome.tabs.query({currentWindow:!0,active:!0},function(e){chrome.tabs.create({url:"trezor-usb-permissions.html",index:e[0].index+1},function(e){});}):e===u.CLOSE_WINDOW&&(this.emit(u.CLOSED),this.close()));},s.setBroadcast=function(e){this.broadcast=e;},s.handleLazyLoading=function(e){this.lazyLoad&&e.data&&e.data===u.INIT&&(this.lazyLoad.resolve(!0),window.removeEventListener("message",this.handleLazyLoading,!1));},s.resolveLazyLoad=function(){var e=(0, n.default)(r.default.mark(function e(){return r.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.lazyLoad){e.next=5;break}return e.next=3,this.lazyLoad.promise;case 3:e.next=6;break;case 5:throw c.POPUP_CLOSED.message;case 6:this.extension?this.extensionPort&&this.extensionPort.postMessage({type:u.INIT}):this._window&&this._window.postMessage({type:u.INIT},this.origin);case 7:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),s.close=function(){this.locked=!1,this.requestTimeout&&(window.clearTimeout(this.requestTimeout),this.requestTimeout=0),this.openTimeout&&(window.clearTimeout(this.openTimeout),this.openTimeout=0),this.closeInterval&&(window.clearInterval(this.closeInterval),this.closeInterval=0),this.extensionPort&&(this.extensionPort.disconnect(),this.extensionPort=null),this.extensionTabId&&(chrome.tabs.update(this.extensionTabId,{active:!0}),this.extensionTabId=0),this.lazyLoad&&(this.lazyLoad=null),this._window&&(this.extension?chrome.tabs.remove(this._window.id):this._window.close(),this._window=null);},s.postMessage=function(e){var t=this;if(!this.requestTimeout)return !this._window&&"ui_request_window"!==e.type&&this.openTimeout?(this.close(),void(0, showPopupRequest_1.showPopupRequest)(this.open.bind(this),function(){t.emit(u.CLOSED);})):void(this._window&&this._window.postMessage(e,this.origin))},s.onBeforeUnload=function(){this.close();},s.cancelOpenTimeout=function(){window.clearTimeout(this.openTimeout);},t}(s.default);t.default=l;});unwrapExports(PopupManager_1);var inlineStyles=createCommonjsModule(function(e,t){t.__esModule=!0,t.default=void 0;t.default='.trezorconnect-container{position:fixed!important;display:-webkit-box!important;display:-webkit-flex!important;display:-ms-flexbox!important;display:flex!important;-webkit-box-orient:vertical!important;-webkit-box-direction:normal!important;-webkit-flex-direction:column!important;-ms-flex-direction:column!important;flex-direction:column!important;-webkit-box-align:center!important;-webkit-align-items:center!important;-ms-flex-align:center!important;align-items:center!important;z-index:10000!important;width:100%!important;height:100%!important;top:0!important;left:0!important;background:rgba(0,0,0,.35)!important;overflow:auto!important;padding:20px!important;margin:0!important}.trezorconnect-container .trezorconnect-window{position:relative!important;display:block!important;width:370px!important;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif!important;margin:auto!important;border-radius:3px!important;background-color:#fff!important;text-align:center!important;overflow:hidden!important}.trezorconnect-container .trezorconnect-window .trezorconnect-head{text-align:left;padding:12px 24px!important;display:-webkit-box!important;display:-webkit-flex!important;display:-ms-flexbox!important;display:flex!important;-webkit-box-align:center!important;-webkit-align-items:center!important;-ms-flex-align:center!important;align-items:center!important}.trezorconnect-container .trezorconnect-window .trezorconnect-head .trezorconnect-logo{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.trezorconnect-container .trezorconnect-window .trezorconnect-head .trezorconnect-close{cursor:pointer!important;height:24px!important}.trezorconnect-container .trezorconnect-window .trezorconnect-head .trezorconnect-close svg{fill:#757575;-webkit-transition:fill .3s ease-in-out!important;transition:fill .3s ease-in-out!important}.trezorconnect-container .trezorconnect-window .trezorconnect-head .trezorconnect-close:hover svg{fill:#494949}.trezorconnect-container .trezorconnect-window .trezorconnect-body{padding:24px 24px 32px!important;background:#FBFBFB!important;border-top:1px solid #EBEBEB}.trezorconnect-container .trezorconnect-window .trezorconnect-body h3{color:#505050!important;font-size:16px!important;font-weight:500!important}.trezorconnect-container .trezorconnect-window .trezorconnect-body p{margin:8px 0 24px!important;font-weight:400!important;color:#A9A9A9!important;font-size:12px!important}.trezorconnect-container .trezorconnect-window .trezorconnect-body button{width:100%!important;padding:12px 24px!important;margin:0!important;border-radius:3px!important;font-size:14px!important;font-weight:300!important;cursor:pointer!important;background:#01B757!important;color:#fff!important;border:0!important;-webkit-transition:background-color .3s ease-in-out!important;transition:background-color .3s ease-in-out!important}.trezorconnect-container .trezorconnect-window .trezorconnect-body button:hover{background-color:#00AB51!important}.trezorconnect-container .trezorconnect-window .trezorconnect-body button:active{background-color:#009546!important}/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlucHV0IiwiJHN0ZGluIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWNBLHlCQUNJLFNBQUEsZ0JBQ0EsUUFBQSxzQkFDQSxRQUFBLHVCQUNBLFFBQUEsc0JBRUEsUUFBQSxlQUNBLG1CQUFBLG1CQUNBLHNCQUFBLGlCQUNBLHVCQUFBLGlCQUNBLG1CQUFBLGlCQUNBLGVBQUEsaUJBRUEsa0JBQUEsaUJBQ0Esb0JBQUEsaUJBQ0EsZUFBQSxpQkNmTSxZQUFhLGlCREFyQixRQUFTLGdCQWtCSCxNQUFBLGVBQ0EsT0FBQSxlQUNBLElBQUEsWUFDQSxLQUFBLFlBQ0EsV0FBQSwwQkFDQSxTQUFBLGVBQ0EsUUFBQSxlQUNBLE9BQUEsWUNkUiwrQ0RYRSxTQUFVLG1CQTZCQSxRQUFBLGdCQUNBLE1BQUEsZ0JBQ0EsWUFBQSxjQUFBLG1CQUFBLFdBQUEsT0FBQSxpQkFBQSxNQUFBLHFCQUNBLE9BQUEsZUNmVixjQUFlLGNEakJmLGlCQWlCRSxlQWtCWSxXQUFBLGlCQ2ZkLFNBQVUsaUJEbUJJLG1FQUNBLFdBQUEsS0NoQmQsUUFBUyxLQUFLLGVEeEJkLFFBQVMsc0JBMENTLFFBQUEsdUJBQ0EsUUFBQSxzQkNmbEIsUUFBUyxlRGlCSyxrQkE1QlosaUJBOEJvQixvQkFBQSxpQkNoQmxCLGVBQWdCLGlCRC9CWixZQWlCTixpQkFzQ1EsdUZBQ0EsaUJBQUEsRUNwQlYsYUFBYyxFRHBDVixTQUFVLEVBMkRBLEtBQUEsRUFFQSx3RkNwQmQsT0FBUSxrQkR6Q1IsT0FBUSxlQWlFTSw0RkFDQSxLQUFBLFFBQ0EsbUJBQUEsS0FBQSxJQUFBLHNCQ3BCZCxXQUFZLEtBQUssSUFBSyxzQkR3QlIsa0dBQ0EsS0FBQSxRQUVBLG1FQUNBLFFBQUEsS0FBQSxLQUFBLGVBQ0EsV0FBQSxrQkFDQSxXQUFBLElBQUEsTUFBQSxRQUVBLHNFQUNBLE1BQUEsa0JBQ0EsVUFBQSxlQ3JCZCxZQUFhLGNEd0JLLHFFQ3JCbEIsT0FBUSxJQUFJLEVBQUksZUR3QkYsWUFBQSxjQUNJLE1BQUEsa0JDdEJsQixVQUFXLGVBRWIsMEVBQ0UsTUFBTyxlQUNQLFFBQVMsS0FBSyxlQUNkLE9BQVEsWUFDUixjQUFlLGNBQ2YsVUFBVyxlQUNYLFlBQWEsY0FDYixPQUFRLGtCQUNSLFdBQVksa0JBQ1osTUFBTyxlQUNQLE9BQVEsWUFDUixtQkFBb0IsaUJBQWlCLElBQUssc0JBQzFDLFdBQVksaUJBQWlCLElBQUssc0JBRXBDLGdGQUNFLGlCQUFrQixrQkFFcEIsaUZBQ0UsaUJBQWtCIn0= */';});unwrapExports(inlineStyles);var builder=createCommonjsModule(function(e,t){t.__esModule=!0,t.clearTimeout=t.dispose=t.postMessage=t.init=t.messagePromises=t.error=t.timeout=t.initPromise=t.origin=t.instance=void 0;var r,n,i=interopRequireDefault(regenerator),o=interopRequireDefault(asyncToGenerator),a=interopRequireDefault(inlineStyles);t.instance=r,t.origin=n;var s=(0, deferred.create)();t.initPromise=s;var u,c=0;t.timeout=c,t.error=u;var l=0,f={};t.messagePromises=f;var h=function(){var e=(0, o.default)(i.default.mark(function e(o){var a,u,l,f,h,v;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return (a=document.getElementById("trezorconnect"))?t.instance=r=a:(t.instance=r=document.createElement("iframe"),r.frameBorder="0",r.width="0px",r.height="0px",r.style.position="absolute",r.style.display="none",r.style.border="0px",r.style.width="0px",r.style.height="0px",r.id="trezorconnect"),u=o.manifest?JSON.stringify(o.manifest):"undefined",l="&version="+o.version+"&manifest="+encodeURIComponent(btoa(JSON.stringify(u))),f=o.iframeSrc+"?"+Date.now()+l,r.setAttribute("src",f),o.webusb&&r.setAttribute("allow","usb"),(h=r.src.match(/^.+\:\/\/[^\/]+/))&&h.length>0&&(t.origin=n=h[0]),t.timeout=c=window.setTimeout(function(){s.reject(errors.IFRAME_TIMEOUT);},1e4),v=function(){if(r){try{var e=r.contentWindow.location.origin;if(!e||"null"===e)return void p()}catch(e){}var t;"undefined"!=typeof chrome&&chrome.runtime&&void 0!==chrome.runtime.onConnect&&(chrome.runtime.onConnect.addListener(function(){}),t=chrome.runtime.id),r.contentWindow.postMessage({type:ui.IFRAME_HANDSHAKE,payload:{settings:o,extension:t}},n),r.onload=void 0;}else s.reject(errors.IFRAME_BLOCKED);},r.attachEvent?r.attachEvent("onload",v):r.onload=v,document.body&&(document.body.appendChild(r),d()),e.prev=13,e.next=16,s.promise;case 16:e.next=21;break;case 18:throw e.prev=18,e.t0=e.catch(13),e.t0.message||e.t0;case 21:return e.prev=21,window.clearTimeout(c),t.timeout=c=0,e.finish(21);case 25:case"end":return e.stop()}},e,null,[[13,18,21,25]])}));return function(t){return e.apply(this,arguments)}}();t.init=h;var d=function(){if(!r)throw errors.IFRAME_BLOCKED;var e=r.ownerDocument,t=e.head||e.getElementsByTagName("head")[0],n=document.createElement("style");n.setAttribute("type","text/css"),n.setAttribute("id","TrezorConnectStylesheet"),n.styleSheet?n.styleSheet.cssText=a.default:n.appendChild(document.createTextNode(a.default)),t.append(n);},p=function(){window.clearTimeout(c),t.error=u=errors.IFRAME_BLOCKED.message,v(),s.reject(errors.IFRAME_BLOCKED);};t.postMessage=function(e,t){if(void 0===t&&(t=!0),!r)throw errors.IFRAME_BLOCKED;return t?(l++,e.id=l,f[l]=(0, deferred.create)(),r.contentWindow.postMessage(e,n),f[l].promise):(r.contentWindow.postMessage(e,n),null)};var v=function(){if(r&&r.parentNode)try{r.parentNode.removeChild(r);}catch(e){}t.instance=r=null,t.timeout=c=0;};t.dispose=v;t.clearTimeout=function(){window.clearTimeout(c);};});unwrapExports(builder);var builder_1=builder.clearTimeout,builder_2=builder.dispose,builder_3=builder.postMessage,builder_4=builder.init,builder_5=builder.messagePromises,builder_6=builder.error,builder_7=builder.timeout,builder_8=builder.initPromise,builder_9=builder.origin,builder_10=builder.instance,button=createCommonjsModule(function(e,t){t.__esModule=!0,t.default=void 0;var r=function(e,t,r){var n=e||".trezor-webusb-button",i=document.querySelectorAll(n),o=t+"?"+Date.now();i.forEach(function(e){if(e.getElementsByTagName("iframe").length<1){var t=e.getBoundingClientRect(),n=document.createElement("iframe");n.frameBorder="0",n.width=Math.round(t.width)+"px",n.height=Math.round(t.height)+"px",n.style.position="absolute",n.style.top="0px",n.style.left="0px",n.style.zIndex="1",n.setAttribute("allow","usb"),n.setAttribute("scrolling","no"),n.onload=function(){n.contentWindow.postMessage({},r);},n.src=o,e.append(n);}});};t.default=r;});unwrapExports(button);var debug=createCommonjsModule(function(e,t){t.__esModule=!0,t.popupConsole=t.enableByPrefix=t.getLog=t.enable=t.init=t.default=void 0;var r={DescriptorStream:"color: #77ab59",DeviceList:"color: #36802d",Device:"color: #bada55",Core:"color: #c9df8a",IFrame:"color: #FFFFFF; background: #f4a742;",Popup:"color: #f48a00"},n=function(){function e(e,t){void 0===t&&(t=!1),this.prefix=e,this.enabled=t,this.messages=[],this.css=r[e]||"color: #000000; background: #FFFFFF;";}var t=e.prototype;return t.addMessage=function(e,t){for(var r=arguments.length,n=new Array(r>2?r-2:0),i=2;i<r;i++)n[i-2]=arguments[i];this.messages.push({level:e,prefix:t,message:n,timestamp:(new Date).getTime()});},t.log=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];var n;(this.addMessage.apply(this,["log",this.prefix].concat(t)),this.enabled)&&(n=console).log.apply(n,[this.prefix].concat(t));},t.error=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];var n;(this.addMessage.apply(this,["error",this.prefix].concat(t)),this.enabled)&&(n=console).error.apply(n,[this.prefix].concat(t));},t.warn=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];var n;(this.addMessage.apply(this,["warn",this.prefix].concat(t)),this.enabled)&&(n=console).warn.apply(n,[this.prefix].concat(t));},t.debug=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];var n;(this.addMessage.apply(this,["debug",this.prefix].concat(t)),this.enabled)&&(n=console).log.apply(n,["%c"+this.prefix,this.css].concat(t));},e}();t.default=n;var i={};t.init=function(e,t){var r=new n(e,"boolean"==typeof t&&t);return i[e]=r,r};t.enable=function(e){for(var t=0,r=Object.keys(i);t<r.length;t++){var n=r[t];i[n].enabled=e;}};t.getLog=function(e){for(var t=[],r=0,n=Object.keys(i);r<n.length;r++){var o=n[r];t=t.concat(i[o].messages);}return t.sort(function(e,t){return e.timestamp-t.timestamp}),t};t.enableByPrefix=function(e,t){i[e]&&(i[e].enabled=t);};t.popupConsole=function(e,t){var r=commonjsGlobal$1.console,n={error:r.error,info:r.info,debug:r.debug,log:r.log},i=function(n,i){return function(){for(var o=(new Date).toUTCString(),a=arguments.length,s=new Array(a),u=0;u<a;u++)s[u]=arguments[u];return t.apply(void 0,[{type:e,level:i,time:o,args:JSON.stringify(s)}]),n.apply(r,s)}};for(var o in n)r[o]=i(n[o],o);};});unwrapExports(debug);var debug_1=debug.popupConsole,debug_2=debug.enableByPrefix,debug_3=debug.getLog,debug_4=debug.enable,debug_5=debug.init,message=createCommonjsModule(function(e,t){t.__esModule=!0,t.parseMessage=void 0;t.parseMessage=function(e){var t={event:e.event,type:e.type,payload:e.payload};return "number"==typeof e.id&&(t.id=e.id),"boolean"==typeof e.success&&(t.success=e.success),t};});unwrapExports(message);var message_1=message.parseMessage,ConnectSettings=createCommonjsModule(function(e,t){t.__esModule=!0,t.parse=t.DEFAULT_PRIORITY=void 0;var r=interopRequireDefault(defineProperty);function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n);}return r}var i="7.0.5".split(".").map(function(e){return parseInt(e)}),o="https://connect.trezor.io/"+(i[0]+(i[1]>0?"."+i[1]:"")+"/");t.DEFAULT_PRIORITY=2;var a={configSrc:"data/config.json",version:"7.0.5",debug:!1,origin:null,priority:2,trustedHost:!1,connectSrc:o,iframeSrc:o+"iframe.html",popup:!0,popupSrc:o+"popup.html",webusbSrc:o+"webusb.html",transportReconnect:!1,webusb:!0,pendingTransportEvent:!0,supportedBrowser:"undefined"==typeof navigator||!/Trident|MSIE/.test(navigator.userAgent),extension:null,manifest:null};t.parse=function(e){if(!e)return a;var t,i=function(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?n(i,!0).forEach(function(t){(0, r.default)(e,t,i[t]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):n(i).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t));});}return e}({},a);return e.hasOwnProperty("debug")&&("boolean"==typeof e.debug?i.debug=e.debug:"string"==typeof e.debug&&(i.debug="true"===e.debug)),"string"==typeof e.connectSrc?i.connectSrc=e.connectSrc:"undefined"!=typeof window&&"string"==typeof window.__TREZOR_CONNECT_SRC&&(i.connectSrc=window.__TREZOR_CONNECT_SRC),i.iframeSrc=i.connectSrc+"iframe.html",i.popupSrc=i.connectSrc+"popup.html",i.webusbSrc=i.connectSrc+"webusb.html","boolean"==typeof e.transportReconnect&&(i.transportReconnect=e.transportReconnect),"boolean"==typeof e.webusb&&(i.webusb=e.webusb),"boolean"==typeof e.popup&&(i.popup=e.popup),"boolean"==typeof e.pendingTransportEvent&&(i.pendingTransportEvent=e.pendingTransportEvent),"undefined"!=typeof window&&"file:"===window.location.protocol&&(i.origin="file://"+window.location.pathname,i.webusb=!1),"string"==typeof e.extension&&(i.extension=e.extension),"object"==typeof e.manifest&&(i.manifest="string"!=typeof(t=e.manifest).email?null:"string"!=typeof t.appUrl?null:{email:t.email,appUrl:t.appUrl}),a=i};});unwrapExports(ConnectSettings);var ConnectSettings_1=ConnectSettings.parse,ConnectSettings_2=ConnectSettings.DEFAULT_PRIORITY,params=Object.freeze({}),response=Object.freeze({}),cardano=Object.freeze({}),ripple=Object.freeze({}),ethereum=Object.freeze({}),nem=Object.freeze({}),stellar=Object.freeze({}),lisk=Object.freeze({}),tezos=Object.freeze({}),eos=Object.freeze({}),coinInfo=Object.freeze({}),types=createCommonjsModule(function(e,t){t.__esModule=!0;interopRequireWildcard(transport),interopRequireWildcard(popup),interopRequireWildcard(ui),interopRequireWildcard(device),interopRequireWildcard(params);var r=interopRequireWildcard(response);Object.keys(r).forEach(function(e){"default"!==e&&"__esModule"!==e&&(t[e]=r[e]);});interopRequireWildcard(cardano),interopRequireWildcard(ripple),interopRequireWildcard(ethereum),interopRequireWildcard(nem),interopRequireWildcard(stellar),interopRequireWildcard(lisk),interopRequireWildcard(tezos),interopRequireWildcard(eos);Object.keys(coinInfo).forEach(function(e){"default"!==e&&"__esModule"!==e&&(t[e]=coinInfo[e]);});});unwrapExports(types);var BLOCKCHAIN=interopRequireWildcard(blockchain),blockchainEvent={},account=Object.freeze({}),lib=createCommonjsModule(function(e,t){t.__esModule=!0;var r={UI_EVENT:!0,DEVICE_EVENT:!0,RESPONSE_EVENT:!0,TRANSPORT_EVENT:!0,BLOCKCHAIN_EVENT:!0,TRANSPORT:!0,UI:!0,DEVICE:!0,BLOCKCHAIN:!0};t.BLOCKCHAIN=t.DEVICE=t.UI=t.TRANSPORT=t.default=void 0;var n=interopRequireDefault(defineProperty),i=interopRequireDefault(regenerator),o=interopRequireDefault(asyncToGenerator),a=interopRequireDefault(EventEmitter);t.UI_EVENT=constants.UI_EVENT,t.DEVICE_EVENT=constants.DEVICE_EVENT,t.RESPONSE_EVENT=constants.RESPONSE_EVENT,t.TRANSPORT_EVENT=constants.TRANSPORT_EVENT,t.BLOCKCHAIN_EVENT=constants.BLOCKCHAIN_EVENT;var s=interopRequireWildcard(transport);t.TRANSPORT=s;var u=interopRequireWildcard(popup),c=interopRequireWildcard(iframe),l=interopRequireWildcard(ui);t.UI=l;var f=interopRequireWildcard(device);t.DEVICE=f;var h=interopRequireWildcard(blockchain);t.BLOCKCHAIN=h;var d=interopRequireWildcard(errors),p=interopRequireDefault(PopupManager_1),v=interopRequireWildcard(builder),m=interopRequireDefault(button),y=interopRequireWildcard(debug);interopRequireWildcard(types);function g(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n);}return r}function b(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?g(r,!0).forEach(function(t){(0, n.default)(e,t,r[t]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):g(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t));});}return e}Object.keys(blockchainEvent).forEach(function(e){"default"!==e&&"__esModule"!==e&&(Object.prototype.hasOwnProperty.call(r,e)||(t[e]=blockchainEvent[e]));}),Object.keys(account).forEach(function(e){"default"!==e&&"__esModule"!==e&&(Object.prototype.hasOwnProperty.call(r,e)||(t[e]=account[e]));});var w,E,_=new a.default,S=(0, y.init)("[trezor-connect.js]"),A=function(){var e=new p.default(w);return e.on(u.CLOSED,function(){v.postMessage({type:u.CLOSED},!1);}),e},T=function(e){if(e.origin===v.origin){var t=(0, message.parseMessage)(e.data),r=t.id||0,n=t.event,i=t.type,o=t.payload;switch(S.log("handleMessage",t),n){case constants.RESPONSE_EVENT:v.messagePromises[r]?(delete t.type,delete t.event,v.messagePromises[r].resolve(t),delete v.messagePromises[r]):S.warn("Unknown message id "+r);break;case constants.DEVICE_EVENT:case constants.TRANSPORT_EVENT:case constants.BLOCKCHAIN_EVENT:_.emit(n,t),_.emit(i,o);break;case constants.UI_EVENT:if(i===c.BOOTSTRAP){v.clearTimeout();break}if(i===u.BOOTSTRAP){E.cancelOpenTimeout();break}_.emit(n,t),_.emit(i,o),i===l.IFRAME_HANDSHAKE?o.error?v.initPromise.reject(new Error(o.error)):(E.setBroadcast(o.broadcast),v.initPromise.resolve()):i===u.CANCEL_POPUP_REQUEST?E.cancel():i===l.CLOSE_UI_WINDOW&&E.close();break;default:S.log("Undefined message",n,e);}}},N=function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0===t&&(t={}),!v.instance){e.next=3;break}throw d.IFRAME_INITIALIZED;case 3:if(w||(w=(0, ConnectSettings.parse)(t)),w.manifest){e.next=6;break}throw d.MANIFEST_NOT_SET;case 6:if(w.supportedBrowser){e.next=8;break}throw d.BROWSER_NOT_SUPPORTED;case 8:return E||(E=A()),S.enabled=w.debug,window.addEventListener("message",T),window.addEventListener("beforeunload",function(){E&&E.onBeforeUnload(),v.dispose();}),e.next=14,v.init(w);case 14:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),x=function(){var e=(0, o.default)(i.default.mark(function e(t){var r;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(v.instance||v.timeout){e.next=19;break}if((w=(0, ConnectSettings.parse)(w)).manifest){e.next=4;break}return e.abrupt("return",{success:!1,payload:{error:d.MANIFEST_NOT_SET.message}});case 4:if(w.supportedBrowser){e.next=6;break}return e.abrupt("return",{success:!1,payload:{error:d.BROWSER_NOT_SUPPORTED.message}});case 6:return (E=A()).request(!0),e.prev=8,e.next=11,N(w);case 11:return e.next=13,E.resolveLazyLoad();case 13:e.next=19;break;case 15:return e.prev=15,e.t0=e.catch(8),E.close(),e.abrupt("return",{success:!1,payload:{error:e.t0}});case 19:if(!v.timeout){e.next=23;break}return e.abrupt("return",{success:!1,payload:{error:d.NO_IFRAME.message}});case 23:if(!v.error){e.next=25;break}return e.abrupt("return",{success:!1,payload:{error:v.error}});case 25:return w.popup&&E.request(),e.prev=26,e.next=29,v.postMessage({type:c.CALL,payload:t});case 29:if(!(r=e.sent)){e.next=35;break}return r.payload.error!==d.DEVICE_CALL_IN_PROGRESS.message&&E.unlock(),e.abrupt("return",r);case 35:return E.unlock(),e.abrupt("return",{success:!1,payload:{error:"No response from iframe"}});case 37:e.next=43;break;case 39:return e.prev=39,e.t1=e.catch(26),S.error("__call error",e.t1),e.abrupt("return",e.t1);case 43:case"end":return e.stop()}},e,null,[[8,15],[26,39]])}));return function(t){return e.apply(this,arguments)}}(),M=function(e){v.postMessage({event:constants.UI_EVENT,type:l.CUSTOM_MESSAGE_RESPONSE,payload:e});},I=function(){};(0, n.default)(I,"manifest",function(e){w=(0, ConnectSettings.parse)({manifest:e});}),(0, n.default)(I,"getSettings",(0, o.default)(i.default.mark(function e(){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(v.instance){e.next=2;break}return e.abrupt("return",{success:!1,payload:{error:"Iframe not initialized yet, you need to call TrezorConnect.init or any other method first."}});case 2:return e.next=4,x({method:"getSettings"});case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}},e)}))),(0, n.default)(I,"init",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N(t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"on",function(e,t){_.on(e,t);}),(0, n.default)(I,"off",function(e,t){_.removeListener(e,t);}),(0, n.default)(I,"uiResponse",function(e){v.postMessage(b({event:constants.UI_EVENT},e));}),(0, n.default)(I,"changeSettings",function(e){var t=(0, ConnectSettings.parse)(e);S.enabled=t.debug,v.postMessage({type:l.CHANGE_SETTINGS,payload:t},!1);}),(0, n.default)(I,"blockchainDisconnect",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"blockchainDisconnect"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"blockchainEstimateFee",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"blockchainEstimateFee"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"blockchainSubscribe",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"blockchainSubscribe"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"blockchainUnsubscribe",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"blockchainUnsubscribe"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"customMessage",function(){var e=(0, o.default)(i.default.mark(function e(t){var r,n,a;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if("function"==typeof t.callback){e.next=2;break}return e.abrupt("return",{success:!1,payload:{error:'Parameter "callback" is not a function'}});case 2:return r=t.callback,delete t.callback,n=function(){var e=(0, o.default)(i.default.mark(function e(t){var n,o;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!(n=t.data)||n.type!==l.CUSTOM_MESSAGE_REQUEST){e.next=6;break}return e.next=4,r(n.payload);case 4:o=e.sent,M(o||{message:"release"});case 6:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),window.addEventListener("message",n,!1),e.next=8,x(b({method:"customMessage"},t));case 8:return a=e.sent,window.removeEventListener("message",n),e.abrupt("return",a);case 11:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"requestLogin",function(){var e=(0, o.default)(i.default.mark(function e(t){var r,n,a;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if("function"!=typeof t.callback){e.next=12;break}return r=t.callback,delete t.callback,n=function(){var e=(0, o.default)(i.default.mark(function e(t){var n,o;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!(n=t.data)||n.type!==l.LOGIN_CHALLENGE_REQUEST){e.next=13;break}return e.prev=2,e.next=5,r();case 5:o=e.sent,v.postMessage({event:constants.UI_EVENT,type:l.LOGIN_CHALLENGE_RESPONSE,payload:o}),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(2),console.warn("TrezorConnect.requestLogin: callback error",e.t0),v.postMessage({event:constants.UI_EVENT,type:l.LOGIN_CHALLENGE_RESPONSE,payload:e.t0.message});case 13:case"end":return e.stop()}},e,null,[[2,9]])}));return function(t){return e.apply(this,arguments)}}(),window.addEventListener("message",n,!1),e.next=7,x(b({method:"requestLogin"},t,{asyncChallenge:!0}));case 7:return a=e.sent,window.removeEventListener("message",n),e.abrupt("return",a);case 12:return e.next=14,x(b({method:"requestLogin"},t));case 14:return e.abrupt("return",e.sent);case 15:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"resetDevice",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"resetDevice"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"cardanoGetAddress",function(){var e=(0, o.default)(i.default.mark(function e(t){var r;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=_.listenerCount(l.ADDRESS_VALIDATION)>0,e.next=3,x(b({method:"cardanoGetAddress"},t,{useEventListener:r}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"cardanoGetPublicKey",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"cardanoGetPublicKey"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"cardanoSignTransaction",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"cardanoSignTransaction"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"cipherKeyValue",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"cipherKeyValue"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"composeTransaction",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"composeTransaction"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"debugLinkDecision",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"debugLinkDecision"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"debugLinkGetState",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"debugLinkGetState"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"ethereumGetAccountInfo",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"ethereumGetAccountInfo"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"ethereumGetAddress",function(){var e=(0, o.default)(i.default.mark(function e(t){var r;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=_.listenerCount(l.ADDRESS_VALIDATION)>0,e.next=3,x(b({method:"ethereumGetAddress"},t,{useEventListener:r}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"ethereumGetPublicKey",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"ethereumGetPublicKey"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"ethereumSignMessage",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"ethereumSignMessage"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"ethereumSignTransaction",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"ethereumSignTransaction"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"ethereumVerifyMessage",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"ethereumVerifyMessage"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"getAccountInfo",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"getAccountInfo"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"getAddress",function(){var e=(0, o.default)(i.default.mark(function e(t){var r;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=_.listenerCount(l.ADDRESS_VALIDATION)>0,e.next=3,x(b({method:"getAddress"},t,{useEventListener:r}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"getDeviceState",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"getDeviceState"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"getFeatures",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"getFeatures"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"getPublicKey",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"getPublicKey"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"liskGetAddress",function(){var e=(0, o.default)(i.default.mark(function e(t){var r;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=_.listenerCount(l.ADDRESS_VALIDATION)>0,e.next=3,x(b({method:"liskGetAddress"},t,{useEventListener:r}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"liskGetPublicKey",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"liskGetPublicKey"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"liskSignMessage",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"liskSignMessage"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"liskSignTransaction",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"liskSignTransaction"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"liskVerifyMessage",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"liskVerifyMessage"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"nemGetAddress",function(){var e=(0, o.default)(i.default.mark(function e(t){var r;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=_.listenerCount(l.ADDRESS_VALIDATION)>0,e.next=3,x(b({method:"nemGetAddress"},t,{useEventListener:r}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"nemSignTransaction",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"nemSignTransaction"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"pushTransaction",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"pushTransaction"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"rippleGetAccountInfo",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"rippleGetAccountInfo"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"rippleGetAddress",function(){var e=(0, o.default)(i.default.mark(function e(t){var r;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=_.listenerCount(l.ADDRESS_VALIDATION)>0,e.next=3,x(b({method:"rippleGetAddress"},t,{useEventListener:r}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"rippleSignTransaction",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"rippleSignTransaction"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"signMessage",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"signMessage"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"signTransaction",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"signTransaction"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"stellarGetAddress",function(){var e=(0, o.default)(i.default.mark(function e(t){var r;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=_.listenerCount(l.ADDRESS_VALIDATION)>0,e.next=3,x(b({method:"stellarGetAddress"},t,{useEventListener:r}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"stellarSignTransaction",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"stellarSignTransaction"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"tezosGetAddress",function(){var e=(0, o.default)(i.default.mark(function e(t){var r;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=_.listenerCount(l.ADDRESS_VALIDATION)>0,e.next=3,x(b({method:"tezosGetAddress"},t,{useEventListener:r}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"tezosGetPublicKey",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"tezosGetPublicKey"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"tezosSignTransaction",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"tezosSignTransaction"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"eosGetPublicKey",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"eosGetPublicKey"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"eosSignTransaction",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"eosSignTransaction"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"verifyMessage",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"verifyMessage"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"wipeDevice",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"wipeDevice"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"applyFlags",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"applyFlags"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"applySettings",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"applySettings"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"backupDevice",(0, o.default)(i.default.mark(function e(){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x({method:"backupDevice"});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}))),(0, n.default)(I,"changePin",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"changePin"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"firmwareErase",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"firmwareErase"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"firmwareUpload",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"firmwareUpload"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"firmwareUpdate",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"firmwareUpdate"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"recoveryDevice",function(){var e=(0, o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b({method:"recoveryDevice"},t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),(0, n.default)(I,"dispose",function(){v.dispose(),E&&E.close();}),(0, n.default)(I,"cancel",function(){E&&E.emit(u.CLOSED);}),(0, n.default)(I,"renderWebUSBButton",function(e){(0, m.default)(e,w.webusbSrc,v.origin);});var O=I;t.default=O;}),TrezorConnect=unwrapExports(lib),lib_1=lib.BLOCKCHAIN,lib_2=lib.DEVICE,lib_3=lib.UI,lib_4=lib.TRANSPORT,lib_5=lib.UI_EVENT,lib_6=lib.DEVICE_EVENT,lib_7=lib.RESPONSE_EVENT,lib_8=lib.TRANSPORT_EVENT,lib_9=lib.BLOCKCHAIN_EVENT,Signer=ethers.Signer,providers=ethers.providers,utils=ethers.utils,allowedHdPaths=["44'/1'","44'/60'","44'/61'"];function makeError(e,t){var r=new Error(e);return r.id=t,r}function obtainPathComponentsFromDerivationPath(e){var t=/^(44'\/(?:1|60|61)'\/\d+'\/\d+?\/)(\d+)$/.exec(e);if(null===t)throw makeError("To get multiple accounts your derivation path must follow pattern 44'/60|61'/x'/n ","InvalidDerivationPath");return {basePath:t[1],index:parseInt(t[2],10)}}var defaultOptions={path:"44'/60'/0'/0/0",accountsLength:1,accountsOffset:0},TrezorSigner=function(e){function t(e){var r,n=e.network,i=e.apiKey,o=e.email,a=e.appUrl;if(_classCallCheck(this,t),(r=_possibleConstructorReturn(this,_getPrototypeOf(t).call(this))).provider=new providers.InfuraProvider(n,i),r.address=null,r.path=defaultOptions.path,r.accountsLength=defaultOptions.accountsLength,r.accountsOffset=defaultOptions.accountsOffset,r.pathComponents=obtainPathComponentsFromDerivationPath(r.path),r.addressToPathMap={},r.alreadyOpenTrezorModal=!1,!allowedHdPaths.some(function(e){return r.path.startsWith(e)}))throw makeError("Trezor derivation path allowed are ".concat(allowedHdPaths.join(", "),". ").concat(r.path," is not supported"),"InvalidDerivationPath");return TrezorConnect.manifest({email:o,appUrl:a}),r}var r,n,i,o,a;return _inherits(t,Signer),_createClass(t,[{key:"getPublicKey",value:(a=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,r,n=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:this.path,this.path=t,e.next=4,TrezorConnect.getPublicKey({path:t});case 4:if(!(r=e.sent).success){e.next=7;break}return e.abrupt("return",r.payload);case 7:throw new Error(r.payload.error);case 8:case"end":return e.stop()}},e,this)})),function(){return a.apply(this,arguments)})},{key:"getAddress",value:(o=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,r,n,i,o,a=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,this.alreadyOpenTrezorModal){e.next=15;break}for(this.alreadyOpenTrezorModal=!0,t=[],r=this.accountsOffset;r<this.accountsOffset+this.accountsLength;r++)n=this.pathComponents.basePath+(this.pathComponents.index+r).toString(),t.push({path:"m/"+n,showOnTrezor:!1});return e.next=7,TrezorConnect.ethereumGetAddress({bundle:t});case 7:if((i=e.sent).success){e.next=10;break}throw makeError(i.payload.error);case 10:return o=i.payload.address,this.setAddress(o),e.abrupt("return",o);case 15:return e.abrupt("return",Object.keys(this.addressToPathMap).reduce(function(e,t){return e[a.addressToPathMap[t]]=t,e},{}));case 16:e.next=21;break;case 18:throw e.prev=18,e.t0=e.catch(0),makeError(e.t0);case 21:case"end":return e.stop()}},e,this,[[0,18]])})),function(){return o.apply(this,arguments)})},{key:"setAddress",value:function(e){this.address=e;}},{key:"signMessage",value:(i=_asyncToGenerator(regeneratorRuntime.mark(function e(t){var r=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(){var e=_asyncToGenerator(regeneratorRuntime.mark(function e(n,i){var o;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,TrezorConnect.ethereumSignMessage({path:r.path+"/0",message:t});case 2:(o=e.sent).success?n(o.payload.signature):(console.error("Error:",o.payload.error),i(o.payload.error));case 4:case"end":return e.stop()}},e)}));return function(t,r){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}},e)})),function(e){return i.apply(this,arguments)})},{key:"sign",value:(n=_asyncToGenerator(regeneratorRuntime.mark(function e(t){var r,n,i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.value&&(t.value=utils.hexlify(t.value)),t.gasPrice&&(t.gasPrice=utils.hexlify(t.gasPrice)),t.gasLimit&&(t.gasLimit=utils.hexlify(t.gasLimit)),e.t0=utils,e.next=6,this.provider.getTransactionCount(this.address);case 6:return e.t1=e.sent,t.nonce=e.t0.hexlify.call(e.t0,e.t1),e.next=10,TrezorConnect.ethereumSignTransaction({path:this.path+"/0",transaction:t});case 10:if(!(r=e.sent).success){e.next=17;break}return n={v:parseInt(r.payload.v.substring(2),16),r:r.payload.r,s:r.payload.s},e.next=15,utils.serializeTransaction(t,n);case 15:return i=e.sent,e.abrupt("return",i);case 17:throw new Error(r.payload.error);case 18:case"end":return e.stop()}},e,this)})),function(e){return n.apply(this,arguments)})},{key:"sendTransaction",value:(r=_asyncToGenerator(regeneratorRuntime.mark(function e(t){var r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(Promise.resolve(t.to)!==t.to){e.next=4;break}return e.next=3,t.to;case 3:t.to=e.sent;case 4:return t.value||(t.value=utils.parseEther("0.0")),e.next=7,this.sign(t);case 7:return r=e.sent,e.abrupt("return",this.provider.sendTransaction(r));case 9:case"end":return e.stop()}},e,this)})),function(e){return r.apply(this,arguments)})}]),t}(),coinbaseModule={name:"Coinbase",icon:"https://cdn-images-1.medium.com/max/1200/1*7ywNS48PnonfsvvMu1tTsA.png",connect:function(e){var t=e.getProviderName,r=e.createLegacyProviderInterface;if(window.web3&&window.web3.currentProvider){var n=t(window.web3.currentProvider);return "coinbase"===n?r(window.web3):n}},link:"https://go.cb-w.com/"},trustModule={name:"Trust",icon:"https://uploads-ssl.webflow.com/5a88babea6e0f90001b39b0d/5a8cf62922b72d00015acc0e_logo_solid_square_transparent.png",connect:function(e){var t=e.getProviderName,r=e.createLegacyProviderInterface;if(window.web3&&window.web3.currentProvider){var n=t(window.web3.currentProvider);return "trust"===n?r(window.web3):n}},link:"https://links.trustwalletapp.com/a/key_live_lfvIpVeI9TFWxPCqwU8rZnogFqhnzs4D?&event=openURL&url=".concat(window.location.href)},metamaskModule={name:"MetaMask",icon:"https://avatars1.githubusercontent.com/u/11744586?v=4&s=280",connect:function(e){var t=e.getProviderName,r=e.createModernProviderInterface,n=e.createLegacyProviderInterface;if(window.ethereum){var i=t(window.ethereum);return "metamask"===i?r(window.ethereum):i}if(window.web3&&window.web3.currentProvider){var o=t(window.web3.currentProvider);return "metamask"===o?n(window.web3.currentProvider):o}},link:"https://metamask.io/",installMessage:function(e){return e?"You have ".concat(e," already installed, would you like to use that instead?"):"Click to install MetaMask, then refresh the page to resume"}},dapperModule={name:"Dapper",icon:"https://lh3.googleusercontent.com/dSkSt27eUlSPZIYRZCOeOQB-d66YM4OkfUG1lug3rcKAkvGKptd-MlTa5MBXAE78pTdlNqWZ6A=w128-h128-e365",connect:function(e){var t=e.getProviderName,r=window.ethereum,n=t(r);return "dapper"===n?{address:{get:function(){return Promise.resolve(r.cachedResults.eth_coinbase.result)}},network:{get:function(){return Promise.resolve(r.cachedResults.net_version.result)}},balance:{get:function(){return new Promise(function(e){r.cachedResults.eth_coinbase.result?r.sendAsync({method:"eth_getBalance",params:[r.cachedResults.eth_coinbase.result,"latest"],id:1},function(t,r){e(parseInt(r.result,16));}):e(null);})}},name:"dapper",connect:r.enable}:n},link:"https://www.meetdapper.com/",installMessage:function(e){return e?"You have ".concat(e," already installed, would you like to use that instead?"):"Click to install Dapper, then refresh the page to resume"}},fortmaticModule=function(e){var t=e.apiKey,r=e.network;return {name:"Fortmatic",icon:"https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/spaces%2F-Lj7HukBJLlR6jbx0-eP%2Favatar.png?generation=1562433549326424&alt=media",connect:function(){var e=new Fortmatic(t),n=e.getProvider();return e.user.logout(),{address:{get:function(){return Promise.resolve(n.account)}},network:{get:function(){return Promise.resolve(networkToId(r))}},balance:{get:function(){return e.user.getBalances().then(function(e){return e[0]?1e18*e[0].crypto_amount:null})}},name:"fortmatic",connect:e.user.login}}}},trezorModule=function(e){var t=e.email,r=e.appUrl,n=e.rpcUrl,i=e.network;return {name:"Trezor",icon:"https://cdn-images-1.medium.com/max/1200/1*Sek00YxqMdOJp5FsjveZiQ.png",connect:function(){var e=new TrezorSigner({email:t,appUrl:r,rpcUrl:n,network:i});return {address:{get:function(){return Promise.resolve(e.address)}},network:{get:function(){return Promise.resolve(e.provider._network.chainId)}},balance:{get:function(){return e.address?e.provider.getBalance(e.address):Promise.resolve(null)}},name:"trezor",connect:e.getAddress.bind(e)}}}};function networkToId(e){switch(e){case"main":return 1;case"ropsten":return 3;case"rinkeby":return 4;case"goerli":return 5;case"kovan":return 42;case"localhost":return "localhost";default:return "local"}}function networkName(e){switch(e){case 1:return "main";case 3:return "ropsten";case 4:return "rinkeby";case 5:return "goerli";case 42:return "kovan";case"localhost":return "localhost";default:return "local"}}var index=function(e){var t=e.heading,r=e.description,n=e.networkId,i=e.fortmatic,o=e.trezor,a=[metamaskModule,dapperModule],s=[coinbaseModule,trustModule],u=networkName(n);return i&&(a.push(fortmaticModule(_objectSpread2({},i,{network:u}))),s.push(fortmaticModule(_objectSpread2({},i,{network:u})))),o&&a.push(trezorModule(_objectSpread2({},o,{network:u}))),{heading:t||"Select a Wallet",description:r||"Please select the wallet that you would like to use with this dapp",wallets:{mobile:s,desktop:a}}};exports.coinbaseModule=coinbaseModule,exports.dapperModule=dapperModule,exports.default=index,exports.fortmaticModule=fortmaticModule,exports.metamaskModule=metamaskModule,exports.trezorModule=trezorModule,exports.trustModule=trustModule;
	//# sourceMappingURL=bn-select-wallet.js.map
	});

	var selectWallet = unwrapExports(bnSelectWallet);
	var bnSelectWallet_1 = bnSelectWallet.coinbaseModule;
	var bnSelectWallet_2 = bnSelectWallet.dapperModule;
	var bnSelectWallet_3 = bnSelectWallet.fortmaticModule;
	var bnSelectWallet_4 = bnSelectWallet.metamaskModule;
	var bnSelectWallet_5 = bnSelectWallet.trezorModule;
	var bnSelectWallet_6 = bnSelectWallet.trustModule;

	var bnPrepareWallet = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports,"__esModule",{value:!0});var connect=function(e){var t=e.walletName,n=e.address,o=e.connect;if(!n)return {heading:"Connect Your Wallet",description:"Now you have ".concat(t," installed, you’ll need to log into it. The first time you use it, you may need to set up an account. When you’ve got that set up and you’re logged in, let us know."),eventCode:"loginFail",action:o}},network=function(e){return function(t){var n=t.network;if(n!=(e||"1"))return {heading:"Select the Correct Network",description:"We’ve detected that you need to be on the ".concat(networkName(Number(e))," network for this application but you have MetaMask set to ").concat(networkName(Number(n)),". Please switch to the correct network."),eventCode:"networkFail"}}},balance=function(e){return function(t){if(t.balance<(e||0))return {heading:"Get Some ETH",description:"Your current account has less than the necessary minimum balance of ".concat(e/1e18," ETH"),eventCode:"nsfFail"}}};function networkName(e){switch(e){case 1:return "main";case 3:return "ropsten";case 4:return "rinkeby";case 5:return "goerli";case 42:return "kovan";case"localhost":return "localhost";default:return "local"}}var index=function(e){var t=e.networkId,n=e.minimumBalance;return [connect,network(t),balance(n)]};exports.balance=balance,exports.connect=connect,exports.default=index,exports.network=network;
	//# sourceMappingURL=bn-prepare-wallet.js.map
	});

	var prepareWallet = unwrapExports(bnPrepareWallet);
	var bnPrepareWallet_1 = bnPrepareWallet.balance;
	var bnPrepareWallet_2 = bnPrepareWallet.connect;
	var bnPrepareWallet_3 = bnPrepareWallet.network;

	var Onboard = createCommonjsModule(function (module, exports) {
	(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e);})(document, 'script');
	(function (global, factory) {
	     module.exports = factory() ;
	}(commonjsGlobal, function () {
	    function noop() { }
	    const identity = x => x;
	    function add_location(element, file, line, column, char) {
	        element.__svelte_meta = {
	            loc: { file, line, column, char }
	        };
	    }
	    function run(fn) {
	        return fn();
	    }
	    function blank_object() {
	        return Object.create(null);
	    }
	    function run_all(fns) {
	        fns.forEach(run);
	    }
	    function is_function(thing) {
	        return typeof thing === 'function';
	    }
	    function safe_not_equal(a, b) {
	        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
	    }
	    function validate_store(store, name) {
	        if (!store || typeof store.subscribe !== 'function') {
	            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
	        }
	    }
	    function subscribe(component, store, callback) {
	        const unsub = store.subscribe(callback);
	        component.$$.on_destroy.push(unsub.unsubscribe
	            ? () => unsub.unsubscribe()
	            : unsub);
	    }

	    const is_client = typeof window !== 'undefined';
	    let now = is_client
	        ? () => window.performance.now()
	        : () => Date.now();
	    let raf = cb => requestAnimationFrame(cb);

	    const tasks = new Set();
	    let running = false;
	    function run_tasks() {
	        tasks.forEach(task => {
	            if (!task[0](now())) {
	                tasks.delete(task);
	                task[1]();
	            }
	        });
	        running = tasks.size > 0;
	        if (running)
	            raf(run_tasks);
	    }
	    function loop(fn) {
	        let task;
	        if (!running) {
	            running = true;
	            raf(run_tasks);
	        }
	        return {
	            promise: new Promise(fulfil => {
	                tasks.add(task = [fn, fulfil]);
	            }),
	            abort() {
	                tasks.delete(task);
	            }
	        };
	    }

	    function append(target, node) {
	        target.appendChild(node);
	    }
	    function insert(target, node, anchor) {
	        target.insertBefore(node, anchor || null);
	    }
	    function detach(node) {
	        node.parentNode.removeChild(node);
	    }
	    function destroy_each(iterations, detaching) {
	        for (let i = 0; i < iterations.length; i += 1) {
	            if (iterations[i])
	                iterations[i].d(detaching);
	        }
	    }
	    function element(name) {
	        return document.createElement(name);
	    }
	    function text(data) {
	        return document.createTextNode(data);
	    }
	    function space() {
	        return text(' ');
	    }
	    function empty() {
	        return text('');
	    }
	    function listen(node, event, handler, options) {
	        node.addEventListener(event, handler, options);
	        return () => node.removeEventListener(event, handler, options);
	    }
	    function attr(node, attribute, value) {
	        if (value == null)
	            node.removeAttribute(attribute);
	        else
	            node.setAttribute(attribute, value);
	    }
	    function children(element) {
	        return Array.from(element.childNodes);
	    }
	    function set_data(text, data) {
	        data = '' + data;
	        if (text.data !== data)
	            text.data = data;
	    }
	    function custom_event(type, detail) {
	        const e = document.createEvent('CustomEvent');
	        e.initCustomEvent(type, false, false, detail);
	        return e;
	    }

	    let stylesheet;
	    let active = 0;
	    let current_rules = {};
	    // https://github.com/darkskyapp/string-hash/blob/master/index.js
	    function hash(str) {
	        let hash = 5381;
	        let i = str.length;
	        while (i--)
	            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
	        return hash >>> 0;
	    }
	    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
	        const step = 16.666 / duration;
	        let keyframes = '{\n';
	        for (let p = 0; p <= 1; p += step) {
	            const t = a + (b - a) * ease(p);
	            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
	        }
	        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
	        const name = `__svelte_${hash(rule)}_${uid}`;
	        if (!current_rules[name]) {
	            if (!stylesheet) {
	                const style = element('style');
	                document.head.appendChild(style);
	                stylesheet = style.sheet;
	            }
	            current_rules[name] = true;
	            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
	        }
	        const animation = node.style.animation || '';
	        node.style.animation = `${animation ? `${animation}, ` : ``}${name} ${duration}ms linear ${delay}ms 1 both`;
	        active += 1;
	        return name;
	    }
	    function delete_rule(node, name) {
	        node.style.animation = (node.style.animation || '')
	            .split(', ')
	            .filter(name
	            ? anim => anim.indexOf(name) < 0 // remove specific animation
	            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
	        )
	            .join(', ');
	        if (name && !--active)
	            clear_rules();
	    }
	    function clear_rules() {
	        raf(() => {
	            if (active)
	                return;
	            let i = stylesheet.cssRules.length;
	            while (i--)
	                stylesheet.deleteRule(i);
	            current_rules = {};
	        });
	    }

	    let current_component;
	    function set_current_component(component) {
	        current_component = component;
	    }

	    const dirty_components = [];
	    const binding_callbacks = [];
	    const render_callbacks = [];
	    const flush_callbacks = [];
	    const resolved_promise = Promise.resolve();
	    let update_scheduled = false;
	    function schedule_update() {
	        if (!update_scheduled) {
	            update_scheduled = true;
	            resolved_promise.then(flush);
	        }
	    }
	    function add_render_callback(fn) {
	        render_callbacks.push(fn);
	    }
	    function flush() {
	        const seen_callbacks = new Set();
	        do {
	            // first, call beforeUpdate functions
	            // and update components
	            while (dirty_components.length) {
	                const component = dirty_components.shift();
	                set_current_component(component);
	                update(component.$$);
	            }
	            while (binding_callbacks.length)
	                binding_callbacks.pop()();
	            // then, once components are updated, call
	            // afterUpdate functions. This may cause
	            // subsequent updates...
	            for (let i = 0; i < render_callbacks.length; i += 1) {
	                const callback = render_callbacks[i];
	                if (!seen_callbacks.has(callback)) {
	                    callback();
	                    // ...so guard against infinite loops
	                    seen_callbacks.add(callback);
	                }
	            }
	            render_callbacks.length = 0;
	        } while (dirty_components.length);
	        while (flush_callbacks.length) {
	            flush_callbacks.pop()();
	        }
	        update_scheduled = false;
	    }
	    function update($$) {
	        if ($$.fragment) {
	            $$.update($$.dirty);
	            run_all($$.before_update);
	            $$.fragment.p($$.dirty, $$.ctx);
	            $$.dirty = null;
	            $$.after_update.forEach(add_render_callback);
	        }
	    }

	    let promise;
	    function wait() {
	        if (!promise) {
	            promise = Promise.resolve();
	            promise.then(() => {
	                promise = null;
	            });
	        }
	        return promise;
	    }
	    function dispatch(node, direction, kind) {
	        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
	    }
	    const outroing = new Set();
	    let outros;
	    function group_outros() {
	        outros = {
	            r: 0,
	            c: [],
	            p: outros // parent group
	        };
	    }
	    function check_outros() {
	        if (!outros.r) {
	            run_all(outros.c);
	        }
	        outros = outros.p;
	    }
	    function transition_in(block, local) {
	        if (block && block.i) {
	            outroing.delete(block);
	            block.i(local);
	        }
	    }
	    function transition_out(block, local, detach, callback) {
	        if (block && block.o) {
	            if (outroing.has(block))
	                return;
	            outroing.add(block);
	            outros.c.push(() => {
	                outroing.delete(block);
	                if (callback) {
	                    if (detach)
	                        block.d(1);
	                    callback();
	                }
	            });
	            block.o(local);
	        }
	    }
	    function create_bidirectional_transition(node, fn, params, intro) {
	        let config = fn(node, params);
	        let t = intro ? 0 : 1;
	        let running_program = null;
	        let pending_program = null;
	        let animation_name = null;
	        function clear_animation() {
	            if (animation_name)
	                delete_rule(node, animation_name);
	        }
	        function init(program, duration) {
	            const d = program.b - t;
	            duration *= Math.abs(d);
	            return {
	                a: t,
	                b: program.b,
	                d,
	                duration,
	                start: program.start,
	                end: program.start + duration,
	                group: program.group
	            };
	        }
	        function go(b) {
	            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config;
	            const program = {
	                start: now() + delay,
	                b
	            };
	            if (!b) {
	                // @ts-ignore todo: improve typings
	                program.group = outros;
	                outros.r += 1;
	            }
	            if (running_program) {
	                pending_program = program;
	            }
	            else {
	                // if this is an intro, and there's a delay, we need to do
	                // an initial tick and/or apply CSS animation immediately
	                if (css) {
	                    clear_animation();
	                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
	                }
	                if (b)
	                    tick(0, 1);
	                running_program = init(program, duration);
	                add_render_callback(() => dispatch(node, b, 'start'));
	                loop(now => {
	                    if (pending_program && now > pending_program.start) {
	                        running_program = init(pending_program, duration);
	                        pending_program = null;
	                        dispatch(node, running_program.b, 'start');
	                        if (css) {
	                            clear_animation();
	                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
	                        }
	                    }
	                    if (running_program) {
	                        if (now >= running_program.end) {
	                            tick(t = running_program.b, 1 - t);
	                            dispatch(node, running_program.b, 'end');
	                            if (!pending_program) {
	                                // we're done
	                                if (running_program.b) {
	                                    // intro — we can tidy up immediately
	                                    clear_animation();
	                                }
	                                else {
	                                    // outro — needs to be coordinated
	                                    if (!--running_program.group.r)
	                                        run_all(running_program.group.c);
	                                }
	                            }
	                            running_program = null;
	                        }
	                        else if (now >= running_program.start) {
	                            const p = now - running_program.start;
	                            t = running_program.a + running_program.d * easing(p / running_program.duration);
	                            tick(t, 1 - t);
	                        }
	                    }
	                    return !!(running_program || pending_program);
	                });
	            }
	        }
	        return {
	            run(b) {
	                if (is_function(config)) {
	                    wait().then(() => {
	                        // @ts-ignore
	                        config = config();
	                        go(b);
	                    });
	                }
	                else {
	                    go(b);
	                }
	            },
	            end() {
	                clear_animation();
	                running_program = pending_program = null;
	            }
	        };
	    }
	    function mount_component(component, target, anchor) {
	        const { fragment, on_mount, on_destroy, after_update } = component.$$;
	        fragment.m(target, anchor);
	        // onMount happens before the initial afterUpdate
	        add_render_callback(() => {
	            const new_on_destroy = on_mount.map(run).filter(is_function);
	            if (on_destroy) {
	                on_destroy.push(...new_on_destroy);
	            }
	            else {
	                // Edge case - component was destroyed immediately,
	                // most likely as a result of a binding initialising
	                run_all(new_on_destroy);
	            }
	            component.$$.on_mount = [];
	        });
	        after_update.forEach(add_render_callback);
	    }
	    function destroy_component(component, detaching) {
	        if (component.$$.fragment) {
	            run_all(component.$$.on_destroy);
	            component.$$.fragment.d(detaching);
	            // TODO null out other refs, including component.$$ (but need to
	            // preserve final state?)
	            component.$$.on_destroy = component.$$.fragment = null;
	            component.$$.ctx = {};
	        }
	    }
	    function make_dirty(component, key) {
	        if (!component.$$.dirty) {
	            dirty_components.push(component);
	            schedule_update();
	            component.$$.dirty = blank_object();
	        }
	        component.$$.dirty[key] = true;
	    }
	    function init(component, options, instance, create_fragment, not_equal, prop_names) {
	        const parent_component = current_component;
	        set_current_component(component);
	        const props = options.props || {};
	        const $$ = component.$$ = {
	            fragment: null,
	            ctx: null,
	            // state
	            props: prop_names,
	            update: noop,
	            not_equal,
	            bound: blank_object(),
	            // lifecycle
	            on_mount: [],
	            on_destroy: [],
	            before_update: [],
	            after_update: [],
	            context: new Map(parent_component ? parent_component.$$.context : []),
	            // everything else
	            callbacks: blank_object(),
	            dirty: null
	        };
	        let ready = false;
	        $$.ctx = instance
	            ? instance(component, props, (key, value) => {
	                if ($$.ctx && not_equal($$.ctx[key], $$.ctx[key] = value)) {
	                    if ($$.bound[key])
	                        $$.bound[key](value);
	                    if (ready)
	                        make_dirty(component, key);
	                }
	            })
	            : props;
	        $$.update();
	        ready = true;
	        run_all($$.before_update);
	        $$.fragment = create_fragment($$.ctx);
	        if (options.target) {
	            if (options.hydrate) {
	                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	                $$.fragment.l(children(options.target));
	            }
	            else {
	                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	                $$.fragment.c();
	            }
	            if (options.intro)
	                transition_in(component.$$.fragment);
	            mount_component(component, options.target, options.anchor);
	            flush();
	        }
	        set_current_component(parent_component);
	    }
	    class SvelteComponent {
	        $destroy() {
	            destroy_component(this, 1);
	            this.$destroy = noop;
	        }
	        $on(type, callback) {
	            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
	            callbacks.push(callback);
	            return () => {
	                const index = callbacks.indexOf(callback);
	                if (index !== -1)
	                    callbacks.splice(index, 1);
	            };
	        }
	        $set() {
	            // overridden by instance, if it has props
	        }
	    }
	    class SvelteComponentDev extends SvelteComponent {
	        constructor(options) {
	            if (!options || (!options.target && !options.$$inline)) {
	                throw new Error(`'target' is a required option`);
	            }
	            super();
	        }
	        $destroy() {
	            super.$destroy();
	            this.$destroy = () => {
	                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
	            };
	        }
	    }

	    var global$1 = (typeof commonjsGlobal !== "undefined" ? commonjsGlobal :
	                typeof self !== "undefined" ? self :
	                typeof window !== "undefined" ? window : {});

	    // shim for using process in browser
	    // based off https://github.com/defunctzombie/node-process/blob/master/browser.js

	    function defaultSetTimout() {
	        throw new Error('setTimeout has not been defined');
	    }
	    function defaultClearTimeout () {
	        throw new Error('clearTimeout has not been defined');
	    }
	    var cachedSetTimeout = defaultSetTimout;
	    var cachedClearTimeout = defaultClearTimeout;
	    if (typeof global$1.setTimeout === 'function') {
	        cachedSetTimeout = setTimeout;
	    }
	    if (typeof global$1.clearTimeout === 'function') {
	        cachedClearTimeout = clearTimeout;
	    }

	    function runTimeout(fun) {
	        if (cachedSetTimeout === setTimeout) {
	            //normal enviroments in sane situations
	            return setTimeout(fun, 0);
	        }
	        // if setTimeout wasn't available but was latter defined
	        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	            cachedSetTimeout = setTimeout;
	            return setTimeout(fun, 0);
	        }
	        try {
	            // when when somebody has screwed with setTimeout but no I.E. maddness
	            return cachedSetTimeout(fun, 0);
	        } catch(e){
	            try {
	                // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	                return cachedSetTimeout.call(null, fun, 0);
	            } catch(e){
	                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	                return cachedSetTimeout.call(this, fun, 0);
	            }
	        }


	    }
	    function runClearTimeout(marker) {
	        if (cachedClearTimeout === clearTimeout) {
	            //normal enviroments in sane situations
	            return clearTimeout(marker);
	        }
	        // if clearTimeout wasn't available but was latter defined
	        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	            cachedClearTimeout = clearTimeout;
	            return clearTimeout(marker);
	        }
	        try {
	            // when when somebody has screwed with setTimeout but no I.E. maddness
	            return cachedClearTimeout(marker);
	        } catch (e){
	            try {
	                // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	                return cachedClearTimeout.call(null, marker);
	            } catch (e){
	                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	                // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	                return cachedClearTimeout.call(this, marker);
	            }
	        }



	    }
	    var queue = [];
	    var draining = false;
	    var currentQueue;
	    var queueIndex = -1;

	    function cleanUpNextTick() {
	        if (!draining || !currentQueue) {
	            return;
	        }
	        draining = false;
	        if (currentQueue.length) {
	            queue = currentQueue.concat(queue);
	        } else {
	            queueIndex = -1;
	        }
	        if (queue.length) {
	            drainQueue();
	        }
	    }

	    function drainQueue() {
	        if (draining) {
	            return;
	        }
	        var timeout = runTimeout(cleanUpNextTick);
	        draining = true;

	        var len = queue.length;
	        while(len) {
	            currentQueue = queue;
	            queue = [];
	            while (++queueIndex < len) {
	                if (currentQueue) {
	                    currentQueue[queueIndex].run();
	                }
	            }
	            queueIndex = -1;
	            len = queue.length;
	        }
	        currentQueue = null;
	        draining = false;
	        runClearTimeout(timeout);
	    }
	    function nextTick(fun) {
	        var args = new Array(arguments.length - 1);
	        if (arguments.length > 1) {
	            for (var i = 1; i < arguments.length; i++) {
	                args[i - 1] = arguments[i];
	            }
	        }
	        queue.push(new Item(fun, args));
	        if (queue.length === 1 && !draining) {
	            runTimeout(drainQueue);
	        }
	    }
	    // v8 likes predictible objects
	    function Item(fun, array) {
	        this.fun = fun;
	        this.array = array;
	    }
	    Item.prototype.run = function () {
	        this.fun.apply(null, this.array);
	    };
	    var title = 'browser';
	    var platform = 'browser';
	    var browser = true;
	    var env = {};
	    var argv = [];
	    var version = ''; // empty string to avoid regexp issues
	    var versions = {};
	    var release = {};
	    var config = {};

	    function noop$1() {}

	    var on = noop$1;
	    var addListener = noop$1;
	    var once = noop$1;
	    var off = noop$1;
	    var removeListener = noop$1;
	    var removeAllListeners = noop$1;
	    var emit = noop$1;

	    function binding(name) {
	        throw new Error('process.binding is not supported');
	    }

	    function cwd () { return '/' }
	    function chdir (dir) {
	        throw new Error('process.chdir is not supported');
	    }function umask() { return 0; }

	    // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
	    var performance = global$1.performance || {};
	    var performanceNow =
	      performance.now        ||
	      performance.mozNow     ||
	      performance.msNow      ||
	      performance.oNow       ||
	      performance.webkitNow  ||
	      function(){ return (new Date()).getTime() };

	    // generate timestamp or delta
	    // see http://nodejs.org/api/process.html#process_process_hrtime
	    function hrtime(previousTimestamp){
	      var clocktime = performanceNow.call(performance)*1e-3;
	      var seconds = Math.floor(clocktime);
	      var nanoseconds = Math.floor((clocktime%1)*1e9);
	      if (previousTimestamp) {
	        seconds = seconds - previousTimestamp[0];
	        nanoseconds = nanoseconds - previousTimestamp[1];
	        if (nanoseconds<0) {
	          seconds--;
	          nanoseconds += 1e9;
	        }
	      }
	      return [seconds,nanoseconds]
	    }

	    var startTime = new Date();
	    function uptime() {
	      var currentTime = new Date();
	      var dif = currentTime - startTime;
	      return dif / 1000;
	    }

	    var process = {
	      nextTick: nextTick,
	      title: title,
	      browser: browser,
	      env: env,
	      argv: argv,
	      version: version,
	      versions: versions,
	      on: on,
	      addListener: addListener,
	      once: once,
	      off: off,
	      removeListener: removeListener,
	      removeAllListeners: removeAllListeners,
	      emit: emit,
	      binding: binding,
	      cwd: cwd,
	      chdir: chdir,
	      umask: umask,
	      hrtime: hrtime,
	      platform: platform,
	      release: release,
	      config: config,
	      uptime: uptime
	    };

	    var commonjsGlobal$1 = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof self !== 'undefined' ? self : {};

	    function unwrapExports (x) {
	    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	    }

	    function createCommonjsModule(fn, module) {
	    	return module = { exports: {} }, fn(module, module.exports), module.exports;
	    }

	    var blocknativeApi = createCommonjsModule(function (module) {
	    function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n);}return r}function _objectSpread2(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(r,!0).forEach(function(t){_defineProperty(e,t,r[t]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t));});}return e}var commonjsGlobal$1$1="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof commonjsGlobal$1?commonjsGlobal$1:"undefined"!=typeof self?self:{};function unwrapExports(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function createCommonjsModule(e,t){return e(t={exports:{}},t.exports),t.exports}var MAX_SAFE_INTEGER=9007199254740991,argsTag="[object Arguments]",funcTag="[object Function]",genTag="[object GeneratorFunction]",reIsUint=/^(?:0|[1-9]\d*)$/;function apply(e,t,r){switch(r.length){case 0:return e.call(t);case 1:return e.call(t,r[0]);case 2:return e.call(t,r[0],r[1]);case 3:return e.call(t,r[0],r[1],r[2])}return e.apply(t,r)}function baseTimes(e,t){for(var r=-1,n=Array(e);++r<e;)n[r]=t(r);return n}var objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty,objectToString=objectProto.toString,propertyIsEnumerable=objectProto.propertyIsEnumerable,nativeMax=Math.max;function arrayLikeKeys(e,t){var r=isArray(e)||isArguments(e)?baseTimes(e.length,String):[],n=r.length,a=!!n;for(var o in e)!t&&!hasOwnProperty.call(e,o)||a&&("length"==o||isIndex(o,n))||r.push(o);return r}function assignInDefaults(e,t,r,n){return void 0===e||eq(e,objectProto[r])&&!hasOwnProperty.call(n,r)?t:e}function assignValue(e,t,r){var n=e[t];hasOwnProperty.call(e,t)&&eq(n,r)&&(void 0!==r||t in e)||(e[t]=r);}function baseKeysIn(e){if(!isObject(e))return nativeKeysIn(e);var t=isPrototype(e),r=[];for(var n in e)("constructor"!=n||!t&&hasOwnProperty.call(e,n))&&r.push(n);return r}function baseRest(e,t){return t=nativeMax(void 0===t?e.length-1:t,0),function(){for(var r=arguments,n=-1,a=nativeMax(r.length-t,0),o=Array(a);++n<a;)o[n]=r[t+n];n=-1;for(var i=Array(t+1);++n<t;)i[n]=r[n];return i[t]=o,apply(e,this,i)}}function copyObject(e,t,r,n){r||(r={});for(var a=-1,o=t.length;++a<o;){var i=t[a],s=n?n(r[i],e[i],i,r,e):void 0;assignValue(r,i,void 0===s?e[i]:s);}return r}function createAssigner(e){return baseRest(function(t,r){var n=-1,a=r.length,o=a>1?r[a-1]:void 0,i=a>2?r[2]:void 0;for(o=e.length>3&&"function"==typeof o?(a--,o):void 0,i&&isIterateeCall(r[0],r[1],i)&&(o=a<3?void 0:o,a=1),t=Object(t);++n<a;){var s=r[n];s&&e(t,s,n,o);}return t})}function isIndex(e,t){return !!(t=null==t?MAX_SAFE_INTEGER:t)&&("number"==typeof e||reIsUint.test(e))&&e>-1&&e%1==0&&e<t}function isIterateeCall(e,t,r){if(!isObject(r))return !1;var n=typeof t;return !!("number"==n?isArrayLike(r)&&isIndex(t,r.length):"string"==n&&t in r)&&eq(r[t],e)}function isPrototype(e){var t=e&&e.constructor;return e===("function"==typeof t&&t.prototype||objectProto)}function nativeKeysIn(e){var t=[];if(null!=e)for(var r in Object(e))t.push(r);return t}function eq(e,t){return e===t||e!=e&&t!=t}function isArguments(e){return isArrayLikeObject(e)&&hasOwnProperty.call(e,"callee")&&(!propertyIsEnumerable.call(e,"callee")||objectToString.call(e)==argsTag)}var isArray=Array.isArray;function isArrayLike(e){return null!=e&&isLength(e.length)&&!isFunction(e)}function isArrayLikeObject(e){return isObjectLike(e)&&isArrayLike(e)}function isFunction(e){var t=isObject(e)?objectToString.call(e):"";return t==funcTag||t==genTag}function isLength(e){return "number"==typeof e&&e>-1&&e%1==0&&e<=MAX_SAFE_INTEGER}function isObject(e){var t=typeof e;return !!e&&("object"==t||"function"==t)}function isObjectLike(e){return !!e&&"object"==typeof e}var assignInWith=createAssigner(function(e,t,r,n){copyObject(t,keysIn(t),e,n);}),defaults=baseRest(function(e){return e.push(void 0,assignInDefaults),apply(assignInWith,void 0,e)});function keysIn(e){return isArrayLike(e)?arrayLikeKeys(e,!0):baseKeysIn(e)}var lodash_defaults=defaults,dist=createCommonjsModule(function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(t,r,n){if(this.url=t,this.onclose=null,this.onerror=null,this.onmessage=null,this.onopen=null,this.ondown=null,this.onreopen=null,this.CONNECTING=e.CONNECTING,this.OPEN=e.OPEN,this.CLOSING=e.CLOSING,this.CLOSED=e.CLOSED,this.hasBeenOpened=!1,this.isClosed=!1,this.messageBuffer=[],this.nextRetryTime=0,this.reconnectCount=0,this.lastKnownExtensions="",this.lastKnownProtocol="",this.listeners={},null==r||"string"==typeof r||Array.isArray(r)?this.protocols=r:n=r,this.options=lodash_defaults({},n,e.DEFAULT_OPTIONS),!this.options.wsConstructor){if("undefined"==typeof WebSocket)throw new Error("WebSocket not present in global scope and no wsConstructor option was provided.");this.options.wsConstructor=WebSocket;}this.openNewWebSocket();}return Object.defineProperty(e.prototype,"binaryType",{get:function(){return this.binaryTypeInternal||"blob"},set:function(e){this.binaryTypeInternal=e,this.ws&&(this.ws.binaryType=e);},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"bufferedAmount",{get:function(){var e=this.ws?this.ws.bufferedAmount:0,t=!1;return this.messageBuffer.forEach(function(r){var n=function(e){return "string"==typeof e?2*e.length:e instanceof ArrayBuffer?e.byteLength:e instanceof Blob?e.size:void 0}(r);null!=n?e+=n:t=!0;}),t&&this.debugLog("Some buffered data had unknown length. bufferedAmount() return value may be below the correct amount."),e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"extensions",{get:function(){return this.ws?this.ws.extensions:this.lastKnownExtensions},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"protocol",{get:function(){return this.ws?this.ws.protocol:this.lastKnownProtocol},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"readyState",{get:function(){return this.isClosed?e.CLOSED:e.OPEN},enumerable:!0,configurable:!0}),e.prototype.close=function(e,t){this.ws&&this.ws.close(e,t),this.shutdown(),this.debugLog("WebSocket permanently closed by client.");},e.prototype.send=function(e){this.ws&&this.ws.readyState===this.OPEN?this.ws.send(e):this.messageBuffer.push(e);},e.prototype.addEventListener=function(e,t){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t);},e.prototype.dispatchEvent=function(e){return this.dispatchEventOfType(e.type,e)},e.prototype.removeEventListener=function(e,t){this.listeners[e]&&(this.listeners[e]=this.listeners[e].filter(function(e){return e!==t}));},e.prototype.openNewWebSocket=function(){var e=this;if(!this.isClosed){var t=this.options,r=t.connectTimeout,n=t.wsConstructor;this.debugLog("Opening new WebSocket to "+this.url+".");var a=new n(this.url,this.protocols);a.onclose=function(t){return e.handleClose(t)},a.onerror=function(t){return e.handleError(t)},a.onmessage=function(t){return e.handleMessage(t)},a.onopen=function(t){return e.handleOpen(t)},this.connectTimeoutId=setTimeout(function(){e.clearConnectTimeout(),a.close();},r),this.ws=a;}},e.prototype.handleOpen=function(e){var t=this;if(this.ws&&!this.isClosed){var r=this.options.allClearResetTime;this.debugLog("WebSocket opened."),null!=this.binaryTypeInternal?this.ws.binaryType=this.binaryTypeInternal:this.binaryTypeInternal=this.ws.binaryType,this.clearConnectTimeout(),this.hasBeenOpened?this.dispatchEventOfType("reopen",e):(this.dispatchEventOfType("open",e),this.hasBeenOpened=!0),this.messageBuffer.forEach(function(e){return t.send(e)}),this.messageBuffer=[],this.allClearTimeoutId=setTimeout(function(){t.clearAllClearTimeout(),t.nextRetryTime=0,t.reconnectCount=0;var e=r/1e3|0;t.debugLog("WebSocket remained open for "+e+" seconds. Resetting retry time and count.");},r);}},e.prototype.handleMessage=function(e){this.isClosed||this.dispatchEventOfType("message",e);},e.prototype.handleClose=function(e){var t=this;if(!this.isClosed){var r=this.options,n=r.maxReconnectAttempts,a=r.shouldReconnect;if(this.clearConnectTimeout(),this.clearAllClearTimeout(),this.ws&&(this.lastKnownExtensions=this.ws.extensions,this.lastKnownProtocol=this.ws.protocol,this.ws=void 0),this.dispatchEventOfType("down",e),this.reconnectCount>=n)this.stopReconnecting(e,this.getTooManyFailedReconnectsMessage());else{var o=a(e);"boolean"==typeof o?this.handleWillReconnect(o,e,"Provided shouldReconnect() returned false. Closing permanently."):o.then(function(r){t.isClosed||t.handleWillReconnect(r,e,"Provided shouldReconnect() resolved to false. Closing permanently.");});}}},e.prototype.handleError=function(e){this.dispatchEventOfType("error",e),this.debugLog("WebSocket encountered an error.");},e.prototype.handleWillReconnect=function(e,t,r){e?this.reconnect():this.stopReconnecting(t,r);},e.prototype.reconnect=function(){var e=this,t=this.options,r=t.minReconnectDelay,n=t.maxReconnectDelay,a=t.reconnectBackoffFactor;this.reconnectCount++;var o=this.nextRetryTime;this.nextRetryTime=Math.max(r,Math.min(this.nextRetryTime*a,n)),setTimeout(function(){return e.openNewWebSocket()},o);var i=o/1e3|0;this.debugLog("WebSocket was closed. Re-opening in "+i+" seconds.");},e.prototype.stopReconnecting=function(e,t){this.debugLog(t),this.shutdown(),this.dispatchEventOfType("close",e);},e.prototype.shutdown=function(){this.isClosed=!0,this.clearAllTimeouts(),this.messageBuffer=[];},e.prototype.clearAllTimeouts=function(){this.clearConnectTimeout(),this.clearAllClearTimeout();},e.prototype.clearConnectTimeout=function(){null!=this.connectTimeoutId&&(clearTimeout(this.connectTimeoutId),this.connectTimeoutId=void 0);},e.prototype.clearAllClearTimeout=function(){null!=this.allClearTimeoutId&&(clearTimeout(this.allClearTimeoutId),this.allClearTimeoutId=void 0);},e.prototype.dispatchEventOfType=function(e,t){var r=this;switch(e){case"close":this.onclose&&this.onclose(t);break;case"error":this.onerror&&this.onerror(t);break;case"message":this.onmessage&&this.onmessage(t);break;case"open":this.onopen&&this.onopen(t);break;case"down":this.ondown&&this.ondown(t);break;case"reopen":this.onreopen&&this.onreopen(t);}return e in this.listeners&&this.listeners[e].slice().forEach(function(e){return r.callListener(e,t)}),!t||!t.defaultPrevented},e.prototype.callListener=function(e,t){"function"==typeof e?e.call(this,t):e.handleEvent.call(this,t);},e.prototype.debugLog=function(e){this.options.debug&&console.log(e);},e.prototype.getTooManyFailedReconnectsMessage=function(){var e,t=this.options.maxReconnectAttempts;return "Failed to reconnect after "+t+" "+(e="attempt",1===t?e:e+"s")+". Closing permanently."},e.DEFAULT_OPTIONS={allClearResetTime:5e3,connectTimeout:5e3,debug:!1,minReconnectDelay:1e3,maxReconnectDelay:3e4,maxReconnectAttempts:Number.POSITIVE_INFINITY,reconnectBackoffFactor:1.5,shouldReconnect:function(){return !0},wsConstructor:void 0},e.CONNECTING=0,e.OPEN=1,e.CLOSING=2,e.CLOSED=3,e}();t.default=r;}),SturdyWebSocket=unwrapExports(dist),require$$0={},maxInt=2147483647,base=36,tMin=1,tMax=26,skew=38,damp=700,initialBias=72,initialN=128,delimiter="-",regexNonASCII=/[^\x20-\x7E]/,regexSeparators=/[\x2E\u3002\uFF0E\uFF61]/g,errors={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},baseMinusTMin=base-tMin,floor=Math.floor,stringFromCharCode=String.fromCharCode;function error(e){throw new RangeError(errors[e])}function map(e,t){for(var r=e.length,n=[];r--;)n[r]=t(e[r]);return n}function mapDomain(e,t){var r=e.split("@"),n="";return r.length>1&&(n=r[0]+"@",e=r[1]),n+map((e=e.replace(regexSeparators,".")).split("."),t).join(".")}function ucs2decode(e){for(var t,r,n=[],a=0,o=e.length;a<o;)(t=e.charCodeAt(a++))>=55296&&t<=56319&&a<o?56320==(64512&(r=e.charCodeAt(a++)))?n.push(((1023&t)<<10)+(1023&r)+65536):(n.push(t),a--):n.push(t);return n}function digitToBasic(e,t){return e+22+75*(e<26)-((0!=t)<<5)}function adapt(e,t,r){var n=0;for(e=r?floor(e/damp):e>>1,e+=floor(e/t);e>baseMinusTMin*tMax>>1;n+=base)e=floor(e/baseMinusTMin);return floor(n+(baseMinusTMin+1)*e/(e+skew))}function encode(e){var t,r,n,a,o,i,s,c,l,u,d,f,h,p,g,y=[];for(f=(e=ucs2decode(e)).length,t=initialN,r=0,o=initialBias,i=0;i<f;++i)(d=e[i])<128&&y.push(stringFromCharCode(d));for(n=a=y.length,a&&y.push(delimiter);n<f;){for(s=maxInt,i=0;i<f;++i)(d=e[i])>=t&&d<s&&(s=d);for(s-t>floor((maxInt-r)/(h=n+1))&&error("overflow"),r+=(s-t)*h,t=s,i=0;i<f;++i)if((d=e[i])<t&&++r>maxInt&&error("overflow"),d==t){for(c=r,l=base;!(c<(u=l<=o?tMin:l>=o+tMax?tMax:l-o));l+=base)g=c-u,p=base-u,y.push(stringFromCharCode(digitToBasic(u+g%p,0))),c=floor(g/p);y.push(stringFromCharCode(digitToBasic(c,0))),o=adapt(r,h,n==a),r=0,++n;}++r,++t;}return y.join("")}function toASCII(e){return mapDomain(e,function(e){return regexNonASCII.test(e)?"xn--"+encode(e):e})}commonjsGlobal$1.setTimeout,commonjsGlobal$1.clearTimeout;var performance=commonjsGlobal$1.performance||{},performanceNow=performance.now||performance.mozNow||performance.msNow||performance.oNow||performance.webkitNow||function(){return (new Date).getTime()};function isNull(e){return null===e}function isNullOrUndefined(e){return null==e}function isString(e){return "string"==typeof e}function isObject$1(e){return "object"==typeof e&&null!==e}function hasOwnProperty$1(e,t){return Object.prototype.hasOwnProperty.call(e,t)}var isArray$1=Array.isArray||function(e){return "[object Array]"===Object.prototype.toString.call(e)};function stringifyPrimitive(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return ""}}function stringify(e,t,r,n){return t=t||"&",r=r||"=",null===e&&(e=void 0),"object"==typeof e?map$1(objectKeys(e),function(n){var a=encodeURIComponent(stringifyPrimitive(n))+r;return isArray$1(e[n])?map$1(e[n],function(e){return a+encodeURIComponent(stringifyPrimitive(e))}).join(t):a+encodeURIComponent(stringifyPrimitive(e[n]))}).join(t):n?encodeURIComponent(stringifyPrimitive(n))+r+encodeURIComponent(stringifyPrimitive(e)):""}function map$1(e,t){if(e.map)return e.map(t);for(var r=[],n=0;n<e.length;n++)r.push(t(e[n],n));return r}var objectKeys=Object.keys||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.push(r);return t};function parse(e,t,r,n){t=t||"&",r=r||"=";var a={};if("string"!=typeof e||0===e.length)return a;var o=/\+/g;e=e.split(t);var i=1e3;n&&"number"==typeof n.maxKeys&&(i=n.maxKeys);var s=e.length;i>0&&s>i&&(s=i);for(var c=0;c<s;++c){var l,u,d,f,h=e[c].replace(o,"%20"),p=h.indexOf(r);p>=0?(l=h.substr(0,p),u=h.substr(p+1)):(l=h,u=""),d=decodeURIComponent(l),f=decodeURIComponent(u),hasOwnProperty$1(a,d)?isArray$1(a[d])?a[d].push(f):a[d]=[a[d],f]:a[d]=f;}return a}var require$$1={parse:urlParse,resolve:urlResolve,resolveObject:urlResolveObject,format:urlFormat,Url:Url};function Url(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null;}var protocolPattern=/^([a-z0-9.+-]+:)/i,portPattern=/:[0-9]*$/,simplePathPattern=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,delims=["<",">",'"',"`"," ","\r","\n","\t"],unwise=["{","}","|","\\","^","`"].concat(delims),autoEscape=["'"].concat(unwise),nonHostChars=["%","/","?",";","#"].concat(autoEscape),hostEndingChars=["/","?","#"],hostnameMaxLen=255,hostnamePartPattern=/^[+a-z0-9A-Z_-]{0,63}$/,hostnamePartStart=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,unsafeProtocol={javascript:!0,"javascript:":!0},hostlessProtocol={javascript:!0,"javascript:":!0},slashedProtocol={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function urlParse(e,t,r){if(e&&isObject$1(e)&&e instanceof Url)return e;var n=new Url;return n.parse(e,t,r),n}function parse$1(e,t,r,n){if(!isString(t))throw new TypeError("Parameter 'url' must be a string, not "+typeof t);var a=t.indexOf("?"),o=-1!==a&&a<t.indexOf("#")?"?":"#",i=t.split(o);i[0]=i[0].replace(/\\/g,"/");var s=t=i.join(o);if(s=s.trim(),!n&&1===t.split("#").length){var c=simplePathPattern.exec(s);if(c)return e.path=s,e.href=s,e.pathname=c[1],c[2]?(e.search=c[2],e.query=r?parse(e.search.substr(1)):e.search.substr(1)):r&&(e.search="",e.query={}),e}var l,u,d,f,h=protocolPattern.exec(s);if(h){var p=(h=h[0]).toLowerCase();e.protocol=p,s=s.substr(h.length);}if(n||h||s.match(/^\/\/[^@\/]+@[^@\/]+/)){var g="//"===s.substr(0,2);!g||h&&hostlessProtocol[h]||(s=s.substr(2),e.slashes=!0);}if(!hostlessProtocol[h]&&(g||h&&!slashedProtocol[h])){var y,m,v=-1;for(l=0;l<hostEndingChars.length;l++)-1!==(u=s.indexOf(hostEndingChars[l]))&&(-1===v||u<v)&&(v=u);for(-1!==(m=-1===v?s.lastIndexOf("@"):s.lastIndexOf("@",v))&&(y=s.slice(0,m),s=s.slice(m+1),e.auth=decodeURIComponent(y)),v=-1,l=0;l<nonHostChars.length;l++)-1!==(u=s.indexOf(nonHostChars[l]))&&(-1===v||u<v)&&(v=u);-1===v&&(v=s.length),e.host=s.slice(0,v),s=s.slice(v),parseHost(e),e.hostname=e.hostname||"";var b="["===e.hostname[0]&&"]"===e.hostname[e.hostname.length-1];if(!b){var O=e.hostname.split(/\./);for(l=0,d=O.length;l<d;l++){var _=O[l];if(_&&!_.match(hostnamePartPattern)){for(var $="",P=0,w=_.length;P<w;P++)_.charCodeAt(P)>127?$+="x":$+=_[P];if(!$.match(hostnamePartPattern)){var j=O.slice(0,l),x=O.slice(l+1),E=_.match(hostnamePartStart);E&&(j.push(E[1]),x.unshift(E[2])),x.length&&(s="/"+x.join(".")+s),e.hostname=j.join(".");break}}}}e.hostname.length>hostnameMaxLen?e.hostname="":e.hostname=e.hostname.toLowerCase(),b||(e.hostname=toASCII(e.hostname)),f=e.port?":"+e.port:"";var S=e.hostname||"";e.host=S+f,e.href+=e.host,b&&(e.hostname=e.hostname.substr(1,e.hostname.length-2),"/"!==s[0]&&(s="/"+s));}if(!unsafeProtocol[p])for(l=0,d=autoEscape.length;l<d;l++){var A=autoEscape[l];if(-1!==s.indexOf(A)){var k=encodeURIComponent(A);k===A&&(k=escape(A)),s=s.split(A).join(k);}}var T=s.indexOf("#");-1!==T&&(e.hash=s.substr(T),s=s.slice(0,T));var I=s.indexOf("?");if(-1!==I?(e.search=s.substr(I),e.query=s.substr(I+1),r&&(e.query=parse(e.query)),s=s.slice(0,I)):r&&(e.search="",e.query={}),s&&(e.pathname=s),slashedProtocol[p]&&e.hostname&&!e.pathname&&(e.pathname="/"),e.pathname||e.search){f=e.pathname||"";var M=e.search||"";e.path=f+M;}return e.href=format(e),e}function urlFormat(e){return isString(e)&&(e=parse$1({},e)),format(e)}function format(e){var t=e.auth||"";t&&(t=(t=encodeURIComponent(t)).replace(/%3A/i,":"),t+="@");var r=e.protocol||"",n=e.pathname||"",a=e.hash||"",o=!1,i="";e.host?o=t+e.host:e.hostname&&(o=t+(-1===e.hostname.indexOf(":")?e.hostname:"["+this.hostname+"]"),e.port&&(o+=":"+e.port)),e.query&&isObject$1(e.query)&&Object.keys(e.query).length&&(i=stringify(e.query));var s=e.search||i&&"?"+i||"";return r&&":"!==r.substr(-1)&&(r+=":"),e.slashes||(!r||slashedProtocol[r])&&!1!==o?(o="//"+(o||""),n&&"/"!==n.charAt(0)&&(n="/"+n)):o||(o=""),a&&"#"!==a.charAt(0)&&(a="#"+a),s&&"?"!==s.charAt(0)&&(s="?"+s),r+o+(n=n.replace(/[?#]/g,function(e){return encodeURIComponent(e)}))+(s=s.replace("#","%23"))+a}function urlResolve(e,t){return urlParse(e,!1,!0).resolve(t)}function urlResolveObject(e,t){return e?urlParse(e,!1,!0).resolveObject(t):t}function parseHost(e){var t=e.host,r=portPattern.exec(t);r&&(":"!==(r=r[0])&&(e.port=r.substr(1)),t=t.substr(0,t.length-r.length)),t&&(e.hostname=t);}Url.prototype.parse=function(e,t,r){return parse$1(this,e,t,r)},Url.prototype.format=function(){return format(this)},Url.prototype.resolve=function(e){return this.resolveObject(urlParse(e,!1,!0)).format()},Url.prototype.resolveObject=function(e){if(isString(e)){var t=new Url;t.parse(e,!1,!0),e=t;}for(var r,n=new Url,a=Object.keys(this),o=0;o<a.length;o++){var i=a[o];n[i]=this[i];}if(n.hash=e.hash,""===e.href)return n.href=n.format(),n;if(e.slashes&&!e.protocol){for(var s=Object.keys(e),c=0;c<s.length;c++){var l=s[c];"protocol"!==l&&(n[l]=e[l]);}return slashedProtocol[n.protocol]&&n.hostname&&!n.pathname&&(n.path=n.pathname="/"),n.href=n.format(),n}if(e.protocol&&e.protocol!==n.protocol){if(!slashedProtocol[e.protocol]){for(var u=Object.keys(e),d=0;d<u.length;d++){var f=u[d];n[f]=e[f];}return n.href=n.format(),n}if(n.protocol=e.protocol,e.host||hostlessProtocol[e.protocol])n.pathname=e.pathname;else{for(r=(e.pathname||"").split("/");r.length&&!(e.host=r.shift()););e.host||(e.host=""),e.hostname||(e.hostname=""),""!==r[0]&&r.unshift(""),r.length<2&&r.unshift(""),n.pathname=r.join("/");}if(n.search=e.search,n.query=e.query,n.host=e.host||"",n.auth=e.auth,n.hostname=e.hostname||e.host,n.port=e.port,n.pathname||n.search){var h=n.pathname||"",p=n.search||"";n.path=h+p;}return n.slashes=n.slashes||e.slashes,n.href=n.format(),n}var g,y=n.pathname&&"/"===n.pathname.charAt(0),m=e.host||e.pathname&&"/"===e.pathname.charAt(0),v=m||y||n.host&&e.pathname,b=v,O=n.pathname&&n.pathname.split("/")||[],_=n.protocol&&!slashedProtocol[n.protocol];if(r=e.pathname&&e.pathname.split("/")||[],_&&(n.hostname="",n.port=null,n.host&&(""===O[0]?O[0]=n.host:O.unshift(n.host)),n.host="",e.protocol&&(e.hostname=null,e.port=null,e.host&&(""===r[0]?r[0]=e.host:r.unshift(e.host)),e.host=null),v=v&&(""===r[0]||""===O[0])),m)n.host=e.host||""===e.host?e.host:n.host,n.hostname=e.hostname||""===e.hostname?e.hostname:n.hostname,n.search=e.search,n.query=e.query,O=r;else if(r.length)O||(O=[]),O.pop(),O=O.concat(r),n.search=e.search,n.query=e.query;else if(!isNullOrUndefined(e.search))return _&&(n.hostname=n.host=O.shift(),(g=!!(n.host&&n.host.indexOf("@")>0)&&n.host.split("@"))&&(n.auth=g.shift(),n.host=n.hostname=g.shift())),n.search=e.search,n.query=e.query,isNull(n.pathname)&&isNull(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.href=n.format(),n;if(!O.length)return n.pathname=null,n.search?n.path="/"+n.search:n.path=null,n.href=n.format(),n;for(var $=O.slice(-1)[0],P=(n.host||e.host||O.length>1)&&("."===$||".."===$)||""===$,w=0,j=O.length;j>=0;j--)"."===($=O[j])?O.splice(j,1):".."===$?(O.splice(j,1),w++):w&&(O.splice(j,1),w--);if(!v&&!b)for(;w--;w)O.unshift("..");!v||""===O[0]||O[0]&&"/"===O[0].charAt(0)||O.unshift(""),P&&"/"!==O.join("/").substr(-1)&&O.push("");var x=""===O[0]||O[0]&&"/"===O[0].charAt(0);return _&&(n.hostname=n.host=x?"":O.length?O.shift():"",(g=!!(n.host&&n.host.indexOf("@")>0)&&n.host.split("@"))&&(n.auth=g.shift(),n.host=n.hostname=g.shift())),(v=v||n.host&&O.length)&&!x&&O.unshift(""),O.length?n.pathname=O.join("/"):(n.pathname=null,n.path=null),isNull(n.pathname)&&isNull(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.auth=e.auth||n.auth,n.slashes=n.slashes||e.slashes,n.href=n.format(),n},Url.prototype.parseHost=function(){return parseHost(this)};var source=createCommonjsModule(function(e){e.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n});},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0});},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=4)}([function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(r(1)),o=r(8),i=r(2),s=r(16);t.validatorSymbol=Symbol("validators"),t.Predicate=class{constructor(e,t={}){this.type=e,this.options=t,this.context={validators:[]},this.context=Object.assign({},this.context,this.options);const r=this.type[0].toLowerCase()+this.type.slice(1);this.addValidator({message:(e,t)=>`Expected ${t&&t.substring(this.type.length+1)||"argument"} to be of type \`${this.type}\` but received type \`${a.default(e)}\``,validator:e=>a.default[r](e)});}[i.testSymbol](e,t,r){for(const{validator:n,message:a}of this.context.validators){if(!0===this.options.optional&&void 0===e)continue;const i=n(e);if(!0===i)continue;let s=r;throw"function"==typeof r&&(s=r()),s=s?`${this.type} \`${s}\``:this.type,new o.ArgumentError(a(e,s,i),t)}}get[t.validatorSymbol](){return this.context.validators}get not(){return s.not(this)}validate(e){return this.addValidator({message:(e,t,r)=>"string"==typeof r?`(${t}) ${r}`:r(t),validator:t=>{const{message:r,validator:n}=e(t);return !!n||r}})}is(e){return this.addValidator({message:(e,t,r)=>r?`(${t}) ${r}`:`Expected ${t} \`${e}\` to pass custom validation function`,validator:e})}addValidator(e){return this.context.validators.push(e),this}};},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const n="undefined"==typeof URL?r(15).URL:URL,{toString:a}=Object.prototype,o=e=>t=>typeof t===e,i=e=>{const t=a.call(e).slice(8,-1);if(t)return t},s=e=>t=>i(t)===e;function c(e){switch(e){case null:return "null";case!0:case!1:return "boolean"}switch(typeof e){case"undefined":return "undefined";case"string":return "string";case"number":return "number";case"bigint":return "bigint";case"symbol":return "symbol"}if(c.function_(e))return "Function";if(c.observable(e))return "Observable";if(c.array(e))return "Array";if(c.buffer(e))return "Buffer";const t=i(e);if(t)return t;if(e instanceof String||e instanceof Boolean||e instanceof Number)throw new TypeError("Please don't use object wrappers for primitive types");return "Object"}const l=e=>"object"==typeof e;c.undefined=o("undefined"),c.string=o("string"),c.number=o("number"),c.bigint=o("bigint"),c.function_=o("function"),c.null_=e=>null===e,c.class_=e=>c.function_(e)&&e.toString().startsWith("class "),c.boolean=e=>!0===e||!1===e,c.symbol=o("symbol"),c.numericString=e=>c.string(e)&&e.length>0&&!Number.isNaN(Number(e)),c.array=Array.isArray,c.buffer=e=>!c.nullOrUndefined(e)&&!c.nullOrUndefined(e.constructor)&&c.function_(e.constructor.isBuffer)&&e.constructor.isBuffer(e),c.nullOrUndefined=e=>c.null_(e)||c.undefined(e),c.object=e=>!c.nullOrUndefined(e)&&(c.function_(e)||l(e)),c.iterable=e=>!c.nullOrUndefined(e)&&c.function_(e[Symbol.iterator]),c.asyncIterable=e=>!c.nullOrUndefined(e)&&c.function_(e[Symbol.asyncIterator]),c.generator=e=>c.iterable(e)&&c.function_(e.next)&&c.function_(e.throw),c.nativePromise=e=>s("Promise")(e),c.promise=e=>c.nativePromise(e)||(e=>!c.null_(e)&&l(e)&&c.function_(e.then)&&c.function_(e.catch))(e),c.generatorFunction=s("GeneratorFunction"),c.asyncFunction=s("AsyncFunction"),c.boundFunction=e=>c.function_(e)&&!e.hasOwnProperty("prototype"),c.regExp=s("RegExp"),c.date=s("Date"),c.error=s("Error"),c.map=e=>s("Map")(e),c.set=e=>s("Set")(e),c.weakMap=e=>s("WeakMap")(e),c.weakSet=e=>s("WeakSet")(e),c.int8Array=s("Int8Array"),c.uint8Array=s("Uint8Array"),c.uint8ClampedArray=s("Uint8ClampedArray"),c.int16Array=s("Int16Array"),c.uint16Array=s("Uint16Array"),c.int32Array=s("Int32Array"),c.uint32Array=s("Uint32Array"),c.float32Array=s("Float32Array"),c.float64Array=s("Float64Array"),c.bigint64Array=s("BigInt64Array"),c.biguint64Array=s("BigUint64Array"),c.arrayBuffer=s("ArrayBuffer"),c.sharedArrayBuffer=s("SharedArrayBuffer"),c.dataView=s("DataView"),c.directInstanceOf=(e,t)=>Object.getPrototypeOf(e)===t.prototype,c.urlInstance=e=>s("URL")(e),c.urlString=e=>{if(!c.string(e))return !1;try{return new n(e),!0}catch(e){return !1}},c.truthy=e=>Boolean(e),c.falsy=e=>!e,c.nan=e=>Number.isNaN(e);const u=new Set(["undefined","string","number","bigint","boolean","symbol"]);c.primitive=e=>c.null_(e)||u.has(typeof e),c.integer=e=>Number.isInteger(e),c.safeInteger=e=>Number.isSafeInteger(e),c.plainObject=e=>{if("Object"!==i(e))return !1;const t=Object.getPrototypeOf(e);return null===t||t===Object.getPrototypeOf({})};const d=new Set(["Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array"]);c.typedArray=e=>{const t=i(e);return void 0!==t&&d.has(t)},c.arrayLike=e=>!c.nullOrUndefined(e)&&!c.function_(e)&&(e=>c.safeInteger(e)&&e>=0)(e.length),c.inRange=(e,t)=>{if(c.number(t))return e>=Math.min(0,t)&&e<=Math.max(t,0);if(c.array(t)&&2===t.length)return e>=Math.min(...t)&&e<=Math.max(...t);throw new TypeError(`Invalid range: ${JSON.stringify(t)}`)};const f=["innerHTML","ownerDocument","style","attributes","nodeValue"];c.domElement=e=>c.object(e)&&1===e.nodeType&&c.string(e.nodeName)&&!c.plainObject(e)&&f.every(t=>t in e),c.observable=e=>!!(e&&(e[Symbol.observable]&&e===e[Symbol.observable]()||e["@@observable"]&&e===e["@@observable"]())),c.nodeStream=e=>!c.nullOrUndefined(e)&&l(e)&&c.function_(e.pipe)&&!c.observable(e),c.infinite=e=>e===1/0||e===-1/0;const h=e=>t=>c.integer(t)&&Math.abs(t%2)===e;c.evenInteger=h(0),c.oddInteger=h(1),c.emptyArray=e=>c.array(e)&&0===e.length,c.nonEmptyArray=e=>c.array(e)&&e.length>0,c.emptyString=e=>c.string(e)&&0===e.length,c.nonEmptyString=e=>c.string(e)&&e.length>0,c.emptyStringOrWhitespace=e=>c.emptyString(e)||(e=>c.string(e)&&!1===/\S/.test(e))(e),c.emptyObject=e=>c.object(e)&&!c.map(e)&&!c.set(e)&&0===Object.keys(e).length,c.nonEmptyObject=e=>c.object(e)&&!c.map(e)&&!c.set(e)&&Object.keys(e).length>0,c.emptySet=e=>c.set(e)&&0===e.size,c.nonEmptySet=e=>c.set(e)&&e.size>0,c.emptyMap=e=>c.map(e)&&0===e.size,c.nonEmptyMap=e=>c.map(e)&&e.size>0;const p=(e,t,r)=>{if(!1===c.function_(t))throw new TypeError(`Invalid predicate: ${JSON.stringify(t)}`);if(0===r.length)throw new TypeError("Invalid number of values");return e.call(r,t)};c.any=(e,...t)=>p(Array.prototype.some,e,t),c.all=(e,...t)=>p(Array.prototype.every,e,t),Object.defineProperties(c,{class:{value:c.class_},function:{value:c.function_},null:{value:c.null_}}),e.exports=c,t.default=c;},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.testSymbol=Symbol("test"),t.isPredicate=e=>Boolean(e&&e[t.testSymbol]);},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.default=(e,t,r=5)=>{const n=[];for(const a of t)if(!e.has(a)&&(n.push(a),n.length===r))return n;return 0===n.length||n};},function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(r(10)),o=r(11),i=r(0);t.Predicate=i.Predicate;const s=r(2),c=n(r(17)),l=n(r(6)),u=n(r(9)),d=(e,t,r)=>{if(!s.isPredicate(t)&&"string"!=typeof t)throw new TypeError(`Expected second argument to be a predicate or a string, got \`${typeof t}\``);if(s.isPredicate(t)){const r=a.default();u.default(e,()=>o.inferLabel(r),t);}else u.default(e,t,r);};Object.defineProperties(d,{isValid:{value:(e,t)=>{try{return d(e,t),!0}catch(e){return !1}}},create:{value:(e,t)=>r=>{if(s.isPredicate(e)){const t=a.default();u.default(r,()=>o.inferLabel(t),e);}else u.default(r,e,t);}}}),t.default=l.default(c.default(d));var f=r(6);t.StringPredicate=f.StringPredicate,t.NumberPredicate=f.NumberPredicate,t.BooleanPredicate=f.BooleanPredicate,t.ArrayPredicate=f.ArrayPredicate,t.ObjectPredicate=f.ObjectPredicate,t.DatePredicate=f.DatePredicate,t.ErrorPredicate=f.ErrorPredicate,t.MapPredicate=f.MapPredicate,t.WeakMapPredicate=f.WeakMapPredicate,t.SetPredicate=f.SetPredicate,t.WeakSetPredicate=f.WeakSetPredicate,t.AnyPredicate=f.AnyPredicate;},function(e,t,r){(function(e){var r="__lodash_hash_undefined__",n=1,a=2,o=9007199254740991,i="[object Arguments]",s="[object Array]",c="[object AsyncFunction]",l="[object Boolean]",u="[object Date]",d="[object Error]",f="[object Function]",h="[object GeneratorFunction]",p="[object Map]",g="[object Number]",y="[object Null]",m="[object Object]",v="[object Proxy]",b="[object RegExp]",O="[object Set]",_="[object String]",$="[object Symbol]",P="[object Undefined]",w="[object ArrayBuffer]",j="[object DataView]",x=/^\[object .+?Constructor\]$/,E=/^(?:0|[1-9]\d*)$/,S={};S["[object Float32Array]"]=S["[object Float64Array]"]=S["[object Int8Array]"]=S["[object Int16Array]"]=S["[object Int32Array]"]=S["[object Uint8Array]"]=S["[object Uint8ClampedArray]"]=S["[object Uint16Array]"]=S["[object Uint32Array]"]=!0,S[i]=S[s]=S[w]=S[l]=S[j]=S[u]=S[d]=S[f]=S[p]=S[g]=S[m]=S[b]=S[O]=S[_]=S["[object WeakMap]"]=!1;var A="object"==typeof commonjsGlobal$1$1&&commonjsGlobal$1$1&&commonjsGlobal$1$1.Object===Object&&commonjsGlobal$1$1,k="object"==typeof self&&self&&self.Object===Object&&self,T=A||k||Function("return this")(),I=t&&!t.nodeType&&t,M=I&&"object"==typeof e&&e&&!e.nodeType&&e,C=M&&M.exports===I,N=C&&A.process,V=function(){try{return N&&N.binding&&N.binding("util")}catch(e){}}(),R=V&&V.isTypedArray;function z(e,t){for(var r=-1,n=null==e?0:e.length;++r<n;)if(t(e[r],r,e))return !0;return !1}function L(e){var t=-1,r=Array(e.size);return e.forEach(function(e,n){r[++t]=[n,e];}),r}function U(e){var t=-1,r=Array(e.size);return e.forEach(function(e){r[++t]=e;}),r}var D,F,B,W=Array.prototype,q=Function.prototype,J=Object.prototype,K=T["__core-js_shared__"],G=q.toString,H=J.hasOwnProperty,X=(D=/[^.]+$/.exec(K&&K.keys&&K.keys.IE_PROTO||""))?"Symbol(src)_1."+D:"",Z=J.toString,Y=RegExp("^"+G.call(H).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Q=C?T.Buffer:void 0,ee=T.Symbol,te=T.Uint8Array,re=J.propertyIsEnumerable,ne=W.splice,ae=ee?ee.toStringTag:void 0,oe=Object.getOwnPropertySymbols,ie=Q?Q.isBuffer:void 0,se=(F=Object.keys,B=Object,function(e){return F(B(e))}),ce=Me(T,"DataView"),le=Me(T,"Map"),ue=Me(T,"Promise"),de=Me(T,"Set"),fe=Me(T,"WeakMap"),he=Me(Object,"create"),pe=Re(ce),ge=Re(le),ye=Re(ue),me=Re(de),ve=Re(fe),be=ee?ee.prototype:void 0,Oe=be?be.valueOf:void 0;function _e(e){var t=-1,r=null==e?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1]);}}function $e(e){var t=-1,r=null==e?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1]);}}function Pe(e){var t=-1,r=null==e?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1]);}}function we(e){var t=-1,r=null==e?0:e.length;for(this.__data__=new Pe;++t<r;)this.add(e[t]);}function je(e){var t=this.__data__=new $e(e);this.size=t.size;}function xe(e,t){for(var r=e.length;r--;)if(ze(e[r][0],t))return r;return -1}function Ee(e){return null==e?void 0===e?P:y:ae&&ae in Object(e)?function(e){var t=H.call(e,ae),r=e[ae];try{e[ae]=void 0;var n=!0;}catch(e){}var a=Z.call(e);return n&&(t?e[ae]=r:delete e[ae]),a}(e):function(e){return Z.call(e)}(e)}function Se(e){return qe(e)&&Ee(e)==i}function Ae(e,t,r,o,c){return e===t||(null==e||null==t||!qe(e)&&!qe(t)?e!=e&&t!=t:function(e,t,r,o,c,f){var h=Ue(e),y=Ue(t),v=h?s:Ne(e),P=y?s:Ne(t),x=(v=v==i?m:v)==m,E=(P=P==i?m:P)==m,S=v==P;if(S&&De(e)){if(!De(t))return !1;h=!0,x=!1;}if(S&&!x)return f||(f=new je),h||Je(e)?ke(e,t,r,o,c,f):function(e,t,r,o,i,s,c){switch(r){case j:if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return !1;e=e.buffer,t=t.buffer;case w:return !(e.byteLength!=t.byteLength||!s(new te(e),new te(t)));case l:case u:case g:return ze(+e,+t);case d:return e.name==t.name&&e.message==t.message;case b:case _:return e==t+"";case p:var f=L;case O:var h=o&n;if(f||(f=U),e.size!=t.size&&!h)return !1;var y=c.get(e);if(y)return y==t;o|=a,c.set(e,t);var m=ke(f(e),f(t),o,i,s,c);return c.delete(e),m;case $:if(Oe)return Oe.call(e)==Oe.call(t)}return !1}(e,t,v,r,o,c,f);if(!(r&n)){var A=x&&H.call(e,"__wrapped__"),k=E&&H.call(t,"__wrapped__");if(A||k){var T=A?e.value():e,I=k?t.value():t;return f||(f=new je),c(T,I,r,o,f)}}return !!S&&(f||(f=new je),function(e,t,r,a,o,i){var s=r&n,c=Te(e),l=c.length;if(l!=Te(t).length&&!s)return !1;for(var u=l;u--;){var d=c[u];if(!(s?d in t:H.call(t,d)))return !1}var f=i.get(e);if(f&&i.get(t))return f==t;var h=!0;i.set(e,t),i.set(t,e);for(var p=s;++u<l;){var g=e[d=c[u]],y=t[d];if(a)var m=s?a(y,g,d,t,e,i):a(g,y,d,e,t,i);if(!(void 0===m?g===y||o(g,y,r,a,i):m)){h=!1;break}p||(p="constructor"==d);}if(h&&!p){var v=e.constructor,b=t.constructor;v!=b&&"constructor"in e&&"constructor"in t&&!("function"==typeof v&&v instanceof v&&"function"==typeof b&&b instanceof b)&&(h=!1);}return i.delete(e),i.delete(t),h}(e,t,r,o,c,f))}(e,t,r,o,Ae,c))}function ke(e,t,r,o,i,s){var c=r&n,l=e.length,u=t.length;if(l!=u&&!(c&&u>l))return !1;var d=s.get(e);if(d&&s.get(t))return d==t;var f=-1,h=!0,p=r&a?new we:void 0;for(s.set(e,t),s.set(t,e);++f<l;){var g=e[f],y=t[f];if(o)var m=c?o(y,g,f,t,e,s):o(g,y,f,e,t,s);if(void 0!==m){if(m)continue;h=!1;break}if(p){if(!z(t,function(e,t){if(n=t,!p.has(n)&&(g===e||i(g,e,r,o,s)))return p.push(t);var n;})){h=!1;break}}else if(g!==y&&!i(g,y,r,o,s)){h=!1;break}}return s.delete(e),s.delete(t),h}function Te(e){return function(e,t,r){var n=Ke(e);return Ue(e)?n:function(e,t){for(var r=-1,n=t.length,a=e.length;++r<n;)e[a+r]=t[r];return e}(n,r(e))}(e,0,Ce)}function Ie(e,t){var r,n,a=e.__data__;return ("string"==(n=typeof(r=t))||"number"==n||"symbol"==n||"boolean"==n?"__proto__"!==r:null===r)?a["string"==typeof t?"string":"hash"]:a.map}function Me(e,t){var r=function(e,t){return null==e?void 0:e[t]}(e,t);return function(e){return !(!We(e)||(t=e,X&&X in t))&&(Fe(e)?Y:x).test(Re(e));var t;}(r)?r:void 0}_e.prototype.clear=function(){this.__data__=he?he(null):{},this.size=0;},_e.prototype.delete=function(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t},_e.prototype.get=function(e){var t=this.__data__;if(he){var n=t[e];return n===r?void 0:n}return H.call(t,e)?t[e]:void 0},_e.prototype.has=function(e){var t=this.__data__;return he?void 0!==t[e]:H.call(t,e)},_e.prototype.set=function(e,t){var n=this.__data__;return this.size+=this.has(e)?0:1,n[e]=he&&void 0===t?r:t,this},$e.prototype.clear=function(){this.__data__=[],this.size=0;},$e.prototype.delete=function(e){var t=this.__data__,r=xe(t,e);return !(r<0||(r==t.length-1?t.pop():ne.call(t,r,1),--this.size,0))},$e.prototype.get=function(e){var t=this.__data__,r=xe(t,e);return r<0?void 0:t[r][1]},$e.prototype.has=function(e){return xe(this.__data__,e)>-1},$e.prototype.set=function(e,t){var r=this.__data__,n=xe(r,e);return n<0?(++this.size,r.push([e,t])):r[n][1]=t,this},Pe.prototype.clear=function(){this.size=0,this.__data__={hash:new _e,map:new(le||$e),string:new _e};},Pe.prototype.delete=function(e){var t=Ie(this,e).delete(e);return this.size-=t?1:0,t},Pe.prototype.get=function(e){return Ie(this,e).get(e)},Pe.prototype.has=function(e){return Ie(this,e).has(e)},Pe.prototype.set=function(e,t){var r=Ie(this,e),n=r.size;return r.set(e,t),this.size+=r.size==n?0:1,this},we.prototype.add=we.prototype.push=function(e){return this.__data__.set(e,r),this},we.prototype.has=function(e){return this.__data__.has(e)},je.prototype.clear=function(){this.__data__=new $e,this.size=0;},je.prototype.delete=function(e){var t=this.__data__,r=t.delete(e);return this.size=t.size,r},je.prototype.get=function(e){return this.__data__.get(e)},je.prototype.has=function(e){return this.__data__.has(e)},je.prototype.set=function(e,t){var r=this.__data__;if(r instanceof $e){var n=r.__data__;if(!le||n.length<199)return n.push([e,t]),this.size=++r.size,this;r=this.__data__=new Pe(n);}return r.set(e,t),this.size=r.size,this};var Ce=oe?function(e){return null==e?[]:(e=Object(e),function(e,t){for(var r=-1,n=null==e?0:e.length,a=0,o=[];++r<n;){var i=e[r];t(i)&&(o[a++]=i);}return o}(oe(e),function(t){return re.call(e,t)}))}:function(){return []},Ne=Ee;function Ve(e,t){return !!(t=null==t?o:t)&&("number"==typeof e||E.test(e))&&e>-1&&e%1==0&&e<t}function Re(e){if(null!=e){try{return G.call(e)}catch(e){}try{return e+""}catch(e){}}return ""}function ze(e,t){return e===t||e!=e&&t!=t}(ce&&Ne(new ce(new ArrayBuffer(1)))!=j||le&&Ne(new le)!=p||ue&&"[object Promise]"!=Ne(ue.resolve())||de&&Ne(new de)!=O||fe&&"[object WeakMap]"!=Ne(new fe))&&(Ne=function(e){var t=Ee(e),r=t==m?e.constructor:void 0,n=r?Re(r):"";if(n)switch(n){case pe:return j;case ge:return p;case ye:return "[object Promise]";case me:return O;case ve:return "[object WeakMap]"}return t});var Le=Se(function(){return arguments}())?Se:function(e){return qe(e)&&H.call(e,"callee")&&!re.call(e,"callee")},Ue=Array.isArray,De=ie||function(){return !1};function Fe(e){if(!We(e))return !1;var t=Ee(e);return t==f||t==h||t==c||t==v}function Be(e){return "number"==typeof e&&e>-1&&e%1==0&&e<=o}function We(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}function qe(e){return null!=e&&"object"==typeof e}var Je=R?function(e){return function(t){return e(t)}}(R):function(e){return qe(e)&&Be(e.length)&&!!S[Ee(e)]};function Ke(e){return null!=(t=e)&&Be(t.length)&&!Fe(t)?function(e,t){var r=Ue(e),n=!r&&Le(e),a=!r&&!n&&De(e),o=!r&&!n&&!a&&Je(e),i=r||n||a||o,s=i?function(e,t){for(var r=-1,n=Array(e);++r<e;)n[r]=t(r);return n}(e.length,String):[],c=s.length;for(var l in e)!t&&!H.call(e,l)||i&&("length"==l||a&&("offset"==l||"parent"==l)||o&&("buffer"==l||"byteLength"==l||"byteOffset"==l)||Ve(l,c))||s.push(l);return s}(e):function(e){if(r=(t=e)&&t.constructor,t!==("function"==typeof r&&r.prototype||J))return se(e);var t,r,n=[];for(var a in Object(e))H.call(e,a)&&"constructor"!=a&&n.push(a);return n}(e);var t;}e.exports=function(e,t){return Ae(e,t)};}).call(this,r(23)(e));},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const n=r(18);t.StringPredicate=n.StringPredicate;const a=r(20);t.NumberPredicate=a.NumberPredicate;const o=r(21);t.BooleanPredicate=o.BooleanPredicate;const i=r(0),s=r(22);t.ArrayPredicate=s.ArrayPredicate;const c=r(24);t.ObjectPredicate=c.ObjectPredicate;const l=r(29);t.DatePredicate=l.DatePredicate;const u=r(30);t.ErrorPredicate=u.ErrorPredicate;const d=r(31);t.MapPredicate=d.MapPredicate;const f=r(32);t.WeakMapPredicate=f.WeakMapPredicate;const h=r(33);t.SetPredicate=h.SetPredicate;const p=r(34);t.WeakSetPredicate=p.WeakSetPredicate;const g=r(35);t.AnyPredicate=g.AnyPredicate,t.default=(e,t)=>(Object.defineProperties(e,{string:{get:()=>new n.StringPredicate(t)},number:{get:()=>new a.NumberPredicate(t)},boolean:{get:()=>new o.BooleanPredicate(t)},undefined:{get:()=>new i.Predicate("undefined",t)},null:{get:()=>new i.Predicate("null",t)},nullOrUndefined:{get:()=>new i.Predicate("nullOrUndefined",t)},nan:{get:()=>new i.Predicate("nan",t)},symbol:{get:()=>new i.Predicate("symbol",t)},array:{get:()=>new s.ArrayPredicate(t)},object:{get:()=>new c.ObjectPredicate(t)},date:{get:()=>new l.DatePredicate(t)},error:{get:()=>new u.ErrorPredicate(t)},map:{get:()=>new d.MapPredicate(t)},weakMap:{get:()=>new f.WeakMapPredicate(t)},set:{get:()=>new h.SetPredicate(t)},weakSet:{get:()=>new p.WeakSetPredicate(t)},function:{get:()=>new i.Predicate("Function",t)},buffer:{get:()=>new i.Predicate("Buffer",t)},regExp:{get:()=>new i.Predicate("RegExp",t)},promise:{get:()=>new i.Predicate("Promise",t)},typedArray:{get:()=>new i.Predicate("TypedArray",t)},int8Array:{get:()=>new i.Predicate("Int8Array",t)},uint8Array:{get:()=>new i.Predicate("Uint8Array",t)},uint8ClampedArray:{get:()=>new i.Predicate("Uint8ClampedArray",t)},int16Array:{get:()=>new i.Predicate("Int16Array",t)},uint16Array:{get:()=>new i.Predicate("Uint16Array",t)},int32Array:{get:()=>new i.Predicate("Int32Array",t)},uint32Array:{get:()=>new i.Predicate("Uint32Array",t)},float32Array:{get:()=>new i.Predicate("Float32Array",t)},float64Array:{get:()=>new i.Predicate("Float64Array",t)},arrayBuffer:{get:()=>new i.Predicate("ArrayBuffer",t)},dataView:{get:()=>new i.Predicate("DataView",t)},iterable:{get:()=>new i.Predicate("Iterable",t)},any:{value:(...e)=>new g.AnyPredicate(e,t)}}),e);},function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(r(4));t.default=(e,t)=>{try{for(const r of e)a.default(r,t);return !0}catch(e){return e.message}};},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.ArgumentError=class extends Error{constructor(e,t){super(e),"captureStackTrace"in Error&&Error.captureStackTrace(this,t),this.name="ArgumentError";}};},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const n=r(2);t.default=function e(t,r,a){a[n.testSymbol](t,e,r);};},function(e,t,r){const n=()=>{const e=Error.prepareStackTrace;Error.prepareStackTrace=(e,t)=>t;const t=(new Error).stack.slice(1);return Error.prepareStackTrace=e,t};e.exports=n,e.exports.default=n;},function(e,t,r){var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=n(r(12)),i=a(r(13)),s=a(r(14)),c=/^.*?\((.*?)[,)]/;t.inferLabel=e=>{if(!s.default)return;const t=e[1],r=t.getFileName(),n=t.getLineNumber(),a=t.getColumnNumber();if(!r||null===n||null===a)return;let l=[];try{l=o.readFileSync(r,"utf8").split("\n");}catch(e){return}let u=l[n-1];if(!u)return;u=u.slice(a-1);const d=c.exec(u);if(!d||!d[1])return;const f=d[1];return i.default(f)||i.default(f.split(".").pop())?f:void 0};},function(e,t){e.exports=require$$0;},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const n=/^[a-z$_][a-z$_0-9]*$/i,a=new Set(["undefined","null","true","false","super","this","Infinity","NaN"]);t.default=e=>e&&!a.has(e)&&n.test(e);},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.default=Boolean("undefined"!=typeof process&&process.versions&&process.versions.node);},function(e,t){e.exports=require$$1;},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const n=r(0);t.not=e=>{const t=e.addValidator;return e.addValidator=r=>{const a=r.validator,o=r.message;return r.message=(e,t)=>`[NOT] ${o(e,t)}`,r.validator=e=>!a(e),e[n.validatorSymbol].push(r),e.addValidator=t,e},e};},function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(r(6));t.default=e=>(Object.defineProperties(e,{optional:{get:()=>a.default({},{optional:!0})}}),e);},function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(r(1)),o=n(r(19)),i=r(0);t.StringPredicate=class extends i.Predicate{constructor(e){super("string",e);}length(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have length \`${e}\`, got \`${t}\``,validator:t=>t.length===e})}minLength(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have a minimum length of \`${e}\`, got \`${t}\``,validator:t=>t.length>=e})}maxLength(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have a maximum length of \`${e}\`, got \`${t}\``,validator:t=>t.length<=e})}matches(e){return this.addValidator({message:(t,r)=>`Expected ${r} to match \`${e}\`, got \`${t}\``,validator:t=>e.test(t)})}startsWith(e){return this.addValidator({message:(t,r)=>`Expected ${r} to start with \`${e}\`, got \`${t}\``,validator:t=>t.startsWith(e)})}endsWith(e){return this.addValidator({message:(t,r)=>`Expected ${r} to end with \`${e}\`, got \`${t}\``,validator:t=>t.endsWith(e)})}includes(e){return this.addValidator({message:(t,r)=>`Expected ${r} to include \`${e}\`, got \`${t}\``,validator:t=>t.includes(e)})}oneOf(e){return this.addValidator({message:(t,r)=>{let n=JSON.stringify(e);if(e.length>10){const t=e.length-10;n=JSON.stringify(e.slice(0,10)).replace(/]$/,`,…+${t} more]`);}return `Expected ${r} to be one of \`${n}\`, got \`${t}\``},validator:t=>e.includes(t)})}get empty(){return this.addValidator({message:(e,t)=>`Expected ${t} to be empty, got \`${e}\``,validator:e=>""===e})}get nonEmpty(){return this.addValidator({message:(e,t)=>`Expected ${t} to not be empty`,validator:e=>""!==e})}equals(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be equal to \`${e}\`, got \`${t}\``,validator:t=>t===e})}get alphanumeric(){return this.addValidator({message:(e,t)=>`Expected ${t} to be alphanumeric, got \`${e}\``,validator:e=>/^[a-z\d]+$/i.test(e)})}get alphabetical(){return this.addValidator({message:(e,t)=>`Expected ${t} to be alphabetical, got \`${e}\``,validator:e=>/^[a-z]+$/gi.test(e)})}get numeric(){return this.addValidator({message:(e,t)=>`Expected ${t} to be numeric, got \`${e}\``,validator:e=>/^(\+|-)?\d+$/i.test(e)})}get date(){return this.addValidator({message:(e,t)=>`Expected ${t} to be a date, got \`${e}\``,validator:o.default})}get lowercase(){return this.addValidator({message:(e,t)=>`Expected ${t} to be lowercase, got \`${e}\``,validator:e=>""!==e.trim()&&e===e.toLowerCase()})}get uppercase(){return this.addValidator({message:(e,t)=>`Expected ${t} to be uppercase, got \`${e}\``,validator:e=>""!==e.trim()&&e===e.toUpperCase()})}get url(){return this.addValidator({message:(e,t)=>`Expected ${t} to be a URL, got \`${e}\``,validator:a.default.urlString})}};},function(e,t,r){e.exports=function(e){return !isNaN(Date.parse(e))};},function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(r(1)),o=r(0);t.NumberPredicate=class extends o.Predicate{constructor(e){super("number",e);}inRange(e,t){return this.addValidator({message:(r,n)=>`Expected ${n} to be in range [${e}..${t}], got ${r}`,validator:r=>a.default.inRange(r,[e,t])})}greaterThan(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be greater than ${e}, got ${t}`,validator:t=>t>e})}greaterThanOrEqual(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be greater than or equal to ${e}, got ${t}`,validator:t=>t>=e})}lessThan(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be less than ${e}, got ${t}`,validator:t=>t<e})}lessThanOrEqual(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be less than or equal to ${e}, got ${t}`,validator:t=>t<=e})}equal(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be equal to ${e}, got ${t}`,validator:t=>t===e})}oneOf(e){return this.addValidator({message:(t,r)=>{let n=JSON.stringify(e);if(e.length>10){const t=e.length-10;n=JSON.stringify(e.slice(0,10)).replace(/]$/,`,…+${t} more]`);}return `Expected ${r} to be one of \`${n}\`, got ${t}`},validator:t=>e.includes(t)})}get integer(){return this.addValidator({message:(e,t)=>`Expected ${t} to be an integer, got ${e}`,validator:e=>a.default.integer(e)})}get finite(){return this.addValidator({message:(e,t)=>`Expected ${t} to be finite, got ${e}`,validator:e=>!a.default.infinite(e)})}get infinite(){return this.addValidator({message:(e,t)=>`Expected ${t} to be infinite, got ${e}`,validator:e=>a.default.infinite(e)})}get positive(){return this.addValidator({message:(e,t)=>`Expected ${t} to be positive, got ${e}`,validator:e=>e>0})}get negative(){return this.addValidator({message:(e,t)=>`Expected ${t} to be negative, got ${e}`,validator:e=>e<0})}get integerOrInfinite(){return this.addValidator({message:(e,t)=>`Expected ${t} to be an integer or infinite, got ${e}`,validator:e=>a.default.integer(e)||a.default.infinite(e)})}get uint8(){return this.integer.inRange(0,255)}get uint16(){return this.integer.inRange(0,65535)}get uint32(){return this.integer.inRange(0,4294967295)}get int8(){return this.integer.inRange(-128,127)}get int16(){return this.integer.inRange(-32768,32767)}get int32(){return this.integer.inRange(-2147483648,2147483647)}};},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const n=r(0);t.BooleanPredicate=class extends n.Predicate{constructor(e){super("boolean",e);}get true(){return this.addValidator({message:(e,t)=>`Expected ${t} to be true, got ${e}`,validator:e=>!0===e})}get false(){return this.addValidator({message:(e,t)=>`Expected ${t} to be false, got ${e}`,validator:e=>!1===e})}};},function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(r(5)),o=n(r(4)),i=r(0);t.ArrayPredicate=class extends i.Predicate{constructor(e){super("array",e);}length(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have length \`${e}\`, got \`${t.length}\``,validator:t=>t.length===e})}minLength(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have a minimum length of \`${e}\`, got \`${t.length}\``,validator:t=>t.length>=e})}maxLength(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have a maximum length of \`${e}\`, got \`${t.length}\``,validator:t=>t.length<=e})}startsWith(e){return this.addValidator({message:(t,r)=>`Expected ${r} to start with \`${e}\`, got \`${t[0]}\``,validator:t=>t[0]===e})}endsWith(e){return this.addValidator({message:(t,r)=>`Expected ${r} to end with \`${e}\`, got \`${t[t.length-1]}\``,validator:t=>t[t.length-1]===e})}includes(...e){return this.addValidator({message:(t,r)=>`Expected ${r} to include all elements of \`${JSON.stringify(e)}\`, got \`${JSON.stringify(t)}\``,validator:t=>e.every(e=>-1!==t.indexOf(e))})}includesAny(...e){return this.addValidator({message:(t,r)=>`Expected ${r} to include any element of \`${JSON.stringify(e)}\`, got \`${JSON.stringify(t)}\``,validator:t=>e.some(e=>-1!==t.indexOf(e))})}get empty(){return this.addValidator({message:(e,t)=>`Expected ${t} to be empty, got \`${JSON.stringify(e)}\``,validator:e=>0===e.length})}get nonEmpty(){return this.addValidator({message:(e,t)=>`Expected ${t} to not be empty`,validator:e=>e.length>0})}deepEqual(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be deeply equal to \`${JSON.stringify(e)}\`, got \`${JSON.stringify(t)}\``,validator:t=>a.default(t,e)})}ofType(e){let t;return this.addValidator({message:(e,r)=>`(${r}) ${t}`,validator:r=>{try{for(const t of r)o.default(t,e);return !0}catch(e){return t=e.message,!1}}})}};},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e};},function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(r(1)),o=n(r(25)),i=n(r(5)),s=r(0),c=n(r(3)),l=n(r(7)),u=n(r(27)),d=r(28);t.ObjectPredicate=class extends s.Predicate{constructor(e){super("object",e);}get plain(){return this.addValidator({message:(e,t)=>`Expected ${t} to be a plain object`,validator:e=>a.default.plainObject(e)})}get empty(){return this.addValidator({message:(e,t)=>`Expected ${t} to be empty, got \`${JSON.stringify(e)}\``,validator:e=>0===Object.keys(e).length})}get nonEmpty(){return this.addValidator({message:(e,t)=>`Expected ${t} to not be empty`,validator:e=>Object.keys(e).length>0})}valuesOfType(e){return this.addValidator({message:(e,t,r)=>`(${t}) ${r}`,validator:t=>{const r=Object.keys(t).map(e=>t[e]);return l.default(r,e)}})}deepValuesOfType(e){return this.addValidator({message:(e,t,r)=>`(${t}) ${r}`,validator:t=>u.default(t,e)})}deepEqual(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be deeply equal to \`${JSON.stringify(e)}\`, got \`${JSON.stringify(t)}\``,validator:t=>i.default(t,e)})}instanceOf(e){return this.addValidator({message:(t,r)=>{let n=t.constructor.name;return n&&"Object"!==n||(n=JSON.stringify(t)),`Expected ${r} \`${n}\` to be of type \`${e.name}\``},validator:t=>t instanceof e})}hasKeys(...e){return this.addValidator({message:(e,t,r)=>`Expected ${t} to have keys \`${JSON.stringify(r)}\``,validator:t=>c.default({has:e=>o.default.has(t,e)},e)})}hasAnyKeys(...e){return this.addValidator({message:(t,r)=>`Expected ${r} to have any key of \`${JSON.stringify(e)}\``,validator:t=>e.some(e=>o.default.has(t,e))})}partialShape(e){return this.addValidator({message:(e,t,r)=>`${r.replace("Expected","Expected property")} in ${t}`,validator:t=>d.partial(t,e)})}exactShape(e){return this.addValidator({message:(e,t,r)=>`${r.replace("Expected","Expected property")} in ${t}`,validator:t=>d.exact(t,e)})}};},function(e,t,r){const n=r(26);function a(e){const t=e.split("."),r=[];for(let e=0;e<t.length;e++){let n=t[e];for(;"\\"===n[n.length-1]&&void 0!==t[e+1];)n=n.slice(0,-1)+".",n+=t[++e];r.push(n);}return r}e.exports={get(e,t,r){if(!n(e)||"string"!=typeof t)return void 0===r?e:r;const o=a(t);for(let t=0;t<o.length;t++){if(!Object.prototype.propertyIsEnumerable.call(e,o[t]))return r;if(null==(e=e[o[t]])){if(t!==o.length-1)return r;break}}return e},set(e,t,r){if(!n(e)||"string"!=typeof t)return e;const o=e,i=a(t);for(let t=0;t<i.length;t++){const a=i[t];n(e[a])||(e[a]={}),t===i.length-1&&(e[a]=r),e=e[a];}return o},delete(e,t){if(!n(e)||"string"!=typeof t)return;const r=a(t);for(let t=0;t<r.length;t++){const a=r[t];if(t===r.length-1)return void delete e[a];if(e=e[a],!n(e))return}},has(e,t){if(!n(e)||"string"!=typeof t)return !1;const r=a(t);for(let t=0;t<r.length;t++){if(!n(e))return !1;if(!(r[t]in e))return !1;e=e[r[t]];}return !0}};},function(e,t,r){e.exports=function(e){var t=typeof e;return null!==e&&("object"===t||"function"===t)};},function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(r(1)),o=n(r(4)),i=(e,t)=>a.default.plainObject(e)?Object.keys(e).every(r=>i(e[r],t)):(o.default(e,t),!0);t.default=(e,t)=>{try{return i(e,t)}catch(e){return e.message}};},function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(r(1)),o=n(r(9)),i=r(2);t.partial=function e(t,r,n){try{for(const s of Object.keys(r)){const c=n?`${n}.${s}`:s;if(i.isPredicate(r[s]))o.default(t[s],c,r[s]);else if(a.default.plainObject(r[s])){const n=e(t[s],r[s],c);if(!0!==n)return n}}return !0}catch(e){return e.message}},t.exact=function e(t,r,n){try{const s=new Set(Object.keys(t));for(const c of Object.keys(r)){s.delete(c);const l=n?`${n}.${c}`:c;if(i.isPredicate(r[c]))o.default(t[c],l,r[c]);else if(a.default.plainObject(r[c])){if(!Object.prototype.hasOwnProperty.call(t,c))return `Expected \`${l}\` to exist`;const n=e(t[c],r[c],l);if(!0!==n)return n}}if(s.size>0){const e=Array.from(s.keys())[0];return `Did not expect property \`${n?`${n}.${e}`:e}\` to exist, got \`${t[e]}\``}return !0}catch(e){return e.message}};},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const n=r(0);t.DatePredicate=class extends n.Predicate{constructor(e){super("date",e);}before(e){return this.addValidator({message:(t,r)=>`Expected ${r} ${t.toISOString()} to be before ${e.toISOString()}`,validator:t=>t.getTime()<e.getTime()})}after(e){return this.addValidator({message:(t,r)=>`Expected ${r} ${t.toISOString()} to be after ${e.toISOString()}`,validator:t=>t.getTime()>e.getTime()})}};},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const n=r(0);t.ErrorPredicate=class extends n.Predicate{constructor(e){super("error",e);}name(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have name \`${e}\`, got \`${t.name}\``,validator:t=>t.name===e})}message(e){return this.addValidator({message:(t,r)=>`Expected ${r} message to be \`${e}\`, got \`${t.message}\``,validator:t=>t.message===e})}messageIncludes(e){return this.addValidator({message:(t,r)=>`Expected ${r} message to include \`${e}\`, got \`${t.message}\``,validator:t=>t.message.includes(e)})}hasKeys(...e){return this.addValidator({message:(t,r)=>`Expected ${r} message to have keys \`${e.join("`, `")}\``,validator:t=>e.every(e=>t.hasOwnProperty(e))})}instanceOf(e){return this.addValidator({message:(t,r)=>`Expected ${r} \`${t.name}\` to be of type \`${e.name}\``,validator:t=>t instanceof e})}get typeError(){return this.instanceOf(TypeError)}get evalError(){return this.instanceOf(EvalError)}get rangeError(){return this.instanceOf(RangeError)}get referenceError(){return this.instanceOf(ReferenceError)}get syntaxError(){return this.instanceOf(SyntaxError)}get uriError(){return this.instanceOf(URIError)}};},function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(r(5)),o=r(0),i=n(r(3)),s=n(r(7));t.MapPredicate=class extends o.Predicate{constructor(e){super("Map",e);}size(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have size \`${e}\`, got \`${t.size}\``,validator:t=>t.size===e})}minSize(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have a minimum size of \`${e}\`, got \`${t.size}\``,validator:t=>t.size>=e})}maxSize(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have a maximum size of \`${e}\`, got \`${t.size}\``,validator:t=>t.size<=e})}hasKeys(...e){return this.addValidator({message:(e,t,r)=>`Expected ${t} to have keys \`${JSON.stringify(r)}\``,validator:t=>i.default(t,e)})}hasAnyKeys(...e){return this.addValidator({message:(t,r)=>`Expected ${r} to have any key of \`${JSON.stringify(e)}\``,validator:t=>e.some(e=>t.has(e))})}hasValues(...e){return this.addValidator({message:(e,t,r)=>`Expected ${t} to have values \`${JSON.stringify(r)}\``,validator:t=>i.default(new Set(t.values()),e)})}hasAnyValues(...e){return this.addValidator({message:(t,r)=>`Expected ${r} to have any value of \`${JSON.stringify(e)}\``,validator:t=>{const r=new Set(t.values());return e.some(e=>r.has(e))}})}keysOfType(e){return this.addValidator({message:(e,t,r)=>`(${t}) ${r}`,validator:t=>s.default(t.keys(),e)})}valuesOfType(e){return this.addValidator({message:(e,t,r)=>`(${t}) ${r}`,validator:t=>s.default(t.values(),e)})}get empty(){return this.addValidator({message:(e,t)=>`Expected ${t} to be empty, got \`${JSON.stringify(Array.from(e))}\``,validator:e=>0===e.size})}get nonEmpty(){return this.addValidator({message:(e,t)=>`Expected ${t} to not be empty`,validator:e=>e.size>0})}deepEqual(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be deeply equal to \`${JSON.stringify(Array.from(e))}\`, got \`${JSON.stringify(Array.from(t))}\``,validator:t=>a.default(t,e)})}};},function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=r(0),o=n(r(3));t.WeakMapPredicate=class extends a.Predicate{constructor(e){super("WeakMap",e);}hasKeys(...e){return this.addValidator({message:(e,t,r)=>`Expected ${t} to have keys \`${JSON.stringify(r)}\``,validator:t=>o.default(t,e)})}hasAnyKeys(...e){return this.addValidator({message:(t,r)=>`Expected ${r} to have any key of \`${JSON.stringify(e)}\``,validator:t=>e.some(e=>t.has(e))})}};},function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(r(5)),o=r(0),i=n(r(3)),s=n(r(7));t.SetPredicate=class extends o.Predicate{constructor(e){super("Set",e);}size(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have size \`${e}\`, got \`${t.size}\``,validator:t=>t.size===e})}minSize(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have a minimum size of \`${e}\`, got \`${t.size}\``,validator:t=>t.size>=e})}maxSize(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have a maximum size of \`${e}\`, got \`${t.size}\``,validator:t=>t.size<=e})}has(...e){return this.addValidator({message:(e,t,r)=>`Expected ${t} to have items \`${JSON.stringify(r)}\``,validator:t=>i.default(t,e)})}hasAny(...e){return this.addValidator({message:(t,r)=>`Expected ${r} to have any item of \`${JSON.stringify(e)}\``,validator:t=>e.some(e=>t.has(e))})}ofType(e){return this.addValidator({message:(e,t,r)=>`(${t}) ${r}`,validator:t=>s.default(t,e)})}get empty(){return this.addValidator({message:(e,t)=>`Expected ${t} to be empty, got \`${JSON.stringify(Array.from(e))}\``,validator:e=>0===e.size})}get nonEmpty(){return this.addValidator({message:(e,t)=>`Expected ${t} to not be empty`,validator:e=>e.size>0})}deepEqual(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be deeply equal to \`${JSON.stringify(Array.from(e))}\`, got \`${JSON.stringify(Array.from(t))}\``,validator:t=>a.default(t,e)})}};},function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=r(0),o=n(r(3));t.WeakSetPredicate=class extends a.Predicate{constructor(e){super("WeakSet",e);}has(...e){return this.addValidator({message:(e,t,r)=>`Expected ${t} to have items \`${JSON.stringify(r)}\``,validator:t=>o.default(t,e)})}hasAny(...e){return this.addValidator({message:(t,r)=>`Expected ${r} to have any item of \`${JSON.stringify(e)}\``,validator:t=>e.some(e=>t.has(e))})}};},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const n=r(8),a=r(2);t.AnyPredicate=class{constructor(e,t={}){this.predicates=e,this.options=t;}[a.testSymbol](e,t,r){const a=["Any predicate failed with the following errors:"];for(const n of this.predicates)try{return void t(e,r,n)}catch(t){if(void 0===e&&!0===this.options.optional)return;a.push(`- ${t.message}`);}throw new n.ArgumentError(a.join("\n"),t)}};}]);const t=e.exports;e.exports=t.default,Object.assign(e.exports,t);}),ow=unwrapExports(source),version="0.0.5",session={socket:null,connected:null,connectionId:null,networkId:null,dappId:null,transactionCallback:null},transactions=[];function Blocknative(e){return validateOptions(e),(session=_objectSpread2({},session,{},e)).socket=new SturdyWebSocket("wss://api.blocknative.com/v0"),session.socket.onmessage=handleSocketMessage,{transaction:transaction,event:event}}function transaction(e){var t=Date.now(),r=createEmitter();return transactions.push({hash:e,emitter:r}),logToServer({eventCode:"txSent",categoryCode:"activeTransaction",transaction:{hash:e,id:e}}),{details:{hash:e,timestamp:t,eventCode:"txSent"},emitter:r}}function event(e){validateEvent(e),logToServer(e);}var createEmitter=function(){return {listeners:{},on:function(e,t){if("function"!=typeof t)throw new Error("Listener must be a function");this.listeners[e]=t;}}};function validateOptions(e){ow(e,"options",ow.object.exactShape({networkId:ow.number,dappId:ow.string,connectionId:ow.optional.string,transactionCallback:ow.optional.function}));}function validateEvent(e){ow(e,"event",ow.object.exactShape({eventCode:ow.string,categoryCode:ow.string}));}function handleSocketMessage(e){var t=JSON.parse(e.data),r=t.status,n=t.reason,a=t.event,o=t.connectionId;if("error"===r){if(n.includes("not a valid API key")){var i=new Error(n);throw i.eventCode="initFail",i}if(n.includes("network not supported")){var s=new Error(n);throw s.eventCode="initFail",s}}if(a&&a.transaction){var c=a.transaction,l=a.eventCode,u=_objectSpread2({},c,{eventCode:l}),d=transactions.find(function(e){return e.hash.toLowerCase()===c.hash.toLowerCase()});if(d){var f=d.emitter&&d.emitter.listeners[l]&&d.emitter.listeners[l](u);session.transactionCallback&&session.transactionCallback({transaction:u,emitterResult:f});}}o&&(session.connectionId=o);}function logToServer(e){session.socket.send(createEventLog(e));}function createEventLog(e){var t=session,r=t.dappId,n=t.networkId;return JSON.stringify(_objectSpread2({timeStamp:new Date,dappId:r,version:version,blockchain:{system:"ethereum",network:networkName(n)}},e))}function networkName(e){switch(e){case 1:return "main";case 3:return "ropsten";case 4:return "rinkeby";case 5:return "goerli";case 42:return "kovan";case"localhost":return "localhost";default:return "local"}}module.exports=Blocknative;
	    //# sourceMappingURL=blocknative-api.js.map
	    });

	    var BlocknativeApi = unwrapExports(blocknativeApi);

	    const subscriber_queue = [];
	    /**
	     * Creates a `Readable` store that allows reading by subscription.
	     * @param value initial value
	     * @param {StartStopNotifier}start start and stop notifications for subscriptions
	     */
	    function readable(value, start) {
	        return {
	            subscribe: writable(value, start).subscribe,
	        };
	    }
	    /**
	     * Create a `Writable` store that allows both updating and reading by subscription.
	     * @param {*=}value initial value
	     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
	     */
	    function writable(value, start = noop) {
	        let stop;
	        const subscribers = [];
	        function set(new_value) {
	            if (safe_not_equal(value, new_value)) {
	                value = new_value;
	                if (stop) { // store is ready
	                    const run_queue = !subscriber_queue.length;
	                    for (let i = 0; i < subscribers.length; i += 1) {
	                        const s = subscribers[i];
	                        s[1]();
	                        subscriber_queue.push(s, value);
	                    }
	                    if (run_queue) {
	                        for (let i = 0; i < subscriber_queue.length; i += 2) {
	                            subscriber_queue[i][0](subscriber_queue[i + 1]);
	                        }
	                        subscriber_queue.length = 0;
	                    }
	                }
	            }
	        }
	        function update(fn) {
	            set(fn(value));
	        }
	        function subscribe(run, invalidate = noop) {
	            const subscriber = [run, invalidate];
	            subscribers.push(subscriber);
	            if (subscribers.length === 1) {
	                stop = start(set) || noop;
	            }
	            run(value);
	            return () => {
	                const index = subscribers.indexOf(subscriber);
	                if (index !== -1) {
	                    subscribers.splice(index, 1);
	                }
	                if (subscribers.length === 0) {
	                    stop();
	                    stop = null;
	                }
	            };
	        }
	        return { set, update, subscribe };
	    }
	    /**
	     * Derived value store by synchronizing one or more readable stores and
	     * applying an aggregation function over its input values.
	     * @param {Stores} stores input stores
	     * @param {function(Stores=, function(*)=):*}fn function callback that aggregates the values
	     * @param {*=}initial_value when used asynchronously
	     */
	    function derived(stores, fn, initial_value) {
	        const single = !Array.isArray(stores);
	        const stores_array = single
	            ? [stores]
	            : stores;
	        const auto = fn.length < 2;
	        return readable(initial_value, (set) => {
	            let inited = false;
	            const values = [];
	            let pending = 0;
	            let cleanup = noop;
	            const sync = () => {
	                if (pending) {
	                    return;
	                }
	                cleanup();
	                const result = fn(single ? values[0] : values, set);
	                if (auto) {
	                    set(result);
	                }
	                else {
	                    cleanup = is_function(result) ? result : noop;
	                }
	            };
	            const unsubscribers = stores_array.map((store, i) => store.subscribe((value) => {
	                values[i] = value;
	                pending &= ~(1 << i);
	                if (inited) {
	                    sync();
	                }
	            }, () => {
	                pending |= (1 << i);
	            }));
	            inited = true;
	            sync();
	            return function stop() {
	                run_all(unsubscribers);
	                cleanup();
	            };
	        });
	    }

	    var require$$0 = {};

	    /*! https://mths.be/punycode v1.4.1 by @mathias */


	    /** Highest positive signed 32-bit float value */
	    var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

	    /** Bootstring parameters */
	    var base = 36;
	    var tMin = 1;
	    var tMax = 26;
	    var skew = 38;
	    var damp = 700;
	    var initialBias = 72;
	    var initialN = 128; // 0x80
	    var delimiter = '-'; // '\x2D'
	    var regexNonASCII = /[^\x20-\x7E]/; // unprintable ASCII chars + non-ASCII chars
	    var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

	    /** Error messages */
	    var errors = {
	      'overflow': 'Overflow: input needs wider integers to process',
	      'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
	      'invalid-input': 'Invalid input'
	    };

	    /** Convenience shortcuts */
	    var baseMinusTMin = base - tMin;
	    var floor = Math.floor;
	    var stringFromCharCode = String.fromCharCode;

	    /*--------------------------------------------------------------------------*/

	    /**
	     * A generic error utility function.
	     * @private
	     * @param {String} type The error type.
	     * @returns {Error} Throws a `RangeError` with the applicable error message.
	     */
	    function error(type) {
	      throw new RangeError(errors[type]);
	    }

	    /**
	     * A generic `Array#map` utility function.
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} callback The function that gets called for every array
	     * item.
	     * @returns {Array} A new array of values returned by the callback function.
	     */
	    function map(array, fn) {
	      var length = array.length;
	      var result = [];
	      while (length--) {
	        result[length] = fn(array[length]);
	      }
	      return result;
	    }

	    /**
	     * A simple `Array#map`-like wrapper to work with domain name strings or email
	     * addresses.
	     * @private
	     * @param {String} domain The domain name or email address.
	     * @param {Function} callback The function that gets called for every
	     * character.
	     * @returns {Array} A new string of characters returned by the callback
	     * function.
	     */
	    function mapDomain(string, fn) {
	      var parts = string.split('@');
	      var result = '';
	      if (parts.length > 1) {
	        // In email addresses, only the domain name should be punycoded. Leave
	        // the local part (i.e. everything up to `@`) intact.
	        result = parts[0] + '@';
	        string = parts[1];
	      }
	      // Avoid `split(regex)` for IE8 compatibility. See #17.
	      string = string.replace(regexSeparators, '\x2E');
	      var labels = string.split('.');
	      var encoded = map(labels, fn).join('.');
	      return result + encoded;
	    }

	    /**
	     * Creates an array containing the numeric code points of each Unicode
	     * character in the string. While JavaScript uses UCS-2 internally,
	     * this function will convert a pair of surrogate halves (each of which
	     * UCS-2 exposes as separate characters) into a single code point,
	     * matching UTF-16.
	     * @see `punycode.ucs2.encode`
	     * @see <https://mathiasbynens.be/notes/javascript-encoding>
	     * @memberOf punycode.ucs2
	     * @name decode
	     * @param {String} string The Unicode input string (UCS-2).
	     * @returns {Array} The new array of code points.
	     */
	    function ucs2decode(string) {
	      var output = [],
	        counter = 0,
	        length = string.length,
	        value,
	        extra;
	      while (counter < length) {
	        value = string.charCodeAt(counter++);
	        if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
	          // high surrogate, and there is a next character
	          extra = string.charCodeAt(counter++);
	          if ((extra & 0xFC00) == 0xDC00) { // low surrogate
	            output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
	          } else {
	            // unmatched surrogate; only append this code unit, in case the next
	            // code unit is the high surrogate of a surrogate pair
	            output.push(value);
	            counter--;
	          }
	        } else {
	          output.push(value);
	        }
	      }
	      return output;
	    }

	    /**
	     * Converts a digit/integer into a basic code point.
	     * @see `basicToDigit()`
	     * @private
	     * @param {Number} digit The numeric value of a basic code point.
	     * @returns {Number} The basic code point whose value (when used for
	     * representing integers) is `digit`, which needs to be in the range
	     * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	     * used; else, the lowercase form is used. The behavior is undefined
	     * if `flag` is non-zero and `digit` has no uppercase form.
	     */
	    function digitToBasic(digit, flag) {
	      //  0..25 map to ASCII a..z or A..Z
	      // 26..35 map to ASCII 0..9
	      return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	    }

	    /**
	     * Bias adaptation function as per section 3.4 of RFC 3492.
	     * https://tools.ietf.org/html/rfc3492#section-3.4
	     * @private
	     */
	    function adapt(delta, numPoints, firstTime) {
	      var k = 0;
	      delta = firstTime ? floor(delta / damp) : delta >> 1;
	      delta += floor(delta / numPoints);
	      for ( /* no initialization */ ; delta > baseMinusTMin * tMax >> 1; k += base) {
	        delta = floor(delta / baseMinusTMin);
	      }
	      return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	    }

	    /**
	     * Converts a string of Unicode symbols (e.g. a domain name label) to a
	     * Punycode string of ASCII-only symbols.
	     * @memberOf punycode
	     * @param {String} input The string of Unicode symbols.
	     * @returns {String} The resulting Punycode string of ASCII-only symbols.
	     */
	    function encode(input) {
	      var n,
	        delta,
	        handledCPCount,
	        basicLength,
	        bias,
	        j,
	        m,
	        q,
	        k,
	        t,
	        currentValue,
	        output = [],
	        /** `inputLength` will hold the number of code points in `input`. */
	        inputLength,
	        /** Cached calculation results */
	        handledCPCountPlusOne,
	        baseMinusT,
	        qMinusT;

	      // Convert the input in UCS-2 to Unicode
	      input = ucs2decode(input);

	      // Cache the length
	      inputLength = input.length;

	      // Initialize the state
	      n = initialN;
	      delta = 0;
	      bias = initialBias;

	      // Handle the basic code points
	      for (j = 0; j < inputLength; ++j) {
	        currentValue = input[j];
	        if (currentValue < 0x80) {
	          output.push(stringFromCharCode(currentValue));
	        }
	      }

	      handledCPCount = basicLength = output.length;

	      // `handledCPCount` is the number of code points that have been handled;
	      // `basicLength` is the number of basic code points.

	      // Finish the basic string - if it is not empty - with a delimiter
	      if (basicLength) {
	        output.push(delimiter);
	      }

	      // Main encoding loop:
	      while (handledCPCount < inputLength) {

	        // All non-basic code points < n have been handled already. Find the next
	        // larger one:
	        for (m = maxInt, j = 0; j < inputLength; ++j) {
	          currentValue = input[j];
	          if (currentValue >= n && currentValue < m) {
	            m = currentValue;
	          }
	        }

	        // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
	        // but guard against overflow
	        handledCPCountPlusOne = handledCPCount + 1;
	        if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
	          error('overflow');
	        }

	        delta += (m - n) * handledCPCountPlusOne;
	        n = m;

	        for (j = 0; j < inputLength; ++j) {
	          currentValue = input[j];

	          if (currentValue < n && ++delta > maxInt) {
	            error('overflow');
	          }

	          if (currentValue == n) {
	            // Represent delta as a generalized variable-length integer
	            for (q = delta, k = base; /* no condition */ ; k += base) {
	              t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
	              if (q < t) {
	                break;
	              }
	              qMinusT = q - t;
	              baseMinusT = base - t;
	              output.push(
	                stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
	              );
	              q = floor(qMinusT / baseMinusT);
	            }

	            output.push(stringFromCharCode(digitToBasic(q, 0)));
	            bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
	            delta = 0;
	            ++handledCPCount;
	          }
	        }

	        ++delta;
	        ++n;

	      }
	      return output.join('');
	    }

	    /**
	     * Converts a Unicode string representing a domain name or an email address to
	     * Punycode. Only the non-ASCII parts of the domain name will be converted,
	     * i.e. it doesn't matter if you call it with a domain that's already in
	     * ASCII.
	     * @memberOf punycode
	     * @param {String} input The domain name or email address to convert, as a
	     * Unicode string.
	     * @returns {String} The Punycode representation of the given domain name or
	     * email address.
	     */
	    function toASCII(input) {
	      return mapDomain(input, function(string) {
	        return regexNonASCII.test(string) ?
	          'xn--' + encode(string) :
	          string;
	      });
	    }

	    var lookup = [];
	    var revLookup = [];
	    var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
	    var inited = false;
	    function init$1 () {
	      inited = true;
	      var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	      for (var i = 0, len = code.length; i < len; ++i) {
	        lookup[i] = code[i];
	        revLookup[code.charCodeAt(i)] = i;
	      }

	      revLookup['-'.charCodeAt(0)] = 62;
	      revLookup['_'.charCodeAt(0)] = 63;
	    }

	    function toByteArray (b64) {
	      if (!inited) {
	        init$1();
	      }
	      var i, j, l, tmp, placeHolders, arr;
	      var len = b64.length;

	      if (len % 4 > 0) {
	        throw new Error('Invalid string. Length must be a multiple of 4')
	      }

	      // the number of equal signs (place holders)
	      // if there are two placeholders, than the two characters before it
	      // represent one byte
	      // if there is only one, then the three characters before it represent 2 bytes
	      // this is just a cheap hack to not do indexOf twice
	      placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

	      // base64 is 4/3 + up to two characters of the original data
	      arr = new Arr(len * 3 / 4 - placeHolders);

	      // if there are placeholders, only get up to the last complete 4 chars
	      l = placeHolders > 0 ? len - 4 : len;

	      var L = 0;

	      for (i = 0, j = 0; i < l; i += 4, j += 3) {
	        tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
	        arr[L++] = (tmp >> 16) & 0xFF;
	        arr[L++] = (tmp >> 8) & 0xFF;
	        arr[L++] = tmp & 0xFF;
	      }

	      if (placeHolders === 2) {
	        tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
	        arr[L++] = tmp & 0xFF;
	      } else if (placeHolders === 1) {
	        tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
	        arr[L++] = (tmp >> 8) & 0xFF;
	        arr[L++] = tmp & 0xFF;
	      }

	      return arr
	    }

	    function tripletToBase64 (num) {
	      return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	    }

	    function encodeChunk (uint8, start, end) {
	      var tmp;
	      var output = [];
	      for (var i = start; i < end; i += 3) {
	        tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
	        output.push(tripletToBase64(tmp));
	      }
	      return output.join('')
	    }

	    function fromByteArray (uint8) {
	      if (!inited) {
	        init$1();
	      }
	      var tmp;
	      var len = uint8.length;
	      var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
	      var output = '';
	      var parts = [];
	      var maxChunkLength = 16383; // must be multiple of 3

	      // go through the array every three bytes, we'll deal with trailing stuff later
	      for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	        parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
	      }

	      // pad the end with zeros, but make sure to not forget the extra bytes
	      if (extraBytes === 1) {
	        tmp = uint8[len - 1];
	        output += lookup[tmp >> 2];
	        output += lookup[(tmp << 4) & 0x3F];
	        output += '==';
	      } else if (extraBytes === 2) {
	        tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
	        output += lookup[tmp >> 10];
	        output += lookup[(tmp >> 4) & 0x3F];
	        output += lookup[(tmp << 2) & 0x3F];
	        output += '=';
	      }

	      parts.push(output);

	      return parts.join('')
	    }

	    function read (buffer, offset, isLE, mLen, nBytes) {
	      var e, m;
	      var eLen = nBytes * 8 - mLen - 1;
	      var eMax = (1 << eLen) - 1;
	      var eBias = eMax >> 1;
	      var nBits = -7;
	      var i = isLE ? (nBytes - 1) : 0;
	      var d = isLE ? -1 : 1;
	      var s = buffer[offset + i];

	      i += d;

	      e = s & ((1 << (-nBits)) - 1);
	      s >>= (-nBits);
	      nBits += eLen;
	      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	      m = e & ((1 << (-nBits)) - 1);
	      e >>= (-nBits);
	      nBits += mLen;
	      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	      if (e === 0) {
	        e = 1 - eBias;
	      } else if (e === eMax) {
	        return m ? NaN : ((s ? -1 : 1) * Infinity)
	      } else {
	        m = m + Math.pow(2, mLen);
	        e = e - eBias;
	      }
	      return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	    }

	    function write (buffer, value, offset, isLE, mLen, nBytes) {
	      var e, m, c;
	      var eLen = nBytes * 8 - mLen - 1;
	      var eMax = (1 << eLen) - 1;
	      var eBias = eMax >> 1;
	      var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
	      var i = isLE ? 0 : (nBytes - 1);
	      var d = isLE ? 1 : -1;
	      var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

	      value = Math.abs(value);

	      if (isNaN(value) || value === Infinity) {
	        m = isNaN(value) ? 1 : 0;
	        e = eMax;
	      } else {
	        e = Math.floor(Math.log(value) / Math.LN2);
	        if (value * (c = Math.pow(2, -e)) < 1) {
	          e--;
	          c *= 2;
	        }
	        if (e + eBias >= 1) {
	          value += rt / c;
	        } else {
	          value += rt * Math.pow(2, 1 - eBias);
	        }
	        if (value * c >= 2) {
	          e++;
	          c /= 2;
	        }

	        if (e + eBias >= eMax) {
	          m = 0;
	          e = eMax;
	        } else if (e + eBias >= 1) {
	          m = (value * c - 1) * Math.pow(2, mLen);
	          e = e + eBias;
	        } else {
	          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
	          e = 0;
	        }
	      }

	      for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	      e = (e << mLen) | m;
	      eLen += mLen;
	      for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	      buffer[offset + i - d] |= s * 128;
	    }

	    var toString = {}.toString;

	    var isArray = Array.isArray || function (arr) {
	      return toString.call(arr) == '[object Array]';
	    };

	    var INSPECT_MAX_BYTES = 50;

	    /**
	     * If `Buffer.TYPED_ARRAY_SUPPORT`:
	     *   === true    Use Uint8Array implementation (fastest)
	     *   === false   Use Object implementation (most compatible, even IE6)
	     *
	     * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	     * Opera 11.6+, iOS 4.2+.
	     *
	     * Due to various browser bugs, sometimes the Object implementation will be used even
	     * when the browser supports typed arrays.
	     *
	     * Note:
	     *
	     *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	     *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	     *
	     *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	     *
	     *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	     *     incorrect length in some situations.

	     * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	     * get the Object implementation, which is slower but behaves correctly.
	     */
	    Buffer.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== undefined
	      ? global$1.TYPED_ARRAY_SUPPORT
	      : true;

	    function kMaxLength () {
	      return Buffer.TYPED_ARRAY_SUPPORT
	        ? 0x7fffffff
	        : 0x3fffffff
	    }

	    function createBuffer (that, length) {
	      if (kMaxLength() < length) {
	        throw new RangeError('Invalid typed array length')
	      }
	      if (Buffer.TYPED_ARRAY_SUPPORT) {
	        // Return an augmented `Uint8Array` instance, for best performance
	        that = new Uint8Array(length);
	        that.__proto__ = Buffer.prototype;
	      } else {
	        // Fallback: Return an object instance of the Buffer class
	        if (that === null) {
	          that = new Buffer(length);
	        }
	        that.length = length;
	      }

	      return that
	    }

	    /**
	     * The Buffer constructor returns instances of `Uint8Array` that have their
	     * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	     * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	     * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	     * returns a single octet.
	     *
	     * The `Uint8Array` prototype remains unmodified.
	     */

	    function Buffer (arg, encodingOrOffset, length) {
	      if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	        return new Buffer(arg, encodingOrOffset, length)
	      }

	      // Common case.
	      if (typeof arg === 'number') {
	        if (typeof encodingOrOffset === 'string') {
	          throw new Error(
	            'If encoding is specified then the first argument must be a string'
	          )
	        }
	        return allocUnsafe(this, arg)
	      }
	      return from(this, arg, encodingOrOffset, length)
	    }

	    Buffer.poolSize = 8192; // not used by this implementation

	    // TODO: Legacy, not needed anymore. Remove in next major version.
	    Buffer._augment = function (arr) {
	      arr.__proto__ = Buffer.prototype;
	      return arr
	    };

	    function from (that, value, encodingOrOffset, length) {
	      if (typeof value === 'number') {
	        throw new TypeError('"value" argument must not be a number')
	      }

	      if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	        return fromArrayBuffer(that, value, encodingOrOffset, length)
	      }

	      if (typeof value === 'string') {
	        return fromString(that, value, encodingOrOffset)
	      }

	      return fromObject(that, value)
	    }

	    /**
	     * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	     * if value is a number.
	     * Buffer.from(str[, encoding])
	     * Buffer.from(array)
	     * Buffer.from(buffer)
	     * Buffer.from(arrayBuffer[, byteOffset[, length]])
	     **/
	    Buffer.from = function (value, encodingOrOffset, length) {
	      return from(null, value, encodingOrOffset, length)
	    };

	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      Buffer.prototype.__proto__ = Uint8Array.prototype;
	      Buffer.__proto__ = Uint8Array;
	    }

	    function assertSize (size) {
	      if (typeof size !== 'number') {
	        throw new TypeError('"size" argument must be a number')
	      } else if (size < 0) {
	        throw new RangeError('"size" argument must not be negative')
	      }
	    }

	    function alloc (that, size, fill, encoding) {
	      assertSize(size);
	      if (size <= 0) {
	        return createBuffer(that, size)
	      }
	      if (fill !== undefined) {
	        // Only pay attention to encoding if it's a string. This
	        // prevents accidentally sending in a number that would
	        // be interpretted as a start offset.
	        return typeof encoding === 'string'
	          ? createBuffer(that, size).fill(fill, encoding)
	          : createBuffer(that, size).fill(fill)
	      }
	      return createBuffer(that, size)
	    }

	    /**
	     * Creates a new filled Buffer instance.
	     * alloc(size[, fill[, encoding]])
	     **/
	    Buffer.alloc = function (size, fill, encoding) {
	      return alloc(null, size, fill, encoding)
	    };

	    function allocUnsafe (that, size) {
	      assertSize(size);
	      that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
	      if (!Buffer.TYPED_ARRAY_SUPPORT) {
	        for (var i = 0; i < size; ++i) {
	          that[i] = 0;
	        }
	      }
	      return that
	    }

	    /**
	     * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	     * */
	    Buffer.allocUnsafe = function (size) {
	      return allocUnsafe(null, size)
	    };
	    /**
	     * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	     */
	    Buffer.allocUnsafeSlow = function (size) {
	      return allocUnsafe(null, size)
	    };

	    function fromString (that, string, encoding) {
	      if (typeof encoding !== 'string' || encoding === '') {
	        encoding = 'utf8';
	      }

	      if (!Buffer.isEncoding(encoding)) {
	        throw new TypeError('"encoding" must be a valid string encoding')
	      }

	      var length = byteLength(string, encoding) | 0;
	      that = createBuffer(that, length);

	      var actual = that.write(string, encoding);

	      if (actual !== length) {
	        // Writing a hex string, for example, that contains invalid characters will
	        // cause everything after the first invalid character to be ignored. (e.g.
	        // 'abxxcd' will be treated as 'ab')
	        that = that.slice(0, actual);
	      }

	      return that
	    }

	    function fromArrayLike (that, array) {
	      var length = array.length < 0 ? 0 : checked(array.length) | 0;
	      that = createBuffer(that, length);
	      for (var i = 0; i < length; i += 1) {
	        that[i] = array[i] & 255;
	      }
	      return that
	    }

	    function fromArrayBuffer (that, array, byteOffset, length) {
	      array.byteLength; // this throws if `array` is not a valid ArrayBuffer

	      if (byteOffset < 0 || array.byteLength < byteOffset) {
	        throw new RangeError('\'offset\' is out of bounds')
	      }

	      if (array.byteLength < byteOffset + (length || 0)) {
	        throw new RangeError('\'length\' is out of bounds')
	      }

	      if (byteOffset === undefined && length === undefined) {
	        array = new Uint8Array(array);
	      } else if (length === undefined) {
	        array = new Uint8Array(array, byteOffset);
	      } else {
	        array = new Uint8Array(array, byteOffset, length);
	      }

	      if (Buffer.TYPED_ARRAY_SUPPORT) {
	        // Return an augmented `Uint8Array` instance, for best performance
	        that = array;
	        that.__proto__ = Buffer.prototype;
	      } else {
	        // Fallback: Return an object instance of the Buffer class
	        that = fromArrayLike(that, array);
	      }
	      return that
	    }

	    function fromObject (that, obj) {
	      if (internalIsBuffer(obj)) {
	        var len = checked(obj.length) | 0;
	        that = createBuffer(that, len);

	        if (that.length === 0) {
	          return that
	        }

	        obj.copy(that, 0, 0, len);
	        return that
	      }

	      if (obj) {
	        if ((typeof ArrayBuffer !== 'undefined' &&
	            obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	          if (typeof obj.length !== 'number' || isnan(obj.length)) {
	            return createBuffer(that, 0)
	          }
	          return fromArrayLike(that, obj)
	        }

	        if (obj.type === 'Buffer' && isArray(obj.data)) {
	          return fromArrayLike(that, obj.data)
	        }
	      }

	      throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	    }

	    function checked (length) {
	      // Note: cannot use `length < kMaxLength()` here because that fails when
	      // length is NaN (which is otherwise coerced to zero.)
	      if (length >= kMaxLength()) {
	        throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                             'size: 0x' + kMaxLength().toString(16) + ' bytes')
	      }
	      return length | 0
	    }
	    Buffer.isBuffer = isBuffer;
	    function internalIsBuffer (b) {
	      return !!(b != null && b._isBuffer)
	    }

	    Buffer.compare = function compare (a, b) {
	      if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
	        throw new TypeError('Arguments must be Buffers')
	      }

	      if (a === b) return 0

	      var x = a.length;
	      var y = b.length;

	      for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	        if (a[i] !== b[i]) {
	          x = a[i];
	          y = b[i];
	          break
	        }
	      }

	      if (x < y) return -1
	      if (y < x) return 1
	      return 0
	    };

	    Buffer.isEncoding = function isEncoding (encoding) {
	      switch (String(encoding).toLowerCase()) {
	        case 'hex':
	        case 'utf8':
	        case 'utf-8':
	        case 'ascii':
	        case 'latin1':
	        case 'binary':
	        case 'base64':
	        case 'ucs2':
	        case 'ucs-2':
	        case 'utf16le':
	        case 'utf-16le':
	          return true
	        default:
	          return false
	      }
	    };

	    Buffer.concat = function concat (list, length) {
	      if (!isArray(list)) {
	        throw new TypeError('"list" argument must be an Array of Buffers')
	      }

	      if (list.length === 0) {
	        return Buffer.alloc(0)
	      }

	      var i;
	      if (length === undefined) {
	        length = 0;
	        for (i = 0; i < list.length; ++i) {
	          length += list[i].length;
	        }
	      }

	      var buffer = Buffer.allocUnsafe(length);
	      var pos = 0;
	      for (i = 0; i < list.length; ++i) {
	        var buf = list[i];
	        if (!internalIsBuffer(buf)) {
	          throw new TypeError('"list" argument must be an Array of Buffers')
	        }
	        buf.copy(buffer, pos);
	        pos += buf.length;
	      }
	      return buffer
	    };

	    function byteLength (string, encoding) {
	      if (internalIsBuffer(string)) {
	        return string.length
	      }
	      if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	          (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	        return string.byteLength
	      }
	      if (typeof string !== 'string') {
	        string = '' + string;
	      }

	      var len = string.length;
	      if (len === 0) return 0

	      // Use a for loop to avoid recursion
	      var loweredCase = false;
	      for (;;) {
	        switch (encoding) {
	          case 'ascii':
	          case 'latin1':
	          case 'binary':
	            return len
	          case 'utf8':
	          case 'utf-8':
	          case undefined:
	            return utf8ToBytes(string).length
	          case 'ucs2':
	          case 'ucs-2':
	          case 'utf16le':
	          case 'utf-16le':
	            return len * 2
	          case 'hex':
	            return len >>> 1
	          case 'base64':
	            return base64ToBytes(string).length
	          default:
	            if (loweredCase) return utf8ToBytes(string).length // assume utf8
	            encoding = ('' + encoding).toLowerCase();
	            loweredCase = true;
	        }
	      }
	    }
	    Buffer.byteLength = byteLength;

	    function slowToString (encoding, start, end) {
	      var loweredCase = false;

	      // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	      // property of a typed array.

	      // This behaves neither like String nor Uint8Array in that we set start/end
	      // to their upper/lower bounds if the value passed is out of range.
	      // undefined is handled specially as per ECMA-262 6th Edition,
	      // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	      if (start === undefined || start < 0) {
	        start = 0;
	      }
	      // Return early if start > this.length. Done here to prevent potential uint32
	      // coercion fail below.
	      if (start > this.length) {
	        return ''
	      }

	      if (end === undefined || end > this.length) {
	        end = this.length;
	      }

	      if (end <= 0) {
	        return ''
	      }

	      // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	      end >>>= 0;
	      start >>>= 0;

	      if (end <= start) {
	        return ''
	      }

	      if (!encoding) encoding = 'utf8';

	      while (true) {
	        switch (encoding) {
	          case 'hex':
	            return hexSlice(this, start, end)

	          case 'utf8':
	          case 'utf-8':
	            return utf8Slice(this, start, end)

	          case 'ascii':
	            return asciiSlice(this, start, end)

	          case 'latin1':
	          case 'binary':
	            return latin1Slice(this, start, end)

	          case 'base64':
	            return base64Slice(this, start, end)

	          case 'ucs2':
	          case 'ucs-2':
	          case 'utf16le':
	          case 'utf-16le':
	            return utf16leSlice(this, start, end)

	          default:
	            if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	            encoding = (encoding + '').toLowerCase();
	            loweredCase = true;
	        }
	      }
	    }

	    // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	    // Buffer instances.
	    Buffer.prototype._isBuffer = true;

	    function swap (b, n, m) {
	      var i = b[n];
	      b[n] = b[m];
	      b[m] = i;
	    }

	    Buffer.prototype.swap16 = function swap16 () {
	      var len = this.length;
	      if (len % 2 !== 0) {
	        throw new RangeError('Buffer size must be a multiple of 16-bits')
	      }
	      for (var i = 0; i < len; i += 2) {
	        swap(this, i, i + 1);
	      }
	      return this
	    };

	    Buffer.prototype.swap32 = function swap32 () {
	      var len = this.length;
	      if (len % 4 !== 0) {
	        throw new RangeError('Buffer size must be a multiple of 32-bits')
	      }
	      for (var i = 0; i < len; i += 4) {
	        swap(this, i, i + 3);
	        swap(this, i + 1, i + 2);
	      }
	      return this
	    };

	    Buffer.prototype.swap64 = function swap64 () {
	      var len = this.length;
	      if (len % 8 !== 0) {
	        throw new RangeError('Buffer size must be a multiple of 64-bits')
	      }
	      for (var i = 0; i < len; i += 8) {
	        swap(this, i, i + 7);
	        swap(this, i + 1, i + 6);
	        swap(this, i + 2, i + 5);
	        swap(this, i + 3, i + 4);
	      }
	      return this
	    };

	    Buffer.prototype.toString = function toString () {
	      var length = this.length | 0;
	      if (length === 0) return ''
	      if (arguments.length === 0) return utf8Slice(this, 0, length)
	      return slowToString.apply(this, arguments)
	    };

	    Buffer.prototype.equals = function equals (b) {
	      if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
	      if (this === b) return true
	      return Buffer.compare(this, b) === 0
	    };

	    Buffer.prototype.inspect = function inspect () {
	      var str = '';
	      var max = INSPECT_MAX_BYTES;
	      if (this.length > 0) {
	        str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
	        if (this.length > max) str += ' ... ';
	      }
	      return '<Buffer ' + str + '>'
	    };

	    Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	      if (!internalIsBuffer(target)) {
	        throw new TypeError('Argument must be a Buffer')
	      }

	      if (start === undefined) {
	        start = 0;
	      }
	      if (end === undefined) {
	        end = target ? target.length : 0;
	      }
	      if (thisStart === undefined) {
	        thisStart = 0;
	      }
	      if (thisEnd === undefined) {
	        thisEnd = this.length;
	      }

	      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	        throw new RangeError('out of range index')
	      }

	      if (thisStart >= thisEnd && start >= end) {
	        return 0
	      }
	      if (thisStart >= thisEnd) {
	        return -1
	      }
	      if (start >= end) {
	        return 1
	      }

	      start >>>= 0;
	      end >>>= 0;
	      thisStart >>>= 0;
	      thisEnd >>>= 0;

	      if (this === target) return 0

	      var x = thisEnd - thisStart;
	      var y = end - start;
	      var len = Math.min(x, y);

	      var thisCopy = this.slice(thisStart, thisEnd);
	      var targetCopy = target.slice(start, end);

	      for (var i = 0; i < len; ++i) {
	        if (thisCopy[i] !== targetCopy[i]) {
	          x = thisCopy[i];
	          y = targetCopy[i];
	          break
	        }
	      }

	      if (x < y) return -1
	      if (y < x) return 1
	      return 0
	    };

	    // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	    // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	    //
	    // Arguments:
	    // - buffer - a Buffer to search
	    // - val - a string, Buffer, or number
	    // - byteOffset - an index into `buffer`; will be clamped to an int32
	    // - encoding - an optional encoding, relevant is val is a string
	    // - dir - true for indexOf, false for lastIndexOf
	    function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	      // Empty buffer means no match
	      if (buffer.length === 0) return -1

	      // Normalize byteOffset
	      if (typeof byteOffset === 'string') {
	        encoding = byteOffset;
	        byteOffset = 0;
	      } else if (byteOffset > 0x7fffffff) {
	        byteOffset = 0x7fffffff;
	      } else if (byteOffset < -0x80000000) {
	        byteOffset = -0x80000000;
	      }
	      byteOffset = +byteOffset;  // Coerce to Number.
	      if (isNaN(byteOffset)) {
	        // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	        byteOffset = dir ? 0 : (buffer.length - 1);
	      }

	      // Normalize byteOffset: negative offsets start from the end of the buffer
	      if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
	      if (byteOffset >= buffer.length) {
	        if (dir) return -1
	        else byteOffset = buffer.length - 1;
	      } else if (byteOffset < 0) {
	        if (dir) byteOffset = 0;
	        else return -1
	      }

	      // Normalize val
	      if (typeof val === 'string') {
	        val = Buffer.from(val, encoding);
	      }

	      // Finally, search either indexOf (if dir is true) or lastIndexOf
	      if (internalIsBuffer(val)) {
	        // Special case: looking for empty string/buffer always fails
	        if (val.length === 0) {
	          return -1
	        }
	        return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	      } else if (typeof val === 'number') {
	        val = val & 0xFF; // Search for a byte value [0-255]
	        if (Buffer.TYPED_ARRAY_SUPPORT &&
	            typeof Uint8Array.prototype.indexOf === 'function') {
	          if (dir) {
	            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	          } else {
	            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	          }
	        }
	        return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	      }

	      throw new TypeError('val must be string, number or Buffer')
	    }

	    function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	      var indexSize = 1;
	      var arrLength = arr.length;
	      var valLength = val.length;

	      if (encoding !== undefined) {
	        encoding = String(encoding).toLowerCase();
	        if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	            encoding === 'utf16le' || encoding === 'utf-16le') {
	          if (arr.length < 2 || val.length < 2) {
	            return -1
	          }
	          indexSize = 2;
	          arrLength /= 2;
	          valLength /= 2;
	          byteOffset /= 2;
	        }
	      }

	      function read (buf, i) {
	        if (indexSize === 1) {
	          return buf[i]
	        } else {
	          return buf.readUInt16BE(i * indexSize)
	        }
	      }

	      var i;
	      if (dir) {
	        var foundIndex = -1;
	        for (i = byteOffset; i < arrLength; i++) {
	          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	            if (foundIndex === -1) foundIndex = i;
	            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	          } else {
	            if (foundIndex !== -1) i -= i - foundIndex;
	            foundIndex = -1;
	          }
	        }
	      } else {
	        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
	        for (i = byteOffset; i >= 0; i--) {
	          var found = true;
	          for (var j = 0; j < valLength; j++) {
	            if (read(arr, i + j) !== read(val, j)) {
	              found = false;
	              break
	            }
	          }
	          if (found) return i
	        }
	      }

	      return -1
	    }

	    Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	      return this.indexOf(val, byteOffset, encoding) !== -1
	    };

	    Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	      return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	    };

	    Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	      return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	    };

	    function hexWrite (buf, string, offset, length) {
	      offset = Number(offset) || 0;
	      var remaining = buf.length - offset;
	      if (!length) {
	        length = remaining;
	      } else {
	        length = Number(length);
	        if (length > remaining) {
	          length = remaining;
	        }
	      }

	      // must be an even number of digits
	      var strLen = string.length;
	      if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

	      if (length > strLen / 2) {
	        length = strLen / 2;
	      }
	      for (var i = 0; i < length; ++i) {
	        var parsed = parseInt(string.substr(i * 2, 2), 16);
	        if (isNaN(parsed)) return i
	        buf[offset + i] = parsed;
	      }
	      return i
	    }

	    function utf8Write (buf, string, offset, length) {
	      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	    }

	    function asciiWrite (buf, string, offset, length) {
	      return blitBuffer(asciiToBytes(string), buf, offset, length)
	    }

	    function latin1Write (buf, string, offset, length) {
	      return asciiWrite(buf, string, offset, length)
	    }

	    function base64Write (buf, string, offset, length) {
	      return blitBuffer(base64ToBytes(string), buf, offset, length)
	    }

	    function ucs2Write (buf, string, offset, length) {
	      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	    }

	    Buffer.prototype.write = function write (string, offset, length, encoding) {
	      // Buffer#write(string)
	      if (offset === undefined) {
	        encoding = 'utf8';
	        length = this.length;
	        offset = 0;
	      // Buffer#write(string, encoding)
	      } else if (length === undefined && typeof offset === 'string') {
	        encoding = offset;
	        length = this.length;
	        offset = 0;
	      // Buffer#write(string, offset[, length][, encoding])
	      } else if (isFinite(offset)) {
	        offset = offset | 0;
	        if (isFinite(length)) {
	          length = length | 0;
	          if (encoding === undefined) encoding = 'utf8';
	        } else {
	          encoding = length;
	          length = undefined;
	        }
	      // legacy write(string, encoding, offset, length) - remove in v0.13
	      } else {
	        throw new Error(
	          'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	        )
	      }

	      var remaining = this.length - offset;
	      if (length === undefined || length > remaining) length = remaining;

	      if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	        throw new RangeError('Attempt to write outside buffer bounds')
	      }

	      if (!encoding) encoding = 'utf8';

	      var loweredCase = false;
	      for (;;) {
	        switch (encoding) {
	          case 'hex':
	            return hexWrite(this, string, offset, length)

	          case 'utf8':
	          case 'utf-8':
	            return utf8Write(this, string, offset, length)

	          case 'ascii':
	            return asciiWrite(this, string, offset, length)

	          case 'latin1':
	          case 'binary':
	            return latin1Write(this, string, offset, length)

	          case 'base64':
	            // Warning: maxLength not taken into account in base64Write
	            return base64Write(this, string, offset, length)

	          case 'ucs2':
	          case 'ucs-2':
	          case 'utf16le':
	          case 'utf-16le':
	            return ucs2Write(this, string, offset, length)

	          default:
	            if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	            encoding = ('' + encoding).toLowerCase();
	            loweredCase = true;
	        }
	      }
	    };

	    Buffer.prototype.toJSON = function toJSON () {
	      return {
	        type: 'Buffer',
	        data: Array.prototype.slice.call(this._arr || this, 0)
	      }
	    };

	    function base64Slice (buf, start, end) {
	      if (start === 0 && end === buf.length) {
	        return fromByteArray(buf)
	      } else {
	        return fromByteArray(buf.slice(start, end))
	      }
	    }

	    function utf8Slice (buf, start, end) {
	      end = Math.min(buf.length, end);
	      var res = [];

	      var i = start;
	      while (i < end) {
	        var firstByte = buf[i];
	        var codePoint = null;
	        var bytesPerSequence = (firstByte > 0xEF) ? 4
	          : (firstByte > 0xDF) ? 3
	          : (firstByte > 0xBF) ? 2
	          : 1;

	        if (i + bytesPerSequence <= end) {
	          var secondByte, thirdByte, fourthByte, tempCodePoint;

	          switch (bytesPerSequence) {
	            case 1:
	              if (firstByte < 0x80) {
	                codePoint = firstByte;
	              }
	              break
	            case 2:
	              secondByte = buf[i + 1];
	              if ((secondByte & 0xC0) === 0x80) {
	                tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
	                if (tempCodePoint > 0x7F) {
	                  codePoint = tempCodePoint;
	                }
	              }
	              break
	            case 3:
	              secondByte = buf[i + 1];
	              thirdByte = buf[i + 2];
	              if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	                tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
	                if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	                  codePoint = tempCodePoint;
	                }
	              }
	              break
	            case 4:
	              secondByte = buf[i + 1];
	              thirdByte = buf[i + 2];
	              fourthByte = buf[i + 3];
	              if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	                tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
	                if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	                  codePoint = tempCodePoint;
	                }
	              }
	          }
	        }

	        if (codePoint === null) {
	          // we did not generate a valid codePoint so insert a
	          // replacement char (U+FFFD) and advance only 1 byte
	          codePoint = 0xFFFD;
	          bytesPerSequence = 1;
	        } else if (codePoint > 0xFFFF) {
	          // encode to utf16 (surrogate pair dance)
	          codePoint -= 0x10000;
	          res.push(codePoint >>> 10 & 0x3FF | 0xD800);
	          codePoint = 0xDC00 | codePoint & 0x3FF;
	        }

	        res.push(codePoint);
	        i += bytesPerSequence;
	      }

	      return decodeCodePointsArray(res)
	    }

	    // Based on http://stackoverflow.com/a/22747272/680742, the browser with
	    // the lowest limit is Chrome, with 0x10000 args.
	    // We go 1 magnitude less, for safety
	    var MAX_ARGUMENTS_LENGTH = 0x1000;

	    function decodeCodePointsArray (codePoints) {
	      var len = codePoints.length;
	      if (len <= MAX_ARGUMENTS_LENGTH) {
	        return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	      }

	      // Decode in chunks to avoid "call stack size exceeded".
	      var res = '';
	      var i = 0;
	      while (i < len) {
	        res += String.fromCharCode.apply(
	          String,
	          codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	        );
	      }
	      return res
	    }

	    function asciiSlice (buf, start, end) {
	      var ret = '';
	      end = Math.min(buf.length, end);

	      for (var i = start; i < end; ++i) {
	        ret += String.fromCharCode(buf[i] & 0x7F);
	      }
	      return ret
	    }

	    function latin1Slice (buf, start, end) {
	      var ret = '';
	      end = Math.min(buf.length, end);

	      for (var i = start; i < end; ++i) {
	        ret += String.fromCharCode(buf[i]);
	      }
	      return ret
	    }

	    function hexSlice (buf, start, end) {
	      var len = buf.length;

	      if (!start || start < 0) start = 0;
	      if (!end || end < 0 || end > len) end = len;

	      var out = '';
	      for (var i = start; i < end; ++i) {
	        out += toHex(buf[i]);
	      }
	      return out
	    }

	    function utf16leSlice (buf, start, end) {
	      var bytes = buf.slice(start, end);
	      var res = '';
	      for (var i = 0; i < bytes.length; i += 2) {
	        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
	      }
	      return res
	    }

	    Buffer.prototype.slice = function slice (start, end) {
	      var len = this.length;
	      start = ~~start;
	      end = end === undefined ? len : ~~end;

	      if (start < 0) {
	        start += len;
	        if (start < 0) start = 0;
	      } else if (start > len) {
	        start = len;
	      }

	      if (end < 0) {
	        end += len;
	        if (end < 0) end = 0;
	      } else if (end > len) {
	        end = len;
	      }

	      if (end < start) end = start;

	      var newBuf;
	      if (Buffer.TYPED_ARRAY_SUPPORT) {
	        newBuf = this.subarray(start, end);
	        newBuf.__proto__ = Buffer.prototype;
	      } else {
	        var sliceLen = end - start;
	        newBuf = new Buffer(sliceLen, undefined);
	        for (var i = 0; i < sliceLen; ++i) {
	          newBuf[i] = this[i + start];
	        }
	      }

	      return newBuf
	    };

	    /*
	     * Need to make sure that buffer isn't trying to write out of bounds.
	     */
	    function checkOffset (offset, ext, length) {
	      if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	      if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	    }

	    Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	      offset = offset | 0;
	      byteLength = byteLength | 0;
	      if (!noAssert) checkOffset(offset, byteLength, this.length);

	      var val = this[offset];
	      var mul = 1;
	      var i = 0;
	      while (++i < byteLength && (mul *= 0x100)) {
	        val += this[offset + i] * mul;
	      }

	      return val
	    };

	    Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	      offset = offset | 0;
	      byteLength = byteLength | 0;
	      if (!noAssert) {
	        checkOffset(offset, byteLength, this.length);
	      }

	      var val = this[offset + --byteLength];
	      var mul = 1;
	      while (byteLength > 0 && (mul *= 0x100)) {
	        val += this[offset + --byteLength] * mul;
	      }

	      return val
	    };

	    Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	      if (!noAssert) checkOffset(offset, 1, this.length);
	      return this[offset]
	    };

	    Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	      if (!noAssert) checkOffset(offset, 2, this.length);
	      return this[offset] | (this[offset + 1] << 8)
	    };

	    Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	      if (!noAssert) checkOffset(offset, 2, this.length);
	      return (this[offset] << 8) | this[offset + 1]
	    };

	    Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	      if (!noAssert) checkOffset(offset, 4, this.length);

	      return ((this[offset]) |
	          (this[offset + 1] << 8) |
	          (this[offset + 2] << 16)) +
	          (this[offset + 3] * 0x1000000)
	    };

	    Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	      if (!noAssert) checkOffset(offset, 4, this.length);

	      return (this[offset] * 0x1000000) +
	        ((this[offset + 1] << 16) |
	        (this[offset + 2] << 8) |
	        this[offset + 3])
	    };

	    Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	      offset = offset | 0;
	      byteLength = byteLength | 0;
	      if (!noAssert) checkOffset(offset, byteLength, this.length);

	      var val = this[offset];
	      var mul = 1;
	      var i = 0;
	      while (++i < byteLength && (mul *= 0x100)) {
	        val += this[offset + i] * mul;
	      }
	      mul *= 0x80;

	      if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	      return val
	    };

	    Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	      offset = offset | 0;
	      byteLength = byteLength | 0;
	      if (!noAssert) checkOffset(offset, byteLength, this.length);

	      var i = byteLength;
	      var mul = 1;
	      var val = this[offset + --i];
	      while (i > 0 && (mul *= 0x100)) {
	        val += this[offset + --i] * mul;
	      }
	      mul *= 0x80;

	      if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	      return val
	    };

	    Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	      if (!noAssert) checkOffset(offset, 1, this.length);
	      if (!(this[offset] & 0x80)) return (this[offset])
	      return ((0xff - this[offset] + 1) * -1)
	    };

	    Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	      if (!noAssert) checkOffset(offset, 2, this.length);
	      var val = this[offset] | (this[offset + 1] << 8);
	      return (val & 0x8000) ? val | 0xFFFF0000 : val
	    };

	    Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	      if (!noAssert) checkOffset(offset, 2, this.length);
	      var val = this[offset + 1] | (this[offset] << 8);
	      return (val & 0x8000) ? val | 0xFFFF0000 : val
	    };

	    Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	      if (!noAssert) checkOffset(offset, 4, this.length);

	      return (this[offset]) |
	        (this[offset + 1] << 8) |
	        (this[offset + 2] << 16) |
	        (this[offset + 3] << 24)
	    };

	    Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	      if (!noAssert) checkOffset(offset, 4, this.length);

	      return (this[offset] << 24) |
	        (this[offset + 1] << 16) |
	        (this[offset + 2] << 8) |
	        (this[offset + 3])
	    };

	    Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	      if (!noAssert) checkOffset(offset, 4, this.length);
	      return read(this, offset, true, 23, 4)
	    };

	    Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	      if (!noAssert) checkOffset(offset, 4, this.length);
	      return read(this, offset, false, 23, 4)
	    };

	    Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	      if (!noAssert) checkOffset(offset, 8, this.length);
	      return read(this, offset, true, 52, 8)
	    };

	    Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	      if (!noAssert) checkOffset(offset, 8, this.length);
	      return read(this, offset, false, 52, 8)
	    };

	    function checkInt (buf, value, offset, ext, max, min) {
	      if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	      if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	      if (offset + ext > buf.length) throw new RangeError('Index out of range')
	    }

	    Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	      value = +value;
	      offset = offset | 0;
	      byteLength = byteLength | 0;
	      if (!noAssert) {
	        var maxBytes = Math.pow(2, 8 * byteLength) - 1;
	        checkInt(this, value, offset, byteLength, maxBytes, 0);
	      }

	      var mul = 1;
	      var i = 0;
	      this[offset] = value & 0xFF;
	      while (++i < byteLength && (mul *= 0x100)) {
	        this[offset + i] = (value / mul) & 0xFF;
	      }

	      return offset + byteLength
	    };

	    Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	      value = +value;
	      offset = offset | 0;
	      byteLength = byteLength | 0;
	      if (!noAssert) {
	        var maxBytes = Math.pow(2, 8 * byteLength) - 1;
	        checkInt(this, value, offset, byteLength, maxBytes, 0);
	      }

	      var i = byteLength - 1;
	      var mul = 1;
	      this[offset + i] = value & 0xFF;
	      while (--i >= 0 && (mul *= 0x100)) {
	        this[offset + i] = (value / mul) & 0xFF;
	      }

	      return offset + byteLength
	    };

	    Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	      value = +value;
	      offset = offset | 0;
	      if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
	      if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	      this[offset] = (value & 0xff);
	      return offset + 1
	    };

	    function objectWriteUInt16 (buf, value, offset, littleEndian) {
	      if (value < 0) value = 0xffff + value + 1;
	      for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	        buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	          (littleEndian ? i : 1 - i) * 8;
	      }
	    }

	    Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	      value = +value;
	      offset = offset | 0;
	      if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	      if (Buffer.TYPED_ARRAY_SUPPORT) {
	        this[offset] = (value & 0xff);
	        this[offset + 1] = (value >>> 8);
	      } else {
	        objectWriteUInt16(this, value, offset, true);
	      }
	      return offset + 2
	    };

	    Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	      value = +value;
	      offset = offset | 0;
	      if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	      if (Buffer.TYPED_ARRAY_SUPPORT) {
	        this[offset] = (value >>> 8);
	        this[offset + 1] = (value & 0xff);
	      } else {
	        objectWriteUInt16(this, value, offset, false);
	      }
	      return offset + 2
	    };

	    function objectWriteUInt32 (buf, value, offset, littleEndian) {
	      if (value < 0) value = 0xffffffff + value + 1;
	      for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	        buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
	      }
	    }

	    Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	      value = +value;
	      offset = offset | 0;
	      if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	      if (Buffer.TYPED_ARRAY_SUPPORT) {
	        this[offset + 3] = (value >>> 24);
	        this[offset + 2] = (value >>> 16);
	        this[offset + 1] = (value >>> 8);
	        this[offset] = (value & 0xff);
	      } else {
	        objectWriteUInt32(this, value, offset, true);
	      }
	      return offset + 4
	    };

	    Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	      value = +value;
	      offset = offset | 0;
	      if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	      if (Buffer.TYPED_ARRAY_SUPPORT) {
	        this[offset] = (value >>> 24);
	        this[offset + 1] = (value >>> 16);
	        this[offset + 2] = (value >>> 8);
	        this[offset + 3] = (value & 0xff);
	      } else {
	        objectWriteUInt32(this, value, offset, false);
	      }
	      return offset + 4
	    };

	    Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	      value = +value;
	      offset = offset | 0;
	      if (!noAssert) {
	        var limit = Math.pow(2, 8 * byteLength - 1);

	        checkInt(this, value, offset, byteLength, limit - 1, -limit);
	      }

	      var i = 0;
	      var mul = 1;
	      var sub = 0;
	      this[offset] = value & 0xFF;
	      while (++i < byteLength && (mul *= 0x100)) {
	        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	          sub = 1;
	        }
	        this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
	      }

	      return offset + byteLength
	    };

	    Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	      value = +value;
	      offset = offset | 0;
	      if (!noAssert) {
	        var limit = Math.pow(2, 8 * byteLength - 1);

	        checkInt(this, value, offset, byteLength, limit - 1, -limit);
	      }

	      var i = byteLength - 1;
	      var mul = 1;
	      var sub = 0;
	      this[offset + i] = value & 0xFF;
	      while (--i >= 0 && (mul *= 0x100)) {
	        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	          sub = 1;
	        }
	        this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
	      }

	      return offset + byteLength
	    };

	    Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	      value = +value;
	      offset = offset | 0;
	      if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
	      if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	      if (value < 0) value = 0xff + value + 1;
	      this[offset] = (value & 0xff);
	      return offset + 1
	    };

	    Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	      value = +value;
	      offset = offset | 0;
	      if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	      if (Buffer.TYPED_ARRAY_SUPPORT) {
	        this[offset] = (value & 0xff);
	        this[offset + 1] = (value >>> 8);
	      } else {
	        objectWriteUInt16(this, value, offset, true);
	      }
	      return offset + 2
	    };

	    Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	      value = +value;
	      offset = offset | 0;
	      if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	      if (Buffer.TYPED_ARRAY_SUPPORT) {
	        this[offset] = (value >>> 8);
	        this[offset + 1] = (value & 0xff);
	      } else {
	        objectWriteUInt16(this, value, offset, false);
	      }
	      return offset + 2
	    };

	    Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	      value = +value;
	      offset = offset | 0;
	      if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	      if (Buffer.TYPED_ARRAY_SUPPORT) {
	        this[offset] = (value & 0xff);
	        this[offset + 1] = (value >>> 8);
	        this[offset + 2] = (value >>> 16);
	        this[offset + 3] = (value >>> 24);
	      } else {
	        objectWriteUInt32(this, value, offset, true);
	      }
	      return offset + 4
	    };

	    Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	      value = +value;
	      offset = offset | 0;
	      if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	      if (value < 0) value = 0xffffffff + value + 1;
	      if (Buffer.TYPED_ARRAY_SUPPORT) {
	        this[offset] = (value >>> 24);
	        this[offset + 1] = (value >>> 16);
	        this[offset + 2] = (value >>> 8);
	        this[offset + 3] = (value & 0xff);
	      } else {
	        objectWriteUInt32(this, value, offset, false);
	      }
	      return offset + 4
	    };

	    function checkIEEE754 (buf, value, offset, ext, max, min) {
	      if (offset + ext > buf.length) throw new RangeError('Index out of range')
	      if (offset < 0) throw new RangeError('Index out of range')
	    }

	    function writeFloat (buf, value, offset, littleEndian, noAssert) {
	      if (!noAssert) {
	        checkIEEE754(buf, value, offset, 4);
	      }
	      write(buf, value, offset, littleEndian, 23, 4);
	      return offset + 4
	    }

	    Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	      return writeFloat(this, value, offset, true, noAssert)
	    };

	    Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	      return writeFloat(this, value, offset, false, noAssert)
	    };

	    function writeDouble (buf, value, offset, littleEndian, noAssert) {
	      if (!noAssert) {
	        checkIEEE754(buf, value, offset, 8);
	      }
	      write(buf, value, offset, littleEndian, 52, 8);
	      return offset + 8
	    }

	    Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	      return writeDouble(this, value, offset, true, noAssert)
	    };

	    Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	      return writeDouble(this, value, offset, false, noAssert)
	    };

	    // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	    Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	      if (!start) start = 0;
	      if (!end && end !== 0) end = this.length;
	      if (targetStart >= target.length) targetStart = target.length;
	      if (!targetStart) targetStart = 0;
	      if (end > 0 && end < start) end = start;

	      // Copy 0 bytes; we're done
	      if (end === start) return 0
	      if (target.length === 0 || this.length === 0) return 0

	      // Fatal error conditions
	      if (targetStart < 0) {
	        throw new RangeError('targetStart out of bounds')
	      }
	      if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	      if (end < 0) throw new RangeError('sourceEnd out of bounds')

	      // Are we oob?
	      if (end > this.length) end = this.length;
	      if (target.length - targetStart < end - start) {
	        end = target.length - targetStart + start;
	      }

	      var len = end - start;
	      var i;

	      if (this === target && start < targetStart && targetStart < end) {
	        // descending copy from end
	        for (i = len - 1; i >= 0; --i) {
	          target[i + targetStart] = this[i + start];
	        }
	      } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	        // ascending copy from start
	        for (i = 0; i < len; ++i) {
	          target[i + targetStart] = this[i + start];
	        }
	      } else {
	        Uint8Array.prototype.set.call(
	          target,
	          this.subarray(start, start + len),
	          targetStart
	        );
	      }

	      return len
	    };

	    // Usage:
	    //    buffer.fill(number[, offset[, end]])
	    //    buffer.fill(buffer[, offset[, end]])
	    //    buffer.fill(string[, offset[, end]][, encoding])
	    Buffer.prototype.fill = function fill (val, start, end, encoding) {
	      // Handle string cases:
	      if (typeof val === 'string') {
	        if (typeof start === 'string') {
	          encoding = start;
	          start = 0;
	          end = this.length;
	        } else if (typeof end === 'string') {
	          encoding = end;
	          end = this.length;
	        }
	        if (val.length === 1) {
	          var code = val.charCodeAt(0);
	          if (code < 256) {
	            val = code;
	          }
	        }
	        if (encoding !== undefined && typeof encoding !== 'string') {
	          throw new TypeError('encoding must be a string')
	        }
	        if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	          throw new TypeError('Unknown encoding: ' + encoding)
	        }
	      } else if (typeof val === 'number') {
	        val = val & 255;
	      }

	      // Invalid ranges are not set to a default, so can range check early.
	      if (start < 0 || this.length < start || this.length < end) {
	        throw new RangeError('Out of range index')
	      }

	      if (end <= start) {
	        return this
	      }

	      start = start >>> 0;
	      end = end === undefined ? this.length : end >>> 0;

	      if (!val) val = 0;

	      var i;
	      if (typeof val === 'number') {
	        for (i = start; i < end; ++i) {
	          this[i] = val;
	        }
	      } else {
	        var bytes = internalIsBuffer(val)
	          ? val
	          : utf8ToBytes(new Buffer(val, encoding).toString());
	        var len = bytes.length;
	        for (i = 0; i < end - start; ++i) {
	          this[i + start] = bytes[i % len];
	        }
	      }

	      return this
	    };

	    // HELPER FUNCTIONS
	    // ================

	    var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

	    function base64clean (str) {
	      // Node strips out invalid characters like \n and \t from the string, base64-js does not
	      str = stringtrim(str).replace(INVALID_BASE64_RE, '');
	      // Node converts strings with length < 2 to ''
	      if (str.length < 2) return ''
	      // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	      while (str.length % 4 !== 0) {
	        str = str + '=';
	      }
	      return str
	    }

	    function stringtrim (str) {
	      if (str.trim) return str.trim()
	      return str.replace(/^\s+|\s+$/g, '')
	    }

	    function toHex (n) {
	      if (n < 16) return '0' + n.toString(16)
	      return n.toString(16)
	    }

	    function utf8ToBytes (string, units) {
	      units = units || Infinity;
	      var codePoint;
	      var length = string.length;
	      var leadSurrogate = null;
	      var bytes = [];

	      for (var i = 0; i < length; ++i) {
	        codePoint = string.charCodeAt(i);

	        // is surrogate component
	        if (codePoint > 0xD7FF && codePoint < 0xE000) {
	          // last char was a lead
	          if (!leadSurrogate) {
	            // no lead yet
	            if (codePoint > 0xDBFF) {
	              // unexpected trail
	              if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	              continue
	            } else if (i + 1 === length) {
	              // unpaired lead
	              if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	              continue
	            }

	            // valid lead
	            leadSurrogate = codePoint;

	            continue
	          }

	          // 2 leads in a row
	          if (codePoint < 0xDC00) {
	            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	            leadSurrogate = codePoint;
	            continue
	          }

	          // valid surrogate pair
	          codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
	        } else if (leadSurrogate) {
	          // valid bmp char, but last char was a lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	        }

	        leadSurrogate = null;

	        // encode utf8
	        if (codePoint < 0x80) {
	          if ((units -= 1) < 0) break
	          bytes.push(codePoint);
	        } else if (codePoint < 0x800) {
	          if ((units -= 2) < 0) break
	          bytes.push(
	            codePoint >> 0x6 | 0xC0,
	            codePoint & 0x3F | 0x80
	          );
	        } else if (codePoint < 0x10000) {
	          if ((units -= 3) < 0) break
	          bytes.push(
	            codePoint >> 0xC | 0xE0,
	            codePoint >> 0x6 & 0x3F | 0x80,
	            codePoint & 0x3F | 0x80
	          );
	        } else if (codePoint < 0x110000) {
	          if ((units -= 4) < 0) break
	          bytes.push(
	            codePoint >> 0x12 | 0xF0,
	            codePoint >> 0xC & 0x3F | 0x80,
	            codePoint >> 0x6 & 0x3F | 0x80,
	            codePoint & 0x3F | 0x80
	          );
	        } else {
	          throw new Error('Invalid code point')
	        }
	      }

	      return bytes
	    }

	    function asciiToBytes (str) {
	      var byteArray = [];
	      for (var i = 0; i < str.length; ++i) {
	        // Node's code seems to be doing this and not & 0x7F..
	        byteArray.push(str.charCodeAt(i) & 0xFF);
	      }
	      return byteArray
	    }

	    function utf16leToBytes (str, units) {
	      var c, hi, lo;
	      var byteArray = [];
	      for (var i = 0; i < str.length; ++i) {
	        if ((units -= 2) < 0) break

	        c = str.charCodeAt(i);
	        hi = c >> 8;
	        lo = c % 256;
	        byteArray.push(lo);
	        byteArray.push(hi);
	      }

	      return byteArray
	    }


	    function base64ToBytes (str) {
	      return toByteArray(base64clean(str))
	    }

	    function blitBuffer (src, dst, offset, length) {
	      for (var i = 0; i < length; ++i) {
	        if ((i + offset >= dst.length) || (i >= src.length)) break
	        dst[i + offset] = src[i];
	      }
	      return i
	    }

	    function isnan (val) {
	      return val !== val // eslint-disable-line no-self-compare
	    }


	    // the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
	    // The _isBuffer check is for Safari 5-7 support, because it's missing
	    // Object.prototype.constructor. Remove this eventually
	    function isBuffer(obj) {
	      return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
	    }

	    function isFastBuffer (obj) {
	      return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	    }

	    // For Node v0.10 support. Remove this eventually.
	    function isSlowBuffer (obj) {
	      return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
	    }

	    function isNull(arg) {
	      return arg === null;
	    }

	    function isNullOrUndefined(arg) {
	      return arg == null;
	    }

	    function isString(arg) {
	      return typeof arg === 'string';
	    }

	    function isObject(arg) {
	      return typeof arg === 'object' && arg !== null;
	    }

	    // Copyright Joyent, Inc. and other Node contributors.
	    //
	    // Permission is hereby granted, free of charge, to any person obtaining a
	    // copy of this software and associated documentation files (the
	    // "Software"), to deal in the Software without restriction, including
	    // without limitation the rights to use, copy, modify, merge, publish,
	    // distribute, sublicense, and/or sell copies of the Software, and to permit
	    // persons to whom the Software is furnished to do so, subject to the
	    // following conditions:
	    //
	    // The above copyright notice and this permission notice shall be included
	    // in all copies or substantial portions of the Software.
	    //
	    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	    // USE OR OTHER DEALINGS IN THE SOFTWARE.


	    // If obj.hasOwnProperty has been overridden, then calling
	    // obj.hasOwnProperty(prop) will break.
	    // See: https://github.com/joyent/node/issues/1707
	    function hasOwnProperty(obj, prop) {
	      return Object.prototype.hasOwnProperty.call(obj, prop);
	    }
	    var isArray$1 = Array.isArray || function (xs) {
	      return Object.prototype.toString.call(xs) === '[object Array]';
	    };
	    function stringifyPrimitive(v) {
	      switch (typeof v) {
	        case 'string':
	          return v;

	        case 'boolean':
	          return v ? 'true' : 'false';

	        case 'number':
	          return isFinite(v) ? v : '';

	        default:
	          return '';
	      }
	    }

	    function stringify (obj, sep, eq, name) {
	      sep = sep || '&';
	      eq = eq || '=';
	      if (obj === null) {
	        obj = undefined;
	      }

	      if (typeof obj === 'object') {
	        return map$1(objectKeys(obj), function(k) {
	          var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	          if (isArray$1(obj[k])) {
	            return map$1(obj[k], function(v) {
	              return ks + encodeURIComponent(stringifyPrimitive(v));
	            }).join(sep);
	          } else {
	            return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	          }
	        }).join(sep);

	      }

	      if (!name) return '';
	      return encodeURIComponent(stringifyPrimitive(name)) + eq +
	             encodeURIComponent(stringifyPrimitive(obj));
	    }
	    function map$1 (xs, f) {
	      if (xs.map) return xs.map(f);
	      var res = [];
	      for (var i = 0; i < xs.length; i++) {
	        res.push(f(xs[i], i));
	      }
	      return res;
	    }

	    var objectKeys = Object.keys || function (obj) {
	      var res = [];
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
	      }
	      return res;
	    };

	    function parse(qs, sep, eq, options) {
	      sep = sep || '&';
	      eq = eq || '=';
	      var obj = {};

	      if (typeof qs !== 'string' || qs.length === 0) {
	        return obj;
	      }

	      var regexp = /\+/g;
	      qs = qs.split(sep);

	      var maxKeys = 1000;
	      if (options && typeof options.maxKeys === 'number') {
	        maxKeys = options.maxKeys;
	      }

	      var len = qs.length;
	      // maxKeys <= 0 means that we should not limit keys count
	      if (maxKeys > 0 && len > maxKeys) {
	        len = maxKeys;
	      }

	      for (var i = 0; i < len; ++i) {
	        var x = qs[i].replace(regexp, '%20'),
	            idx = x.indexOf(eq),
	            kstr, vstr, k, v;

	        if (idx >= 0) {
	          kstr = x.substr(0, idx);
	          vstr = x.substr(idx + 1);
	        } else {
	          kstr = x;
	          vstr = '';
	        }

	        k = decodeURIComponent(kstr);
	        v = decodeURIComponent(vstr);

	        if (!hasOwnProperty(obj, k)) {
	          obj[k] = v;
	        } else if (isArray$1(obj[k])) {
	          obj[k].push(v);
	        } else {
	          obj[k] = [obj[k], v];
	        }
	      }

	      return obj;
	    }

	    // Copyright Joyent, Inc. and other Node contributors.
	    var require$$1 = {
	      parse: urlParse,
	      resolve: urlResolve,
	      resolveObject: urlResolveObject,
	      format: urlFormat,
	      Url: Url
	    };
	    function Url() {
	      this.protocol = null;
	      this.slashes = null;
	      this.auth = null;
	      this.host = null;
	      this.port = null;
	      this.hostname = null;
	      this.hash = null;
	      this.search = null;
	      this.query = null;
	      this.pathname = null;
	      this.path = null;
	      this.href = null;
	    }

	    // Reference: RFC 3986, RFC 1808, RFC 2396

	    // define these here so at least they only have to be
	    // compiled once on the first module load.
	    var protocolPattern = /^([a-z0-9.+-]+:)/i,
	      portPattern = /:[0-9]*$/,

	      // Special case for a simple path URL
	      simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

	      // RFC 2396: characters reserved for delimiting URLs.
	      // We actually just auto-escape these.
	      delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

	      // RFC 2396: characters not allowed for various reasons.
	      unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

	      // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
	      autoEscape = ['\''].concat(unwise),
	      // Characters that are never ever allowed in a hostname.
	      // Note that any invalid chars are also handled, but these
	      // are the ones that are *expected* to be seen, so we fast-path
	      // them.
	      nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
	      hostEndingChars = ['/', '?', '#'],
	      hostnameMaxLen = 255,
	      hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
	      hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
	      // protocols that can allow "unsafe" and "unwise" chars.
	      unsafeProtocol = {
	        'javascript': true,
	        'javascript:': true
	      },
	      // protocols that never have a hostname.
	      hostlessProtocol = {
	        'javascript': true,
	        'javascript:': true
	      },
	      // protocols that always contain a // bit.
	      slashedProtocol = {
	        'http': true,
	        'https': true,
	        'ftp': true,
	        'gopher': true,
	        'file': true,
	        'http:': true,
	        'https:': true,
	        'ftp:': true,
	        'gopher:': true,
	        'file:': true
	      };

	    function urlParse(url, parseQueryString, slashesDenoteHost) {
	      if (url && isObject(url) && url instanceof Url) return url;

	      var u = new Url;
	      u.parse(url, parseQueryString, slashesDenoteHost);
	      return u;
	    }
	    Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
	      return parse$1(this, url, parseQueryString, slashesDenoteHost);
	    };

	    function parse$1(self, url, parseQueryString, slashesDenoteHost) {
	      if (!isString(url)) {
	        throw new TypeError('Parameter \'url\' must be a string, not ' + typeof url);
	      }

	      // Copy chrome, IE, opera backslash-handling behavior.
	      // Back slashes before the query string get converted to forward slashes
	      // See: https://code.google.com/p/chromium/issues/detail?id=25916
	      var queryIndex = url.indexOf('?'),
	        splitter =
	        (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
	        uSplit = url.split(splitter),
	        slashRegex = /\\/g;
	      uSplit[0] = uSplit[0].replace(slashRegex, '/');
	      url = uSplit.join(splitter);

	      var rest = url;

	      // trim before proceeding.
	      // This is to support parse stuff like "  http://foo.com  \n"
	      rest = rest.trim();

	      if (!slashesDenoteHost && url.split('#').length === 1) {
	        // Try fast path regexp
	        var simplePath = simplePathPattern.exec(rest);
	        if (simplePath) {
	          self.path = rest;
	          self.href = rest;
	          self.pathname = simplePath[1];
	          if (simplePath[2]) {
	            self.search = simplePath[2];
	            if (parseQueryString) {
	              self.query = parse(self.search.substr(1));
	            } else {
	              self.query = self.search.substr(1);
	            }
	          } else if (parseQueryString) {
	            self.search = '';
	            self.query = {};
	          }
	          return self;
	        }
	      }

	      var proto = protocolPattern.exec(rest);
	      if (proto) {
	        proto = proto[0];
	        var lowerProto = proto.toLowerCase();
	        self.protocol = lowerProto;
	        rest = rest.substr(proto.length);
	      }

	      // figure out if it's got a host
	      // user@server is *always* interpreted as a hostname, and url
	      // resolution will treat //foo/bar as host=foo,path=bar because that's
	      // how the browser resolves relative URLs.
	      if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
	        var slashes = rest.substr(0, 2) === '//';
	        if (slashes && !(proto && hostlessProtocol[proto])) {
	          rest = rest.substr(2);
	          self.slashes = true;
	        }
	      }
	      var i, hec, l, p;
	      if (!hostlessProtocol[proto] &&
	        (slashes || (proto && !slashedProtocol[proto]))) {

	        // there's a hostname.
	        // the first instance of /, ?, ;, or # ends the host.
	        //
	        // If there is an @ in the hostname, then non-host chars *are* allowed
	        // to the left of the last @ sign, unless some host-ending character
	        // comes *before* the @-sign.
	        // URLs are obnoxious.
	        //
	        // ex:
	        // http://a@b@c/ => user:a@b host:c
	        // http://a@b?@c => user:a host:c path:/?@c

	        // v0.12 TODO(isaacs): This is not quite how Chrome does things.
	        // Review our test case against browsers more comprehensively.

	        // find the first instance of any hostEndingChars
	        var hostEnd = -1;
	        for (i = 0; i < hostEndingChars.length; i++) {
	          hec = rest.indexOf(hostEndingChars[i]);
	          if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	            hostEnd = hec;
	        }

	        // at this point, either we have an explicit point where the
	        // auth portion cannot go past, or the last @ char is the decider.
	        var auth, atSign;
	        if (hostEnd === -1) {
	          // atSign can be anywhere.
	          atSign = rest.lastIndexOf('@');
	        } else {
	          // atSign must be in auth portion.
	          // http://a@b/c@d => host:b auth:a path:/c@d
	          atSign = rest.lastIndexOf('@', hostEnd);
	        }

	        // Now we have a portion which is definitely the auth.
	        // Pull that off.
	        if (atSign !== -1) {
	          auth = rest.slice(0, atSign);
	          rest = rest.slice(atSign + 1);
	          self.auth = decodeURIComponent(auth);
	        }

	        // the host is the remaining to the left of the first non-host char
	        hostEnd = -1;
	        for (i = 0; i < nonHostChars.length; i++) {
	          hec = rest.indexOf(nonHostChars[i]);
	          if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	            hostEnd = hec;
	        }
	        // if we still have not hit it, then the entire thing is a host.
	        if (hostEnd === -1)
	          hostEnd = rest.length;

	        self.host = rest.slice(0, hostEnd);
	        rest = rest.slice(hostEnd);

	        // pull out port.
	        parseHost(self);

	        // we've indicated that there is a hostname,
	        // so even if it's empty, it has to be present.
	        self.hostname = self.hostname || '';

	        // if hostname begins with [ and ends with ]
	        // assume that it's an IPv6 address.
	        var ipv6Hostname = self.hostname[0] === '[' &&
	          self.hostname[self.hostname.length - 1] === ']';

	        // validate a little.
	        if (!ipv6Hostname) {
	          var hostparts = self.hostname.split(/\./);
	          for (i = 0, l = hostparts.length; i < l; i++) {
	            var part = hostparts[i];
	            if (!part) continue;
	            if (!part.match(hostnamePartPattern)) {
	              var newpart = '';
	              for (var j = 0, k = part.length; j < k; j++) {
	                if (part.charCodeAt(j) > 127) {
	                  // we replace non-ASCII char with a temporary placeholder
	                  // we need this to make sure size of hostname is not
	                  // broken by replacing non-ASCII by nothing
	                  newpart += 'x';
	                } else {
	                  newpart += part[j];
	                }
	              }
	              // we test again with ASCII char only
	              if (!newpart.match(hostnamePartPattern)) {
	                var validParts = hostparts.slice(0, i);
	                var notHost = hostparts.slice(i + 1);
	                var bit = part.match(hostnamePartStart);
	                if (bit) {
	                  validParts.push(bit[1]);
	                  notHost.unshift(bit[2]);
	                }
	                if (notHost.length) {
	                  rest = '/' + notHost.join('.') + rest;
	                }
	                self.hostname = validParts.join('.');
	                break;
	              }
	            }
	          }
	        }

	        if (self.hostname.length > hostnameMaxLen) {
	          self.hostname = '';
	        } else {
	          // hostnames are always lower case.
	          self.hostname = self.hostname.toLowerCase();
	        }

	        if (!ipv6Hostname) {
	          // IDNA Support: Returns a punycoded representation of "domain".
	          // It only converts parts of the domain name that
	          // have non-ASCII characters, i.e. it doesn't matter if
	          // you call it with a domain that already is ASCII-only.
	          self.hostname = toASCII(self.hostname);
	        }

	        p = self.port ? ':' + self.port : '';
	        var h = self.hostname || '';
	        self.host = h + p;
	        self.href += self.host;

	        // strip [ and ] from the hostname
	        // the host field still retains them, though
	        if (ipv6Hostname) {
	          self.hostname = self.hostname.substr(1, self.hostname.length - 2);
	          if (rest[0] !== '/') {
	            rest = '/' + rest;
	          }
	        }
	      }

	      // now rest is set to the post-host stuff.
	      // chop off any delim chars.
	      if (!unsafeProtocol[lowerProto]) {

	        // First, make 100% sure that any "autoEscape" chars get
	        // escaped, even if encodeURIComponent doesn't think they
	        // need to be.
	        for (i = 0, l = autoEscape.length; i < l; i++) {
	          var ae = autoEscape[i];
	          if (rest.indexOf(ae) === -1)
	            continue;
	          var esc = encodeURIComponent(ae);
	          if (esc === ae) {
	            esc = escape(ae);
	          }
	          rest = rest.split(ae).join(esc);
	        }
	      }


	      // chop off from the tail first.
	      var hash = rest.indexOf('#');
	      if (hash !== -1) {
	        // got a fragment string.
	        self.hash = rest.substr(hash);
	        rest = rest.slice(0, hash);
	      }
	      var qm = rest.indexOf('?');
	      if (qm !== -1) {
	        self.search = rest.substr(qm);
	        self.query = rest.substr(qm + 1);
	        if (parseQueryString) {
	          self.query = parse(self.query);
	        }
	        rest = rest.slice(0, qm);
	      } else if (parseQueryString) {
	        // no query string, but parseQueryString still requested
	        self.search = '';
	        self.query = {};
	      }
	      if (rest) self.pathname = rest;
	      if (slashedProtocol[lowerProto] &&
	        self.hostname && !self.pathname) {
	        self.pathname = '/';
	      }

	      //to support http.request
	      if (self.pathname || self.search) {
	        p = self.pathname || '';
	        var s = self.search || '';
	        self.path = p + s;
	      }

	      // finally, reconstruct the href based on what has been validated.
	      self.href = format(self);
	      return self;
	    }

	    // format a parsed object into a url string
	    function urlFormat(obj) {
	      // ensure it's an object, and not a string url.
	      // If it's an obj, this is a no-op.
	      // this way, you can call url_format() on strings
	      // to clean up potentially wonky urls.
	      if (isString(obj)) obj = parse$1({}, obj);
	      return format(obj);
	    }

	    function format(self) {
	      var auth = self.auth || '';
	      if (auth) {
	        auth = encodeURIComponent(auth);
	        auth = auth.replace(/%3A/i, ':');
	        auth += '@';
	      }

	      var protocol = self.protocol || '',
	        pathname = self.pathname || '',
	        hash = self.hash || '',
	        host = false,
	        query = '';

	      if (self.host) {
	        host = auth + self.host;
	      } else if (self.hostname) {
	        host = auth + (self.hostname.indexOf(':') === -1 ?
	          self.hostname :
	          '[' + this.hostname + ']');
	        if (self.port) {
	          host += ':' + self.port;
	        }
	      }

	      if (self.query &&
	        isObject(self.query) &&
	        Object.keys(self.query).length) {
	        query = stringify(self.query);
	      }

	      var search = self.search || (query && ('?' + query)) || '';

	      if (protocol && protocol.substr(-1) !== ':') protocol += ':';

	      // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
	      // unless they had them to begin with.
	      if (self.slashes ||
	        (!protocol || slashedProtocol[protocol]) && host !== false) {
	        host = '//' + (host || '');
	        if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
	      } else if (!host) {
	        host = '';
	      }

	      if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
	      if (search && search.charAt(0) !== '?') search = '?' + search;

	      pathname = pathname.replace(/[?#]/g, function(match) {
	        return encodeURIComponent(match);
	      });
	      search = search.replace('#', '%23');

	      return protocol + host + pathname + search + hash;
	    }

	    Url.prototype.format = function() {
	      return format(this);
	    };

	    function urlResolve(source, relative) {
	      return urlParse(source, false, true).resolve(relative);
	    }

	    Url.prototype.resolve = function(relative) {
	      return this.resolveObject(urlParse(relative, false, true)).format();
	    };

	    function urlResolveObject(source, relative) {
	      if (!source) return relative;
	      return urlParse(source, false, true).resolveObject(relative);
	    }

	    Url.prototype.resolveObject = function(relative) {
	      if (isString(relative)) {
	        var rel = new Url();
	        rel.parse(relative, false, true);
	        relative = rel;
	      }

	      var result = new Url();
	      var tkeys = Object.keys(this);
	      for (var tk = 0; tk < tkeys.length; tk++) {
	        var tkey = tkeys[tk];
	        result[tkey] = this[tkey];
	      }

	      // hash is always overridden, no matter what.
	      // even href="" will remove it.
	      result.hash = relative.hash;

	      // if the relative url is empty, then there's nothing left to do here.
	      if (relative.href === '') {
	        result.href = result.format();
	        return result;
	      }

	      // hrefs like //foo/bar always cut to the protocol.
	      if (relative.slashes && !relative.protocol) {
	        // take everything except the protocol from relative
	        var rkeys = Object.keys(relative);
	        for (var rk = 0; rk < rkeys.length; rk++) {
	          var rkey = rkeys[rk];
	          if (rkey !== 'protocol')
	            result[rkey] = relative[rkey];
	        }

	        //urlParse appends trailing / to urls like http://www.example.com
	        if (slashedProtocol[result.protocol] &&
	          result.hostname && !result.pathname) {
	          result.path = result.pathname = '/';
	        }

	        result.href = result.format();
	        return result;
	      }
	      var relPath;
	      if (relative.protocol && relative.protocol !== result.protocol) {
	        // if it's a known url protocol, then changing
	        // the protocol does weird things
	        // first, if it's not file:, then we MUST have a host,
	        // and if there was a path
	        // to begin with, then we MUST have a path.
	        // if it is file:, then the host is dropped,
	        // because that's known to be hostless.
	        // anything else is assumed to be absolute.
	        if (!slashedProtocol[relative.protocol]) {
	          var keys = Object.keys(relative);
	          for (var v = 0; v < keys.length; v++) {
	            var k = keys[v];
	            result[k] = relative[k];
	          }
	          result.href = result.format();
	          return result;
	        }

	        result.protocol = relative.protocol;
	        if (!relative.host && !hostlessProtocol[relative.protocol]) {
	          relPath = (relative.pathname || '').split('/');
	          while (relPath.length && !(relative.host = relPath.shift()));
	          if (!relative.host) relative.host = '';
	          if (!relative.hostname) relative.hostname = '';
	          if (relPath[0] !== '') relPath.unshift('');
	          if (relPath.length < 2) relPath.unshift('');
	          result.pathname = relPath.join('/');
	        } else {
	          result.pathname = relative.pathname;
	        }
	        result.search = relative.search;
	        result.query = relative.query;
	        result.host = relative.host || '';
	        result.auth = relative.auth;
	        result.hostname = relative.hostname || relative.host;
	        result.port = relative.port;
	        // to support http.request
	        if (result.pathname || result.search) {
	          var p = result.pathname || '';
	          var s = result.search || '';
	          result.path = p + s;
	        }
	        result.slashes = result.slashes || relative.slashes;
	        result.href = result.format();
	        return result;
	      }

	      var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
	        isRelAbs = (
	          relative.host ||
	          relative.pathname && relative.pathname.charAt(0) === '/'
	        ),
	        mustEndAbs = (isRelAbs || isSourceAbs ||
	          (result.host && relative.pathname)),
	        removeAllDots = mustEndAbs,
	        srcPath = result.pathname && result.pathname.split('/') || [],
	        psychotic = result.protocol && !slashedProtocol[result.protocol];
	      relPath = relative.pathname && relative.pathname.split('/') || [];
	      // if the url is a non-slashed url, then relative
	      // links like ../.. should be able
	      // to crawl up to the hostname, as well.  This is strange.
	      // result.protocol has already been set by now.
	      // Later on, put the first path part into the host field.
	      if (psychotic) {
	        result.hostname = '';
	        result.port = null;
	        if (result.host) {
	          if (srcPath[0] === '') srcPath[0] = result.host;
	          else srcPath.unshift(result.host);
	        }
	        result.host = '';
	        if (relative.protocol) {
	          relative.hostname = null;
	          relative.port = null;
	          if (relative.host) {
	            if (relPath[0] === '') relPath[0] = relative.host;
	            else relPath.unshift(relative.host);
	          }
	          relative.host = null;
	        }
	        mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
	      }
	      var authInHost;
	      if (isRelAbs) {
	        // it's absolute.
	        result.host = (relative.host || relative.host === '') ?
	          relative.host : result.host;
	        result.hostname = (relative.hostname || relative.hostname === '') ?
	          relative.hostname : result.hostname;
	        result.search = relative.search;
	        result.query = relative.query;
	        srcPath = relPath;
	        // fall through to the dot-handling below.
	      } else if (relPath.length) {
	        // it's relative
	        // throw away the existing file, and take the new path instead.
	        if (!srcPath) srcPath = [];
	        srcPath.pop();
	        srcPath = srcPath.concat(relPath);
	        result.search = relative.search;
	        result.query = relative.query;
	      } else if (!isNullOrUndefined(relative.search)) {
	        // just pull out the search.
	        // like href='?foo'.
	        // Put this after the other two cases because it simplifies the booleans
	        if (psychotic) {
	          result.hostname = result.host = srcPath.shift();
	          //occationaly the auth can get stuck only in host
	          //this especially happens in cases like
	          //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	          authInHost = result.host && result.host.indexOf('@') > 0 ?
	            result.host.split('@') : false;
	          if (authInHost) {
	            result.auth = authInHost.shift();
	            result.host = result.hostname = authInHost.shift();
	          }
	        }
	        result.search = relative.search;
	        result.query = relative.query;
	        //to support http.request
	        if (!isNull(result.pathname) || !isNull(result.search)) {
	          result.path = (result.pathname ? result.pathname : '') +
	            (result.search ? result.search : '');
	        }
	        result.href = result.format();
	        return result;
	      }

	      if (!srcPath.length) {
	        // no path at all.  easy.
	        // we've already handled the other stuff above.
	        result.pathname = null;
	        //to support http.request
	        if (result.search) {
	          result.path = '/' + result.search;
	        } else {
	          result.path = null;
	        }
	        result.href = result.format();
	        return result;
	      }

	      // if a url ENDs in . or .., then it must get a trailing slash.
	      // however, if it ends in anything else non-slashy,
	      // then it must NOT get a trailing slash.
	      var last = srcPath.slice(-1)[0];
	      var hasTrailingSlash = (
	        (result.host || relative.host || srcPath.length > 1) &&
	        (last === '.' || last === '..') || last === '');

	      // strip single dots, resolve double dots to parent dir
	      // if the path tries to go above the root, `up` ends up > 0
	      var up = 0;
	      for (var i = srcPath.length; i >= 0; i--) {
	        last = srcPath[i];
	        if (last === '.') {
	          srcPath.splice(i, 1);
	        } else if (last === '..') {
	          srcPath.splice(i, 1);
	          up++;
	        } else if (up) {
	          srcPath.splice(i, 1);
	          up--;
	        }
	      }

	      // if the path is allowed to go above the root, restore leading ..s
	      if (!mustEndAbs && !removeAllDots) {
	        for (; up--; up) {
	          srcPath.unshift('..');
	        }
	      }

	      if (mustEndAbs && srcPath[0] !== '' &&
	        (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
	        srcPath.unshift('');
	      }

	      if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
	        srcPath.push('');
	      }

	      var isAbsolute = srcPath[0] === '' ||
	        (srcPath[0] && srcPath[0].charAt(0) === '/');

	      // put the host back
	      if (psychotic) {
	        result.hostname = result.host = isAbsolute ? '' :
	          srcPath.length ? srcPath.shift() : '';
	        //occationaly the auth can get stuck only in host
	        //this especially happens in cases like
	        //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	        authInHost = result.host && result.host.indexOf('@') > 0 ?
	          result.host.split('@') : false;
	        if (authInHost) {
	          result.auth = authInHost.shift();
	          result.host = result.hostname = authInHost.shift();
	        }
	      }

	      mustEndAbs = mustEndAbs || (result.host && srcPath.length);

	      if (mustEndAbs && !isAbsolute) {
	        srcPath.unshift('');
	      }

	      if (!srcPath.length) {
	        result.pathname = null;
	        result.path = null;
	      } else {
	        result.pathname = srcPath.join('/');
	      }

	      //to support request.http
	      if (!isNull(result.pathname) || !isNull(result.search)) {
	        result.path = (result.pathname ? result.pathname : '') +
	          (result.search ? result.search : '');
	      }
	      result.auth = relative.auth || result.auth;
	      result.slashes = result.slashes || relative.slashes;
	      result.href = result.format();
	      return result;
	    };

	    Url.prototype.parseHost = function() {
	      return parseHost(this);
	    };

	    function parseHost(self) {
	      var host = self.host;
	      var port = portPattern.exec(host);
	      if (port) {
	        port = port[0];
	        if (port !== ':') {
	          self.port = port.substr(1);
	        }
	        host = host.substr(0, host.length - port.length);
	      }
	      if (host) self.hostname = host;
	    }

	    var source = createCommonjsModule(function (module) {
	    module.exports=function(e){var t={};function r(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a});},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0});},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(a,n,function(t){return e[t]}.bind(null,n));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=4)}([function(e,t,r){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(r(1)),i=r(8),o=r(2),s=r(16);t.validatorSymbol=Symbol("validators");t.Predicate=class{constructor(e,t={}){this.type=e,this.options=t,this.context={validators:[]},this.context=Object.assign({},this.context,this.options);const r=this.type[0].toLowerCase()+this.type.slice(1);this.addValidator({message:(e,t)=>`Expected ${t&&t.substring(this.type.length+1)||"argument"} to be of type \`${this.type}\` but received type \`${n.default(e)}\``,validator:e=>n.default[r](e)});}[o.testSymbol](e,t,r){for(const{validator:a,message:n}of this.context.validators){if(!0===this.options.optional&&void 0===e)continue;const o=a(e);if(!0===o)continue;let s=r;throw"function"==typeof r&&(s=r()),s=s?`${this.type} \`${s}\``:this.type,new i.ArgumentError(n(e,s,o),t)}}get[t.validatorSymbol](){return this.context.validators}get not(){return s.not(this)}validate(e){return this.addValidator({message:(e,t,r)=>"string"==typeof r?`(${t}) ${r}`:r(t),validator:t=>{const{message:r,validator:a}=e(t);return !!a||r}})}is(e){return this.addValidator({message:(e,t,r)=>r?`(${t}) ${r}`:`Expected ${t} \`${e}\` to pass custom validation function`,validator:e})}addValidator(e){return this.context.validators.push(e),this}};},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const a="undefined"==typeof URL?r(15).URL:URL,{toString:n}=Object.prototype,i=e=>t=>typeof t===e,o=e=>{const t=n.call(e).slice(8,-1);if(t)return t},s=e=>t=>o(t)===e;function d(e){switch(e){case null:return "null";case!0:case!1:return "boolean"}switch(typeof e){case"undefined":return "undefined";case"string":return "string";case"number":return "number";case"bigint":return "bigint";case"symbol":return "symbol"}if(d.function_(e))return "Function";if(d.observable(e))return "Observable";if(d.array(e))return "Array";if(d.buffer(e))return "Buffer";const t=o(e);if(t)return t;if(e instanceof String||e instanceof Boolean||e instanceof Number)throw new TypeError("Please don't use object wrappers for primitive types");return "Object"}const u=e=>"object"==typeof e;d.undefined=i("undefined"),d.string=i("string"),d.number=i("number"),d.bigint=i("bigint"),d.function_=i("function"),d.null_=(e=>null===e),d.class_=(e=>d.function_(e)&&e.toString().startsWith("class ")),d.boolean=(e=>!0===e||!1===e),d.symbol=i("symbol"),d.numericString=(e=>d.string(e)&&e.length>0&&!Number.isNaN(Number(e))),d.array=Array.isArray,d.buffer=(e=>!d.nullOrUndefined(e)&&!d.nullOrUndefined(e.constructor)&&d.function_(e.constructor.isBuffer)&&e.constructor.isBuffer(e)),d.nullOrUndefined=(e=>d.null_(e)||d.undefined(e)),d.object=(e=>!d.nullOrUndefined(e)&&(d.function_(e)||u(e))),d.iterable=(e=>!d.nullOrUndefined(e)&&d.function_(e[Symbol.iterator])),d.asyncIterable=(e=>!d.nullOrUndefined(e)&&d.function_(e[Symbol.asyncIterator])),d.generator=(e=>d.iterable(e)&&d.function_(e.next)&&d.function_(e.throw)),d.nativePromise=(e=>s("Promise")(e));d.promise=(e=>d.nativePromise(e)||(e=>!d.null_(e)&&u(e)&&d.function_(e.then)&&d.function_(e.catch))(e)),d.generatorFunction=s("GeneratorFunction"),d.asyncFunction=s("AsyncFunction"),d.boundFunction=(e=>d.function_(e)&&!e.hasOwnProperty("prototype")),d.regExp=s("RegExp"),d.date=s("Date"),d.error=s("Error"),d.map=(e=>s("Map")(e)),d.set=(e=>s("Set")(e)),d.weakMap=(e=>s("WeakMap")(e)),d.weakSet=(e=>s("WeakSet")(e)),d.int8Array=s("Int8Array"),d.uint8Array=s("Uint8Array"),d.uint8ClampedArray=s("Uint8ClampedArray"),d.int16Array=s("Int16Array"),d.uint16Array=s("Uint16Array"),d.int32Array=s("Int32Array"),d.uint32Array=s("Uint32Array"),d.float32Array=s("Float32Array"),d.float64Array=s("Float64Array"),d.bigint64Array=s("BigInt64Array"),d.biguint64Array=s("BigUint64Array"),d.arrayBuffer=s("ArrayBuffer"),d.sharedArrayBuffer=s("SharedArrayBuffer"),d.dataView=s("DataView"),d.directInstanceOf=((e,t)=>Object.getPrototypeOf(e)===t.prototype),d.urlInstance=(e=>s("URL")(e)),d.urlString=(e=>{if(!d.string(e))return !1;try{return new a(e),!0}catch(e){return !1}}),d.truthy=(e=>Boolean(e)),d.falsy=(e=>!e),d.nan=(e=>Number.isNaN(e));const c=new Set(["undefined","string","number","bigint","boolean","symbol"]);d.primitive=(e=>d.null_(e)||c.has(typeof e)),d.integer=(e=>Number.isInteger(e)),d.safeInteger=(e=>Number.isSafeInteger(e)),d.plainObject=(e=>{if("Object"!==o(e))return !1;const t=Object.getPrototypeOf(e);return null===t||t===Object.getPrototypeOf({})});const l=new Set(["Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array"]);d.typedArray=(e=>{const t=o(e);return void 0!==t&&l.has(t)});d.arrayLike=(e=>!d.nullOrUndefined(e)&&!d.function_(e)&&(e=>d.safeInteger(e)&&e>=0)(e.length)),d.inRange=((e,t)=>{if(d.number(t))return e>=Math.min(0,t)&&e<=Math.max(t,0);if(d.array(t)&&2===t.length)return e>=Math.min(...t)&&e<=Math.max(...t);throw new TypeError(`Invalid range: ${JSON.stringify(t)}`)});const f=["innerHTML","ownerDocument","style","attributes","nodeValue"];d.domElement=(e=>d.object(e)&&1===e.nodeType&&d.string(e.nodeName)&&!d.plainObject(e)&&f.every(t=>t in e)),d.observable=(e=>!!e&&(!(!e[Symbol.observable]||e!==e[Symbol.observable]())||!(!e["@@observable"]||e!==e["@@observable"]()))),d.nodeStream=(e=>!d.nullOrUndefined(e)&&u(e)&&d.function_(e.pipe)&&!d.observable(e)),d.infinite=(e=>e===1/0||e===-1/0);const p=e=>t=>d.integer(t)&&Math.abs(t%2)===e;d.evenInteger=p(0),d.oddInteger=p(1),d.emptyArray=(e=>d.array(e)&&0===e.length),d.nonEmptyArray=(e=>d.array(e)&&e.length>0),d.emptyString=(e=>d.string(e)&&0===e.length),d.nonEmptyString=(e=>d.string(e)&&e.length>0);d.emptyStringOrWhitespace=(e=>d.emptyString(e)||(e=>d.string(e)&&!1===/\S/.test(e))(e)),d.emptyObject=(e=>d.object(e)&&!d.map(e)&&!d.set(e)&&0===Object.keys(e).length),d.nonEmptyObject=(e=>d.object(e)&&!d.map(e)&&!d.set(e)&&Object.keys(e).length>0),d.emptySet=(e=>d.set(e)&&0===e.size),d.nonEmptySet=(e=>d.set(e)&&e.size>0),d.emptyMap=(e=>d.map(e)&&0===e.size),d.nonEmptyMap=(e=>d.map(e)&&e.size>0);const g=(e,t,r)=>{if(!1===d.function_(t))throw new TypeError(`Invalid predicate: ${JSON.stringify(t)}`);if(0===r.length)throw new TypeError("Invalid number of values");return e.call(r,t)};d.any=((e,...t)=>g(Array.prototype.some,e,t)),d.all=((e,...t)=>g(Array.prototype.every,e,t)),Object.defineProperties(d,{class:{value:d.class_},function:{value:d.function_},null:{value:d.null_}}),e.exports=d,t.default=d;},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.testSymbol=Symbol("test"),t.isPredicate=(e=>Boolean(e&&e[t.testSymbol]));},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.default=((e,t,r=5)=>{const a=[];for(const n of t)if(!e.has(n)&&(a.push(n),a.length===r))return a;return 0===a.length||a});},function(e,t,r){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(r(10)),i=r(11),o=r(0);t.Predicate=o.Predicate;const s=r(2),d=a(r(17)),u=a(r(6)),c=a(r(9)),l=(e,t,r)=>{if(!s.isPredicate(t)&&"string"!=typeof t)throw new TypeError(`Expected second argument to be a predicate or a string, got \`${typeof t}\``);if(s.isPredicate(t)){const r=n.default();c.default(e,()=>i.inferLabel(r),t);}else c.default(e,t,r);};Object.defineProperties(l,{isValid:{value:(e,t)=>{try{return l(e,t),!0}catch(e){return !1}}},create:{value:(e,t)=>r=>{if(s.isPredicate(e)){const t=n.default();c.default(r,()=>i.inferLabel(t),e);}else c.default(r,e,t);}}}),t.default=u.default(d.default(l));var f=r(6);t.StringPredicate=f.StringPredicate,t.NumberPredicate=f.NumberPredicate,t.BooleanPredicate=f.BooleanPredicate,t.ArrayPredicate=f.ArrayPredicate,t.ObjectPredicate=f.ObjectPredicate,t.DatePredicate=f.DatePredicate,t.ErrorPredicate=f.ErrorPredicate,t.MapPredicate=f.MapPredicate,t.WeakMapPredicate=f.WeakMapPredicate,t.SetPredicate=f.SetPredicate,t.WeakSetPredicate=f.WeakSetPredicate,t.AnyPredicate=f.AnyPredicate;},function(e,t,r){(function(e){var r=200,a="__lodash_hash_undefined__",n=1,i=2,o=9007199254740991,s="[object Arguments]",d="[object Array]",u="[object AsyncFunction]",c="[object Boolean]",l="[object Date]",f="[object Error]",p="[object Function]",g="[object GeneratorFunction]",h="[object Map]",y="[object Number]",m="[object Null]",v="[object Object]",b="[object Proxy]",_="[object RegExp]",$="[object Set]",O="[object String]",P="[object Symbol]",x="[object Undefined]",E="[object ArrayBuffer]",j="[object DataView]",S=/^\[object .+?Constructor\]$/,A=/^(?:0|[1-9]\d*)$/,w={};w["[object Float32Array]"]=w["[object Float64Array]"]=w["[object Int8Array]"]=w["[object Int16Array]"]=w["[object Int32Array]"]=w["[object Uint8Array]"]=w["[object Uint8ClampedArray]"]=w["[object Uint16Array]"]=w["[object Uint32Array]"]=!0,w[s]=w[d]=w[E]=w[c]=w[j]=w[l]=w[f]=w[p]=w[h]=w[y]=w[v]=w[_]=w[$]=w[O]=w["[object WeakMap]"]=!1;var V="object"==typeof commonjsGlobal$1&&commonjsGlobal$1&&commonjsGlobal$1.Object===Object&&commonjsGlobal$1,M="object"==typeof self&&self&&self.Object===Object&&self,N=V||M||Function("return this")(),z=t&&!t.nodeType&&t,k=z&&"object"==typeof e&&e&&!e.nodeType&&e,I=k&&k.exports===z,U=I&&V.process,T=function(){try{return U&&U.binding&&U.binding("util")}catch(e){}}(),J=T&&T.isTypedArray;function D(e,t){for(var r=-1,a=null==e?0:e.length;++r<a;)if(t(e[r],r,e))return !0;return !1}function B(e){var t=-1,r=Array(e.size);return e.forEach(function(e,a){r[++t]=[a,e];}),r}function W(e){var t=-1,r=Array(e.size);return e.forEach(function(e){r[++t]=e;}),r}var F,L,R,q=Array.prototype,C=Function.prototype,K=Object.prototype,G=N["__core-js_shared__"],H=C.toString,Q=K.hasOwnProperty,X=(F=/[^.]+$/.exec(G&&G.keys&&G.keys.IE_PROTO||""))?"Symbol(src)_1."+F:"",Y=K.toString,Z=RegExp("^"+H.call(Q).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),ee=I?N.Buffer:void 0,te=N.Symbol,re=N.Uint8Array,ae=K.propertyIsEnumerable,ne=q.splice,ie=te?te.toStringTag:void 0,oe=Object.getOwnPropertySymbols,se=ee?ee.isBuffer:void 0,de=(L=Object.keys,R=Object,function(e){return L(R(e))}),ue=Te(N,"DataView"),ce=Te(N,"Map"),le=Te(N,"Promise"),fe=Te(N,"Set"),pe=Te(N,"WeakMap"),ge=Te(Object,"create"),he=We(ue),ye=We(ce),me=We(le),ve=We(fe),be=We(pe),_e=te?te.prototype:void 0,$e=_e?_e.valueOf:void 0;function Oe(e){var t=-1,r=null==e?0:e.length;for(this.clear();++t<r;){var a=e[t];this.set(a[0],a[1]);}}function Pe(e){var t=-1,r=null==e?0:e.length;for(this.clear();++t<r;){var a=e[t];this.set(a[0],a[1]);}}function xe(e){var t=-1,r=null==e?0:e.length;for(this.clear();++t<r;){var a=e[t];this.set(a[0],a[1]);}}function Ee(e){var t=-1,r=null==e?0:e.length;for(this.__data__=new xe;++t<r;)this.add(e[t]);}function je(e){var t=this.__data__=new Pe(e);this.size=t.size;}function Se(e,t){var r=Re(e),a=!r&&Le(e),n=!r&&!a&&qe(e),i=!r&&!a&&!n&&Qe(e),o=r||a||n||i,s=o?function(e,t){for(var r=-1,a=Array(e);++r<e;)a[r]=t(r);return a}(e.length,String):[],d=s.length;for(var u in e)!t&&!Q.call(e,u)||o&&("length"==u||n&&("offset"==u||"parent"==u)||i&&("buffer"==u||"byteLength"==u||"byteOffset"==u)||Be(u,d))||s.push(u);return s}function Ae(e,t){for(var r=e.length;r--;)if(Fe(e[r][0],t))return r;return -1}function we(e){return null==e?void 0===e?x:m:ie&&ie in Object(e)?function(e){var t=Q.call(e,ie),r=e[ie];try{e[ie]=void 0;var a=!0;}catch(e){}var n=Y.call(e);a&&(t?e[ie]=r:delete e[ie]);return n}(e):function(e){return Y.call(e)}(e)}function Ve(e){return He(e)&&we(e)==s}function Me(e,t,r,a,o){return e===t||(null==e||null==t||!He(e)&&!He(t)?e!=e&&t!=t:function(e,t,r,a,o,u){var p=Re(e),g=Re(t),m=p?d:De(e),b=g?d:De(t),x=(m=m==s?v:m)==v,S=(b=b==s?v:b)==v,A=m==b;if(A&&qe(e)){if(!qe(t))return !1;p=!0,x=!1;}if(A&&!x)return u||(u=new je),p||Qe(e)?ke(e,t,r,a,o,u):function(e,t,r,a,o,s,d){switch(r){case j:if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return !1;e=e.buffer,t=t.buffer;case E:return !(e.byteLength!=t.byteLength||!s(new re(e),new re(t)));case c:case l:case y:return Fe(+e,+t);case f:return e.name==t.name&&e.message==t.message;case _:case O:return e==t+"";case h:var u=B;case $:var p=a&n;if(u||(u=W),e.size!=t.size&&!p)return !1;var g=d.get(e);if(g)return g==t;a|=i,d.set(e,t);var m=ke(u(e),u(t),a,o,s,d);return d.delete(e),m;case P:if($e)return $e.call(e)==$e.call(t)}return !1}(e,t,m,r,a,o,u);if(!(r&n)){var w=x&&Q.call(e,"__wrapped__"),V=S&&Q.call(t,"__wrapped__");if(w||V){var M=w?e.value():e,N=V?t.value():t;return u||(u=new je),o(M,N,r,a,u)}}if(!A)return !1;return u||(u=new je),function(e,t,r,a,i,o){var s=r&n,d=Ie(e),u=d.length,c=Ie(t).length;if(u!=c&&!s)return !1;for(var l=u;l--;){var f=d[l];if(!(s?f in t:Q.call(t,f)))return !1}var p=o.get(e);if(p&&o.get(t))return p==t;var g=!0;o.set(e,t),o.set(t,e);for(var h=s;++l<u;){f=d[l];var y=e[f],m=t[f];if(a)var v=s?a(m,y,f,t,e,o):a(y,m,f,e,t,o);if(!(void 0===v?y===m||i(y,m,r,a,o):v)){g=!1;break}h||(h="constructor"==f);}if(g&&!h){var b=e.constructor,_=t.constructor;b!=_&&"constructor"in e&&"constructor"in t&&!("function"==typeof b&&b instanceof b&&"function"==typeof _&&_ instanceof _)&&(g=!1);}return o.delete(e),o.delete(t),g}(e,t,r,a,o,u)}(e,t,r,a,Me,o))}function Ne(e){return !(!Ge(e)||(t=e,X&&X in t))&&(Ce(e)?Z:S).test(We(e));var t;}function ze(e){if(r=(t=e)&&t.constructor,a="function"==typeof r&&r.prototype||K,t!==a)return de(e);var t,r,a,n=[];for(var i in Object(e))Q.call(e,i)&&"constructor"!=i&&n.push(i);return n}function ke(e,t,r,a,o,s){var d=r&n,u=e.length,c=t.length;if(u!=c&&!(d&&c>u))return !1;var l=s.get(e);if(l&&s.get(t))return l==t;var f=-1,p=!0,g=r&i?new Ee:void 0;for(s.set(e,t),s.set(t,e);++f<u;){var h=e[f],y=t[f];if(a)var m=d?a(y,h,f,t,e,s):a(h,y,f,e,t,s);if(void 0!==m){if(m)continue;p=!1;break}if(g){if(!D(t,function(e,t){if(n=t,!g.has(n)&&(h===e||o(h,e,r,a,s)))return g.push(t);var n;})){p=!1;break}}else if(h!==y&&!o(h,y,r,a,s)){p=!1;break}}return s.delete(e),s.delete(t),p}function Ie(e){return function(e,t,r){var a=t(e);return Re(e)?a:function(e,t){for(var r=-1,a=t.length,n=e.length;++r<a;)e[n+r]=t[r];return e}(a,r(e))}(e,Xe,Je)}function Ue(e,t){var r,a,n=e.__data__;return ("string"==(a=typeof(r=t))||"number"==a||"symbol"==a||"boolean"==a?"__proto__"!==r:null===r)?n["string"==typeof t?"string":"hash"]:n.map}function Te(e,t){var r=function(e,t){return null==e?void 0:e[t]}(e,t);return Ne(r)?r:void 0}Oe.prototype.clear=function(){this.__data__=ge?ge(null):{},this.size=0;},Oe.prototype.delete=function(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t},Oe.prototype.get=function(e){var t=this.__data__;if(ge){var r=t[e];return r===a?void 0:r}return Q.call(t,e)?t[e]:void 0},Oe.prototype.has=function(e){var t=this.__data__;return ge?void 0!==t[e]:Q.call(t,e)},Oe.prototype.set=function(e,t){var r=this.__data__;return this.size+=this.has(e)?0:1,r[e]=ge&&void 0===t?a:t,this},Pe.prototype.clear=function(){this.__data__=[],this.size=0;},Pe.prototype.delete=function(e){var t=this.__data__,r=Ae(t,e);return !(r<0||(r==t.length-1?t.pop():ne.call(t,r,1),--this.size,0))},Pe.prototype.get=function(e){var t=this.__data__,r=Ae(t,e);return r<0?void 0:t[r][1]},Pe.prototype.has=function(e){return Ae(this.__data__,e)>-1},Pe.prototype.set=function(e,t){var r=this.__data__,a=Ae(r,e);return a<0?(++this.size,r.push([e,t])):r[a][1]=t,this},xe.prototype.clear=function(){this.size=0,this.__data__={hash:new Oe,map:new(ce||Pe),string:new Oe};},xe.prototype.delete=function(e){var t=Ue(this,e).delete(e);return this.size-=t?1:0,t},xe.prototype.get=function(e){return Ue(this,e).get(e)},xe.prototype.has=function(e){return Ue(this,e).has(e)},xe.prototype.set=function(e,t){var r=Ue(this,e),a=r.size;return r.set(e,t),this.size+=r.size==a?0:1,this},Ee.prototype.add=Ee.prototype.push=function(e){return this.__data__.set(e,a),this},Ee.prototype.has=function(e){return this.__data__.has(e)},je.prototype.clear=function(){this.__data__=new Pe,this.size=0;},je.prototype.delete=function(e){var t=this.__data__,r=t.delete(e);return this.size=t.size,r},je.prototype.get=function(e){return this.__data__.get(e)},je.prototype.has=function(e){return this.__data__.has(e)},je.prototype.set=function(e,t){var a=this.__data__;if(a instanceof Pe){var n=a.__data__;if(!ce||n.length<r-1)return n.push([e,t]),this.size=++a.size,this;a=this.__data__=new xe(n);}return a.set(e,t),this.size=a.size,this};var Je=oe?function(e){return null==e?[]:(e=Object(e),function(e,t){for(var r=-1,a=null==e?0:e.length,n=0,i=[];++r<a;){var o=e[r];t(o,r,e)&&(i[n++]=o);}return i}(oe(e),function(t){return ae.call(e,t)}))}:function(){return []},De=we;function Be(e,t){return !!(t=null==t?o:t)&&("number"==typeof e||A.test(e))&&e>-1&&e%1==0&&e<t}function We(e){if(null!=e){try{return H.call(e)}catch(e){}try{return e+""}catch(e){}}return ""}function Fe(e,t){return e===t||e!=e&&t!=t}(ue&&De(new ue(new ArrayBuffer(1)))!=j||ce&&De(new ce)!=h||le&&"[object Promise]"!=De(le.resolve())||fe&&De(new fe)!=$||pe&&"[object WeakMap]"!=De(new pe))&&(De=function(e){var t=we(e),r=t==v?e.constructor:void 0,a=r?We(r):"";if(a)switch(a){case he:return j;case ye:return h;case me:return "[object Promise]";case ve:return $;case be:return "[object WeakMap]"}return t});var Le=Ve(function(){return arguments}())?Ve:function(e){return He(e)&&Q.call(e,"callee")&&!ae.call(e,"callee")},Re=Array.isArray;var qe=se||function(){return !1};function Ce(e){if(!Ge(e))return !1;var t=we(e);return t==p||t==g||t==u||t==b}function Ke(e){return "number"==typeof e&&e>-1&&e%1==0&&e<=o}function Ge(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}function He(e){return null!=e&&"object"==typeof e}var Qe=J?function(e){return function(t){return e(t)}}(J):function(e){return He(e)&&Ke(e.length)&&!!w[we(e)]};function Xe(e){return null!=(t=e)&&Ke(t.length)&&!Ce(t)?Se(e):ze(e);var t;}e.exports=function(e,t){return Me(e,t)};}).call(this,r(23)(e));},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const a=r(18);t.StringPredicate=a.StringPredicate;const n=r(20);t.NumberPredicate=n.NumberPredicate;const i=r(21);t.BooleanPredicate=i.BooleanPredicate;const o=r(0),s=r(22);t.ArrayPredicate=s.ArrayPredicate;const d=r(24);t.ObjectPredicate=d.ObjectPredicate;const u=r(29);t.DatePredicate=u.DatePredicate;const c=r(30);t.ErrorPredicate=c.ErrorPredicate;const l=r(31);t.MapPredicate=l.MapPredicate;const f=r(32);t.WeakMapPredicate=f.WeakMapPredicate;const p=r(33);t.SetPredicate=p.SetPredicate;const g=r(34);t.WeakSetPredicate=g.WeakSetPredicate;const h=r(35);t.AnyPredicate=h.AnyPredicate,t.default=((e,t)=>(Object.defineProperties(e,{string:{get:()=>new a.StringPredicate(t)},number:{get:()=>new n.NumberPredicate(t)},boolean:{get:()=>new i.BooleanPredicate(t)},undefined:{get:()=>new o.Predicate("undefined",t)},null:{get:()=>new o.Predicate("null",t)},nullOrUndefined:{get:()=>new o.Predicate("nullOrUndefined",t)},nan:{get:()=>new o.Predicate("nan",t)},symbol:{get:()=>new o.Predicate("symbol",t)},array:{get:()=>new s.ArrayPredicate(t)},object:{get:()=>new d.ObjectPredicate(t)},date:{get:()=>new u.DatePredicate(t)},error:{get:()=>new c.ErrorPredicate(t)},map:{get:()=>new l.MapPredicate(t)},weakMap:{get:()=>new f.WeakMapPredicate(t)},set:{get:()=>new p.SetPredicate(t)},weakSet:{get:()=>new g.WeakSetPredicate(t)},function:{get:()=>new o.Predicate("Function",t)},buffer:{get:()=>new o.Predicate("Buffer",t)},regExp:{get:()=>new o.Predicate("RegExp",t)},promise:{get:()=>new o.Predicate("Promise",t)},typedArray:{get:()=>new o.Predicate("TypedArray",t)},int8Array:{get:()=>new o.Predicate("Int8Array",t)},uint8Array:{get:()=>new o.Predicate("Uint8Array",t)},uint8ClampedArray:{get:()=>new o.Predicate("Uint8ClampedArray",t)},int16Array:{get:()=>new o.Predicate("Int16Array",t)},uint16Array:{get:()=>new o.Predicate("Uint16Array",t)},int32Array:{get:()=>new o.Predicate("Int32Array",t)},uint32Array:{get:()=>new o.Predicate("Uint32Array",t)},float32Array:{get:()=>new o.Predicate("Float32Array",t)},float64Array:{get:()=>new o.Predicate("Float64Array",t)},arrayBuffer:{get:()=>new o.Predicate("ArrayBuffer",t)},dataView:{get:()=>new o.Predicate("DataView",t)},iterable:{get:()=>new o.Predicate("Iterable",t)},any:{value:(...e)=>new h.AnyPredicate(e,t)}}),e));},function(e,t,r){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(r(4));t.default=((e,t)=>{try{for(const r of e)n.default(r,t);return !0}catch(e){return e.message}});},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});t.ArgumentError=class extends Error{constructor(e,t){super(e),"captureStackTrace"in Error&&Error.captureStackTrace(this,t),this.name="ArgumentError";}};},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const a=r(2);t.default=function e(t,r,n){n[a.testSymbol](t,e,r);};},function(e,t,r){const a=()=>{const e=Error.prepareStackTrace;Error.prepareStackTrace=((e,t)=>t);const t=(new Error).stack.slice(1);return Error.prepareStackTrace=e,t};e.exports=a,e.exports.default=a;},function(e,t,r){var a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=a(r(12)),o=n(r(13)),s=n(r(14)),d=/^.*?\((.*?)[,)]/;t.inferLabel=(e=>{if(!s.default)return;const t=e[1],r=t.getFileName(),a=t.getLineNumber(),n=t.getColumnNumber();if(!r||null===a||null===n)return;let u=[];try{u=i.readFileSync(r,"utf8").split("\n");}catch(e){return}let c=u[a-1];if(!c)return;c=c.slice(n-1);const l=d.exec(c);if(!l||!l[1])return;const f=l[1];return o.default(f)||o.default(f.split(".").pop())?f:void 0});},function(e,t){e.exports=require$$0;},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const a=/^[a-z$_][a-z$_0-9]*$/i,n=new Set(["undefined","null","true","false","super","this","Infinity","NaN"]);t.default=(e=>e&&!n.has(e)&&a.test(e));},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.default=Boolean("undefined"!=typeof process&&process.versions&&process.versions.node);},function(e,t){e.exports=require$$1;},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const a=r(0);t.not=(e=>{const t=e.addValidator;return e.addValidator=(r=>{const n=r.validator,i=r.message;return r.message=((e,t)=>`[NOT] ${i(e,t)}`),r.validator=(e=>!n(e)),e[a.validatorSymbol].push(r),e.addValidator=t,e}),e});},function(e,t,r){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(r(6));t.default=(e=>(Object.defineProperties(e,{optional:{get:()=>n.default({},{optional:!0})}}),e));},function(e,t,r){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(r(1)),i=a(r(19)),o=r(0);t.StringPredicate=class extends o.Predicate{constructor(e){super("string",e);}length(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have length \`${e}\`, got \`${t}\``,validator:t=>t.length===e})}minLength(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have a minimum length of \`${e}\`, got \`${t}\``,validator:t=>t.length>=e})}maxLength(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have a maximum length of \`${e}\`, got \`${t}\``,validator:t=>t.length<=e})}matches(e){return this.addValidator({message:(t,r)=>`Expected ${r} to match \`${e}\`, got \`${t}\``,validator:t=>e.test(t)})}startsWith(e){return this.addValidator({message:(t,r)=>`Expected ${r} to start with \`${e}\`, got \`${t}\``,validator:t=>t.startsWith(e)})}endsWith(e){return this.addValidator({message:(t,r)=>`Expected ${r} to end with \`${e}\`, got \`${t}\``,validator:t=>t.endsWith(e)})}includes(e){return this.addValidator({message:(t,r)=>`Expected ${r} to include \`${e}\`, got \`${t}\``,validator:t=>t.includes(e)})}oneOf(e){return this.addValidator({message:(t,r)=>{let a=JSON.stringify(e);if(e.length>10){const t=e.length-10;a=JSON.stringify(e.slice(0,10)).replace(/]$/,`,…+${t} more]`);}return `Expected ${r} to be one of \`${a}\`, got \`${t}\``},validator:t=>e.includes(t)})}get empty(){return this.addValidator({message:(e,t)=>`Expected ${t} to be empty, got \`${e}\``,validator:e=>""===e})}get nonEmpty(){return this.addValidator({message:(e,t)=>`Expected ${t} to not be empty`,validator:e=>""!==e})}equals(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be equal to \`${e}\`, got \`${t}\``,validator:t=>t===e})}get alphanumeric(){return this.addValidator({message:(e,t)=>`Expected ${t} to be alphanumeric, got \`${e}\``,validator:e=>/^[a-z\d]+$/i.test(e)})}get alphabetical(){return this.addValidator({message:(e,t)=>`Expected ${t} to be alphabetical, got \`${e}\``,validator:e=>/^[a-z]+$/gi.test(e)})}get numeric(){return this.addValidator({message:(e,t)=>`Expected ${t} to be numeric, got \`${e}\``,validator:e=>/^(\+|-)?\d+$/i.test(e)})}get date(){return this.addValidator({message:(e,t)=>`Expected ${t} to be a date, got \`${e}\``,validator:i.default})}get lowercase(){return this.addValidator({message:(e,t)=>`Expected ${t} to be lowercase, got \`${e}\``,validator:e=>""!==e.trim()&&e===e.toLowerCase()})}get uppercase(){return this.addValidator({message:(e,t)=>`Expected ${t} to be uppercase, got \`${e}\``,validator:e=>""!==e.trim()&&e===e.toUpperCase()})}get url(){return this.addValidator({message:(e,t)=>`Expected ${t} to be a URL, got \`${e}\``,validator:n.default.urlString})}};},function(e,t,r){e.exports=function(e){return !isNaN(Date.parse(e))};},function(e,t,r){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(r(1)),i=r(0);t.NumberPredicate=class extends i.Predicate{constructor(e){super("number",e);}inRange(e,t){return this.addValidator({message:(r,a)=>`Expected ${a} to be in range [${e}..${t}], got ${r}`,validator:r=>n.default.inRange(r,[e,t])})}greaterThan(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be greater than ${e}, got ${t}`,validator:t=>t>e})}greaterThanOrEqual(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be greater than or equal to ${e}, got ${t}`,validator:t=>t>=e})}lessThan(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be less than ${e}, got ${t}`,validator:t=>t<e})}lessThanOrEqual(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be less than or equal to ${e}, got ${t}`,validator:t=>t<=e})}equal(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be equal to ${e}, got ${t}`,validator:t=>t===e})}oneOf(e){return this.addValidator({message:(t,r)=>{let a=JSON.stringify(e);if(e.length>10){const t=e.length-10;a=JSON.stringify(e.slice(0,10)).replace(/]$/,`,…+${t} more]`);}return `Expected ${r} to be one of \`${a}\`, got ${t}`},validator:t=>e.includes(t)})}get integer(){return this.addValidator({message:(e,t)=>`Expected ${t} to be an integer, got ${e}`,validator:e=>n.default.integer(e)})}get finite(){return this.addValidator({message:(e,t)=>`Expected ${t} to be finite, got ${e}`,validator:e=>!n.default.infinite(e)})}get infinite(){return this.addValidator({message:(e,t)=>`Expected ${t} to be infinite, got ${e}`,validator:e=>n.default.infinite(e)})}get positive(){return this.addValidator({message:(e,t)=>`Expected ${t} to be positive, got ${e}`,validator:e=>e>0})}get negative(){return this.addValidator({message:(e,t)=>`Expected ${t} to be negative, got ${e}`,validator:e=>e<0})}get integerOrInfinite(){return this.addValidator({message:(e,t)=>`Expected ${t} to be an integer or infinite, got ${e}`,validator:e=>n.default.integer(e)||n.default.infinite(e)})}get uint8(){return this.integer.inRange(0,255)}get uint16(){return this.integer.inRange(0,65535)}get uint32(){return this.integer.inRange(0,4294967295)}get int8(){return this.integer.inRange(-128,127)}get int16(){return this.integer.inRange(-32768,32767)}get int32(){return this.integer.inRange(-2147483648,2147483647)}};},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const a=r(0);t.BooleanPredicate=class extends a.Predicate{constructor(e){super("boolean",e);}get true(){return this.addValidator({message:(e,t)=>`Expected ${t} to be true, got ${e}`,validator:e=>!0===e})}get false(){return this.addValidator({message:(e,t)=>`Expected ${t} to be false, got ${e}`,validator:e=>!1===e})}};},function(e,t,r){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(r(5)),i=a(r(4)),o=r(0);t.ArrayPredicate=class extends o.Predicate{constructor(e){super("array",e);}length(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have length \`${e}\`, got \`${t.length}\``,validator:t=>t.length===e})}minLength(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have a minimum length of \`${e}\`, got \`${t.length}\``,validator:t=>t.length>=e})}maxLength(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have a maximum length of \`${e}\`, got \`${t.length}\``,validator:t=>t.length<=e})}startsWith(e){return this.addValidator({message:(t,r)=>`Expected ${r} to start with \`${e}\`, got \`${t[0]}\``,validator:t=>t[0]===e})}endsWith(e){return this.addValidator({message:(t,r)=>`Expected ${r} to end with \`${e}\`, got \`${t[t.length-1]}\``,validator:t=>t[t.length-1]===e})}includes(...e){return this.addValidator({message:(t,r)=>`Expected ${r} to include all elements of \`${JSON.stringify(e)}\`, got \`${JSON.stringify(t)}\``,validator:t=>e.every(e=>-1!==t.indexOf(e))})}includesAny(...e){return this.addValidator({message:(t,r)=>`Expected ${r} to include any element of \`${JSON.stringify(e)}\`, got \`${JSON.stringify(t)}\``,validator:t=>e.some(e=>-1!==t.indexOf(e))})}get empty(){return this.addValidator({message:(e,t)=>`Expected ${t} to be empty, got \`${JSON.stringify(e)}\``,validator:e=>0===e.length})}get nonEmpty(){return this.addValidator({message:(e,t)=>`Expected ${t} to not be empty`,validator:e=>e.length>0})}deepEqual(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be deeply equal to \`${JSON.stringify(e)}\`, got \`${JSON.stringify(t)}\``,validator:t=>n.default(t,e)})}ofType(e){let t;return this.addValidator({message:(e,r)=>`(${r}) ${t}`,validator:r=>{try{for(const t of r)i.default(t,e);return !0}catch(e){return t=e.message,!1}}})}};},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e};},function(e,t,r){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(r(1)),i=a(r(25)),o=a(r(5)),s=r(0),d=a(r(3)),u=a(r(7)),c=a(r(27)),l=r(28);t.ObjectPredicate=class extends s.Predicate{constructor(e){super("object",e);}get plain(){return this.addValidator({message:(e,t)=>`Expected ${t} to be a plain object`,validator:e=>n.default.plainObject(e)})}get empty(){return this.addValidator({message:(e,t)=>`Expected ${t} to be empty, got \`${JSON.stringify(e)}\``,validator:e=>0===Object.keys(e).length})}get nonEmpty(){return this.addValidator({message:(e,t)=>`Expected ${t} to not be empty`,validator:e=>Object.keys(e).length>0})}valuesOfType(e){return this.addValidator({message:(e,t,r)=>`(${t}) ${r}`,validator:t=>{const r=Object.keys(t).map(e=>t[e]);return u.default(r,e)}})}deepValuesOfType(e){return this.addValidator({message:(e,t,r)=>`(${t}) ${r}`,validator:t=>c.default(t,e)})}deepEqual(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be deeply equal to \`${JSON.stringify(e)}\`, got \`${JSON.stringify(t)}\``,validator:t=>o.default(t,e)})}instanceOf(e){return this.addValidator({message:(t,r)=>{let a=t.constructor.name;return a&&"Object"!==a||(a=JSON.stringify(t)),`Expected ${r} \`${a}\` to be of type \`${e.name}\``},validator:t=>t instanceof e})}hasKeys(...e){return this.addValidator({message:(e,t,r)=>`Expected ${t} to have keys \`${JSON.stringify(r)}\``,validator:t=>d.default({has:e=>i.default.has(t,e)},e)})}hasAnyKeys(...e){return this.addValidator({message:(t,r)=>`Expected ${r} to have any key of \`${JSON.stringify(e)}\``,validator:t=>e.some(e=>i.default.has(t,e))})}partialShape(e){return this.addValidator({message:(e,t,r)=>`${r.replace("Expected","Expected property")} in ${t}`,validator:t=>l.partial(t,e)})}exactShape(e){return this.addValidator({message:(e,t,r)=>`${r.replace("Expected","Expected property")} in ${t}`,validator:t=>l.exact(t,e)})}};},function(e,t,r){const a=r(26);function n(e){const t=e.split("."),r=[];for(let e=0;e<t.length;e++){let a=t[e];for(;"\\"===a[a.length-1]&&void 0!==t[e+1];)a=a.slice(0,-1)+".",a+=t[++e];r.push(a);}return r}e.exports={get(e,t,r){if(!a(e)||"string"!=typeof t)return void 0===r?e:r;const i=n(t);for(let t=0;t<i.length;t++){if(!Object.prototype.propertyIsEnumerable.call(e,i[t]))return r;if(null==(e=e[i[t]])){if(t!==i.length-1)return r;break}}return e},set(e,t,r){if(!a(e)||"string"!=typeof t)return e;const i=e,o=n(t);for(let t=0;t<o.length;t++){const n=o[t];a(e[n])||(e[n]={}),t===o.length-1&&(e[n]=r),e=e[n];}return i},delete(e,t){if(!a(e)||"string"!=typeof t)return;const r=n(t);for(let t=0;t<r.length;t++){const n=r[t];if(t===r.length-1)return void delete e[n];if(e=e[n],!a(e))return}},has(e,t){if(!a(e)||"string"!=typeof t)return !1;const r=n(t);for(let t=0;t<r.length;t++){if(!a(e))return !1;if(!(r[t]in e))return !1;e=e[r[t]];}return !0}};},function(e,t,r){e.exports=function(e){var t=typeof e;return null!==e&&("object"===t||"function"===t)};},function(e,t,r){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(r(1)),i=a(r(4)),o=(e,t)=>n.default.plainObject(e)?Object.keys(e).every(r=>o(e[r],t)):(i.default(e,t),!0);t.default=((e,t)=>{try{return o(e,t)}catch(e){return e.message}});},function(e,t,r){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(r(1)),i=a(r(9)),o=r(2);t.partial=function e(t,r,a){try{for(const s of Object.keys(r)){const d=a?`${a}.${s}`:s;if(o.isPredicate(r[s]))i.default(t[s],d,r[s]);else if(n.default.plainObject(r[s])){const a=e(t[s],r[s],d);if(!0!==a)return a}}return !0}catch(e){return e.message}},t.exact=function e(t,r,a){try{const s=new Set(Object.keys(t));for(const d of Object.keys(r)){s.delete(d);const u=a?`${a}.${d}`:d;if(o.isPredicate(r[d]))i.default(t[d],u,r[d]);else if(n.default.plainObject(r[d])){if(!Object.prototype.hasOwnProperty.call(t,d))return `Expected \`${u}\` to exist`;const a=e(t[d],r[d],u);if(!0!==a)return a}}if(s.size>0){const e=Array.from(s.keys())[0];return `Did not expect property \`${a?`${a}.${e}`:e}\` to exist, got \`${t[e]}\``}return !0}catch(e){return e.message}};},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const a=r(0);t.DatePredicate=class extends a.Predicate{constructor(e){super("date",e);}before(e){return this.addValidator({message:(t,r)=>`Expected ${r} ${t.toISOString()} to be before ${e.toISOString()}`,validator:t=>t.getTime()<e.getTime()})}after(e){return this.addValidator({message:(t,r)=>`Expected ${r} ${t.toISOString()} to be after ${e.toISOString()}`,validator:t=>t.getTime()>e.getTime()})}};},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const a=r(0);t.ErrorPredicate=class extends a.Predicate{constructor(e){super("error",e);}name(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have name \`${e}\`, got \`${t.name}\``,validator:t=>t.name===e})}message(e){return this.addValidator({message:(t,r)=>`Expected ${r} message to be \`${e}\`, got \`${t.message}\``,validator:t=>t.message===e})}messageIncludes(e){return this.addValidator({message:(t,r)=>`Expected ${r} message to include \`${e}\`, got \`${t.message}\``,validator:t=>t.message.includes(e)})}hasKeys(...e){return this.addValidator({message:(t,r)=>`Expected ${r} message to have keys \`${e.join("`, `")}\``,validator:t=>e.every(e=>t.hasOwnProperty(e))})}instanceOf(e){return this.addValidator({message:(t,r)=>`Expected ${r} \`${t.name}\` to be of type \`${e.name}\``,validator:t=>t instanceof e})}get typeError(){return this.instanceOf(TypeError)}get evalError(){return this.instanceOf(EvalError)}get rangeError(){return this.instanceOf(RangeError)}get referenceError(){return this.instanceOf(ReferenceError)}get syntaxError(){return this.instanceOf(SyntaxError)}get uriError(){return this.instanceOf(URIError)}};},function(e,t,r){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(r(5)),i=r(0),o=a(r(3)),s=a(r(7));t.MapPredicate=class extends i.Predicate{constructor(e){super("Map",e);}size(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have size \`${e}\`, got \`${t.size}\``,validator:t=>t.size===e})}minSize(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have a minimum size of \`${e}\`, got \`${t.size}\``,validator:t=>t.size>=e})}maxSize(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have a maximum size of \`${e}\`, got \`${t.size}\``,validator:t=>t.size<=e})}hasKeys(...e){return this.addValidator({message:(e,t,r)=>`Expected ${t} to have keys \`${JSON.stringify(r)}\``,validator:t=>o.default(t,e)})}hasAnyKeys(...e){return this.addValidator({message:(t,r)=>`Expected ${r} to have any key of \`${JSON.stringify(e)}\``,validator:t=>e.some(e=>t.has(e))})}hasValues(...e){return this.addValidator({message:(e,t,r)=>`Expected ${t} to have values \`${JSON.stringify(r)}\``,validator:t=>o.default(new Set(t.values()),e)})}hasAnyValues(...e){return this.addValidator({message:(t,r)=>`Expected ${r} to have any value of \`${JSON.stringify(e)}\``,validator:t=>{const r=new Set(t.values());return e.some(e=>r.has(e))}})}keysOfType(e){return this.addValidator({message:(e,t,r)=>`(${t}) ${r}`,validator:t=>s.default(t.keys(),e)})}valuesOfType(e){return this.addValidator({message:(e,t,r)=>`(${t}) ${r}`,validator:t=>s.default(t.values(),e)})}get empty(){return this.addValidator({message:(e,t)=>`Expected ${t} to be empty, got \`${JSON.stringify(Array.from(e))}\``,validator:e=>0===e.size})}get nonEmpty(){return this.addValidator({message:(e,t)=>`Expected ${t} to not be empty`,validator:e=>e.size>0})}deepEqual(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be deeply equal to \`${JSON.stringify(Array.from(e))}\`, got \`${JSON.stringify(Array.from(t))}\``,validator:t=>n.default(t,e)})}};},function(e,t,r){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=r(0),i=a(r(3));t.WeakMapPredicate=class extends n.Predicate{constructor(e){super("WeakMap",e);}hasKeys(...e){return this.addValidator({message:(e,t,r)=>`Expected ${t} to have keys \`${JSON.stringify(r)}\``,validator:t=>i.default(t,e)})}hasAnyKeys(...e){return this.addValidator({message:(t,r)=>`Expected ${r} to have any key of \`${JSON.stringify(e)}\``,validator:t=>e.some(e=>t.has(e))})}};},function(e,t,r){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(r(5)),i=r(0),o=a(r(3)),s=a(r(7));t.SetPredicate=class extends i.Predicate{constructor(e){super("Set",e);}size(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have size \`${e}\`, got \`${t.size}\``,validator:t=>t.size===e})}minSize(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have a minimum size of \`${e}\`, got \`${t.size}\``,validator:t=>t.size>=e})}maxSize(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have a maximum size of \`${e}\`, got \`${t.size}\``,validator:t=>t.size<=e})}has(...e){return this.addValidator({message:(e,t,r)=>`Expected ${t} to have items \`${JSON.stringify(r)}\``,validator:t=>o.default(t,e)})}hasAny(...e){return this.addValidator({message:(t,r)=>`Expected ${r} to have any item of \`${JSON.stringify(e)}\``,validator:t=>e.some(e=>t.has(e))})}ofType(e){return this.addValidator({message:(e,t,r)=>`(${t}) ${r}`,validator:t=>s.default(t,e)})}get empty(){return this.addValidator({message:(e,t)=>`Expected ${t} to be empty, got \`${JSON.stringify(Array.from(e))}\``,validator:e=>0===e.size})}get nonEmpty(){return this.addValidator({message:(e,t)=>`Expected ${t} to not be empty`,validator:e=>e.size>0})}deepEqual(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be deeply equal to \`${JSON.stringify(Array.from(e))}\`, got \`${JSON.stringify(Array.from(t))}\``,validator:t=>n.default(t,e)})}};},function(e,t,r){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=r(0),i=a(r(3));t.WeakSetPredicate=class extends n.Predicate{constructor(e){super("WeakSet",e);}has(...e){return this.addValidator({message:(e,t,r)=>`Expected ${t} to have items \`${JSON.stringify(r)}\``,validator:t=>i.default(t,e)})}hasAny(...e){return this.addValidator({message:(t,r)=>`Expected ${r} to have any item of \`${JSON.stringify(e)}\``,validator:t=>e.some(e=>t.has(e))})}};},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const a=r(8),n=r(2);t.AnyPredicate=class{constructor(e,t={}){this.predicates=e,this.options=t;}[n.testSymbol](e,t,r){const n=["Any predicate failed with the following errors:"];for(const a of this.predicates)try{return void t(e,r,a)}catch(t){if(void 0===e&&!0===this.options.optional)return;n.push(`- ${t.message}`);}throw new a.ArgumentError(n.join("\n"),t)}};}]);const __export__=module.exports;module.exports=__export__.default,Object.assign(module.exports,__export__);
	    //# sourceMappingURL=index.js.map
	    });

	    var ow = unwrapExports(source);

	    function validateModal(modal) {
	      ow(
	        modal,
	        "modal",
	        ow.object.exactShape({
	          img: ow.optional.string,
	          heading: ow.string,
	          description: ow.string,
	          button: ow.optional.string,
	          invalidMsg: ow.optional.string,
	          eventCode: ow.string,
	          action: ow.optional.function
	        })
	      );
	    }

	    function validateProviderInterface(providerInterface) {
	      ow(
	        providerInterface,
	        "provider interface",
	        ow.object.exactShape({
	          address: ow.object
	            .hasAnyKeys("get", "onChange")
	            .valuesOfType(ow.function),
	          network: ow.object
	            .hasAnyKeys("get", "onChange")
	            .valuesOfType(ow.function),
	          balance: ow.object
	            .hasAnyKeys("get", "onChange")
	            .valuesOfType(ow.function),
	          connect: ow.optional.function,
	          name: ow.string
	        })
	      );
	    }

	    const app = writable({
	      dappId: null,
	      networkId: null,
	      version: null,
	      selectWallet: false,
	      prepareWallet: false,
	      modules: null
	    });

	    let syncingState = false;

	    const address = createUserStateStore("address");
	    const network = createUserStateStore("network");
	    const balance = createBalanceStore();

	    const state = createState({
	      mobileDevice: null,
	      walletName: null,
	      address: null,
	      network: null,
	      balance: null,
	      connect: null
	    });

	    address.subscribe(value => state.update({ address: value }));
	    network.subscribe(value => state.update({ network: value }));
	    balance.subscribe(value => state.update({ balance: value }));

	    let currentSyncerIntervals = [];

	    const providerInterface = createProviderInterfaceStore(null);
	    providerInterface.subscribe(provider => {
	      if (provider) {
	        // clear all current intervals if they exist
	        currentSyncerIntervals.forEach(
	          clearInterval => clearInterval && clearInterval()
	        );

	        // start syncing state and save intervals
	        currentSyncerIntervals = [
	          address.setStateSyncer(provider.address),
	          network.setStateSyncer(provider.network),
	          balance.setStateSyncer(provider.balance)
	        ];

	        state.update({ connect: provider.connect, walletName: provider.name });
	      }
	    });

	    function createState(initialState) {
	      let state = initialState;
	      let subscribers = [];

	      return {
	        get: () => state,
	        subscribe: func => {
	          if (!func) return
	          subscribers.push(func);
	          return () => {
	            subscribers = subscribers.filter(f => f !== func);
	          }
	        },
	        update: newState => {
	          state = { ...state, ...newState };
	          subscribers.forEach(sub => sub(state));

	          return state
	        }
	      }
	    }

	    function createProviderInterfaceStore(initialState) {
	      const { subscribe, set } = writable(initialState);

	      return {
	        subscribe,
	        set: providerInterface => {
	          validateProviderInterface(providerInterface);
	          set(providerInterface);
	        }
	      }
	    }

	    function createUserStateStore(parameter) {
	      const { subscribe, set } = writable(null);

	      return {
	        subscribe,
	        setStateSyncer: stateSyncer => {
	          if (!stateSyncer || typeof stateSyncer !== "object") {
	            throw new Error("setStateSyncer must be called with a valid interface")
	          }

	          if (stateSyncer.onChange) {
	            stateSyncer.onChange(set);
	            return
	          }

	          if (stateSyncer.get) {
	            const interval = setInterval(() => {
	              stateSyncer
	                .get()
	                .then(set)
	                .catch(err => {
	                  throw new Error(
	                    `Error getting ${parameter} from state syncer: ${err}`
	                  )
	                });
	            }, 250);

	            return () => clearInterval(interval)
	          }
	        }
	      }
	    }

	    function createBalanceStore() {
	      let stateSyncer;
	      const { subscribe } = derived(
	        [address, network],
	        ([$address, $network], set) => {
	          if (stateSyncer) {
	            const syncProm = stateSyncer.get();
	            syncingState = syncProm;
	            syncProm
	              .then(result => {
	                set(result);
	                syncingState = false;
	              })
	              .catch(err => {
	                throw new Error(`Error getting balance from state syncer: ${err}`)
	              });
	          }
	        }
	      );

	      return {
	        subscribe,
	        setStateSyncer: syncer => {
	          if (!syncer || typeof syncer !== "object") {
	            throw new Error("setStateSyncer must be called with a valid interface")
	          }

	          stateSyncer = syncer;
	        }
	      }
	    }

	    let blocknative;

	    app.subscribe(({ dappId, networkId }) => {
	      if (dappId) {
	        blocknative = BlocknativeApi({
	          dappId,
	          networkId
	        });
	      }
	    });

	    function cubicOut(t) {
	        const f = t - 1.0;
	        return f * f * f + 1.0;
	    }
	    function quintOut(t) {
	        return --t * t * t * t * t + 1;
	    }

	    function fade(node, { delay = 0, duration = 400 }) {
	        const o = +getComputedStyle(node).opacity;
	        return {
	            delay,
	            duration,
	            css: t => `opacity: ${t * o}`
	        };
	    }
	    function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 }) {
	        const style = getComputedStyle(node);
	        const target_opacity = +style.opacity;
	        const transform = style.transform === 'none' ? '' : style.transform;
	        const od = target_opacity * (1 - opacity);
	        return {
	            delay,
	            duration,
	            easing,
	            css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - (od * u)}`
	        };
	    }

	    function createModernProviderInterface(provider) {
	      provider.autoRefreshOnNetworkChange = false;

	      return {
	        address: {
	          onChange: func => {
	            // give the initial value if it exists
	            if (provider.selectedAddress) {
	              func(provider.selectedAddress);
	            }
	            provider.on("accountsChanged", accounts => func(accounts[0]));
	          }
	        },
	        network: {
	          onChange: func => {
	            // give the initial value if it exists
	            if (provider.networkVersion) {
	              func(provider.networkVersion);
	            }
	            provider.on("networkChanged", func);
	          }
	        },
	        balance: {
	          get: () =>
	            new Promise(resolve => {
	              if (!provider.selectedAddress) {
	                resolve(null);
	                return
	              }

	              provider.sendAsync(
	                {
	                  method: "eth_getBalance",
	                  params: [provider.selectedAddress, "latest"],
	                  id: 1
	                },
	                (e, res) => {
	                  resolve(parseInt(res.result, 16));
	                }
	              );
	            })
	        },
	        connect: provider.enable,
	        name: getProviderName(provider)
	      }
	    }

	    function createLegacyProviderInterface(provider) {
	      return {
	        address: {
	          get: () => Promise.resolve(provider._address)
	        },
	        network: {
	          get: () => Promise.resolve(provider._chainId)
	        },
	        balance: {
	          get: () =>
	            new Promise(resolve => {
	              provider.sendAsync(
	                {
	                  method: "eth_getBalance",
	                  params: [provider._address, "latest"]
	                },
	                (e, res) => {
	                  resolve(parseInt(res.result, 16));
	                }
	              );
	            })
	        },
	        name: getProviderName(provider)
	      }
	    }

	    function getProviderName(provider) {
	      if (provider.isMetaMask) {
	        return "metamask"
	      }

	      if (provider.isDapper) {
	        return "dapper"
	      }

	      if (provider.currentProvider) {
	        if (provider.currentProvider.isMetaMask) {
	          return "metamask"
	        }

	        if (provider.currentProvider.isDapper) {
	          return "dapper"
	        }

	        if (provider.currentProvider.isTrust) {
	          return "trust"
	        }

	        if (provider.currentProvider.isCoinbaseWallet) {
	          return "coinbase"
	        }

	        if (provider.currentProvider.isToshi) {
	          return "toshi"
	        }

	        if (provider.currentProvider.isCipher) {
	          return "cipher"
	        }

	        if (
	          provider.currentProvider.host &&
	          provider.currentProvider.host.indexOf("localhost") !== -1
	        ) {
	          return "localhost"
	        }
	      }
	    }

	    /* src/SelectWallet.svelte generated by Svelte v3.6.10 */

	    const file = "src/SelectWallet.svelte";

	    function add_css() {
	    	var style = element("style");
	    	style.id = 'svelte-c9u3i5-style';
	    	style.textContent = ".bn-ui.svelte-c9u3i5{position:absolute;top:1rem;right:1rem;background:#fff;border-radius:2px;border:1px solid #282828;box-sizing:border-box;display:flex;flex-flow:column nowrap;justify-content:center;align-items:center;padding:1rem}.bn-wallets.svelte-c9u3i5{display:flex;flex-flow:row wrap;justify-content:center;align-items:center;list-style-type:none}.bn-wallet.svelte-c9u3i5{display:flex;justify-content:center;align-items:center;flex-direction:column;padding:1rem;border:1px solid #282828;border-radius:4px;margin:0.5rem;transition:background 150ms ease-in-out}.bn-wallet.svelte-c9u3i5:hover{cursor:pointer;background:gray}.bn-wallet-icon-container.svelte-c9u3i5{display:flex;justify-content:center;align-items:center;width:2rem}.bn-wallet-icon.svelte-c9u3i5{width:100%;height:auto}.bn-wallet-name.svelte-c9u3i5{margin-top:0.5rem}.bn-wallet-install.svelte-c9u3i5{display:flex;flex-direction:column;justify-content:center;align-items:center;max-width:15rem}.bn-link-button.svelte-c9u3i5{text-decoration:none;color:black;padding:1rem;margin:1rem;border:1px solid gray;border-radius:20px;transition:background 150ms ease-in-out}.bn-link-button.svelte-c9u3i5:hover{cursor:pointer;background:gray}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0V2FsbGV0LnN2ZWx0ZSIsInNvdXJjZXMiOlsiU2VsZWN0V2FsbGV0LnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0PlxuICBpbXBvcnQgeyBibG9ja25hdGl2ZSB9IGZyb20gXCIuL3NlcnZpY2VzXCI7XG4gIGltcG9ydCB7IGFwcCwgc3RhdGUsIHByb3ZpZGVySW50ZXJmYWNlIH0gZnJvbSBcIi4vc3RvcmVzXCI7XG4gIGltcG9ydCB7IGZseSwgZmFkZSB9IGZyb20gXCJzdmVsdGUvdHJhbnNpdGlvblwiO1xuICBpbXBvcnQgeyBxdWludE91dCB9IGZyb20gXCJzdmVsdGUvZWFzaW5nXCI7XG5cbiAgaW1wb3J0IHtcbiAgICBnZXRQcm92aWRlck5hbWUsXG4gICAgY3JlYXRlTGVnYWN5UHJvdmlkZXJJbnRlcmZhY2UsXG4gICAgY3JlYXRlTW9kZXJuUHJvdmlkZXJJbnRlcmZhY2VcbiAgfSBmcm9tIFwiLi9wcm92aWRlclwiO1xuXG4gIGNvbnN0IHsgbW9iaWxlRGV2aWNlIH0gPSBzdGF0ZS5nZXQoKTtcblxuICBsZXQgbW9kYWw7XG4gIGxldCBpbnN0YWxsTWVzc2FnZTtcbiAgbGV0IHdhbGxldEluZm87XG5cbiAgYXBwLnN1YnNjcmliZSgoeyBtb2R1bGVzOiB7IHNlbGVjdFdhbGxldCB9IH0pID0+IHtcbiAgICBjb25zdCBtb2R1bGVUeXBlID0gbW9iaWxlRGV2aWNlID8gXCJtb2JpbGVcIiA6IFwiZGVza3RvcFwiO1xuICAgIGNvbnN0IHdhbGxldHMgPSBzZWxlY3RXYWxsZXQud2FsbGV0c1ttb2R1bGVUeXBlXTtcbiAgICBtb2RhbCA9IHsgLi4uc2VsZWN0V2FsbGV0LCB3YWxsZXRzIH07XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGhhbmRsZVdhbGxldFNlbGVjdCh3YWxsZXQpIHtcbiAgICBjb25zdCBwcm92aWRlciA9IHdhbGxldC5jb25uZWN0KHtcbiAgICAgIGdldFByb3ZpZGVyTmFtZSxcbiAgICAgIGNyZWF0ZUxlZ2FjeVByb3ZpZGVySW50ZXJmYWNlLFxuICAgICAgY3JlYXRlTW9kZXJuUHJvdmlkZXJJbnRlcmZhY2VcbiAgICB9KTtcblxuICAgIGlmICh0eXBlb2YgcHJvdmlkZXIgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHdhbGxldEluZm8gPSB7XG4gICAgICAgIG5hbWU6IHdhbGxldC5uYW1lLFxuICAgICAgICBsaW5rOiB3YWxsZXQubGluayxcbiAgICAgICAgY3VycmVudFByb3ZpZGVyOiBwcm92aWRlclxuICAgICAgfTtcbiAgICAgIGluc3RhbGxNZXNzYWdlID0gd2FsbGV0Lmluc3RhbGxNZXNzYWdlKHByb3ZpZGVyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBwcm92aWRlckludGVyZmFjZS5zZXQocHJvdmlkZXIpO1xuICAgIG1vZGFsID0gbnVsbDtcbiAgICBhcHAudXBkYXRlKHN0b3JlID0+ICh7IC4uLnN0b3JlLCBzZWxlY3RXYWxsZXQ6IGZhbHNlIH0pKTtcbiAgfVxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbiAgLmJuLXVpIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAxcmVtO1xuICAgIHJpZ2h0OiAxcmVtO1xuICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICMyODI4Mjg7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIHBhZGRpbmc6IDFyZW07XG4gIH1cblxuICAuYm4td2FsbGV0cyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWZsb3c6IHJvdyB3cmFwO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xuICB9XG5cbiAgLmJuLXdhbGxldCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgcGFkZGluZzogMXJlbTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjMjgyODI4O1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBtYXJnaW46IDAuNXJlbTtcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDE1MG1zIGVhc2UtaW4tb3V0O1xuICB9XG5cbiAgLmJuLXdhbGxldDpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGJhY2tncm91bmQ6IGdyYXk7XG4gIH1cblxuICAuYm4td2FsbGV0LWljb24tY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgd2lkdGg6IDJyZW07XG4gIH1cblxuICAuYm4td2FsbGV0LWljb24ge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogYXV0bztcbiAgfVxuXG4gIC5ibi13YWxsZXQtbmFtZSB7XG4gICAgbWFyZ2luLXRvcDogMC41cmVtO1xuICB9XG5cbiAgLmJuLXdhbGxldC1pbnN0YWxsIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBtYXgtd2lkdGg6IDE1cmVtO1xuICB9XG5cbiAgLmJuLWxpbmstYnV0dG9uIHtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgY29sb3I6IGJsYWNrO1xuICAgIHBhZGRpbmc6IDFyZW07XG4gICAgbWFyZ2luOiAxcmVtO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIGdyYXk7XG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDE1MG1zIGVhc2UtaW4tb3V0O1xuICB9XG5cbiAgLmJuLWxpbmstYnV0dG9uOmhvdmVyIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgYmFja2dyb3VuZDogZ3JheTtcbiAgfVxuPC9zdHlsZT5cblxueyNpZiBtb2RhbH1cbiAgPGRpdlxuICAgIHRyYW5zaXRpb246Zmx5PXt7IGRlbGF5OiAxNTAsIGR1cmF0aW9uOiAzMDAsIHg6IDQwMCwgZWFzaW5nOiBxdWludE91dCB9fVxuICAgIGNsYXNzPVwiYm4tdWlcIj5cbiAgICA8aDM+e21vZGFsLmhlYWRpbmd9PC9oMz5cbiAgICA8cD57bW9kYWwuZGVzY3JpcHRpb259PC9wPlxuICAgIDx1bCBjbGFzcz1cImJuLXdhbGxldHNcIj5cbiAgICAgIHsjZWFjaCBtb2RhbC53YWxsZXRzIGFzIHdhbGxldH1cbiAgICAgICAgPGxpIGNsYXNzPVwiYm4td2FsbGV0XCIgb246Y2xpY2s9eygpID0+IGhhbmRsZVdhbGxldFNlbGVjdCh3YWxsZXQpfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm4td2FsbGV0LWljb24tY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8aW1nIGNsYXNzPVwiYm4td2FsbGV0LWljb25cIiBzcmM9e3dhbGxldC5pY29ufSBhbHQ9e3dhbGxldC5uYW1lfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYm4td2FsbGV0LW5hbWVcIj57d2FsbGV0Lm5hbWV9PC9zcGFuPlxuICAgICAgICA8L2xpPlxuICAgICAgey9lYWNofVxuICAgIDwvdWw+XG4gICAgeyNpZiBpbnN0YWxsTWVzc2FnZX1cbiAgICAgIDxkaXYgdHJhbnNpdGlvbjpmYWRlIGNsYXNzPVwiYm4td2FsbGV0LWluc3RhbGxcIj5cbiAgICAgICAgPGRpdj57aW5zdGFsbE1lc3NhZ2V9PC9kaXY+XG4gICAgICAgIDxhXG4gICAgICAgICAgY2xhc3M9XCJibi1saW5rLWJ1dHRvblwiXG4gICAgICAgICAgaHJlZj17d2FsbGV0SW5mby5saW5rfVxuICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgcmVsPVwibm9yZWZlcnJlciBub29wZW5lclwiPlxuICAgICAgICAgIEluc3RhbGwge3dhbGxldEluZm8ubmFtZX1cbiAgICAgICAgPC9hPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIEhpbnQ6IGlmIHlvdSBhbHJlYWR5IGhhdmUge3dhbGxldEluZm8ubmFtZX0gaW5zdGFsbGVkLCB0cnkgZGlzYWJsaW5nXG4gICAgICAgICAgdGhlIHt3YWxsZXRJbmZvLmN1cnJlbnRQcm92aWRlcn0gZXh0ZW5zaW9uIGFuZCByZWZyZXNoaW5nIHRoZSBwYWdlIHNvXG4gICAgICAgICAgdGhhdCB3ZSBjYW4gc2VlIGl0LlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIHsvaWZ9XG4gIDwvZGl2Plxuey9pZn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnREUsTUFBTSxjQUFDLENBQUMsQUFDTixRQUFRLENBQUUsUUFBUSxDQUNsQixHQUFHLENBQUUsSUFBSSxDQUNULEtBQUssQ0FBRSxJQUFJLENBQ1gsVUFBVSxDQUFFLElBQUksQ0FDaEIsYUFBYSxDQUFFLEdBQUcsQ0FDbEIsTUFBTSxDQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUN6QixVQUFVLENBQUUsVUFBVSxDQUN0QixPQUFPLENBQUUsSUFBSSxDQUNiLFNBQVMsQ0FBRSxNQUFNLENBQUMsTUFBTSxDQUN4QixlQUFlLENBQUUsTUFBTSxDQUN2QixXQUFXLENBQUUsTUFBTSxDQUNuQixPQUFPLENBQUUsSUFBSSxBQUNmLENBQUMsQUFFRCxXQUFXLGNBQUMsQ0FBQyxBQUNYLE9BQU8sQ0FBRSxJQUFJLENBQ2IsU0FBUyxDQUFFLEdBQUcsQ0FBQyxJQUFJLENBQ25CLGVBQWUsQ0FBRSxNQUFNLENBQ3ZCLFdBQVcsQ0FBRSxNQUFNLENBQ25CLGVBQWUsQ0FBRSxJQUFJLEFBQ3ZCLENBQUMsQUFFRCxVQUFVLGNBQUMsQ0FBQyxBQUNWLE9BQU8sQ0FBRSxJQUFJLENBQ2IsZUFBZSxDQUFFLE1BQU0sQ0FDdkIsV0FBVyxDQUFFLE1BQU0sQ0FDbkIsY0FBYyxDQUFFLE1BQU0sQ0FDdEIsT0FBTyxDQUFFLElBQUksQ0FDYixNQUFNLENBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQ3pCLGFBQWEsQ0FBRSxHQUFHLENBQ2xCLE1BQU0sQ0FBRSxNQUFNLENBQ2QsVUFBVSxDQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsV0FBVyxBQUMxQyxDQUFDLEFBRUQsd0JBQVUsTUFBTSxBQUFDLENBQUMsQUFDaEIsTUFBTSxDQUFFLE9BQU8sQ0FDZixVQUFVLENBQUUsSUFBSSxBQUNsQixDQUFDLEFBRUQseUJBQXlCLGNBQUMsQ0FBQyxBQUN6QixPQUFPLENBQUUsSUFBSSxDQUNiLGVBQWUsQ0FBRSxNQUFNLENBQ3ZCLFdBQVcsQ0FBRSxNQUFNLENBQ25CLEtBQUssQ0FBRSxJQUFJLEFBQ2IsQ0FBQyxBQUVELGVBQWUsY0FBQyxDQUFDLEFBQ2YsS0FBSyxDQUFFLElBQUksQ0FDWCxNQUFNLENBQUUsSUFBSSxBQUNkLENBQUMsQUFFRCxlQUFlLGNBQUMsQ0FBQyxBQUNmLFVBQVUsQ0FBRSxNQUFNLEFBQ3BCLENBQUMsQUFFRCxrQkFBa0IsY0FBQyxDQUFDLEFBQ2xCLE9BQU8sQ0FBRSxJQUFJLENBQ2IsY0FBYyxDQUFFLE1BQU0sQ0FDdEIsZUFBZSxDQUFFLE1BQU0sQ0FDdkIsV0FBVyxDQUFFLE1BQU0sQ0FDbkIsU0FBUyxDQUFFLEtBQUssQUFDbEIsQ0FBQyxBQUVELGVBQWUsY0FBQyxDQUFDLEFBQ2YsZUFBZSxDQUFFLElBQUksQ0FDckIsS0FBSyxDQUFFLEtBQUssQ0FDWixPQUFPLENBQUUsSUFBSSxDQUNiLE1BQU0sQ0FBRSxJQUFJLENBQ1osTUFBTSxDQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUN0QixhQUFhLENBQUUsSUFBSSxDQUNuQixVQUFVLENBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxXQUFXLEFBQzFDLENBQUMsQUFFRCw2QkFBZSxNQUFNLEFBQUMsQ0FBQyxBQUNyQixNQUFNLENBQUUsT0FBTyxDQUNmLFVBQVUsQ0FBRSxJQUFJLEFBQ2xCLENBQUMifQ== */";
	    	append(document.head, style);
	    }

	    function get_each_context(ctx, list, i) {
	    	const child_ctx = Object.create(ctx);
	    	child_ctx.wallet = list[i];
	    	return child_ctx;
	    }

	    // (129:0) {#if modal}
	    function create_if_block(ctx) {
	    	var div, h3, t0_value = ctx.modal.heading, t0, t1, p, t2_value = ctx.modal.description, t2, t3, ul, t4, div_transition, current;

	    	var each_value = ctx.modal.wallets;

	    	var each_blocks = [];

	    	for (var i = 0; i < each_value.length; i += 1) {
	    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	    	}

	    	var if_block = (ctx.installMessage) && create_if_block_1(ctx);

	    	return {
	    		c: function create() {
	    			div = element("div");
	    			h3 = element("h3");
	    			t0 = text(t0_value);
	    			t1 = space();
	    			p = element("p");
	    			t2 = text(t2_value);
	    			t3 = space();
	    			ul = element("ul");

	    			for (var i = 0; i < each_blocks.length; i += 1) {
	    				each_blocks[i].c();
	    			}

	    			t4 = space();
	    			if (if_block) if_block.c();
	    			add_location(h3, file, 132, 4, 2769);
	    			add_location(p, file, 133, 4, 2798);
	    			attr(ul, "class", "bn-wallets svelte-c9u3i5");
	    			add_location(ul, file, 134, 4, 2829);
	    			attr(div, "class", "bn-ui svelte-c9u3i5");
	    			add_location(div, file, 129, 2, 2664);
	    		},

	    		m: function mount(target, anchor) {
	    			insert(target, div, anchor);
	    			append(div, h3);
	    			append(h3, t0);
	    			append(div, t1);
	    			append(div, p);
	    			append(p, t2);
	    			append(div, t3);
	    			append(div, ul);

	    			for (var i = 0; i < each_blocks.length; i += 1) {
	    				each_blocks[i].m(ul, null);
	    			}

	    			append(div, t4);
	    			if (if_block) if_block.m(div, null);
	    			current = true;
	    		},

	    		p: function update(changed, ctx) {
	    			if ((!current || changed.modal) && t0_value !== (t0_value = ctx.modal.heading)) {
	    				set_data(t0, t0_value);
	    			}

	    			if ((!current || changed.modal) && t2_value !== (t2_value = ctx.modal.description)) {
	    				set_data(t2, t2_value);
	    			}

	    			if (changed.modal) {
	    				each_value = ctx.modal.wallets;

	    				for (var i = 0; i < each_value.length; i += 1) {
	    					const child_ctx = get_each_context(ctx, each_value, i);

	    					if (each_blocks[i]) {
	    						each_blocks[i].p(changed, child_ctx);
	    					} else {
	    						each_blocks[i] = create_each_block(child_ctx);
	    						each_blocks[i].c();
	    						each_blocks[i].m(ul, null);
	    					}
	    				}

	    				for (; i < each_blocks.length; i += 1) {
	    					each_blocks[i].d(1);
	    				}
	    				each_blocks.length = each_value.length;
	    			}

	    			if (ctx.installMessage) {
	    				if (if_block) {
	    					if_block.p(changed, ctx);
	    					transition_in(if_block, 1);
	    				} else {
	    					if_block = create_if_block_1(ctx);
	    					if_block.c();
	    					transition_in(if_block, 1);
	    					if_block.m(div, null);
	    				}
	    			} else if (if_block) {
	    				group_outros();
	    				transition_out(if_block, 1, 1, () => {
	    					if_block = null;
	    				});
	    				check_outros();
	    			}
	    		},

	    		i: function intro(local) {
	    			if (current) return;
	    			transition_in(if_block);

	    			add_render_callback(() => {
	    				if (!div_transition) div_transition = create_bidirectional_transition(div, fly, { delay: 150, duration: 300, x: 400, easing: quintOut }, true);
	    				div_transition.run(1);
	    			});

	    			current = true;
	    		},

	    		o: function outro(local) {
	    			transition_out(if_block);

	    			if (!div_transition) div_transition = create_bidirectional_transition(div, fly, { delay: 150, duration: 300, x: 400, easing: quintOut }, false);
	    			div_transition.run(0);

	    			current = false;
	    		},

	    		d: function destroy(detaching) {
	    			if (detaching) {
	    				detach(div);
	    			}

	    			destroy_each(each_blocks, detaching);

	    			if (if_block) if_block.d();

	    			if (detaching) {
	    				if (div_transition) div_transition.end();
	    			}
	    		}
	    	};
	    }

	    // (136:6) {#each modal.wallets as wallet}
	    function create_each_block(ctx) {
	    	var li, div, img, img_src_value, img_alt_value, t0, span, t1_value = ctx.wallet.name, t1, t2, dispose;

	    	function click_handler() {
	    		return ctx.click_handler(ctx);
	    	}

	    	return {
	    		c: function create() {
	    			li = element("li");
	    			div = element("div");
	    			img = element("img");
	    			t0 = space();
	    			span = element("span");
	    			t1 = text(t1_value);
	    			t2 = space();
	    			attr(img, "class", "bn-wallet-icon svelte-c9u3i5");
	    			attr(img, "src", img_src_value = ctx.wallet.icon);
	    			attr(img, "alt", img_alt_value = ctx.wallet.name);
	    			add_location(img, file, 138, 12, 3027);
	    			attr(div, "class", "bn-wallet-icon-container svelte-c9u3i5");
	    			add_location(div, file, 137, 10, 2976);
	    			attr(span, "class", "bn-wallet-name svelte-c9u3i5");
	    			add_location(span, file, 140, 10, 3121);
	    			attr(li, "class", "bn-wallet svelte-c9u3i5");
	    			add_location(li, file, 136, 8, 2899);
	    			dispose = listen(li, "click", click_handler);
	    		},

	    		m: function mount(target, anchor) {
	    			insert(target, li, anchor);
	    			append(li, div);
	    			append(div, img);
	    			append(li, t0);
	    			append(li, span);
	    			append(span, t1);
	    			append(li, t2);
	    		},

	    		p: function update(changed, new_ctx) {
	    			ctx = new_ctx;
	    			if ((changed.modal) && img_src_value !== (img_src_value = ctx.wallet.icon)) {
	    				attr(img, "src", img_src_value);
	    			}

	    			if ((changed.modal) && img_alt_value !== (img_alt_value = ctx.wallet.name)) {
	    				attr(img, "alt", img_alt_value);
	    			}

	    			if ((changed.modal) && t1_value !== (t1_value = ctx.wallet.name)) {
	    				set_data(t1, t1_value);
	    			}
	    		},

	    		d: function destroy(detaching) {
	    			if (detaching) {
	    				detach(li);
	    			}

	    			dispose();
	    		}
	    	};
	    }

	    // (145:4) {#if installMessage}
	    function create_if_block_1(ctx) {
	    	var div2, div0, t0, t1, a, t2, t3_value = ctx.walletInfo.name, t3, a_href_value, t4, div1, t5, t6_value = ctx.walletInfo.name, t6, t7, t8_value = ctx.walletInfo.currentProvider, t8, t9, div2_transition, current;

	    	return {
	    		c: function create() {
	    			div2 = element("div");
	    			div0 = element("div");
	    			t0 = text(ctx.installMessage);
	    			t1 = space();
	    			a = element("a");
	    			t2 = text("Install ");
	    			t3 = text(t3_value);
	    			t4 = space();
	    			div1 = element("div");
	    			t5 = text("Hint: if you already have ");
	    			t6 = text(t6_value);
	    			t7 = text(" installed, try disabling\n          the ");
	    			t8 = text(t8_value);
	    			t9 = text(" extension and refreshing the page so\n          that we can see it.");
	    			add_location(div0, file, 146, 8, 3296);
	    			attr(a, "class", "bn-link-button svelte-c9u3i5");
	    			attr(a, "href", a_href_value = ctx.walletInfo.link);
	    			attr(a, "target", "_blank");
	    			attr(a, "rel", "noreferrer noopener");
	    			add_location(a, file, 147, 8, 3332);
	    			add_location(div1, file, 154, 8, 3521);
	    			attr(div2, "class", "bn-wallet-install svelte-c9u3i5");
	    			add_location(div2, file, 145, 6, 3240);
	    		},

	    		m: function mount(target, anchor) {
	    			insert(target, div2, anchor);
	    			append(div2, div0);
	    			append(div0, t0);
	    			append(div2, t1);
	    			append(div2, a);
	    			append(a, t2);
	    			append(a, t3);
	    			append(div2, t4);
	    			append(div2, div1);
	    			append(div1, t5);
	    			append(div1, t6);
	    			append(div1, t7);
	    			append(div1, t8);
	    			append(div1, t9);
	    			current = true;
	    		},

	    		p: function update(changed, ctx) {
	    			if (!current || changed.installMessage) {
	    				set_data(t0, ctx.installMessage);
	    			}

	    			if ((!current || changed.walletInfo) && t3_value !== (t3_value = ctx.walletInfo.name)) {
	    				set_data(t3, t3_value);
	    			}

	    			if ((!current || changed.walletInfo) && a_href_value !== (a_href_value = ctx.walletInfo.link)) {
	    				attr(a, "href", a_href_value);
	    			}

	    			if ((!current || changed.walletInfo) && t6_value !== (t6_value = ctx.walletInfo.name)) {
	    				set_data(t6, t6_value);
	    			}

	    			if ((!current || changed.walletInfo) && t8_value !== (t8_value = ctx.walletInfo.currentProvider)) {
	    				set_data(t8, t8_value);
	    			}
	    		},

	    		i: function intro(local) {
	    			if (current) return;
	    			add_render_callback(() => {
	    				if (!div2_transition) div2_transition = create_bidirectional_transition(div2, fade, {}, true);
	    				div2_transition.run(1);
	    			});

	    			current = true;
	    		},

	    		o: function outro(local) {
	    			if (!div2_transition) div2_transition = create_bidirectional_transition(div2, fade, {}, false);
	    			div2_transition.run(0);

	    			current = false;
	    		},

	    		d: function destroy(detaching) {
	    			if (detaching) {
	    				detach(div2);
	    				if (div2_transition) div2_transition.end();
	    			}
	    		}
	    	};
	    }

	    function create_fragment(ctx) {
	    	var if_block_anchor, current;

	    	var if_block = (ctx.modal) && create_if_block(ctx);

	    	return {
	    		c: function create() {
	    			if (if_block) if_block.c();
	    			if_block_anchor = empty();
	    		},

	    		l: function claim(nodes) {
	    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    		},

	    		m: function mount(target, anchor) {
	    			if (if_block) if_block.m(target, anchor);
	    			insert(target, if_block_anchor, anchor);
	    			current = true;
	    		},

	    		p: function update(changed, ctx) {
	    			if (ctx.modal) {
	    				if (if_block) {
	    					if_block.p(changed, ctx);
	    					transition_in(if_block, 1);
	    				} else {
	    					if_block = create_if_block(ctx);
	    					if_block.c();
	    					transition_in(if_block, 1);
	    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
	    				}
	    			} else if (if_block) {
	    				group_outros();
	    				transition_out(if_block, 1, 1, () => {
	    					if_block = null;
	    				});
	    				check_outros();
	    			}
	    		},

	    		i: function intro(local) {
	    			if (current) return;
	    			transition_in(if_block);
	    			current = true;
	    		},

	    		o: function outro(local) {
	    			transition_out(if_block);
	    			current = false;
	    		},

	    		d: function destroy(detaching) {
	    			if (if_block) if_block.d(detaching);

	    			if (detaching) {
	    				detach(if_block_anchor);
	    			}
	    		}
	    	};
	    }

	    function instance($$self, $$props, $$invalidate) {
	    	

	      const { mobileDevice } = state.get();

	      let modal;
	      let installMessage;
	      let walletInfo;

	      app.subscribe(({ modules: { selectWallet } }) => {
	        const moduleType = mobileDevice ? "mobile" : "desktop";
	        const wallets = selectWallet.wallets[moduleType];
	        $$invalidate('modal', modal = { ...selectWallet, wallets });
	      });

	      function handleWalletSelect(wallet) {
	        const provider = wallet.connect({
	          getProviderName,
	          createLegacyProviderInterface,
	          createModernProviderInterface
	        });

	        if (typeof provider === "string") {
	          $$invalidate('walletInfo', walletInfo = {
	            name: wallet.name,
	            link: wallet.link,
	            currentProvider: provider
	          });
	          $$invalidate('installMessage', installMessage = wallet.installMessage(provider));
	          return;
	        }

	        providerInterface.set(provider);
	        $$invalidate('modal', modal = null);
	        app.update(store => ({ ...store, selectWallet: false }));
	      }

	    	function click_handler({ wallet }) {
	    		return handleWalletSelect(wallet);
	    	}

	    	return {
	    		modal,
	    		installMessage,
	    		walletInfo,
	    		handleWalletSelect,
	    		click_handler
	    	};
	    }

	    class SelectWallet extends SvelteComponentDev {
	    	constructor(options) {
	    		super(options);
	    		if (!document.getElementById("svelte-c9u3i5-style")) add_css();
	    		init(this, options, instance, create_fragment, safe_not_equal, []);
	    	}
	    }

	    /* src/PrepareWallet.svelte generated by Svelte v3.6.10 */

	    const file$1 = "src/PrepareWallet.svelte";

	    function add_css$1() {
	    	var style = element("style");
	    	style.id = 'svelte-65wnvg-style';
	    	style.textContent = ".bn-onboard-main.svelte-65wnvg{position:absolute;top:1rem;right:1rem;background:#fff;border-radius:2px;border:1px solid #282828;box-sizing:border-box;display:flex;flex-flow:column nowrap;justify-content:center;align-items:center;padding:1rem;width:30rem;height:20rem}.close.svelte-65wnvg{position:absolute;top:1rem;right:1rem;padding:1rem;border:1px solid gray;border-radius:50%}.close.svelte-65wnvg:hover{cursor:pointer}.bn-loading-spinner.svelte-65wnvg{position:fixed;bottom:1rem;right:1rem;padding:1rem;border:1px solid gray;border-radius:8px;animation:svelte-65wnvg-spin 500ms linear infinite;z-index:999999999}.bn-prepare-error.svelte-65wnvg{color:red}@keyframes svelte-65wnvg-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJlcGFyZVdhbGxldC5zdmVsdGUiLCJzb3VyY2VzIjpbIlByZXBhcmVXYWxsZXQuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQ+XG4gIGltcG9ydCB7IGZseSwgZmFkZSB9IGZyb20gXCJzdmVsdGUvdHJhbnNpdGlvblwiO1xuICBpbXBvcnQgeyBxdWludE91dCB9IGZyb20gXCJzdmVsdGUvZWFzaW5nXCI7XG4gIGltcG9ydCB7IGJsb2NrbmF0aXZlIH0gZnJvbSBcIi4vc2VydmljZXNcIjtcbiAgaW1wb3J0IHsgYXBwLCBzdGF0ZSwgc3luY2luZ1N0YXRlIH0gZnJvbSBcIi4vc3RvcmVzXCI7XG4gIGltcG9ydCB7IHZhbGlkYXRlTW9kYWwgfSBmcm9tIFwiLi92YWxpZGF0aW9uXCI7XG5cbiAgbGV0IGFjdGl2ZU1vZGFsO1xuICBsZXQgbW9kdWxlcztcbiAgbGV0IGN1cnJlbnRNb2R1bGU7XG4gIGxldCBlcnJvck1zZztcbiAgbGV0IHBvbGxpbmdJbnRlcnZhbDtcbiAgbGV0IGNoZWNraW5nTW9kdWxlO1xuXG4gIGFwcC5zdWJzY3JpYmUoKHsgbW9kdWxlczogeyBwcmVwYXJlV2FsbGV0IH0gfSkgPT4ge1xuICAgIG1vZHVsZXMgPSBwcmVwYXJlV2FsbGV0O1xuICB9KTtcblxuICAkOiBpZiAoIWFjdGl2ZU1vZGFsICYmICFjaGVja2luZ01vZHVsZSkge1xuICAgIGNoZWNraW5nTW9kdWxlID0gdHJ1ZTtcblxuICAgIGdldEZpcnN0VmFsaWRNb2RhbChtb2R1bGVzKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICBhY3RpdmVNb2RhbCA9IHJlc3VsdC5tb2RhbDtcbiAgICAgIGN1cnJlbnRNb2R1bGUgPSByZXN1bHQubW9kdWxlO1xuXG4gICAgICBpZiAoYWN0aXZlTW9kYWwpIHtcbiAgICAgICAgYmxvY2tuYXRpdmUuZXZlbnQoe1xuICAgICAgICAgIGV2ZW50Q29kZTogYWN0aXZlTW9kYWwuZXZlbnRDb2RlLFxuICAgICAgICAgIGNhdGVnb3J5Q29kZTogXCJvbmJvYXJkXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGFjdGl2ZU1vZGFsLmFjdGlvbikge1xuICAgICAgICAgIGFjdGl2ZU1vZGFsLmFjdGlvbigpLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBlcnJvck1zZyA9IGVycjtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHBvbGwgdG8gYXV0b21hdGljYWxseSB0byBjaGVjayBpZiBjb25kaXRpb24gaGFzIGJlZW4gbWV0XG4gICAgICAgIHBvbGxpbmdJbnRlcnZhbCA9IHNldEludGVydmFsKGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBpbnZhbGlkU3RhdGUoY3VycmVudE1vZHVsZSwgc3RhdGUuZ2V0KCkpO1xuICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHBvbGxpbmdJbnRlcnZhbCk7XG4gICAgICAgICAgICBhY3RpdmVNb2RhbCA9IG51bGw7XG4gICAgICAgICAgICBjdXJyZW50TW9kdWxlID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gZGVsYXllZCBmb3IgYW5pbWF0aW9uc1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGNoZWNraW5nTW9kdWxlID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAyNTApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgNTAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFwcC51cGRhdGUoc3RvcmUgPT4gKHtcbiAgICAgICAgICAuLi5zdG9yZSxcbiAgICAgICAgICBwcmVwYXJlV2FsbGV0OiBmYWxzZSxcbiAgICAgICAgICBwcmVwYXJlV2FsbGV0Q29tcGxldGVkOiB0cnVlXG4gICAgICAgIH0pKTtcblxuICAgICAgICBibG9ja25hdGl2ZS5ldmVudCh7XG4gICAgICAgICAgY2F0ZWdvcnlDb2RlOiBcIm9uYm9hcmRcIixcbiAgICAgICAgICBldmVudENvZGU6IFwib25ib2FyZENvbXBsZXRlXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2hlY2tpbmdNb2R1bGUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIGhhbmRsZUNsaWNrKCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGludmFsaWRTdGF0ZShtb2R1bGUsIHN0YXRlLmdldCgpKTtcbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgYWN0aXZlTW9kYWwgPSBudWxsO1xuICAgICAgY3VycmVudE1vZHVsZSA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVycm9yTXNnID0gcmVzdWx0Lm1vZGFsLmludmFsaWRNc2c7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlRXhpdCgpIHtcbiAgICBjbGVhckludGVydmFsKHBvbGxpbmdJbnRlcnZhbCk7XG4gICAgYXBwLnVwZGF0ZShzdG9yZSA9PiAoeyAuLi5zdG9yZSwgcHJlcGFyZVdhbGxldDogZmFsc2UgfSkpO1xuICAgIGFjdGl2ZU1vZGFsID0gbnVsbDtcbiAgICBjdXJyZW50TW9kdWxlID0gbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEZpcnN0VmFsaWRNb2RhbChtb2R1bGVzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgZm9yIChjb25zdCBtb2R1bGUgb2YgbW9kdWxlcykge1xuICAgICAgICBpZiAoc3luY2luZ1N0YXRlKSB7XG4gICAgICAgICAgYXdhaXQgc3luY2luZ1N0YXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaXNJbnZhbGlkID0gYXdhaXQgaW52YWxpZFN0YXRlKG1vZHVsZSwgc3RhdGUuZ2V0KCkpO1xuICAgICAgICBpZiAoaXNJbnZhbGlkKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUoaXNJbnZhbGlkKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzb2x2ZSh7fSk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBpbnZhbGlkU3RhdGUobW9kdWxlLCBzdGF0ZSkge1xuICAgIGNvbnN0IHJlc3VsdCA9IG1vZHVsZShzdGF0ZSk7XG5cbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICAvLyBtb2R1bGUgcmV0dXJuZWQgYSBwcm9taXNlLCBzbyBhd2FpdCBpdCBmb3IgdmFsXG4gICAgICBpZiAocmVzdWx0LnRoZW4pIHtcbiAgICAgICAgY29uc3QgbW9kYWwgPSBhd2FpdCByZXN1bHQ7XG4gICAgICAgIGlmIChtb2RhbCkge1xuICAgICAgICAgIHZhbGlkYXRlTW9kYWwobW9kYWwpO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtb2R1bGUsXG4gICAgICAgICAgICBtb2RhbFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFsaWRhdGVNb2RhbChyZXN1bHQpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbW9kdWxlLFxuICAgICAgICBtb2RhbDogcmVzdWx0XG4gICAgICB9O1xuICAgIH1cbiAgfVxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbiAgLmJuLW9uYm9hcmQtbWFpbiB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMXJlbTtcbiAgICByaWdodDogMXJlbTtcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjMjgyODI4O1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWZsb3c6IGNvbHVtbiBub3dyYXA7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBwYWRkaW5nOiAxcmVtO1xuICAgIHdpZHRoOiAzMHJlbTtcbiAgICBoZWlnaHQ6IDIwcmVtO1xuICB9XG5cbiAgLmNsb3NlIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAxcmVtO1xuICAgIHJpZ2h0OiAxcmVtO1xuICAgIHBhZGRpbmc6IDFyZW07XG4gICAgYm9yZGVyOiAxcHggc29saWQgZ3JheTtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIH1cblxuICAuY2xvc2U6aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuXG4gIC5ibi1sb2FkaW5nLXNwaW5uZXIge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICBib3R0b206IDFyZW07XG4gICAgcmlnaHQ6IDFyZW07XG4gICAgcGFkZGluZzogMXJlbTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCBncmF5O1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICBhbmltYXRpb246IHNwaW4gNTAwbXMgbGluZWFyIGluZmluaXRlO1xuICAgIHotaW5kZXg6IDk5OTk5OTk5OTtcbiAgfVxuXG4gIC5ibi1wcmVwYXJlLWVycm9yIHtcbiAgICBjb2xvcjogcmVkO1xuICB9XG5cbiAgQGtleWZyYW1lcyBzcGluIHtcbiAgICBmcm9tIHtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xuICAgIH1cblxuICAgIHRvIHtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XG4gICAgfVxuICB9XG48L3N0eWxlPlxuXG57I2lmICFhY3RpdmVNb2RhbH1cbiAgPHNwYW4gY2xhc3M9XCJibi1sb2FkaW5nLXNwaW5uZXJcIj4uLi48L3NwYW4+XG57L2lmfVxuXG57I2lmIGFjdGl2ZU1vZGFsfVxuICA8ZGl2XG4gICAgdHJhbnNpdGlvbjpmbHk9e3sgZGVsYXk6IDE1MCwgZHVyYXRpb246IDMwMCwgeDogNDAwLCBlYXNpbmc6IHF1aW50T3V0IH19XG4gICAgY2xhc3M9XCJibi1vbmJvYXJkLW1haW5cIj5cbiAgICB7I2lmIGFjdGl2ZU1vZGFsLmltZ31cbiAgICAgIDxkaXY+XG4gICAgICAgIDxpbWcgc3JjPXthY3RpdmVNb2RhbC5pbWd9IGFsdD17YWN0aXZlTW9kYWwuaGVhZGluZ30gLz5cbiAgICAgIDwvZGl2PlxuICAgIHsvaWZ9XG4gICAgPGgyPnthY3RpdmVNb2RhbC5oZWFkaW5nfTwvaDI+XG4gICAgPHA+e2FjdGl2ZU1vZGFsLmRlc2NyaXB0aW9ufTwvcD5cbiAgICB7I2lmIGFjdGl2ZU1vZGFsLnJlbG9hZFdpbmRvd31cbiAgICAgIDxidXR0b24gb246Y2xpY2s9e2hhbmRsZUNsaWNrfT57YWN0aXZlTW9kYWwuYnV0dG9ufTwvYnV0dG9uPlxuICAgIHsvaWZ9XG4gICAgeyNpZiBlcnJvck1zZ31cbiAgICAgIDxzcGFuIGNsYXNzPVwiYm4tcHJlcGFyZS1lcnJvclwiPntlcnJvck1zZ308L3NwYW4+XG4gICAgey9pZn1cbiAgICA8c3BhbiBvbjpjbGljaz17aGFuZGxlRXhpdH0gY2xhc3M9XCJjbG9zZVwiPlg8L3NwYW4+XG4gIDwvZGl2Plxuey9pZn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnSUUsZ0JBQWdCLGNBQUMsQ0FBQyxBQUNoQixRQUFRLENBQUUsUUFBUSxDQUNsQixHQUFHLENBQUUsSUFBSSxDQUNULEtBQUssQ0FBRSxJQUFJLENBQ1gsVUFBVSxDQUFFLElBQUksQ0FDaEIsYUFBYSxDQUFFLEdBQUcsQ0FDbEIsTUFBTSxDQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUN6QixVQUFVLENBQUUsVUFBVSxDQUN0QixPQUFPLENBQUUsSUFBSSxDQUNiLFNBQVMsQ0FBRSxNQUFNLENBQUMsTUFBTSxDQUN4QixlQUFlLENBQUUsTUFBTSxDQUN2QixXQUFXLENBQUUsTUFBTSxDQUNuQixPQUFPLENBQUUsSUFBSSxDQUNiLEtBQUssQ0FBRSxLQUFLLENBQ1osTUFBTSxDQUFFLEtBQUssQUFDZixDQUFDLEFBRUQsTUFBTSxjQUFDLENBQUMsQUFDTixRQUFRLENBQUUsUUFBUSxDQUNsQixHQUFHLENBQUUsSUFBSSxDQUNULEtBQUssQ0FBRSxJQUFJLENBQ1gsT0FBTyxDQUFFLElBQUksQ0FDYixNQUFNLENBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQ3RCLGFBQWEsQ0FBRSxHQUFHLEFBQ3BCLENBQUMsQUFFRCxvQkFBTSxNQUFNLEFBQUMsQ0FBQyxBQUNaLE1BQU0sQ0FBRSxPQUFPLEFBQ2pCLENBQUMsQUFFRCxtQkFBbUIsY0FBQyxDQUFDLEFBQ25CLFFBQVEsQ0FBRSxLQUFLLENBQ2YsTUFBTSxDQUFFLElBQUksQ0FDWixLQUFLLENBQUUsSUFBSSxDQUNYLE9BQU8sQ0FBRSxJQUFJLENBQ2IsTUFBTSxDQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUN0QixhQUFhLENBQUUsR0FBRyxDQUNsQixTQUFTLENBQUUsa0JBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FDckMsT0FBTyxDQUFFLFNBQVMsQUFDcEIsQ0FBQyxBQUVELGlCQUFpQixjQUFDLENBQUMsQUFDakIsS0FBSyxDQUFFLEdBQUcsQUFDWixDQUFDLEFBRUQsV0FBVyxrQkFBSyxDQUFDLEFBQ2YsSUFBSSxBQUFDLENBQUMsQUFDSixTQUFTLENBQUUsT0FBTyxJQUFJLENBQUMsQUFDekIsQ0FBQyxBQUVELEVBQUUsQUFBQyxDQUFDLEFBQ0YsU0FBUyxDQUFFLE9BQU8sTUFBTSxDQUFDLEFBQzNCLENBQUMsQUFDSCxDQUFDIn0= */";
	    	append(document.head, style);
	    }

	    // (185:0) {#if !activeModal}
	    function create_if_block_4(ctx) {
	    	var span;

	    	return {
	    		c: function create() {
	    			span = element("span");
	    			span.textContent = "...";
	    			attr(span, "class", "bn-loading-spinner svelte-65wnvg");
	    			add_location(span, file$1, 185, 2, 3950);
	    		},

	    		m: function mount(target, anchor) {
	    			insert(target, span, anchor);
	    		},

	    		d: function destroy(detaching) {
	    			if (detaching) {
	    				detach(span);
	    			}
	    		}
	    	};
	    }

	    // (189:0) {#if activeModal}
	    function create_if_block$1(ctx) {
	    	var div, t0, h2, t1_value = ctx.activeModal.heading, t1, t2, p, t3_value = ctx.activeModal.description, t3, t4, t5, t6, span, div_transition, current, dispose;

	    	var if_block0 = (ctx.activeModal.img) && create_if_block_3(ctx);

	    	var if_block1 = (ctx.activeModal.reloadWindow) && create_if_block_2(ctx);

	    	var if_block2 = (ctx.errorMsg) && create_if_block_1$1(ctx);

	    	return {
	    		c: function create() {
	    			div = element("div");
	    			if (if_block0) if_block0.c();
	    			t0 = space();
	    			h2 = element("h2");
	    			t1 = text(t1_value);
	    			t2 = space();
	    			p = element("p");
	    			t3 = text(t3_value);
	    			t4 = space();
	    			if (if_block1) if_block1.c();
	    			t5 = space();
	    			if (if_block2) if_block2.c();
	    			t6 = space();
	    			span = element("span");
	    			span.textContent = "X";
	    			add_location(h2, file$1, 197, 4, 4261);
	    			add_location(p, file$1, 198, 4, 4296);
	    			attr(span, "class", "close svelte-65wnvg");
	    			add_location(span, file$1, 205, 4, 4529);
	    			attr(div, "class", "bn-onboard-main svelte-65wnvg");
	    			add_location(div, file$1, 189, 2, 4021);
	    			dispose = listen(span, "click", ctx.handleExit);
	    		},

	    		m: function mount(target, anchor) {
	    			insert(target, div, anchor);
	    			if (if_block0) if_block0.m(div, null);
	    			append(div, t0);
	    			append(div, h2);
	    			append(h2, t1);
	    			append(div, t2);
	    			append(div, p);
	    			append(p, t3);
	    			append(div, t4);
	    			if (if_block1) if_block1.m(div, null);
	    			append(div, t5);
	    			if (if_block2) if_block2.m(div, null);
	    			append(div, t6);
	    			append(div, span);
	    			current = true;
	    		},

	    		p: function update(changed, ctx) {
	    			if (ctx.activeModal.img) {
	    				if (if_block0) {
	    					if_block0.p(changed, ctx);
	    				} else {
	    					if_block0 = create_if_block_3(ctx);
	    					if_block0.c();
	    					if_block0.m(div, t0);
	    				}
	    			} else if (if_block0) {
	    				if_block0.d(1);
	    				if_block0 = null;
	    			}

	    			if ((!current || changed.activeModal) && t1_value !== (t1_value = ctx.activeModal.heading)) {
	    				set_data(t1, t1_value);
	    			}

	    			if ((!current || changed.activeModal) && t3_value !== (t3_value = ctx.activeModal.description)) {
	    				set_data(t3, t3_value);
	    			}

	    			if (ctx.activeModal.reloadWindow) {
	    				if (if_block1) {
	    					if_block1.p(changed, ctx);
	    				} else {
	    					if_block1 = create_if_block_2(ctx);
	    					if_block1.c();
	    					if_block1.m(div, t5);
	    				}
	    			} else if (if_block1) {
	    				if_block1.d(1);
	    				if_block1 = null;
	    			}

	    			if (ctx.errorMsg) {
	    				if (if_block2) {
	    					if_block2.p(changed, ctx);
	    				} else {
	    					if_block2 = create_if_block_1$1(ctx);
	    					if_block2.c();
	    					if_block2.m(div, t6);
	    				}
	    			} else if (if_block2) {
	    				if_block2.d(1);
	    				if_block2 = null;
	    			}
	    		},

	    		i: function intro(local) {
	    			if (current) return;
	    			add_render_callback(() => {
	    				if (!div_transition) div_transition = create_bidirectional_transition(div, fly, { delay: 150, duration: 300, x: 400, easing: quintOut }, true);
	    				div_transition.run(1);
	    			});

	    			current = true;
	    		},

	    		o: function outro(local) {
	    			if (!div_transition) div_transition = create_bidirectional_transition(div, fly, { delay: 150, duration: 300, x: 400, easing: quintOut }, false);
	    			div_transition.run(0);

	    			current = false;
	    		},

	    		d: function destroy(detaching) {
	    			if (detaching) {
	    				detach(div);
	    			}

	    			if (if_block0) if_block0.d();
	    			if (if_block1) if_block1.d();
	    			if (if_block2) if_block2.d();

	    			if (detaching) {
	    				if (div_transition) div_transition.end();
	    			}

	    			dispose();
	    		}
	    	};
	    }

	    // (193:4) {#if activeModal.img}
	    function create_if_block_3(ctx) {
	    	var div, img, img_src_value, img_alt_value;

	    	return {
	    		c: function create() {
	    			div = element("div");
	    			img = element("img");
	    			attr(img, "src", img_src_value = ctx.activeModal.img);
	    			attr(img, "alt", img_alt_value = ctx.activeModal.heading);
	    			add_location(img, file$1, 194, 8, 4178);
	    			add_location(div, file$1, 193, 6, 4164);
	    		},

	    		m: function mount(target, anchor) {
	    			insert(target, div, anchor);
	    			append(div, img);
	    		},

	    		p: function update(changed, ctx) {
	    			if ((changed.activeModal) && img_src_value !== (img_src_value = ctx.activeModal.img)) {
	    				attr(img, "src", img_src_value);
	    			}

	    			if ((changed.activeModal) && img_alt_value !== (img_alt_value = ctx.activeModal.heading)) {
	    				attr(img, "alt", img_alt_value);
	    			}
	    		},

	    		d: function destroy(detaching) {
	    			if (detaching) {
	    				detach(div);
	    			}
	    		}
	    	};
	    }

	    // (200:4) {#if activeModal.reloadWindow}
	    function create_if_block_2(ctx) {
	    	var button, t_value = ctx.activeModal.button, t, dispose;

	    	return {
	    		c: function create() {
	    			button = element("button");
	    			t = text(t_value);
	    			add_location(button, file$1, 200, 6, 4370);
	    			dispose = listen(button, "click", ctx.handleClick);
	    		},

	    		m: function mount(target, anchor) {
	    			insert(target, button, anchor);
	    			append(button, t);
	    		},

	    		p: function update(changed, ctx) {
	    			if ((changed.activeModal) && t_value !== (t_value = ctx.activeModal.button)) {
	    				set_data(t, t_value);
	    			}
	    		},

	    		d: function destroy(detaching) {
	    			if (detaching) {
	    				detach(button);
	    			}

	    			dispose();
	    		}
	    	};
	    }

	    // (203:4) {#if errorMsg}
	    function create_if_block_1$1(ctx) {
	    	var span, t;

	    	return {
	    		c: function create() {
	    			span = element("span");
	    			t = text(ctx.errorMsg);
	    			attr(span, "class", "bn-prepare-error svelte-65wnvg");
	    			add_location(span, file$1, 203, 6, 4466);
	    		},

	    		m: function mount(target, anchor) {
	    			insert(target, span, anchor);
	    			append(span, t);
	    		},

	    		p: function update(changed, ctx) {
	    			if (changed.errorMsg) {
	    				set_data(t, ctx.errorMsg);
	    			}
	    		},

	    		d: function destroy(detaching) {
	    			if (detaching) {
	    				detach(span);
	    			}
	    		}
	    	};
	    }

	    function create_fragment$1(ctx) {
	    	var t, if_block1_anchor, current;

	    	var if_block0 = (!ctx.activeModal) && create_if_block_4();

	    	var if_block1 = (ctx.activeModal) && create_if_block$1(ctx);

	    	return {
	    		c: function create() {
	    			if (if_block0) if_block0.c();
	    			t = space();
	    			if (if_block1) if_block1.c();
	    			if_block1_anchor = empty();
	    		},

	    		l: function claim(nodes) {
	    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    		},

	    		m: function mount(target, anchor) {
	    			if (if_block0) if_block0.m(target, anchor);
	    			insert(target, t, anchor);
	    			if (if_block1) if_block1.m(target, anchor);
	    			insert(target, if_block1_anchor, anchor);
	    			current = true;
	    		},

	    		p: function update(changed, ctx) {
	    			if (!ctx.activeModal) {
	    				if (!if_block0) {
	    					if_block0 = create_if_block_4();
	    					if_block0.c();
	    					if_block0.m(t.parentNode, t);
	    				}
	    			} else if (if_block0) {
	    				if_block0.d(1);
	    				if_block0 = null;
	    			}

	    			if (ctx.activeModal) {
	    				if (if_block1) {
	    					if_block1.p(changed, ctx);
	    					transition_in(if_block1, 1);
	    				} else {
	    					if_block1 = create_if_block$1(ctx);
	    					if_block1.c();
	    					transition_in(if_block1, 1);
	    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
	    				}
	    			} else if (if_block1) {
	    				group_outros();
	    				transition_out(if_block1, 1, 1, () => {
	    					if_block1 = null;
	    				});
	    				check_outros();
	    			}
	    		},

	    		i: function intro(local) {
	    			if (current) return;
	    			transition_in(if_block1);
	    			current = true;
	    		},

	    		o: function outro(local) {
	    			transition_out(if_block1);
	    			current = false;
	    		},

	    		d: function destroy(detaching) {
	    			if (if_block0) if_block0.d(detaching);

	    			if (detaching) {
	    				detach(t);
	    			}

	    			if (if_block1) if_block1.d(detaching);

	    			if (detaching) {
	    				detach(if_block1_anchor);
	    			}
	    		}
	    	};
	    }

	    function getFirstValidModal(modules) {
	      return new Promise(async resolve => {
	        for (const module of modules) {
	          if (syncingState) {
	            await syncingState;
	          }

	          const isInvalid = await invalidState(module, state.get());
	          if (isInvalid) {
	            return resolve(isInvalid);
	          }
	        }

	        return resolve({});
	      });
	    }

	    async function invalidState(module, state) {
	      const result = module(state);

	      if (result) {
	        // module returned a promise, so await it for val
	        if (result.then) {
	          const modal = await result;
	          if (modal) {
	            validateModal(modal);
	            return {
	              module,
	              modal
	            };
	          }
	        }

	        validateModal(result);
	        return {
	          module,
	          modal: result
	        };
	      }
	    }

	    function instance$1($$self, $$props, $$invalidate) {
	    	

	      let activeModal;
	      let modules;
	      let currentModule;
	      let errorMsg;
	      let pollingInterval;
	      let checkingModule;

	      app.subscribe(({ modules: { prepareWallet } }) => {
	        $$invalidate('modules', modules = prepareWallet);
	      });

	      async function handleClick() {
	        const result = await invalidState(module, state.get());
	        if (!result) {
	          $$invalidate('activeModal', activeModal = null);
	          $$invalidate('currentModule', currentModule = null);
	        } else {
	          $$invalidate('errorMsg', errorMsg = result.modal.invalidMsg);
	        }
	      }

	      function handleExit() {
	        clearInterval(pollingInterval);
	        app.update(store => ({ ...store, prepareWallet: false }));
	        $$invalidate('activeModal', activeModal = null);
	        $$invalidate('currentModule', currentModule = null);
	      }

	    	$$self.$$.update = ($$dirty = { activeModal: 1, checkingModule: 1, modules: 1, currentModule: 1, pollingInterval: 1 }) => {
	    		if ($$dirty.activeModal || $$dirty.checkingModule || $$dirty.modules || $$dirty.currentModule || $$dirty.pollingInterval) { if (!activeModal && !checkingModule) {
	            $$invalidate('checkingModule', checkingModule = true);
	        
	            getFirstValidModal(modules).then(result => {
	              $$invalidate('activeModal', activeModal = result.modal);
	              $$invalidate('currentModule', currentModule = result.module);
	        
	              if (activeModal) {
	                blocknative.event({
	                  eventCode: activeModal.eventCode,
	                  categoryCode: "onboard"
	                });
	        
	                if (activeModal.action) {
	                  activeModal.action().catch(err => {
	                    $$invalidate('errorMsg', errorMsg = err);
	                  });
	                }
	        
	                // poll to automatically to check if condition has been met
	                $$invalidate('pollingInterval', pollingInterval = setInterval(async () => {
	                  const result = await invalidState(currentModule, state.get());
	                  if (!result) {
	                    clearInterval(pollingInterval);
	                    $$invalidate('activeModal', activeModal = null);
	                    $$invalidate('currentModule', currentModule = null);
	        
	                    // delayed for animations
	                    setTimeout(() => {
	                      $$invalidate('checkingModule', checkingModule = false);
	                    }, 250);
	                  }
	                }, 500));
	              } else {
	                app.update(store => ({
	                  ...store,
	                  prepareWallet: false,
	                  prepareWalletCompleted: true
	                }));
	        
	                blocknative.event({
	                  categoryCode: "onboard",
	                  eventCode: "onboardComplete"
	                });
	        
	                $$invalidate('checkingModule', checkingModule = false);
	              }
	            });
	          } }
	    	};

	    	return {
	    		activeModal,
	    		errorMsg,
	    		handleClick,
	    		handleExit
	    	};
	    }

	    class PrepareWallet extends SvelteComponentDev {
	    	constructor(options) {
	    		super(options);
	    		if (!document.getElementById("svelte-65wnvg-style")) add_css$1();
	    		init(this, options, instance$1, create_fragment$1, safe_not_equal, []);
	    	}
	    }

	    /* src/Onboard.svelte generated by Svelte v3.6.10 */

	    // (11:0) {#if $app.selectWallet}
	    function create_if_block_1$2(ctx) {
	    	var current;

	    	var selectwallet = new SelectWallet({ $$inline: true });

	    	return {
	    		c: function create() {
	    			selectwallet.$$.fragment.c();
	    		},

	    		m: function mount(target, anchor) {
	    			mount_component(selectwallet, target, anchor);
	    			current = true;
	    		},

	    		i: function intro(local) {
	    			if (current) return;
	    			transition_in(selectwallet.$$.fragment, local);

	    			current = true;
	    		},

	    		o: function outro(local) {
	    			transition_out(selectwallet.$$.fragment, local);
	    			current = false;
	    		},

	    		d: function destroy(detaching) {
	    			destroy_component(selectwallet, detaching);
	    		}
	    	};
	    }

	    // (15:0) {#if $app.prepareWallet}
	    function create_if_block$2(ctx) {
	    	var current;

	    	var preparewallet = new PrepareWallet({ $$inline: true });

	    	return {
	    		c: function create() {
	    			preparewallet.$$.fragment.c();
	    		},

	    		m: function mount(target, anchor) {
	    			mount_component(preparewallet, target, anchor);
	    			current = true;
	    		},

	    		i: function intro(local) {
	    			if (current) return;
	    			transition_in(preparewallet.$$.fragment, local);

	    			current = true;
	    		},

	    		o: function outro(local) {
	    			transition_out(preparewallet.$$.fragment, local);
	    			current = false;
	    		},

	    		d: function destroy(detaching) {
	    			destroy_component(preparewallet, detaching);
	    		}
	    	};
	    }

	    function create_fragment$2(ctx) {
	    	var t, if_block1_anchor, current;

	    	var if_block0 = (ctx.$app.selectWallet) && create_if_block_1$2();

	    	var if_block1 = (ctx.$app.prepareWallet) && create_if_block$2();

	    	return {
	    		c: function create() {
	    			if (if_block0) if_block0.c();
	    			t = space();
	    			if (if_block1) if_block1.c();
	    			if_block1_anchor = empty();
	    		},

	    		l: function claim(nodes) {
	    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    		},

	    		m: function mount(target, anchor) {
	    			if (if_block0) if_block0.m(target, anchor);
	    			insert(target, t, anchor);
	    			if (if_block1) if_block1.m(target, anchor);
	    			insert(target, if_block1_anchor, anchor);
	    			current = true;
	    		},

	    		p: function update(changed, ctx) {
	    			if (ctx.$app.selectWallet) {
	    				if (!if_block0) {
	    					if_block0 = create_if_block_1$2();
	    					if_block0.c();
	    					transition_in(if_block0, 1);
	    					if_block0.m(t.parentNode, t);
	    				} else {
	    									transition_in(if_block0, 1);
	    				}
	    			} else if (if_block0) {
	    				group_outros();
	    				transition_out(if_block0, 1, 1, () => {
	    					if_block0 = null;
	    				});
	    				check_outros();
	    			}

	    			if (ctx.$app.prepareWallet) {
	    				if (!if_block1) {
	    					if_block1 = create_if_block$2();
	    					if_block1.c();
	    					transition_in(if_block1, 1);
	    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
	    				} else {
	    									transition_in(if_block1, 1);
	    				}
	    			} else if (if_block1) {
	    				group_outros();
	    				transition_out(if_block1, 1, 1, () => {
	    					if_block1 = null;
	    				});
	    				check_outros();
	    			}
	    		},

	    		i: function intro(local) {
	    			if (current) return;
	    			transition_in(if_block0);
	    			transition_in(if_block1);
	    			current = true;
	    		},

	    		o: function outro(local) {
	    			transition_out(if_block0);
	    			transition_out(if_block1);
	    			current = false;
	    		},

	    		d: function destroy(detaching) {
	    			if (if_block0) if_block0.d(detaching);

	    			if (detaching) {
	    				detach(t);
	    			}

	    			if (if_block1) if_block1.d(detaching);

	    			if (detaching) {
	    				detach(if_block1_anchor);
	    			}
	    		}
	    	};
	    }

	    function instance$2($$self, $$props, $$invalidate) {
	    	let $app;

	    	validate_store(app, 'app');
	    	subscribe($$self, app, $$value => { $app = $$value; $$invalidate('$app', $app); });

	    	return { $app };
	    }

	    class Onboard extends SvelteComponentDev {
	    	constructor(options) {
	    		super(options);
	    		init(this, options, instance$2, create_fragment$2, safe_not_equal, []);
	    	}
	    }

	    var es5 = createCommonjsModule(function (module, exports) {
	    !function(e,t){module.exports=t();}(commonjsGlobal$1,function(){return function(e){var t={};function r(i){if(t[i])return t[i].exports;var n=t[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,i){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i});},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0});},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(i,n,function(t){return e[t]}.bind(null,n));return i},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=90)}({17:function(e,t,r){t.__esModule=!0,t.default=void 0;var i=r(18),n=function(){function e(){}return e.getFirstMatch=function(e,t){var r=t.match(e);return r&&r.length>0&&r[1]||""},e.getSecondMatch=function(e,t){var r=t.match(e);return r&&r.length>1&&r[2]||""},e.matchAndReturnConst=function(e,t,r){if(e.test(t))return r},e.getWindowsVersionName=function(e){switch(e){case"NT":return "NT";case"XP":return "XP";case"NT 5.0":return "2000";case"NT 5.1":return "XP";case"NT 5.2":return "2003";case"NT 6.0":return "Vista";case"NT 6.1":return "7";case"NT 6.2":return "8";case"NT 6.3":return "8.1";case"NT 10.0":return "10";default:return}},e.getAndroidVersionName=function(e){var t=e.split(".").splice(0,2).map(function(e){return parseInt(e,10)||0});if(t.push(0),!(1===t[0]&&t[1]<5))return 1===t[0]&&t[1]<6?"Cupcake":1===t[0]&&t[1]>=6?"Donut":2===t[0]&&t[1]<2?"Eclair":2===t[0]&&2===t[1]?"Froyo":2===t[0]&&t[1]>2?"Gingerbread":3===t[0]?"Honeycomb":4===t[0]&&t[1]<1?"Ice Cream Sandwich":4===t[0]&&t[1]<4?"Jelly Bean":4===t[0]&&t[1]>=4?"KitKat":5===t[0]?"Lollipop":6===t[0]?"Marshmallow":7===t[0]?"Nougat":8===t[0]?"Oreo":void 0},e.getVersionPrecision=function(e){return e.split(".").length},e.compareVersions=function(t,r,i){void 0===i&&(i=!1);var n=e.getVersionPrecision(t),s=e.getVersionPrecision(r),o=Math.max(n,s),a=0,u=e.map([t,r],function(t){var r=o-e.getVersionPrecision(t),i=t+new Array(r+1).join(".0");return e.map(i.split("."),function(e){return new Array(20-e.length).join("0")+e}).reverse()});for(i&&(a=o-Math.min(n,s)),o-=1;o>=a;){if(u[0][o]>u[1][o])return 1;if(u[0][o]===u[1][o]){if(o===a)return 0;o-=1;}else if(u[0][o]<u[1][o])return -1}},e.map=function(e,t){var r,i=[];if(Array.prototype.map)return Array.prototype.map.call(e,t);for(r=0;r<e.length;r+=1)i.push(t(e[r]));return i},e.getBrowserAlias=function(e){return i.BROWSER_ALIASES_MAP[e]},e.getBrowserTypeByAlias=function(e){return i.BROWSER_MAP[e]||""},e}();t.default=n,e.exports=t.default;},18:function(e,t,r){t.__esModule=!0,t.ENGINE_MAP=t.OS_MAP=t.PLATFORMS_MAP=t.BROWSER_MAP=t.BROWSER_ALIASES_MAP=void 0;t.BROWSER_ALIASES_MAP={"Amazon Silk":"amazon_silk","Android Browser":"android",Bada:"bada",BlackBerry:"blackberry",Chrome:"chrome",Chromium:"chromium",Epiphany:"epiphany",Firefox:"firefox",Focus:"focus",Generic:"generic",Googlebot:"googlebot","Internet Explorer":"ie","K-Meleon":"k_meleon",Maxthon:"maxthon","Microsoft Edge":"edge","MZ Browser":"mz","NAVER Whale Browser":"naver",Opera:"opera","Opera Coast":"opera_coast",PhantomJS:"phantomjs",Puffin:"puffin",QupZilla:"qupzilla",Safari:"safari",Sailfish:"sailfish","Samsung Internet for Android":"samsung_internet",SeaMonkey:"seamonkey",Sleipnir:"sleipnir",Swing:"swing",Tizen:"tizen","UC Browser":"uc",Vivaldi:"vivaldi","WebOS Browser":"webos",WeChat:"wechat","Yandex Browser":"yandex",Roku:"roku"};t.BROWSER_MAP={amazon_silk:"Amazon Silk",android:"Android Browser",bada:"Bada",blackberry:"BlackBerry",chrome:"Chrome",chromium:"Chromium",epiphany:"Epiphany",firefox:"Firefox",focus:"Focus",generic:"Generic",googlebot:"Googlebot",ie:"Internet Explorer",k_meleon:"K-Meleon",maxthon:"Maxthon",edge:"Microsoft Edge",mz:"MZ Browser",naver:"NAVER Whale Browser",opera:"Opera",opera_coast:"Opera Coast",phantomjs:"PhantomJS",puffin:"Puffin",qupzilla:"QupZilla",safari:"Safari",sailfish:"Sailfish",samsung_internet:"Samsung Internet for Android",seamonkey:"SeaMonkey",sleipnir:"Sleipnir",swing:"Swing",tizen:"Tizen",uc:"UC Browser",vivaldi:"Vivaldi",webos:"WebOS Browser",wechat:"WeChat",yandex:"Yandex Browser"};t.PLATFORMS_MAP={tablet:"tablet",mobile:"mobile",desktop:"desktop",tv:"tv"};t.OS_MAP={WindowsPhone:"Windows Phone",Windows:"Windows",MacOS:"macOS",iOS:"iOS",Android:"Android",WebOS:"WebOS",BlackBerry:"BlackBerry",Bada:"Bada",Tizen:"Tizen",Linux:"Linux",ChromeOS:"Chrome OS",PlayStation4:"PlayStation 4",Roku:"Roku"};t.ENGINE_MAP={EdgeHTML:"EdgeHTML",Blink:"Blink",Trident:"Trident",Presto:"Presto",Gecko:"Gecko",WebKit:"WebKit"};},90:function(e,t,r){t.__esModule=!0,t.default=void 0;var i,n=(i=r(91))&&i.__esModule?i:{default:i},s=r(18);function o(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i);}}var a=function(){function e(){}var t,r,i;return e.getParser=function(e,t){if(void 0===t&&(t=!1),"string"!=typeof e)throw new Error("UserAgent should be a string");return new n.default(e,t)},e.parse=function(e){return new n.default(e).getResult()},t=e,i=[{key:"BROWSER_MAP",get:function(){return s.BROWSER_MAP}},{key:"ENGINE_MAP",get:function(){return s.ENGINE_MAP}},{key:"OS_MAP",get:function(){return s.OS_MAP}},{key:"PLATFORMS_MAP",get:function(){return s.PLATFORMS_MAP}}],(r=null)&&o(t.prototype,r),i&&o(t,i),e}();t.default=a,e.exports=t.default;},91:function(e,t,r){t.__esModule=!0,t.default=void 0;var i=u(r(92)),n=u(r(93)),s=u(r(94)),o=u(r(95)),a=u(r(17));function u(e){return e&&e.__esModule?e:{default:e}}var d=function(){function e(e,t){if(void 0===t&&(t=!1),null==e||""===e)throw new Error("UserAgent parameter can't be empty");this._ua=e,this.parsedResult={},!0!==t&&this.parse();}var t=e.prototype;return t.getUA=function(){return this._ua},t.test=function(e){return e.test(this._ua)},t.parseBrowser=function(){var e=this;this.parsedResult.browser={};var t=i.default.find(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some(function(t){return e.test(t)});throw new Error("Browser's test function is not valid")});return t&&(this.parsedResult.browser=t.describe(this.getUA())),this.parsedResult.browser},t.getBrowser=function(){return this.parsedResult.browser?this.parsedResult.browser:this.parseBrowser()},t.getBrowserName=function(e){return e?String(this.getBrowser().name).toLowerCase()||"":this.getBrowser().name||""},t.getBrowserVersion=function(){return this.getBrowser().version},t.getOS=function(){return this.parsedResult.os?this.parsedResult.os:this.parseOS()},t.parseOS=function(){var e=this;this.parsedResult.os={};var t=n.default.find(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some(function(t){return e.test(t)});throw new Error("Browser's test function is not valid")});return t&&(this.parsedResult.os=t.describe(this.getUA())),this.parsedResult.os},t.getOSName=function(e){var t=this.getOS().name;return e?String(t).toLowerCase()||"":t||""},t.getOSVersion=function(){return this.getOS().version},t.getPlatform=function(){return this.parsedResult.platform?this.parsedResult.platform:this.parsePlatform()},t.getPlatformType=function(e){void 0===e&&(e=!1);var t=this.getPlatform().type;return e?String(t).toLowerCase()||"":t||""},t.parsePlatform=function(){var e=this;this.parsedResult.platform={};var t=s.default.find(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some(function(t){return e.test(t)});throw new Error("Browser's test function is not valid")});return t&&(this.parsedResult.platform=t.describe(this.getUA())),this.parsedResult.platform},t.getEngine=function(){return this.parsedResult.engine?this.parsedResult.engine:this.parseEngine()},t.getEngineName=function(e){return e?String(this.getEngine().name).toLowerCase()||"":this.getEngine().name||""},t.parseEngine=function(){var e=this;this.parsedResult.engine={};var t=o.default.find(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some(function(t){return e.test(t)});throw new Error("Browser's test function is not valid")});return t&&(this.parsedResult.engine=t.describe(this.getUA())),this.parsedResult.engine},t.parse=function(){return this.parseBrowser(),this.parseOS(),this.parsePlatform(),this.parseEngine(),this},t.getResult=function(){return Object.assign({},this.parsedResult)},t.satisfies=function(e){var t=this,r={},i=0,n={},s=0;if(Object.keys(e).forEach(function(t){var o=e[t];"string"==typeof o?(n[t]=o,s+=1):"object"==typeof o&&(r[t]=o,i+=1);}),i>0){var o=Object.keys(r),a=o.find(function(e){return t.isOS(e)});if(a){var u=this.satisfies(r[a]);if(void 0!==u)return u}var d=o.find(function(e){return t.isPlatform(e)});if(d){var c=this.satisfies(r[d]);if(void 0!==c)return c}}if(s>0){var f=Object.keys(n).find(function(e){return t.isBrowser(e,!0)});if(void 0!==f)return this.compareVersion(n[f])}},t.isBrowser=function(e,t){void 0===t&&(t=!1);var r=this.getBrowserName().toLowerCase(),i=e.toLowerCase(),n=a.default.getBrowserTypeByAlias(i);return t&&n&&(i=n.toLowerCase()),i===r},t.compareVersion=function(e){var t=[0],r=e,i=!1,n=this.getBrowserVersion();if("string"==typeof n)return ">"===e[0]||"<"===e[0]?(r=e.substr(1),"="===e[1]?(i=!0,r=e.substr(2)):t=[],">"===e[0]?t.push(1):t.push(-1)):"="===e[0]?r=e.substr(1):"~"===e[0]&&(i=!0,r=e.substr(1)),t.indexOf(a.default.compareVersions(n,r,i))>-1},t.isOS=function(e){return this.getOSName(!0)===String(e).toLowerCase()},t.isPlatform=function(e){return this.getPlatformType(!0)===String(e).toLowerCase()},t.isEngine=function(e){return this.getEngineName(!0)===String(e).toLowerCase()},t.is=function(e){return this.isBrowser(e)||this.isOS(e)||this.isPlatform(e)},t.some=function(e){var t=this;return void 0===e&&(e=[]),e.some(function(e){return t.is(e)})},e}();t.default=d,e.exports=t.default;},92:function(e,t,r){t.__esModule=!0,t.default=void 0;var i,n=(i=r(17))&&i.__esModule?i:{default:i};var s=/version\/(\d+(\.?_?\d+)+)/i,o=[{test:[/googlebot/i],describe:function(e){var t={name:"Googlebot"},r=n.default.getFirstMatch(/googlebot\/(\d+(\.\d+))/i,e)||n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/opera/i],describe:function(e){var t={name:"Opera"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/(?:opera)[\s\/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/opr\/|opios/i],describe:function(e){var t={name:"Opera"},r=n.default.getFirstMatch(/(?:opr|opios)[\s\/](\S+)/i,e)||n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/SamsungBrowser/i],describe:function(e){var t={name:"Samsung Internet for Android"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/Whale/i],describe:function(e){var t={name:"NAVER Whale Browser"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/(?:whale)[\s\/](\d+(?:\.\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/MZBrowser/i],describe:function(e){var t={name:"MZ Browser"},r=n.default.getFirstMatch(/(?:MZBrowser)[\s\/](\d+(?:\.\d+)+)/i,e)||n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/focus/i],describe:function(e){var t={name:"Focus"},r=n.default.getFirstMatch(/(?:focus)[\s\/](\d+(?:\.\d+)+)/i,e)||n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/swing/i],describe:function(e){var t={name:"Swing"},r=n.default.getFirstMatch(/(?:swing)[\s\/](\d+(?:\.\d+)+)/i,e)||n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/coast/i],describe:function(e){var t={name:"Opera Coast"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/(?:coast)[\s\/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/yabrowser/i],describe:function(e){var t={name:"Yandex Browser"},r=n.default.getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.?_?\d+)+)/i,e)||n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/ucbrowser/i],describe:function(e){var t={name:"UC Browser"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/(?:ucbrowser)[\s\/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/Maxthon|mxios/i],describe:function(e){var t={name:"Maxthon"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/(?:Maxthon|mxios)[\s\/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/epiphany/i],describe:function(e){var t={name:"Epiphany"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/(?:epiphany)[\s\/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/puffin/i],describe:function(e){var t={name:"Puffin"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/(?:puffin)[\s\/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/sleipnir/i],describe:function(e){var t={name:"Sleipnir"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/(?:sleipnir)[\s\/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/k-meleon/i],describe:function(e){var t={name:"K-Meleon"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/(?:k-meleon)[\s\/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/micromessenger/i],describe:function(e){var t={name:"WeChat"},r=n.default.getFirstMatch(/(?:micromessenger)[\s\/](\d+(\.?_?\d+)+)/i,e)||n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/msie|trident/i],describe:function(e){var t={name:"Internet Explorer"},r=n.default.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/\sedg\//i],describe:function(e){var t={name:"Microsoft Edge"},r=n.default.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/edg([ea]|ios)/i],describe:function(e){var t={name:"Microsoft Edge"},r=n.default.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/vivaldi/i],describe:function(e){var t={name:"Vivaldi"},r=n.default.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/seamonkey/i],describe:function(e){var t={name:"SeaMonkey"},r=n.default.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/sailfish/i],describe:function(e){var t={name:"Sailfish"},r=n.default.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i,e);return r&&(t.version=r),t}},{test:[/silk/i],describe:function(e){var t={name:"Amazon Silk"},r=n.default.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/phantom/i],describe:function(e){var t={name:"PhantomJS"},r=n.default.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/slimerjs/i],describe:function(e){var t={name:"SlimerJS"},r=n.default.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/blackberry|\bbb\d+/i,/rim\stablet/i],describe:function(e){var t={name:"BlackBerry"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/(web|hpw)[o0]s/i],describe:function(e){var t={name:"WebOS Browser"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/bada/i],describe:function(e){var t={name:"Bada"},r=n.default.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/tizen/i],describe:function(e){var t={name:"Tizen"},r=n.default.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i,e)||n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/qupzilla/i],describe:function(e){var t={name:"QupZilla"},r=n.default.getFirstMatch(/(?:qupzilla)[\s\/](\d+(\.?_?\d+)+)/i,e)||n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/firefox|iceweasel|fxios/i],describe:function(e){var t={name:"Firefox"},r=n.default.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s\/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/chromium/i],describe:function(e){var t={name:"Chromium"},r=n.default.getFirstMatch(/(?:chromium)[\s\/](\d+(\.?_?\d+)+)/i,e)||n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/chrome|crios|crmo/i],describe:function(e){var t={name:"Chrome"},r=n.default.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:function(e){var t=!e.test(/like android/i),r=e.test(/android/i);return t&&r},describe:function(e){var t={name:"Android Browser"},r=n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/playstation 4/i],describe:function(e){var t={name:"PlayStation 4"},r=n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/safari|applewebkit/i],describe:function(e){var t={name:"Safari"},r=n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/.*/i],describe:function(e){var t=-1!==e.search("\\(")?/^(.*)\/(.*)[ \t]\((.*)/:/^(.*)\/(.*) /;return {name:n.default.getFirstMatch(t,e),version:n.default.getSecondMatch(t,e)}}}];t.default=o,e.exports=t.default;},93:function(e,t,r){t.__esModule=!0,t.default=void 0;var i,n=(i=r(17))&&i.__esModule?i:{default:i},s=r(18);var o=[{test:[/Roku\/DVP/],describe:function(e){var t=n.default.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i,e);return {name:s.OS_MAP.Roku,version:t}}},{test:[/windows phone/i],describe:function(e){var t=n.default.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i,e);return {name:s.OS_MAP.WindowsPhone,version:t}}},{test:[/windows/i],describe:function(e){var t=n.default.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i,e),r=n.default.getWindowsVersionName(t);return {name:s.OS_MAP.Windows,version:t,versionName:r}}},{test:[/macintosh/i],describe:function(e){var t=n.default.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i,e).replace(/[_\s]/g,".");return {name:s.OS_MAP.MacOS,version:t}}},{test:[/(ipod|iphone|ipad)/i],describe:function(e){var t=n.default.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i,e).replace(/[_\s]/g,".");return {name:s.OS_MAP.iOS,version:t}}},{test:function(e){var t=!e.test(/like android/i),r=e.test(/android/i);return t&&r},describe:function(e){var t=n.default.getFirstMatch(/android[\s\/-](\d+(\.\d+)*)/i,e),r=n.default.getAndroidVersionName(t),i={name:s.OS_MAP.Android,version:t};return r&&(i.versionName=r),i}},{test:[/(web|hpw)[o0]s/i],describe:function(e){var t=n.default.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i,e),r={name:s.OS_MAP.WebOS};return t&&t.length&&(r.version=t),r}},{test:[/blackberry|\bbb\d+/i,/rim\stablet/i],describe:function(e){var t=n.default.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i,e)||n.default.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i,e)||n.default.getFirstMatch(/\bbb(\d+)/i,e);return {name:s.OS_MAP.BlackBerry,version:t}}},{test:[/bada/i],describe:function(e){var t=n.default.getFirstMatch(/bada\/(\d+(\.\d+)*)/i,e);return {name:s.OS_MAP.Bada,version:t}}},{test:[/tizen/i],describe:function(e){var t=n.default.getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i,e);return {name:s.OS_MAP.Tizen,version:t}}},{test:[/linux/i],describe:function(){return {name:s.OS_MAP.Linux}}},{test:[/CrOS/],describe:function(){return {name:s.OS_MAP.ChromeOS}}},{test:[/PlayStation 4/],describe:function(e){var t=n.default.getFirstMatch(/PlayStation 4[\/\s](\d+(\.\d+)*)/i,e);return {name:s.OS_MAP.PlayStation4,version:t}}}];t.default=o,e.exports=t.default;},94:function(e,t,r){t.__esModule=!0,t.default=void 0;var i,n=(i=r(17))&&i.__esModule?i:{default:i},s=r(18);var o=[{test:[/googlebot/i],describe:function(){return {type:"bot",vendor:"Google"}}},{test:[/huawei/i],describe:function(e){var t=n.default.getFirstMatch(/(can-l01)/i,e)&&"Nova",r={type:s.PLATFORMS_MAP.mobile,vendor:"Huawei"};return t&&(r.model=t),r}},{test:[/nexus\s*(?:7|8|9|10).*/i],describe:function(){return {type:s.PLATFORMS_MAP.tablet,vendor:"Nexus"}}},{test:[/ipad/i],describe:function(){return {type:s.PLATFORMS_MAP.tablet,vendor:"Apple",model:"iPad"}}},{test:[/kftt build/i],describe:function(){return {type:s.PLATFORMS_MAP.tablet,vendor:"Amazon",model:"Kindle Fire HD 7"}}},{test:[/silk/i],describe:function(){return {type:s.PLATFORMS_MAP.tablet,vendor:"Amazon"}}},{test:[/tablet/i],describe:function(){return {type:s.PLATFORMS_MAP.tablet}}},{test:function(e){var t=e.test(/ipod|iphone/i),r=e.test(/like (ipod|iphone)/i);return t&&!r},describe:function(e){var t=n.default.getFirstMatch(/(ipod|iphone)/i,e);return {type:s.PLATFORMS_MAP.mobile,vendor:"Apple",model:t}}},{test:[/nexus\s*[0-6].*/i,/galaxy nexus/i],describe:function(){return {type:s.PLATFORMS_MAP.mobile,vendor:"Nexus"}}},{test:[/[^-]mobi/i],describe:function(){return {type:s.PLATFORMS_MAP.mobile}}},{test:function(e){return "blackberry"===e.getBrowserName(!0)},describe:function(){return {type:s.PLATFORMS_MAP.mobile,vendor:"BlackBerry"}}},{test:function(e){return "bada"===e.getBrowserName(!0)},describe:function(){return {type:s.PLATFORMS_MAP.mobile}}},{test:function(e){return "windows phone"===e.getBrowserName()},describe:function(){return {type:s.PLATFORMS_MAP.mobile,vendor:"Microsoft"}}},{test:function(e){var t=Number(String(e.getOSVersion()).split(".")[0]);return "android"===e.getOSName(!0)&&t>=3},describe:function(){return {type:s.PLATFORMS_MAP.tablet}}},{test:function(e){return "android"===e.getOSName(!0)},describe:function(){return {type:s.PLATFORMS_MAP.mobile}}},{test:function(e){return "macos"===e.getOSName(!0)},describe:function(){return {type:s.PLATFORMS_MAP.desktop,vendor:"Apple"}}},{test:function(e){return "windows"===e.getOSName(!0)},describe:function(){return {type:s.PLATFORMS_MAP.desktop}}},{test:function(e){return "linux"===e.getOSName(!0)},describe:function(){return {type:s.PLATFORMS_MAP.desktop}}},{test:function(e){return "playstation 4"===e.getOSName(!0)},describe:function(){return {type:s.PLATFORMS_MAP.tv}}},{test:function(e){return "roku"===e.getOSName(!0)},describe:function(){return {type:s.PLATFORMS_MAP.tv}}}];t.default=o,e.exports=t.default;},95:function(e,t,r){t.__esModule=!0,t.default=void 0;var i,n=(i=r(17))&&i.__esModule?i:{default:i},s=r(18);var o=[{test:function(e){return "microsoft edge"===e.getBrowserName(!0)},describe:function(e){if(/\sedg\//i.test(e))return {name:s.ENGINE_MAP.Blink};var t=n.default.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i,e);return {name:s.ENGINE_MAP.EdgeHTML,version:t}}},{test:[/trident/i],describe:function(e){var t={name:s.ENGINE_MAP.Trident},r=n.default.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:function(e){return e.test(/presto/i)},describe:function(e){var t={name:s.ENGINE_MAP.Presto},r=n.default.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:function(e){var t=e.test(/gecko/i),r=e.test(/like gecko/i);return t&&!r},describe:function(e){var t={name:s.ENGINE_MAP.Gecko},r=n.default.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/(apple)?webkit\/537\.36/i],describe:function(){return {name:s.ENGINE_MAP.Blink}}},{test:[/(apple)?webkit/i],describe:function(e){var t={name:s.ENGINE_MAP.WebKit},r=n.default.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}}];t.default=o,e.exports=t.default;}})});
	    });

	    var bowser = unwrapExports(es5);
	    var es5_1 = es5.bowser;

	    function getUserAgent() {
	      const browser = bowser.getParser(window.navigator.userAgent);
	      const userAgent = browser.parse().parsedResult;
	      const validBrowser = browser.satisfies({
	        desktop: {
	          chrome: ">49",
	          firefox: ">52",
	          opera: ">36"
	        }
	      });

	      app.update(store => ({
	        ...store,
	        userAgent
	      }));

	      state.update({
	        mobileDevice: userAgent.platform.type !== "desktop",
	        validBrowser
	      });
	    }

	    function init$2(config) {
	      // get the user agent
	      getUserAgent();

	      // validate config
	      // validateConfig(config)

	      const { subscriptions, ...rest } = config;

	      app.update(store => ({ ...store, ...rest }));

	      // mount assist to the DOM
	      new Onboard({
	        target: document.body
	      });

	      // register subscriptions
	      if (subscriptions) {
	        if (subscriptions.address) {
	          address.subscribe(subscriptions.address);
	        }

	        if (subscriptions.network) {
	          network.subscribe(subscriptions.network);
	        }

	        if (subscriptions.balance) {
	          balance.subscribe(subscriptions.balance);
	        }
	      }

	      return { selectWallet, prepareWallet }
	    }

	    function selectWallet() {
	      return new Promise(resolve => {
	        app.update(store => ({ ...store, selectWallet: true }));
	        app.subscribe(({ selectWallet }) => {
	          if (selectWallet === false) {
	            resolve();
	          }
	        });
	      })
	    }

	    function prepareWallet() {
	      return new Promise(resolve => {
	        providerInterface.subscribe(provider => {
	          if (!provider) {
	            throw new Error("selectWallet must be called before prepareWallet")
	          }
	        });

	        app.update(store => ({ ...store, prepareWallet: true }));
	        app.subscribe(({ prepareWallet, prepareWalletCompleted }) => {
	          if (prepareWallet === false) {
	            resolve(prepareWalletCompleted ? true : false);
	          }
	        });
	      })
	    }

	    var index = { init: init$2 };

	    return index;

	}));
	//# sourceMappingURL=Onboard.js.map
	});

	var Onboard$1 = unwrapExports(Onboard);

	const onboard = Onboard$1.init({
	  dappId: "12153f55-f29e-4f11-aa07-90f10da5d778",
	  networkId: 4,
	  subscriptions: {
	    address: a => {
	      const address = document.getElementById("address");
	      if (address) {
	        address.innerHTML = a || "";
	      }
	    },
	    network: n => {
	      const network = document.getElementById("network");
	      if (network) {
	        network.innerHTML = n || "";
	      }
	    },
	    balance: b => {
	      const balance = document.getElementById("balance");
	      if (balance) {
	        balance.innerHTML = (b && b / 1000000000000000000 + " ETH") || "";
	      }
	    }
	  },
	  modules: {
	    selectWallet: selectWallet({
	      fortmatic: { apiKey: "pk_test_886ADCAB855632AA" },
	      trezor: {
	        email: "aaron@flexdapps.com",
	        appUrl: "https://flexdapps.com",
	        apiKey: "d5e29c9b9a9d4116a7348113f57770a8"
	      },
	      networkId: 4
	    }),
	    prepareWallet: prepareWallet({
	      networkId: 4,
	      minimumBalance: "900000000000000000"
	    }),
	    networkId: 4
	  }
	});

	window.onboard = onboard;

}());
