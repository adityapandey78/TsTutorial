const raw='{"id":1,"name":"Ad"}';

// here we are asseting teh type after parse which is bad appraod
const riskyUser= JSON.parse(raw) as {id:number;name:string}
console.log(riskyUser.name);

//: Better appraoch
type user22={
    id:number,
    name:string
}

/// While handling teh APi or JSON we may be required to do this
//: Better way to use that

function isUser(v:unknown):v is user22{
    return(
        typeof v ==='object' && v!== null && "id" in v &&
        typeof (v as any).id=== "number" && "name" in v && 
        typeof(v as any).name ==='string'
    )
}
// Added extra type checking for the value and kept it unknow initiallly
const maybe = JSON.parse(raw) as unknown;
if(isUser(maybe)){
    console.log(maybe.name); //safe
    
}
// This method is safe andbetter to use
