"use strict";
//typescript mandelbrot code
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let maxIter = 50;
let zoom = 1;
let centerX = 2.2;
let centerY = 1.5;
function checkIfBelongsToMandelbrotSet(x, y) {
    let realComponentOfResult = x;
    let imaginaryComponentOfResult = y;
    for (let i = 0; i < maxIter; i++) {
        let tempRealComponent = realComponentOfResult * realComponentOfResult
            - imaginaryComponentOfResult * imaginaryComponentOfResult
            + x;
        let tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult
            + y;
        realComponentOfResult = tempRealComponent;
        imaginaryComponentOfResult = tempImaginaryComponent;
        if (realComponentOfResult * imaginaryComponentOfResult > 5)
            return (i / maxIter * 100);
    }
    return 0; // Return zero if in set        
}
for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
        let belongsToSet = checkIfBelongsToMandelbrotSet(x, y);
        if (belongsToSet == 0) {
            ctx.fillStyle = '#000';
            ctx.fillRect(x, y, 1, 1); // Draw a black pixel
        }
        else {
            let hue = belongsToSet % 360;
            ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
            ctx.fillRect(x, y, 1, 1); // Draw a colorful pixel
        }
    }
}
