//? Interface vs types
//interfaces are mainly used to define the shape of objects
// Support declaration merging
//types are more versatile
// Support union and intersection types
//tyoes cannot be reopened to add new properties vs interfaces

//? When will we be using interfaces
//Will use interfaces when we want to define the shape of an object and take advantage of declaration merging

interface Employee {
    id: number;
    name: string;
}
interface Employee {
    salary: number;
}
// here we can redefine the interface Employee to add new properties
//but that is not possible with types
const emp1: Employee = {
    id: 1,
    name: "John Doe",
    salary: 60000,
};
console.log(emp1);

//? When will we be using types

//object shaped-> similar to interfaces
//union types (A|B)
//intersection types (A & B)
