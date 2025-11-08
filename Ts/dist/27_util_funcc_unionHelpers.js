// ReturnType<F>
// Parameters<F>
//InstanceType<Ctor>
// ConstructorParameter<C>
function ExtractuserInfo(id, isExtraInfo = false) {
    return {
        id: 'a',
        name: 'aditya',
        log: isExtraInfo ? "details" : undefined
    };
}
const argsInfo = ['u1', true];
const resultInfo = ExtractuserInfo(...argsInfo);
console.log(resultInfo);
class PersonN1 {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet() {
        return `Hi I am this->${this.name}`;
    }
}
const resultInfo1 = ['aditya', 29];
const abc = new PersonN1(...resultInfo1);
console.log(abc.greet());
console.log(resultInfo1);
export {};
