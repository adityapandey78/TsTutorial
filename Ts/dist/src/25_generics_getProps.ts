type userN7={
    id:string;
    name:string;
    email?:string; //T['email]
}
function getuserPropN7<T,K extends keyof T>(objN7:T,keyN7:K):T[K]{
    return objN7[keyN7]
}

const uN7:userN7={
    id:'u1',name:'myname'
}
const idvalN7=getuserPropN7(uN7,'id');
console.log(idvalN7);


function setUserPropsN7<T,K extends keyof T>(
    objN7:T,keyN7:K,newVal:T[K]):void{
        objN7[keyN7]=newVal;
    }

    setUserPropsN7(uN7,'name','aditya');

    console.log(uN7.name);
    
    