package com.worksight.controller;

import com.worksight.dao.EmployeeDAO;
import com.worksight.dao.TaskDAO;
import com.worksight.model.Employee;
import io.javalin.http.Context;
import java.util.Map;

public class EmployeeController {

    private final EmployeeDAO empDAO  = new EmployeeDAO();
    private final TaskDAO     taskDAO = new TaskDAO();

    public void getAll(Context ctx) {
        try {
            int mid = Integer.parseInt(ctx.pathParam("managerId"));
            ctx.json(empDAO.getByManager(mid));
        } catch (Exception e) {
            ctx.status(500).json(Map.of("success", false, "message", e.getMessage()));
        }
    }

    public void add(Context ctx) {
        try {
            int mid = Integer.parseInt(ctx.pathParam("managerId"));
            Map<String,String> body = ctx.bodyAsClass(Map.class);
            String name     = body.get("employeName");
            String email    = body.get("emailEmploye");
            String password = body.get("password");
            String role     = body.getOrDefault("role", "EMPLOYEE");

            if (name==null||name.isEmpty()||email==null||email.isEmpty()||
                    password==null||password.length()<4) {
                ctx.status(400).json(Map.of("success", false,
                        "message", "Nom, email et mot de passe (min 4 car.) requis"));
                return;
            }

            Employee emp = new Employee();
            emp.setEmployeName(name);
            emp.setEmailEmploye(email);
            emp.setManagerId(mid);
            boolean ok = empDAO.add(emp, password, role);
            ctx.status(ok ? 201 : 500).json(Map.of("success", ok));
        } catch (Exception e) {
            ctx.status(500).json(Map.of("success", false, "message", e.getMessage()));
        }
    }

    public void update(Context ctx) {
        try {
            int id = Integer.parseInt(ctx.pathParam("id"));
            Map<String,String> body = ctx.bodyAsClass(Map.class);
            Employee emp = new Employee();
            emp.setEmployeesId(id);
            emp.setEmployeName(body.get("employeName"));
            emp.setEmailEmploye(body.get("emailEmploye"));
            emp.setStatus(body.getOrDefault("status", "Offline"));
            ctx.json(Map.of("success", empDAO.update(emp)));
        } catch (Exception e) {
            ctx.status(500).json(Map.of("success", false, "message", e.getMessage()));
        }
    }

    public void delete(Context ctx) {
        try {
            int id = Integer.parseInt(ctx.pathParam("id"));
            ctx.json(Map.of("success", empDAO.delete(id)));
        } catch (Exception e) {
            ctx.status(500).json(Map.of("success", false, "message", e.getMessage()));
        }
    }

    public void getStats(Context ctx) {
        try {
            int mid        = Integer.parseInt(ctx.pathParam("managerId"));
            int total      = empDAO.countByManager(mid);
            int totalTasks = taskDAO.countByManager(mid);
            int completed  = taskDAO.countByStatus(mid, "Completed");
            int inProgress = taskDAO.countByStatus(mid, "In Progress");
            int pending    = taskDAO.countByStatus(mid, "Pending");
            int prod       = totalTasks > 0 ? (completed * 100 / totalTasks) : 0;
            ctx.json(Map.of(
                    "totalEmployees", total,
                    "totalTasks",     totalTasks,
                    "completed",      completed,
                    "inProgress",     inProgress,
                    "pending",        pending,
                    "productivity",   prod
            ));
        } catch (Exception e) {
            ctx.status(500).json(Map.of("success", false, "message", e.getMessage()));
        }
    }
}