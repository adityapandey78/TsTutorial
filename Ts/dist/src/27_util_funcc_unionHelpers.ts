// ReturnType<F>
// Parameters<F>
//InstanceType<Ctor>
// ConstructorParameter<C>


function ExtractuserInfo(id:string,isExtraInfo=false){
    return {
    id:'a',
    name:'aditya',
    log:isExtraInfo?"details":(undefined as string|undefined)}

}

type GetUserReturnInfo= ReturnType<typeof ExtractuserInfo>
type GetUserParamsInfo= Parameters<typeof ExtractuserInfo>


const argsInfo:GetUserParamsInfo=['u1',true]
const resultInfo:GetUserReturnInfo= ExtractuserInfo(...argsInfo)
console.log(resultInfo);

class PersonN1{
    constructor(public name: string, public age:number){}
    greet(){
        return `Hi I am this->${this.name}`
    }
}

type PersonInstance=InstanceType<typeof PersonN1>
type PersonCtorArgsN1= ConstructorParameters<typeof PersonN1>

const resultInfo1:PersonCtorArgsN1=['aditya',29];
const abc:PersonInstance= new PersonN1(...resultInfo1);

console.log(abc.greet());
console.log(resultInfo1);

