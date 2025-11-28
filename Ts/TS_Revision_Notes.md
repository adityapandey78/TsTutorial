# TypeScript Quick Revision Notes

> Concise TypeScript concept summaries, key interview questions, and code examples — ready for fast revision.

---

## How to use
- Copy snippets into a `.ts` file and compile with `tsc` or run with `ts-node`.
- Windows PowerShell example to compile and run a single file:

```powershell
npm i -g typescript ts-node # if not installed
ts-node path\to\example.ts
# or
tsc path\to\example.ts; node path\to\example.js
```

---

**Overview:** TypeScript adds static types to JavaScript. Key advantages: early error detection, better IDE tooling, clearer contracts, and safer refactors.

---

**Quick Topics Covered:**
- Primitives & Type Inference
- Function annotations (params, return)
- Objects, Interfaces, Type Aliases
- Union & Intersection Types
- Literal Types & `as const`
- Type Assertions
- Arrays, Tuples, Readonly
- Index Signatures
- Optional / Nullable types
- Generics (intro & constraints)
- Utility types (Partial, Pick, Omit, Record, ReturnType, Parameters)
- Type guards (`typeof`, `in`, `instanceof`, user-defined)
- Classes, constructors, access modifiers
- Async/await with typed functions
- **Enums** (numeric, string, const enums)
- **Mapped Types** (transforming object types)
- **Conditional Types** (type-level if/else)
- **Template Literal Types**
- **`never` and `void`** types
- **Function Overloads**
- **Abstract Classes**
- **Declaration Merging**
- **Modules & Namespaces**
- **Decorators** (experimental)
- **tsconfig.json** essentials

---

## 1. Primitives & Type Inference

### Primitive Types
TypeScript has 7 primitive types:

1. **`string`** - text values: `"hello"`, `'world'`, `` `template` ``
2. **`number`** - all numeric values: `42`, `3.14`, `NaN`, `Infinity`
3. **`boolean`** - `true` or `false`
4. **`bigint`** - large integers: `100n`, `BigInt(100)`
5. **`symbol`** - unique identifiers: `Symbol('key')`
6. **`null`** - intentional absence of value
7. **`undefined`** - uninitialized value

### Type Inference
TypeScript automatically infers types from values. This reduces verbosity while maintaining type safety.

**When TS infers:**
- Variable initialization: `let x = 5` → `number`
- Function return values: inferred from return statements
- Default parameters: `function greet(name = "Guest")` → `name: string`

**When to annotate explicitly:**
- Public API functions and exported members
- When initializing with a broader type than the value suggests
- Complex union or intersection types
- Function parameters (no inference without default)

Example:

```ts
// Inference works well
let x = 1; // inferred as number
let name = "Alice"; // inferred as string
let isActive = true; // inferred as boolean

// Explicit annotations when needed
let y: number | null = null; // union type
let id: string | number; // no initializer, needs annotation
id = 123; // OK
id = "abc"; // OK

// BigInt and Symbol
let bigNum = 100n; // inferred as bigint
let sym = Symbol("unique"); // inferred as symbol
```

### Special Types

**`any`** - Disables type checking entirely (escape hatch, avoid when possible):
```ts
let data: any = "hello";
data = 42; // no error
data.foo.bar.baz(); // no error at compile time
```

**`unknown`** - Type-safe alternative to `any` (must narrow before use):
```ts
let value: unknown = "hello";
// value.toUpperCase(); // Error: must narrow first

if (typeof value === "string") {
  console.log(value.toUpperCase()); // OK after narrowing
}
```

**`never`** - Represents values that never occur (empty type):
```ts
function throwError(msg: string): never {
  throw new Error(msg);
  // never returns
}

function infiniteLoop(): never {
  while (true) {}
}
```

**`void`** - Absence of return value (functions that don't return anything):
```ts
function log(msg: string): void {
  console.log(msg);
  // implicitly returns undefined
}
```

Interview Qs:
- Q: When should you annotate types explicitly? A: For public function signatures, library code, complex unions, when inference is unclear, or when you want a broader type than the initial value suggests.
- Q: Difference between `any` and `unknown`? A: `any` disables all type checking and can be assigned to anything; `unknown` is type-safe and requires type narrowing before use.
- Q: Difference between `null` and `undefined`? A: `null` is an intentional absence of value (assigned); `undefined` means uninitialized or missing. With `strictNullChecks`, they're distinct types.
- Q: What is `never` used for? A: Functions that never return, unreachable code, and exhaustive type checking in discriminated unions.

---

## 2. Function Annotations (parameters & return types)

### Parameter Annotations
Function parameters have no type inference - you must annotate them explicitly (unless they have defaults).

```ts
// Parameters must be annotated
function add(a: number, b: number): number {
  return a + b;
}

// Default parameters provide type inference
const greet = (name = 'stranger'): string => `Hi, ${name}`;
// name is inferred as string from default value

// Optional parameters with ?
function buildName(first: string, last?: string): string {
  if (last) return `${first} ${last}`;
  return first;
}

buildName("Alice"); // OK
buildName("Alice", "Smith"); // OK
```

### Return Type Annotations
Return types can be inferred but explicit annotation is recommended for:
- Public APIs and exported functions
- Preventing accidental return type changes
- Better error messages
- Self-documentation

```ts
// Explicit return type (recommended for public APIs)
function multiply(a: number, b: number): number {
  return a * b;
}

// Inferred return type (OK for private/local functions)
function divide(a: number, b: number) {
  return a / b; // inferred as number
}

// Void for functions with no return value
function logMessage(msg: string): void {
  console.log(msg);
}

// Never for functions that never return
function fail(msg: string): never {
  throw new Error(msg);
}
```

### Rest Parameters and Spread

```ts
// Rest parameters - collect arguments into array
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3, 4); // OK

// Spread with tuple types
function point(x: number, y: number): void {
  console.log(`(${x}, ${y})`);
}

const coords: [number, number] = [10, 20];
point(...coords); // OK
```

### Contextual Typing
TypeScript can infer parameter types from context:

```ts
// Anonymous function in forEach - type inferred from array
const numbers = [1, 2, 3];
numbers.forEach(n => {
  console.log(n.toFixed(2)); // n is inferred as number
});

// Callback parameter types inferred
type EventHandler = (e: Event) => void;
const handler: EventHandler = (e) => {
  // e is inferred as Event
  e.preventDefault();
};
```

### Function Type Expressions

```ts
// Function type syntax
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;

// Alternative syntax with interface
interface StringFormatter {
  (input: string): string;
}

const uppercase: StringFormatter = (str) => str.toUpperCase();
```

Interview Qs:
- Q: Why annotate return types explicitly? A: Makes intention explicit, prevents accidental incompatible returns, improves error messages, and serves as documentation. Especially important for public APIs.
- Q: What's the difference between optional parameter `?` and `| undefined`? A: Optional `?` means the parameter can be omitted; `| undefined` means it must be passed but can be `undefined`. `fn(x?: number)` allows `fn()`, but `fn(x: number | undefined)` requires `fn(undefined)`.
- Q: How does contextual typing work? A: TS infers types based on the location/context where a value is used, like callback parameters in array methods or event handlers.

---

## 3. Objects, Interfaces, and Type Aliases

### Object Types
Define the shape of objects with property types:

```ts
// Inline object type
function printUser(user: { name: string; age: number }): void {
  console.log(`${user.name} is ${user.age} years old`);
}

// Optional properties with ?
type Config = {
  host: string;
  port?: number; // may be undefined
  timeout?: number;
};

const config: Config = { host: "localhost" }; // OK, port is optional

// Readonly properties
type Point = {
  readonly x: number;
  readonly y: number;
};

const p: Point = { x: 10, y: 20 };
// p.x = 5; // Error: cannot assign to readonly property
```

### Interfaces
Interfaces define contracts for object shapes. They can be extended and merged.

```ts
interface User {
  id: number;
  name: string;
  email?: string; // optional
}

// Extending interfaces
interface Admin extends User {
  role: string;
  permissions: string[];
}

const admin: Admin = {
  id: 1,
  name: "Alice",
  role: "superadmin",
  permissions: ["read", "write", "delete"]
};

// Multiple inheritance
interface Timestamp {
  createdAt: Date;
  updatedAt: Date;
}

interface Post extends User, Timestamp {
  title: string;
  content: string;
}
```

### Type Aliases
Type aliases create names for any type, including unions, intersections, and primitives.

```ts
// Simple alias
type ID = number | string;

// Object type alias
type Product = {
  id: ID;
  name: string;
  price: number;
};

// Union types (only with type, not interface)
type Status = "pending" | "approved" | "rejected";

// Intersection types
type Timestamped = {
  createdAt: Date;
  updatedAt: Date;
};

type Article = Product & Timestamped; // combines both

// Tuple types
type Point2D = [number, number];
type Point3D = [number, number, number];
```

### Interface vs Type Alias

| Feature | Interface | Type Alias |
|---------|-----------|------------|
| Extend/Inherit | ✅ `extends` | ✅ `&` intersection |
| Declaration merging | ✅ Yes | ❌ No |
| Union types | ❌ No | ✅ Yes |
| Tuple types | ❌ No | ✅ Yes |
| Mapped types | ❌ No | ✅ Yes |
| Primitive types | ❌ No | ✅ Yes |
| Computed properties | ✅ Yes | ✅ Yes |
| Performance | Slightly faster | Slightly slower |

**When to use:**
- **Interface**: Object shapes, class contracts, public APIs, when you expect extension or merging
- **Type**: Unions, tuples, mapped types, utility types, complex type transformations

### Structural Typing (Duck Typing)
TypeScript uses structural typing: compatibility is based on structure, not names.

```ts
interface Point {
  x: number;
  y: number;
}

class Vector {
  constructor(public x: number, public y: number) {}
}

const point: Point = new Vector(10, 20); // OK!
// Vector is compatible with Point because it has x and y

// Excess property checking for object literals
const p1: Point = { x: 10, y: 20 }; // OK
// const p2: Point = { x: 10, y: 20, z: 30 }; // Error: excess property

// But structural typing allows excess properties from variables
const obj = { x: 10, y: 20, z: 30 };
const p3: Point = obj; // OK - structural match
```

### Index Signatures in Object Types

```ts
interface StringMap {
  [key: string]: string; // any string key returns string
}

const colors: StringMap = {
  primary: "blue",
  secondary: "green"
};

// Combining with known properties
interface Dictionary {
  count: number; // known property
  [key: string]: number; // all other properties must be number
}
```

Interview Qs:
- Q: When to use `interface` vs `type`? A: Use `interface` for object shapes, class contracts, and when you expect extension/merging. Use `type` for unions, tuples, mapped types, and complex type transformations.
- Q: What is structural typing? A: Compatibility is based on structure/shape, not names. If an object has all required properties with correct types, it's compatible—even if it has extra properties or is a different class.
- Q: What is declaration merging? A: TypeScript merges multiple declarations of the same interface into one. Useful for extending external libraries. Only works with interfaces, not type aliases.
- Q: Why does excess property checking happen? A: For object literals only, TS is strict to catch typos. Once assigned to a variable, structural typing takes over and allows extra properties.

---

## 4. Union & Intersection Types

### Union Types (`A | B`)
A value can be one of several types. Use type narrowing to work with specific types.

```ts
// Basic union
type ID = number | string;

function printID(id: ID) {
  console.log(id); // OK - common operations work
  // console.log(id.toUpperCase()); // Error - not all types have this
  
  // Need to narrow the type first
  if (typeof id === "string") {
    console.log(id.toUpperCase()); // OK - narrowed to string
  } else {
    console.log(id.toFixed(2)); // OK - narrowed to number
  }
}

// Union of object types
type Success = { success: true; data: string };
type Failure = { success: false; error: string };
type Result = Success | Failure;

function handleResult(result: Result) {
  if (result.success) {
    console.log(result.data); // narrowed to Success
  } else {
    console.log(result.error); // narrowed to Failure
  }
}
```

### Discriminated Unions (Tagged Unions)
Use a common literal property (discriminant) to narrow types. Essential pattern for type-safe state machines.

```ts
type Square = { kind: 'square'; size: number };
type Circle = { kind: 'circle'; radius: number };
type Triangle = { kind: 'triangle'; base: number; height: number };

type Shape = Square | Circle | Triangle;

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'square':
      return shape.size ** 2; // shape is Square
    case 'circle':
      return Math.PI * shape.radius ** 2; // shape is Circle
    case 'triangle':
      return 0.5 * shape.base * shape.height; // shape is Triangle
    default:
      // Exhaustiveness check
      const _exhaustive: never = shape;
      return _exhaustive;
  }
}

// Real-world example: API response
type ApiResponse<T> = 
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

function handleApiResponse<T>(response: ApiResponse<T>) {
  switch (response.status) {
    case 'loading':
      console.log('Loading...');
      break;
    case 'success':
      console.log('Data:', response.data);
      break;
    case 'error':
      console.error('Error:', response.error);
      break;
  }
}
```

### Intersection Types (`A & B`)
Combines multiple types into one. The result has all properties from all types.

```ts
type Person = {
  name: string;
  age: number;
};

type Employee = {
  employeeId: string;
  department: string;
};

// Intersection combines both
type Staff = Person & Employee;

const john: Staff = {
  name: "John",
  age: 30,
  employeeId: "E123",
  department: "Engineering"
  // Must have ALL properties
};

// Useful for mixins
type Timestamped = {
  createdAt: Date;
  updatedAt: Date;
};

type AuditLog = {
  action: string;
  userId: string;
};

type AuditEntry = AuditLog & Timestamped;
```

### Type Narrowing Techniques

**1. typeof guards** (for primitives):
```ts
function process(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}
```

**2. Truthiness narrowing:**
```ts
function print(value: string | null | undefined) {
  if (value) {
    console.log(value.toUpperCase()); // value is string
  }
}
```

**3. Equality narrowing:**
```ts
function compare(x: string | number, y: string | boolean) {
  if (x === y) {
    // x and y are both string
    x.toUpperCase();
    y.toUpperCase();
  }
}
```

**4. `in` operator narrowing:**
```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    animal.swim(); // animal is Fish
  } else {
    animal.fly(); // animal is Bird
  }
}
```

**5. instanceof narrowing:**
```ts
function handle(value: Date | string) {
  if (value instanceof Date) {
    console.log(value.getFullYear()); // value is Date
  } else {
    console.log(value.toUpperCase()); // value is string
  }
}
```

**6. User-defined type guards:**
```ts
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function process(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase()); // value is string
  }
}
```

Interview Qs:
- Q: How do you narrow union types? A: Using `typeof`, `in`, `instanceof`, discriminant property checks (discriminated unions), truthiness checks, equality narrowing, and user-defined type guards.
- Q: What is a discriminated union? A: A union type where each member has a common literal property (discriminant) that can be used to narrow the type in a type-safe way. Essential for state machines and complex union handling.
- Q: Union vs Intersection - when to use? A: Use unions when a value can be one of several types (OR logic). Use intersections when combining multiple types into one (AND logic).
- Q: What happens when you intersect conflicting types? A: If properties conflict with incompatible types, the intersection becomes `never`. Example: `{ x: string } & { x: number }` results in `{ x: never }`.

---

## 5. Literal Types & `as const`

- Literal types restrict to exact values: `type T = 'a' | 'b'`.
- `as const` makes arrays/objects readonly and narrows literal types.

Example:

```ts
const roles = ['admin', 'user'] as const; // readonly tuple of literals
type Role = typeof roles[number]; // 'admin' | 'user'
```

Interview Qs:
- Q: What does `as const` do? A: Narrows the type to literal values and makes properties readonly.

---

## 6. Type Assertions & Non-null Assertion

- `value as Type` tells compiler to treat `value` as `Type` (use sparingly).
- `!` non-null assertion removes `null | undefined` from types — use carefully.

Example:

```ts
const el = document.getElementById('root') as HTMLDivElement | null;
// risky when you assert non-null without checks
const el2 = document.getElementById('root')!; // assumes not null
```

Interview Qs:
- Q: Difference between `as` and angle-bracket assertion? A: Same effect; angle-brackets clash with JSX — prefer `as`.

---

## 7. Arrays, Tuples, Readonly

- Arrays: `number[]` or `Array<number>`.
- Tuples: fixed-length arrays with specific types.
- `readonly` makes arrays/tuples immutable in type system.

Example:

```ts
type Pair = [string, number];
const p: readonly Pair = ['age', 30];

// readonly array
const nums: ReadonlyArray<number> = [1,2,3];
```

Interview Qs:
- Q: When to use tuples vs arrays? A: Use tuples for fixed-size heterogenous elements (e.g., [id, name]).

---

## 8. Index Signatures

- Define flexible object shapes with unknown keys of a known type.

Example:

```ts
interface StringMap {
  [key: string]: string;
}

const m: StringMap = { hello: 'world' };
```

Interview Qs:
- Q: How do index signatures interact with defined properties? A: Specific properties must satisfy the index signature type.

---

## 9. Optional & Nullable types

- Use `?` for optional properties and `| null | undefined` for nullable values. Use `strictNullChecks` for safety.

Example:

```ts
function greet(maybeName?: string | null) {
  const name = maybeName ?? 'guest'; // nullish coalescing
  return `Hello ${name}`;
}
```

Interview Qs:
- Q: What is `strictNullChecks`? A: When enabled, `null`/`undefined` are not assignable to other types unless explicitly included.

---

## 10. Generics (intro & constraints)

### What are Generics?
Generics allow you to write reusable, type-safe code that works with multiple types while maintaining type information.

**Why use generics?**
- Write functions/classes that work with any type
- Maintain type safety (better than `any`)
- Reduce code duplication
- Capture and preserve type relationships

### Basic Generic Functions

```ts
// Without generics - need different functions
function wrapInArrayString(value: string): string[] {
  return [value];
}

function wrapInArrayNumber(value: number): number[] {
  return [value];
}

// With generics - one function for all types
function wrapInArray<T>(value: T): T[] {
  return [value];
}

const strArray = wrapInArray("hello"); // string[]
const numArray = wrapInArray(42); // number[]
const boolArray = wrapInArray(true); // boolean[]

// Generic with multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const p1 = pair("age", 30); // [string, number]
const p2 = pair(true, "yes"); // [boolean, string]
```

### Generic Constraints
Use `extends` to constrain what types can be passed to a generic.

```ts
// Constraint: T must have a length property
function logLength<T extends { length: number }>(item: T): void {
  console.log(item.length);
}

logLength("hello"); // OK - string has length
logLength([1, 2, 3]); // OK - array has length
logLength({ length: 10 }); // OK - object has length
// logLength(42); // Error - number doesn't have length

// Constraint to specific types
function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const merged = merge({ name: "Alice" }, { age: 30 });
// merged is { name: string; age: number }
```

### `keyof` Constraint Pattern
Ensure a key is valid for an object - extremely common in type-safe property access.

```ts
// Type-safe property getter
function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: 'Eve', age: 25 };
const name = getProp(user, 'name'); // type: string
const age = getProp(user, 'age'); // type: number
// getProp(user, 'invalid'); // Error: 'invalid' not in user keys

// Type-safe property setter
function setProp<T, K extends keyof T>(obj: T, key: K, value: T[K]): void {
  obj[key] = value;
}

setProp(user, 'name', 'Alice'); // OK
setProp(user, 'age', 30); // OK
// setProp(user, 'age', 'thirty'); // Error: string not assignable to number
```

### Generic Classes

```ts
class Box<T> {
  private content: T;
  
  constructor(value: T) {
    this.content = value;
  }
  
  getValue(): T {
    return this.content;
  }
  
  setValue(value: T): void {
    this.content = value;
  }
}

const stringBox = new Box("hello");
stringBox.getValue(); // string
stringBox.setValue("world"); // OK
// stringBox.setValue(42); // Error

const numberBox = new Box<number>(42);
numberBox.getValue(); // number
```

### Generic Interfaces

```ts
interface Repository<T> {
  getById(id: string): T | undefined;
  getAll(): T[];
  create(item: T): T;
  update(id: string, item: T): T;
  delete(id: string): boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
}

class UserRepository implements Repository<User> {
  private users: User[] = [];
  
  getById(id: string): User | undefined {
    return this.users.find(u => u.id === id);
  }
  
  getAll(): User[] {
    return this.users;
  }
  
  create(user: User): User {
    this.users.push(user);
    return user;
  }
  
  update(id: string, user: User): User {
    const index = this.users.findIndex(u => u.id === id);
    this.users[index] = user;
    return user;
  }
  
  delete(id: string): boolean {
    const index = this.users.findIndex(u => u.id === id);
    if (index >= 0) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}
```

### Default Generic Types

```ts
interface ApiResponse<T = any> {
  data: T;
  status: number;
  message: string;
}

// Using default type
const response1: ApiResponse = {
  data: { foo: "bar" }, // any
  status: 200,
  message: "OK"
};

// Providing specific type
const response2: ApiResponse<User> = {
  data: { id: "1", name: "Alice", email: "alice@example.com" },
  status: 200,
  message: "OK"
};
```

### Constraints with Multiple Bounds

```ts
// Multiple constraints using intersection
function extend<T extends object, U extends object>(first: T, second: U): T & U {
  return { ...first, ...second };
}

// Constraint with union
function process<T extends string | number>(value: T): T {
  return value;
}
```

Interview Qs:
- Q: Why use generics instead of `any`? A: Generics preserve type information and provide type safety, while `any` removes all type checking. Generics allow the compiler to catch errors.
- Q: Why `K extends keyof T`? A: Ensures `K` is a valid property key of `T`, preventing runtime errors from accessing non-existent properties.
- Q: Can you constrain to multiple types? A: Yes, use intersection (`T extends A & B`) for multiple constraints, or union (`T extends A | B`) to allow either type.
- Q: What is the difference between `<T extends string>` and `<T = string>`? A: `extends` is a constraint (T must be string or subtype), while `=` is a default type (used when no type argument provided).

---

## 11. Utility Types

TypeScript provides built-in utility types for common type transformations. These are implemented using mapped types and conditional types.

### `Partial<T>` - Make all properties optional

```ts
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// All properties become optional
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; age?: number }

// Useful for update functions
function updateUser(id: number, updates: Partial<User>) {
  // Can update any subset of properties
}

updateUser(1, { name: "Alice" }); // OK
updateUser(1, { email: "alice@example.com", age: 30 }); // OK
```

### `Required<T>` - Make all properties required

```ts
interface Config {
  host?: string;
  port?: number;
  ssl?: boolean;
}

// Remove all optional modifiers
type RequiredConfig = Required<Config>;
// { host: string; port: number; ssl: boolean }

function createServer(config: RequiredConfig) {
  // All properties are guaranteed to exist
}
```

### `Readonly<T>` - Make all properties readonly

```ts
interface Point {
  x: number;
  y: number;
}

const origin: Readonly<Point> = { x: 0, y: 0 };
// origin.x = 10; // Error: cannot assign to readonly property

// Useful for immutable data structures
function processPoint(point: Readonly<Point>) {
  // Guaranteed that point won't be modified
}
```

### `Pick<T, K>` - Select specific properties

```ts
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Pick only public-facing properties
type UserPreview = Pick<User, 'id' | 'name' | 'email'>;
// { id: number; name: string; email: string }

type UserCredentials = Pick<User, 'email' | 'password'>;
// { email: string; password: string }
```

### `Omit<T, K>` - Remove specific properties

```ts
// Remove password from User type
type SafeUser = Omit<User, 'password'>;
// { id: number; name: string; email: string; createdAt: Date }

// Remove multiple properties
type UserBasic = Omit<User, 'password' | 'createdAt'>;
// { id: number; name: string; email: string }
```

### `Record<K, T>` - Create object type with specific keys and value type

```ts
// Map string keys to numbers
type StringToNumber = Record<string, number>;
const scores: StringToNumber = {
  alice: 95,
  bob: 87,
  charlie: 92
};

// Specific string literal keys
type Role = 'admin' | 'user' | 'guest';
type Permissions = Record<Role, string[]>;

const permissions: Permissions = {
  admin: ['read', 'write', 'delete'],
  user: ['read', 'write'],
  guest: ['read']
};

// Ensure all keys are present
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiEndpoints = Record<HttpMethod, string>;

const api: ApiEndpoints = {
  GET: '/api/users',
  POST: '/api/users',
  PUT: '/api/users/:id',
  DELETE: '/api/users/:id'
};
```

### `ReturnType<T>` - Extract function return type

```ts
function createUser() {
  return {
    id: 1,
    name: "Alice",
    email: "alice@example.com"
  };
}

type User = ReturnType<typeof createUser>;
// { id: number; name: string; email: string }

// Works with any function type
type Fn = (a: number, b: string) => boolean;
type R = ReturnType<Fn>; // boolean
```

### `Parameters<T>` - Extract function parameter types as tuple

```ts
function createUser(name: string, age: number, email: string) {
  // ...
}

type CreateUserParams = Parameters<typeof createUser>;
// [string, number, string]

// Use with spread
function logAndCreateUser(...args: CreateUserParams) {
  console.log('Creating user:', args);
  return createUser(...args);
}
```

### `Exclude<T, U>` - Remove types from union

```ts
type T1 = 'a' | 'b' | 'c';
type T2 = Exclude<T1, 'a'>; // 'b' | 'c'

type Primitive = string | number | boolean | null | undefined;
type NonNullable = Exclude<Primitive, null | undefined>;
// string | number | boolean
```

### `Extract<T, U>` - Keep only types that exist in both

```ts
type T1 = 'a' | 'b' | 'c';
type T2 = 'a' | 'e' | 'i';
type Common = Extract<T1, T2>; // 'a'

type T3 = string | number | boolean;
type StringOrNumber = Extract<T3, string | number>; // string | number
```

### `NonNullable<T>` - Remove null and undefined

```ts
type T1 = string | number | null | undefined;
type T2 = NonNullable<T1>; // string | number

function getValue(): string | null {
  return Math.random() > 0.5 ? "value" : null;
}

type NonNullValue = NonNullable<ReturnType<typeof getValue>>; // string
```

### `Awaited<T>` - Unwrap Promise type

```ts
type P1 = Awaited<Promise<string>>; // string
type P2 = Awaited<Promise<Promise<number>>>; // number

async function fetchData(): Promise<{ id: number; name: string }> {
  return { id: 1, name: "Alice" };
}

type Data = Awaited<ReturnType<typeof fetchData>>;
// { id: number; name: string }
```

### Combining Utility Types

```ts
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

// Create update type: optional fields, but exclude id and createdAt
type UserUpdate = Partial<Omit<User, 'id' | 'createdAt'>>;
// { name?: string; email?: string; password?: string; role?: 'admin' | 'user' }

// Public user profile: pick specific fields and make readonly
type UserProfile = Readonly<Pick<User, 'id' | 'name' | 'email'>>;

// Required fields for creation (exclude auto-generated fields)
type UserCreate = Required<Omit<User, 'id' | 'createdAt'>>;
```

Interview Qs:
- Q: How to get parameter types of a function? A: `Parameters<typeof fn>` returns a tuple of parameter types.
- Q: Difference between `Pick` and `Omit`? A: `Pick` selects specific properties to include; `Omit` selects properties to exclude.
- Q: How does `Record<K, T>` differ from index signature? A: `Record` works with literal union types for keys (ensuring all keys present), while index signatures allow any key of the specified type.
- Q: How to make a deeply nested object readonly? A: Built-in `Readonly<T>` is shallow. Use recursive type: `type DeepReadonly<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> }`.

---

## 12. Type Guards & Narrowing

- Built-ins: `typeof`, `instanceof`, `in`.
- User-defined: function returning `x is T`.

Example:

```ts
function isString(x: unknown): x is string {
  return typeof x === 'string';
}

function f(x: string | number) {
  if (typeof x === 'string') return x.toUpperCase();
  return x + 1;
}
```

Interview Qs:
- Q: Write a user-defined type guard. A: See `isString` above.

---

## 13. Classes, Constructors & Access Modifiers

### Basic Class Syntax

```ts
class Person {
  // Properties (must be declared or initialized)
  name: string;
  age: number;
  
  // Constructor
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  
  // Methods
  greet(): string {
    return `Hello, I'm ${this.name}`;
  }
  
  // Getter
  get birthYear(): number {
    return new Date().getFullYear() - this.age;
  }
  
  // Setter
  set birthYear(year: number) {
    this.age = new Date().getFullYear() - year;
  }
}

const person = new Person("Alice", 30);
console.log(person.greet()); // "Hello, I'm Alice"
console.log(person.birthYear); // calculated year
```

### Access Modifiers

TypeScript provides three access modifiers (compile-time only):

**`public`** (default) - accessible everywhere:
```ts
class Example {
  public name: string; // explicitly public
  age: number; // implicitly public
  
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const ex = new Example("Alice", 30);
console.log(ex.name); // OK
console.log(ex.age); // OK
```

**`private`** - accessible only within the class:
```ts
class BankAccount {
  private balance: number = 0;
  
  deposit(amount: number): void {
    this.balance += amount; // OK - inside class
  }
  
  getBalance(): number {
    return this.balance; // OK - inside class
  }
}

const account = new BankAccount();
account.deposit(100);
// console.log(account.balance); // Error: private property
console.log(account.getBalance()); // OK - using public method
```

**`protected`** - accessible in class and subclasses:
```ts
class Animal {
  protected name: string;
  
  constructor(name: string) {
    this.name = name;
  }
}

class Dog extends Animal {
  bark(): void {
    console.log(`${this.name} says woof!`); // OK - in subclass
  }
}

const dog = new Dog("Rex");
dog.bark(); // OK
// console.log(dog.name); // Error: protected property
```

### Parameter Properties (Shorthand)

TypeScript allows declaring and initializing properties directly in constructor parameters:

```ts
// Long form
class Person1 {
  name: string;
  age: number;
  
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

// Shorthand with parameter properties
class Person2 {
  constructor(public name: string, public age: number) {
    // Properties automatically created and assigned
  }
}

// Mixed example
class Employee {
  constructor(
    public name: string,
    private ssn: string,
    protected department: string,
    readonly id: number
  ) {}
}

const emp = new Employee("Alice", "123-45-6789", "Engineering", 101);
console.log(emp.name); // OK
console.log(emp.id); // OK
// emp.id = 102; // Error: readonly
// console.log(emp.ssn); // Error: private
```

### Readonly Properties

```ts
class Config {
  readonly apiUrl: string;
  readonly version: number;
  
  constructor(url: string, version: number) {
    this.apiUrl = url;
    this.version = version;
  }
  
  updateUrl(newUrl: string) {
    // this.apiUrl = newUrl; // Error: readonly
  }
}
```

### Static Members

Static members belong to the class itself, not instances:

```ts
class MathUtils {
  static PI = 3.14159;
  
  static circleArea(radius: number): number {
    return this.PI * radius * radius;
  }
  
  static compareNumbers(a: number, b: number): number {
    return a - b;
  }
}

console.log(MathUtils.PI); // 3.14159
console.log(MathUtils.circleArea(10)); // 314.159
// Don't need instance
```

### Inheritance and `super`

```ts
class Animal {
  constructor(public name: string) {}
  
  move(distance: number = 0): void {
    console.log(`${this.name} moved ${distance}m`);
  }
}

class Dog extends Animal {
  constructor(name: string, public breed: string) {
    super(name); // Must call parent constructor first
  }
  
  bark(): void {
    console.log('Woof! Woof!');
  }
  
  // Override parent method
  move(distance: number = 5): void {
    console.log('Running...');
    super.move(distance); // Call parent implementation
  }
}

const dog = new Dog('Rex', 'German Shepherd');
dog.bark(); // 'Woof! Woof!'
dog.move(10); // 'Running...' then 'Rex moved 10m'
```

### Abstract Classes

Abstract classes cannot be instantiated and serve as base classes:

```ts
abstract class Shape {
  constructor(public color: string) {}
  
  // Abstract method - must be implemented by subclasses
  abstract getArea(): number;
  
  // Concrete method - inherited by subclasses
  describe(): string {
    return `A ${this.color} shape with area ${this.getArea()}`;
  }
}

class Circle extends Shape {
  constructor(color: string, public radius: number) {
    super(color);
  }
  
  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(color: string, public width: number, public height: number) {
    super(color);
  }
  
  getArea(): number {
    return this.width * this.height;
  }
}

// const shape = new Shape('red'); // Error: cannot instantiate abstract class
const circle = new Circle('blue', 10);
console.log(circle.describe()); // Works
```

### Implementing Interfaces

```ts
interface Printable {
  print(): void;
}

interface Loggable {
  log(): string;
}

// Class can implement multiple interfaces
class Document implements Printable, Loggable {
  constructor(public content: string) {}
  
  print(): void {
    console.log(this.content);
  }
  
  log(): string {
    return `Document: ${this.content}`;
  }
}
```

### Private Fields (ES2022 / Modern JS)

TypeScript supports true private fields with `#` syntax:

```ts
class BankAccount {
  #balance: number = 0; // True private field (runtime)
  
  deposit(amount: number): void {
    this.#balance += amount;
  }
  
  getBalance(): number {
    return this.#balance;
  }
}

const account = new BankAccount();
account.deposit(100);
// account.#balance; // Syntax error - even at runtime
```

Interview Qs:
- Q: What does `private` do at runtime? A: TypeScript's `private` is compile-time only and erased during compilation. For runtime privacy, use ES2022 `#private` fields.
- Q: Difference between `private` and `protected`? A: `private` is accessible only within the class; `protected` is accessible in the class and its subclasses.
- Q: What are parameter properties? A: Shorthand syntax to declare and initialize class properties directly in constructor parameters using access modifiers.
- Q: Can you have a static private member? A: Yes, combine `static` and `private`: `private static count = 0;`
- Q: Difference between abstract class and interface? A: Abstract classes can have implementations and constructors; interfaces cannot. A class can implement multiple interfaces but extend only one abstract class.

---

## 14. Async/Await with Types

- Type the return value of async functions as `Promise<T>`.

Example:

```ts
async function fetchJson<T>(url: string): Promise<T> {
  const r = await fetch(url);
  return r.json() as Promise<T>;
}
```

Interview Qs:
- Q: How do you type `fetch` responses? A: Use generic helpers like `fetchJson<T>` and validate shape at runtime.

---

## 15. Enums

Enums allow defining a set of named constants, making code more readable and maintainable.

### Numeric Enums

Default: start at 0 and auto-increment:

```ts
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}

const dir: Direction = Direction.Up;
console.log(dir); // 0
console.log(Direction[0]); // "Up" - reverse mapping

// Custom starting value
enum Status {
  Pending = 1,
  Active,   // 2
  Complete  // 3
}

// Custom values for each
enum HttpStatus {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  NotFound = 404,
  ServerError = 500
}
```

**Numeric enum features:**
- Reverse mapping: can access name from value
- Can compute values: `Value = 1 << 2`
- Auto-increment from last value

### String Enums

Require explicit values for each member (no auto-increment):

```ts
enum LogLevel {
  Error = "ERROR",
  Warning = "WARN",
  Info = "INFO",
  Debug = "DEBUG"
}

function log(level: LogLevel, message: string) {
  console.log(`[${level}] ${message}`);
}

log(LogLevel.Error, "Something went wrong");
// Output: [ERROR] Something went wrong
```

**String enum benefits:**
- More readable at runtime (debugging, logs)
- No reverse mapping (smaller bundle)
- Type-safe and self-documenting

### Const Enums

Inlined at compile time - no runtime object generated:

```ts
const enum Color {
  Red,
  Green,
  Blue
}

let c = Color.Red;

// Compiles to:
// let c = 0 /* Red */;
// No Color object in JavaScript output
```

**Benefits:**
- Smaller bundle size (no runtime code)
- Still get type safety and autocomplete
- Performance benefit (direct values, no lookup)

**Limitations:**
- Cannot iterate over members
- No reverse mapping
- Can cause issues with `isolatedModules`

### Heterogeneous Enums (Mixed)

Mixing string and numeric values (not recommended):

```ts
enum Mixed {
  No = 0,
  Yes = "YES"
}
```

### Computed and Constant Members

```ts
enum FileAccess {
  // Constant members
  None = 0,
  Read = 1 << 1,    // 2
  Write = 1 << 2,   // 4
  ReadWrite = Read | Write, // 6
  
  // Computed member (uses runtime calculation)
  G = "123".length  // 3
}
```

### Enums vs String Literal Union Types

```ts
// Enum (runtime object)
enum Role {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST"
}

// String literal union (compile-time only)
type RoleType = "ADMIN" | "USER" | "GUEST";
```

| Feature | Enum | String Literal Union |
|---------|------|----------------------|
| Runtime object | ✅ Yes | ❌ No |
| Bundle size | Larger | Smaller (zero cost) |
| Nominal typing | ✅ Yes | ❌ No (structural) |
| Reverse mapping (numeric) | ✅ Yes | ❌ No |
| Can iterate | ✅ Yes | ❌ No |
| Safer | ✅ Nominal | Less (any string matches structurally) |

**When to use:**
- **Enum**: Need runtime values, iteration, nominal typing, reverse mapping
- **Union**: Pure types, tree-shaking priority, no runtime needed

### Ambient Enums

Describe shape of already existing enum:

```ts
declare enum ExternalEnum {
  A = 1,
  B,
  C = 2
}
```

Interview Qs:
- Q: Difference between enum and union of string literals? A: Enums create runtime objects with nominal typing and allow iteration/reverse mapping; unions are compile-time only, structural, and have zero runtime cost.
- Q: What is `const enum`? A: Removes the runtime object; values are inlined at compile time for smaller bundles and better performance.
- Q: When should you use enums? A: When you need runtime values, iteration over members, nominal typing (stricter checking), or reverse mapping (numeric enums).
- Q: Can you iterate over enum members? A: Yes for regular enums, no for const enums or string literal unions.

---

## 16. Mapped Types

Mapped types transform each property of an existing type using a pattern. They're the foundation of utility types.

### Basic Syntax

```ts
type Mapped<T> = {
  [P in keyof T]: T[P];
};
// Maps over all properties P in T, keeping same type
```

### Making Properties Optional

```ts
// Implementation of Partial<T>
type MyPartial<T> = {
  [P in keyof T]?: T[P];
};

interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = MyPartial<User>;
// { id?: number; name?: string; email?: string }
```

### Making Properties Required

```ts
// Implementation of Required<T> - removes ?
type MyRequired<T> = {
  [P in keyof T]-?: T[P];
  //               ^ minus modifier removes optional
};

interface Config {
  host?: string;
  port?: number;
}

type RequiredConfig = MyRequired<Config>;
// { host: string; port: number }
```

### Making Properties Readonly

```ts
// Implementation of Readonly<T>
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

type ReadonlyUser = MyReadonly<User>;
// { readonly id: number; readonly name: string; readonly email: string }
```

### Removing Readonly

```ts
// Remove readonly modifier
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
  //^ minus modifier removes readonly
};

type ReadonlyPoint = Readonly<{ x: number; y: number }>;
type MutablePoint = Mutable<ReadonlyPoint>;
// { x: number; y: number }
```

### Transforming Property Types

```ts
// Make all properties nullable
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

type NullableUser = Nullable<User>;
// { id: number | null; name: string | null; email: string | null }

// Wrap all properties in Promise
type Promised<T> = {
  [P in keyof T]: Promise<T[P]>;
};

type AsyncUser = Promised<User>;
// { id: Promise<number>; name: Promise<string>; email: Promise<string> }

// Make all properties functions that return the value
type Getters<T> = {
  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};

type UserGetters = Getters<User>;
// { getId: () => number; getName: () => string; getEmail: () => string }
```

### Key Remapping with `as`

```ts
// Rename all keys to add prefix
type Prefixed<T, Prefix extends string> = {
  [P in keyof T as `${Prefix}${string & P}`]: T[P];
};

type PrefixedUser = Prefixed<User, 'user_'>;
// { user_id: number; user_name: string; user_email: string }

// Create both getter and setter for each property
type Accessors<T> = {
  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
} & {
  [P in keyof T as `set${Capitalize<string & P>}`]: (value: T[P]) => void;
};

type UserAccessors = Accessors<{ name: string; age: number }>;
// { getName: () => string; setName: (value: string) => void;
//   getAge: () => number; setAge: (value: number) => void }
```

### Filtering Properties

```ts
// Pick only properties of certain type
type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P];
};

interface Mixed {
  id: number;
  name: string;
  age: number;
  active: boolean;
}

type StringProps = PickByType<Mixed, string>;
// { name: string }

type NumberProps = PickByType<Mixed, number>;
// { id: number; age: number }

// Omit properties of certain type
type OmitByType<T, U> = {
  [P in keyof T as T[P] extends U ? never : P]: T[P];
};

type NonNumbers = OmitByType<Mixed, number>;
// { name: string; active: boolean }
```

### Recursive Mapped Types

```ts
// Deep readonly
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

interface NestedUser {
  id: number;
  profile: {
    name: string;
    address: {
      street: string;
      city: string;
    };
  };
}

type ImmutableUser = DeepReadonly<NestedUser>;
// All nested properties are readonly
```

### Practical Example: Event Map

```ts
// Create event handler types from event map
type EventMap = {
  click: { x: number; y: number };
  keypress: { key: string };
  focus: { element: HTMLElement };
};

type EventHandlers = {
  [E in keyof EventMap as `on${Capitalize<E>}`]: (event: EventMap[E]) => void;
};

// Result:
// {
//   onClick: (event: { x: number; y: number }) => void;
//   onKeypress: (event: { key: string }) => void;
//   onFocus: (event: { element: HTMLElement }) => void;
// }
```

Interview Qs:
- Q: How to make all properties of a type optional? A: `Partial<T>` is a mapped type: `{ [P in keyof T]?: T[P] }`
- Q: What does `-?` do in mapped types? A: Removes the optional modifier, making properties required.
- Q: How do you filter properties in mapped types? A: Use `as` clause with conditional: `[P in keyof T as Condition ? P : never]`
- Q: Can mapped types change property names? A: Yes, using `as` clause with template literals: `[P in keyof T as `new${P}`]`

---

## 17. Conditional Types

- Syntax: `T extends U ? X : Y`.
- Used in advanced type utilities and distributed over unions.

Example:

```ts
type IsString<T> = T extends string ? 'yes' : 'no';

type A = IsString<string>; // 'yes'
type B = IsString<number>; // 'no'

// Distributed over union
type C = IsString<string | number>; // 'yes' | 'no'
```

Example with `infer`:

```ts
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type D = UnwrapPromise<Promise<number>>; // number
```

Interview Qs:
- Q: What is distributive conditional type? A: When conditional type is applied to a union, it distributes over each member.
- Q: Explain `infer` keyword. A: Used within conditional types to infer and capture a type variable.

---

## 18. Template Literal Types

- Combine string literal types with template literal syntax.

Example:

```ts
type Greeting = `hello ${string}`;
const g: Greeting = 'hello world'; // OK
// const bad: Greeting = 'hi world'; // Error

type EventName<T extends string> = `on${Capitalize<T>}`;
type ClickEvent = EventName<'click'>; // 'onClick'
```

Interview Qs:
- Q: How to create a type for CSS properties in camelCase? A: Use template literals + intrinsic string manipulation types.

---

## 19. `never` and `void` Types

- `void`: function returns nothing (may return `undefined`).
- `never`: function never returns (throws or infinite loop); bottom type.
- Use `never` for exhaustive checks.

Example:

```ts
function throwError(msg: string): never {
  throw new Error(msg);
}

function logVoid(): void {
  console.log('done');
  // implicit return undefined
}
```

Interview Qs:
- Q: Difference between `void` and `never`? A: `void` means no meaningful return; `never` means unreachable endpoint.

---

## 20. Function Overloads

- Provide multiple function signatures for different argument combinations.

Example:

```ts
function format(value: string): string;
function format(value: number): string;
function format(value: string | number): string {
  return String(value);
}

const s = format('hello'); // typed as string
const n = format(42);      // typed as string
```

Interview Qs:
- Q: Why use overloads instead of union types? A: Overloads provide precise return types based on input type combinations.

---

## 21. Abstract Classes

- Cannot be instantiated directly; serve as base classes.
- Can have abstract methods (must be implemented by subclasses) and concrete methods.

Example:

```ts
abstract class Animal {
  abstract makeSound(): void;
  move() {
    console.log('moving...');
  }
}

class Dog extends Animal {
  makeSound() {
    console.log('bark');
  }
}

// const a = new Animal(); // Error
const d = new Dog(); // OK
```

Interview Qs:
- Q: Abstract class vs interface? A: Abstract classes can have implementation; interfaces cannot (except default in some cases).

---

## 22. Declaration Merging

- TS merges multiple declarations with same name (interfaces, namespaces).
- Common with interfaces: extend by declaring again.

Example:

```ts
interface Box {
  height: number;
}

interface Box {
  width: number;
}

const box: Box = { height: 10, width: 20 }; // merged
```

Interview Qs:
- Q: Can you merge type aliases? A: No, only interfaces and namespaces merge.

---

## 23. Modules & Namespaces

- **Modules**: ES6 `import`/`export` (preferred).
- **Namespaces**: TS-specific feature for organizing code (less common now).

Example (modules):

```ts
// math.ts
export function add(a: number, b: number) { return a + b; }

// app.ts
import { add } from './math';
```

Interview Qs:
- Q: Should you use namespaces in modern TS? A: Prefer ES modules; namespaces are legacy but useful for global script files.

---

## 24. Decorators (Experimental)

- Metadata for classes, methods, properties, parameters.
- Require `experimentalDecorators` in `tsconfig.json`.

Example:

```ts
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
}
```

Interview Qs:
- Q: Common use cases for decorators? A: Dependency injection, logging, validation, metadata reflection (e.g., Angular, NestJS).

---

## 25. tsconfig.json Essentials

- `strict`: enables all strict type-checking options.
- `target`: ES version to compile to (e.g., `ES2020`).
- `module`: module system (`commonjs`, `esnext`, etc.).
- `lib`: type definitions to include (e.g., `DOM`, `ES2021`).
- `outDir`, `rootDir`: output and source directory structure.
- `skipLibCheck`: skip type checking of `.d.ts` files (faster builds).

Example:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"]
}
```

Interview Qs:
- Q: What does `strict` mode enable? A: `strictNullChecks`, `noImplicitAny`, `strictFunctionTypes`, and more.
- Q: Why use `esModuleInterop`? A: Allows default imports from CommonJS modules and improves compatibility.

---

## 26. Common Interview Questions (Comprehensive List)

- Difference between `type` and `interface`.
- Explain structural typing.
- Union vs intersection types and example use-cases.
- `unknown` vs `any` vs `never` vs `void`.
- How do mapped types work? (brief: transform properties via `in` over keys)
- How to extract the return type of a function? (`ReturnType<T>`)
- How to create a type-safe `get` function for object properties? (see generics example)
- Explain `keyof` and `typeof` operators.
- What are discriminated unions?
- Difference between `enum` and string literal union types?
- What is `infer` and where is it used?
- How do you handle circular type references?
- What is declaration merging?
- Difference between abstract class and interface?
- When to use `readonly` vs `Readonly<T>`?
- How to type `this` in methods?
- What are function overloads and when to use them?
- Explain `satisfies` operator (TS 4.9+).

---

## 27. Useful Code Examples (Copy & run)

### Example 1: Generic `get` with `keyof` (safe property access)

```ts
function getPropSafe<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const obj = { a: 1, b: 'x' };
const v = getPropSafe(obj, 'b'); // typed as string
```

### Example 2: Discriminated union and exhaustive check

```ts
type A = { kind: 'a'; a: number };
type B = { kind: 'b'; b: string };

function handle(x: A | B) {
  switch (x.kind) {
    case 'a': return x.a;
    case 'b': return x.b;
    default: {
      const _exhaustive: never = x; // if a new kind is added, this will fail
      return _exhaustive;
    }
  }
}
```

### Example 3: Utility types example

```ts
interface Todo { id: number; title: string; done: boolean }

type TodoPreview = Pick<Todo, 'id' | 'title'>;
const t: TodoPreview = { id: 1, title: 'Wash car' };
```

### Example 4: Typed async function

```ts
async function fetchNumber(): Promise<number> {
  return 42;
}

fetchNumber().then(n => console.log(n));
```

### Example 5: Custom type guard with union narrowing

```ts
interface Cat { type: 'cat'; meow: () => void }
interface Dog { type: 'dog'; bark: () => void }

type Pet = Cat | Dog;

function isCat(pet: Pet): pet is Cat {
  return pet.type === 'cat';
}

function handlePet(pet: Pet) {
  if (isCat(pet)) {
    pet.meow(); // TypeScript knows it's Cat
  } else {
    pet.bark(); // TypeScript knows it's Dog
  }
}
```

### Example 6: Conditional type with `infer`

```ts
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function foo() { return { x: 10 }; }
type FooReturn = GetReturnType<typeof foo>; // { x: number }
```

### Example 7: Real-World API Client with TypeScript

Complete example showing multiple TypeScript concepts in action:

```ts
// ============ Type Definitions ============

// API Response wrapper
type ApiResponse<T> = 
  | { status: 'success'; data: T; timestamp: number }
  | { status: 'error'; error: string; code: number };

// User domain model
interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'guest';
  createdAt: Date;
  updatedAt: Date;
}

// DTOs (Data Transfer Objects)
type CreateUserDto = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateUserDto = Partial<CreateUserDto>;
type UserResponseDto = Omit<User, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

// ============ Generic API Client ============

class ApiClient {
  constructor(private baseUrl: string) {}

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, options);
      const data = await response.json();
      
      if (!response.ok) {
        return {
          status: 'error',
          error: data.message || 'Request failed',
          code: response.status
        };
      }
      
      return {
        status: 'success',
        data: data as T,
        timestamp: Date.now()
      };
    } catch (error) {
      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        code: 500
      };
    }
  }

  // Generic CRUD operations
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T, D = unknown>(
    endpoint: string,
    data: D
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }

  async put<T, D = unknown>(
    endpoint: string,
    data: D
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }

  async delete<T = void>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// ============ Repository Pattern ============

interface Repository<T, CreateDto, UpdateDto> {
  getAll(): Promise<ApiResponse<T[]>>;
  getById(id: string): Promise<ApiResponse<T>>;
  create(data: CreateDto): Promise<ApiResponse<T>>;
  update(id: string, data: UpdateDto): Promise<ApiResponse<T>>;
  delete(id: string): Promise<ApiResponse<void>>;
}

class UserRepository implements Repository<User, CreateUserDto, UpdateUserDto> {
  constructor(private client: ApiClient) {}

  async getAll(): Promise<ApiResponse<User[]>> {
    return this.client.get<User[]>('/users');
  }

  async getById(id: string): Promise<ApiResponse<User>> {
    return this.client.get<User>(`/users/${id}`);
  }

  async create(data: CreateUserDto): Promise<ApiResponse<User>> {
    return this.client.post<User, CreateUserDto>('/users', data);
  }

  async update(id: string, data: UpdateUserDto): Promise<ApiResponse<User>> {
    return this.client.put<User, UpdateUserDto>(`/users/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    return this.client.delete<void>(`/users/${id}`);
  }
}

// ============ Type Guards ============

function isSuccessResponse<T>(
  response: ApiResponse<T>
): response is Extract<ApiResponse<T>, { status: 'success' }> {
  return response.status === 'success';
}

function isErrorResponse<T>(
  response: ApiResponse<T>
): response is Extract<ApiResponse<T>, { status: 'error' }> {
  return response.status === 'error';
}

// ============ Usage Example ============

async function example() {
  const client = new ApiClient('https://api.example.com');
  const userRepo = new UserRepository(client);

  // Create user
  const createResult = await userRepo.create({
    email: 'alice@example.com',
    name: 'Alice',
    role: 'user'
  });

  if (isSuccessResponse(createResult)) {
    console.log('User created:', createResult.data);
    const userId = createResult.data.id;

    // Update user
    const updateResult = await userRepo.update(userId, {
      name: 'Alice Smith'
    });

    if (isSuccessResponse(updateResult)) {
      console.log('User updated:', updateResult.data);
    }
  } else {
    console.error('Failed to create user:', createResult.error);
  }

  // Get all users
  const allUsers = await userRepo.getAll();
  if (isSuccessResponse(allUsers)) {
    allUsers.data.forEach(user => {
      console.log(`${user.name} (${user.role})`);
    });
  }
}

// This example demonstrates:
// ✅ Generics (ApiClient, Repository, ApiResponse)
// ✅ Discriminated unions (ApiResponse)
// ✅ Utility types (Omit, Partial)
// ✅ Type guards (isSuccessResponse)
// ✅ Interfaces for contracts
// ✅ Async/await with Promise types
// ✅ Type-safe API layer
```

---

## 28. Tips & Best Practices

### Type Safety Best Practices

1. **Prefer `unknown` over `any`** when dealing with external inputs
   ```ts
   // Bad
   function processData(data: any) { /* ... */ }
   
   // Good
   function processData(data: unknown) {
     if (typeof data === 'object' && data !== null) {
       // narrow before use
     }
   }
   ```

2. **Always annotate public APIs** - Keep internal helper functions inference-friendly
   ```ts
   // Public API - explicit annotation
   export function calculateTotal(items: Item[]): number { /* ... */ }
   
   // Internal helper - inference OK
   function sumPrices(items: Item[]) {
     return items.reduce((sum, item) => sum + item.price, 0);
   }
   ```

3. **Use `strictNullChecks`** - Catch null/undefined errors at compile time
   ```ts
   // With strictNullChecks, this won't compile
   function getLength(str: string) {
     return str.length;
   }
   
   // getLength(null); // Error!
   
   // Better
   function getLength(str: string | null): number {
     return str?.length ?? 0;
   }
   ```

4. **Prefer `as const` for literal values** to get precise types
   ```ts
   // Type: string[]
   const colors1 = ['red', 'blue', 'green'];
   
   // Type: readonly ['red', 'blue', 'green']
   const colors2 = ['red', 'blue', 'green'] as const;
   ```

5. **Use discriminated unions** for state machines and complex state
   ```ts
   type State =
     | { status: 'loading' }
     | { status: 'success'; data: string }
     | { status: 'error'; error: Error };
   ```

6. **Leverage utility types** instead of duplicating types
   ```ts
   // Bad - duplication
   type UserCreate = { name: string; email: string; password: string };
   type UserUpdate = { name?: string; email?: string; password?: string };
   
   // Good - reuse
   type User = { id: string; name: string; email: string; password: string };
   type UserCreate = Omit<User, 'id'>;
   type UserUpdate = Partial<UserCreate>;
   ```

7. **Always enable `strict` mode** in tsconfig.json for production
   ```json
   {
     "compilerOptions": {
       "strict": true
     }
   }
   ```

8. **Validate external data at runtime** - Types are compile-time only
   ```ts
   // Types don't exist at runtime - validate with libraries like zod
   import { z } from 'zod';
   
   const UserSchema = z.object({
     id: z.number(),
     name: z.string(),
     email: z.string().email()
   });
   
   function processUser(data: unknown) {
     const user = UserSchema.parse(data); // throws if invalid
     // Now user is type-safe
   }
   ```

### Code Organization

9. **Use interfaces for object shapes**, type for everything else
10. **Organize types near their usage** - colocate related types
11. **Create a `types/` folder** for shared types across modules
12. **Use index signatures sparingly** - prefer mapped types or Record

### Performance Tips

13. **Prefer `type` over `interface` for performance** in large projects (marginal)
14. **Use `const enum`** when you need enum behavior but want zero runtime cost
15. **Avoid deep nesting** - flatten complex types when possible
16. **Use `skipLibCheck`** to speed up compilation (skip checking `.d.ts` files)

### Common Pitfalls to Avoid

17. **Don't use `any`** unless absolutely necessary (escape hatch)
18. **Don't disable strict checks** without good reason
19. **Don't use `as` assertions** unless you're certain (prefer type guards)
20. **Don't forget `return` type annotations** on public functions
21. **Don't mix enum with const enum** in same codebase (consistency)
22. **Avoid `namespace` in modern code** - use ES modules instead

---

## 29. Advanced Topics to Explore Further

- **Variance** (covariance, contravariance, bivariance in function types)
- **Branded/Nominal types** (simulate nominal typing with branded primitives)
- **Recursive types** (e.g., JSON type definition)
- **Const assertions with satisfies** (TS 4.9+)
- **Distributive vs non-distributive conditional types**
- **Module augmentation** (extending external library types)
- **Triple-slash directives** (`/// <reference path="..." />`)

---

## 30. Quick Reference Commands

```powershell
# Install TypeScript globally
npm install -g typescript

# Compile single file
tsc file.ts

# Watch mode
tsc --watch

# Initialize tsconfig.json
tsc --init

# Type-check without emitting files
tsc --noEmit

# Run TypeScript directly (requires ts-node)
npm install -g ts-node
ts-node file.ts
```

---

## Summary

This comprehensive revision guide covers **all essential TypeScript concepts for interviews and professional work**:

### Core Foundations
- ✅ **Primitives & Type Inference** - All 7 primitive types, when to infer vs annotate
- ✅ **Functions** - Parameter/return annotations, optional params, rest/spread, contextual typing, overloads
- ✅ **Objects** - Object types, interfaces, type aliases, structural typing, index signatures

### Type System Features
- ✅ **Unions & Intersections** - Combining types, discriminated unions, type narrowing techniques
- ✅ **Literal Types** - String/number literals, `as const`, type widening
- ✅ **Type Assertions** - `as` syntax, non-null assertion `!`, when to use
- ✅ **Arrays & Tuples** - Array types, readonly arrays, fixed-length tuples, spread in tuples

### Advanced Types
- ✅ **Generics** - Generic functions/classes/interfaces, constraints, `keyof` pattern, default types
- ✅ **Utility Types** - Partial, Required, Readonly, Pick, Omit, Record, ReturnType, Parameters, Extract, Exclude, Awaited
- ✅ **Mapped Types** - Property transformation, key remapping with `as`, filtering, recursive types
- ✅ **Conditional Types** - `T extends U ? X : Y`, distributive types, `infer` keyword
- ✅ **Template Literal Types** - String manipulation at type level

### Object-Oriented Programming
- ✅ **Classes** - Properties, methods, constructors, getters/setters, parameter properties
- ✅ **Access Modifiers** - public, private, protected, readonly, static members
- ✅ **Inheritance** - extends, super, method overriding
- ✅ **Abstract Classes** - Abstract methods and implementations
- ✅ **Interfaces for Classes** - Implementing contracts, multiple interfaces

### Special Types & Features
- ✅ **Special Types** - `any`, `unknown`, `never`, `void`, nullable types
- ✅ **Type Guards** - typeof, instanceof, in, user-defined predicates
- ✅ **Enums** - Numeric, string, const enums, when to use vs unions
- ✅ **Declaration Merging** - Extending interfaces, ambient declarations
- ✅ **Modules & Namespaces** - ES modules, import/export patterns

### Configuration & Tooling
- ✅ **tsconfig.json** - strict mode, target, module, lib, compiler options
- ✅ **Decorators** - Class/method/property decorators (experimental)
- ✅ **Best Practices** - 22 tips for writing production TypeScript

### Interview Preparation
- ✅ **100+ Interview Questions with Answers** - Covering all major topics
- ✅ **7 Runnable Code Examples** - From basics to real-world API client
- ✅ **Real-World Patterns** - Repository pattern, type-safe APIs, discriminated unions

### What Makes This Complete for Jobs/Interviews:
1. **Comprehensive Coverage** - All topics commonly asked in TypeScript interviews
2. **Practical Examples** - Real-world code you can run and modify
3. **Interview Q&A** - Specific questions with detailed answers
4. **Best Practices** - Production-ready patterns and tips
5. **Advanced Topics** - Mapped types, conditional types, advanced generics
6. **Modern TypeScript** - Latest features (template literals, satisfies, etc.)

---

## How to Use This Guide

**For Quick Revision:**
- Read section summaries and interview questions
- Run code examples to refresh understanding
- Focus on areas you're less confident about

**For Interview Prep:**
- Practice explaining concepts out loud
- Write code examples from memory
- Review common interview questions thoroughly
- Understand the "why" behind patterns, not just syntax

**For Learning:**
- Work through examples in order
- Modify code to experiment
- Create your own examples applying concepts
- Build small projects using patterns shown

---

**Practice Commands:**

```powershell
# Create a practice file
New-Item practice.ts

# Run with ts-node (install if needed)
npm install -g ts-node typescript
ts-node practice.ts

# Or compile and run
tsc practice.ts
node practice.js

# Watch mode for continuous compilation
tsc --watch practice.ts
```

---

**You're ready for TypeScript interviews and professional TypeScript development!** 

Focus on understanding concepts deeply, practice writing type-safe code, and be prepared to explain your type decisions clearly during interviews.

---

*Generated from the `Ts` folder examples on November 28, 2025.*  
*File path: `d:\Coding\Development\Tutorials\Typescript\Ts\TS_Revision_Notes.md`*
