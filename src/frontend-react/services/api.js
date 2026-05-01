const BASE = "http://localhost:8080/api";

export async function loginUser(userName, password, role) {
    const res = await fetch(`${BASE}/login`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ userName, password, role }),
    });
    return res.json();
}

export async function registerUser(userName, password, role) {
    const res = await fetch(`${BASE}/register`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ userName, password, role }),
    });
    return res.json();
}