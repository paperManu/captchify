var _styles = ['first', 'second', 'third'];

/*************/
function Captchifier(canvas) {
    // Attributes
    this.inputText = "mozzarellabs";
    this.fontSize = 10;
    this.style = "";

    // Private attributes
    var father = undefined;
    if (canvas == undefined)
        father = document;
    else
        father = canvas;

    var width = father.width();
    var height = father.height();

    var drawArea = SVG(father.attr('id')).size('100%', '60%');
    var svgText = drawArea.text(this.inputText);
    svgText.font({anchor: 'middle'});
    svgText.move(width / 2, height / 2);

    /*********/
    this.draw = function(text) {
        if (text != undefined && typeof(text) == 'string')
            this.inputText = text;
        else
            return;
            
        svgText.text(this.inputText);
    };

    /*********/
    this.setFontSize = function(size) {
        if (size != undefined && typeof(size) != 'number')
            return;

        svgText.font({size: size});
    };

    /*********/
    // dat.GUI things
    var gui = new dat.GUI();
    document.getElementById("header").appendChild(gui.domElement);

    gui.add(this, 'fontSize', 8, 200).onChange(function(v) {
        svgText.font({size: v});
    });
    gui.add(this, 'inputText').onChange(function(t) {
        svgText.text(t);
    });
    gui.add(this, 'style', _styles);

    // les lignes aléatoires
    var draw = SVG("drawing");
    var mw = document.getElementById("drawing");
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

    for (i=0; i<1000; i++) {
        var a = Math.ceil(Math.random() * width);
        var b = Math.ceil(Math.random() * height);
        var line = draw.line(a, b, a+2, b).stroke({ width: 2 });
    }
}

/*************/
$(document).ready(function() {
    var captcha = new Captchifier($('#drawing'));
    captcha.setFontSize(180);
})
