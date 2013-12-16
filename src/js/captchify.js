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
            var b = Math.ceil(Math.random() * height);
            var c = Math.ceil(Math.random() * width);
            var d = Math.ceil(Math.random() * height);
            var str = Math.floor((Math.random()*4)+1);
            var line = draw.line(a, b, c, d).stroke({ width: str });
        }
    }

    // points: function() {
    //     var draw = SVG("canvas").size('100%', '100%');
    //     var mw = document.getElementById("canvas");
    //     var width = mw.clientWidth; 
    //     var height = mw.clientHeight;
    //     for (i=0; i<1000; i++) {
    //         var a = Math.ceil(Math.random() * width);
    //         var b = Math.ceil(Math.random() * height);
    //         var line = draw.line(a, b, a+2, b).stroke({ width: 2 });
    //     }

    // }
};

/*************/
function Captchifier(canvas) {
    // Attributes
    this.inputText = "mozzarellabs";
    this.fontSize = 10;
    this.style = "";
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

    /*********/
    this.draw = function(text) {
        if (text != undefined && typeof(text) == 'string')
            this.inputText = text;
        else
            return;
            
        this.svgText.text(this.inputText);
    };

        // var draw = SVG("canvas").size('100%', '100%');
        // var mw = document.getElementById("canvas");
        // var width = mw.clientWidth; 
        // var height = mw.clientHeight;
        // for (i=0; i<10; i++) {
        //     var a = Math.ceil(Math.random() * width);
        //     var b = Math.ceil(Math.random() * height);
        //     var c = Math.ceil(Math.random() * width);
        //     var d = Math.ceil(Math.random() * height);
        //     var str = Math.floor((Math.random()*4)+1);
        //     var testCol = randomColor();
        //     var line = draw.line(a, b, c, d).stroke({ width: str , color: testCol});
        // };


        // random curves // 
        var draw = SVG("canvas").size('100%', '100%');
        var mw = document.getElementById("canvas");
        var width = mw.clientWidth; 
        var height = mw.clientHeight;
        for (i=0; i<10; i++) {
            var a = Math.ceil(Math.random() * width);
            var b = Math.ceil(Math.random() * height);
            var c = Math.ceil(Math.random() * width);
            var d = Math.ceil(Math.random() * height);
            var e = Math.ceil(Math.random() * width);
            var f = Math.ceil(Math.random() * height);
            var g = Math.ceil(Math.random() * width);
            var h = Math.ceil(Math.random() * height);
            var plot = "M"+a+","+b+" Q"+c+", "+d+ " "+e+","+f+" T"+g+","+h;
            console.log(plot);
            var str = Math.floor((Math.random()*4)+1);
            var testCol = randomColor();
            var curve = draw.path(plot).stroke(testCol).fill('none');
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

   
    gui.add(c, 'inputText').onChange(function(t) {
        c.svgText.text(t);
    });
    gui.add(c, 'style', _styles);

    gui.add(c, 'numColors', 1, 10);

    gui.add(c, 'letterSpacing', -10, 10);

    gui.add(c, 'letterRotation', 0, 10);

    gui.add(c, 'letterDecal', 0, 10);

    gui.add(c, 'letterSwirl', 0, 10);

    gui.add(c, 'fontSize', 8, 200).onChange(function(v) {
        c.svgText.font({anchor: 'middle', size: v});
    });

    gui.add(c, 'linesNum', 0, 100).onChange(function(v) {
        c.draw
    });

    gui.add(c, 'lineCurves', 0, 100);

    gui.add(c, 'pointsNum', 0, 2000);


}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function randomColor () {
    var a = Math.ceil(Math.random() * 255);
    var b = Math.ceil(Math.random() * 255);
    var c = Math.ceil(Math.random() * 255);
    return rgbToHex(a, b, c);
}

/*************/
$(document).ready(function() {
    var captcha = new Captchifier($('#drawing'));
    initGUI(captcha);

    captcha.addLayer("circles");
})
