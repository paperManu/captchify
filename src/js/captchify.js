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

    this.drawArea = SVG(father.attr('id'));
    this.svgText = this.drawArea.text(this.inputText);
    this.svgText.font({anchor: 'middle'});
    this.svgText.move(width / 2, height / 2);

    /*********/
    this.draw = function(text) {
        if (text != undefined && typeof(text) == 'string')
            this.inputText = text;
            
        this.svgText.text(this.inputText);
        console.log(this.svgText);
    };

    /*********/
    this.setFontSize = function(size) {
        if (size != undefined && typeof(size) != 'number')
            return;

        this.svgText.font({size: size});
    };
}

/*************/
function initGUI() {
    // dat.GUI related
    var g = new dat.GUI();
}

/*************/
$(document).ready(function() {
    //initGUI();

    var captcha = new Captchifier($('#canvas'));
    captcha.draw('pouet');
    captcha.setFontSize(180);
})
