const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const btnAccept = document.getElementById('btn1');
const btnReject = document.getElementById('btn2');
const btnContainer = document.querySelector('.btnContainer')

window.addEventListener('resize',function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let boySpeed = 1;
let rotation = 1;
let hue = 0;
let alpha1 = 1;

let song = new Audio();
song.src = "https://mobcup.net/d/xgtyw1vt/mp3";

let accept = false;
btnAccept.addEventListener('click',(e)=>{
    accept =  true;
    reject=false;
})

let reject = false;
btnReject.addEventListener('click',(e)=>{
    reject =  true;
    accept = false;
})


class Boy{
    constructor(){
        this.x = canvas.width*0.15;
        this.y = canvas.height*0.84;
        this.legSize = canvas.height*0.1
        this.legRot = 0;
        this.rotDir = 1;
        this.leg = [1,-1];
        this.bodyRad = canvas.height*0.07;
        this.flowHand = 0;
        this.rotationAfterStop = 0;
        this.rotationAfterReject = 0
    }
    draw(){
        //face
        
        ctx.beginPath();
        ctx.fillStyle = 'rgb(226, 185, 173)';
        ctx.arc(this.x,this.y-this.bodyRad*2,this.bodyRad*0.45,0,Math.PI*2);   
        ctx.fill(); 
        ctx.closePath();


        //hair
        ctx.beginPath();
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 5
        ctx.arc(this.x,this.y-this.bodyRad*2,this.bodyRad*0.45,Math.PI/1.5,-Math.PI/3.5);   
        ctx.stroke(); 
        ctx.closePath();
        //mouth

        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1
        ctx.arc(this.x+this.bodyRad*0.25,this.y-this.bodyRad*1.9,this.bodyRad*0.1,Math.PI*0.1,Math.PI*0.8);   
        ctx.stroke()
        ctx.closePath();

        //eye

        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.arc(this.x+this.bodyRad*0.35,this.y-this.bodyRad*2.1,this.bodyRad*0.05,0,Math.PI*2);   
        ctx.fill(); 
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.arc(this.x+this.bodyRad*0.13,this.y-this.bodyRad*2.1,this.bodyRad*0.05,0,Math.PI*2);   
        ctx.fill(); 
        ctx.closePath();

        //hand
           
        ctx.save();
        ctx.fillStyle = 'rgb(226, 185, 173)';
        ctx.translate(this.x,this.y-this.bodyRad*1.4);
        ctx.rotate(this.legRot*1.2);
        ctx.beginPath();
        ctx.fillRect(-this.legSize*0.1*0.5,0,this.legSize*0.07,this.legSize);
        ctx.fill(); 
        ctx.restore();
        ctx.closePath();
       
        //leg

        this.leg.forEach(value => {
               
            ctx.save();
            ctx.fillStyle = 'rgb(150,155,222)'
            ctx.translate(this.x,this.y);
            ctx.rotate(this.legRot*value);
            ctx.beginPath();
            ctx.fillRect(-this.legSize*0.1*0.5,0,this.legSize*0.07,this.legSize);
            ctx.fill(); 
            
            ctx.restore();
            ctx.closePath();
        });
        
        //body

        ctx.beginPath();
        ctx.fillStyle = 'rgb(180,155,222)';
        ctx.ellipse(this.x,this.y-this.bodyRad*0.6,this.bodyRad*0.25,this.bodyRad,0,0,Math.PI*2);
       
        ctx.fill(); 
        ctx.closePath();

          //hand width flower 
           
          ctx.save();
          ctx.fillStyle = 'rgb(226, 185, 173)';  
          ctx.translate(this.x,this.y-this.bodyRad*1.4);
          ctx.rotate(-this.flowHand+this.rotationAfterStop + this.rotationAfterReject);
          ctx.beginPath();
          ctx.fillRect(-this.legSize*0.1*0.5,0,this.legSize*0.07,this.legSize*0.9);
          ctx.fillStyle = 'rgb(2, 185, 3)';
          ctx.fillRect(-this.legSize*0.2,this.legSize*0.9,this.legSize*0.5,this.legSize*0.02);
          ctx.fillStyle = 'red';
          ctx.arc(this.legSize*0.3,this.legSize*0.95,this.bodyRad*0.1,0,Math.PI*2);   
          ctx.fill(); 
          ctx.restore();
          ctx.closePath();
         
    }
    update(){
        this.x += 0.09*boySpeed
        this.legRot += 0.01*this.rotDir*rotation;
        this.flowHand = this.legRot;
        if (this.legRot > Math.PI/8 || this.legRot < -Math.PI/8) {
            this.rotDir *= -1;
        }
        if (girl.x < canvas.width*0.625) {
            boySpeed = 0
            rotation = 0
            this.legRot = 0.1
            girl.legRot = 0.1
            if (!reject) {
                this.rotationAfterStop -= 0.01;
            
            if (this.rotationAfterStop < -Math.PI/2.2) {
                this.rotationAfterStop = -Math.PI/2.2;
                btnContainer.style.display = 'flex';
                if (accept) {
                    alpha1 = 0.1;
                    handelHeartInit();
                    handelheart();
                    girl.rotationAfterPropasl += 0.01;
                    if ( girl.rotationAfterPropasl > Math.PI/2.2) {
                        girl.rotationAfterPropasl = Math.PI/2.2;
                      
                         }             
                    }
                 }
             }
            if (reject){
                alpha1 = 1;
                this.rotationAfterStop += 0.01;
                if ( this.rotationAfterStop > 0) {
                     this.rotationAfterStop = 0;
                } 

                girl.rotationAfterPropasl -= 0.01;
                if ( girl.rotationAfterPropasl < 0) {
                    girl.rotationAfterPropasl = 0;
                             
                }

            }
            
            
        }
    }
}

class SadFace{
    constructor(){
        this.x = Math.random()*canvas.width;
        this.y = canvas.height-Math.random()*100;
        this.size = Math.random()*20+10
    }
    draw(){
              //face
        
        ctx.beginPath();
        ctx.fillStyle = 'rgb(226, 185, 173)';
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);   
        ctx.fill(); 
        ctx.closePath();

        //mouth

        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1
        ctx.arc(this.x,this.y+this.size*0.8,this.size*0.4,Math.PI*1.1,-Math.PI/10);   
        ctx.stroke()
        ctx.closePath();

        //eye

        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.arc(this.x-this.size*0.4,this.y,this.size*0.1,0,Math.PI*2);
       

        ctx.fill(); 
        ctx.closePath();

        
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.arc(this.x+this.size*0.4,this.y,this.size*0.1,0,Math.PI*2);
        ctx.fill()
        ctx.closePath()
    }
    update(){
        if (this.size>20) {
            this.y -= 0.8
        }else if(this.size>15){
            this.y -= 0.6
        }else if(this.size>10){
            this.y -= 0.4
        }else{
            this.y -= 0.3
        }
    }
}

let sadFace = [];
for (let i = 0; i < 25; i++) {
    sadFace.push(new SadFace())
    
}
function handelSadFace() {
    sadFace.forEach((object,index) => {
        object.draw();
        object.update();
        if (object.y<-object.size) {
            sadFace.splice(index,1);
            sadFace.push(new SadFace());
        }
    });
}


class Girl{
    constructor(){
        this.x = canvas.width*0.9;
        this.y = canvas.height*0.84;
        this.legSize = canvas.height*0.095
        this.legRot = 0;
        this.rotDir = 1;
        this.leg = [1,-1];
        this.bodyRad = canvas.height*0.06;
        this.flowHand = 0;
        this.rotationAfterPropasl = 0
    }
    draw(){
        //face
        
        ctx.beginPath();
        ctx.fillStyle = 'rgb(226, 185, 173)';
        ctx.arc(this.x,this.y-this.bodyRad*2,this.bodyRad*0.45,0,Math.PI*2);   
        ctx.fill(); 
        ctx.closePath();

           //hair
           ctx.beginPath();
           ctx.strokeStyle = 'rgb(155,123,15)';
           ctx.lineWidth = 5
           ctx.arc(this.x,this.y-this.bodyRad*1.92,this.bodyRad*0.48,-Math.PI/1.5,Math.PI/2.5);
        
           ctx.stroke(); 
           ctx.closePath();


        //mouth

        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1
        ctx.arc(this.x-this.bodyRad*0.25,this.y-this.bodyRad*1.9,this.bodyRad*0.09,Math.PI*0.1,Math.PI*0.8);   
        ctx.stroke()
        ctx.closePath();

        //eye

        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.arc(this.x-this.bodyRad*0.35,this.y-this.bodyRad*2.1,this.bodyRad*0.05,0,Math.PI*2);   
        ctx.fill(); 
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.arc(this.x-this.bodyRad*0.13,this.y-this.bodyRad*2.1,this.bodyRad*0.05,0,Math.PI*2);   
        ctx.fill(); 
        ctx.closePath();

        //hand
           
        ctx.save();
        ctx.fillStyle = 'rgb(226, 185, 173)';
        ctx.translate(this.x,this.y-this.bodyRad*1.4);
        ctx.rotate(this.legRot*1.2+this.rotationAfterPropasl);
        ctx.beginPath();
        ctx.fillRect(-this.legSize*0.1*0.5,0,this.legSize*0.07,this.legSize * 0.8);
        ctx.fill(); 
        ctx.restore();
        ctx.closePath();
    
        //leg

        this.leg.forEach(value => {
               
            ctx.save();
            ctx.fillStyle = 'rgb(226, 185, 173)';
            ctx.translate(this.x,this.y);
            ctx.rotate(this.legRot*value);
            ctx.beginPath();
            ctx.fillRect(-this.legSize*0.1*0.5,0,this.legSize*0.07,this.legSize);
            ctx.fill(); 
            
            ctx.restore();
            ctx.closePath();
        });
        
        //body

        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.ellipse(this.x,this.y-this.bodyRad*0.6,this.bodyRad*0.25,this.bodyRad,0,0,Math.PI*2);
       
        ctx.fill(); 
        ctx.closePath();

          //hand width flower 

            
          ctx.save();
          ctx.fillStyle = 'rgb(226, 185, 173)';  
          ctx.translate(this.x,this.y-this.bodyRad*1.4);
          ctx.rotate(-this.flowHand);
          ctx.beginPath();
          ctx.fillRect(-this.legSize*0.1*0.5,0,this.legSize*0.07,this.legSize  * 0.8); 
          ctx.fill(); 
          ctx.restore();
          ctx.closePath();
         
    }
    update(){
        this.x -= 0.15*boySpeed
        this.legRot -= 0.01*this.rotDir*rotation;
        this.flowHand = this.legRot;
        if (this.legRot > Math.PI/8 || this.legRot < -Math.PI/8) {
            this.rotDir *= -1;
        }
    }
}
let girl = new Girl()


class Nature{
    constructor(x=0,h=0){
        this.x = x;
        this.y = canvas.height*0.88;
        this.speedX = 0.2
        this.h = h;
       
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = 'rgb(97, 104, 109)'
        ctx.fillRect(this.x,this.y,canvas.width,canvas.height*0.15);
        ctx.fill(); 
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = 'gray'; 
        ctx.strokeStyle = 'black';  
        ctx.lineWidth = 1 
        ctx.fillRect(this.x,this.y+canvas.height*0.1,canvas.width,canvas.height*0.05);
        ctx.stroke(); 
        ctx.fill()
        ctx.closePath();
       
    }
    bulding(){
        ctx.beginPath();
        ctx.fillStyle = 'rgb(157, 104, 109)'
        ctx.fillRect(this.x,this.y,canvas.width*0.1,-canvas.height*0.15+this.h);
        ctx.fill(); 
        ctx.closePath();
    }
    update(){
        this.x -= this.speedX*boySpeed;
    }
}
let nature = new Nature()
let bulding1 = [];

for (let i = 0; i < 8; i++) {
    bulding1.push(new Nature(i*54,50))   
}

function handelBulding() {
   for (let i = 0; i < bulding1.length; i++) {
    bulding1[i].bulding()
    bulding1[i].update()
    if (bulding1[i].x < -canvas.width*0.1) {
        bulding1[i].x = canvas.width 
    }
       
   } 
}

let boy = new Boy();

function handelBoy() {
    boy.draw();
    boy.update();
    girl.draw();
    girl.update();
}


class Circle {
    constructor(x1, y1) {
        this.x = x1;
        this.y = y1;
        this.size = Math.random() * 1 + 0.5;
        this.t = 0;
        this.r = 50;
    }
    draw() {
        ctx.fillStyle = 'white';
        ctx.lineWidth = 0;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    drawMoon(){
        ctx.fillStyle = 'white';
        ctx.lineWidth = 0;
        ctx.beginPath();
        ctx.arc(this.x, this.y, canvas.width*0.08, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}
let cir = [];
let moon = new Circle(canvas.width*0.5,canvas.height*0.15)
function Cir() {
    for (let i = 0; i < 56; i++) {
        cir.push(new Circle(Math.random() * canvas.width, Math.random() * canvas.height));
    }
}
Cir();
function handlecircle() {
    for (let i = 0; i < cir.length; i++) {
        cir[i].draw();
    }
    moon.drawMoon()
}



let butX1 = [];
let butY1 = [];

function butterData() {
    for (let a = -Math.PI/2; a <= Math.PI/2; a += 0.1) {
            butX1.push(Math.sin(a)*Math.sin(2*a));
            butY1.push(Math.cos(a)*Math.sin(2*a));    
    }
}
butterData();


class Butterfly{
    constructor(x1,y1,vel){
        this.x = x1;
        this.y = y1
        this.size = Math.random()*1;
        this.t = 0;
        this.height = this.size*0.7;
        this.hue = Math.random()*255;

        this.color = 'hsl('+hue+',100%,50%)';
        this.speed = Math.random()*1.1+0.3;
        this.flap = Math.random()*0.05+0.01

        this.vel = vel;
        this.gravity = -0.01;
        this.color = 'hsl(' + hue * 2 + ',100%,60%)';
        this.alpha = 6;
        this.friction = 0.99;

    }
    draw(){
       
        ctx.fillStyle = 'black'
        ctx.strokeStyle = 'gray'
        ctx.beginPath();
        ctx.shadowBlur = 0;
        ctx.arc(this.x+2,this.y-this.height,1,0,Math.PI*2);
        ctx.arc(this.x-2,this.y-this.height,1,0,Math.PI*2);
        ctx.closePath();
        ctx.fill()
        ctx.beginPath();
        ctx.shadowBlur = 0;
        ctx.moveTo(this.x+2,this.y-this.height);
        ctx.lineTo(this.x+2,this.y+this.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.shadowBlur = 0;
        ctx.moveTo(this.x-2,this.y-this.height);
        ctx.lineTo(this.x-2,this.y+this.height);
        ctx.stroke();  
        let rad = this.size;
        
        ctx.beginPath();
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(0,0,0,0.6)';

        ctx.fillStyle = this.color;
        for (let i = 0;i<butX1.length;i++) {
            ctx.fillStyle = this.color;
            let x = this.x+rad*butX1[i]*(Math.abs(Math.sin(this.t))+0.4);
            let y = this.y+rad*butY1[i];    
            ctx.lineTo(x,y);  
        } 
        for (let i = 0;i<butX1.length;i++) {
            let x = this.x-rad*butX1[i]*(Math.abs(Math.sin(this.t))+0.4);
            let y = this.y-rad*butY1[i];    
            ctx.lineTo(x,y); 
        } 
        ctx.fill();  
        ctx.closePath();
        ctx.shadowBlur = 0;
      
    }
    update1(){
        this.draw()
        this.t += this.flap*2;
        this.alpha -= 0.12
        this.x += this.vel.x;
        this.y -= this.vel.y;
        this.size += 0.2
    }
    
    
}

const heartX = [];
const heartY = [];


function HeartData() {
    for (let i = 0; i <= Math.PI * 2; i += 0.1) {
        let m = (16 * Math.sin(i) ** 3);
        heartX.push(m);
        let n = -(13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i));
        heartY.push(n);
    }
}
HeartData();

let count = 0
function handelHeartInit() {
    if (count % 20 == 0) {
        initheart()
    }
    if (count > 1000) {
        count = 0
    } else {
        count++
    }
}

function clear() {
    ctx.fillStyle = `rgba(6, 2, 20,${alpha1})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

let hearts = [];
function initheart() {
    let heartsNum = heartX.length;
    let speed = 0.2;
    for (let i = 0; i < heartsNum; i++) {
        hearts.push(new Butterfly( canvas.width * 0.5, canvas.height * 0.46, {
            x: heartX[i] * speed,
            y: -heartY[i] * speed
        }))
    }
}

function handelheart() {
    hearts.forEach((object, index) => {
        object.update1()
        
        if (object.alpha<0) {
            hearts.splice(index,1)
        }
    });
}

setInterval(()=>{
    clear();
    handlecircle();
    song.play();
    if (reject) {
        handelSadFace()
    }
    handelBulding();
    nature.draw();
    handelBoy();
    hue++
},1000/60)