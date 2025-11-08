//email?:string->  email may be absent, if its present it will be string always
// const email:string|undefined="aditya@email"
// This is diffrenr


type User={
    id:string, // requird
    name:string;//required,
    email?:string// optional(could be absent) but string
    readonly createdAt:Date// cant be reassigned
}

//the given obj is type of obj User
const user1:User={id:"user1",name:'sangam',createdAt:new Date()};
const user2:User={id:"user2",name:'sangam2',createdAt:new Date()};

// user1.createdAt= new Date()// cant be resssigned
//? Index Signature
/**ndex signature: type Count = { [k: string]: number }

Means: "an object whose keys are strings and whose values are numbers."
It's open-ended: any string key is allowed (e.g. { a: 1, foo: 2 }).
keyof Count is string. Accessing c[someString] is typed as number.
Gotcha: object-literal excess-property checks still apply when assigning literals. */
type Count={[k:string]:number}

/**
 * Record<K, T> produces a type with exactly the keys in K (each required) mapped to T.
Equivalent to: { likes: number; views: number; shares: number }
keyof Count1 is the union "likes" | "views" | "shares".
Use Partial<Record<...>> if keys should be optional.
 */
type Count1=Record<"likes"|"views"|"shares",number>

const c1: Count={whatever:1};
const c2:Count1={likes:1,views:2,shares:3};
console.log(c1);
console.log(c2);

