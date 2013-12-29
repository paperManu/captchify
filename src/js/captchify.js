var _styles = ['circles', 'lines', 'curves', 'points'];
var _controls = true;
var _colors = true; 

/*************/
var _types = {
    //circles: function(area) {
    //    var circle = area.circle(100).move(200, 200);
    //    return circle;
    //},

    lines_: function() {
        var test = 18;
        return function(area, value) {
            test++;
            console.log(area, value, test);
        }
    },

    lines: function(area) {
        var qty = 0;
        var group = area.group();
        group.back();
        return function(value) {
            var canvas = area.parent;
            var width = canvas.clientWidth; 
            var height = canvas.clientHeight;

            for (var i = qty; i < value; i++, qty++) {
                var str = Math.floor((Math.random()*4)+1);
                if (_colors) {
                    var color = randomColor();
                } else {
                    var color = '#000';
                };
                var line = area.line(randomWidth(width), randomHeight(height), randomWidth(width), randomHeight(height)).stroke({ width: str , color: color});
                group.add(line);
            }

            for (var i = value; i < group._children.length; ++i, qty--) {
                group.removeElement(group._children[i]);
            }
        }
    },

    curves: function(area) {
        var qty = 0;
        var group = area.group();
        group.back();
        return function(value) {
            var canvas = area.parent;
            var width = canvas.clientWidth; 
            var height = canvas.clientHeight;

            for (var i = qty; i < value; i++, qty++) {
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

            for (var i = value; i < group._children.length; ++i, qty--) {
                group.removeElement(group._children[i]);
            }
        }
    },

    points: function(area) {
        var qty = 0;
        var group = area.group();
        group.back();
        return function(value) {
            var canvas = area.parent;
            var width = canvas.clientWidth; 
            var height = canvas.clientHeight;

            for (var i = qty; i < value; i++, qty++) {
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

            for (var i = value; i < group._children.length; ++i, --qty) {
                group.removeElement(group._children[i]);
            }
        }
    }
};

/*************/
function Text(drawArea) {
    this.text = "";
    this.size = 160;
    this.spacing = 60;

    var that = this;
    var allText = drawArea.group();
    console.log(allText);

    /*********/
    var addLetter = function(letter, position, angle) {
        var svgText = drawArea.text(letter[0]);
        svgText.move(position[0], position[1]);
        svgText.font({size: that.size, anchor: 'middle'});
        svgText.rotate(angle);
        allText.add(svgText);
    }

    /*********/
    var addWord = function(word, position) {
        var deltaStep = Math.random() * 32 - 16;
        var delta = [position[0], position[1]];
        var alphaStep = Math.random() * 30 * deltaStep / Math.abs(deltaStep);
        var alpha = 0;
        for (var i = 0; i < word.length; ++i) {
            addLetter(word[i], delta, alpha);
            delta[0] += that.spacing;
            delta[1] += deltaStep;
            position[0] += that.spacing;
            alpha += alphaStep;
        }
        position[0] += that.spacing;
    }

    /*********/
    this.redraw = function() {
        this.setText(this.text);
    }

    /*********/
    this.setDeformation = function(value) {
    }

    /*********/
    this.setFont = function(font) {
    }

    /*********/
    this.setSize = function(value) {
    }

    /*********/
    this.setSpacing = function(value) {
    }

    /*********/
    this.setText = function(text) {
        if (allText._children != undefined)
            for (var i = allText._children.length - 1; i >= 0; --i) {
                allText.removeElement(allText._children[i]);
            }

        this.text = String(text);
        
        var delta = [0, 0];
        this.text.split(' ').forEach(function(word) {
            addWord(word, delta);
        });
    }
}

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
    var path = 'M0,150 Q' + width/4 +  ',' + (randomHeight(400)) + ' ' + width/2 + ',150 T' + width + ',150';
    this.svgText.path(path, true);

    var layers = [];
    var front, back;

    this.text = new Text(drawArea);

    /*********/
    this.setBack = function(type, value) {
        var func = _types[type];
        var isPresent = false;
        for (var i in layers) {
            if (layers[i][0] == type) {
                layers[i][1](value);
                isPresent = true;
            }
        }

        if (!isPresent) {
            var layer = func(drawArea);
            console.log(layer);
            layer(value);
            layers.push([type, layer]);
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
        this.text.setText(text);
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
function isColor () {
    if (_colors) {
        if ($('#col').hasClass('col-selected')) {
            // ne rien faire 
        } else if ($('#bw').hasClass('col-selected')) {
            // changer
            $('#col').addClass('col-selected');
            $('#bw').removeClass('col-selected');
        } else {
            $('#col').addClass ('col-selected');
        }
    } else {
        if ($('#col').hasClass('col-selected')) {
            // changer
            $('#col').toggleClass('col-selected');
            $('#bw').toggleClass('col-selected');
        } else {
            // ne rien faire 
        }
    }   
}

/*************/
$(document).ready(function() {
    var captcha = new Captchifier($('#drawing'));
    parseQuery(captcha);

    isColor();

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
        isColor();
        setCustom();
    });
    $('#col').on('click', function () {
        _colors=true;
        isColor();
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
