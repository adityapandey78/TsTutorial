import { use, useState } from "react";

export function Counter(){
    const [count,setCount]= useState<number>(0);

    return(
        <div>
            {count}
        </div>
    )
}
//We wil use union here
type LoadState=|{status:'idle'}
|{status:'loading'}
|{status:'success'; data:string}
|{status:'error'; message:string}

function heavyDefault():number{
    return 100;
}
type user={
    name:string
}
export function LoaderDemo(){

    const [state,setState]= useState<LoadState>({status:'idle'});
    const [n,setN]=useState<number>(()=>heavyDefault());

    const [user,setuser]= useState<user|null>(null)

    async function fetchData(){
        setState({status:'loading'});

        // after Api call
        setState({status:'success',data:'fetched'})

        //catch 
        setState({status:'error',message:'Failed to fetch'})
    }
    return(
        <div>Loader</div>
    )
}