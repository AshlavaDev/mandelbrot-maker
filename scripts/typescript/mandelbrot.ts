//typescript mandelbrot code
let canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
let ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

let maxIter: number = 50;
let zoom: number = 1;
let centerX: number = 2.2;
let centerY: number = 1.5;

function checkIfBelongsToMandelbrotSet(x: number, y: number): number {
    let realComponentOfResult: number = x;
    let imaginaryComponentOfResult: number = y;
    for(let i = 0; i < maxIter; i++) {
        let tempRealComponent: number = realComponentOfResult * realComponentOfResult
                                - imaginaryComponentOfResult * imaginaryComponentOfResult
                                + x;
        let tempImaginaryComponent: number = 2 * realComponentOfResult * imaginaryComponentOfResult
                                + y;
        realComponentOfResult = tempRealComponent;
        imaginaryComponentOfResult = tempImaginaryComponent;

        if (realComponentOfResult * imaginaryComponentOfResult > 5)
            return (i/maxIter * 100);
    }
    return 0;   // Return zero if in set        
}

for(let x = 0; x < canvas.width; x++) {
    for(let y = 0; y < canvas.height; y++) {
        let belongsToSet: number = checkIfBelongsToMandelbrotSet(x, y);
        if(belongsToSet == 0) {
            ctx.fillStyle = '#000';
            ctx.fillRect(x, y, 1, 1); // Draw a black pixel
        } else {
            let hue: number = belongsToSet % 360;
            ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
            ctx.fillRect(x, y, 1, 1); // Draw a colorful pixel
        }            
    }    
}