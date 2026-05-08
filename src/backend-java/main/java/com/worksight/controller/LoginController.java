package com.worksight.controller;

import com.worksight.dao.EmployeeDAO;
import com.worksight.dao.ManagerDAO;
import com.worksight.model.Employee;
import com.worksight.model.User;
import com.worksight.service.UserService;
import io.javalin.http.Context;
import java.util.Map;

public class LoginController {

    private final UserService userService = new UserService();
    private final ManagerDAO  managerDAO  = new ManagerDAO();
    private final EmployeeDAO employeeDAO = new EmployeeDAO();

    public void login(Context ctx) {
        try {
            Map<String,String> body = ctx.bodyAsClass(Map.class);
            User user = userService.login(
                    body.get("userName"),
                    body.get("password"),
                    body.get("role")
            );
            if (user == null) {
                ctx.status(401).json(Map.of("success", false,
                        "message", "Identifiants incorrects"));
                return;
            }
            int managerId  = -1;
            int employeeId = -1;

            if ("MANAGER".equals(user.getRoleUser())) {
                managerId = managerDAO.getManagerIdByUserId(user.getUserId());
                // Auto-create manager profile if missing
                if (managerId == -1) {
                    managerDAO.createManager(user.getUserName(), "", "", user.getUserId());
                    managerId = managerDAO.getManagerIdByUserId(user.getUserId());
                }
            } else {
                Employee emp = employeeDAO.getByUserId(user.getUserId());
                if (emp != null) employeeId = emp.getEmployeesId();
            }

            ctx.status(200).json(Map.of(
                    "success",    true,
                    "userId",     user.getUserId(),
                    "userName",   user.getUserName(),
                    "role",       user.getRoleUser(),
                    "managerId",  managerId,
                    "employeeId", employeeId
            ));
        } catch (Exception e) {
            ctx.status(400).json(Map.of("success", false, "message", e.getMessage()));
        }
    }

    public void register(Context ctx) {
        try {
            Map<String,String> body = ctx.bodyAsClass(Map.class);
            boolean ok = userService.register(
                    body.get("userName"),
                    body.get("password"),
                    body.get("role")
            );
            ctx.status(ok ? 201 : 500).json(Map.of(
                    "success", ok,
                    "message", ok ? "Compte créé avec succès" : "Échec de la création"
            ));
        } catch (Exception e) {
            ctx.status(400).json(Map.of("success", false, "message", e.getMessage()));
        }
    }
}