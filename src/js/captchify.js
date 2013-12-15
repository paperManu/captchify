/*************/
function Captchifier(canvas) {
    // Attributes
    this.inputText = "mozzarellabs";

    // Private attributes
    var father = undefined;
    if (canvas == undefined)
        father = document;
    else
        father = canvas;

    var width = father.width();
    var height = father.height();

    var drawArea = SVG(father.attr('id'));
    var svgText = drawArea.text(this.inputText);
    svgText.font({anchor: 'middle'});
    svgText.move(width / 2, height / 2);

    /*********/
    this.draw = function(text) {
        if (text != undefined && typeof(text) == 'string')
            this.inputText = text;
            
        svgText.text(this.inputText);
    };

    /*********/
    this.setFontSize = function(size) {
        if (size != undefined && typeof(size) != 'number')
            return;

        svgText.font({size: size});
    };
}

/*************/
function initGUI() {
    var g = new dat.GUI();
}

/*************/
$(document).ready(function() {
    var captcha = new Captchifier($('#canvas'));
    captcha.draw('pouet');
    captcha.setFontSize(180);

    initGUI();
})
