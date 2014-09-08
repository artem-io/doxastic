(function() {

    Doxastic([
    {
        guid: 'source',
        type: 'Observable',
        data: {
            x: '#{input-x.value|Number}',
            y: '#{input-y.value|Number}',
            width: 200,
            height: 200
        },
        pipe: [{
            type: 'DOMRenderer',
            data: '#source'
        }]
    },
    {
        guid: 'target',
        type: 'Observable',
        data: {
            x: '${source.x}',
            y: '${source.y}',
            width: '${source.width}',
            height: '${source.height}'
        },
        pipe: [{
            type: 'DOMRenderer',
            data: '#target'
        }]
    }
    ]);

    var sourceElement = document.getElementById('source');

    var targetElement = document.getElementById('target');

    var sourceObservable = new Doxastic.Observable({
        x: 100,
        y: 100,
        width: 200,
        height: 200
    });

    var targetObservable = new Doxastic.Observable({
        x: 600,
        y: 100,
        width: 200,
        height: 200
    });

    var sourceRenderer = new Doxastic.DOMRenderer(sourceElement);

    var targetRenderer = new Doxastic.DOMRenderer(targetElement);

    var xObserver = new Doxastic.Observer(targetObservable, 'x');
    var yObserver = new Doxastic.Observer(targetObservable, 'y');

    sourceObservable.observe('x', xObserver);
    sourceObservable.observe('y', yObserver);

    sourceObservable.subscribe(sourceRenderer);
    targetObservable.subscribe(targetRenderer);

    var inputX = document.getElementById('inputX');
    var inputY = document.getElementById('inputY');

    inputX.addEventListener('change', function() {
        sourceObservable.update('x', Number(this.value));
    });

    inputY.addEventListener('change', function() {
        sourceObservable.update('y', Number(this.value));
    });

}());
