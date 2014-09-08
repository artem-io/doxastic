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

function Doxastic(list) {

    for (var i = 0, l = list.length; i < l; ++i) {

        var hash = list[i];
        var guid = hash.guid;
        var type = hash.type || 'Observable';
        var data = hash.data;
        var pipe = hash.pipe;

        var Component = Doxastic$CONSTRUCTORS[type];
        var component = new Component(data);
        

    }

}

var Doxastic$CONSTRUCTORS = Doxastic.CONSTRUCTORS = Object$create(null);

var Doxastic$register = Doxastic.register = function register(type, constructor) {
    Doxastic$REGISTRY[type] = constructor;
};

// import Observable

// import Observer

// import renderBuffer

// import Renderer

// import DOMRenderer

// import SVGRenderer

Doxastic.Observable = Observable;

Doxastic.Observer = Observer;

Doxastic.Renderer = Renderer;

Doxastic.DOMRenderer = DOMRenderer;

Doxastic.SVGRenderer = SVGRenderer;

return Doxastic;

}(this));
