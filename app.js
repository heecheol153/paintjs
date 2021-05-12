// 宣言部
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave"); // syuusei

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

// Variable 宣言部
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

//canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
//canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

// #1. Contextのdefault値の設定

// #1.1 Canvas 白紙に INIT
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

// #1.2 Canvas Stroke color,linewidth INIT
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
//ctx.fillStyle = "green";
//ctx.fillRect(50, 20, 100, 49);
//ctx.fillStyle = "purple";
//ctx.fillRect(80, 100, 100, 49);

// #1.2 painting, filling booleanの宣言
let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    //const rect = event.getBoundingClientRect();
    //const x = event.offsetX;
    //const y = event.offsetY;
    console.log(x, y);
    //console.log(event);
    if (!painting) {
        ctx.beginPath();    // 해당코드 삭제시 이전 좌표경로로 지정됨
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event){
    //    console.log(event.target.style);
        const color = event.target.style.backgroundColor;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
    }
    
    function handleRangeChange(event) {
        const strokeWidth = event.target.value;
        ctx.lineWidth = strokeWidth;
    //    console.log(event.target.value);
    }
    

function handleModeClick(){
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
//a        canvas.style.cursor = "pointer";
    } else {
        filling = true;
        mode.innerText = "Paint";
//a        canvas.style.cursor = "copy";
    }
}

function handleCanvasClick(){
    if(filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    }
}


    // cavas로 돌아왔을때 시작점 위치 변경
function onMouseEnter(event) {
    x = event.offsetX;
    y = event.offsetY;
}


function onMouseDown(event) {
    painting = true;
}

function onMouseUp(event) {
    //painting = false;
    stopPainting();
}

//function onMouseLeave(event){
//    painting = false;
//}

function handleRightClick(event){
    //console.log(event);
    event.preventDefault();
}

function handleSaveClick(){
//    const image = canvas.toDataURL("image/jpeg"); //quality안좋으니 png로
    const image = canvas.toDataURL();   //default : png
    const link = document.createElement("a");
    link.href = image;  //이미지는 href라야 돨것같다.
    link.download = "Your picture[🎨]";
    link.click();
    //console.log(link);
}

// EventListener

// #1. Canvas
if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("mouseenter", onMouseEnter);
    canvas.addEventListener("contextmenu", handleRightClick);
}

// #2. Color-picker
Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
);

// #3. Range input
if (range) {
    range.addEventListener("input", handleRangeChange);
}

// #4. Fill - Paint button Mode
if(mode){
    mode.addEventListener("click", handleModeClick);
}
//console.log(Array.from(colors));

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);

}