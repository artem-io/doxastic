
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
