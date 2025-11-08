// speard tuples

function smallNumber(...xs:number[]):number{
    return xs.reduce((s,n)=>s+n,0)
}

console.log(smallNumber(1,2,3,4,5,6));

//tuple rest

function makeRange(
    ...args:[start:number,ebd:number,step?:number]
):number[]{
    const [start,end,step=1]=args;
    const out:number[]=[];
    for(let i=start;i<=end;i+=step){
        out.push(i);
    }
    return out;
}

console.log(makeRange(1,10));
console.log(makeRange(1,10,2));

function draw(x:number,y:number){
    console.log(`X: ${x}, Y: ${y}`);
}
const point:[number,number]=[10,20];
draw(...point);