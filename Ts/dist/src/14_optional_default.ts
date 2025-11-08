//? Optional Parameters
//This is how optional parameters are defined in TypeScript using the "?" symbol.

function greetPersonOptional(name?: string): string {
    const upperRes = name ? name.toUpperCase() : "Guest User";
    return `Hello, ${upperRes}`;
}

console.log(greetPersonOptional("Aditya"));
console.log(greetPersonOptional());

//? Default Parameters
function greetPersonDefault(name: string = "Default User"): string {
    const upperRes = name.toUpperCase();
    return `Hello, ${upperRes}`;
}
console.log(greetPersonDefault("Aditya"));
console.log(greetPersonDefault());
