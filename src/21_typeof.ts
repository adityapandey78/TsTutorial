

function describeTypeOf(x:unknown){
    if(typeof x==='string'){
        return `This is a string with length ${x.length}`;
    }else if(typeof x==='number'){
        return `${x} is a number with value ${x}`;
    }else {
        return `This is of type ${typeof x}`;
    }
}

console.log(
    "\n" + describeTypeOf("\nhi"),
    "\n" + describeTypeOf(23),
    "\n" + describeTypeOf(true),
    "\n" + describeTypeOf({}),
    "\n" + describeTypeOf(null),
    "\n" + describeTypeOf(undefined),
    "\n" + describeTypeOf(Symbol('sym')),
    "\n" + describeTypeOf(function(){})
);

function info(z:unknown){
    if(Array.isArray(z)){
        return `This is an array of length ${z.length}`;
    }else if(z instanceof Date){
        return `This is a date with value ${z.toISOString()}`;
    }else if(z instanceof Error){
        return `This is an error with message: ${z.message}`;
    }else {
        return `${z} is of type ${typeof z}`;
    }
}

console.log(
    "\n"+info([1,2,3,4,5]),
    "\n"+info(new Date()),
    "\n"+info(new Error('Opps ! Error occurred')),
    "\n"+info({x:1}),
);
