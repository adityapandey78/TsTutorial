//? Use of `in` operator
// We use in operator to check if a property exists in an object and narrow down types in union types

type InExample1={role:"user", permission:string[]}
type InExample2={role:"admin", adminLevel:number}

type userInExample= InExample1 | InExample2;

function describeuserExample(user:userInExample):string{
    if('permission' in user){
        return `This is a user with permissions: ${user.permission.join(', ')}`;
    } else {
        return `This is an admin with level: ${user.adminLevel}`;
    }       
}

console.log(describeuserExample({role:"user", permission:["read"]}));
console.log(describeuserExample({role:"admin", adminLevel:1}));

//? optional chaining and nullish coalescing
// || and ?? operators
// Optional chaining is used to safely access nested properties of an object that may be null or undefined
// Nullish coalescing operator (??) is used to provide a default value when dealing with null or undefined

type User = {
    id: number;
    name: string;
    email?: string | null;
};

function getUserEmail(user: User): string {
    return user.email ?? "No email provided";
}

type ProfileN3={
    name:string;
    contact?:{email?:string|null}
}

const P1N3: ProfileN3 = { name: "Alice", contact: { email: "alice@example.com" } };
const P2N3:ProfileN3={name:"Aditya"};

// P2N3.contact.email // Error: Object is possibly 'undefined'.
P2N3.contact?.email // OK with optional chaining

//? ??-> 
// It used the right hand deafault value only when the left is null or undefined
// ||-> used the default when the left is any falsy value (null, undefined, 0, "", false, NaN)

const countfromServerN3:number|null=0;
const labelFromServerN3:string|undefined="";

const aN3 = countfromServerN3??100 // keeps the 0
console.log(aN3);

const bn3=countfromServerN3||100 // replaces with 100
console.log(bn3,aN3);