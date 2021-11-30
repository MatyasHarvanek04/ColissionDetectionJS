var ctx;
var Rectangles = [];
var _point;
var defaultLineWidth;
var MouseX = 0;
var MouseY = 0;
var PreviousMouseX = 0;
var PreviousMouseY = 0;


function Init()
{
    canvas = (document.getElementById('xan'));
    ctx = canvas.getContext('2d');
    defaultLineWidth = ctx.lineWidth;
    canvas.height = window.visualViewport.height;
    canvas.width = window.visualViewport.width;
    ctx.fillStyle = "#1b1b1b";
    ctx.fillRect(0,0, canvas.width, canvas.height);
    Rectangles.push(new Rectangle(500,100,500,500));
    Rectangles.push(new Rectangle(100,100,100,150));
    Rectangles.push(new Rectangle(100,800,120,300));
    Rectangles.push(new Rectangle(1500,500,200,400));
    _point = new Point();
}



setInterval(Update, 1);


function MouseMove(e)
{
    MouseX = e.x;
    MouseY = e.y;
}


function Update()
{
    _point.x = MouseX;
    _point.y = MouseY;
    
    ctx.fillStyle = "#1b1b1b";
    ctx.fillRect(0,0, canvas.width, canvas.height);
    
    for (let i = 0; i < Rectangles.length; i++) 
    {
        Rectangles[i].Update();
    }   
    var AnyArmodred = false;
    for (let i = 0; i < Rectangles.length; i++) 
    {
        if (Rectangles[i].Armored) 
        {
            AnyArmodred = true;
        }
    }   
    if (!AnyArmodred) 
    {
        PreviousMouseX = MouseX;
        PreviousMouseY = MouseY;
    }
    _point.Render();

}

class Rectangle
{
    constructor(x, y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.Xmin = this.x;
        this.Xmax = this.x + this.width;
        this.Ymin = this.y;
        this.Ymax = this.y + this.width;
    }

    


    Update()
    {

        if (MouseX > this.Xmin && MouseX < this.Xmax &&
            MouseY > this.Ymin && MouseY < this.Ymax) 
        {
            ctx.strokeStyle = "#f3080a";
            this.Armored = true;
            if (PreviousMouseX >= this.Xmax) 
            {
                _point.x = this.Xmax;
            }
            if (PreviousMouseX <= this.Xmin) 
            {
                _point.x = this.Xmin;
            }
            if (PreviousMouseY >= this.Ymax) 
            {
                _point.y = this.Ymax;
            }
            if (PreviousMouseY <= this.Ymin) 
            {
                _point.y = this.Ymin;
            }
        }
        else
        {
            ctx.strokeStyle = "#000000";
            this.Armored = false;
            console.log("X: " + PreviousMouseX + " Y: " + PreviousMouseY);
        }
        
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.Ymax);
        ctx.lineTo(this.Xmax, this.Ymax);
        ctx.lineTo(this.Xmax, this.y);
        ctx.lineTo(this.x -2.5,this.y);
        ctx.stroke();
    }
}

class Point
{
    Render()
    {
        ctx.beginPath();
        ctx.arc(this.x , this.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = " #FFFFFF";
        ctx.fill();
    }
}
