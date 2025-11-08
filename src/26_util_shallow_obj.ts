//? Partial Utility
/**
 * In TypeScript, Partial<T> is a built-in utility type that transforms a given type T by making all of its top-level properties optional. This means each property can be present or absent without causing a type error.
 */
// partial<T> -> make all the top level fields optional

type AddressN8 = {
  line1: string;
  city: string;
};
type user10 = {
  id: string;
  name: string;
  email?: string;
  address: AddressN8;
};

type UserPatch10 = Partial<user10>;
// This is equivalent to:
// type UserPatch10 = {
//     id?: string;
//     name?: string;
//     email?: string;
//     address?: AddressN8;  // Note: address is now optional, but its inner fields (line1, city) are still required
// }

//: Above partial is kinda shallows

const patch10: UserPatch10 = { name: "aditya" }; // snce we have made partials

const patch11: UserPatch10 = { address: { line1: "NIAMT", city: "Ranchi" } };

//: Redquired<T>
//It makes all the top level fileds as requird

type userAllRequiredN10 = Required<user10>;

const userAllPatch11: userAllRequiredN10 = {
  id: "u2",
  name: "name2",
  email: "user1@emailcom",
  address: { line1: "NIAMT", city: "Ranchi" },
};

//: Readonly<T>

type ReadOnlyuser19 = Readonly<user10>;
// thsi will be readonly

//: Pick<T,K> -> Keep only some keys
// This will only the few keys which we will mention
type PublicUserN10 = Pick<user10, "id" | "name">; // here it kept just id and name

const publicUser: PublicUserN10 = { id: "u5", name: "sangam34" };

//: Omit<T,K> - remove some keys
type userWithotEmail = Omit<user10, "address">;

const omitUsername10: userWithotEmail = {
  id: "u1",
  name: "aditya",
  email: "hell",
};
// wil ommit the omitted keys

//: Record<K,V>
/**What is Record<K, V> in TypeScript?
Record<K, V> is a built-in TypeScript utility type that creates an object type where the keys are of type K and the values are of type V. It's like defining a dictionary or map where you specify the allowed keys upfront, and each key must map to a value of the specified type.

High-Level Concept
Purpose: It ensures type safety for objects with a fixed set of keys, preventing accidental additions or mismatches. Think of it as a "blueprint" for objects where you control both the keys and their associated value types. */

type RoleK = "admin" | "user" | "editor";
type RoleCheck = Record<RoleK, user10>;
// Example usage:
const roles: RoleCheck = {
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
