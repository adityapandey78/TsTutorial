

//Understding what is "Type paramener" <T>
//How Ts infecrs <T> from your arguments automatically


// is a function -> the types are blanks -> you fill in later
//<T> is a placeholder for a type that will be specified when the function is called

// TS will try to understand what T should be

//identity function
function identity<T>(arg:T):T{
    return arg;
}
// it will infer T  based on the argument type
const output1=identity<string>("Hello Generics"); // T is string
console.log(output1);

const xyz= identity(5);
console.log(xyz); // T is inferred as number

// We need thsi kinda funn
function firstgen<T>(arr:T[]):T|undefined{
    return arr[0];
}
console.log(firstgen([1,2,3,4,5]));


//Why we need this
//eg: Without generics -> (x:unknown)=>unknown
//with generics :{x:T}=> here we are keeping the exact type
function wrap<T>(value:T):{value:T}{
    return{value};
}

// Without generics, you'd need separate functions (code duplication):
function firstNumber(arr: number[]): number | undefined {
    return arr[0];
}
function firstString(arr: string[]): string | undefined {
    return arr[0];
}

// With generics, one function handles all types:
function firstgen1<T>(arr: T[]): T | undefined {
    return arr[0];
}

// Usage:
console.log(firstgen1([1, 2, 3]));        // 1 (T = number)
console.log(firstgen1(['a', 'b', 'c']));  // 'a' (T = string)
console.log(firstgen1([]));               // undefined (empty array)


