'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var blocknativeApi = _interopDefault(require('bn-sdk'));
var internal = require('svelte/internal');
var store = require('svelte/store');
var ow = _interopDefault(require('ow'));
var transition = require('svelte/transition');
var bowser = _interopDefault(require('bowser'));

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function validateInit(init) {
  ow(init, "Initialization Options", ow.object.exactShape({
    networkId: ow.number,
    dappId: ow.string,
    subscriptions: ow.optional.object.exactShape({
      address: ow.optional["function"],
      network: ow.optional["function"],
      balance: ow.optional["function"],
      provider: ow.optional["function"]
    }),
    modules: ow.object.exactShape({
      selectWallet: ow.object.exactShape({
        heading: ow.string,
        description: ow.string,
        wallets: ow.object.exactShape({
          mobile: ow.optional.array.nonEmpty.ofType(ow.object.exactShape({
            name: ow.string,
            iconSrc: ow.optional.string,
            iconSrcSet: ow.optional.string,
            svg: ow.optional.string,
            wallet: ow["function"],
            link: ow.optional.string,
            installMessage: ow.optional["function"]
          })),
          desktop: ow.optional.array.nonEmpty.ofType(ow.object.exactShape({
            name: ow.string,
            iconSrc: ow.optional.string,
            iconSrcSet: ow.optional.string,
            svg: ow.optional.string,
            wallet: ow["function"],
            link: ow.optional.string,
            installMessage: ow.optional["function"]
          }))
        })
      }),
      prepareWallet: ow.array.nonEmpty.ofType(ow["function"])
    })
  }));
}
function validateConfig(configuration) {
  ow(configuration, "config", ow.object.exactShape({
    darkMode: ow["boolean"]
  }));
}
function validateModal(modal) {
  var _ow$object$exactShape;

  ow(modal, "modal", ow.object.exactShape((_ow$object$exactShape = {
    img: ow.optional.string,
    heading: ow.string,
    description: ow.string,
    button: ow.optional.string,
    invalidMsg: ow.optional.string,
    eventCode: ow.string,
    action: ow.optional["function"]
  }, _defineProperty(_ow$object$exactShape, "button", ow.optional.object.exactShape({
    onclick: ow["function"],
    text: ow.string
  })), _defineProperty(_ow$object$exactShape, "icon", ow.optional.string), _ow$object$exactShape)));
}
function validateWalletInterface(walletInterface) {
  ow(walletInterface, "wallet interface", ow.object.exactShape({
    name: ow.string,
    connect: ow.optional["function"],
    address: ow.object.hasAnyKeys("get", "onChange").valuesOfType(ow["function"]),
    network: ow.object.hasAnyKeys("get", "onChange").valuesOfType(ow["function"]),
    balance: ow.object.hasAnyKeys("get", "onChange").valuesOfType(ow["function"])
  }));
}

var app = store.writable({
  dappId: null,
  networkId: null,
  version: null,
  selectWallet: false,
  selectWalletCompleted: false,
  prepareWallet: false,
  prepareWalletCompleted: false,
  modules: null
});
var configuration = store.writable({
  darkMode: false
});
var address = createUserStateStore("address");
var network = createUserStateStore("network");
var balance = createUserStateStore("balance");
var provider = store.writable(null);
var state = createState({
  mobileDevice: null,
  walletName: null,
  address: null,
  network: null,
  balance: null,
  connect: null,
  provider: null
}); // make sure state store is updated when any of these change

address.subscribe(function (value) {
  return state.update({
    address: value
  });
});
network.subscribe(function (value) {
  return state.update({
    network: value
  });
});
balance.subscribe(function (value) {
  return state.update({
    balance: value
  });
});
provider.subscribe(function (value) {
  return state.update({
    provider: value
  });
}); // keep track of intervals that are syncing state so they can be cleared

var currentSyncerIntervals = [];
var walletInterface = createWalletInterfaceStore(null);
walletInterface.subscribe(function (wallet) {
  if (wallet) {
    // clear all current intervals if they exist
    currentSyncerIntervals.forEach(function (clearInterval) {
      return clearInterval && clearInterval();
    }); // start syncing state and save intervals

    currentSyncerIntervals = [address.setStateSyncer(wallet.address), network.setStateSyncer(wallet.network), balance.setStateSyncer(wallet.balance)];
    state.update({
      connect: wallet.connect,
      walletName: wallet.name
    });
  }
});

function createState(initialState) {
  var state = initialState;
  var subscribers = [];
  return {
    get: function get() {
      return state;
    },
    subscribe: function subscribe(func) {
      if (!func) return;
      subscribers.push(func);
      return function () {
        subscribers = subscribers.filter(function (f) {
          return f !== func;
        });
      };
    },
    update: function update(newState) {
      state = _objectSpread2({}, state, {}, newState);
      subscribers.forEach(function (sub) {
        return sub(state);
      });
      return state;
    }
  };
}

function createWalletInterfaceStore(initialState) {
  var _writable = store.writable(initialState),
      subscribe = _writable.subscribe,
      _set = _writable.set;

  return {
    subscribe: subscribe,
    set: function set(walletInterface) {
      validateWalletInterface(walletInterface);

      _set(walletInterface);
    }
  };
}

function createUserStateStore(parameter) {
  var _writable2 = store.writable(null),
      subscribe = _writable2.subscribe,
      set = _writable2.set;

  return {
    subscribe: subscribe,
    setStateSyncer: function setStateSyncer(stateSyncer) {
      if (!stateSyncer || _typeof(stateSyncer) !== "object") {
        throw new Error("setStateSyncer must be called with a valid interface");
      }

      if (stateSyncer.onChange) {
        stateSyncer.onChange(set);
        return;
      }

      if (stateSyncer.get) {
        var interval = setInterval(function () {
          stateSyncer.get().then(set)["catch"](function (err) {
            throw new Error("Error getting ".concat(parameter, " from state syncer: ").concat(err));
          });
        }, 250);
        return function () {
          return clearInterval(interval);
        };
      }
    }
  };
}

/* src/components/Modal.svelte generated by Svelte v3.12.1 */

function add_css() {
	var style = internal.element("style");
	style.id = 'svelte-1iuesc6-style';
	style.textContent = "aside.svelte-1iuesc6{display:flex;justify-content:center;align-items:center;position:absolute;z-index:10;top:0;left:0;width:100vw;height:100vh;background:rgba(0, 0, 0, 0.3)}section.svelte-1iuesc6{background:#ffffff;border-radius:10px;box-shadow:0 1px 5px 0 rgba(0, 0, 0, 0.1);font-family:\"Helvetica Neue\";padding:1.33rem;position:relative;overflow:hidden;max-width:36rem;color:#4a4a4a}div.svelte-1iuesc6{height:0.66rem;position:absolute;padding:0.8rem;top:1.33rem;right:1.33rem;border-radius:5px;transition:background 200ms ease-in-out;display:flex;justify-content:center;align-items:center}div.svelte-1iuesc6:hover{cursor:pointer;background:#eeeeee}svg.svelte-1iuesc6{width:10px;height:10px}.bn-onboard-dark-mode-close-background.svelte-1iuesc6:hover{background:#00222c}";
	internal.append(document.head, style);
}

function create_fragment(ctx) {
	var aside, section, t, div, svg, g0, path, g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, svg_fill_value, aside_transition, current, dispose;

	const default_slot_template = ctx.$$slots.default;
	const default_slot = internal.create_slot(default_slot_template, ctx, null);

	return {
		c() {
			aside = internal.element("aside");
			section = internal.element("section");

			if (default_slot) default_slot.c();
			t = internal.space();
			div = internal.element("div");
			svg = internal.svg_element("svg");
			g0 = internal.svg_element("g");
			path = internal.svg_element("path");
			g1 = internal.svg_element("g");
			g2 = internal.svg_element("g");
			g3 = internal.svg_element("g");
			g4 = internal.svg_element("g");
			g5 = internal.svg_element("g");
			g6 = internal.svg_element("g");
			g7 = internal.svg_element("g");
			g8 = internal.svg_element("g");
			g9 = internal.svg_element("g");
			g10 = internal.svg_element("g");
			g11 = internal.svg_element("g");
			g12 = internal.svg_element("g");
			g13 = internal.svg_element("g");
			g14 = internal.svg_element("g");
			g15 = internal.svg_element("g");

			internal.attr(path, "d", "M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88\n            c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242\n            C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879\n            s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z");
			internal.attr(svg, "version", "1.1");
			internal.attr(svg, "id", "Capa_1");
			internal.attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			internal.attr(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
			internal.attr(svg, "x", "0px");
			internal.attr(svg, "y", "0px");
			internal.attr(svg, "viewBox", "0 0 47.971 47.971");
			internal.set_style(svg, "enable-background", "new 0 0 47.971 47.971");
			internal.set_style(svg, "transition", "fill 150ms\n        ease-in-out");
			internal.attr(svg, "fill", svg_fill_value = ctx.closeHovered ? (ctx.$configuration.darkMode ? '#ffffff' : '#4a4a4a') : '#9B9B9B');
			internal.attr(svg, "xml:space", "preserve");
			internal.attr(svg, "class", "svelte-1iuesc6");
			internal.attr(div, "class", "bn-onboard-custom bn-onboard-modal-content-close svelte-1iuesc6");
			internal.toggle_class(div, "bn-onboard-dark-mode-close-background", ctx.$configuration.darkMode);
			internal.attr(section, "class", "bn-onboard-custom bn-onboard-modal-content svelte-1iuesc6");
			internal.toggle_class(section, "bn-onboard-dark-mode", ctx.$configuration.darkMode);
			internal.attr(aside, "class", "bn-onboard-custom bn-onboard-modal svelte-1iuesc6");

			dispose = [
				internal.listen(div, "click", ctx.closeModal),
				internal.listen(div, "mouseenter", ctx.mouseenter_handler),
				internal.listen(div, "mouseleave", ctx.mouseleave_handler)
			];
		},

		l(nodes) {
			if (default_slot) default_slot.l(section_nodes);
		},

		m(target, anchor) {
			internal.insert(target, aside, anchor);
			internal.append(aside, section);

			if (default_slot) {
				default_slot.m(section, null);
			}

			internal.append(section, t);
			internal.append(section, div);
			internal.append(div, svg);
			internal.append(svg, g0);
			internal.append(g0, path);
			internal.append(svg, g1);
			internal.append(svg, g2);
			internal.append(svg, g3);
			internal.append(svg, g4);
			internal.append(svg, g5);
			internal.append(svg, g6);
			internal.append(svg, g7);
			internal.append(svg, g8);
			internal.append(svg, g9);
			internal.append(svg, g10);
			internal.append(svg, g11);
			internal.append(svg, g12);
			internal.append(svg, g13);
			internal.append(svg, g14);
			internal.append(svg, g15);
			current = true;
		},

		p(changed, ctx) {
			if (default_slot && default_slot.p && changed.$$scope) {
				default_slot.p(
					internal.get_slot_changes(default_slot_template, ctx, changed, null),
					internal.get_slot_context(default_slot_template, ctx, null)
				);
			}

			if ((!current || changed.closeHovered || changed.$configuration) && svg_fill_value !== (svg_fill_value = ctx.closeHovered ? (ctx.$configuration.darkMode ? '#ffffff' : '#4a4a4a') : '#9B9B9B')) {
				internal.attr(svg, "fill", svg_fill_value);
			}

			if (changed.$configuration) {
				internal.toggle_class(div, "bn-onboard-dark-mode-close-background", ctx.$configuration.darkMode);
				internal.toggle_class(section, "bn-onboard-dark-mode", ctx.$configuration.darkMode);
			}
		},

		i(local) {
			if (current) return;
			internal.transition_in(default_slot, local);

			internal.add_render_callback(() => {
				if (!aside_transition) aside_transition = internal.create_bidirectional_transition(aside, transition.fade, {}, true);
				aside_transition.run(1);
			});

			current = true;
		},

		o(local) {
			internal.transition_out(default_slot, local);

			if (!aside_transition) aside_transition = internal.create_bidirectional_transition(aside, transition.fade, {}, false);
			aside_transition.run(0);

			current = false;
		},

		d(detaching) {
			if (detaching) {
				internal.detach(aside);
			}

			if (default_slot) default_slot.d(detaching);

			if (detaching) {
				if (aside_transition) aside_transition.end();
			}

			internal.run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $configuration;

	internal.component_subscribe($$self, configuration, $$value => { $configuration = $$value; $$invalidate('$configuration', $configuration); });

	
  let { closeModal } = $$props;

  let closeHovered;

	let { $$slots = {}, $$scope } = $$props;

	const mouseenter_handler = () => ($$invalidate('closeHovered', closeHovered = true));

	const mouseleave_handler = () => ($$invalidate('closeHovered', closeHovered = false));

	$$self.$set = $$props => {
		if ('closeModal' in $$props) $$invalidate('closeModal', closeModal = $$props.closeModal);
		if ('$$scope' in $$props) $$invalidate('$$scope', $$scope = $$props.$$scope);
	};

	return {
		closeModal,
		closeHovered,
		$configuration,
		mouseenter_handler,
		mouseleave_handler,
		$$slots,
		$$scope
	};
}

class Modal extends internal.SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-1iuesc6-style")) add_css();
		internal.init(this, options, instance, create_fragment, internal.safe_not_equal, ["closeModal"]);
	}
}

/* src/components/ModalHeader.svelte generated by Svelte v3.12.1 */

function add_css$1() {
	var style = internal.element("style");
	style.id = 'svelte-14pgfgy-style';
	style.textContent = "header.svelte-14pgfgy{display:flex;align-items:center;margin-bottom:0.66rem}div.svelte-14pgfgy{display:flex;justify-content:center;align-items:center;padding:0.6rem;border-radius:30px;background:#eeeeee}h3.svelte-14pgfgy{font-weight:bold;font-size:1.33rem;margin:0 0 0 0.5rem}";
	internal.append(document.head, style);
}

function create_fragment$1(ctx) {
	var header, div, t0, h3, t1;

	return {
		c() {
			header = internal.element("header");
			div = internal.element("div");
			t0 = internal.space();
			h3 = internal.element("h3");
			t1 = internal.text(ctx.heading);
			internal.attr(div, "class", "bn-onboard-custom bn-onboard-modal-content-header-icon svelte-14pgfgy");
			internal.toggle_class(div, "bn-onboard-dark-mode-background", ctx.$configuration.darkMode);
			internal.attr(h3, "class", "bn-onboard-custom bn-onboard-modal-content-header-heading svelte-14pgfgy");
			internal.attr(header, "class", "bn-onboard-custom bn-onboard-modal-content-header svelte-14pgfgy");
		},

		m(target, anchor) {
			internal.insert(target, header, anchor);
			internal.append(header, div);
			div.innerHTML = ctx.icon;
			internal.append(header, t0);
			internal.append(header, h3);
			internal.append(h3, t1);
		},

		p(changed, ctx) {
			if (changed.icon) {
				div.innerHTML = ctx.icon;
			}

			if (changed.$configuration) {
				internal.toggle_class(div, "bn-onboard-dark-mode-background", ctx.$configuration.darkMode);
			}

			if (changed.heading) {
				internal.set_data(t1, ctx.heading);
			}
		},

		i: internal.noop,
		o: internal.noop,

		d(detaching) {
			if (detaching) {
				internal.detach(header);
			}
		}
	};
}

function instance$1($$self, $$props, $$invalidate) {
	let $configuration;

	internal.component_subscribe($$self, configuration, $$value => { $configuration = $$value; $$invalidate('$configuration', $configuration); });

	let { heading, icon } = $$props;

	$$self.$set = $$props => {
		if ('heading' in $$props) $$invalidate('heading', heading = $$props.heading);
		if ('icon' in $$props) $$invalidate('icon', icon = $$props.icon);
	};

	return { heading, icon, $configuration };
}

class ModalHeader extends internal.SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-14pgfgy-style")) add_css$1();
		internal.init(this, options, instance$1, create_fragment$1, internal.safe_not_equal, ["heading", "icon"]);
	}
}

/* src/elements/Button.svelte generated by Svelte v3.12.1 */

function add_css$2() {
	var style = internal.element("style");
	style.id = 'svelte-v6p7u9-style';
	style.textContent = "button.svelte-v6p7u9{background:inherit;font-size:0.889rem;border:1px solid #4a90e2;border-radius:40px;padding:0.55rem 1.4rem;margin-top:0.33rem;cursor:pointer;color:#4a90e2;transition:background 150ms ease-in-out}button.svelte-v6p7u9:focus{outline:none}button.svelte-v6p7u9:hover{background:#ecf3fc}";
	internal.append(document.head, style);
}

function create_fragment$2(ctx) {
	var button, current, dispose;

	const default_slot_template = ctx.$$slots.default;
	const default_slot = internal.create_slot(default_slot_template, ctx, null);

	return {
		c() {
			button = internal.element("button");

			if (default_slot) default_slot.c();

			internal.attr(button, "class", "bn-onboard-custom bn-onboard-button svelte-v6p7u9");
			internal.toggle_class(button, "bn-onboard-dark-mode-link", ctx.$configuration.darkMode);
			internal.toggle_class(button, "bn-onboard-dark-mode-background-hover", ctx.$configuration.darkMode);
			dispose = internal.listen(button, "click", ctx.onclick);
		},

		l(nodes) {
			if (default_slot) default_slot.l(button_nodes);
		},

		m(target, anchor) {
			internal.insert(target, button, anchor);

			if (default_slot) {
				default_slot.m(button, null);
			}

			current = true;
		},

		p(changed, ctx) {
			if (default_slot && default_slot.p && changed.$$scope) {
				default_slot.p(
					internal.get_slot_changes(default_slot_template, ctx, changed, null),
					internal.get_slot_context(default_slot_template, ctx, null)
				);
			}

			if (changed.$configuration) {
				internal.toggle_class(button, "bn-onboard-dark-mode-link", ctx.$configuration.darkMode);
				internal.toggle_class(button, "bn-onboard-dark-mode-background-hover", ctx.$configuration.darkMode);
			}
		},

		i(local) {
			if (current) return;
			internal.transition_in(default_slot, local);
			current = true;
		},

		o(local) {
			internal.transition_out(default_slot, local);
			current = false;
		},

		d(detaching) {
			if (detaching) {
				internal.detach(button);
			}

			if (default_slot) default_slot.d(detaching);
			dispose();
		}
	};
}

function instance$2($$self, $$props, $$invalidate) {
	let $configuration;

	internal.component_subscribe($$self, configuration, $$value => { $configuration = $$value; $$invalidate('$configuration', $configuration); });

	let { highlight = false, onclick = null } = $$props;

	let { $$slots = {}, $$scope } = $$props;

	$$self.$set = $$props => {
		if ('highlight' in $$props) $$invalidate('highlight', highlight = $$props.highlight);
		if ('onclick' in $$props) $$invalidate('onclick', onclick = $$props.onclick);
		if ('$$scope' in $$props) $$invalidate('$$scope', $$scope = $$props.$$scope);
	};

	return {
		highlight,
		onclick,
		$configuration,
		$$slots,
		$$scope
	};
}

class Button extends internal.SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-v6p7u9-style")) add_css$2();
		internal.init(this, options, instance$2, create_fragment$2, internal.safe_not_equal, ["highlight", "onclick"]);
	}
}

/* src/elements/IconButton.svelte generated by Svelte v3.12.1 */

function add_css$3() {
	var style = internal.element("style");
	style.id = 'svelte-1lc48tf-style';
	style.textContent = "button.svelte-1lc48tf{display:flex;align-items:center;border:none;margin:0.33rem 0;background:inherit;width:18rem;padding:0.625rem 1.25rem;transition:box-shadow 150ms ease-in-out, background 200ms ease-in-out;border-radius:40px;cursor:pointer;color:inherit}button.svelte-1lc48tf:hover{box-shadow:0 2px 10px 0 rgba(0, 0, 0, 0.1)}button.svelte-1lc48tf:focus{outline:none}div.svelte-1lc48tf{justify-content:center;align-items:center;text-align:center;height:40px;width:40px;line-height:40px}img.svelte-1lc48tf{max-height:100%;max-width:100%;vertical-align:middle}span.svelte-1lc48tf{margin-left:0.66rem;font-weight:bold;font-size:1rem;text-align:left}@media only screen and (max-width: 700px){button.svelte-1lc48tf{width:100%}}";
	internal.append(document.head, style);
}

// (70:4) {:else}
function create_else_block(ctx) {
	var img;

	return {
		c() {
			img = internal.element("img");
			internal.attr(img, "src", ctx.iconSrc);
			internal.attr(img, "srcset", ctx.iconSrcSet);
			internal.attr(img, "alt", ctx.text);
			internal.attr(img, "class", "svelte-1lc48tf");
		},

		m(target, anchor) {
			internal.insert(target, img, anchor);
		},

		p(changed, ctx) {
			if (changed.iconSrc) {
				internal.attr(img, "src", ctx.iconSrc);
			}

			if (changed.iconSrcSet) {
				internal.attr(img, "srcset", ctx.iconSrcSet);
			}

			if (changed.text) {
				internal.attr(img, "alt", ctx.text);
			}
		},

		d(detaching) {
			if (detaching) {
				internal.detach(img);
			}
		}
	};
}

// (68:4) {#if svg}
function create_if_block(ctx) {
	var html_tag;

	return {
		c() {
			html_tag = new internal.HtmlTag(ctx.svg, null);
		},

		m(target, anchor) {
			html_tag.m(target, anchor);
		},

		p(changed, ctx) {
			if (changed.svg) {
				html_tag.p(ctx.svg);
			}
		},

		d(detaching) {
			if (detaching) {
				html_tag.d();
			}
		}
	};
}

function create_fragment$3(ctx) {
	var button, div, t0, span, t1, dispose;

	function select_block_type(changed, ctx) {
		if (ctx.svg) return create_if_block;
		return create_else_block;
	}

	var current_block_type = select_block_type(null, ctx);
	var if_block = current_block_type(ctx);

	return {
		c() {
			button = internal.element("button");
			div = internal.element("div");
			if_block.c();
			t0 = internal.space();
			span = internal.element("span");
			t1 = internal.text(ctx.text);
			internal.attr(div, "class", "svelte-1lc48tf");
			internal.attr(span, "class", "svelte-1lc48tf");
			internal.attr(button, "class", "bn-onboard-custom bn-onboard-icon-button svelte-1lc48tf");
			internal.toggle_class(button, "bn-onboard-dark-mode-background-hover", ctx.$configuration.darkMode);
			dispose = internal.listen(button, "click", ctx.onclick);
		},

		m(target, anchor) {
			internal.insert(target, button, anchor);
			internal.append(button, div);
			if_block.m(div, null);
			internal.append(button, t0);
			internal.append(button, span);
			internal.append(span, t1);
		},

		p(changed, ctx) {
			if (current_block_type === (current_block_type = select_block_type(changed, ctx)) && if_block) {
				if_block.p(changed, ctx);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);
				if (if_block) {
					if_block.c();
					if_block.m(div, null);
				}
			}

			if (changed.text) {
				internal.set_data(t1, ctx.text);
			}

			if (changed.$configuration) {
				internal.toggle_class(button, "bn-onboard-dark-mode-background-hover", ctx.$configuration.darkMode);
			}
		},

		i: internal.noop,
		o: internal.noop,

		d(detaching) {
			if (detaching) {
				internal.detach(button);
			}

			if_block.d();
			dispose();
		}
	};
}

function instance$3($$self, $$props, $$invalidate) {
	let $configuration;

	internal.component_subscribe($$self, configuration, $$value => { $configuration = $$value; $$invalidate('$configuration', $configuration); });

	let { iconSrc, iconSrcSet = null, svg, onclick = null, text } = $$props;

	$$self.$set = $$props => {
		if ('iconSrc' in $$props) $$invalidate('iconSrc', iconSrc = $$props.iconSrc);
		if ('iconSrcSet' in $$props) $$invalidate('iconSrcSet', iconSrcSet = $$props.iconSrcSet);
		if ('svg' in $$props) $$invalidate('svg', svg = $$props.svg);
		if ('onclick' in $$props) $$invalidate('onclick', onclick = $$props.onclick);
		if ('text' in $$props) $$invalidate('text', text = $$props.text);
	};

	return {
		iconSrc,
		iconSrcSet,
		svg,
		onclick,
		text,
		$configuration
	};
}

class IconButton extends internal.SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-1lc48tf-style")) add_css$3();
		internal.init(this, options, instance$3, create_fragment$3, internal.safe_not_equal, ["iconSrc", "iconSrcSet", "svg", "onclick", "text"]);
	}
}

/* src/components/Wallets.svelte generated by Svelte v3.12.1 */

function add_css$4() {
	var style = internal.element("style");
	style.id = 'svelte-a3m86z-style';
	style.textContent = "ul.svelte-a3m86z{display:flex;flex-flow:row wrap;align-items:center;list-style-type:none;margin-bottom:0.66rem;padding:0}div.svelte-a3m86z{width:100%;display:flex;justify-content:center}@media only screen and (max-width: 700px){ul.svelte-a3m86z li.svelte-a3m86z{width:100%}}";
	internal.append(document.head, style);
}

function get_each_context(ctx, list, i) {
	const child_ctx = Object.create(ctx);
	child_ctx.wallet = list[i];
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = Object.create(ctx);
	child_ctx.wallet = list[i];
	return child_ctx;
}

// (36:2) {#each modalData.walletModules as wallet}
function create_each_block_1(ctx) {
	var li, li_intro, current;

	function func() {
		return ctx.func(ctx);
	}

	var iconbutton = new IconButton({
		props: {
		onclick: func,
		iconSrc: ctx.wallet.iconSrc,
		iconSrcSet: ctx.wallet.iconSrcSet,
		text: ctx.wallet.name
	}
	});

	return {
		c() {
			li = internal.element("li");
			iconbutton.$$.fragment.c();
			internal.attr(li, "class", "svelte-a3m86z");
		},

		m(target, anchor) {
			internal.insert(target, li, anchor);
			internal.mount_component(iconbutton, li, null);
			current = true;
		},

		p(changed, new_ctx) {
			ctx = new_ctx;
			var iconbutton_changes = {};
			if (changed.handleWalletSelect || changed.modalData) iconbutton_changes.onclick = func;
			if (changed.modalData) iconbutton_changes.iconSrc = ctx.wallet.iconSrc;
			if (changed.modalData) iconbutton_changes.iconSrcSet = ctx.wallet.iconSrcSet;
			if (changed.modalData) iconbutton_changes.text = ctx.wallet.name;
			iconbutton.$set(iconbutton_changes);
		},

		i(local) {
			if (current) return;
			internal.transition_in(iconbutton.$$.fragment, local);

			if (!li_intro) {
				internal.add_render_callback(() => {
					li_intro = internal.create_in_transition(li, transition.fade, {});
					li_intro.start();
				});
			}

			current = true;
		},

		o(local) {
			internal.transition_out(iconbutton.$$.fragment, local);
			current = false;
		},

		d(detaching) {
			if (detaching) {
				internal.detach(li);
			}

			internal.destroy_component(iconbutton);
		}
	};
}

// (46:2) {#if modalData.extraWalletModules && !showingAllWalletModules}
function create_if_block_1(ctx) {
	var div, current;

	var button = new Button({
		props: {
		highlight: true,
		onclick: ctx.func_1,
		$$slots: { default: [create_default_slot] },
		$$scope: { ctx }
	}
	});

	return {
		c() {
			div = internal.element("div");
			button.$$.fragment.c();
			internal.attr(div, "class", "svelte-a3m86z");
		},

		m(target, anchor) {
			internal.insert(target, div, anchor);
			internal.mount_component(button, div, null);
			current = true;
		},

		p(changed, ctx) {
			var button_changes = {};
			if (changed.showingAllWalletModules) button_changes.onclick = ctx.func_1;
			if (changed.$$scope) button_changes.$$scope = { changed, ctx };
			button.$set(button_changes);
		},

		i(local) {
			if (current) return;
			internal.transition_in(button.$$.fragment, local);

			current = true;
		},

		o(local) {
			internal.transition_out(button.$$.fragment, local);
			current = false;
		},

		d(detaching) {
			if (detaching) {
				internal.detach(div);
			}

			internal.destroy_component(button);
		}
	};
}

// (48:6) <Button highlight={true} onclick={() => (showingAllWalletModules = true)}>
function create_default_slot(ctx) {
	var t;

	return {
		c() {
			t = internal.text("Show More");
		},

		m(target, anchor) {
			internal.insert(target, t, anchor);
		},

		d(detaching) {
			if (detaching) {
				internal.detach(t);
			}
		}
	};
}

// (54:2) {#if showingAllWalletModules}
function create_if_block$1(ctx) {
	var each_1_anchor, current;

	let each_value = ctx.modalData.extraWalletModules;

	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => internal.transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = internal.empty();
		},

		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			internal.insert(target, each_1_anchor, anchor);
			current = true;
		},

		p(changed, ctx) {
			if (changed.handleWalletSelect || changed.modalData) {
				each_value = ctx.modalData.extraWalletModules;

				let i;
				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(changed, child_ctx);
						internal.transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						internal.transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				internal.group_outros();
				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}
				internal.check_outros();
			}
		},

		i(local) {
			if (current) return;
			for (let i = 0; i < each_value.length; i += 1) {
				internal.transition_in(each_blocks[i]);
			}

			current = true;
		},

		o(local) {
			each_blocks = each_blocks.filter(Boolean);
			for (let i = 0; i < each_blocks.length; i += 1) {
				internal.transition_out(each_blocks[i]);
			}

			current = false;
		},

		d(detaching) {
			internal.destroy_each(each_blocks, detaching);

			if (detaching) {
				internal.detach(each_1_anchor);
			}
		}
	};
}

// (55:4) {#each modalData.extraWalletModules as wallet}
function create_each_block(ctx) {
	var li, t, li_intro, current;

	function func_2() {
		return ctx.func_2(ctx);
	}

	var iconbutton = new IconButton({
		props: {
		onclick: func_2,
		iconSrc: ctx.wallet.iconSrc,
		iconSrcSet: ctx.wallet.iconSrcSet,
		svg: ctx.wallet.svg,
		text: ctx.wallet.name
	}
	});

	return {
		c() {
			li = internal.element("li");
			iconbutton.$$.fragment.c();
			t = internal.space();
			internal.attr(li, "class", "svelte-a3m86z");
		},

		m(target, anchor) {
			internal.insert(target, li, anchor);
			internal.mount_component(iconbutton, li, null);
			internal.append(li, t);
			current = true;
		},

		p(changed, new_ctx) {
			ctx = new_ctx;
			var iconbutton_changes = {};
			if (changed.handleWalletSelect || changed.modalData) iconbutton_changes.onclick = func_2;
			if (changed.modalData) iconbutton_changes.iconSrc = ctx.wallet.iconSrc;
			if (changed.modalData) iconbutton_changes.iconSrcSet = ctx.wallet.iconSrcSet;
			if (changed.modalData) iconbutton_changes.svg = ctx.wallet.svg;
			if (changed.modalData) iconbutton_changes.text = ctx.wallet.name;
			iconbutton.$set(iconbutton_changes);
		},

		i(local) {
			if (current) return;
			internal.transition_in(iconbutton.$$.fragment, local);

			if (!li_intro) {
				internal.add_render_callback(() => {
					li_intro = internal.create_in_transition(li, transition.fade, {});
					li_intro.start();
				});
			}

			current = true;
		},

		o(local) {
			internal.transition_out(iconbutton.$$.fragment, local);
			current = false;
		},

		d(detaching) {
			if (detaching) {
				internal.detach(li);
			}

			internal.destroy_component(iconbutton);
		}
	};
}

function create_fragment$4(ctx) {
	var ul, t0, t1, current;

	let each_value_1 = ctx.modalData.walletModules;

	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	const out = i => internal.transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	var if_block0 = (ctx.modalData.extraWalletModules && !ctx.showingAllWalletModules) && create_if_block_1(ctx);

	var if_block1 = (ctx.showingAllWalletModules) && create_if_block$1(ctx);

	return {
		c() {
			ul = internal.element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t0 = internal.space();
			if (if_block0) if_block0.c();
			t1 = internal.space();
			if (if_block1) if_block1.c();
			internal.attr(ul, "class", "bn-onboard-custom bn-onboard-modal-select-wallets svelte-a3m86z");
		},

		m(target, anchor) {
			internal.insert(target, ul, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}

			internal.append(ul, t0);
			if (if_block0) if_block0.m(ul, null);
			internal.append(ul, t1);
			if (if_block1) if_block1.m(ul, null);
			current = true;
		},

		p(changed, ctx) {
			if (changed.handleWalletSelect || changed.modalData) {
				each_value_1 = ctx.modalData.walletModules;

				let i;
				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(changed, child_ctx);
						internal.transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
						each_blocks[i].c();
						internal.transition_in(each_blocks[i], 1);
						each_blocks[i].m(ul, t0);
					}
				}

				internal.group_outros();
				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
					out(i);
				}
				internal.check_outros();
			}

			if (ctx.modalData.extraWalletModules && !ctx.showingAllWalletModules) {
				if (if_block0) {
					if_block0.p(changed, ctx);
					internal.transition_in(if_block0, 1);
				} else {
					if_block0 = create_if_block_1(ctx);
					if_block0.c();
					internal.transition_in(if_block0, 1);
					if_block0.m(ul, t1);
				}
			} else if (if_block0) {
				internal.group_outros();
				internal.transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});
				internal.check_outros();
			}

			if (ctx.showingAllWalletModules) {
				if (if_block1) {
					if_block1.p(changed, ctx);
					internal.transition_in(if_block1, 1);
				} else {
					if_block1 = create_if_block$1(ctx);
					if_block1.c();
					internal.transition_in(if_block1, 1);
					if_block1.m(ul, null);
				}
			} else if (if_block1) {
				internal.group_outros();
				internal.transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});
				internal.check_outros();
			}
		},

		i(local) {
			if (current) return;
			for (let i = 0; i < each_value_1.length; i += 1) {
				internal.transition_in(each_blocks[i]);
			}

			internal.transition_in(if_block0);
			internal.transition_in(if_block1);
			current = true;
		},

		o(local) {
			each_blocks = each_blocks.filter(Boolean);
			for (let i = 0; i < each_blocks.length; i += 1) {
				internal.transition_out(each_blocks[i]);
			}

			internal.transition_out(if_block0);
			internal.transition_out(if_block1);
			current = false;
		},

		d(detaching) {
			if (detaching) {
				internal.detach(ul);
			}

			internal.destroy_each(each_blocks, detaching);

			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
		}
	};
}

function instance$4($$self, $$props, $$invalidate) {
	
  let { modalData, handleWalletSelect } = $$props;

  let showingAllWalletModules;

	const func = ({ wallet }) => handleWalletSelect(wallet);

	const func_1 = () => ($$invalidate('showingAllWalletModules', showingAllWalletModules = true));

	const func_2 = ({ wallet }) => handleWalletSelect(wallet);

	$$self.$set = $$props => {
		if ('modalData' in $$props) $$invalidate('modalData', modalData = $$props.modalData);
		if ('handleWalletSelect' in $$props) $$invalidate('handleWalletSelect', handleWalletSelect = $$props.handleWalletSelect);
	};

	return {
		modalData,
		handleWalletSelect,
		showingAllWalletModules,
		func,
		func_1,
		func_2
	};
}

class Wallets extends internal.SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-a3m86z-style")) add_css$4();
		internal.init(this, options, instance$4, create_fragment$4, internal.safe_not_equal, ["modalData", "handleWalletSelect"]);
	}
}

/* src/elements/IconDisplay.svelte generated by Svelte v3.12.1 */

function add_css$5() {
	var style = internal.element("style");
	style.id = 'svelte-3ma3ta-style';
	style.textContent = "div.svelte-3ma3ta{display:flex;align-items:center;border:none;margin:0;background:inherit;padding:0;width:18rem;border-radius:40px;color:inherit}img.svelte-3ma3ta{width:auto;height:3rem}span.svelte-3ma3ta{margin-left:0.66rem;font-weight:bold;opacity:0.7;font-size:1rem;text-align:left}";
	internal.append(document.head, style);
}

function create_fragment$5(ctx) {
	var div, img, t0, span, t1;

	return {
		c() {
			div = internal.element("div");
			img = internal.element("img");
			t0 = internal.space();
			span = internal.element("span");
			t1 = internal.text(ctx.text);
			internal.attr(img, "src", ctx.iconSrc);
			internal.attr(img, "srcset", ctx.iconSrcSet);
			internal.attr(img, "alt", ctx.text);
			internal.attr(img, "class", "svelte-3ma3ta");
			internal.attr(span, "class", "svelte-3ma3ta");
			internal.attr(div, "class", "bn-onboard-custom bn-onboard-icon-display svelte-3ma3ta");
		},

		m(target, anchor) {
			internal.insert(target, div, anchor);
			internal.append(div, img);
			internal.append(div, t0);
			internal.append(div, span);
			internal.append(span, t1);
		},

		p(changed, ctx) {
			if (changed.iconSrc) {
				internal.attr(img, "src", ctx.iconSrc);
			}

			if (changed.iconSrcSet) {
				internal.attr(img, "srcset", ctx.iconSrcSet);
			}

			if (changed.text) {
				internal.attr(img, "alt", ctx.text);
				internal.set_data(t1, ctx.text);
			}
		},

		i: internal.noop,
		o: internal.noop,

		d(detaching) {
			if (detaching) {
				internal.detach(div);
			}
		}
	};
}

function instance$5($$self, $$props, $$invalidate) {
	let { iconSrc, iconSrcSet = null, text } = $$props;

	$$self.$set = $$props => {
		if ('iconSrc' in $$props) $$invalidate('iconSrc', iconSrc = $$props.iconSrc);
		if ('iconSrcSet' in $$props) $$invalidate('iconSrcSet', iconSrcSet = $$props.iconSrcSet);
		if ('text' in $$props) $$invalidate('text', text = $$props.text);
	};

	return { iconSrc, iconSrcSet, text };
}

class IconDisplay extends internal.SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-3ma3ta-style")) add_css$5();
		internal.init(this, options, instance$5, create_fragment$5, internal.safe_not_equal, ["iconSrc", "iconSrcSet", "text"]);
	}
}

/* src/components/SelectedWallet.svelte generated by Svelte v3.12.1 */

function add_css$6() {
	var style = internal.element("style");
	style.id = 'svelte-1jvz3wu-style';
	style.textContent = "section.svelte-1jvz3wu{color:inherit}footer.svelte-1jvz3wu{display:flex;justify-content:space-between}";
	internal.append(document.head, style);
}

// (27:2) {#if installMessage}
function create_if_block$2(ctx) {
	var html_tag;

	return {
		c() {
			html_tag = new internal.HtmlTag(ctx.installMessage, null);
		},

		m(target, anchor) {
			html_tag.m(target, anchor);
		},

		p(changed, ctx) {
			if (changed.installMessage) {
				html_tag.p(ctx.installMessage);
			}
		},

		d(detaching) {
			if (detaching) {
				html_tag.d();
			}
		}
	};
}

// (33:6) <Button>
function create_default_slot_1(ctx) {
	var t0, t1_value = ctx.selectedWallet.name + "", t1;

	return {
		c() {
			t0 = internal.text("Install ");
			t1 = internal.text(t1_value);
		},

		m(target, anchor) {
			internal.insert(target, t0, anchor);
			internal.insert(target, t1, anchor);
		},

		p(changed, ctx) {
			if ((changed.selectedWallet) && t1_value !== (t1_value = ctx.selectedWallet.name + "")) {
				internal.set_data(t1, t1_value);
			}
		},

		d(detaching) {
			if (detaching) {
				internal.detach(t0);
				internal.detach(t1);
			}
		}
	};
}

// (35:4) <Button onclick={onBack}>
function create_default_slot$1(ctx) {
	var t;

	return {
		c() {
			t = internal.text("Back");
		},

		m(target, anchor) {
			internal.insert(target, t, anchor);
		},

		d(detaching) {
			if (detaching) {
				internal.detach(t);
			}
		}
	};
}

function create_fragment$6(ctx) {
	var section, t0, t1, footer, a, a_href_value, t2, section_intro, current;

	var icondisplay = new IconDisplay({
		props: {
		iconSrc: ctx.selectedWallet.iconSrc,
		iconSrcSet: ctx.selectedWallet.iconSrcSet,
		text: ctx.selectedWallet.name
	}
	});

	var if_block = (ctx.installMessage) && create_if_block$2(ctx);

	var button0 = new Button({
		props: {
		$$slots: { default: [create_default_slot_1] },
		$$scope: { ctx }
	}
	});

	var button1 = new Button({
		props: {
		onclick: ctx.onBack,
		$$slots: { default: [create_default_slot$1] },
		$$scope: { ctx }
	}
	});

	return {
		c() {
			section = internal.element("section");
			icondisplay.$$.fragment.c();
			t0 = internal.space();
			if (if_block) if_block.c();
			t1 = internal.space();
			footer = internal.element("footer");
			a = internal.element("a");
			button0.$$.fragment.c();
			t2 = internal.space();
			button1.$$.fragment.c();
			internal.attr(a, "href", a_href_value = ctx.selectedWallet.link);
			internal.attr(a, "rel", "noreferrer noopener");
			internal.attr(a, "target", "_blank");
			internal.attr(footer, "class", "bn-onboard-custom bn-onboard-modal-selected-wallet-footer svelte-1jvz3wu");
			internal.attr(section, "class", "bn-onboard-custom bn-onboard-modal-selected-wallet svelte-1jvz3wu");
		},

		m(target, anchor) {
			internal.insert(target, section, anchor);
			internal.mount_component(icondisplay, section, null);
			internal.append(section, t0);
			if (if_block) if_block.m(section, null);
			internal.append(section, t1);
			internal.append(section, footer);
			internal.append(footer, a);
			internal.mount_component(button0, a, null);
			internal.append(footer, t2);
			internal.mount_component(button1, footer, null);
			current = true;
		},

		p(changed, ctx) {
			var icondisplay_changes = {};
			if (changed.selectedWallet) icondisplay_changes.iconSrc = ctx.selectedWallet.iconSrc;
			if (changed.selectedWallet) icondisplay_changes.iconSrcSet = ctx.selectedWallet.iconSrcSet;
			if (changed.selectedWallet) icondisplay_changes.text = ctx.selectedWallet.name;
			icondisplay.$set(icondisplay_changes);

			if (ctx.installMessage) {
				if (if_block) {
					if_block.p(changed, ctx);
				} else {
					if_block = create_if_block$2(ctx);
					if_block.c();
					if_block.m(section, t1);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			var button0_changes = {};
			if (changed.$$scope || changed.selectedWallet) button0_changes.$$scope = { changed, ctx };
			button0.$set(button0_changes);

			if ((!current || changed.selectedWallet) && a_href_value !== (a_href_value = ctx.selectedWallet.link)) {
				internal.attr(a, "href", a_href_value);
			}

			var button1_changes = {};
			if (changed.onBack) button1_changes.onclick = ctx.onBack;
			if (changed.$$scope) button1_changes.$$scope = { changed, ctx };
			button1.$set(button1_changes);
		},

		i(local) {
			if (current) return;
			internal.transition_in(icondisplay.$$.fragment, local);

			internal.transition_in(button0.$$.fragment, local);

			internal.transition_in(button1.$$.fragment, local);

			if (!section_intro) {
				internal.add_render_callback(() => {
					section_intro = internal.create_in_transition(section, transition.fade, {});
					section_intro.start();
				});
			}

			current = true;
		},

		o(local) {
			internal.transition_out(icondisplay.$$.fragment, local);
			internal.transition_out(button0.$$.fragment, local);
			internal.transition_out(button1.$$.fragment, local);
			current = false;
		},

		d(detaching) {
			if (detaching) {
				internal.detach(section);
			}

			internal.destroy_component(icondisplay);

			if (if_block) if_block.d();

			internal.destroy_component(button0);

			internal.destroy_component(button1);
		}
	};
}

function instance$6($$self, $$props, $$invalidate) {
	
  let { selectedWallet, onBack, installMessage } = $$props;

	$$self.$set = $$props => {
		if ('selectedWallet' in $$props) $$invalidate('selectedWallet', selectedWallet = $$props.selectedWallet);
		if ('onBack' in $$props) $$invalidate('onBack', onBack = $$props.onBack);
		if ('installMessage' in $$props) $$invalidate('installMessage', installMessage = $$props.installMessage);
	};

	return { selectedWallet, onBack, installMessage };
}

class SelectedWallet extends internal.SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-1jvz3wu-style")) add_css$6();
		internal.init(this, options, instance$6, create_fragment$6, internal.safe_not_equal, ["selectedWallet", "onBack", "installMessage"]);
	}
}

var walletIcon = "\n<svg\nheight=\"18\"\nviewBox=\"0 0 19 18\"\nwidth=\"19\"\nxmlns=\"http://www.w3.org/2000/svg\">\n<g fill=\"currentColor\" fill-rule=\"evenodd\">\n\t<path\n\t\td=\"m15.7721618.00006623h-13.27469839c-.86762065\n\t\t0-1.48592681.3078086-1.89741046.76113193-.40615823.44745064-.60839063\n\t\t1.04661988-.59978974\n\t\t1.64464107.00029187.005124.00040335.01025653.00033423.01538822v3.66899811c.06682404-.11685776.14162507-.22938827.22533894-.33628895.36778845-.46959466.90812952-.82116145\n\t\t1.61866132-.95623339v-.59093422c0-.55214353.17649657-1.05790163.47278173-1.43388645.29630745-.37596275.72292065-.62513272\n\t\t1.19969088-.62513272h11.23546239c.4765474 0 .9032497.24850764\n\t\t1.199624.62424961.2963743.37574196.4728709.88161045.4728709\n\t\t1.43476956v.4652895c.5235626-.11047728.9266682-.35445897\n\t\t1.2246022-.6733727.4116397-.44060653.6210469-1.03392515.6210469-1.63015804s-.2094072-1.18955151-.6210469-1.63018011c-.4116396-.44060653-1.0238627-.73834765-1.877468-.73834765z\" />\n\t<path\n\t\td=\"m14.6096047 2.57151734h-11.21914267c-.32073002\n\t\t0-.6185428.16561433-.84722564.45769739s-.37782286.70763901-.37782286\n\t\t1.16808814v.53953924c.06265527-.0036172.12640078-.00570319.19125878-.00616921.00518482-.00032924.01037961-.00047727.01557482-.00044383h.01326084\n\t\t13.24215593c.0706652 0\n\t\t.1395281-.00228571.2069226-.00630235v-.52671262c0-.46164746-.1491623-.87711464-.3777561-1.16884264-.2286161-.29175019-.5263622-.45694289-.8473147-.45694289z\" />\n\t<path\n\t\td=\"m18.2706767\n\t\t3.92481203c-.0857195.13278047-.1837832.25906993-.2945478.376829-.495466.52680184-1.2439236.87400468-2.2045296.87400468h-13.26144765c-.93286471\n\t\t0-1.53628777.33766369-1.93268731.8403655s-.57746434\n\t\t1.18877443-.57746434\n\t\t1.87212785v.41252951c.13725808.14817467.29229732.20450824.50016754.23211693.21170276.02811305.46814809.01403459.74212947.02170977h5.25979191c.94146564\n\t\t0 1.67588548.36084271 2.15878435.90341155.48289887.54259078.7188669\n\t\t1.25649138.7188669 1.96738768s-.23596803 1.4247969-.7188669\n\t\t1.9673877c-.48289887.5425689-1.21731871.9033896-2.15878435.9033896h-5.25979191c-.25038458\n\t\t0-.55749953-.0171046-.84908381-.0866198-.13520812-.0322576-.27003744-.0756114-.3932132-.1380653v1.5302318c0\n\t\t1.3201295 1.09561358 2.3983815 2.43697706\n\t\t2.3983815h13.39672254c1.3413635 0 2.4369771-1.078252\n\t\t2.4369771-2.3983815z\" />\n\t<path\n\t\td=\"m0\n\t\t8.79699248c.14260628.06959022.29864665.11050376.44557501.1299645.2753208.03649163.54484912.01335327.79368049.02057717.002302.00003506.00460441.00003506.00690641\n\t\t0h5.25640383c.82827939 0 1.4220972.30156492\n\t\t1.8240727.75248941.40199777.45094634.60569239 1.06221954.60569239\n\t\t1.67601014 0 .6137467-.20369462 1.2250637-.60569239\n\t\t1.6759882-.4019755.4509463-.99579331.7524894-1.8240727.7524894h-5.25640383c-.22831264\n\t\t0-.50846792-.0188259-.74493458-.075238-.23646666-.0563245-.41416197-.1517676-.48734767-.2599728-.00440013-.0047203-.00900883-.0092487-.01387966-.0135722v-4.65860448zm6.42601595\n\t\t1.42288912c-.62979799 0-1.14873693.5024111-1.14873693 1.1218933 0\n\t\t.6211677.51893894 1.128745 1.14873693 1.128745.62984256 0\n\t\t1.14178597-.5082122 1.14178597-1.128745\n\t\t0-.6188692-.51194341-1.1218933-1.14178597-1.1218933z\" />\n</g>\n</svg>\n\t";

function createModernProviderInterface(provider) {
  provider.autoRefreshOnNetworkChange = false;
  return {
    address: {
      get: function () {
        var _get = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          var unlocked, enabled;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return provider._metamask.isUnlocked();

                case 2:
                  unlocked = _context.sent;
                  enabled = provider._metamask.isEnabled();
                  return _context.abrupt("return", unlocked && enabled ? Promise.resolve(provider.selectedAddress) : Promise.resolve(undefined));

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function get() {
          return _get.apply(this, arguments);
        }

        return get;
      }() // METAMASK BUG NEEDS TO BE FIXED FOR CHROME: https://github.com/MetaMask/metamask-extension/issues/7101
      // onChange: func => {
      //   // give the initial value if it exists
      //   if (provider.selectedAddress) {
      //     func(provider.selectedAddress)
      //   }
      //   provider.on("accountsChanged", accounts => func(accounts[0]))
      // }

    },
    network: {
      onChange: function onChange(func) {
        // give the initial value if it exists
        if (provider.networkVersion) {
          func(provider.networkVersion);
        }

        provider.on("networkChanged", func);
      }
    },
    balance: {
      get: function get() {
        return new Promise(function (resolve) {
          if (!provider.selectedAddress) {
            resolve(null);
            return;
          }

          provider.sendAsync({
            method: "eth_getBalance",
            params: [provider.selectedAddress, "latest"],
            id: 1
          }, function (e, res) {
            resolve(String(parseInt(res.result, 16)));
          });
        });
      }
    },
    connect: function connect() {
      return new Promise(function (resolve, reject) {
        provider.enable().then(resolve)["catch"](function () {
          return reject({
            message: "This dapp needs access to your account information."
          });
        });
      });
    },
    name: getProviderName(provider)
  };
}
function createLegacyProviderInterface(provider) {
  return {
    address: {
      get: function get() {
        return Promise.resolve(provider._address);
      }
    },
    network: {
      get: function get() {
        return Promise.resolve(provider._chainId);
      }
    },
    balance: {
      get: function get() {
        return new Promise(function (resolve) {
          provider.sendAsync({
            method: "eth_getBalance",
            params: [provider._address, "latest"]
          }, function (e, res) {
            resolve(String(parseInt(res.result, 16)));
          });
        });
      }
    },
    name: getProviderName(provider)
  };
}
function getProviderName(provider) {
  if (!provider) return;

  if (provider.isMetaMask) {
    return "MetaMask";
  }

  if (provider.isDapper) {
    return "Dapper";
  }

  if (provider.currentProvider) {
    if (provider.currentProvider.isMetaMask) {
      return "MetaMask";
    }

    if (provider.currentProvider.isDapper) {
      return "Dapper";
    }

    if (provider.currentProvider.isTrust) {
      return "Trust";
    }

    if (provider.currentProvider.isCoinbaseWallet) {
      return "Coinbase";
    }

    if (provider.currentProvider.isToshi) {
      return "Toshi";
    }

    if (provider.currentProvider.isCipher) {
      return "Cipher";
    }

    if (provider.currentProvider.host && provider.currentProvider.host.indexOf("localhost") !== -1) {
      return "localhost";
    }
  }
}

/* src/views/SelectWallet.svelte generated by Svelte v3.12.1 */

function add_css$7() {
	var style = internal.element("style");
	style.id = 'svelte-14frq68-style';
	style.textContent = "p.svelte-14frq68{font-size:0.889rem;margin:1rem 0 0 0}div.svelte-14frq68{display:flex;justify-content:space-between}div.svelte-14frq68 span.svelte-14frq68{color:#4a90e2;margin-top:0.66rem;cursor:pointer}";
	internal.append(document.head, style);
}

// (111:0) {#if modalData}
function create_if_block$3(ctx) {
	var current;

	var modal = new Modal({
		props: {
		closeModal: ctx.closeModal,
		$$slots: { default: [create_default_slot$2] },
		$$scope: { ctx }
	}
	});

	return {
		c() {
			modal.$$.fragment.c();
		},

		m(target, anchor) {
			internal.mount_component(modal, target, anchor);
			current = true;
		},

		p(changed, ctx) {
			var modal_changes = {};
			if (changed.$$scope || changed.selectedWallet || changed.showWalletDefinition || changed.modalData || changed.walletAlreadyInstalled || changed.installMessage) modal_changes.$$scope = { changed, ctx };
			modal.$set(modal_changes);
		},

		i(local) {
			if (current) return;
			internal.transition_in(modal.$$.fragment, local);

			current = true;
		},

		o(local) {
			internal.transition_out(modal.$$.fragment, local);
			current = false;
		},

		d(detaching) {
			internal.destroy_component(modal, detaching);
		}
	};
}

// (141:4) {:else}
function create_else_block$1(ctx) {
	var current;

	var selectedwallet = new SelectedWallet({
		props: {
		selectedWallet: ctx.selectedWallet,
		onBack: ctx.func,
		installMessage: ctx.installMessage
	}
	});

	return {
		c() {
			selectedwallet.$$.fragment.c();
		},

		m(target, anchor) {
			internal.mount_component(selectedwallet, target, anchor);
			current = true;
		},

		p(changed, ctx) {
			var selectedwallet_changes = {};
			if (changed.selectedWallet) selectedwallet_changes.selectedWallet = ctx.selectedWallet;
			if (changed.selectedWallet || changed.walletAlreadyInstalled) selectedwallet_changes.onBack = ctx.func;
			if (changed.installMessage) selectedwallet_changes.installMessage = ctx.installMessage;
			selectedwallet.$set(selectedwallet_changes);
		},

		i(local) {
			if (current) return;
			internal.transition_in(selectedwallet.$$.fragment, local);

			current = true;
		},

		o(local) {
			internal.transition_out(selectedwallet.$$.fragment, local);
			current = false;
		},

		d(detaching) {
			internal.destroy_component(selectedwallet, detaching);
		}
	};
}

// (114:4) {#if !selectedWallet}
function create_if_block_1$1(ctx) {
	var p, t0_value = ctx.modalData.description + "", t0, t1, t2, div, span, t4, t5, if_block1_anchor, current, dispose;

	var wallets = new Wallets({
		props: {
		modalData: ctx.modalData,
		handleWalletSelect: ctx.handleWalletSelect
	}
	});

	var if_block0 = (ctx.mobileDevice) && create_if_block_3(ctx);

	var if_block1 = (ctx.showWalletDefinition) && create_if_block_2();

	return {
		c() {
			p = internal.element("p");
			t0 = internal.text(t0_value);
			t1 = internal.space();
			wallets.$$.fragment.c();
			t2 = internal.space();
			div = internal.element("div");
			span = internal.element("span");
			span.textContent = "What is a wallet?";
			t4 = internal.space();
			if (if_block0) if_block0.c();
			t5 = internal.space();
			if (if_block1) if_block1.c();
			if_block1_anchor = internal.empty();
			internal.attr(p, "class", "bn-onboard-custom bn-onboard-select-description svelte-14frq68");
			internal.attr(span, "class", "bn-onboard-custom bn-onboard-select-wallet-info svelte-14frq68");
			internal.attr(div, "class", "bn-onboard-custom bn-onboard-select-info-container svelte-14frq68");
			dispose = internal.listen(span, "click", ctx.click_handler);
		},

		m(target, anchor) {
			internal.insert(target, p, anchor);
			internal.append(p, t0);
			internal.insert(target, t1, anchor);
			internal.mount_component(wallets, target, anchor);
			internal.insert(target, t2, anchor);
			internal.insert(target, div, anchor);
			internal.append(div, span);
			internal.append(div, t4);
			if (if_block0) if_block0.m(div, null);
			internal.insert(target, t5, anchor);
			if (if_block1) if_block1.m(target, anchor);
			internal.insert(target, if_block1_anchor, anchor);
			current = true;
		},

		p(changed, ctx) {
			if ((!current || changed.modalData) && t0_value !== (t0_value = ctx.modalData.description + "")) {
				internal.set_data(t0, t0_value);
			}

			var wallets_changes = {};
			if (changed.modalData) wallets_changes.modalData = ctx.modalData;
			wallets.$set(wallets_changes);

			if (ctx.mobileDevice) if_block0.p(changed, ctx);

			if (ctx.showWalletDefinition) {
				if (!if_block1) {
					if_block1 = create_if_block_2();
					if_block1.c();
					internal.transition_in(if_block1, 1);
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				} else internal.transition_in(if_block1, 1);
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}
		},

		i(local) {
			if (current) return;
			internal.transition_in(wallets.$$.fragment, local);

			internal.transition_in(if_block0);
			internal.transition_in(if_block1);
			current = true;
		},

		o(local) {
			internal.transition_out(wallets.$$.fragment, local);
			internal.transition_out(if_block0);
			current = false;
		},

		d(detaching) {
			if (detaching) {
				internal.detach(p);
				internal.detach(t1);
			}

			internal.destroy_component(wallets, detaching);

			if (detaching) {
				internal.detach(t2);
				internal.detach(div);
			}

			if (if_block0) if_block0.d();

			if (detaching) {
				internal.detach(t5);
			}

			if (if_block1) if_block1.d(detaching);

			if (detaching) {
				internal.detach(if_block1_anchor);
			}

			dispose();
		}
	};
}

// (125:8) {#if mobileDevice}
function create_if_block_3(ctx) {
	var current;

	var button = new Button({
		props: {
		onclick: ctx.closeModal,
		$$slots: { default: [create_default_slot_1$1] },
		$$scope: { ctx }
	}
	});

	return {
		c() {
			button.$$.fragment.c();
		},

		m(target, anchor) {
			internal.mount_component(button, target, anchor);
			current = true;
		},

		p(changed, ctx) {
			var button_changes = {};
			if (changed.$$scope) button_changes.$$scope = { changed, ctx };
			button.$set(button_changes);
		},

		i(local) {
			if (current) return;
			internal.transition_in(button.$$.fragment, local);

			current = true;
		},

		o(local) {
			internal.transition_out(button.$$.fragment, local);
			current = false;
		},

		d(detaching) {
			internal.destroy_component(button, detaching);
		}
	};
}

// (126:10) <Button onclick={closeModal}>
function create_default_slot_1$1(ctx) {
	var t;

	return {
		c() {
			t = internal.text("Dismiss");
		},

		m(target, anchor) {
			internal.insert(target, t, anchor);
		},

		d(detaching) {
			if (detaching) {
				internal.detach(t);
			}
		}
	};
}

// (129:6) {#if showWalletDefinition}
function create_if_block_2(ctx) {
	var p, p_intro;

	return {
		c() {
			p = internal.element("p");
			p.textContent = "Wallets are used to send, receive, and store digital assets like\n          Ethereum. Wallets come in many forms. They are either built into your\n          browser, an extension added to your browser, a piece of hardware\n          plugged into your computer or even an app on your phone. They are\n          hyper secure, and can be used for any other blockchain application you\n          may want to use.";
			internal.attr(p, "class", "bn-onboard-custom bn-onboard-select-wallet-definition svelte-14frq68");
		},

		m(target, anchor) {
			internal.insert(target, p, anchor);
		},

		i(local) {
			if (!p_intro) {
				internal.add_render_callback(() => {
					p_intro = internal.create_in_transition(p, transition.fade, {});
					p_intro.start();
				});
			}
		},

		o: internal.noop,

		d(detaching) {
			if (detaching) {
				internal.detach(p);
			}
		}
	};
}

// (112:2) <Modal {closeModal}>
function create_default_slot$2(ctx) {
	var t, current_block_type_index, if_block, if_block_anchor, current;

	var modalheader = new ModalHeader({
		props: {
		icon: walletIcon,
		heading: ctx.modalData.heading
	}
	});

	var if_block_creators = [
		create_if_block_1$1,
		create_else_block$1
	];

	var if_blocks = [];

	function select_block_type(changed, ctx) {
		if (!ctx.selectedWallet) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(null, ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			modalheader.$$.fragment.c();
			t = internal.space();
			if_block.c();
			if_block_anchor = internal.empty();
		},

		m(target, anchor) {
			internal.mount_component(modalheader, target, anchor);
			internal.insert(target, t, anchor);
			if_blocks[current_block_type_index].m(target, anchor);
			internal.insert(target, if_block_anchor, anchor);
			current = true;
		},

		p(changed, ctx) {
			var modalheader_changes = {};
			if (changed.modalData) modalheader_changes.heading = ctx.modalData.heading;
			modalheader.$set(modalheader_changes);

			var previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(changed, ctx);
			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(changed, ctx);
			} else {
				internal.group_outros();
				internal.transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});
				internal.check_outros();

				if_block = if_blocks[current_block_type_index];
				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				}
				internal.transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},

		i(local) {
			if (current) return;
			internal.transition_in(modalheader.$$.fragment, local);

			internal.transition_in(if_block);
			current = true;
		},

		o(local) {
			internal.transition_out(modalheader.$$.fragment, local);
			internal.transition_out(if_block);
			current = false;
		},

		d(detaching) {
			internal.destroy_component(modalheader, detaching);

			if (detaching) {
				internal.detach(t);
			}

			if_blocks[current_block_type_index].d(detaching);

			if (detaching) {
				internal.detach(if_block_anchor);
			}
		}
	};
}

function create_fragment$7(ctx) {
	var if_block_anchor, current;

	var if_block = (ctx.modalData) && create_if_block$3(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = internal.empty();
		},

		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			internal.insert(target, if_block_anchor, anchor);
			current = true;
		},

		p(changed, ctx) {
			if (ctx.modalData) {
				if (if_block) {
					if_block.p(changed, ctx);
					internal.transition_in(if_block, 1);
				} else {
					if_block = create_if_block$3(ctx);
					if_block.c();
					internal.transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				internal.group_outros();
				internal.transition_out(if_block, 1, 1, () => {
					if_block = null;
				});
				internal.check_outros();
			}
		},

		i(local) {
			if (current) return;
			internal.transition_in(if_block);
			current = true;
		},

		o(local) {
			internal.transition_out(if_block);
			current = false;
		},

		d(detaching) {
			if (if_block) if_block.d(detaching);

			if (detaching) {
				internal.detach(if_block_anchor);
			}
		}
	};
}

function instance$7($$self, $$props, $$invalidate) {
	

  const { mobileDevice } = state.get();

  let modalData;
  let showWalletDefinition;

  let selectedWallet;
  let walletAlreadyInstalled;
  let installMessage;

  app.subscribe(({ modules: { selectWallet } }) => {
    const moduleType = mobileDevice ? "mobile" : "desktop";
    const { wallets, ...details } = selectWallet;

    // get the modules based on device type
    const allWalletModules = wallets[moduleType];

    // only display first 4 modules
    const walletModules =
      allWalletModules.length > 4
        ? allWalletModules.slice(0, 4)
        : allWalletModules;
    const extraWalletModules =
      allWalletModules.length > 4 && allWalletModules.slice(4);

    // set the data to show in the modal
    $$invalidate('modalData', modalData = { ...details, walletModules, extraWalletModules });
  });

  function handleWalletSelect(walletModule) {
    let wallet;
    try {
      wallet = walletModule.wallet({
        getProviderName,
        createLegacyProviderInterface,
        createModernProviderInterface
      });
    } catch (err) {
      throw new Error(err);
      return;
    }

    if (!wallet.interface) {
      $$invalidate('selectedWallet', selectedWallet = walletModule);
      $$invalidate('walletAlreadyInstalled', walletAlreadyInstalled =
        wallet.provider && getProviderName(wallet.provider));
      $$invalidate('installMessage', installMessage = walletModule.installMessage({
        currentWallet: walletAlreadyInstalled,
        selectedWallet: selectedWallet.name
      }));
      return;
    }

    walletInterface.set(wallet.interface);
    provider.set(wallet.provider);
    $$invalidate('modalData', modalData = null);
    app.update(store => ({
      ...store,
      selectWallet: false,
      selectWalletCompleted: true
    }));
  }

  function closeModal() {
    $$invalidate('modalData', modalData = null);
    app.update(store => ({
      ...store,
      selectWallet: false,
      selectWalletCompleted: false
    }));
  }

	const click_handler = () => ($$invalidate('showWalletDefinition', showWalletDefinition = !showWalletDefinition));

	const func = () => {
	          $$invalidate('selectedWallet', selectedWallet = null);
	          $$invalidate('walletAlreadyInstalled', walletAlreadyInstalled = null);
	        };

	return {
		mobileDevice,
		modalData,
		showWalletDefinition,
		selectedWallet,
		walletAlreadyInstalled,
		installMessage,
		handleWalletSelect,
		closeModal,
		click_handler,
		func
	};
}

class SelectWallet extends internal.SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-14frq68-style")) add_css$7();
		internal.init(this, options, instance$7, create_fragment$7, internal.safe_not_equal, []);
	}
}

function selectWallet() {
  return new Promise(function (resolve) {
    app.update(function (store) {
      return _objectSpread2({}, store, {
        selectWallet: true
      });
    });
    var appUnsubscribe = app.subscribe(function (_ref) {
      var selectWallet = _ref.selectWallet,
          selectWalletCompleted = _ref.selectWalletCompleted;

      if (selectWallet === false) {
        appUnsubscribe();
        setTimeout(function () {
          return resolve(selectWalletCompleted);
        }, 500);
      }
    });
  });
}
function prepareWallet() {
  return new Promise(function (resolve) {
    walletInterface.subscribe(function (provider) {
      if (!provider) {
        throw new Error("selectWallet must be called before prepareWallet");
      }
    });
    app.update(function (store) {
      return _objectSpread2({}, store, {
        prepareWallet: true
      });
    });
    var appUnsubscribe = app.subscribe(function (_ref2) {
      var prepareWallet = _ref2.prepareWallet,
          prepareWalletCompleted = _ref2.prepareWalletCompleted;

      if (prepareWallet === false) {
        appUnsubscribe();
        setTimeout(function () {
          return resolve(prepareWalletCompleted);
        }, 500);
      }
    });
  });
}
function config(options) {
  validateConfig(options);
  configuration.update(function (store) {
    return _objectSpread2({}, store, {}, options);
  });
}
function getState() {
  return state.get();
}

/* src/views/PrepareWallet.svelte generated by Svelte v3.12.1 */

function add_css$8() {
	var style = internal.element("style");
	style.id = 'svelte-sd281j-style';
	style.textContent = "p.svelte-sd281j{font-size:0.889rem}span.svelte-sd281j{color:#e2504a;font-size:0.889rem;display:block;margin-bottom:0.75rem;padding:0.5rem;border:1px solid #e2504a;border-radius:5px}div.svelte-sd281j{display:flex;justify-content:space-between}";
	internal.append(document.head, style);
}

// (184:0) {#if activeModal}
function create_if_block$4(ctx) {
	var current;

	var modal = new Modal({
		props: {
		closeModal: ctx.handleExit,
		$$slots: { default: [create_default_slot$3] },
		$$scope: { ctx }
	}
	});

	return {
		c() {
			modal.$$.fragment.c();
		},

		m(target, anchor) {
			internal.mount_component(modal, target, anchor);
			current = true;
		},

		p(changed, ctx) {
			var modal_changes = {};
			if (changed.$$scope || changed.errorMsg || changed.activeModal || changed.$configuration) modal_changes.$$scope = { changed, ctx };
			modal.$set(modal_changes);
		},

		i(local) {
			if (current) return;
			internal.transition_in(modal.$$.fragment, local);

			current = true;
		},

		o(local) {
			internal.transition_out(modal.$$.fragment, local);
			current = false;
		},

		d(detaching) {
			internal.destroy_component(modal, detaching);
		}
	};
}

// (190:4) {#if errorMsg}
function create_if_block_3$1(ctx) {
	var span, t, span_intro;

	return {
		c() {
			span = internal.element("span");
			t = internal.text(ctx.errorMsg);
			internal.attr(span, "class", "bn-onboard-custom bn-onboard-prepare-error svelte-sd281j");
			internal.toggle_class(span, "bn-onboard-dark-mode-background", ctx.$configuration.darkMode);
		},

		m(target, anchor) {
			internal.insert(target, span, anchor);
			internal.append(span, t);
		},

		p(changed, ctx) {
			if (changed.errorMsg) {
				internal.set_data(t, ctx.errorMsg);
			}

			if (changed.$configuration) {
				internal.toggle_class(span, "bn-onboard-dark-mode-background", ctx.$configuration.darkMode);
			}
		},

		i(local) {
			if (!span_intro) {
				internal.add_render_callback(() => {
					span_intro = internal.create_in_transition(span, transition.fade, {});
					span_intro.start();
				});
			}
		},

		o: internal.noop,

		d(detaching) {
			if (detaching) {
				internal.detach(span);
			}
		}
	};
}

// (199:6) {#if activeModal.button}
function create_if_block_2$1(ctx) {
	var current;

	var button = new Button({
		props: {
		onclick: ctx.activeModal.button.onclick,
		$$slots: { default: [create_default_slot_3] },
		$$scope: { ctx }
	}
	});

	return {
		c() {
			button.$$.fragment.c();
		},

		m(target, anchor) {
			internal.mount_component(button, target, anchor);
			current = true;
		},

		p(changed, ctx) {
			var button_changes = {};
			if (changed.activeModal) button_changes.onclick = ctx.activeModal.button.onclick;
			if (changed.$$scope || changed.activeModal) button_changes.$$scope = { changed, ctx };
			button.$set(button_changes);
		},

		i(local) {
			if (current) return;
			internal.transition_in(button.$$.fragment, local);

			current = true;
		},

		o(local) {
			internal.transition_out(button.$$.fragment, local);
			current = false;
		},

		d(detaching) {
			internal.destroy_component(button, detaching);
		}
	};
}

// (200:8) <Button onclick={activeModal.button.onclick}>
function create_default_slot_3(ctx) {
	var t_value = ctx.activeModal.button.text + "", t;

	return {
		c() {
			t = internal.text(t_value);
		},

		m(target, anchor) {
			internal.insert(target, t, anchor);
		},

		p(changed, ctx) {
			if ((changed.activeModal) && t_value !== (t_value = ctx.activeModal.button.text + "")) {
				internal.set_data(t, t_value);
			}
		},

		d(detaching) {
			if (detaching) {
				internal.detach(t);
			}
		}
	};
}

// (206:6) {:else}
function create_else_block$2(ctx) {
	var div;

	return {
		c() {
			div = internal.element("div");
			internal.attr(div, "class", "svelte-sd281j");
		},

		m(target, anchor) {
			internal.insert(target, div, anchor);
		},

		p: internal.noop,
		i: internal.noop,
		o: internal.noop,

		d(detaching) {
			if (detaching) {
				internal.detach(div);
			}
		}
	};
}

// (204:6) {#if errorMsg}
function create_if_block_1$2(ctx) {
	var current;

	var button = new Button({
		props: {
		onclick: ctx.doAction,
		$$slots: { default: [create_default_slot_2] },
		$$scope: { ctx }
	}
	});

	return {
		c() {
			button.$$.fragment.c();
		},

		m(target, anchor) {
			internal.mount_component(button, target, anchor);
			current = true;
		},

		p(changed, ctx) {
			var button_changes = {};
			if (changed.$$scope) button_changes.$$scope = { changed, ctx };
			button.$set(button_changes);
		},

		i(local) {
			if (current) return;
			internal.transition_in(button.$$.fragment, local);

			current = true;
		},

		o(local) {
			internal.transition_out(button.$$.fragment, local);
			current = false;
		},

		d(detaching) {
			internal.destroy_component(button, detaching);
		}
	};
}

// (205:8) <Button onclick={doAction}>
function create_default_slot_2(ctx) {
	var t;

	return {
		c() {
			t = internal.text("Try Again");
		},

		m(target, anchor) {
			internal.insert(target, t, anchor);
		},

		d(detaching) {
			if (detaching) {
				internal.detach(t);
			}
		}
	};
}

// (209:6) <Button onclick={handleExit}>
function create_default_slot_1$2(ctx) {
	var t;

	return {
		c() {
			t = internal.text("Dismiss");
		},

		m(target, anchor) {
			internal.insert(target, t, anchor);
		},

		d(detaching) {
			if (detaching) {
				internal.detach(t);
			}
		}
	};
}

// (185:2) <Modal closeModal={handleExit}>
function create_default_slot$3(ctx) {
	var t0, p, raw_value = ctx.activeModal.description + "", t1, t2, div, t3, current_block_type_index, if_block2, t4, current;

	var modalheader = new ModalHeader({
		props: {
		icon: ctx.activeModal.icon,
		heading: ctx.activeModal.heading
	}
	});

	var if_block0 = (ctx.errorMsg) && create_if_block_3$1(ctx);

	var if_block1 = (ctx.activeModal.button) && create_if_block_2$1(ctx);

	var if_block_creators = [
		create_if_block_1$2,
		create_else_block$2
	];

	var if_blocks = [];

	function select_block_type(changed, ctx) {
		if (ctx.errorMsg) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(null, ctx);
	if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	var button = new Button({
		props: {
		onclick: ctx.handleExit,
		$$slots: { default: [create_default_slot_1$2] },
		$$scope: { ctx }
	}
	});

	return {
		c() {
			modalheader.$$.fragment.c();
			t0 = internal.space();
			p = internal.element("p");
			t1 = internal.space();
			if (if_block0) if_block0.c();
			t2 = internal.space();
			div = internal.element("div");
			if (if_block1) if_block1.c();
			t3 = internal.space();
			if_block2.c();
			t4 = internal.space();
			button.$$.fragment.c();
			internal.attr(p, "class", "bn-onboard-custom bn-onboard-prepare-description svelte-sd281j");
			internal.attr(div, "class", "bn-onboard-custom bn-onboard-prepare-button-container svelte-sd281j");
		},

		m(target, anchor) {
			internal.mount_component(modalheader, target, anchor);
			internal.insert(target, t0, anchor);
			internal.insert(target, p, anchor);
			p.innerHTML = raw_value;
			internal.insert(target, t1, anchor);
			if (if_block0) if_block0.m(target, anchor);
			internal.insert(target, t2, anchor);
			internal.insert(target, div, anchor);
			if (if_block1) if_block1.m(div, null);
			internal.append(div, t3);
			if_blocks[current_block_type_index].m(div, null);
			internal.append(div, t4);
			internal.mount_component(button, div, null);
			current = true;
		},

		p(changed, ctx) {
			var modalheader_changes = {};
			if (changed.activeModal) modalheader_changes.icon = ctx.activeModal.icon;
			if (changed.activeModal) modalheader_changes.heading = ctx.activeModal.heading;
			modalheader.$set(modalheader_changes);

			if ((!current || changed.activeModal) && raw_value !== (raw_value = ctx.activeModal.description + "")) {
				p.innerHTML = raw_value;
			}

			if (ctx.errorMsg) {
				if (if_block0) {
					if_block0.p(changed, ctx);
					internal.transition_in(if_block0, 1);
				} else {
					if_block0 = create_if_block_3$1(ctx);
					if_block0.c();
					internal.transition_in(if_block0, 1);
					if_block0.m(t2.parentNode, t2);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (ctx.activeModal.button) {
				if (if_block1) {
					if_block1.p(changed, ctx);
					internal.transition_in(if_block1, 1);
				} else {
					if_block1 = create_if_block_2$1(ctx);
					if_block1.c();
					internal.transition_in(if_block1, 1);
					if_block1.m(div, t3);
				}
			} else if (if_block1) {
				internal.group_outros();
				internal.transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});
				internal.check_outros();
			}

			var previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(changed, ctx);
			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(changed, ctx);
			} else {
				internal.group_outros();
				internal.transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});
				internal.check_outros();

				if_block2 = if_blocks[current_block_type_index];
				if (!if_block2) {
					if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block2.c();
				}
				internal.transition_in(if_block2, 1);
				if_block2.m(div, t4);
			}

			var button_changes = {};
			if (changed.$$scope) button_changes.$$scope = { changed, ctx };
			button.$set(button_changes);
		},

		i(local) {
			if (current) return;
			internal.transition_in(modalheader.$$.fragment, local);

			internal.transition_in(if_block0);
			internal.transition_in(if_block1);
			internal.transition_in(if_block2);

			internal.transition_in(button.$$.fragment, local);

			current = true;
		},

		o(local) {
			internal.transition_out(modalheader.$$.fragment, local);
			internal.transition_out(if_block1);
			internal.transition_out(if_block2);
			internal.transition_out(button.$$.fragment, local);
			current = false;
		},

		d(detaching) {
			internal.destroy_component(modalheader, detaching);

			if (detaching) {
				internal.detach(t0);
				internal.detach(p);
				internal.detach(t1);
			}

			if (if_block0) if_block0.d(detaching);

			if (detaching) {
				internal.detach(t2);
				internal.detach(div);
			}

			if (if_block1) if_block1.d();
			if_blocks[current_block_type_index].d();

			internal.destroy_component(button);
		}
	};
}

function create_fragment$8(ctx) {
	var if_block_anchor, current;

	var if_block = (ctx.activeModal) && create_if_block$4(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = internal.empty();
		},

		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			internal.insert(target, if_block_anchor, anchor);
			current = true;
		},

		p(changed, ctx) {
			if (ctx.activeModal) {
				if (if_block) {
					if_block.p(changed, ctx);
					internal.transition_in(if_block, 1);
				} else {
					if_block = create_if_block$4(ctx);
					if_block.c();
					internal.transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				internal.group_outros();
				internal.transition_out(if_block, 1, 1, () => {
					if_block = null;
				});
				internal.check_outros();
			}
		},

		i(local) {
			if (current) return;
			internal.transition_in(if_block);
			current = true;
		},

		o(local) {
			internal.transition_out(if_block);
			current = false;
		},

		d(detaching) {
			if (if_block) if_block.d(detaching);

			if (detaching) {
				internal.detach(if_block_anchor);
			}
		}
	};
}

function instance$8($$self, $$props, $$invalidate) {
	let $configuration;

	internal.component_subscribe($$self, configuration, $$value => { $configuration = $$value; $$invalidate('$configuration', $configuration); });

	

  let activeModal;
  let modules;
  let currentModule;
  let errorMsg;
  let pollingInterval;
  let checkingModule;
  let actionResolved;

  // get the prepare wallet modules from the store
  app.subscribe(({ modules: { prepareWallet } }) => {
    $$invalidate('modules', modules = prepareWallet);
  });

  function doAction() {
    $$invalidate('actionResolved', actionResolved = false);

    activeModal
      .action()
      .then(() => ($$invalidate('actionResolved', actionResolved = true)))
      .catch(err => {
        $$invalidate('errorMsg', errorMsg = err.message);
      });
  }

  function handleExit() {
    app.update(store => ({ ...store, prepareWallet: false }));
    resetState();
  }

  function resetState() {
    clearInterval(pollingInterval);
    $$invalidate('errorMsg', errorMsg = null);
    $$invalidate('actionResolved', actionResolved = null);
    $$invalidate('activeModal', activeModal = null);
    $$invalidate('currentModule', currentModule = null);
  }

  function runModules(modules) {
    return new Promise(async resolve => {
      for (const module of modules) {

        const isInvalid = await invalidState(module, state.get());

        if (isInvalid) {
          return resolve(isInvalid);
        }
      }

      return resolve(false);
    });
  }

  async function invalidState(module, state) {
    const result = module({
      ...state,
      selectWallet,
      exitPrepareWallet: handleExit
    });

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

	$$self.$$.update = ($$dirty = { activeModal: 1, checkingModule: 1, modules: 1, currentModule: 1, actionResolved: 1 }) => {
		if ($$dirty.activeModal || $$dirty.checkingModule || $$dirty.modules || $$dirty.currentModule || $$dirty.actionResolved) { if (!activeModal && !checkingModule) {
        $$invalidate('checkingModule', checkingModule = true);
    
        // loop through and run each module to check if a modal needs to be shown
        runModules(modules).then(result => {
          // no result then user has passed all conditions
          if (!result) {
            app.update(store => ({
              ...store,
              prepareWallet: false,
              prepareWalletCompleted: true
            }));
    
            // blocknative.event({
            //   categoryCode: "onboard",
            //   eventCode: "onboardComplete"
            // });
    
            $$invalidate('checkingModule', checkingModule = false);
            return;
          }
    
          $$invalidate('activeModal', activeModal = result.modal);
          $$invalidate('currentModule', currentModule = result.module);
    
          // log the event code for this module
          // blocknative.event({
          //   eventCode: activeModal.eventCode,
          //   categoryCode: "onboard"
          // });
    
          // run any actions that module require as part of this step
          if (activeModal.action) {
            doAction();
          }
    
          // poll to automatically to check if condition has been met
          pollingInterval = setInterval(async () => {
            const invalid = await invalidState(currentModule, state.get());
            if (!invalid && actionResolved !== false) {
              resetState();
    
              // delayed for animations
              setTimeout(() => {
                $$invalidate('checkingModule', checkingModule = false);
              }, 250);
            }
          }, 500);
        });
      } }
	};

	return {
		activeModal,
		errorMsg,
		doAction,
		handleExit,
		$configuration
	};
}

class PrepareWallet extends internal.SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-sd281j-style")) add_css$8();
		internal.init(this, options, instance$8, create_fragment$8, internal.safe_not_equal, []);
	}
}

/* src/views/Onboard.svelte generated by Svelte v3.12.1 */

function add_css$9() {
	var style = internal.element("style");
	style.id = 'svelte-1bsbkku-style';
	style.textContent = ".bn-onboard-custom.bn-onboard-dark-mode{background:#283944;color:#ffffff}.bn-onboard-custom.bn-onboard-dark-mode-background-hover:hover, .bn-onboard-custom.bn-onboard-dark-mode-background{background:#0e212a}.bn-onboard-clickable:hover{cursor:pointer;text-decoration:underline}.bn-onboard-custom.bn-onboard-dark-mode-link{color:#91bced;border-color:#91bced}";
	internal.append(document.head, style);
}

// (28:0) {#if $app.selectWallet}
function create_if_block_1$3(ctx) {
	var current;

	var selectwallet = new SelectWallet({});

	return {
		c() {
			selectwallet.$$.fragment.c();
		},

		m(target, anchor) {
			internal.mount_component(selectwallet, target, anchor);
			current = true;
		},

		i(local) {
			if (current) return;
			internal.transition_in(selectwallet.$$.fragment, local);

			current = true;
		},

		o(local) {
			internal.transition_out(selectwallet.$$.fragment, local);
			current = false;
		},

		d(detaching) {
			internal.destroy_component(selectwallet, detaching);
		}
	};
}

// (32:0) {#if $app.prepareWallet}
function create_if_block$5(ctx) {
	var current;

	var preparewallet = new PrepareWallet({});

	return {
		c() {
			preparewallet.$$.fragment.c();
		},

		m(target, anchor) {
			internal.mount_component(preparewallet, target, anchor);
			current = true;
		},

		i(local) {
			if (current) return;
			internal.transition_in(preparewallet.$$.fragment, local);

			current = true;
		},

		o(local) {
			internal.transition_out(preparewallet.$$.fragment, local);
			current = false;
		},

		d(detaching) {
			internal.destroy_component(preparewallet, detaching);
		}
	};
}

function create_fragment$9(ctx) {
	var t, if_block1_anchor, current;

	var if_block0 = (ctx.$app.selectWallet) && create_if_block_1$3();

	var if_block1 = (ctx.$app.prepareWallet) && create_if_block$5();

	return {
		c() {
			if (if_block0) if_block0.c();
			t = internal.space();
			if (if_block1) if_block1.c();
			if_block1_anchor = internal.empty();
		},

		m(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			internal.insert(target, t, anchor);
			if (if_block1) if_block1.m(target, anchor);
			internal.insert(target, if_block1_anchor, anchor);
			current = true;
		},

		p(changed, ctx) {
			if (ctx.$app.selectWallet) {
				if (!if_block0) {
					if_block0 = create_if_block_1$3();
					if_block0.c();
					internal.transition_in(if_block0, 1);
					if_block0.m(t.parentNode, t);
				} else internal.transition_in(if_block0, 1);
			} else if (if_block0) {
				internal.group_outros();
				internal.transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});
				internal.check_outros();
			}

			if (ctx.$app.prepareWallet) {
				if (!if_block1) {
					if_block1 = create_if_block$5();
					if_block1.c();
					internal.transition_in(if_block1, 1);
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				} else internal.transition_in(if_block1, 1);
			} else if (if_block1) {
				internal.group_outros();
				internal.transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});
				internal.check_outros();
			}
		},

		i(local) {
			if (current) return;
			internal.transition_in(if_block0);
			internal.transition_in(if_block1);
			current = true;
		},

		o(local) {
			internal.transition_out(if_block0);
			internal.transition_out(if_block1);
			current = false;
		},

		d(detaching) {
			if (if_block0) if_block0.d(detaching);

			if (detaching) {
				internal.detach(t);
			}

			if (if_block1) if_block1.d(detaching);

			if (detaching) {
				internal.detach(if_block1_anchor);
			}
		}
	};
}

function instance$9($$self, $$props, $$invalidate) {
	let $app;

	internal.component_subscribe($$self, app, $$value => { $app = $$value; $$invalidate('$app', $app); });

	return { $app };
}

class Onboard extends internal.SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-1bsbkku-style")) add_css$9();
		internal.init(this, options, instance$9, create_fragment$9, internal.safe_not_equal, []);
	}
}

function getUserAgent() {
  var browser = bowser.getParser(window.navigator.userAgent);
  var userAgent = browser.parse().parsedResult;
  var validBrowser = browser.satisfies({
    desktop: {
      chrome: ">49",
      firefox: ">52",
      opera: ">36"
    }
  });
  app.update(function (store) {
    return _objectSpread2({}, store, {
      userAgent: userAgent
    });
  });
  state.update({
    mobileDevice: userAgent.platform.type !== "desktop",
    validBrowser: validBrowser
  });
}

function init(initialization) {
  getUserAgent();
  validateInit(initialization);

  var subscriptions = initialization.subscriptions,
      rest = _objectWithoutProperties(initialization, ["subscriptions"]);

  app.update(function (store) {
    return _objectSpread2({}, store, {}, rest, {
      blocknative: new blocknativeApi({
        dappId: initialization.dappId,
        networkId: initialization.networkId
      })
    });
  });
  new Onboard({
    target: document.body
  }); // register subscriptions

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

    if (subscriptions.provider) {
      provider.subscribe(subscriptions.provider);
    }
  }

  return {
    selectWallet: selectWallet,
    prepareWallet: prepareWallet,
    config: config,
    getState: getState
  };
}

module.exports = init;
