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
            var plot = "M"+randomWidth(width)+","+randomHeight(height)+" Q"+randomWidth(width)+","+randomHeight(height)+ " "+randomWidth(width)+","+randomHeight(height)+" T"+randomWidth(width)+","+randomHeight(height);
            var str = Math.floor((Math.random()*4)+1);
            if (_colors) {
                var color = randomColor();
            } else {
                var color = '#000';
            };
            var curve = area.path(plot, true).stroke({color: color, width: 2}).fill('none');
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
    var path = 'M0,150 Q' + width/4 +  ',' + (randomHeight(300)) + ' ' + width/2 + ',150 T' + width + ',150';
    this.svgText.path(path, true);

    var layers = [];
    var front, back;

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
            var layer = func(drawArea, value);
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
var parseQuery = function(captcha) {
    var url = purl();
    var value;

    if ((value = url.param('text')) != undefined)
        captcha.setText(value);
    if ((value = url.param('lines')) != undefined)
        captcha.setBack('lines', value);
    if ((value = url.param('curves')) != undefined)
        captcha.setBack('curves', value);
    if ((value = url.param('points')) != undefined)
        captcha.setBack('points', value);
}

/*************/
$(document).ready(function() {
    var captcha = new Captchifier($('#drawing'));
    parseQuery(captcha);

    $('#col').toggleClass('col-selected');

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
        $('#col').toggleClass('col-selected');
        $('#bw').toggleClass('col-selected');
        setCustom();
    });
    $('#col').on('click', function () {
        _colors=true;
        $('#col').toggleClass('col-selected');
        $('#bw').toggleClass('col-selected');
        setCustom();
    });


    // 2ème colonne
    $('#slider-size').slider({min:8, max:240, value:120});
    $('#slider-size').on('slide', function(e, ui) {
        captcha.setSize(ui.value);
        setCustom();
    });

    $('#slider-spacing').slider({min:-10, max:10, value:0})
    $('#slider-spacing').on('slide', function(e, ui) {
        console.log(ui.value);
        setCustom();
    });

    $('#slider-def').slider();
    $('#slider-def').on('slide', function(e, ui) {
        console.log(ui.value);
        setCustom();
    });

    $('#slider-fuzzy').slider();
    $('#slider-fuzzy').on('slide', function(e, ui) {
        console.log(ui.value);
        setCustom();
    });


    // 3ème colonne
    $( "#slider-lines" ).slider({max : 100});
    $('#slider-lines').on('slide', function(e, ui) { 
        captcha.setBack('lines', ui.value);
        setCustom();
    });

    $('#slider-curves').slider({max:40});
    $('#slider-curves').on('slide', function(e, ui) {
        captcha.setBack('curves', ui.value);
        setCustom();
    });

    $('#slider-points').slider({max:4000});
    $('#slider-points').on('slide', function(e, ui) {
        captcha.setBack('points', ui.value);
        setCustom();
    });

    $('#slider-blur').slider();
    $('#slider-blur').on('slide', function(e, ui) {
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
