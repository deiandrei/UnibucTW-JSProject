function addSpacer(idName, count = 1) {
    for (i = 0; i < count; i++) {
        document.getElementById(idName).appendChild(document.createElement("br"));
    }
}

function getInputByType(type, className, placeholder) {
    var input = document.createElement("input");
    input.className = className;
    input.placeholder = placeholder;
    input.type = type;

    return input;
}

function getRGBfromHEXString(colorStr) {
    var spaceWidth = 0;
    if(colorStr.length == 7) spaceWidth = 2;
    else if(colorStr.length == 4) spaceWidth = 1;
    else return {r: 0, g: 0, b: 0};

    return {r: parseInt(colorStr.substring(1, 1 + spaceWidth), 16), g: parseInt(colorStr.substring(1 + spaceWidth, 1 + 2 * spaceWidth), 16), b: parseInt(colorStr.substring(1 + 2 * spaceWidth, 1 + 3 * spaceWidth), 16)}; 
}

function getStringfromRGB(rgb) {
    return 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')';
}

function lerp(a,b,t) {
    return (1.0 - t) * a + t * b;
}

function lerpRGB(a,b,t) {
    var r0 = Math.round(lerp(a.r, b.r, t));
    var g0 = Math.round(lerp(a.g, b.g, t));
    var b0 = Math.round(lerp(a.b, b.b, t));

    return {r: r0, b: b0, g:g0};
}
