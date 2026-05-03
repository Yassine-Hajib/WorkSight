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
            int managerId = Integer.parseInt(ctx.pathParam("managerId"));
            ctx.json(empDAO.getByManager(managerId));
        } catch (Exception e) {
            ctx.status(500).json(Map.of("success", false, "message", e.getMessage()));
        }
    }


    public void add(Context ctx) {
        try {
            int managerId = Integer.parseInt(ctx.pathParam("managerId"));
            Map<String, String> body = ctx.bodyAsClass(Map.class);

            String employeName  = body.get("employeName");
            String emailEmploye = body.get("emailEmploye");
            String password     = body.get("password");
            String role         = body.getOrDefault("role", "EMPLOYEE");

            if (employeName == null || emailEmploye == null || password == null) {
                ctx.status(400).json(Map.of("success", false, "message", "All fields are required"));
                return;
            }

            Employee emp = new Employee();
            emp.setEmployeName(employeName);
            emp.setEmailEmploye(emailEmploye);
            emp.setStatus("Offline");
            emp.setManagerId(managerId);

            boolean ok = empDAO.add(emp, password, role);
            ctx.status(ok ? 201 : 500).json(Map.of("success", ok));
        } catch (Exception e) {
            ctx.status(500).json(Map.of("success", false, "message", e.getMessage()));
        }
    }





    public void update(Context ctx) {
        try {
            int id = Integer.parseInt(ctx.pathParam("id"));
            Map<String, String> body = ctx.bodyAsClass(Map.class);
            Employee emp = new Employee();
            emp.setEmployeesId(id);
            emp.setEmployeName(body.get("employeName"));
            emp.setEmailEmploye(body.get("emailEmploye"));
            emp.setStatus(body.getOrDefault("status", "Offline"));
            boolean ok = empDAO.update(emp);
            ctx.json(Map.of("success", ok));
        } catch (Exception e) {
            ctx.status(500).json(Map.of("success", false, "message", e.getMessage()));
        }
    }

    public void delete(Context ctx) {
        try {
            int id = Integer.parseInt(ctx.pathParam("id"));
            boolean ok = empDAO.delete(id);
            ctx.json(Map.of("success", ok));
        } catch (Exception e) {
            ctx.status(500).json(Map.of("success", false, "message", e.getMessage()));
        }
    }

    public void getStats(Context ctx) {
        try {
            int managerId = Integer.parseInt(ctx.pathParam("managerId"));
            int totalEmployees = empDAO.countByManager(managerId);
            int totalTasks     = taskDAO.countByManager(managerId);
            int completed      = taskDAO.countByStatus(managerId, "Completed");
            int pending        = taskDAO.countByStatus(managerId, "Pending");
            int inProgress     = taskDAO.countByStatus(managerId, "In Progress");
            int productivity   = totalTasks > 0 ? (completed * 100 / totalTasks) : 0;
            ctx.json(Map.of(
                    "totalEmployees", totalEmployees,
                    "totalTasks",     totalTasks,
                    "completed",      completed,
                    "pending",        pending,
                    "inProgress",     inProgress,
                    "productivity",   productivity
            ));
        } catch (Exception e) {
            ctx.status(500).json(Map.of("success", false, "message", e.getMessage()));
        }
    }
}