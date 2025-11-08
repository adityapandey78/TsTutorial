//? Partial Utility
/**
 * In TypeScript, Partial<T> is a built-in utility type that transforms a given type T by making all of its top-level properties optional. This means each property can be present or absent without causing a type error.
 */
// partial<T> -> make all the top level fields optional
// This is equivalent to:
// type UserPatch10 = {
//     id?: string;
//     name?: string;
//     email?: string;
//     address?: AddressN8;  // Note: address is now optional, but its inner fields (line1, city) are still required
// }
//: Above partial is kinda shallows
const patch10 = { name: "aditya" }; // snce we have made partials
const patch11 = { address: { line1: "NIAMT", city: "Ranchi" } };
const userAllPatch11 = {
    id: "u2",
    name: "name2",
    email: "user1@emailcom",
    address: { line1: "NIAMT", city: "Ranchi" },
};
const publicUser = { id: "u5", name: "sangam34" };
const omitUsername10 = {
    id: "u1",
    name: "aditya",
    email: "hell",
};
// Example usage:
const roles = {
    admin: {
        id: "u1",
        name: "Admin User",
        email: "admin@example.com",
        address: { city: "aa", line1: "he" },
    },
    user: {
        id: "u2",
        name: "Regular User",
        email: "user@example.com",
        address: { city: "aa", line1: "he" },
    },
    editor: {
        id: "u3",
        name: "Editor User",
        email: "editor@example.com",
        address: { city: "aa", line1: "he" },
    },
};
// This is valid. Adding a key like 'guest' would cause a TypeScript error.
console.log(roles);
export {};
