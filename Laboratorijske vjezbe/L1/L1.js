//Zadatak 2
function drawGridLine(ctx, m, n) {
    let dx = ctx.canvas.width / (n+1);
    let dy = ctx.canvas.height / (m+1);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    for(let i = 0; i < m; i++){
        for(let j = 0; j < n; j++){
            let x = j*dx;
            let y = i*dy;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x+1,y);
            ctx.stroke();
        }
    }
}

function drawGridRect(ctx, m, n) {
    let dx = ctx.canvas.width / (n+1);
    let dy = ctx.canvas.height / (m+1);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    for(let i = 0; i < m; i++){
        for(let j = 0; j < n; j++){
            let x = j*dx;
            let y = i*dy;
            ctx.rect(x,y,1,0);
            ctx.stroke();
        }
    }
}

function drawGridCircle(ctx, m, n) {
    let dx = ctx.canvas.width / (n+1);
    let dy = ctx.canvas.height / (m+1);
    ctx.strokeStyle = 'red';
    ctx.fillStyle = 'red';
    ctx.lineWidth = 1;
    for(let i = 0; i < m; i++){
        for(let j = 0; j < n; j++){
            let x = j*dx;
            let y = i*dy;
            ctx.beginPath(); 
            ctx.arc(x, y, 1, 0, 2*Math.PI);
            ctx.fill();
        }
    }
}

//Zadatak 3
function drawLine(ctx, x0, y0, x1, y1, color) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = color;
    ctx.stroke();
}
function drawSquare(ctx, x, y, d) {
    drawLine(ctx, x,y,x+d,y,"red");
    drawLine(ctx, x,y,x,y+d,"blue");
    drawLine(ctx, x+d,y,x+d,y+d,"green");
    drawLine(ctx, x,y+d,x+d,y+d,"yellow");
}

//Zadatak 4
function drawTriangle(ctx,x0,y0,x1,y1,x2,y2,color){
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1,y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x0,y0);
    ctx.closePath();

    ctx.fillStyle = color; 
    ctx.fill();          
    ctx.stroke();
}
function drawQuad(ctx,x,y,d){
    drawTriangle(ctx,x,y,x,y+d,x+d,y+d,"red");
    drawTriangle(ctx,x,y,x+d,y,x+d,y+d,"blue");
}

//Zadatak 5
function TriangleStrip(ctx, m, n){
    drawGridCircle(ctx,m,n);
    let dx = ctx.canvas.width / (n+1);
    let dy = ctx.canvas.height / (m+1);
    for(let i = 0; i < m-1; i++){
        for(let j = 0; j < n - 1; j++){
            drawTriangle(ctx, j*dx, i*dy, j*dx,i*dy+dy,j*dx+dx,i*dy+dy,"green");
            drawTriangle(ctx, j*dx+dx, i*dy, j*dx+dx,i*dy+dy,j*dx,i*dy,"yellow");
        }
    }
}

//Zadatak 6
function TriangleFan(ctx, x, y, n) {
    let r = 100;
    let angleStep = 2 * Math.PI / n;
    let colors = ["red", "lightgray"];

    for (let i = 0; i < n; i++) {
        let angle1 = i * angleStep;
        let angle2 = (i + 1) * angleStep;

        let x1 = x + r * Math.cos(angle1);
        let y1 = y + r * Math.sin(angle1);

        let x2 = x + r * Math.cos(angle2);
        let y2 = y + r * Math.sin(angle2);

        drawTriangle(ctx,x,y,x1,y1,x2,y2, colors[i%2]);
    }
}