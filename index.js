
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
let y = 400;
let r = 50;



// view.moveTo(0, 0);
// view.lineTo(100, 100);

// view.fillRect(10, 10, 20, 20);
let ax = 0;
let ay = 0.01;
let dx = 0;
let dy = 0;
function animate() {
    view.clearRect(0, 0, canvas.width, canvas.height);
    dx += ax;
    dy += ay;
    x += dx;
    y += dy;
    checkBounce();
    view.beginPath();
    view.arc(x, y, r, 0, Math.PI * 2);
    view.fill();
    requestAnimationFrame(animate);
}

function checkBounce() {
    if (y + r >= canvas.height) {
        y = canvas.height - r;
        dy *= -0.9;
    }
}

animate();