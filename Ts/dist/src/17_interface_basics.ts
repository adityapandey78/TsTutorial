//? Interface Basics
// Interface is the name given to a custom type definition in TypeScript. It is used to define the structure of an object, specifying the properties and their types that an object must have.

interface User {
    id: number;
    name: string;
    email?: string;
    readonly createdAt: Date;
}

const user1: User = {
    id: 1,
    name: "Aditya Pandey",
    createdAt: new Date(),
    email: "aditya@example.com"
};

//single inheritance

interface Admin extends User {
    role: "admin" | "superadmin";
}

const admin1: Admin = {
    id: 2,
    name: "Jane Doe",
    email: "jane@example.com",
    createdAt: new Date(),
    role: "admin"
};

interface AdminwithMeta extends Admin {
    meta: {
        lastLogin: Date;
        permissions: string[];
    };
}
const admin2: AdminwithMeta = {
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