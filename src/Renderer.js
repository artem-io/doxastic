
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
