const BASE = "http://localhost:7070/api" ;
export async function loginUser(Username , password , role) {
    const res = await fetch(`${BASE}/login`,{
        methode : "POST",
        headers : {"content-Type":"application/json"},
        body : JSON.stringify({Username,password,role}),
    }) ;
    return res.json();
}
export async function  registerUser(Username , password , role) {
    const res = await fetch(`${BASE}/register`,{
        methode : "POST",
        headers : {"content-Type":"application/json"},
        body : JSON.stringify({Username,password,role}),
    }) ;
    return res.json();
}