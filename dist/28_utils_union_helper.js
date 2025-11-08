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
export {};
// performActionN1('read'); // Error
