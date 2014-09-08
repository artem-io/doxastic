
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
