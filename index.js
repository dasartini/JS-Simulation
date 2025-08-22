
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let x = 100;
let y = 100;

const view = canvas.getContext("2d");
view.fillStyle = "white";
view.strokeStyle = "white";

// view.moveTo(0, 0);
// view.lineTo(100, 100);

// view.fillRect(10, 10, 20, 20);

let dx = 2;
function animate() {
    view.clearRect(0, 0, canvas.width, canvas.height);
    x += dx;
    view.beginPath();
    view.arc(x, y, 50, 0, Math.PI * 2);
    view.fill();
    requestAnimationFrame(animate);
}

animate();