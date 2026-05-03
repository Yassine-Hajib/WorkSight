const BASE = "http://localhost:7070/api";

export async function loginUser(userName, password, role) {
    const res = await fetch(`${BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password, role }),
    });
    return res.json();
}

export async function registerUser(userName, password, role) {
    const res = await fetch(`${BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password, role }),
    });
    return res.json();
}

export async function getStats(managerId) {
    const res = await fetch(`${BASE}/manager/${managerId}/stats`);
    return res.json();
}

export async function getEmployees(managerId) {
    const res = await fetch(`${BASE}/manager/${managerId}/employees`);
    return res.json();
}

export async function addEmployee(managerId, data) {
    const res = await fetch(`${BASE}/manager/${managerId}/employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function updateEmployee(id, data) {
    const res = await fetch(`${BASE}/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function deleteEmployee(id) {
    const res = await fetch(`${BASE}/employees/${id}`, { method: "DELETE" });
    return res.json();
}

export async function getTasks(managerId) {
    const res = await fetch(`${BASE}/manager/${managerId}/tasks`);
    return res.json();
}

export async function addTask(managerId, data) {
    const res = await fetch(`${BASE}/manager/${managerId}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function updateTaskStatus(id, statusTask) {
    const res = await fetch(`${BASE}/tasks/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statusTask }),
    });
    return res.json();
}

export async function deleteTask(id) {
    const res = await fetch(`${BASE}/tasks/${id}`, { method: "DELETE" });
    return res.json();
}