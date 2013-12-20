var _styles = ['circles', 'lines', 'curves', 'points'];
var _controls = true;
var _colors = true; 

/*************/
var _types = {
    circles: function(area) {
        var circle = area.circle(100).move(200, 200);
        return circle;
    },

    // 3ème colonne 
    lines: function(area, value) {
        var canvas = area.parent;
        var width = canvas.clientWidth; 
        var height = canvas.clientHeight;

        var group = area.group();
        for (i=0; i<value; i++) {
            var str = Math.floor((Math.random()*4)+1);
            if (_colors) {
                var color = randomColor();
            } else {
                var color = '#000';
            };
            var line = area.line(randomWidth(width), randomHeight(height), randomWidth(width), randomHeight(height)).stroke({ width: str , color: color});
            group.add(line);
        }
        return group;
    },

    curves: function(area, value) {
        var canvas = area.parent;
        var width = canvas.clientWidth; 
        var height = canvas.clientHeight;

        var group = area.group();
        for (i=0; i<value; i++) {
            var plot = "M"+randomWidth(width)+","+randomHeight(height)+" Q"+randomWidth(width)+", "+randomHeight(height)+ " "+randomWidth(width)+","+randomHeight(height)+" T"+randomWidth(width)+","+randomHeight(height);
            var str = Math.floor((Math.random()*4)+1);
            if (_colors) {
                var color = randomColor();
            } else {
                var color = '#000';
            };
            var curve = area.path(plot).stroke(color).fill('none');
            group.add(curve);
        } 

        return group;
    },

    points: function(area, value) {
        var canvas = area.parent;
        var width = canvas.clientWidth; 
        var height = canvas.clientHeight;

        var group = area.group();
        for (i=0; i<value; i++) {
            var a = randomWidth(width);
            var b = randomHeight(height);
            if (_colors) {
                var color = randomColor();
            } else {
                var color = '#000';
            };
            var line = area.line(a, b, a+2, b).stroke({ width: 2, color: color });
            group.add(line);
        }

        return group;

    }

    //blur: function(area) {

    //}
};

/*************/
function Captchifier(canvas) {
    // Attributes
    this.inputText = "mozzarellabs";
    this.fontSize = 10;
    this.frontStyle = "";
    this.backStyle = "";
    this.numColors = 1;
    this.letterSpacing = 0;
    this.letterRotation = 0;
    this.letterDecal = 0;
    this.letterSwirl = 10;
    this.linesNum = 100;
    this.pointsNum = 100;
    this.lineCurves = 20;

    var father = undefined;
    if (canvas == undefined)
        father = document;
    else
        father = canvas;

    var width = father.width();
    var height = father.height();

    var drawArea = SVG(father.attr('id')).size('100%', '60%');
    this.svgText = drawArea.text(this.inputText);
    this.svgText.move(width / 2, height / 2);
    this.svgText.font({size: 160, anchor: 'middle'});

    var layers = [];
    var front, back;

    /*********/
    this.draw = function(text) {
        if (text != undefined && typeof(text) == 'string')
            this.inputText = text;
        else
            return;
            
        this.svgText.text(this.inputText);
    };

    /*********/
    this.setBack = function(type, value) {
        var func = _types[type];
        var isPresent = false;
        for (var i in layers) {
            if (layers[i][0] == type) {
                layers[i][1].remove();
                layers[i][1] = func(drawArea, value);
                layers[i][1].back();
                isPresent = true;
            }
        }

        if (!isPresent) {
            var layer = func(drawArea);
            layers.push([type, layer]);
            layer.back();
        }
    };

    /*********/
    this.setFront = function(type, value) {
        var func = _types[type];
        var layer = func(drawArea);
        if (front != undefined)
            front.remove();
        front = layer;
        front.front();
    };

    /*********/
    this.setSize = function(size) {
        this.svgText.font({size: size});
    };

    /*********/
    this.setText = function(text) {
        this.svgText.text(text);
    };
}

/*************/
$(document).ready(function() {
    var captcha = new Captchifier($('#drawing'));

    // 1ère colonne
    $('#inputText').on('input', function(e) {
        captcha.setText(e.target.value);
    });

    $('#style-selector').on('change.bfhselectbox', function(e) {
        console.log(e.target.value);
    });

    $('#font-selector').on('change.bfhselectbox', function(e) {
        console.log(e.target.value);
        setCustom();
    });

    $('#bw').on('click', function () {
        _colors=false;
        setCustom();
    });
    $('#col').on('click', function () {
        _colors=true;
        setCustom();
    });



    // 2ème colonne
    $('#slider-size').on('change.bfhslider', function(e) {
        captcha.setSize(e.target.value);
        setCustom();
    });

    $('#slider-spacing').on('change.bfhslider', function(e) {
        console.log(e.target.value);
        setCustom();
    });

    $('#slider-def').on('change.bfhslider', function(e) {
        console.log(e.target.value);
        setCustom();
    });

    $('#slider-fuzzy').on('change.bfhslider', function(e) {
        console.log(e.target.value);
        setCustom();
    });


    // 3ème colonne
    $('#slider-lines').on('change.bfhslider', function(e) { 
        captcha.setBack('lines', e.target.value);
        setCustom();
    });

    $('#slider-curves').on('change.bfhslider', function(e) {
        captcha.setBack('curves', e.target.value);
        setCustom();
    });
    $('#slider-points').on('change.bfhslider', function(e) {
        captcha.setBack('points', e.target.value);
        setCustom();
    });

    $('#slider-blur').on('change.bfhslider', function(e) {
        captacha.setFront('blur');
        setCustom();
    })

    // montrer / cacher les controles
    $('#toggle-controls').on('click', function () {
        $('#controls').slideToggle();
        if (_controls) {
            $(this).find('span').text('Show controls');
            _controls = false;
        } else {
            $(this).find('span').text('Hide controls');
            _controls = true;
        }
        
    });


})
