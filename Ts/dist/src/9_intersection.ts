// Value should be both from A and from B
type inter1={id:string};
type inter2={createdAt:Date};
type Entity= inter1 & inter2;

const e:Entity={id:'e1',createdAt:new Date()};


/// We cant have same property types
type NumberHolderUnique={a:number}
type StringHolderunique={a:string}

// type NumStringMix= NumberHolderUnique & StringHolderunique;

