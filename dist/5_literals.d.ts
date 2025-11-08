export {};
/**
 * ?What Are Literals in TypeScript?
Literals are fixed values directly written in your code, representing specific data like numbers, strings, booleans, or objects. In TypeScript, they play a key role in type inference and union types, helping the compiler narrow down possible values for better type safety.

//*Key Concepts
String Literals: These are quoted strings, e.g., "left" or "right". Without explicit typing, TypeScript might widen them to the broader string type, losing specificity.
Literal Types: TypeScript treats literals as exact types (e.g., "left" is type "left", not string). This is useful for unions like Direction = "left" | "right" | "up" | "down", constraining variables to only those values.
Widening: By default, mutable variables (like let) widen literals to their base types (e.g., "left" becomes string), which can cause errors if you try to assign to a union type.
 */ 
