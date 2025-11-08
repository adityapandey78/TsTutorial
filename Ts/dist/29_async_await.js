//? Awaited<T>
// It unwraps the value inside a Promise type
// how to use awaited
async function fetchDataN1() {
    return Promise.resolve("Hello, World!");
}
async function fetchCount() {
    return 42;
}
async function getdata() {
    return Promise.all([
        Promise.resolve(1),
        Promise.resolve("x")
    ]);
}
export {};
