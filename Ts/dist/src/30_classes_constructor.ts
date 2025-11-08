class UserN5{
    id:string;
    name:string;
    email?:string;
    createdAt:Date=new Date(); // init at declaration

    constructor(id:string,name:string,email?:string){
        this.id=id;
        this.name=name;
        if(email)this.email=email;
    }
}

const result4= new UserN5('u1','aditya');
console.log(result4);

const result5=new UserN5('u2','name2','email2@example.com');

class Bad{
    a:string;
    constructor(){
        // Error: Property 'a' has no initializer and is not definitely assigned in the constructor.
        this.a="initialized in constructor";
    }
}
