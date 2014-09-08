
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
