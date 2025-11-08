
// what is index signature and where to use it?
// index signature is used to define the type of properties that are not known at the time of writing the code
// it is mainly used when we want to create a dictionary like object where the keys are not known in advance
// but the type of the values are known
//eg:we want to create an object that stores the scores of students in a class

interface Scores {
    [studentName: string]: number; // index signature
}


type NumberDict={[k:string]:number};

const numberDict:NumberDict={
    one:1,
    two:2,
    three:3
};

const counters:NumberDict={};
counters['apples']=0;
counters['oranges']=10;
console.log(counters);

//? Record
 type Metrices= Record<'likes'|'dislikes'|'views',number>;

 const mm:Metrices={
    likes:100,
    dislikes:10,
    views:1000
 };

 //we can also use Maps
 const priceMap= new Map<string,number>();
 priceMap.set('apple',1.2);

 type LooseMap= Record<string,number|undefined>;
 const lm:LooseMap={};
 lm['banana']=0.8;
 lm['mango']=undefined;