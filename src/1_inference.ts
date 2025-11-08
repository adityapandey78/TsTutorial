// Goal-> understand when to let Ts infer types
// Ts know Js very well so automtically infer the type 

//e.g
let count=0; // Ts sees as number
let site="adityapandey" // Ts sees it as string
const scores=[10,20,30,40] // Ts know its num arr

// so over annotation is not now bad but it just creates too much noise

export function add(a:number,b:number):number{
    return a+b;
}
//it a good practice to annotate the funn argument types
console.log(add(5,7));

let ans:string|number;// we want to define both
ans=Math.random()>0.5?"test":0.6; // here therr wont be any type error