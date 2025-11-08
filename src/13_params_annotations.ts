
function func1(a:number,b:number):number{
    return a+b;
}
func1(5,10);
const nums12=[1,2,3,4];
const doubled= nums12.map(n=>n*2); // Ts infers n as number
console.log(doubled);

//Annotate the object params

type Point={x:number,y:number};

function distancefromOrigin(p:Point):number{
    return Math.hypot(p.x,p.y);
}

console.log(distancefromOrigin({x:3,y:2}));
