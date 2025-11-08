// <T> -> constrains T so that only certain shapes are allowed
// < T extends X>
// Key Constraints -> <K extends keyof T> -> k must be a key of T
function lenN4(xN4) {
    return xN4.length;
}
console.log(lenN4('hello'));
console.log(lenN4([1, 2, 3]));
function userN6Extract(arrN4, keyN4) {
    return arrN4.map(item => item[keyN4]);
}
const userN6 = [
    {
        id: '1', name: 'name', age: 22,
    }, {
        id: '2', name: 'name1', age: 23
    }
];
console.log(userN6Extract(userN6, 'id'));
console.log(userN6Extract(userN6, 'age'));
export {};
