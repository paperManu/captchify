/*************/
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

/*************/
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

/*************/
function randomColor () {
    var a = Math.ceil(Math.random() * 255);
    var b = Math.ceil(Math.random() * 255);
    var c = Math.ceil(Math.random() * 255);
    return rgbToHex(a, b, c);
}

/*************/
function randomWidth (width) {
    var a = Math.floor(Math.random() * width);
    return a;
}

/*************/
function randomHeight (height) {
    var a = Math.floor(Math.random() * height);
    return a;
}

/*************/
function setCustom () {
    document.getElementById('style-selector').options[3].selected = true;
}

