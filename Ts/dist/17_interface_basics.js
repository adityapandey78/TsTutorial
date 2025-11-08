//? Interface Basics
// Interface is the name given to a custom type definition in TypeScript. It is used to define the structure of an object, specifying the properties and their types that an object must have.
const user1 = {
    id: 1,
    name: "Aditya Pandey",
    createdAt: new Date(),
    email: "aditya@example.com"
};
const admin1 = {
    id: 2,
    name: "Jane Doe",
    email: "jane@example.com",
    createdAt: new Date(),
    role: "admin"
};
const admin2 = {
    id: 3,
    name: "John Smith",
    createdAt: new Date(),
    role: "superadmin",
    meta: {
        lastLogin: new Date(),
        permissions: ["read", "write", "delete"]
    }
};
console.log(user1);
console.log(admin1);
console.log(admin2);
export {};
