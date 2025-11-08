

type Direction = "left" | "right" | "up";

// move accepts only the three literal directions
function move(d: Direction) {
    console.log(d);
}

// 'const' with an initializer is inferred as the literal type "left".
// Because it's immutable, TypeScript preserves the literal type.
const d1 = "left"; // type: "left"
move(d1); // OK: "left" is one of Direction

// 'let' with an initializer is widened to the general 'string' type.
// Mutable variables are given the broader type because they can be reassigned.
let d2 = "left"; // type: string (widened)
// move(d2); // Error: Argument of type 'string' is not assignable to parameter of type 'Direction'

// Explicit annotation prevents widening and constrains the variable to the union.
let d3: Direction = "left"; // type: Direction
move(d3); // OK

// Alternatives / tips:
// - Use a const assertion to preserve literal types even for complex literals:
//   const d4 = "left" as const; // type: "left"
// - When you want a mutable variable to be constrained to the union, annotate it:
//   let d5: Direction = "right";

/**
 * ?What Are Literals in TypeScript?
Literals are fixed values directly written in your code, representing specific data like numbers, strings, booleans, or objects. In TypeScript, they play a key role in type inference and union types, helping the compiler narrow down possible values for better type safety.

//*Key Concepts
String Literals: These are quoted strings, e.g., "left" or "right". Without explicit typing, TypeScript might widen them to the broader string type, losing specificity.
Literal Types: TypeScript treats literals as exact types (e.g., "left" is type "left", not string). This is useful for unions like Direction = "left" | "right" | "up" | "down", constraining variables to only those values.
Widening: By default, mutable variables (like let) widen literals to their base types (e.g., "left" becomes string), which can cause errors if you try to assign to a union type.
 */