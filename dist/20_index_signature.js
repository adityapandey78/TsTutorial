// what is index signature and where to use it?
// index signature is used to define the type of properties that are not known at the time of writing the code
// it is mainly used when we want to create a dictionary like object where the keys are not known in advance
// but the type of the values are known
//eg:we want to create an object that stores the scores of students in a class
const numberDict = {
    one: 1,
    two: 2,
    three: 3
};
const counters = {};
counters['apples'] = 0;
counters['oranges'] = 10;
console.log(counters);
const mm = {
    likes: 100,
    dislikes: 10,
    views: 1000
};
//we can also use Maps
const priceMap = new Map();
priceMap.set('apple', 1.2);
const lm = {};
lm['banana'] = 0.8;
lm['mango'] = undefined;
export {};
