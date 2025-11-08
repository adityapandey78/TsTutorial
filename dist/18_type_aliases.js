//? When will we be using types
const person1 = {
    id: 1,
    addess: "123 Main St",
    salary: 50000,
};
function nextActionCheck(s) {
    switch (s) {
        case 'new':
            return 'send welcome email';
        case 'paid':
            return 'prepare for delivery';
        case 'pending':
            return 'send payment reminder';
        default:
            return 'unknown status';
    }
}
const order = { price: 100, qty: 2 };
console.log(order);
export {};
