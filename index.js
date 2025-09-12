
const canvas = document.querySelector('canvas');
const view = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    view.fillStyle = "white";
    view.strokeStyle = "white";
}

class Body {
    constructor(x, y, r = 10){
        this.x = x
        this.y = y
        this.radius = r
        this.dx = Math.random() * 4 - 2
        this.dy = Math.random() * 4 - 2
    }
    update(){
        this.x += this.dx
        this.y += this.dy
        this.checkBounce()
    }
    draw(){
        view.beginPath();
        view.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        view.fill();
    }
    checkBounce(){
        if (this.y + this.radius >= canvas.height){
            this.y = canvas.height - this.radius;
            this.dy *= -1;
        }
        if (this.x + this.radius >= canvas.width){
            this.x = canvas.width - this.radius;
            this.dx *= -1;
        };
        if (this.y - this.radius < 0){
            this.y =  this.radius;
            this.dy *= -1;
        };
        if (this.x - this.radius < 0){
            this.x = this.radius;
            this.dx *= -1;
        };
    }
}

const bodies = []
for (let i = 0; i <= 100; i++){
    bodies.push(new Body(400, 400, Math.random() * 20 + 5))
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
    // x += dx;
    // y += dy;
    // checkBounce();
    // checkWrap();
    // view.beginPath();
    // view.arc(x, y, r, 0, Math.PI * 2);
    // view.fill();

    for(const b of bodies) b.update();
    for(const b of bodies) b.draw();

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
    if (y - r >= canvas.height){
        y = -r;
    }
    else if (x - r >= canvas.width){
        x = -r;
    }
    else if (y + r <= 0 ){
        y = canvas.height + r
    }
    else if (x + r <= 0 ){
        x = canvas.width + r
    }
}
animate();


