//? Awaited<T>
// It unwraps the value inside a Promise type
// how to use awaited

type Promise1=Awaited<Promise<string>>; // string
type Promise2=Awaited<Promise<number>>; // number
type Promise3=Awaited<Promise<Promise<boolean>>>; //nested
type Awaited1= Awaited<string>; // string

type PromiseUnionExample=Awaited<Promise<string|number>>; // string|number

async function fetchDataN1():Promise<Promise<string>>{
    return Promise.resolve("Hello, World!");
}

async function fetchCount(){
    return 42 as const
}

type resolvedfetchcountvalue= Awaited<ReturnType<typeof fetchCount>>; //42
async function getdata(){
    return Promise.all([
        Promise.resolve(1 as const),
        Promise.resolve("x"as const)
    ]as const)
}

type DataTouplesWithPromise= Awaited<ReturnType<typeof getdata>>; //[1,"x"]