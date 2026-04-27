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
function isPointInsideTriangle(P, A, B, C) {
    function area(p1, p2, p3) {
        return Math.abs((p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y)) / 2.0);
    }
    const A_ABC = area(A, B, C);
    const A_PAB = area(P, A, B);
    const A_PBC = area(P, B, C);
    const A_PCA = area(P, C, A);

    return Math.abs(A_ABC - (A_PAB + A_PBC + A_PCA)) < 1e-9;
}
function ConvexHull_BruteForce_VeryBad() {
    const n = nizTacaka.length;
    let hullPoints = [];

    for (let p = 0; p < n; p++) {
        let isOutsideAllTriangles = true;

        for (let i = 0; i < n; i++) {
            if (i === p) continue;
            for (let j = i + 1; j < n; j++) {
                if (j === p) continue;
                for (let k = j + 1; k < n; k++) {
                    if (k === p) continue;

                    if (isPointInsideTriangle(nizTacaka[p], nizTacaka[i], nizTacaka[j], nizTacaka[k])) {
                        isOutsideAllTriangles = false;
                        break; 
                    }
                }
                if (!isOutsideAllTriangles) break;
            }
            if (!isOutsideAllTriangles) break;
        }

        if (isOutsideAllTriangles) {
            hullPoints.push(nizTacaka[p]);
        }
    }
    return makeSimplePolygon(hullPoints);
}
function makeSimplePolygon(points) {
    if (points.length === 0) return [];
    
    let cx = points.reduce((acc, p) => acc + p.x, 0) / points.length;
    let cy = points.reduce((acc, p) => acc + p.y, 0) / points.length;

    return points.sort((a, b) => {
        return Math.atan2(a.y - cy, a.x - cx) - Math.atan2(b.y - cy, b.x - cx);
    });
}
function drawConvexHull1(ctx) {
    const t0 = performance.now();
    const points = ConvexHull_BruteForce_VeryBad();
    const t1 = performance.now();
    const vrijemeIzracuna = (t1 - t0).toFixed(4);
    document.getElementById("vrijeme").innerText = "Algoritam završen za: " + vrijemeIzracuna + " ms";
    document.getElementById("brojTacaka").innerText = "Broj tacaka: "+nizTacaka.length;

    if (points.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }

    ctx.closePath(); 
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.stroke();
}

function getCrossProduct(A, B, P) {
    return (B.x - A.x) * (P.y - A.y) - (B.y - A.y) * (P.x - A.x);
}

function ConvexHull_BruteForce_Classic() {
    const n = nizTacaka.length;
    if (n < 3) return nizTacaka;

    const onHull = new Array(n).fill(false);

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            
            let pos = 0;
            let neg = 0; 
            for (let k = 0; k < n; k++) {
                if (k === i || k === j) continue;

                const val = getCrossProduct(nizTacaka[i], nizTacaka[j], nizTacaka[k]);
                
                if (val > 0) pos++;
                if (val < 0) neg++;
            }

            if (pos === 0 || neg === 0) {
                onHull[i] = true;
                onHull[j] = true;
            }
        }
    }
    const hullPoints = nizTacaka.filter((_, idx) => onHull[idx]);
    return makeSimplePolygon(hullPoints);
}
function drawConvexHull2(ctx) {
    const t0 = performance.now();
    const points = ConvexHull_BruteForce_Classic();
    const t1 = performance.now();
    const vrijemeIzracuna = (t1 - t0).toFixed(4);
    document.getElementById("vrijeme").innerText = "Algoritam završen za: " + vrijemeIzracuna + " ms";
    document.getElementById("brojTacaka").innerText = "Broj tacaka: "+nizTacaka.length;

    if (points.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }

    ctx.closePath(); 
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.stroke();
}
