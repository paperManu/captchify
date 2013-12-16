var _styles = ['first', 'second', 'third'];

/*************/
var _types = {
    circles: function() {
        var circle = draw.circle(100).move(200, 200);
        return circle;
    },

    lines: function() {
        var draw = SVG("canvas").size('100%', '100%');
        var mw = document.getElementById("canvas");
        var width = mw.clientWidth; 
        var height = mw.clientHeight;
        for (i=0; i<40; i++) {
            var a = Math.ceil(Math.random() * width);
            var b = Math.ceil(Math.random() * 400);
            var c = Math.ceil(Math.random() * width);
            var d = Math.ceil(Math.random() * 400);
            var str = Math.floor((Math.random()*4)+1);
            var line = draw.line(a, b, c, d).stroke({ width: str });
        }
    }
};

/*************/
function Captchifier(canvas) {
    // Attributes
    this.inputText = "mozzarellabs";
    this.fontSize = 10;
    this.style = "";

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

    /*********/
    this.draw = function(text) {
        if (text != undefined && typeof(text) == 'string')
            this.inputText = text;
        else
            return;
            
        this.svgText.text(this.inputText);
    };

    /*********/
    this.addLayer = function(type) {
        var layer = _types[type];
        console.log(layer);
    };
}

/*************/
function initGUI(c) {
    var gui = new dat.GUI();
    document.getElementById("header").appendChild(gui.domElement);

    gui.add(c, 'fontSize', 8, 200).onChange(function(v) {
        c.svgText.font({anchor: 'middle', size: v});
    });
    gui.add(c, 'inputText').onChange(function(t) {
        c.svgText.text(t);
    });
    gui.add(c, 'style', _styles);
}

/*************/
$(document).ready(function() {
    var captcha = new Captchifier($('#drawing'));
    initGUI(captcha);

    captcha.addLayer("circles");
})
