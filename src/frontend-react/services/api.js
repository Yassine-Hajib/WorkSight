const BASE = "http://localhost:7070/api";

const req = (method, url, body) => fetch(`${BASE}${url}`, {
    method,
    headers: { "Content-Type": "application/json" },
    ...(body ? { body: JSON.stringify(body) } : {})
}).then(r => r.json());

export const loginUser       = (userName, password, role) =>
    req("POST", "/login", { userName, password, role });

export const registerUser    = (userName, password, role) =>
    req("POST", "/register", { userName, password, role });

export const getStats        = (mid)        => req("GET",  `/manager/${mid}/stats`);
export const getEmployees    = (mid)        => req("GET",  `/manager/${mid}/employees`);
export const addEmployee     = (mid, data)  => req("POST", `/manager/${mid}/employees`, data);
export const updateEmployee  = (id, data)   => req("PUT",  `/employees/${id}`, data);
export const deleteEmployee  = (id)         => req("DELETE",`/employees/${id}`);
export const getTasks        = (mid)        => req("GET",  `/manager/${mid}/tasks`);
export const addTask         = (mid, data)  => req("POST", `/manager/${mid}/tasks`, data);
export const getMyTasks      = (eid)        => req("GET",  `/employee/${eid}/tasks`);
export const updateTaskStatus = (id, status)=> req("PUT",  `/tasks/${id}/status`, { statusTask: status });
export const deleteTask      = (id)         => req("DELETE",`/tasks/${id}`);