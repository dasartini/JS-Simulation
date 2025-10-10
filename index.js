
const canvas = document.querySelector('canvas');
const view = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    view.fillStyle = "white";
    view.strokeStyle = "white";
}
class Keyboard{
    static keys = {}
    
    static {
        window.addEventListener("keydown", e => Keyboard.keys[e.code] = true)
        window.addEventListener("keyup", e => Keyboard.keys[e.code] = false)
    }

    static get left(){
        return !!Keyboard.keys.KeyA
    }
    static get right(){
        return !!Keyboard.keys.KeyD
    }
}

class Body {
    constructor(r = 10, x, y){
        this.x = x | Math.random() * canvas.width
        this.y = y | Math.random() * canvas.height
        this.radius = r
        this.dx = Math.random() * 4 - 2
        this.dy = Math.random() * 4 - 2
    }
    update(){
        this.x += this.dx
        this.y += this.dy
        // this.checkBounce()
        this.checkWrap();
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
    checkWrap(){
        if (this.y - this.radius >= canvas.height){
            this.y = -this.radius;
        }
        else if (this.x - this.radius >= canvas.width){
            this.x = -this.radius;
        }
        else if (this.y + this.radius <= 0 ){
            this.y = canvas.height + this.radius
        }
        else if (this.x + this.radius <= 0 ){
            this.x = canvas.width + this.radius
        }
    }
}

class Triangle {
        constructor(x, y, r){
        this.x = x
        this.y = y
        this.radius = r
        this.dx = 0
        this.dy = 0
        this.angle = 0
    }
    draw(){
        const originalX = this.x
        const originalY = this.y - 20
        const frontTip = rotatePoint(originalX, originalY, this.x , this.y, this.angle)
        const secondTip =rotatePoint(originalX, originalY, this.x , this.y, this.angle + 2.5)
        const thirdTip =rotatePoint(originalX, originalY, this.x , this.y, this.angle - 2.5)

        view.beginPath()
        // view.fillRect(frontTip.x, frontTip.y , 5, 5)
        // view.fillRect(secondTip.x ,secondTip.y, 5, 5)
        // view.fillRect(thirdTip.x, thirdTip.y , 5,5 )
        view.moveTo(frontTip.x , frontTip.y)
        view.lineTo(secondTip.x , secondTip.y)
        view.lineTo(this.x , this.y)
        view.lineTo(thirdTip.x , thirdTip.y)
        view.lineTo(frontTip.x, frontTip.y)
        view.closePath()
        view.fill()
        view.beginPath()
        view.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        view.fill()
    }
    update () {
        if (Keyboard.right) this.angle += 0.05
        if (Keyboard.left) this.angle -= 0.05
    }


};
resize();
const triangle = new Triangle(canvas.width/2 , canvas.height/2, 6);


const bodies = []
for (let i = 0; i < 2; i++){
    bodies.push(new Body(40))
}


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
    triangle.update();
    triangle.draw();
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


function rotatePoint(px, py, ox, oy, angleRadians) {
  // Convert angle from degrees to radians
 

  // Translate point to origin
  const translatedX = px - ox;
  const translatedY = py - oy;

  // Apply rotation
  const rotatedX = translatedX * Math.cos(angleRadians) - translatedY * Math.sin(angleRadians);
  const rotatedY = translatedX * Math.sin(angleRadians) + translatedY * Math.cos(angleRadians);

  // Translate back
  const finalX = rotatedX + ox;
  const finalY = rotatedY + oy;

  return { x: finalX, y: finalY };
}