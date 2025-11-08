//Union is like value can be this or that
//value -> this OR that

function printId(id:string|number){
    // console.log(id.toUpperCase());// this will sow eror coz teh ts does know what's the type of id is yet

    //: Will do additional check to get that'
    if(typeof id==='string'){
        console.log(id.toUpperCase());
    }else{
        console.log(id.toFixed(2));
    }

    
}
printId(5);
printId("five");

//: Object Union

type Admin={role:'Admin',permission:string[]};
type Customer={role:'Customer',loyaltyPoints:number};

function describeUser(u:Admin |Customer){
    if(u.role==='Admin'){
        console.log(u.permission);
    }else{
        console.log(u.loyaltyPoints);
    }
}

//: in operator
function describeUserWithInOperator(u:Admin|Customer){
    if('permissions' in u){
        console.log(u.role,'Admin User');
    } else{
        console.log("I am the customer");
    }
}

//: Array of union and union of arrays

const arrOfUnions:(string|number)[]=["a",1,"b",2,"c",3];

const UnionOfArrays: string[]|number[] =Math.random()>0.1?["x","y"]:[1,2]; //either string or numbwr

