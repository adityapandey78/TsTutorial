//: Tuples has fixed length and fixed types
// Tuples in TypeScript are arrays with a fixed number of elements, each with a specific type.
// Example: let tuple: [string, number] = ["hello", 42];
//Indexing also matters in this

let user: [string, number, boolean] = ["adityapandey", 40, true];

// Accessing tuple elements
console.log(user[0].toUpperCase()); // "ADITYAPANDEY"
console.log(user[1].toFixed(2));    // "40.00"
console.log(user[2] ? "Creator" : "Not a Creator"); // "Creator"

//:optional tuples
let user2: [string, number, boolean?] = ["adityapandey", 40];
console.log(user2[2]?.toString() ?? "Boolean value not provided");

//: Rest elements in tuples
let user3: [string, ...number[]] = ["adityapandey", 10, 20, 30];
console.log(user3[0].toUpperCase()); // "ADITYAPANDEY"
console.log(user3.slice(1).map(num => num)); // [10, 20, 30]


const useEntry:[string,number]=["aditya",25];
console.log(useEntry);

type responseRow = [status:number, message?:string]
const res1:responseRow=[200,"ok"];
// const res2:responseRow=[404];// valid
// const res3:responseRow=[500,"Internal Server Error","Extra"];// invalid too many elements