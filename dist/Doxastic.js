Doxastic = (function(window) {

'use strict';

var Object$create = Object.create;

var Object$keys = Object.keys;

// FIXME more robust ponyfill required
// x
var window$requestAnimationFrame = window.requestAnimationFrame ||
    (
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            return window.setTimeout(function() {
                callback(+new Date());
            }, 1000/60);
        }
    );


function Observable(state) {
    this._state = state;
    this._observers = Object$create(null);
    this._subscribers = null;
}

var Observable$prototype = Observable.prototype;

Observable$prototype.update = function update(key, value) {
    if (this._state[key] !== value && value !== void 0) {
        this._state[key] = value;
        this.notify(key, value);
    }
};

Observable$prototype.observe = function observe(key, observer) {
    if (this._observers[key] == null)
        this._observers[key] = [observer];
    else
        this._observers[key].push(observer);
};

Observable$prototype.unobserve = function unobserve(key, observer) {
    var observers = this._observers[key];
    if (observers != null) {
        var index = observers.indexOf(observer);
        if (index !== -1) {
            if (observers.length === 1)
                this._observers[key] = null;
            else
                observers.splice(index, 1);
        }
    }
};

Observable$prototype.notify = function notify(key, value) {
    var observers = this._observers[key]
    if (observers != null)
        for (var i = 0, l = observers.length; i < l; ++i) {
            observers[i].update(key, value);
        }
    this.publish(key, value);
};

Observable$prototype.subscribe = function subscribe(subscriber) {
    if (this._subscribers === null)
        this._subscribers = [subscriber];
    else
        this._subscribers.push(subscriber);
};

Observable$prototype.unsubscribe = function unsubscribe(subscriber) {
    if (this._subscribers !== null) {
        var index = this._subscribers.indexOf(subscriber);
        if (index !== -1)
            this._subscribers.splice(index, 1);
    }
};

Observable$prototype.publish = function publish(key, value) {
    var subscribers = this._subscribers;
    if (subscribers !== null)
        for (var i = 0, l = subscribers.length; i < l; ++i) {
            subscribers[i].update(key, value);
        }
};



function Observer(object, key) {
    this._object = object;
    this._key = key;
}

Observer.prototype.update = function update(key, value) {
    this._object.update(this._key, value);
};



var renderBuffer = [];

var renderBuffer$push = function(renderer) {
    if (renderBuffer.push(renderer) === 1)
        window$requestAnimationFrame(renderBuffer$flush);
};

var renderBuffer$flush = function() {
    for (var i = 0, l = renderBuffer.length; i < l; ++i)
        renderBuffer[i].render();

    if (renderBuffer.length === l)
        renderBuffer.length = 0;
    else {
        renderBuffer = renderBuffer.slice(l);
        renderBuffer$flush();
    }
};



function Renderer(element) {
    this._element = element;
    this._methods = this.constructor.METHODS || Renderer$METHODS;
    this._state = Object$create(null);
    this._flags = Object$create(null);
    this._dirty = [];
}

var Renderer$prototype = Renderer.prototype;

var Renderer$METHODS = Renderer.METHODS = Object$create(null);

Renderer$prototype.update = function update(key, value) {
    if (key in this._methods && this._state[key] !== value) {
        this._state[key] = value;
        if (this._flags[key] !== true) {
            this._flags[key] = true;
            if (this._dirty.push(key) === 1) renderBuffer$push(this);
        }
    }
};

Renderer$prototype.render = function render() {
    if (this._element !== null) {
        var element = this._element;
        var methods = this._methods;
        var state = this._state;
        var flags = this._flags;
        var dirty = this._dirty;
        for (var i = 0, l = dirty.length; i < l; ++i) {
            var key = dirty[i];
            methods[key](element, state[key]);
            flags[key] = false;
        }
        dirty.length = 0;
    }
};



function DOMRenderer(element) {
    Renderer.call(this, element);
}

var DOMRenderer$METHODS = DOMRenderer.METHODS = Object$create(Renderer$METHODS);

DOMRenderer$METHODS.x = function(element, x) {
    element.style.left = x + 'px';
};

DOMRenderer$METHODS.y = function(element, y) {
    element.style.top = y + 'px';
};

DOMRenderer$METHODS.width = function(element, width) {
    element.style.width = width + 'px';
};

DOMRenderer$METHODS.height = function(element, height) {
    element.style.height = height + 'px';
};

var DOMRenderer$prototype = DOMRenderer.prototype = Object$create(Renderer$prototype);

DOMRenderer$prototype.constructor = DOMRenderer;



function SVGRenderer(element) {
    DOMRenderer.call(this, element);
}

var SVGRenderer$METHODS = SVGRenderer.METHODS = Object$create(DOMRenderer$METHODS);

SVGRenderer$METHODS.x = function(element, x) {
    element.setAttribute('x', x);
};

SVGRenderer$METHODS.y = function(element, y) {
    element.setAttribute('y', y);
};

SVGRenderer$METHODS.width = function(element, width) {
    element.setAttribute('width', width);
};

SVGRenderer$METHODS.height = function(element, height) {
    element.setAttribute('height', height);
};

var SVGRenderer$prototype = SVGRenderer.prototype = Object$create(DOMRenderer$prototype);

SVGRenderer$prototype.constructor = SVGRenderer;


return Object$create(null, {
    Observable: {
        enumerable: true,
        value: Observable
    },
    Observer: {
        enumerable: true,
        value: Observer
    },
    Renderer: {
        enumerable: true,
        value: Renderer
    },
    DOMRenderer: {
        enumerable: true,
        value: DOMRenderer
    },
    SVGRenderer: {
        enuerable: true,
        value: SVGRenderer
    }
});

}(this));
