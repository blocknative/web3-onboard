
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Onboard = factory());
}(this, function () { 'use strict';

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

    var global$1 = (typeof global !== "undefined" ? global :
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

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function unwrapExports (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var blocknativeApi = createCommonjsModule(function (module) {
    function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n);}return r}function _objectSpread2(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(r,!0).forEach(function(t){_defineProperty(e,t,r[t]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t));});}return e}var commonjsGlobal$1="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof commonjsGlobal?commonjsGlobal:"undefined"!=typeof self?self:{};function unwrapExports(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function createCommonjsModule(e,t){return e(t={exports:{}},t.exports),t.exports}var MAX_SAFE_INTEGER=9007199254740991,argsTag="[object Arguments]",funcTag="[object Function]",genTag="[object GeneratorFunction]",reIsUint=/^(?:0|[1-9]\d*)$/;function apply(e,t,r){switch(r.length){case 0:return e.call(t);case 1:return e.call(t,r[0]);case 2:return e.call(t,r[0],r[1]);case 3:return e.call(t,r[0],r[1],r[2])}return e.apply(t,r)}function baseTimes(e,t){for(var r=-1,n=Array(e);++r<e;)n[r]=t(r);return n}var objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty,objectToString=objectProto.toString,propertyIsEnumerable=objectProto.propertyIsEnumerable,nativeMax=Math.max;function arrayLikeKeys(e,t){var r=isArray(e)||isArguments(e)?baseTimes(e.length,String):[],n=r.length,a=!!n;for(var o in e)!t&&!hasOwnProperty.call(e,o)||a&&("length"==o||isIndex(o,n))||r.push(o);return r}function assignInDefaults(e,t,r,n){return void 0===e||eq(e,objectProto[r])&&!hasOwnProperty.call(n,r)?t:e}function assignValue(e,t,r){var n=e[t];hasOwnProperty.call(e,t)&&eq(n,r)&&(void 0!==r||t in e)||(e[t]=r);}function baseKeysIn(e){if(!isObject(e))return nativeKeysIn(e);var t=isPrototype(e),r=[];for(var n in e)("constructor"!=n||!t&&hasOwnProperty.call(e,n))&&r.push(n);return r}function baseRest(e,t){return t=nativeMax(void 0===t?e.length-1:t,0),function(){for(var r=arguments,n=-1,a=nativeMax(r.length-t,0),o=Array(a);++n<a;)o[n]=r[t+n];n=-1;for(var i=Array(t+1);++n<t;)i[n]=r[n];return i[t]=o,apply(e,this,i)}}function copyObject(e,t,r,n){r||(r={});for(var a=-1,o=t.length;++a<o;){var i=t[a],s=n?n(r[i],e[i],i,r,e):void 0;assignValue(r,i,void 0===s?e[i]:s);}return r}function createAssigner(e){return baseRest(function(t,r){var n=-1,a=r.length,o=a>1?r[a-1]:void 0,i=a>2?r[2]:void 0;for(o=e.length>3&&"function"==typeof o?(a--,o):void 0,i&&isIterateeCall(r[0],r[1],i)&&(o=a<3?void 0:o,a=1),t=Object(t);++n<a;){var s=r[n];s&&e(t,s,n,o);}return t})}function isIndex(e,t){return !!(t=null==t?MAX_SAFE_INTEGER:t)&&("number"==typeof e||reIsUint.test(e))&&e>-1&&e%1==0&&e<t}function isIterateeCall(e,t,r){if(!isObject(r))return !1;var n=typeof t;return !!("number"==n?isArrayLike(r)&&isIndex(t,r.length):"string"==n&&t in r)&&eq(r[t],e)}function isPrototype(e){var t=e&&e.constructor;return e===("function"==typeof t&&t.prototype||objectProto)}function nativeKeysIn(e){var t=[];if(null!=e)for(var r in Object(e))t.push(r);return t}function eq(e,t){return e===t||e!=e&&t!=t}function isArguments(e){return isArrayLikeObject(e)&&hasOwnProperty.call(e,"callee")&&(!propertyIsEnumerable.call(e,"callee")||objectToString.call(e)==argsTag)}var isArray=Array.isArray;function isArrayLike(e){return null!=e&&isLength(e.length)&&!isFunction(e)}function isArrayLikeObject(e){return isObjectLike(e)&&isArrayLike(e)}function isFunction(e){var t=isObject(e)?objectToString.call(e):"";return t==funcTag||t==genTag}function isLength(e){return "number"==typeof e&&e>-1&&e%1==0&&e<=MAX_SAFE_INTEGER}function isObject(e){var t=typeof e;return !!e&&("object"==t||"function"==t)}function isObjectLike(e){return !!e&&"object"==typeof e}var assignInWith=createAssigner(function(e,t,r,n){copyObject(t,keysIn(t),e,n);}),defaults=baseRest(function(e){return e.push(void 0,assignInDefaults),apply(assignInWith,void 0,e)});function keysIn(e){return isArrayLike(e)?arrayLikeKeys(e,!0):baseKeysIn(e)}var lodash_defaults=defaults,dist=createCommonjsModule(function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(t,r,n){if(this.url=t,this.onclose=null,this.onerror=null,this.onmessage=null,this.onopen=null,this.ondown=null,this.onreopen=null,this.CONNECTING=e.CONNECTING,this.OPEN=e.OPEN,this.CLOSING=e.CLOSING,this.CLOSED=e.CLOSED,this.hasBeenOpened=!1,this.isClosed=!1,this.messageBuffer=[],this.nextRetryTime=0,this.reconnectCount=0,this.lastKnownExtensions="",this.lastKnownProtocol="",this.listeners={},null==r||"string"==typeof r||Array.isArray(r)?this.protocols=r:n=r,this.options=lodash_defaults({},n,e.DEFAULT_OPTIONS),!this.options.wsConstructor){if("undefined"==typeof WebSocket)throw new Error("WebSocket not present in global scope and no wsConstructor option was provided.");this.options.wsConstructor=WebSocket;}this.openNewWebSocket();}return Object.defineProperty(e.prototype,"binaryType",{get:function(){return this.binaryTypeInternal||"blob"},set:function(e){this.binaryTypeInternal=e,this.ws&&(this.ws.binaryType=e);},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"bufferedAmount",{get:function(){var e=this.ws?this.ws.bufferedAmount:0,t=!1;return this.messageBuffer.forEach(function(r){var n=function(e){return "string"==typeof e?2*e.length:e instanceof ArrayBuffer?e.byteLength:e instanceof Blob?e.size:void 0}(r);null!=n?e+=n:t=!0;}),t&&this.debugLog("Some buffered data had unknown length. bufferedAmount() return value may be below the correct amount."),e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"extensions",{get:function(){return this.ws?this.ws.extensions:this.lastKnownExtensions},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"protocol",{get:function(){return this.ws?this.ws.protocol:this.lastKnownProtocol},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"readyState",{get:function(){return this.isClosed?e.CLOSED:e.OPEN},enumerable:!0,configurable:!0}),e.prototype.close=function(e,t){this.ws&&this.ws.close(e,t),this.shutdown(),this.debugLog("WebSocket permanently closed by client.");},e.prototype.send=function(e){this.ws&&this.ws.readyState===this.OPEN?this.ws.send(e):this.messageBuffer.push(e);},e.prototype.addEventListener=function(e,t){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t);},e.prototype.dispatchEvent=function(e){return this.dispatchEventOfType(e.type,e)},e.prototype.removeEventListener=function(e,t){this.listeners[e]&&(this.listeners[e]=this.listeners[e].filter(function(e){return e!==t}));},e.prototype.openNewWebSocket=function(){var e=this;if(!this.isClosed){var t=this.options,r=t.connectTimeout,n=t.wsConstructor;this.debugLog("Opening new WebSocket to "+this.url+".");var a=new n(this.url,this.protocols);a.onclose=function(t){return e.handleClose(t)},a.onerror=function(t){return e.handleError(t)},a.onmessage=function(t){return e.handleMessage(t)},a.onopen=function(t){return e.handleOpen(t)},this.connectTimeoutId=setTimeout(function(){e.clearConnectTimeout(),a.close();},r),this.ws=a;}},e.prototype.handleOpen=function(e){var t=this;if(this.ws&&!this.isClosed){var r=this.options.allClearResetTime;this.debugLog("WebSocket opened."),null!=this.binaryTypeInternal?this.ws.binaryType=this.binaryTypeInternal:this.binaryTypeInternal=this.ws.binaryType,this.clearConnectTimeout(),this.hasBeenOpened?this.dispatchEventOfType("reopen",e):(this.dispatchEventOfType("open",e),this.hasBeenOpened=!0),this.messageBuffer.forEach(function(e){return t.send(e)}),this.messageBuffer=[],this.allClearTimeoutId=setTimeout(function(){t.clearAllClearTimeout(),t.nextRetryTime=0,t.reconnectCount=0;var e=r/1e3|0;t.debugLog("WebSocket remained open for "+e+" seconds. Resetting retry time and count.");},r);}},e.prototype.handleMessage=function(e){this.isClosed||this.dispatchEventOfType("message",e);},e.prototype.handleClose=function(e){var t=this;if(!this.isClosed){var r=this.options,n=r.maxReconnectAttempts,a=r.shouldReconnect;if(this.clearConnectTimeout(),this.clearAllClearTimeout(),this.ws&&(this.lastKnownExtensions=this.ws.extensions,this.lastKnownProtocol=this.ws.protocol,this.ws=void 0),this.dispatchEventOfType("down",e),this.reconnectCount>=n)this.stopReconnecting(e,this.getTooManyFailedReconnectsMessage());else{var o=a(e);"boolean"==typeof o?this.handleWillReconnect(o,e,"Provided shouldReconnect() returned false. Closing permanently."):o.then(function(r){t.isClosed||t.handleWillReconnect(r,e,"Provided shouldReconnect() resolved to false. Closing permanently.");});}}},e.prototype.handleError=function(e){this.dispatchEventOfType("error",e),this.debugLog("WebSocket encountered an error.");},e.prototype.handleWillReconnect=function(e,t,r){e?this.reconnect():this.stopReconnecting(t,r);},e.prototype.reconnect=function(){var e=this,t=this.options,r=t.minReconnectDelay,n=t.maxReconnectDelay,a=t.reconnectBackoffFactor;this.reconnectCount++;var o=this.nextRetryTime;this.nextRetryTime=Math.max(r,Math.min(this.nextRetryTime*a,n)),setTimeout(function(){return e.openNewWebSocket()},o);var i=o/1e3|0;this.debugLog("WebSocket was closed. Re-opening in "+i+" seconds.");},e.prototype.stopReconnecting=function(e,t){this.debugLog(t),this.shutdown(),this.dispatchEventOfType("close",e);},e.prototype.shutdown=function(){this.isClosed=!0,this.clearAllTimeouts(),this.messageBuffer=[];},e.prototype.clearAllTimeouts=function(){this.clearConnectTimeout(),this.clearAllClearTimeout();},e.prototype.clearConnectTimeout=function(){null!=this.connectTimeoutId&&(clearTimeout(this.connectTimeoutId),this.connectTimeoutId=void 0);},e.prototype.clearAllClearTimeout=function(){null!=this.allClearTimeoutId&&(clearTimeout(this.allClearTimeoutId),this.allClearTimeoutId=void 0);},e.prototype.dispatchEventOfType=function(e,t){var r=this;switch(e){case"close":this.onclose&&this.onclose(t);break;case"error":this.onerror&&this.onerror(t);break;case"message":this.onmessage&&this.onmessage(t);break;case"open":this.onopen&&this.onopen(t);break;case"down":this.ondown&&this.ondown(t);break;case"reopen":this.onreopen&&this.onreopen(t);}return e in this.listeners&&this.listeners[e].slice().forEach(function(e){return r.callListener(e,t)}),!t||!t.defaultPrevented},e.prototype.callListener=function(e,t){"function"==typeof e?e.call(this,t):e.handleEvent.call(this,t);},e.prototype.debugLog=function(e){this.options.debug&&console.log(e);},e.prototype.getTooManyFailedReconnectsMessage=function(){var e,t=this.options.maxReconnectAttempts;return "Failed to reconnect after "+t+" "+(e="attempt",1===t?e:e+"s")+". Closing permanently."},e.DEFAULT_OPTIONS={allClearResetTime:5e3,connectTimeout:5e3,debug:!1,minReconnectDelay:1e3,maxReconnectDelay:3e4,maxReconnectAttempts:Number.POSITIVE_INFINITY,reconnectBackoffFactor:1.5,shouldReconnect:function(){return !0},wsConstructor:void 0},e.CONNECTING=0,e.OPEN=1,e.CLOSING=2,e.CLOSED=3,e}();t.default=r;}),SturdyWebSocket=unwrapExports(dist),require$$0={},maxInt=2147483647,base=36,tMin=1,tMax=26,skew=38,damp=700,initialBias=72,initialN=128,delimiter="-",regexNonASCII=/[^\x20-\x7E]/,regexSeparators=/[\x2E\u3002\uFF0E\uFF61]/g,errors={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},baseMinusTMin=base-tMin,floor=Math.floor,stringFromCharCode=String.fromCharCode;function error(e){throw new RangeError(errors[e])}function map(e,t){for(var r=e.length,n=[];r--;)n[r]=t(e[r]);return n}function mapDomain(e,t){var r=e.split("@"),n="";return r.length>1&&(n=r[0]+"@",e=r[1]),n+map((e=e.replace(regexSeparators,".")).split("."),t).join(".")}function ucs2decode(e){for(var t,r,n=[],a=0,o=e.length;a<o;)(t=e.charCodeAt(a++))>=55296&&t<=56319&&a<o?56320==(64512&(r=e.charCodeAt(a++)))?n.push(((1023&t)<<10)+(1023&r)+65536):(n.push(t),a--):n.push(t);return n}function digitToBasic(e,t){return e+22+75*(e<26)-((0!=t)<<5)}function adapt(e,t,r){var n=0;for(e=r?floor(e/damp):e>>1,e+=floor(e/t);e>baseMinusTMin*tMax>>1;n+=base)e=floor(e/baseMinusTMin);return floor(n+(baseMinusTMin+1)*e/(e+skew))}function encode(e){var t,r,n,a,o,i,s,c,l,u,d,f,h,p,g,y=[];for(f=(e=ucs2decode(e)).length,t=initialN,r=0,o=initialBias,i=0;i<f;++i)(d=e[i])<128&&y.push(stringFromCharCode(d));for(n=a=y.length,a&&y.push(delimiter);n<f;){for(s=maxInt,i=0;i<f;++i)(d=e[i])>=t&&d<s&&(s=d);for(s-t>floor((maxInt-r)/(h=n+1))&&error("overflow"),r+=(s-t)*h,t=s,i=0;i<f;++i)if((d=e[i])<t&&++r>maxInt&&error("overflow"),d==t){for(c=r,l=base;!(c<(u=l<=o?tMin:l>=o+tMax?tMax:l-o));l+=base)g=c-u,p=base-u,y.push(stringFromCharCode(digitToBasic(u+g%p,0))),c=floor(g/p);y.push(stringFromCharCode(digitToBasic(c,0))),o=adapt(r,h,n==a),r=0,++n;}++r,++t;}return y.join("")}function toASCII(e){return mapDomain(e,function(e){return regexNonASCII.test(e)?"xn--"+encode(e):e})}commonjsGlobal.setTimeout,commonjsGlobal.clearTimeout;var performance=commonjsGlobal.performance||{},performanceNow=performance.now||performance.mozNow||performance.msNow||performance.oNow||performance.webkitNow||function(){return (new Date).getTime()};function isNull(e){return null===e}function isNullOrUndefined(e){return null==e}function isString(e){return "string"==typeof e}function isObject$1(e){return "object"==typeof e&&null!==e}function hasOwnProperty$1(e,t){return Object.prototype.hasOwnProperty.call(e,t)}var isArray$1=Array.isArray||function(e){return "[object Array]"===Object.prototype.toString.call(e)};function stringifyPrimitive(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return ""}}function stringify(e,t,r,n){return t=t||"&",r=r||"=",null===e&&(e=void 0),"object"==typeof e?map$1(objectKeys(e),function(n){var a=encodeURIComponent(stringifyPrimitive(n))+r;return isArray$1(e[n])?map$1(e[n],function(e){return a+encodeURIComponent(stringifyPrimitive(e))}).join(t):a+encodeURIComponent(stringifyPrimitive(e[n]))}).join(t):n?encodeURIComponent(stringifyPrimitive(n))+r+encodeURIComponent(stringifyPrimitive(e)):""}function map$1(e,t){if(e.map)return e.map(t);for(var r=[],n=0;n<e.length;n++)r.push(t(e[n],n));return r}var objectKeys=Object.keys||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.push(r);return t};function parse(e,t,r,n){t=t||"&",r=r||"=";var a={};if("string"!=typeof e||0===e.length)return a;var o=/\+/g;e=e.split(t);var i=1e3;n&&"number"==typeof n.maxKeys&&(i=n.maxKeys);var s=e.length;i>0&&s>i&&(s=i);for(var c=0;c<s;++c){var l,u,d,f,h=e[c].replace(o,"%20"),p=h.indexOf(r);p>=0?(l=h.substr(0,p),u=h.substr(p+1)):(l=h,u=""),d=decodeURIComponent(l),f=decodeURIComponent(u),hasOwnProperty$1(a,d)?isArray$1(a[d])?a[d].push(f):a[d]=[a[d],f]:a[d]=f;}return a}var require$$1={parse:urlParse,resolve:urlResolve,resolveObject:urlResolveObject,format:urlFormat,Url:Url};function Url(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null;}var protocolPattern=/^([a-z0-9.+-]+:)/i,portPattern=/:[0-9]*$/,simplePathPattern=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,delims=["<",">",'"',"`"," ","\r","\n","\t"],unwise=["{","}","|","\\","^","`"].concat(delims),autoEscape=["'"].concat(unwise),nonHostChars=["%","/","?",";","#"].concat(autoEscape),hostEndingChars=["/","?","#"],hostnameMaxLen=255,hostnamePartPattern=/^[+a-z0-9A-Z_-]{0,63}$/,hostnamePartStart=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,unsafeProtocol={javascript:!0,"javascript:":!0},hostlessProtocol={javascript:!0,"javascript:":!0},slashedProtocol={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function urlParse(e,t,r){if(e&&isObject$1(e)&&e instanceof Url)return e;var n=new Url;return n.parse(e,t,r),n}function parse$1(e,t,r,n){if(!isString(t))throw new TypeError("Parameter 'url' must be a string, not "+typeof t);var a=t.indexOf("?"),o=-1!==a&&a<t.indexOf("#")?"?":"#",i=t.split(o);i[0]=i[0].replace(/\\/g,"/");var s=t=i.join(o);if(s=s.trim(),!n&&1===t.split("#").length){var c=simplePathPattern.exec(s);if(c)return e.path=s,e.href=s,e.pathname=c[1],c[2]?(e.search=c[2],e.query=r?parse(e.search.substr(1)):e.search.substr(1)):r&&(e.search="",e.query={}),e}var l,u,d,f,h=protocolPattern.exec(s);if(h){var p=(h=h[0]).toLowerCase();e.protocol=p,s=s.substr(h.length);}if(n||h||s.match(/^\/\/[^@\/]+@[^@\/]+/)){var g="//"===s.substr(0,2);!g||h&&hostlessProtocol[h]||(s=s.substr(2),e.slashes=!0);}if(!hostlessProtocol[h]&&(g||h&&!slashedProtocol[h])){var y,m,v=-1;for(l=0;l<hostEndingChars.length;l++)-1!==(u=s.indexOf(hostEndingChars[l]))&&(-1===v||u<v)&&(v=u);for(-1!==(m=-1===v?s.lastIndexOf("@"):s.lastIndexOf("@",v))&&(y=s.slice(0,m),s=s.slice(m+1),e.auth=decodeURIComponent(y)),v=-1,l=0;l<nonHostChars.length;l++)-1!==(u=s.indexOf(nonHostChars[l]))&&(-1===v||u<v)&&(v=u);-1===v&&(v=s.length),e.host=s.slice(0,v),s=s.slice(v),parseHost(e),e.hostname=e.hostname||"";var b="["===e.hostname[0]&&"]"===e.hostname[e.hostname.length-1];if(!b){var O=e.hostname.split(/\./);for(l=0,d=O.length;l<d;l++){var _=O[l];if(_&&!_.match(hostnamePartPattern)){for(var $="",P=0,w=_.length;P<w;P++)_.charCodeAt(P)>127?$+="x":$+=_[P];if(!$.match(hostnamePartPattern)){var j=O.slice(0,l),x=O.slice(l+1),E=_.match(hostnamePartStart);E&&(j.push(E[1]),x.unshift(E[2])),x.length&&(s="/"+x.join(".")+s),e.hostname=j.join(".");break}}}}e.hostname.length>hostnameMaxLen?e.hostname="":e.hostname=e.hostname.toLowerCase(),b||(e.hostname=toASCII(e.hostname)),f=e.port?":"+e.port:"";var S=e.hostname||"";e.host=S+f,e.href+=e.host,b&&(e.hostname=e.hostname.substr(1,e.hostname.length-2),"/"!==s[0]&&(s="/"+s));}if(!unsafeProtocol[p])for(l=0,d=autoEscape.length;l<d;l++){var A=autoEscape[l];if(-1!==s.indexOf(A)){var k=encodeURIComponent(A);k===A&&(k=escape(A)),s=s.split(A).join(k);}}var T=s.indexOf("#");-1!==T&&(e.hash=s.substr(T),s=s.slice(0,T));var I=s.indexOf("?");if(-1!==I?(e.search=s.substr(I),e.query=s.substr(I+1),r&&(e.query=parse(e.query)),s=s.slice(0,I)):r&&(e.search="",e.query={}),s&&(e.pathname=s),slashedProtocol[p]&&e.hostname&&!e.pathname&&(e.pathname="/"),e.pathname||e.search){f=e.pathname||"";var M=e.search||"";e.path=f+M;}return e.href=format(e),e}function urlFormat(e){return isString(e)&&(e=parse$1({},e)),format(e)}function format(e){var t=e.auth||"";t&&(t=(t=encodeURIComponent(t)).replace(/%3A/i,":"),t+="@");var r=e.protocol||"",n=e.pathname||"",a=e.hash||"",o=!1,i="";e.host?o=t+e.host:e.hostname&&(o=t+(-1===e.hostname.indexOf(":")?e.hostname:"["+this.hostname+"]"),e.port&&(o+=":"+e.port)),e.query&&isObject$1(e.query)&&Object.keys(e.query).length&&(i=stringify(e.query));var s=e.search||i&&"?"+i||"";return r&&":"!==r.substr(-1)&&(r+=":"),e.slashes||(!r||slashedProtocol[r])&&!1!==o?(o="//"+(o||""),n&&"/"!==n.charAt(0)&&(n="/"+n)):o||(o=""),a&&"#"!==a.charAt(0)&&(a="#"+a),s&&"?"!==s.charAt(0)&&(s="?"+s),r+o+(n=n.replace(/[?#]/g,function(e){return encodeURIComponent(e)}))+(s=s.replace("#","%23"))+a}function urlResolve(e,t){return urlParse(e,!1,!0).resolve(t)}function urlResolveObject(e,t){return e?urlParse(e,!1,!0).resolveObject(t):t}function parseHost(e){var t=e.host,r=portPattern.exec(t);r&&(":"!==(r=r[0])&&(e.port=r.substr(1)),t=t.substr(0,t.length-r.length)),t&&(e.hostname=t);}Url.prototype.parse=function(e,t,r){return parse$1(this,e,t,r)},Url.prototype.format=function(){return format(this)},Url.prototype.resolve=function(e){return this.resolveObject(urlParse(e,!1,!0)).format()},Url.prototype.resolveObject=function(e){if(isString(e)){var t=new Url;t.parse(e,!1,!0),e=t;}for(var r,n=new Url,a=Object.keys(this),o=0;o<a.length;o++){var i=a[o];n[i]=this[i];}if(n.hash=e.hash,""===e.href)return n.href=n.format(),n;if(e.slashes&&!e.protocol){for(var s=Object.keys(e),c=0;c<s.length;c++){var l=s[c];"protocol"!==l&&(n[l]=e[l]);}return slashedProtocol[n.protocol]&&n.hostname&&!n.pathname&&(n.path=n.pathname="/"),n.href=n.format(),n}if(e.protocol&&e.protocol!==n.protocol){if(!slashedProtocol[e.protocol]){for(var u=Object.keys(e),d=0;d<u.length;d++){var f=u[d];n[f]=e[f];}return n.href=n.format(),n}if(n.protocol=e.protocol,e.host||hostlessProtocol[e.protocol])n.pathname=e.pathname;else{for(r=(e.pathname||"").split("/");r.length&&!(e.host=r.shift()););e.host||(e.host=""),e.hostname||(e.hostname=""),""!==r[0]&&r.unshift(""),r.length<2&&r.unshift(""),n.pathname=r.join("/");}if(n.search=e.search,n.query=e.query,n.host=e.host||"",n.auth=e.auth,n.hostname=e.hostname||e.host,n.port=e.port,n.pathname||n.search){var h=n.pathname||"",p=n.search||"";n.path=h+p;}return n.slashes=n.slashes||e.slashes,n.href=n.format(),n}var g,y=n.pathname&&"/"===n.pathname.charAt(0),m=e.host||e.pathname&&"/"===e.pathname.charAt(0),v=m||y||n.host&&e.pathname,b=v,O=n.pathname&&n.pathname.split("/")||[],_=n.protocol&&!slashedProtocol[n.protocol];if(r=e.pathname&&e.pathname.split("/")||[],_&&(n.hostname="",n.port=null,n.host&&(""===O[0]?O[0]=n.host:O.unshift(n.host)),n.host="",e.protocol&&(e.hostname=null,e.port=null,e.host&&(""===r[0]?r[0]=e.host:r.unshift(e.host)),e.host=null),v=v&&(""===r[0]||""===O[0])),m)n.host=e.host||""===e.host?e.host:n.host,n.hostname=e.hostname||""===e.hostname?e.hostname:n.hostname,n.search=e.search,n.query=e.query,O=r;else if(r.length)O||(O=[]),O.pop(),O=O.concat(r),n.search=e.search,n.query=e.query;else if(!isNullOrUndefined(e.search))return _&&(n.hostname=n.host=O.shift(),(g=!!(n.host&&n.host.indexOf("@")>0)&&n.host.split("@"))&&(n.auth=g.shift(),n.host=n.hostname=g.shift())),n.search=e.search,n.query=e.query,isNull(n.pathname)&&isNull(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.href=n.format(),n;if(!O.length)return n.pathname=null,n.search?n.path="/"+n.search:n.path=null,n.href=n.format(),n;for(var $=O.slice(-1)[0],P=(n.host||e.host||O.length>1)&&("."===$||".."===$)||""===$,w=0,j=O.length;j>=0;j--)"."===($=O[j])?O.splice(j,1):".."===$?(O.splice(j,1),w++):w&&(O.splice(j,1),w--);if(!v&&!b)for(;w--;w)O.unshift("..");!v||""===O[0]||O[0]&&"/"===O[0].charAt(0)||O.unshift(""),P&&"/"!==O.join("/").substr(-1)&&O.push("");var x=""===O[0]||O[0]&&"/"===O[0].charAt(0);return _&&(n.hostname=n.host=x?"":O.length?O.shift():"",(g=!!(n.host&&n.host.indexOf("@")>0)&&n.host.split("@"))&&(n.auth=g.shift(),n.host=n.hostname=g.shift())),(v=v||n.host&&O.length)&&!x&&O.unshift(""),O.length?n.pathname=O.join("/"):(n.pathname=null,n.path=null),isNull(n.pathname)&&isNull(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.auth=e.auth||n.auth,n.slashes=n.slashes||e.slashes,n.href=n.format(),n},Url.prototype.parseHost=function(){return parseHost(this)};var source=createCommonjsModule(function(e){e.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n});},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0});},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=4)}([function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(r(1)),o=r(8),i=r(2),s=r(16);t.validatorSymbol=Symbol("validators"),t.Predicate=class{constructor(e,t={}){this.type=e,this.options=t,this.context={validators:[]},this.context=Object.assign({},this.context,this.options);const r=this.type[0].toLowerCase()+this.type.slice(1);this.addValidator({message:(e,t)=>`Expected ${t&&t.substring(this.type.length+1)||"argument"} to be of type \`${this.type}\` but received type \`${a.default(e)}\``,validator:e=>a.default[r](e)});}[i.testSymbol](e,t,r){for(const{validator:n,message:a}of this.context.validators){if(!0===this.options.optional&&void 0===e)continue;const i=n(e);if(!0===i)continue;let s=r;throw"function"==typeof r&&(s=r()),s=s?`${this.type} \`${s}\``:this.type,new o.ArgumentError(a(e,s,i),t)}}get[t.validatorSymbol](){return this.context.validators}get not(){return s.not(this)}validate(e){return this.addValidator({message:(e,t,r)=>"string"==typeof r?`(${t}) ${r}`:r(t),validator:t=>{const{message:r,validator:n}=e(t);return !!n||r}})}is(e){return this.addValidator({message:(e,t,r)=>r?`(${t}) ${r}`:`Expected ${t} \`${e}\` to pass custom validation function`,validator:e})}addValidator(e){return this.context.validators.push(e),this}};},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const n="undefined"==typeof URL?r(15).URL:URL,{toString:a}=Object.prototype,o=e=>t=>typeof t===e,i=e=>{const t=a.call(e).slice(8,-1);if(t)return t},s=e=>t=>i(t)===e;function c(e){switch(e){case null:return "null";case!0:case!1:return "boolean"}switch(typeof e){case"undefined":return "undefined";case"string":return "string";case"number":return "number";case"bigint":return "bigint";case"symbol":return "symbol"}if(c.function_(e))return "Function";if(c.observable(e))return "Observable";if(c.array(e))return "Array";if(c.buffer(e))return "Buffer";const t=i(e);if(t)return t;if(e instanceof String||e instanceof Boolean||e instanceof Number)throw new TypeError("Please don't use object wrappers for primitive types");return "Object"}const l=e=>"object"==typeof e;c.undefined=o("undefined"),c.string=o("string"),c.number=o("number"),c.bigint=o("bigint"),c.function_=o("function"),c.null_=e=>null===e,c.class_=e=>c.function_(e)&&e.toString().startsWith("class "),c.boolean=e=>!0===e||!1===e,c.symbol=o("symbol"),c.numericString=e=>c.string(e)&&e.length>0&&!Number.isNaN(Number(e)),c.array=Array.isArray,c.buffer=e=>!c.nullOrUndefined(e)&&!c.nullOrUndefined(e.constructor)&&c.function_(e.constructor.isBuffer)&&e.constructor.isBuffer(e),c.nullOrUndefined=e=>c.null_(e)||c.undefined(e),c.object=e=>!c.nullOrUndefined(e)&&(c.function_(e)||l(e)),c.iterable=e=>!c.nullOrUndefined(e)&&c.function_(e[Symbol.iterator]),c.asyncIterable=e=>!c.nullOrUndefined(e)&&c.function_(e[Symbol.asyncIterator]),c.generator=e=>c.iterable(e)&&c.function_(e.next)&&c.function_(e.throw),c.nativePromise=e=>s("Promise")(e),c.promise=e=>c.nativePromise(e)||(e=>!c.null_(e)&&l(e)&&c.function_(e.then)&&c.function_(e.catch))(e),c.generatorFunction=s("GeneratorFunction"),c.asyncFunction=s("AsyncFunction"),c.boundFunction=e=>c.function_(e)&&!e.hasOwnProperty("prototype"),c.regExp=s("RegExp"),c.date=s("Date"),c.error=s("Error"),c.map=e=>s("Map")(e),c.set=e=>s("Set")(e),c.weakMap=e=>s("WeakMap")(e),c.weakSet=e=>s("WeakSet")(e),c.int8Array=s("Int8Array"),c.uint8Array=s("Uint8Array"),c.uint8ClampedArray=s("Uint8ClampedArray"),c.int16Array=s("Int16Array"),c.uint16Array=s("Uint16Array"),c.int32Array=s("Int32Array"),c.uint32Array=s("Uint32Array"),c.float32Array=s("Float32Array"),c.float64Array=s("Float64Array"),c.bigint64Array=s("BigInt64Array"),c.biguint64Array=s("BigUint64Array"),c.arrayBuffer=s("ArrayBuffer"),c.sharedArrayBuffer=s("SharedArrayBuffer"),c.dataView=s("DataView"),c.directInstanceOf=(e,t)=>Object.getPrototypeOf(e)===t.prototype,c.urlInstance=e=>s("URL")(e),c.urlString=e=>{if(!c.string(e))return !1;try{return new n(e),!0}catch(e){return !1}},c.truthy=e=>Boolean(e),c.falsy=e=>!e,c.nan=e=>Number.isNaN(e);const u=new Set(["undefined","string","number","bigint","boolean","symbol"]);c.primitive=e=>c.null_(e)||u.has(typeof e),c.integer=e=>Number.isInteger(e),c.safeInteger=e=>Number.isSafeInteger(e),c.plainObject=e=>{if("Object"!==i(e))return !1;const t=Object.getPrototypeOf(e);return null===t||t===Object.getPrototypeOf({})};const d=new Set(["Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array"]);c.typedArray=e=>{const t=i(e);return void 0!==t&&d.has(t)},c.arrayLike=e=>!c.nullOrUndefined(e)&&!c.function_(e)&&(e=>c.safeInteger(e)&&e>=0)(e.length),c.inRange=(e,t)=>{if(c.number(t))return e>=Math.min(0,t)&&e<=Math.max(t,0);if(c.array(t)&&2===t.length)return e>=Math.min(...t)&&e<=Math.max(...t);throw new TypeError(`Invalid range: ${JSON.stringify(t)}`)};const f=["innerHTML","ownerDocument","style","attributes","nodeValue"];c.domElement=e=>c.object(e)&&1===e.nodeType&&c.string(e.nodeName)&&!c.plainObject(e)&&f.every(t=>t in e),c.observable=e=>!!(e&&(e[Symbol.observable]&&e===e[Symbol.observable]()||e["@@observable"]&&e===e["@@observable"]())),c.nodeStream=e=>!c.nullOrUndefined(e)&&l(e)&&c.function_(e.pipe)&&!c.observable(e),c.infinite=e=>e===1/0||e===-1/0;const h=e=>t=>c.integer(t)&&Math.abs(t%2)===e;c.evenInteger=h(0),c.oddInteger=h(1),c.emptyArray=e=>c.array(e)&&0===e.length,c.nonEmptyArray=e=>c.array(e)&&e.length>0,c.emptyString=e=>c.string(e)&&0===e.length,c.nonEmptyString=e=>c.string(e)&&e.length>0,c.emptyStringOrWhitespace=e=>c.emptyString(e)||(e=>c.string(e)&&!1===/\S/.test(e))(e),c.emptyObject=e=>c.object(e)&&!c.map(e)&&!c.set(e)&&0===Object.keys(e).length,c.nonEmptyObject=e=>c.object(e)&&!c.map(e)&&!c.set(e)&&Object.keys(e).length>0,c.emptySet=e=>c.set(e)&&0===e.size,c.nonEmptySet=e=>c.set(e)&&e.size>0,c.emptyMap=e=>c.map(e)&&0===e.size,c.nonEmptyMap=e=>c.map(e)&&e.size>0;const p=(e,t,r)=>{if(!1===c.function_(t))throw new TypeError(`Invalid predicate: ${JSON.stringify(t)}`);if(0===r.length)throw new TypeError("Invalid number of values");return e.call(r,t)};c.any=(e,...t)=>p(Array.prototype.some,e,t),c.all=(e,...t)=>p(Array.prototype.every,e,t),Object.defineProperties(c,{class:{value:c.class_},function:{value:c.function_},null:{value:c.null_}}),e.exports=c,t.default=c;},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.testSymbol=Symbol("test"),t.isPredicate=e=>Boolean(e&&e[t.testSymbol]);},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.default=(e,t,r=5)=>{const n=[];for(const a of t)if(!e.has(a)&&(n.push(a),n.length===r))return n;return 0===n.length||n};},function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(r(10)),o=r(11),i=r(0);t.Predicate=i.Predicate;const s=r(2),c=n(r(17)),l=n(r(6)),u=n(r(9)),d=(e,t,r)=>{if(!s.isPredicate(t)&&"string"!=typeof t)throw new TypeError(`Expected second argument to be a predicate or a string, got \`${typeof t}\``);if(s.isPredicate(t)){const r=a.default();u.default(e,()=>o.inferLabel(r),t);}else u.default(e,t,r);};Object.defineProperties(d,{isValid:{value:(e,t)=>{try{return d(e,t),!0}catch(e){return !1}}},create:{value:(e,t)=>r=>{if(s.isPredicate(e)){const t=a.default();u.default(r,()=>o.inferLabel(t),e);}else u.default(r,e,t);}}}),t.default=l.default(c.default(d));var f=r(6);t.StringPredicate=f.StringPredicate,t.NumberPredicate=f.NumberPredicate,t.BooleanPredicate=f.BooleanPredicate,t.ArrayPredicate=f.ArrayPredicate,t.ObjectPredicate=f.ObjectPredicate,t.DatePredicate=f.DatePredicate,t.ErrorPredicate=f.ErrorPredicate,t.MapPredicate=f.MapPredicate,t.WeakMapPredicate=f.WeakMapPredicate,t.SetPredicate=f.SetPredicate,t.WeakSetPredicate=f.WeakSetPredicate,t.AnyPredicate=f.AnyPredicate;},function(e,t,r){(function(e){var r="__lodash_hash_undefined__",n=1,a=2,o=9007199254740991,i="[object Arguments]",s="[object Array]",c="[object AsyncFunction]",l="[object Boolean]",u="[object Date]",d="[object Error]",f="[object Function]",h="[object GeneratorFunction]",p="[object Map]",g="[object Number]",y="[object Null]",m="[object Object]",v="[object Proxy]",b="[object RegExp]",O="[object Set]",_="[object String]",$="[object Symbol]",P="[object Undefined]",w="[object ArrayBuffer]",j="[object DataView]",x=/^\[object .+?Constructor\]$/,E=/^(?:0|[1-9]\d*)$/,S={};S["[object Float32Array]"]=S["[object Float64Array]"]=S["[object Int8Array]"]=S["[object Int16Array]"]=S["[object Int32Array]"]=S["[object Uint8Array]"]=S["[object Uint8ClampedArray]"]=S["[object Uint16Array]"]=S["[object Uint32Array]"]=!0,S[i]=S[s]=S[w]=S[l]=S[j]=S[u]=S[d]=S[f]=S[p]=S[g]=S[m]=S[b]=S[O]=S[_]=S["[object WeakMap]"]=!1;var A="object"==typeof commonjsGlobal$1&&commonjsGlobal$1&&commonjsGlobal$1.Object===Object&&commonjsGlobal$1,k="object"==typeof self&&self&&self.Object===Object&&self,T=A||k||Function("return this")(),I=t&&!t.nodeType&&t,M=I&&"object"==typeof e&&e&&!e.nodeType&&e,C=M&&M.exports===I,N=C&&A.process,V=function(){try{return N&&N.binding&&N.binding("util")}catch(e){}}(),R=V&&V.isTypedArray;function z(e,t){for(var r=-1,n=null==e?0:e.length;++r<n;)if(t(e[r],r,e))return !0;return !1}function L(e){var t=-1,r=Array(e.size);return e.forEach(function(e,n){r[++t]=[n,e];}),r}function U(e){var t=-1,r=Array(e.size);return e.forEach(function(e){r[++t]=e;}),r}var D,F,B,W=Array.prototype,q=Function.prototype,J=Object.prototype,K=T["__core-js_shared__"],G=q.toString,H=J.hasOwnProperty,X=(D=/[^.]+$/.exec(K&&K.keys&&K.keys.IE_PROTO||""))?"Symbol(src)_1."+D:"",Z=J.toString,Y=RegExp("^"+G.call(H).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Q=C?T.Buffer:void 0,ee=T.Symbol,te=T.Uint8Array,re=J.propertyIsEnumerable,ne=W.splice,ae=ee?ee.toStringTag:void 0,oe=Object.getOwnPropertySymbols,ie=Q?Q.isBuffer:void 0,se=(F=Object.keys,B=Object,function(e){return F(B(e))}),ce=Me(T,"DataView"),le=Me(T,"Map"),ue=Me(T,"Promise"),de=Me(T,"Set"),fe=Me(T,"WeakMap"),he=Me(Object,"create"),pe=Re(ce),ge=Re(le),ye=Re(ue),me=Re(de),ve=Re(fe),be=ee?ee.prototype:void 0,Oe=be?be.valueOf:void 0;function _e(e){var t=-1,r=null==e?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1]);}}function $e(e){var t=-1,r=null==e?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1]);}}function Pe(e){var t=-1,r=null==e?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1]);}}function we(e){var t=-1,r=null==e?0:e.length;for(this.__data__=new Pe;++t<r;)this.add(e[t]);}function je(e){var t=this.__data__=new $e(e);this.size=t.size;}function xe(e,t){for(var r=e.length;r--;)if(ze(e[r][0],t))return r;return -1}function Ee(e){return null==e?void 0===e?P:y:ae&&ae in Object(e)?function(e){var t=H.call(e,ae),r=e[ae];try{e[ae]=void 0;var n=!0;}catch(e){}var a=Z.call(e);return n&&(t?e[ae]=r:delete e[ae]),a}(e):function(e){return Z.call(e)}(e)}function Se(e){return qe(e)&&Ee(e)==i}function Ae(e,t,r,o,c){return e===t||(null==e||null==t||!qe(e)&&!qe(t)?e!=e&&t!=t:function(e,t,r,o,c,f){var h=Ue(e),y=Ue(t),v=h?s:Ne(e),P=y?s:Ne(t),x=(v=v==i?m:v)==m,E=(P=P==i?m:P)==m,S=v==P;if(S&&De(e)){if(!De(t))return !1;h=!0,x=!1;}if(S&&!x)return f||(f=new je),h||Je(e)?ke(e,t,r,o,c,f):function(e,t,r,o,i,s,c){switch(r){case j:if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return !1;e=e.buffer,t=t.buffer;case w:return !(e.byteLength!=t.byteLength||!s(new te(e),new te(t)));case l:case u:case g:return ze(+e,+t);case d:return e.name==t.name&&e.message==t.message;case b:case _:return e==t+"";case p:var f=L;case O:var h=o&n;if(f||(f=U),e.size!=t.size&&!h)return !1;var y=c.get(e);if(y)return y==t;o|=a,c.set(e,t);var m=ke(f(e),f(t),o,i,s,c);return c.delete(e),m;case $:if(Oe)return Oe.call(e)==Oe.call(t)}return !1}(e,t,v,r,o,c,f);if(!(r&n)){var A=x&&H.call(e,"__wrapped__"),k=E&&H.call(t,"__wrapped__");if(A||k){var T=A?e.value():e,I=k?t.value():t;return f||(f=new je),c(T,I,r,o,f)}}return !!S&&(f||(f=new je),function(e,t,r,a,o,i){var s=r&n,c=Te(e),l=c.length;if(l!=Te(t).length&&!s)return !1;for(var u=l;u--;){var d=c[u];if(!(s?d in t:H.call(t,d)))return !1}var f=i.get(e);if(f&&i.get(t))return f==t;var h=!0;i.set(e,t),i.set(t,e);for(var p=s;++u<l;){var g=e[d=c[u]],y=t[d];if(a)var m=s?a(y,g,d,t,e,i):a(g,y,d,e,t,i);if(!(void 0===m?g===y||o(g,y,r,a,i):m)){h=!1;break}p||(p="constructor"==d);}if(h&&!p){var v=e.constructor,b=t.constructor;v!=b&&"constructor"in e&&"constructor"in t&&!("function"==typeof v&&v instanceof v&&"function"==typeof b&&b instanceof b)&&(h=!1);}return i.delete(e),i.delete(t),h}(e,t,r,o,c,f))}(e,t,r,o,Ae,c))}function ke(e,t,r,o,i,s){var c=r&n,l=e.length,u=t.length;if(l!=u&&!(c&&u>l))return !1;var d=s.get(e);if(d&&s.get(t))return d==t;var f=-1,h=!0,p=r&a?new we:void 0;for(s.set(e,t),s.set(t,e);++f<l;){var g=e[f],y=t[f];if(o)var m=c?o(y,g,f,t,e,s):o(g,y,f,e,t,s);if(void 0!==m){if(m)continue;h=!1;break}if(p){if(!z(t,function(e,t){if(n=t,!p.has(n)&&(g===e||i(g,e,r,o,s)))return p.push(t);var n;})){h=!1;break}}else if(g!==y&&!i(g,y,r,o,s)){h=!1;break}}return s.delete(e),s.delete(t),h}function Te(e){return function(e,t,r){var n=Ke(e);return Ue(e)?n:function(e,t){for(var r=-1,n=t.length,a=e.length;++r<n;)e[a+r]=t[r];return e}(n,r(e))}(e,0,Ce)}function Ie(e,t){var r,n,a=e.__data__;return ("string"==(n=typeof(r=t))||"number"==n||"symbol"==n||"boolean"==n?"__proto__"!==r:null===r)?a["string"==typeof t?"string":"hash"]:a.map}function Me(e,t){var r=function(e,t){return null==e?void 0:e[t]}(e,t);return function(e){return !(!We(e)||(t=e,X&&X in t))&&(Fe(e)?Y:x).test(Re(e));var t;}(r)?r:void 0}_e.prototype.clear=function(){this.__data__=he?he(null):{},this.size=0;},_e.prototype.delete=function(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t},_e.prototype.get=function(e){var t=this.__data__;if(he){var n=t[e];return n===r?void 0:n}return H.call(t,e)?t[e]:void 0},_e.prototype.has=function(e){var t=this.__data__;return he?void 0!==t[e]:H.call(t,e)},_e.prototype.set=function(e,t){var n=this.__data__;return this.size+=this.has(e)?0:1,n[e]=he&&void 0===t?r:t,this},$e.prototype.clear=function(){this.__data__=[],this.size=0;},$e.prototype.delete=function(e){var t=this.__data__,r=xe(t,e);return !(r<0||(r==t.length-1?t.pop():ne.call(t,r,1),--this.size,0))},$e.prototype.get=function(e){var t=this.__data__,r=xe(t,e);return r<0?void 0:t[r][1]},$e.prototype.has=function(e){return xe(this.__data__,e)>-1},$e.prototype.set=function(e,t){var r=this.__data__,n=xe(r,e);return n<0?(++this.size,r.push([e,t])):r[n][1]=t,this},Pe.prototype.clear=function(){this.size=0,this.__data__={hash:new _e,map:new(le||$e),string:new _e};},Pe.prototype.delete=function(e){var t=Ie(this,e).delete(e);return this.size-=t?1:0,t},Pe.prototype.get=function(e){return Ie(this,e).get(e)},Pe.prototype.has=function(e){return Ie(this,e).has(e)},Pe.prototype.set=function(e,t){var r=Ie(this,e),n=r.size;return r.set(e,t),this.size+=r.size==n?0:1,this},we.prototype.add=we.prototype.push=function(e){return this.__data__.set(e,r),this},we.prototype.has=function(e){return this.__data__.has(e)},je.prototype.clear=function(){this.__data__=new $e,this.size=0;},je.prototype.delete=function(e){var t=this.__data__,r=t.delete(e);return this.size=t.size,r},je.prototype.get=function(e){return this.__data__.get(e)},je.prototype.has=function(e){return this.__data__.has(e)},je.prototype.set=function(e,t){var r=this.__data__;if(r instanceof $e){var n=r.__data__;if(!le||n.length<199)return n.push([e,t]),this.size=++r.size,this;r=this.__data__=new Pe(n);}return r.set(e,t),this.size=r.size,this};var Ce=oe?function(e){return null==e?[]:(e=Object(e),function(e,t){for(var r=-1,n=null==e?0:e.length,a=0,o=[];++r<n;){var i=e[r];t(i)&&(o[a++]=i);}return o}(oe(e),function(t){return re.call(e,t)}))}:function(){return []},Ne=Ee;function Ve(e,t){return !!(t=null==t?o:t)&&("number"==typeof e||E.test(e))&&e>-1&&e%1==0&&e<t}function Re(e){if(null!=e){try{return G.call(e)}catch(e){}try{return e+""}catch(e){}}return ""}function ze(e,t){return e===t||e!=e&&t!=t}(ce&&Ne(new ce(new ArrayBuffer(1)))!=j||le&&Ne(new le)!=p||ue&&"[object Promise]"!=Ne(ue.resolve())||de&&Ne(new de)!=O||fe&&"[object WeakMap]"!=Ne(new fe))&&(Ne=function(e){var t=Ee(e),r=t==m?e.constructor:void 0,n=r?Re(r):"";if(n)switch(n){case pe:return j;case ge:return p;case ye:return "[object Promise]";case me:return O;case ve:return "[object WeakMap]"}return t});var Le=Se(function(){return arguments}())?Se:function(e){return qe(e)&&H.call(e,"callee")&&!re.call(e,"callee")},Ue=Array.isArray,De=ie||function(){return !1};function Fe(e){if(!We(e))return !1;var t=Ee(e);return t==f||t==h||t==c||t==v}function Be(e){return "number"==typeof e&&e>-1&&e%1==0&&e<=o}function We(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}function qe(e){return null!=e&&"object"==typeof e}var Je=R?function(e){return function(t){return e(t)}}(R):function(e){return qe(e)&&Be(e.length)&&!!S[Ee(e)]};function Ke(e){return null!=(t=e)&&Be(t.length)&&!Fe(t)?function(e,t){var r=Ue(e),n=!r&&Le(e),a=!r&&!n&&De(e),o=!r&&!n&&!a&&Je(e),i=r||n||a||o,s=i?function(e,t){for(var r=-1,n=Array(e);++r<e;)n[r]=t(r);return n}(e.length,String):[],c=s.length;for(var l in e)!t&&!H.call(e,l)||i&&("length"==l||a&&("offset"==l||"parent"==l)||o&&("buffer"==l||"byteLength"==l||"byteOffset"==l)||Ve(l,c))||s.push(l);return s}(e):function(e){if(r=(t=e)&&t.constructor,t!==("function"==typeof r&&r.prototype||J))return se(e);var t,r,n=[];for(var a in Object(e))H.call(e,a)&&"constructor"!=a&&n.push(a);return n}(e);var t;}e.exports=function(e,t){return Ae(e,t)};}).call(this,r(23)(e));},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const n=r(18);t.StringPredicate=n.StringPredicate;const a=r(20);t.NumberPredicate=a.NumberPredicate;const o=r(21);t.BooleanPredicate=o.BooleanPredicate;const i=r(0),s=r(22);t.ArrayPredicate=s.ArrayPredicate;const c=r(24);t.ObjectPredicate=c.ObjectPredicate;const l=r(29);t.DatePredicate=l.DatePredicate;const u=r(30);t.ErrorPredicate=u.ErrorPredicate;const d=r(31);t.MapPredicate=d.MapPredicate;const f=r(32);t.WeakMapPredicate=f.WeakMapPredicate;const h=r(33);t.SetPredicate=h.SetPredicate;const p=r(34);t.WeakSetPredicate=p.WeakSetPredicate;const g=r(35);t.AnyPredicate=g.AnyPredicate,t.default=(e,t)=>(Object.defineProperties(e,{string:{get:()=>new n.StringPredicate(t)},number:{get:()=>new a.NumberPredicate(t)},boolean:{get:()=>new o.BooleanPredicate(t)},undefined:{get:()=>new i.Predicate("undefined",t)},null:{get:()=>new i.Predicate("null",t)},nullOrUndefined:{get:()=>new i.Predicate("nullOrUndefined",t)},nan:{get:()=>new i.Predicate("nan",t)},symbol:{get:()=>new i.Predicate("symbol",t)},array:{get:()=>new s.ArrayPredicate(t)},object:{get:()=>new c.ObjectPredicate(t)},date:{get:()=>new l.DatePredicate(t)},error:{get:()=>new u.ErrorPredicate(t)},map:{get:()=>new d.MapPredicate(t)},weakMap:{get:()=>new f.WeakMapPredicate(t)},set:{get:()=>new h.SetPredicate(t)},weakSet:{get:()=>new p.WeakSetPredicate(t)},function:{get:()=>new i.Predicate("Function",t)},buffer:{get:()=>new i.Predicate("Buffer",t)},regExp:{get:()=>new i.Predicate("RegExp",t)},promise:{get:()=>new i.Predicate("Promise",t)},typedArray:{get:()=>new i.Predicate("TypedArray",t)},int8Array:{get:()=>new i.Predicate("Int8Array",t)},uint8Array:{get:()=>new i.Predicate("Uint8Array",t)},uint8ClampedArray:{get:()=>new i.Predicate("Uint8ClampedArray",t)},int16Array:{get:()=>new i.Predicate("Int16Array",t)},uint16Array:{get:()=>new i.Predicate("Uint16Array",t)},int32Array:{get:()=>new i.Predicate("Int32Array",t)},uint32Array:{get:()=>new i.Predicate("Uint32Array",t)},float32Array:{get:()=>new i.Predicate("Float32Array",t)},float64Array:{get:()=>new i.Predicate("Float64Array",t)},arrayBuffer:{get:()=>new i.Predicate("ArrayBuffer",t)},dataView:{get:()=>new i.Predicate("DataView",t)},iterable:{get:()=>new i.Predicate("Iterable",t)},any:{value:(...e)=>new g.AnyPredicate(e,t)}}),e);},function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(r(4));t.default=(e,t)=>{try{for(const r of e)a.default(r,t);return !0}catch(e){return e.message}};},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.ArgumentError=class extends Error{constructor(e,t){super(e),"captureStackTrace"in Error&&Error.captureStackTrace(this,t),this.name="ArgumentError";}};},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const n=r(2);t.default=function e(t,r,a){a[n.testSymbol](t,e,r);};},function(e,t,r){const n=()=>{const e=Error.prepareStackTrace;Error.prepareStackTrace=(e,t)=>t;const t=(new Error).stack.slice(1);return Error.prepareStackTrace=e,t};e.exports=n,e.exports.default=n;},function(e,t,r){var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=n(r(12)),i=a(r(13)),s=a(r(14)),c=/^.*?\((.*?)[,)]/;t.inferLabel=e=>{if(!s.default)return;const t=e[1],r=t.getFileName(),n=t.getLineNumber(),a=t.getColumnNumber();if(!r||null===n||null===a)return;let l=[];try{l=o.readFileSync(r,"utf8").split("\n");}catch(e){return}let u=l[n-1];if(!u)return;u=u.slice(a-1);const d=c.exec(u);if(!d||!d[1])return;const f=d[1];return i.default(f)||i.default(f.split(".").pop())?f:void 0};},function(e,t){e.exports=require$$0;},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const n=/^[a-z$_][a-z$_0-9]*$/i,a=new Set(["undefined","null","true","false","super","this","Infinity","NaN"]);t.default=e=>e&&!a.has(e)&&n.test(e);},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.default=Boolean("undefined"!=typeof process&&process.versions&&process.versions.node);},function(e,t){e.exports=require$$1;},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const n=r(0);t.not=e=>{const t=e.addValidator;return e.addValidator=r=>{const a=r.validator,o=r.message;return r.message=(e,t)=>`[NOT] ${o(e,t)}`,r.validator=e=>!a(e),e[n.validatorSymbol].push(r),e.addValidator=t,e},e};},function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(r(6));t.default=e=>(Object.defineProperties(e,{optional:{get:()=>a.default({},{optional:!0})}}),e);},function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(r(1)),o=n(r(19)),i=r(0);t.StringPredicate=class extends i.Predicate{constructor(e){super("string",e);}length(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have length \`${e}\`, got \`${t}\``,validator:t=>t.length===e})}minLength(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have a minimum length of \`${e}\`, got \`${t}\``,validator:t=>t.length>=e})}maxLength(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have a maximum length of \`${e}\`, got \`${t}\``,validator:t=>t.length<=e})}matches(e){return this.addValidator({message:(t,r)=>`Expected ${r} to match \`${e}\`, got \`${t}\``,validator:t=>e.test(t)})}startsWith(e){return this.addValidator({message:(t,r)=>`Expected ${r} to start with \`${e}\`, got \`${t}\``,validator:t=>t.startsWith(e)})}endsWith(e){return this.addValidator({message:(t,r)=>`Expected ${r} to end with \`${e}\`, got \`${t}\``,validator:t=>t.endsWith(e)})}includes(e){return this.addValidator({message:(t,r)=>`Expected ${r} to include \`${e}\`, got \`${t}\``,validator:t=>t.includes(e)})}oneOf(e){return this.addValidator({message:(t,r)=>{let n=JSON.stringify(e);if(e.length>10){const t=e.length-10;n=JSON.stringify(e.slice(0,10)).replace(/]$/,`,…+${t} more]`);}return `Expected ${r} to be one of \`${n}\`, got \`${t}\``},validator:t=>e.includes(t)})}get empty(){return this.addValidator({message:(e,t)=>`Expected ${t} to be empty, got \`${e}\``,validator:e=>""===e})}get nonEmpty(){return this.addValidator({message:(e,t)=>`Expected ${t} to not be empty`,validator:e=>""!==e})}equals(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be equal to \`${e}\`, got \`${t}\``,validator:t=>t===e})}get alphanumeric(){return this.addValidator({message:(e,t)=>`Expected ${t} to be alphanumeric, got \`${e}\``,validator:e=>/^[a-z\d]+$/i.test(e)})}get alphabetical(){return this.addValidator({message:(e,t)=>`Expected ${t} to be alphabetical, got \`${e}\``,validator:e=>/^[a-z]+$/gi.test(e)})}get numeric(){return this.addValidator({message:(e,t)=>`Expected ${t} to be numeric, got \`${e}\``,validator:e=>/^(\+|-)?\d+$/i.test(e)})}get date(){return this.addValidator({message:(e,t)=>`Expected ${t} to be a date, got \`${e}\``,validator:o.default})}get lowercase(){return this.addValidator({message:(e,t)=>`Expected ${t} to be lowercase, got \`${e}\``,validator:e=>""!==e.trim()&&e===e.toLowerCase()})}get uppercase(){return this.addValidator({message:(e,t)=>`Expected ${t} to be uppercase, got \`${e}\``,validator:e=>""!==e.trim()&&e===e.toUpperCase()})}get url(){return this.addValidator({message:(e,t)=>`Expected ${t} to be a URL, got \`${e}\``,validator:a.default.urlString})}};},function(e,t,r){e.exports=function(e){return !isNaN(Date.parse(e))};},function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(r(1)),o=r(0);t.NumberPredicate=class extends o.Predicate{constructor(e){super("number",e);}inRange(e,t){return this.addValidator({message:(r,n)=>`Expected ${n} to be in range [${e}..${t}], got ${r}`,validator:r=>a.default.inRange(r,[e,t])})}greaterThan(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be greater than ${e}, got ${t}`,validator:t=>t>e})}greaterThanOrEqual(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be greater than or equal to ${e}, got ${t}`,validator:t=>t>=e})}lessThan(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be less than ${e}, got ${t}`,validator:t=>t<e})}lessThanOrEqual(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be less than or equal to ${e}, got ${t}`,validator:t=>t<=e})}equal(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be equal to ${e}, got ${t}`,validator:t=>t===e})}oneOf(e){return this.addValidator({message:(t,r)=>{let n=JSON.stringify(e);if(e.length>10){const t=e.length-10;n=JSON.stringify(e.slice(0,10)).replace(/]$/,`,…+${t} more]`);}return `Expected ${r} to be one of \`${n}\`, got ${t}`},validator:t=>e.includes(t)})}get integer(){return this.addValidator({message:(e,t)=>`Expected ${t} to be an integer, got ${e}`,validator:e=>a.default.integer(e)})}get finite(){return this.addValidator({message:(e,t)=>`Expected ${t} to be finite, got ${e}`,validator:e=>!a.default.infinite(e)})}get infinite(){return this.addValidator({message:(e,t)=>`Expected ${t} to be infinite, got ${e}`,validator:e=>a.default.infinite(e)})}get positive(){return this.addValidator({message:(e,t)=>`Expected ${t} to be positive, got ${e}`,validator:e=>e>0})}get negative(){return this.addValidator({message:(e,t)=>`Expected ${t} to be negative, got ${e}`,validator:e=>e<0})}get integerOrInfinite(){return this.addValidator({message:(e,t)=>`Expected ${t} to be an integer or infinite, got ${e}`,validator:e=>a.default.integer(e)||a.default.infinite(e)})}get uint8(){return this.integer.inRange(0,255)}get uint16(){return this.integer.inRange(0,65535)}get uint32(){return this.integer.inRange(0,4294967295)}get int8(){return this.integer.inRange(-128,127)}get int16(){return this.integer.inRange(-32768,32767)}get int32(){return this.integer.inRange(-2147483648,2147483647)}};},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const n=r(0);t.BooleanPredicate=class extends n.Predicate{constructor(e){super("boolean",e);}get true(){return this.addValidator({message:(e,t)=>`Expected ${t} to be true, got ${e}`,validator:e=>!0===e})}get false(){return this.addValidator({message:(e,t)=>`Expected ${t} to be false, got ${e}`,validator:e=>!1===e})}};},function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(r(5)),o=n(r(4)),i=r(0);t.ArrayPredicate=class extends i.Predicate{constructor(e){super("array",e);}length(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have length \`${e}\`, got \`${t.length}\``,validator:t=>t.length===e})}minLength(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have a minimum length of \`${e}\`, got \`${t.length}\``,validator:t=>t.length>=e})}maxLength(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have a maximum length of \`${e}\`, got \`${t.length}\``,validator:t=>t.length<=e})}startsWith(e){return this.addValidator({message:(t,r)=>`Expected ${r} to start with \`${e}\`, got \`${t[0]}\``,validator:t=>t[0]===e})}endsWith(e){return this.addValidator({message:(t,r)=>`Expected ${r} to end with \`${e}\`, got \`${t[t.length-1]}\``,validator:t=>t[t.length-1]===e})}includes(...e){return this.addValidator({message:(t,r)=>`Expected ${r} to include all elements of \`${JSON.stringify(e)}\`, got \`${JSON.stringify(t)}\``,validator:t=>e.every(e=>-1!==t.indexOf(e))})}includesAny(...e){return this.addValidator({message:(t,r)=>`Expected ${r} to include any element of \`${JSON.stringify(e)}\`, got \`${JSON.stringify(t)}\``,validator:t=>e.some(e=>-1!==t.indexOf(e))})}get empty(){return this.addValidator({message:(e,t)=>`Expected ${t} to be empty, got \`${JSON.stringify(e)}\``,validator:e=>0===e.length})}get nonEmpty(){return this.addValidator({message:(e,t)=>`Expected ${t} to not be empty`,validator:e=>e.length>0})}deepEqual(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be deeply equal to \`${JSON.stringify(e)}\`, got \`${JSON.stringify(t)}\``,validator:t=>a.default(t,e)})}ofType(e){let t;return this.addValidator({message:(e,r)=>`(${r}) ${t}`,validator:r=>{try{for(const t of r)o.default(t,e);return !0}catch(e){return t=e.message,!1}}})}};},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e};},function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(r(1)),o=n(r(25)),i=n(r(5)),s=r(0),c=n(r(3)),l=n(r(7)),u=n(r(27)),d=r(28);t.ObjectPredicate=class extends s.Predicate{constructor(e){super("object",e);}get plain(){return this.addValidator({message:(e,t)=>`Expected ${t} to be a plain object`,validator:e=>a.default.plainObject(e)})}get empty(){return this.addValidator({message:(e,t)=>`Expected ${t} to be empty, got \`${JSON.stringify(e)}\``,validator:e=>0===Object.keys(e).length})}get nonEmpty(){return this.addValidator({message:(e,t)=>`Expected ${t} to not be empty`,validator:e=>Object.keys(e).length>0})}valuesOfType(e){return this.addValidator({message:(e,t,r)=>`(${t}) ${r}`,validator:t=>{const r=Object.keys(t).map(e=>t[e]);return l.default(r,e)}})}deepValuesOfType(e){return this.addValidator({message:(e,t,r)=>`(${t}) ${r}`,validator:t=>u.default(t,e)})}deepEqual(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be deeply equal to \`${JSON.stringify(e)}\`, got \`${JSON.stringify(t)}\``,validator:t=>i.default(t,e)})}instanceOf(e){return this.addValidator({message:(t,r)=>{let n=t.constructor.name;return n&&"Object"!==n||(n=JSON.stringify(t)),`Expected ${r} \`${n}\` to be of type \`${e.name}\``},validator:t=>t instanceof e})}hasKeys(...e){return this.addValidator({message:(e,t,r)=>`Expected ${t} to have keys \`${JSON.stringify(r)}\``,validator:t=>c.default({has:e=>o.default.has(t,e)},e)})}hasAnyKeys(...e){return this.addValidator({message:(t,r)=>`Expected ${r} to have any key of \`${JSON.stringify(e)}\``,validator:t=>e.some(e=>o.default.has(t,e))})}partialShape(e){return this.addValidator({message:(e,t,r)=>`${r.replace("Expected","Expected property")} in ${t}`,validator:t=>d.partial(t,e)})}exactShape(e){return this.addValidator({message:(e,t,r)=>`${r.replace("Expected","Expected property")} in ${t}`,validator:t=>d.exact(t,e)})}};},function(e,t,r){const n=r(26);function a(e){const t=e.split("."),r=[];for(let e=0;e<t.length;e++){let n=t[e];for(;"\\"===n[n.length-1]&&void 0!==t[e+1];)n=n.slice(0,-1)+".",n+=t[++e];r.push(n);}return r}e.exports={get(e,t,r){if(!n(e)||"string"!=typeof t)return void 0===r?e:r;const o=a(t);for(let t=0;t<o.length;t++){if(!Object.prototype.propertyIsEnumerable.call(e,o[t]))return r;if(null==(e=e[o[t]])){if(t!==o.length-1)return r;break}}return e},set(e,t,r){if(!n(e)||"string"!=typeof t)return e;const o=e,i=a(t);for(let t=0;t<i.length;t++){const a=i[t];n(e[a])||(e[a]={}),t===i.length-1&&(e[a]=r),e=e[a];}return o},delete(e,t){if(!n(e)||"string"!=typeof t)return;const r=a(t);for(let t=0;t<r.length;t++){const a=r[t];if(t===r.length-1)return void delete e[a];if(e=e[a],!n(e))return}},has(e,t){if(!n(e)||"string"!=typeof t)return !1;const r=a(t);for(let t=0;t<r.length;t++){if(!n(e))return !1;if(!(r[t]in e))return !1;e=e[r[t]];}return !0}};},function(e,t,r){e.exports=function(e){var t=typeof e;return null!==e&&("object"===t||"function"===t)};},function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(r(1)),o=n(r(4)),i=(e,t)=>a.default.plainObject(e)?Object.keys(e).every(r=>i(e[r],t)):(o.default(e,t),!0);t.default=(e,t)=>{try{return i(e,t)}catch(e){return e.message}};},function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(r(1)),o=n(r(9)),i=r(2);t.partial=function e(t,r,n){try{for(const s of Object.keys(r)){const c=n?`${n}.${s}`:s;if(i.isPredicate(r[s]))o.default(t[s],c,r[s]);else if(a.default.plainObject(r[s])){const n=e(t[s],r[s],c);if(!0!==n)return n}}return !0}catch(e){return e.message}},t.exact=function e(t,r,n){try{const s=new Set(Object.keys(t));for(const c of Object.keys(r)){s.delete(c);const l=n?`${n}.${c}`:c;if(i.isPredicate(r[c]))o.default(t[c],l,r[c]);else if(a.default.plainObject(r[c])){if(!Object.prototype.hasOwnProperty.call(t,c))return `Expected \`${l}\` to exist`;const n=e(t[c],r[c],l);if(!0!==n)return n}}if(s.size>0){const e=Array.from(s.keys())[0];return `Did not expect property \`${n?`${n}.${e}`:e}\` to exist, got \`${t[e]}\``}return !0}catch(e){return e.message}};},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const n=r(0);t.DatePredicate=class extends n.Predicate{constructor(e){super("date",e);}before(e){return this.addValidator({message:(t,r)=>`Expected ${r} ${t.toISOString()} to be before ${e.toISOString()}`,validator:t=>t.getTime()<e.getTime()})}after(e){return this.addValidator({message:(t,r)=>`Expected ${r} ${t.toISOString()} to be after ${e.toISOString()}`,validator:t=>t.getTime()>e.getTime()})}};},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const n=r(0);t.ErrorPredicate=class extends n.Predicate{constructor(e){super("error",e);}name(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have name \`${e}\`, got \`${t.name}\``,validator:t=>t.name===e})}message(e){return this.addValidator({message:(t,r)=>`Expected ${r} message to be \`${e}\`, got \`${t.message}\``,validator:t=>t.message===e})}messageIncludes(e){return this.addValidator({message:(t,r)=>`Expected ${r} message to include \`${e}\`, got \`${t.message}\``,validator:t=>t.message.includes(e)})}hasKeys(...e){return this.addValidator({message:(t,r)=>`Expected ${r} message to have keys \`${e.join("`, `")}\``,validator:t=>e.every(e=>t.hasOwnProperty(e))})}instanceOf(e){return this.addValidator({message:(t,r)=>`Expected ${r} \`${t.name}\` to be of type \`${e.name}\``,validator:t=>t instanceof e})}get typeError(){return this.instanceOf(TypeError)}get evalError(){return this.instanceOf(EvalError)}get rangeError(){return this.instanceOf(RangeError)}get referenceError(){return this.instanceOf(ReferenceError)}get syntaxError(){return this.instanceOf(SyntaxError)}get uriError(){return this.instanceOf(URIError)}};},function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(r(5)),o=r(0),i=n(r(3)),s=n(r(7));t.MapPredicate=class extends o.Predicate{constructor(e){super("Map",e);}size(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have size \`${e}\`, got \`${t.size}\``,validator:t=>t.size===e})}minSize(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have a minimum size of \`${e}\`, got \`${t.size}\``,validator:t=>t.size>=e})}maxSize(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have a maximum size of \`${e}\`, got \`${t.size}\``,validator:t=>t.size<=e})}hasKeys(...e){return this.addValidator({message:(e,t,r)=>`Expected ${t} to have keys \`${JSON.stringify(r)}\``,validator:t=>i.default(t,e)})}hasAnyKeys(...e){return this.addValidator({message:(t,r)=>`Expected ${r} to have any key of \`${JSON.stringify(e)}\``,validator:t=>e.some(e=>t.has(e))})}hasValues(...e){return this.addValidator({message:(e,t,r)=>`Expected ${t} to have values \`${JSON.stringify(r)}\``,validator:t=>i.default(new Set(t.values()),e)})}hasAnyValues(...e){return this.addValidator({message:(t,r)=>`Expected ${r} to have any value of \`${JSON.stringify(e)}\``,validator:t=>{const r=new Set(t.values());return e.some(e=>r.has(e))}})}keysOfType(e){return this.addValidator({message:(e,t,r)=>`(${t}) ${r}`,validator:t=>s.default(t.keys(),e)})}valuesOfType(e){return this.addValidator({message:(e,t,r)=>`(${t}) ${r}`,validator:t=>s.default(t.values(),e)})}get empty(){return this.addValidator({message:(e,t)=>`Expected ${t} to be empty, got \`${JSON.stringify(Array.from(e))}\``,validator:e=>0===e.size})}get nonEmpty(){return this.addValidator({message:(e,t)=>`Expected ${t} to not be empty`,validator:e=>e.size>0})}deepEqual(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be deeply equal to \`${JSON.stringify(Array.from(e))}\`, got \`${JSON.stringify(Array.from(t))}\``,validator:t=>a.default(t,e)})}};},function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=r(0),o=n(r(3));t.WeakMapPredicate=class extends a.Predicate{constructor(e){super("WeakMap",e);}hasKeys(...e){return this.addValidator({message:(e,t,r)=>`Expected ${t} to have keys \`${JSON.stringify(r)}\``,validator:t=>o.default(t,e)})}hasAnyKeys(...e){return this.addValidator({message:(t,r)=>`Expected ${r} to have any key of \`${JSON.stringify(e)}\``,validator:t=>e.some(e=>t.has(e))})}};},function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(r(5)),o=r(0),i=n(r(3)),s=n(r(7));t.SetPredicate=class extends o.Predicate{constructor(e){super("Set",e);}size(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have size \`${e}\`, got \`${t.size}\``,validator:t=>t.size===e})}minSize(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have a minimum size of \`${e}\`, got \`${t.size}\``,validator:t=>t.size>=e})}maxSize(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have a maximum size of \`${e}\`, got \`${t.size}\``,validator:t=>t.size<=e})}has(...e){return this.addValidator({message:(e,t,r)=>`Expected ${t} to have items \`${JSON.stringify(r)}\``,validator:t=>i.default(t,e)})}hasAny(...e){return this.addValidator({message:(t,r)=>`Expected ${r} to have any item of \`${JSON.stringify(e)}\``,validator:t=>e.some(e=>t.has(e))})}ofType(e){return this.addValidator({message:(e,t,r)=>`(${t}) ${r}`,validator:t=>s.default(t,e)})}get empty(){return this.addValidator({message:(e,t)=>`Expected ${t} to be empty, got \`${JSON.stringify(Array.from(e))}\``,validator:e=>0===e.size})}get nonEmpty(){return this.addValidator({message:(e,t)=>`Expected ${t} to not be empty`,validator:e=>e.size>0})}deepEqual(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be deeply equal to \`${JSON.stringify(Array.from(e))}\`, got \`${JSON.stringify(Array.from(t))}\``,validator:t=>a.default(t,e)})}};},function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=r(0),o=n(r(3));t.WeakSetPredicate=class extends a.Predicate{constructor(e){super("WeakSet",e);}has(...e){return this.addValidator({message:(e,t,r)=>`Expected ${t} to have items \`${JSON.stringify(r)}\``,validator:t=>o.default(t,e)})}hasAny(...e){return this.addValidator({message:(t,r)=>`Expected ${r} to have any item of \`${JSON.stringify(e)}\``,validator:t=>e.some(e=>t.has(e))})}};},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const n=r(8),a=r(2);t.AnyPredicate=class{constructor(e,t={}){this.predicates=e,this.options=t;}[a.testSymbol](e,t,r){const a=["Any predicate failed with the following errors:"];for(const n of this.predicates)try{return void t(e,r,n)}catch(t){if(void 0===e&&!0===this.options.optional)return;a.push(`- ${t.message}`);}throw new n.ArgumentError(a.join("\n"),t)}};}]);const t=e.exports;e.exports=t.default,Object.assign(e.exports,t);}),ow=unwrapExports(source),version="0.0.5",session={socket:null,connected:null,connectionId:null,networkId:null,dappId:null,transactionCallback:null},transactions=[];function Blocknative(e){return validateOptions(e),(session=_objectSpread2({},session,{},e)).socket=new SturdyWebSocket("wss://api.blocknative.com/v0"),session.socket.onmessage=handleSocketMessage,{transaction:transaction,event:event}}function transaction(e){var t=Date.now(),r=createEmitter();return transactions.push({hash:e,emitter:r}),logToServer({eventCode:"txSent",categoryCode:"activeTransaction",transaction:{hash:e,id:e}}),{details:{hash:e,timestamp:t,eventCode:"txSent"},emitter:r}}function event(e){validateEvent(e),logToServer(e);}var createEmitter=function(){return {listeners:{},on:function(e,t){if("function"!=typeof t)throw new Error("Listener must be a function");this.listeners[e]=t;}}};function validateOptions(e){ow(e,"options",ow.object.exactShape({networkId:ow.number,dappId:ow.string,connectionId:ow.optional.string,transactionCallback:ow.optional.function}));}function validateEvent(e){ow(e,"event",ow.object.exactShape({eventCode:ow.string,categoryCode:ow.string}));}function handleSocketMessage(e){var t=JSON.parse(e.data),r=t.status,n=t.reason,a=t.event,o=t.connectionId;if("error"===r){if(n.includes("not a valid API key")){var i=new Error(n);throw i.eventCode="initFail",i}if(n.includes("network not supported")){var s=new Error(n);throw s.eventCode="initFail",s}}if(a&&a.transaction){var c=a.transaction,l=a.eventCode,u=_objectSpread2({},c,{eventCode:l}),d=transactions.find(function(e){return e.hash.toLowerCase()===c.hash.toLowerCase()});if(d){var f=d.emitter&&d.emitter.listeners[l]&&d.emitter.listeners[l](u);session.transactionCallback&&session.transactionCallback({transaction:u,emitterResult:f});}}o&&(session.connectionId=o);}function logToServer(e){session.socket.send(createEventLog(e));}function createEventLog(e){var t=session,r=t.dappId,n=t.networkId;return JSON.stringify(_objectSpread2({timeStamp:new Date,dappId:r,version:version,blockchain:{system:"ethereum",network:networkName(n)}},e))}function networkName(e){switch(e){case 1:return "main";case 3:return "ropsten";case 4:return "rinkeby";case 5:return "goerli";case 42:return "kovan";case"localhost":return "localhost";default:return "local"}}module.exports=Blocknative;
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
    module.exports=function(e){var t={};function r(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a});},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0});},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(a,n,function(t){return e[t]}.bind(null,n));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=4)}([function(e,t,r){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(r(1)),i=r(8),o=r(2),s=r(16);t.validatorSymbol=Symbol("validators");t.Predicate=class{constructor(e,t={}){this.type=e,this.options=t,this.context={validators:[]},this.context=Object.assign({},this.context,this.options);const r=this.type[0].toLowerCase()+this.type.slice(1);this.addValidator({message:(e,t)=>`Expected ${t&&t.substring(this.type.length+1)||"argument"} to be of type \`${this.type}\` but received type \`${n.default(e)}\``,validator:e=>n.default[r](e)});}[o.testSymbol](e,t,r){for(const{validator:a,message:n}of this.context.validators){if(!0===this.options.optional&&void 0===e)continue;const o=a(e);if(!0===o)continue;let s=r;throw"function"==typeof r&&(s=r()),s=s?`${this.type} \`${s}\``:this.type,new i.ArgumentError(n(e,s,o),t)}}get[t.validatorSymbol](){return this.context.validators}get not(){return s.not(this)}validate(e){return this.addValidator({message:(e,t,r)=>"string"==typeof r?`(${t}) ${r}`:r(t),validator:t=>{const{message:r,validator:a}=e(t);return !!a||r}})}is(e){return this.addValidator({message:(e,t,r)=>r?`(${t}) ${r}`:`Expected ${t} \`${e}\` to pass custom validation function`,validator:e})}addValidator(e){return this.context.validators.push(e),this}};},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const a="undefined"==typeof URL?r(15).URL:URL,{toString:n}=Object.prototype,i=e=>t=>typeof t===e,o=e=>{const t=n.call(e).slice(8,-1);if(t)return t},s=e=>t=>o(t)===e;function d(e){switch(e){case null:return "null";case!0:case!1:return "boolean"}switch(typeof e){case"undefined":return "undefined";case"string":return "string";case"number":return "number";case"bigint":return "bigint";case"symbol":return "symbol"}if(d.function_(e))return "Function";if(d.observable(e))return "Observable";if(d.array(e))return "Array";if(d.buffer(e))return "Buffer";const t=o(e);if(t)return t;if(e instanceof String||e instanceof Boolean||e instanceof Number)throw new TypeError("Please don't use object wrappers for primitive types");return "Object"}const u=e=>"object"==typeof e;d.undefined=i("undefined"),d.string=i("string"),d.number=i("number"),d.bigint=i("bigint"),d.function_=i("function"),d.null_=(e=>null===e),d.class_=(e=>d.function_(e)&&e.toString().startsWith("class ")),d.boolean=(e=>!0===e||!1===e),d.symbol=i("symbol"),d.numericString=(e=>d.string(e)&&e.length>0&&!Number.isNaN(Number(e))),d.array=Array.isArray,d.buffer=(e=>!d.nullOrUndefined(e)&&!d.nullOrUndefined(e.constructor)&&d.function_(e.constructor.isBuffer)&&e.constructor.isBuffer(e)),d.nullOrUndefined=(e=>d.null_(e)||d.undefined(e)),d.object=(e=>!d.nullOrUndefined(e)&&(d.function_(e)||u(e))),d.iterable=(e=>!d.nullOrUndefined(e)&&d.function_(e[Symbol.iterator])),d.asyncIterable=(e=>!d.nullOrUndefined(e)&&d.function_(e[Symbol.asyncIterator])),d.generator=(e=>d.iterable(e)&&d.function_(e.next)&&d.function_(e.throw)),d.nativePromise=(e=>s("Promise")(e));d.promise=(e=>d.nativePromise(e)||(e=>!d.null_(e)&&u(e)&&d.function_(e.then)&&d.function_(e.catch))(e)),d.generatorFunction=s("GeneratorFunction"),d.asyncFunction=s("AsyncFunction"),d.boundFunction=(e=>d.function_(e)&&!e.hasOwnProperty("prototype")),d.regExp=s("RegExp"),d.date=s("Date"),d.error=s("Error"),d.map=(e=>s("Map")(e)),d.set=(e=>s("Set")(e)),d.weakMap=(e=>s("WeakMap")(e)),d.weakSet=(e=>s("WeakSet")(e)),d.int8Array=s("Int8Array"),d.uint8Array=s("Uint8Array"),d.uint8ClampedArray=s("Uint8ClampedArray"),d.int16Array=s("Int16Array"),d.uint16Array=s("Uint16Array"),d.int32Array=s("Int32Array"),d.uint32Array=s("Uint32Array"),d.float32Array=s("Float32Array"),d.float64Array=s("Float64Array"),d.bigint64Array=s("BigInt64Array"),d.biguint64Array=s("BigUint64Array"),d.arrayBuffer=s("ArrayBuffer"),d.sharedArrayBuffer=s("SharedArrayBuffer"),d.dataView=s("DataView"),d.directInstanceOf=((e,t)=>Object.getPrototypeOf(e)===t.prototype),d.urlInstance=(e=>s("URL")(e)),d.urlString=(e=>{if(!d.string(e))return !1;try{return new a(e),!0}catch(e){return !1}}),d.truthy=(e=>Boolean(e)),d.falsy=(e=>!e),d.nan=(e=>Number.isNaN(e));const c=new Set(["undefined","string","number","bigint","boolean","symbol"]);d.primitive=(e=>d.null_(e)||c.has(typeof e)),d.integer=(e=>Number.isInteger(e)),d.safeInteger=(e=>Number.isSafeInteger(e)),d.plainObject=(e=>{if("Object"!==o(e))return !1;const t=Object.getPrototypeOf(e);return null===t||t===Object.getPrototypeOf({})});const l=new Set(["Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array"]);d.typedArray=(e=>{const t=o(e);return void 0!==t&&l.has(t)});d.arrayLike=(e=>!d.nullOrUndefined(e)&&!d.function_(e)&&(e=>d.safeInteger(e)&&e>=0)(e.length)),d.inRange=((e,t)=>{if(d.number(t))return e>=Math.min(0,t)&&e<=Math.max(t,0);if(d.array(t)&&2===t.length)return e>=Math.min(...t)&&e<=Math.max(...t);throw new TypeError(`Invalid range: ${JSON.stringify(t)}`)});const f=["innerHTML","ownerDocument","style","attributes","nodeValue"];d.domElement=(e=>d.object(e)&&1===e.nodeType&&d.string(e.nodeName)&&!d.plainObject(e)&&f.every(t=>t in e)),d.observable=(e=>!!e&&(!(!e[Symbol.observable]||e!==e[Symbol.observable]())||!(!e["@@observable"]||e!==e["@@observable"]()))),d.nodeStream=(e=>!d.nullOrUndefined(e)&&u(e)&&d.function_(e.pipe)&&!d.observable(e)),d.infinite=(e=>e===1/0||e===-1/0);const p=e=>t=>d.integer(t)&&Math.abs(t%2)===e;d.evenInteger=p(0),d.oddInteger=p(1),d.emptyArray=(e=>d.array(e)&&0===e.length),d.nonEmptyArray=(e=>d.array(e)&&e.length>0),d.emptyString=(e=>d.string(e)&&0===e.length),d.nonEmptyString=(e=>d.string(e)&&e.length>0);d.emptyStringOrWhitespace=(e=>d.emptyString(e)||(e=>d.string(e)&&!1===/\S/.test(e))(e)),d.emptyObject=(e=>d.object(e)&&!d.map(e)&&!d.set(e)&&0===Object.keys(e).length),d.nonEmptyObject=(e=>d.object(e)&&!d.map(e)&&!d.set(e)&&Object.keys(e).length>0),d.emptySet=(e=>d.set(e)&&0===e.size),d.nonEmptySet=(e=>d.set(e)&&e.size>0),d.emptyMap=(e=>d.map(e)&&0===e.size),d.nonEmptyMap=(e=>d.map(e)&&e.size>0);const g=(e,t,r)=>{if(!1===d.function_(t))throw new TypeError(`Invalid predicate: ${JSON.stringify(t)}`);if(0===r.length)throw new TypeError("Invalid number of values");return e.call(r,t)};d.any=((e,...t)=>g(Array.prototype.some,e,t)),d.all=((e,...t)=>g(Array.prototype.every,e,t)),Object.defineProperties(d,{class:{value:d.class_},function:{value:d.function_},null:{value:d.null_}}),e.exports=d,t.default=d;},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.testSymbol=Symbol("test"),t.isPredicate=(e=>Boolean(e&&e[t.testSymbol]));},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.default=((e,t,r=5)=>{const a=[];for(const n of t)if(!e.has(n)&&(a.push(n),a.length===r))return a;return 0===a.length||a});},function(e,t,r){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(r(10)),i=r(11),o=r(0);t.Predicate=o.Predicate;const s=r(2),d=a(r(17)),u=a(r(6)),c=a(r(9)),l=(e,t,r)=>{if(!s.isPredicate(t)&&"string"!=typeof t)throw new TypeError(`Expected second argument to be a predicate or a string, got \`${typeof t}\``);if(s.isPredicate(t)){const r=n.default();c.default(e,()=>i.inferLabel(r),t);}else c.default(e,t,r);};Object.defineProperties(l,{isValid:{value:(e,t)=>{try{return l(e,t),!0}catch(e){return !1}}},create:{value:(e,t)=>r=>{if(s.isPredicate(e)){const t=n.default();c.default(r,()=>i.inferLabel(t),e);}else c.default(r,e,t);}}}),t.default=u.default(d.default(l));var f=r(6);t.StringPredicate=f.StringPredicate,t.NumberPredicate=f.NumberPredicate,t.BooleanPredicate=f.BooleanPredicate,t.ArrayPredicate=f.ArrayPredicate,t.ObjectPredicate=f.ObjectPredicate,t.DatePredicate=f.DatePredicate,t.ErrorPredicate=f.ErrorPredicate,t.MapPredicate=f.MapPredicate,t.WeakMapPredicate=f.WeakMapPredicate,t.SetPredicate=f.SetPredicate,t.WeakSetPredicate=f.WeakSetPredicate,t.AnyPredicate=f.AnyPredicate;},function(e,t,r){(function(e){var r=200,a="__lodash_hash_undefined__",n=1,i=2,o=9007199254740991,s="[object Arguments]",d="[object Array]",u="[object AsyncFunction]",c="[object Boolean]",l="[object Date]",f="[object Error]",p="[object Function]",g="[object GeneratorFunction]",h="[object Map]",y="[object Number]",m="[object Null]",v="[object Object]",b="[object Proxy]",_="[object RegExp]",$="[object Set]",O="[object String]",P="[object Symbol]",x="[object Undefined]",E="[object ArrayBuffer]",j="[object DataView]",S=/^\[object .+?Constructor\]$/,A=/^(?:0|[1-9]\d*)$/,w={};w["[object Float32Array]"]=w["[object Float64Array]"]=w["[object Int8Array]"]=w["[object Int16Array]"]=w["[object Int32Array]"]=w["[object Uint8Array]"]=w["[object Uint8ClampedArray]"]=w["[object Uint16Array]"]=w["[object Uint32Array]"]=!0,w[s]=w[d]=w[E]=w[c]=w[j]=w[l]=w[f]=w[p]=w[h]=w[y]=w[v]=w[_]=w[$]=w[O]=w["[object WeakMap]"]=!1;var V="object"==typeof commonjsGlobal&&commonjsGlobal&&commonjsGlobal.Object===Object&&commonjsGlobal,M="object"==typeof self&&self&&self.Object===Object&&self,N=V||M||Function("return this")(),z=t&&!t.nodeType&&t,k=z&&"object"==typeof e&&e&&!e.nodeType&&e,I=k&&k.exports===z,U=I&&V.process,T=function(){try{return U&&U.binding&&U.binding("util")}catch(e){}}(),J=T&&T.isTypedArray;function D(e,t){for(var r=-1,a=null==e?0:e.length;++r<a;)if(t(e[r],r,e))return !0;return !1}function B(e){var t=-1,r=Array(e.size);return e.forEach(function(e,a){r[++t]=[a,e];}),r}function W(e){var t=-1,r=Array(e.size);return e.forEach(function(e){r[++t]=e;}),r}var F,L,R,q=Array.prototype,C=Function.prototype,K=Object.prototype,G=N["__core-js_shared__"],H=C.toString,Q=K.hasOwnProperty,X=(F=/[^.]+$/.exec(G&&G.keys&&G.keys.IE_PROTO||""))?"Symbol(src)_1."+F:"",Y=K.toString,Z=RegExp("^"+H.call(Q).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),ee=I?N.Buffer:void 0,te=N.Symbol,re=N.Uint8Array,ae=K.propertyIsEnumerable,ne=q.splice,ie=te?te.toStringTag:void 0,oe=Object.getOwnPropertySymbols,se=ee?ee.isBuffer:void 0,de=(L=Object.keys,R=Object,function(e){return L(R(e))}),ue=Te(N,"DataView"),ce=Te(N,"Map"),le=Te(N,"Promise"),fe=Te(N,"Set"),pe=Te(N,"WeakMap"),ge=Te(Object,"create"),he=We(ue),ye=We(ce),me=We(le),ve=We(fe),be=We(pe),_e=te?te.prototype:void 0,$e=_e?_e.valueOf:void 0;function Oe(e){var t=-1,r=null==e?0:e.length;for(this.clear();++t<r;){var a=e[t];this.set(a[0],a[1]);}}function Pe(e){var t=-1,r=null==e?0:e.length;for(this.clear();++t<r;){var a=e[t];this.set(a[0],a[1]);}}function xe(e){var t=-1,r=null==e?0:e.length;for(this.clear();++t<r;){var a=e[t];this.set(a[0],a[1]);}}function Ee(e){var t=-1,r=null==e?0:e.length;for(this.__data__=new xe;++t<r;)this.add(e[t]);}function je(e){var t=this.__data__=new Pe(e);this.size=t.size;}function Se(e,t){var r=Re(e),a=!r&&Le(e),n=!r&&!a&&qe(e),i=!r&&!a&&!n&&Qe(e),o=r||a||n||i,s=o?function(e,t){for(var r=-1,a=Array(e);++r<e;)a[r]=t(r);return a}(e.length,String):[],d=s.length;for(var u in e)!t&&!Q.call(e,u)||o&&("length"==u||n&&("offset"==u||"parent"==u)||i&&("buffer"==u||"byteLength"==u||"byteOffset"==u)||Be(u,d))||s.push(u);return s}function Ae(e,t){for(var r=e.length;r--;)if(Fe(e[r][0],t))return r;return -1}function we(e){return null==e?void 0===e?x:m:ie&&ie in Object(e)?function(e){var t=Q.call(e,ie),r=e[ie];try{e[ie]=void 0;var a=!0;}catch(e){}var n=Y.call(e);a&&(t?e[ie]=r:delete e[ie]);return n}(e):function(e){return Y.call(e)}(e)}function Ve(e){return He(e)&&we(e)==s}function Me(e,t,r,a,o){return e===t||(null==e||null==t||!He(e)&&!He(t)?e!=e&&t!=t:function(e,t,r,a,o,u){var p=Re(e),g=Re(t),m=p?d:De(e),b=g?d:De(t),x=(m=m==s?v:m)==v,S=(b=b==s?v:b)==v,A=m==b;if(A&&qe(e)){if(!qe(t))return !1;p=!0,x=!1;}if(A&&!x)return u||(u=new je),p||Qe(e)?ke(e,t,r,a,o,u):function(e,t,r,a,o,s,d){switch(r){case j:if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return !1;e=e.buffer,t=t.buffer;case E:return !(e.byteLength!=t.byteLength||!s(new re(e),new re(t)));case c:case l:case y:return Fe(+e,+t);case f:return e.name==t.name&&e.message==t.message;case _:case O:return e==t+"";case h:var u=B;case $:var p=a&n;if(u||(u=W),e.size!=t.size&&!p)return !1;var g=d.get(e);if(g)return g==t;a|=i,d.set(e,t);var m=ke(u(e),u(t),a,o,s,d);return d.delete(e),m;case P:if($e)return $e.call(e)==$e.call(t)}return !1}(e,t,m,r,a,o,u);if(!(r&n)){var w=x&&Q.call(e,"__wrapped__"),V=S&&Q.call(t,"__wrapped__");if(w||V){var M=w?e.value():e,N=V?t.value():t;return u||(u=new je),o(M,N,r,a,u)}}if(!A)return !1;return u||(u=new je),function(e,t,r,a,i,o){var s=r&n,d=Ie(e),u=d.length,c=Ie(t).length;if(u!=c&&!s)return !1;for(var l=u;l--;){var f=d[l];if(!(s?f in t:Q.call(t,f)))return !1}var p=o.get(e);if(p&&o.get(t))return p==t;var g=!0;o.set(e,t),o.set(t,e);for(var h=s;++l<u;){f=d[l];var y=e[f],m=t[f];if(a)var v=s?a(m,y,f,t,e,o):a(y,m,f,e,t,o);if(!(void 0===v?y===m||i(y,m,r,a,o):v)){g=!1;break}h||(h="constructor"==f);}if(g&&!h){var b=e.constructor,_=t.constructor;b!=_&&"constructor"in e&&"constructor"in t&&!("function"==typeof b&&b instanceof b&&"function"==typeof _&&_ instanceof _)&&(g=!1);}return o.delete(e),o.delete(t),g}(e,t,r,a,o,u)}(e,t,r,a,Me,o))}function Ne(e){return !(!Ge(e)||(t=e,X&&X in t))&&(Ce(e)?Z:S).test(We(e));var t;}function ze(e){if(r=(t=e)&&t.constructor,a="function"==typeof r&&r.prototype||K,t!==a)return de(e);var t,r,a,n=[];for(var i in Object(e))Q.call(e,i)&&"constructor"!=i&&n.push(i);return n}function ke(e,t,r,a,o,s){var d=r&n,u=e.length,c=t.length;if(u!=c&&!(d&&c>u))return !1;var l=s.get(e);if(l&&s.get(t))return l==t;var f=-1,p=!0,g=r&i?new Ee:void 0;for(s.set(e,t),s.set(t,e);++f<u;){var h=e[f],y=t[f];if(a)var m=d?a(y,h,f,t,e,s):a(h,y,f,e,t,s);if(void 0!==m){if(m)continue;p=!1;break}if(g){if(!D(t,function(e,t){if(n=t,!g.has(n)&&(h===e||o(h,e,r,a,s)))return g.push(t);var n;})){p=!1;break}}else if(h!==y&&!o(h,y,r,a,s)){p=!1;break}}return s.delete(e),s.delete(t),p}function Ie(e){return function(e,t,r){var a=t(e);return Re(e)?a:function(e,t){for(var r=-1,a=t.length,n=e.length;++r<a;)e[n+r]=t[r];return e}(a,r(e))}(e,Xe,Je)}function Ue(e,t){var r,a,n=e.__data__;return ("string"==(a=typeof(r=t))||"number"==a||"symbol"==a||"boolean"==a?"__proto__"!==r:null===r)?n["string"==typeof t?"string":"hash"]:n.map}function Te(e,t){var r=function(e,t){return null==e?void 0:e[t]}(e,t);return Ne(r)?r:void 0}Oe.prototype.clear=function(){this.__data__=ge?ge(null):{},this.size=0;},Oe.prototype.delete=function(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t},Oe.prototype.get=function(e){var t=this.__data__;if(ge){var r=t[e];return r===a?void 0:r}return Q.call(t,e)?t[e]:void 0},Oe.prototype.has=function(e){var t=this.__data__;return ge?void 0!==t[e]:Q.call(t,e)},Oe.prototype.set=function(e,t){var r=this.__data__;return this.size+=this.has(e)?0:1,r[e]=ge&&void 0===t?a:t,this},Pe.prototype.clear=function(){this.__data__=[],this.size=0;},Pe.prototype.delete=function(e){var t=this.__data__,r=Ae(t,e);return !(r<0||(r==t.length-1?t.pop():ne.call(t,r,1),--this.size,0))},Pe.prototype.get=function(e){var t=this.__data__,r=Ae(t,e);return r<0?void 0:t[r][1]},Pe.prototype.has=function(e){return Ae(this.__data__,e)>-1},Pe.prototype.set=function(e,t){var r=this.__data__,a=Ae(r,e);return a<0?(++this.size,r.push([e,t])):r[a][1]=t,this},xe.prototype.clear=function(){this.size=0,this.__data__={hash:new Oe,map:new(ce||Pe),string:new Oe};},xe.prototype.delete=function(e){var t=Ue(this,e).delete(e);return this.size-=t?1:0,t},xe.prototype.get=function(e){return Ue(this,e).get(e)},xe.prototype.has=function(e){return Ue(this,e).has(e)},xe.prototype.set=function(e,t){var r=Ue(this,e),a=r.size;return r.set(e,t),this.size+=r.size==a?0:1,this},Ee.prototype.add=Ee.prototype.push=function(e){return this.__data__.set(e,a),this},Ee.prototype.has=function(e){return this.__data__.has(e)},je.prototype.clear=function(){this.__data__=new Pe,this.size=0;},je.prototype.delete=function(e){var t=this.__data__,r=t.delete(e);return this.size=t.size,r},je.prototype.get=function(e){return this.__data__.get(e)},je.prototype.has=function(e){return this.__data__.has(e)},je.prototype.set=function(e,t){var a=this.__data__;if(a instanceof Pe){var n=a.__data__;if(!ce||n.length<r-1)return n.push([e,t]),this.size=++a.size,this;a=this.__data__=new xe(n);}return a.set(e,t),this.size=a.size,this};var Je=oe?function(e){return null==e?[]:(e=Object(e),function(e,t){for(var r=-1,a=null==e?0:e.length,n=0,i=[];++r<a;){var o=e[r];t(o,r,e)&&(i[n++]=o);}return i}(oe(e),function(t){return ae.call(e,t)}))}:function(){return []},De=we;function Be(e,t){return !!(t=null==t?o:t)&&("number"==typeof e||A.test(e))&&e>-1&&e%1==0&&e<t}function We(e){if(null!=e){try{return H.call(e)}catch(e){}try{return e+""}catch(e){}}return ""}function Fe(e,t){return e===t||e!=e&&t!=t}(ue&&De(new ue(new ArrayBuffer(1)))!=j||ce&&De(new ce)!=h||le&&"[object Promise]"!=De(le.resolve())||fe&&De(new fe)!=$||pe&&"[object WeakMap]"!=De(new pe))&&(De=function(e){var t=we(e),r=t==v?e.constructor:void 0,a=r?We(r):"";if(a)switch(a){case he:return j;case ye:return h;case me:return "[object Promise]";case ve:return $;case be:return "[object WeakMap]"}return t});var Le=Ve(function(){return arguments}())?Ve:function(e){return He(e)&&Q.call(e,"callee")&&!ae.call(e,"callee")},Re=Array.isArray;var qe=se||function(){return !1};function Ce(e){if(!Ge(e))return !1;var t=we(e);return t==p||t==g||t==u||t==b}function Ke(e){return "number"==typeof e&&e>-1&&e%1==0&&e<=o}function Ge(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}function He(e){return null!=e&&"object"==typeof e}var Qe=J?function(e){return function(t){return e(t)}}(J):function(e){return He(e)&&Ke(e.length)&&!!w[we(e)]};function Xe(e){return null!=(t=e)&&Ke(t.length)&&!Ce(t)?Se(e):ze(e);var t;}e.exports=function(e,t){return Me(e,t)};}).call(this,r(23)(e));},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const a=r(18);t.StringPredicate=a.StringPredicate;const n=r(20);t.NumberPredicate=n.NumberPredicate;const i=r(21);t.BooleanPredicate=i.BooleanPredicate;const o=r(0),s=r(22);t.ArrayPredicate=s.ArrayPredicate;const d=r(24);t.ObjectPredicate=d.ObjectPredicate;const u=r(29);t.DatePredicate=u.DatePredicate;const c=r(30);t.ErrorPredicate=c.ErrorPredicate;const l=r(31);t.MapPredicate=l.MapPredicate;const f=r(32);t.WeakMapPredicate=f.WeakMapPredicate;const p=r(33);t.SetPredicate=p.SetPredicate;const g=r(34);t.WeakSetPredicate=g.WeakSetPredicate;const h=r(35);t.AnyPredicate=h.AnyPredicate,t.default=((e,t)=>(Object.defineProperties(e,{string:{get:()=>new a.StringPredicate(t)},number:{get:()=>new n.NumberPredicate(t)},boolean:{get:()=>new i.BooleanPredicate(t)},undefined:{get:()=>new o.Predicate("undefined",t)},null:{get:()=>new o.Predicate("null",t)},nullOrUndefined:{get:()=>new o.Predicate("nullOrUndefined",t)},nan:{get:()=>new o.Predicate("nan",t)},symbol:{get:()=>new o.Predicate("symbol",t)},array:{get:()=>new s.ArrayPredicate(t)},object:{get:()=>new d.ObjectPredicate(t)},date:{get:()=>new u.DatePredicate(t)},error:{get:()=>new c.ErrorPredicate(t)},map:{get:()=>new l.MapPredicate(t)},weakMap:{get:()=>new f.WeakMapPredicate(t)},set:{get:()=>new p.SetPredicate(t)},weakSet:{get:()=>new g.WeakSetPredicate(t)},function:{get:()=>new o.Predicate("Function",t)},buffer:{get:()=>new o.Predicate("Buffer",t)},regExp:{get:()=>new o.Predicate("RegExp",t)},promise:{get:()=>new o.Predicate("Promise",t)},typedArray:{get:()=>new o.Predicate("TypedArray",t)},int8Array:{get:()=>new o.Predicate("Int8Array",t)},uint8Array:{get:()=>new o.Predicate("Uint8Array",t)},uint8ClampedArray:{get:()=>new o.Predicate("Uint8ClampedArray",t)},int16Array:{get:()=>new o.Predicate("Int16Array",t)},uint16Array:{get:()=>new o.Predicate("Uint16Array",t)},int32Array:{get:()=>new o.Predicate("Int32Array",t)},uint32Array:{get:()=>new o.Predicate("Uint32Array",t)},float32Array:{get:()=>new o.Predicate("Float32Array",t)},float64Array:{get:()=>new o.Predicate("Float64Array",t)},arrayBuffer:{get:()=>new o.Predicate("ArrayBuffer",t)},dataView:{get:()=>new o.Predicate("DataView",t)},iterable:{get:()=>new o.Predicate("Iterable",t)},any:{value:(...e)=>new h.AnyPredicate(e,t)}}),e));},function(e,t,r){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(r(4));t.default=((e,t)=>{try{for(const r of e)n.default(r,t);return !0}catch(e){return e.message}});},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});t.ArgumentError=class extends Error{constructor(e,t){super(e),"captureStackTrace"in Error&&Error.captureStackTrace(this,t),this.name="ArgumentError";}};},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const a=r(2);t.default=function e(t,r,n){n[a.testSymbol](t,e,r);};},function(e,t,r){const a=()=>{const e=Error.prepareStackTrace;Error.prepareStackTrace=((e,t)=>t);const t=(new Error).stack.slice(1);return Error.prepareStackTrace=e,t};e.exports=a,e.exports.default=a;},function(e,t,r){var a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=a(r(12)),o=n(r(13)),s=n(r(14)),d=/^.*?\((.*?)[,)]/;t.inferLabel=(e=>{if(!s.default)return;const t=e[1],r=t.getFileName(),a=t.getLineNumber(),n=t.getColumnNumber();if(!r||null===a||null===n)return;let u=[];try{u=i.readFileSync(r,"utf8").split("\n");}catch(e){return}let c=u[a-1];if(!c)return;c=c.slice(n-1);const l=d.exec(c);if(!l||!l[1])return;const f=l[1];return o.default(f)||o.default(f.split(".").pop())?f:void 0});},function(e,t){e.exports=require$$0;},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const a=/^[a-z$_][a-z$_0-9]*$/i,n=new Set(["undefined","null","true","false","super","this","Infinity","NaN"]);t.default=(e=>e&&!n.has(e)&&a.test(e));},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.default=Boolean("undefined"!=typeof process&&process.versions&&process.versions.node);},function(e,t){e.exports=require$$1;},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const a=r(0);t.not=(e=>{const t=e.addValidator;return e.addValidator=(r=>{const n=r.validator,i=r.message;return r.message=((e,t)=>`[NOT] ${i(e,t)}`),r.validator=(e=>!n(e)),e[a.validatorSymbol].push(r),e.addValidator=t,e}),e});},function(e,t,r){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(r(6));t.default=(e=>(Object.defineProperties(e,{optional:{get:()=>n.default({},{optional:!0})}}),e));},function(e,t,r){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(r(1)),i=a(r(19)),o=r(0);t.StringPredicate=class extends o.Predicate{constructor(e){super("string",e);}length(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have length \`${e}\`, got \`${t}\``,validator:t=>t.length===e})}minLength(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have a minimum length of \`${e}\`, got \`${t}\``,validator:t=>t.length>=e})}maxLength(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have a maximum length of \`${e}\`, got \`${t}\``,validator:t=>t.length<=e})}matches(e){return this.addValidator({message:(t,r)=>`Expected ${r} to match \`${e}\`, got \`${t}\``,validator:t=>e.test(t)})}startsWith(e){return this.addValidator({message:(t,r)=>`Expected ${r} to start with \`${e}\`, got \`${t}\``,validator:t=>t.startsWith(e)})}endsWith(e){return this.addValidator({message:(t,r)=>`Expected ${r} to end with \`${e}\`, got \`${t}\``,validator:t=>t.endsWith(e)})}includes(e){return this.addValidator({message:(t,r)=>`Expected ${r} to include \`${e}\`, got \`${t}\``,validator:t=>t.includes(e)})}oneOf(e){return this.addValidator({message:(t,r)=>{let a=JSON.stringify(e);if(e.length>10){const t=e.length-10;a=JSON.stringify(e.slice(0,10)).replace(/]$/,`,…+${t} more]`);}return `Expected ${r} to be one of \`${a}\`, got \`${t}\``},validator:t=>e.includes(t)})}get empty(){return this.addValidator({message:(e,t)=>`Expected ${t} to be empty, got \`${e}\``,validator:e=>""===e})}get nonEmpty(){return this.addValidator({message:(e,t)=>`Expected ${t} to not be empty`,validator:e=>""!==e})}equals(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be equal to \`${e}\`, got \`${t}\``,validator:t=>t===e})}get alphanumeric(){return this.addValidator({message:(e,t)=>`Expected ${t} to be alphanumeric, got \`${e}\``,validator:e=>/^[a-z\d]+$/i.test(e)})}get alphabetical(){return this.addValidator({message:(e,t)=>`Expected ${t} to be alphabetical, got \`${e}\``,validator:e=>/^[a-z]+$/gi.test(e)})}get numeric(){return this.addValidator({message:(e,t)=>`Expected ${t} to be numeric, got \`${e}\``,validator:e=>/^(\+|-)?\d+$/i.test(e)})}get date(){return this.addValidator({message:(e,t)=>`Expected ${t} to be a date, got \`${e}\``,validator:i.default})}get lowercase(){return this.addValidator({message:(e,t)=>`Expected ${t} to be lowercase, got \`${e}\``,validator:e=>""!==e.trim()&&e===e.toLowerCase()})}get uppercase(){return this.addValidator({message:(e,t)=>`Expected ${t} to be uppercase, got \`${e}\``,validator:e=>""!==e.trim()&&e===e.toUpperCase()})}get url(){return this.addValidator({message:(e,t)=>`Expected ${t} to be a URL, got \`${e}\``,validator:n.default.urlString})}};},function(e,t,r){e.exports=function(e){return !isNaN(Date.parse(e))};},function(e,t,r){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(r(1)),i=r(0);t.NumberPredicate=class extends i.Predicate{constructor(e){super("number",e);}inRange(e,t){return this.addValidator({message:(r,a)=>`Expected ${a} to be in range [${e}..${t}], got ${r}`,validator:r=>n.default.inRange(r,[e,t])})}greaterThan(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be greater than ${e}, got ${t}`,validator:t=>t>e})}greaterThanOrEqual(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be greater than or equal to ${e}, got ${t}`,validator:t=>t>=e})}lessThan(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be less than ${e}, got ${t}`,validator:t=>t<e})}lessThanOrEqual(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be less than or equal to ${e}, got ${t}`,validator:t=>t<=e})}equal(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be equal to ${e}, got ${t}`,validator:t=>t===e})}oneOf(e){return this.addValidator({message:(t,r)=>{let a=JSON.stringify(e);if(e.length>10){const t=e.length-10;a=JSON.stringify(e.slice(0,10)).replace(/]$/,`,…+${t} more]`);}return `Expected ${r} to be one of \`${a}\`, got ${t}`},validator:t=>e.includes(t)})}get integer(){return this.addValidator({message:(e,t)=>`Expected ${t} to be an integer, got ${e}`,validator:e=>n.default.integer(e)})}get finite(){return this.addValidator({message:(e,t)=>`Expected ${t} to be finite, got ${e}`,validator:e=>!n.default.infinite(e)})}get infinite(){return this.addValidator({message:(e,t)=>`Expected ${t} to be infinite, got ${e}`,validator:e=>n.default.infinite(e)})}get positive(){return this.addValidator({message:(e,t)=>`Expected ${t} to be positive, got ${e}`,validator:e=>e>0})}get negative(){return this.addValidator({message:(e,t)=>`Expected ${t} to be negative, got ${e}`,validator:e=>e<0})}get integerOrInfinite(){return this.addValidator({message:(e,t)=>`Expected ${t} to be an integer or infinite, got ${e}`,validator:e=>n.default.integer(e)||n.default.infinite(e)})}get uint8(){return this.integer.inRange(0,255)}get uint16(){return this.integer.inRange(0,65535)}get uint32(){return this.integer.inRange(0,4294967295)}get int8(){return this.integer.inRange(-128,127)}get int16(){return this.integer.inRange(-32768,32767)}get int32(){return this.integer.inRange(-2147483648,2147483647)}};},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const a=r(0);t.BooleanPredicate=class extends a.Predicate{constructor(e){super("boolean",e);}get true(){return this.addValidator({message:(e,t)=>`Expected ${t} to be true, got ${e}`,validator:e=>!0===e})}get false(){return this.addValidator({message:(e,t)=>`Expected ${t} to be false, got ${e}`,validator:e=>!1===e})}};},function(e,t,r){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(r(5)),i=a(r(4)),o=r(0);t.ArrayPredicate=class extends o.Predicate{constructor(e){super("array",e);}length(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have length \`${e}\`, got \`${t.length}\``,validator:t=>t.length===e})}minLength(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have a minimum length of \`${e}\`, got \`${t.length}\``,validator:t=>t.length>=e})}maxLength(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have a maximum length of \`${e}\`, got \`${t.length}\``,validator:t=>t.length<=e})}startsWith(e){return this.addValidator({message:(t,r)=>`Expected ${r} to start with \`${e}\`, got \`${t[0]}\``,validator:t=>t[0]===e})}endsWith(e){return this.addValidator({message:(t,r)=>`Expected ${r} to end with \`${e}\`, got \`${t[t.length-1]}\``,validator:t=>t[t.length-1]===e})}includes(...e){return this.addValidator({message:(t,r)=>`Expected ${r} to include all elements of \`${JSON.stringify(e)}\`, got \`${JSON.stringify(t)}\``,validator:t=>e.every(e=>-1!==t.indexOf(e))})}includesAny(...e){return this.addValidator({message:(t,r)=>`Expected ${r} to include any element of \`${JSON.stringify(e)}\`, got \`${JSON.stringify(t)}\``,validator:t=>e.some(e=>-1!==t.indexOf(e))})}get empty(){return this.addValidator({message:(e,t)=>`Expected ${t} to be empty, got \`${JSON.stringify(e)}\``,validator:e=>0===e.length})}get nonEmpty(){return this.addValidator({message:(e,t)=>`Expected ${t} to not be empty`,validator:e=>e.length>0})}deepEqual(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be deeply equal to \`${JSON.stringify(e)}\`, got \`${JSON.stringify(t)}\``,validator:t=>n.default(t,e)})}ofType(e){let t;return this.addValidator({message:(e,r)=>`(${r}) ${t}`,validator:r=>{try{for(const t of r)i.default(t,e);return !0}catch(e){return t=e.message,!1}}})}};},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e};},function(e,t,r){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(r(1)),i=a(r(25)),o=a(r(5)),s=r(0),d=a(r(3)),u=a(r(7)),c=a(r(27)),l=r(28);t.ObjectPredicate=class extends s.Predicate{constructor(e){super("object",e);}get plain(){return this.addValidator({message:(e,t)=>`Expected ${t} to be a plain object`,validator:e=>n.default.plainObject(e)})}get empty(){return this.addValidator({message:(e,t)=>`Expected ${t} to be empty, got \`${JSON.stringify(e)}\``,validator:e=>0===Object.keys(e).length})}get nonEmpty(){return this.addValidator({message:(e,t)=>`Expected ${t} to not be empty`,validator:e=>Object.keys(e).length>0})}valuesOfType(e){return this.addValidator({message:(e,t,r)=>`(${t}) ${r}`,validator:t=>{const r=Object.keys(t).map(e=>t[e]);return u.default(r,e)}})}deepValuesOfType(e){return this.addValidator({message:(e,t,r)=>`(${t}) ${r}`,validator:t=>c.default(t,e)})}deepEqual(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be deeply equal to \`${JSON.stringify(e)}\`, got \`${JSON.stringify(t)}\``,validator:t=>o.default(t,e)})}instanceOf(e){return this.addValidator({message:(t,r)=>{let a=t.constructor.name;return a&&"Object"!==a||(a=JSON.stringify(t)),`Expected ${r} \`${a}\` to be of type \`${e.name}\``},validator:t=>t instanceof e})}hasKeys(...e){return this.addValidator({message:(e,t,r)=>`Expected ${t} to have keys \`${JSON.stringify(r)}\``,validator:t=>d.default({has:e=>i.default.has(t,e)},e)})}hasAnyKeys(...e){return this.addValidator({message:(t,r)=>`Expected ${r} to have any key of \`${JSON.stringify(e)}\``,validator:t=>e.some(e=>i.default.has(t,e))})}partialShape(e){return this.addValidator({message:(e,t,r)=>`${r.replace("Expected","Expected property")} in ${t}`,validator:t=>l.partial(t,e)})}exactShape(e){return this.addValidator({message:(e,t,r)=>`${r.replace("Expected","Expected property")} in ${t}`,validator:t=>l.exact(t,e)})}};},function(e,t,r){const a=r(26);function n(e){const t=e.split("."),r=[];for(let e=0;e<t.length;e++){let a=t[e];for(;"\\"===a[a.length-1]&&void 0!==t[e+1];)a=a.slice(0,-1)+".",a+=t[++e];r.push(a);}return r}e.exports={get(e,t,r){if(!a(e)||"string"!=typeof t)return void 0===r?e:r;const i=n(t);for(let t=0;t<i.length;t++){if(!Object.prototype.propertyIsEnumerable.call(e,i[t]))return r;if(null==(e=e[i[t]])){if(t!==i.length-1)return r;break}}return e},set(e,t,r){if(!a(e)||"string"!=typeof t)return e;const i=e,o=n(t);for(let t=0;t<o.length;t++){const n=o[t];a(e[n])||(e[n]={}),t===o.length-1&&(e[n]=r),e=e[n];}return i},delete(e,t){if(!a(e)||"string"!=typeof t)return;const r=n(t);for(let t=0;t<r.length;t++){const n=r[t];if(t===r.length-1)return void delete e[n];if(e=e[n],!a(e))return}},has(e,t){if(!a(e)||"string"!=typeof t)return !1;const r=n(t);for(let t=0;t<r.length;t++){if(!a(e))return !1;if(!(r[t]in e))return !1;e=e[r[t]];}return !0}};},function(e,t,r){e.exports=function(e){var t=typeof e;return null!==e&&("object"===t||"function"===t)};},function(e,t,r){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(r(1)),i=a(r(4)),o=(e,t)=>n.default.plainObject(e)?Object.keys(e).every(r=>o(e[r],t)):(i.default(e,t),!0);t.default=((e,t)=>{try{return o(e,t)}catch(e){return e.message}});},function(e,t,r){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(r(1)),i=a(r(9)),o=r(2);t.partial=function e(t,r,a){try{for(const s of Object.keys(r)){const d=a?`${a}.${s}`:s;if(o.isPredicate(r[s]))i.default(t[s],d,r[s]);else if(n.default.plainObject(r[s])){const a=e(t[s],r[s],d);if(!0!==a)return a}}return !0}catch(e){return e.message}},t.exact=function e(t,r,a){try{const s=new Set(Object.keys(t));for(const d of Object.keys(r)){s.delete(d);const u=a?`${a}.${d}`:d;if(o.isPredicate(r[d]))i.default(t[d],u,r[d]);else if(n.default.plainObject(r[d])){if(!Object.prototype.hasOwnProperty.call(t,d))return `Expected \`${u}\` to exist`;const a=e(t[d],r[d],u);if(!0!==a)return a}}if(s.size>0){const e=Array.from(s.keys())[0];return `Did not expect property \`${a?`${a}.${e}`:e}\` to exist, got \`${t[e]}\``}return !0}catch(e){return e.message}};},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const a=r(0);t.DatePredicate=class extends a.Predicate{constructor(e){super("date",e);}before(e){return this.addValidator({message:(t,r)=>`Expected ${r} ${t.toISOString()} to be before ${e.toISOString()}`,validator:t=>t.getTime()<e.getTime()})}after(e){return this.addValidator({message:(t,r)=>`Expected ${r} ${t.toISOString()} to be after ${e.toISOString()}`,validator:t=>t.getTime()>e.getTime()})}};},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const a=r(0);t.ErrorPredicate=class extends a.Predicate{constructor(e){super("error",e);}name(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have name \`${e}\`, got \`${t.name}\``,validator:t=>t.name===e})}message(e){return this.addValidator({message:(t,r)=>`Expected ${r} message to be \`${e}\`, got \`${t.message}\``,validator:t=>t.message===e})}messageIncludes(e){return this.addValidator({message:(t,r)=>`Expected ${r} message to include \`${e}\`, got \`${t.message}\``,validator:t=>t.message.includes(e)})}hasKeys(...e){return this.addValidator({message:(t,r)=>`Expected ${r} message to have keys \`${e.join("`, `")}\``,validator:t=>e.every(e=>t.hasOwnProperty(e))})}instanceOf(e){return this.addValidator({message:(t,r)=>`Expected ${r} \`${t.name}\` to be of type \`${e.name}\``,validator:t=>t instanceof e})}get typeError(){return this.instanceOf(TypeError)}get evalError(){return this.instanceOf(EvalError)}get rangeError(){return this.instanceOf(RangeError)}get referenceError(){return this.instanceOf(ReferenceError)}get syntaxError(){return this.instanceOf(SyntaxError)}get uriError(){return this.instanceOf(URIError)}};},function(e,t,r){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(r(5)),i=r(0),o=a(r(3)),s=a(r(7));t.MapPredicate=class extends i.Predicate{constructor(e){super("Map",e);}size(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have size \`${e}\`, got \`${t.size}\``,validator:t=>t.size===e})}minSize(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have a minimum size of \`${e}\`, got \`${t.size}\``,validator:t=>t.size>=e})}maxSize(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have a maximum size of \`${e}\`, got \`${t.size}\``,validator:t=>t.size<=e})}hasKeys(...e){return this.addValidator({message:(e,t,r)=>`Expected ${t} to have keys \`${JSON.stringify(r)}\``,validator:t=>o.default(t,e)})}hasAnyKeys(...e){return this.addValidator({message:(t,r)=>`Expected ${r} to have any key of \`${JSON.stringify(e)}\``,validator:t=>e.some(e=>t.has(e))})}hasValues(...e){return this.addValidator({message:(e,t,r)=>`Expected ${t} to have values \`${JSON.stringify(r)}\``,validator:t=>o.default(new Set(t.values()),e)})}hasAnyValues(...e){return this.addValidator({message:(t,r)=>`Expected ${r} to have any value of \`${JSON.stringify(e)}\``,validator:t=>{const r=new Set(t.values());return e.some(e=>r.has(e))}})}keysOfType(e){return this.addValidator({message:(e,t,r)=>`(${t}) ${r}`,validator:t=>s.default(t.keys(),e)})}valuesOfType(e){return this.addValidator({message:(e,t,r)=>`(${t}) ${r}`,validator:t=>s.default(t.values(),e)})}get empty(){return this.addValidator({message:(e,t)=>`Expected ${t} to be empty, got \`${JSON.stringify(Array.from(e))}\``,validator:e=>0===e.size})}get nonEmpty(){return this.addValidator({message:(e,t)=>`Expected ${t} to not be empty`,validator:e=>e.size>0})}deepEqual(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be deeply equal to \`${JSON.stringify(Array.from(e))}\`, got \`${JSON.stringify(Array.from(t))}\``,validator:t=>n.default(t,e)})}};},function(e,t,r){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=r(0),i=a(r(3));t.WeakMapPredicate=class extends n.Predicate{constructor(e){super("WeakMap",e);}hasKeys(...e){return this.addValidator({message:(e,t,r)=>`Expected ${t} to have keys \`${JSON.stringify(r)}\``,validator:t=>i.default(t,e)})}hasAnyKeys(...e){return this.addValidator({message:(t,r)=>`Expected ${r} to have any key of \`${JSON.stringify(e)}\``,validator:t=>e.some(e=>t.has(e))})}};},function(e,t,r){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(r(5)),i=r(0),o=a(r(3)),s=a(r(7));t.SetPredicate=class extends i.Predicate{constructor(e){super("Set",e);}size(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have size \`${e}\`, got \`${t.size}\``,validator:t=>t.size===e})}minSize(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have a minimum size of \`${e}\`, got \`${t.size}\``,validator:t=>t.size>=e})}maxSize(e){return this.addValidator({message:(t,r)=>`Expected ${r} to have a maximum size of \`${e}\`, got \`${t.size}\``,validator:t=>t.size<=e})}has(...e){return this.addValidator({message:(e,t,r)=>`Expected ${t} to have items \`${JSON.stringify(r)}\``,validator:t=>o.default(t,e)})}hasAny(...e){return this.addValidator({message:(t,r)=>`Expected ${r} to have any item of \`${JSON.stringify(e)}\``,validator:t=>e.some(e=>t.has(e))})}ofType(e){return this.addValidator({message:(e,t,r)=>`(${t}) ${r}`,validator:t=>s.default(t,e)})}get empty(){return this.addValidator({message:(e,t)=>`Expected ${t} to be empty, got \`${JSON.stringify(Array.from(e))}\``,validator:e=>0===e.size})}get nonEmpty(){return this.addValidator({message:(e,t)=>`Expected ${t} to not be empty`,validator:e=>e.size>0})}deepEqual(e){return this.addValidator({message:(t,r)=>`Expected ${r} to be deeply equal to \`${JSON.stringify(Array.from(e))}\`, got \`${JSON.stringify(Array.from(t))}\``,validator:t=>n.default(t,e)})}};},function(e,t,r){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=r(0),i=a(r(3));t.WeakSetPredicate=class extends n.Predicate{constructor(e){super("WeakSet",e);}has(...e){return this.addValidator({message:(e,t,r)=>`Expected ${t} to have items \`${JSON.stringify(r)}\``,validator:t=>i.default(t,e)})}hasAny(...e){return this.addValidator({message:(t,r)=>`Expected ${r} to have any item of \`${JSON.stringify(e)}\``,validator:t=>e.some(e=>t.has(e))})}};},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});const a=r(8),n=r(2);t.AnyPredicate=class{constructor(e,t={}){this.predicates=e,this.options=t;}[n.testSymbol](e,t,r){const n=["Any predicate failed with the following errors:"];for(const a of this.predicates)try{return void t(e,r,a)}catch(t){if(void 0===e&&!0===this.options.optional)return;n.push(`- ${t.message}`);}throw new a.ArgumentError(n.join("\n"),t)}};}]);const __export__=module.exports;module.exports=__export__.default,Object.assign(module.exports,__export__);
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
    !function(e,t){module.exports=t();}(commonjsGlobal,function(){return function(e){var t={};function r(i){if(t[i])return t[i].exports;var n=t[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,i){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i});},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0});},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(i,n,function(t){return e[t]}.bind(null,n));return i},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=90)}({17:function(e,t,r){t.__esModule=!0,t.default=void 0;var i=r(18),n=function(){function e(){}return e.getFirstMatch=function(e,t){var r=t.match(e);return r&&r.length>0&&r[1]||""},e.getSecondMatch=function(e,t){var r=t.match(e);return r&&r.length>1&&r[2]||""},e.matchAndReturnConst=function(e,t,r){if(e.test(t))return r},e.getWindowsVersionName=function(e){switch(e){case"NT":return "NT";case"XP":return "XP";case"NT 5.0":return "2000";case"NT 5.1":return "XP";case"NT 5.2":return "2003";case"NT 6.0":return "Vista";case"NT 6.1":return "7";case"NT 6.2":return "8";case"NT 6.3":return "8.1";case"NT 10.0":return "10";default:return}},e.getAndroidVersionName=function(e){var t=e.split(".").splice(0,2).map(function(e){return parseInt(e,10)||0});if(t.push(0),!(1===t[0]&&t[1]<5))return 1===t[0]&&t[1]<6?"Cupcake":1===t[0]&&t[1]>=6?"Donut":2===t[0]&&t[1]<2?"Eclair":2===t[0]&&2===t[1]?"Froyo":2===t[0]&&t[1]>2?"Gingerbread":3===t[0]?"Honeycomb":4===t[0]&&t[1]<1?"Ice Cream Sandwich":4===t[0]&&t[1]<4?"Jelly Bean":4===t[0]&&t[1]>=4?"KitKat":5===t[0]?"Lollipop":6===t[0]?"Marshmallow":7===t[0]?"Nougat":8===t[0]?"Oreo":void 0},e.getVersionPrecision=function(e){return e.split(".").length},e.compareVersions=function(t,r,i){void 0===i&&(i=!1);var n=e.getVersionPrecision(t),s=e.getVersionPrecision(r),o=Math.max(n,s),a=0,u=e.map([t,r],function(t){var r=o-e.getVersionPrecision(t),i=t+new Array(r+1).join(".0");return e.map(i.split("."),function(e){return new Array(20-e.length).join("0")+e}).reverse()});for(i&&(a=o-Math.min(n,s)),o-=1;o>=a;){if(u[0][o]>u[1][o])return 1;if(u[0][o]===u[1][o]){if(o===a)return 0;o-=1;}else if(u[0][o]<u[1][o])return -1}},e.map=function(e,t){var r,i=[];if(Array.prototype.map)return Array.prototype.map.call(e,t);for(r=0;r<e.length;r+=1)i.push(t(e[r]));return i},e.getBrowserAlias=function(e){return i.BROWSER_ALIASES_MAP[e]},e.getBrowserTypeByAlias=function(e){return i.BROWSER_MAP[e]||""},e}();t.default=n,e.exports=t.default;},18:function(e,t,r){t.__esModule=!0,t.ENGINE_MAP=t.OS_MAP=t.PLATFORMS_MAP=t.BROWSER_MAP=t.BROWSER_ALIASES_MAP=void 0;t.BROWSER_ALIASES_MAP={"Amazon Silk":"amazon_silk","Android Browser":"android",Bada:"bada",BlackBerry:"blackberry",Chrome:"chrome",Chromium:"chromium",Epiphany:"epiphany",Firefox:"firefox",Focus:"focus",Generic:"generic",Googlebot:"googlebot","Internet Explorer":"ie","K-Meleon":"k_meleon",Maxthon:"maxthon","Microsoft Edge":"edge","MZ Browser":"mz","NAVER Whale Browser":"naver",Opera:"opera","Opera Coast":"opera_coast",PhantomJS:"phantomjs",Puffin:"puffin",QupZilla:"qupzilla",Safari:"safari",Sailfish:"sailfish","Samsung Internet for Android":"samsung_internet",SeaMonkey:"seamonkey",Sleipnir:"sleipnir",Swing:"swing",Tizen:"tizen","UC Browser":"uc",Vivaldi:"vivaldi","WebOS Browser":"webos",WeChat:"wechat","Yandex Browser":"yandex",Roku:"roku"};t.BROWSER_MAP={amazon_silk:"Amazon Silk",android:"Android Browser",bada:"Bada",blackberry:"BlackBerry",chrome:"Chrome",chromium:"Chromium",epiphany:"Epiphany",firefox:"Firefox",focus:"Focus",generic:"Generic",googlebot:"Googlebot",ie:"Internet Explorer",k_meleon:"K-Meleon",maxthon:"Maxthon",edge:"Microsoft Edge",mz:"MZ Browser",naver:"NAVER Whale Browser",opera:"Opera",opera_coast:"Opera Coast",phantomjs:"PhantomJS",puffin:"Puffin",qupzilla:"QupZilla",safari:"Safari",sailfish:"Sailfish",samsung_internet:"Samsung Internet for Android",seamonkey:"SeaMonkey",sleipnir:"Sleipnir",swing:"Swing",tizen:"Tizen",uc:"UC Browser",vivaldi:"Vivaldi",webos:"WebOS Browser",wechat:"WeChat",yandex:"Yandex Browser"};t.PLATFORMS_MAP={tablet:"tablet",mobile:"mobile",desktop:"desktop",tv:"tv"};t.OS_MAP={WindowsPhone:"Windows Phone",Windows:"Windows",MacOS:"macOS",iOS:"iOS",Android:"Android",WebOS:"WebOS",BlackBerry:"BlackBerry",Bada:"Bada",Tizen:"Tizen",Linux:"Linux",ChromeOS:"Chrome OS",PlayStation4:"PlayStation 4",Roku:"Roku"};t.ENGINE_MAP={EdgeHTML:"EdgeHTML",Blink:"Blink",Trident:"Trident",Presto:"Presto",Gecko:"Gecko",WebKit:"WebKit"};},90:function(e,t,r){t.__esModule=!0,t.default=void 0;var i,n=(i=r(91))&&i.__esModule?i:{default:i},s=r(18);function o(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i);}}var a=function(){function e(){}var t,r,i;return e.getParser=function(e,t){if(void 0===t&&(t=!1),"string"!=typeof e)throw new Error("UserAgent should be a string");return new n.default(e,t)},e.parse=function(e){return new n.default(e).getResult()},t=e,i=[{key:"BROWSER_MAP",get:function(){return s.BROWSER_MAP}},{key:"ENGINE_MAP",get:function(){return s.ENGINE_MAP}},{key:"OS_MAP",get:function(){return s.OS_MAP}},{key:"PLATFORMS_MAP",get:function(){return s.PLATFORMS_MAP}}],(r=null)&&o(t.prototype,r),i&&o(t,i),e}();t.default=a,e.exports=t.default;},91:function(e,t,r){t.__esModule=!0,t.default=void 0;var i=u(r(92)),n=u(r(93)),s=u(r(94)),o=u(r(95)),a=u(r(17));function u(e){return e&&e.__esModule?e:{default:e}}var d=function(){function e(e,t){if(void 0===t&&(t=!1),null==e||""===e)throw new Error("UserAgent parameter can't be empty");this._ua=e,this.parsedResult={},!0!==t&&this.parse();}var t=e.prototype;return t.getUA=function(){return this._ua},t.test=function(e){return e.test(this._ua)},t.parseBrowser=function(){var e=this;this.parsedResult.browser={};var t=i.default.find(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some(function(t){return e.test(t)});throw new Error("Browser's test function is not valid")});return t&&(this.parsedResult.browser=t.describe(this.getUA())),this.parsedResult.browser},t.getBrowser=function(){return this.parsedResult.browser?this.parsedResult.browser:this.parseBrowser()},t.getBrowserName=function(e){return e?String(this.getBrowser().name).toLowerCase()||"":this.getBrowser().name||""},t.getBrowserVersion=function(){return this.getBrowser().version},t.getOS=function(){return this.parsedResult.os?this.parsedResult.os:this.parseOS()},t.parseOS=function(){var e=this;this.parsedResult.os={};var t=n.default.find(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some(function(t){return e.test(t)});throw new Error("Browser's test function is not valid")});return t&&(this.parsedResult.os=t.describe(this.getUA())),this.parsedResult.os},t.getOSName=function(e){var t=this.getOS().name;return e?String(t).toLowerCase()||"":t||""},t.getOSVersion=function(){return this.getOS().version},t.getPlatform=function(){return this.parsedResult.platform?this.parsedResult.platform:this.parsePlatform()},t.getPlatformType=function(e){void 0===e&&(e=!1);var t=this.getPlatform().type;return e?String(t).toLowerCase()||"":t||""},t.parsePlatform=function(){var e=this;this.parsedResult.platform={};var t=s.default.find(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some(function(t){return e.test(t)});throw new Error("Browser's test function is not valid")});return t&&(this.parsedResult.platform=t.describe(this.getUA())),this.parsedResult.platform},t.getEngine=function(){return this.parsedResult.engine?this.parsedResult.engine:this.parseEngine()},t.getEngineName=function(e){return e?String(this.getEngine().name).toLowerCase()||"":this.getEngine().name||""},t.parseEngine=function(){var e=this;this.parsedResult.engine={};var t=o.default.find(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some(function(t){return e.test(t)});throw new Error("Browser's test function is not valid")});return t&&(this.parsedResult.engine=t.describe(this.getUA())),this.parsedResult.engine},t.parse=function(){return this.parseBrowser(),this.parseOS(),this.parsePlatform(),this.parseEngine(),this},t.getResult=function(){return Object.assign({},this.parsedResult)},t.satisfies=function(e){var t=this,r={},i=0,n={},s=0;if(Object.keys(e).forEach(function(t){var o=e[t];"string"==typeof o?(n[t]=o,s+=1):"object"==typeof o&&(r[t]=o,i+=1);}),i>0){var o=Object.keys(r),a=o.find(function(e){return t.isOS(e)});if(a){var u=this.satisfies(r[a]);if(void 0!==u)return u}var d=o.find(function(e){return t.isPlatform(e)});if(d){var c=this.satisfies(r[d]);if(void 0!==c)return c}}if(s>0){var f=Object.keys(n).find(function(e){return t.isBrowser(e,!0)});if(void 0!==f)return this.compareVersion(n[f])}},t.isBrowser=function(e,t){void 0===t&&(t=!1);var r=this.getBrowserName().toLowerCase(),i=e.toLowerCase(),n=a.default.getBrowserTypeByAlias(i);return t&&n&&(i=n.toLowerCase()),i===r},t.compareVersion=function(e){var t=[0],r=e,i=!1,n=this.getBrowserVersion();if("string"==typeof n)return ">"===e[0]||"<"===e[0]?(r=e.substr(1),"="===e[1]?(i=!0,r=e.substr(2)):t=[],">"===e[0]?t.push(1):t.push(-1)):"="===e[0]?r=e.substr(1):"~"===e[0]&&(i=!0,r=e.substr(1)),t.indexOf(a.default.compareVersions(n,r,i))>-1},t.isOS=function(e){return this.getOSName(!0)===String(e).toLowerCase()},t.isPlatform=function(e){return this.getPlatformType(!0)===String(e).toLowerCase()},t.isEngine=function(e){return this.getEngineName(!0)===String(e).toLowerCase()},t.is=function(e){return this.isBrowser(e)||this.isOS(e)||this.isPlatform(e)},t.some=function(e){var t=this;return void 0===e&&(e=[]),e.some(function(e){return t.is(e)})},e}();t.default=d,e.exports=t.default;},92:function(e,t,r){t.__esModule=!0,t.default=void 0;var i,n=(i=r(17))&&i.__esModule?i:{default:i};var s=/version\/(\d+(\.?_?\d+)+)/i,o=[{test:[/googlebot/i],describe:function(e){var t={name:"Googlebot"},r=n.default.getFirstMatch(/googlebot\/(\d+(\.\d+))/i,e)||n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/opera/i],describe:function(e){var t={name:"Opera"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/(?:opera)[\s\/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/opr\/|opios/i],describe:function(e){var t={name:"Opera"},r=n.default.getFirstMatch(/(?:opr|opios)[\s\/](\S+)/i,e)||n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/SamsungBrowser/i],describe:function(e){var t={name:"Samsung Internet for Android"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/Whale/i],describe:function(e){var t={name:"NAVER Whale Browser"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/(?:whale)[\s\/](\d+(?:\.\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/MZBrowser/i],describe:function(e){var t={name:"MZ Browser"},r=n.default.getFirstMatch(/(?:MZBrowser)[\s\/](\d+(?:\.\d+)+)/i,e)||n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/focus/i],describe:function(e){var t={name:"Focus"},r=n.default.getFirstMatch(/(?:focus)[\s\/](\d+(?:\.\d+)+)/i,e)||n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/swing/i],describe:function(e){var t={name:"Swing"},r=n.default.getFirstMatch(/(?:swing)[\s\/](\d+(?:\.\d+)+)/i,e)||n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/coast/i],describe:function(e){var t={name:"Opera Coast"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/(?:coast)[\s\/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/yabrowser/i],describe:function(e){var t={name:"Yandex Browser"},r=n.default.getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.?_?\d+)+)/i,e)||n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/ucbrowser/i],describe:function(e){var t={name:"UC Browser"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/(?:ucbrowser)[\s\/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/Maxthon|mxios/i],describe:function(e){var t={name:"Maxthon"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/(?:Maxthon|mxios)[\s\/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/epiphany/i],describe:function(e){var t={name:"Epiphany"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/(?:epiphany)[\s\/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/puffin/i],describe:function(e){var t={name:"Puffin"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/(?:puffin)[\s\/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/sleipnir/i],describe:function(e){var t={name:"Sleipnir"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/(?:sleipnir)[\s\/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/k-meleon/i],describe:function(e){var t={name:"K-Meleon"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/(?:k-meleon)[\s\/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/micromessenger/i],describe:function(e){var t={name:"WeChat"},r=n.default.getFirstMatch(/(?:micromessenger)[\s\/](\d+(\.?_?\d+)+)/i,e)||n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/msie|trident/i],describe:function(e){var t={name:"Internet Explorer"},r=n.default.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/\sedg\//i],describe:function(e){var t={name:"Microsoft Edge"},r=n.default.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/edg([ea]|ios)/i],describe:function(e){var t={name:"Microsoft Edge"},r=n.default.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/vivaldi/i],describe:function(e){var t={name:"Vivaldi"},r=n.default.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/seamonkey/i],describe:function(e){var t={name:"SeaMonkey"},r=n.default.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/sailfish/i],describe:function(e){var t={name:"Sailfish"},r=n.default.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i,e);return r&&(t.version=r),t}},{test:[/silk/i],describe:function(e){var t={name:"Amazon Silk"},r=n.default.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/phantom/i],describe:function(e){var t={name:"PhantomJS"},r=n.default.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/slimerjs/i],describe:function(e){var t={name:"SlimerJS"},r=n.default.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/blackberry|\bbb\d+/i,/rim\stablet/i],describe:function(e){var t={name:"BlackBerry"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/(web|hpw)[o0]s/i],describe:function(e){var t={name:"WebOS Browser"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/bada/i],describe:function(e){var t={name:"Bada"},r=n.default.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/tizen/i],describe:function(e){var t={name:"Tizen"},r=n.default.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i,e)||n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/qupzilla/i],describe:function(e){var t={name:"QupZilla"},r=n.default.getFirstMatch(/(?:qupzilla)[\s\/](\d+(\.?_?\d+)+)/i,e)||n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/firefox|iceweasel|fxios/i],describe:function(e){var t={name:"Firefox"},r=n.default.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s\/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/chromium/i],describe:function(e){var t={name:"Chromium"},r=n.default.getFirstMatch(/(?:chromium)[\s\/](\d+(\.?_?\d+)+)/i,e)||n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/chrome|crios|crmo/i],describe:function(e){var t={name:"Chrome"},r=n.default.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:function(e){var t=!e.test(/like android/i),r=e.test(/android/i);return t&&r},describe:function(e){var t={name:"Android Browser"},r=n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/playstation 4/i],describe:function(e){var t={name:"PlayStation 4"},r=n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/safari|applewebkit/i],describe:function(e){var t={name:"Safari"},r=n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/.*/i],describe:function(e){var t=-1!==e.search("\\(")?/^(.*)\/(.*)[ \t]\((.*)/:/^(.*)\/(.*) /;return {name:n.default.getFirstMatch(t,e),version:n.default.getSecondMatch(t,e)}}}];t.default=o,e.exports=t.default;},93:function(e,t,r){t.__esModule=!0,t.default=void 0;var i,n=(i=r(17))&&i.__esModule?i:{default:i},s=r(18);var o=[{test:[/Roku\/DVP/],describe:function(e){var t=n.default.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i,e);return {name:s.OS_MAP.Roku,version:t}}},{test:[/windows phone/i],describe:function(e){var t=n.default.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i,e);return {name:s.OS_MAP.WindowsPhone,version:t}}},{test:[/windows/i],describe:function(e){var t=n.default.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i,e),r=n.default.getWindowsVersionName(t);return {name:s.OS_MAP.Windows,version:t,versionName:r}}},{test:[/macintosh/i],describe:function(e){var t=n.default.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i,e).replace(/[_\s]/g,".");return {name:s.OS_MAP.MacOS,version:t}}},{test:[/(ipod|iphone|ipad)/i],describe:function(e){var t=n.default.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i,e).replace(/[_\s]/g,".");return {name:s.OS_MAP.iOS,version:t}}},{test:function(e){var t=!e.test(/like android/i),r=e.test(/android/i);return t&&r},describe:function(e){var t=n.default.getFirstMatch(/android[\s\/-](\d+(\.\d+)*)/i,e),r=n.default.getAndroidVersionName(t),i={name:s.OS_MAP.Android,version:t};return r&&(i.versionName=r),i}},{test:[/(web|hpw)[o0]s/i],describe:function(e){var t=n.default.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i,e),r={name:s.OS_MAP.WebOS};return t&&t.length&&(r.version=t),r}},{test:[/blackberry|\bbb\d+/i,/rim\stablet/i],describe:function(e){var t=n.default.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i,e)||n.default.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i,e)||n.default.getFirstMatch(/\bbb(\d+)/i,e);return {name:s.OS_MAP.BlackBerry,version:t}}},{test:[/bada/i],describe:function(e){var t=n.default.getFirstMatch(/bada\/(\d+(\.\d+)*)/i,e);return {name:s.OS_MAP.Bada,version:t}}},{test:[/tizen/i],describe:function(e){var t=n.default.getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i,e);return {name:s.OS_MAP.Tizen,version:t}}},{test:[/linux/i],describe:function(){return {name:s.OS_MAP.Linux}}},{test:[/CrOS/],describe:function(){return {name:s.OS_MAP.ChromeOS}}},{test:[/PlayStation 4/],describe:function(e){var t=n.default.getFirstMatch(/PlayStation 4[\/\s](\d+(\.\d+)*)/i,e);return {name:s.OS_MAP.PlayStation4,version:t}}}];t.default=o,e.exports=t.default;},94:function(e,t,r){t.__esModule=!0,t.default=void 0;var i,n=(i=r(17))&&i.__esModule?i:{default:i},s=r(18);var o=[{test:[/googlebot/i],describe:function(){return {type:"bot",vendor:"Google"}}},{test:[/huawei/i],describe:function(e){var t=n.default.getFirstMatch(/(can-l01)/i,e)&&"Nova",r={type:s.PLATFORMS_MAP.mobile,vendor:"Huawei"};return t&&(r.model=t),r}},{test:[/nexus\s*(?:7|8|9|10).*/i],describe:function(){return {type:s.PLATFORMS_MAP.tablet,vendor:"Nexus"}}},{test:[/ipad/i],describe:function(){return {type:s.PLATFORMS_MAP.tablet,vendor:"Apple",model:"iPad"}}},{test:[/kftt build/i],describe:function(){return {type:s.PLATFORMS_MAP.tablet,vendor:"Amazon",model:"Kindle Fire HD 7"}}},{test:[/silk/i],describe:function(){return {type:s.PLATFORMS_MAP.tablet,vendor:"Amazon"}}},{test:[/tablet/i],describe:function(){return {type:s.PLATFORMS_MAP.tablet}}},{test:function(e){var t=e.test(/ipod|iphone/i),r=e.test(/like (ipod|iphone)/i);return t&&!r},describe:function(e){var t=n.default.getFirstMatch(/(ipod|iphone)/i,e);return {type:s.PLATFORMS_MAP.mobile,vendor:"Apple",model:t}}},{test:[/nexus\s*[0-6].*/i,/galaxy nexus/i],describe:function(){return {type:s.PLATFORMS_MAP.mobile,vendor:"Nexus"}}},{test:[/[^-]mobi/i],describe:function(){return {type:s.PLATFORMS_MAP.mobile}}},{test:function(e){return "blackberry"===e.getBrowserName(!0)},describe:function(){return {type:s.PLATFORMS_MAP.mobile,vendor:"BlackBerry"}}},{test:function(e){return "bada"===e.getBrowserName(!0)},describe:function(){return {type:s.PLATFORMS_MAP.mobile}}},{test:function(e){return "windows phone"===e.getBrowserName()},describe:function(){return {type:s.PLATFORMS_MAP.mobile,vendor:"Microsoft"}}},{test:function(e){var t=Number(String(e.getOSVersion()).split(".")[0]);return "android"===e.getOSName(!0)&&t>=3},describe:function(){return {type:s.PLATFORMS_MAP.tablet}}},{test:function(e){return "android"===e.getOSName(!0)},describe:function(){return {type:s.PLATFORMS_MAP.mobile}}},{test:function(e){return "macos"===e.getOSName(!0)},describe:function(){return {type:s.PLATFORMS_MAP.desktop,vendor:"Apple"}}},{test:function(e){return "windows"===e.getOSName(!0)},describe:function(){return {type:s.PLATFORMS_MAP.desktop}}},{test:function(e){return "linux"===e.getOSName(!0)},describe:function(){return {type:s.PLATFORMS_MAP.desktop}}},{test:function(e){return "playstation 4"===e.getOSName(!0)},describe:function(){return {type:s.PLATFORMS_MAP.tv}}},{test:function(e){return "roku"===e.getOSName(!0)},describe:function(){return {type:s.PLATFORMS_MAP.tv}}}];t.default=o,e.exports=t.default;},95:function(e,t,r){t.__esModule=!0,t.default=void 0;var i,n=(i=r(17))&&i.__esModule?i:{default:i},s=r(18);var o=[{test:function(e){return "microsoft edge"===e.getBrowserName(!0)},describe:function(e){if(/\sedg\//i.test(e))return {name:s.ENGINE_MAP.Blink};var t=n.default.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i,e);return {name:s.ENGINE_MAP.EdgeHTML,version:t}}},{test:[/trident/i],describe:function(e){var t={name:s.ENGINE_MAP.Trident},r=n.default.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:function(e){return e.test(/presto/i)},describe:function(e){var t={name:s.ENGINE_MAP.Presto},r=n.default.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:function(e){var t=e.test(/gecko/i),r=e.test(/like gecko/i);return t&&!r},describe:function(e){var t={name:s.ENGINE_MAP.Gecko},r=n.default.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/(apple)?webkit\/537\.36/i],describe:function(){return {name:s.ENGINE_MAP.Blink}}},{test:[/(apple)?webkit/i],describe:function(e){var t={name:s.ENGINE_MAP.WebKit},r=n.default.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}}];t.default=o,e.exports=t.default;}})});
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
