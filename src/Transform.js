
function Transform(object, method) {
    this._object = object;
    this._method = method;
}

var Transform$REGISTRY = Transform.REGISTRY = Object$create(null);

var Transform$register = Transform.register = function register(name, transform) {
    Transform$REGISTRY[name] = transform;
};

var Transform$method = Transform.method = function method(path) {
    var result = Transform$REGISTRY[key];
    if (result === void 0 && path.indexOf('.') !== -1) {
        var parts = path.split('.');
        result = Transform$REGISTRY;
        for (var i = 0, l = parts.length; i < l; ++i) {
            result = result[parts[i]];
            if (result == null) return;
        }
    }
    return typeof result === 'function' ? result : null;
};

Transform.prototype.update = function update(key, value) {
    value = this._method(value);
    if (value !== this._value) this._object.update(key, value);
};

Transform$register('Number', Number);
Transform$register('String', String);
Transform$register('Math', Math);
