
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
