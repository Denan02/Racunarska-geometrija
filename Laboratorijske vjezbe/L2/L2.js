nizTacaka = [];
nizDuzi = [];
function OnClick(ctx, x, y){
    ctx.beginPath(); 
    ctx.arc(x, y, 2, 0, 2*Math.PI);
    ctx.fill();
    nizTacaka.push({ x, y });
}

function drawLine(ctx, x0, y0, x1, y1, color) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = color;
    ctx.stroke();
}

function ucitajTacke(ctx,tekst) {
    const linije = tekst.split("\n");

    linije.forEach(linija => {
        const [x, y] = linija.split(",").map(Number);

        if (!isNaN(x) && !isNaN(y)) {
            OnClick(ctx, x, y);
        }
    });
}
function ucitajDuzi(ctx, tekst) {
    const linije = tekst.split("\n");

    linije.forEach(linija => {
        const [x1, y1, x2, y2] = linija.split(",").map(Number);

        if (![x1, y1, x2, y2].some(isNaN)) {
            nizDuzi.push({
                p1: { x: x1, y: y1 },
                p2: { x: x2, y: y2 }
            });
            drawLine(ctx, x1,y1,x2,y2,"red");
        }
    });
}
function obradiFajl(ctx, tekst) {
    const prvaLinija = tekst.split("\n")[0];
    const brojVrijednosti = prvaLinija.split(",").length;

    if (brojVrijednosti === 2) {
        ucitajTacke(ctx,tekst);
    } else if (ctx, brojVrijednosti === 4) {
        ucitajDuzi(ctx,tekst);
    } else {
        console.log("Nepoznat format");
    }
}
