//? When will we be using types

//object shaped-> similar to interfaces
//union types (A|B)
//intersection types (A & B)

type person = {
    id: number;
    addess: string;
    salary: number;
};
const person1: person = {
    id: 1,
    addess: "123 Main St",
    salary: 50000,
};
type Status='new'|'paid'|'pending';

function nextActionCheck(s:Status):string{
    switch(s){
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

type ToMerge1={price:number};
type ToMerge2={qty:number};

type Merged=ToMerge1 & ToMerge2;
const order:Merged={price:100,qty:2};
console.log(order);
