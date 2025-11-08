//? Optional Parameters
//This is how optional parameters are defined in TypeScript using the "?" symbol.
function greetPersonOptional(name) {
    const upperRes = name ? name.toUpperCase() : "Guest User";
    return `Hello, ${upperRes}`;
}
console.log(greetPersonOptional("Aditya"));
console.log(greetPersonOptional());
//? Default Parameters
function greetPersonDefault(name = "Default User") {
    const upperRes = name.toUpperCase();
    return `Hello, ${upperRes}`;
}
console.log(greetPersonDefault("Aditya"));
console.log(greetPersonDefault());
export {};
