var x;
var y;
var color;
var atual = 'praia';
$(window).load(function () {
    //startCanvas();
    // $("#button").click(function(){
    //     startCanvas();
    // });

    // $("#borracha").click(function(){
    //     ctx.clearRect(0, 0, 1024, 748);
    // });

 
    //setTimeout(botao, 500, 0);
    //Stage.scaleMode = "noscale";
});


var PALLET = [
'rgba(255, 242, 000, 1)',
'rgba(250, 166, 026, 1)',
'rgba(228, 078, 048, 1)',
'rgba(255, 255, 255, 1)',
'rgba(000, 255, 018, 1)',
'rgba(000, 234, 255, 1)',
'rgba(234, 000, 255, 1)',
'rgba(042, 000, 255, 1)',
'rgba(131, 131, 131, 1)'
];


var canvas, //canvas element.
ctx, //drawing context.
startX = 0, //starting X coordinate.
startY = 0, //starting Y coordinate.
started = false, //has move event started.
pickerEnabled = false, //color picker toggle.
strokePickerEnabled = false, //flag for stroke picker.
fillPickerEnabled = false, //flag for background picker
imgPicker, //color picker image.
originalImageData, //data for original image prior to color picker being visible.
imgd, //image data object.
data = [], //array of image pixel data.
toolbarHeight = 41, //toolbar offset height (pixels).
penSize = 7, //pen width (pixels).
roundedVel = 10,
timerStart = 0,
r = 0, //red stroke
g = 0, //green stroke
b = 0, //blue stroke
rB = 255, //red fill
gB = 255, //green fill
bB = 255,
canvas_2,
borracha;//blue fill

function onTouchStart(e) {

    e.preventDefault();

    if (e.touches.length == 1) {

        startDraw(e.touches[0].pageX, e.touches[0].pageY);

        canvas.addEventListener('touchmove', onTouchMove, false);
        canvas.addEventListener('touchend', onTouchEnd, false);
        canvas.addEventListener('touchcancel', onTouchCancel, false);
    }
}


function startDraw(x,y) {

    //if the colour picker is not visible, we must be in drawing mode
    //set defaults
    started = false;

    //get start position
    startX = x;
    startY = y;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 30;
    ctx.globalCompositeOperation = 'source-over';

    //save canvas image data for future undo event
    originalImageData = ctx.getImageData(0, 0, window.innerWidth, (window.innerHeight ));

    
}

function onTouchMove(e) {

    e.preventDefault();
    moveDraw(e.touches[0].pageX, e.touches[0].pageY, e.timeStamp);
}

function onTouchEnd(e) {

    e.preventDefault();

    if (e.touches.length == 0) {

        endDraw(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
        canvas.removeEventListener('touchmove', onTouchMove, false);
        canvas.removeEventListener('touchend', onTouchEnd, false);
        canvas.removeEventListener('touchcancel', onTouchCancel, false);
    }
}

function onTouchCancel(e) {

    canvas.removeEventListener('touchmove', onTouchMove, false);
    canvas.removeEventListener('touchend', onTouchEnd, false);
    canvas.removeEventListener('touchcancel', onTouchCancel, false);

}

function onMouseDown(e) {

    startDraw(e.clientX, e.clientY);
    canvas.addEventListener('mousemove', onMouseMove, false);
    canvas.addEventListener('mouseup', onMouseUp, false);

}

function onMouseMove(e) {

    moveDraw(e.clientX, e.clientY, e.timeStamp);
}

function onMouseUp(e) {

    endDraw(e.clientX, e.clientY);
    canvas.removeEventListener('mousemove', onMouseMove, false);
    canvas.removeEventListener('mouseup', onMouseUp, false);
}

function moveDraw(x,y,t) {

    //if the colour picker is not visible, we must be in drawing mode

    ctx.beginPath();
    ctx.moveTo(startX, startY);

    if (!started) {

        timerStart = t;
        started = true;
    }
    else {

        //calc velocity
        var time = t - timerStart;
        var distance = Math.sqrt(Math.pow(((y ) - startY), 2) + Math.pow((x - startX), 2));
        var velocity = distance / time;
        roundedVel = Math.round(velocity * 100) / 100;
        started = false;
    }

    var lw = penSize * roundedVel;

    //set line width limits
    if (lw > 1) {
        ctx.lineWidth = 15;
    }
    else if (lw < 0.1) {
        ctx.lineWidth = 15;
    }
    else {
        ctx.lineWidth =  15;
    }

    //set alpha opacity limits
    if (roundedVel > 1) {
        ctx.strokeStyle = color;
    }
    else if (roundedVel < 0.3) {
        ctx.strokeStyle = color;
    }
    else {
        ctx.strokeStyle = color;
    }

    ctx.lineTo(x, y );
    ctx.stroke();
    ctx.closePath();

    startX = x;
    startY = y ;

}

function endDraw(x,y) {

    if(pickerEnabled) {
        //return to our canvas drawing and hide the colour picker
        ctx.putImageData(originalImageData, 0, 0);
        strokePickerEnabled = false;
        fillPickerEnabled = false;
        pickerEnabled = false;
    }
}



function startCanvas(){

    canvas = document.getElementById("front");
    canvas_2 = document.getElementById("paint");
    ctx = canvas_2.getContext('2d');
   
    canvas.addEventListener('touchstart', onTouchStart, false);
    canvas.addEventListener('mousedown', onMouseDown, false);

    // $('#button').detach();
    // $('#text-1').detach();

    // $('#layer').css('background-image', ' url(img/mascara_praia.png)');
    // $('#palheta').css('display', 'block');
    // $('#back').css('background-image', ' url(img/praia-ok.jpg)');

    // setTimeout('propaganda', 10000);

    color = "rgba(255,242,0,1)";

    // $("#cor1").click(function(){
    //     color = PALLET[0]
    // });
    // $("#cor2").click(function(){
    //     color = PALLET[1]
    // });
    // $("#cor3").click(function(){
    //     color = PALLET[2]
    // });
    // $("#cor4").click(function(){
    //     color = PALLET[3]
    // });
    // $("#cor5").click(function(){
    //     color = PALLET[4]
    // });
    // $("#cor6").click(function(){
    //     color = PALLET[5]
    // });
    // $("#cor7").click(function(){
    //     color = PALLET[6]
    // });
    // $("#cor8").click(function(){
    //     color = PALLET[7]
    // });
    // $("#cor9").click(function(){
    //     color = PALLET[8]
    // });

    // $('#layer').css('height', '687px');
    // $('#layer').attr('height', '687');

    // $("#txt1").hide().css('opacity', '0');
    // $("#txt2").hide().css('opacity', '0');
    // $("#txt3").hide().css('opacity', '0');
    // $("#txt4").hide().css('opacity', '0');

    
    
    // $('#troca1').click(function(){

    //     if(atual == 'campo'){
    //         $('#layer').css('background-image', ' url(img/mascara_praia.png)');
    //         $('#back').css('background-image', ' url(img/praia-ok.jpg)');
    //         $('#palheta').css('background-image', 'url(img/img_palheta.png)');

    //         atual = 'praia';
    //     }
    //     ctx.clearRect(0,0,2000,2000);
    // });

    // $('#troca2').click(function(){

    //     if(atual == 'praia'){
    //         $('#layer').css('background-image', ' url(img/mascara_campo.png)');
    //         $('#back').css('background-image', ' url(img/parque.jpg)');
    //         $('#palheta').css('background-image', 'url(img/img_palheta2.png)');
    //         atual = 'campo';
    //     }
    //     ctx.clearRect(0,0,2000,2000);
    // });
    
}

function clearCanvas() {
    pickerEnabled = false;
    originalImageData = ctx.getImageData(0, 0, window.innerWidth, (window.innerHeight));
    ctx.putImageData(originalImageData, 0, 0);
}


// function botao(a){
//     if(a == 0){
//         $('#button').css('background-image', 'url(img/bt_toque2.png)');
//         setTimeout(botao, 1000, 1)
//     }else{
//         $('#button').css('background-image', 'url(img/bt_toque.png)');
//         setTimeout(botao, 1000, 0)
//     }    
// }
