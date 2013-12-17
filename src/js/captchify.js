var _styles = ['circles', 'lines', 'curves', 'points'];

/*************/
var _types = {
    circles: function(area) {
        var circle = area.circle(100).move(200, 200);
        return circle;
    },

    lines: function(area) {
        var canvas = area.parent;
        var width = canvas.clientWidth; 
        var height = canvas.clientHeight;

        var group = area.group();
        for (i=0; i<40; i++) {
            var a = Math.ceil(Math.random() * width);
            var b = Math.ceil(Math.random() * height);
            var c = Math.ceil(Math.random() * width);
            var d = Math.ceil(Math.random() * height);
            var str = Math.floor((Math.random()*4)+1);
            var line = area.line(a, b, c, d).stroke({ width: str });
            group.add(line);
        }

        return group;
    },

    curves: function(area) {
        var canvas = area.parent;
        var width = canvas.clientWidth; 
        var height = canvas.clientHeight;

        var group = area.group();
        for (i=0; i<10; i++) {
            var plot = "M"+randomWidth(width)+","+randomHeight(height)+" Q"+randomWidth(width)+", "+randomHeight(height)+ " "+randomWidth(width)+","+randomHeight(height)+" T"+randomWidth(width)+","+randomHeight(height);
            var str = Math.floor((Math.random()*4)+1);
            var testCol = randomColor();
            var curve = area.path(plot).stroke(testCol).fill('none');
            group.add(curve);
        } 

        return group;
    },

    points: function(area) {
        var canvas = area.parent;
        var width = canvas.clientWidth; 
        var height = canvas.clientHeight;

        var group = area.group();
        for (i=0; i<1000; i++) {
            var a = Math.ceil(Math.random() * width);
            var b = Math.ceil(Math.random() * height);
            var line = area.line(a, b, a+2, b).stroke({ width: 2 });
            group.add(line);
        }

        return group;
    }
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
    this.setFront = function(type) {
        var func = _types[type];
        var layer = func(drawArea);
        if (front != undefined)
            front.remove();
        front = layer;
        front.front();
    };

    /*********/
    this.setBack = function(type) {
        var func = _types[type];
        var layer = func(drawArea);
        if (back != undefined)
            back.remove();
        back = layer;
        back.back();
    };
}

/*************/
// function initGUI(c) {
//     var gui = new dat.GUI();
//     document.getElementById("header").appendChild(gui.domElement);

   
//     gui.add(c, 'inputText').onChange(function(t) {
//         c.svgText.text(t);
//     });
//     gui.add(c, 'frontStyle', _styles).onChange(function(t) {
//         c.setFront(t);
//     });
//     gui.add(c, 'backStyle', _styles).onChange(function(t) {
//         c.setBack(t);
//     });
//     gui.add(c, 'numColors', 1, 10);
//     gui.add(c, 'letterSpacing', -10, 10);
//     gui.add(c, 'letterRotation', 0, 10);
//     gui.add(c, 'letterDecal', 0, 10);
//     gui.add(c, 'letterSwirl', 0, 10);
//     gui.add(c, 'fontSize', 8, 200).onChange(function(v) {
//         c.svgText.font({anchor: 'middle', size: v});
//     });
//     gui.add(c, 'linesNum', 0, 100).onChange(function(v) {
//         c.draw
//     });
//     gui.add(c, 'lineCurves', 0, 100);
//     gui.add(c, 'pointsNum', 0, 2000);
// }

/*************/
$(document).ready(function() {
    var captcha = new Captchifier($('#drawing'));
    // initGUI(captcha);

    $('#toggle-controls').on('click', function () {
        $('#controls').slideToggle();
    });
})
