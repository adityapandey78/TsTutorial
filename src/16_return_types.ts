//Return Types
//inference type

const doubleFunc=(n:number)=>n*2;

// Explicit return for exported/ppublic function
export function toTitle(s:string):string{
    return `Hello ${s.toUpperCase()}`;
}

 function booleanToNumber(B:boolean):number{
    return B?1:0;
}
///takes the boolean but return the number
console.log(booleanToNumber(true));
console.log(booleanToNumber(false))

;