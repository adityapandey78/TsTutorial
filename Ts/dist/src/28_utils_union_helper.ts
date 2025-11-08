// Exclude<U,V> - removes from U those types that are assignable to V
// Extract<U,V> - keeps from U those types that are assignable to V
//NonNullable<T> - removes null and undefined from T

type Eventtype1='click'|'scroll'|'mousemove'|'keydown'|'keyup';
type MouseEventtype0=Exclude<Eventtype1,'keydown'>;

function handleEvenet(e:MouseEventtype0){
    console.log(e);
    
}

handleEvenet('click');
// handleEvenet('keydown'); // Error

type ActionsN1="create"|"update"|"delete"|"read";
type WriteActionsN1=Extract<ActionsN1,"create"|"update"|"delete">;

function performActionN1(action:WriteActionsN1){
    console.log(`Performing action: ${action}`);
}
handleEvenet('scroll');
performActionN1('update');
// performActionN1('read'); // Error

type MayBeNumber = number | null | undefined;
type DefinitelyNumber = NonNullable<MayBeNumber>;

function processNumberN1(value:DefinitelyNumber){
    console.log(`Processing number: ${value}`);
}
processNumberN1(42);
// processNumberN1(null); // Error
// processNumberN1(undefined); // Error