let title = "intro";
// title=undefined // we cant make title as undefined we will use as string
//? Union
let susbtitle = "intro";
susbtitle = undefined;
//? CallBack Types
// void: used for funtion doesn't return a useful valye
function log(msg) {
    console.log(msg);
}
log("hello");
//* It will never return anything
function fail(msg) {
    throw new Error();
}
export {};
//! Any:
// DO not use Any , try to avoid it as much as possib;e
