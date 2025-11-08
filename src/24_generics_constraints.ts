// <T> -> constrains T so that only certain shapes are allowed
// < T extends X>
// Key Constraints -> <K extends keyof T> -> k must be a key of T


function lenN4<T extends {length:number}>(xN4:T):number{
    return xN4.length;
}

console.log(lenN4('hello'));
console.log(lenN4([1,2,3]));
// console.log(lenN4(123));// will show error coz number does not have length

// K must be a key of T from abobve line 3

type UserN6={id:string;name:string;age?:number}

function userN6Extract<T,K extends keyof T> (arrN4: T[],keyN4:K):Array<T[K]>{
    return arrN4.map(item=>item[keyN4])
}


const userN6:UserN6[]=[
    {
        id:'1',name:'name',age:22,
    },{
        id:'2',name:'name1',age:23
    }
]

console.log(userN6Extract(userN6,'id'));
console.log(userN6Extract(userN6,'age'));
