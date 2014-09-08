
function Context(content) {

    var objects = Object$create(null);
    var pending = [];
    var binding = /\{\{.+\}\}/;

    for (var i = 0, l = content.length; i < l; ++i) {

        var item = content[i];
        var guid = item.guid;
        var type = item.type || 'Observable';
        var data = item.data;
        var Ctor = Doxastic$CONSTRUCTORS[type];

        var object = new Ctor(data);

        if (guid != null)
            objects[guid] = object;

        if (data != null) {
            var keys = Object$keys(data);
            var bind = false;
            for (var x = 0, n = keys.length; x < n; ++x) {
                var key = keys[x];
                var value = data[key];
                if (binding.test(value)) {
                    var detail = parseBindingString(value);
                    if (detail.forElement()) {
                        // immediately activate dom bindings
                    }
                    else {
                        // create an observer
                        var observer = new Observer(object, key);
                        // if observable is ready observe it
                        if (binding.source in objects)
                            binding.bindFrom(objects[binding.source]);
                        // else register the dependency to listen for the observable ready event
                        else
                            
                    }
                }
            }

        }

        if (guid != null && !bind) {
            var type = item.type || 'Observable';
            var Ctor = Doxastic$CONSTRUCTORS[type];
            objects[guid] = new Ctor(data);
        }






        var hash = content[i];
        var guid = hash.guid;
        var type = hash.type || 'Observable';
        var data = hash.data;
        var pipe = hash.pipe;

        var constructor = Doxastic$CONSTRUCTORS[type];
        var object = new constructor(data);

        if (guid != null)
            objects[guid] = object;
    }

}
