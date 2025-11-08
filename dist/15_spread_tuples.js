// speard tuples
function smallNumber(...xs) {
    return xs.reduce((s, n) => s + n, 0);
}
console.log(smallNumber(1, 2, 3, 4, 5, 6));
//tuple rest
function makeRange(...args) {
    const [start, end, step = 1] = args;
    const out = [];
    for (let i = start; i <= end; i += step) {
        out.push(i);
    }
    return out;
}
console.log(makeRange(1, 10));
console.log(makeRange(1, 10, 2));
function draw(x, y) {
    console.log(`X: ${x}, Y: ${y}`);
}
const point = [10, 20];
draw(...point);
export {};
