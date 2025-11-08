const raw = '{"id":1,"name":"Ad"}';
// here we are asseting teh type after parse which is bad appraod
const riskyUser = JSON.parse(raw);
console.log(riskyUser.name);
/// While handling teh APi or JSON we may be required to do this
//: Better way to use that
function isUser(v) {
    return (typeof v === 'object' && v !== null && "id" in v &&
        typeof v.id === "number" && "name" in v &&
        typeof v.name === 'string');
}
// Added extra type checking for the value and kept it unknow initiallly
const maybe = JSON.parse(raw);
if (isUser(maybe)) {
    console.log(maybe.name); //safe
}
export {};
// This method is safe andbetter to use
