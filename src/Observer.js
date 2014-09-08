
function Observer(object, key) {
    this._object = object;
    this._key = key;
}

Observer.prototype.update = function update(key, value) {
    this._object.update(this._key, value);
};
