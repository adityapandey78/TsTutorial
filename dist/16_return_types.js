//Return Types
//inference type
const doubleFunc = (n) => n * 2;
// Explicit return for exported/ppublic function
export function toTitle(s) {
    return `Hello ${s.toUpperCase()}`;
}
function booleanToNumber(B) {
    return B ? 1 : 0;
}
///takes the boolean but return the number
console.log(booleanToNumber(true));
console.log(booleanToNumber(false));
