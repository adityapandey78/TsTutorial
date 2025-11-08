function getuserPropN7(objN7, keyN7) {
    return objN7[keyN7];
}
const uN7 = {
    id: 'u1', name: 'myname'
};
const idvalN7 = getuserPropN7(uN7, 'id');
console.log(idvalN7);
function setUserPropsN7(objN7, keyN7, newVal) {
    objN7[keyN7] = newVal;
}
setUserPropsN7(uN7, 'name', 'aditya');
console.log(uN7.name);
export {};
