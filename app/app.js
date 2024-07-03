const canv = document.getElementById('canvasPlus');
const ct2 = canv.getContext('2d');

canv.width = window.innerWidth;
canv.height = window.innerHeight;

const canv2 = document.getElementById('canvasBPlus');
const ct2b = canv2.getContext('2d');
canv2.width = window.innerWidth;
canv2.height = window.innerHeight;

let linear = ct2.createLinearGradient(0, 0, canv.width, canv.height);
linear.addColorStop(0, 'green');
linear.addColorStop(0.3, 'green');
linear.addColorStop(1, 'red');

// linear.addColorStop(0, 'red');
// linear.addColorStop(0.2, 'yellow');
// linear.addColorStop(0.4, 'green');
// linear.addColorStop(0.6, 'cyan');
// linear.addColorStop(0.8, 'blue');
// linear.addColorStop(1, 'magenta');

class Letters {
    constructor(x,y,fontSize,canvasHeight) {
        this.charac = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトホノモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = '';
        this.canvasHeight = canvasHeight;
    }
    draw(context, context2) {
        this.text = this.charac.charAt(Math.floor(Math.random()*this.charac.length));
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        context2.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);

        context.fillStyle = 'black';
        context.fillRect((this.x * this.fontSize) - this.fontSize / 2, (this.y * this.fontSize) - this.fontSize / 2 - 750, this.fontSize, this.fontSize);
        context.fillStyle = linear;
        
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.97) {
            this.y = 0;
        } else {
            this.y += 0.92;
        }
    }
}
class Effects {
    constructor(canvasWidth,canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 18;
        this.columns = this.canvasWidth/this.fontSize;
        this.letters = [];
        this.#initialize();
        console.log(this.letters);
    }
    #initialize() {
       for (let i=0; i<this.columns; i++) {
            this.letters[i] = new Letters(i,this.canvasHeight/Math.random(),this.fontSize,this.canvasHeight);
       } 
    }
    resize(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbol = [];
        this.#initialize();
    }
}

const effect = new Effects(canv.width, canv.height);
let pastTime = 0;
const fps = 25;
const nextFr = 1000/fps;
let timer = 0; 

function animate(timeStamp) {
    const dTime = timeStamp - pastTime;
    pastTime = timeStamp;
    if (timer > nextFr) {
        ct2.fillStyle = 'rgba(0,0,0,0.065)';
        ct2.textAlign = 'center';
        ct2.fillRect(0,0,canv.width,canv.height);
        ct2.fillStyle = linear;
        ct2.font = effect.fontSize + 'px monospace';
        ct2b.textAlign = "center";
        ct2b.clearRect(0, 0, canv.width, canv.height);
        ct2b.font = effect.fontSize + 'px monospace';
        ct2b.fillStyle = 'white';

        effect.letters.forEach(symbol => symbol.draw(ct2, ct2b));
        timer = 0;
    } else {
        timer += dTime;
    }
    requestAnimationFrame(animate);
}
animate(0);

window.addEventListener('resize', function() {
    canv.width = window.innerWidth;
    canv.height = window.innerHeight;
    canv2.width = window.innerWidth;
    canv2.height = window.innerHeight;
    effect.resize(canv.width, canv.height);
});