/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 123);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var namespace = __webpack_require__(2);
/**
 * @module {Object} can-types
 * @parent can-infrastructure
 * @description A stateful container for CanJS type information.
 *
 * @body
 *
 * ## Use
 *
 * `can-types` exports an object with placeholder functions that
 * can be used to provide default types or test if something is of a certain type.
 *
 * This is where the sausage of loose coupling modules takes place.
 * Modules that provide a type will overwrite one or multiple of these functions so
 * they take into account the new type.
 *
 * For example, `can-define/map/map` might overwrite `isMapLike` to return true
 * if the object is an instance of Map:
 *
 * ```js
 * var types = require("can-types");
 * var oldIsMapLike = types.isMapLike;
 * types.isMapLike = function(obj){
 *   return obj instanceof DefineMap || oldIsMapLike.apply(this, arguments);
 * };
 * types.DefaultMap = DefineMap;
 * ```
 */

var types = {
	/**
	 * @function can-types.isMapLike isMapLike
	 * @signature `types.isMapLike(obj)`
	 *   Returns true if `obj` is an observable key-value pair type object.
	 *
	 * @return {Boolean} `true` if the object is map like.
	 */
	isMapLike: function(){
		return false;
	},
	/**
	 * @function can-types.isListLike isListLike
	 * @signature `types.isListLike(obj)`
	 *   Returns true if `obj` is an observable list-type object with numeric keys and a length.
	 *
	 * @return {Boolean} `true` if the object is list like.
	 */
	isListLike: function(){
		return false;
	},
	/**
	 * @function can-types.isPromise isPromise
	 * @signature `types.isPromise(obj)`
	 *   Returns true if `obj` is a Promise.
	 *
	 * @return {Boolean} `true` if the object is a Promise.
	 */
	isPromise: function(obj){
		return (obj instanceof Promise || (Object.prototype.toString.call(obj) === '[object Promise]'));
	},
	/**
	 * @function can-types.isConstructor isConstructor
	 * @signature `types.isConstructor(obj)`
	 *   Returns true if `obj` looks like a constructor function to be called with `new`.
	 *
	 * @return {Boolean} `true` if the object is a constructor function.
	 */
	isConstructor: function(func){
		/* jshint unused: false */
		if(typeof func !== "function") {
			return false;
		}
		// if there are any properties on the prototype, assume it's a constructor
		for(var prop  in func.prototype) {
			return true;
		}
		// We could also check if something is returned, if it is, probably not a constructor.
		return false;
	},
	/**
	 * @function can-types.isCallableForValue isCallableForValue
	 * @signature `types.isConstructor(obj)`
	 *   Returns true if `obj` looks like a function that should be read to get a value.
	 *
	 * @return {Boolean} `true` if the object should be called for a value.
	 */
	isCallableForValue: function(obj){
		return typeof obj === "function" && !types.isConstructor(obj);
	},
	/**
	 * @function can-types.isCompute isCompute
	 * @signature `types.isCompute(obj)`
	 *   Returns true if `obj` is a [can-compute].
	 *
	 * @return {Boolean} `true` if the object is a [can-compute].
	 */
	isCompute: function(obj){
		return obj && obj.isComputed;
	},
	/**
	 * @property {Symbol} can-types.iterator iterator
	 * @option {Symbol}
	 *
	 * Used to implement an iterable object that can be used with [can-util/js/each/each]. In browsers that support for/of this will be Symbol.iterator; in older browsers it will be a string, but is still useful with [can-util/js/each/each].
	 */
	iterator: (typeof Symbol === "function" && Symbol.iterator) || "@@iterator",
	/**
	 * @property {Map} can-types.DefaultMap DefaultMap
	 *
	 * @option {Map}
	 *
	 *   The default map type to create if a map is needed.  If both [can-map] and [can-define/map/map]
	 *   are imported, the default type will be [can-define/map/map].
	 */
	DefaultMap: null,
	/**
	 * @property {can-connect.List} can-types.DefaultList DefaultList
	 *
	 * @option {can-connect.List}
	 *
	 *   The default list type to create if a list is needed. If both [can-list] and [can-define/list/list]
	 *   are imported, the default type will be [can-define/list/list].
	 */
	DefaultList: null,
	/**
	 * @function can-types.wrapElement wrapElement
	 * @signature `types.wrapElement(element)`
	 *   Wraps an element into an object useful by DOM libraries ala jQuery.
	 *
	 *   @param {Node} element Any object inheriting from the [Node interface](https://developer.mozilla.org/en-US/docs/Web/API/Node).
	 *   @return {{}} A wrapped object.
	 */
	/**
	 * @function can-types.queueTask queueTask
	 * @signature `types.queueTask(task)`
	 *   Run code that will be queued at the end of the current batch.
	 *   @param {Array} task
	 */
	queueTask: function(task){
		var args = task[2] || [];
		task[0].apply(task[1], args);
	},
	wrapElement: function(element){
		return element;
	},
	/**
	 * @function can-types.unwrapElement unwrapElement
	 * @signature `types.unwrapElement(object)`
	 *   Unwraps an object that contains an element within.
	 *
	 *   @param {{}} object Any object that can be unwrapped into a Node.
	 *   @return {Node} A Node.
	 */
	unwrapElement: function(element){
		return element;
	}
};

if (namespace.types) {
	throw new Error("You can't have two versions of can-types, check your dependencies");
} else {
	module.exports = namespace.types = types;
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* jshint maxdepth:7*/
var isArrayLike = __webpack_require__(38);
var has = Object.prototype.hasOwnProperty;
var isIterable = __webpack_require__(66);
var types = __webpack_require__(0);

function each(elements, callback, context) {
	var i = 0,
		key,
		len,
		item;
	if (elements) {
		if ( isArrayLike(elements) ) {

			for (len = elements.length; i < len; i++) {
				item = elements[i];
				if (callback.call(context || item, item, i, elements) === false) {
					break;
				}
			}
		}
		// Works in anything that implements Symbol.iterator
		else if(isIterable(elements)) {
			var iter = elements[types.iterator]();
			var res, value;

			while(!(res = iter.next()).done) {
				value = res.value;
				callback.call(context || elements, Array.isArray(value) ?
											value[1] : value, value[0]);
			}
		}
		 else if (typeof elements === "object") {
			for (key in elements) {
				if (has.call(elements, key) &&
						callback.call(context || elements[key],
													elements[key], key, elements) === false) {
					break;
				}
			}
		}
	}
	return elements;
}

module.exports = each;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/**
 * @module {function} can-util/js/assign/assign assign
 * @parent can-util/js
 * @signature `assign(target, source)`
 *
 * A simplified version of [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign), which only accepts a single source argument.
 *
 * ```js
 * var assign = require("can-util/js/assign/assign");
 *
 * var obj = {};
 *
 * assign(obj, {
 *   foo: "bar"
 * });
 *
 * console.log(obj.foo); // -> "bar"
 * ```
 *
 * @param {Object} target The destination object. This object's properties will be mutated based on the object provided as `source`.
 * @param {Object} source The source object whose own properties will be applied to `target`.
 *
 * @return {Object} Returns the `target` argument.
 */
module.exports = function (d, s) {
	for (var prop in s) {
		d[prop] = s[prop];
	}
	return d;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// # can-event
//
// Implements a basic event system that can be used with any type of object.
// In addition to adding basic event functionality, it also provides the `can.event` object
// that can be mixed into objects and prototypes.
//
// Most of the time when this is used, it will be used with the mixin:
//
// ```
// var SomeClass = Construct("SomeClass");
// assign(SomeClass.prototype, canEvent);
// ```
var domEvents = __webpack_require__(8);
var CID = __webpack_require__(14);
var isEmptyObject = __webpack_require__(22);
var domDispatch = __webpack_require__(17);
var namespace = __webpack_require__(2);
__webpack_require__(61);
__webpack_require__(92);

function makeHandlerArgs(event, args) {
    if (typeof event === 'string') {
        event = {
            type: event
        };
    }
    var handlerArgs = [event];

    // Execute handlers listening for this event.
    if(args) {
        handlerArgs.push.apply(handlerArgs, args);
    }
    return handlerArgs;
}

function getHandlers(eventName){
    var events = this.__bindEvents;
    if (!events) {
        return;
    }
    return events[eventName];
}

// ## can.event
// Create and export the `can.event` mixin
var canEvent = {
    // First define core object-based methods

    // ## can-event.addEventListener
    //
    // Adds a basic event listener to an object.
    // This consists of storing a cache of event listeners on each object,
    // that are iterated through later when events are dispatched.
    /**
     * @function can-event.addEventListener addEventListener
     * @parent can-event.static
     * @signature `obj.addEventListener(event, handler)`
     *
     * Add a basic event listener to an object.
	 *
	 * ```js
	 * var canEvent = require("can-event");
	 *
	 * var obj = {};
	 * Object.assign(obj, canEvent);
	 *
	 * obj.addEventListener("foo", function(){ ... });
	 * ```
     *
     * @param {String} event The name of the event to listen for.
     * @param {Function} handler The handler that will be executed to handle the event.
     * @return {Object} this
     *
     * @signature `canEvent.addEventListener.call(obj, event, handler)`
     *
     * This syntax can be used for objects that don't include the `canEvent` mixin.
     */
    addEventListener: function (event, handler) {
    	// Initialize event cache.
    	var allEvents = this.__bindEvents || (this.__bindEvents = {}),
    		eventList = allEvents[event] || (allEvents[event] = []);

    	// Add the event
    	eventList.push(handler);
    	return this;
    },

    // ## can-event.removeEventListener
    //
    // Removes a basic event listener from an object.
    // This removes event handlers from the cache of listened events.
    /**
     * @function can-event.removeEventListener removeEventListener
     * @parent can-event.static
     * @signature `obj.removeEventListener(event, handler)`
     *
     * Removes a basic event listener from an object.
     *
     * @param {String} event The name of the event to listen for.
     * @param {Function} handler The handler that will be executed to handle the event.
     * @return {Object} this
     *
     * @signature `canEvent.removeEventListener.call(obj, event, handler)`
     *
     * This syntax can be used for objects that don't include the [can-event] mixin.
     */
    removeEventListener: function (event, fn) {
    	if (!this.__bindEvents) {
    		return this;
    	}
    	var handlers = this.__bindEvents[event] || [],
    		i = 0,
    		handler, isFunction = typeof fn === 'function';
    	while (i < handlers.length) {
    		handler = handlers[i];
    		// Determine whether this event handler is "equivalent" to the one requested
    		// Generally this requires the same event/function, but a validation function
    		// can be included for extra conditions. This is used in some plugins like `can/event/namespace`.
    		if ( isFunction && handler === fn || !isFunction && (handler.cid === fn || !fn)) {
    			handlers.splice(i, 1);
    		} else {
    			i++;
    		}
    	}
    	return this;
    },
    // ## can-event.dispatch
    //
    // Dispatches/triggers a basic event on an object.
    /**
     * @function can-event.dispatch dispatch
     * @parent can-event.static
     * @signature `obj.dispatch(event, [args])`
     *
     * Dispatches/triggers a basic event on an object.
	 *
	 * ```js
	 * var canEvent = require("can-event");
	 *
	 * var obj = {};
	 * Object.assign(obj, canEvent);
	 *
	 * obj.addEventListener("foo", function(){
	 *   console.log("FOO BAR!");
	 * });
	 *
	 * obj.dispatch("foo"); // Causes it to log FOO BAR
	 * ```
     *
     * @param {String|Object} event The event to dispatch
     * @param {Array} [args] Additional arguments to pass to event handlers
     * @return {Object} event The resulting event object
     *
     * @signature `canEvent.dispatch.call(obj, event, args)`
     *
     * This syntax can be used for objects that don't include the `can.event` mixin.
     */
    dispatchSync: function (event, args) {
        var handlerArgs = makeHandlerArgs(event, args);
        var handlers = getHandlers.call(this, handlerArgs[0].type);

    	if(!handlers) {
    		return;
    	}
        handlers = handlers.slice(0);
        for (var i = 0, len = handlers.length; i < len; i++) {
    		handlers[i].apply(this, handlerArgs);
    	}

    	return handlerArgs[0];
    },
	// Define abstract helpers

    /**
     * @function can-event.on on
     * @parent can-event.static
     * @signature `obj.on(event, handler)`
     *
     * Add a basic event listener to an object.
     *
     * This is an alias of [can-event.addEventListener addEventListener].
     *
     * @signature `can-event.on.call(obj, event, handler)`
     *
     * This syntax can be used for objects that don't include the [can-event] mixin.
     */
    on: function(eventName, selector, handler) {
        var method = typeof selector === "string" ? "addDelegateListener" : "addEventListener";

        var listenWithDOM = domEvents.canAddEventListener.call(this);
        var eventBinder = listenWithDOM ? domEvents[method] : this[method] || canEvent[method];

        return eventBinder.apply(this, arguments);
    },

    /**
     * @function can-event.off off
     * @parent can-event.static
     * @signature `obj.off(event, handler)`
     *
     * Removes a basic event listener from an object.
     *
     * This is an alias of [can-event.removeEventListener removeEventListener].
     *
     * @signature `canEvent.off.call(obj, event, handler)`
     *
     * This syntax can be used for objects that don't include the [can-event] mixin.
     */
    off: function(eventName, selector, handler) {
        var method = typeof selector === "string" ? "removeDelegateListener" : "removeEventListener";

        var listenWithDOM = domEvents.canAddEventListener.call(this);
        var eventBinder = listenWithDOM ? domEvents[method] : this[method] || canEvent[method];

        return eventBinder.apply(this, arguments);
    },
    /**
     * @function can-event.trigger trigger
     * @parent can-event.static
     * @signature `obj.trigger(event, args)`
     *
     * Dispatches/triggers a basic event on an object.
     * This is an alias of [can-event.dispatch dispatch].
     *
     * @signature `canEvent.trigger.call(obj, event, args)`
     *
     * This syntax can be used for objects that don't include the [can-event] mixin.
     */
    trigger: function(){
        var listenWithDOM = domEvents.canAddEventListener.call(this);
        var dispatch = listenWithDOM ? domDispatch : canEvent.dispatch;

        return dispatch.apply(this, arguments);
    },

    // ## can-event.one
    //
    // Adds a basic event listener that listens to an event once and only once.
    /**
     * @function can-event.one one
     * @parent can-event.static
     * @signature `obj.one(event, handler)`
     *
     * Adds a basic event listener that listens to an event once and only once.
     *
     * @param {String} event The name of the event to listen for.
     * @param {Function} handler The handler that will be executed to handle the event.
     * @return {Object} this
     */
    one: function(event, handler) {
    	// Unbind the listener after it has been executed
    	var one = function() {
    		canEvent.off.call(this, event, one);
    		return handler.apply(this, arguments);
    	};

    	// Bind the altered listener
    	canEvent.on.call(this, event, one);
    	return this;
    },

    // self listener methods
    // ## can-event.listenTo
    //
    // Listens to an event without know how bind is implemented.
    // The primary use for this is to listen to another's objects event while
    // tracking events on the local object (similar to namespacing).
    //
    // The API was heavily influenced by BackboneJS: http://backbonejs.org/
    /**
     * @function can-event.listenTo listenTo
     * @parent can-event.static
     * @signature `obj.listenTo(other, event, handler)`
     *
     * Listens for an event on another object.
     * This is similar to concepts like event namespacing, except that the namespace
     * is the scope of the calling object.
     *
     * @param {Object} other The object to listen for events on.
     * @param {String} event The name of the event to listen for.
     * @param {Function} handler The handler that will be executed to handle the event.
     * @return {Object} this
     *
     * @signature `canEvent.listenTo.call(obj, other, event, handler)`
     *
     * This syntax can be used for objects that don't include the [can-event] mixin.
     */
    listenTo: function (other, event, handler) {
    	// Initialize event cache
    	var idedEvents = this.__listenToEvents;
    	if (!idedEvents) {
    		idedEvents = this.__listenToEvents = {};
    	}

    	// Identify the other object
    	var otherId = CID(other);
    	var othersEvents = idedEvents[otherId];

    	// Create a local event cache
    	if (!othersEvents) {
    		othersEvents = idedEvents[otherId] = {
    			obj: other,
    			events: {}
    		};
    	}
    	var eventsEvents = othersEvents.events[event];
    	if (!eventsEvents) {
    		eventsEvents = othersEvents.events[event] = [];
    	}

    	// Add the event, both locally and to the other object
    	eventsEvents.push(handler);
    	canEvent.on.call(other, event, handler);
    },
    // ## can-event.stopListening
    //
    // Stops listening for events on other objects
    /**
     * @function can-event.stopListening stopListening
     * @parent can-event.static
     * @signature `obj.stopListening(other, event, handler)`
     *
     * Stops listening for an event on another object.
     *
     * @param {Object} other The object to listen for events on.
     * @param {String} event The name of the event to listen for.
     * @param {Function} handler The handler that will be executed to handle the event.
     * @return {Object} this
     *
     * @signature `canEvent.stopListening.call(obj, other, event, handler)`
     *
     * This syntax can be used for objects that don't include the [can-event] mixin.
     */
    stopListening: function (other, event, handler) {
    	var idedEvents = this.__listenToEvents,
    		iterIdedEvents = idedEvents,
    		i = 0;
    	if (!idedEvents) {
    		return this;
    	}
    	if (other) {
    		var othercid = CID(other);
    		(iterIdedEvents = {})[othercid] = idedEvents[othercid];
    		// you might be trying to listen to something that is not there
    		if (!idedEvents[othercid]) {
    			return this;
    		}
    	}

    	// Clean up events on the other object
    	for (var cid in iterIdedEvents) {
    		var othersEvents = iterIdedEvents[cid],
    			eventsEvents;
    		other = idedEvents[cid].obj;

    		// Find the cache of events
    		if (!event) {
    			eventsEvents = othersEvents.events;
    		} else {
    			(eventsEvents = {})[event] = othersEvents.events[event];
    		}

    		// Unbind event handlers, both locally and on the other object
    		for (var eventName in eventsEvents) {
    			var handlers = eventsEvents[eventName] || [];
    			i = 0;
    			while (i < handlers.length) {
    				if (handler && handler === handlers[i] || !handler) {
    					canEvent.off.call(other, eventName, handlers[i]);
    					handlers.splice(i, 1);
    				} else {
    					i++;
    				}
    			}
    			// no more handlers?
    			if (!handlers.length) {
    				delete othersEvents.events[eventName];
    			}
    		}
    		if (isEmptyObject(othersEvents.events)) {
    			delete idedEvents[cid];
    		}
    	}
    	return this;
    }

};

// add aliases
/**
 * @function can-event.bind bind
 * @parent can-event.static
 * @signature `obj.bind(event, handler)`
 *
 * Add a basic event listener to an object.
 *
 * This is an alias of [can-event.addEventListener addEventListener].
 *
 * @signature `canEvent.bind.call(obj, event, handler)`
 *
 * This syntax can be used for objects that don't include the [can-event] mixin.
 */
canEvent.addEvent = canEvent.bind = function(){
    // Use a wrapping function so `addEventListener`'s behavior can change.
    return canEvent.addEventListener.apply(this, arguments);
};
/**
 * @function can-event.unbind unbind
 * @parent can-event.static
 * @signature `obj.unbind(event, handler)`
 *
 * Removes a basic event listener from an object.
 *
 * This is an alias of [can-event.removeEventListener removeEventListener].
 *
 * @signature `canEvent.unbind.call(obj, event, handler)`
 *
 * This syntax can be used for objects that don't include the [can-event] mixin.
 */
canEvent.unbind =  canEvent.removeEvent = function(){
    return canEvent.removeEventListener.apply(this, arguments);
};
/**
 * @function can-event.delegate delegate
 * @parent can-event.static
 * @signature `obj.delegate(selector, event, handler)`
 *
 * Provides a compatibility layer for adding delegate event listeners.
 * This doesn't actually implement delegates, but rather allows
 * logic that assumes a delegate to still function.
 *
 * Therefore, this is essentially an alias of [can-event.addEventListener addEventListener] with the selector ignored.
 *
 * @param {String} selector The **ignored** selector to use for the delegate.
 * @param {String} event The name of the event to listen for.
 * @param {Function} handler The handler that will be executed to handle the event.
 * @return {Object} this
 *
 * @signature `canEvent.delegate.call(obj, selector, event, handler)`
 *
 * This syntax can be used for objects that don't include the [can.event] mixin.
 */
canEvent.delegate = canEvent.on;

/**
 * @function can-event.undelegate undelegate
 * @parent can-event.static
 * @signature `obj.undelegate(selector, event, handler)`
 *
 * Provides a compatibility layer for removing delegate event listeners.
 * This doesn't actually implement delegates, but rather allows
 * logic that assumes a delegate to still function.
 *
 * Therefore, this is essentially an alias of [can-event.removeEventListener removeEventListener] with the selector ignored.
 *
 * @param {String} selector The **ignored** selector to use for the delegate.
 * @param {String} event The name of the event to listen for.
 * @param {Function} handler The handler that will be executed to handle the event.
 * @return {Object} this
 *
 * @signature `canEvent.undelegate.call(obj, selector, event, handler)`
 *
 * This syntax can be used for objects that don't include the [can-event] mixin.
 */
canEvent.undelegate = canEvent.off;

canEvent.dispatch = canEvent.dispatchSync;



Object.defineProperty(canEvent, "makeHandlerArgs",{
    enumerable: false,
    value: makeHandlerArgs
});

Object.defineProperty(canEvent,"handlers", {
    enumerable: false,
    value: getHandlers
});
Object.defineProperty(canEvent,"flush", {
    enumerable: false,
    writable: true,
    value: function(){}
});

module.exports = namespace.event = canEvent;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(13);

/**
 * @module {function} can-util/dom/document/document document
 * @parent can-util/dom
 * @signature `document(document)`
 *
 * @param {Object} document An optional document-like object 
 * to set as the context's document
 *
 * Optionally sets, and returns, the document object for the context.
 *
 * ```js
 * var documentShim = { getElementById() {...} };
 * var domDocument = require("can-util/dom/document/document");
 * domDocument(documentShim);
 *
 * ...
 *
 * domDocument().getElementById("foo");
 * ```
 */
var setDocument;
module.exports = function(setDoc){
	if(setDoc) {
		setDocument = setDoc;
	}
	return setDocument || global().document;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var canLog = __webpack_require__(18);

/**
 * @module {{}} can-util/js/dev/dev dev
 * @parent can-util/js
 *
 * Utilities for logging development-mode messages. Use this module for
 * anything that should be shown to the user during development but isn't
 * needed in production. In production these functions become noops.
 */
module.exports = {
	warnTimeout: 5000,
	logLevel: 0,
	/**
	 * @function can-util/js/dev/dev.stringify stringify
	 * @parent can-util/js/dev/dev
	 * @description
	 *
	 * JSON stringifies a value, but unlike JSON, will output properties with
	 * a value of `undefined` (e.g. `{ "prop": undefined }`, not `{}`).
	 *
	 * ```
	 * var dev = require('can-util/js/dev/dev');
	 * var query = { where: undefined };
	 * 
	 * dev.warn('No records found: ' + dev.stringify(query));
	 * ```
	 *
	 * @signature `dev.stringify(value)`
	 * @param {Any} value A value to stringify.
	 * @return {String} A stringified representation of the passed in value.
	 */
	stringify: function(value) {
		var flagUndefined = function flagUndefined(key, value) {
			return value === undefined ?
				 "/* void(undefined) */" : value;
		};
		
		return JSON.stringify(value, flagUndefined, "  ").replace(
			/"\/\* void\(undefined\) \*\/"/g, "undefined");
	},
	/**
	 * @function can-util/js/dev/dev.warn warn
	 * @parent can-util/js/dev/dev
	 * @description
	 *
	 * Adds a warning message to the console.
	 *
	 * ```
	 * var dev = require('can-util/js/dev/dev');
	 * 
	 * dev.warn("something evil");
	 * ```
	 *
	 * @signature `dev.warn(msg)`
	 * @param {String} msg The warning message.
	 */
	warn: function() {
		//!steal-remove-start
		canLog.warn.apply(this, arguments);
		//!steal-remove-end
	},
	/**
	 * @function can-util/js/dev/dev.log log
	 * @parent can-util/js/dev/dev
	 * @description
	 *
	 * Adds a message to the console.
	 *
	 * ```
	 * var dev = require('can-util/js/dev/dev');
	 * 
	 * dev.log("hi");
	 * ```
	 *
	 * @signature `dev.log(msg)`
	 * @param {String} msg The message.
	 */
	log: function() {
		//!steal-remove-start
		canLog.log.apply(this, arguments);
		//!steal-remove-end
	},
	/**
	 * @function can-util/js/dev/dev.error error
	 * @parent can-util/js/dev/dev
	 * @description
	 *
	 * Adds an error message to the console.
	 *
	 * ```
	 * var dev = require("can-util/js/dev/dev");
	 * 
	 * dev.error(new Error("Oh no!"));
	 * ```
	 *
	 * @signature `dev.error(err)`
	 * @param {String|Error} err The error to be logged.
	 */
	error: function() {
		//!steal-remove-start
		canLog.error.apply(this, arguments);
		//!steal-remove-end
	},
	_logger: canLog._logger
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// # can-observation - nice
//
// This module:
//
// Exports a function that calls an arbitrary function and binds to any observables that
// function reads. When any of those observables change, a callback function is called.
//
// And ...
//
// Adds two main methods to can:
//
// - can.__observe - All other observes call this method to be visible to computed functions.
// - can.__notObserve - Returns a function that can not be observed.
__webpack_require__(4);

var canEvent = __webpack_require__(4);
var canBatch = __webpack_require__(11);
var assign = __webpack_require__(3);
var namespace = __webpack_require__(2);
var canLog = __webpack_require__(18);

/**
 * @module {constructor} can-observation
 * @parent can-infrastructure
 * @group can-observation.prototype prototype
 * @group can-observation.static static
 * @group can-observation.types types
 * @package ./package.json
 *
 * Provides a mechanism to notify when an observable has been read and a
 * way to observe those reads called within a given function.
 *
 * @signature `new Observation(func, context, compute)`
 *
 * Creates an observation of a given function called with `this` as
 * a given context. Calls back `compute` when the return value of `func` changes.
 *
 * @param {function} func The function whose value is being observed.
 * @param {*} context What `this` should be when `func` is called.
 * @param {function(*,*,Number)|can-compute} updated(newValue, oldValue, batchNum) A function to call when `func`'s return value changes.
 *
 * @body
 *
 * ## Use
 *
 * Instances of `Observation` are rarely created directly.  Instead, use [can-compute]'s more friendly API to
 * observe when a function's value changes. [can-compute] uses `can-observation` internally.
 *
 * `Observation`'s static methods like: [can-observation.add], [can-observation.ignore], and [can-observation.trap]
 * are used more commonly to control which observable events a compute will listen to.
 *
 * To use `can-observation` directly, create something observable (supports `addEventListener`) and
 * calls [can-observation.add] like:
 *
 * ```js
 * var Observation = require("can-observation");
 * var assign = require("can-util/js/assign/assign");
 * var canEvent = require("can-event");
 *
 * var me = assign({}, canEvent);
 *
 * var name = "Justin";
 * Object.defineProperty(me,"name",{
 *   get: function(){
 *     Observation.add(this,"name");
 *     return name;
 *   },
 *   set: function(newVal) {
 *     var oldVal = name;
 *     name = newVal;
 *     this.dispatch("name", newVal, oldVal);
 *   }
 * })
 * ```
 *
 * Next, create an observation instance with a function that reads the observable value:
 *
 * ```js
 * var observation = new Observation(function(){
 *   return "Hello "+me.name;
 * }, null, function(newVal, oldVal, batchNum){
 *   console.log(newVal);
 * })
 * ```
 *
 * Finally, call `observation.start()` to start listening and be notified of changes:
 *
 * ```js
 * observation.start();
 * observation.value   //-> "Hello Justin";
 * me.name = "Ramiya"; // console.logs -> "Hello Ramiya"
 * ```
 */

function Observation(func, context, compute){
	this.newObserved = {};
	this.oldObserved = null;
	this.func = func;
	this.context = context;
	this.compute = compute.updater ? compute : {updater: compute};
	this.onDependencyChange = this.onDependencyChange.bind(this);
	this.childDepths = {};
	this.ignore = 0;
	this.needsUpdate= false;
}

// ### observationStack
//
// This is the stack of all `observation` objects that are the result of
// recursive `getValueAndBind` calls.
// `getValueAndBind` can indirectly call itself anytime a compute reads another
// compute.
//
// An `observation` entry looks like:
//
//     {
//       observed: {
//         "map1|first": {obj: map, event: "first"},
//         "map1|last" : {obj: map, event: "last"}
//       },
//       names: "map1|firstmap1|last"
//     }
//
// Where:
// - `observed` is a map of `"cid|event"` to the observable and event.
//   We use keys like `"cid|event"` to quickly identify if we have already observed this observable.
// - `names` is all the keys so we can quickly tell if two observation objects are the same.
var observationStack = [];
// expose the obseravation stack
Observation.observationStack = observationStack;

var remaining = {updates: 0, notifications: 0};
// expose the remaining state
Observation.remaining = remaining;

assign(Observation.prototype,{
	// something is reading the value of this compute
	get: function(){
		if(this.bound) {
			// Flush events so this compute should have been notified.
			// But we want not only update
			canEvent.flush();
			// we've already got a value.  However, it might be possible that
			// something else is going to read this that has a lower "depth".
			// We might be updating, so we want to make sure that before we give
			// the outer compute a value, we've had a change to update.;
			if(remaining.updates) {
				Observation.updateChildrenAndSelf(this);
			}


			return this.value;
		} else {
			return this.func.call(this.context);
		}
	},
	getPrimaryDepth: function() {
		return this.compute._primaryDepth || 0;
	},
	addEdge: function(objEv){
		objEv.obj.addEventListener(objEv.event, this.onDependencyChange);
		if(objEv.obj.observation) {
			this.depth = null;
		}
	},
	removeEdge: function(objEv){
		objEv.obj.removeEventListener(objEv.event, this.onDependencyChange);
		if(objEv.obj.observation) {
			this.depth = null;
		}
	},
	dependencyChange: function(ev){
		if(this.bound) {
			// Only need to register once per batchNum
			if(ev.batchNum !== this.batchNum) {
				Observation.registerUpdate(this, ev.batchNum);
				this.batchNum = ev.batchNum;
			}
		}
	},
	onDependencyChange: function(ev, newVal, oldVal){
		this.dependencyChange(ev, newVal, oldVal);
	},
	update: function(batchNum){
		if(this.needsUpdate) {
			remaining.updates--;
		}
		this.needsUpdate = false;
		if(this.bound) {
			// Keep the old value.
			var oldValue = this.value;
			this.oldValue = null;
			// Get the new value and register this event handler to any new observables.
			this.start();
			if(oldValue !== this.value) {
				this.compute.updater(this.value, oldValue, batchNum);
				return true;
			}
		}
	},
	getValueAndBind: function() {
		canLog.warn("can-observation: call start instead of getValueAndBind");
		return this.start();
	},
	// ## getValueAndBind
	// Calls `func` with "this" as `context` and binds to any observables that
	// `func` reads. When any of those observables change, `onchanged` is called.
	// `oldObservation` is A map of observable / event pairs this function used to be listening to.
	// Returns the `newInfo` set of listeners and the value `func` returned.
	/**
	 * @function can-observation.prototype.start start
	 * @parent can-observation.prototype prototype
	 *
	 * @signature `observation.start()`
	 *
	 * Starts observing changes and adds event listeners. [can-observation.prototype.value] will
	 * be available.
	 *
	 */
	start: function(){
		this.bound = true;
		this.oldObserved = this.newObserved || {};
		this.ignore = 0;
		this.newObserved = {};

		// Add this function call's observation to the stack,
		// runs the function, pops off the observation, and returns it.

		observationStack.push(this);
		this.value = this.func.call(this.context);
		observationStack.pop();
		this.updateBindings();
	},
	// ### updateBindings
	// Unbinds everything in `oldObserved`.
	updateBindings: function(){
		var newObserved = this.newObserved,
			oldObserved = this.oldObserved,
			name,
			obEv;

		for (name in newObserved) {
			obEv = newObserved[name];
			if(!oldObserved[name]) {
				this.addEdge(obEv);
			} else {
				oldObserved[name] = null;
			}
		}
		for (name in oldObserved) {
			obEv = oldObserved[name];
			if(obEv) {
				this.removeEdge(obEv);
			}
		}
	},
	teardown: function(){
		canLog.warn("can-observation: call stop instead of teardown");
		return this.stop();
	},
	/**
	 * @function can-observation.prototype.stop stop
	 * @parent can-observation.prototype prototype
	 *
	 * @signature `observation.stop()`
	 *
	 * Stops observing changes and removes all event listeners.
	 *
	 */
	stop: function(){
		// track this because events can be in the queue.
		this.bound = false;
		for (var name in this.newObserved) {
			var ob = this.newObserved[name];
			this.removeEdge(ob);
		}
		this.newObserved = {};
	}
	/**
	 * @property {*} can-observation.prototype.value
	 *
	 * The return value of the function once [can-observation.prototype.start] is called.
	 *
	 */
});

/**
 * @typedef {{}} can-observation.observed Observed
 * @parent can-observation.types
 *
 * @description
 *
 * An object representing an observation.
 *
 * ```js
 * { "obj": map, "event": "prop1" }
 * ```
 *
 * @option {Object} obj The observable object
 * @option {String} event The event, or more likely property, that is being observed.
 */


var updateOrder = [],
	// the min registered primary depth, this is also the next to be executed.
	curPrimaryDepth = Infinity,
	// the max registered primary depth
	maxPrimaryDepth = 0,
	currentBatchNum,
	isUpdating = false;


var updateUpdateOrder = function(observation){
	var primaryDepth = observation.getPrimaryDepth();

	if(primaryDepth < curPrimaryDepth) {
		curPrimaryDepth = primaryDepth;
	}
	if(primaryDepth > maxPrimaryDepth) {
		maxPrimaryDepth = primaryDepth;
	}

	var primary = updateOrder[primaryDepth] ||
		(updateOrder[primaryDepth] = []);


	return primary;
};

Observation.registerUpdate = function(observation, batchNum){
	// mark as needing an update
	if( observation.needsUpdate ) {
		return;
	}
	remaining.updates++;
	observation.needsUpdate = true;

	var objs = updateUpdateOrder(observation);

	objs.push(observation);
};



// This picks the observation with the smallest "depth" and
// calls update on it (`currentObservation`).
// If the `currentObservation` reads another observation with a higher depth (`deeperObservation`),
// the `deeperObservation` will be updated (via `updateUntil`).
// If the `currentObservation` reads another observation with a higher primary depth (`deeperPrimaryObservation`),
// the `deeperPrimaryObservation` will be updated, but not have its callback called
var afterCallbacks = [];
/* jshint maxdepth:7*/
Observation.updateAndNotify = function(ev, batchNum){
	currentBatchNum = batchNum;
	if(isUpdating){
		// only allow access at one time to this method.
		// This is because when calling .update ... that compute should be only able
		// to cause updates to other computes it directly reads.  It's possible that
		// reading other computes could call `updateAndNotify` again.
		// If we didn't return, it's possible that other computes could update unrelated to the
		// execution flow of the current compute being updated.  This would be very unexpected.
		return;
	}
	isUpdating = true;
	while(true) {
		if( curPrimaryDepth <= maxPrimaryDepth ) {
			var primary = updateOrder[curPrimaryDepth];
			var lastUpdate = primary && primary.pop();
			if(lastUpdate) {
				lastUpdate.update(currentBatchNum);
			} else {
				curPrimaryDepth++;
			}
		} else {
			updateOrder = [];
			curPrimaryDepth = Infinity;
			maxPrimaryDepth = 0;
			isUpdating = false;
			var afterCB = afterCallbacks;
			afterCallbacks = [];
			afterCB.forEach(function(cb){
				cb();
			});
			return;
		}
	}
};
canEvent.addEventListener.call(canBatch,"batchEnd", Observation.updateAndNotify);

Observation.afterUpdateAndNotify = function(callback){
	canBatch.after(function(){
		// here we know that the events have been fired, everything should
		// be notified. Now we have to wait until all computes have
		// finished firing.
		if(isUpdating) {
			afterCallbacks.push(callback);
		} else {
			callback();
		}
	});
};


// This is going to recursively check if there's any child compute
// that .needsUpdate.
// If there is, we'll update every parent on the way to ourselves.
Observation.updateChildrenAndSelf = function(observation){
	// check if there's children that .needsUpdate
	if(observation.needsUpdate) {
		return Observation.unregisterAndUpdate(observation);
	}
	var childHasChanged;
	for(var prop in observation.newObserved) {
		if(observation.newObserved[prop].obj.observation) {
			if( Observation.updateChildrenAndSelf(observation.newObserved[prop].obj.observation) ) {
				childHasChanged = true;
			}
		}
	}
	if(childHasChanged) {
		return observation.update(currentBatchNum);
	}
};
// the problem with updateTo(observation)
// is that that the read might never change
// but the reader might be changing, and wont update itself, but something
// else will
Observation.unregisterAndUpdate = function(observation){
	var primaryDepth = observation.getPrimaryDepth();
	var primary = updateOrder[primaryDepth];
	if(primary) {

		var index = primary.indexOf(observation);
		if(index !== -1) {
			primary.splice(index,1);
		}

	}
	return observation.update(currentBatchNum);
};



/**
 * @function can-observation.add add
 * @parent can-observation.static
 *
 * Signals that an object's property is being observed, so that any functions
 * that are recording observations will see that this object is a dependency.
 *
 * @signature `Observation.add(obj, event)`
 *
 * Signals that an event should be observed. Adds the observable being read to
 * the top of the stack.
 *
 * ```js
 * Observation.add(obj, "prop1");
 * ```
 *
 * @param {Object} obj An observable object which is being observed.
 * @param {String} event The name of the event (or property) that is being observed.
 *
 */
Observation.add = function (obj, event) {
	var top = observationStack[observationStack.length-1];
	if (top && !top.ignore) {
		var evStr = event + "",
			name = obj._cid + '|' + evStr;

		if(top.traps) {
			top.traps.push({obj: obj, event: evStr, name: name});
		}
		else {
			top.newObserved[name] = {
				obj: obj,
				event: evStr
			};
		}
	}
};

/**
 * @function can-observation.addAll addAll
 * @parent can-observation.static
 * @signature `Observation.addAll(observes)`
 *
 * The same as `Observation.add` but takes an array of [can-observation.observed] objects.
 * This will most often by used in coordination with [can-observation.trap]:
 *
 * ```js
 * var untrap = Observation.trap();
 *
 * Observation.add(obj, "prop3");
 *
 * var traps = untrap();
 * Oservation.addAll(traps);
 * ```
 *
 * @param {Array<can-observation.observed>} observes An array of [can-observation.observed]s.
 */
Observation.addAll = function(observes){
	// a bit more optimized so we don't have to repeat everything in
	// Observation.add
	var top = observationStack[observationStack.length-1];
	if (top) {
		if(top.traps) {
			top.traps.push.apply(top.traps, observes);
		} else {
			for(var i =0, len = observes.length; i < len; i++) {
				var trap = observes[i],
					name = trap.name;

				if(!top.newObserved[name]) {
					top.newObserved[name] = trap;
				}
			}
		}

	}
};

/**
 * @function can-observation.ignore ignore
 * @parent can-observation.static
 * @signature `Observation.ignore(fn)`
 *
 * Creates a function that, when called, will prevent observations from
 * being applied.
 *
 * ```js
 * var fn = Observation.ignore(function(){
 *   // This will be ignored
 *   Observation.add(obj, "prop1");
 * });
 *
 * fn();
 * Observation.trapCount(); // -> 0
 * ```
 *
 * @param {Function} fn Any function that contains potential calls to
 * [Observation.add].
 *
 * @return {Function} A function that is free of observation side-effects.
 */
Observation.ignore = function(fn){
	return function(){
		if (observationStack.length) {
			var top = observationStack[observationStack.length-1];
			top.ignore++;
			var res = fn.apply(this, arguments);
			top.ignore--;
			return res;
		} else {
			return fn.apply(this, arguments);
		}
	};
};


/**
 * @function can-observation.trap trap
 * @parent can-observation.static
 * @signature `Observation.trap()`
 *
 * Trap all observations until the `untrap` function is called. The state of
 * traps prior to `Observation.trap()` will be restored when `untrap()` is called.
 *
 * ```js
 * var untrap = Observation.trap();
 *
 * Observation.add(obj, "prop1");
 *
 * var traps = untrap();
 * console.log(traps[0].obj === obj); // -> true
 * ```
 *
 * @return {can-observation.getTrapped} A function to get the trapped observations.
 */
Observation.trap = function(){
	if (observationStack.length) {
		var top = observationStack[observationStack.length-1];
		var oldTraps = top.traps;
		var traps = top.traps = [];
		return function(){
			top.traps = oldTraps;
			return traps;
		};
	} else {
		return function(){return [];};
	}
};
/**
 * @typedef {function} can-observation.getTrapped getTrapped
 * @parent can-observation.types
 *
 * @signature `getTrapped()`
 *
 *   Returns the trapped observables captured by [can-observation.trap].
 *
 *   @return {Array<can-observation.observed>}
 */

Observation.trapsCount = function(){
	if (observationStack.length) {
		var top = observationStack[observationStack.length-1];
		return top.traps.length;
	} else {
		return 0;
	}
};
// sets an array of observable notifications on the current top of the observe stack.

/**
 * @function can-observation.isRecording isRecording
 * @parent can-observation.static
 * @signature `Observation.isRecording()`
 *
 * Returns if some function is in the process of recording observes.
 *
 * @return {Boolean} True if a function is in the process of recording observes.
 */
Observation.isRecording = function(){
	var len = observationStack.length;
	var last = len && observationStack[len-1];
	return last && (last.ignore === 0) && last;
};

if (namespace.Observation) {
	throw new Error("You can't have two versions of can-observation, check your dependencies");
} else {
	module.exports = namespace.Observation = Observation;
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _document = __webpack_require__(5);
var isBrowserWindow = __webpack_require__(100);
var isPlainObject = __webpack_require__(39);
var fixSyntheticEventsOnDisabled = false;

function isDispatchingOnDisabled(element, ev) {
	var isInsertedOrRemoved = isPlainObject(ev) ? (ev.type === 'inserted' || ev.type === 'removed') : (ev === 'inserted' || ev === 'removed');
	var isDisabled = !!element.disabled;
	return isInsertedOrRemoved && isDisabled;
}
/**
 * @module {{}} can-util/dom/events/events events
 * @parent can-util/dom
 * @description Allows you to listen to a domEvent and special domEvents as well as dispatch domEvents.
 *
 * ```js
 * var domEvents = require("can-util/dom/events/events");
 * ```
 */
module.exports = {
	addEventListener: function(){
		this.addEventListener.apply(this, arguments);
	},
	removeEventListener: function(){
		this.removeEventListener.apply(this, arguments);
	},
	canAddEventListener: function(){
		return (this.nodeName && (this.nodeType === 1 || this.nodeType === 9)) || this === window;
	},
	dispatch: function(event, args, bubbles){
		var ret;
		var dispatchingOnDisabled = fixSyntheticEventsOnDisabled && isDispatchingOnDisabled(this, event);

		var doc = this.ownerDocument || _document();
		var ev = doc.createEvent('HTMLEvents');
		var isString = typeof event === "string";

		// removed / inserted events should not bubble
		ev.initEvent(isString ? event : event.type, bubbles === undefined ? true : bubbles, false);

		if(!isString) {
			for (var prop in event) {
				if (ev[prop] === undefined) {
					ev[prop] = event[prop];
				}
			}
		}
		ev.args = args;
		if(dispatchingOnDisabled) {
			this.disabled = false;
		}
		ret = this.dispatchEvent(ev);
		if(dispatchingOnDisabled) {
			this.disabled = true;
		}
		return ret;
	}
};

// In FireFox, dispatching a synthetic event on a disabled element throws an error.
// Other browsers, like IE 10 do not dispatch synthetic events on disabled elements at all.
// This determines if we have to work around that when dispatching events.
// https://bugzilla.mozilla.org/show_bug.cgi?id=329509
(function() {
	if(!isBrowserWindow()) {
		return;
	}

	var testEventName = 'fix_synthetic_events_on_disabled_test';
	var input = document.createElement("input");
	input.disabled = true;
	var timer = setTimeout(function() {
		fixSyntheticEventsOnDisabled = true;
	}, 50);
	var onTest = function onTest (){
		clearTimeout(timer);
		module.exports.removeEventListener.call(input, testEventName, onTest);
	};
	module.exports.addEventListener.call(input, testEventName, onTest);
	try {
		module.exports.dispatch.call(input, testEventName, [], false);
	} catch(e) {
		onTest();
		fixSyntheticEventsOnDisabled = true;
	}
})();


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* jshint maxdepth:7*/

// # can.compute
//
// `can.compute` allows the creation of observable values in different forms.
// This module is now just a facade around [proto_compute.js](proto_compute.html).
// `proto_compute.js` provides `can.Compute` as a constructor function where this file,
// `compute.js` wraps an instance of a `can.Compute` with a function.
//
// Other files:
// - [get_value_and_bind.js](get_value_and_bind.js) provides the low-level utility for observing functions.
// - [read.js](read.html) provides a helper that read properties and values in an observable way.


__webpack_require__(4);
__webpack_require__(11);

var Compute = __webpack_require__(82);
var CID = __webpack_require__(14);
var namespace = __webpack_require__(2);

// The `can.compute` generator function.


var addEventListener = function(ev, handler){
	var compute = this;
	var computeHandler = handler && handler[compute.handlerKey];
	if(handler && !computeHandler) {
		computeHandler = handler[compute.handlerKey] = function() {
			handler.apply(compute, arguments);
		};
	}

	return compute.computeInstance.addEventListener(ev, computeHandler);
};

var removeEventListener = function(ev, handler){
	var compute = this;

	var computeHandler = handler && handler[compute.handlerKey];

	if(computeHandler) {
		delete handler[compute.handlerKey];
		return compute.computeInstance.removeEventListener(ev, computeHandler);
	}
	return compute.computeInstance.removeEventListener.apply(compute.computeInstance, arguments);
};


var COMPUTE = function (getterSetter, context, eventName, bindOnce) {

	function compute(val) {
		if(arguments.length) {
			return compute.computeInstance.set(val);
		}

		return compute.computeInstance.get();
	}
	var cid = CID(compute, 'compute');

	// Create an internal `can.Compute`.
	compute.computeInstance = new Compute(getterSetter, context, eventName, bindOnce);

	compute.handlerKey = '__handler' + cid;
	compute.on = compute.bind = compute.addEventListener = addEventListener;
	compute.off = compute.unbind = compute.removeEventListener = removeEventListener;

	compute.isComputed = compute.computeInstance.isComputed;

	compute.clone = function(ctx) {
		if(typeof getterSetter === 'function') {
			context = ctx;
		}
		return COMPUTE(getterSetter, context, ctx, bindOnce);
	};

	return compute;
};

// ## Helpers

// ### truthy
// Wraps a compute with another compute that only changes when
// the wrapped compute's `truthiness` changes.
COMPUTE.truthy = function (compute) {
	return COMPUTE(function () {
		var res = compute();
		return !!res;
	});
};

// ### async
// A simple helper that makes an async compute a bit easier.
COMPUTE.async = function(initialValue, asyncComputer, context){
	return COMPUTE(initialValue, {
		fn: asyncComputer,
		context: context
	});
};

// ### compatability
// Setting methods that should not be around in 3.0.
COMPUTE.temporarilyBind = Compute.temporarilyBind;

module.exports = namespace.compute = COMPUTE;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var domDataCore = __webpack_require__(47);
var mutationDocument = __webpack_require__(64);

var deleteNode = function() {
	return domDataCore.delete.call(this);
};

// count of distinct elements that have domData set
var elementSetCount = 0;

var cleanupDomData = function(node) {
	// decrement count if node was deleted
	elementSetCount -= deleteNode.call(node) ? 1 : 0;

	// remove handler once all domData has been cleaned up
	if (elementSetCount === 0) {
		mutationDocument.offAfterRemovedNodes(cleanupDomData);
	}
};

/**
 * @module {{}} can-util/dom/data/data data
 * @parent can-util/dom
 * @description Allows associating data as a key/value pair for a particular
 * DOM Node.
 *
 * ```js
 * var domData = require("can-util/dom/data/data");
 * ```
 */
module.exports = {
	/**
	 * @function can-util/dom/data/data.getCid domData.getCid
	 * @signature `domData.getCid.call(el)`
	 * @return {Number} The value of the element's unique CID
	 *
	 * Return the previously set unique identifier for the dom node.
	 */
	getCid: domDataCore.getCid,
	/**
	 * @function can-util/dom/data/data.cid domData.cid
	 * @signature `domData.cid.call(el)`
	 * @return {Number} The value of the element's unique CID
	 *
	 * Set a unique identifier for the dom node, using the
	 * [can-util/dom/data/data.expando expando] property.
	 *
	 * @body
	 *
	 * If a unique cid value has not yet been set for this element, set it
	 * using the [can-util/dom/data/data.expando expando] property.  Return the
	 * unique cid whether or not it is newly set
	 */
	cid: domDataCore.cid,
	/**
	 * @property can-util/dom/data/data.expando domData.expando
	 * @type {String}
	 *
	 * The key in which elements' cids are stored
	 */
	expando: domDataCore.expando,
	/**
	 * @function can-util/dom/data/data.clean domData.clean
	 * @param  {String} prop the property to remove from the element's data
	 * @signature `domData.clean.call(el, key)`
	 *
	 * Remove data from an element previously added by [can-util/dom/data/data.set set]
	 *
	 * ```js
	 * var domData = require("can-util/dom/data/data");
	 * 
	 * domData.clean.call(el, "metadata");
	 * ```
	 */
	clean: domDataCore.clean,
	/**
	 * @function can-util/dom/data/data.get domData.get
	 * @signature `domData.get.call(el, key)`
	 *
	 * Get data that was stored in a DOM Node using the specified `key`.
	 *
	 * ```js
	 * var domData = require("can-util/dom/data/data");
	 * 
	 * var metadata = domData.get.call(el, "metadata");
	 * ```
	 *
	 * @param {String} key A string used as a unique key for storing data associated with this DOM Node.
	 */
	get: domDataCore.get,
	/**
	 * @function can-util/dom/data/data.set domData.set
	 * @signature `domData.set.call(el, name, value)`
	 *
	 * @param {String} name the key to store the value under
	 * @param {*} value     the value to store under the key
	 *
	 * Set data to be associated with a DOM Node using the specified `key`. If data already exists for this key, it will be overwritten.
	 *
	 * ```js
	 * var domData = require("can-util/dom/data/data");
	 * 
	 * domData.set.call(el, "metadata", {
	 *   foo: "bar"
	 * });
	 * ```
	 */
	set: function(name, value) {
		// set up handler to clean up domData when elements are removed
		// handler only needs to be set up the first time set is called
		if (elementSetCount === 0) {
			mutationDocument.onAfterRemovedNodes(cleanupDomData);
		}
		// increment elementSetCount if set returns true
		elementSetCount += domDataCore.set.call(this, name, value) ? 1 : 0;
	},
	/**
	 * @function can-util/dom/data/data.delete domData.delete
	 * @signature `domData.delete.call(el)`
	 *
	 * Remove all data for an element previously added by [can-util/dom/data/data.set set]
	 *
	 * ```js
	 * var domData = require("can-util/dom/data/data");
	 * 
	 * domData.delete.call(el);
	 * ```
	 */
	delete: deleteNode
};



/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// # can-event/batch/
// Adds task batching abilities to event dispatching.
// Provides a `queue` method to add batched work.
// Overwrites `event.dispatch` to use the task queue when dispatching events.
// Provides a `start` and `stop` method used to a queue.
// Provides `collecting` which returns the queue collecting tasks.
// Provides `dispatching` which returns the queue dispatching tasks.
// Dispatches `batchEnd` when a queue's tasks have been completed.

var canEvent = __webpack_require__(4);
var last = __webpack_require__(32);
var namespace = __webpack_require__(2);
var canTypes = __webpack_require__(0);
var canDev = __webpack_require__(6);
var canLog = __webpack_require__(18);

//!steal-remove-start
var group = console.group && console.group.bind(console) || canLog.log;
var groupEnd = console.groupEnd && console.groupEnd.bind(console) || function() {};
//!steal-remove-end

// Which batch of events this is for -- might not want to send multiple
// messages on the same batch.  This is mostly for event delegation.
var batchNum = 1,
	collectionQueue = null,
	queues = [],
	dispatchingQueues = false,
	makeHandlerArgs = canEvent.makeHandlerArgs,
	getHandlers = canEvent.handlers;

function addToCollectionQueue(item, event, args, handlers){
	var handlerArgs = makeHandlerArgs(event, args);
	var tasks = [];
	for(var i = 0, len = handlers.length; i < len; i++) {
		tasks[i] = [handlers[i], item, handlerArgs];
	}

	[].push.apply(collectionQueue.tasks,tasks);
}


var canBatch = {
	// how many times has start been called without a stop
	transactions: 0,
	/**
	 * @function can-event/batch/batch.start start
	 * @parent can-event/batch/batch
	 * @description Begin an event batch.
	 *
	 * @signature `canBatch.start([batchStopHandler])`
	 *
	 * @param {Function} [batchStopHandler] a callback that gets called after all batched events have been called.
	 *
	 * @body
	 * `canBatch.start` begins an event batch. Until `[can-event/batch/batch.stop]` is called, any
	 * events that would result from calls to [can-event/batch/batch.trigger] to are held back from firing. If you have
	 * lots of changes to make to observables, batching them together can help performance - especially if
	 * those observables are live-bound to the DOM.
	 *
	 * In this example, you can see how the _first_ event is not fired (and their handlers
	 * are not called) until `canBatch.stop` is called.
	 *
	 * ```
	 * var person = new DefineMap({
	 *     first: 'Alexis',
	 *     last: 'Abril'
	 * });
	 *
	 * person.on('first', function() {
	 *     console.log("First name changed.");
	 * }).on('last', function() {
	 *     console.log("Last name changed.");
	 * });
	 *
	 * canBatch.start();
	 * person.first = 'Alex';
	 * console.log('Still in the batch.');
	 * canBatch.stop();
	 *
	 * // the log has:
	 * // Still in the batch.
	 * // First name changed.
	 * ```
	 *
	 * You can also pass a callback to `canBatch.start` which will be called after all the events have
	 * been fired:
	 *
	 * ```
	 * canBatch.start(function() {
	 *     console.log('The batch is over.');
	 * });
	 * person.first = "Izzy"
	 * console.log('Still in the batch.');
	 * canBatch.stop();
	 *
	 * // The console has:
	 * // Still in the batch.
	 * // First name changed.
	 * // The batch is over.
	 * ```
	 *
	 * ## Calling `canBatch.start` multiple times
	 *
	 * If you call `canBatch.start` more than once, `canBatch.stop` needs to be called
	 * the same number of times before any batched events will fire. For ways
	 * to circumvent this process, see [can-event/batch/batch.stop].
	 *
	 * Here is an example that demonstrates how events are affected by calling
	 * `canBatch.start` multiple times.
	 *
	 * ```
	 * var Todo = DefineMap.extend({
	 *   completed: "boolean",
	 *   name: "string"
	 *   updatedAt: "date",
	 *   complete: function(){
	 *     canBatch.start();
	 *     this.completed = true;
	 *     this.updatedAt = new Date();
	 *     canBatch.end();
	 *   }
	 * });
	 *
	 * Todo.List = DefineList.extend({
	 *   "#": Todo,
	 *   completeAll: function(){
	 *     this.forEach(function(todo){
	 *       todo.complete();
	 *     });
	 *   }
	 * });
	 *
	 * var todos = new Todo.List([
	 *   {name: "dishes", completed: false},
	 *   {name: "lawn", completed: false}
	 * ]);
	 *
	 * todos[0].on("completed", function(ev){
	 *   console.log("todos[0] "+ev.batchNum);
	 * })
	 * todos[1].on("completed", function(ev){
	 *   console.log("todos[1] "+ev.batchNum);
	 * });
	 *
	 * todos.completeAll();
	 * // console.logs ->
	 * //        todos[0] 1
	 * //        todos[1] 1
	 * ```
	 */
	start: function (batchStopHandler) {
		canBatch.transactions++;
		if(canBatch.transactions === 1) {
			var queue = {
				// the batch number
				number: batchNum++,

				// where are we in the task queue
				index: 0,
				tasks: [],

				// the batch end event has fired
				batchEnded: false,

				// where are we in the post-batch queue
				callbacksIndex: 0,
				callbacks: [],

				// if everything this batch can do has been done
				complete: false
			};

			if (batchStopHandler) {
				queue.callbacks.push(batchStopHandler);
			}
			collectionQueue = queue;
		}

	},
	/**
	 * @function can-event/batch/batch.collecting collecting
	 * @parent can-event/batch/batch
	 *
	 * @signature `batch.collecting()`
	 *
	 * Returns the Queue that is currently collecting tasks.
	 *
	 * ```
	 * batch.start();
	 * batch.collecting() //-> Queue
	 *
	 * batch.stop();
	 * batch.collecting() //-> null
	 * ```
	 *
	 * @return {can-event/batch/Queue} The queue currently collecting tasks.
	 */
	collecting: function(){
		return collectionQueue;
	},
	/**
	 * @function can-event/batch/batch.dispatching dispatching
	 * @parent can-event/batch/batch
	 *
	 * @signature `batch.dispatching()`
	 *
	 * Returns the Queue that is executing tasks.
	 *
	 * ```
	 * var canEvent = require("can-event");
	 * var batch = require("can-event/batch/batch");
	 *
	 *
	 * var obj = Object.assign({}, canEvent);
	 *
	 *
	 *
	 * batch.start();
	 * obj.dispatch("first");
	 * batch.stop();
	 * ```
	 *
	 * @return {can-event/batch/Queue} The queue currently executing tasks.
	 */
	dispatching: function(){
		return queues[0];
	},
	/**
	 * @function can-event/batch/batch.stop stop
	 * @parent can-event/batch/batch
	 * @description End an event batch.
	 *
	 * @signature `canBatch.stop([force[, callStart]])`
	 *
	 * If this call to `stop` matches the number of calls to `start`, all of this batch's [can-event/batch/batch.trigger triggered]
	 * events will be dispatched.  If the firing of those events creates new events, those new events will be dispatched
	 * after the current batch in their own batch.
	 *
	 * @param {bool} [force=false] Whether to stop batching events immediately.
	 * @param {bool} [callStart=false] Whether to call [can-event/batch/batch.start] after firing batched events.
	 *
	 * @body
	 *
	 * `canBatch.stop` matches an earlier `[can-event/batch/batch.start]` call. If `canBatch.stop` has been
	 * called as many times as `canBatch.start` (or if _force_ is true), all batched events will be
	 * fired and any callbacks passed to `canBatch.start` since the beginning of the batch will be
	 * called. If _force_ and _callStart_ are both true, a new batch will be started when all
	 * the events and callbacks have been fired.
	 *
	 * See `[can-event/batch/batch.start]` for examples of `canBatch.start` and `canBatch.stop` in normal use.
	 *
	 */
	stop: function (force, callStart) {
		if (force) {
			canBatch.transactions = 0;
		} else {
			canBatch.transactions--;
		}
		if (canBatch.transactions === 0) {
			queues.push(collectionQueue);
			collectionQueue = null;
			if(!dispatchingQueues) {
				canEvent.flush();
			}
		}
	},
	// Flushes the current
	flush: function() {
		//!steal-remove-start
		var debug = canDev.logLevel >= 1;
		//!steal-remove-end

		dispatchingQueues = true;
		while(queues.length) {
			var queue = queues[0];
			var tasks = queue.tasks,
				callbacks = queue.callbacks;

			canBatch.batchNum = queue.number;

			var len = tasks.length;

			//!steal-remove-start
			if(debug && queue.index === 0 && queue.index < len) {
				group("batch running "+queue.number);
			}
			//!steal-remove-end

			while(queue.index < len) {
				var task = tasks[queue.index++];
				//!steal-remove-start
				if(debug) {
					var context = task[1];
					var args = task[2];
					if(args && args[0]) {
						canLog.log("dispatching", args[0].type, "on", context);
					}
				}
				//!steal-remove-end
				task[0].apply(task[1], task[2]);
			}

			if(!queue.batchEnded) {
				//!steal-remove-start
				if(debug) {
					canLog.log("tasks ended");
				}
				//!steal-remove-end
				queue.batchEnded = true;
				canEvent.dispatchSync.call(canBatch,"batchEnd",[queue.number]);
			}

			//!steal-remove-start
			if(debug && queue.callbacksIndex < callbacks.length) {
				canLog.log("calling callbacks");
			}
			//!steal-remove-end

			while(queue.callbacksIndex < callbacks.length) {
				callbacks[queue.callbacksIndex++]();
			}


			if(!queue.complete) {
				queue.complete = true;
				canBatch.batchNum = undefined;
				queues.shift();

				//!steal-remove-start
				if(debug) {
					groupEnd();
				}
				//!steal-remove-end
			}

		}
		dispatchingQueues = false;
	},
	/**
	 * @function can-event/batch/batch.dispatch dispatch
	 * @parent can-event/batch/batch
	 * @description Dispatchs an event within the event batching system.
	 * @signature `canBatch.trigger(item, event [, args])`
	 *
	 * Makes sure an event is fired at the appropriate time within the appropriate batch.
	 * How and when the event fires depends on the batching state.
	 *
	 * There are three states of batching:
	 *
	 * - no queues - `trigger` is called outside of any `start` or `stop` call -> The event is dispatched immediately.
	 * - collecting batch - `trigger` is called between a `start` or `stop` call -> The event is dispatched when `stop` is called.
	 * - firing queues -  `trigger` is called due to another `trigger` called within a batch -> The event is dispatched after the current batch has completed in a new batch.
	 *
	 * Finally, if the event has a `batchNum` it is fired immediately.
	 *
	 * @param {Object} item the target of the event.
	 * @param {String|{type: String}} event the type of event, or an event object with a type given like `{type: 'name'}`
	 * @param {Array} [args] the parameters to trigger the event with.
	 *
	 * @body
	 *
	 */
	dispatch: function (event, args) {
		//!steal-remove-start
		if (arguments.length > 2) {
			canDev.warn('Arguments to dispatch should be an array, not multiple arguments.');
			args = Array.prototype.slice.call(arguments, 1);
		}

		if (args && !Array.isArray(args)) {
			canDev.warn('Arguments to dispatch should be an array.');
			args = [ args ];
		}
		//!steal-remove-end

		var item = this,
			handlers;
		// Don't send events if initalizing.
		if (!item.__inSetup) {
			event = typeof event === 'string' ? {
				type: event
			} : event;

			// If this is trying to belong to another batch, let it fire
			if(event.batchNum) {
				// It's a possibility we want to add this to the
				// end of the tasks if they haven't completed yet.
				canBatch.batchNum = event.batchNum;
				canEvent.dispatchSync.call( item, event, args );
			}
			// if there's a batch, add it to this queues events
			else if(collectionQueue) {

				handlers = getHandlers.call(this, event.type);
				if(handlers) {
					event.batchNum = collectionQueue.number;
					addToCollectionQueue(item, event, args, handlers);
				}
			}
			// if there are queues, but this doesn't belong to a batch
			// add it to its own batch fired at the end
			else if(queues.length) {
				// start a batch so it can be colllected.
				// this should never hit in async
				handlers = getHandlers.call(this, event.type);
				if(handlers) {
					canBatch.start();
					event.batchNum = collectionQueue.number;
					addToCollectionQueue(item, event, args, handlers);
					last(queues).callbacks.push(canBatch.stop);
				}


			}
			// there are no queues, so just fire the event.
			else {
				handlers = getHandlers.call(this, event.type);
				if(handlers) {
					canBatch.start();
					event.batchNum = collectionQueue.number;
					addToCollectionQueue(item, event, args, handlers);
					canBatch.stop();
				}
			}
		}
	},
	/**
	 * @function can-event/batch/batch.queue queue
	 * @parent can-event/batch/batch
	 * @description Queues a method to be called.
	 *
	 * @signature `batch.queue(task)`
	 *
	 * Queues a method to be called in the current [can-event/batch/batch.collecting]
	 * queue if there is one.  If there is a [can-event/batch/batch.dispatching] queue,
	 * it will create a batch and add the task to that batch.
	 * Finally, if there is no batch, the task will be executed immediately.
	 *
	 * ```
	 * var me = {
	 *   say: function(message){
	 *     console.log(this.name,"says", message);
	 *   }
	 * }
	 * batch.queue([me.say, me, ["hi"]]);
	 * ```
	 *
	 * @param  {Array<function,*,Array>} task An array that details a
	 * function to be called, the context the function should be called with, and
	 * the arguments to the function like: `[function,context, [arg1, arg2]]`
	 */
	queue: function(task, inCurrentBatch){
		if(collectionQueue) {
			collectionQueue.tasks.push(task);
		}
		// if there are queues, but this doesn't belong to a batch
		// add it to its own batch
		else if(queues.length) {
			if(inCurrentBatch && queues[0].index < queues.tasks.length) {
				queues[0].tasks.push(task);
			} else {
				canBatch.start();
				collectionQueue.tasks.push(task);
				last(queues).callbacks.push(canBatch.stop);
			}
		}
		// there are no queues, so create one and run it.
		else {
			canBatch.start();
			collectionQueue.tasks.push(task);
			canBatch.stop();
		}
	},
	queues: function(){
		return queues;
	},
	/**
	 * @function can-event/batch/batch.afterPreviousEvents afterPreviousEvents
	 * @parent can-event/batch/batch
	 * @description Run code when all previuos state has settled.
	 *
	 * @signature `canBatch.afterPreviousEvents(handler)`
	 *
	 * Calls `handler` when all previously [can-event/batch/batch.trigger triggered] events have
	 * been fired.  This is useful to know when all fired events match the current state.
	 *
	 * @param {function} handler A function to call back when all previous events have fired.
	 *
	 * @body
	 *
	 *
	 * ## Use
	 *
	 * With batching, it's possible for a piece of code to read some observable, and listen to
	 * changes in that observable, but have events fired that it should ignore.
	 *
	 * For example, consider a list widget that creates `<li>`'s for each item in the list and listens to
	 * updates in that list and adds or removes `<li>`s:
	 *
	 * ```js
	 * var makeLi = function(){
	 *   return document.createElement("li")
	 * };
	 *
	 * var listWidget = function(list){
	 *   var lis = list.map(makeLi);
	 *   list.on("add", function(ev, added, index){
	 *     var newLis = added.map(makeLi);
	 *     lis.splice.apply(lis, [index, 0].concat(newLis) );
	 *   }).on("remove", function(ev, removed, index){
	 *     lis.splice(index, removed.length);
	 *   });
	 *
	 *   return lis;
	 * }
	 * ```
	 *
	 * The problem with this is if someone calls `listWidget` within a batch:
	 *
	 * ```js
	 * var list = new DefineList([]);
	 *
	 * canBatch.start();
	 * list.push("can-event","can-event/batch/");
	 * listWidget(list);
	 * canBatch.stop();
	 * ```
	 *
	 * The problem is that list will immediately create an `li` for both `can-event` and `can-event/batch/`, and then,
	 * when `canBatch.stop()` is called, the `add` event listener will create duplicate `li`s.
	 *
	 * The solution, is to use `afterPreviousEvents`:
	 *
	 * ```js
	 * var makeLi = function(){
	 *   return document.createElement("li")
	 * };
	 *
	 * var listWidget = function(list){
	 *   var lis = list.map(makeLi);
	 *   canBatch.afterPreviousEvents(function(){
	 *     list.on("add", function(ev, added, index){
	 *       var newLis = added.map(makeLi);
	 *       lis.splice.apply(lis, [index, 0].concat(newLis) );
	 *     }).on("remove", function(ev, removed, index){
	 *       lis.splice(index, removed.length);
	 *     });
	 *   });
	 *
	 *   return lis;
	 * }
	 * ```
	 *
	 */
	// call handler after any events from currently settled stated have fired
	// but before any future change events fire.
	afterPreviousEvents: function(handler){
		this.queue([handler]);
	},
	after: function(handler){
		var queue = collectionQueue || queues[0];

		if(queue) {
			queue.callbacks.push(handler);
		} else {
			handler({});
		}
	}
};


canEvent.flush = canBatch.flush;
canEvent.dispatch = canBatch.dispatch;

canBatch.trigger = function(){
	canLog.warn("use canEvent.dispatch instead");
	return canEvent.dispatch.apply(this, arguments);
};

canTypes.queueTask = canBatch.queue;

if (namespace.batch) {
	throw new Error("You can't have two versions of can-event/batch/batch, check your dependencies");
} else {
	module.exports = namespace.batch = canBatch;
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var each = __webpack_require__(1);
var isArrayLike = __webpack_require__(38);

/**
 * @module {function} can-util/js/make-array/make-array make-array
 * @parent can-util/js
 * @signature `makeArray(element)`
 * @param  {ArrayLike|Object} element any array-like or object data structure
 * @return {Array}     a JavaScript array object with the same elements as the passed-in ArrayLike
 *
 * makeArray takes any array-like object (can-list, NodeList, etc.) and converts it to a JavaScript array
 * 
 * ```
 * var makeArray = require("can-util/js/make-array/make-array");
 * 
 * makeArray({0: "a", length: 1}); //-> ["a"]
 * 
 * ```
 */
function makeArray(element) {
	var ret = [];
	if (isArrayLike(element)) {
		each(element, function (a, i) {
			ret[i] = a;
		});
	} else if(element === 0 || element) {
		ret.push(element);
	}
	return ret;
}

module.exports = makeArray;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global) {

/**
 * @module {function} can-util/js/global/global global
 * @parent can-util/js
 * @signature `GLOBAL()`
 *
 * Returns the global that this environment provides. It will be one of:
 *
 * * **Browser**: `window`
 * * **Web Worker**: `self`
 * * **Node.js**: `global`
 *
 * ```js
 * var GLOBAL = require("can-util/js/global/global");
 *
 * var g = GLOBAL();
 *
 * // In a browser
 * console.log(g === window); // -> true
 * ```
 *
 * @return {Object} The global object for this JavaScript environment.
 */

/* global self */
/* global WorkerGlobalScope */
var GLOBAL;
module.exports = function(setGlobal){
	// Web Worker
	if(setGlobal !== undefined) {
		GLOBAL = setGlobal;
	}
	if(GLOBAL) {
		return GLOBAL;
	} else {
		return GLOBAL = (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) ? self :

			// Node.js
			typeof process === "object" &&
			{}.toString.call(process) === "[object process]" ? global :

			// Browser window
			window;
	}

};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(55), __webpack_require__(70)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var namespace = __webpack_require__(2);
/**
 * @module {function} can-cid
 * @parent can-infrastructure
 * @signature `cid(object, optionalObjectType)`
 *
 * Get a unique identifier for the object, optionally prefixed by a type name.
 *
 * Once set, the unique identifier does not change, even if the type name
 * changes on subsequent calls.
 *
 * ```js
 * var cid = require("can-cid");
 * var x = {};
 * var y = {};
 *
 * console.log(cid(x, "demo")); // -> "demo1"
 * console.log(cid(x, "prod")); // -> "demo1"
 * console.log(cid(y));         // -> "2"
 * ```
 *
 * @param {Object} object The object to uniquely identify.
 * @param {String} name   An optional type name with which to prefix the identifier
 *
 * @return {String} Returns the unique identifier
 */
var _cid = 0;
var cid = function (object, name) {
	if (!object._cid) {
		_cid++;
		object._cid = (name || '') + _cid;
	}
	return object._cid;
};

if (namespace.cid) {
	throw new Error("You can't have two versions of can-cid, check your dependencies");
} else {
	module.exports = namespace.cid = cid;
}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var Observation = __webpack_require__(7);
var assign = __webpack_require__(3);
var CID = __webpack_require__(14);
var types = __webpack_require__(0);
var dev = __webpack_require__(6);
var canEvent = __webpack_require__(4);
var each = __webpack_require__(1);
var isPromiseLike = __webpack_require__(101);

var observeReader;
var isAt = function(index, reads) {
	var prevRead = reads[index-1];
	return prevRead && prevRead.at;
};

var readValue = function(value, index, reads, options, state, prev){
	// if the previous read is AT false ... we shouldn't be doing this;
	var usedValueReader;
	do {

		usedValueReader = false;
		for(var i =0, len = observeReader.valueReaders.length; i < len; i++){
			if( observeReader.valueReaders[i].test(value, index, reads, options) ) {
				value = observeReader.valueReaders[i].read(value, index, reads, options, state, prev);
				//usedValueReader = true;
			}
		}
	} while(usedValueReader);

	return value;
};

var specialRead = {index: true, key: true, event: true, element: true, viewModel: true};

var checkForObservableAndNotify = function(options, state, getObserves, value, index){
	if(options.foundObservable && !state.foundObservable) {
		if(Observation.trapsCount()) {
			Observation.addAll( getObserves() );
			options.foundObservable(value, index);
			state.foundObservable = true;
		}
	}
};

observeReader = {
	// there are things that you need to evaluate when you get them back as a property read
	// for example a compute or a function you might need to call to get the next value to
	// actually check
	// - isArgument - should be renamed to something like "onLastPropertyReadReturnFunctionInsteadOfCallingIt".
	//   This is used to make a compute out of that function if necessary.
	// - readCompute - can be set to `false` to prevent reading an ending compute.  This is used by component to get a
	//   compute as a delegate.  In 3.0, this should be removed and force people to write "{@prop} change"
	// - callMethodsOnObservables - this is an overwrite ... so normal methods won't be called, but observable ones will.
	// - executeAnonymousFunctions - call a function if it's found, defaults to true
	// - proxyMethods - if the last read is a method, return a function so `this` will be correct.
	// - args - arguments to call functions with.
	//
	// Callbacks
	// - earlyExit - called if a value could not be found
	// - foundObservable - called when an observable value is found
	read: function (parent, reads, options) {
		options = options || {};
		var state = {
			foundObservable: false
		};
		var getObserves;
		if(options.foundObservable) {
			getObserves = Observation.trap();
		}

		// `cur` is the current value.
		var cur = readValue(parent, 0, reads, options, state),
			type,
			// `prev` is the object we are reading from.
			prev,
			// `foundObs` did we find an observable.
			readLength = reads.length,
			i = 0,
			last;

		checkForObservableAndNotify(options, state, getObserves, parent, 0);

		while( i < readLength ) {
			prev = cur;
			// try to read the property
			for(var r=0, readersLength = observeReader.propertyReaders.length; r < readersLength; r++) {
				var reader = observeReader.propertyReaders[r];
				if(reader.test(cur)) {
					cur = reader.read(cur, reads[i], i, options, state);
					break; // there can be only one reading of a property
				}
			}
			checkForObservableAndNotify(options, state, getObserves, prev, i);
			last = cur;
			i = i+1;
			// read the value if it is a compute or function
			cur = readValue(cur, i, reads, options, state, prev);

			checkForObservableAndNotify(options, state, getObserves, prev, i-1);



			type = typeof cur;
			// early exit if need be
			if (i < reads.length && (cur === null || cur === undefined )) {
				if (options.earlyExit) {
					options.earlyExit(prev, i - 1, cur);
				}
				// return undefined so we know this isn't the right value
				return {
					value: undefined,
					parent: prev
				};
			}

		}
		// if we don't have a value, exit early.
		if (cur === undefined) {
			if (options.earlyExit) {
				options.earlyExit(prev, i - 1);
			}
		}
		return {
			value: cur,
			parent: prev
		};
	},
	get: function(parent, reads, options){
		return observeReader.read(parent, observeReader.reads(reads), options || {}).value;
	},
	valueReadersMap: {},
	// an array of types that might have a value inside them like functions
	// value readers check the current value
	// and get a new value from it
	// ideally they would keep calling until
	// none of these passed
	valueReaders: [
		{
			name: "function",
			// if this is a function before the last read and its not a constructor function
			test: function(value, i, reads, options){
				return types.isCallableForValue(value) && !types.isCompute(value);
			},
			read: function(value, i, reads, options, state, prev){
				if( isAt(i, reads) ) {
					return i === reads.length ? value.bind(prev) : value;
				}
				else if(options.callMethodsOnObservables && types.isMapLike(prev)) {
					return value.apply(prev, options.args || []);
				}
				else if ( options.isArgument && i === reads.length ) {
					return options.proxyMethods !== false ? value.bind(prev) : value;
				}
				return value.apply(prev, options.args || []);
			}
		},
		{
			name: "compute",
			// compute value reader
			test: function(value, i, reads, options){
				return types.isCompute(value) && !isAt(i, reads);
			},
			read: function(value, i, reads, options, state){
				if(options.readCompute === false && i === reads.length ) {
					return value;
				}
				return value.get ? value.get() : value();
			},
			write: function(base, newVal){
				if(base.set) {
					base.set(newVal);
				} else {
					base(newVal);
				}
			}
		}],
	propertyReadersMap: {},
	// an array of things that might have a property
	propertyReaders: [
		{
			name: "map",
			test: function(){
				return types.isMapLike.apply(this, arguments) || types.isListLike.apply(this, arguments);
			},
			read: function(value, prop, index, options, state){
				var res = value.get ? value.get(prop.key) : value.attr(prop.key);
				if(res !== undefined) {
					return res;
				} else {
					return value[prop.key];
				}
			},
			write: function(base, prop, newVal){
				if(typeof base.set === "function") {
					base.set(prop, newVal);
				} else {
					base.attr(prop, newVal);
				}
			}
		},
		// read a promise
		// it would be good to remove this ... then
		//
		{
			name: "promise",
			test: function(value){
				// eventually this will use canReflect.isPromiseLike
				return isPromiseLike(value);
			},
			read: function(value, prop, index, options, state){
				var observeData = value.__observeData;
				if(!value.__observeData) {
					observeData = value.__observeData = {
						isPending: true,
						state: "pending",
						isResolved: false,
						isRejected: false,
						value: undefined,
						reason: undefined
					};
					CID(observeData);
					// proto based would be faster
					assign(observeData, canEvent);
					value.then(function(value){
						observeData.isPending = false;
						observeData.isResolved = true;
						observeData.value = value;
						observeData.state = "resolved";
						observeData.dispatch("state",["resolved","pending"]);
					}, function(reason){
						observeData.isPending = false;
						observeData.isRejected = true;
						observeData.reason = reason;
						observeData.state = "rejected";
						observeData.dispatch("state",["rejected","pending"]);

						//!steal-remove-start
						dev.error("Failed promise:", reason);
						//!steal-remove-end
					});
				}

				Observation.add(observeData,"state");
				return prop.key in observeData ? observeData[prop.key] : value[prop.key];
			}
		},

		// read a normal object
		{
			name: "object",
			// this is the default
			test: function(){return true;},
			read: function(value, prop){
				if(value == null) {
					return undefined;
				} else {
					if(typeof value === "object") {
						if(prop.key in value) {
							return value[prop.key];
						}
						// TODO: remove in 3.0.  This is for backwards compat with @key and @index.
						else if( prop.at && specialRead[prop.key] && ( ("@"+prop.key) in value)) {
							//!steal-remove-start
							dev.warn("Use %"+prop.key+" in place of @"+prop.key+".");

							//!steal-remove-end

							return value["@"+prop.key];
						}
					} else {
						return value[prop.key];
					}
				}
			},
			write: function(base, prop, newVal){
				base[prop] = newVal;
			}
		}
	],
	reads: function(keyArg) {
		var key = ""+keyArg;
		var keys = [];
		var last = 0;
		var at = false;
		if( key.charAt(0) === "@" ) {
			last = 1;
			at = true;
		}
		var keyToAdd = "";
		for(var i = last; i < key.length; i++) {
			var character = key.charAt(i);
			if(character === "." || character === "@") {
				if( key.charAt(i -1) !== "\\" ) {
					keys.push({
						key: keyToAdd,
						at: at
					});
					at = character === "@";
					keyToAdd = "";
				} else {
					keyToAdd = keyToAdd.substr(0,keyToAdd.length - 1) + ".";
				}
			} else {
				keyToAdd += character;
			}
		}
		keys.push({
			key: keyToAdd,
			at: at
		});

		return keys;
	},
	// This should be able to set a property similar to how read works.
	write: function(parent, key, value, options) {
		var keys = typeof key === "string" ? observeReader.reads(key) : key;
		var last;
		if(keys.length > 1) {
			last = keys.pop();
			parent = observeReader.read(parent, keys, options).value;
			keys.push(last);
		} else {
			last = keys[0];
		}
		// here's where we need to figure out the best way to write

		// if property being set points at a compute, set the compute
		if( observeReader.valueReadersMap.compute.test(parent[last.key], keys.length - 1, keys, options) ) {
			observeReader.valueReadersMap.compute.write(parent[last.key], value, options);
		} else {
			if(observeReader.valueReadersMap.compute.test(parent, keys.length - 1, keys, options) ) {
				parent = parent();
			}
			if(observeReader.propertyReadersMap.map.test(parent)) {
				observeReader.propertyReadersMap.map.write(parent, last.key, value, options);
			}
			else if(observeReader.propertyReadersMap.object.test(parent)) {
				observeReader.propertyReadersMap.object.write(parent, last.key, value, options);
			}
		}
	}
};
each(observeReader.propertyReaders, function(reader){
	observeReader.propertyReadersMap[reader.name] = reader;
});
each(observeReader.valueReaders, function(reader){
	observeReader.valueReadersMap[reader.name] = reader;
});
observeReader.set = observeReader.write;

module.exports = observeReader;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @module {function} can-util/dom/child-nodes/child-nodes child-nodes
 * @parent can-util/dom
 * @signature `childNodes(node)`
 *
 * Get all of the childNodes of a given node.
 *
 * ```js
 * var stache = require("can-stache");
 * var childNodes = require("can-util/child-nodes/child-nodes");
 *
 * var html = "<div><h1><span></span></h1></div>";
 * var frag = stache(html)();
 *
 * console.log(childNodes(frag)[0].nodeName); // -> DIV
 * ```
 *
 * @param {Object} node The Node that you want child nodes for.
 */

function childNodes(node) {
	var childNodes = node.childNodes;
	if ("length" in childNodes) {
		return childNodes;
	} else {
		var cur = node.firstChild;
		var nodes = [];
		while (cur) {
			nodes.push(cur);
			cur = cur.nextSibling;
		}
		return nodes;
	}
}

module.exports = childNodes;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var domEvents = __webpack_require__(8);

/**
 * @module {function} can-util/dom/dispatch/dispatch dispatch
 * @parent can-util/dom
 * @signature `dispatch.call(el, event, args, bubbles)`
 *
 * Dispatch an event on an element.
 *
 * @param {Object|String} event An object specifies options applied to this event.
 * @param {Array} [args] Arguments passed into this event.
 * @param {Boolean} [bubbles=true] Specifies whether this event should bubble (by default it will).
 */

module.exports = function(){
	return domEvents.dispatch.apply(this, arguments);
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.warnTimeout = 5000;
exports.logLevel = 0;

/**
 * @module {{}} can-util/js/log/log log
 * @parent can-util/js
 * 
 * Utilities for logging to the console.
 */

/**
 * @function can-util/js/log/log.warn warn
 * @parent can-util/js/log/log
 * @description
 * 
 * Adds a warning message to the console.
 *
 * ```
 * var canLog = require("can-util/js/log/log");
 * 
 * canLog.warn("something evil");
 * ```
 *
 * @signature `canLog.warn(msg)`
 * @param {String} msg the message to be logged.
 */
exports.warn = function(out) {
	var ll = this.logLevel;
	if (ll < 2) {
		Array.prototype.unshift.call(arguments, 'WARN:');
		if (typeof console !== "undefined" && console.warn) {
			this._logger("warn", Array.prototype.slice.call(arguments));
		} else if (typeof console !== "undefined" && console.log) {
			this._logger("log", Array.prototype.slice.call(arguments));
		} else if (window && window.opera && window.opera.postError) {
			window.opera.postError("CanJS WARNING: " + out);
		}
	}
};

/**
 * @function can-util/js/log/log.log log
 * @parent can-util/js/log/log
 * @description
 * Adds a message to the console.
 *
 * ```
 * var canLog = require("can-util/js/log/log");
 * 
 * canLog.log("hi");
 * ```
 *
 * @signature `canLog.log(msg)`
 * @param {String} msg the message
 */
exports.log = function(out) {
	var ll = this.logLevel;
	if (ll < 1) {
		if (typeof console !== "undefined" && console.log) {
			Array.prototype.unshift.call(arguments, 'INFO:');
			this._logger("log", Array.prototype.slice.call(arguments));
		} else if (window && window.opera && window.opera.postError) {
			window.opera.postError("CanJS INFO: " + out);
		}
	}
};

/**
 * @function can-util/js/log/log.error error
 * @parent can-util/js/log/log
 * @description
 * Adds an error message to the console.
 *
 * ```
 * var canLog = require("can-util/js/log/log");
 * 
 * canLog.error(new Error("Oh no!"));
 * ```
 *
 * @signature `canLog.error(err)`
 * @param {String|Error} err The error to be logged.
 */
exports.error = function(out) {
	var ll = this.logLevel;
	if (ll < 1) {
		if (typeof console !== "undefined" && console.error) {
			Array.prototype.unshift.call(arguments, 'ERROR:');
			this._logger("error", Array.prototype.slice.call(arguments));
		} else if (window && window.opera && window.opera.postError) {
			window.opera.postError("ERROR: " + out);
		}
	}
};

exports._logger = function (type, arr) {
	try {
		console[type].apply(console, arr);
	} catch(e) {
		console[type](arr);
	}
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var get = __webpack_require__(52);
var isContainer = __webpack_require__(65);
var canDev = __webpack_require__(6);
var isArray = __webpack_require__(31);

// ##string.js
// _Miscellaneous string utility functions._
// Several of the methods in this plugin use code adapated from Prototype
// Prototype JavaScript framework, version 1.6.0.1.
// © 2005-2007 Sam Stephenson
/**
 * @module {{}} can-util/js/string/string string
 * @parent can-util/js
 *
 * @description  String utilities used by CanJS libraries
 */
var strUndHash = /_|-/,
	strColons = /\=\=/,
	strWords = /([A-Z]+)([A-Z][a-z])/g,
	strLowUp = /([a-z\d])([A-Z])/g,
	strDash = /([a-z\d])([A-Z])/g,
	strReplacer = /\{([^\}]+)\}/g,
	strQuote = /"/g,
	strSingleQuote = /'/g,
	strHyphenMatch = /-+(.)?/g,
	strCamelMatch = /[a-z][A-Z]/g,
	convertBadValues = function (content) {
		// Convert bad values into empty strings
		var isInvalid = content === null || content === undefined || isNaN(content) && '' + content === 'NaN';
		return '' + (isInvalid ? '' : content);
	},
	deleteAtPath = function(data, path) {
		var parts = path ? path.replace(/\[/g,'.')
			.replace(/]/g,'').split('.') : [];
		var current = data;

		for(var i = 0; i < parts.length - 1; i++) {
			if(current) {
				current = current[parts[i]];
			}
		}

		if(current) {
			delete current[parts[parts.length - 1 ]];
		}
	};

var string = {
	/**
	 * @function can-util/js/string/string.esc string.esc
	 * @signature `string.esc(content)`
	 * @param  {String} content a string
	 * @return {String}         the string safely HTML-escaped
	 * 
	 * ```js
	 * var string = require("can-util/js/string/string");
	 * 
	 * string.esc("<div>&nbsp;</div>"); //-> "&lt;div&gt;&amp;nbsp;&lt;/div&gt;"
	 * ```
	 */
	esc: function (content) {
		return convertBadValues(content)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(strQuote, '&#34;')
			.replace(strSingleQuote, '&#39;');
	},
	/**
	 * @function can-util/js/string/string.getObject string.getObject
	 * @signature `string.getObject(name, roots)`
	 * @param  {String} name  a String of dot-separated keys, representing a path of properties
	 * @param  {Object|Array} roots the object to use as the root for property based navigation
	 * @return {*}       the value at the property path descending from `roots`
	 *
	 * Return the result of descending the path `name` through the properties of the object or objects
	 * `roots`
	 *
	 * If `roots` is an Array, each element of the array is evaluated, in order, until
	 * the path is found in an element's properties (and properties-of-properties, etc.).  Otherwise
	 * `roots` is evaluated as the root object, returning either the object at the property path
	 * descended from `roots` or `undefined` if any subpath is not found.
	 *
	 * A *path* is a dot-delimited sequence of zero or more property names, such that "foo.bar" means "the property
	 * 'bar' of the object at the property 'foo' of the root."  An empty path returns the first object in `roots`
	 * if it's an array, `roots` itself otherwise.
	 *
	 * ```js
	 * var string = require("can-util/js/string/string");
	 * 
	 * console.log(string.getObject("a.b.c", {a: {b: {c: "foo"}}})); // -> "foo"
	 * console.log(string.getObject("a.b.c", {a: {}})); // -> undefined
	 * console.log(string.getObject("a.b", [{a: {}}, {a: {b: "bar"}}])); // -> "bar"
	 * ```
	 */
	getObject: function (name, roots) {
		//!steal-remove-start
		canDev.warn('string.getObject is deprecated, please use can-util/js/get/get instead.');
		//!steal-remove-end

		roots = isArray(roots) ? roots : [roots || window];

		var result, l = roots.length;

		for(var i = 0; i < l; i++) {
			result = get(roots[i], name);

			if(result) {
				return result;
			}
		}
	},
	/**
	 * @function can-util/js/string/string.capitalize string.capitalize
	 * @signature `string.capitalize(s)`
	 * @param  {String} s     the string to capitalize
	 * @return {String}       the supplied string with the first character uppercased if it is a letter
	 *
	 * ```js
	 * var string = require("can-util/js/string/string");
	 *
	 * console.log(string.capitalize("foo")); // -> "Foo"
	 * console.log(string.capitalize("123")); // -> "123"
	 * ```
	 */
	capitalize: function (s, cache) {
		// Used to make newId.
		return s.charAt(0)
			.toUpperCase() + s.slice(1);
	},
	/**
	 * @function can-util/js/string/string.camelize string.camelize
	 * @signature `string.camelize(s)`
	 * @param  {String} str   the string to camelCase
	 * @return {String}       the supplied string with hyphens removed and following letters capitalized.
	 *
	 * ```js
	 * var string = require("can-util/js/string/string");
	 *
	 * console.log(string.camelize("foo-bar")); // -> "fooBar"
	 * console.log(string.camelize("-webkit-flex-flow")); // -> "WebkitFlexFlow"
	 * ```
	 */
	camelize: function (str) {
		return convertBadValues(str)
			.replace(strHyphenMatch, function (match, chr) {
				return chr ? chr.toUpperCase() : '';
			});
	},
	/**
	 * @function can-util/js/string/string.hyphenate string.hyphenate
	 * @signature `string.hyphenate(s)`
	 * @param  {String} str   a string in camelCase
	 * @return {String}       the supplied string with camelCase converted to hyphen-lowercase digraphs
	 *
	 * ```js
	 * var string = require("can-util/js/string/string");
	 *
	 * console.log(string.hyphenate("fooBar")); // -> "foo-bar"
	 * console.log(string.hyphenate("WebkitFlexFlow")); // -> "Webkit-flex-flow"
	 * ```
	 */
	hyphenate: function (str) {
		return convertBadValues(str)
			.replace(strCamelMatch, function (str, offset) {
				return str.charAt(0) + '-' + str.charAt(1)
					.toLowerCase();
			});
	},
	/**
	 * @function can-util/js/string/string.underscore string.underscore
	 * @signature `string.underscore(s)`
	 * @param  {String} str   a string in camelCase
	 * @return {String}       the supplied string with camelCase converted to underscore-lowercase digraphs
	 *
	 * ```js
	 * var string = require("can-util/js/string/string");
	 *
	 * console.log(string.underscore("fooBar")); // -> "foo_bar"
	 * console.log(string.underscore("HTMLElement")); // -> "html_element"
	 * ```
	 */
	underscore: function (s) {
		return s.replace(strColons, '/')
			.replace(strWords, '$1_$2')
			.replace(strLowUp, '$1_$2')
			.replace(strDash, '_')
			.toLowerCase();
	},
	/**
	 * @function can-util/js/string/string.sub string.sub
	 * @signature `string.sub(str, data, remove)`
	 * @param {String} str   a string with {curly brace} delimited property names
	 * @param {Object} data  an object from which to read properties
	 * @return {String|null} the supplied string with delimited properties replaced with their values
	 *                       if all properties exist on the object, null otherwise
	 *
	 * If `remove` is true, the properties found in delimiters in `str` are removed from `data`.
	 *
	 * ```js
	 * var string = require("can-util/js/string/string");
	 *
	 * console.log(string.sub("foo_{bar}", {bar: "baz"}})); // -> "foo_baz"
	 * console.log(string.sub("foo_{bar}", {})); // -> null
	 * ```
	 */
	sub: function (str, data, remove) {
		var obs = [];
		str = str || '';
		obs.push(str.replace(strReplacer, function (whole, inside) {
			// Convert inside to type.
			var ob = get(data, inside);

			if(remove === true) {
				deleteAtPath(data, inside);
			}

			if (ob === undefined || ob === null) {
				obs = null;
				return '';
			}
			// If a container, push into objs (which will return objects found).
			if (isContainer(ob) && obs) {
				obs.push(ob);
				return '';
			}
			return '' + ob;
		}));
		return obs === null ? obs : obs.length <= 1 ? obs[0] : obs;
	},
	/**
	 * @property {RegExp} can-util/js/string/string.strReplacer string.strReplacer
	 *
	 * The regex used to find replacement sections in [can-util/js/string/string.sub string.sub]
	 */
	replacer: strReplacer,
	/**
	 * @property {RegExp} can-util/js/string/string.strUndHash string.strUndHash
	 *
	 * A regex which matches an underscore or hyphen character
	 */
	undHash: strUndHash
};
module.exports = string;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var makeArray = __webpack_require__(12);
var each = __webpack_require__(1);
var namespace = __webpack_require__(2);
var domMutate = __webpack_require__(30);

var CIDMap = __webpack_require__(50);
// # can/view/node_lists/node_list.js
//
// ## Helpers

// A mapping of element ids to nodeList id allowing us to quickly find an element
// that needs to be replaced when updated.
var nodeMap = new CIDMap(),
	splice = [].splice,
	push = [].push,

	// ## nodeLists.itemsInChildListTree
	// Given a nodeList return the number of child items in the provided
	// list and any child lists.
	itemsInChildListTree = function(list){
		var count = 0;
		for(var i = 0, len = list.length ; i < len; i++){
			var item = list[i];
			// If the item is an HTMLElement then increment the count by 1.
			if(item.nodeType) {
				count++;
			} else {
				// If the item is not an HTMLElement it is a list, so
				// increment the count by the number of items in the child
				// list.
				count += itemsInChildListTree(item);
			}
		}
		return count;
	},
	// replacements is an array of nodeLists
	// makes a map of the first node in the replacement to the nodeList
	replacementMap = function(replacements, idMap){
		var map = new CIDMap();
		for(var i = 0, len = replacements.length; i < len; i++){
			var node = nodeLists.first(replacements[i]);
			map.set(node, replacements[i]);
		}
		return map;
	},
	addUnfoundAsDeepChildren = function(list, rMap){
		rMap.forEach(function(replacement){
			list.newDeepChildren.push(replacement);
		});
	};

// ## Registering & Updating
//
// To keep all live-bound sections knowing which elements they are managing,
// all live-bound elments are registered and updated when they change.
//
// For example, the above template, when rendered with data like:
//
//     data = new can.Map({
//         items: ["first","second"]
//     })
//
// This will first render the following content:
//
//     <div>
//         <span data-view-id='5'/>
//     </div>
//
// When the `5` callback is called, this will register the `<span>` like:
//
//     var ifsNodes = [<span 5>]
//     nodeLists.register(ifsNodes);
//
// And then render `{{if}}`'s contents and update `ifsNodes` with it:
//
//     nodeLists.update( ifsNodes, [<"\nItems:\n">, <span data-view-id="6">] );
//
// Next, hookup `6` is called which will regsiter the `<span>` like:
//
//     var eachsNodes = [<span 6>];
//     nodeLists.register(eachsNodes);
//
// And then it will render `{{#each}}`'s content and update `eachsNodes` with it:
//
//     nodeLists.update(eachsNodes, [<label>,<label>]);
//
// As `nodeLists` knows that `eachsNodes` is inside `ifsNodes`, it also updates
// `ifsNodes`'s nodes to look like:
//
//     [<"\nItems:\n">,<label>,<label>]
//
// Now, if all items were removed, `{{#if}}` would be able to remove
// all the `<label>` elements.
//
// When you regsiter a nodeList, you can also provide a callback to know when
// that nodeList has been replaced by a parent nodeList.  This is
// useful for tearing down live-binding.
var nodeLists = {

   /**
	* @function can-view-nodelist.update update
	* @parent can-view-nodelist/methods
	*
	* @signature `nodeLists.update(nodeList, newNodes)`
	*
	* Updates a nodeList with new items, i.e. when values for the template have changed.
	*
	*   @param {can-view-nodelist/types/NodeList} nodeList The list to update with the new nodes.
	*   @param {can-view-nodelist/types/NodeList} newNodes The new nodes to update with.
	*
	*   @return {Array<Node>} The nodes that were removed from `nodeList`.
	*/
	update: function (nodeList, newNodes) {
		// Unregister all childNodeLists.
		var oldNodes = nodeLists.unregisterChildren(nodeList);

		newNodes = makeArray(newNodes);

		var oldListLength = nodeList.length;

		// Replace oldNodeLists's contents.
		splice.apply(nodeList, [
			0,
			oldListLength
		].concat(newNodes));

		// Replacements are nodes that have replaced the original element this is on.
		// We can't simply insert elements because stache does children before parents.
		if(nodeList.replacements){
			nodeLists.nestReplacements(nodeList);
			nodeList.deepChildren = nodeList.newDeepChildren;
			nodeList.newDeepChildren = [];
		} else {
			nodeLists.nestList(nodeList);
		}

		return oldNodes;
	},
   /**
	* @function can-view-nodelist.nestReplacements nestReplacements
	* @parent can-view-nodelist/methods
	* @signature `nodeLists.nestReplacements(list)`
	*
	* Goes through each node in the list. `[el1, el2, el3, ...]`
	* Finds the nodeList for that node in replacements.  el1's nodeList might look like `[el1, [el2]]`.
	* Replaces that element and any other elements in the node list with the
	* nodelist itself. resulting in `[ [el1, [el2]], el3, ...]`
	* If a replacement is not found, it was improperly added, so we add it as a deepChild.
	*
	* @param {can-view-nodelist/types/NodeList} list  The nodeList of nodes to go over
	*
	*/
	nestReplacements: function(list){
		var index = 0,
			// temporary id map that is limited to this call
			idMap = {},
			// replacements are in reverse order in the DOM
			rMap = replacementMap(list.replacements, idMap),
			rCount = list.replacements.length;

		while(index < list.length && rCount) {
			var node = list[index],
				replacement = rMap.get(node);
			if( replacement ) {
				rMap["delete"](node);
				list.splice( index, itemsInChildListTree(replacement), replacement );
				rCount--;
			}
			index++;
		}
		// Only do this if
		if(rCount) {
			addUnfoundAsDeepChildren(list, rMap );
		}

		list.replacements = [];
	},
	/**
	 * @function can-view-nodelist.nestList nestList
	 * @parent can-view-nodelist/methods
	 * @signature `nodeLists.nestList(list)`
	 *
	 * If a given list does not exist in the nodeMap then create an lookup
	 * id for it in the nodeMap and assign the list to it.
	 * If the the provided does happen to exist in the nodeMap update the
	 * elements in the list.
	 *
	 * @param {can-view-nodelist/types/NodeList} list The nodeList being nested.
	 *
	 */
	nestList: function(list){
		var index = 0;
		while(index < list.length) {
			var node = list[index],
				childNodeList = nodeMap.get(node);


			if(childNodeList) {
				// if this node is in another nodelist
				if(childNodeList !== list) {
					// update this nodeList to point to the childNodeList
					list.splice( index, itemsInChildListTree(childNodeList), childNodeList );
				}
			} else {
				// Indicate the new nodes belong to this list.
				nodeMap.set(node, list);
			}
			index++;
		}
	},

	/**
	 * @function can-view-nodelist.last last
	 * @parent can-view-nodelist/methods
	 * @signature `nodeLists.last(nodeList)`
	 *
	 * Return the last HTMLElement in a nodeList; if the last
	 * element is a nodeList, returns the last HTMLElement of
	 * the child list, etc.
	 *
	 * @param {can-view-nodelist/types/NodeList} nodeList A nodeList.
	 * @return {HTMLElement} The last element of the last list nested in this list.
	 *
	 */
	last: function(nodeList){
		var last = nodeList[nodeList.length - 1];
		// If the last node in the list is not an HTMLElement
		// it is a nodeList so call `last` again.
		if(last.nodeType) {
			return last;
		} else {
			return nodeLists.last(last);
		}
	},

	/**
	 * @function can-view-nodelist.first first
	 * @parent can-view-nodelist/methods
	 * @signature `nodeLists.first(nodeList)`
	 *
	 * Return the first HTMLElement in a nodeList; if the first
	 * element is a nodeList, returns the first HTMLElement of
	 * the child list, etc.
	 *
	 * @param {can-view-nodelist/types/NodeList} nodeList A nodeList.
	 * @return {HTMLElement} The first element of the first list nested in this list.
	 *
	 *
	 */
	first: function(nodeList) {
		var first = nodeList[0];
		// If the first node in the list is not an HTMLElement
		// it is a nodeList so call `first` again.
		if(first.nodeType) {
			return first;
		} else {
			return nodeLists.first(first);
		}
	},
	flatten: function(nodeList){
		var items = [];
		for(var i = 0 ; i < nodeList.length; i++) {
			var item = nodeList[i];
			if(item.nodeType) {
				items.push(item);
			} else {
				items.push.apply(items, nodeLists.flatten(item));
			}
		}
		return items;
	},
	/**
	 * @function can-view-nodelist.register register
	 * @parent can-view-nodelist/methods
	 *
	 * @signature `nodeLists.register(nodeList, unregistered, parent, directlyNested)`
	 *
	 * Registers a nodeList and returns the nodeList passed to register.
	 *
	 *   @param {can-view-nodelist/types/NodeList} nodeList A nodeList.
	 *   @param {function()} unregistered A callback to call when the nodeList is unregistered.
	 *   @param {can-view-nodelist/types/NodeList} parent The parent nodeList of this nodeList.
	 *   @param {Boolean} directlyNested `true` if nodes in the nodeList are direct children of the parent.
	 *   @return {can-view-nodelist/types/NodeList} The passed in nodeList.
	 *
	 */
	register: function (nodeList, unregistered, parent, directlyNested) {
		// If a unregistered callback has been provided assign it to the nodeList
		// as a property to be called when the nodeList is unregistred.
		nodeList.unregistered = unregistered;
		nodeList.parentList = parent;
		nodeList.nesting = parent && typeof parent.nesting !== 'undefined' ? parent.nesting + 1 : 0;

		if(parent) {
			nodeList.deepChildren = [];
			nodeList.newDeepChildren = [];
			nodeList.replacements = [];
			if(parent !== true) {
				if(directlyNested) {
					parent.replacements.push(nodeList);
				}
				else {
					parent.newDeepChildren.push(nodeList);
				}
			}
		}
		else {
			nodeLists.nestList(nodeList);
		}


		return nodeList;
	},

	/**
	 * @function can-view-nodelist.unregisterChildren unregisterChildren
	 * @parent can-view-nodelist/methods
	 * @signature `nodeLists.unregisterChildren(nodeList)`
	 *
	 * Unregister all childen within the provided list and return the
	 * unregistred nodes.
	 *
	 * @param {can-view-nodelist/types/NodeList} nodeList The nodeList of child nodes to unregister.
	 * @return {Array} The list of all nodes that were unregistered.
	 */
	unregisterChildren: function(nodeList){
		var nodes = [];
		// For each node in the nodeList we want to compute it's id
		// and delete it from the nodeList's internal map.
		each(nodeList, function (node) {
			// If the node does not have a nodeType it is an array of
			// nodes.
			if(node.nodeType) {
				if(!nodeList.replacements) {
					nodeMap["delete"](node);
				}

				nodes.push(node);
			} else {
				// Recursively unregister each of the child lists in
				// the nodeList.
				push.apply(nodes, nodeLists.unregister(node, true));
			}
		});

		each(nodeList.deepChildren, function(nodeList){
			nodeLists.unregister(nodeList, true);
		});

		return nodes;
	},

	/**
		@function can-view-nodelist.unregister unregister
		@parent can-view-nodelist/methods
		@signature `nodeLists.unregister(nodeList, isChild)`
		@param {ArrayLike} nodeList a nodeList to unregister from its parent
		@param {isChild}  true if the nodeList is a direct child, false if a deep child
		@return {Array}   a list of all nodes that were unregistered

		Unregister's a nodeList and returns the unregistered nodes.
		Call if the nodeList is no longer being updated. This will
		also unregister all child nodeLists.
	*/
	unregister: function (nodeList, isChild) {
		var nodes = nodeLists.unregisterChildren(nodeList, true);

		// If an 'unregisted' function was provided during registration, remove
		// it from the list, and call the function provided.
		if (nodeList.unregistered) {
			var unregisteredCallback = nodeList.unregistered;
			nodeList.replacements = nodeList.unregistered = null;
			if(!isChild) {
				var deepChildren = nodeList.parentList && nodeList.parentList.deepChildren;
				if(deepChildren) {
					var index = deepChildren.indexOf(nodeList);
					if(index !== -1) {
						deepChildren.splice(index,1);
					}
				}
			}
			unregisteredCallback();
		}
		return nodes;
	},
	/**
	 * @function can-view-nodelist.after after
	 * @parent can-view-nodelist/methods
	 * @hide
	 * @signature `nodeLists.after(oldElements, newFrag)`
	 *
	 *   Inserts `newFrag` after `oldElements`.
	 *
	 *   @param {ArrayLike<Node>} oldElements The elements to use as reference.
	 *   @param {DocumentFragment} newFrag The fragment to insert.
	 *
	 */
	after: function (oldElements, newFrag) {
		var last = oldElements[oldElements.length - 1];
		// Insert it in the `document` or `documentFragment`
		if (last.nextSibling) {
			domMutate.insertBefore.call(last.parentNode, newFrag, last.nextSibling);
		} else {
			domMutate.appendChild.call(last.parentNode, newFrag );
		}
	},
	/**
	 * @function can-view-nodelist.replace replace
	 * @hide
	 * @parent can-view-nodelist/methods
	 * @signature `nodeLists.replace(oldElements, newFrag)`
	 *
	 * Replaces `oldElements` with `newFrag`.
	 *
	 * @param {Array<Node>} oldElements the list elements to remove
	 * @param {DocumentFragment} newFrag the fragment to replace the old elements
	 *
	 */
	replace: function (oldElements, newFrag) {
		// The following helps make sure that a selected <option> remains
		// the same by removing `selected` from the currently selected option
		// and adding selected to an option that has the same value.
		var selectedValue,
			parentNode = oldElements[0].parentNode;

		if(parentNode.nodeName.toUpperCase() === "SELECT" && parentNode.selectedIndex >= 0) {
			selectedValue = parentNode.value;
		}
		if(oldElements.length === 1) {
			domMutate.replaceChild.call(parentNode, newFrag, oldElements[0]);
		} else {
			nodeLists.after(oldElements, newFrag);
			nodeLists.remove(oldElements);
		}

		if(selectedValue !== undefined) {
			parentNode.value = selectedValue;
		}
	},
	/**
	 * @function can-view-nodelist.remove remove
	 * @parent can-view-nodelist/methods
	 * @hide
	 * @signature `nodeLists.remove(elementsToBeRemoved)`
	 *
	 * Remove all Nodes in `oldElements` from the DOM.
	 *
	 * @param {ArrayLike<Node>} oldElements the list of Elements to remove (must have a common parent)
	 *
	 */
	remove: function(elementsToBeRemoved){
		var parent = elementsToBeRemoved[0] && elementsToBeRemoved[0].parentNode;
		each(elementsToBeRemoved, function(child){
			domMutate.removeChild.call(parent, child);
		});
	},
	nodeMap: nodeMap
};
module.exports = namespace.nodeLists = nodeLists;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(13)();
var setMutationObserver;
module.exports = function(setMO){
	if(setMO !== undefined) {
		setMutationObserver = setMO;
	}
	return setMutationObserver !== undefined ? setMutationObserver :
		global.MutationObserver || global.WebKitMutationObserver || global.MozMutationObserver;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* jshint unused: false */

/**
 * @module {function} can-util/js/is-empty-object/is-empty-object is-empty-object
 * @parent can-util/js
 * @signature `isEmptyObject(obj)`
 *
 * Used to determine if an object is an empty object (an object with no enumerable properties) such as `{}`.
 *
 * ```js
 * var isEmptyObject = require("can-util/js/is-empty-object/is-empty-object");
 *
 * console.log(isEmptyObject({})); // -> true
 *
 * console.log(isEmptyObject({ a: 1 })); // -> false
 *
 * var obj = {};
 * Object.defineProperty(obj, "foo", {
 *     enumerable: false,
 *     value: "bar"
 * });
 * console.log(isEmptyObject(obj)); // -> true
 * ```
 *
 * @param {Object} obj Any object.
 * @return {Boolean} True if the object is an object with no enumerable properties.
 */
module.exports = function(obj){
	for(var prop in obj) {
		return false;
	}
	return true;
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @module {function} can-util/js/is-function/is-function is-function
 * @parent can-util/js
 *
 * @signature `isFunction(value)`
 *
 * @param {*} value the item to test for being a function
 * @return {Boolean} True if the provided argument is a function.
 *
 * ```js
 * var isFunction = require("can-util/js/is-function/is-function");
 *
 * console.log(isFunction(function(){})); // -> true
 *
 * console.log(isFunction({})); // -> false
 * ```
 *
 */
var isFunction = (function() {
	if (typeof document !== 'undefined' && typeof document.getElementsByTagName('body') === 'function') {
		return function(value) {
			return Object.prototype.toString.call(value) === '[object Function]';
		};
	}
	return function(value) {
		return typeof value === 'function';
	};
}());

module.exports = isFunction;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// # can/util/attr.js
// Central location for attribute changing to occur, used to trigger an
// `attributes` event on elements. This enables the user to do (jQuery example): `$(el).bind("attributes", function(ev) { ... })` where `ev` contains `attributeName` and `oldValue`.
var setImmediate = __webpack_require__(53);
var getDocument = __webpack_require__(5);
var global = __webpack_require__(13)();
var isOfGlobalDocument = __webpack_require__(49);
var setData = __webpack_require__(10);
var domContains = __webpack_require__(60);
var domEvents = __webpack_require__(8);
var domDispatch = __webpack_require__(17);
var MUTATION_OBSERVER = __webpack_require__(21);
var each = __webpack_require__(1);
var types = __webpack_require__(0);
var diff = __webpack_require__(51);

__webpack_require__(91);
__webpack_require__(62);

var namespaces = {
	'xlink': 'http://www.w3.org/1999/xlink'
};

var formElements = {"INPUT": true, "TEXTAREA": true, "SELECT": true},
	// Used to convert values to strings.
	toString = function(value){
		if(value == null) {
			return "";
		} else {
			return ""+value;
		}
	},
	isSVG = function(el){
		return el.namespaceURI === "http://www.w3.org/2000/svg";
	},
	truthy = function() { return true; },
	getSpecialTest = function(special){
		return (special && special.test) || truthy;
	},
	propProp = function(prop, obj){
		obj = obj || {};
		obj.get = function(){
			return this[prop];
		};
		obj.set = function(value){
			if(this[prop] !== value) {
				this[prop] = value;
			}
			return value;
		};
		return obj;
	},
	booleanProp = function(prop){
		return {
			isBoolean: true,
			set: function(value){
				if(prop in this) {
					this[prop] = value !== false;
				} else {
					this.setAttribute(prop, "");
				}
			},
			remove: function(){
				this[prop] = false;
			}
		};
	},
	setupMO = function(el, callback){
		var attrMO = setData.get.call(el, "attrMO");
		if(!attrMO) {
			var onMutation = function(){
				callback.call(el);
			};
			var MO = MUTATION_OBSERVER();
			if(MO) {
				var observer = new MO(onMutation);
				observer.observe(el, {
					childList: true,
					subtree: true
				});
				setData.set.call(el, "attrMO", observer);
			} else {
				setData.set.call(el, "attrMO", true);
				setData.set.call(el, "canBindingCallback", {onMutation: onMutation});
			}
		}
	},
	_findOptionToSelect = function (parent, value) {
		var child = parent.firstChild;
		while (child) {
			if (child.nodeName === 'OPTION' && value === child.value) {
				return child;
			}
			if (child.nodeName === 'OPTGROUP') {
				var groupChild = _findOptionToSelect(child, value);
				if (groupChild) {
					return groupChild;
				}
			}
			child = child.nextSibling;
		}
	},
	setChildOptions = function(el, value){
		var option;
		if (value != null) {
			option = _findOptionToSelect(el, value);
		}
		if (option) {
			option.selected = true;
		} else {
			el.selectedIndex = -1;
		}
	},
	forEachOption = function (parent, fn) {
		var child = parent.firstChild;
		while (child) {
			if (child.nodeName === 'OPTION') {
				fn(child);
			}
			if (child.nodeName === 'OPTGROUP') {
				forEachOption(child, fn);
			}
			child = child.nextSibling;
		}
	},
	collectSelectedOptions = function (parent) {
		var selectedValues = [];
		forEachOption(parent, function (option) {
			if (option.selected) {
				selectedValues.push(option.value);
			}
		});
		return selectedValues;
	},
	markSelectedOptions = function (parent, values) {
		forEachOption(parent, function (option) {
			option.selected = values.indexOf(option.value) !== -1;
		});
	},
	// Create a handler, only once, that will set the child options any time
	// the select's value changes.
	setChildOptionsOnChange = function(select, aEL){
		var handler = setData.get.call(select, "attrSetChildOptions");
		if(handler) {
			return Function.prototype;
		}
		handler = function(){
			setChildOptions(select, select.value);
		};
		setData.set.call(select, "attrSetChildOptions", handler);
		aEL.call(select, "change", handler);
		return function(rEL){
			setData.clean.call(select, "attrSetChildOptions");
			rEL.call(select, "change", handler);
		};
	},
	attr = {
		special: {
			checked: {
				get: function(){
					return this.checked;
				},
				set: function(val){
					// - `set( truthy )` => TRUE
					// - `set( "" )`     => TRUE
					// - `set()`         => TRUE
					// - `set(undefined)` => false.
					var notFalse = !!val || val === "" || arguments.length === 0;
					this.checked = notFalse;
					if(notFalse && this.type === "radio") {
						this.defaultChecked = true;
					}

					return val;
				},
				remove: function(){
					this.checked = false;
				},
				test: function(){
					return this.nodeName === "INPUT";
				}
			},
			"class": {
				get: function(){
					if(isSVG(this)) {
						return this.getAttribute("class");
					}
					return this.className;
				},
				set: function(val){
					val = val || "";

					if(isSVG(this)) {
						this.setAttribute("class", "" + val);
					} else {
						this.className = val;
					}
					return val;
				}
			},
			disabled: booleanProp("disabled"),
			focused: {
				get: function(){
					return this === document.activeElement;
				},
				set: function(val){
					var cur = attr.get(this, 'focused');
					var docEl = this.ownerDocument.documentElement;
					var element = this;
					function focusTask() {
						if (val) {
							element.focus();
						} else {
							element.blur();
						}                            		
					}
					if (cur !== val) {
						if (!domContains.call(docEl, element)) {
							var initialSetHandler = function () {
								domEvents.removeEventListener.call(element, 'inserted', initialSetHandler);
								focusTask();
							};
							domEvents.addEventListener.call(element, 'inserted', initialSetHandler);
						} else {
							types.queueTask([
								focusTask,
								this,
								[]
							]);
						}
					}
					return !!val;
				},
				addEventListener: function(eventName, handler, aEL){
					aEL.call(this, "focus", handler);
					aEL.call(this, "blur", handler);
					return function(rEL){
						rEL.call(this, "focus", handler);
						rEL.call(this, "blur", handler);
					};
				},
				test: function(){
					return this.nodeName === "INPUT";
				}
			},
			"for": propProp("htmlFor"),
			innertext: propProp("innerText"),
			innerhtml: propProp("innerHTML"),
			innerHTML: propProp("innerHTML", {
				addEventListener: function(eventName, handler, aEL){
					var handlers = [];
					var el = this;
					each(["change", "blur"], function(eventName){
						var localHandler = function(){
							handler.apply(this, arguments);
						};
						domEvents.addEventListener.call(el, eventName, localHandler);
						handlers.push([eventName, localHandler]);
					});

					return function(rEL){
						each(handlers, function(info){
							rEL.call(el, info[0], info[1]);
						});
					};
				}
			}),
			required: booleanProp("required"),
			readonly: booleanProp("readOnly"),
			selected: {
				get: function(){
					return this.selected;
				},
				set: function(val){
					val = !!val;
					setData.set.call(this, "lastSetValue", val);
					return this.selected = val;
				},
				addEventListener: function(eventName, handler, aEL){
					var option = this;
					var select = this.parentNode;
					var lastVal = option.selected;
					var localHandler = function(changeEvent){
						var curVal = option.selected;
						lastVal = setData.get.call(option, "lastSetValue") || lastVal;
						if(curVal !== lastVal) {
							lastVal = curVal;

							domDispatch.call(option, eventName);
						}
					};

					var removeChangeHandler = setChildOptionsOnChange(select, aEL);
					domEvents.addEventListener.call(select, "change", localHandler);
					aEL.call(option, eventName, handler);

					return function(rEL){
						removeChangeHandler(rEL);
						domEvents.removeEventListener.call(select, "change", localHandler);
						rEL.call(option, eventName, handler);
					};
				},
				test: function(){
					return this.nodeName === "OPTION" && this.parentNode &&
						this.parentNode.nodeName === "SELECT";
				}
			},
			src: {
				set: function (val) {
					if (val == null || val === "") {
						this.removeAttribute("src");
						return null;
					} else {
						this.setAttribute("src", val);
						return val;
					}
				}
			},
			style: {
				set: (function () {
					var el = global.document && getDocument().createElement('div');
					if ( el && el.style && ("cssText" in el.style) ) {
						return function (val) {
							return this.style.cssText = (val || "");
						};
					} else {
						return function (val) {
							return this.setAttribute("style", val);
						};
					}
				})()
			},
			textcontent: propProp("textContent"),
			value: {
				get: function(){
					var value = this.value;
					if(this.nodeName === "SELECT") {
						if(("selectedIndex" in this) && this.selectedIndex === -1) {
							value = undefined;
						}
					}
					return value;
				},
				set: function(value){
					var nodeName = this.nodeName.toLowerCase();
					if(nodeName === "input") {
						// Do some input types support non string values?
						value = toString(value);
					}
					if(this.value !== value || nodeName === "option") {
						this.value = value;
					}
					if(attr.defaultValue[nodeName]) {
						this.defaultValue = value;
					}
					if(nodeName === "select") {
						setData.set.call(this, "attrValueLastVal", value);
						//If it's null then special case
						setChildOptions(this, value === null ? value : this.value);

						// If not in the document reset the value when inserted.
						var docEl = this.ownerDocument.documentElement;
						if(!domContains.call(docEl, this)) {
							var select = this;
							var initialSetHandler = function(){
								domEvents.removeEventListener.call(select, "inserted", initialSetHandler);
								setChildOptions(select, value === null ? value : select.value);
							};
							domEvents.addEventListener.call(this, "inserted", initialSetHandler);
						}

						// MO handler is only set up **ONCE**
						setupMO(this, function(){
							var value = setData.get.call(this, "attrValueLastVal");
							attr.set(this, "value", value);
							domDispatch.call(this, "change");
						});
					}
					return value;
				},
				test: function(){
					return formElements[this.nodeName];
				}
			},
			values: {
				get: function(){
					return collectSelectedOptions(this);
				},
				set: function(values){
					values = values || [];

					// set new DOM state
					markSelectedOptions(this, values);

					// store new DOM state
					setData.set.call(this, "stickyValues", attr.get(this,"values") );

					// MO handler is only set up **ONCE**
					// TODO: should this be moved into addEventListener?
					setupMO(this, function(){

						// Get the previous sticky state
						var previousValues = setData.get.call(this,
							"stickyValues");

						// Set DOM to previous sticky state
						attr.set(this, "values", previousValues);

						// Get the new result after trying to maintain the sticky state
						var currentValues = setData.get.call(this,
							"stickyValues");

						// If there are changes, trigger a `values` event.
						var changes = diff(previousValues.slice().sort(),
							currentValues.slice().sort());

						if (changes.length) {
							domDispatch.call(this, "values");
						}
					});

					return values;
				},
				addEventListener: function(eventName, handler, aEL){
					var localHandler = function(){
						domDispatch.call(this, "values");
					};

					domEvents.addEventListener.call(this, "change", localHandler);
					aEL.call(this, eventName, handler);

					return function(rEL){
						domEvents.removeEventListener.call(this, "change", localHandler);
						rEL.call(this, eventName, handler);
					};
				}
			}
		},
		// These are elements whos default value we should set.
		defaultValue: {input: true, textarea: true},
		setAttrOrProp: function(el, attrName, val){
			attrName = attrName.toLowerCase();
			var special = attr.special[attrName];
			if(special && special.isBoolean && !val) {
				this.remove(el, attrName);
			} else {
				this.set(el, attrName, val);
			}
		},
		// ## attr.set
		// Set the value an attribute on an element.
		set: function (el, attrName, val) {
			var usingMutationObserver = isOfGlobalDocument(el) && MUTATION_OBSERVER();
			attrName = attrName.toLowerCase();
			var oldValue;
			// In order to later trigger an event we need to compare the new value to the old value,
			// so here we go ahead and retrieve the old value for browsers that don't have native MutationObservers.
			if (!usingMutationObserver) {
				oldValue = attr.get(el, attrName);
			}

			var newValue;
			var special = attr.special[attrName];
			var setter = special && special.set;
			var test = getSpecialTest(special);

			// First check if this is a special attribute with a setter.
			// Then run the special's test function to make sure we should
			// call its setter, and if so use the setter.
			// Otherwise fallback to setAttribute.
			if(typeof setter === "function" && test.call(el)) {
				// To distinguish calls with explicit undefined, e.g.:
				// - `attr.set(el, "checked")`
				// - `attr.set(el, "checked", undefined)`
				if (arguments.length === 2){
					newValue = setter.call(el);
				} else {
					newValue = setter.call(el, val);
				}
			} else {
				attr.setAttribute(el, attrName, val);
			}

			if (!usingMutationObserver && newValue !== oldValue) {
				attr.trigger(el, attrName, oldValue);
			}
		},
		setSelectValue: function(el, value){
			attr.set(el, "value", value);
		},
		setAttribute: (function(){
			var doc = getDocument();
			if(doc && document.createAttribute) {
				try {
					doc.createAttribute("{}");
				} catch(e) {
					var invalidNodes = {},
						attributeDummy = document.createElement('div');

					return function(el, attrName, val){
						var first = attrName.charAt(0),
							cachedNode,
							node,
							attr;
						if((first === "{" || first === "(" || first === "*") && el.setAttributeNode) {
							cachedNode = invalidNodes[attrName];
							if(!cachedNode) {
								attributeDummy.innerHTML = '<div ' + attrName + '=""></div>';
								cachedNode = invalidNodes[attrName] = attributeDummy.childNodes[0].attributes[0];
							}
							node = cachedNode.cloneNode();
							node.value = val;
							el.setAttributeNode(node);
						} else {
							attr = attrName.split(':');

							if(attr.length !== 1) {
								el.setAttributeNS(namespaces[attr[0]], attrName, val);
							}
							else {
								el.setAttribute(attrName, val);
							}
						}
					};
				}
			}
			return function(el, attrName, val){
				el.setAttribute(attrName, val);
			};

		})(),
		// ## attr.trigger
		// Used to trigger an "attributes" event on an element. Checks to make sure that someone is listening for the event and then queues a function to be called asynchronously using `setImmediate.
		trigger: function (el, attrName, oldValue) {
			if (setData.get.call(el, "canHasAttributesBindings")) {
				attrName = attrName.toLowerCase();
				return setImmediate(function () {
					domDispatch.call(el, {
						type: "attributes",
						attributeName: attrName,
						target: el,
						oldValue: oldValue,
						bubbles: false
					}, []);
				});
			}
		},
		// ## attr.get
		// Gets the value of an attribute. First checks if the property is an `attr.special` and if so calls the special getter. Otherwise uses `getAttribute` to retrieve the value.
		get: function (el, attrName) {
			attrName = attrName.toLowerCase();

			var special = attr.special[attrName];
			var getter = special && special.get;
			var test = getSpecialTest(special);

			if(typeof getter === "function" && test.call(el)) {
				return getter.call(el);
			} else {
				return el.getAttribute(attrName);
			}
		},
		// ## attr.remove
		// Removes an attribute from an element. First checks attr.special to see if the attribute is special and has a setter. If so calls the setter with `undefined`. Otherwise `removeAttribute` is used.
		// If the attribute previously had a value and the browser doesn't support MutationObservers we then trigger an "attributes" event.
		remove: function (el, attrName) {
			attrName = attrName.toLowerCase();
			var oldValue;
			if (!MUTATION_OBSERVER()) {
				oldValue = attr.get(el, attrName);
			}

			var special = attr.special[attrName];
			var setter = special && special.set;
			var remover = special && special.remove;
			var test = getSpecialTest(special);

			if(typeof remover === "function" && test.call(el)) {
				remover.call(el);
			} else if(typeof setter === "function" && test.call(el)) {
				setter.call(el, undefined);
			} else {
				el.removeAttribute(attrName);
			}

			if (!MUTATION_OBSERVER() && oldValue != null) {
				attr.trigger(el, attrName, oldValue);
			}
		},
		// ## attr.has
		// Checks if an element contains an attribute.
		// For browsers that support `hasAttribute`, creates a function that calls hasAttribute, otherwise creates a function that uses `getAttribute` to check that the attribute is not null.
		has: (function () {
			var el = getDocument() && document.createElement('div');
			if (el && el.hasAttribute) {
				return function (el, name) {
					return el.hasAttribute(name);
				};
			} else {
				return function (el, name) {
					return el.getAttribute(name) !== null;
				};
			}
		})()
	};

var oldAddEventListener = domEvents.addEventListener;
domEvents.addEventListener = function(eventName, handler){
	var special = attr.special[eventName];

	if(special && special.addEventListener) {
		var teardown = special.addEventListener.call(this, eventName, handler,
																								oldAddEventListener);
		var teardowns = setData.get.call(this, "attrTeardowns");
		if(!teardowns) {
			setData.set.call(this, "attrTeardowns", teardowns = {});
		}

		if(!teardowns[eventName]) {
			teardowns[eventName] = [];
		}

		teardowns[eventName].push({
			teardown: teardown,
			handler: handler
		});
		return;
	}

	return oldAddEventListener.apply(this, arguments);
};

var oldRemoveEventListener = domEvents.removeEventListener;
domEvents.removeEventListener = function(eventName, handler){
	var special = attr.special[eventName];
	if(special && special.addEventListener) {
		var teardowns = setData.get.call(this, "attrTeardowns");
		if(teardowns && teardowns[eventName]) {
			var eventTeardowns = teardowns[eventName];
			for(var i = 0, len = eventTeardowns.length; i < len; i++) {
				if(eventTeardowns[i].handler === handler) {
					eventTeardowns[i].teardown.call(this, oldRemoveEventListener);
					eventTeardowns.splice(i, 1);
					break;
				}
			}
			if(eventTeardowns.length === 0) {
				delete teardowns[eventName];
			}
		}
		return;
	}
	return oldRemoveEventListener.apply(this, arguments);
};

module.exports = exports = attr;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var parser = __webpack_require__(54);
var domEvents = __webpack_require__(8);
var nodeLists = __webpack_require__(20);
var makeFrag = __webpack_require__(36);
var childNodes = __webpack_require__(16);

__webpack_require__(48);

var childMutationCallbacks = {};


/**
 * @module {{}} can-view-live can-view-live
 * @parent can-infrastructure
 * @package ../package.json
 *
 * Setup live-binding between the DOM and a compute manually.
 *
 * @option {Object} An object with the live-binding methods:
 * [can-view-live.html], [can-view-live.list], [can-view-live.text], and
 * [can-view-live.attr].
 *
 * @release 2.0.4
 *
 * @body
 *
 * ## Use
 *
 *  [can-view-live] is an object with utility methods for setting up
 *  live-binding in relation to different parts of the DOM and DOM elements.  For
 *  example, to make an `<h2>`'s text stay live with
 *  a compute:
 *
 *   var live = require("can-view-live");
 *   var text = canCompute("Hello World");
 *   var textNode = $("h2").text(" ")[0].childNodes[0];
 *   live.text(textNode, text);
 *
 *
 */
var live = {
	setup: function (el, bind, unbind) {
		// #### setup
		// Setup a live listener on an element that binds now,
		//  but unbinds when an element is no longer in the DOM 
		var tornDown = false,
			teardown = function () {
				// Removing an element can call teardown which
				// unregister the nodeList which calls teardown
				if (!tornDown) {
					tornDown = true;
					unbind(data);
					domEvents.removeEventListener.call(el, 'removed', teardown);
				}
				return true;
			}, data = {
				teardownCheck: function (parent) {
					return parent ? false : teardown();
				}
			};
		domEvents.addEventListener.call(el, 'removed', teardown);
		bind(data);
		return data;
	},
	// #### listen
	// Calls setup, but presets bind and unbind to
	// operate on a compute
	listen: function (el, compute, change) {
		return live.setup(el, function () {
			compute.computeInstance.addEventListener('change', change);
		}, function (data) {
			compute.computeInstance.removeEventListener('change', change);
			if (data.nodeList) {
				nodeLists.unregister(data.nodeList);
			}
		});
	},
	// #### getAttributeParts
	// Breaks up a string like foo='bar' into an object of {"foo": "bar"} pairs
	// See can-view-parser for more about attrStart/attrEnd/attrValue
	getAttributeParts: function (newVal) {
		var attrs = {},
			attr;
		parser.parseAttrs(newVal,{
			attrStart: function(name){
				attrs[name] = "";
				attr = name;
			},
			attrValue: function(value){
				attrs[attr] += value;
			},
			attrEnd: function(){}
		});
		return attrs;
	},
	// #### isNode
	// Checks a possible node object for the nodeType property
	isNode: function(obj){
		return obj && obj.nodeType;
	},
	// #### addTextNodeIfNoChildren
	// Append an empty text node to a parent with no children;
	//  do nothing if the parent already has children.
	addTextNodeIfNoChildren: function(frag){
		if(!frag.firstChild) {
			frag.appendChild(frag.ownerDocument.createTextNode(""));
		}
	},
	// #### registerChildMutationCallback
	// Getter/setter for mutation callbacks
	registerChildMutationCallback: function(tag, callback){
		if(callback) {
			childMutationCallbacks[tag] = callback;
		} else {
			return childMutationCallbacks[tag];
		}
	},
	callChildMutationCallback: function(el) {
		var callback = el && childMutationCallbacks[el.nodeName.toLowerCase()];
		if(callback) {
			callback(el);
		}
	},


	/**
	 * @function can.view.live.replace
	 * @parent can.view.live
	 * @release 2.0.4
	 *
	 * Replaces one element with some content while keeping [can.view.live.nodeLists nodeLists] data
	 * correct.
	 *
	 * @param {Array.<HTMLElement>} nodes An array of elements.  There should typically be one element.
	 * @param {String|HTMLElement|DocumentFragment} val The content that should replace
	 * `nodes`.  If a string is passed, it will be [can.view.hookup hookedup].
	 *
	 * @param {function} [teardown] A callback if these elements are torn down.
	 */
	replace: function (nodes, val, teardown) {
		// #### replace
		// Replaces one element with some content while keeping nodeLists data
		// correct.
		// 
		// Take a copy of old nodeList
		var oldNodes = nodes.slice(0),
			frag = makeFrag(val);
		// Register a teardown callback
		nodeLists.register(nodes, teardown);
		// Mark each node as belonging to the node list.
		nodeLists.update(nodes, childNodes(frag));
		// Replace old nodes with new on the DOM
		nodeLists.replace(oldNodes, frag);
		return nodes;
	},
	// #### getParentNode
	// Return default parent if el is a fragment, el's parent otherwise
	getParentNode: function (el, defaultParentNode) {
		return defaultParentNode && el.parentNode.nodeType === 11 ? defaultParentNode : el.parentNode;
	},
	// #### makeString
	// any -> string converter (including nullish)
	makeString: function(txt){
		return txt == null ? "" : ""+txt;
	}
};

module.exports = live;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var require;/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.1.0
 */

(function (global, factory) {
     true ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  return typeof x === 'function' || typeof x === 'object' && x !== null;
}

function isFunction(x) {
  return typeof x === 'function';
}

var _isArray = undefined;
if (!Array.isArray) {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
} else {
  _isArray = Array.isArray;
}

var isArray = _isArray;

var len = 0;
var vertxNext = undefined;
var customSchedulerFn = undefined;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var r = require;
    var vertx = __webpack_require__(122);
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var _arguments = arguments;

  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;

  if (_state) {
    (function () {
      var callback = _arguments[_state - 1];
      asap(function () {
        return invokeCallback(_state, child, callback, parent._result);
      });
    })();
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  _resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var GET_THEN_ERROR = new ErrorObject();

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    GET_THEN_ERROR.error = error;
    return GET_THEN_ERROR;
  }
}

function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
  try {
    then.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        _resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      _reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      _reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    _reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return _resolve(promise, value);
    }, function (reason) {
      return _reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$) {
  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$ === GET_THEN_ERROR) {
      _reject(promise, GET_THEN_ERROR.error);
      GET_THEN_ERROR.error = null;
    } else if (then$$ === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$)) {
      handleForeignThenable(promise, maybeThenable, then$$);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function _resolve(promise, value) {
  if (promise === value) {
    _reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function _reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = undefined,
      callback = undefined,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function ErrorObject() {
  this.error = null;
}

var TRY_CATCH_ERROR = new ErrorObject();

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = undefined,
      error = undefined,
      succeeded = undefined,
      failed = undefined;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      _reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
      _resolve(promise, value);
    } else if (failed) {
      _reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      _reject(promise, value);
    }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      _resolve(promise, value);
    }, function rejectPromise(reason) {
      _reject(promise, reason);
    });
  } catch (e) {
    _reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function Enumerator(Constructor, input) {
  this._instanceConstructor = Constructor;
  this.promise = new Constructor(noop);

  if (!this.promise[PROMISE_ID]) {
    makePromise(this.promise);
  }

  if (isArray(input)) {
    this._input = input;
    this.length = input.length;
    this._remaining = input.length;

    this._result = new Array(this.length);

    if (this.length === 0) {
      fulfill(this.promise, this._result);
    } else {
      this.length = this.length || 0;
      this._enumerate();
      if (this._remaining === 0) {
        fulfill(this.promise, this._result);
      }
    }
  } else {
    _reject(this.promise, validationError());
  }
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
};

Enumerator.prototype._enumerate = function () {
  var length = this.length;
  var _input = this._input;

  for (var i = 0; this._state === PENDING && i < length; i++) {
    this._eachEntry(_input[i], i);
  }
};

Enumerator.prototype._eachEntry = function (entry, i) {
  var c = this._instanceConstructor;
  var resolve$$ = c.resolve;

  if (resolve$$ === resolve) {
    var _then = getThen(entry);

    if (_then === then && entry._state !== PENDING) {
      this._settledAt(entry._state, i, entry._result);
    } else if (typeof _then !== 'function') {
      this._remaining--;
      this._result[i] = entry;
    } else if (c === Promise) {
      var promise = new c(noop);
      handleMaybeThenable(promise, entry, _then);
      this._willSettleAt(promise, i);
    } else {
      this._willSettleAt(new c(function (resolve$$) {
        return resolve$$(entry);
      }), i);
    }
  } else {
    this._willSettleAt(resolve$$(entry), i);
  }
};

Enumerator.prototype._settledAt = function (state, i, value) {
  var promise = this.promise;

  if (promise._state === PENDING) {
    this._remaining--;

    if (state === REJECTED) {
      _reject(promise, value);
    } else {
      this._result[i] = value;
    }
  }

  if (this._remaining === 0) {
    fulfill(promise, this._result);
  }
};

Enumerator.prototype._willSettleAt = function (promise, i) {
  var enumerator = this;

  subscribe(promise, undefined, function (value) {
    return enumerator._settledAt(FULFILLED, i, value);
  }, function (reason) {
    return enumerator._settledAt(REJECTED, i, reason);
  });
};

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  _reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {function} resolver
  Useful for tooling.
  @constructor
*/
function Promise(resolver) {
  this[PROMISE_ID] = nextId();
  this._result = this._state = undefined;
  this._subscribers = [];

  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
  }
}

Promise.all = all;
Promise.race = race;
Promise.resolve = resolve;
Promise.reject = reject;
Promise._setScheduler = setScheduler;
Promise._setAsap = setAsap;
Promise._asap = asap;

Promise.prototype = {
  constructor: Promise,

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.
  
    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```
  
    Chaining
    --------
  
    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.
  
    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });
  
    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we're unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
  
    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```
  
    Assimilation
    ------------
  
    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```
  
    If the assimliated promise rejects, then the downstream promise will also reject.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```
  
    Simple Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let result;
  
    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```
  
    Advanced Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let author, books;
  
    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
  
    function foundBooks(books) {
  
    }
  
    function failure(reason) {
  
    }
  
    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```
  
    @method then
    @param {Function} onFulfilled
    @param {Function} onRejected
    Useful for tooling.
    @return {Promise}
  */
  then: then,

  /**
    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
    as the catch block of a try/catch statement.
  
    ```js
    function findAuthor(){
      throw new Error('couldn't find that author');
    }
  
    // synchronous
    try {
      findAuthor();
    } catch(reason) {
      // something went wrong
    }
  
    // async with promises
    findAuthor().catch(function(reason){
      // something went wrong
    });
    ```
  
    @method catch
    @param {Function} onRejection
    Useful for tooling.
    @return {Promise}
  */
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};

function polyfill() {
    var local = undefined;

    if (typeof global !== 'undefined') {
        local = global;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
        }
    }

    var P = local.Promise;

    if (P) {
        var promiseToString = null;
        try {
            promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
            // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
            return;
        }
    }

    local.Promise = Promise;
}

// Strange compat..
Promise.polyfill = polyfill;
Promise.Promise = Promise;

return Promise;

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(55), __webpack_require__(70)))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var assign = __webpack_require__(3);
var deepAssign = __webpack_require__(97);
var dev = __webpack_require__(6);
var makeArray = __webpack_require__(12);
var types = __webpack_require__(0);
var namespace = __webpack_require__(2);
//!steal-remove-start
var CanString = __webpack_require__(19);
var reservedWords = {
	"abstract": true,
	"boolean": true,
	"break": true,
	"byte": true,
	"case": true,
	"catch": true,
	"char": true,
	"class": true,
	"const": true,
	"continue": true,
	"debugger": true,
	"default": true,
	"delete": true,
	"do": true,
	"double": true,
	"else": true,
	"enum": true,
	"export": true,
	"extends": true,
	"false": true,
	"final": true,
	"finally": true,
	"float": true,
	"for": true,
	"function": true,
	"goto": true,
	"if": true,
	"implements": true,
	"import": true,
	"in": true,
	"instanceof": true,
	"int": true,
	"interface": true,
	"let": true,
	"long": true,
	"native": true,
	"new": true,
	"null": true,
	"package": true,
	"private": true,
	"protected": true,
	"public": true,
	"return": true,
	"short": true,
	"static": true,
	"super": true,
	"switch": true,
	"synchronized": true,
	"this": true,
	"throw": true,
	"throws": true,
	"transient": true,
	"true": true,
	"try": true,
	"typeof": true,
	"var": true,
	"void": true,
	"volatile": true,
	"while": true,
	"with": true
};
var constructorNameRegex = /[^A-Z0-9_]/gi;
//!steal-remove-end

// ## construct.js
// `Construct`
// _This is a modified version of
// [John Resig's class](http://ejohn.org/blog/simple-javascript-inheritance/).
// It provides class level inheritance and callbacks._
// A private flag used to initialize a new class instance without
// initializing it's bindings.
var initializing = 0;

//!steal-remove-start
var namedCtor = (function(cache){
	return function(name, fn) {
		return ((name in cache) ? cache[name] : cache[name] = new Function(
			"__", "function "+name+"(){return __.apply(this,arguments)};return "+name
		))( fn );
	};
}({}));
//!steal-remove-end

/**
 * @add can-construct
 */
var Construct = function () {
	if (arguments.length) {
		return Construct.extend.apply(Construct, arguments);
	}
};

var canGetDescriptor;
try {
	Object.getOwnPropertyDescriptor({});
	canGetDescriptor = true;
} catch(e) {
	canGetDescriptor = false;
}

var getDescriptor = function(newProps, name) {
		var descriptor = Object.getOwnPropertyDescriptor(newProps, name);
		if(descriptor && (descriptor.get || descriptor.set)) {
			return descriptor;
		}
		return null;
	},
	inheritGetterSetter = function(newProps, oldProps, addTo) {
		addTo = addTo || newProps;
		var descriptor;

		for (var name in newProps) {
			if( (descriptor = getDescriptor(newProps, name)) ) {
				this._defineProperty(addTo, oldProps, name, descriptor);
			} else {
				Construct._overwrite(addTo, oldProps, name, newProps[name]);
			}
		}
	},
	simpleInherit = function (newProps, oldProps, addTo) {
		addTo = addTo || newProps;

		for (var name in newProps) {
			Construct._overwrite(addTo, oldProps, name, newProps[name]);
		}
	};
/**
 * @static
 */
assign(Construct, {
	/**
	 * @property {Boolean} can-construct.constructorExtends constructorExtends
	 * @parent can-construct.static
	 *
	 * @description
	 * Toggles the behavior of a constructor function called
	 * without the `new` keyword to extend the constructor function or
	 * create a new instance.
	 *
	 * ```js
	 * var animal = Animal();
	 * // vs
	 * var animal = new Animal();
	 * ```
	 *
	 * @body
	 *
	 * If `constructorExtends` is:
	 *
	 *  - `true` - the constructor extends
	 *  - `false` - a new instance of the constructor is created
	 *
	 * This property defaults to false.
	 *
	 * Example of constructExtends as `true`:
	 *
	 * ```js
	 * var Animal = Construct.extend({
	 *   constructorExtends: true // the constructor extends
	 * },{
	 *   sayHi: function() {
	 *     console.log("hai!");
	 *   }
	 * });
	 *
	 * var Pony = Animal({
	 *   gallop: function () {
	 *      console.log("Galloping!!");
	 *   }
	 * }); // Pony is now a constructor function extended from Animal
	 *
	 * var frank = new Animal(); // frank is a new instance of Animal
	 *
	 * var gertrude = new Pony(); // gertrude is a new instance of Pony
	 * gertrude.sayHi(); // "hai!" - sayHi is "inherited" from Animal
	 * gertrude.gallop(); // "Galloping!!" - gallop is unique to instances of Pony
	 *```
	 *
	 * The default behavior is shown in the example below:
	 *
	 * ```js
	 * var Animal = Construct.extend({
	 *   constructorExtends: false // the constructor does NOT extend
	 * },{
	 *   sayHi: function() {
	 *     console.log("hai!");
	 *   }
	 * });
	 *
	 * var pony = Animal(); // pony is a new instance of Animal
	 * var frank = new Animal(); // frank is a new instance of Animal
	 *
	 * pony.sayHi() // "hai!"
	 * frank.sayHi() // "hai!"
	 *```
	 * By default to extend a constructor, you must use [can-construct.extend extend].
	 */
	constructorExtends: true,
	/**
	 * @function can-construct.newInstance newInstance
	 * @parent can-construct.static
	 *
	 * @description Returns an instance of `Construct`. This method
	 * can be overridden to return a cached instance.
	 *
	 * @signature `Construct.newInstance([...args])`
	 *
	 * @param {*} [args] arguments that get passed to [can-construct::setup] and [can-construct::init]. Note
	 * that if [can-construct::setup] returns an array, those arguments will be passed to [can-construct::init]
	 * instead.
	 * @return {class} instance of the class
	 *
	 * @body
	 * Creates a new instance of the constructor function. This method is useful for creating new instances
	 * with arbitrary parameters. Typically, however, you will simply want to call the constructor with the
	 * __new__ operator.
	 *
	 * ## Example
	 *
	 * The following creates a `Person` Construct and overrides `newInstance` to cache all
	 * instances of Person to prevent duplication. If the properties of a new Person match an existing one it
	 * will return a reference to the previously created object, otherwise it returns a new object entirely.
	 *
	 * ```js
	 * // define and create the Person constructor
	 * var Person = Construct.extend({
	 *   init : function(first, middle, last) {
	 *     this.first = first;
	 *     this.middle = middle;
	 *     this.last = last;
	 *   }
	 * });
	 *
	 * // store a reference to the original newInstance function
	 * var _newInstance = Person.newInstance;
	 *
	 * // override Person's newInstance function
	 * Person.newInstance = function() {
	 *   // if cache does not exist make it an new object
	 *   this.__cache = this.__cache || {};
	 *   // id is a stingified version of the passed arguments
	 *   var id = JSON.stringify(arguments);
	 *
	 *   // look in the cache to see if the object already exists
	 *   var cachedInst = this.__cache[id];
	 *   if(cachedInst) {
	 *     return cachedInst;
	 *   }
	 *
	 *   //otherwise call the original newInstance function and return a new instance of Person.
	 *   var newInst = _newInstance.apply(this, arguments);
	 *   this.__cache[id] = newInst;
	 *   return newInst;
	 * };
	 *
	 * // create two instances with the same arguments
	 * var justin = new Person('Justin', 'Barry', 'Meyer'),
	 *		brian = new Person('Justin', 'Barry', 'Meyer');
	 *
	 * console.log(justin === brian); // true - both are references to the same instance
	 * ```
	 *
	 */
	newInstance: function () {
		// Get a raw instance object (`init` is not called).
		var inst = this.instance(),
			args;
		// Call `setup` if there is a `setup`
		if (inst.setup) {
			Object.defineProperty(inst,"__inSetup",{
				configurable: true,
				enumerable: false,
				value: true,
				writable: true
			});
			args = inst.setup.apply(inst, arguments);
			if (args instanceof Construct.ReturnValue){
				return args.value;
			}
			inst.__inSetup = false;
		}
		// Call `init` if there is an `init`
		// If `setup` returned `args`, use those as the arguments
		if (inst.init) {
			inst.init.apply(inst, args || arguments);
		}
		return inst;
	},
	// Overwrites an object with methods. Used in the `super` plugin.
	// `newProps` - New properties to add.
	// `oldProps` - Where the old properties might be (used with `super`).
	// `addTo` - What we are adding to.
	_inherit: canGetDescriptor ? inheritGetterSetter : simpleInherit,

	// Adds a `defineProperty` with the given name and descriptor
	// Will only ever be called if ES5 is supported
	_defineProperty: function(what, oldProps, propName, descriptor) {
		Object.defineProperty(what, propName, descriptor);
	},

	// used for overwriting a single property.
	// this should be used for patching other objects
	// the super plugin overwrites this
	_overwrite: function (what, oldProps, propName, val) {
		Object.defineProperty(what, propName, {value: val, configurable: true, enumerable: true, writable: true});
	},
	// Set `defaults` as the merger of the parent `defaults` and this
	// object's `defaults`. If you overwrite this method, make sure to
	// include option merging logic.
	/**
	 * @function can-construct.setup setup
	 * @parent can-construct.static
	 *
	 * @description Perform initialization logic for a constructor function.
	 *
	 * @signature `Construct.setup(base, fullName, staticProps, protoProps)`
	 *
	 * A static `setup` method provides inheritable setup functionality
	 * for a Constructor function. The following example
	 * creates a Group constructor function.  Any constructor
	 * functions that inherit from Group will be added to
	 * `Group.childGroups`.
	 *
	 *
	 *     Group = Construct.extend({
	 *       setup: function(Construct, fullName, staticProps, protoProps){
	 *         this.childGroups = [];
	 *         if(Construct !== Construct){
	 *           this.childGroups.push(Construct)
	 *         }
	 *         Construct.setup.apply(this, arguments)
	 *       }
	 *     },{})
	 *     var Flock = Group.extend(...)
	 *     Group.childGroups[0] //-> Flock
	 *
	 * @param {constructor} base The base constructor that is being inherited from.
	 * @param {String} fullName The name of the new constructor.
	 * @param {Object} staticProps The static properties of the new constructor.
	 * @param {Object} protoProps The prototype properties of the new constructor.
	 *
	 * @body
	 * The static `setup` method is called immediately after a constructor
	 * function is created and
	 * set to inherit from its base constructor. It is useful for setting up
	 * additional inheritance work.
	 * Do not confuse this with the prototype `[can-construct::setup]` method.
	 *
	 * ## Example
	 *
	 * This `Parent` class adds a reference to its base class to itself, and
	 * so do all the classes that inherit from it.
	 *
	 * ```js
	 * Parent = Construct.extend({
	 *   setup : function(base, fullName, staticProps, protoProps){
	 *     this.base = base;
	 *
	 *     // call base functionality
	 *     Construct.setup.apply(this, arguments)
	 *   }
	 * },{});
	 *
	 * Parent.base; // Construct
	 *
	 * Child = Parent({});
	 *
	 * Child.base; // Parent
	 * ```
	 */
	setup: function (base) {
		this.defaults = deepAssign(true, {}, base.defaults, this.defaults);
	},
	// Create's a new `class` instance without initializing by setting the
	// `initializing` flag.
	instance: function () {
		// Prevents running `init`.
		initializing = 1;
		var inst = new this();
		// Allow running `init`.
		initializing = 0;
		return inst;
	},
	// Extends classes.
	/**
	 * @function can-construct.extend extend
	 * @parent can-construct.static
	 *
	 * @signature `Construct.extend([name,] [staticProperties,] instanceProperties)`
	 *
	 * Extends `Construct`, or constructor functions derived from `Construct`,
	 * to create a new constructor function. Example:
	 *
	 * ```js
	 * var Animal = Construct.extend({
	 *   sayHi: function(){
	 *     console.log("hi")
	 *   }
	 * });
	 *
	 * var animal = new Animal()
	 * animal.sayHi();
	 * ```
	 *
	 * @param {String} [name] Adds a name to the constructor function so
	 * it is nicely labeled in the developer tools. The following:
	 *
	 *     Construct.extend("ConstructorName",{})
	 *
	 * returns a constructur function that will show up as `ConstructorName`
	 * in the developer tools.
	 * It also sets "ConstructorName" as [can-construct.shortName shortName].
	 *
	 * @param {Object} [staticProperties] Properties that are added the constructor
	 * function directly. For example:
	 *
	 * ```js
	 * var Animal = Construct.extend({
	 *   findAll: function(){
	 *     return can.ajax({url: "/animals"})
	 *   }
	 * },{}); // need to pass an empty instanceProperties object
	 *
	 * Animal.findAll().then(function(json){ ... })
	 * ```
	 *
	 * The [can-construct.setup static setup] method can be used to
	 * specify inheritable behavior when a Constructor function is created.
	 *
	 * @param {Object} instanceProperties Properties that belong to
	 * instances made with the constructor. These properties are added to the
	 * constructor's `prototype` object. Example:
	 *
	 *     var Animal = Construct.extend({
	 *		  findAll: function() {
	 *			return can.ajax({url: "/animals"});
	 *		  }
	 *     },{
	 *       init: function(name) {
	 *         this.name = name;
	 *       },
	 *       sayHi: function() {
	 *         console.log(this.name," says hai!");
	 *       }
	 *     })
	 *     var pony = new Animal("Gertrude");
	 *     pony.sayHi(); // "Gertrude says hai!"
	 *
	 * The [can-construct::init init] and [can-construct::setup setup] properties
	 * are used for initialization.
	 *
	 * @return {function} The constructor function.
	 *
	 * ```js
	 *	var Animal = Construct.extend(...);
	 *	var pony = new Animal(); // Animal is a constructor function
	 * ```
	 * @body
	 * ## Inheritance
	 * Creating "subclasses" with `Construct` is simple. All you need to do is call the base constructor
	 * with the new function's static and instance properties. For example, we want our `Snake` to
	 * be an `Animal`, but there are some differences:
	 *
	 *
	 *     var Snake = Animal.extend({
	 *         legs: 0
	 *     }, {
	 *         init: function() {
	 *             Animal.prototype.init.call(this, 'ssssss');
	 *         },
	 *         slither: function() {
	 *             console.log('slithering...');
	 *         }
	 *     });
	 *
	 *     var baslisk = new Snake();
	 *     baslisk.speak();   // "ssssss"
	 *     baslisk.slither(); // "slithering..."
	 *     baslisk instanceof Snake;  // true
	 *     baslisk instanceof Animal; // true
	 *
	 *
	 * ## Static properties and inheritance
	 *
	 * If you pass all three arguments to Construct, the second one will be attached directy to the
	 * constructor, allowing you to imitate static properties and functions. You can access these
	 * properties through the `[can-construct::constructor this.constructor]` property.
	 *
	 * Static properties can get overridden through inheritance just like instance properties. In the example below,
	 * we override both the legs static property as well as the the init function for each instance:
	 *
	 * ```js
	 * var Animal = Construct.extend({
	 *     legs: 4
	 * }, {
	 *     init: function(sound) {
	 *         this.sound = sound;
	 *     },
	 *     speak: function() {
	 *         console.log(this.sound);
	 *     }
	 * });
	 *
	 * var Snake = Animal.extend({
	 *     legs: 0
	 * }, {
	 *     init: function() {
	 *         this.sound = 'ssssss';
	 *     },
	 *     slither: function() {
	 *         console.log('slithering...');
	 *     }
	 * });
	 *
	 * Animal.legs; // 4
	 * Snake.legs; // 0
	 * var dog = new Animal('woof');
	 * var blackMamba = new Snake();
	 * dog.speak(); // 'woof'
	 * blackMamba.speak(); // 'ssssss'
	 * ```
	 * 
	 * ## Alternative value for a new instance
	 * 
	 * Sometimes you may want to return some custom value instead of a new object when creating an instance of your class.
	 * For example, you want your class to act as a singleton, or check whether an item with the given id was already
	 * created and return an existing one from your cache store (e.g. using [can-connect/constructor/store/store]).
	 * 
	 * To achieve this you can return [can-construct.ReturnValue] from `setup` method of your class.
	 * 
	 * Lets say you have `myStore` to cache all newly created instances. And if an item already exists you want to merge
	 * the new data into the existing instance and return the updated instance.
	 * 
	 * ```
	 * var myStore = {};
	 * 
	 * var Item = Construct.extend({
	 *     setup: function(params){
	 *         if (myStore[params.id]){
	 *             var item = myStore[params.id];
	 *             
	 *             // Merge new data to the existing instance:
	 *             Object.assign(item, params);
	 *             
	 *             // Return the updated item:
	 *             return new Construct.ReturnValue( item );
	 *         } else {
	 *             // Save to cache store:
	 *             myStore[this.id] = this;
	 *             
	 *             return [params];
	 *         }
	 *     },
	 *     init: function(params){
	 *         Object.assign(this, params);
	 *     }
	 * });
	 * 
	 * var item_1  = new Item( {id: 1, name: "One"} );
	 * var item_1a = new Item( {id: 1, name: "OnePlus"} )
	 * ```
	 */
	extend: function (name, staticProperties, instanceProperties) {
		var shortName = name,
			klass = staticProperties,
			proto = instanceProperties;

		// Figure out what was passed and normalize it.
		if (typeof shortName !== 'string') {
			proto = klass;
			klass = shortName;
			shortName = null;
		}
		if (!proto) {
			proto = klass;
			klass = null;
		}
		proto = proto || {};
		var _super_class = this,
			_super = this.prototype,
			Constructor, prototype;
		// Instantiate a base class (but only create the instance,
		// don't run the init constructor).
		prototype = this.instance();
		// Copy the properties over onto the new prototype.
		Construct._inherit(proto, _super, prototype);

		if(shortName) {

		} else if(klass && klass.shortName) {
			shortName = klass.shortName;
		} else if(this.shortName) {
			shortName = this.shortName;
		}
		// We want constructor.name to be the same as shortName, within
		// the bounds of what the JS VM will allow (meaning no non-word characters).
		// new Function() is significantly faster than eval() here.

		// Strip semicolons
		//!steal-remove-start
		var constructorName = shortName ? shortName.replace(constructorNameRegex, '_') : 'Constructor';
		if(reservedWords[constructorName]) {
			constructorName = CanString.capitalize(constructorName);
		}
		//!steal-remove-end

		// The dummy class constructor.
		function init() {
			/* jshint validthis: true */
			// All construction is actually done in the init method.
			if (!initializing) {
				//!steal-remove-start
				if(!this || (this.constructor !== Constructor) &&
				// We are being called without `new` or we are extending.
				arguments.length && Constructor.constructorExtends) {
					dev.warn('can/construct/construct.js: extending a Construct without calling extend');
				}
				//!steal-remove-end

				return (!this || this.constructor !== Constructor) &&
				// We are being called without `new` or we are extending.
				arguments.length && Constructor.constructorExtends ? Constructor.extend.apply(Constructor, arguments) :
				// We are being called with `new`.
				Constructor.newInstance.apply(Constructor, arguments);
			}
		}
		Constructor = typeof namedCtor === "function" ?
			namedCtor( constructorName, init ) :
			function() { return init.apply(this, arguments); };

		// Copy old stuff onto class (can probably be merged w/ inherit)
		for (var propName in _super_class) {
			if (_super_class.hasOwnProperty(propName)) {
				Constructor[propName] = _super_class[propName];
			}
		}
		// Copy new static properties on class.
		Construct._inherit(klass, _super_class, Constructor);

		// Set things that shouldn't be overwritten.
		assign(Constructor, {
			constructor: Constructor,
			prototype: prototype
			/**
			 * @property {String} can-construct.shortName shortName
			 * @parent can-construct.static
			 *
			 * If you pass a name when creating a Construct, the `shortName` property will be set to the
			 * name.
			 *
			 * ```js
			 * var MyConstructor = Construct.extend("MyConstructor",{},{});
			 * MyConstructor.shortName // "MyConstructor"
			 * ```
			 */
		});

		if (shortName !== undefined) {
			Constructor.shortName = shortName;
		}
		// Make sure our prototype looks nice.
		Constructor.prototype.constructor = Constructor;
		// Call the class `setup` and `init`
		var t = [_super_class].concat(makeArray(arguments)),
			args = Constructor.setup.apply(Constructor, t);
		if (Constructor.init) {
			Constructor.init.apply(Constructor, args || t);
		}
		/**
		 * @prototype
		 */
		return Constructor; //
		/**
		 * @property {Object} can-construct.prototype.constructor constructor
		 * @parent can-construct.prototype
		 *
		 * A reference to the constructor function that created the instance. This allows you to access
		 * the constructor's static properties from an instance.
		 *
		 * @body
		 * ## Example
		 *
		 * This Construct has a static counter that counts how many instances have been created:
		 *
		 * ```js
		 * var Counter = Construct.extend({
		 *     count: 0
		 * }, {
		 *     init: function() {
		 *         this.constructor.count++;
		 *     }
		 * });
		 *
		 * var childCounter = new Counter();
		 * console.log(childCounter.constructor.count); // 1
		 * console.log(Counter.count); // 1
		 * ```
		 */
	},
	/**
	 * @function can-construct.ReturnValue ReturnValue
	 * @parent can-construct.static
	 * 
	 * Use to overwrite the return value of new Construct(...).
	 * 
	 * @signature `new Construct.ReturnValue( value )`
	 * 
	 *   This constructor function can be used for creating a return value of the `setup` method.
	 *   [can-construct] will check if the return value is an instance of `Construct.ReturnValue`.
	 *   If it is then its `value` will be used as the new instance.
	 * 
	 *   @param {Object} value A value to be used for a new instance instead of a new object.
	 * 
	 *   ```
	 *   var Student = function( name, school ){
	 *       this.name = name;
	 *       this.school = school;
	 *   } 
	 * 
	 *   var Person = Construct.extend({
	 *       setup: function( options ){
	 *           if (options.school){
	 *               return new Constructor.ReturnValue( new Student( options.name, options.school ) );
	 *           } else {
	 *               return [options];
	 *           }
	 *       }
	 *   });
	 * 
	 *   var myPerson = new Person( {name: "Ilya", school: "PetrSU"} );
	 * 
	 *   myPerson instanceof Student // => true
	 *   ```
   */
	ReturnValue: function(value){
		this.value = value;
	}
});
/**
 * @function can-construct.prototype.setup setup
 * @parent can-construct.prototype
 *
 * @signature `construct.setup(...args)`
 *
 * A setup function for the instantiation of a constructor function.
 *
 * @param {*} args The arguments passed to the constructor.
 *
 * @return {Array|undefined|can-construct.ReturnValue} If an array is returned, the array's items are passed as
 * arguments to [can-construct::init init]. If a [can-construct.ReturnValue] instance is returned, the ReturnValue
 * instance's value will be returned as the result of calling new Construct(). The following example always makes
 * sure that init is called with a jQuery wrapped element:
 *
 * ```js
 * 	WidgetFactory = Construct.extend({
 * 			setup: function(element){
 * 					return [$(element)]
 * 			}
 * 	});
 *
 * 	MyWidget = WidgetFactory.extend({
 * 			init: function($el){
 * 					$el.html("My Widget!!")
 * 			}
 * 	});
 *  ```
 *
 * Otherwise, the arguments to the
 * constructor are passed to [can-construct::init] and the return value of `setup` is discarded.
 *
 * @body
 *
 * ## Deciding between `setup` and `init`
 *
 *
 * Usually, you should use [can-construct::init init] to do your constructor function's initialization.
 * You should, instead, use `setup` when:
 *
 *   - there is initialization code that you want to run before the inheriting constructor's
 *     `init` method is called.
 *   - there is initialization code that should run whether or not inheriting constructors
 *     call their base's `init` methods.
 *   - you want to modify the arguments that will get passed to `init`.
 *
 */
Construct.prototype.setup = function () {};
/**
 * @function can-construct.prototype.init init
 * @parent can-construct.prototype
 *
 * @description Called when a new instance of a Construct is created.
 *
 * @signature `construct.init(...args)`
 * @param {*} args the arguments passed to the constructor (or the items of the array returned from [can-construct::setup])
 *
 * @body
 * If a prototype `init` method is provided, `init` is called when a new Construct is created---
 * after [can-construct::setup]. The `init` method is where the bulk of your initialization code
 * should go. A common thing to do in `init` is save the arguments passed into the constructor.
 *
 * ## Examples
 *
 * First, we'll make a Person constructor that has a first and last name:
 *
 * ```js
 * var Person = Construct.extend({
 *     init: function(first, last) {
 *         this.first = first;
 *         this.last  = last;
 *     }
 * });
 *
 * var justin = new Person("Justin", "Meyer");
 * justin.first; // "Justin"
 * justin.last; // "Meyer"
 * ```
 *
 * Then, we'll extend Person into Programmer, and add a favorite language:
 *
 * ```js
 * var Programmer = Person.extend({
 *     init: function(first, last, language) {
 *         // call base's init
 *         Person.prototype.init.apply(this, arguments);
 *
 *         // other initialization code
 *         this.language = language;
 *     },
 *     bio: function() {
 *         return "Hi! I'm " + this.first + " " + this.last +
 *             " and I write " + this.language + ".";
 *     }
 * });
 *
 * var brian = new Programmer("Brian", "Moschel", 'ECMAScript');
 * brian.bio(); // "Hi! I'm Brian Moschel and I write ECMAScript.";
 * ```
 *
 * ## Modified Arguments
 *
 * [can-construct::setup] is able to modify the arguments passed to `init`.
 * If you aren't receiving the arguments you passed to `new Construct(args)`,
 * check that they aren't being changed by `setup` along
 * the inheritance chain.
 */
Construct.prototype.init = function () {};

var oldIsConstructor = types.isConstructor;
types.isConstructor = function(obj){
	return obj.prototype instanceof Construct || oldIsConstructor.call(null, obj);
};


module.exports = namespace.Construct = Construct;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

//
// This provides helper utilities for Mustache processing. Currently,
// only stache uses these helpers.  Ideally, these utilities could be used
// in other libraries implementing Mustache-like features.
var live = __webpack_require__(41);
var nodeLists = __webpack_require__(20);
var compute = __webpack_require__(9);
var Observation = __webpack_require__(7);

var utils = __webpack_require__(29);
var expression = __webpack_require__(45);

var types = __webpack_require__(0);
var frag = __webpack_require__(36);
var attr = __webpack_require__(24);


// ## Types

// A lookup is an object that is used to identify a lookup in the scope.
/**
 * @hide
 * @typedef {{get: String}} can.stache.Lookup
 * @option {String} get A value in the scope to look up.
 */


// ## Helpers

var mustacheLineBreakRegExp = /(?:(?:^|(\r?)\n)(\s*)(\{\{([^\}]*)\}\}\}?)([^\S\n\r]*)($|\r?\n))|(\{\{([^\}]*)\}\}\}?)/g,
	k = function(){};


var core = {
	expression: expression,
	// ## mustacheCore.makeEvaluator
	// Given a scope and expression, returns a function that evaluates that expression in the scope.
	//
	// This function first reads lookup values in the args and hash.  Then it tries to figure out
	// if a helper is being called or a value is being read.  Finally, depending on
	// if it's a helper, or not, and which mode the expression is in, it returns
	// a function that can quickly evaluate the expression.
	/**
	 * @hide
	 * Given a mode and expresion data, returns a function that evaluates that expression.
	 * @param {can-view-scope} The scope in which the expression is evaluated.
	 * @param {can.view.Options} The option helpers in which the expression is evaluated.
	 * @param {String} mode Either null, #, ^. > is handled elsewhere
	 * @param {Object} exprData Data about what was in the mustache expression
	 * @param {renderer} [truthyRenderer] Used to render a subsection
	 * @param {renderer} [falseyRenderer] Used to render the inverse subsection
	 * @param {String} [stringOnly] A flag to indicate that only strings will be returned by subsections.
	 * @return {Function} An 'evaluator' function that evaluates the expression.
	 */
	makeEvaluator: function (scope, helperOptions, nodeList, mode, exprData, truthyRenderer, falseyRenderer, stringOnly) {

		if(mode === "^") {
			var temp = truthyRenderer;
			truthyRenderer = falseyRenderer;
			falseyRenderer = temp;
		}

		var value,
			helperOptionArg;

		if(exprData instanceof expression.Call) {
			helperOptionArg =  {
				fn: function () {},
				inverse: function () {},
				context: scope.peek("."),
				scope: scope,
				nodeList: nodeList,
				exprData: exprData,
				helpersScope: helperOptions
			};
			utils.convertToScopes(helperOptionArg, scope,helperOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly);

			value = exprData.value(scope, helperOptions, helperOptionArg);
			if(exprData.isHelper) {
				return value;
			}
		} else if (exprData instanceof expression.Bracket) {
			value = exprData.value(scope);
			if(exprData.isHelper) {
				return value;
			}
		} else if (exprData instanceof expression.Lookup) {
			value = exprData.value(scope);
			if(exprData.isHelper) {
				return value;
			}
		} else if (exprData instanceof expression.Helper && exprData.methodExpr instanceof expression.Bracket) {
			// Brackets get wrapped in Helpers when used in attributes
			// like `<p class="{{ foo[bar] }}" />`
			value = exprData.methodExpr.value(scope);
			if(exprData.isHelper) {
				return value;
			}
		} else {
			var readOptions = {
				// will return a function instead of calling it.
				// allowing it to be turned into a compute if necessary.
				isArgument: true,
				args: [scope.peek('.'), scope],
				asCompute: true
			};
			var helperAndValue = exprData.helperAndValue(scope, helperOptions, readOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly);
			var helper = helperAndValue.helper;
			value = helperAndValue.value;

			if(helper) {
				return exprData.evaluator(helper, scope, helperOptions, readOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly);
			}
		}

		// Return evaluators for no mode.
		if(!mode) {
			// If it's computed, return a function that just reads the compute.
			if(value && value.isComputed) {
				return value;
			}
			// Just return value as the value
			else {

				return function(){
					return '' + (value != null ? value : '');
				};
			}
		} else if( mode === "#" || mode === "^" ) {
			// Setup renderers.
			helperOptionArg = {
				fn: function () {},
				inverse: function () {}
			};
			utils.convertToScopes(helperOptionArg, scope, helperOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly);
			return function(){
				// Get the value
				var finalValue;
				if (types.isCompute(value)) {
					finalValue = value();
				} else {
					finalValue = value;
				}
				if(typeof finalValue === "function") {
					return finalValue;
				}
				// If it's an array, render.
				else if ( typeof finalValue !== "string" && utils.isArrayLike(finalValue) ) {
					var isObserveList = types.isMapLike(finalValue);

					if(isObserveList ? finalValue.attr("length") : finalValue.length) {
						if (stringOnly) {
							return utils.getItemsStringContent(finalValue, isObserveList, helperOptionArg, helperOptions);
						} else {
							return frag(utils.getItemsFragContent(finalValue, helperOptionArg, scope));
						}
					} else {
						return helperOptionArg.inverse(scope, helperOptions);
					}
				}
				// If truthy, render fn, otherwise, inverse.
				else {
					return finalValue ? helperOptionArg.fn(finalValue || scope, helperOptions) : helperOptionArg.inverse(scope, helperOptions);
				}
			};
		} else {
			// not supported!
		}
	},
	// ## mustacheCore.makeLiveBindingPartialRenderer
	// Returns a renderer function that live binds a partial.
	/**
	 * @hide
	 * Returns a renderer function that live binds a partial.
	 * @param {String} expressionString
	 * @param {Object} state The html state of where the expression was found.
	 * @return {function(this:HTMLElement,can-view-scope,can.view.Options)} A renderer function
	 * live binds a partial.
	 */
	makeLiveBindingPartialRenderer: function(expressionString, state){
		expressionString = expressionString.trim();
		var exprData,
				partialName = expressionString.split(/\s+/).shift();

		if(partialName !== expressionString) {
			exprData = core.expression.parse(expressionString);
		}

		return function(scope, options, parentSectionNodeList){
			var nodeList = [this];
			nodeList.expression = ">" + partialName;
			nodeLists.register(nodeList, null, parentSectionNodeList || true, state.directlyNested);

			var partialFrag = compute(function(){
				var localPartialName = partialName;
				// If the second parameter of a partial is a custom context
				if(exprData && exprData.argExprs.length === 1) {
					var newContext = exprData.argExprs[0].value(scope, options)();
					if(typeof newContext === "undefined") {
						//!steal-remove-start
						dev.warn('The context ('+ exprData.argExprs[0].key +') you passed into the' +
							'partial ('+ partialName +') is not defined in the scope!');
						//!steal-remove-end
					}else{
						scope = scope.add(newContext);
					}
				}
				// Look up partials in options first.
				var partial = options.peek("partials." + localPartialName), renderer;
				if (partial) {
					renderer = function() {
						return partial.render ? partial.render(scope, options, nodeList)
							: partial(scope, options);
					};
				}
				// Use can.view to get and render the partial.
				else {
					var scopePartialName = scope.read(localPartialName, {
						isArgument: true
					}).value;

					if (scopePartialName === null || !scopePartialName && localPartialName[0] === '*') {
						return frag("");
					}
					if (scopePartialName) {
						localPartialName = scopePartialName;
					}

					renderer = function() {
						if(typeof localPartialName === "function"){
							return localPartialName(scope, options, nodeList);
						} else {
							return core.getTemplateById(localPartialName)(scope, options, nodeList);
						}

					};
				}
				var res = Observation.ignore(renderer)();
				return frag(res);
			});

			partialFrag.computeInstance.setPrimaryDepth(nodeList.nesting);

			live.html(this, partialFrag, this.parentNode, nodeList);
		};
	},
	// ## mustacheCore.makeStringBranchRenderer
	// Return a renderer function that evalutes to a string and caches
	// the evaluator on the scope.
	/**
	 * @hide
	 * Return a renderer function that evaluates to a string.
	 * @param {String} mode
	 * @param {can.stache.Expression} expression
	 * @return {function(can.view.Scope,can.view.Options, can-stache.renderer, can.view.renderer)}
	 */
	makeStringBranchRenderer: function(mode, expressionString){
		var exprData = core.expression.parse(expressionString),
			// Use the full mustache expression as the cache key.
			fullExpression = mode+expressionString;

		// convert a lookup like `{{value}}` to still be called as a helper if necessary.
		if(!(exprData instanceof expression.Helper) && !(exprData instanceof expression.Call)) {
			exprData = new expression.Helper(exprData,[],{});
		}

		// A branching renderer takes truthy and falsey renderer.
		var branchRenderer = function branchRenderer(scope, options, truthyRenderer, falseyRenderer){
			// Check the scope's cache if the evaluator already exists for performance.
			var evaluator = scope.__cache[fullExpression];
			if(mode || !evaluator) {
				evaluator = makeEvaluator( scope, options, null, mode, exprData, truthyRenderer, falseyRenderer, true);
				if(!mode) {
					scope.__cache[fullExpression] = evaluator;
				}
			}

			// Run the evaluator and return the result.
			var res = evaluator();
			return res == null ? "" : ""+res;
		};

		branchRenderer.exprData = exprData;

		return branchRenderer;
	},
	// ## mustacheCore.makeLiveBindingBranchRenderer
	// Return a renderer function that evaluates the mustache expression and
	// sets up live binding if a compute with dependencies is found. Otherwise,
	// the element's value is set.
	//
	// This function works by creating a `can.compute` from the mustache expression.
	// If the compute has dependent observables, it passes the compute to `can.view.live`; otherwise,
	// it updates the element's property based on the compute's value.
	/**
	 * @hide
	 * Returns a renderer function that evaluates the mustache expression.
	 * @param {String} mode
	 * @param {can.stache.Expression} expression
	 * @param {Object} state The html state of where the expression was found.
	 */
	makeLiveBindingBranchRenderer: function(mode, expressionString, state){

		// Pre-process the expression.
		var exprData = core.expression.parse(expressionString);
		if(!(exprData instanceof expression.Helper) && !(exprData instanceof expression.Call) && !(exprData instanceof expression.Bracket) && !(exprData instanceof expression.Lookup)) {
			exprData = new expression.Helper(exprData,[],{});
		}
		// A branching renderer takes truthy and falsey renderer.
		var branchRenderer = function branchRenderer(scope, options, parentSectionNodeList, truthyRenderer, falseyRenderer){

			var nodeList = [this];
			nodeList.expression = expressionString;
			// register this nodeList.
			// Regsiter it with its parent ONLY if this is directly nested.  Otherwise, it's unencessary.
			nodeLists.register(nodeList, null, parentSectionNodeList || true, state.directlyNested);


			// Get the evaluator. This does not need to be cached (probably) because if there
			// an observable value, it will be handled by `can.view.live`.
			var evaluator = makeEvaluator( scope, options, nodeList, mode, exprData, truthyRenderer, falseyRenderer,
				// If this is within a tag, make sure we only get string values.
				state.tag );

			// Create a compute that can not be observed by other
			// comptues. This is important because this renderer is likely called by
			// parent expresions.  If this value changes, the parent expressions should
			// not re-evaluate. We prevent that by making sure this compute is ignored by
			// everyone else.
			//var compute = can.compute(evaluator, null, false);
			var gotCompute = evaluator.isComputed,
				computeValue;
			if(gotCompute) {
				computeValue = evaluator;
			} else {
				computeValue = compute(evaluator, null, false);
			}

			computeValue.computeInstance.setPrimaryDepth(nodeList.nesting);

			// Bind on the computeValue to set the cached value. This helps performance
			// so live binding can read a cached value instead of re-calculating.
			computeValue.computeInstance.bind("change", k);

			var value = computeValue();

			// If value is a function, it's a helper that returned a function.
			if(typeof value === "function") {

				// A helper function should do it's own binding.  Similar to how
				// we prevented this function's compute from being noticed by parent expressions,
				// we hide any observables read in the function by saving any observables that
				// have been read and then setting them back which overwrites any `can.__observe` calls
				// performed in value.
				Observation.ignore(value)(this);

			}
			// If the computeValue has observable dependencies, setup live binding.
			else if(gotCompute || computeValue.computeInstance.hasDependencies ) {

				// Depending on where the template is, setup live-binding differently.
				if(state.attr) {
					live.attr(this, state.attr, computeValue);
				}
				else if( state.tag )  {
					live.attrs( this, computeValue );
				}
				else if(state.text && typeof value !== "object"){
					live.text(this, computeValue, this.parentNode, nodeList);
				}
				else {
					live.html(this, computeValue, this.parentNode, nodeList);
				}
			}
			// If the computeValue has no observable dependencies, just set the value on the element.
			else {

				if(state.attr) {
					attr.set(this, state.attr, value);
				}
				else if(state.tag) {
					live.attrs(this, value);
				}
				else if(state.text && typeof value === "string") {
					this.nodeValue = value;
				}
				else if( value != null ){
					nodeLists.replace([this], frag(value, this.ownerDocument));
				}
			}
			// Unbind the compute.
			computeValue.computeInstance.unbind("change", k);
		};

		branchRenderer.exprData = exprData;

		return branchRenderer;
	},
	// ## mustacheCore.splitModeFromExpression
	// Returns the mustache mode split from the rest of the expression.
	/**
	 * @hide
	 * Returns the mustache mode split from the rest of the expression.
	 * @param {can.stache.Expression} expression
	 * @param {Object} state The state of HTML where the expression was found.
	 */
	splitModeFromExpression: function(expression, state){
		expression = expression.trim();
		var mode = expression.charAt(0);

		if( "#/{&^>!".indexOf(mode) >= 0 ) {
			expression =  expression.substr(1).trim();
		} else {
			mode = null;
		}
		// Triple braces do nothing within a tag.
		if(mode === "{" && state.node) {
			mode = null;
		}
		return {
			mode: mode,
			expression: expression
		};
	},
	// ## mustacheCore.cleanLineEndings
	// Removes line breaks accoding to the mustache specification.
	/**
	 * @hide
	 * Prunes line breaks accoding to the mustache specification.
	 * @param {String} template
	 * @return {String}
	 */
	cleanLineEndings: function(template){

		// Finds mustache tags with space around them or no space around them.
		return template.replace( mustacheLineBreakRegExp,
			function(whole,
				returnBefore,
				spaceBefore,
				special,
				expression,
				spaceAfter,
				returnAfter,
				// A mustache magic tag that has no space around it.
				spaceLessSpecial,
				spaceLessExpression,
				matchIndex){

			// IE 8 will provide undefined
			spaceAfter = (spaceAfter || "");
			returnBefore = (returnBefore || "");
			spaceBefore = (spaceBefore || "");

			var modeAndExpression = splitModeFromExpression(expression || spaceLessExpression,{});

			// If it's a partial or tripple stache, leave in place.
			if(spaceLessSpecial || ">{".indexOf( modeAndExpression.mode) >= 0) {
				return whole;
			}  else if( "^#!/".indexOf(  modeAndExpression.mode ) >= 0 ) {

				// Return the magic tag and a trailing linebreak if this did not
				// start a new line and there was an end line.
				return special+( matchIndex !== 0 && returnAfter.length ? returnBefore+"\n" :"");


			} else {
				// There is no mode, return special with spaces around it.
				return spaceBefore+special+spaceAfter+(spaceBefore.length || matchIndex !== 0 ? returnBefore+"\n" : "");
			}

		});
	},
	Options: utils.Options,
	getTemplateById: function(){}
};

// ## Local Variable Cache
//
// The following creates slightly more quickly accessible references of the following
// core functions.
var makeEvaluator = core.makeEvaluator,
	splitModeFromExpression = core.splitModeFromExpression;

module.exports = core;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var Scope = __webpack_require__(42);
var Observation = __webpack_require__(7);
var observationReader = __webpack_require__(15);
var compute = __webpack_require__(9);
var types = __webpack_require__(0);

var isArrayLike = __webpack_require__(38);
	// ## can.view.Options
	//
	// This contains the local helpers, partials, and tags available to a template.
	/**
	 * @hide
	 * The Options scope.
	 */
var Options = Scope.Options; // jshint ignore:line

module.exports = {
	// Returns if something looks like an array.  This works for can.List
	isArrayLike: isArrayLike,
	// A generic empty function
	emptyHandler: function(){},
	// Converts a string like "1" into 1. "null" into null, etc.
	// This doesn't have to do full JSON, so removing eval would be good.
	jsonParse: function(str){
		// if it starts with a quote, assume a string.
		if(str[0] === "'") {
			return str.substr(1, str.length -2);
		} else if(str === "undefined") {
			return undefined;
		} else {
			return JSON.parse(str);
		}
	},
	mixins: {
		last: function(){
			return this.stack[this.stack.length - 1];
		},
		add: function(chars){
			this.last().add(chars);
		},
		subSectionDepth: function(){
			return this.stack.length - 1;
		}
	},
	// Sets .fn and .inverse on a helperOptions object and makes sure
	// they can reference the current scope and options.
	convertToScopes: function(helperOptions, scope, options, nodeList, truthyRenderer, falseyRenderer, isStringOnly){
		// overwrite fn and inverse to always convert to scopes
		if(truthyRenderer) {
			helperOptions.fn = this.makeRendererConvertScopes(truthyRenderer, scope, options, nodeList, isStringOnly);
		}
		if(falseyRenderer) {
			helperOptions.inverse = this.makeRendererConvertScopes(falseyRenderer, scope, options, nodeList, isStringOnly);
		}
	},
	// Returns a new renderer function that makes sure any data or helpers passed
	// to it are converted to a can.view.Scope and a can.view.Options.
	makeRendererConvertScopes: function (renderer, parentScope, parentOptions, nodeList, observeObservables) {
		var rendererWithScope = function(ctx, opts, parentNodeList){
			return renderer(ctx || parentScope, opts, parentNodeList);
		};
		var convertedRenderer = function (newScope, newOptions, parentNodeList) {
			// prevent binding on fn.
			// If a non-scope value is passed, add that to the parent scope.
			if (newScope !== undefined && !(newScope instanceof Scope)) {
				newScope = parentScope.add(newScope);
			}
			if (newOptions !== undefined && !(newOptions instanceof Options)) {
				newOptions = parentOptions.add(newOptions);
			}
			var result = rendererWithScope(newScope, newOptions || parentOptions, parentNodeList|| nodeList );
			return result;
		};
		return observeObservables ?  convertedRenderer : Observation.ignore(convertedRenderer);
	},
	// Calls the truthy subsection for each item in a list and returning them in a string.
	getItemsStringContent: function(items, isObserveList, helperOptions, options){
		var txt = "",
			len = observationReader.get(items, 'length'),
			isObservable = types.isMapLike(items) || types.isListLike(items);

		for (var i = 0; i < len; i++) {
			var item = isObservable ? compute(items, '' + i) :items[i];
			txt += helperOptions.fn(item, options);
		}
		return txt;
	},
	// Calls the truthy subsection for each item in a list and returns them in a document Fragment.
	getItemsFragContent: function(items, helperOptions, scope, asVariable) {
		var result = [],
			len = observationReader.get(items, 'length'),
			isObservable = types.isMapLike(items) || types.isListLike(items);

		for (var i = 0; i < len; i++) {
			var aliases = {
				"%index": i,
				"@index": i
			};
			var item = isObservable ? compute(items, '' + i) :items[i];

			if (asVariable) {
				aliases[asVariable] = item;
			}
			result.push(helperOptions.fn(scope.add(aliases, { notContext: true }).add(item)));
		}
		return result;
	},
	Options: Options
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// # can/util/inserted
// Used to alert interested parties of when an element is inserted into the DOM.
// Given a list of elements, check if the first is in the DOM, and if so triggers the `inserted` event on all elements and their descendants.

var makeArray = __webpack_require__(12);
var setImmediate = __webpack_require__(53);
var CID = __webpack_require__(14);

var getMutationObserver = __webpack_require__(21);
var childNodes = __webpack_require__(16);
var domContains = __webpack_require__(60);
var domDispatch = __webpack_require__(17);
var DOCUMENT = __webpack_require__(5);
var domData = __webpack_require__(10);

var mutatedElements;
var checks = {
	inserted: function(root, elem){
		return domContains.call(root, elem);
	},
	removed: function(root, elem){
		return !domContains.call(root, elem);
	}
};

var fireOn = function(elems, root, check, event, dispatched) {
	if (!elems.length) {
		return;
	}
	var children, cid;

	// Go through `elems` and trigger the `inserted` event.
	// If the first element is not in the document (a Document Fragment) it will exit the function.
	// If it is in the document it sets the `inDocument` flag to true. This means that we only check
	// for the first element and either exit the function or start triggering "inserted" for child elements.
	for (var i = 0, elem; (elem = elems[i]) !== undefined; i++) {
		cid = CID(elem);
		// If we've found an element in the document then we can now trigger **"inserted"** for `elem` and all of its children. We are using `getElementsByTagName("*")` so that we grab all of the descendant nodes.
		if (elem.getElementsByTagName && check(root, elem) && !dispatched[cid]) {
			// mark as being dispatched
			dispatched[cid] = true;
			children = makeArray(elem.getElementsByTagName("*"));
			domDispatch.call(elem, event, [], false);
			if (event === "removed") {
				domData.delete.call(elem);
			}

			for (var j = 0, child;
				(child = children[j]) !== undefined; j++) {
				// fire the event only if this hasn't already been fired on.
				cid = CID(child);
				if(!dispatched[cid]) {
					domDispatch.call(child, event, [], false);
					// jshint maxdepth:5
					if (event === "removed") {
						domData.delete.call(child);
					}
					dispatched[cid] = true;
				}
			}
		}
	}
};
//
var fireMutations = function(){
	var mutations = mutatedElements;
	mutatedElements = null;

	var firstElement = mutations[0][1][0];
	var doc = DOCUMENT() || firstElement.ownerDocument || firstElement;
	var root = doc.contains ? doc : doc.documentElement;
	var dispatched = {inserted: {}, removed: {}};
	mutations.forEach(function(mutation){
		fireOn(mutation[1], root, checks[mutation[0]], mutation[0], dispatched[mutation[0]]);
	});
};
var mutated = function(elements, type) {
	if(!getMutationObserver() && elements.length) {
		// make sure this element is in the page (mutated called before something is removed)
		var firstElement = elements[0];
		var doc = DOCUMENT() || firstElement.ownerDocument || firstElement;
		var root = doc.contains ? doc : doc.documentElement;
		if( checks.inserted(root, firstElement) ) {

			// if it is, schedule a mutation fire
			if(!mutatedElements) {
				mutatedElements = [];
				setImmediate(fireMutations);
			}
			mutatedElements.push([type, elements]);
		}
	}
};

/**
 * @module {{}} can-util/dom/mutate/mutate mutate
 * @parent can-util/dom
 * @description Mutate an element by appending, inserting, and removing DOM nodes. Use this so that on the server "inserted" will be fired.
 *
 * ```js
 * var mutate = require("can-util/dom/mutate/mutate");
 *
 * var el = document.createElement("div");
 *
 * el.addEventListener("inserted", function(){
 *   console.log("Inserted was fired!");
 * });
 *
 * mutate.appendChild.call(document.body, el);
 * ```
 */
module.exports = {
	/**
	 * @function can-util/dom/mutate/mutate.appendChild appendChild
	 * @signature `mutate.appendChild.call(el, child)`
	 * Used to append a node to an element and trigger the "inserted" event on all of the newly inserted children. Since `mutated` takes an array we convert the child to an array, or in the case of a DocumentFragment we first convert the childNodes to an array and call inserted on those.
	 */
	appendChild: function(child) {
		if(getMutationObserver()) {
			this.appendChild(child);
		} else {
			var children;
			if (child.nodeType === 11) {
				children = makeArray(childNodes(child));
			} else {
				children = [child];
			}
			this.appendChild(child);
			mutated(children,"inserted");
		}
	},
	/**
	 * @function can-util/dom/mutate/mutate.insertBefore insertBefore
	 * @signature `mutate.insertBefore.call(el, ref, child)`
	 * Like mutate.appendChild, used to insert a node to an element before a reference node and then trigger the "inserted" event.
	 */
	insertBefore: function(child, ref, document) {
		if(getMutationObserver()) {
			this.insertBefore(child, ref);
		} else {
			var children;
			if (child.nodeType === 11) {
				children = makeArray(childNodes(child));
			} else {
				children = [child];
			}
			this.insertBefore(child, ref);
			mutated(children,"inserted");
		}
	},
	/**
	 * @function can-util/dom/mutate/mutate.removeChild removeChild
	 * @signature `mutate.removeChild.call(el, child)`
	 * Like mutate.appendChild, used to insert a node to an element before a reference node and then trigger the "removed" event.
	 */
	removeChild: function(child){
		if(getMutationObserver()) {
			this.removeChild(child);
		} else {
			mutated([child],"removed");
			this.removeChild(child);
		}
	},
	/**
	 * @function can-util/dom/mutate/mutate.replaceChild replaceChild
	 * @signature `mutate.replaceChild.call(el, child)`
	 * Like mutate.appendChild and mutate.removeChild, used to replace a node with another node and trigger "removed" on the removed element and "inserted" on the inserted elements.
	 */
	replaceChild: function(newChild, oldChild){
		if(getMutationObserver()) {
			this.replaceChild(newChild, oldChild);
		} else {
			var children;
			if (newChild.nodeType === 11) {
				children = makeArray(childNodes(newChild));
			} else {
				children = [newChild];
			}
			mutated([oldChild],"removed");
			this.replaceChild(newChild, oldChild);
			mutated(children,"inserted");
		}
	},
	// called with elements that might have been inserted
	inserted: function(elements){
		mutated(elements,"inserted");
	},
	// called with elements that have been removed
	removed: function(elements){
		mutated(elements,"removed");
	}
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(arr) {
	return Array.isArray(arr);
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(arr){
	return arr && arr[arr.length - 1];
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var es6_promise_1 = __webpack_require__(26);
function isLoaded() {
    return typeof window['require'] !== 'undefined';
}
function dojoPromise(modules) {
    return new es6_promise_1.Promise(function (resolve, reject) {
        // If something goes wrong loading the esri/dojo scripts, reject with the error.
        window['require'].on("error", reject);
        window['require'](modules, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // Resolve with the parameters from dojo require as an array.
            resolve(args);
        });
    });
}
function esriBootstrap(url) {
    return new es6_promise_1.Promise(function (resolve, reject) {
        if (isLoaded()) {
            // If the API is already loaded, reject with an error message.
            reject('The ArcGIS API for JavaScript has already been loaded!');
        }
        if (!url) {
            url = 'https://js.arcgis.com/4.3/';
        }
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onload = function () {
            // Resolve after the script is loaded.
            resolve();
        };
        // Reject if something goes wrong loading the script.
        script.onerror = reject;
        document.body.appendChild(script);
    });
}
exports.esriBootstrap = esriBootstrap;
function esriPromise(modules) {
    if (!isLoaded()) {
        return esriBootstrap().then(function () { return dojoPromise(modules); });
    }
    else {
        return dojoPromise(modules);
    }
}
exports.esriPromise = esriPromise;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

/* jshint undef: false */

var parser = __webpack_require__(54);
var viewCallbacks = __webpack_require__(40);

var HTMLSectionBuilder = __webpack_require__(88);
var TextSectionBuilder = __webpack_require__(89);
var mustacheCore = __webpack_require__(28);
var mustacheHelpers = __webpack_require__(35);
__webpack_require__(87);
var getIntermediateAndImports = __webpack_require__(46);

var dev = __webpack_require__(6);
var namespace = __webpack_require__(2);
var DOCUMENT = __webpack_require__(5);
var assign = __webpack_require__(3);
var last = __webpack_require__(32);
var importer = __webpack_require__(99);
// Make sure that we can also use our modules with Stache as a plugin

__webpack_require__(68);
__webpack_require__(20);


// This was moved from the legacy view/scanner.js to here.
// This makes sure content elements will be able to have a callback.
viewCallbacks.tag("content", function(el, tagData) {
	return tagData.scope;
});

var svgNamespace = "http://www.w3.org/2000/svg";
var namespaces = {
	"svg": svgNamespace,
	// this allows a partial to start with g.
	"g": svgNamespace
},
	textContentOnlyTag = {style: true, script: true};

function stache(template){

	// Remove line breaks according to mustache's specs.
	if(typeof template === "string") {
		template = mustacheCore.cleanLineEndings(template);
	}

	// The HTML section that is the root section for the entire template.
	var section = new HTMLSectionBuilder(),
		// Tracks the state of the parser.
		state = {
			node: null,
			attr: null,
			// A stack of which node / section we are in.
			// There is probably a better way of doing this.
			sectionElementStack: [],
			// If text should be inserted and HTML escaped
			text: false,
			// which namespace we are in
			namespaceStack: [],
			// for style and script tags
			// we create a special TextSectionBuilder and add things to that
			// when the element is done, we compile the text section and
			// add it as a callback to `section`.
			textContentOnly: null

		},
		// This function is a catch all for taking a section and figuring out
		// how to create a "renderer" that handles the functionality for a
		// given section and modify the section to use that renderer.
		// For example, if an HTMLSection is passed with mode `#` it knows to
		// create a liveBindingBranchRenderer and pass that to section.add.
		makeRendererAndUpdateSection = function(section, mode, stache){

			if(mode === ">") {
				// Partials use liveBindingPartialRenderers
				section.add(mustacheCore.makeLiveBindingPartialRenderer(stache, copyState()));

			} else if(mode === "/") {

				section.endSection();
				if(section instanceof HTMLSectionBuilder) {

					//!steal-remove-start
					var last = state.sectionElementStack[state.sectionElementStack.length - 1].tag;
					if (stache !== "" && stache !== last) {
						dev.warn("unexpected closing tag {{/" + stache + "}} expected {{/" + last + "}}");
						// throw new Error("unexpected closing tag {{/" + stache + "}} expected {{/" + last + "}}");
					}
					//!steal-remove-end

					state.sectionElementStack.pop();
				}
			} else if(mode === "else") {

				section.inverse();

			} else {

				// If we are an HTMLSection, we will generate a
				// a LiveBindingBranchRenderer; otherwise, a StringBranchRenderer.
				// A LiveBindingBranchRenderer function processes
				// the mustache text, and sets up live binding if an observable is read.
				// A StringBranchRenderer function processes the mustache text and returns a
				// text value.
				var makeRenderer = section instanceof HTMLSectionBuilder ?

					mustacheCore.makeLiveBindingBranchRenderer:
					mustacheCore.makeStringBranchRenderer;


				if(mode === "{" || mode === "&") {

					// Adds a renderer function that just reads a value or calls a helper.
					section.add( makeRenderer(null,stache, copyState() ));

				} else if(mode === "#" || mode === "^") {
					// Adds a renderer function and starts a section.
					var renderer = makeRenderer(mode,stache, copyState()  );
					section.startSection(renderer);

					// If we are a directly nested section, count how many we are within
					if(section instanceof HTMLSectionBuilder) {
						//!steal-remove-start
						var tag = typeof renderer.exprData.closingTag === 'function' ?
							renderer.exprData.closingTag() : '';
						//!steal-remove-end

						state.sectionElementStack.push({
							type: "section",
							//!steal-remove-start
							tag: tag
							//!steal-remove-end
						});
					}
				} else {
					// Adds a renderer function that only updates text.
					section.add( makeRenderer(null,stache, copyState({text: true}) ));
				}

			}
		},
		// Copys the state object for use in renderers.
		copyState = function(overwrites){
			var lastElement = state.sectionElementStack[state.sectionElementStack.length - 1];
			var cur = {
				tag: state.node && state.node.tag,
				attr: state.attr && state.attr.name,
				// <content> elements should be considered direclty nested
				directlyNested: state.sectionElementStack.length ?
					lastElement.type === "section" || lastElement.type === "custom": true,
				textContentOnly: !!state.textContentOnly
			};
			return overwrites ? assign(cur, overwrites) : cur;
		},
		addAttributesCallback = function(node, callback){
			if( !node.attributes ) {
				node.attributes = [];
			}
			node.attributes.unshift(callback);
		};

	parser(template,{
		start: function(tagName, unary){
			var matchedNamespace = namespaces[tagName];

			if (matchedNamespace && !unary ) {
				state.namespaceStack.push(matchedNamespace);
			}

			state.node = {
				tag: tagName,
				children: [],
				namespace: matchedNamespace || last(state.namespaceStack)
			};
		},
		end: function(tagName, unary){
			var isCustomTag =  viewCallbacks.tag(tagName);

			if(unary){
				// If it's a custom tag with content, we need a section renderer.
				section.add(state.node);
				if(isCustomTag) {
					addAttributesCallback(state.node, function(scope, options, parentNodeList){
						viewCallbacks.tagHandler(this,tagName, {
							scope: scope,
							options: options,
							subtemplate: null,
							templateType: "stache",
							parentNodeList: parentNodeList
						});
					});
				}
			} else {
				section.push(state.node);

				state.sectionElementStack.push({
					type: isCustomTag ? "custom" : null,
					tag: isCustomTag ? null : tagName
				});

				// If it's a custom tag with content, we need a section renderer.
				if( isCustomTag ) {
					section.startSubSection();
				} else if(textContentOnlyTag[tagName]) {
					state.textContentOnly = new TextSectionBuilder();
				}
			}


			state.node =null;

		},
		close: function( tagName ) {
			var matchedNamespace = namespaces[tagName];

			if (matchedNamespace  ) {
				state.namespaceStack.pop();
			}

			var isCustomTag = viewCallbacks.tag(tagName),
				renderer;

			if( isCustomTag ) {
				renderer = section.endSubSectionAndReturnRenderer();
			}
			if(textContentOnlyTag[tagName]) {
				section.last().add(state.textContentOnly.compile(copyState()));
				state.textContentOnly = null;
			}

			var oldNode = section.pop();
			if( isCustomTag ) {
				addAttributesCallback(oldNode, function(scope, options, parentNodeList){
					viewCallbacks.tagHandler(this,tagName, {
						scope: scope,
						options: options,
						subtemplate: renderer,
						templateType: "stache",
						parentNodeList: parentNodeList
					});
				});
			}
			state.sectionElementStack.pop();
		},
		attrStart: function(attrName){
			if(state.node.section) {
				state.node.section.add(attrName+"=\"");
			} else {
				state.attr = {
					name: attrName,
					value: ""
				};
			}

		},
		attrEnd: function(attrName){
			if(state.node.section) {
				state.node.section.add("\" ");
			} else {
				if(!state.node.attrs) {
					state.node.attrs = {};
				}

				state.node.attrs[state.attr.name] =
					state.attr.section ? state.attr.section.compile(copyState()) : state.attr.value;

				var attrCallback = viewCallbacks.attr(attrName);
				if(attrCallback) {
					if( !state.node.attributes ) {
						state.node.attributes = [];
					}
					state.node.attributes.push(function(scope, options, nodeList){
						attrCallback(this,{
							attributeName: attrName,
							scope: scope,
							options: options,
							nodeList: nodeList
						});
					});
				}



				state.attr = null;
			}
		},
		attrValue: function(value){
			var section = state.node.section || state.attr.section;
			if(section){
				section.add(value);
			} else {
				state.attr.value += value;
			}
		},
		chars: function( text ) {
			(state.textContentOnly || section).add(text);
		},
		special: function( text ){

			var firstAndText = mustacheCore.splitModeFromExpression(text, state),
				mode = firstAndText.mode,
				expression = firstAndText.expression;


			if(expression === "else") {
				var inverseSection;
				if(state.attr && state.attr.section) {
					inverseSection = state.attr.section;
				} else if(state.node && state.node.section ) {
					inverseSection = state.node.section;
				} else {
					inverseSection = state.textContentOnly || section;
				}
				inverseSection.inverse();
				return;
			}

			if(mode === "!") {
				return;
			}

			if(state.node && state.node.section) {

				makeRendererAndUpdateSection(state.node.section, mode, expression);

				if(state.node.section.subSectionDepth() === 0){
					state.node.attributes.push( state.node.section.compile(copyState()) );
					delete state.node.section;
				}

			}
			// `{{}}` in an attribute like `class="{{}}"`
			else if(state.attr) {

				if(!state.attr.section) {
					state.attr.section = new TextSectionBuilder();
					if(state.attr.value) {
						state.attr.section.add(state.attr.value);
					}
				}
				makeRendererAndUpdateSection(state.attr.section, mode, expression );

			}
			// `{{}}` in a tag like `<div {{}}>`
			else if(state.node) {

				if(!state.node.attributes) {
					state.node.attributes = [];
				}
				if(!mode) {
					state.node.attributes.push( mustacheCore.makeLiveBindingBranchRenderer( null,expression, copyState() ) );
				} else if( mode === "#" || mode === "^" ) {
					if(!state.node.section) {
						state.node.section = new TextSectionBuilder();
					}
					makeRendererAndUpdateSection(state.node.section, mode, expression );
				} else {
					throw new Error(mode+" is currently not supported within a tag.");
				}
			}
			else {
				makeRendererAndUpdateSection( state.textContentOnly || section, mode, expression );
			}
		},
		comment: function( text ) {
			// create comment node
			section.add({
				comment: text
			});
		},
		done: function(){}
	});

	return section.compile();
}

// At this point, can.stache has been created
assign(stache, mustacheHelpers);

stache.safeString = function(text){
	return {
			toString: function () {
				return text;
			}
		};
};
stache.async = function(source){
	var iAi = getIntermediateAndImports(source);
	var importPromises = iAi.imports.map(function(moduleName){
		return importer(moduleName);
	});
	return Promise.all(importPromises).then(function(){
		return stache(iAi.intermediate);
	});
};
var templates = {};
stache.from = mustacheCore.getTemplateById = function(id){
	if(!templates[id]) {
		var el = DOCUMENT().getElementById(id);
		templates[id] = stache(el.innerHTML);
	}
	return templates[id];
};

stache.registerPartial = function(id, partial) {
	templates[id] = (typeof partial === "string" ? stache(partial) : partial);
};

module.exports = namespace.stache = stache;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(System) {var live = __webpack_require__(41);
var nodeLists = __webpack_require__(20);
var compute = __webpack_require__(9);

var utils = __webpack_require__(29);

var types = __webpack_require__(0);
var isFunction = __webpack_require__(23);

var getBaseURL = __webpack_require__(95);
var joinURIs = __webpack_require__(102);

var each = __webpack_require__(1);
var assign = __webpack_require__(3);
var isIterable = __webpack_require__(66);
var dev = __webpack_require__(6);


var domData = __webpack_require__(10);

var looksLikeOptions = function(options){
	return options && typeof options.fn === "function" && typeof options.inverse === "function";
};

var resolve = function (value) {
	if (value && value.isComputed) {
		return value();
	} else {
		return value;
	}
};
var resolveHash = function(hash){
	var params = {};
	for(var prop in hash) {
		var value = hash[prop];
		if(value && value.isComputed) {
			params[prop] = value();
		} else {
			params[prop] = value;
		}
	}
	return params;
};


var helpers = {
	"each": function(items) {
		var args = [].slice.call(arguments),
			options = args.pop(),
			argsLen = args.length,
			argExprs = options.exprData.argExprs,
			resolved = resolve(items),
			asVariable,
			aliases,
			key;

		if (argsLen === 2 || (argsLen === 3 && argExprs[1].key === 'as')) {
			asVariable = args[argsLen - 1];

			if (typeof asVariable !== 'string') {
				asVariable = argExprs[argsLen - 1].key;
			}
		}

		if ((
				types.isListLike(resolved) ||
				( utils.isArrayLike(resolved) && items.isComputed )
			) && !options.stringOnly) {
			return function(el){
				// make a child nodeList inside the can.view.live.html nodeList
				// so that if the html is re
				var nodeList = [el];
				nodeList.expression = "live.list";
				nodeLists.register(nodeList, null, options.nodeList, true);
				// runs nest replacements
				nodeLists.update(options.nodeList, [el]);

				var cb = function (item, index, parentNodeList) {
					var aliases = {
						"%index": index,
						"@index": index
					};

					if (asVariable) {
						aliases[asVariable] = item;
					}

					return options.fn(options.scope.add(aliases, { notContext: true }).add(item), options.options, parentNodeList);
				};

				live.list(el, items, cb, options.context, el.parentNode, nodeList, function(list, parentNodeList){
					return options.inverse(options.scope.add(list), options.options, parentNodeList);
				});
			};
		}

		var expr = resolved,
			result;

		if ( !! expr && utils.isArrayLike(expr)) {
			result = utils.getItemsFragContent(expr, options, options.scope, asVariable);
			return options.stringOnly ? result.join('') : result;
		}
		else if(isIterable(expr)) {
			result = [];
			each(expr, function(value, key){
				aliases = {
					"%key": key
				};
				if (asVariable) {
					aliases[asVariable] = value;
				}
				result.push(options.fn(options.scope.add(aliases, { notContext: true }).add(value)));
			});
			return options.stringOnly ? result.join('') : result;
		}
		else if (types.isMapLike(expr)) {
			result = [];

			(expr.forEach || expr.each).call(expr, function(val, key){
				var value = compute(expr, key);
				aliases = {
					"%key": key,
					"@key": key
				};
				if (asVariable) {
					aliases[asVariable] = expr[key];
				}
				result.push(options.fn(options.scope.add(aliases, { notContext: true }).add(value)));
			});

			return options.stringOnly ? result.join('') : result;
		}
		else if (expr instanceof Object) {
			result = [];
			for (key in expr) {
				aliases = {
					"%key": key,
					"@key": key
				};
				if (asVariable) {
					aliases[asVariable] = expr[key];
				}
				result.push(options.fn(options.scope.add(aliases, { notContext: true }).add(expr[key])));
			}
			return options.stringOnly ? result.join('') : result;
		}
	},
	"@index": function(offset, options) {
		if (!options) {
			options = offset;
			offset = 0;
		}
		var index = options.scope.peek("@index");
		return ""+((isFunction(index) ? index() : index) + offset);
	},
	'if': function (expr, options) {
		var value;
		// if it's a function, wrap its value in a compute
		// that will only change values from true to false
		if (expr && expr.isComputed) {
			value = compute.truthy(expr)();
		} else {
			value = !! resolve(expr);
		}

		if (value) {
			return options.fn(options.scope || this);
		} else {
			return options.inverse(options.scope || this);
		}
	},
	'is': function() {
		var lastValue, curValue,
		options = arguments[arguments.length - 1];

		if (arguments.length - 2 <= 0) {
			return options.inverse();
		}

		var args = arguments;
		var callFn = compute(function(){
			for (var i = 0; i < args.length - 1; i++) {
				curValue = resolve(args[i]);
				curValue = isFunction(curValue) ? curValue() : curValue;

				if (i > 0) {
					if (curValue !== lastValue) {
						return false;
					}
				}
				lastValue = curValue;
			}
			return true;
		});

		return callFn() ? options.fn() : options.inverse();
	},
	'eq': function() {
		return helpers.is.apply(this, arguments);
	},
	'unless': function (expr, options) {
		return helpers['if'].apply(this, [expr, assign(assign({}, options), {
			fn: options.inverse,
			inverse: options.fn
		})]);
	},
	'with': function (expr, options) {
		var ctx = expr;
		expr = resolve(expr);
		if ( !! expr) {
			return options.fn(ctx);
		}
	},
	'log': function (options) {
		// go through the arguments
		var logs = [];
		each(arguments, function(val){
			if(!looksLikeOptions(val)) {
				logs.push(val);
			}
		});


		if (typeof console !== "undefined" && console.log) {
			if (!logs.length) {
				console.log(options.context);
			} else {
				console.log.apply(console, logs);
			}
		}
	},
	'data': function(attr){
		// options will either be the second or third argument.
		// Get the argument before that.
		var data = arguments.length === 2 ? this : arguments[1];
		return function(el){
			domData.set.call( el, attr, data || this.context );
		};
	},
	'switch': function(expression, options){
		resolve(expression);
		var found = false;
		var newOptions = options.helpers.add({
			"case": function(value, options){
				if(!found && resolve(expression) === resolve(value)) {
					found = true;
					return options.fn(options.scope || this);
				}
			},
			"default": function(options){
				if(!found) {
					return options.fn(options.scope || this);
				}
			}
		});
		return options.fn(options.scope, newOptions);
	},
	'joinBase': function(firstExpr/* , expr... */){
		var args = [].slice.call(arguments);
		var options = args.pop();

		var moduleReference = args.map( function(expr){
			var value = resolve(expr);
			return isFunction(value) ? value() : value;
		}).join("");

		var templateModule = options.helpers.peek("helpers.module");
		var parentAddress = templateModule ? templateModule.uri: undefined;

		var isRelative = moduleReference[0] === ".";

		if(isRelative && parentAddress) {
			return joinURIs(parentAddress, moduleReference);
		} else {
			var baseURL = ("object" !== "undefined" &&
				(System.renderingBaseURL || System.baseURL)) ||	getBaseURL();

			// Make sure one of them has a needed /
			if(moduleReference[0] !== "/" && baseURL[baseURL.length - 1] !== "/") {
				baseURL += "/";
			}

			return joinURIs(baseURL, moduleReference);
		}
	}
};

helpers.eachOf = helpers.each;

var registerHelper = function(name, callback){
	//!steal-remove-start
	if (helpers[name]) {
		dev.warn('The helper ' + name + ' has already been registered.');
	}
	//!steal-remove-end

	helpers[name] = callback;
};

var makeSimpleHelper = function(fn) {
	return function() {
		var realArgs = [];
		each(arguments, function(val, i) {
			if (i <= arguments.length) {
				while (val && val.isComputed) {
					val = val();
				}
				realArgs.push(val);
			}
		});
		return fn.apply(this, realArgs);
	};
};

module.exports = {
	registerHelper: registerHelper,
	registerSimpleHelper: function(name, callback) {
		registerHelper(name, makeSimpleHelper(callback));
	},
	getHelper: function(name, options){

		var helper = options && options.get && options.get("helpers." + name,{proxyMethods: false});
		if(!helper) {
			helper = helpers[name];
		}
		if(helper) {
			return {fn: helper};
		}
	},
	resolve: resolve,
	resolveHash: resolveHash,
	looksLikeOptions: looksLikeOptions
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(120)))

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getDocument = __webpack_require__(5);
var fragment = __webpack_require__(93);
var each = __webpack_require__(1);
var childNodes = __webpack_require__(16);

/**
@module {function} can-util/dom/frag/frag frag
@parent can-util/dom

Convert a String, HTMLElement, documentFragment, or contentArray into a documentFragment.

@signature `frag: function(item, doc)`

@param {String|HTMLElement|documentFragment|contentArray} item
@param {Document} doc   an optional DOM document in which to build the fragment

@return {documentFragment}

@body

## Use

ContentArrays can be used to combine multiple HTMLElements into a single document fragment.  For example:

    var frag = require("can-util/dom/frag/frag");

    var p = document.createElement("p");
    p.innerHTML = "Welcome to <b>CanJS</b>";
    var contentArray = ["<h1>Hi There</h1>", p];
    var fragment = frag( contentArray )

`fragment` will be a documentFragment with the following elements:

    <h1>Hi There</h1>
    <p>Welcome to <b>CanJS</b></p>

 */

var makeFrag = function(item, doc){
	var document = doc || getDocument();
	var frag;
	if(!item || typeof item === "string"){
		frag = fragment(item == null ? "" : ""+item, document);
		// If we have an empty frag...
		if (!frag.childNodes.length) {
			frag.appendChild(document.createTextNode(''));
		}
		return frag;
	} else if(item.nodeType === 11) {
		return item;
	} else if(typeof item.nodeType === "number") {
		frag = document.createDocumentFragment();
		frag.appendChild(item);
		return frag;
	} else if(typeof item.length === "number") {
		frag = document.createDocumentFragment();
		each(item, function(item){
			frag.appendChild( makeFrag(item) );
		});
		if (!childNodes(frag).length) {
			frag.appendChild(document.createTextNode(''));
		}
		return frag;
	} else {
		frag = fragment( ""+item, document);
		// If we have an empty frag...
		if (!childNodes(frag).length) {
			frag.appendChild(document.createTextNode(''));
		}
		return frag;
	}
};

module.exports = makeFrag;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CID = __webpack_require__(14);
var domDataCore = __webpack_require__(47);

module.exports = function(obj){
	if(typeof obj.nodeType === "number") {
		return domDataCore.cid.call(obj);
	} else {
		var type = typeof obj;
		var isObject = type !== null && (type === "object" || type === "function");
		return type+":"+( isObject ? CID(obj) : obj );
	}
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// The following is from jQuery
function isArrayLike(obj){
	var type = typeof obj;
	if(type === "string") {
		return true;
	}
	else if(type === "number") {
		return false;
	}
	// The `in` check is from jQuery’s fix for an iOS 8 64-bit JIT object length bug:
	// https://github.com/jquery/jquery/pull/2185
	var length = obj && type !== 'boolean' &&
		typeof obj !== 'number' &&
		"length" in obj && obj.length;

	// var length = "length" in obj && obj.length;
	return typeof obj !== "function" &&
		( length === 0 || typeof length === "number" && length > 0 && ( length - 1 ) in obj );
}

module.exports = isArrayLike;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var core_hasOwn = Object.prototype.hasOwnProperty;

function isWindow(obj) {
	// In IE8 window.window !== window.window, so we allow == here.
	/*jshint eqeqeq:false*/
	return obj !== null && obj == obj.window;
}

function isPlainObject(obj) {
	// Must be an Object.
	// Because of IE, we also have to check the presence of the constructor property.
	// Make sure that DOM nodes and window objects don't pass through, as well
	if (!obj || typeof obj !== 'object' || obj.nodeType || isWindow(obj)) {
		return false;
	}
	try {
		// Not own constructor property must be Object
		if (obj.constructor && !core_hasOwn.call(obj, 'constructor') && !core_hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
			return false;
		}
	} catch (e) {
		// IE8,9 Will throw exceptions on certain host objects #9897
		return false;
	}
	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) {}
	return key === undefined || core_hasOwn.call(obj, key);
}

module.exports = isPlainObject;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var Observation = __webpack_require__(7);

var dev = __webpack_require__(6);
var getGlobal = __webpack_require__(13);
var domMutate = __webpack_require__(30);
var namespace = __webpack_require__(2);

var attr = function (attributeName, attrHandler) {
	if(attrHandler) {
		if (typeof attributeName === "string") {
			attributes[attributeName] = attrHandler;
		} else {
			regExpAttributes.push({
				match: attributeName,
				handler: attrHandler
			});
		}
	} else {
		var cb = attributes[attributeName];
		if( !cb ) {

			for( var i = 0, len = regExpAttributes.length; i < len; i++) {
				var attrMatcher = regExpAttributes[i];
				if(attrMatcher.match.test(attributeName)) {
					cb = attrMatcher.handler;
					break;
				}
			}
		}
		return cb;
	}
};

var attributes = {},
	regExpAttributes = [],
	automaticCustomElementCharacters = /[-\:]/;

var tag = function (tagName, tagHandler) {
	if(tagHandler) {
		//!steal-remove-start
		if (typeof tags[tagName.toLowerCase()] !== 'undefined') {
			dev.warn("Custom tag: " + tagName.toLowerCase() + " is already defined");
		}
		if (!automaticCustomElementCharacters.test(tagName) && tagName !== "content") {
			dev.warn("Custom tag: " + tagName.toLowerCase() + " hyphen missed");
		}
		//!steal-remove-end
		// if we have html5shiv ... re-generate
		if (getGlobal().html5) {
			getGlobal().html5.elements += " " + tagName;
			getGlobal().html5.shivDocument();
		}

		tags[tagName.toLowerCase()] = tagHandler;
	} else {
		var cb;

		// if null is passed as tagHandler, remove tag
		if (tagHandler === null) {
			delete tags[tagName.toLowerCase()];
		} else {
			cb = tags[tagName.toLowerCase()];
		}

		if(!cb && automaticCustomElementCharacters.test(tagName)) {
			// empty callback for things that look like special tags
			cb = function(){};
		}
		return cb;
	}

};
var tags = {};

var callbacks = {
	_tags: tags,
	_attributes: attributes,
	_regExpAttributes: regExpAttributes,
	tag: tag,
	attr: attr,
	// handles calling back a tag callback
	tagHandler: function(el, tagName, tagData){
		var helperTagCallback = tagData.options.get('tags.' + tagName,{proxyMethods: false}),
			tagCallback = helperTagCallback || tags[tagName];

		// If this was an element like <foo-bar> that doesn't have a component, just render its content
		var scope = tagData.scope,
			res;

		if(tagCallback) {
			res = Observation.ignore(tagCallback)(el, tagData);
		} else {
			res = scope;
		}

		//!steal-remove-start
		if (!tagCallback) {
			dev.warn('can/view/scanner.js: No custom element found for ' + tagName);
		}
		//!steal-remove-end

		// If the tagCallback gave us something to render with, and there is content within that element
		// render it!
		if (res && tagData.subtemplate) {

			if (scope !== res) {
				scope = scope.add(res);
			}
			var result = tagData.subtemplate(scope, tagData.options);
			var frag = typeof result === "string" ? can.view.frag(result) : result;
			domMutate.appendChild.call(el, frag);
		}
	}
};

namespace.view = namespace.view || {};

if (namespace.view.callbacks) {
	throw new Error("You can't have two versions of can-view-callbacks, check your dependencies");
} else {
	module.exports = namespace.view.callbacks = callbacks;
}


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var live = __webpack_require__(25);
__webpack_require__(106);
__webpack_require__(107);
__webpack_require__(108);
__webpack_require__(109);
__webpack_require__(110);


module.exports = live;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// # can/view/scope/scope.js
//
// This allows you to define a lookup context and parent contexts that a key's value can be retrieved from.
// If no parent scope is provided, only the scope's context will be explored for values.
var observeReader = __webpack_require__(15);
var Observation = __webpack_require__(7);
var ReferenceMap = __webpack_require__(113);
var makeComputeData = __webpack_require__(112);
var assign = __webpack_require__(3);
var each = __webpack_require__(1);
var namespace = __webpack_require__(2);
var dev = __webpack_require__(6);

/**
 * @add can.view.Scope
 */
function Scope(context, parent, meta) {
	// The obj that will be looked on for values.
	this._context = context;
	// The next Scope object whose context should be looked on for values.
	this._parent = parent;
	// If this is a special context, it can be labeled here.
	// Options are:
	// - viewModel - This is a viewModel
	// - notContext - This can't be looked within using `./` and `../`. It will be skipped.  This is
	//   for virtual contexts like those used by `%index`.
	this._meta = meta || {};

	// A cache that can be used to store computes used to look up within this scope.
	// For example if someone creates a compute to lookup `name`, another compute does not
	// need to be created.
	this.__cache = {};
}

/**
 * @static
 */
assign(Scope, {
	// ## Scope.read
	// Scope.read was moved to can.compute.read
	// can.compute.read reads properties from a parent.  A much more complex version of getObject.
	read: observeReader.read,
	// ## Scope.Refs
	// A Map-like object used for the references scope.
	Refs: ReferenceMap,

	// ## Scope.refsScope
	// A scope with a references scope in it and no parent.
	refsScope: function() {
		return new Scope(new this.Refs());
	}
});
/**
 * @prototype
 */
assign(Scope.prototype, {

	// ## Scope.prototype.add
	// Creates a new scope and sets the current scope to be the parent.
	// ```
	// var scope = new can.view.Scope([
	//   {name:"Chris"},
	//   {name: "Justin"}
	// ]).add({name: "Brian"});
	// scope.attr("name") //-> "Brian"
	// ```
	add: function(context, meta) {
		if (context !== this._context) {
			return new this.constructor(context, this, meta);
		} else {
			return this;
		}
	},

	// ## Scope.prototype.read
	// Reads from the scope chain and returns the first non-`undefined` value.
	// `read` deals mostly with setting up "context based" keys to start reading
	// from the right scope.  Once the right scope is located, `_read` is called.
	/**
	 * @hide
	 * @param {can.stache.key} attr A dot seperated path.  Use `"\."` if you have a property name that includes a dot.
	 * @param {can.view.Scope.readOptions} options that configure how this gets read.
	 * @return {{}}
	 *   @option {Object} parent the value's immediate parent
	 *   @option {can.Map|can.compute} rootObserve the first observable to read from.
	 *   @option {Array<String>} reads An array of properties that can be used to read from the rootObserve to get the value.
	 *   @option {*} value the found value
	 */
	read: function(attr, options) {
		// If it's the root, jump right to it.
		if (attr === "%root") {
			return {
				value: this.getRoot()
			};
		}

		// return a reference to itself when looking up "%scope"
		if (attr === "%scope") {
			return {
				value: this
			};
		}

		// Identify context based keys.  Context based keys try to
		// specify a particular context a key should be within.
		var isDotSlash = attr.substr(0, 2) === './',
			isThisDot = attr.substr(0,5) === "this.",
		    isInCurrentContext = isDotSlash || isThisDot,
			isInParentContext = attr.substr(0, 3) === "../",
			isCurrentContext = attr === "." || attr === "this",
			isParentContext = attr === "..",
			isContextBased = isInCurrentContext ||
			isInParentContext ||
			isCurrentContext ||
			isParentContext;

		// `notContext` contexts should be skipped if the key is "context based".
		// For example, the context that holds `%index`.
		if (isContextBased && this._meta.notContext) {
			return this._parent.read(attr, options);
		}

		// If true, lookup stops after the current context.
		var currentScopeOnly;

		if (isInCurrentContext) {
			// Stop lookup from checking parent scopes.
			// Set flag to halt lookup from walking up scope.
			currentScopeOnly = true;
			attr = isDotSlash ? attr.substr(2) : attr.substr(5);
		} else if (isInParentContext || isParentContext) {
			// walk up until we find a parent that can have context.
			// the `isContextBased` check above won't catch it when you go from
			// `../foo` to `foo` because `foo` isn't context based.
			var parent = this._parent;
			while (parent._meta.notContext) {
				parent = parent._parent;
			}

			if (isParentContext) {
				return {
					value: parent._context
				};
			}

			return parent.read(attr.substr(3) || ".", options);
		} else if (isCurrentContext) {
			return {
				value: this._context
			};
		}
		// if it's a reference scope, read from there.
		var keyReads = observeReader.reads(attr);
		if (keyReads[0].key.charAt(0) === "*") {
			return this.getRefs()._read(keyReads, options, true);
		} else {
			return this._read(keyReads, options, currentScopeOnly);
		}
	},
	// ## Scope.prototype._read
	//
	_read: function(keyReads, options, currentScopeOnly) {

		// The current scope and context we are trying to find "keyReads" within.
		var currentScope = this,
			currentContext,

			// If no value can be found, this is a list of of every observed
			// object and property name to observe.
			undefinedObserves = [],

			// Tracks the first found observe.
			currentObserve,
			// Tracks the reads to get the value from `currentObserve`.
			currentReads,

			// Tracks the most likely observable to use as a setter.
			setObserveDepth = -1,
			currentSetReads,
			currentSetObserve,

			readOptions = assign({
				/* Store found observable, incase we want to set it as the rootObserve. */
				foundObservable: function(observe, nameIndex) {
					currentObserve = observe;
					currentReads = keyReads.slice(nameIndex);
				},
				earlyExit: function(parentValue, nameIndex) {
					if (nameIndex > setObserveDepth || (nameIndex === setObserveDepth && (typeof parentValue === "object" && keyReads[nameIndex].key in parentValue))) {
						currentSetObserve = currentObserve;
						currentSetReads = currentReads;
						setObserveDepth = nameIndex;
					}
				}
			}, options);

		// Goes through each scope context provided until it finds the key (attr).  Once the key is found
		// then it's value is returned along with an observe, the current scope and reads.
		// While going through each scope context searching for the key, each observable found is returned and
		// saved so that either the observable the key is found in can be returned, or in the case the key is not
		// found in an observable the closest observable can be returned.

		while (currentScope) {
			currentContext = currentScope._context;



			if (currentContext !== null &&
				// if its a primitive type, keep looking up the scope, since there won't be any properties
				(typeof currentContext === "object" || typeof currentContext === "function")
			) {

				// Prevent computes from temporarily observing the reading of observables.
				var getObserves = Observation.trap();

				var data = observeReader.read(currentContext, keyReads, readOptions);

				// Retrieve the observes that were read.
				var observes = getObserves();
				// If a **value was was found**, return value and location data.
				if (data.value !== undefined) {
					Observation.addAll(observes);
					return {
						scope: currentScope,
						rootObserve: currentObserve,
						value: data.value,
						reads: currentReads
					};
				}
				// Otherwise, save all observables that were read.  If no value
				// is found, we will observe on all of them.
				else {
					undefinedObserves.push.apply(undefinedObserves, observes);
				}
			}

			//
			if (currentScopeOnly) {
				currentScope = null;
			} else {
				// Move up to the next scope.
				currentScope = currentScope._parent;
			}
		}

		// The **value was not found**, return `undefined` for the value.
		// Make sure we listen to everything we checked for when the value becomes defined.
		// Once it becomes defined, we won't have to listen to so many things.
		Observation.addAll(undefinedObserves);
		return {
			setRoot: currentSetObserve,
			reads: currentSetReads,
			value: undefined
		};
	},

	// ## Scope.prototype.get
	// Gets a value from the scope without being observable.
	get: function(key, options) {

		options = assign({
			isArgument: true
		}, options);

		var res = this.read(key, options);
		return res.value;
	},
	peek: Observation.ignore(function(key, options) {
		return this.get(key, options);
	}),
	peak: Observation.ignore(function(key, options) {
		//!steal-remove-start
		dev.warn('peak is deprecated, please use peek instead');
		//!steal-remove-end
		return this.peek(key, options);
	}),
	// ## Scope.prototype.getScope
	// Returns the first scope that passes the `tester` function.
	getScope: function(tester) {
		var scope = this;
		while (scope) {
			if (tester(scope)) {
				return scope;
			}
			scope = scope._parent;
		}
	},
	// ## Scope.prototype.getContext
	// Returns the first context whose scope passes the `tester` function.
	getContext: function(tester) {
		var res = this.getScope(tester);
		return res && res._context;
	},
	// ## Scope.prototype.getRefs
	// Returns the first references scope.
	// Used by `.read` when looking up `*key` and by the references
	// view binding.
	getRefs: function() {
		return this.getScope(function(scope) {
			return scope._context instanceof Scope.Refs;
		});
	},
	// ## Scope.prototype.getRoot
	// Returns the top most context that is not a references scope.
	// Used by `.read` to provide `%root`.
	getRoot: function() {
		var cur = this,
			child = this;

		while (cur._parent) {
			child = cur;
			cur = cur._parent;
		}

		if (cur._context instanceof Scope.Refs) {
			cur = child;
		}
		return cur._context;
	},
	set: function(key, value, options) {
		// Use `.read` to read everything upto, but not including the last property name
		// to find the object we want to set some property on.
		// For example:
		//  - `foo.bar` -> `foo`
		//  - `../foo.bar` -> `../foo`
		//  - `../foo` -> `..`
		//  - `foo` -> `.`
		var dotIndex = key.lastIndexOf('.'),
			slashIndex = key.lastIndexOf('/'),
			contextPath,
			propName;

		if (slashIndex > dotIndex) {
			contextPath = key.substring(0, slashIndex);
			propName = key.substring(slashIndex + 1, key.length);
		} else {
			if (dotIndex !== -1) {
				contextPath = key.substring(0, dotIndex);
				propName = key.substring(dotIndex + 1, key.length);
			} else {
				contextPath = ".";
				propName = key;
			}
		}

		if (key.charAt(0) === "*") {
			observeReader.write(this.getRefs()._context, key, value, options);
		} else {
			var context = this.read(contextPath, options).value;
			observeReader.write(context, propName, value, options);
		}
	},

	// ## Scope.prototype.attr
	// Gets or sets a value in the scope without being observable.
	attr: Observation.ignore(function(key, value, options) {
		console.warn("can-view-scope::attr is deprecated, please use peek, get or set");

		options = assign({
			isArgument: true
		}, options);

		// Allow setting a value on the context
		if (arguments.length === 2) {
			return this.set(key, value, options);

		} else {
			return this.get(key, options);
		}

	}),



	// ## Scope.prototype.computeData
	// Finds the first location of the key in the scope and then provides a get-set compute that represents the key's value
	// and other information about where the value was found.
	computeData: function(key, options) {
		return makeComputeData(this, key, options);
	},

	// ## Scope.prototype.compute
	// Provides a get-set compute that represents a key's value.
	compute: function(key, options) {
		return this.computeData(key, options)
			.compute;
	},
	// ## Scope.prototype.cloneFromRef
	//
	// This takes a scope and essentially copies its chain from
	// right before the last Refs.  And it does not include the ref.
	// this is a helper function to provide lexical semantics for refs.
	// This will not be needed for leakScope: false.
	cloneFromRef: function() {
		var contexts = [];
		var scope = this,
			context,
			parent;
		while (scope) {
			context = scope._context;
			if (context instanceof Scope.Refs) {
				parent = scope._parent;
				break;
			}
			contexts.unshift(context);
			scope = scope._parent;
		}
		if (parent) {
			each(contexts, function(context) {
				parent = parent.add(context);
			});
			return parent;
		} else {
			return this;
		}
	}
});

function Options(data, parent, meta) {
	if (!data.helpers && !data.partials && !data.tags) {
		data = {
			helpers: data
		};
	}
	Scope.call(this, data, parent, meta);
}
Options.prototype = new Scope();
Options.prototype.constructor = Options;

Scope.Options = Options;

namespace.view = namespace.view || {};
module.exports = namespace.view.Scope = Scope;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

"format cjs";


var event = __webpack_require__(4);
var eventLifecycle = __webpack_require__(58);
var canBatch = __webpack_require__(11);
var canEvent = __webpack_require__(4);

var compute = __webpack_require__(9);
var Observation = __webpack_require__(7);

var isEmptyObject = __webpack_require__(22);
var assign = __webpack_require__(3);
var dev = __webpack_require__(6);
var CID = __webpack_require__(14);
var isPlainObject = __webpack_require__(39);
var isArray = __webpack_require__(31);
var types = __webpack_require__(0);
var each = __webpack_require__(1);
var defaults = __webpack_require__(98);
var stringToAny = __webpack_require__(105);
var ns = __webpack_require__(2);

var eventsProto, define,
	make, makeDefinition, replaceWith, getDefinitionsAndMethods,
	isDefineType, getDefinitionOrMethod;

var defineConfigurableAndNotEnumerable = function(obj, prop, value) {
	Object.defineProperty(obj, prop, {
		configurable: true,
		enumerable: false,
		writable: true,
		value: value
	});
};

var defineNotWritable = function(obj, prop, value) {
	Object.defineProperty(obj, prop, {
		configurable: true,
		enumerable: false,
		writable: false,
		value: value
	});
};

var eachPropertyDescriptor = function(map, cb){
	for(var prop in map) {
		if(map.hasOwnProperty(prop)) {
			cb(prop, Object.getOwnPropertyDescriptor(map,prop));
		}
	}
};


module.exports = define = ns.define = function(objPrototype, defines, baseDefine) {
	// default property definitions on _data
	var dataInitializers = Object.create(baseDefine ? baseDefine.dataInitializers : null),
		// computed property definitions on _computed
		computedInitializers = Object.create(baseDefine ? baseDefine.computedInitializers : null);

	var result = getDefinitionsAndMethods(defines, baseDefine);
	result.dataInitializers = dataInitializers;
	result.computedInitializers = computedInitializers;


	// Goes through each property definition and creates
	// a `getter` and `setter` function for `Object.defineProperty`.
	each(result.definitions, function(definition, property){
		define.property(objPrototype, property, definition, dataInitializers, computedInitializers);
	});

	// Places a `_data` on the prototype that when first called replaces itself
	// with a `_data` object local to the instance.  It also defines getters
	// for any value that has a default value.
	replaceWith(objPrototype, "_data", function() {
		var map = this;
		var data = {};
		for (var prop in dataInitializers) {
			replaceWith(data, prop, dataInitializers[prop].bind(map), true);
		}
		return data;
	});

	// Places a `_computed` on the prototype that when first called replaces itself
	// with a `_computed` object local to the instance.  It also defines getters
	// that will create the property's compute when read.
	replaceWith(objPrototype, "_computed", function() {
		var map = this;
		var data = Object.create(null);
		for (var prop in computedInitializers) {
			replaceWith(data, prop, computedInitializers[prop].bind(map));
		}
		return data;
	});


	// Add necessary event methods to this object.
	for (var prop in eventsProto) {
		Object.defineProperty(objPrototype, prop, {
			enumerable: false,
			value: eventsProto[prop],
			configurable: true,
			writable: true
		});
	}
	// add so instance defs can be dynamically added
	Object.defineProperty(objPrototype,"_define",{
		enumerable: false,
		value: result,
		configurable: true,
		writable: true
	});

	// Places Symbol.iterator or @@iterator on the prototype
	// so that this can be iterated with for/of and can-util/js/each/each
	if(!objPrototype[types.iterator]) {
		defineConfigurableAndNotEnumerable(objPrototype, types.iterator, function(){
			return new define.Iterator(this);
		});
	}

	return result;
};

define.extensions = function () {};

var onlyType = function(obj){
	for(var prop in obj) {
		if(prop !== "type") {
			return false;
		}
	}
	return true;
};

define.property = function(objPrototype, prop, definition, dataInitializers, computedInitializers) {
	var propertyDefinition = define.extensions.apply(this, arguments);

	if (propertyDefinition) {
		definition = propertyDefinition;
	}

	var type = definition.type;

	// Special case definitions that have only `type: "*"`.
	if (type && onlyType(definition) && type === define.types["*"]) {
		Object.defineProperty(objPrototype, prop, {
			get: make.get.data(prop),
			set: make.set.events(prop, make.get.data(prop), make.set.data(prop), make.eventType.data(prop)),
			enumerable: true,
			configurable: true
		});
		return;
	}
	definition.type = type;

	// Where the value is stored.  If there is a `get` the source of the value
	// will be a compute in `this._computed[prop]`.  If not, the source of the
	// value will be in `this._data[prop]`.
	var dataProperty = definition.get ? "computed" : "data",

		// simple functions that all read/get/set to the right place.
		// - reader - reads the value but does not observe.
		// - getter - reads the value and notifies observers.
		// - setter - sets the value.
		reader = make.read[dataProperty](prop),
		getter = make.get[dataProperty](prop),
		setter = make.set[dataProperty](prop),
		getInitialValue;


	// Determine the type converter
	var typeConvert = function(val) {
		return val;
	};

	if (definition.Type) {
		typeConvert = make.set.Type(prop, definition.Type, typeConvert);
	}
	if (type) {
		typeConvert = make.set.type(prop, type, typeConvert);
	}

	// make a setter that's going to fire of events
	var eventsSetter = make.set.events(prop, reader, setter, make.eventType[dataProperty](prop));

	// Determine a function that will provide the initial property value.
	if ((definition.value !== undefined || definition.Value !== undefined)) {
		getInitialValue = Observation.ignore(make.get.defaultValue(prop, definition, typeConvert, eventsSetter));
	}

	// If property has a getter, create the compute that stores its data.
	if (definition.get) {
		computedInitializers[prop] = make.compute(prop, definition.get, getInitialValue);
	}
	// If the property isn't a getter, but has an initial value, setup a
	// default value on `this._data[prop]`.
	else if (getInitialValue) {
		dataInitializers[prop] = getInitialValue;
	}


	// Define setter behavior.

	// If there's a `get` and `set`, make the setter get the `lastSetValue` on the
	// `get`'s compute.
	if (definition.get && definition.set) {
		// the compute will set off events, so we can use the basic setter
		setter = make.set.setter(prop, definition.set, make.read.lastSet(prop), setter, true);
	}
	// If there's a `set` and no `get`,
	else if (definition.set) {
		// Add `set` functionality to the eventSetter.
		setter = make.set.setter(prop, definition.set, reader, eventsSetter, false);
	}
	// If there's niether `set` or `get`,
	else if (!definition.get) {
		// make a set that produces events.
		setter = eventsSetter;
	}

	// Add type behavior to the setter.
	if (type) {
		setter = make.set.type(prop, type, setter);
	}
	if (definition.Type) {
		setter = make.set.Type(prop, definition.Type, setter);
	}

	// Define the property.
	Object.defineProperty(objPrototype, prop, {
		get: getter,
		set: setter,
		enumerable: "serialize" in definition ? !!definition.serialize : !definition.get,
		configurable: true
	});
};


// Makes a simple constructor function.
define.Constructor = function(defines) {
	var constructor = function(props) {
		define.setup.call(this, props);
	};
	define(constructor.prototype, defines);
	return constructor;
};

// A bunch of helper functions that are used to create various behaviors.
make = {
	// Returns a function that creates the `_computed` prop.
	compute: function(prop, get, defaultValueFn) {
		return function() {
			var map = this,
				defaultValue = defaultValueFn && defaultValueFn.call(this),
				computeFn;

			if (defaultValue) {
				computeFn = defaultValue.isComputed ?
					defaultValue :
					compute.async(defaultValue, get, map);
			} else {
				computeFn = compute.async(defaultValue, get, map);
			}

			return {
				compute: computeFn,
				count: 0,
				handler: function(ev, newVal, oldVal) {
					canEvent.dispatch.call(map, {
						type: prop,
						target: map
					}, [newVal, oldVal]);
				}
			};
		};
	},
	// Set related helpers.
	set: {
		data: function(prop) {
			return function(newVal) {
				this._data[prop] = newVal;
			};
		},
		computed: function(prop) {
			return function(val) {
				this._computed[prop].compute(val);
			};
		},
		events: function(prop, getCurrent, setData, eventType) {
			return function(newVal) {
				if (this.__inSetup) {
					setData.call(this, newVal);
				}
				else {
					var current = getCurrent.call(this);
					if (newVal !== current) {
						setData.call(this, newVal);

						canEvent.dispatch.call(this, {
							type: prop,
							target: this
						}, [newVal, current]);
					}
				}
			};
		},
		setter: function(prop, setter, getCurrent, setEvents, hasGetter) {
			return function(value) {
				//!steal-remove-start
				var asyncTimer;
				//!steal-remove-end

				var self = this;

				// call the setter, if returned value is undefined,
				// this means the setter is async so we
				// do not call update property and return right away

				canBatch.start();
				var setterCalled = false,
					current = getCurrent.call(this),
					setValue = setter.call(this, value, function(value) {
						setEvents.call(self, value);

						setterCalled = true;
						//!steal-remove-start
						clearTimeout(asyncTimer);
						//!steal-remove-end
					}, current);

				if (setterCalled) {
					canBatch.stop();
				} else {
					if (hasGetter) {
						// we got a return value
						if (setValue !== undefined) {
							// if the current `set` value is returned, don't set
							// because current might be the `lastSetVal` of the internal compute.
							if (current !== setValue) {
								setEvents.call(this, setValue);
							}
							canBatch.stop();
						}
						// this is a side effect, it didn't take a value
						// so use the original set value
						else if (setter.length === 0) {
							setEvents.call(this, value);
							canBatch.stop();
							return;
						}
						// it took a value
						else if (setter.length === 1) {
							// if we have a getter, and undefined was returned,
							// we should assume this is setting the getters properties
							// and we shouldn't do anything.
							canBatch.stop();
						}
						// we are expecting something
						else {
							//!steal-remove-start
							asyncTimer = setTimeout(function() {
								dev.warn('can/map/setter.js: Setter "' + prop + '" did not return a value or call the setter callback.');
							}, dev.warnTimeout);
							//!steal-remove-end
							canBatch.stop();
							return;
						}
					} else {
						// we got a return value
						if (setValue !== undefined) {
							// if the current `set` value is returned, don't set
							// because current might be the `lastSetVal` of the internal compute.
							setEvents.call(this, setValue);
							canBatch.stop();
						}
						// this is a side effect, it didn't take a value
						// so use the original set value
						else if (setter.length === 0) {
							setEvents.call(this, value);
							canBatch.stop();
							return;
						}
						// it took a value
						else if (setter.length === 1) {
							// if we don't have a getter, we should probably be setting the
							// value to undefined
							setEvents.call(this, undefined);
							canBatch.stop();
						}
						// we are expecting something
						else {
							//!steal-remove-start
							asyncTimer = setTimeout(function() {
								dev.warn('can/map/setter.js: Setter "' + prop + '" did not return a value or call the setter callback.');
							}, dev.warnTimeout);
							//!steal-remove-end
							canBatch.stop();
							return;
						}
					}


				}
			};
		},
		type: function(prop, type, set) {

			if (typeof type === "object") {

				return make.set.Type(prop, type, set);

			} else {
				return function(newValue) {
					return set.call(this, type.call(this, newValue, prop));
				};
			}
		},
		Type: function(prop, Type, set) {
			// `type`: {foo: "string"}
			if(isArray(Type) && types.DefineList) {
				Type = types.DefineList.extend({
					"#": Type[0]
				});
			} else if (typeof Type === "object") {
				if(types.DefineMap) {
					Type = types.DefineMap.extend(Type);
				} else {
					Type = define.constructor(Type);
				}
			}
			return function(newValue) {
				if (newValue instanceof Type || newValue == null) {
					return set.call(this, newValue);
				} else {
					return set.call(this, new Type(newValue));
				}
			};
		}
	},
	// Helpes that indicate what the event type should be.  These probably aren't needed.
	eventType: {
		data: function(prop) {
			return function(newVal, oldVal) {
				return oldVal !== undefined || this._data.hasOwnProperty(prop) ? "set" : "add";
			};
		},
		computed: function() {
			return function() {
				return "set";
			};
		}
	},
	// Helpers that read the data in a non-observable way.
	read: {
		data: function(prop) {
			return function() {
				return this._data[prop];
			};
		},
		computed: function(prop) {
			// might want to protect this
			return function() {
				return this._computed[prop].compute();
			};
		},
		lastSet: function(prop) {
			return function() {
				var lastSetValue = this._computed[prop].compute.computeInstance.lastSetValue;
				return lastSetValue && lastSetValue.get();
			};
		}
	},
	// Helpers that read the data in an observable way.
	get: {
		// uses the default value
		defaultValue: function(prop, definition, typeConvert, callSetter) {
			return function() {
				var value = definition.value;
				if (value !== undefined) {
					if (typeof value === "function") {
						value = value.call(this);
					}
					value = typeConvert(value);
				}
				else {
					var Value = definition.Value;
					if (Value) {
						value = typeConvert(new Value());
					}
				}
				if(definition.set) {
					// TODO: there's almost certainly a faster way of making this happen
					// But this is maintainable.

					var VALUE;
					var sync = true;

					var setter = make.set.setter(prop, definition.set, function(){}, function(value){
						if(sync) {
							VALUE = value;
						} else {
							callSetter.call(this, value);
						}
					}, definition.get);

					setter.call(this,value);
					sync= false;

					// VALUE will be undefined if the callback is never called.
					return VALUE;


				}
				return value;
			};
		},
		data: function(prop) {
			return function() {
				if (!this.__inSetup) {
					Observation.add(this, prop);
				}

				return this._data[prop];
			};
		},
		computed: function(prop) {
			return function() {
				return this._computed[prop].compute();
			};
		}
	}
};

define.behaviors = ["get", "set", "value", "Value", "type", "Type", "serialize"];

var addDefinition = function(definition, behavior, value) {
	if(behavior === "type") {
		var behaviorDef = value;
		if(typeof behaviorDef === "string") {
			behaviorDef = define.types[behaviorDef];
			if(typeof behaviorDef === "object") {
				assign(definition, behaviorDef);
				behaviorDef = behaviorDef[behavior];
			}
		}
		definition[behavior] = behaviorDef;
	}
	else {
		definition[behavior] = value;
	}
};

makeDefinition = function(prop, def, defaultDefinition) {
	var definition = {};

	each(def, function(value, behavior) {
		addDefinition(definition, behavior, value);
	});
	// only add default if it doesn't exist
	each(defaultDefinition, function(value, prop){
		if(definition[prop] === undefined) {
			if(prop !== "type" && prop !== "Type") {
				definition[prop] = value;
			}
		}
	});
	// if there's no type definition, take it from the defaultDefinition
	if(!definition.type && !definition.Type) {
		defaults(definition, defaultDefinition);
	}


	if( isEmptyObject(definition) ) {
		definition.type = define.types["*"];
	}
	return definition;
};

getDefinitionOrMethod = function(prop, value, defaultDefinition){
	var definition;
	if(typeof value === "string") {
		definition = {type: value};
	}
	else if(typeof value === "function") {
		if(types.isConstructor(value)) {
			definition = {Type: value};
		} else if(isDefineType(value)) {
			definition = {type: value};
		}
		// or leaves as a function
	} else if( isArray(value) ) {
		definition = {Type: value};
	} else if( isPlainObject(value) ){
		definition = value;
	}

	if(definition) {
		return makeDefinition(prop, definition, defaultDefinition);
	} else {
		return value;
	}
};
getDefinitionsAndMethods = function(defines, baseDefines) {
	// make it so the definitions include base definitions on the proto
	var definitions = Object.create(baseDefines ? baseDefines.definitions : null);
	var methods = {};
	// first lets get a default if it exists
	var defaults = defines["*"],
		defaultDefinition;
	if(defaults) {
		delete defines["*"];
		defaultDefinition = getDefinitionOrMethod("*", defaults, {});
	} else {
		defaultDefinition = Object.create(null);
	}

	eachPropertyDescriptor(defines, function( prop, propertyDescriptor ) {

		var value;
		if(propertyDescriptor.get || propertyDescriptor.set) {
			value = {get: propertyDescriptor.get, set: propertyDescriptor.set};
		} else {
			value = propertyDescriptor.value;
		}

		if(prop === "constructor") {
			methods[prop] = value;
			return;
		} else {
			var result = getDefinitionOrMethod(prop, value, defaultDefinition);
			if(result && typeof result === "object") {
				definitions[prop] = result;
			} else {
				methods[prop] = result;
			}
		}
	});
	if(defaults) {
		defines["*"] = defaults;
	}
	return {definitions: definitions, methods: methods, defaultDefinition: defaultDefinition};
};

replaceWith = function(obj, prop, cb, writable) {
	Object.defineProperty(obj, prop, {
		configurable: true,
		get: function() {
			Object.defineProperty(this, prop, {
				value: undefined,
				writable: true
			});
			var value = cb.call(this, obj, prop);
			Object.defineProperty(this, prop, {
				value: value,
				writable: !!writable
			});
			return value;
		},
		set: function(value){
			Object.defineProperty(this, prop, {
				value: value,
				writable: !!writable
			});
			return value;
		}
	});
};

eventsProto = assign({}, event);
assign(eventsProto, {
	_eventSetup: function() {},
	_eventTeardown: function() {},
	addEventListener: function(eventName, handler) {

		var computedBinding = this._computed && this._computed[eventName];
		if (computedBinding && computedBinding.compute) {
			if (!computedBinding.count) {
				computedBinding.count = 1;
				computedBinding.compute.addEventListener("change", computedBinding.handler);
			} else {
				computedBinding.count++;
			}

		}

		return eventLifecycle.addAndSetup.apply(this, arguments);
	},

	// ### unbind
	// Stops listening to an event.
	// If this is the last listener of a computed property,
	// stop forwarding events of the computed property to this map.
	removeEventListener: function(eventName, handler) {
		var computedBinding = this._computed && this._computed[eventName];
		if (computedBinding) {
			if (computedBinding.count === 1) {
				computedBinding.count = 0;
				computedBinding.compute.removeEventListener("change", computedBinding.handler);
			} else {
				computedBinding.count--;
			}

		}

		return eventLifecycle.removeAndTeardown.apply(this, arguments);

	}
});
eventsProto.on = eventsProto.bind = eventsProto.addEventListener;
eventsProto.off = eventsProto.unbind = eventsProto.removeEventListener;

delete eventsProto.one;

define.setup = function(props, sealed) {
	defineNotWritable(this, "__bindEvents", Object.create(null));
	defineNotWritable(this, "constructor", this.constructor);
	/* jshint -W030 */
	CID(this);
	defineNotWritable(this, "_cid", this._cid);
	var definitions = this._define.definitions;
	var instanceDefinitions = Object.create(null);
	var map = this;
	each(props, function(value, prop){
		if(definitions[prop]) {
			map[prop] = value;
		} else {
			var def = define.makeSimpleGetterSetter(prop);
			instanceDefinitions[prop] = {};
			Object.defineProperty(map, prop, def);
			// possibly convert value to List or DefineMap
			map[prop] = define.types.observable(value);
		}
	});
	if(!isEmptyObject(instanceDefinitions)) {
		defineConfigurableAndNotEnumerable(this, "_instanceDefinitions", instanceDefinitions);
	}
	// only seal in dev mode for performance reasons.
	//!steal-remove-start
	this._data;
	this._computed;
	if(sealed !== false) {
		Object.seal(this);
	}
	//!steal-remove-end
};
define.replaceWith = replaceWith;
define.eventsProto = eventsProto;
define.defineConfigurableAndNotEnumerable = defineConfigurableAndNotEnumerable;
define.make = make;
define.getDefinitionOrMethod = getDefinitionOrMethod;
var simpleGetterSetters = {};
define.makeSimpleGetterSetter = function(prop){
	if(!simpleGetterSetters[prop]) {

		var setter = make.set.events(prop, make.get.data(prop), make.set.data(prop), make.eventType.data(prop) );

		simpleGetterSetters[prop] = {
			get: make.get.data(prop),
			set: function(newVal){
				return setter.call(this, define.types.observable(newVal));
			},
			enumerable: true
		};
	}
	return simpleGetterSetters[prop];
};

define.Iterator = function(obj){
  this.obj = obj;
  this.definitions = Object.keys(obj._define.definitions);
  this.instanceDefinitions = obj._instanceDefinitions ?
    Object.keys(obj._instanceDefinitions) :
    Object.keys(obj);
  this.hasGet = typeof obj.get === "function";
};

define.Iterator.prototype.next = function(){
  var key;
  if(this.definitions.length) {
    key = this.definitions.shift();

    // Getters should not be enumerable
    var def = this.obj._define.definitions[key];
    if(def.get) {
      return this.next();
    }
  } else if(this.instanceDefinitions.length) {
    key = this.instanceDefinitions.shift();
  } else {
    return {
      value: undefined,
      done: true
    };
  }

  return {
    value: [
      key,
      this.hasGet ? this.obj.get(key) : this.obj[key]
    ],
    done: false
  };
};

isDefineType = function(func){
	return func && func.canDefineType === true;
};

define.types = {
	'date': function(str) {
		var type = typeof str;
		if (type === 'string') {
			str = Date.parse(str);
			return isNaN(str) ? null : new Date(str);
		} else if (type === 'number') {
			return new Date(str);
		} else {
			return str;
		}
	},
	'number': function(val) {
		if (val == null) {
			return val;
		}
		return +(val);
	},
	'boolean': function(val) {
		if(val == null) {
			return val;
		}
		if (val === 'false' || val === '0' || !val) {
			return false;
		}
		return true;
	},
	'observable': function(newVal) {
				if(isArray(newVal) && types.DefineList) {
						newVal = new types.DefineList(newVal);
				}
				else if(isPlainObject(newVal) &&  types.DefineMap) {
						newVal = new types.DefineMap(newVal);
				}
				return newVal;
		},
	'stringOrObservable': function(newVal) {
		if(isArray(newVal)) {
			return new types.DefaultList(newVal);
		}
		else if(isPlainObject(newVal)) {
			return new types.DefaultMap(newVal);
		}
		else {
			return define.types.string(newVal);
		}
	},
	/**
	 * Implements HTML-style boolean logic for attribute strings, where
	 * any string, including "", is truthy.
	 */
	'htmlbool': function(val) {
		if (val === '') {
			return true;
		}
		return !!stringToAny(val);
	},
	'*': function(val) {
		return val;
	},
	'any': function(val) {
		return val;
	},
	'string': function(val) {
		if (val == null) {
			return val;
		}
		return '' + val;
	},

	'compute': {
		set: function(newValue, setVal, setErr, oldValue) {
			if (newValue && newValue.isComputed) {
				return newValue;
			}
			if (oldValue && oldValue.isComputed) {
				oldValue(newValue);
				return oldValue;
			}
			return newValue;
		},
		get: function(value) {
			return value && value.isComputed ? value() : value;
		}
	}
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var Construct = __webpack_require__(27);
var define = __webpack_require__(43);
var assign = __webpack_require__(3);
var isArray = __webpack_require__(31);
var isPlainObject = __webpack_require__(39);
var defineHelpers = __webpack_require__(56);
var Observation = __webpack_require__(7);
var types = __webpack_require__(0);
var canBatch = __webpack_require__(11);
var ns = __webpack_require__(2);
var canLog = __webpack_require__(18);

var readWithoutObserve = Observation.ignore(function(map, prop){
    return map[prop];
});

var eachDefinition = function(map, cb, thisarg, definitions, observe) {

    for(var prop in definitions) {
        var definition = definitions[prop];
        if(typeof definition !== "object" || ("serialize" in definition ? !!definition.serialize : !definition.get)) {

            var item = observe === false ? readWithoutObserve(map, prop) : map[prop];

            if (cb.call(thisarg || item, item, prop, map) === false) {
                return false;
            }
        }
    }
};

var setProps = function(props, remove) {
	props = defineHelpers.removeSpecialKeys(assign({}, props));
    var prop,
        self = this,
        newVal;

    // Batch all of the change events until we are done.
    canBatch.start();
    // Merge current properties with the new ones.
    this.each(function(curVal, prop) {
        // You can not have a _cid property; abort.
        if (prop === "_cid") {
            return;
        }
        newVal = props[prop];

        // If we are merging, remove the property if it has no value.
        if (newVal === undefined) {
            if (remove) {
                self[prop] = undefined;
            }
            return;
        }
        if( typeof curVal !== "object" || curVal === null ) {
            self.set(prop, newVal);
        }
        else if( ("replace" in curVal) && isArray(newVal)) {
            curVal.replace(newVal);
        }        
        else if( ("set" in curVal) && (isPlainObject(newVal) || isArray(newVal))) {
            curVal.set(newVal, remove);
        }
        else if( ("attr" in curVal) && (isPlainObject(newVal) || isArray(newVal)) ) {
            curVal.attr(newVal, remove);
        }
        else if(curVal !== newVal) {
            self.set(prop, newVal);
        }
        delete props[prop];
    }, this, false);
    // Add remaining props.
    for (prop in props) {
        // Ignore _cid.
        if (prop !== "_cid") {
            newVal = props[prop];
            this.set(prop, newVal);
        }

    }
    canBatch.stop();
    return this;
};

var DefineMap = Construct.extend("DefineMap",{
    setup: function(base){
		var key,
			prototype = this.prototype;
        if(DefineMap) {
            define(prototype, prototype, base.prototype._define);
			for(key in DefineMap.prototype) {
				define.defineConfigurableAndNotEnumerable(prototype, key, prototype[key]);
			}

            this.prototype.setup = function(props){
				define.setup.call(
					this, 
					defineHelpers.removeSpecialKeys(defineHelpers.toObject(this, props,{}, DefineMap)),
					this.constructor.seal
				);
            };
		} else {
			for(key in prototype) {
				define.defineConfigurableAndNotEnumerable(prototype, key, prototype[key]);
        }
    }
		define.defineConfigurableAndNotEnumerable(prototype, "constructor", this);
	}
},{
    // setup for only dynamic DefineMap instances
    setup: function(props, sealed){
        if(!this._define) {
            Object.defineProperty(this,"_define",{
                enumerable: false,
                value: {
                    definitions: {}
                }
            });
            Object.defineProperty(this,"_data",{
                enumerable: false,
                value: {}
            });
        }
		define.setup.call(
			this,
			defineHelpers.removeSpecialKeys(defineHelpers.toObject(this, props,{}, DefineMap)),
			sealed === true
		);
    },
    /**
     * @function can-define/map/map.prototype.get get
     * @parent can-define/map/map.prototype
     *
     * @description Get a value or all values from a DefineMap.
     *
     * @signature `map.get()`
     *
     * Returns a plain JavaScript object that contains the properties and values of the map instance.  Any property values
     * that also have a `get` method will have their `get` method called and the resulting value will be used as
     * the property value.  This can be used to recursively convert a map instance to an object of other plain
     * JavaScript objects.  Cycles are supported and only create one object.
     *
     * `.get()` can still return other non plain JS objects like Date.
     * Use [can-define/map/map.prototype.serialize] when a form proper for `JSON.stringify` is needed.
     *
     * ```js
     * var map = new DefineMap({foo: new DefineMap({bar: "zed"})});
     * map.get() //-> {foo: {bar: "zed"}};
     * ```
     *
     *   @return {Object} A plain JavaScript `Object` that contains all the properties and values of the map instance.
     *
     * @signature `map.get(propName)`
     *
     * Get a single property on a DefineMap instance.
     *
     * `.get(propName)` only should be used when reading properties that might not have been defined yet, but
     * will be later via [can-define/map/map.prototype.set].
     *
     * ```js
     * var map = new DefineMap();
     * map.get("name") //-> undefined;
     * ```
     *
     *   @param {String} propName The property name of a property that may not have been defined yet.
     *   @return {*} The value of that property.
     */
    get: function(prop){
        if(prop) {
            var value = this[prop];
            if(value !== undefined || prop in this || Object.isSealed(this)) {
                return value;
            } else {
                Observation.add(this, prop);
                return this[prop];
            }

        } else {
            return defineHelpers.serialize(this, 'get', {});
        }
    },
    /**
     * @function can-define/map/map.prototype.set set
     * @parent can-define/map/map.prototype
     *
     * @description Sets multiple properties on a map instance or a property that wasn't predefined.
     *
     * @signature `map.set(props [,removeProps])`
     *
     * Assigns each value in `props` to a property on this map instance named after the
     * corresponding key in `props`, effectively merging `props` into the Map. If `removeProps` is true, properties not in
     * `props` will be set to `undefined`.
     *
     *   @param {Object} props A collection of key-value pairs to set.
     *   If any properties already exist on the map, they will be overwritten.
     *
     *   @param {Boolean} [removeProps=false] Whether to set keys not present in `props` to `undefined`.
     *
     *   @return {can-define/map/map} The map instance for chaining.
     *
     * @signature `map.set(propName, value)`
     *
     * Assigns _value_ to a property on this map instance called _propName_.  This will define
     * the property if it hasn't already been predefined.
     *
     *   @param {String} propName The property to set.
     *   @param {*} value The value to assign to `propName`.
     *   @return {can-define/map/map} This map instance, for chaining.
     */
    set: function(prop, value){
        if(typeof prop === "object") {
            return setProps.call(this, prop, value);
        }
        var defined = defineHelpers.defineExpando(this, prop, value);
        if(!defined) {
            this[prop] = value;
        }
        return this;
    },
    /**
     * @function can-define/map/map.prototype.serialize serialize
     * @parent can-define/map/map.prototype
     *
     * @description Get a serialized representation of the map instance and its children.
     *
     * @signature `map.serialize()`
     *
     * Get the serialized Object form of the map.  Serialized
     * data is typically used to send back to a server.  Use [can-define.types.serialize]
     * to customize a property's serialized value or if the property should be added to
     * the result or not.
     *
     * `undefined` serialized values are not added to the result.
     *
     * ```js
     * var MyMap = DefineMap.extend({
     *   date: {
     *     type: "date",
     *     serialize: function(date){
     *       return date.getTime()
     *     }
     *   }
     * });
     *
     * var myMap = new MyMap({date: new Date(), count: 5});
     * myMap.serialize() //-> {date: 1469566698504, count: 5}
     * ```
     *
     *   @return {Object} A JavaScript Object that can be serialized with `JSON.stringify` or other methods.
     *
     */
    serialize: function () {
        return defineHelpers.serialize(this, 'serialize', {});
    },

    forEach: function(cb, thisarg, observe){
        if(observe !== false) {
            Observation.add(this, '__keys');
        }
        var res;
        var constructorDefinitions = this._define.definitions;
        if(constructorDefinitions) {
            res = eachDefinition(this, cb, thisarg, constructorDefinitions, observe);
        }
        if(res === false) {
            return this;
        }
        if(this._instanceDefinitions) {
            eachDefinition(this, cb, thisarg, this._instanceDefinitions, observe);
        }

        return this;
    },
    "*": {
        type: define.types.observable
    }
});

// Add necessary event methods to this object.
for(var prop in define.eventsProto) {
	DefineMap[prop] = define.eventsProto[prop];
    Object.defineProperty(DefineMap.prototype, prop, {
        enumerable:false,
        value: define.eventsProto[prop],
        writable: true
    });
}
types.DefineMap = DefineMap;
types.DefaultMap = DefineMap;

DefineMap.prototype.toObject = function(){
    canLog.warn("Use DefineMap::get instead of DefineMap::toObject");
    return this.get();
};
DefineMap.prototype.each = DefineMap.prototype.forEach;

var oldIsMapLike = types.isMapLike;
types.isMapLike = function(obj){
	return obj instanceof DefineMap || oldIsMapLike.apply(this, arguments);
};

module.exports = ns.DefineMap = DefineMap;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var compute = __webpack_require__(9);
var observeReader = __webpack_require__(15);

var utils = __webpack_require__(29);
var mustacheHelpers = __webpack_require__(35);

var each = __webpack_require__(1);
var isEmptyObject = __webpack_require__(22);
var dev = __webpack_require__(6);
var assign = __webpack_require__(3);
var last = __webpack_require__(32);
// ## Helpers

// Helper for getting a bound compute in the scope.
var getKeyComputeData = function (key, scope, readOptions) {

		var data = scope.computeData(key, readOptions);

		compute.temporarilyBind(data.compute);

		return data;
	},
	// Looks up a value in the scope and returns a compute if the value is
	// observable and the value if not.
	lookupValue = function(key, scope, helperOptions, readOptions){
		var prop = getValueOfComputeOrFunction(key);
		var computeData = getKeyComputeData(prop, scope, readOptions);
		// If there are no dependencies, just return the value.
		if (!computeData.compute.computeInstance.hasDependencies) {
			return {value: computeData.initialValue, computeData: computeData};
		} else {
			return {value: computeData.compute, computeData: computeData};
		}
	},
	// Looks up a value in the scope, and if it is `undefined`, looks up
	// the value as a helper.
	lookupValueOrHelper = function(key, scope, helperOptions, readOptions){
		var res = lookupValue(key, scope, helperOptions, readOptions);

		// If it doesn't look like a helper and there is no value, check helpers
		// anyway. This is for when foo is a helper in `{{foo}}`.
		if( res.computeData.initialValue === undefined ) {
			if(key.charAt(0) === "@" && key !== "@index") {
				key = key.substr(1);
			}
			var helper = mustacheHelpers.getHelper(key, helperOptions);
			res.helper = helper && helper.fn;
		}
		return res;
	},
	// Looks up a value in the result of a Lookup or Call expression
	lookupValueInResult = function(keyOrCompute, lookupOrCall, scope, helperOptions, readOptions) {
		var result = lookupOrCall.value(scope, {}, {});

		var c = compute(function(newVal) {
			var key = getValueOfComputeOrFunction(keyOrCompute);
			if (arguments.length) {
				observeReader.write(result, observeReader.reads(key), newVal);
			} else {
				// Convert possibly numeric key to string, because observeReader.get will do a charAt test on it.
				// also escape `.` so that things like ["bar.baz"] will work correctly
				return observeReader.get(result, ("" + key).replace(".", "\\."));
			}
		});

		return { value: c };
	},
	// gets the value of a compute or function
	getValueOfComputeOrFunction = function (computeOrFunction) {
		if (typeof computeOrFunction.value === 'function') {
			return computeOrFunction.value();
		}

		if (typeof computeOrFunction === 'function') {
			return computeOrFunction();
		}

		return computeOrFunction;
	},
	// If not a Literal or an Arg, convert to an arg for caching.
	convertToArgExpression = function(expr){
		if(!(expr instanceof Arg) && !(expr instanceof Literal)) {
			return new Arg(expr);
		} else {
			return expr;
		}

	};

// ## Expression Types
//
// These expression types return a value. They are assembled by `expression.parse`.

// ### Bracket
// For accessing properties using bracket notation like `foo[bar]`
var Bracket = function (key, root) {
	this.root = root;
	this.key = key;
};
Bracket.prototype.value = function (scope) {
	var prop = this.key;
	var obj = this.root;

	if (prop instanceof Lookup) {
		prop = lookupValue(prop.key, scope, {}, {}).value;
	} else if (prop instanceof Call) {
		prop = prop.value(scope, {}, {});
	}

	if (!obj) {
		return lookupValue(prop, scope, {}, {}).value;
	} else {
		return lookupValueInResult(prop, obj, scope, {}, {}).value;
	}
};

// ### Literal
// For inline static values like `{{"Hello World"}}`
var Literal = function(value){
	this._value = value;
};
Literal.prototype.value = function(){
	return this._value;
};

// ### Lookup
// `new Lookup(String, [Expression])`
// Finds a value in the scope or a helper.
var Lookup = function(key, root) {
	this.key = key;
	this.rootExpr = root;
};
Lookup.prototype.value = function(scope, helperOptions){
	var result = {};

	if (this.rootExpr) {
		result = lookupValueInResult(this.key, this.rootExpr, scope, {}, {});
	} else {
		result = lookupValueOrHelper(this.key, scope, helperOptions);
	}
	// TODO: remove this.  This is hacky.
	this.isHelper = result.helper && !result.helper.callAsMethod;
	return result.helper || result.value;
};

// ### ScopeLookup
// Looks up a value in the scope, returns a compute for the value it finds.
// If passed an expression, that is used to lookup data
var ScopeLookup = function(key, root) {
	Lookup.apply(this, arguments);
};
ScopeLookup.prototype.value = function(scope, helperOptions){
	if (this.rootExpr) {
		return lookupValueInResult(this.key, this.rootExpr, scope, {}, {}).value;
	}

	return lookupValue(this.key, scope, helperOptions).value;
};

// ### Arg
// `new Arg(Expression [,modifierOptions] )`
// Used to identify an expression that should return a value.
var Arg = function(expression, modifiers){
	this.expr = expression;
	this.modifiers = modifiers || {};
	this.isCompute = false;
};
Arg.prototype.value = function(){
	return this.expr.value.apply(this.expr, arguments);
};

// ### Hash
// A placeholder. This isn't actually used.
var Hash = function(){ }; // jshint ignore:line

var Hashes = function(hashes){
	this.hashExprs = hashes;
};
Hashes.prototype.value = function(scope, helperOptions){
	var hash = {};
	for(var prop in this.hashExprs) {
		var val = convertToArgExpression(this.hashExprs[prop]),
			value = val.value.apply(val, arguments);

		hash[prop] = {
			call: value && value.isComputed && !val.modifiers.compute,
			value: value
		};
	}
	return compute(function(){
		var finalHash = {};
		for(var prop in hash) {
			finalHash[prop] = hash[prop].call ? hash[prop].value() : hash[prop].value;
		}
		return finalHash;
	});
};
// ### Call
// `new Call( new Lookup("method"), [new ScopeExpr("name")], {})`
// A call expression like `method(arg1, arg2)` that, by default,
// calls `method` with non compute values.
var Call = function(methodExpression, argExpressions){
	this.methodExpr = methodExpression;
	this.argExprs = argExpressions.map(convertToArgExpression);
};
Call.prototype.args = function(scope, helperOptions){
	var args = [];
	for(var i = 0, len = this.argExprs.length; i < len; i++) {
		var arg = this.argExprs[i];
		var value = arg.value.apply(arg, arguments);
		args.push({
			call: value && value.isComputed && !arg.modifiers.compute,
			value: value
		});
	}
	return function(){
		var finalArgs = [];
		for(var i = 0, len = args.length; i < len; i++) {
			finalArgs[i] = args[i].call ? args[i].value() : args[i].value;
		}
		return finalArgs;
	};
};

Call.prototype.value = function(scope, helperScope, helperOptions){

	var method = this.methodExpr.value(scope, helperScope);
	// TODO: remove this hack
	var isHelper = this.isHelper = this.methodExpr.isHelper;

	var getArgs = this.args(scope, helperScope);

	return compute(function(newVal){
		var func = method;
		if(func && func.isComputed) {
			func = func();
		}
		if(typeof func === "function") {
			var args = getArgs();

			// if fn/inverse is needed, add after this

			if(isHelper && helperOptions) {
				args.push(helperOptions);
			}
			if(arguments.length) {
				args.unshift(new expression.SetIdentifier(newVal));
			}

			return func.apply(null, args);
		}

	});

};

Call.prototype.closingTag = function() {
	return this.methodExpr.key.slice(1);
};

// ### HelperLookup
// An expression that looks up a value in the helper or scope.
// Any functions found prior to the last one are called with
// the context and scope.
var HelperLookup = function(){
	Lookup.apply(this, arguments);
};
HelperLookup.prototype.value = function(scope, helperOptions){
	var result = lookupValueOrHelper(this.key, scope, helperOptions, {isArgument: true, args: [scope.peek('.'), scope]});
	return result.helper || result.value;
};

// ### HelperScopeLookup
// An expression that looks up a value in the scope.
// Any functions found prior to the last one are called with
// the context and scope.
var HelperScopeLookup = function(){
	Lookup.apply(this, arguments);
};
HelperScopeLookup.prototype.value = function(scope, helperOptions){
	return lookupValue(this.key, scope, helperOptions, {
		callMethodsOnObservables: true,
		isArgument: true,
		args: [ scope.peek('.'), scope ]
	}).value;
};

var Helper = function(methodExpression, argExpressions, hashExpressions){
	this.methodExpr = methodExpression;
	this.argExprs = argExpressions;
	this.hashExprs = hashExpressions;
	this.mode = null;
};
Helper.prototype.args = function(scope, helperOptions){
	var args = [];
	for(var i = 0, len = this.argExprs.length; i < len; i++) {
		var arg = this.argExprs[i];
		args.push( arg.value.apply(arg, arguments) );
	}
	return args;
};
Helper.prototype.hash = function(scope, helperOptions){
	var hash = {};
	for(var prop in this.hashExprs) {
		var val = this.hashExprs[prop];
		hash[prop] = val.value.apply(val, arguments);
	}
	return hash;
};
// looks up the name key in the scope
// returns a `helper` property if there is a helper for the key.
// returns a `value` property if the value is looked up.
Helper.prototype.helperAndValue = function(scope, helperOptions){

	//{{foo bar}}
	var looksLikeAHelper = this.argExprs.length || !isEmptyObject(this.hashExprs),
		helper,
		value,
		// If a literal, this means it should be treated as a key. But helpers work this way for some reason.
		// TODO: fix parsing so numbers will also be assumed to be keys.
		methodKey = this.methodExpr instanceof Literal ?
			""+this.methodExpr._value : this.methodExpr.key,
		initialValue,
		args;

	// If the expression looks like a helper, try to get a helper right away.
	if (looksLikeAHelper) {
		// Try to find a registered helper.
		helper = mustacheHelpers.getHelper(methodKey, helperOptions);

		// If a function is on top of the context, call that as a helper.
		var context = scope.peek(".");
		if(!helper && typeof context[methodKey] === "function") {
			//!steal-remove-start
			dev.warn('can-stache/src/expression.js: In 3.0, method "' + methodKey + '" will not be called as a helper, but as a method.');
			//!steal-remove-end
			helper = {fn: context[methodKey]};
		}

	}
	if(!helper) {
		args = this.args(scope, helperOptions);
		// Get info about the compute that represents this lookup.
		// This way, we can get the initial value without "reading" the compute.
		var computeData = getKeyComputeData(methodKey, scope, {
			isArgument: false,
			args: args && args.length ? args : [scope.peek('.'), scope]
		}),
			compute = computeData.compute;

		initialValue = computeData.initialValue;

		// Set name to be the compute if the compute reads observables,
		// or the value of the value of the compute if no observables are found.
		if(computeData.compute.computeInstance.hasDependencies) {
			value = compute;
		} else {
			value = initialValue;
		}

		// If it doesn't look like a helper and there is no value, check helpers
		// anyway. This is for when foo is a helper in `{{foo}}`.
		if( !looksLikeAHelper && initialValue === undefined ) {
			helper = mustacheHelpers.getHelper(methodKey, helperOptions);
		}

	}

	//!steal-remove-start
	if ( !helper && initialValue === undefined) {
		if(looksLikeAHelper) {
			dev.warn('can-stache/src/expression.js: Unable to find helper "' + methodKey + '".');
		} else {
			dev.warn('can-stache/src/expression.js: Unable to find key or helper "' + methodKey + '".');
		}
	}
	//!steal-remove-end

	return {
		value: value,
		args: args,
		helper: helper && helper.fn
	};
};
Helper.prototype.evaluator = function(helper, scope, helperOptions, /*REMOVE*/readOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly){

	var helperOptionArg = {
		fn: function () {},
		inverse: function () {},
		stringOnly: stringOnly
	},
		context = scope.peek("."),
		args = this.args(scope, helperOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly),
		hash = this.hash(scope, helperOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly);

	// Add additional data to be used by helper functions
	utils.convertToScopes(helperOptionArg, scope,helperOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly);

	assign(helperOptionArg, {
		context: context,
		scope: scope,
		contexts: scope,
		hash: hash,
		nodeList: nodeList,
		exprData: this,
		helperOptions: helperOptions,
		helpers: helperOptions
	});

	args.push(helperOptionArg);
	// Call the helper.
	return function () {
		return helper.apply(context, args);
	};
};

Helper.prototype.value = function(scope, helperOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly){

	var helperAndValue = this.helperAndValue(scope, helperOptions);

	var helper = helperAndValue.helper;
	// a method could have been called, resulting in a value
	if(!helper) {
		return helperAndValue.value;
	}

	var fn = this.evaluator(helper, scope, helperOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly);

	var computeValue = compute(fn);

	compute.temporarilyBind(computeValue);

	if (!computeValue.computeInstance.hasDependencies) {
		return computeValue();
	} else {
		return computeValue;
	}
};

Helper.prototype.closingTag = function() {
	return this.methodExpr.key;
};


// NAME - \w
// KEY - foo, foo.bar, foo@bar, %foo (special), &foo (references), ../foo, ./foo
// ARG - ~KEY, KEY, CALLEXPRESSION, PRIMITIVE
// CALLEXPRESSION = KEY(ARG,ARG, NAME=ARG)
// HELPEREXPRESSION = KEY ARG ARG NAME=ARG
// DOT .NAME
// AT @NAME
//
var keyRegExp = /[\w\.\\\-_@\/\&%]+/,
	tokensRegExp = /('.*?'|".*?"|=|[\w\.\\\-_@\/*%\$]+|[\(\)]|,|\~|\[|\]\s*|\s*(?=\[))/g,
	bracketSpaceRegExp = /\]\s+/,
	literalRegExp = /^('.*?'|".*?"|[0-9]+\.?[0-9]*|true|false|null|undefined)$/;

var isTokenKey = function(token){
	return keyRegExp.test(token);
};

var testDot = /^[\.@]\w/;
var isAddingToExpression = function(token) {

	return isTokenKey(token) && testDot.test(token);
};

var ensureChildren = function(type) {
	if(!type.children) {
		type.children = [];
	}
	return type;
};

var Stack = function(){

	this.root = {children: [], type: "Root"};
	this.current = this.root;
	this.stack = [this.root];
};
assign(Stack.prototype,{
	top: function(){
		return last(this.stack);
	},
	isRootTop: function(){
		return this.top() === this.root;
	},
	popTo: function(types){
		this.popUntil(types);
		this.pop();
	},
	pop: function() {
		if(!this.isRootTop()) {
			this.stack.pop();
		}
	},
	first: function(types){
		var curIndex = this.stack.length - 1;
		while( curIndex > 0 && types.indexOf(this.stack[curIndex].type) === -1 ) {
			curIndex--;
		}
		return this.stack[curIndex];
	},
	firstParent: function(types){
		var curIndex = this.stack.length - 2;
		while( curIndex > 0 && types.indexOf(this.stack[curIndex].type) === -1 ) {
			curIndex--;
		}
		return this.stack[curIndex];
	},
	popUntil: function(types){
		while( types.indexOf(this.top().type) === -1 && !this.isRootTop() ) {
			this.stack.pop();
		}
		return this.top();
	},
	addTo: function(types, type){
		var cur = this.popUntil(types);
		ensureChildren(cur).children.push(type);
	},
	addToAndPush: function(types, type){
		this.addTo(types, type);
		this.stack.push(type);
	},
	push: function(type) {
		this.stack.push(type);
	},
	topLastChild: function(){
		return last(this.top().children);
	},
	replaceTopLastChild: function(type){
		var children = ensureChildren(this.top()).children;
		children.pop();
		children.push(type);
		return type;
	},
	replaceTopLastChildAndPush: function(type) {
		this.replaceTopLastChild(type);
		this.stack.push(type);
	},
	replaceTopAndPush: function(type){
		var children;
		if(this.top() === this.root) {
			children = ensureChildren(this.top()).children;
		} else {
			this.stack.pop();
			// get parent and clean
			children = ensureChildren(this.top()).children;
		}

		children.pop();
		children.push(type);
		this.stack.push(type);
		return type;
	}
});

// converts
// - "../foo" -> "../@foo",
// - "foo" -> "@foo",
// - ".foo" -> "@foo",
// - "./foo" -> "./@foo"
// - "foo.bar" -> "foo@bar"
var convertKeyToLookup = function(key){
	var lastPath = key.lastIndexOf("./");
	var lastDot = key.lastIndexOf(".");
	if(lastDot > lastPath) {
		return key.substr(0, lastDot)+"@"+key.substr(lastDot+1);
	}
	var firstNonPathCharIndex = lastPath === -1 ? 0 : lastPath+2;
	var firstNonPathChar = key.charAt(firstNonPathCharIndex);
	if(firstNonPathChar === "." || firstNonPathChar === "@" ) {
		return key.substr(0, firstNonPathCharIndex)+"@"+key.substr(firstNonPathCharIndex+1);
	} else {
		return key.substr(0, firstNonPathCharIndex)+"@"+key.substr(firstNonPathCharIndex);
	}
};
var convertToAtLookup = function(ast){
	if(ast.type === "Lookup") {
		ast.key = convertKeyToLookup(ast.key);
	}
	return ast;
};

var convertToHelperIfTopIsLookup = function(stack){
	var top = stack.top();
	// if two scopes, that means a helper
	if(top && top.type === "Lookup") {

		var base = stack.stack[stack.stack.length - 2];
		// That lookup shouldn't be part of a Helper already or
		if(base.type !== "Helper" && base) {
			stack.replaceTopAndPush({
				type: "Helper",
				method: top
			});
		}
	}
};

var expression = {
	convertKeyToLookup: convertKeyToLookup,
	Literal: Literal,
	Lookup: Lookup,
	ScopeLookup: ScopeLookup,

	Arg: Arg,
	Hash: Hash,
	Hashes: Hashes,
	Call: Call,
	Helper: Helper,
	HelperLookup: HelperLookup,
	HelperScopeLookup: HelperScopeLookup,
	Bracket: Bracket,

	SetIdentifier: function(value){ this.value = value; },
	tokenize: function(expression){
		var tokens = [];
		(expression.trim() + ' ').replace(tokensRegExp, function (whole, arg) {
			if (bracketSpaceRegExp.test(arg)) {
				tokens.push(arg[0]);
				tokens.push(arg.slice(1));
			} else {
				tokens.push(arg);
			}
		});
		return tokens;
	},
	lookupRules: {
		"default": function(ast, methodType, isArg){
			var name = (methodType === "Helper" && !ast.root ? "Helper" : "")+(isArg ? "Scope" : "")+"Lookup";
			return expression[name];
		},
		"method": function(ast, methodType, isArg){
			return ScopeLookup;
		}
	},
	methodRules: {
		"default": function(ast){

			return ast.type === "Call" ? Call : Helper;
		},
		"call": function(ast){
			return Call;
		}
	},
	// ## expression.parse
	//
	// - {String} expressionString - A stache expression like "abc foo()"
	// - {Object} options
	//   - baseMethodType - Treat this like a Helper or Call.  Default to "Helper"
	//   - lookupRule - "default" or "method"
	//   - methodRule - "default" or "call"
	parse: function(expressionString, options){
		options =  options || {};
		var ast = this.ast(expressionString);

		if(!options.lookupRule) {
			options.lookupRule = "default";
		}
		if(typeof options.lookupRule === "string") {
			options.lookupRule = expression.lookupRules[options.lookupRule];
		}
		if(!options.methodRule) {
			options.methodRule = "default";
		}
		if(typeof options.methodRule === "string") {
			options.methodRule = expression.methodRules[options.methodRule];
		}

		var expr = this.hydrateAst(ast, options, options.baseMethodType || "Helper");

		return expr;
	},
	hydrateAst: function(ast, options, methodType, isArg){
		var hashes;
		if(ast.type === "Lookup") {
			return new (options.lookupRule(ast, methodType, isArg))(ast.key, ast.root && this.hydrateAst(ast.root, options, methodType) );
		}
		else if(ast.type === "Literal") {
			return new Literal(ast.value);
		}
		else if(ast.type === "Arg") {
			return new Arg(this.hydrateAst(ast.children[0], options, methodType, isArg),{compute: true});
		}
		else if(ast.type === "Hash") {
			throw new Error("");
		}
		else if(ast.type === "Hashes") {
			hashes = {};
			each(ast.children, function(hash){
				hashes[hash.prop] = this.hydrateAst( hash.children[0], options, methodType, true );
			}, this);
			return new Hashes(hashes);
		}
		else if(ast.type === "Call" || ast.type === "Helper") {
			//get all arguments and hashes
			hashes = {};
			var args = [],
				children = ast.children,
				ExpressionType = options.methodRule(ast);
			if(children) {
				for(var i = 0 ; i <children.length; i++) {
					var child = children[i];
					if(child.type === "Hashes" && ast.type === "Helper" &&
						(ExpressionType !== Call)) {

						each(child.children, function(hash){
							hashes[hash.prop] = this.hydrateAst( hash.children[0], options, ast.type, true );
						}, this);

					} else {
						args.push( this.hydrateAst(child, options, ast.type, true) );
					}
				}
			}


			return new ExpressionType(this.hydrateAst(ast.method, options, ast.type),
																args, hashes);
		} else if (ast.type === "Bracket") {
			return new Bracket(
				this.hydrateAst(ast.children[0], options),
				ast.root ? this.hydrateAst(ast.root, options) : undefined
			);
		}
	},
	ast: function(expression){
		var tokens = this.tokenize(expression);
		return this.parseAst(tokens, {
			index: 0
		});
	},
	parseAst: function(tokens, cursor) {
		var stack = new Stack(),
			top,
			firstParent,
			lastToken;

		while(cursor.index < tokens.length) {
			var token = tokens[cursor.index],
				nextToken = tokens[cursor.index+1];

			cursor.index++;

			// Literal
			if(literalRegExp.test( token )) {
				convertToHelperIfTopIsLookup(stack);
				// only add to hash if there's not already a child.
				firstParent = stack.first(["Helper", "Call", "Hash", "Bracket"]);
				if(firstParent.type === "Hash" && (firstParent.children && firstParent.children.length > 0)) {
					stack.addTo(["Helper", "Call", "Bracket"], {type: "Literal", value: utils.jsonParse( token )});
				} else if(firstParent.type === "Bracket" && (firstParent.children && firstParent.children.length > 0)) {
					stack.addTo(["Helper", "Call", "Hash"], {type: "Literal", value: utils.jsonParse( token )});
				} else {
					stack.addTo(["Helper", "Call", "Hash", "Bracket"], {type: "Literal", value: utils.jsonParse( token )});
				}

			}
			// Hash
			else if(nextToken === "=") {
				//convertToHelperIfTopIsLookup(stack);
				top = stack.top();

				// If top is a Lookup, we might need to convert to a helper.
				if(top && top.type === "Lookup") {
					// Check if current Lookup is part of a Call, Helper, or Hash
					// If it happens to be first within a Call or Root, that means
					// this is helper syntax.
					firstParent = stack.firstParent(["Call","Helper","Hash"]);
					if(firstParent.type === "Call" || firstParent.type === "Root") {

						stack.popUntil(["Call"]);
						top = stack.top();
						stack.replaceTopAndPush({
							type: "Helper",
							method: top.type === "Root" ? last(top.children) : top
						});

					}
				}
				firstParent = stack.firstParent(["Call","Helper","Hashes"]);
				// makes sure we are adding to Hashes if there already is one
				// otherwise we create one.
				var hash = {type: "Hash", prop: token};
				if(firstParent.type === "Hashes") {
					stack.addToAndPush(["Hashes"], hash);
				} else {
					stack.addToAndPush(["Helper", "Call"], {
						type: "Hashes",
						children: [hash]
					});
					stack.push(hash);
				}
				cursor.index++;

			}
			// Lookup
			else if(keyRegExp.test(token)) {
				lastToken = stack.topLastChild();
				firstParent = stack.first(["Helper", "Call", "Hash", "Bracket"]);

				// if we had `foo().bar`, we need to change to a Lookup that looks up from lastToken.
				if(lastToken && (lastToken.type === "Call" || lastToken.type === "Bracket" ) && isAddingToExpression(token)) {
					stack.replaceTopLastChildAndPush({
						type: "Lookup",
						root: lastToken,
						key: token.slice(1) // remove leading `.`
					});
				}
				else if(firstParent.type === 'Bracket') {
					// a Bracket expression without children means we have
					// parsed `foo[` of an expression like `foo[bar]`
					// so we know to add the Lookup as a child of the Bracket expression
					if (!(firstParent.children && firstParent.children.length > 0)) {
						stack.addToAndPush(["Bracket"], {type: "Lookup", key: token});
					} else {
						// check if we are adding to a helper like `eq foo[bar] baz`
						// but not at the `.baz` of `eq foo[bar].baz xyz`
						if(stack.first(["Helper", "Call", "Hash", "Arg"]).type === 'Helper' && token[0] !== '.') {
							stack.addToAndPush(["Helper"], {type: "Lookup", key: token});
						} else {
							// otherwise, handle the `.baz` in expressions like `foo[bar].baz`
							stack.replaceTopAndPush({
								type: "Lookup",
								key: token.slice(1),
								root: firstParent
							});
						}
					}
				}
				else {
					// if two scopes, that means a helper
					convertToHelperIfTopIsLookup(stack);

					stack.addToAndPush(["Helper", "Call", "Hash", "Arg", "Bracket"], {type: "Lookup", key: token});
				}

			}
			// Arg
			else if(token === "~") {
				convertToHelperIfTopIsLookup(stack);
				stack.addToAndPush(["Helper", "Call", "Hash"], {type: "Arg", key: token});
			}
			// Call
			// foo[bar()]
			else if(token === "(") {
				top = stack.top();
				if(top.type === "Lookup") {
					stack.replaceTopAndPush({
						type: "Call",
						method: convertToAtLookup(top)
					});
				} else {
					throw new Error("Unable to understand expression "+tokens.join(''));
				}
			}
			// End Call
			else if(token === ")") {
				stack.popTo(["Call"]);
			}
			// End Call argument
			else if(token === ",") {
				stack.popUntil(["Call"]);
			}
			// Bracket
			else if(token === "[") {
				top = stack.top();
				lastToken = stack.topLastChild();

				if (lastToken && (lastToken.type === "Call" || lastToken.type === "Bracket"  )  ) {
					stack.replaceTopAndPush({type: "Bracket", root: lastToken});
				} else if (top.type === "Lookup" || top.type === "Bracket") {
					stack.replaceTopAndPush({type: "Bracket", root: top});
				} else if (top.type === "Call") {
					stack.addToAndPush(["Call"], { type: "Bracket" });
				} else if (top === " ") {
					stack.popUntil(["Lookup"]);
					convertToHelperIfTopIsLookup(stack);
					stack.addToAndPush(["Helper", "Call", "Hash"], {type: "Bracket"});
				} else {
					stack.replaceTopAndPush({type: "Bracket"});
				}
			}
			// End Bracket
			else if(token === "]") {
				stack.pop();
			}
			else if(token === " ") {
				stack.push(token);
			}
		}
		return stack.root.children[0];
	}
};

module.exports = expression;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var mustacheCore = __webpack_require__(28);
var parser = __webpack_require__(54);
// require('can/view/import/import');

module.exports = function(source){

	var template = mustacheCore.cleanLineEndings(source);
	var imports = [],
		dynamicImports = [],
		ases = {},
		inImport = false,
		inFrom = false,
		inAs = false,
		isUnary = false,
		currentAs = "",
		currentFrom = "";

	var intermediate = parser(template, {
		start: function( tagName, unary ){
			isUnary = unary;
			if(tagName === "can-import") {
				inImport = true;
			} else if(inImport) {
				inImport = false;
			}
		},
		attrStart: function( attrName ){
			if(attrName === "from") {
				inFrom = true;
			} else if(attrName === "as" || attrName === "export-as") {
				inAs = true;
			}
		},
		attrEnd: function( attrName ){
			if(attrName === "from") {
				inFrom = false;
			} else if(attrName === "as" || attrName === "export-as") {
				inAs = false;
			}
		},
		attrValue: function( value ){
			if(inFrom && inImport) {
				imports.push(value);
				if(!isUnary) {
					dynamicImports.push(value);
				}
				currentFrom = value;
			} else if(inAs && inImport) {
				currentAs = value;
			}
		},
		end: function(tagName){
			if(tagName === "can-import") {
				// Set the as value to the from
				if(currentAs) {
					ases[currentAs] = currentFrom;
					currentAs = "";
				}
			}
		},
		close: function(tagName){
			if(tagName === "can-import") {
				imports.pop();
			}
		}
	}, true);

	return {
		intermediate: intermediate,
		imports: imports,
		dynamicImports: dynamicImports,
		ases: ases,
		exports: ases
	};
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isEmptyObject = __webpack_require__(22);

var data = {};
var expando = "can" + new Date();
var uuid = 0;

// set data for an element
// returns true if this is the first data for this element
// so that caller can track number of elements with data set
var setData = function(name, value) {
	var id = this[expando] || (this[expando] = ++uuid),
		store = data[id],
		newStore = false;

	if (!data[id]) {
		newStore = true;
		store = data[id] = {};
	}

	if (name !== undefined) {
		store[name] = value;
	}
	return newStore;
};

// delete this node's `data`
// returns true if the node was deleted.
var deleteNode = function() {
	var id = this[expando];
	var nodeDeleted = false;
	if(id && data[id]) {
		nodeDeleted = true;
		delete data[id];
	}
	return nodeDeleted;
};

/*
 * Core of domData that does not depend on mutationDocument
 * This is separated in order to prevent circular dependencies
 */
module.exports = {
	_data: data,

	getCid: function() {
		return this[expando];
	},

	cid: function(){
		return this[expando] || (this[expando] = ++uuid);
	},

	expando: expando,

	get: function(key) {
		var id = this[expando],
			store = id && data[id];
		return key === undefined ? store || setData(this) : store && store[key];
	},

	set: setData,

	clean: function(prop) {
		var id = this[expando];
		var itemData = data[id];
		if (itemData && itemData[prop]) {
			delete itemData[prop];
		}
		if(isEmptyObject(itemData)) {
			deleteNode.call(this);
		}
	},

	delete: deleteNode
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var makeMutationEvent = __webpack_require__(63);

/**
 * @module {events} can-util/dom/events/removed/removed removed
 * @parent can-util/dom/events/events
 *  
 * This event fires when the bound element is detached or destroyed.
 *
 * ```js
 * var events = require("can-util/dom/events/events");
 * require("can-util/dom/events/removed/removed");
 *
 * var foo = document.createElement("div");
 * document.body.appendChild(foo);
 *
 * var log = function() { console.log("removed event fired"); }
 * events.addEventListener.call(foo, "removed", log);
 *
 * document.body.removeChild(foo); // remove event fired
 */
makeMutationEvent("removed", "removedNodes");


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getDocument = __webpack_require__(5);
module.exports = function(el) {
	return (el.ownerDocument || el) === getDocument();
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GLOBAL = __webpack_require__(13);
var each = __webpack_require__(1);
var getCID = __webpack_require__(37);

var CIDMap;

if(GLOBAL().Map) {
	CIDMap = GLOBAL().Map;
} else {
	var CIDMap = function(){
		this.values = {};
	};
	CIDMap.prototype.set = function(key, value){
		this.values[getCID(key)] = {key: key, value: value};
	};
	CIDMap.prototype["delete"] = function(key){
		var has = getCID(key) in this.values;
		if(has) {
			delete this.values[getCID(key)];
		}
		return has;
	};
	CIDMap.prototype.forEach = function(cb, thisArg) {
		each(this.values, function(pair){
			return cb.call(thisArg || this, pair.value, pair.key, this);
		}, this);
	};
	CIDMap.prototype.has = function(key) {
		return getCID(key) in this.values;
	};
	CIDMap.prototype.get = function(key) {
		var obj = this.values[getCID(key)];
		return obj && obj.value;
	};
	CIDMap.prototype.clear = function(key) {
		return this.values = {};
	};
	Object.defineProperty(CIDMap.prototype,"size",{
		get: function(){
			var size = 0;
			each(this.values, function(){
				size++;
			});
			return size;
		}
	});
}

module.exports = CIDMap;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var slice = [].slice;
// a b c
// a b c d
// [[2,0, d]]

var defaultIdentity = function(a, b){ return a === b; };

/**
 * @module {function} can-util/js/diff/diff diff
 * @parent can-util/js
 * @signature `diff( oldList, newList, [identity] )`
 * 
 * @param  {ArrayLike} oldList the array to diff from
 * @param  {ArrayLike} newList the array to diff to
 * @param  {function} identity an optional identity function for comparing elements
 * @return {Array}     a list of Patch objects representing the differences
 *
 * Returns the difference between two ArrayLike objects (that have nonnegative
 * integer keys and the `length` property) as an array of patch objects.
 * 
 * A patch object returned by this function has the following properties:
 * - **index**:  the index of newList where the patch begins
 * - **deleteCount**: the number of items deleted from that index in newList
 * - **insert**: an Array of items newly inserted at that index in newList
 *
 * ```js
 * var diff = require("can-util/js/diff/diff");
 *
 * console.log(diff([1], [1, 2])); // -> [{index: 1, deleteCount: 0, insert: [2]}]
 * console.log(diff([1, 2], [1])); // -> [{index: 1, deleteCount: 1, insert: []}]
 * 
 * // with an optional identity function:
 * diff(
 *     [{id:1},{id:2}],
 *     [{id:1},{id:3}],
 *     (a,b) => a.id === b.id
 * ); // -> [{index: 1, deleteCount: 1, insert: [{id:3}]}]
 * ```
 */

// TODO: update for a better type reference. E.g.:
//    @typdef {function(*,*)} can-util/diff/diff/typedefs.identity identify(a, b)
//
//    @param {*} a This is something.
//    @param {can-util/diff/diff/typedefs.identity} identity(a, b)
//    @option {*} a

module.exports = exports = function(oldList, newList, identity){
	identity = identity || defaultIdentity;
	
	var oldIndex = 0,
		newIndex =  0,
		oldLength = oldList.length,
		newLength = newList.length,
		patches = [];

	while(oldIndex < oldLength && newIndex < newLength) {
		var oldItem = oldList[oldIndex],
			newItem = newList[newIndex];

		if( identity( oldItem, newItem ) ) {
			oldIndex++;
			newIndex++;
			continue;
		}
		// look for single insert, does the next newList item equal the current oldList.
		// 1 2 3
		// 1 2 4 3
		if(  newIndex+1 < newLength && identity( oldItem, newList[newIndex+1] ) ) {
			patches.push({index: newIndex, deleteCount: 0, insert: [ newList[newIndex] ]});
			oldIndex++;
			newIndex += 2;
			continue;
		}
		// look for single removal, does the next item in the oldList equal the current newList item.
		// 1 2 3
		// 1 3
		else if( oldIndex+1 < oldLength  && identity( oldList[oldIndex+1], newItem ) ) {
			patches.push({index: newIndex, deleteCount: 1, insert: []});
			oldIndex += 2;
			newIndex++;
			continue;
		}
		// just clean up the rest and exit
		// 1 2 3
		// 1 2 5 6 7
		else {
			patches.push(
				{index: newIndex,
				 deleteCount: oldLength-oldIndex,
				 insert: slice.call(newList, newIndex) } );
			return patches;
		}
	}
	if( (newIndex === newLength) && (oldIndex === oldLength) ) {
		return patches;
	}
	// a b
	// a b c d e
	patches.push(
				{index: newIndex,
				 deleteCount: oldLength-oldIndex,
				 insert: slice.call(newList, newIndex) } );

	return patches;
};

// a b c
// a d e b c


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isContainer = __webpack_require__(65);

/**
 * @module {function} can-util/js/get/get get
 * @parent can-util/js
 *
 * @signature `get(obj, path)`
 * @param  {Object} obj the object to use as the root for property based navigation
 * @param  {String} path a String of dot-separated keys, representing a path of properties
 * @return {*}       the value at the property path
 *
 * A *path* is a dot-delimited sequence of zero or more property names, such that "foo.bar" means "the property
 * 'bar' of the object at the property 'foo' of the root."  An empty path returns the object passed.
 *
 * ```js
 * var get = require("can-util/js/get/get");
 * console.log(get({a: {b: {c: "foo"}}}, "a.b.c")); // -> "foo"
 * console.log(get({a: {}}, "a.b.c")); // -> undefined
 * console.log(get([{a: {}}, {a: {b: "bar"}}], "a.b")); // -> "bar"
 * ```
 */
function get(obj, name) {
    // The parts of the name we are looking up
    // `['App','Models','Recipe']`
    var parts = typeof name !== 'undefined' ? (name + '').replace(/\[/g,'.')
    		.replace(/]/g,'').split('.') : [],
        length = parts.length,
        current, i, container;

    if (!length) {
        return obj;
    }

    current = obj;

    // Walk current to the 2nd to last object or until there
    // is not a container.
    for (i = 0; i < length && isContainer(current); i++) {
        container = current;
        current = container[parts[i]];
    }

    return current;
}

module.exports = get;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(13)();

/**
 * @module can-util/js/set-immediate/set-immediate set-immediate
 * @parent can-util/js
 * @signature `setImmediate(function())`
 * @param  {Function} cb
 *
 * Polyfill for setImmediate() if it doesn't exist in the global context
 */
module.exports = global.setImmediate || function (cb) {
	return setTimeout(cb, 0);
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

/* jshint maxdepth:7,node:true, latedef:false */
var namespace = __webpack_require__(2),
	dev = __webpack_require__(6);

function each(items, callback){
	for ( var i = 0; i < items.length; i++ ) {
		callback(items[i], i);
	}
}

function makeMap(str){
	var obj = {}, items = str.split(",");
	each(items, function(name){
		obj[name] = true;
	});
	return obj;
}

function handleIntermediate(intermediate, handler){
	for(var i = 0, len = intermediate.length; i < len; i++) {
		var item = intermediate[i];
		handler[item.tokenType].apply(handler, item.args);
	}
	return intermediate;
}

var alphaNumeric = "A-Za-z0-9",
	alphaNumericHU = "-:_"+alphaNumeric,
	camelCase = /([a-z])([A-Z])/g,
	defaultMagicStart = "{{",
	endTag = new RegExp("^<\\/(["+alphaNumericHU+"]+)[^>]*>"),
	defaultMagicMatch = new RegExp("\\{\\{(![\\s\\S]*?!|[\\s\\S]*?)\\}\\}\\}?","g"),
	space = /\s/,
	spacesRegex = /\s/g,
	alphaRegex = new RegExp('['+ alphaNumeric + ']'),
	forwardSlashRegex = /\//g;

// Empty Elements - HTML 5
var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed");

// Attributes for which the case matters - shouldn’t be lowercased.
var caseMattersAttributes = makeMap("allowReorder,attributeName,attributeType,autoReverse,baseFrequency,baseProfile,calcMode,clipPathUnits,contentScriptType,contentStyleType,diffuseConstant,edgeMode,externalResourcesRequired,filterRes,filterUnits,glyphRef,gradientTransform,gradientUnits,kernelMatrix,kernelUnitLength,keyPoints,keySplines,keyTimes,lengthAdjust,limitingConeAngle,markerHeight,markerUnits,markerWidth,maskContentUnits,maskUnits,patternContentUnits,patternTransform,patternUnits,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,repeatCount,repeatDur,requiredExtensions,requiredFeatures,specularConstant,specularExponent,spreadMethod,startOffset,stdDeviation,stitchTiles,surfaceScale,systemLanguage,tableValues,textLength,viewBox,viewTarget,xChannelSelector,yChannelSelector");

// Elements for which tag case matters - shouldn't be lowercased.
var caseMattersElements = makeMap("altGlyph,altGlyphDef,altGlyphItem,animateColor,animateMotion,animateTransform,clipPath,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,foreignObject,glyphRef,linearGradient,radialGradient,textPath");

// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

// Special Elements (can contain anything)
var special = makeMap("script");

// Callback names on `handler`.
var tokenTypes = "start,end,close,attrStart,attrEnd,attrValue,chars,comment,special,done".split(",");

//maps end characters to start characters
var startOppositesMap = {"{": "}", "(":")"};

var fn = function(){};

var HTMLParser = function (html, handler, returnIntermediate) {
	if(typeof html === "object") {
		return handleIntermediate(html, handler);
	}
	var intermediate = [];
	handler = handler || {};
	if(returnIntermediate) {
		// overwrite handlers so they add to intermediate
		each(tokenTypes, function(name){
			var callback = handler[name] || fn;
			handler[name] = function(){
				if( callback.apply(this, arguments) !== false ) {
					intermediate.push({tokenType: name, args: [].slice.call(arguments, 0) });
				}
			};
		});
	}
	var magicMatch = handler.magicMatch || defaultMagicMatch,
		magicStart = handler.magicStart || defaultMagicStart;

	function parseStartTag(tag, tagName, rest, unary) {
		tagName = caseMattersElements[tagName] ? tagName : tagName.toLowerCase();

		if (closeSelf[tagName] && stack.last() === tagName) {
			parseEndTag("", tagName);
		}

		unary = empty[tagName] || !!unary;

		handler.start(tagName, unary);

		if (!unary) {
			stack.push(tagName);
		}
		// find attribute or special
		HTMLParser.parseAttrs(rest, handler);


		handler.end(tagName,unary);

	}

	function parseEndTag(tag, tagName) {
		// If no tag name is provided, clean shop
		var pos;
		if (!tagName) {
			pos = 0;
		}
		// Find the closest opened tag of the same type
		else {
			tagName = caseMattersElements[tagName] ? tagName : tagName.toLowerCase();
			for (pos = stack.length - 1; pos >= 0; pos--) {
				if (stack[pos] === tagName) {
					break;
				}
			}
		}

		//!steal-remove-start
		if (typeof tag === 'undefined') {
			if (stack.length > 0) {
				dev.warn("expected closing tag </" + stack[pos] + ">");
			}
		} else if (pos < 0 || pos !== stack.length - 1) {
			if (stack.length > 0) {
				dev.warn("unexpected closing tag " + tag + " expected </" + stack[stack.length - 1] + ">");
			} else {
				dev.warn("unexpected closing tag " + tag);
			}
		}
		//!steal-remove-end

		if (pos >= 0) {
			// Close all the open elements, up the stack
			for (var i = stack.length - 1; i >= pos; i--) {
				if (handler.close) {
					handler.close(stack[i]);
				}
			}

			// Remove the open elements from the stack
			stack.length = pos;
		}
	}

	function parseMustache(mustache, inside){
		if(handler.special){
			handler.special(inside);
		}
	}
	var callChars = function(){
		if(charsText) {
			if(handler.chars) {
				handler.chars(charsText);
			}
		}
		charsText = "";
	};

	var index,
		chars,
		match,
		stack = [],
		last = html,
		// an accumulating text for the next .chars callback
		charsText = "";
	stack.last = function () {
		return this[this.length - 1];
	};

	while (html) {

		chars = true;

		// Make sure we're not in a script or style element
		if (!stack.last() || !special[stack.last()]) {

			// Comment
			if (html.indexOf("<!--") === 0) {
				index = html.indexOf("-->");

				if (index >= 0) {
					callChars();
					if (handler.comment) {
						handler.comment(html.substring(4, index));
					}
					html = html.substring(index + 3);
					chars = false;
				}

				// end tag
			} else if (html.indexOf("</") === 0) {
				match = html.match(endTag);

				if (match) {
					callChars();
					html = html.substring(match[0].length);
					match[0].replace(endTag, parseEndTag);
					chars = false;
				}

				// start tag
			} else if (html.indexOf("<") === 0) {
				var res = HTMLParser.searchStartTag(html);

				if(res) {
					callChars();
					html = res.html;
					parseStartTag.apply(null, res.match);
					chars = false;
				}

			} else if (html.indexOf(magicStart) === 0 ) {
				match = html.match(magicMatch);

				if (match) {
					callChars();
					html = html.substring(match[0].length);
					match[0].replace(magicMatch, parseMustache);
				}
			}

			if (chars) {
				index = findBreak(html, magicStart);
				if(index === 0 && html === last) {
					charsText += html.charAt(0);
					html = html.substr(1);
					index = findBreak(html, magicStart);
				}

				var text = index < 0 ? html : html.substring(0, index);
				html = index < 0 ? "" : html.substring(index);

				if (text) {
					charsText += text;
				}

			}

		} else {
			html = html.replace(new RegExp("([\\s\\S]*?)<\/" + stack.last() + "[^>]*>"), function (all, text) {
				text = text.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2");
				if (handler.chars) {
					handler.chars(text);
				}
				return "";
			});

			parseEndTag("", stack.last());
		}

		if (html === last) {
			throw new Error("Parse Error: " + html);
		}

		last = html;
	}
	callChars();
	// Clean up any remaining tags
	parseEndTag();


	handler.done();
	return intermediate;
};

var callAttrStart = function(state, curIndex, handler, rest){
	var attrName = rest.substring(typeof state.nameStart === "number" ? state.nameStart : curIndex, curIndex),
		newAttrName = attrName,
		oldAttrName = attrName;
	if (!caseMattersAttributes[attrName] && camelCase.test(attrName)) {
		newAttrName = attrName.replace(camelCase, camelCaseToSpinalCase);
		//!steal-remove-start
		dev.warn("can-view-parser: Found attribute with name: ", oldAttrName, ". Converting to: ", newAttrName);
		//!steal-remove-end
	}

	//encode spaces
	newAttrName = newAttrName.replace(spacesRegex, "\\s");

	//encode forward slashes
	newAttrName = newAttrName.replace(forwardSlashRegex, "\\f");

	state.attrStart = newAttrName;
	handler.attrStart(state.attrStart);
	state.inName = false;
};

var callAttrEnd = function(state, curIndex, handler, rest){
	if(state.valueStart !== undefined && state.valueStart < curIndex) {
		handler.attrValue(rest.substring(state.valueStart, curIndex));
	}
	// if this never got to be inValue, like `DISABLED` then send a attrValue
	else if(!state.inValue){
		//handler.attrValue(state.attrStart);
	}
	handler.attrEnd(state.attrStart);
	state.attrStart = undefined;
	state.valueStart = undefined;
	state.inValue = false;
	state.inName = false;
	state.lookingForEq = false;
	state.inQuote = false;
	state.lookingForName = true;
};

var findBreak = function(str, magicStart) {
	var magicLength = magicStart.length;
	for(var i = 0, len = str.length; i < len; i++) {
		if(str[i] === "<" || str.substr(i, magicLength) === magicStart) {
			return i;
		}
	}
	return -1;
};

var camelCaseToSpinalCase = function (match, lowerCaseChar, upperCaseChar) {
	return lowerCaseChar + "-" + upperCaseChar.toLowerCase();
};

HTMLParser.parseAttrs = function(rest, handler){
	if(!rest) {
		return;
	}

	var magicMatch = handler.magicMatch || defaultMagicMatch,
		magicStart = handler.magicStart || defaultMagicStart;
  
	var i = 0;
	var curIndex;
	var state = {
		inName: false,
		nameStart: undefined,
		inValue: false,
		valueStart: undefined,
		inQuote: false,
		attrStart: undefined,
		lookingForName: true,
		lookingForValue: false,
		lookingForEq : false
	};

	while(i < rest.length) {
		curIndex = i;
		var cur = rest.charAt(i);
		i++;

		if(magicStart === rest.substr(curIndex, magicStart.length) ) {
			if(state.inValue && curIndex > state.valueStart) {
				handler.attrValue(rest.substring(state.valueStart, curIndex));
			}
			// `{{#foo}}DISABLED{{/foo}}`
			else if(state.inName && state.nameStart < curIndex) {
				callAttrStart(state, curIndex, handler, rest);
				callAttrEnd(state, curIndex, handler, rest);
			}
			// foo={{bar}}
			else if(state.lookingForValue){
				state.inValue = true;
			}
			// a {{bar}}
			else if(state.lookingForEq && state.attrStart) {
				callAttrEnd(state, curIndex, handler, rest);
			}
			magicMatch.lastIndex = curIndex;
			var match = magicMatch.exec(rest);
			if(match) {
				handler.special(match[1]);
				// i is already incremented
				i = curIndex + (match[0].length);
				if(state.inValue) {
					state.valueStart = curIndex+match[0].length;
				}
			}
		}
		else if(state.inValue) {
			if(state.inQuote) {
				if(cur === state.inQuote) {
					callAttrEnd(state, curIndex, handler, rest);
				}
			}
			else if(space.test(cur)) {
				callAttrEnd(state, curIndex, handler, rest);
			}
		}
		// if we hit an = outside a value
		else if(cur === "=" && (state.lookingForEq || state.lookingForName || state.inName)) {

			// if we haven't yet started this attribute `{{}}=foo` case:
			if(!state.attrStart) {
				callAttrStart(state, curIndex, handler, rest);
			}
			state.lookingForValue = true;
			state.lookingForEq = false;
			state.lookingForName = false;
		}
		
		// if we are currently in a name:
		//  when the name starts with `{` or `(`
		//  it isn't finished until the matching end character is found
		//  otherwise, a space finishes the name
		else if(state.inName) {
			var started = rest[ state.nameStart ],
					otherStart, otherOpposite;
			if(startOppositesMap[started] === cur) {
				//handle mismatched brackets: `{(})` or `({)}`
				otherStart = started === "{" ? "(" : "{";
				otherOpposite = startOppositesMap[otherStart];
				
				if(rest[curIndex+1] === otherOpposite){
					callAttrStart(state, curIndex+2, handler, rest);
					i++;
				}else{
					callAttrStart(state, curIndex+1, handler, rest);
				}

				state.lookingForEq = true;
			} 
			else if(space.test(cur) && started !== "{" && started !== "(") {
					callAttrStart(state, curIndex, handler, rest);
					state.lookingForEq = true;
			}
		}
		else if(state.lookingForName) {
			if(!space.test(cur)) {
				// might have just started a name, we need to close it
				if(state.attrStart) {
					callAttrEnd(state, curIndex, handler, rest);
				}
				state.nameStart = curIndex;
				state.inName = true;
			}
		}
		else if(state.lookingForValue) {
			if(!space.test(cur)) {
				state.lookingForValue = false;
				state.inValue = true;
				if(cur === "'" || cur === '"') {
					state.inQuote = cur;
					state.valueStart = curIndex+1;
				} else {
					state.valueStart = curIndex;
				}
				// if we are looking for a value
				// at the end of the loop we need callAttrEnd
			} else if (i === rest.length){
				callAttrEnd(state, curIndex, handler, rest);
			}
		}
	}

	if(state.inName) {
		callAttrStart(state, curIndex+1, handler, rest);
		callAttrEnd(state, curIndex+1, handler, rest);
	} else if(state.lookingForEq || state.lookingForValue || state.inValue) {
		callAttrEnd(state, curIndex+1, handler, rest);
	}
	magicMatch.lastIndex = 0;
};

HTMLParser.searchStartTag = function (html) {
	var closingIndex = html.indexOf('>');
	// if there is no closing bracket
	// <input class=
	// or if the tagName does not start with alphaNumer character
	// <_iaois>
	// it is not a startTag
	if(closingIndex === -1 || !(alphaRegex.test(html[1]))){
		return null;
	}

	var tagName, tagContent, match, rest = '', unary = '';
	var startTag = html.substring(0, closingIndex + 1);
	var isUnary = startTag[startTag.length-2] === '/';
	var spaceIndex = startTag.search(space);

	if(isUnary){
		unary = '/';
		tagContent = startTag.substring(1, startTag.length-2).trim();
	} else {
		tagContent = startTag.substring(1, startTag.length-1).trim();
	}

	if(spaceIndex === -1){
		tagName = tagContent;
	} else {
		//spaceIndex needs to shift one to the left
		spaceIndex--;
		tagName = tagContent.substring(0, spaceIndex);
		rest = tagContent.substring(spaceIndex);
	}

	match = [startTag, tagName, rest, unary];

	return {
		match: match,
		html: html.substring(startTag.length)
	};


};

module.exports = namespace.HTMLParser = HTMLParser;


/***/ }),
/* 55 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
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

process.nextTick = function (fun) {
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
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {


var assign = __webpack_require__(3);
var CID = __webpack_require__(14);
var define = __webpack_require__(43);
var canBatch = __webpack_require__(11);
var canEvent = __webpack_require__(4);


var hasMethod = function(obj, method){
	return obj && typeof obj === "object" && (method in obj);
};

var defineHelpers = {
	extendedSetup: function(props){
		assign(this, props);
	},
	toObject: function(map, props, where, Type){
		if(props instanceof Type) {
			props.each(function(value, prop){
				where[prop] = value;
			});
			return where;
		} else {
			return props;
		}
	},
	removeSpecialKeys: function(map) {
		if(map) {
			["_data", "constructor", "_cid", "__bindEvents"].forEach(function(key) {
				delete map[key];
			});
		}
		return map;
	},
	defineExpando: function(map, prop, value) {
		// first check if it's already a constructor define
		var constructorDefines = map._define.definitions;
		if(constructorDefines && constructorDefines[prop]) {
			return;
		}
		// next if it's already on this instances
		var instanceDefines = map._instanceDefinitions;
		if(!instanceDefines) {
			instanceDefines = map._instanceDefinitions = {};
		}
		if(!instanceDefines[prop]) {
			var defaultDefinition = map._define.defaultDefinition || {type: define.types.observable};
			define.property(map, prop, defaultDefinition, {},{});
			// possibly convert value to List or DefineMap
			map._data[prop] = defaultDefinition.type ? defaultDefinition.type(value) : define.types.observable(value);
			instanceDefines[prop] = defaultDefinition;
			canBatch.start();
			canEvent.dispatch.call(map, {
				type: "__keys",
				target: map
			});
			if(map._data[prop] !== undefined) {
				canEvent.dispatch.call(map, {
					type: prop,
					target: map
				},[map._data[prop], undefined]);
			}
			canBatch.stop();
			return true;
		}
	},
	// ## getValue
	// If `val` is an observable, calls `how` on it; otherwise
	// returns the value of `val`.
	getValue: function(map, name, val, how){
		// check if there's a serialize
		if(how === "serialize") {
			var constructorDefinitions = map._define.definitions;
			var propDef = constructorDefinitions[name];
			if(propDef && typeof propDef.serialize === "function") {
				return propDef.serialize.call(map, val, name);
			}
			var defaultDefinition = map._define.defaultDefinition;
			if(defaultDefinition && typeof defaultDefinition.serialize === "function") {
				return defaultDefinition.serialize.call(map, val, name);
			}
		}

		if( hasMethod(val, how) ) {
			return val[how]();
		} else {
			return val;
		}
	},
	// ### mapHelpers.serialize
	// Serializes a Map or Map.List by recursively calling the `how`
	// method on any child objects. This is able to handle
	// cycles.
	// `map` - the map or list to serialize.
	// `how` - the method to call recursively.
	// `where` - the target Object or Array that becomes the serialized result.
	serialize: (function(){

		// A temporary mapping of map cids to the serialized result.
		var serializeMap = null;

		return function (map, how, where) {
			var cid = CID(map),
				firstSerialize = false;

			// If there isn't an existing serializeMap, this means
			// this is the initial non-recursive call to this function.
			// We mark this  as the first call, and then setup the serializeMap.
			// The serialize map is further devided into `how` because
			// `.serialize` might call `.attr`.
			if(!serializeMap) {
				firstSerialize = true;
				serializeMap = {
					get: {},
					serialize: {}
				};
			}

			serializeMap[how][cid] = where;
			// Go through each property.
			map.each(function (val, name) {
				// If the value is an `object`, and has an `attr` or `serialize` function.

				var result,
					isObservable =   hasMethod(val, how),
					serialized = isObservable && serializeMap[how][CID(val)];

				if( serialized ) {
					result = serialized;
				} else {
					// special attr or serializer
					result = defineHelpers.getValue(map, name, val, how);
				}
				// this is probably removable
				if(result !== undefined) {
					where[name] = result;
				}


			});

			if(firstSerialize) {
				serializeMap = null;
			}
			return where;
		};
	})()
};
module.exports = defineHelpers;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var Construct = __webpack_require__(27);
var define = __webpack_require__(43);
var make = define.make;
var canEvent = __webpack_require__(4);
var canBatch = __webpack_require__(11);
var Observation = __webpack_require__(7);
var canLog = __webpack_require__(18);

var defineHelpers = __webpack_require__(56);

var assign = __webpack_require__(3);
var diff = __webpack_require__(51);
var each = __webpack_require__(1);
var isArray = __webpack_require__(31);
var makeArray = __webpack_require__(12);
var types = __webpack_require__(0);
var ns = __webpack_require__(2);

var splice = [].splice;
var runningNative = false;

var identity = function(x) {
	return x;
};

var makeFilterCallback = function(props) {
	return function(item) {
		for (var prop in props) {
			if (item[prop] !== props[prop]) {
				return false;
			}
		}
		return true;
	};
};
/** @add can-define/list/list */
var DefineList = Construct.extend("DefineList",
	/** @static */
	{
		setup: function(base) {
			if (DefineList) {

				var prototype = this.prototype;
				var result = define(prototype, prototype, base.prototype._define);
				var itemsDefinition = result.definitions["#"] || result.defaultDefinition;

				if (itemsDefinition) {
					if (itemsDefinition.Type) {
						this.prototype.__type = make.set.Type("*", itemsDefinition.Type, identity);
					} else if (itemsDefinition.type) {
						this.prototype.__type = make.set.type("*", itemsDefinition.type, identity);
					}
				}
			}
		}
	},
	/** @prototype */
	{
		// setup for only dynamic DefineMap instances
		setup: function(items) {
			if (!this._define) {
				Object.defineProperty(this, "_define", {
					enumerable: false,
					value: {
						definitions: {}
					}
				});
				Object.defineProperty(this, "_data", {
					enumerable: false,
					value: {}
				});
			}
			define.setup.call(this, {}, false);
			this._length = 0;
			if (items) {
				this.splice.apply(this, [ 0, 0 ].concat(defineHelpers.toObject(this, items, [], DefineList)));
			}
		},
		__type: define.types.observable,
		_triggerChange: function(attr, how, newVal, oldVal) {

			var index = +attr;
			// `batchTrigger` direct add and remove events...

			// Make sure this is not nested and not an expando
			if (!~("" + attr).indexOf('.') && !isNaN(index)) {
				var itemsDefinition = this._define.definitions["#"];

				if (how === 'add') {
					if (itemsDefinition && typeof itemsDefinition.added === 'function') {
						Observation.ignore(itemsDefinition.added).call(this, newVal, index);
					}
					canEvent.dispatch.call(this, how, [ newVal, index ]);
				} else if (how === 'remove') {
					if (itemsDefinition && typeof itemsDefinition.removed === 'function') {
						Observation.ignore(itemsDefinition.removed).call(this, oldVal, index);
					}
					canEvent.dispatch.call(this, how, [ oldVal, index ]);
				} else {
					canEvent.dispatch.call(this, how, [ newVal, index ]);
				}
			} else {
				canEvent.dispatch.call(this, {
					type: "" + attr,
					target: this
				}, [ newVal, oldVal ]);
			}

		},
		/**
		 * @function can-define/list/list.prototype.get get
		 * @parent can-define/list/list.prototype
		 *
		 * Gets an item or all items from a DefineList.
		 *
		 * @signature `list.get()`
		 *
		 * Returns the list converted into a plain JS array. Any items that also have a
		 * `get` method will have their `get` method called and the resulting value will be used as item value.
		 *
		 * This can be used to recursively convert a list instance to an Array of other plain JavaScript objects.
		 * Cycles are supported and only create one object.
		 *
		 * `get()` can still return other non-plain JS objects like Dates.
		 * Use [can-define/map/map.prototype.serialize] when a form proper for `JSON.stringify` is needed.
		 *
		 * ```js
		 * var list = new DefineList(["A","B"]);
		 * list.get() //-> ["A","B"]
		 * ```
		 *
		 *   @return {Array} A plain JavaScript `Array` that contains each item in the list.
		 *
		 * @signature `list.get(index)`
		 *
		 * Gets the item at `index`. `list.get(index)` should be used instead of
		 * `list[index]` if the list's items are going to be updated via [can-define/list/list.prototype.set list.set(index, value)]
		 * (as opposed to [can-define/list/list.prototype.splice] which is the better way).
		 *
		 * ```js
		 * var list = new DefineList(["A","B"]);
		 * list.get(1) //-> "B"
		 * ```
		 *
		 *   @param {Number} index A numeric position in the list.
		 *
		 *   @return {*} The value at index.
		 *
		 * @signature `list.get(prop)`
		 *
		 * Gets the property at `prop` if it might not have already been defined.
		 *
		 *
		 * ```js
		 * var list = new DefineList(["A","B"]);
		 * list.set("count",1000)
		 * list.get("count") //-> 1000
		 * ```
		 *
		 *   @param {String} prop A property on the list.
		 *
		 *   @return {*} The value at `prop`.
		 */
		get: function(index) {
			if (arguments.length) {
				Observation.add(this, "" + index);
				return this[index];
			} else {
				return defineHelpers.serialize(this, 'get', []);
			}
		},
		/**
		 * @function can-define/list/list.prototype.set set
		 * @parent can-define/list/list.prototype
		 *
		 * Sets an item or property or items or properties on a list.
		 *
		 * @signature `list.set(prop, value)`
		 *
		 * Sets the property at `prop`. This should be used when the property
		 * isn't already defined.
		 *
		 * ```js
		 * var list = new DefineList(["A","B"]);
		 * list.set("count",1000);
		 * list.get("count") //-> 1000;
		 * ```
		 *
		 *   @param {Number} prop A property name.
		 *   @param {*} value The value to add to the list.
		 *   @return {can-define/list/list} The list instance.
		 *
		 * @signature `list.set(newProps)`
		 *
		 * Updates the properties on the list with `newProps`.
		 *
		 * ```js
		 * var list = new DefineList(["A","B"]);
		 * list.set({count: 1000, skip: 2});
		 * list.get("count") //-> 1000
		 * ```
		 *
		 *   @param {Object} newProps An object of properties and values to set on the list.
		 *   @return {can-define/list/list} The list instance.
		 *
		 * @signature `list.set(index, value)`
		 *
		 * Sets the item at `index`.  Typically, [can-define/list/list::splice] should be used instead.
		 *
		 * ```js
		 * var list = new DefineList(["A","B"]);
		 * list.set(2,"C");
		 * ```
		 *
		 *   @param {Number} index A numeric position in the list.
		 *   @param {*} value The value to add to the list.
		 *   @return {can-define/list/list} The list instance.
		 *
		 * @signature `list.set(newItems [,replaceAll])`
		 *
		 * Replaces items in the list with `newItems`
		 *
		 * ```js
		 * var list = new DefineList(["A","B"]);
		 * list.set(["c"])        //-> DefineList["c","B"]
		 * list.set(["x"], true)  //-> DefineList["x"]
		 * ```
		 *
		 *   @param {Array} newItems Items used to replace existing items in the list.
		 *   @param {Boolean} [replaceAll] If true, will remove items at the end of the list.
		 *   @return {can-define/list/list} The list instance.
		 */
		set: function(prop, value) {
			// if we are setting a single value
			if (typeof prop !== "object") {
				// We want change events to notify using integers if we're
				// setting an integer index. Note that <float> % 1 !== 0;
				prop = isNaN(+prop) || (prop % 1) ? prop : +prop;
				if (typeof prop === "number") {
					// Check to see if we're doing a .attr() on an out of
					// bounds index property.
					if (typeof prop === "number" &&
						prop > this._length - 1) {
						var newArr = new Array((prop + 1) - this._length);
						newArr[newArr.length - 1] = value;
						this.push.apply(this, newArr);
						return newArr;
					}
					this.splice(prop, 1, value);
				} else {
					var defined = defineHelpers.defineExpando(this, prop, value);
					if (!defined) {
						this[prop] = value;
					}
				}

			}
			// otherwise we are setting multiple
			else {
				if (isArray(prop)) {
					if (value) {
						this.replace(prop);
					} else {
						this.splice.apply(this, [ 0, prop.length ].concat(prop));
					}
				} else {
					each(prop, function(value, prop) {
						this.set(prop, value);
					}, this);
				}
			}
			return this;
		},
		_items: function() {
			var arr = [];
			this._each(function(item) {
				arr.push(item);
			});
			return arr;
		},
		_each: function(callback) {
			for (var i = 0, len = this._length; i < len; i++) {
				callback(this[i], i);
			}
		},

		/**
		 * @function can-define/list/list.prototype.splice splice
		 * @parent can-define/list/list.prototype
		 * @description Insert and remove elements from a DefineList.
		 * @signature `list.splice(index[, howMany[, ...newItems]])`
		 *
		 * Removes `howMany` items at `index` and adds `newItems` in their place.
		 *
		 *
		 *
		 * @param {Number} index Where to start removing or inserting elements.
		 *
		 * @param {Number} [howMany] The number of elements to remove
		 * If _howMany_ is not provided, `splice` will remove all elements from `index` to the end of the DefineList.
		 *
		 * @param {*} newItems Items to insert into the DefineList
		 *
		 * @return {Array} The elements removed by `splice`.
		 *
		 * @body
		 *
		 * ## Use
		 *
		 * `splice` lets you remove elements from and insert elements into a DefineList.
		 *
		 * This example demonstrates how to do surgery on a list of numbers:
		 *
		 * ```
		 * var list = new DefineList([0, 1, 2, 3]);
		 *
		 * // starting at index 2, remove one element and insert 'Alice' and 'Bob':
		 * list.splice(2, 1, 'Alice', 'Bob');
		 * list.get(); // [0, 1, 'Alice', 'Bob', 3]
		 * ```
		 *
		 * ## Events
		 *
		 * `splice` causes the DefineList it's called on to emit
		 * _add_ events, _remove_ events, and _length_ events. If there are
		 * any elements to remove, a _remove_ event, and a
		 * _length_ event will be fired. If there are any elements to insert, a
		 * separate _add_ event, and a separate _length_ event
		 * will be fired.
		 *
		 */
		splice: function(index, howMany) {
			var args = makeArray(arguments),
				added = [],
				i, len, listIndex,
				allSame = args.length > 2;

			index = index || 0;

			// converting the arguments to the right type
			for (i = 0, len = args.length - 2; i < len; i++) {
				listIndex = i + 2;
				args[listIndex] = this.__type(args[listIndex], listIndex);
				added.push(args[listIndex]);

				// Now lets check if anything will change
				if (this[i + index] !== args[listIndex]) {
					allSame = false;
				}
			}

			// if nothing has changed, then return
			if (allSame && this._length <= added.length) {
				return added;
			}

			// default howMany if not provided
			if (howMany === undefined) {
				howMany = args[1] = this._length - index;
			}

			runningNative = true;
			var removed = splice.apply(this, args);
			runningNative = false;

			canBatch.start();
			if (howMany > 0) {
				// tears down bubbling
				this._triggerChange("" + index, "remove", undefined, removed);
			}
			if (args.length > 2) {
				this._triggerChange("" + index, "add", added, removed);
			}

			canEvent.dispatch.call(this, 'length', [ this._length ]);

			canBatch.stop();
			return removed;
		},

		/**
		 * @function can-define/list/list.prototype.serialize serialize
		 * @parent can-define/list/list.prototype
		 *
		 * Returns the a serialized version of this list.
		 *
		 * @signature `list.serialize()`
		 *
		 * Goes through each item in the list and gets its serialized
		 * value and returns them in a plain Array.
		 *
		 * Each items serialized value is the result of calling `.serialize()`
		 * on the item or if the item doesn't have a `serialize` method,
		 * the item itself.
		 *
		 * ```
		 * var list = new DefineList(["first", {foo: "bar"}]);
		 * var serializedList = list.serialize();
		 *
		 * serializedList //-> ["first", {foo: "bar"}]
		 * ```
		 *
		 *   @return {Array} An array with each item's serialied value.
		 */
		serialize: function() {
			return defineHelpers.serialize(this, 'serialize', []);
		}
	});

// Converts to an `array` of arguments.
var getArgs = function(args) {
	return args[0] && Array.isArray(args[0]) ?
		args[0] :
		makeArray(args);
};
// Create `push`, `pop`, `shift`, and `unshift`
each({
		/**
		 * @function can-define/list/list.prototype.push push
		 * @description Add elements to the end of a list.
		 * @signature `list.push(...elements)`
		 *
		 * `push` adds elements onto the end of a DefineList.
		 *
		 * ```
		 * var names = new DefineList(['Alice']);
		 * names.push('Bob', 'Eve');
		 * names //-> DefineList['Alice','Bob', 'Eve']
		 * ```
		 *
		 *   @param {*} elements the elements to add to the DefineList
		 *
		 *   @return {Number} the new length of the DefineList
		 *
		 * @body
		 *
		 * ## Use
		 *
		 * `push` adds elements onto the end of a DefineList here is an example:
		 *
		 * ```
		 * var list = new DefineList(['Alice']);
		 *
		 * list.push('Bob', 'Eve');
		 * list.get(); // ['Alice', 'Bob', 'Eve']
		 * ```
		 *
		 * If you have an array you want to concatenate to the end
		 * of the DefineList, you can use `apply`:
		 *
		 * ```
		 * var names = ['Bob', 'Eve'],
		 *     list = new DefineList(['Alice']);
		 *
		 * list.push.apply(list, names);
		 * list.get(); // ['Alice', 'Bob', 'Eve']
		 * ```
		 *
		 * ## Events
		 *
		 * `push` causes _add_, and _length_ events to be fired.
		 *
		 * ## See also
		 *
		 * `push` has a counterpart in [can-define/list/list::pop pop], or you may be
		 * looking for [can-define/list/list::unshift unshift] and its counterpart [can-define/list/list::shift shift].
		 */
	push: "length",
		/**
		 * @function can-define/list/list.prototype.unshift unshift
		 * @description Add items to the beginning of a DefineList.
		 * @signature `list.unshift(...items)`
		 *
		 * `unshift` adds items onto the beginning of a DefineList.
		 *
		 * ```
		 * var list = new DefineList(['Alice']);
		 *
		 * list.unshift('Bob', 'Eve');
		 * list; // DefineList['Bob', 'Eve', 'Alice']
		 * ```
		 *
		 * @param {*} items The items to add to the DefineList.
		 *
		 * @return {Number} The new length of the DefineList.
		 *
		 * @body
		 *
		 * ## Use
		 *
		 *
		 *
		 * If you have an array you want to concatenate to the beginning
		 * of the DefineList, you can use `apply`:
		 *
		 * ```
		 * var names = ['Bob', 'Eve'],
		 *     list = new DefineList(['Alice']);
		 *
		 * list.unshift.apply(list, names);
		 * list.get(); // ['Bob', 'Eve', 'Alice']
		 * ```
		 *
		 * ## Events
		 *
		 * `unshift` causes _add_ and _length_ events to be fired.
		 *
		 * ## See also
		 *
		 * `unshift` has a counterpart in [can-define/list/list::shift shift], or you may be
		 * looking for [can-define/list/list::push push] and its counterpart [can-define/list/list::pop pop].
		 */
	unshift: 0
},
	// Adds a method
	// `name` - The method name.
	// `where` - Where items in the `array` should be added.
	function(where, name) {
		var orig = [][name];
		DefineList.prototype[name] = function() {
			// Get the items being added.
			var args = [],
				// Where we are going to add items.
				len = where ? this._length : 0,
				i = arguments.length,
				res, val;

			// Go through and convert anything to a `map` that needs to be converted.
			while (i--) {
				val = arguments[i];
				args[i] = this.__type(val, i);
			}

			// Call the original method.
			runningNative = true;
			res = orig.apply(this, args);
			runningNative = false;

			if (!this.comparator || args.length) {
				canBatch.start();
				this._triggerChange("" + len, "add", args, undefined);
				canEvent.dispatch.call(this, 'length', [ this._length ]);
				canBatch.stop();
			}

			return res;
		};
	});

each({
		/**
		 * @function can-define/list/list.prototype.pop pop
		 * @description Remove an element from the end of a DefineList.
		 * @signature `list.pop()`
		 *
		 * `pop` removes an element from the end of a DefineList.
		 *
		 * ```js
		 * var names = new DefineList(['Alice', 'Bob', 'Eve']);
		 * names.pop() //-> 'Eve'
		 * ```
		 *
		 *   @return {*} The element just popped off the DefineList, or `undefined` if the DefineList was empty
		 *
		 * @body
		 *
		 * ## Use
		 *
		 * `pop` is the opposite action from [can-define/list/list::push push]:
		 *
		 * ```
		 * var list = new DefineList(['Alice', 'Bob', 'Eve']);
		 *
		 * list.pop(); // 'Eve'
		 * list.pop(); // 'Bob'
		 * list.pop(); // 'Alice'
		 * list.pop(); // undefined
		 * ```
		 *
		 * ## Events
		 *
		 * `pop` causes _remove_ and _length_ events to be fired if the DefineList is not empty
		 * when it is called.
		 *
		 * ## See also
		 *
		 * `pop` has its counterpart in [can-define/list/list::push push], or you may be
		 * looking for [can-define/list/list::unshift unshift] and its counterpart [can-define/list/list::shift shift].
		 */
	pop: "length",
		/**
		 * @function can-define/list/list.prototype.shift shift
		 * @description Remove an item from the front of a list.
		 * @signature `list.shift()`
		 *
		 * `shift` removes an element from the beginning of a DefineList.
		 *
		 * ```
		 * var list = new DefineList(['Alice','Adam']);
		 * list.shift(); //-> 'Alice'
		 * list.shift(); //-> 'Adam'
		 * list.shift(); //-> undefined
		 * ```
		 *
		 * @return {*} The element just shifted off the DefineList, or `undefined` if the DefineList is empty
		 *
		 * @body
		 *
		 * ## Use
		 *
		 * `shift` is the opposite action from `[can-define/list/list::unshift unshift]`:
		 *
		 * ## Events
		 *
		 * `pop` causes _remove_ and _length_ events to be fired if the DefineList is not empty
		 * when it is called.
		 *
		 * ## See also
		 *
		 * `shift` has a counterpart in [can-define/list/list::unshift unshift], or you may be
		 * looking for [can-define/list/list::push push] and its counterpart [can-define/list/list::pop pop].
		 */
	shift: 0
},
	// Creates a `remove` type method
	function(where, name) {
		var orig = [][name];
		DefineList.prototype[name] = function() {
			if (!this._length) {
				// For shift and pop, we just return undefined without
				// triggering events.
				return undefined;
			}

			var args = getArgs(arguments),
				len = where && this._length ? this._length - 1 : 0,
				res;

			// Call the original method.
			runningNative = true;
			res = orig.apply(this, args);
			runningNative = false;

			// Create a change where the args are
			// `len` - Where these items were removed.
			// `remove` - Items removed.
			// `undefined` - The new values (there are none).
			// `res` - The old, removed values (should these be unbound).
			canBatch.start();
			this._triggerChange("" + len, "remove", undefined, [ res ]);
			canEvent.dispatch.call(this, 'length', [ this._length ]);
			canBatch.stop();

			return res;
		};
	});

each({
	/**
	 * @function can-define/list/list.prototype.map map
	 * @description Map the values in this list to another list.
	 *
	 * @signature `list.map(callback[, thisArg])`
	 *
	 * Loops through the values of the list, calling `callback` for each one until the list
	 * ends.  The return values of `callback` are used to populate the returned list.
	 *
	 * ```js
	 * var todos = new DefineList([
	 *   {name: "dishes", complete: false},
	 *   {name: "lawn", complete: true}
	 * ]);
	 * var names = todos.map(function(todo){
	 *   return todo.name;
	 * });
	 * names //-> DefineList["dishes","lawn"]
	 * ```
	 *
	 * @param {function(item, index, list)} callback A function to call with each element of the DefineList.
	 * The three parameters that callback gets passed are:
	 *    - item (*) - the element at index.
	 *    - index (Integer) - the index of the current element of the list.
	 *    - list (DefineList) - the `DefineList` the elements are coming from.
	 *
	 * The return value of `callback`, including `undefined` values are used to populate the resulting list.
	 *
	 * @param {Object} [thisArg] The object to use as `this` inside the callback.
	 * @return {can-define/list/list} a new `DefineList` with the results of the map transform.
	 * @body
	 *
	 */
	"map": 3,
	/**
	 * @function can-define/list/list.prototype.filter filter
	 *
	 * Filter a list to a new list of the matched items.
	 *
	 * @signature `list.filter( callback [,thisArg] )`
	 *
	 * Filters `list` based on the return value of `callback`.
	 *
	 * ```
	 * var names = new DefineList(["alice","adam","zack","zeffer"]);
	 * var aNames = names.filter(function(name){
	 *   return name[0] === "a"
	 * });
	 * aNames //-> DefineList["alice","adam"]
	 * ```
	 *
	 *   @param  {function(*, Number, can-define/list/list)} callback(item, index, list) A
	 *   function to call with each element of the DefineList. The three parameters that callback gets passed are:
	 *    - item (*) - the element at index.
	 *    - index (Integer) - the index of the current element of the list.
	 *    - list (DefineList) - the `DefineList` the elements are coming from.
	 *
	 *   If `callback` returns a truthy result, `item` will be added to the result.  Otherwise, the `item` will be
	 *   excluded.
	 *
	 *   @param  {Object}  thisArg  What `this` should be in the `callback`.
	 *   @return {can-define/list/list} A new instance of this `DefineList` (may be a subclass), containing the items that passed the filter.
	 *
	 * @signature `list.filter( props )`
	 *
	 * Filters items in `list` based on the property values in `props`.
	 *
	 * ```
	 * var todos = new DefineList([
	 *   {name: "dishes", complete: false},
	 *   {name: "lawn", complete: true}
	 * ]);
	 * var complete = todos.filter({complete: true});
	 * complete //-> DefineList[{name: "lawn", complete: true}]
	 * ```
	 *
	 *    @param  {Object}  props An object of key-value properties.  Each key and value in
	 *    `props` must be present on an `item` for the `item` to be in the returned list.
	 *    @return {can-define/list/list} A new `DefineList` of the same type.
	 */
	"filter": 3,
	/**
	 * @function can-define/list/list.prototype.reduce reduce
	 * @description Map the values in this list to a single value
	 *
	 * @signature `list.reduce(callback, initialValue, [, thisArg])`
	 *
	 * Loops through the values of the list, calling `callback` for each one until the list
	 * ends.  The return value of `callback` is passed to the next iteration as the first argument, 
	 * and finally returned by `reduce`.
	 *
	 * ```js
	 * var todos = new DefineList([
	 *   {name: "dishes", complete: false},
	 *   {name: "lawn", complete: true}
	 * ]);
	 * var todosAsOneObject = todos.reduce(function(todos, todo){
	 *   todos[todo.name] = todo.complete;
	 *   return todos;
	 * }, {});
	 * todosAsOneObject //-> { dishes: false, lawn: true }
	 * ```
	 *
	 * @param {function(item, index, list)} callback A function to call with each element of the DefineList.
	 * The four parameters that callback gets passed are:
	 *    - current (*) - the current aggregate value of reducing over the list -- the initial value if the first iteration
	 *    - item (*) - the element at index.
	 *    - index (Integer) - the index of the current element of the list.
	 *    - list (DefineList) - the `DefineList` the elements are coming from.
	 *
	 * The return value of `callback` is passed to the next iteration as the first argument, and returned from 
	 * `reduce` if the last iteration.
	 *
	 * @param {*} [initialValue] The initial value to use as `current` in the first iteration
	 * @param {Object} [thisArg] The object to use as `this` inside the callback.
	 * @return {*} The result of the final call of `callback` on the list.
	 * @body
	 *
	 */
	"reduce": 4,
	/**
	 * @function can-define/list/list.prototype.reduceRight reduceRight
	 * @description Map the values in this list to a single value from right to left
	 *
	 * @signature `list.reduceRight(callback, initialValue, [, thisArg])`
	 *
	 * Loops through the values of the list in reverse order, calling `callback` for each one until the list
	 * ends.  The return value of `callback` is passed to the next iteration as the first argument, 
	 * and finally returned by `reduce`.
	 *
	 * ```js
	 * var todos = new DefineList([
	 *   {name: "dishes", complete: false},
	 *   {name: "lawn", complete: true}
	 * ]);
	 * var todosAsOneObject = todos.reduce(function(todos, todo){
	 *   todos[todo.name] = todo.complete;
	 *   return todos;
	 * }, {});
	 * todosAsOneObject //-> { dishes: false, lawn: true }
	 * ```
	 *
	 * @param {function(item, index, list)} callback A function to call with each element of the DefineList.
	 * The four parameters that callback gets passed are:
	 *    - current (*) - the current aggregate value of reducing over the list -- the initial value if the first iteration
	 *    - item (*) - the element at index.
	 *    - index (Integer) - the index of the current element of the list.
	 *    - list (DefineList) - the `DefineList` the elements are coming from.
	 *
	 * The return value of `callback` is passed to the next iteration as the first argument, and returned from 
	 * `reduce` if the last iteration.
	 *
	 * @param {*} [initialValue] The initial value to use as `current` in the first iteration
	 * @param {Object} [thisArg] The object to use as `this` inside the callback.
	 * @return {*} The result of the final call of `callback` on the list.
	 * @body
	 *
	 */
	"reduceRight": 4,
	/**
	 * @function can-define/list/list.prototype.every every
	 *
	 * Return true if every item in a list matches a predicate.
	 *
	 * @signature `list.every( callback [,thisArg] )`
	 *
	 * Tests each item in `list` by calling `callback` on it.  If `callback` returns truthy for every element in
	 * `list`, `every` returns `true`.
	 *
	 * ```
	 * var names = new DefineList(["alice","adam","zack","zeffer"]);
	 * var aNames = names.every(function(name){
	 *   return name[0] === "a"
	 * });
	 * aNames //-> false
	 * ```
	 *
	 *   @param  {function(*, Number, can-define/list/list)} callback(item, index, list) A
	 *   function to call with each element of the DefineList. The three parameters that callback gets passed are:
	 *    - item (*) - the element at index.
	 *    - index (Integer) - the index of the current element of the list.
	 *    - list (DefineList) - the `DefineList` the elements are coming from.
	 *
	 *   If `callback` returns a truthy result, `every` will evaluate the callback on the next element.  Otherwise, `every`
	 *   will return `false`.
	 *
	 *   @param  {Object}  thisArg  What `this` should be in the `callback`.
	 *   @return {Boolean} `true` if calling the callback on every element in `list` returns a truthy value, `false` otherwise.
	 *
	 * @signature `list.every( props )`
	 *
	 * Tests each item in `list` by comparing its properties to `props`.  If `props` match for every element in
	 * `list`, `every` returns `true`.
	 *
	 * ```
	 * var todos = new DefineList([
	 *   {name: "dishes", complete: false},
	 *   {name: "lawn", complete: true}
	 * ]);
	 * var complete = todos.every({complete: true});
	 * complete //-> false
	 * ```
	 *
	 *    @param  {Object}  props An object of key-value properties.  Each key and value in
	 *    `props` must be present on an `item` for the `item` to match.
	 *    @return {Boolean} `true` if every element in `list` matches `props`, `false` otherwise
	 */
	"every": 3,
	/**
	 * @function can-define/list/list.prototype.some some
	 *
	 * Return true if at least one item in a list matches a predicate.
	 *
	 * @signature `list.some( callback [,thisArg] )`
	 *
	 * Tests each item in `list` by calling `callback` on it.  If `callback` returns truthy for some element in
	 * `list`, `some` returns `true`.
	 *
	 * ```
	 * var names = new DefineList(["alice","adam","zack","zeffer"]);
	 * var aNames = names.some(function(name){
	 *   return name[0] === "a"
	 * });
	 * aNames //-> false
	 * ```
	 *
	 *   @param  {function(*, Number, can-define/list/list)} callback(item, index, list) A
	 *   function to call with each element of the DefineList. The three parameters that callback gets passed are:
	 *    - item (*) - the element at index.
	 *    - index (Integer) - the index of the current element of the list.
	 *    - list (DefineList) - the DefineList the elements are coming from.
	 *
	 *   If `callback` returns a falsy result, `some` will evaluate the callback on the next element.  Otherwise, `some`
	 *   will return `true`.
	 *
	 *   @param  {Object}  thisArg  What `this` should be in the `callback`.
	 *   @return {Boolean} `false` if calling the callback on some element in `list` returns a falsy value, `true` otherwise.
	 *
	 * @signature `list.some( props )`
	 *
	 * Tests each item in `list` by comparing its properties to `props`.  If `props` match for some element in
	 * `list`, `some` returns `true`.
	 *
	 * ```
	 * var todos = new DefineList([
	 *   {name: "dishes", complete: false},
	 *   {name: "lawn", complete: true}
	 * ]);
	 * var complete = todos.some({complete: true});
	 * complete //-> false
	 * ```
	 *
	 *    @param  {Object}  props An object of key-value properties.  Each key and value in
	 *    `props` must be present on an `item` for the `item` to match.
	 *    @return {Boolean} `false` if every element in `list` fails to match `props`, `true` otherwise
	 */
	"some": 3
}, 
function a(fnLength, fnName) {
	DefineList.prototype[fnName] = function() {
		var self = this;
		var args = [].slice.call(arguments, 0);
		var callback = args[0];
		var thisArg = args[fnLength - 1] || self;

		if (typeof callback === "object") {
			callback = makeFilterCallback(callback);
		}

		args[0] = function() {
			var cbArgs = [].slice.call(arguments, 0);
			// use .get(index) to ensure observation added.
			// the arguments are (item, index) or (result, item, index)
			cbArgs[fnLength - 3] = self.get(cbArgs[fnLength - 2]);
			return callback.apply(thisArg, cbArgs);
		};
		var ret = Array.prototype[fnName].apply(this, args);
		
		if(fnName === "map") {
			return new DefineList(ret);
		}
		else if(fnName === "filter") {
			return new self.constructor(ret);
		} else {
			return ret;
		}
	};
});


assign(DefineList.prototype, {
	/**
	 * @function can-define/list/list.prototype.indexOf indexOf
	 * @description Look for an item in a DefineList.
	 * @signature `list.indexOf(item)`
	 *
	 * `indexOf` finds the position of a given item in the DefineList.
	 *
	 * ```
	 * var list = new DefineList(['Alice', 'Bob', 'Eve']);
	 * list.indexOf('Alice');   // 0
	 * list.indexOf('Charlie'); // -1
	 * ```
	 *
	 *   @param {*} item The item to find.
	 *
	 *   @return {Number} The position of the item in the DefineList, or -1 if the item is not found.
	 *
	 * @body
	 *
	 */
	indexOf: function(item, fromIndex) {
		for (var i = fromIndex || 0, len = this.length; i < len; i++) {
			if (this.get(i) === item) {
				return i;
			}
		}
		return -1;
	},

		/**
	 * @function can-define/list/list.prototype.lastIndexOf lastIndexOf
	 * @description Look for an item in a DefineList starting from the end.
	 * @signature `list.lastIndexOf(item)`
	 *
	 * `lastIndexOf` finds the last position of a given item in the DefineList.
	 *
	 * ```
	 * var list = new DefineList(['Alice', 'Bob', 'Alice', 'Eve']);
	 * list.lastIndexOf('Alice');   // 2
	 * list.lastIndexOf('Charlie'); // -1
	 * ```
	 *
	 *   @param {*} item The item to find.
	 *
	 *   @return {Number} The position of the item in the DefineList, or -1 if the item is not found.
	 *
	 * @body
	 *
	 */
	lastIndexOf: function(item, fromIndex) {
		fromIndex = typeof fromIndex === "undefined" ? this.length - 1: fromIndex;
		for (var i = fromIndex; i >= 0; i--) {
			if (this.get(i) === item) {
				return i;
			}
		}
		return -1;
	},

	/**
	 * @function can-define/list/list.prototype.join join
	 * @description Join a DefineList's elements into a string.
	 * @signature `list.join(separator)`
	 *
	 * `join` turns a DefineList into a string by inserting _separator_ between the string representations
	 * of all the elements of the DefineList.
	 *
	 * ```
	 * var list = new DefineList(['Alice', 'Bob', 'Eve']);
	 * list.join(', '); // 'Alice, Bob, Eve'
	 * ```
	 *
	 * @param {String} separator The string to seperate elements.
	 *
	 * @return {String} The joined string.
	 *
	 */
	join: function() {
		Observation.add(this, "length");
		return [].join.apply(this, arguments);
	},

	/**
	 * @function can-define/list/list.prototype.reverse reverse
	 * @description Reverse the order of a DefineList.
	 * @signature `list.reverse()`
	 *
	 * Reverses the elements of the DefineList in place.
	 *
	 * ```
	 * var list = new DefineList(['Alice', 'Bob', 'Eve']);
	 * var reversedList = list.reverse();
	 *
	 * reversedList; //-> DefineList['Eve', 'Bob', 'Alice'];
	 * list === reversedList; // true
	 * ```
	 *
	 * @return {can-define/list/list} The DefineList, for chaining.
	 *
	 * @body
	 *
	 */
	reverse: function() {
		// this shouldn't be observable
		var list = [].reverse.call(this._items());
		return this.replace(list);
	},

	/**
	 * @function can-define/list/list.prototype.slice slice
	 * @description Make a copy of a part of a DefineList.
	 * @signature `list.slice([start[, end]])`
	 *
	 * `slice` creates a copy of a portion of the DefineList.
	 *
	 * ```js
	 * var list = new DefineList(['Alice', 'Bob', 'Charlie', 'Daniel', 'Eve']);
	 * var newList = list.slice(1, 4);
	 * newList //-> DefineList['Bob', 'Charlie', 'Daniel']
	 * ```
	 *
	 * @param {Number} [start=0] The index to start copying from. Defaults to `0`.
	 *
	 * @param {Number} [end] The first index not to include in the copy
	 * If _end_ is not supplied, `slice` will copy until the end of the list.
	 *
	 * @return {can-define/list/list} A new `DefineList` with the extracted elements.
	 *
	 * @body
	 *
	 * ## Use
	 *
	 * `slice` is the simplest way to copy a DefineList:
	 *
	 * ```
	 * var list = new DefineList(['Alice', 'Bob', 'Eve']);
	 * var copy = list.slice();
	 *
	 * copy           //-> DefineList['Alice', 'Bob', 'Eve']
	 * list === copy; //-> false
	 * ```
	 */
	slice: function() {
		// tells computes to listen on length for changes.
		Observation.add(this, "length");
		var temp = Array.prototype.slice.apply(this, arguments);
		return new this.constructor(temp);
	},

	/**
	 * @function can-define/list/list.prototype.concat concat
	 * @description Merge many collections together into a DefineList.
	 * @signature `list.concat(...args)`
	 *
	 * Returns a `DefineList` with the `list`'s items and the additional `args`.
	 *
	 * @param {Array|can-define/list/list|*} args Any number of arrays, Lists, or values to add in
	 * For each parameter given, if it is an Array or a DefineList, each of its elements will be added to
	 * the end of the concatenated DefineList. Otherwise, the parameter itself will be added.
	 *
	 * @return {can-define/list/list} A DefineList of the same type.
	 *
	 * @body
	 *
	 * ## Use
	 *
	 * `concat` makes a new DefineList with the elements of the DefineList followed by the elements of the parameters.
	 *
	 * ```
	 * var list = new DefineList();
	 * var newList = list.concat(
	 *     'Alice',
	 *     ['Bob', 'Charlie']),
	 *     new DefineList(['Daniel', 'Eve']),
	 *     {f: 'Francis'}
	 * );
	 * newList.get(); // ['Alice', 'Bob', 'Charlie', 'Daniel', 'Eve', {f: 'Francis'}]
	 * ```
	 */
	concat: function() {
		var args = [];
		// Go through each of the passed `arguments` and
		// see if it is list-like, an array, or something else
		each(arguments, function(arg) {
			if (types.isListLike(arg) || Array.isArray(arg)) {
				// If it is list-like we want convert to a JS array then
				// pass each item of the array to this.__type
				var arr = types.isListLike(arg) ? makeArray(arg) : arg;
				each(arr, function(innerArg) {
					args.push(this.__type(innerArg));
				}, this);
			} else {
				// If it is a Map, Object, or some primitive
				// just pass arg to this.__type
				args.push(this.__type(arg));
			}
		}, this);

		// We will want to make `this` list into a JS array
		// as well (We know it should be list-like), then
		// concat with our passed in args, then pass it to
		// list constructor to make it back into a list
		return new this.constructor(Array.prototype.concat.apply(makeArray(this), args));
	},

	/**
	 * @function can-define/list/list.prototype.forEach forEach
	 * @description Call a function for each element of a DefineList.
	 * @signature `list.forEach(callback[, thisArg])`
	 *
	 * Loops through the values of the list, calling `callback` for each one until the list ends
	 * or `false` is returned.
	 *
	 * ```
	 * list.forEach(function(item, index, list){ ... })
	 * ```
	 *
	 * @param {function(item, index, list)} callback A function to call with each element of the DefineList.
	 * The three parameters that callback gets passed are:
	 *    - item - the element at index.
	 *    - index - the current element of the list.
	 *    - list - the DefineList the elements are coming from.
	 *
	 * If the callback returns `false` the looping stops.
	 *
	 * @param {Object} [thisArg] The object to use as `this` inside the callback.
	 * @return {can-define/list/list} The list instance.
	 * @body
	 *
	 * ## Use
	 *
	 * `forEach` calls a callback for each element in the DefineList.
	 *
	 * ```
	 * var list = new DefineList([1, 2, 3]);
	 * list.forEach(function(element, index, list) {
	 *     list.get(index, element * element);
	 * });
	 * list.get(); // [1, 4, 9]
	 * ```
	 */
	forEach: function(cb, thisarg) {
		var item;
		for (var i = 0, len = this.length; i < len; i++) {
			item = this.get(i);
			if (cb.call(thisarg || item, item, i, this) === false) {
				break;
			}
		}
		return this;
	},

	/**
	 * @function can-define/list/list.prototype.replace replace
	 * @description Replace all the elements of a DefineList.
	 * @signature `list.replace(collection)`
	 *
	 * Replaces every item in the list with `collection`.
	 *
	 * ```
	 * var names = new DefineList(["alice","adam","eve"]);
	 * names.replace(["Justin","Xena"]);
	 * names //-> DefineList["Justin","Xena"]
	 * ```
	 *
	 * @param {Array|can-define/list/list} collection The collection of items that will be in `list`.
	 * @return {can-define/list/list} Returns the `list`.
	 *
	 * @body
	 *
	 * ## Use
	 *
	 * `replace` is essentially a shortcut for [can-define/list/list.prototype.splice].
	 *
	 * ## Events
	 *
	 * `replace` causes _remove_, _add_, and _length_ events.
	 */
	replace: function(newList) {
		var patches = diff(this, newList);

		canBatch.start();
		for (var i = 0, len = patches.length; i < len; i++) {
			this.splice.apply(this, [
				patches[i].index,
				patches[i].deleteCount
			].concat(patches[i].insert));
		}
		canBatch.stop();

		return this;
	},
	/**
	 * @function can-define/list/list.prototype.sort sort
	 * @description Sort the properties of a list.
	 *
	 * @signature `list.sort([compareFunction])`
	 *
	 * Sorts the elements of a list in place and returns the list. The API is the
	 * same as the native JavaScript `Array.prototype.sort` API.
	 *
	 * ```js
	 * var accounts = new Account.List([
	 *   { name: "Savings", amount: 20.00 },
	 *   { name: "Checking", amount: 103.24 },
	 *   { name: "Kids Savings", amount: 48155.13 }
	 * ]);
	 * accounts.sort(function(a, b){
	 *   if (a.name < b.name) {
	 *     return -1;
	 *   } else if (a.name > b.name){
	 *     return 1;
	 *   } else {
	 *     return 0;
	 *   }
	 * });
	 * accounts[0].name === "Checking"
	 * accounts[1].name === "Kids Savings"
	 * accounts[2].name === "Savings"
	 * ```
	 *
	 * @param {function(a, b)} compareFunction Specifies a function that defines the sort order.
	 *
	 * If `compareFunction` is supplied, the list elements are sorted according to the return
	 * value of the compare function. If `a` and `b` are two elements being compared, then:
	 *
	 *  - If `compareFunction(a, b)` returns a value less than 0, `a` will be sorted to
	 *  a lower index than `b`, so `a` will now come first.
	 *  - If `compareFunction(a, b)` returns 0, the order of the two values will not be changed.
	 *  - If `compareFunction(a, b)` returns a value greater than 0, `a` will be sorted to
	 *  a higher index than `b`, so `b` will now come first.
	 *
	 * @return {can-define/list/list} The list instance.
	 * @body
	 * ```
	 */
	sort: function(compareFunction) {
		var removed = Array.prototype.slice.call(this);
		Array.prototype.sort.call(this, compareFunction);
		var added = Array.prototype.slice.call(this);

		canBatch.start();
		canEvent.dispatch.call(this, 'remove', [ removed, 0 ]);
		canEvent.dispatch.call(this, 'add', [ added, 0 ]);
		canEvent.dispatch.call(this, 'length', [ this._length, this._length ]);
		canBatch.stop();
		return this;
	}
});


// Add necessary event methods to this object.
for (var prop in define.eventsProto) {
	DefineList[prop] = define.eventsProto[prop];
	Object.defineProperty(DefineList.prototype, prop, {
		enumerable: false,
		value: define.eventsProto[prop],
		writable: true
	});
}

Object.defineProperty(DefineList.prototype, "length", {
	get: function() {
		if (!this.__inSetup) {
			Observation.add(this, "length");
		}
		return this._length;
	},
	set: function(newVal) {
		if (runningNative) {
			this._length = newVal;
			return;
		}

		if (newVal === this._length) {
			return;
		}

		if (newVal > this._length - 1) {
			var newArr = new Array(newVal - this._length);
			this.push.apply(this, newArr);
		}
		else {
			this.splice(newVal);
		}
	},
	enumerable: true
});

var oldIsListLike = types.isListLike;
types.isListLike = function(obj) {
	return obj instanceof DefineList || oldIsListLike.apply(this, arguments);
};

DefineList.prototype.each = DefineList.prototype.forEach;
DefineList.prototype.attr = function(prop, value) {
	canLog.warn("DefineMap::attr shouldn't be called");
	if (arguments.length === 0) {
		return this.get();
	} else if (prop && typeof prop === "object") {
		return this.set.apply(this, arguments);
	} else if (arguments.length === 1) {
		return this.get(prop);
	} else {
		return this.set(prop, value);
	}
};
DefineList.prototype.item = function(index, value) {
	if (arguments.length === 1) {
		return this.get(index);
	} else {
		return this.set(index, value);
	}
};
DefineList.prototype.items = function() {
	canLog.warn("DefineList::get should should be used instead of DefineList::items");
	return this.get();
};

types.DefineList = DefineList;
types.DefaultList = DefineList;
module.exports = ns.DefineList = DefineList;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var canEvent = __webpack_require__(4);
/**
 * @typedef {{bind:function():*,unbind:function():*}} can.util.bind
 *
 * Provides mixin-able bind and unbind methods. `bind()` calls `this._bindsetup`
 * when the first bind happens and.  `unbind()` calls `this._bindteardown` when there
 * are no more event handlers.
 *
 */
	// ## Bind helpers

var lifecycle = function(prototype) {
	var baseAddEventListener = prototype.addEventListener;
	var baseRemoveEventListener = prototype.removeEventListener;

	prototype.addEventListener = function () {
		// Add the event to this object
		var ret = baseAddEventListener.apply(this, arguments);
		// If not initializing, and the first binding
		// call bindsetup if the function exists.
		if (!this.__inSetup) {
			this.__bindEvents = this.__bindEvents || {};
			if (!this.__bindEvents._lifecycleBindings) {
				this.__bindEvents._lifecycleBindings = 1;
				// setup live-binding
				if (this._eventSetup) {
					this._eventSetup();
				}
			} else {
				this.__bindEvents._lifecycleBindings++;
			}
		}
		return ret;
	};

	prototype.removeEventListener = function (event, handler) {
		if (!this.__bindEvents) {
			return this;
		}

		var handlers = this.__bindEvents[event] || [];
		var handlerCount = handlers.length;

		// Remove the event handler
		var ret = baseRemoveEventListener.apply(this, arguments);
		if (this.__bindEvents._lifecycleBindings === null) {
			this.__bindEvents._lifecycleBindings = 0;
		} else {
			// Subtract the difference in the number of handlers bound to this
			// event before/after removeEvent
			this.__bindEvents._lifecycleBindings -= (handlerCount - handlers.length);
		}
		// If there are no longer any bindings and
		// there is a bindteardown method, call it.
		if (!this.__bindEvents._lifecycleBindings && this._eventTeardown) {
			this._eventTeardown();
		}
		return ret;
	};

	return prototype;
};

var baseEvents = lifecycle({
	addEventListener: canEvent.addEventListener,
	removeEventListener: canEvent.removeEventListener
});

lifecycle.addAndSetup = baseEvents.addEventListener;
lifecycle.removeAndTeardown = baseEvents.removeEventListener;

module.exports = lifecycle;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var Construct = __webpack_require__(27);
var canEvent = __webpack_require__(4);
var canBatch = __webpack_require__(11);
var assign = __webpack_require__(3);
var each = __webpack_require__(1);
var types = __webpack_require__(0);
var Observation = __webpack_require__(7);

// this is a very simple can-map like object
var SimpleMap = Construct.extend(
	/**
	 * @prototype
	 */
	{
		// ### setup
		// A setup function for the instantiation of a simple-map.
		setup: function(initialData){
			this._data = {};
			this.attr(initialData);
		},
		// ### attr
		// The main get/set interface simple-map.
		// Either sets or gets one or more properties depending on how it is called.
		attr: function(prop, value) {
			var self = this;

			if(arguments.length === 0 ) {
				Observation.add(this,"__keys");
				var data = {};
				each(this._data, function(value, prop){
					Observation.add(this, prop);
					data[prop] = value;
				}, this);
				return data;
			}
			else if(arguments.length > 1) {
				var had = this._data.hasOwnProperty(prop);
				var old = this._data[prop];
				this._data[prop] = value;
				canBatch.start();
				if(!had) {
					canEvent.dispatch.call(this, "__keys", []);
				}
				canEvent.dispatch.call(this, prop, [value, old]);
				canBatch.stop();
			}
			// 1 argument
			else if(typeof prop === 'object') {
				Object.keys(prop).forEach(function(key) {
					self.attr(key, prop[key]);
				});
			}
			else {
				if(prop !== "constructor") {
					Observation.add(this, prop);
					return this._data[prop];
				}

				return this.constructor;
			}
		},
		serialize: function(){
			var serialized = {};
			Observation.add(this,"__keys");
			each(this._data, function(data, prop){
				Observation.add(this, prop);
				serialized[prop] = data && (typeof data.serialize === "function") ?
					data.serialize() : data;
			}, this);
			return serialized;
		},
		get: function(){
			return this.attr.apply(this, arguments);
		},
		set: function(){
			return this.attr.apply(this, arguments);
		}
	});

assign(SimpleMap.prototype, canEvent);

var oldIsMapLike = types.isMapLike;
types.isMapLike = function(obj) {
	if(obj instanceof SimpleMap) {
		return true;
	}

	return oldIsMapLike.call(this, obj);
};

if(!types.DefaultMap) {
	types.DefaultMap = SimpleMap;
}

module.exports = SimpleMap;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(child){
	return this.contains(child);
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var domEvents = __webpack_require__(8);
var domData = __webpack_require__(10);
var domMatches = __webpack_require__(94);
var each = __webpack_require__(1);
var isEmptyObject = __webpack_require__(22);

var dataName = "delegateEvents";

// Some events do not bubble, so delegating them requires registering the handler in the
// capturing phase.
// http://www.quirksmode.org/blog/archives/2008/04/delegating_the.html
var useCapture = function(eventType) {
	return eventType === 'focus' || eventType === 'blur';
};

/**
 * @module {events} can-util/dom/events/delegate/delegate delegateEvents
 * @parent can-util/dom/events/events
 *
 * Add delegate listeners to DOM events.  Delegated listeners use a selector on an 
 * ancestor element to determine when to fire the event for an item.  This can help 
 * cases where large numbers of similar DOM nodes are added into a DOM subtree, since
 * event handlers do not have to be attached to each new node.
 *
 * ```js
 * var events = require("can-util/dom/events/events");
 * require("can-util/dom/events/delegate/delegate");
 * var el = document.createElement("div");
 * var sub = document.createElement("div");
 * sub.className = "foo"
 * el.appendChild(sub);
 *
 * function delegateEventsHandler() {
 * 	console.log("delegate event fired");
 * }
 * 
 * events.addDelegateListener.call(el, "click", ".foo", delegateEventsHandler, false);
 *
 * events.removeDelegateListener.call(el, "click", ".foo", delegateEventsHandler);
 * ```
 */
var handleEvent = function(ev){
	var events = domData.get.call(this, dataName);
	var eventTypeEvents = events[ev.type];
	// contains the element and the handlers to call back
	var matches = [];

	if(eventTypeEvents) {
		var selectorDelegates = [];
		// convert eventTypeEvents from an object to
		// an array.
		each(eventTypeEvents, function(delegates){
			selectorDelegates.push(delegates);
		});

		// walk from the target to the delegate element
		// checking each selector
		var cur = ev.target;
		do {
			selectorDelegates.forEach(function(delegates){
				if (domMatches.call(cur, delegates[0].selector )) {
					matches.push({
						target: cur,
						delegates: delegates
					});
				}
			});
			cur = cur.parentNode;
		} while (cur && cur !== ev.currentTarget);

	}

	// make sure `cancelBubble` is  set
	var oldStopProp = ev.stopPropagation;
	ev.stopPropagation = function() {
		oldStopProp.apply(this, arguments);
    this.cancelBubble = true;
  };

	for(var i = 0; i < matches.length; i++) {
		var match = matches[i];
		var delegates = match.delegates;

		for(var d = 0, dLen = delegates.length; d < dLen; d++) {
			if( delegates[d].handler.call(match.target, ev) === false) {
				return false;
			}
			if (ev.cancelBubble) {
                return;
            }
		}
	}
};

/**
 * @function can-util/dom/events/delegate/delegate.addDelegateListener events.addDelegateListener
 * @parent can-util/dom/events/delegate/delegate
 * @signature `events.addDelegateListener(eventType, selector, handler)`
 * @param {String} eventType The type of the event to virtually bind to delegates
 * @param {String} selector  A CSS selector that matches all intended delegates
 * @param {function(event)} handler   The function to call when the event is dispatched
 *
 * Add an event as in [can-util/dom/events/events.addEventListener addEventListener] but with a selector
 * matching child nodes ("delegates") for which the event should fire.
 *
 * Delegate events are limited to firing in the bubble phase.
 */
domEvents.addDelegateListener = function(eventType, selector, handler) {


	var events = domData.get.call(this, dataName),
		eventTypeEvents;

	if (!events) {
		domData.set.call(this, dataName, events = {});
	}

	// if the first of that event type, bind
	if (!(eventTypeEvents = events[eventType])) {
		eventTypeEvents = events[eventType] = {};
		domEvents.addEventListener.call(this, eventType, handleEvent, useCapture(eventType));
	}

	if (!eventTypeEvents[selector]) {
		eventTypeEvents[selector] = [];
	}

	eventTypeEvents[selector].push({
		handler: handler,
		selector: selector
	});

};

/**
 * @function can-util/dom/events/delegate/delegate.removeDelegateListener events.removeDelegateListener
 * @parent can-util/dom/events/delegate/delegate
 * @signature `events.removeDelegateListener(eventType, selector, handler)`
 * @param {String} eventType The type of the event to unbind
 * @param {String} selector  A CSS selector that matches a delegate selector added for this event type
 * @param {function(event)} handler   The function bound as handler when the listener was added
 *
 * Remove a delegated event added by in [can-util/dom/delegate/delegate.addDelegateListener addDelegateListener] 
 */
domEvents.removeDelegateListener = function(eventType, selector, handler) {
	var events = domData.get.call(this, dataName);

	if (events[eventType] && events[eventType][selector]) {
		var eventTypeEvents = events[eventType],
			delegates = eventTypeEvents[selector],
			i = 0;

		// remove the matching eventType/selector/handler
		while (i < delegates.length) {
			if (delegates[i].handler === handler) {
				delegates.splice(i, 1);
			} else {
				i++;
			}
		}
		// if there are no more selectors, remove the selector
		if(delegates.length === 0) {
			delete eventTypeEvents[selector];
			// if there are no more events for that eventType, unbind
			if(isEmptyObject(eventTypeEvents)) {
				domEvents.removeEventListener.call(this, eventType, handleEvent, useCapture(eventType));
				delete events[eventType];
				if(isEmptyObject(events)) {
					domData.clean.call(this, dataName);
				}
			}
		}
	}
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var makeMutationEvent = __webpack_require__(63);

/**
 * @module {events} can-util/dom/events/inserted/inserted inserted
 * @parent can-util/dom/events/events
 *  
 * This event fires when the bound element is added to the DOM.
 *
 * ```js
 * var events = require("can-util/dom/events/events");
 * require("can-util/dom/events/inserted/inserted");
 *
 * var foo = document.createElement("div");
 *
 * var log = function() { console.log("inserted event fired"); }
 * events.addEventListener.call(foo, "inserted", log);
 *
 * document.body.appendChild(foo); // inserted event fired
 */
makeMutationEvent("inserted", "addedNodes");


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// This sets up an inserted event to work through mutation observers if
// mutation observers are present.  If they aren't you have to use
// the mutate methods.
var events = __webpack_require__(8);
var domData = __webpack_require__(10);
var getMutationObserver = __webpack_require__(21);
var domDispatch = __webpack_require__(17);
var mutationDocument = __webpack_require__(64);
var getDocument = __webpack_require__(5);
var CIDMap = __webpack_require__(50);
var string = __webpack_require__(19);

__webpack_require__(49);

/**
 * @module {Function} can-util/dom/events/make-mutation-event/make-mutation-event makeMutationEvent
 * @parent can-util/dom/events/events
 *
 * @signature `makeMutationEvent(specialEventName, mutationNodesProperty)`
 *
 * @param {String} specialEventName the event to handle as a mutation observer-based event
 * @param {String} mutationNodesProperty the property of interest in a DOM mutation
 *
 * This function provides a simple interface to bind the DOM events interface to the mutation
 * observer interface, by firing an event when a matching mutation is generated by the client
 */
module.exports = function(specialEventName, mutationNodesProperty){
	var originalAdd = events.addEventListener,
		originalRemove = events.removeEventListener;

	events.addEventListener = function(eventName){
		// on an inserted event
		// if it's the first inserted event, we'll register a handler to the
		// mutationDocument singleton.  This will take nodes that are added
		// and fire add / remove events.
		if(eventName === specialEventName && getMutationObserver()) {
			var documentElement = getDocument().documentElement;
			var specialEventData = domData.get.call(documentElement,specialEventName+"Data");
			if(!specialEventData) {
				specialEventData = {
					handler: function(mutatedNode){
						// keeps track of elements that have already been checked
						// so we don't double check (a parent and then a child added to the parent)
						if(specialEventData.nodeIdsRespondingToInsert.has(mutatedNode)) {
							domDispatch.call(mutatedNode, specialEventName, [], false);
							specialEventData.nodeIdsRespondingToInsert.delete(mutatedNode);
						}
					},
					nodeIdsRespondingToInsert: new CIDMap()
				};
				mutationDocument["on" + string.capitalize(mutationNodesProperty)](specialEventData.handler);
				domData.set.call(documentElement, specialEventName+"Data", specialEventData);
			}

			// count the number of handlers for this event
			var count = specialEventData.nodeIdsRespondingToInsert.get(this) || 0;
			specialEventData.nodeIdsRespondingToInsert.set(this, count + 1);
		}
		return originalAdd.apply(this, arguments);

	};

	events.removeEventListener = function(eventName){
		if(eventName === specialEventName && getMutationObserver() ) {
			var documentElement = getDocument().documentElement;
			var specialEventData = domData.get.call(documentElement, specialEventName+"Data");
			if(specialEventData) {
				var newCount = specialEventData.nodeIdsRespondingToInsert.get(this) - 1;

				// if there is still at least one handler for this event, update the count
				// otherwise remove this element from the CIDMap
				if (newCount) {
					specialEventData.nodeIdsRespondingToInsert.set(this, newCount);
				} else {
					specialEventData.nodeIdsRespondingToInsert.delete(this);
				}

				if(!specialEventData.nodeIdsRespondingToInsert.size) {
					mutationDocument["off" + string.capitalize(mutationNodesProperty)](specialEventData.handler);
					domData.clean.call(documentElement, specialEventName+"Data");
				}
			}
		}
		return originalRemove.apply(this, arguments);
	};
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getDocument = __webpack_require__(5);
var domDataCore = __webpack_require__(47);
var MUTATION_OBSERVER = __webpack_require__(21);
var each = __webpack_require__(1);
var CIDStore = __webpack_require__(96);
var makeArray = __webpack_require__(12);
var string = __webpack_require__(19);

var dispatchIfListening = function(mutatedNode, nodes, dispatched){
	if(dispatched.has(mutatedNode)) {
		return true;
	}
	dispatched.add(mutatedNode);

	if(nodes.name === "removedNodes") {
		var documentElement = getDocument().documentElement;
		if(documentElement.contains(mutatedNode)) {
			return;
		}
	}

	nodes.handlers.forEach(function(handler){
		handler(mutatedNode);
	});
	nodes.afterHandlers.forEach(function(handler){
		handler(mutatedNode);
	});
};

var mutationObserverDocument = {
	add: function(handler) {
		var MO = MUTATION_OBSERVER();
		if (MO) {
			var documentElement = getDocument().documentElement;
			var globalObserverData = domDataCore.get.call(documentElement, "globalObserverData");
			if(!globalObserverData) {
				var observer = new MO(function (mutations) {
					globalObserverData.handlers.forEach(function(handler){
						handler(mutations);
					});
				});
				observer.observe(documentElement, {childList: true, subtree: true});

				globalObserverData = {
					observer: observer,
					handlers: []
				};
				domDataCore.set.call(documentElement, "globalObserverData", globalObserverData);
			}
			globalObserverData.handlers.push(handler);
		}
	},
	remove: function(handler){
		var documentElement = getDocument().documentElement;
		var globalObserverData = domDataCore.get.call(documentElement, "globalObserverData");
		if(globalObserverData) {
			var index = globalObserverData.handlers.indexOf(handler);
			if(index >= 0) {
				globalObserverData.handlers.splice(index, 1);
			}
			if(globalObserverData.handlers.length === 0 ){
				globalObserverData.observer.disconnect();
				domDataCore.clean.call(documentElement, "globalObserverData");
			}
		}
	}
};

var makeMutationMethods = function(name) {
	var mutationName = name.toLowerCase() + "Nodes";

	var getMutationData = function() {
		var documentElement = getDocument().documentElement;
		var mutationData = domDataCore.get.call(documentElement, mutationName + "MutationData");

		if(!mutationData) {
			mutationData = {
				name: mutationName,
				handlers: [],
				afterHandlers: [],
				hander: null
			};
			if (MUTATION_OBSERVER()) {
				domDataCore.set.call(documentElement, mutationName + "MutationData", mutationData);
			}
		}
		return mutationData;
	};

	var setup = function() {
		var mutationData = getMutationData();

		if( mutationData.handlers.length === 0 || mutationData.afterHandlers.length === 0 ) {
			mutationData.handler = function(mutations){
				var dispatched = new CIDStore();

				mutations.forEach(function(mutation){
					each(mutation[mutationName], function(mutatedNode){
						var children = mutatedNode.getElementsByTagName && makeArray( mutatedNode.getElementsByTagName("*") );

						var alreadyChecked = dispatchIfListening(mutatedNode, mutationData, dispatched);
						if(children && !alreadyChecked) {
							for (var j = 0, child;
								(child = children[j]) !== undefined; j++) {
								dispatchIfListening(child, mutationData, dispatched);
							}
						}
					});
				});
			};
			this.add(mutationData.handler);
		}
		return mutationData;
	};

	var teardown = function() {
		var documentElement = getDocument().documentElement;
		var mutationData = getMutationData();
		if( mutationData.handlers.length === 0 && mutationData.afterHandlers.length === 0 ) {
			this.remove(mutationData.handler);
			domDataCore.clean.call(documentElement, mutationName + "MutationData");
		}
	};

	var createOnOffHandlers = function(name, handlerList) {
		mutationObserverDocument["on" + name] = function(handler) {
			var mutationData = setup.call(this);
			mutationData[handlerList].push(handler);
		};

		mutationObserverDocument["off" + name] = function(handler) {
			var mutationData = getMutationData();
			var index = mutationData[handlerList].indexOf(handler);
			if(index >=0 ) {
				mutationData[handlerList].splice(index, 1);
			}
			teardown.call(this);
		};
	};

	var createHandlers = function(name) {
		createOnOffHandlers(name, "handlers");
		createOnOffHandlers("After" + name, "afterHandlers");
	};

	createHandlers(string.capitalize(mutationName));
};

makeMutationMethods("added");
makeMutationMethods("removed");

module.exports = mutationObserverDocument;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Returns `true` if the object can have properties (no `null`s).
module.exports = function (current) {
    return /^f|^o/.test(typeof current);
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var types = __webpack_require__(0);

module.exports = function(obj) {
	return obj && !!obj[types.iterator];
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var domData = __webpack_require__(10);
var SimpleMap = __webpack_require__(59);
var types = __webpack_require__(0);
var ns = __webpack_require__(2);
var getDocument = __webpack_require__(5);
var isArrayLike = __webpack_require__(38);
module.exports = ns.viewModel = function (el, attr, val) {
	var scope ;
	if (typeof el === 'string') {
		el = getDocument().querySelector(el);
	} else if (isArrayLike(el) && !el.nodeType) {
		el= el[0];
	}

	if (types.isMapLike(attr)) {
		return domData.set.call( el, "viewModel", attr);
	}

	scope = domData.get.call(el, "viewModel");
	if(!scope) {
		scope = types.DefaultMap ? new types.DefaultMap() : new SimpleMap();
		domData.set.call(el, "viewModel", scope);
	}
	switch (arguments.length) {
		case 0:
		case 1:
			return scope;
		case 2:
			return "attr" in scope ? scope.attr(attr) : scope[attr];
		default:
			if("attr" in scope) {
				scope.attr(attr, val);
			} else {
				scope[attr] = val;
			}
			return el;
	}
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

/* jshint maxdepth:7 */
/* jshint latedef:false */
var childNodes = __webpack_require__(16);
var domAttr = __webpack_require__(24);
var each = __webpack_require__(1);
var makeArray = __webpack_require__(12);
var getDocument = __webpack_require__(5);
var domMutate = __webpack_require__(30);
var namespace = __webpack_require__(2);
var MUTATION_OBSERVER = __webpack_require__(21);

// if an object or a function
// convert into what it should look like
// then the modification can happen in place
// but it has to have more than the current node
// blah!
var processNodes = function(nodes, paths, location, document){
	var frag = document.createDocumentFragment();

	for(var i = 0, len = nodes.length; i < len; i++) {
		var node = nodes[i];
		frag.appendChild( processNode(node,paths,location.concat(i), document) );
	}
	return frag;
},
	keepsTextNodes =  typeof document !== "undefined" && (function(){
		var testFrag = document.createDocumentFragment();
		var div = document.createElement("div");

		div.appendChild(document.createTextNode(""));
		div.appendChild(document.createTextNode(""));
		testFrag.appendChild(div);

		var cloned  = testFrag.cloneNode(true);

		return childNodes(cloned.firstChild).length === 2;
	})(),
	clonesWork = typeof document !== "undefined" && (function(){
		// Since html5shiv is required to support custom elements, assume cloning
		// works in any browser that doesn't have html5shiv

		// Clone an element containing a custom tag to see if the innerHTML is what we
		// expect it to be, or if not it probably was created outside of the document's
		// namespace.
		var el = document.createElement('a');
		el.innerHTML = "<xyz></xyz>";
		var clone = el.cloneNode(true);
		var works = clone.innerHTML === "<xyz></xyz>";
		var MO, observer;

		if(works) {
			// Cloning text nodes with dashes seems to create multiple nodes in IE11 when
			// MutationObservers of subtree modifications are used on the documentElement.
			// Since this is not what we expect we have to include detecting it here as well.
			el = document.createDocumentFragment();
			el.appendChild(document.createTextNode('foo-bar'));

			MO = MUTATION_OBSERVER();

			if (MO) {
				observer = new MO(function() {});
				observer.observe(document.documentElement, { childList: true, subtree: true });

				clone = el.cloneNode(true);

				observer.disconnect();
			} else {
				clone = el.cloneNode(true);
			}

			return clone.childNodes.length === 1;
		}

		return works;
	})(),
	namespacesWork = typeof document !== "undefined" && !!document.createElementNS;

/**
 * @function cloneNode
 * @hide
 *
 * A custom cloneNode function to be used in browsers that properly support cloning
 * of custom tags (IE8 for example). Fixes it by doing some manual cloning that
 * uses innerHTML instead, which has been shimmed.
 *
 * @param {DocumentFragment} frag A document fragment to clone
 * @return {DocumentFragment} a new fragment that is a clone of the provided argument
 */
var cloneNode = clonesWork ?
	function(el){
		return el.cloneNode(true);
	} :
	function(node){
		var document = node.ownerDocument;
		var copy;

		if(node.nodeType === 1) {
			copy = document.createElement(node.nodeName);
		} else if(node.nodeType === 3){
			copy = document.createTextNode(node.nodeValue);
		} else if(node.nodeType === 8) {
			copy = document.createComment(node.nodeValue);
		} else if(node.nodeType === 11) {
			copy = document.createDocumentFragment();
		}

		if(node.attributes) {
			var attributes = makeArray(node.attributes);
			each(attributes, function (node) {
				if(node && node.specified) {
					domAttr.setAttribute(copy, node.nodeName || node.name, node.nodeValue || node.value);
				}
			});
		}

		if(node && node.firstChild) {
			var child = node.firstChild;

			while(child) {
				copy.appendChild( cloneNode(child) );
				child = child.nextSibling;
			}
		}

		return copy;
	};

function processNode(node, paths, location, document){
	var callback,
		loc = location,
		nodeType = typeof node,
		el,
		p,
		i , len;
	var getCallback = function(){
		if(!callback) {
			callback  = {
				path: location,
				callbacks: []
			};
			paths.push(callback);
			loc = [];
		}
		return callback;
	};

	if(nodeType === "object") {
		if( node.tag ) {
			if(namespacesWork && node.namespace) {
				el = document.createElementNS(node.namespace, node.tag);
			} else {
				el = document.createElement(node.tag);
			}

			if(node.attrs) {
				for(var attrName in node.attrs) {
					var value = node.attrs[attrName];
					if(typeof value === "function"){
						getCallback().callbacks.push({
							callback:  value
						});
					} else  {
						domAttr.setAttribute(el, attrName, value);
					}
				}
			}
			if(node.attributes) {
				for(i = 0, len = node.attributes.length; i < len; i++ ) {
					getCallback().callbacks.push({callback: node.attributes[i]});
				}
			}
			if(node.children && node.children.length) {
				// add paths
				if(callback) {
					p = callback.paths = [];
				} else {
					p = paths;
				}

				el.appendChild( processNodes(node.children, p, loc, document) );
			}
		} else if(node.comment) {
			el = document.createComment(node.comment);

			if(node.callbacks) {
				for(i = 0, len = node.attributes.length; i < len; i++ ) {
					getCallback().callbacks.push({callback: node.callbacks[i]});
				}
			}
		}


	} else if(nodeType === "string"){

		el = document.createTextNode(node);

	} else if(nodeType === "function") {

		if(keepsTextNodes) {
			el = document.createTextNode("");
			getCallback().callbacks.push({
				callback: node
			});
		} else {
			el = document.createComment("~");
			getCallback().callbacks.push({
				callback: function(){
					var el = document.createTextNode("");
					domMutate.replaceChild.call(this.parentNode, el, this);
					return node.apply(el,arguments );
				}
			});
		}

	}
	return el;
}

function getCallbacks(el, pathData, elementCallbacks){
	var path = pathData.path,
		callbacks = pathData.callbacks,
		paths = pathData.paths,
		child = el,
		pathLength = path ? path.length : 0,
		pathsLength = paths ? paths.length : 0;

	for(var i = 0; i < pathLength; i++) {
		child = child.childNodes.item(path[i]);
	}

	for( i= 0 ; i < pathsLength; i++) {
		getCallbacks(child, paths[i], elementCallbacks);
	}

	elementCallbacks.push({element: child, callbacks: callbacks});
}

function hydrateCallbacks(callbacks, args) {
	var len = callbacks.length,
		callbacksLength,
		callbackElement,
		callbackData;

	for(var i = 0; i < len; i++) {
		callbackData = callbacks[i];
		callbacksLength = callbackData.callbacks.length;
		callbackElement = callbackData.element;
		for(var c = 0; c < callbacksLength; c++) {
			callbackData.callbacks[c].callback.apply(callbackElement, args);
		}
	}
}

function makeTarget(nodes, doc){
	var paths = [];
	var frag = processNodes(nodes, paths, [], doc || getDocument());
	return {
		paths: paths,
		clone: frag,
		hydrate: function(){
			var cloned = cloneNode(this.clone);
			var args = makeArray(arguments);

			var callbacks = [];
			for(var i = 0; i < paths.length; i++) {
				getCallbacks(cloned, paths[i], callbacks);
			}
			hydrateCallbacks(callbacks, args);

			return cloned;
		}
	};
}
makeTarget.keepsTextNodes = keepsTextNodes;
makeTarget.cloneNode = cloneNode;

namespace.view = namespace.view || {};
module.exports = namespace.view.target = makeTarget;


/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__string_string__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_can_stache__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_can_stache___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_can_stache__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_can_define_map_map__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_can_define_map_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_can_define_map_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_can_define_list_list__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_can_define_list_list___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_can_define_list_list__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_can_util_js_dev_dev__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_can_util_js_dev_dev___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_can_util_js_dev_dev__);






/**
 * Built in field templates. If `fieldType` is specified on a field, the
 * template listed here will be used. Otherwise, `formTemplate` should be
 * provided for custom field templates.
 *  - text: `<text-field />` component
 *  - select: `<select-field />` component
 *  - file: `<file-field />` component
 *  - json: `<json-field />` component
 *  - subform: `<subform-field />` component
 *  - date: `<date-field />` component
 *  - checkbox: `<checkbox-field />` component
 * @property {Object} util/field/Field.TEMPLATES Built-in Templates
 * @parent util/field.guides
 */
const TEMPLATES = {
    text: '<text-field {properties}="." (fieldchange)="setField" value="{{formObject[name]}}" {errors}="validationErrors" />', // string
    select: '<select-field {properties}="." (fieldchange)="setField" value="{{formObject[name]}}" {errors}="validationErrors" />', // string
    file: '<file-field {properties}="." (fieldchange)="setField" value="{{formObject[name]}}" {errors}="validationErrors" />', // string
    json: '<json-field {properties}="." (fieldchange)="setField" {value}="formObject[name]" {errors}="validationErrors" />', // string
    subform: '<subform-field {properties}="." (fieldchange)="setField" {value}="formObject[name]" {errors}="validationErrors" />', // string
    date: '<date-field {properties}="." (fieldchange)="setField" {value}="formObject[name]" {errors}="validationErrors" />', // date object
    checkbox: '<checkbox-field (fieldchange)="setField" value="{{formObject[name]}}" {errors}="validationErrors" {properties}="." />'
};
/* unused harmony export TEMPLATES */


const displayTemplate = __WEBPACK_IMPORTED_MODULE_1_can_stache___default()('{{object[field.name]}}');

/**
 * @constructor util/field/Field Field
 * @parent util/field
 * @group util/field/Field.props Properties
 * @description Constructs a new field
 */
const Field = __WEBPACK_IMPORTED_MODULE_2_can_define_map_map___default.a.extend('Field', {

    // allow extra properties on this type
    seal: false
}, {
    /**
     * @prototype
     */
    /**
     * The name of the property on the object, this field's name
     * @property {String} util/field/Field.props.name name
     * @parent util/field/Field.props
     */
    name: 'string',
    /**
     * A friendly name for the field used to display to the user
     * The default is to capitalize the name and remove underscores
     * @property {String} util/field/Field.props.alias alias
     * @parent util/field/Field.props
     */
    alias: {
        type: 'string',
        get (alias) {
            if (alias) {
                return alias;
            }
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__string_string__["a" /* makeSentenceCase */])(this.name);
        }
    },
    /**
     * The type of the form field to use when editing this field. These types
     * are defined in the `util/field.TEMPLATES` constant. This should be
     * omitted if a custom template is used.
     * @property {String} util/field/Field.props.fieldType fieldType
     * @parent util/field/Field.props
     */
    fieldType: {
        type: 'string',
        value: 'text'
    },
    /**
     * The form field template to use when editing this field in the form-widget. This should be
     * a template renderer. By default, this value is set to the
     * template for the given `fieldType` property.
     *
     * The default renderers are provided as a constant, and may be referenced
     * by passing the `field.fieldType` parameter. For instance, passing
     * `fieldType: 'select'` will set `formTemplate` to the registered
     * template for a `select-field` component.
     *
     * Custom templates can be created to add various field types and functionality
     * to the form widget.
     *
     * The custom templates will have the following useful properties in their scope:
     *  - `this`: (alias `.` is the current `this` object) the field properties object
     *  - `setField`: the function to call when the field changes
     *  - `formObject`: the form object
     *  - `validationErrors`: An object with keys referencing the field name, and a string referencing a validation error
     *
     * For example:
     * @property {Renderer} util/field/Field.props.formTemplate formTemplate
     * @parent util/field/Field.props
     */
    formTemplate: {
        type: '*',
        get (template) {
            if (template) {
                if (typeof template === 'string') {
                    template = __WEBPACK_IMPORTED_MODULE_1_can_stache___default()(template);
                }
                return template;
            }
            const fType = this.fieldType;
            if (!TEMPLATES.hasOwnProperty(fType)) {
                __WEBPACK_IMPORTED_MODULE_4_can_util_js_dev_dev___default.a.warn('No template for the given field type', fType);
                return __WEBPACK_IMPORTED_MODULE_1_can_stache___default()(TEMPLATES.text);
            }
            return __WEBPACK_IMPORTED_MODULE_1_can_stache___default()(TEMPLATES[fType]);
        }
    },
    /**
     * @body
     * Formats the field into a renderer in the list and details view of the
     * data-admin component. The renderer has the scope of the
     * list-table or property table. The simplest displayTemplate value would be
     * the default, which is `object[field.name]`. (make sure to surround values with brackets)
     *
     * In this example,
     * the scope of the table components provide access to each row as `object` and the
     * current field as `field`.
     *
     * In addition, other properties can be accessed and combined by providing it
     * `{{object.other_prop_name}}`. Custom helpers and other methods may also be
     * registered and utilized. For instance, if we created a global helper
     * `capitalize(property)` we could access it with `capitalize object.prop_name`.
     *
     * For a local helper, an additional method could be added to the field, like
     * ```javascript
     * {
     * name: 'prop',
     * alias: 'Property',
     * capitalize: function(val){
     *     return val.toUpperCase();
     * }
     * }
     * ```
     *
     * In a stache template, this could be rendered using `field.capitalize(object.prop)`
     * @property {Renderer} util/field/Field.props.displayTemlpate displayTemplate
     * @parent util/field/Field.props
     */
    displayTemplate: {
        value: function () {
            return displayTemplate;
        },
        type (val) {
            if (typeof val === 'string') {
                return __WEBPACK_IMPORTED_MODULE_1_can_stache___default()(val);
            }
            return val;
        }
    },
    /**
     * Includes this field in the list view in the data-admin
     * @property {Boolean} util/field/Field.props.list list
     * @parent util/field/Field.props
     */
    list: {
        type: 'boolean',
        value: true
    },
    /**
     * Includes this field in the details view in the data-admin
     * @property {Boolean} util/field/Field.props.detail detail
     * @parent util/field/Field.props
     */
    detail: {
        type: 'boolean',
        value: true
    },
    /**
     * Includes this field in the edit view in the data-admin
     * @property {Boolean} util/field/Field.props.edit edit
     * @parent util/field/Field.props
     */
    edit: {
        type: 'boolean',
        value: true
    },
    /**
     * Includes this field in the filter widget's fields.
     * @property {Boolean} util/field/Field.props.filter filter
     * @parent util/field/Field.props
     */
    filter: {
        type: 'boolean',
        value: true
    },
    /**
     * Includes this field in the sorting capability
     * @property {Boolean} util/field/Field.props.sort sort
     * @parent util/field/Field.props
     */
    sort: {
        type: 'boolean',
        value: true
    },
    /**
     * Validates a property and returns a string if the field is invalid
     * @property {Function} util/field/Field.props.validate validate
     * @signature `validate(props)`
     * @param {util/field.ValidationObject} props A special object consisting of information about the current value and dirty state of the form object
     * @return {String|falsey} a string error message if the value is not valid or undefined if there is no error message
     * @parent util/field/Field.props
     */
    validate: {
        value: null
    },
    /**
     * A boolean flag to display form field inline with others and hide labels
     * @property {Boolean} util/field/Field.props.inline inline
     * @parent util/field/Field.props
     */
    inline: 'boolean',
    /**
     * Text to display when the field is empty (like a textbox). Doesn't apply to
     * some fields, like select or date fields.
     * @property {String} util/field/Field.props.placeholder placeholder
     * @parent util/field/Field.props
     */
    placeholder: 'string',
    /**
     * Adds css classes to the table cells and headings. Selectors should use
     * `th.classname` and `td.classname`
     * @property {String} util/field/Field.props.classes classes
     * @parent util/field/Field.props
     */
    classes: 'string'
});
/* unused harmony export Field */



const FieldList = __WEBPACK_IMPORTED_MODULE_3_can_define_list_list___default.a.extend('FieldList', {
    '#': Field
});
/* unused harmony export FieldList */


/* harmony default export */ __webpack_exports__["a"] = (Field);


/***/ }),
/* 70 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var esri_promise_1 = __webpack_require__(33);
var es6_promise_1 = __webpack_require__(26);
var boilerplate_1 = __webpack_require__(76);
var application_1 = __webpack_require__(73);
__webpack_require__(121);
esri_promise_1.esriPromise([
    'dojo/text!config/appConfig.json',
    'dojo/text!config/boilerplateSettings.json'
]).then(function (_a) {
    var appConfig = _a[0], boilerplateSettings = _a[1];
    application_1.default().then(function (AppInstance) {
        boilerplate_1.default(JSON.parse(appConfig), JSON.parse(boilerplateSettings)) // make an instance of boilerplate
            .then(function (BoilerInstance) {
            BoilerInstance.init() // initialize the boilerplate --> this returns a promise that resolves with the info we need to boot up our app
                .then(function (boilerplateResponse) {
                AppInstance.init(boilerplateResponse); // initialize the application
            });
        }).catch(es6_promise_1.Promise.reject);
    }).catch(es6_promise_1.Promise.reject);
}).catch(function (err) {
    console.error(err); // If an error occurs at any of these steps, we'd like to see what it is!
});


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(79);
var esri_promise_1 = __webpack_require__(33);
var es6_promise_1 = __webpack_require__(26);
var ItemHelper_1 = __webpack_require__(74);
var UrlParamHelper_1 = __webpack_require__(75);
var CSS = {
    loading: "boilerplate--loading",
    error: "boilerplate--error",
    errorIcon: "esri-icon-notice-round"
};
exports.default = function () { return esri_promise_1.esriPromise([
    'dojo/_base/lang', 'dojo/dom', 'dojo/dom-attr', 'dojo/domReady!',
    'esri/views/MapView', 'esri/views/SceneView', 'esri/widgets/Search',
    'esri/WebMap', 'esri/WebScene', 'dojo/i18n!config/nls/resources'
]).then(function (_a) {
    var lang = _a[0], dom = _a[1], domAttr = _a[2], domClass = _a[3], MapView = _a[4], SceneView = _a[5], Search = _a[6], WebMap = _a[7], WebScene = _a[8], i18n = _a[9];
    var Application = (function () {
        function Application() {
            this.config = null;
            this.direction = null;
            this.settings = null;
            this.urlParamHelper = null;
            this.itemHelper = null;
        }
        Application.prototype.init = function (boilerplateResponse) {
            var _this = this;
            if (boilerplateResponse) {
                this.direction = boilerplateResponse.direction;
                this.config = boilerplateResponse.config;
                this.settings = boilerplateResponse.settings;
                var boilerplateResults = boilerplateResponse.results;
                var webMapItem_1 = boilerplateResults.webMapItem;
                var webSceneItem_1 = boilerplateResults.webSceneItem;
                var groupData_1 = boilerplateResults.group;
                document.documentElement.lang = boilerplateResponse.locale;
                ItemHelper_1.default().then(function (instance) {
                    _this.itemHelper = instance;
                })
                    .catch(function (err) {
                    throw err;
                }).then(UrlParamHelper_1.default).then(function (instance) {
                    _this.urlParamHelper = instance;
                }).catch(function (err) {
                    throw err;
                }).then(function () {
                    _this._setDirection();
                    if (webMapItem_1) {
                        _this._createWebMap(webMapItem_1);
                    }
                    else if (webSceneItem_1) {
                        _this._createWebScene(webSceneItem_1);
                    }
                    else if (groupData_1) {
                        _this._createGroupGallery(groupData_1);
                    }
                    else {
                        _this.reportError(new Error("app:: Could not load an item to display"));
                    }
                }).catch(function (err) {
                    throw (err);
                });
            }
            else {
                this.reportError(new Error("app:: Boilerplate is not defined"));
            }
        };
        Application.prototype.reportError = function (error) {
            // remove loading class from body
            document.body.removeAttribute('class');
            document.body.className = CSS.error;
            // an error occurred - notify the user. In this example we pull the string from the
            // resource.js file located in the nls folder because we've set the application up
            // for localization. If you don't need to support multiple languages you can hardcode the
            // strings here and comment out the call in index.html to get the localization strings.
            // set message
            var node = dom.byId("loading_message");
            if (node) {
                node.innerHTML = "<h1><span class=\"" + CSS.errorIcon + "\"></span> " + i18n.error + "</h1><p>" + error.message + "</p>";
            }
            return error;
        };
        Application.prototype._setDirection = function () {
            var direction = this.direction;
            var dirNode = document.getElementsByTagName("html")[0];
            domAttr.set(dirNode, "dir", direction);
        };
        Application.prototype._ready = function () {
            document.body.removeAttribute('class');
            document.title = this.config.title;
        };
        Application.prototype._createWebMap = function (webMapItem) {
            var _this = this;
            this.itemHelper.createWebMap(webMapItem).then(function (map) {
                var viewProperties = {
                    map: map,
                    container: _this.settings.webmap.containerId
                };
                if (!_this.config.title && map.portalItem && map.portalItem.title) {
                    _this.config.title = map.portalItem.title;
                }
                lang.mixin(viewProperties, _this.urlParamHelper.getViewProperties(_this.config));
                var view = new MapView(viewProperties);
                view.then(function (response) {
                    _this.urlParamHelper.addToView(view, _this.config);
                    _this._ready();
                }, _this.reportError);
            }, this.reportError);
        };
        Application.prototype._createWebScene = function (webSceneItem) {
            var _this = this;
            this.itemHelper.createWebScene(webSceneItem).then(function (map) {
                var viewProperties = {
                    map: map,
                    container: _this.settings.webscene.containerId
                };
                if (!_this.config.title && map.portalItem && map.portalItem.title) {
                    _this.config.title = map.portalItem.title;
                }
                lang.mixin(viewProperties, _this.urlParamHelper.getViewProperties(_this.config));
                var view = new SceneView(viewProperties);
                view.then(function (response) {
                    _this.urlParamHelper.addToView(view, _this.config);
                    _this._ready();
                }, _this.reportError);
            }, this.reportError);
        };
        Application.prototype._createGroupGallery = function (groupData) {
            var groupInfoData = groupData.infoData;
            var groupItemsData = groupData.itemsData;
            if (!groupInfoData || !groupItemsData || groupInfoData.total === 0 || groupInfoData instanceof Error) {
                this.reportError(new Error("app:: group data does not exist."));
                return;
            }
            var info = groupInfoData.results[0];
            var items = groupItemsData.results;
            this._ready();
            if (info && items) {
                var html_1 = "";
                html_1 += "<h1>" + info.title + "</h1>";
                html_1 += "<ol>";
                items.forEach(function (item) {
                    html_1 += "<li>" + item.title + "</li>";
                });
                html_1 += "</ol>";
                document.body.innerHTML = html_1;
            }
        };
        return Application;
    }());
    return es6_promise_1.Promise.resolve(new Application());
}); };


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var esri_promise_1 = __webpack_require__(33);
var es6_promise_1 = __webpack_require__(26);
exports.default = function () { return esri_promise_1.esriPromise([
    'dojo/Deferred', 'dojo/promise/Promise',
    'esri/WebMap', 'esri/WebScene',
    'esri/portal/PortalItem'
]).then(function (_a) {
    var Deferred = _a[0], DojoPromise = _a[1], WebMap = _a[2], WebScene = _a[3], PortalItem = _a[4];
    var ItemHelper = (function () {
        function ItemHelper() {
        }
        ItemHelper.prototype.createWebMap = function (item) {
            var deferred = new Deferred();
            if (!item) {
                deferred.reject(new Error("ItemHelper:: WebMap data does not exist."));
            }
            else if (item.data instanceof Error) {
                deferred.reject(item.data);
            }
            else {
                var wm = void 0;
                if (item.data) {
                    wm = new WebMap({
                        portalItem: item.data
                    });
                }
                if (!wm) {
                    deferred.reject(new Error("ItemHelper:: WebMap does not have usable data."));
                }
                else {
                    deferred.resolve(wm);
                }
            }
            return deferred.promise;
        };
        ItemHelper.prototype.createWebScene = function (item) {
            var deferred = new Deferred();
            if (!item) {
                deferred.reject(new Error("ItemHelper:: WebScene data does not exist."));
            }
            else if (item.data instanceof Error) {
                deferred.reject(item.data);
            }
            else {
                var ws = void 0;
                if (item.data) {
                    ws = new WebScene({
                        portalItem: item.data
                    });
                }
                else if (item.json) {
                    ws = WebScene.fromJSON(item.json.itemData);
                    ws.portalItem = item.json.item;
                }
                if (!ws) {
                    deferred.reject(new Error("ItemHelper:: WebScene does not have usable data."));
                }
                else {
                    deferred.resolve(ws);
                }
            }
            return deferred.promise;
        };
        return ItemHelper;
    }());
    return es6_promise_1.Promise.resolve(new ItemHelper());
}).catch(function (err) {
    throw new Error(err);
}); };


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var esri_promise_1 = __webpack_require__(33);
var es6_promise_1 = __webpack_require__(26);
var DEFAULT_MARKER_SYMBOL = {
    url: "./symbols/mapPin.png",
    width: "36px",
    height: "19px",
    xoffset: "9px",
    yoffset: "18px"
};
exports.default = function () { return esri_promise_1.esriPromise([
    'esri/Camera', 'esri/geometry/Extent', 'esri/geometry/Point',
    'esri/widgets/Search', 'esri/Basemap', 'esri/layers/Layer',
    'esri/core/promiseUtils', 'esri/Graphic', 'esri/PopupTemplate', 'esri/symbols/PictureMarkerSymbol',
    'esri/views/MapView', 'esri/views/SceneView'
]).then(function (_a) {
    var Camera = _a[0], Extent = _a[1], Point = _a[2], Search = _a[3], Basemap = _a[4], Layer = _a[5], promiseList = _a[6], Graphic = _a[7], PopupTemplate = _a[8], PictureMarkerSymbol = _a[9], MapView = _a[10], SceneView = _a[11];
    var UrlParamHelper = (function () {
        function UrlParamHelper() {
        }
        UrlParamHelper.prototype.getViewProperties = function (config) {
            var viewProperties = {};
            if (config.components) {
                viewProperties.ui = {
                    components: config.components.split(",")
                };
            }
            var camera = this.viewPointStringToCamera(config.viewpoint);
            if (camera) {
                viewProperties.camera = camera;
            }
            var center = this.centerStringToPoint(config.center);
            if (center) {
                viewProperties.center = center;
            }
            var level = this.levelStringToLevel(config.level);
            if (level) {
                viewProperties.zoom = level;
            }
            var extent = this.extentStringToExtent(config.extent);
            if (extent) {
                viewProperties.extent = extent;
            }
            return viewProperties;
        };
        UrlParamHelper.prototype.addToView = function (view, config, searchWidget) {
            this.addMarkerToView(view, config.marker);
            this.find(view, config.find, searchWidget);
            this.setBasemapOnView(view, config.basemapUrl, config.basemapReferenceUrl);
        };
        UrlParamHelper.prototype.find = function (view, findString, searchWidget) {
            if (findString) {
                if (searchWidget) {
                    searchWidget.search(findString);
                }
                else {
                    searchWidget = new Search({
                        view: view
                    });
                    searchWidget.search(findString);
                }
                return searchWidget;
            }
        };
        UrlParamHelper.prototype.setBasemapOnView = function (view, basemapUrl, basemapReferenceUrl) {
            if (basemapUrl && view) {
                var pl = promiseList.eachAlways({
                    baseLayer: Layer.fromArcGISServerUrl({
                        url: basemapUrl
                    }),
                    referenceLayer: Layer.fromArcGISServerUrl({
                        url: basemapReferenceUrl
                    })
                });
                pl.then(function (response) {
                    if (response.baseLayer) {
                        var basemapOptions = {
                            baseLayers: response.baseLayer,
                            referenceLayers: null
                        };
                        if (response.referenceLayer) {
                            basemapOptions.referenceLayers = response.referenceLayer;
                        }
                        view.map.basemap = new Basemap(basemapOptions);
                    }
                });
            }
        };
        UrlParamHelper.prototype.viewPointStringToCamera = function (viewpointParamString) {
            var viewpointArray = viewpointParamString && viewpointParamString.split(";");
            if (!viewpointArray || !viewpointArray.length) {
                return;
            }
            else {
                var cameraString = "";
                var tiltHeading = "";
                for (var i = 0; i < viewpointArray.length; i++) {
                    if (viewpointArray[i].indexOf("cam:") !== -1) {
                        cameraString = viewpointArray[i];
                    }
                    else {
                        tiltHeading = viewpointArray[i];
                    }
                }
                if (cameraString !== "") {
                    cameraString = cameraString.substr(4, cameraString.length - 4);
                    var positionArray = cameraString.split(",");
                    if (positionArray.length >= 3) {
                        var x = 0, y = 0, z = 0;
                        x = parseFloat(positionArray[0]);
                        y = parseFloat(positionArray[1]);
                        z = parseFloat(positionArray[2]);
                        var wkid = 4326;
                        if (positionArray.length === 4) {
                            wkid = parseInt(positionArray[3], 10);
                        }
                        var cameraPosition = new Point({
                            x: x,
                            y: y,
                            z: z,
                            spatialReference: {
                                wkid: wkid
                            }
                        });
                        var heading = 0, tilt = 0;
                        if (tiltHeading !== "") {
                            var tiltHeadingArray = tiltHeading.split(",");
                            if (tiltHeadingArray.length >= 0) {
                                heading = parseFloat(tiltHeadingArray[0]);
                                if (tiltHeadingArray.length > 1) {
                                    tilt = parseFloat(tiltHeadingArray[1]);
                                }
                            }
                        }
                        var camera = new Camera({
                            position: cameraPosition,
                            heading: heading,
                            tilt: tilt
                        });
                        return camera;
                    }
                }
            }
        };
        UrlParamHelper.prototype.extentStringToExtent = function (extentString) {
            if (extentString) {
                //?extent=-13054125.21,4029134.71,-13032684.63,4041785.04,102100 or ?extent=-13054125.21;4029134.71;-13032684.63;4041785.04;102100
                //?extent=-117.2672,33.9927,-117.0746,34.1064 or ?extent=-117.2672;33.9927;-117.0746;34.1064
                var extentArray = this._splitArray(extentString);
                if (extentArray.length === 4 || extentArray.length === 5) {
                    var xmin = parseFloat(extentArray[0]), ymin = parseFloat(extentArray[1]), xmax = parseFloat(extentArray[2]), ymax = parseFloat(extentArray[3]);
                    if (!isNaN(xmin) && !isNaN(ymin) && !isNaN(xmax) && !isNaN(ymax)) {
                        var wkid = 4326;
                        if (extentArray.length === 5 && !isNaN(extentArray[4])) {
                            wkid = parseInt(extentArray[4], 10);
                        }
                        var ext = new Extent({
                            xmin: xmin,
                            ymin: ymin,
                            xmax: xmax,
                            ymax: ymax,
                            spatialReference: {
                                wkid: wkid
                            }
                        });
                        return ext;
                    }
                }
            }
        };
        UrlParamHelper.prototype.centerStringToPoint = function (centerString) {
            //?center=-13044705.25,4036227.41,102113&level=12 or ?center=-13044705.25;4036227.41;102113&level=12
            //?center=-117.1825,34.0552&level=12 or ?center=-117.1825;34.0552&level=12
            if (centerString) {
                var centerArray = this._splitArray(centerString);
                if (centerArray.length === 2 || centerArray.length === 3) {
                    var x = parseFloat(centerArray[0]);
                    var y = parseFloat(centerArray[1]);
                    if (isNaN(x) || isNaN(y)) {
                        x = parseFloat(centerArray[0]);
                        y = parseFloat(centerArray[1]);
                    }
                    if (!isNaN(x) && !isNaN(y)) {
                        var wkid = 4326;
                        if (centerArray.length === 3 && !isNaN(centerArray[2])) {
                            wkid = parseInt(centerArray[2], 10);
                        }
                        var point = new Point({
                            x: x,
                            y: y,
                            spatialReference: {
                                wkid: wkid
                            }
                        });
                        return point;
                    }
                }
            }
        };
        UrlParamHelper.prototype.levelStringToLevel = function (levelString) {
            return levelString && parseInt(levelString, 10);
        };
        UrlParamHelper.prototype.addMarkerToView = function (view, markerString) {
            // ?marker=-117;34;4326;My%20Title;http%3A//www.daisysacres.com/images/daisy_icon.gif;My%20location&level=10
            // ?marker=-117,34,4326,My%20Title,http%3A//www.daisysacres.com/images/daisy_icon.gif,My%20location&level=10
            // ?marker=-13044705.25,4036227.41,102100,My%20Title,http%3A//www.daisysacres.com/images/daisy_icon.gif,My%20location&level=10
            // ?marker=-117,34,,My%20Title,http%3A//www.daisysacres.com/images/daisy_icon.gif,My%20location&level=10
            // ?marker=-117,34,,,,My%20location&level=10
            // ?marker=-117,34&level=10
            // ?marker=10406557.402,6590748.134,2526
            if (markerString) {
                var markerArray = this._splitArray(markerString);
                if (markerArray.length >= 2 &&
                    !isNaN(markerArray[0]) &&
                    !isNaN(markerArray[1])) {
                    var x = parseFloat(markerArray[0]), y = parseFloat(markerArray[1]), content = markerArray[3], icon_url = markerArray[4], label = markerArray[5];
                    var wkid = 4326;
                    if (!isNaN(markerArray[2])) {
                        wkid = parseInt(markerArray[2], 10);
                    }
                    var symbolOptions = void 0;
                    if (icon_url) {
                        symbolOptions = {
                            url: icon_url,
                            height: "32px",
                            width: "32px"
                        };
                    }
                    else {
                        symbolOptions = DEFAULT_MARKER_SYMBOL;
                    }
                    var markerSymbol = new PictureMarkerSymbol(symbolOptions);
                    var point = new Point({
                        "x": x,
                        "y": y,
                        "spatialReference": {
                            "wkid": wkid
                        }
                    });
                    var popupTemplate = null;
                    if (content || label) {
                        popupTemplate = new PopupTemplate({
                            "title": label || null,
                            "content": content || null
                        });
                    }
                    var graphic = new Graphic({
                        geometry: point,
                        symbol: markerSymbol,
                        popupTemplate: popupTemplate
                    });
                    if (graphic) {
                        view.graphics.add(graphic);
                        // view.goTo(graphic);
                    }
                }
            }
        };
        UrlParamHelper.prototype._splitArray = function (value) {
            var splitValues;
            if (value) {
                splitValues = value.split(";");
                if (splitValues.length === 1) {
                    splitValues = value.split(",");
                }
            }
            return splitValues;
        };
        return UrlParamHelper;
    }());
    return es6_promise_1.Promise.resolve(new UrlParamHelper());
}).catch(function (err) {
    throw new Error(err);
}); };


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var esri_promise_1 = __webpack_require__(33);
var es6_promise_1 = __webpack_require__(26);
var TAGS_RE = /<\/?[^>]+>/g;
var URL_RE = /([^&=]+)=?([^&]*)(?:&+|$)/g;
var SHARING_PATH = "/sharing";
var ESRI_PROXY_PATH = "/sharing/proxy";
var ESRI_APPS_PATH = "/apps/";
var ESRI_HOME_PATH = "/home/";
var RTL_LANGS = ["ar", "he"];
var LTR = "ltr";
var RTL = "rtl";
var LOCALSTORAGE_PREFIX = "boilerplate_config_";
var DEFAULT_URL_PARAM = "default";
exports.default = function (appSettings, boilerSettings) { return esri_promise_1.esriPromise([
    'dojo/_base/kernel', 'dojo/_base/lang', 'dojo/Deferred',
    'esri/config', 'esri/core/promiseUtils',
    'esri/identity/IdentityManager', 'esri/identity/OAuthInfo',
    'esri/portal/Portal', 'esri/portal/PortalItem', 'esri/portal/PortalQueryParams',
    'dojo/text!config/demoWebMap.json', 'dojo/text!config/demoWebScene.json'
]).then(function (_a) {
    var kernel = _a[0], lang = _a[1], Deferred = _a[2], esriConfig = _a[3], promiseUtils = _a[4], IdentityManager = _a[5], OAuthInfo = _a[6], Portal = _a[7], PortalItem = _a[8], PortalQueryParams = _a[9], webmapText = _a[10], websceneText = _a[11];
    var Boilerplate = (function () {
        function Boilerplate(applicationConfigJSON, boilerplateSettings) {
            this.settings = null;
            this.config = null;
            this.results = null;
            this.portal = null;
            this.direction = null;
            this.locale = null;
            this.units = null;
            this.userPrivileges = null;
            this.settings = lang.mixin({
                webscene: {},
                webmap: {},
                group: {},
                portal: {},
                urlItems: []
            }, boilerplateSettings);
            this.config = applicationConfigJSON;
            this.results = {};
        }
        Boilerplate.prototype.queryGroupItems = function () {
            var _this = this;
            var deferred;
            // Get details about the specified web scene. If the web scene is not shared publicly users will
            // be prompted to log-in by the Identity Manager.
            deferred = new Deferred();
            if (!this.settings.group.fetchItems || !this.config.group) {
                deferred.resolve();
            }
            else {
                var defaultParams = {
                    query: "group:\"{groupid}\" AND -type:\"Code Attachment\"",
                    sortField: "modified",
                    sortOrder: "desc",
                    num: 9,
                    start: 1
                };
                var paramOptions = lang.mixin(defaultParams, this.settings.group.itemParams);
                // place group ID
                if (paramOptions.query) {
                    paramOptions.query = lang.replace(paramOptions.query, {
                        groupid: this.config.group
                    });
                }
                // group params
                var params = new PortalQueryParams(paramOptions);
                this.portal.queryItems(params).then(function (response) {
                    if (!_this.results.group) {
                        _this.results.group = {};
                    }
                    _this.results.group.itemsData = response;
                    deferred.resolve(_this.results.group);
                }, function (error) {
                    if (!error) {
                        error = new Error("Boilerplate:: Error retrieving group items.");
                    }
                    if (!_this.results.group) {
                        _this.results.group = {};
                    }
                    _this.results.group.itemsData = error;
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        };
        Boilerplate.prototype.init = function () {
            var _this = this;
            // Set the web scene and appid if they exist but ignore other url params.
            // Additional url parameters may be defined by the application but they need to be mixed in
            // to the config object after we retrieve the application configuration info. As an example,
            // we'll mix in some commonly used url parameters after
            // the application configuration has been applied so that the url parameters overwrite any
            // configured settings. It's up to the application developer to update the application to take
            // advantage of these parameters.
            // This demonstrates how to handle additional custom url parameters. For example
            // if you want users to be able to specify lat/lon coordinates that define the map's center or
            // specify an alternate basemap via a url parameter.
            // If these options are also configurable these updates need to be added after any
            // application default and configuration info has been applied. Currently these values
            // (center, basemap, theme) are only here as examples and can be removed if you don't plan on
            // supporting additional url parameters in your application.
            this.results.urlParams = {
                config: this._getUrlParamValues(this.settings.urlItems)
            };
            // config defaults <- standard url params
            // we need the web scene, appid,and oauthappid to query for the data
            this._mixinAllConfigs();
            // Define the portalUrl and other default values like the proxy.
            // The portalUrl defines where to search for the web map and application content. The
            // default value is arcgis.com.
            this._initializeApplication();
            // determine boilerplate language properties
            this._setLangProps();
            // check if signed in. Once we know if we're signed in, we can get data and create a portal if needed.
            return this._checkSignIn().always(function () {
                // execute these tasks async
                return promiseUtils.eachAlways([
                    // get application data
                    _this._queryApplicationItem(),
                    // get org data
                    _this._queryPortal()
                ]).always(function () {
                    // gets a temporary config from the users local storage
                    _this.results.localStorageConfig = _this._getLocalConfig();
                    // mixin all new settings from org and app
                    _this._mixinAllConfigs();
                    // let's set up a few things
                    _this._completeApplication();
                    // then execute these async
                    return promiseUtils.eachAlways([
                        // webmap item
                        _this._queryWebMapItem(),
                        // webscene item
                        _this._queryWebSceneItem(),
                        // group information
                        _this._queryGroupInfo(),
                        // items within a specific group
                        _this.queryGroupItems()
                    ]).always(function () {
                        return {
                            settings: _this.settings,
                            config: _this.config,
                            results: _this.results,
                            portal: _this.portal,
                            direction: _this.direction,
                            locale: _this.locale,
                            units: _this.units,
                            userPrivileges: _this.userPrivileges
                        };
                    });
                });
            });
        };
        Boilerplate.prototype._getLocalConfig = function () {
            var appid = this.config.appid;
            if (window.localStorage && appid && this.settings.localConfig.fetch) {
                var lsItem = localStorage.getItem(LOCALSTORAGE_PREFIX + appid);
                if (lsItem) {
                    var config = JSON.parse(lsItem);
                    if (config) {
                        return config;
                    }
                }
            }
        };
        Boilerplate.prototype._queryWebMapItem = function () {
            var _this = this;
            var deferred;
            // Get details about the specified web map. If the web map is not shared publicly users will
            // be prompted to log-in by the Identity Manager.
            deferred = new Deferred();
            if (!this.settings.webmap.fetch) {
                deferred.resolve();
            }
            else {
                // Use local web map instead of portal web map
                if (this.settings.webmap.useLocal) {
                    var json = JSON.parse(webmapText);
                    this.results.webMapItem = {
                        json: json
                    };
                    deferred.resolve(this.results.webMapItem);
                }
                else if (this.config.webmap) {
                    var mapItem = new PortalItem({
                        id: this.config.webmap
                    }).load();
                    mapItem.then(function (itemData) {
                        _this.results.webMapItem = {
                            data: itemData
                        };
                        deferred.resolve(_this.results.webMapItem);
                    }, function (error) {
                        if (!error) {
                            error = new Error("Boilerplate:: Error retrieving webmap item.");
                        }
                        _this.results.webMapItem = {
                            data: error
                        };
                        deferred.reject(error);
                    });
                }
                else {
                    deferred.resolve();
                }
            }
            return deferred.promise;
        };
        Boilerplate.prototype._queryGroupInfo = function () {
            var _this = this;
            var deferred;
            // Get details about the specified group. If the group is not shared publicly users will
            // be prompted to log-in by the Identity Manager.
            deferred = new Deferred();
            if (!this.settings.group.fetchInfo || !this.config.group) {
                deferred.resolve();
            }
            else {
                // group params
                var params = new PortalQueryParams({
                    query: "id:\"" + this.config.group + "\""
                });
                this.portal.queryGroups(params).then(function (response) {
                    if (!_this.results.group) {
                        _this.results.group = {};
                    }
                    _this.results.group.infoData = response;
                    deferred.resolve(_this.results.group);
                }, function (error) {
                    if (!error) {
                        error = new Error("Boilerplate:: Error retrieving group info.");
                    }
                    if (!_this.results.group) {
                        _this.results.group = {};
                    }
                    _this.results.group.infoData = error;
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        };
        Boilerplate.prototype._queryWebSceneItem = function () {
            var _this = this;
            var deferred, sceneItem;
            // Get details about the specified web scene. If the web scene is not shared publicly users will
            // be prompted to log-in by the Identity Manager.
            deferred = new Deferred();
            if (!this.settings.webscene.fetch) {
                deferred.resolve();
            }
            else {
                // Use local web scene instead of portal web scene
                if (this.settings.webscene.useLocal) {
                    // get web scene js file
                    var json = JSON.parse(websceneText);
                    this.results.webSceneItem = {
                        json: json
                    };
                    deferred.resolve(this.results.webSceneItem);
                }
                else if (this.config.webscene) {
                    sceneItem = new PortalItem({
                        id: this.config.webscene
                    }).load();
                    sceneItem.then(function (itemData) {
                        _this.results.webSceneItem = {
                            data: itemData
                        };
                        deferred.resolve(_this.results.webSceneItem);
                    }, function (error) {
                        if (!error) {
                            error = new Error("Boilerplate:: Error retrieving webscene item.");
                        }
                        _this.results.webSceneItem = {
                            data: error
                        };
                        deferred.reject(error);
                    });
                }
                else {
                    deferred.resolve();
                }
            }
            return deferred.promise;
        };
        Boilerplate.prototype._queryApplicationItem = function () {
            var _this = this;
            // Get the application configuration details using the application id. When the response contains
            // itemData.values then we know the app contains configuration information. We'll use these values
            // to overwrite the application defaults.
            var deferred = new Deferred();
            if (!this.config.appid) {
                deferred.resolve();
            }
            else {
                var appItem = new PortalItem({
                    id: this.config.appid
                }).load();
                appItem.then(function (itemData) {
                    itemData.fetchData().then(function (data) {
                        var cfg = {};
                        if (data && data.values) {
                            // get app config values - we'll merge them with config later.
                            cfg = data.values;
                        }
                        // get the extent for the application item. This can be used to override the default web map extent
                        if (itemData.extent) {
                            cfg.application_extent = itemData.extent;
                        }
                        // get any app proxies defined on the application item
                        if (itemData.appProxies) {
                            var layerMixins = itemData.appProxies.map(function (p) {
                                return {
                                    "url": p.sourceUrl,
                                    "mixin": {
                                        "url": p.proxyUrl
                                    }
                                };
                            });
                            cfg.layerMixins = layerMixins;
                        }
                        _this.results.applicationItem = {
                            data: itemData,
                            config: cfg
                        };
                        deferred.resolve(_this.results.applicationItem);
                    }, function (error) {
                        if (!error) {
                            error = new Error("Boilerplate:: Error retrieving application configuration data.");
                        }
                        _this.results.applicationItem = {
                            data: error,
                            config: null
                        };
                        deferred.reject(error);
                    });
                }, function (error) {
                    if (!error) {
                        error = new Error("Boilerplate:: Error retrieving application configuration.");
                    }
                    _this.results.applicationItem = {
                        data: error,
                        config: null
                    };
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        };
        Boilerplate.prototype._queryPortal = function () {
            var _this = this;
            var deferred = new Deferred();
            if (!this.settings.portal.fetch) {
                deferred.resolve();
            }
            else {
                // Query the ArcGIS.com organization. This is defined by the portalUrl that is specified. For example if you
                // are a member of an org you'll want to set the portalUrl to be http://<your org name>.arcgis.com. We query
                // the organization by making a self request to the org url which returns details specific to that organization.
                // Examples of the type of information returned are custom roles, units settings, helper services and more.
                // If this fails, the application will continue to function
                var portal = new Portal().load();
                this.portal = portal;
                portal.then(function (response) {
                    if (_this.settings.webTierSecurity) {
                        var trustedHost = void 0;
                        if (response.authorizedCrossOriginDomains && response.authorizedCrossOriginDomains.length > 0) {
                            for (var i = 0; i < response.authorizedCrossOriginDomains.length; i++) {
                                trustedHost = response.authorizedCrossOriginDomains[i];
                                // add if trusted host is not null, undefined, or empty string
                                if (_this._isDefined(trustedHost) && trustedHost.length > 0) {
                                    esriConfig.request.corsEnabledServers.push({
                                        host: trustedHost,
                                        withCredentials: true
                                    });
                                }
                            }
                        }
                    }
                    // set boilerplate units
                    var units = "metric";
                    if (response.user && response.user.units) {
                        units = response.user.units;
                    }
                    else if (response.units) {
                        units = response.units;
                    }
                    else if ((response.user && response.user.region && response.user.region === "US") || (response.user && !response.user.region && response.region === "US") || (response.user && !response.user.region && !response.region) || (!response.user && response.ipCntryCode === "US") || (!response.user && !response.ipCntryCode && kernel.locale === "en-us")) {
                        // use feet/miles only for the US and if nothing is set for a user
                        units = "english";
                    }
                    _this.units = units;
                    // are any custom roles defined in the organization?
                    if (response.user && _this._isDefined(response.user.roleId)) {
                        if (response.user.privileges) {
                            _this.userPrivileges = response.user.privileges;
                        }
                    }
                    // set data for portal on boilerplate
                    _this.results.portal = {
                        data: response
                    };
                    deferred.resolve(_this.results.portal);
                }, function (error) {
                    if (!error) {
                        error = new Error("Boilerplate:: Error retrieving organization information.");
                    }
                    _this.results.portal = {
                        data: error
                    };
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        };
        Boilerplate.prototype._overwriteExtent = function (itemInfo, extent) {
            var item = itemInfo && itemInfo.item;
            if (item && item.extent) {
                item.extent = [
                    [
                        parseFloat(extent[0][0]), parseFloat(extent[0][1])
                    ],
                    [
                        parseFloat(extent[1][0]), parseFloat(extent[1][1])
                    ]
                ];
            }
        };
        Boilerplate.prototype._completeApplication = function () {
            // ArcGIS.com allows you to set an application extent on the application item. Overwrite the
            // existing extents with the application item extent when set.
            var applicationExtent = this.config.application_extent;
            var results = this.results;
            if (this.config.appid && applicationExtent && applicationExtent.length > 0) {
                this._overwriteExtent(results.webSceneItem.data, applicationExtent);
                this._overwriteExtent(results.webMapItem.data, applicationExtent);
            }
            // get helper services
            var configHelperServices = this.config.helperServices;
            var portalHelperServices = this.portal && this.portal.helperServices;
            // see if config has a geometry service
            var configGeometryUrl = configHelperServices && configHelperServices.geometry && configHelperServices.geometry.url;
            // seee if portal has a geometry service
            var portalGeometryUrl = portalHelperServices && portalHelperServices.geometry && portalHelperServices.geometry.url;
            // use the portal geometry service or config geometry service
            var geometryUrl = portalGeometryUrl || configGeometryUrl;
            if (geometryUrl) {
                // set the esri config to use the geometry service
                esriConfig.geometryServiceUrl = geometryUrl;
            }
            if ((!this.config.webmap || this.config.webmap === DEFAULT_URL_PARAM) && this.settings.defaultWebmap) {
                this.config.webmap = this.settings.defaultWebmap;
            }
            if ((!this.config.webscene || this.config.webscene === DEFAULT_URL_PARAM) && this.settings.defaultWebscene) {
                this.config.webscene = this.settings.defaultWebscene;
            }
            if ((!this.config.group || this.config.group === DEFAULT_URL_PARAM) && this.settings.defaultGroup) {
                this.config.group = this.settings.defaultGroup;
            }
        };
        Boilerplate.prototype._setLangProps = function () {
            var direction = LTR;
            RTL_LANGS.forEach(function (l) {
                if (kernel.locale.indexOf(l) !== -1) {
                    direction = RTL;
                }
            });
            // set boilerplate language direction
            this.direction = direction;
            // set boilerplate langauge locale
            this.locale = kernel.locale;
        };
        Boilerplate.prototype._mixinAllConfigs = function () {
            lang.mixin(this.config, this.results.applicationItem ? this.results.applicationItem.config : null, this.results.localStorageConfig, this.results.urlParams ? this.results.urlParams.config : null);
        };
        Boilerplate.prototype._getUrlParamValues = function (items) {
            // retrieves only the items specified from the URL object.
            // Gets parameters from the URL, convert them to an object and remove HTML tags.
            var urlObject = this._createUrlParamsObject();
            var obj = {};
            if (urlObject && items && items.length) {
                for (var i = 0; i < items.length; i++) {
                    var item = urlObject[items[i]];
                    if (item) {
                        if (typeof item === "string") {
                            switch (item.toLowerCase()) {
                                case "true":
                                    obj[items[i]] = true;
                                    break;
                                case "false":
                                    obj[items[i]] = false;
                                    break;
                                default:
                                    obj[items[i]] = item;
                            }
                        }
                        else {
                            obj[items[i]] = item;
                        }
                    }
                }
            }
            return obj;
        };
        Boilerplate.prototype._createUrlParamsObject = function () {
            // retrieve url parameters. Templates all use url parameters to determine which arcgis.com
            // resource to work with.
            // Scene templates use the webscene param to define the scene to display
            // appid is the id of the application based on the template. We use this
            // id to retrieve application specific configuration information. The configuration
            // information will contain the values the  user selected on the template configuration
            // panel.
            return this._stripObjectTags(this._urlToObject());
        };
        Boilerplate.prototype._initializeApplication = function () {
            // If this app is hosted on an Esri environment.
            if (this.settings.esriEnvironment) {
                var appLocation = void 0, instance = void 0;
                // Check to see if the app is hosted or a portal. If the app is hosted or a portal set the
                // portalUrl and the proxy. Otherwise use the portalUrl set it to arcgis.com.
                // We know app is hosted (or portal) if it has /apps/ or /home/ in the url.
                appLocation = location.pathname.indexOf(ESRI_APPS_PATH);
                if (appLocation === -1) {
                    appLocation = location.pathname.indexOf(ESRI_HOME_PATH);
                }
                // app is hosted and no portalUrl is defined so let's figure it out.
                if (appLocation !== -1) {
                    // hosted or portal
                    instance = location.pathname.substr(0, appLocation); //get the portal instance name
                    this.config.portalUrl = "https://" + location.host + instance;
                    this.config.proxyUrl = "https://" + location.host + instance + ESRI_PROXY_PATH;
                }
            }
            esriConfig.portalUrl = this.config.portalUrl;
            // Define the proxy url for the app
            if (this.config.proxyUrl) {
                esriConfig.request.proxyUrl = this.config.proxyUrl;
            }
        };
        Boilerplate.prototype._checkSignIn = function () {
            var deferred, signedIn, oAuthInfo;
            deferred = new Deferred();
            //If there's an oauth appid specified register it
            if (this.config.oauthappid) {
                oAuthInfo = new OAuthInfo({
                    appId: this.config.oauthappid,
                    portalUrl: this.config.portalUrl,
                    popup: true
                });
                IdentityManager.registerOAuthInfos([oAuthInfo]);
            }
            // check sign-in status
            signedIn = IdentityManager.checkSignInStatus(this.config.portalUrl + SHARING_PATH);
            // resolve regardless of signed in or not.
            signedIn.always(deferred.resolve);
            return deferred.promise;
        };
        Boilerplate.prototype._isDefined = function (value) {
            return (value !== undefined) && (value !== null);
        };
        Boilerplate.prototype._stripStringTags = function (data) {
            return data.replace(TAGS_RE, "");
        };
        Boilerplate.prototype._stripObjectTags = function (data) {
            return Object.keys(data).reduce(function (p, c, i) {
                var obj = p;
                if (typeof data[c] === "string") {
                    obj[c] === c.replace(TAGS_RE, "");
                }
                else {
                    obj[c] === c;
                }
                return obj;
            }, {});
        };
        Boilerplate.prototype._urlToObject = function () {
            var query = (window.location.search || "?").substr(1), map = {};
            query.replace(URL_RE, function (match, key, value) {
                map[key] = decodeURIComponent(value);
                return '';
            });
            return map;
        };
        return Boilerplate;
    }());
    return es6_promise_1.Promise.resolve(new Boilerplate(appSettings, boilerSettings));
}).catch(function (err) {
    throw new Error(err);
}); };


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var stache = __webpack_require__(34);
var mustacheCore = __webpack_require__(28);
var getIntermediateAndImports = __webpack_require__(46);



var source = module.exports = "<div class=\"property-table\">\r\n    <table class=\"table table-striped table-condensed\">\r\n        <thead>\r\n            <tr>\r\n                <th>Field</th>\r\n                <th>Value</th>\r\n            </tr>\r\n        </thead>\r\n        <tbody>\r\n            {{#each fields as field}}\r\n                <tr>\r\n                    <td>{{field.alias}}</td>\r\n                    <td class=\"{{field.classes}}\">\r\n                      {{>field.displayTemplate}}\r\n                    </td>\r\n                </tr>\r\n            {{/each}}\r\n        </tbody>\r\n    </table>\r\n</div>\r\n";;
var intermediateAndImports = getIntermediateAndImports(source);

var intermediate = intermediateAndImports.intermediate;
var renderer = stache(intermediate);

module.exports = function (scope, options, nodeList) {
    var moduleOptions = { module: module };

    if (!(options instanceof mustacheCore.Options)) {
        options = new mustacheCore.Options(options || {});
    }

    return renderer(scope, options.add(moduleOptions), nodeList);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(71)(module)))

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var stache = __webpack_require__(34);
var mustacheCore = __webpack_require__(28);
var getIntermediateAndImports = __webpack_require__(46);



var source = module.exports = "<h1>Property Table Demo</h1>\n<h2>Simple: </h2>\n<property-table {object}=\"data\" />\n\n<br />\n<div class=\"divider\" />\n\n<h2>Customized: </h2>\n<property-table {object}=\"data\" {fields}=\"fields\" />\n";;
var intermediateAndImports = getIntermediateAndImports(source);

var intermediate = intermediateAndImports.intermediate;
var renderer = stache(intermediate);

module.exports = function (scope, options, nodeList) {
    var moduleOptions = { module: module };

    if (!(options instanceof mustacheCore.Options)) {
        options = new mustacheCore.Options(options || {});
    }

    return renderer(scope, options.add(moduleOptions), nodeList);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(71)(module)))

/***/ }),
/* 79 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

/* jshint -W079 */
// # can/component/component.js
//
// This implements the `Component` which allows you to create widgets
// that use a template, a view-model and custom tags.
//
// `Component` implements most of it's functionality in the `Component.setup`
// and the `Component.prototype.setup` functions.
//
// `Component.setup` prepares everything needed by the `Component.prototype.setup`
// to hookup the component.
var ComponentControl = __webpack_require__(81);
var namespace = __webpack_require__(2);

var Construct = __webpack_require__(27);
var stacheBindings = __webpack_require__(86);
var Scope = __webpack_require__(42);
var viewCallbacks = __webpack_require__(40);
var nodeLists = __webpack_require__(20);

var domData = __webpack_require__(10);
var domMutate = __webpack_require__(30);
var getChildNodes = __webpack_require__(16);
var domDispatch = __webpack_require__(17);
var types = __webpack_require__(0);
var string = __webpack_require__(19);

var canEach = __webpack_require__(1);
var isFunction = __webpack_require__(23);
var canLog = __webpack_require__(18);

__webpack_require__(62);
__webpack_require__(48);
__webpack_require__(67);

/**
 * @add Component
 */
var Component = Construct.extend(

	// ## Static
	/**
	 * @static
	 */

	{
		// ### setup
		//
		// When a component is extended, this sets up the component's internal constructor
		// functions and templates for later fast initialization.
		setup: function() {
			Construct.setup.apply(this, arguments);

			// When `Component.setup` function is ran for the first time, `Component` doesn't exist yet
			// which ensures that the following code is ran only in constructors that extend `Component`.
			if (Component) {
				var self = this;

				// Define a control using the `events` prototype property.
				this.Control = ComponentControl.extend(this.prototype.events);

				// Look at viewModel, scope, and ViewModel properties and set one of:
				//  - this.viewModelHandler
				//  - this.ViewModel
				//  - this.viewModelInstance
				var protoViewModel = this.prototype.viewModel || this.prototype.scope;

				if(protoViewModel && this.prototype.ViewModel) {
					throw new Error("Cannot provide both a ViewModel and a viewModel property");
				}
				var vmName = string.capitalize( string.camelize(this.prototype.tag) )+"VM";
				if(this.prototype.ViewModel) {
					if(typeof this.prototype.ViewModel === "function") {
						this.ViewModel = this.prototype.ViewModel;
					} else {
						this.ViewModel = types.DefaultMap.extend(vmName, this.prototype.ViewModel);
					}
				} else {

					if(protoViewModel) {
						if(typeof protoViewModel === "function") {
							if(types.isMapLike(protoViewModel.prototype)) {
								this.ViewModel = protoViewModel;
							} else {
								this.viewModelHandler = protoViewModel;
							}
						} else {
							if(types.isMapLike(protoViewModel)) {
								//!steal-remove-start
								canLog.warn("can-component: "+this.prototype.tag+" is sharing a single map across all component instances");
								//!steal-remove-end
								this.viewModelInstance = protoViewModel;
							} else {
								this.ViewModel = types.DefaultMap.extend(vmName,protoViewModel);
							}
						}
					} else {
						this.ViewModel = types.DefaultMap.extend(vmName,{});
					}
				}

				// Convert the template into a renderer function.
				if (this.prototype.template) {
					//!steal-remove-start
					canLog.warn('can-component.prototype.template: is deprecated and will be removed in a future release. Use can-component.prototype.view');
					//!steal-remove-end
					this.renderer = this.prototype.template;
				}
				if (this.prototype.view) {
					this.renderer = this.prototype.view;
				}

				// Register this component to be created when its `tag` is found.
				viewCallbacks.tag(this.prototype.tag, function(el, options) {
					new self(el, options);
				});
			}

		}
	}, {
		// ## Prototype
		/**
		 * @prototype
		 */
		// ### setup
		// When a new component instance is created, setup bindings, render the template, etc.
		setup: function(el, componentTagData) {
			var component = this;
			// If a template is not provided, we fall back to
			// dynamic scoping regardless of settings.
			var lexicalContent = (
					(typeof this.leakScope === "undefined" ? true : !this.leakScope) &&
					!!(this.template || this.view)
				);
			// an array of teardown stuff that should happen when the element is removed
			var teardownFunctions = [];
			var initialViewModelData = {};
			var callTeardownFunctions = function() {
					for (var i = 0, len = teardownFunctions.length; i < len; i++) {
						teardownFunctions[i]();
					}
				};
			var setupBindings = !domData.get.call(el, "preventDataBindings");
			var viewModel, frag;

			// ## Scope
			var teardownBindings;
			if (setupBindings) {
				var setupFn = componentTagData.setupBindings ||
					function(el, callback, data){
						return stacheBindings.behaviors.viewModel(el, componentTagData,
																											callback, data);
					};
				teardownBindings = setupFn(el, function(initialViewModelData) {

					var ViewModel = component.constructor.ViewModel,
						viewModelHandler = component.constructor.viewModelHandler,
						viewModelInstance = component.constructor.viewModelInstance;

					if(viewModelHandler) {
						var scopeResult = viewModelHandler.call(component, initialViewModelData, componentTagData.scope, el);
						if (types.isMapLike( scopeResult ) ) {
							// If the function returns a can.Map, use that as the viewModel
							viewModelInstance = scopeResult;
						} else if ( types.isMapLike(scopeResult.prototype) ) {
							// If `scopeResult` is of a `can.Map` type, use it to wrap the `initialViewModelData`
							ViewModel = scopeResult;
						} else {
							// Otherwise extend `can.Map` with the `scopeResult` and initialize it with the `initialViewModelData`
							ViewModel = types.DefaultMap.extend(scopeResult);
						}
					}

					if(ViewModel) {
						viewModelInstance = new component.constructor.ViewModel(initialViewModelData);
					}
					viewModel = viewModelInstance;
					return viewModelInstance;
				}, initialViewModelData);
			}

			// Set `viewModel` to `this.viewModel` and set it to the element's `data` object as a `viewModel` property
			this.viewModel = viewModel;

			domData.set.call(el, "viewModel", viewModel);
			domData.set.call(el, "preventDataBindings", true);

			// Create a real Scope object out of the viewModel property
			// The scope used to render the component's template.
			// However, if there is no template, the "light" dom is rendered with this anyway.
			var shadowScope;
			if (lexicalContent) {
				shadowScope = Scope.refsScope().add(this.viewModel, {
					viewModel: true
				});
			} else {
				// if this component has a template,
				// render the template with it's own Refs scope
				// otherwise, just add this component's viewModel.
				shadowScope = (this.constructor.renderer ?
						componentTagData.scope.add(new Scope.Refs()) :
						componentTagData.scope)
					.add(this.viewModel, {
						viewModel: true
					});
			}
			var options = {
					helpers: {}
				},
				addHelper = function(name, fn) {
					options.helpers[name] = function() {
						return fn.apply(viewModel, arguments);
					};
				};

			// ## Helpers

			// Setup helpers to callback with `this` as the component
			canEach(this.helpers || {}, function(val, prop) {
				if (isFunction(val)) {
					addHelper(prop, val);
				}
			});

			// ## `events` control

			// Create a control to listen to events
			this._control = new this.constructor.Control(el, {
				// Pass the viewModel to the control so we can listen to it's changes from the controller.
				scope: this.viewModel,
				viewModel: this.viewModel,
				destroy: callTeardownFunctions
			});

			// ## Rendering

			// Keep a nodeList so we can kill any directly nested nodeLists within this component
			var nodeList = nodeLists.register([], function() {
				domDispatch.call(el, "beforeremove", [], false);
				if(teardownBindings) {
					teardownBindings();
				}
			}, componentTagData.parentNodeList || true, false);
			nodeList.expression = "<" + this.tag + ">";
			teardownFunctions.push(function() {
				nodeLists.unregister(nodeList);
			});

			// If this component has a template (that we've already converted to a renderer)
			if (this.constructor.renderer) {
				// If `options.tags` doesn't exist set it to an empty object.
				if (!options.tags) {
					options.tags = {};
				}

				// We need be alerted to when a <content> element is rendered so we can put the original contents of the widget in its place
				options.tags.content = function contentHookup(el, contentTagData) {
					// First check if there was content within the custom tag
					// otherwise, render what was within <content>, the default code.
					// `componentTagData.subtemplate` is the content inside this component
					var subtemplate = componentTagData.subtemplate || contentTagData.subtemplate,
						renderingLightContent = subtemplate === componentTagData.subtemplate;

					if (subtemplate) {

						// `contentTagData.options` is a viewModel of helpers where `<content>` was found, so
						// the right helpers should already be available.
						// However, `_tags.content` is going to point to this current content callback.  We need to
						// remove that so it will walk up the chain

						delete options.tags.content;

						// By default, light dom scoping is
						// dynamic. This means that any `{{foo}}`
						// bindings inside the "light dom" content of
						// the component will have access to the
						// internal viewModel. This can be overridden to be
						// lexical with the leakScope option.
						var lightTemplateData;
						if (renderingLightContent) {
							if (lexicalContent) {
								// render with the same scope the component was found within.
								lightTemplateData = componentTagData;
							} else {
								// render with the component's viewModel mixed in, however
								// we still want the outer refs to be used, NOT the component's refs
								// <component> {{some value }} </component>
								// To fix this, we
								// walk down the scope to the component's ref, clone scopes from that point up
								// use that as the new scope.
								lightTemplateData = {
									scope: contentTagData.scope.cloneFromRef(),
									options: contentTagData.options
								};
							}

						} else {
							// we are rendering default content so this content should
							// use the same scope as the <content> tag was found within.
							lightTemplateData = contentTagData;
						}

						if (contentTagData.parentNodeList) {
							var frag = subtemplate(lightTemplateData.scope, lightTemplateData.options, contentTagData.parentNodeList);
							nodeLists.replace([el], frag);
						} else {
							nodeLists.replace([el], subtemplate(lightTemplateData.scope, lightTemplateData.options));
						}

						// Restore the content tag so it could potentially be used again (as in lists)
						options.tags.content = contentHookup;
					}
				};
				// Render the component's template
				frag = this.constructor.renderer(shadowScope, componentTagData.options.add(options), nodeList);
			} else {
				// Otherwise render the contents between the element
				frag = componentTagData.subtemplate ?
					componentTagData.subtemplate(shadowScope, componentTagData.options.add(options), nodeList) :
					document.createDocumentFragment();

			}
			// Append the resulting document fragment to the element
			domMutate.appendChild.call(el, frag);

			// update the nodeList with the new children so the mapping gets applied
			nodeLists.update(nodeList, getChildNodes(el));
		}
	});



module.exports = namespace.Component = Component;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var Control = __webpack_require__(83);

var canEach = __webpack_require__(1);
var string = __webpack_require__(19);
var canCompute = __webpack_require__(9);
var observeReader = __webpack_require__(15);

// ## Helpers
// Attribute names to ignore for setting viewModel values.
var paramReplacer = /\{([^\}]+)\}/g;

var ComponentControl = Control.extend({
		// the lookup path - where templated keys will be looked up
		// change lookup to first look in the viewModel
		_lookup: function(options) {
			return [options.scope, options, window];
		},
		// strip strings that represent delegates from the key
		// viewModel.foo -> foo
		_removeDelegateFromKey: function (key) {
			return key.replace(/^(scope|^viewModel)\./, "");
		},
		// return whether the key is a delegate
		_isDelegate: function(options, key) {
			return key === 'scope' || key === 'viewModel';
		},
		// return the delegate object for a given key
		_getDelegate: function(options, key) {
			return options[key];
		},
		_action: function(methodName, options, controlInstance) {
			var hasObjectLookup;

			paramReplacer.lastIndex = 0;

			hasObjectLookup = paramReplacer.test(methodName);

			// If we don't have options (a `control` instance), we'll run this later.
			if (!controlInstance && hasObjectLookup) {
				return;
			} else {
				return Control._action.apply(this, arguments);
			}
		}
	},
	// Extend `events` with a setup method that listens to changes in `viewModel` and
	// rebinds all templated event handlers.
	{
		setup: function(el, options) {
			this.scope = options.scope;
			this.viewModel = options.viewModel;
			return Control.prototype.setup.call(this, el, options);
		},
		off: function() {
			// If `this._bindings` exists we need to go through it's `readyComputes` and manually
			// unbind `change` event listeners set by the controller.
			if (this._bindings) {
				canEach(this._bindings.readyComputes || {}, function(value) {
					value.compute.unbind("change", value.handler);
				});
			}
			// Call `Control.prototype.off` function on this instance to cleanup the bindings.
			Control.prototype.off.apply(this, arguments);
			this._bindings.readyComputes = {};
		},
		destroy: function() {
			Control.prototype.destroy.apply(this, arguments);
			if (typeof this.options.destroy === 'function') {
				this.options.destroy.apply(this, arguments);
			}
		}
	});

module.exports = ComponentControl;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// # can/compute/proto_compute (aka can.Compute)
//
// Allows the creation of observablue values. This
// is a prototype based version of [can.compute](compute.html).
//
// can.Computes come in different flavors:
//
// - [Getter / Setter functional computes](#setup-getter-setter-functional-computes).
// - [Property computes](#setup-property-computes).
// - [Setter computes](#setup-setter-computes).
// - [Async computes](#setup-async-computes).
// - [Settings computes](#setup-settings-computes).
// - [Simple value computes](#setup-simple-value-computes).
//
//
// can.Computes have public `.get`, `.set`, `.on`, and `.off` methods that call
// internal methods that are configured differently depending on what flavor of
// compute is being created.  Those methods are:
//
// - `_on(updater)` - Called the first time the compute is bound. This should bind to
//    any source observables.  When any of the source observables have changed, it should call
//    `updater(newVal, oldVal, batchNum)`.
//
// - `_off(updater)` - Called when the compute has no more event handlers.  This should unbind to any source observables.
// - `_get` - Called to get the current value of the compute.
// - `_set` - Called to set the value of the compute.
//
//
//
// Other internal flags and values:
// - `value` - the cached value
// - `_setUpdates` - if calling `_set` will have updated the cached value itself so `_get` does not need to be called.
// - `_canObserve` - if this compute can be observed.
// - `hasDependencies` - if this compute has source observable values.
var Observation = __webpack_require__(7);
var canEvent = __webpack_require__(4);
var eventLifecycle = __webpack_require__(58);
__webpack_require__(11);
var observeReader = __webpack_require__(15);
var getObject = __webpack_require__(52);
var setImmediate = __webpack_require__(53);

var CID = __webpack_require__(14);
var assign = __webpack_require__(3);
var types = __webpack_require__(0);
var isEmptyObject = __webpack_require__(22);
var canLog = __webpack_require__(18);

// ## can.Compute
// Checks the arguments and calls different setup methods.
var Compute = function(getterSetter, context, eventName, bindOnce) {
	CID(this, 'compute');

	var args = [];

	for(var i = 0, arglen = arguments.length; i < arglen; i++) {
		args[i] = arguments[i];
	}

	var contextType = typeof args[1];

	if (typeof args[0] === 'function') {
		// Getter/Setter functional computes.
		// `new can.Compute(function(){ ... })`
		this._setupGetterSetterFn(args[0], args[1], args[2], args[3]);
	} else if (args[1] !== undefined) {
		if (contextType === 'string' || contextType === 'number') {
			// Property computes.
			// `new can.Compute(object, propertyName[, eventName])`
			var isListLike = types.isListLike(args[0]);
			if(types.isMapLike( args[0] ) || isListLike) {
				var map = args[0];
				var propertyName = args[1];
				var mapGetterSetter = function(newValue){
					if(arguments.length) {
						observeReader.set(map,propertyName, newValue);
					} else {
						// forces length to be read
						if(isListLike) {
							observeReader.get(map,"length");
						}
						return observeReader.get(map,""+propertyName);
					}
				};
				this._setupGetterSetterFn(mapGetterSetter, args[1], args[2], args[3]);
			} else {
				this._setupProperty(args[0], args[1], args[2]);
			}

		} else if(contextType === 'function') {
			// Setter computes.
			// `new can.Compute(initialValue, function(newValue){ ... })`
			this._setupSetter(args[0], args[1], args[2]);
		} else {

			if(args[1] && args[1].fn) {
				// Async computes.
				this._setupAsyncCompute(args[0], args[1]);
			} else {
				// Settings computes.
				//`new can.Compute(initialValue, {on, off, get, set})`
				this._setupSettings(args[0], args[1]);
			}

		}
	} else {
		// Simple value computes.
		// `new can.Compute(initialValue)`
		this._setupSimpleValue(args[0]);
	}

	this._args = args;
	this._primaryDepth = 0;

	this.isComputed = true;

};

// ## Helpers

// ## updateOnChange
// A helper to trigger an event when a value changes
var updateOnChange = function(compute, newValue, oldValue, batchNum){

	var valueChanged = newValue !== oldValue && !(newValue !== newValue && oldValue !== oldValue);

	// Only trigger event when value has changed
	if (valueChanged) {
		canEvent.dispatch.call(compute, {type: "change", batchNum: batchNum}, [
			newValue,
			oldValue
		]);
	}
};

// ### setupComputeHandlers
// A helper that creates an `_on` and `_off` function that
// will bind on source observables and update the value of the compute.
var setupComputeHandlers = function(compute, func, context) {

	var observation = new Observation(func, context, compute);
	compute.observation = observation;
	return {
		// Call `onchanged` when any source observables change.
		_on: function() {
			observation.start();
			compute.value = observation.value;
			compute.hasDependencies = !isEmptyObject(observation.newObserved);
		},
		// Unbind `onchanged` from all source observables.
		_off: function() {
			observation.stop();
		},
		getDepth: function() {
			return observation.getDepth();
		}
	};
};

assign(Compute.prototype, {
	setPrimaryDepth: function(depth) {
		this._primaryDepth = depth;
	},

	// ## Setup getter / setter functional computes
	// Uses the function as both a getter and setter.
	_setupGetterSetterFn: function(getterSetter, context, eventName) {
		this._set = context ? getterSetter.bind(context) : getterSetter;
		this._get = context ? getterSetter.bind(context) : getterSetter;
		this._canObserve = eventName === false ? false : true;
		// The helper provides the on and off methods that use `getValueAndBind`.
		var handlers = setupComputeHandlers(this, getterSetter, context || this);

		assign(this, handlers);
	},
	// ## Setup property computes
	// Listen to a property changing on an object.
	_setupProperty: function(target, propertyName, eventName) {
		var self = this,
			handler;


		// This is objects that can be bound to with can.bind.
		handler = function () {
			self.updater(self._get(), self.value);
		};
		this._get = function() {
			return getObject(target, propertyName);
		};
		this._set = function(value) {
			// allow setting properties n levels deep, if separated with dot syntax
			var properties = propertyName.split("."),
				leafPropertyName = properties.pop();

			if(properties.length) {
				var targetProperty = getObject(target, properties.join('.'));
				targetProperty[leafPropertyName] = value;
			} else {
				target[propertyName] = value;
			}
		};

		this._on = function(update) {
			canEvent.on.call(target, eventName || propertyName, handler);
			// Set the cached value
			this.value = this._get();
		};
		this._off = function() {
			return canEvent.off.call( target, eventName || propertyName, handler);
		};
	},
	// ## Setup Setter Computes
	// Only a setter function is specified.
	_setupSetter: function(initialValue, setter, eventName) {
		this.value = initialValue;
		this._set = setter;
		assign(this, eventName);
	},
	// ## Setup settings computes
	// Use whatever `on`, `off`, `get`, `set` the users provided
	// as the internal methods.
	_setupSettings: function(initialValue, settings) {

		this.value = initialValue;

		this._set = settings.set || this._set;
		this._get = settings.get || this._get;

		// This allows updater to be called without any arguments.
		// selfUpdater flag can be set by things that want to call updater themselves.
		if(!settings.__selfUpdater) {
			var self = this,
				oldUpdater = this.updater;
			this.updater = function() {
				oldUpdater.call(self, self._get(), self.value);
			};
		}


		this._on = settings.on ? settings.on : this._on;
		this._off = settings.off ? settings.off : this._off;
	},
	// ## Setup async computes
	// This is a special, non-documented form of a compute
	// rhat can asynchronously update its value.
	_setupAsyncCompute: function(initialValue, settings){
		var self = this;
		// This is the async getter function.  Depending on how many arguments the function takes,
		// we setup bindings differently.
		var getter = settings.fn;
		var bindings;

		this.value = initialValue;

		// This compute will call update with the new value itself.
		this._setUpdates = true;

		// An "async" compute has a `lastSetValue` that represents
		// the last value `compute.set` was called with.
		// The following creates `lastSetValue` as a can.Compute so when
		//  `lastSetValue` is changed, the `getter` can see that change
		// and automatically update itself.
		this.lastSetValue = new Compute(initialValue);

		// Wires up setting this compute to set `lastSetValue`.
		// If the new value matches the last setValue, do nothing.
		this._set = function(newVal){
			if(newVal === self.lastSetValue.get()) {
				return this.value;
			}

			return self.lastSetValue.set(newVal);
		};

		// Wire up the get to pass the lastNewValue
		this._get = function() {
			return getter.call(settings.context, self.lastSetValue.get() );
		};

		if(getter.length === 0) {
			// If it takes no arguments, it should behave just like a Getter compute.
			bindings = setupComputeHandlers(this, getter, settings.context);
		} else if(getter.length === 1) {
			// If it has a single argument, pass it the last setValue.
			bindings = setupComputeHandlers(this, function() {
				return getter.call(settings.context, self.lastSetValue.get() );
			}, settings);

		} else {
			// If the function takes 2 arguments, the second argument is a function
			// that should update the value of the compute (`setValue`). To make this we need
			// the "normal" updater function because we are about to overwrite it.
			var oldUpdater = this.updater,
				resolve = Observation.ignore(function(newVal) {
					oldUpdater.call(self, newVal, self.value);
				});

			// Because `setupComputeHandlers` calls `updater` internally with its
			// observation.value as `oldValue` and that might not be up to date,
			// we overwrite updater to always use self.value.
			this.updater = function(newVal) {
				oldUpdater.call(self, newVal, self.value);
			};


			bindings = setupComputeHandlers(this, function() {
				// Call getter, and get new value
				var res = getter.call(settings.context, self.lastSetValue.get(), resolve);
				// If undefined is returned, don't update the value.
				return res !== undefined ? res : this.value;
			}, this);
		}

		assign(this, bindings);
	},
	// ## Setup simple value computes
	// Uses the default `_get`, `_set` behaviors.
	_setupSimpleValue: function(initialValue) {
		this.value = initialValue;
	},
	// ## _bindsetup
	// When a compute is first bound, call the internal `this._on` method.
	// `can.__notObserve` makes sure if `_on` is listening to any observables,
	// they will not be observed by any outer compute.
	_eventSetup: Observation.ignore(function () {
		this.bound = true;
		this._on(this.updater);
	}),
	// ## _bindteardown
	// When a compute has no other bindings, call the internal `this._off` method.
	_eventTeardown: function () {
		this._off(this.updater);
		this.bound = false;
	},
	// ## bind and unbind
	// A bind and unbind that calls `_bindsetup` and `_bindteardown`.
	addEventListener: eventLifecycle.addAndSetup,
	removeEventListener: eventLifecycle.removeAndTeardown,

	// ## clone
	// Copies this compute, but for a different context.
	// This is mostly used for computes on a map's prototype.
	clone: function(context) {
		if(context && typeof this._args[0] === 'function') {
			this._args[1] = context;
		} else if(context) {
			this._args[2] = context;
		}

		return new Compute(this._args[0], this._args[1], this._args[2], this._args[3]);
	},
	// ## _on and _off
	// Default _on and _off do nothing.
	_on: function(){},
	_off: function(){},
	// ## get
	// Returns the cached value if `bound`, otherwise, returns
	// the _get value.
	get: function() {
		// If an external compute is tracking observables and
		// this compute can be listened to by "function" based computes ....
		var recordingObservation = Observation.isRecording();
		if(recordingObservation && this._canObserve !== false) {

			// ... tell the tracking compute to listen to change on this computed.
			Observation.add(this, 'change');
			// ... if we are not bound, we should bind so that
			// we don't have to re-read to get the value of this compute.
			if (!this.bound) {
				Compute.temporarilyBind(this);
			}
		}
		// If computed is bound, use the cached value.
		if (this.bound) {
			if(this.observation) {
				return this.observation.get();
			} else {
				return this.value;
			}
		} else {
			return this._get();
		}
	},
	// ## _get
	// Returns the cached value.
	_get: function() {
		return this.value;
	},
	// ## set
	// Sets the value of the compute.
	// Depending on the type of the compute and what `_set` returns, it might need to call `_get` after
	// `_set` to get the final value.
	set: function(newVal) {

		var old = this.value;

		// Setter may return the value if setter
		// is for a value maintained exclusively by this compute.
		var setVal = this._set(newVal, old);

		// If the setter updated this.value, just return that.
		if(this._setUpdates) {
			return this.value;
		}

		// If the computed function has dependencies,
		// we should call the getter.
		if (this.hasDependencies) {
			return this._get();
		}

		// Setting may not fire a change event, in which case
		// the value must be read
		this.updater(setVal === undefined ? this._get() : setVal, old);

		return this.value;
	},
	// ## _set
	// Updates the cached value.
	_set: function(newVal) {
		return this.value = newVal;
	},
	// ## updater
	// Updates the cached value and fires an event if the value has changed.
	updater: function(newVal, oldVal, batchNum) {
		this.value = newVal;
		if(this.observation) {
			// it's possible the observation doesn't actually
			// have any dependencies
			this.observation.value = newVal;
		}
		updateOnChange(this, newVal, oldVal, batchNum);
	},
	// ## toFunction
	// Returns a proxy form of this compute.
	toFunction: function() {
		return this._computeFn.bind( this);
	},
	_computeFn: function(newVal) {
		if(arguments.length) {
			return this.set(newVal);
		}

		return this.get();
	}
	//!steal-remove-start
	,
	trace: function(){
		var me = {
			computeValue: this.get(),
			definition: this.observation && this.observation.func,
			cid: this._cid
		};


		if(this.observation) {
			var deps = [];
			for(var name in this.observation.newObserved) {
				var obs = assign({},this.observation.newObserved[name]);
				if(obs.obj.isComputed) {
					deps.push(obs.obj.trace());

				} else {
					deps.push(obs);
				}
			}
			me.dependencies = deps;
		}
		return me;
	},
	log: function(){
		var log = function(trace){
			var currentTrace = '';

			if(trace.dependencies && trace.dependencies.length) {
				currentTrace = trace.cid + " = " + trace.computeValue;
				
				if(console && console.group) {
					console.group(currentTrace);
				} else {
					canLog.log(currentTrace);
				}

				trace.dependencies.forEach(function(dep){
					if(dep.hasOwnProperty("computeValue")) {
						log(dep);
					} else {
						canLog.log(dep.obj, dep.event);
					}
				});
				
				if(console && console.groupEnd) {
					console.groupEnd();
				}
			} else {
				canLog.log(trace.cid +" - "+ trace.computeValue);
			}
			return trace;
		};

		return log(this.trace());
	}
	//!steal-remove-end
});

Compute.prototype.on = Compute.prototype.bind = Compute.prototype.addEventListener;
Compute.prototype.off = Compute.prototype.unbind = Compute.prototype.removeEventListener;

var k = function(){};
// A list of temporarily bound computes
var computes;
// Unbinds all temporarily bound computes.
var unbindComputes = function () {
	for (var i = 0, len = computes.length; i < len; i++) {
		computes[i].removeEventListener('change', k);
	}
	computes = null;
};

// ### temporarilyBind
// Binds computes for a moment to cache their value and prevent re-calculating it.
Compute.temporarilyBind = function (compute) {
	var computeInstance = compute.computeInstance || compute;
	computeInstance.addEventListener('change', k);
	if (!computes) {
		computes = [];
		setImmediate(unbindComputes);
	}
	computes.push(computeInstance);
};

// ### async
// A simple helper that makes an async compute a bit easier.
Compute.async = function(initialValue, asyncComputer, context){
	return new Compute(initialValue, {
		fn: asyncComputer,
		context: context
	});
};


// ### truthy
// Wraps a compute with another compute that only changes when
// the wrapped compute's `truthiness` changes.
Compute.truthy = function(compute) {
	return new Compute(function() {
		var res = compute.get();
		if(typeof res === 'function') {
			res = res.get();
		}
		return !!res;
	});
};

module.exports = exports = Compute;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// # can/control/control.js
//
// Create organized, memory-leak free, rapidly performing, stateful
// controls with declarative eventing binding. Used when creating UI
// controls with behaviors, bound to elements on the page.
// ## helpers

var Construct = __webpack_require__(27);

var namespace = __webpack_require__(2);
var string = __webpack_require__(19);
var assign = __webpack_require__(3);
var isFunction = __webpack_require__(23);
var each = __webpack_require__(1);
var dev = __webpack_require__(6);
var types = __webpack_require__(0);
var get = __webpack_require__(52);
var domData = __webpack_require__(10);
var className = __webpack_require__(90);
var domEvents = __webpack_require__(8);
var canEvent = __webpack_require__(4);
var canCompute = __webpack_require__(9);
var observeReader = __webpack_require__(15);
var processors;

__webpack_require__(17);
__webpack_require__(61);

// ### bind
// this helper binds to one element and returns a function that unbinds from that element.
var bind = function (el, ev, callback) {

    canEvent.on.call(el, ev, callback);

	return function () {
        canEvent.off.call(el, ev, callback);
	};
},
	slice = [].slice,
	paramReplacer = /\{([^\}]+)\}/g,

	// ### delegate
	//
	// this helper binds to elements based on a selector and returns a
	// function that unbinds.
	delegate = function (el, selector, ev, callback) {
        canEvent.on.call(el, ev, selector, callback);

		return function () {
            canEvent.off.call(el, ev, selector, callback);
		};
	},

	// ### binder
	//
	// Calls bind or unbind depending if there is a selector.
	binder = function (el, ev, callback, selector) {
		return selector ?
			delegate(el, selector.trim(), ev, callback) :
			bind(el, ev, callback);
	},

	basicProcessor;

var Control = Construct.extend(
	/**
	 * @add can.Control
	 */
	// ## *static functions*
	/**
	 * @static
	 */
	{
		// ## can.Control.setup
		//
		// This function pre-processes which methods are event listeners and which are methods of
		// the control. It has a mechanism to allow controllers to inherit default values from super
		// classes, like `can.Construct`, and will cache functions that are action functions (see `_isAction`)
		// or functions with an underscored name.
		setup: function () {
			Construct.setup.apply(this, arguments);

			if (Control) {
				var control = this,
					funcName;

				control.actions = {};
				for (funcName in control.prototype) {
					if (control._isAction(funcName)) {
						control.actions[funcName] = control._action(funcName);
					}
				}
			}
		},
		// ## can.Control._shifter
		//
		// Moves `this` to the first argument, wraps it with `jQuery` if it's
		// an element.
		_shifter: function (context, name) {
			var method = typeof name === "string" ? context[name] : name;

			if (!isFunction(method)) {
				method = context[method];
			}

			return function () {
				var wrapped = types.wrapElement(this);
				context.called = name;
				return method.apply(context, [wrapped].concat(slice.call(arguments, 0)));
			};
		},

		// ## can.Control._isAction
		//
		// Return `true` if `methodName` refers to an action. An action is a `methodName` value that
		// is not the constructor, and is either a function or string that refers to a function, or is
		// defined in `special`, `processors`. Detects whether `methodName` is also a valid method name.
		_isAction: function (methodName) {
			var val = this.prototype[methodName],
				type = typeof val;

			return (methodName !== 'constructor') &&
			(type === "function" || (type === "string" && isFunction(this.prototype[val]))) &&
			!! (Control.isSpecial(methodName) || processors[methodName] || /[^\w]/.test(methodName));
		},
		// ## can.Control._action
		//
		// Takes a method name and the options passed to a control and tries to return the data
		// necessary to pass to a processor (something that binds things).
		//
		// For performance reasons, `_action` is called twice:
		// * It's called when the Control class is created. for templated method names (e.g., `{window} foo`), it returns null. For non-templated method names it returns the event binding data. That data is added to `this.actions`.
		// * It is called wehn a control instance is created, but only for templated actions.
		_action: function(methodName, options, controlInstance) {
			var readyCompute;

			// If we don't have options (a `control` instance), we'll run this later. If we have
			// options, run `can.sub` to replace the action template `{}` with values from the `options`
			// or `window`. If a `{}` template resolves to an object, `convertedName` will be an array.
			// In that case, the event name we want will be the last item in that array.
			paramReplacer.lastIndex = 0;
			if (options || !paramReplacer.test(methodName)) {

				readyCompute = canCompute(function() {
					var delegate;

					// Set the delegate target and get the name of the event we're listening to.
					var name = methodName.replace(paramReplacer, function(matched, key) {
						var value, parent;

						// If listening directly to a delegate target, set it
						if (this._isDelegate(options, key)) {
							delegate = this._getDelegate(options, key);
							return "";
						}

						// If key contains part of the lookup path, remove it.
						// This is needed for bindings like {viewModel.foo} in can-component's Control.
						key = this._removeDelegateFromKey(key);

						// set the parent (where the key will be read from)
						parent = this._lookup(options)[0];

						value = observeReader.read(parent, observeReader.reads(key), {
							// if we find a compute, we should bind on that and not read it
							readCompute: false
						}).value;

						// If `value` is undefined use `string.getObject` to get the value.
						if (value === undefined && typeof window !== 'undefined') {
							value = get(window, key);
						}

						// if the parent is not an observable and we don't have a value, show a warning
						// in this situation, it is not possible for the event handler to be triggered
						if (!parent || !types.isMapLike(parent) && !value) {
							//!steal-remove-start
							dev.log('can/control/control.js: No property found for handling ' + methodName);
							//!steal-remove-end
							return null;
						}

						// If `value` is a string we just return it, otherwise we set it as a delegate target.
						if (typeof value === "string") {
							return value;
						} else {
							delegate = value;
							return "";
						}
					}.bind(this));

					// removing spaces that get added when converting
					// `{element} click` -> ` click`
					name = name.trim();

					// Get the name of the `event` we're listening to.
					var parts = name.split(/\s+/g),
						event = parts.pop();

					// Return everything needed to handle the event we're listening to.
					return {
						processor: this.processors[event] || basicProcessor,
						parts: [name, parts.join(" "), event],
						delegate: delegate || undefined
					};
				}, this);

				if (controlInstance) {
					// Create a handler function that we'll use to handle the `change` event on the `readyCompute`.
					var handler = function(ev, ready) {
						// unbinds the old binding
						controlInstance._bindings.control[methodName](controlInstance.element);
						// binds the new
						controlInstance._bindings.control[methodName] = ready.processor(
							ready.delegate || controlInstance.element,
							ready.parts[2], ready.parts[1], methodName, controlInstance);
					};

					readyCompute.bind("change", handler);

					controlInstance._bindings.readyComputes[methodName] = {
						compute: readyCompute,
						handler: handler
					};
				}

				return readyCompute();
			}
		},
		// the lookup path - where templated keys will be looked up
		_lookup: function (options) {
			return [options, window];
		},
		// strip strings that represent delegates from the key
		_removeDelegateFromKey: function (key) {
			return key;
		},
		// return whether the key is a delegate
		_isDelegate: function(options, key) {
			return key === 'element';
		},
		// return the delegate object for a given key
		_getDelegate: function(options, key) {
			return undefined;
		},
		// ## can.Control.processors
		//
		// An object of `{eventName : function}` pairs that Control uses to
		// hook up events automatically.
		processors: {},
		// ## can.Control.defaults
		// A object of name-value pairs that act as default values for a control instance
		defaults: {},
        // should be used to overwrite to make nodeLists on this
        convertElement: function(element) {
            element = typeof element === "string" ?
							document.querySelector(element) : element;

						return types.wrapElement(element);
        },
        // should be overwritten to look in jquery special events
        isSpecial: function(eventName){
            return eventName === "inserted" || eventName === "removed";
        }
	}, {
		// ## *prototype functions*
		/**
		 * @prototype
		 */
		// ## setup
		//
		// Setup is where most of the Control's magic happens. It performs several pre-initialization steps:
		// - Sets `this.element`
		// - Adds the Control's name to the element's className
		// - Saves the Control in `$.data`
		// - Merges Options
		// - Binds event handlers using `delegate`
		// The final step is to return pass the element and prepareed options, to be used in `init`.
		setup: function (element, options) {

			var cls = this.constructor,
				pluginname = cls.pluginName || cls.shortName,
				arr;

			if (!element) {
				throw new Error('Creating an instance of a named control without passing an element');
			}
			// Retrieve the raw element, then set the plugin name as a class there.
      this.element = cls.convertElement(element);

			if (pluginname && pluginname !== 'can_control') {
				className.add.call(this.element, pluginname);
			}

			// Set up the 'controls' data on the element. If it does not exist, initialize
			// it to an empty array.
			arr = domData.get.call(this.element, 'controls');
			if (!arr) {
				arr = [];
				domData.set.call(this.element, 'controls', arr);
			}
			arr.push(this);

			// The `this.options` property is an Object that contains configuration data
			// passed to a control when it is created (`new can.Control(element, options)`)
			//
			// The `options` argument passed when creating the control is merged with `can.Control.defaults`
			// in [can.Control.prototype.setup setup].
			//
			// If no `options` value is used during creation, the value in `defaults` is used instead
			if (types.isMapLike(options)) {
				for (var prop in cls.defaults) {
					if (!options.hasOwnProperty(prop)) {
						observeReader.set(options, prop, cls.defaults[prop]);
					}
				}
				this.options = options;
			} else {
				this.options = assign( assign({}, cls.defaults), options);
			}

			this.on();

			return [this.element, this.options];
		},
		// ## on
		//
		// This binds an event handler for an event to a selector under the scope of `this.element`
		// If no options are specified, all events are rebound to their respective elements. The actions,
		// which were cached in `setup`, are used and all elements are bound using `delegate` from `this.element`.
		on: function (el, selector, eventName, func) {
			if (!el) {
				this.off();

				var cls = this.constructor,
					bindings = this._bindings,
					actions = cls.actions,
					element = types.unwrapElement(this.element),
					destroyCB = Control._shifter(this, "destroy"),
					funcName, ready;

				for (funcName in actions) {
					// Only push if we have the action and no option is `undefined`
					if ( actions.hasOwnProperty(funcName) ) {
						ready = actions[funcName] || cls._action(funcName, this.options, this);
						if( ready ) {
							bindings.control[funcName]  = ready.processor(ready.delegate || element,
								ready.parts[2], ready.parts[1], funcName, this);
						}
					}
				}

				// Set up the ability to `destroy` the control later.
				domEvents.addEventListener.call(element, "removed", destroyCB);
				bindings.user.push(function (el) {
					domEvents.removeEventListener.call(el, "removed", destroyCB);
				});
				return bindings.user.length;
			}

			// if `el` is a string, use that as `selector` and re-set it to this control's element...
			if (typeof el === 'string') {
				func = eventName;
				eventName = selector;
				selector = el;
				el = this.element;
			}

			// ...otherwise, set `selector` to null
			if (func === undefined) {
				func = eventName;
				eventName = selector;
				selector = null;
			}

			if (typeof func === 'string') {
				func = Control._shifter(this, func);
			}

			this._bindings.user.push(binder(el, eventName, func, selector));

			return this._bindings.user.length;
		},
		// ## off
		//
		// Unbinds all event handlers on the controller.
		// This should _only_ be called in combination with .on()
		off: function () {
			var el = types.unwrapElement(this.element),
				bindings = this._bindings;
			if( bindings ) {
				each(bindings.user || [], function (value) {
					value(el);
				});
				each(bindings.control || {}, function (value) {
					value(el);
				});
				each(bindings.readyComputes || {}, function(value) {
					value.compute.unbind("change", value.handler);
				});
			}
			// Adds bindings.
			this._bindings = {user: [], control: {}, readyComputes: {}};
		},
		// ## destroy
		//
		// Prepares a `control` for garbage collection.
		// First checks if it has already been removed. Then, removes all the bindings, data, and
		// the element from the Control instance.
		destroy: function () {
			if (this.element === null) {
				//!steal-remove-start
				dev.warn("can/control/control.js: Control already destroyed");
				//!steal-remove-end
				return;
			}
			var Class = this.constructor,
				pluginName = Class.pluginName || (Class.shortName && string.underscore(Class.shortName)),
				controls;

			this.off();

			if (pluginName && pluginName !== 'can_control') {
				className.remove.call(this.element, pluginName);
			}

			controls = domData.get.call(this.element, "controls");
			if (controls) {
				controls.splice(controls.indexOf(this), 1);
			}

			canEvent.dispatch.call(this, "destroyed");

			this.element = null;
		}
	});

// ## Processors
//
// Processors do the binding. This basic processor binds events. Each returns a function that unbinds
// when called.
processors = Control.processors;
basicProcessor = function (el, event, selector, methodName, control) {
	return binder(el, event, Control._shifter(control, methodName), selector);
};

// Set common events to be processed as a `basicProcessor`
each(["beforeremove", "change", "click", "contextmenu", "dblclick", "keydown", "keyup",
	"keypress", "mousedown", "mousemove", "mouseout", "mouseover",
	"mouseup", "reset", "resize", "scroll", "select", "submit", "focusin",
	"focusout", "mouseenter", "mouseleave",
	"touchstart", "touchmove", "touchcancel", "touchend", "touchleave",
	"inserted","removed",
	"dragstart", "dragenter", "dragover", "dragleave", "drag", "drop", "dragend"
], function (v) {
	processors[v] = basicProcessor;
});

module.exports = namespace.Control = Control;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var events = __webpack_require__(8);
var domData = __webpack_require__(10);
var getDocument = __webpack_require__(5);
var domDispatch = __webpack_require__(17);
var CIDMap = __webpack_require__(50);

function getRoot () {
	return getDocument().documentElement;
}

function getRegistryName (eventName) {
	return 'can-event-radiochange:' + eventName + ':registry';
}

function getListenerName (eventName) {
	return 'can-event-radiochange:' + eventName + ':listener';
}

function getRegistry (eventName) {
	var root = getRoot();
	var name = getRegistryName(eventName);
	var registry = domData.get.call(root, name);
	if (!registry) {
		registry = new CIDMap();
		domData.set.call(root, name, registry);
	}
	return registry;
}

function findParentForm (el) {
	while (el) {
		if (el.nodeName === 'FORM') {
			break;
		}
		el = el.parentNode;
	}
	return el;
}

function shouldReceiveEventFromRadio (source, dest) {
	// Must have the same name attribute and parent form
	var name = source.getAttribute('name');
	return (
		name &&
		name === dest.getAttribute('name') &&
		findParentForm(source) === findParentForm(dest)
	);
}

function isRadioInput (el) {
	return el.nodeName === 'INPUT' && el.type === 'radio';
}

function dispatch (eventName, target) {
	var registry = getRegistry(eventName);
	var event = {type: eventName};
	registry.forEach(function (el) {
		if (shouldReceiveEventFromRadio(target, el)) {
			domDispatch.call(el, event, [], false);
		}
	});
}

function attachRootListener (eventName) {
	var root = getRoot();
	var listenerName = getListenerName(eventName);
	var listener = domData.get.call(root, listenerName);
	if (listener) {
		return;
	}
	var newListener = function (event) {
		var target = event.target;
		if (isRadioInput(target)) {
			dispatch(eventName, target);
		}
	};
	events.addEventListener.call(root, 'change', newListener);
	domData.set.call(root, listenerName, newListener);
}

function detachRootListener (eventName) {
	var root = getRoot();
	var listenerName = getListenerName(eventName);
	var listener = domData.get.call(root, listenerName);
	if (!listener) {
		return;
	}
	var registry = getRegistry(eventName);
	if (registry.size > 0) {
		return;
	}
	events.removeEventListener.call(root, 'change', listener);
	domData.clean.call(root, listenerName);
}

function addListener (eventName, el) {
	if (!isRadioInput(el)) {
		throw new Error('Listeners for ' + eventName + ' must be radio inputs');
	}
	getRegistry(eventName).set(el, el);
	attachRootListener(eventName);
}

function removeListener (eventName, el) {
	getRegistry(eventName).delete(el);
	detachRootListener(eventName);
}

/**
 * @module {events} can-event-radiochange can-event-radiochange
 * @parent can-infrastructure
 *
 * A custom event for listening to changes of inputs with type "radio",
 * which fires when a conflicting radio input changes. A "conflicting"
 * radio button has the same "name" attribute and exists within in the
 * same form, or lack thereof. This event coordinates state bound to
 * whether a radio is checked. The "change" event does not fire for deselected
 * radios. By using this event instead, deselected radios receive notification.
 *
 * ```js
 * var events = require("can-util/dom/events/events");
 * var radioChange = require("can-util/dom/events/radiochange/radiochange");
 * events.addCustomEvent(radioChange);
 *
 * var el = document.createElement("div");
 *
 * function radiochangeHandler() {
 * 	console.log("radiochange event fired");
 * }
 *
 * events.addEventListener.call(el, "radiochange", radiochangeHandler, false);
 * events.removeEventListener.call(el, "radiochange", radiochangeHandler);
 *
 * events.removeCustomEvent(radioChange);
 * ```
 */
module.exports = {
	eventName: 'radiochange',
	applyEventListener: true,

	addEventListener: function addEventListener (eventName) {
		addListener(eventName, this);
	},

	removeEventListener: function removeEventListener (eventName) {
		removeListener(eventName, this);
	}
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var radioChange = __webpack_require__(84);

/*
	This module conforms to the current custom event
	overriding behavior which will be replaced by the
	end result of https://github.com/canjs/can-util/issues/249.

	Until then (and for older can-util versions), this
	module is a means on including the radiochange event.
*/

function isDomEvents (obj) {
	return !!(obj && obj.addEventListener && obj.removeEventListener);
}

function override (domEvents) {
	if (!isDomEvents(domEvents)) {
		throw new Error ('override() must be passed domEvents');
	}

	var isOverriding = true;
	var oldAddEventListener = domEvents.addEventListener;
	var addEventListener = domEvents.addEventListener = function (eventName) {
		if (isOverriding && eventName === radioChange.eventName) {
			radioChange.addEventListener.apply(this, arguments);
		}
		return oldAddEventListener.apply(this, arguments);
	};

	var oldRemoveEventListener = domEvents.removeEventListener;
	var removeEventListener = domEvents.removeEventListener = function (eventName) {
		if (isOverriding && eventName === radioChange.eventName) {
			radioChange.removeEventListener.apply(this, arguments);
		}
		return oldRemoveEventListener.apply(this, arguments);
	};

	return function removeOverride () {
		isOverriding = false;
		if (domEvents.addEventListener === addEventListener) {
			domEvents.addEventListener = oldAddEventListener;
		}
		if (domEvents.removeEventListener === removeEventListener) {
			domEvents.removeEventListener = oldRemoveEventListener;
		}
	};
}

module.exports = {
	override: override
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

// # can-stache-bindings.js
//
// This module provides CanJS's default data and event bindings.
// It's broken up into several parts:
//
// - Behaviors - Binding behaviors that run given an attribute or element.
// - Attribute Syntaxes - Hooks up custom attributes to their behaviors.
// - getComputeFrom - Methods that return a compute cross bound to the scope, viewModel, or element.
// - bind - Methods for setting up cross binding
// - getBindingInfo - A helper that returns the details of a data binding given an attribute.
// - makeDataBinding - A helper method for setting up a data binding.
// - initializeValues - A helper that initializes a data binding.
var expression = __webpack_require__(45);
var viewCallbacks = __webpack_require__(40);
var live = __webpack_require__(41);
var Scope = __webpack_require__(42);
var canViewModel = __webpack_require__(67);
var canEvent = __webpack_require__(4);
var canBatch = __webpack_require__(11);
var compute = __webpack_require__(9);
var observeReader = __webpack_require__(15);
var Observation = __webpack_require__(7);

var assign = __webpack_require__(3);
var makeArray  = __webpack_require__(12);
var each  = __webpack_require__(1);
var string = __webpack_require__(19);
var dev = __webpack_require__(6);
var types = __webpack_require__(0);
var last = __webpack_require__(32);

var getMutationObserver = __webpack_require__(21);
var domEvents = __webpack_require__(8);
__webpack_require__(48);
__webpack_require__(85).override(domEvents);
var domData = __webpack_require__(10);
var attr = __webpack_require__(24);
var canLog = __webpack_require__(18);
var stacheHelperCore = __webpack_require__(35);

	// ## Behaviors
	var behaviors = {
		// ### bindings.behaviors.viewModel
		// Sets up all of an element's data binding attributes to a "soon-to-be-created"
		// `viewModel`.
		// This is primarily used by `can.Component` to ensure that its
		// `viewModel` is initialized with values from the data bindings as quickly as possible.
		// Component could look up the data binding values itself.  However, that lookup
		// would have to be duplicated when the bindings are established.
		// Instead, this uses the `makeDataBinding` helper, which allows creation of the `viewModel`
		// after scope values have been looked up.
		//
		// - `makeViewModel(initialViewModelData)` - a function that returns the `viewModel`.
		// - `initialViewModelData` any initial data that should already be added to the `viewModel`.
		//
		// Returns:
		// - `function` - a function that tears all the bindings down. Component
		// wants all the bindings active so cleanup can be done during a component being removed.
		viewModel: function(el, tagData, makeViewModel, initialViewModelData){
			initialViewModelData = initialViewModelData || {};

			var bindingsSemaphore = {},
				viewModel,
				// Stores callbacks for when the viewModel is created.
				onCompleteBindings = [],
				// Stores what needs to be called when the element is removed
				// to prevent memory leaks.
				onTeardowns = {},
				// Track info about each binding, we need this for binding attributes correctly.
				bindingInfos = {},
				attributeViewModelBindings = assign({}, initialViewModelData);

			// For each attribute, we start the binding process,
			// and save what's returned to be used when the `viewModel` is created,
			// the element is removed, or the attribute changes values.
			each( makeArray(el.attributes), function(node){

				var dataBinding = makeDataBinding(node, el, {
					templateType: tagData.templateType,
					scope: tagData.scope,
					semaphore: bindingsSemaphore,
					getViewModel: function(){
						return viewModel;
					},
					attributeViewModelBindings: attributeViewModelBindings,
					alreadyUpdatedChild: true,
					nodeList: tagData.parentNodeList
				});
				if(dataBinding) {
					// For bindings that change the viewModel,
					if(dataBinding.onCompleteBinding) {
						// save the initial value on the viewModel.
						if(dataBinding.bindingInfo.parentToChild && dataBinding.value !== undefined) {
							initialViewModelData[cleanVMName(dataBinding.bindingInfo.childName)] = dataBinding.value;
						}
						// Save what needs to happen after the `viewModel` is created.
						onCompleteBindings.push(dataBinding.onCompleteBinding);
					}
					onTeardowns[node.name] = dataBinding.onTeardown;
				}

			});

			// Create the `viewModel` and call what needs to be happen after
			// the `viewModel` is created.
			viewModel = makeViewModel(initialViewModelData);

			for(var i = 0, len = onCompleteBindings.length; i < len; i++) {
				onCompleteBindings[i]();
			}

			// Listen to attribute changes and re-initialize
			// the bindings.
			domEvents.addEventListener.call(el, "attributes", function (ev) {
				var attrName = ev.attributeName,
					value = el.getAttribute(attrName);

				if( onTeardowns[attrName] ) {
					onTeardowns[attrName]();
				}
				// Parent attribute bindings we always re-setup.
				var parentBindingWasAttribute = bindingInfos[attrName] && bindingInfos[attrName].parent === "attribute";

				if(value !== null || parentBindingWasAttribute ) {
					var dataBinding = makeDataBinding({name: attrName, value: value}, el, {
						templateType: tagData.templateType,
						scope: tagData.scope,
						semaphore: {},
						getViewModel: function(){
							return viewModel;
						},
						attributeViewModelBindings: attributeViewModelBindings,
						// always update the viewModel accordingly.
						initializeValues: true,
						nodeList: tagData.parentNodeList
					});
					if(dataBinding) {
						// The viewModel is created, so call callback immediately.
						if(dataBinding.onCompleteBinding) {
							dataBinding.onCompleteBinding();
						}
						bindingInfos[attrName] = dataBinding.bindingInfo;
						onTeardowns[attrName] = dataBinding.onTeardown;
					}
				}
			});

			return function(){
				for(var attrName in onTeardowns) {
					onTeardowns[attrName]();
				}
			};
		},
		// ### bindings.behaviors.data
		// This is called when an individual data binding attribute is placed on an element.
		// For example `{^value}="name"`.
		data: function(el, attrData){
			if(domData.get.call(el,"preventDataBindings")){
				return;
			}
			var viewModel = canViewModel(el),
				semaphore = {},
				teardown;

			// If a two-way binding, take extra measure to ensure
			//  that parent and child sync values properly.
			var twoWay = bindingsRegExp.exec(attrData.attributeName)[1];

			// Setup binding
			var dataBinding = makeDataBinding({
				name: attrData.attributeName,
				value: el.getAttribute(attrData.attributeName),
				nodeList: attrData.nodeList
			}, el, {
				templateType: attrData.templateType,
				scope: attrData.scope,
				semaphore: semaphore,
				getViewModel: function(){
					return viewModel;
				},
				syncChildWithParent: twoWay
			});

			if(dataBinding.onCompleteBinding) {
				dataBinding.onCompleteBinding();
			}
			teardown = dataBinding.onTeardown;
			canEvent.one.call(el, 'removed', function(){
				teardown();
			});

			// Listen for changes
			domEvents.addEventListener.call(el, "attributes", function (ev) {
				var attrName = ev.attributeName,
					value = el.getAttribute(attrName);

				if( attrName === attrData.attributeName ) {

					if( teardown ) {
						teardown();
					}

					if(value !== null  ) {

						var dataBinding = makeDataBinding({name: attrName, value: value}, el, {
							templateType: attrData.templateType,
							scope: attrData.scope,
							semaphore: semaphore,
							getViewModel: function(){
								return viewModel;
							},
							// always update the viewModel accordingly.
							initializeValues: true,
							nodeList: attrData.nodeList,
							syncChildWithParent: twoWay
						});
						if(dataBinding) {
							// The viewModel is created, so call callback immediately.
							if(dataBinding.onCompleteBinding) {
								dataBinding.onCompleteBinding();
							}
							teardown = dataBinding.onTeardown;
						}
					}

				}
			});
		},
		// ### bindings.behaviors.reference
		// Provides the shorthand `*ref` behavior that exports the `viewModel`.
		// For example `{^value}="name"`.
		reference: function(el, attrData) {
			if(el.getAttribute(attrData.attributeName)) {
				canLog.warn("*reference attributes can only export the view model.");
			}

			var name = string.camelize( attrData.attributeName.substr(1).toLowerCase() );

			var viewModel = canViewModel(el);
			var refs = attrData.scope.getRefs();
			refs._context.attr("*"+name, viewModel);
		},
		// ### bindings.behaviors.event
		// The following section contains code for implementing the can-EVENT attribute.
		// This binds on a wildcard attribute name. Whenever a view is being processed
		// and can-xxx (anything starting with can-), this callback will be run.  Inside, its setting up an event handler
		// that calls a method identified by the value of this attribute.
		event: function(el, data) {

			// Get the `event` name and if we are listening to the element or viewModel.
			// The attribute name is the name of the event.
			var attributeName = data.attributeName,
			// The old way of binding is can-X
				legacyBinding = attributeName.indexOf('can-') === 0,
				event = attributeName.indexOf('can-') === 0 ?
					attributeName.substr("can-".length) :
					removeBrackets(attributeName, '(', ')'),
				onBindElement = legacyBinding;

			event = decodeAttrName(event);

			if(event.charAt(0) === "$") {
				event = event.substr(1);
				onBindElement = true;
			}

			// This is the method that the event will initially trigger. It will look up the method by the string name
			// passed in the attribute and call it.
			var handler = function (ev) {
					var attrVal = el.getAttribute(attributeName);
					if (!attrVal) { return; }

					var viewModel = canViewModel(el);

					// expression.parse will read the attribute
					// value and parse it identically to how mustache helpers
					// get parsed.
					var expr = expression.parse(removeBrackets(attrVal),{
						lookupRule: function(){
							return expression.Lookup;
						}, methodRule: "call"});

					if(!(expr instanceof expression.Call) && !(expr instanceof expression.Helper)) {

						var defaultArgs = [data.scope._context, el].concat(makeArray(arguments)).map(function(data){
							return new expression.Arg(new expression.Literal(data));
						});
						expr = new expression.Call(expr, defaultArgs, {} );
					}

					// make a scope with these things just under
					var localScope = data.scope.add({
						"@element": el,
						"@event": ev,
						"@viewModel": viewModel,
						"@scope": data.scope,
						"@context": data.scope._context,

						"%element": this,
						"$element": types.wrapElement(el),
						"%event": ev,
						"%viewModel": viewModel,
						"%scope": data.scope,
						"%context": data.scope._context,
						"%arguments": arguments
					},{
						notContext: true
					});


					// We grab the first item and treat it as a method that
					// we'll call.
					var scopeData = localScope.read(expr.methodExpr.key, {
						isArgument: true
					}), args, stacheHelper, stacheHelperResult;

					if (!scopeData.value) {
						// nothing found yet, look for a stache helper
						var name = observeReader.reads(expr.methodExpr.key).map(function(part){
							return part.key;
						}).join(".");

						stacheHelper = stacheHelperCore.getHelper(name);
						if(stacheHelper){
							args = expr.args(localScope, null)();
							stacheHelperResult = stacheHelper.fn.apply(localScope.peek("."), args);
							if(typeof stacheHelperResult === "function"){
							  stacheHelperResult(el);
							}
							return stacheHelperResult;
						}

						//!steal-remove-start
						dev.warn("can-stache-bindings: " + attributeName + " couldn't find method named " + expr.methodExpr.key, {
							element: el,
							scope: data.scope
						});
						//!steal-remove-end

						return null;
					}

					args = expr.args(localScope, null)();
					return scopeData.value.apply(scopeData.parent, args);
				};

			// This code adds support for special event types, like can-enter="foo". special.enter (or any special[event]) is
			// a function that returns an object containing an event and a handler. These are to be used for binding. For example,
			// when a user adds a can-enter attribute, we'll bind on the keyup event, and the handler performs special logic to
			// determine on keyup if the enter key was pressed.
			if (special[event]) {
				var specialData = special[event](data, el, handler);
				handler = specialData.handler;
				event = specialData.event;
			}

			var context;
			if(onBindElement){
				context = el;
			}else{
				if(event.indexOf(" ") >= 0){
					var eventSplit = event.split(" ");
					context = data.scope.get(eventSplit[0]);
					event = eventSplit[1];
				}else{
					context = canViewModel(el);
				}
			}

			// Unbind the event when the attribute is removed from the DOM
			var attributesHandler = function(ev) {
				var isEventAttribute = ev.attributeName === attributeName;
				var isRemoved = !this.getAttribute(attributeName);
				var isEventAttributeRemoved = isEventAttribute && isRemoved;
				if (isEventAttributeRemoved) {
					unbindEvent();
				}
			};
			// Unbind the event when the target is removed from the DOM
			var removedHandler = function(ev) {
				unbindEvent();
			};
			var unbindEvent = function() {
				canEvent.off.call(context, event, handler);
				canEvent.off.call(el, 'attributes', attributesHandler);
				canEvent.off.call(el, 'removed', removedHandler);
			};

			// Bind the handler defined above to the element we're currently processing and the event name provided in this
			// attribute name (can-click="foo")
			canEvent.on.call(context, event, handler);
			canEvent.on.call(el, 'attributes', attributesHandler);
			canEvent.on.call(el, 'removed', removedHandler);
		},
		// ### bindings.behaviors.value
		// Behavior for the deprecated can-value
		value: function(el, data) {
			var propName = "$value",
				attrValue = removeBrackets(el.getAttribute("can-value")).trim(),
				nodeName = el.nodeName.toLowerCase(),
				elType = nodeName === "input" && (el.type || el.getAttribute("type")),
				getterSetter;

			if (nodeName === "input" && (elType === "checkbox" || elType === "radio")) {

				var property = getComputeFrom.scope(el, data.scope, attrValue, {}, true);
				if (el.type === "checkbox") {

					var trueValue = attr.has(el, "can-true-value") ? el.getAttribute("can-true-value") : true,
						falseValue = attr.has(el, "can-false-value") ? el.getAttribute("can-false-value") : false;

					getterSetter = compute(function (newValue) {
						// jshint eqeqeq: false
						var isSet = arguments.length !== 0;
						var isCompute = property && property.isComputed;
						if (isCompute) {
							if (isSet) {
								property(newValue ? trueValue : falseValue);
							} else {
								return property() == trueValue;
							}
						} else {
							if (isSet) {
								// TODO: https://github.com/canjs/can-stache-bindings/issues/180
							} else {
								return property == trueValue;
							}
						}
					});
				}
				else if(elType === "radio") {
					// radio is two-way bound to if the property value
					// equals the element value
					getterSetter = compute(function (newValue) {
						// jshint eqeqeq: false
						var isSet = arguments.length !== 0 && newValue;
						var isCompute = property && property.isComputed;
						if (isCompute) {
							if (isSet) {
								property(el.value);
							} else {
								return property() == el.value;
							}
						} else {
							if (isSet) {
								// TODO: https://github.com/canjs/can-stache-bindings/issues/180
							} else {
								return property == el.value;
							}
						}
					});
				}
				propName = "$checked";
				attrValue = "getterSetter";
				data.scope = new Scope({
					getterSetter: getterSetter
				});
			}
			// For contenteditable elements, we instantiate a Content control.
			else if (isContentEditable(el)) {
				propName = "$innerHTML";
			}

			var dataBinding = makeDataBinding({
				name: "{(" + propName + "})",
				value: attrValue
			}, el, {
				templateType: data.templateType,
				scope: data.scope,
				semaphore: {},
				initializeValues: true,
				legacyBindings: true
			});

			canEvent.one.call(el, "removed", function(){
				dataBinding.onTeardown();
			});

		}
	};


	// ## Attribute Syntaxes
	// The following sets up the bindings functions to be called
	// when called in a template.

	// `{}="bar"` data bindings.
	viewCallbacks.attr(/^\{[^\}]+\}$/, behaviors.data);

	// `*ref-export` shorthand.
	viewCallbacks.attr(/\*[\w\.\-_]+/, behaviors.reference);

	// `(EVENT)` event bindings.
	viewCallbacks.attr(/^\([\$?\w\.\\]+\)$/, behaviors.event);


	//!steal-remove-start
	function syntaxWarning(el, attrData) {
		dev.warn('can-stache-bindings: mismatched binding syntax - ' + attrData.attributeName);
	}
	viewCallbacks.attr(/^\(.+\}$/, syntaxWarning);
	viewCallbacks.attr(/^\{.+\)$/, syntaxWarning);
	viewCallbacks.attr(/^\(\{.+\}\)$/, syntaxWarning);
	//!steal-remove-end


	// Legacy bindings.
	viewCallbacks.attr(/can-[\w\.]+/, behaviors.event);
	viewCallbacks.attr("can-value", behaviors.value);


	// ## getComputeFrom
	// An object of helper functions that make a getter/setter compute
	// on different types of objects.
	var getComputeFrom = {
		// ### getComputeFrom.scope
		// Returns a compute from the scope.  This handles expressions like `someMethod(.,1)`.
		scope: function(el, scope, scopeProp, bindingData, mustBeACompute, stickyCompute){
			if(!scopeProp) {
				return compute();
			} else {
				if(mustBeACompute) {
					var parentExpression = expression.parse(scopeProp,{baseMethodType: "Call"});
					return parentExpression.value(scope, new Scope.Options({}));
				} else {
					return function(newVal){
						scope.set(cleanVMName(scopeProp), newVal);
					};
				}
			}

		},
		// ### getComputeFrom.viewModel
		// Returns a compute that's two-way bound to the `viewModel` returned by
		// `options.getViewModel()`.
		viewModel: function(el, scope, vmName, bindingData, mustBeACompute, stickyCompute) {
			var setName = cleanVMName(vmName);
			if(mustBeACompute) {
				return compute(function(newVal){
					var viewModel = bindingData.getViewModel();
					if(arguments.length) {
						if( types.isMapLike(viewModel) ) {
							observeReader.set(viewModel,setName,newVal);
						} else {
							viewModel[setName] = newVal;
						}

					} else {
						return vmName === "." ? viewModel : observeReader.read(viewModel, observeReader.reads(vmName), {}).value;
					}
				});
			} else {
				return function(newVal){
					var childCompute;
					var viewModel = bindingData.getViewModel();

					function updateViewModel(value, options) {
						if( types.isMapLike(viewModel) ) {
							observeReader.set(viewModel, setName, value, options);
						} else {
							viewModel[setName] = value;
						}
					}

					if(stickyCompute) {
						childCompute = observeReader.get(viewModel, setName, { readCompute: false });
						// childCompute is a compute at this point unless it was locally overwritten
						//  in the child viewModel.
						if(!childCompute || !childCompute.isComputed) {
							// If it was locally overwritten, make a new compute for the property.
							childCompute = compute();
							updateViewModel(childCompute, { readCompute: false });
						}
						// Otherwise update the compute's value.
						childCompute(newVal);
					} else {
						updateViewModel(newVal);
					}
				};
			}


		},
		// ### getComputeFrom.attribute
		// Returns a compute that is two-way bound to an attribute or property on the element.
		attribute: function(el, scope, prop, bindingData, mustBeACompute, stickyCompute, event){
			// Determine the event or events we need to listen to
			// when this value changes.
			if(!event) {
				event = "change";
				var isRadioInput = el.nodeName === 'INPUT' && el.type === 'radio';
				var isValidProp = prop === 'checked' && !bindingData.legacyBindings;
				if (isRadioInput && isValidProp) {
					event = 'radiochange';
				}

				var isSpecialProp = attr.special[prop] && attr.special[prop].addEventListener;
				if (isSpecialProp) {
					event = prop;
				}
			}

			var hasChildren = el.nodeName.toLowerCase() === "select",
				isMultiselectValue = prop === "value" && hasChildren && el.multiple,
				// Sets the element property or attribute.
				set = function(newVal){
					if(bindingData.legacyBindings && hasChildren &&
						 ("selectedIndex" in el) && prop === "value") {
						attr.setAttrOrProp(el, prop, newVal == null ? "" : newVal);
					} else {
						attr.setAttrOrProp(el, prop, newVal);
					}

					return newVal;
				},
				get = function(){
					return attr.get(el, prop);
				};

			if(isMultiselectValue) {
				prop = "values";
			}

			return compute(get(), {
				on: function(updater){
					if (event === "radiochange") {
						canEvent.on.call(el, "change", updater);
					}

					canEvent.on.call(el, event, updater);
				},
				off: function(updater){
					if (event === "radiochange") {
						canEvent.off.call(el, "change", updater);
					}

					canEvent.off.call(el, event, updater);
				},
				get: get,
				set: set
			});
		}
	};

	// ## bind
	// An object with helpers that perform bindings in a certain direction.
	// These use the semaphore to prevent cycles.
	var bind = {
		// ## bind.childToParent
		// Listens to the child and updates the parent when it changes.
		// - `syncChild` - Makes sure the child is equal to the parent after the parent is set.
		childToParent: function(el, parentCompute, childCompute, bindingsSemaphore, attrName, syncChild){
			var parentUpdateIsFunction = typeof parentCompute === "function";

			// Updates the parent if
			var updateParent = function(ev, newVal){

				if (!bindingsSemaphore[attrName]) {
					if(parentUpdateIsFunction) {
						parentCompute(newVal);

						if( syncChild ) {
							// If, after setting the parent, it's value is not the same as the child,
							// update the child with the value of the parent.
							// This is used by `can-value`.
							if(parentCompute() !== childCompute()) {
								bindingsSemaphore[attrName] = (bindingsSemaphore[attrName] || 0 )+1;
								childCompute(parentCompute());
								Observation.afterUpdateAndNotify(function(){
									--bindingsSemaphore[attrName];
								});
							}
						}
					}
					// The parentCompute can sometimes be just an observable if the observable
					// is on a plain JS object. This updates the observable to match whatever the
					// new value is.
					else if(types.isMapLike(parentCompute)) {
						// !steal-dev-start
						var attrValue = el.getAttribute(attrName);
						dev.warn("can-stache-bindings: Merging " + attrName + " into " + attrValue + " because its parent is non-observable");
						// !steal-dev-end
						(parentCompute.set || parentCompute.attr).call(
							parentCompute,
							newVal.serialize ? newVal.serialize() : newVal,
							true
						);
					}
				}
			};

			if(childCompute && childCompute.isComputed) {
				childCompute.bind("change", updateParent);
			}

			return updateParent;
		},
		// parent -> child binding
		parentToChild: function(el, parentCompute, childUpdate, bindingsSemaphore, attrName){

			// setup listening on parent and forwarding to viewModel
			var updateChild = function(ev, newValue){

				// Save the viewModel property name so it is not updated multiple times.
				// We listen for when the batch has ended, and all observation updates have ended.
				bindingsSemaphore[attrName] = (bindingsSemaphore[attrName] || 0 )+1;
				canBatch.start();
				childUpdate(newValue);

				// only after computes have been updated, reduce the update counter
				Observation.afterUpdateAndNotify(function(){
					--bindingsSemaphore[attrName];
				});
				canBatch.stop();
			};

			if(parentCompute && parentCompute.isComputed) {
				parentCompute.bind("change", updateChild);
			}

			return updateChild;
		}
	};

	// Regular expressions for getBindingInfo
	var bindingsRegExp = /\{(\()?(\^)?([^\}\)]+)\)?\}/,
		ignoreAttributesRegExp = /^(data-view-id|class|id|\[[\w\.-]+\]|#[\w\.-])$/i,
		DOUBLE_CURLY_BRACE_REGEX = /\{\{/g,
		encodedSpacesRegExp = /\\s/g,
		encodedForwardSlashRegExp = /\\f/g;

	// ## getBindingInfo
	// takes a node object like {name, value} and returns
	// an object with information about that binding.
	// Properties:
	// - `parent` - where is the parentName read from: "scope", "attribute", "viewModel".
	// - `parentName` - what is the parent property that should be read.
	// - `child` - where is the childName read from: "scope", "attribute", "viewModel".
	//  - `childName` - what is the child property that should be read.
	// - `parentToChild` - should changes in the parent update the child.
	// - `childToParent` - should changes in the child update the parent.
	// - `bindingAttributeName` - the attribute name that created this binding.
	// - `initializeValues` - should parent and child be initialized to their counterpart.
	// If undefined is return, there is no binding.
	var getBindingInfo = function(node, attributeViewModelBindings, templateType, tagName){
		var bindingInfo,
			attributeName = node.name,
			attributeValue = node.value || "";

		// Does this match the new binding syntax?
		var matches = attributeName.match(bindingsRegExp);
		if(!matches) {
			var ignoreAttribute = ignoreAttributesRegExp.test(attributeName);
			var vmName = string.camelize(attributeName);

			//!steal-remove-start
			// user tried to pass something like id="{foo}", so give them a good warning
			// Something like id="{{foo}}" is ok, though. (not a binding)
			if(ignoreAttribute && node.value.replace(DOUBLE_CURLY_BRACE_REGEX, "").indexOf("{") > -1) {
				dev.warn("can-component: looks like you're trying to pass "+attributeName+" as an attribute into a component, "+
				"but it is not a supported attribute");
			}
			//!steal-remove-end

			// if this is handled by another binding or a attribute like `id`.
			if ( ignoreAttribute || viewCallbacks.attr(attributeName) ) {
				return;
			}
			var syntaxRight = attributeValue[0] === "{" && last(attributeValue) === "}";
			var isAttributeToChild = templateType === "legacy" ? attributeViewModelBindings[vmName] : !syntaxRight;
			var scopeName = syntaxRight ? attributeValue.substr(1, attributeValue.length - 2 ) : attributeValue;
			if(isAttributeToChild) {
				return {
					bindingAttributeName: attributeName,
					parent: "attribute",
					parentName: attributeName,
					child: "viewModel",
					childName: vmName,
					parentToChild: true,
					childToParent: true,
					syncChildWithParent: true
				};
			} else {
				return {
					bindingAttributeName: attributeName,
					parent: "scope",
					parentName: scopeName,
					child: "viewModel",
					childName: vmName,
					parentToChild: true,
					childToParent: true,
					syncChildWithParent: true
				};
			}
		}

		var twoWay = !!matches[1],
			childToParent = twoWay || !!matches[2],
			parentToChild = twoWay || !childToParent;

		var childName = matches[3];
		var isDOM = childName.charAt(0) === "$";
		if(isDOM) {
			bindingInfo = {
				parent: "scope",
				child: "attribute",
				childToParent: childToParent,
				parentToChild: parentToChild,
				bindingAttributeName: attributeName,
				childName: childName.substr(1),
				parentName: attributeValue,
				initializeValues: true,
				syncChildWithParent: twoWay
			};
			if(tagName === "select") {
				bindingInfo.stickyParentToChild = true;
			}
			return bindingInfo;
		} else {
			bindingInfo = {
				parent: "scope",
				child: "viewModel",
				childToParent: childToParent,
				parentToChild: parentToChild,
				bindingAttributeName: attributeName,
				childName: decodeAttrName(string.camelize(childName)),
				parentName: attributeValue,
				initializeValues: true,
				syncChildWithParent: twoWay
			};
			if(attributeValue.trim().charAt(0) === "~") {
				bindingInfo.stickyParentToChild = true;
			}
			return bindingInfo;
		}

	};
	var decodeAttrName = function(name){
		return name
			.replace(encodedSpacesRegExp, " ")
			.replace(encodedForwardSlashRegExp, "/");
	};


	// ## makeDataBinding
	// Makes a data binding for an attribute `node`.  Returns an object with information
	// about the binding, including an `onTeardown` method that undoes the binding.
	// If the data binding involves a `viewModel`, an `onCompleteBinding` method is returned on
	// the object.  This method must be called after the element has a `viewModel` with the
	// `viewModel` to complete the binding.
	//
	// - `node` - an attribute node or an object with a `name` and `value` property.
	// - `el` - the element this binding belongs on.
	// - `bindingData` - an object with:
	//   - `templateType` - the type of template.
	//   - `scope` - the `Scope`,
	//   - `semaphore` - an object that keeps track of changes in different properties to prevent cycles,
	//   - `getViewModel`  - a function that returns the `viewModel` when called.  This function can be passed around (not called) even if the
	//      `viewModel` doesn't exist yet.
	//   - `attributeViewModelBindings` - properties already specified as being a viewModel<->attribute (as opposed to viewModel<->scope) binding.
	//
	// Returns:
	// - `undefined` - If this isn't a data binding.
	// - `object` - An object with information about the binding.
	var makeDataBinding = function(node, el, bindingData){

		// Get information about the binding.
		var bindingInfo = getBindingInfo(node, bindingData.attributeViewModelBindings, bindingData.templateType, el.nodeName.toLowerCase());
		if(!bindingInfo) {
			return;
		}
		// assign some bindingData props to the bindingInfo
		bindingInfo.alreadyUpdatedChild = bindingData.alreadyUpdatedChild;
		if( bindingData.initializeValues) {
			bindingInfo.initializeValues = true;
		}

		// Get computes for the parent and child binding
		var parentCompute = getComputeFrom[bindingInfo.parent](
				el,
				bindingData.scope,
				bindingInfo.parentName,
				bindingData, bindingInfo.parentToChild
			),
			childCompute = getComputeFrom[bindingInfo.child](
				el,
				bindingData.scope,
				bindingInfo.childName,
				bindingData,
				bindingInfo.childToParent,
				bindingInfo.stickyParentToChild && parentCompute
			),
			// these are the functions bound to one compute that update the other.
			updateParent,
			updateChild,
			childLifecycle;

		if(bindingData.nodeList) {
			if(parentCompute && parentCompute.isComputed){
				parentCompute.computeInstance.setPrimaryDepth(bindingData.nodeList.nesting+1);
			}
			if(childCompute && childCompute.isComputed){
				childCompute.computeInstance.setPrimaryDepth(bindingData.nodeList.nesting+1);
			}
		}

		// Only bind to the parent if it will update the child.
		if(bindingInfo.parentToChild){
			updateChild = bind.parentToChild(el, parentCompute, childCompute, bindingData.semaphore, bindingInfo.bindingAttributeName);
		}

		// This completes the binding.  We can't call it right away because
		// the `viewModel` might not have been created yet.
		var completeBinding = function(){
			if(bindingInfo.childToParent){
				// setup listening on parent and forwarding to viewModel
				updateParent = bind.childToParent(el, parentCompute, childCompute, bindingData.semaphore, bindingInfo.bindingAttributeName,
					bindingInfo.syncChildWithParent);
			}
			// the child needs to be bound even if
			else if(bindingInfo.stickyParentToChild) {
				childCompute.bind("change", childLifecycle = function(){});
			}

			if(bindingInfo.initializeValues) {
				initializeValues(bindingInfo, childCompute, parentCompute, updateChild, updateParent);
			}


		};
		// This tears down the binding.
		var onTeardown = function() {
			unbindUpdate(parentCompute, updateChild);
			unbindUpdate(childCompute, updateParent);
			unbindUpdate(childCompute, childLifecycle);
		};
		// If this binding depends on the viewModel, which might not have been created,
		// return the function to complete the binding as `onCompleteBinding`.
		if(bindingInfo.child === "viewModel") {
			return {
				value: bindingInfo.stickyParentToChild ? compute(getValue(parentCompute)) : getValue(parentCompute),
				onCompleteBinding: completeBinding,
				bindingInfo: bindingInfo,
				onTeardown: onTeardown
			};
		} else {
			completeBinding();
			return {
				bindingInfo: bindingInfo,
				onTeardown: onTeardown
			};

		}
	};

	// ## initializeValues
	// Updates the parent or child value depending on the direction of the binding
	// or if the child or parent is `undefined`.
	var initializeValues = function(bindingInfo, childCompute, parentCompute, updateChild, updateParent){
		var doUpdateParent = false;
		if(bindingInfo.parentToChild && !bindingInfo.childToParent) {
			// updateChild
		}
		else if(!bindingInfo.parentToChild && bindingInfo.childToParent) {
			doUpdateParent = true;
		}
		// Two way
		// Update child or parent depending on who has a value.
		// If both have a value, update the child.
		else if( getValue(childCompute) === undefined) {
			// updateChild
		} else if(getValue(parentCompute) === undefined) {
			doUpdateParent = true;
		}

		if(doUpdateParent) {
			updateParent({}, getValue(childCompute) );
		} else {
			if(!bindingInfo.alreadyUpdatedChild) {
				updateChild({}, getValue(parentCompute) );
			}
		}
	};

	// For "sticky" select values, we need to know when `<option>`s are
	// added or removed to a `<select>`.  If we don't have
	// MutationObserver, we need to setup can.view.live to
	// callback when this happens.
	if( !getMutationObserver() ) {
		var updateSelectValue = function(el){
			var bindingCallback = domData.get.call(el,"canBindingCallback");
			if(bindingCallback) {
				bindingCallback.onMutation(el);
			}
		};
		live.registerChildMutationCallback("select",updateSelectValue);
		live.registerChildMutationCallback("optgroup",function(el){
			updateSelectValue(el.parentNode);
		});
	}


	// ## isContentEditable
	// Determines if an element is contenteditable.
	// An element is contenteditable if it contains the `contenteditable`
	// attribute set to either an empty string or "true".
	// By default an element is also contenteditable if its immediate parent
	// has a truthy version of the attribute, unless the element is explicitly
	// set to "false".
	var isContentEditable = (function(){
		// A contenteditable element has a value of an empty string or "true"
		var values = {
			"": true,
			"true": true,
			"false": false
		};

		// Tests if an element has the appropriate contenteditable attribute
		var editable = function(el){
			// DocumentFragments do not have a getAttribute
			if(!el || !el.getAttribute) {
				return;
			}

			var attr = el.getAttribute("contenteditable");
			return values[attr];
		};

		return function (el){
			// First check if the element is explicitly true or false
			var val = editable(el);
			if(typeof val === "boolean") {
				return val;
			} else {
				// Otherwise, check the parent
				return !!editable(el.parentNode);
			}
		};
	})(),
		removeBrackets = function(value, open, close){
			open = open || "{";
			close = close || "}";

			if(value[0] === open && value[value.length-1] === close) {
				return value.substr(1, value.length - 2);
			}
			return value;
		},
		getValue = function(value){
			return value && value.isComputed ? value() : value;
		},
		unbindUpdate = function(compute, updateOther){
			if(compute && compute.isComputed && typeof updateOther === "function") {
				compute.unbind("change", updateOther);
			}
		},
		cleanVMName = function(name){
			return name.replace(/@/g,"");
		};


	// ## Special Event Types (can-SPECIAL)
	//
	// A special object, similar to [$.event.special](http://benalman.com/news/2010/03/jquery-special-events/),
	// for adding hooks for special can-SPECIAL types (not native DOM events). Right now, only can-enter is
	// supported, but this object might be exported so that it can be added to easily.
	//
	// To implement a can-SPECIAL event type, add a property to the special object, whose value is a function
	// that returns the following:
	//
	//		// the real event name to bind to
	//		event: "event-name",
	//		handler: function (ev) {
	//			// some logic that figures out if the original handler should be called or not, and if so...
	//			return original.call(this, ev);
	//		}
	var special = {
		enter: function (data, el, original) {
			return {
				event: "keyup",
				handler: function (ev) {
					if (ev.keyCode === 13 || ev.key === "Enter") {
						return original.call(this, ev);
					}
				}
			};
		}
	};

	module.exports = {
		behaviors: behaviors,
		getBindingInfo: getBindingInfo,
		special: special
	};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var helpers = __webpack_require__(35);
var expression = __webpack_require__(45);
var makeArray = __webpack_require__(12)

helpers.registerConverter = function(name, getterSetter) {
	getterSetter = getterSetter || {};
	helpers.registerHelper(name, function(newVal, source) {
		var args = makeArray(arguments);
		if(newVal instanceof expression.SetIdentifier) {
			return typeof getterSetter.set === "function" 
				? getterSetter.set.apply(this, [newVal.value].concat(args.slice(1))) 
				: source(newVal.value);
		} else {
			return typeof getterSetter.get === "function" 
				? getterSetter.get.apply(this, args)
				: args[0];
		}
	});
};

module.exports = helpers;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var target = __webpack_require__(68);
var Scope = __webpack_require__(42);
var Observation = __webpack_require__(7);

var utils = __webpack_require__(29);
var mustacheCore = __webpack_require__(28);

var getDocument = __webpack_require__(5);

var assign = __webpack_require__(3);
var last = __webpack_require__(32);

var decodeHTML = typeof document !== "undefined" && (function(){
	var el = getDocument().createElement('div');
	return function(html){
		if(html.indexOf("&") === -1) {
			return html.replace(/\r\n/g,"\n");
		}
		el.innerHTML = html;
		return el.childNodes.length === 0 ? "" : el.childNodes.item(0).nodeValue;
	};
})();
// ## HTMLSectionBuilder
//
// Contains a stack of HTMLSections.
// An HTMLSection is created everytime a subsection is found. For example:
//
//     {{#if items}} {{#items}} X
//
// At the point X was being processed, their would be 2 HTMLSections in the
// stack.  One for the content of `{{#if items}}` and the other for the
// content of `{{#items}}`
var HTMLSectionBuilder = function(){
	this.stack = [new HTMLSection()];
};

assign(HTMLSectionBuilder.prototype,utils.mixins);

assign(HTMLSectionBuilder.prototype,{
	startSubSection: function(process){
		var newSection = new HTMLSection(process);
		this.stack.push(newSection);
		return newSection;
	},
	// Ends the current section and returns a renderer.
	// But only returns a renderer if there is a template.
	endSubSectionAndReturnRenderer: function(){
		if(this.last().isEmpty()) {
			this.stack.pop();
			return null;
		} else {
			var htmlSection = this.endSection();
			return htmlSection.compiled.hydrate.bind(htmlSection.compiled);
		}
	},
	startSection: function( process ) {
		var newSection = new HTMLSection(process);
		this.last().add(newSection.targetCallback);
		// adding a section within a section ...
		// the stack has section ...
		this.stack.push(newSection);
	},
	endSection: function(){
		this.last().compile();
		return this.stack.pop();
	},
	inverse: function(){
		this.last().inverse();
	},
	compile: function(){
		var compiled = this.stack.pop().compile();
		// ignore observations here.  the render fn
		//  itself doesn't need to be observable.
		return Observation.ignore(function(scope, options, nodeList){
			if ( !(scope instanceof Scope) ) {
				scope = Scope.refsScope().add(scope || {});
			}
			if ( !(options instanceof mustacheCore.Options) ) {
				options = new mustacheCore.Options(options || {});
			}
			return compiled.hydrate(scope, options, nodeList);
		});
	},
	push: function(chars){
		this.last().push(chars);
	},
	pop: function(){
		return this.last().pop();
	}
});

var HTMLSection = function(process){
	this.data = "targetData";
	this.targetData = [];
	// A record of what targetData element we are within.
	this.targetStack = [];
	var self = this;
	this.targetCallback = function(scope, options, sectionNode){
		process.call(this,
			scope,
			options,
			sectionNode,
			self.compiled.hydrate.bind(self.compiled),
			self.inverseCompiled && self.inverseCompiled.hydrate.bind(self.inverseCompiled)  ) ;
	};
};
assign(HTMLSection.prototype,{
	inverse: function(){
		this.inverseData = [];
		this.data = "inverseData";
	},
	// Adds a DOM node.
	push: function(data){
		this.add(data);
		this.targetStack.push(data);
	},
	pop: function(){
		return this.targetStack.pop();
	},
	add: function(data){
		if(typeof data === "string"){
			data = decodeHTML(data);
		}
		if(this.targetStack.length) {
			last(this.targetStack).children.push(data);
		} else {
			this[this.data].push(data);
		}
	},
	compile: function(){
		this.compiled = target(this.targetData, getDocument());
		if(this.inverseData) {
			this.inverseCompiled = target(this.inverseData, getDocument());
			delete this.inverseData;
		}
		this.targetStack = this.targetData = null;
		return this.compiled;
	},
	children: function(){
		if(this.targetStack.length) {
			return last(this.targetStack).children;
		} else {
			return this[this.data];
		}
	},
	// Returns if a section is empty
	isEmpty: function(){
		return !this.targetData.length;
	}
});
HTMLSectionBuilder.HTMLSection = HTMLSection;

module.exports = HTMLSectionBuilder;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var compute = __webpack_require__(9);
var live = __webpack_require__(41);

var utils = __webpack_require__(29);

var attr = __webpack_require__(24);

var assign = __webpack_require__(3);

var noop = function(){};

var TextSectionBuilder = function(){
	this.stack = [new TextSection()];
};

assign(TextSectionBuilder.prototype,utils.mixins);

assign(TextSectionBuilder.prototype,{
	// Adds a subsection.
	startSection: function(process){
		var subSection = new TextSection();
		this.last().add({process: process, truthy: subSection});
		this.stack.push(subSection);
	},
	endSection: function(){
		this.stack.pop();
	},
	inverse: function(){
		this.stack.pop();
		var falseySection = new TextSection();
		this.last().last().falsey = falseySection;
		this.stack.push(falseySection);
	},
	compile: function(state){

		var renderer = this.stack[0].compile();

		return function(scope, options){

			var computeValue = compute(function(){
				return renderer(scope, options);
			}, null, false);

			computeValue.computeInstance.addEventListener("change", noop);
			var value = computeValue();
			if( computeValue.computeInstance.hasDependencies ) {
				if(state.textContentOnly) {
					live.text(this, computeValue);
				}
				else if(state.attr) {
					live.attr(this, state.attr, computeValue);
				}
				else {
					live.attrs(this, computeValue, scope, options);
				}
				computeValue.computeInstance.removeEventListener("change", noop);
			} else {
				if(state.textContentOnly) {
					this.nodeValue = value;
				}
				else if(state.attr) {
					attr.set(this, state.attr, value);
				}
				else {
					live.attrs(this, value);
				}
			}
		};
	}
});

var passTruthyFalsey = function(process, truthy, falsey){
	return function(scope, options){
		return process.call(this, scope, options, truthy, falsey);
	};
};

var TextSection = function(){
	this.values = [];
};

assign( TextSection.prototype, {
	add: function(data){
		this.values.push(data);
	},
	last: function(){
		return this.values[this.values.length - 1];
	},
	compile: function(){
		var values = this.values,
			len = values.length;

		for(var i = 0 ; i < len; i++) {
			var value = this.values[i];
			if(typeof value === "object") {
				values[i] = passTruthyFalsey( value.process,
				    value.truthy && value.truthy.compile(),
				    value.falsey && value.falsey.compile());
			}
		}

		return function(scope, options){
			var txt = "",
				value;
			for(var i = 0; i < len; i++){
				value = values[i];
				txt += typeof value === "string" ? value : value.call(this, scope, options);
			}
			return txt;
		};
	}
});

module.exports = TextSectionBuilder;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// From http://jaketrent.com/post/addremove-classes-raw-javascript/

var has = function(className) {
	if (this.classList) {
		return this.classList.contains(className);
	} else {
		return !!this.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	}
};

/**
 * @module {{}} can-util/dom/class-name/class-name class-name
 * @parent can-util/dom
 * @description Allows querying and manipulation of classes on HTML elements
 *
 * ```js
 * var className = require("can-util/dom/class-name/class-name");
 *
 * var fooDiv = document.createElement("div");
 * className.add(fooDiv, "foo");
 * fooDiv.outerHTML; //-> '<div class="foo"></div>'
 * ```
 */
module.exports = {
	/**
	 * @function can-util/dom/class-name/class-name.has className.has
	 * @parent can-util/dom/class-name/class-name
   * @signature `className.has.call(el, cls)`
	 *
	 * Determine wheter a DOM node has a given class name.
	 *
	 * ```js
	 * var className = require("can-util/dom/class-name/class-name");
	 * 
	 * var isContainer = className.has.call(el, "container");
	 * ```
	 *
	 * @param {String} className A string representing a single class name token
	 *
	 * @return {Boolean} true if the element's class attribute contains the token, false otherwise.
	 */
	has: has,
	/**
	 * @function can-util/dom/class-name/class-name.add className.add
	 * @parent can-util/dom/class-name/class-name
	 * @signature `className.add.call(el, cls)`
	 *
	 * Add a class name to a DOM node if it is not already there.
	 *
	 * ```js
	 * var className = require("can-util/dom/class-name/class-name");
	 * 
	 * className.add.call(el, "container");
	 * ```
	 *
	 * @param {String} className A string representing a single class name token
	 *
	 * @return {void}
	 */
	add: function(className) {
		if (this.classList) {
			this.classList.add(className);
		}
		else if (!has.call(this, className)) {
			this.className += " " + className;
		}
	},
	/**
	 * @function can-util/dom/class-name/class-name.remove className.remove
	 * @parent can-util/dom/class-name/class-name
	 * @signature `className.remove.call(el, cls)`
	 *
	 * Remove a class name from a DOM node if it exists on the node
	 *
	 * ```js
	 * var className = require("can-util/dom/class-name/class-name");
	 * 
	 * className.remove.call(el, "container");
	 * ```
	 *
	 * @param {String} className A string representing a single class name token
	 *
	 * @return {void}
	 */
	remove: function(className) {
		if (this.classList) {
			this.classList.remove(className);
		} else if (has.call(this, className)) {
			var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
			this.className = this.className.replace(reg, ' ');
		}
	}
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var events = __webpack_require__(8);
var isOfGlobalDocument = __webpack_require__(49);
var domData = __webpack_require__(10);
var getMutationObserver = __webpack_require__(21);
var assign = __webpack_require__(3);
var domDispatch = __webpack_require__(17);

var originalAdd = events.addEventListener,
	originalRemove = events.removeEventListener;

/**
 * @module {events} can-util/dom/events/attributes/attributes attributes
 * @parent can-util/dom/events/events
 *
 * Adds a listenable "attributes" event to DOM nodes, which fires when
 * the node's attributes change.
 *
 * ```js
 * var events = require("can-util/dom/events/events");
 * require("can-util/dom/events/attributes/attributes");
 * var el = document.createElement("div");
 *
 * function attributesHandler() {
 * 	console.log("attributes event fired");
 * }
 * 
 * events.addEventListener.call(el, "attributes", attributesHandler, false);
 *
 * events.removeEventListener.call(el, "attributes", attributesHandler);
 * ```
 */
events.addEventListener = function(eventName){
	if(eventName === "attributes") {
		var MutationObserver = getMutationObserver();
		if( isOfGlobalDocument(this) && MutationObserver ) {
			var self = this;
			var observer = new MutationObserver(function (mutations) {
				mutations.forEach(function (mutation) {
					var copy = assign({}, mutation);
					domDispatch.call(self, copy, [], false);
				});

			});
			observer.observe(this, {
				attributes: true,
				attributeOldValue: true
			});
			domData.set.call(this, "canAttributesObserver", observer);
		} else {
			domData.set.call(this, "canHasAttributesBindings", true);
		}
	}
	return originalAdd.apply(this, arguments);

};

events.removeEventListener = function(eventName){
	if(eventName === "attributes") {
		var MutationObserver = getMutationObserver();
		var observer;

		if(isOfGlobalDocument(this) && MutationObserver) {
			observer = domData.get.call(this, "canAttributesObserver");

			if (observer && observer.disconnect) {
				observer.disconnect();
				domData.clean.call(this, "canAttributesObserver");
			}
		} else {
			domData.clean.call(this, "canHasAttributesBindings");
		}
	}
	return originalRemove.apply(this, arguments);
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*!
 * Based on jQuery v3.2.1 https://jquery.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 */

var domEvents = __webpack_require__(8),
	singleRef = __webpack_require__(104),
	cid = __webpack_require__(37);

// Some mouse/pointer events do not bubble so we derive these events from other
// bubbling events so they work with delegated listeners

var eventMap = {
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	},
	classMap = {
		mouseenter: "MouseEvent",
		mouseleave: "MouseEvent",
		pointerenter: "PointerEvent",
		pointerleave: "PointerEvent"
	},
	_addDelegateListener = domEvents.addDelegateListener,
	_removeDelegateListener = domEvents.removeDelegateListener;


domEvents.addDelegateListener = function(eventType, selector, handler) {
	if (eventMap[eventType] !== undefined) {
		var origHandler = handler,
			origType = eventType;

		eventType = eventMap[eventType];
		handler = function(event) {
			var target = this,
				related = event.relatedTarget;

			// For mouseenter/leave call the handler if related is outside the target.
			// No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !target.contains(related)) ) {
				// get new event with correct event type
				var eventClass = classMap[origType];

				if (eventClass === 'MouseEvent') {
					var newEv = document.createEvent(eventClass);
					newEv.initMouseEvent(origType, false, false, event.view, event.detail, event.screenX, event.screenY,
						event.clientX, event.clientY, event.ctrlKey, event.altKey, event.shiftKey, event.metaKey, event.button,
						event.relatedTarget);
					event = newEv;
				} else if (eventClass === 'PointerEvent') {
					event = new PointerEvent(origType, event);
				}

				return origHandler.call(this, event);
			}
		};

		singleRef.set(origHandler, cid(this)+eventType, handler);
	}

	_addDelegateListener.call(this, eventType, selector, handler);
};

domEvents.removeDelegateListener = function(eventType, selector, handler) {
	if (eventMap[eventType] !== undefined) {
		eventType = eventMap[eventType];
		handler = singleRef.getAndDelete(handler, cid(this)+eventType);
	}

	_removeDelegateListener.call(this, eventType, selector, handler);
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getDocument = __webpack_require__(5),
	childNodes = __webpack_require__(16);
// fragment.js
// ---------
// _DOM Fragment support._
var fragmentRE = /^\s*<(\w+)[^>]*>/,
	toString = {}.toString,
	fragment = function (html, name, doc) {
		if (name === undefined) {
			name = fragmentRE.test(html) && RegExp.$1;
		}
		if (html && toString.call(html.replace) === "[object Function]") {
			// Fix "XHTML"-style tags in all browsers
			html = html.replace(/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, '<$1></$2>');
		}
		var container = doc.createElement('div'),
			temp = doc.createElement('div');
		// IE's parser will strip any `<tr><td>` tags when `innerHTML`
		// is called on a `tbody`. To get around this, we construct a
		// valid table with a `tbody` that has the `innerHTML` we want.
		// Then the container is the `firstChild` of the `tbody`.
		// [source](http://www.ericvasilik.com/2006/07/code-karma.html).
		if (name === 'tbody' || name === 'tfoot' || name === 'thead' || name === 'colgroup') {
			temp.innerHTML = '<table>' + html + '</table>';
			container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild;
		} else if (name === 'col') {
			temp.innerHTML = '<table><colgroup>' + html + '</colgroup></table>';
			container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild.firstChild;
		} else if (name === 'tr') {
			temp.innerHTML = '<table><tbody>' + html + '</tbody></table>';
			container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild.firstChild;
		} else if (name === 'td' || name === 'th') {
			temp.innerHTML = '<table><tbody><tr>' + html + '</tr></tbody></table>';
			container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild.firstChild.firstChild;
		} else if (name === 'option') {
			temp.innerHTML = '<select>' + html + '</select>';
			container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild;
		} else {
			container.innerHTML = '' + html;
		}
		// IE8 barfs if you pass slice a `childNodes` object, so make a copy.
		var tmp = {},
			children = childNodes( container );
		tmp.length = children.length;
		for (var i = 0; i < children.length; i++) {
			tmp[i] = children[i];
		}
		return [].slice.call(tmp);
	};
var buildFragment = function (html, doc) {
	if(html && html.nodeType === 11) {
		return html;
	}
	if(!doc) {
		doc = getDocument();
	} else if(doc.length) {
		doc = doc[0];
	}

	var parts = fragment(html, undefined, doc),
		frag = (doc || document).createDocumentFragment();
	for(var i = 0, length = parts.length; i < length; i++) {
		frag.appendChild(parts[i]);
	}
	return frag;
};

// ## Fix build fragment.
// In IE8, we can pass a fragment and it removes newlines.
// This checks for that and replaces can.buildFragment with something
// that if only a single text node is returned, returns a fragment with
// a text node that is set to the content.


module.exports = buildFragment;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var matchesMethod = function(element) {
	return element.matches || element.webkitMatchesSelector || element.webkitMatchesSelector ||
		element.mozMatchesSelector || element.msMatchesSelector || element.oMatchesSelector;
};

module.exports = function(){
	var method = matchesMethod(this);
	return method ? method.apply(this, arguments) : false;
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var getGlobal = __webpack_require__(13);
var getDomDocument = __webpack_require__(5);

/**
 * @module {function} can-util/js/base-url/base-url base-url
 * @parent can-util/js
 * @signature `baseUrl(optionalBaseUrlToSet)`
 *
 * Get and/or set the "base" (containing path) of the document.
 *
 * ```js
 * var baseUrl = require("can-util/js/base-url/base-url");
 *
 * console.log(baseUrl());           // -> "http://localhost:8080"
 * console.log(baseUrl(baseUrl() + "/foo/bar")); // -> "http://localhost:8080/foo/bar"
 * console.log(baseUrl());           // -> "http://localhost:8080/foo/bar"
 * ```
 *
 * @param {String} setUrl An optional base url to override reading the base URL from the known path.
 *
 * @return {String} Returns the set or computed base URL
 */

var setBaseUrl;
module.exports = function(setUrl){
	if(setUrl !== undefined) {
		setBaseUrl = setUrl;
	}
	if(setBaseUrl !== undefined) {
		return setBaseUrl;
	}
	var global = getGlobal();
	var domDocument = getDomDocument();
	if (domDocument && 'baseURI' in domDocument) {
		return domDocument.baseURI;
	} else if(global.location) {
		var href = global.location.href;
		var lastSlash = href.lastIndexOf("/");
		return lastSlash !== -1 ? href.substr(0, lastSlash) : href;
	} else if(typeof process !== "undefined") {
		return process.cwd();
	}
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(55)))

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GLOBAL = __webpack_require__(13);
var each = __webpack_require__(1);
var getCID = __webpack_require__(37);

var CIDSet;

if(GLOBAL().Set) {
	CIDSet = GLOBAL().Set;
} else {
	var CIDSet = function(){
		this.values = {};
	};
	CIDSet.prototype.add = function(value){
		this.values[getCID(value)] = value;
	};
	CIDSet.prototype["delete"] = function(key){
		var has = getCID(key) in this.values;
		if(has) {
			delete this.values[getCID(key)];
		}
		return has;
	};
	CIDSet.prototype.forEach = function(cb, thisArg) {
		each(this.values, cb, thisArg);
	};
	CIDSet.prototype.has = function(value) {
		return (getCID(value) in this.values);
	};
	CIDSet.prototype.clear = function(key) {
		return this.values = {};
	};
	Object.defineProperty(CIDSet.prototype,"size",{
		get: function(){
			var size = 0;
			each(this.values, function(){
				size++;
			});
			return size;
		}
	});
}

module.exports = CIDSet;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArray = __webpack_require__(31);
var isFunction = __webpack_require__(23);
var isPlainObject = __webpack_require__(39);

function deepAssign() {
	/*jshint maxdepth:6 */
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length;

	// Handle case when target is a string or something (possible in deep copy)
	if (typeof target !== "object" && !isFunction(target)) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if (length === i) {
		/*jshint validthis:true*/
		target = this;
		--i;
	}

	for (; i < length; i++) {
		// Only deal with non-null/undefined values
		if ((options = arguments[i]) != null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target === copy) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if (copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
					if (copyIsArray) {
						copyIsArray = false;
						clone = src && isArray(src) ? src : [];

					} else {
						clone = src && isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[name] = deepAssign(clone, copy);

					// Don't bring in undefined values
				} else if (copy !== undefined) {
					target[name] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
}

module.exports = deepAssign;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



/**
 * @module {function} can-util/js/defaults/defaults defaults
 * @parent can-util/js
 * @signature `defaults(target, [ ... sources])`
 *
 * Mimics [_.defaults](https://lodash.com/docs/4.16.2#defaults). Assigns first level properties in sources from left to
 * right if they are not already defined.
 *
 * ```js
 * var defaults = require("can-util/js/defaults/defaults");
 *
 * var obj = {a: 1, b: 2};
 * var src = {b: 3, c: 3};
 *
 * assign(obj, src, {a: 2, d: 4});
 *
 * console.log(obj); // -> {a: 1, b: 2, c: 3, d: 4}
 * ```
 *
 * @param {Object} target The destination object. This object's properties will be mutated based on the objects provided as [ ... sources].
 * @param {Object} [ ... sources] The source objects whose own properties will be applied to `target`.
 *
 * @return {Object} Returns the `target` argument.
 */

module.exports = function (target) {
	var length = arguments.length;
	for (var i = 1; i < length; i++) {
		for (var prop in arguments[i]) {
			if (target[prop] === undefined) {
				target[prop] = arguments[i][prop];
			}
		}
	}
	return target;
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isFunction = __webpack_require__(23);
var global = __webpack_require__(13)();

/**
 * @module {function} can-util/js/import/import import
 * @parent can-util/js
 * @signature `importModule(moduleName, parentName)`
 *
 * ```js
 * var importModule = require("can-util/js/import/import");
 *
 * importModule("foo.stache").then(function(){
 *   // module was imported
 * });
 * ```
 *
 * @param {String} moduleName The module to be imported.
 * @param {String} [parentName] A parent module that will be used as a reference for resolving relative module imports.
 * @return {Promise} A Promise that will resolve when the module has been imported.
 */

module.exports = function(moduleName, parentName) {
	return new Promise(function(resolve, reject) {
		try {
			if(typeof global.System === "object" && isFunction(global.System["import"])) {
				global.System["import"](moduleName, {
					name: parentName
				}).then(resolve, reject);
			} else if(global.define && global.define.amd){
				global.require([moduleName], function(value){
					resolve(value);
				});
			} else if(global.require){
				resolve(global.require(moduleName));
			} else {
				// ideally this will use can.getObject
				resolve();
			}
		} catch(err) {
			reject(err);
		}
	});
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @module {function} can-util/js/is-browser-window/is-browser-window is-browser-window
 * @parent can-util/js
 * @signature `isBrowserWindow()`
 *
 * Returns `true` if the code is running within a Browser window. Use this function if you need special code paths for when running in a Browser window, a Web Worker, or another environment (such as Node.js).
 *
 * ```js
 * var isBrowserWindow = require("can-util/js/is-browser-window/is-browser-window");
 * var GLOBAL = require("can-util/js/global/global");
 *
 * if(isBrowserWindow()) {
 *   console.log(GLOBAL() === window); // -> true
 * }
 * ```
 *
 * @return {Boolean} True if the environment is a Browser window.
 */

module.exports = function(){
	return typeof window !== "undefined" &&
		typeof document !== "undefined" && typeof SimpleDOM === "undefined";
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @module {function} can-util/js/is-promise-like/is-promise-like is-promise-like
 * @parent can-util/js
 * @signature `isPromiseLike(obj)`
 *
 * Determines if an object is "Then-able".
 * Also see `isPromise(obj)` which checks for a standard [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
 *
 * ```js
 * var isPromiseLike = require("can-util/js/is-promise-like/is-promise-like");
 *
 * var promise = new Promise(function(resolve){
 *   resolve();
 * });
 *
 * console.log(isPromiseLike(promise)); // -> true
 * console.log(isPromiseLike("foo bar")); // -> false
 * ```
 *
 * @param {Object} obj An object to be tested.
 * @return {Boolean} True if the object is a Promise.
 */
module.exports = function(obj){
	return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parseURI = __webpack_require__(103);

module.exports = function(base, href) {
	function removeDotSegments(input) {
		var output = [];
		input.replace(/^(\.\.?(\/|$))+/, '')
			.replace(/\/(\.(\/|$))+/g, '/')
			.replace(/\/\.\.$/, '/../')
			.replace(/\/?[^\/]*/g, function (p) {
				if (p === '/..') {
					output.pop();
				} else {
					output.push(p);
				}
			});
		return output.join('').replace(/^\//, input.charAt(0) === '/' ? '/' : '');
	}

	href = parseURI(href || '');
	base = parseURI(base || '');

	return !href || !base ? null : (href.protocol || base.protocol) +
		(href.protocol || href.authority ? href.authority : base.authority) +
		removeDotSegments(href.protocol || href.authority || href.pathname.charAt(0) === '/' ? href.pathname : (href.pathname ? ((base.authority && !base.pathname ? '/' : '') + base.pathname.slice(0, base.pathname.lastIndexOf('/') + 1) + href.pathname) : base.pathname)) +
			(href.protocol || href.authority || href.pathname ? href.search : (href.search || base.search)) +
			href.hash;
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(url){
		var m = String(url).replace(/^\s+|\s+$/g, '').match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
			// authority = '//' + user + ':' + pass '@' + hostname + ':' port
		return (m ? {
			href     : m[0] || '',
			protocol : m[1] || '',
			authority: m[2] || '',
			host     : m[3] || '',
			hostname : m[4] || '',
			port     : m[5] || '',
			pathname : m[6] || '',
			search   : m[7] || '',
			hash     : m[8] || ''
		} : null);
	};

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

// can-util/js/single-reference/single-reference
var CID = __webpack_require__(37);


var singleReference;


// weak maps are slow
/* if(typeof WeakMap !== "undefined") {
	var globalMap = new WeakMap();
	singleReference = {
		set: function(obj, key, value){
			var localMap = globalMap.get(obj);
			if( !localMap ) {
				globalMap.set(obj, localMap = new WeakMap());
			}
			localMap.set(key, value);
		},
		getAndDelete: function(obj, key){
			return globalMap.get(obj).get(key);
		},
		references: globalMap
	};
} else {*/
  singleReference = {
      // obj is a function ... we need to place `value` on it so we can retreive it
      // we can't use a global map
      set: function(obj, key, value){
         // check if it has a single reference map
         var keyName = CID(key);
         obj[keyName] = value;
      },

      getAndDelete: function(obj, key){
         var cid = CID(key);
         var value = obj[cid];
         delete obj[cid];
         return value;
      }
  };
//}

module.exports = singleReference;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



module.exports = function(str){
	switch(str) {
		case "NaN":
		case "Infinity":
			return +str;
		case "null":
			return null;
		case "undefined":
			return undefined;
		case "true":
		case "false":
			return str === "true";
		default:
			var val = +str;
			if(!isNaN(val)) {
				return val;
			} else {
				return str;
			}
	}
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var attr = __webpack_require__(24);
var live = __webpack_require__(25);
/**
 * @function can-view-live.attr attr
 * @parent can-view-live
 *
 * @signature `live.attr(el, attributeName, compute)`
 *
 * Keep an attribute live to a [can-compute].
 *
 * ```js
 * var div = document.createElement('div');
 * var compute = canCompute("foo bar");
 * live.attr(div,"class", compute);
 * ```
 *
 * @param {HTMLElement} el The element whos attribute will be kept live.
 * @param {String} attributeName The attribute name.
 * @param {can-compute} compute The compute.
 *
 */
live.attr = function(el, attributeName, compute){
	// #### live.attr
	// Bind a single attribute on an element to a compute
	live.listen(el, compute, function (ev, newVal) {
	// when compute gets a new value, set the attribute
	//  to the new value
		attr.set(el, attributeName, newVal);
	});
	// do initial set of attribute as well
	attr.set(el, attributeName, compute());
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

// This provides live binding for stache attributes.
var live = __webpack_require__(25);
var viewCallbacks = __webpack_require__(40);
var attr = __webpack_require__(24);
var domEvents = __webpack_require__(8);
var types = __webpack_require__(0);

live.attrs = function(el, compute, scope, options) {
	if(!types.isCompute(compute)) {
		// Non-live case (`compute` was not a compute):
		//  set all attributes on the element and don't
		//  worry about setting up live binding since there
		//  is not compute to bind on.
		var attrs = live.getAttributeParts(compute);
		for(var name in attrs) {
			attr.set(el, name, attrs[name]);
		}
		return;
	}

	// last set of attributes
	var oldAttrs = {};

	// set up a callback for handling changes when the compute
	// changes
	var setAttrs = function (newVal) {
		var newAttrs = live.getAttributeParts(newVal),
			name;
		for(name in newAttrs) {
			var newValue = newAttrs[name],
				// `oldAttrs` was set on the last run of setAttrs in this context
				//  (for this element and compute)
				oldValue = oldAttrs[name];
			// Only fire a callback
			//  if the value of the attribute has changed
			if(newValue !== oldValue) {
				// set on DOM attributes (dispatches an "attributes" event as well)
				attr.set(el, name, newValue);
				// get registered callback for attribute name and fire
				var callback = viewCallbacks.attr(name);
				if(callback) {
					callback(el, {
						attributeName: name,
						scope: scope,
						options: options
					});
				}
			}
			// remove key found in new attrs from old attrs
			delete oldAttrs[name];
		}
		// any attrs left at this point are not set on the element now,
		// so remove them.
		for(name in oldAttrs) {
			attr.remove(el, name);
		}
		oldAttrs = newAttrs;
	};

	var handler = function (ev, newVal) {
		setAttrs(newVal);
	};

	// set attributes on any change to the compute
	compute.addEventListener('change', handler);

	var teardownHandler = function() {
		compute.removeEventListener('change', handler);
		domEvents.removeEventListener.call(el, 'removed', teardownHandler);
	};
	// unbind on element removal
	domEvents.addEventListener.call(el, 'removed', teardownHandler);

	// set up a current attribute set and assign to oldAttrs
	setAttrs(compute());
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var live = __webpack_require__(25);
var nodeLists = __webpack_require__(20);
var makeFrag = __webpack_require__(36);
var makeArray = __webpack_require__(12);
var childNodes = __webpack_require__(16);

/**
 * @function can-view-live.html html
 * @parent can-view-live
 * @release 2.0.4
 *
 * Live binds a compute's value to a collection of elements.
 *
 * @signature `live.html(el, compute, [parentNode])`
 *
 * `live.html` is used to setup incremental live-binding on a block of html.
 *
 * ```js
 * // a compute that changes its list
 * var greeting = compute(function(){
 *   return "Welcome <i>"+me.attr("name")+"</i>"
 * });
 *
 * var placeholder = document.createTextNode(" ");
 * $("#greeting").append(placeholder);
 *
 * live.html(placeholder, greeting);
 * ```
 *
 * @param {HTMLElement} el An html element to replace with the live-section.
 *
 * @param {can.compute} compute A [can.compute] whose value is HTML.
 *
 * @param {HTMLElement} [parentNode] An overwritable parentNode if `el`'s parent is
 * a documentFragment.
 *
 *
 */
live.html = function (el, compute, parentNode, nodeList) {
	var data;
	// prefer to manipulate el's actual parent over the supplied parent
	parentNode = live.getParentNode(el, parentNode);
	data = live.listen(parentNode, compute, function (ev, newVal, oldVal) {
		// the attachment point for the nodelist
		var attached = nodeLists.first(nodes).parentNode;
		// update the nodes in the DOM with the new rendered value
		if (attached) {
			makeAndPut(newVal);
		}
		var pn = nodeLists.first(nodes).parentNode;
		data.teardownCheck(pn);
		live.callChildMutationCallback(pn);
	});

	// Nodes registered to the live operation, either a list of nodes or a single element
	var nodes = nodeList || [el],
		makeAndPut = function (val) {
			// ##### makeandput
			// Receives the compute output (must be some DOM representation or a function)
			var isFunction = typeof val === "function",
				aNode = live.isNode(val),
				// translate val into a document fragment if it's DOM-like
				frag = makeFrag(isFunction ? "" : val),
				// previous set of nodes
				oldNodes = makeArray(nodes);

			// Add a placeholder textNode if necessary.
			live.addTextNodeIfNoChildren(frag);

			// Mark each node as belonging to the node list.
			oldNodes = nodeLists.update(nodes, childNodes(frag));
			if(isFunction) {
				val(frag.firstChild);
			}
			// DOM replace old nodes with new frag (which might contain some old nodes)
			nodeLists.replace(oldNodes, frag);
		};

	data.nodeList = nodes;

	// register the span so nodeLists knows the parentNodeList
	if(!nodeList) {
		nodeLists.register(nodes, data.teardownCheck);
	} else {
		nodeList.unregistered = data.teardownCheck;
	}
	// Finally give the subtree an initial value
	makeAndPut(compute());
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var live = __webpack_require__(25);
var makeRunInOrder = __webpack_require__(111);
var runInOrder = makeRunInOrder();

var nodeLists = __webpack_require__(20);
var makeCompute = __webpack_require__(9);
var canBatch = __webpack_require__(11);

var frag = __webpack_require__(36);
var domMutate = __webpack_require__(30);
var childNodes = __webpack_require__(16);

var makeArray = __webpack_require__(12);
var each = __webpack_require__(1);
var isFunction = __webpack_require__(23);
var diff = __webpack_require__(51);
var splice = [].splice;

// #### renderAndAddToNodeLists
// a helper function that renders something and adds its nodeLists to newNodeLists
// in the right way for stache.
var renderAndAddToNodeLists = function(newNodeLists, parentNodeList, render, context, args){
	var itemNodeList = [];

	if(parentNodeList) {
		// With a supplied parent list, "directly" register the new nodeList
		//  as a child.
		nodeLists.register(itemNodeList,null, parentNodeList, true);
		itemNodeList.parentList = parentNodeList;
		itemNodeList.expression = "#each SUBEXPRESSION";
	}

	// call the renderer, passing in the new nodeList as the last argument
	var itemHTML = render.apply(context, args.concat([itemNodeList])),
	// and put the output into a document fragment
		itemFrag = frag(itemHTML);

	// get all the direct children of the frag
	var children = makeArray(childNodes(itemFrag));
	if(parentNodeList) {
		// if a parent list was supplied, children of the frag become the
		//  child nodeList items.
		nodeLists.update(itemNodeList, children);
		newNodeLists.push(itemNodeList);
	} else {
		// If no parent nodeList, register the new array of frag children as a nodeList
		//  and push into the nodeLists
		newNodeLists.push(nodeLists.register(children));
	}
	return itemFrag;
},
// #### removeFromNodeList
// a splicing helper for nodeLists, which removes sublists, including unregistering,
//  for a contiguous slice of the master list.
removeFromNodeList = function(masterNodeList, index, length){
	var removedMappings = masterNodeList.splice(index + 1, length),
		itemsToRemove = [];
	each(removedMappings, function (nodeList) {

		// Unregister to free up event bindings.
		var nodesToRemove = nodeLists.unregister(nodeList);

		// add items that we will remove all at once
		[].push.apply(itemsToRemove, nodesToRemove);
	});
	return itemsToRemove;
},
// #### addFalseyIfEmpty
// Add the results of redering the "falsey" or inverse case render to the 
// master nodeList and the DOM if the live list is empty
addFalseyIfEmpty = function(list, falseyRender, masterNodeList, nodeList){
	if(falseyRender && list.length === 0){
		// If there are no items ... we should render the falsey template
		var falseyNodeLists = [];
		var falseyFrag = renderAndAddToNodeLists(falseyNodeLists, nodeList, falseyRender, list, [list]);

		// put the frag after the reference element in the associated nodeList
		nodeLists.after([masterNodeList[0]], falseyFrag);
		// and push the first element onto the master list
		masterNodeList.push(falseyNodeLists[0]);
	}
};

/**
 * @function can-view-live.list list
 * @parent can-view-live
 * @release 2.0.4
 *
 * @signature `live.list(el, list, render, context, [parentNode])`
 *
 * Live binds a compute's list incrementally.
 *
 * ```js
 * // a compute that change's it's list
 * var todos = compute(function(){
 *   return new Todo.List({page: can.route.attr("page")})
 * })
 *
 * var placeholder = document.createTextNode(" ");
 * $("ul#todos").append(placeholder);
 *
 * can.view.live.list(
 *   placeholder,
 *   todos,
 *   function(todo, index){
 *     return "<li>"+todo.attr("name")+"</li>"
 *   });
 * ```
 *
 * @param {HTMLElement} el An html element to replace with the live-section.
 *
 * @param {can-compute|can-list|can-define/list/list} list An observable list type.
 *
 * @param {function(this:*,*,index):String} render(index, index) A function that when called with
 * the incremental item to render and the index of the item in the list.
 *
 * @param {Object} context The `this` the `render` function will be called with.
 *
 * @param {HTMLElement} [parentNode] An overwritable parentNode if `el`'s parent is
 * a documentFragment.
 *
 *
 */
live.list = function (el, compute, render, context, parentNode, nodeList, falseyRender) {
	// A nodeList of all elements this live-list manages.
	// This is here so that if this live list is within another section
	// that section is able to remove the items in this list.
	var masterNodeList = nodeList || [el],
		// A mapping of items to their indices
		indexMap = [],
		// True once all previous events have been fired
		afterPreviousEvents = false,
		// Indicates that we should not be responding to changes in the list.
		// It's possible that the compute change causes this list behavior to be torn down.
		// However that same "change" dispatch will eventually fire the updateList handler because
		// the list of "change" handlers is copied when dispatching starts.
		// A 'perfect' fix would be to use linked lists for event handlers.
		isTornDown = false,
		// Called when items are added to the list.
		add = runInOrder(function add (ev, items, index) {

			if (!afterPreviousEvents) {
				return;
			}
			// Collect new html and mappings
			var frag = text.ownerDocument.createDocumentFragment(),
				newNodeLists = [],
				newIndicies = [];
			// For each new item,
			each(items, function (item, key) {

				var itemIndex = makeCompute(key + index),
					itemCompute = makeCompute(function(newVal){
						if(arguments.length) {
							if("set" in list) {
								list.set(itemIndex(), newVal);
							} else {
								list.attr(itemIndex(), newVal);
							}
						} else {
							return item;
						}
					}),
					itemFrag = renderAndAddToNodeLists(newNodeLists, nodeList, render, context, [itemCompute, itemIndex]);

				// Hookup the fragment (which sets up child live-bindings) and
				// add it to the collection of all added elements.
				frag.appendChild(itemFrag);
				// track indicies;
				newIndicies.push(itemIndex);
			});
			// The position of elements is always after the initial text placeholder node
			var masterListIndex = index+1;

			// remove falsey if there's something there
			if(!indexMap.length) {
				// remove all leftover things
				var falseyItemsToRemove = removeFromNodeList(masterNodeList, 0, masterNodeList.length - 1);
				nodeLists.remove(falseyItemsToRemove);
			}

			// Check if we are adding items at the end
			if (!masterNodeList[masterListIndex]) {
				nodeLists.after(masterListIndex === 1 ? [text] : [nodeLists.last(masterNodeList[masterListIndex - 1])], frag);
			} else {
				// Add elements before the next index's first element.
				var el = nodeLists.first(masterNodeList[masterListIndex]);
				domMutate.insertBefore.call(el.parentNode, frag, el);
			}
			splice.apply(masterNodeList, [
				masterListIndex,
				0
			].concat(newNodeLists));

			// update indices after insert point
			splice.apply(indexMap, [
				index,
				0
			].concat(newIndicies));

			for (var i = index + newIndicies.length, len = indexMap.length; i < len; i++) {
				indexMap[i](i);
			}
			if(ev.callChildMutationCallback !== false) {
				live.callChildMutationCallback(text.parentNode);
			}

		}),
		// Called when an item is set with .attr
		set = function(ev, newVal, index) {
			remove({}, { length: 1 }, index, true);
			add({}, [newVal], index);
		},
		// Called when items are removed or when the bindings are torn down.
		remove = runInOrder(function remove (ev, items, index, duringTeardown, fullTeardown) {

			if (!afterPreviousEvents) {
				return;
			}
			// If this is because an element was removed, we should
			// check to make sure the live elements are still in the page.
			// If we did this during a teardown, it would cause an infinite loop.
			if (!duringTeardown && data.teardownCheck(text.parentNode)) {
				return;
			}
			if(index < 0) {
				index = indexMap.length + index;
			}
			var itemsToRemove = removeFromNodeList(masterNodeList, index, items.length);

			// update indices after remove point
			indexMap.splice(index, items.length);
			for (var i = index, len = indexMap.length; i < len; i++) {
				indexMap[i](i);
			}

			// don't remove elements during teardown.  Something else will probably be doing that.
			if(!fullTeardown) {
				// adds the falsey section if the list is empty
				addFalseyIfEmpty(list, falseyRender, masterNodeList, nodeList);
				nodeLists.remove(itemsToRemove);
				if(ev.callChildMutationCallback !== false) {
					live.callChildMutationCallback(text.parentNode);
				}
			} else {
				nodeLists.unregister(masterNodeList);
			}
		}),
		move = function (ev, item, newIndex, currentIndex) {
			if (!afterPreviousEvents) {
				return;
			}
			// The position of elements is always after the initial text
			// placeholder node
			newIndex = newIndex + 1;
			currentIndex = currentIndex + 1;

			var referenceNodeList = masterNodeList[newIndex];
			var movedElements = frag( nodeLists.flatten(masterNodeList[currentIndex]) );
			var referenceElement;

			// If we're moving forward in the list, we want to be placed before
			// the item AFTER the target index since removing the item from
			// the currentIndex drops the referenceItem's index. If there is no
			// nextSibling, insertBefore acts like appendChild.
			if (currentIndex < newIndex) {
				referenceElement = nodeLists.last(referenceNodeList).nextSibling;
			} else {
				referenceElement = nodeLists.first(referenceNodeList);
			}

			var parentNode = masterNodeList[0].parentNode;

			// Move the DOM nodes into the proper location
			parentNode.insertBefore(movedElements, referenceElement);

			// Now, do the same for the masterNodeList. We need to keep it
			// in sync with the DOM.

			// Save a reference to the "node" that we're manually moving
			var temp = masterNodeList[currentIndex];

			// Remove the movedItem from the masterNodeList
			[].splice.apply(masterNodeList, [currentIndex, 1]);

			// Move the movedItem to the correct index in the masterNodeList
			[].splice.apply(masterNodeList, [newIndex, 0, temp]);

			// Convert back to a zero-based array index
			newIndex = newIndex - 1;
			currentIndex = currentIndex - 1;

			// Grab the index compute from the `indexMap`
			var indexCompute = indexMap[currentIndex];

			// Remove the index compute from the `indexMap`
			[].splice.apply(indexMap, [currentIndex, 1]);

			// Move the index compute to the correct index in the `indexMap`
			[].splice.apply(indexMap, [newIndex, 0, indexCompute]);

			var i = Math.min(currentIndex, newIndex);
			var len = indexMap.length;

			for (i, len; i < len; i++) {
				// set each compute to have its current index in the map as its value
				indexMap[i](i);
			}
			if(ev.callChildMutationCallback !== false) {
				// fire any registered mutation callback
				live.callChildMutationCallback(text.parentNode);
			}
		},
		// A text node placeholder
		text = el.ownerDocument.createTextNode(''),
		// The current list.
		list,
		// Called when the list is replaced with a new list or the binding is torn-down.
		teardownList = function (fullTeardown) {
			// there might be no list right away, and the list might be a plain
			// array
			if (list && list.removeEventListener) {
				list.removeEventListener('add', add);
				list.removeEventListener('set', set);
				list.removeEventListener('remove', remove);
				list.removeEventListener('move', move);
			}
			// use remove to clean stuff up for us
			remove({callChildMutationCallback: !!fullTeardown}, {
				length: masterNodeList.length - 1
			}, 0, true, fullTeardown);
		},
		// Called when the list is replaced or setup.
		updateList = function (ev, newList, oldList) {

			if(isTornDown) {
				// take no further action if teardown is already done
				return;
			}

			afterPreviousEvents = true;
			if(newList && oldList) {
				// Update old list nodes to new ones if an update from list to list
				list = newList || [];
				// The minimal diff between lists
				var patches = diff(oldList, newList);

				// Tear down event bindings if old list is observable
				if ( oldList.removeEventListener ) {
					oldList.removeEventListener('add', add);
					oldList.removeEventListener('set', set);
					oldList.removeEventListener('remove', remove);
					oldList.removeEventListener('move', move);
				}
				for(var i = 0, patchLen = patches.length; i < patchLen; i++) {
					var patch = patches[i];
					if(patch.deleteCount) {
						// Remove any items scheduled for deletion from the patch.
						remove({callChildMutationCallback: false}, {
							length: patch.deleteCount
						}, patch.index, true);
					}
					if(patch.insert.length) {
						// Insert any new items at the index
						add({callChildMutationCallback: false}, patch.insert, patch.index);
					}
				}
			} else {
				if(oldList) {
					// no new list.  Teardown.
					teardownList();
				}
				// push new items list onto the list (there are no oldItems of concern)
				list = newList || [];
				add({callChildMutationCallback: false}, list, 0);
				// for an empty newList, render the falsey section
				addFalseyIfEmpty(list, falseyRender, masterNodeList, nodeList);
			}
			// Listeners on the mutation observer should fire now (DOM has been fully updated)
			live.callChildMutationCallback(text.parentNode);

			afterPreviousEvents = false;
			// list might be a plain array.
			if (list.addEventListener) {
				// If observable, set up bindings on list changes
				list.addEventListener('add', add);
				list.addEventListener('set', set);
				list.addEventListener('remove', remove);
				list.addEventListener('move', move);
			}

			canBatch.afterPreviousEvents(function(){
				// at this time, all current add/move/set/remove in this context is complete,
				// so allow those functions to be called again.
				afterPreviousEvents = true;
			});
		};

	// Use element's parent node if available
	parentNode = live.getParentNode(el, parentNode);
	// Setup binding and teardown to add and remove events
	var data = live.setup(parentNode, function () {
		// TODO: for stache, binding on the compute is not necessary.
		if (isFunction(compute)) {
			compute.addEventListener('change', updateList);
		}
	}, function () {
		// Teardown handler when parentNode is removed
		if (isFunction(compute)) {
			compute.removeEventListener('change', updateList);
		}
		teardownList(true);
	});

	if(!nodeList) {
		// When no nodeList specified, the masterNodeList is the original element;
		//  replace with the rendered text transformed to DOM elements.
		live.replace(masterNodeList, text, data.teardownCheck);
	} else {
		// Otherwise replace the nodeList elements, and set up an unregister
		// handler
		nodeLists.replace(masterNodeList, text);
		nodeLists.update(masterNodeList, [text]);
		nodeList.unregistered = function(){
			data.teardownCheck();
			isTornDown = true;
		};
	}
	// run the list setup
	updateList({}, isFunction(compute) ? compute() : compute);
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var live = __webpack_require__(25);
var nodeLists = __webpack_require__(20);

/**
 * @function can-view-live.text text
 * @parent can-view-live
 * @release 2.0.4
 *
 * @signature `live.text(el, compute, [parentNode], [nodeList])`
 *
 * Replaces one element with some content while keeping [can-view-live.nodeLists nodeLists] data correct.
 */
live.text = function (el, compute, parentNode, nodeList) {
	var parent = live.getParentNode(el, parentNode);
	// setup listening right away so we don't have to re-calculate value
	var data = live.listen(parent, compute, function (ev, newVal, oldVal) {
		// Sometimes `node.nodeValue` is 'unknown' in IE and will throw an exception if it is
		/* jshint ignore:start */
		if (typeof node.nodeValue !== 'unknown') {
			node.nodeValue = live.makeString(newVal);
		}
		/* jshint ignore:end */
	});

	// Create a new text node from the compute value
	var node = el.ownerDocument.createTextNode(live.makeString(compute()));
	if(nodeList) {
		// If a known nodelist is passed in, update the list to have the new
		//  callbacks... 
		nodeList.unregistered = data.teardownCheck;
		data.nodeList = nodeList;

		// ...and new text node, and replace the previously associated node with 
		//  the new node
		nodeLists.update(nodeList, [node]);
		nodeLists.replace([el], node);
	} else {
		// Otherwise, replace the placeholder with the live node and do the nodeLists thing.
		// Add that node to nodeList so we can remove it when the parent element is removed from the page
		data.nodeList = live.replace([el], node, data.teardownCheck);
	}
};


/***/ }),
/* 111 */
/***/ (function(module, exports) {

module.exports = function makeRunInOrder() {
	var running = 0;
	var tasks = [];

	return function runInOrder(fn) {
		return function() {
			var fnArgs = arguments;

			if (running) {
				tasks.push({
					fn: fn,
					args: fnArgs
				});
				return;
			}

			running++;
			fn.apply(null, fnArgs);
			running--;

			while (tasks.length) {
				running++;
				tasks[0].fn.apply(null, tasks[0].args);
				tasks.shift();
				running--;
			}
		};
	};
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var Observation = __webpack_require__(7);
var observeReader = __webpack_require__(15);
var makeCompute = __webpack_require__(9);

var types = __webpack_require__(0);
var isFunction = __webpack_require__(23);
var isEmptyObject = __webpack_require__(22);


// The goal of this is to create a high-performance compute that represents a key value from can.view.Scope.
// If the key value is something like {{name}} and the context is a can.Map, a faster
// binding path will be used where new rebindings don't need to be looked for with every change of
// the observable property.
// However, if the property changes to a compute, then the slower `can.compute.read` method of
// observing values will be used.

var isFastPath = function(computeData){
	if(  computeData.reads &&
				// a single property read
				computeData.reads.length === 1 ) {
		var root = computeData.root;
		if( types.isCompute(root) ) {
			root = root();
		}
		// on a map
		return types.isMapLike(root) &&
			// that isn't calling a function
			!isFunction(root[computeData.reads[0].key]);
	}
	return;
};

var scopeReader = function(scope, key, options, computeData, newVal){
	if (arguments.length > 4) {
		var root = computeData.root || computeData.setRoot;
		if(root) {
			observeReader.write(root, computeData.reads, newVal, options);
		} else {
			scope.set(key, newVal, options);
		}
		// **Compute getter**
	} else {
		// If computeData has found the value for the key in the past in an observable then go directly to
		// the observable (computeData.root) that the value was found in the last time and return the new value.  This
		// is a huge performance gain for the fact that we aren't having to check the entire scope each time.
		if (computeData.root) {
			return observeReader.read(computeData.root, computeData.reads, options)
				.value;
		}
		// If the key has not already been located in a observable then we need to search the scope for the
		// key.  Once we find the key then we need to return it's value and if it is found in an observable
		// then we need to store the observable so the next time this compute is called it can grab the value
		// directly from the observable.
		var data = scope.read(key, options);
		computeData.scope = data.scope;
		computeData.initialValue = data.value;
		computeData.reads = data.reads;
		computeData.root = data.rootObserve;
		computeData.setRoot = data.setRoot;
		return data.value;
	}
};

module.exports = function(scope, key, options){
	options = options || {
		args: []
	};
	// the object we are returning
	var computeData = {},
		// a function that can be passed to Observation, or used as a setter
		scopeRead = function (newVal) {
			if(arguments.length) {
				return scopeReader(scope, key, options, computeData, newVal);
			} else {
				return scopeReader(scope, key, options, computeData);
			}
		},
		compute = makeCompute(undefined,{
			on: function() {
				// setup the observing
				observation.start();

				if( isFastPath(computeData) ) {
					// When the one dependency changes, we can simply get its newVal and
					// save it.  If it's a function, we need to start binding the old way.
					observation.dependencyChange = function(ev, newVal){

						if(types.isMapLike(ev.target) && typeof newVal !== "function") {
							this.newVal = newVal;
						} else {
							// restore
							observation.dependencyChange = Observation.prototype.dependencyChange;
							observation.start = Observation.prototype.start;
							compute.fastPath = false;
						}
						return Observation.prototype.dependencyChange.call(this, ev);
					};
					observation.start = function(){
						this.value = this.newVal;
					};
					compute.fastPath = true;
				}
				// TODO deal with this right
				compute.computeInstance.value = observation.value;
				compute.computeInstance.hasDependencies = !isEmptyObject(observation.newObserved);
			},
			off: function(){
				observation.stop();
			},
			set: scopeRead,
			get: scopeRead,
			// a hack until we clean up can.compute for 3.0
			__selfUpdater: true
		}),

		// the observables read by the last calling of `scopeRead`
		observation = new Observation(scopeRead, null, compute.computeInstance);
	compute.computeInstance.observation = observation;
	computeData.compute = compute;
	return computeData;

};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var types = __webpack_require__(0);
var SimpleMap = __webpack_require__(59);

// this is a very simple can-map like object
var ReferenceMap = SimpleMap.extend({});

var oldIsMapLike = types.isMapLike;
types.isMapLike = function(obj) {
	if(obj instanceof ReferenceMap) {
		return true;
	}
	return oldIsMapLike.call(this, obj);
};

module.exports = ReferenceMap;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_can_define_map_map__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_can_define_map_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_can_define_map_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_can_event__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_can_event___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_can_event__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_field_base_FieldIteratorMap__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_object_assign__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_object_assign__);





/**
 * @constructor property-table.ViewModel ViewModel
 * @parent property-table
 * @group property-table.ViewModel.props Properties
 * @description A `<property-table />` component's ViewModel. This viewmodel
 * extends the [util/field/ ]'s properties
 *
 */
const ViewModel = __WEBPACK_IMPORTED_MODULE_2__util_field_base_FieldIteratorMap__["a" /* default */].extend('PropertyTable', {
    /**
     * @prototype
     */
   /**
    * A string referencing a field property that will exclude that field
    * from this classes fields. The default is 'detail'.
    * @property {String} property-table.ViewModel.props.excludeFieldKey excludeFieldKey
    * @parent property-table.ViewModel.props
    */
    excludeFieldKey: {
        value: 'detail'
    },
    /**
     * A flag to allow editing (Not yet implemented)
     * TODO: implement editing
     * @property {Boolean} property-table.ViewModel.props.edit
     * @parent property-table.ViewModel.props
     */
    edit: {
        type: 'boolean',
        value: true
    },
    /**
     * A flag to allow deleting (Not yet implemented)
     * TODO: implement deleting
     * @property {Boolean} property-table.ViewModel.props.delete
     * @parent property-table.ViewModel.props
     */
    delete: {
        type: 'boolean',
        value: true
    },
    /**
     * The ID value of the object that should be retrieved. This value along with the connection object will be used to retrieve an object from a RESTful service
     * @property {Number} property-table.ViewModel.props.objectId
     * @parent property-table.ViewModel.props
     */
    objectId: {
        type: 'number',
        set (id) {
            this.fetchObject(this.connection, id);
            return id;
        }
    },
    /**
     * The connection object that should be used to retrieve an object. This
     * value along with the objectId value will be used to retrieve an object
     * from a RESTful service
     * @link http://canjs.com/doc/can-connect.html can-connect
     * @property {can-connect} property-table.ViewModel.props.connection
     * @parent property-table.ViewModel.props
     */
    connection: {
        set (con) {
            this.fetchObject(con, this.objectId);
            return con;
        }
    },
    /**
     * A generic object to display in a tabular format. This can be used instead
     * of providing a connection and objectId property
     * @property {Object} property-table.ViewModel.props.object
     * @parent property-table.ViewModel.props
     */
    object: __WEBPACK_IMPORTED_MODULE_0_can_define_map_map___default.a,
    /**
     * A promise that resolves to the object. Used to determine state of current fetching operations
     * @property {Promise}  property-table.ViewModel.props.objectPromise
     * @parent property-table.ViewModel.props
     */
    objectPromise: {},
    /**
     * Asynchronously fetches an object using a can-connect model and an id
     * @function fetchObject
     * @signature
     * @param  {can-connect.model} con The connection object to an api resource
     * @param  {Number} id  The id number of the object to retrieve
     * @return {Promise}     A promise that is resolved once the object is retreived
     * @link https://connect.canjs.com/ can-connect
     */
    fetchObject (con, id) {
        if (!con || !id) {
            return null;
        }
        const def = con.get({
            id: id
        });
        def.then((obj) => {
            this.object = obj;
        });

        this.objectPromise = def;
        return def;
    }
});

__WEBPACK_IMPORTED_MODULE_3_object_assign___default()(ViewModel.prototype, __WEBPACK_IMPORTED_MODULE_1_can_event___default.a);
/* harmony default export */ __webpack_exports__["a"] = (ViewModel);


/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__property_table_stache__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__property_table_stache___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__property_table_stache__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_can_component__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_can_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_can_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ViewModel__ = __webpack_require__(115);




/* unused harmony default export */ var _unused_webpack_default_export = (__WEBPACK_IMPORTED_MODULE_1_can_component___default.a.extend({
    tag: 'property-table',
    ViewModel: __WEBPACK_IMPORTED_MODULE_2__ViewModel__["a" /* default */],
    view: __WEBPACK_IMPORTED_MODULE_0__property_table_stache___default.a
}));


/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_can_define_map_map__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_can_define_map_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_can_define_map_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__parseFieldArray_parseFieldArray__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Field__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_can_define_list_list__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_can_define_list_list___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_can_define_list_list__);





/**
 * @constructor util/field/base/FieldIteratorMap FieldIteratorMap
 * @parent util/field.types
 * @group FieldIteratorMap.props
 * A base class for widgets that need to iterate through a set or subset
 * of fields.
 * ViewModels inheriting this map should define a excludeFieldKey which
 * is a field property that will exclude those fields from this class. For
 * instance, if we are designing an edit widget, an appropriate way to exclude
 * fields from the widget would be to use the key `edit: false` and set
 * `excludeFieldKey: 'edit'` in this class.
 */
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_can_define_map_map___default.a.extend({
  /**
   * A string referencing a field property that will exclude that field
   * from this classes fields.
   * @property {String} FieldIteratorMap.props.excludeFieldKey excludeFieldKey
   * @parent FieldIteratorMap.props
   */
    excludeFieldKey: 'string',
    /**
     * A property that converts this class's object to an array of
     * fields if fields are not provided.
     * @property {DefineMap} FieldIteratorMap.props.object object
     * @parent FieldIteratorMap.props
     */
    object: __WEBPACK_IMPORTED_MODULE_0_can_define_map_map___default.a,
  /**
   * An array of fields
   * @property {Array<util/field/Field>} FieldIteratorMap.props.fields fields
   * @parent FieldIteratorMap.props
   */
    fields: {
        Value: __WEBPACK_IMPORTED_MODULE_3_can_define_list_list___default.a,
        Type: __WEBPACK_IMPORTED_MODULE_3_can_define_list_list___default.a,
        get (fields) {
            if (fields.length && !(fields[0] instanceof __WEBPACK_IMPORTED_MODULE_2__Field__["a" /* default */])) {
                fields = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__parseFieldArray_parseFieldArray__["a" /* default */])(fields);
            }
            if (!fields.length && this.object) {
                const obj = this.object.serialize ? this.object.serialize() : this.object;
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__parseFieldArray_parseFieldArray__["a" /* default */])(Object.keys(obj));
            }
            return fields.filter((f) => {
                return f[this.excludeFieldKey] !== false;
            });
        }
    }
}));


/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = parseFieldArray;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Field__ = __webpack_require__(69);

// eslint-disable-next-line
/**
 * Converts an array of strings or field json objects into Field objects
 * @function util/field/parseFieldArray/parseFieldArray parseFieldArray
 * @parent util/field.methods
 * @signature `parseFieldArray(fields)`
 * @param  {Array<util/field/Field | String>} fields An array of either strings or JSON like objects representing Field object properties
 * @return {Array<util/field/Field>} The array of fields
 */
function parseFieldArray (fields) {
    // create field objects
    return fields.map((f) => {
        // if we have a string give it a default name
        if (typeof f === 'string') {
            f = {
                name: f
            };
        }
        // add additional props with field constructor
        return new __WEBPACK_IMPORTED_MODULE_0__Field__["a" /* default */](f);

        // filter fields to exclude any '__' hidden props
    }).filter((f) => {
        return f.name.indexOf('__') === -1;
    });
}


/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = makeSentenceCase;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_can_util_js_string_string__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_can_util_js_string_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_can_util_js_string_string__);


/**
 * @module {{}} util/string string
 * @parent spectre.util
 * @description a collection of string utilities
 */

/**
 * Formats the field by replacing underscores with spaces and capitalizing the first letter
 * @parent util/string
 * @function makeSentenceCase
 * @signature `makeSentenceCase(text)`
 * @param  {String} text The name of the field
 * @return {String} The formatted field string. Example: `my_field_name` will become `My field name`.
 */
function makeSentenceCase (text) {
    text = String(text);
    return __WEBPACK_IMPORTED_MODULE_0_can_util_js_string_string___default.a.capitalize(String.prototype.trim.call(
    text.split('_')
    .join(' ')
    .toLowerCase()
    .replace(/ +/g, ' ')
  ));
}


/***/ }),
/* 120 */
/***/ (function(module, exports) {

// Provide a "System" global.
module.exports = {
	// Make sure import is only used as "System.import"
	import: function() {
		throw new Error("System.import cannot be used indirectly");
	}
};


/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_spectre_canjs_property_table_property_table__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_can_stache__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_can_stache___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_can_stache__);



var render = __webpack_require__(78)

var viewModel = {
    fields: [{
        //fields can be specified using a detailed object
        name: 'prop_1',
        alias: 'Property 1',

    },
        //or a simple field name
        'another_property_value', 'etc_or_misc'
    ],
    data: {
        prop_1: 'This is a property',
        another_property_value: 'Value here',
        etc_or_misc: 'This is a value'
    }
};

document.body.appendChild(render(viewModel));


/***/ }),
/* 122 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(72);


/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map