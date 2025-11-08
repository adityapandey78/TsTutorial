


const ROLES=["admin","user","operator"] as const;
// derive an union form teh array
type Role=(typeof ROLES)[number];

function setRole(r:Role){
    console.log(r);
    
}

setRole("user");
// setRole("use1");//will show error
//since const set hai toh wese hi rhega