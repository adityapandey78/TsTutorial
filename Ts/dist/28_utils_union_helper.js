// Exclude<U,V> - removes from U those types that are assignable to V
// Extract<U,V> - keeps from U those types that are assignable to V
//NonNullable<T> - removes null and undefined from T
function handleEvenet(e) {
    console.log(e);
}
handleEvenet('click');
function performActionN1(action) {
    console.log(`Performing action: ${action}`);
}
handleEvenet('scroll');
performActionN1('update');
function processNumberN1(value) {
    console.log(`Processing number: ${value}`);
}
processNumberN1(42);
export {};
// processNumberN1(null); // Error
// processNumberN1(undefined); // Error
