type GreetProps={
    name?:string;
    shout?:boolean;
}

export function GreetA({name='guest',shout=false}:GreetProps){
    const text=shout?name.toUpperCase():name;
    return(
        <>
        <p>Hiiii {text}</p>
        </>
    )
}
/**
 * We always need to shape our data or react does not know what is what  
 */

export function GreetB(props: GreetProps){
    const name= props.name??'Guest';
    const shout=props.shout??false;
    const text=shout?name.toLocaleLowerCase():name;
    return(
        <>
        <p>Hiiii {text}</p>
        </>
    )
}