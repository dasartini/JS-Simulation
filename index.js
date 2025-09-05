
const canvas = document.querySelector('canvas');
const view = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    view.fillStyle = "white";
    view.strokeStyle = "white";
}

resize();
addEventListener("resize", resize);
let x = 400;
let y = 200;
let r = 50;



// view.moveTo(0, 0);
// view.lineTo(100, 100);

// view.fillRect(10, 10, 20, 20);
let ax = 0.01;
let ay = 0.09;
let dx = -2;
let dy = -2;
function animate() {
    view.clearRect(0, 0, canvas.width, canvas.height);
    // dx += ax;
    // dy += ay;
    x += dx;
    y += dy;
    // checkBounce();
    checkWrap();
    view.beginPath();
    view.arc(x, y, r, 0, Math.PI * 2);
    view.fill();
    requestAnimationFrame(animate);
}

function checkBounce() {
    if (y + r >= canvas.height){
        y = canvas.height - r;
     dy *= -1;
    }
    if (x + r >= canvas.width){
        x = canvas.width - r;
        dx *= -1;
    };
        if (y - r < 0){
        y =  r;
     dy *= -1;
    };
    if (x - r < 0){
        x = r;
        dx *= -1;
    };

}


function checkWrap(){
    if ( y - r >= canvas.height){
        y = -r;
    }
    else
      if ( x - r >= canvas.width){
        x = -r;
    }
    else
    if (y + r <= 0 ){
        y = canvas.height + r
    }
    else
        if (x + r <= 0 ){
        x = canvas.width + r
    }


}
animate();
